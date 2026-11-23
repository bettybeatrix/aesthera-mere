"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import type { DoctorProfile, DoctorProfileInput } from "@/types/doctor";

type Props = { initialDoctors: DoctorProfile[] };

const emptyForm: DoctorProfileInput = {
  slug: "",
  name: "",
  shortName: "",
  title: "Aesthetic Physician",
  tagline: "",
  image: "",
  biography: [],
  expertise: [],
  credentials: [],
  affiliations: [],
  isPublished: false,
  sortOrder: 99,
};

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">{children}</svg>;
}

function lines(values: string[]) {
  return values.join("\n");
}

function parseLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export default function DoctorsWorkspace({ initialDoctors }: Props) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DoctorProfileInput>(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [notice, setNotice] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const matchesText = !term || [doctor.name, doctor.title, doctor.tagline].some((value) => value.toLowerCase().includes(term));
      const matchesFilter = filter === "all" || (filter === "published" ? doctor.isPublished : !doctor.isPublished);
      return matchesText && matchesFilter;
    });
  }, [doctors, filter, query]);

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview("");
    setNotice("");
  }

  function editDoctor(doctor: DoctorProfile) {
    setEditingId(doctor.id);
    setForm({
      slug: doctor.slug,
      name: doctor.name,
      shortName: doctor.shortName,
      title: doctor.title,
      tagline: doctor.tagline,
      image: doctor.image,
      biography: doctor.biography,
      expertise: doctor.expertise,
      credentials: doctor.credentials,
      affiliations: doctor.affiliations,
      isPublished: doctor.isPublished,
      sortOrder: doctor.sortOrder,
    });
    setImagePreview(doctor.image);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function update<K extends keyof DoctorProfileInput>(key: K, value: DoctorProfileInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(result);
      update("image", result);
      setNotice("Image preview loaded. It will need persistent storage when the backend is connected.");
    };
    reader.readAsDataURL(file);
  }

  function saveDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      setNotice("Doctor name is required.");
      return;
    }
    const now = new Date().toISOString();
    if (editingId) {
      setDoctors((current) => current.map((doctor) => doctor.id === editingId ? { ...doctor, ...form, updatedAt: now } : doctor));
      setNotice("Profile updated in this preview session. Changes are not saved to a database yet.");
    } else {
      const newDoctor: DoctorProfile = {
        ...form,
        id: `doctor-${Date.now()}`,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        createdAt: now,
        updatedAt: now,
      };
      setDoctors((current) => [...current, newDoctor]);
      setNotice("Profile added in this preview session. Changes are not saved to a database yet.");
    }
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview("");
  }

  function togglePublished(doctor: DoctorProfile) {
    setDoctors((current) => current.map((item) => item.id === doctor.id ? { ...item, isPublished: !item.isPublished, updatedAt: new Date().toISOString() } : item));
    setNotice("Publishing status changed in this preview session only.");
  }

  function removeDoctor(doctor: DoctorProfile) {
    if (!window.confirm(`Remove ${doctor.name} from this preview list?`)) return;
    setDoctors((current) => current.filter((item) => item.id !== doctor.id));
    if (editingId === doctor.id) startNew();
    setNotice("Profile removed from this preview session only.");
  }

  return (
    <main className="min-h-screen px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1460px]">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a8079]">Website management / Doctors</p>
            <h1 className="font-seasons mt-3 text-[clamp(2.4rem,4vw,3.7rem)] leading-none text-[#2e4433]">Doctor profiles</h1>
            <p className="mt-3 max-w-xl font-montserrat text-xs leading-6 text-[#7a8079]">Manage the professional profiles presented on the public Aesthera Mère website.</p>
          </div>
          <button type="button" onClick={startNew} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#344c38] px-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#283e2c]">
            <Icon><path d="M12 5v14M5 12h14" /></Icon> Add doctor
          </button>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-3" aria-label="Doctor profile summary">
          {[["Total profiles", doctors.length], ["Published", doctors.filter((doctor) => doctor.isPublished).length], ["Drafts", doctors.filter((doctor) => !doctor.isPublished).length]].map(([label, value]) => (
            <article key={String(label)} className="rounded-[20px] border border-[#334b39]/10 bg-white/75 p-5">
              <p className="font-seasons text-3xl text-[#2e4433]">{value}</p>
              <p className="mt-2 font-montserrat text-[10px] font-semibold text-[#667168]">{label}</p>
            </article>
          ))}
        </section>

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)]">
          <section className="overflow-hidden rounded-[24px] border border-[#334b39]/10 bg-white/80">
            <div className="grid gap-3 border-b border-[#334b39]/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
              <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#334b39]/10 bg-[#f7f6f1] px-3">
                <Icon><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon>
                <span className="sr-only">Search doctor profiles</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctor profiles..." className="min-w-0 flex-1 bg-transparent font-montserrat text-[10px] outline-none" />
              </label>
              <div className="flex rounded-full bg-[#f0f2ec] p-1">
                {(["all", "published", "draft"] as const).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`min-h-9 rounded-full px-3 font-montserrat text-[8px] font-bold uppercase tracking-[0.08em] ${filter === item ? "bg-white text-[#36513c] shadow-sm" : "text-[#858c85]"}`}>{item}</button>)}
              </div>
            </div>
            <div className="divide-y divide-[#334b39]/8">
              {visible.map((doctor) => (
                <article key={doctor.id} className="flex items-center gap-3 p-4 sm:p-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#e8e4dc]">
                    {doctor.image ? <Image src={doctor.image} alt={doctor.name} fill sizes="56px" className="object-cover" unoptimized={doctor.image.startsWith("data:")} /> : <span className="grid h-full w-full place-items-center font-seasons text-xl text-[#526b56]">{doctor.name.split(" ").slice(-1)[0]?.slice(0, 1)}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-montserrat text-[11px] font-semibold text-[#39473d]">{doctor.name}</h2>
                    <p className="mt-1 truncate font-montserrat text-[9px] text-[#92978f]">{doctor.title}</p>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 font-montserrat text-[8px] font-bold uppercase ${doctor.isPublished ? "bg-[#e7efe5] text-[#4d6e54]" : "bg-[#eceae6] text-[#77766f]"}`}>{doctor.isPublished ? "Published" : "Draft"}</span>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                    <button type="button" onClick={() => editDoctor(doctor)} className="min-h-8 rounded-full border border-[#334b39]/15 px-3 font-montserrat text-[8px] font-bold uppercase text-[#405745]">Edit</button>
                    <button type="button" onClick={() => togglePublished(doctor)} className="min-h-8 rounded-full border border-[#334b39]/15 px-3 font-montserrat text-[8px] font-bold uppercase text-[#405745]">{doctor.isPublished ? "Unpublish" : "Publish"}</button>
                    <button type="button" onClick={() => removeDoctor(doctor)} aria-label={`Remove ${doctor.name}`} className="min-h-8 rounded-full border border-[#b77c70]/25 px-3 font-montserrat text-[8px] font-bold uppercase text-[#9b5e54]">Remove</button>
                  </div>
                </article>
              ))}
              {!visible.length && <p className="p-12 text-center font-montserrat text-xs text-[#92978f]">No doctor profiles match your search.</p>}
            </div>
          </section>

          <section className="rounded-[24px] border border-[#334b39]/10 bg-white/80 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#7d857e]">{editingId ? "Edit profile" : "New profile"}</p>
                <h2 className="font-seasons mt-2 text-2xl text-[#2e4433]">{editingId ? "Update doctor details" : "Add a doctor"}</h2>
              </div>
              {editingId && <button type="button" onClick={startNew} className="font-montserrat text-[9px] font-bold uppercase text-[#718071]">Cancel edit</button>}
            </div>

            <form onSubmit={saveDoctor} className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Full name *</span><input required value={form.name} onChange={(event) => update("name", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 font-montserrat text-xs outline-none focus:border-[#526b56]" placeholder="e.g. Dr. Jane Dela Cruz" /></label>
                <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Display name</span><input value={form.shortName} onChange={(event) => update("shortName", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 font-montserrat text-xs outline-none focus:border-[#526b56]" placeholder="Dr. Jane" /></label>
                <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Professional title</span><input value={form.title} onChange={(event) => update("title", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 font-montserrat text-xs outline-none focus:border-[#526b56]" placeholder="Aesthetic Physician" /></label>
              </div>

              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Tagline</span><input value={form.tagline} onChange={(event) => update("tagline", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 font-montserrat text-xs outline-none focus:border-[#526b56]" placeholder="Specialties or professional focus" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Biography (one paragraph per line)</span><textarea rows={4} value={lines(form.biography)} onChange={(event) => update("biography", parseLines(event.target.value))} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 py-3 font-montserrat text-xs leading-6 outline-none focus:border-[#526b56]" placeholder="Doctor biography..." /></label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Areas of expertise (one per line)</span><textarea rows={5} value={lines(form.expertise)} onChange={(event) => update("expertise", parseLines(event.target.value))} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 py-3 font-montserrat text-xs leading-5 outline-none focus:border-[#526b56]" /></label>
                <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Education & credentials (one per line)</span><textarea rows={5} value={lines(form.credentials)} onChange={(event) => update("credentials", parseLines(event.target.value))} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 py-3 font-montserrat text-xs leading-5 outline-none focus:border-[#526b56]" /></label>
              </div>

              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Professional affiliations (one per line)</span><textarea rows={3} value={lines(form.affiliations)} onChange={(event) => update("affiliations", parseLines(event.target.value))} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fbfaf7] px-3 py-3 font-montserrat text-xs leading-5 outline-none focus:border-[#526b56]" /></label>

              <div className="rounded-2xl border border-dashed border-[#334b39]/20 bg-[#f8f7f2] p-4">
                <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.1em] text-[#788078]">Doctor portrait</p>
                {imagePreview && <div className="relative mt-3 h-40 w-32 overflow-hidden rounded-xl bg-[#e8e4dc]"><Image src={imagePreview} alt="Doctor portrait preview" fill sizes="128px" className="object-cover" unoptimized={imagePreview.startsWith("data:")} /></div>}
                <input type="file" accept="image/*" onChange={handleImage} className="mt-3 block w-full font-montserrat text-[10px] text-[#667168] file:mr-3 file:rounded-full file:border-0 file:bg-[#344c38] file:px-4 file:py-2 file:font-montserrat file:text-[9px] file:font-semibold file:text-white" />
                <p className="mt-2 font-montserrat text-[9px] leading-5 text-[#92978f]">Preview only for now. Persistent image upload will be connected to storage later.</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#334b39]/10 pt-4">
                <label className="flex items-center gap-2 font-montserrat text-[10px] text-[#536257]"><input type="checkbox" checked={form.isPublished} onChange={(event) => update("isPublished", event.target.checked)} className="h-4 w-4 accent-[#344c38]" /> Publish profile</label>
                <button type="submit" className="min-h-11 rounded-full bg-[#344c38] px-6 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#283e2c]">{editingId ? "Save changes" : "Add profile"}</button>
              </div>
            </form>
            {notice && <p role="status" className="mt-4 rounded-xl bg-[#edf2ea] px-4 py-3 font-montserrat text-[9px] leading-5 text-[#526b56]">{notice}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
