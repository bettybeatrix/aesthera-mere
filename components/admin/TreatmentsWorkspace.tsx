"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { ManagedTreatment, ManagedTreatmentInput } from "@/types/managed-treatment";
import { treatmentCategories } from "@/data/treatments";

type Props = { initialTreatments: ManagedTreatment[] };

const blank: ManagedTreatmentInput = {
  slug: "", name: "", description: "", price: "", packagePrice: "",
  priceNote: "", priceLabel: "Per session", image: "", imageAvailable: true,
  benefits: [], duration: "Confirmed during consultation",
  sessions: "Personalized after assessment", downtime: "Discussed before treatment",
  categorySlug: "skin-radiance", categoryName: "Skin Radiance",
  groupSlug: "", groupName: "", isAvailable: true, sortOrder: 9999,
};

const categories = treatmentCategories.map((category) => ({
  slug: category.slug,
  name: category.name,
  groups: category.groups.map((group) => ({ slug: group.slug, title: group.title })),
}));

function splitLines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}
function joinLines(value: string[]) {
  return value.join("\n");
}
function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">{children}</svg>;
}

export default function TreatmentsWorkspace({ initialTreatments }: Props) {
  const [items, setItems] = useState(initialTreatments);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "unavailable">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ManagedTreatmentInput>(blank);
  const [imagePreview, setImagePreview] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ManagedTreatment | null>(null);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (formOpen) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [formOpen, editingId]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) =>
      (!term || [item.name, item.description, item.groupName].some((value) => value.toLowerCase().includes(term))) &&
      (categoryFilter === "all" || item.categorySlug === categoryFilter) &&
      (statusFilter === "all" || (statusFilter === "available" ? item.isAvailable : !item.isAvailable)),
    );
  }, [items, query, categoryFilter, statusFilter]);

  function openNew() {
    setEditingId(null); setForm(blank); setImagePreview(""); setNotice(""); setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false); setEditingId(null); setForm(blank); setImagePreview(""); setNotice("");
  }
  function edit(item: ManagedTreatment) {
    setEditingId(item.id);
    const { id, createdAt, updatedAt, ...values } = item;
    setForm(values);
    setImagePreview(item.image);
    setNotice("");
    setFormOpen(true);
  }
  function update<K extends keyof ManagedTreatmentInput>(key: K, value: ManagedTreatmentInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function chooseCategory(slug: string) {
    const selected = categories.find((category) => category.slug === slug) ?? categories[0];
    const firstGroup = selected.groups[0];
    update("categorySlug", selected.slug);
    update("categoryName", selected.name);
    update("groupSlug", firstGroup?.slug ?? "");
    update("groupName", firstGroup?.title ?? "");
  }

  function chooseGroup(slug: string) {
    const selectedCategory = categories.find((category) => category.slug === form.categorySlug) ?? categories[0];
    const selectedGroup = selectedCategory.groups.find((group) => group.slug === slug);
    update("groupSlug", selectedGroup?.slug ?? "");
    update("groupName", selectedGroup?.title ?? "");
  }
  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setNotice("Please select a valid image file."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(value); update("image", value); update("imageAvailable", true);
      setNotice("Image preview loaded. Persistent storage will be connected with the backend.");
    };
    reader.readAsDataURL(file);
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.slug.trim() || !form.groupName.trim()) {
      setNotice("Treatment name, slug, and collection are required."); return;
    }
    const now = new Date().toISOString();
    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId ? { ...item, ...form, updatedAt: now } : item));
      setNotice("Treatment updated in this preview session only. It is not saved to a database.");
    } else {
      setItems((current) => [...current, { ...form, id: `treatment-${Date.now()}`, createdAt: now, updatedAt: now }]);
      setNotice("Treatment added in this preview session only. It is not saved to a database.");
    }
    closeForm();
  }
  function confirmDelete() {
    if (!pendingDelete) return;
    setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
    if (editingId === pendingDelete.id) closeForm();
    setPendingDelete(null);
    setNotice("Treatment removed from this preview session only.");
  }

  return (
    <main className="min-h-screen px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1460px]">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="font-seasons text-[clamp(2.4rem,4vw,3.7rem)] leading-none text-[#4c5534]">Treatments</h1>
          </div>
          <button type="button" onClick={openNew} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4c5534] px-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#3d472a]"><Icon><path d="M12 5v14M5 12h14" /></Icon> Add treatment</button>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-3" aria-label="Treatment summary">
          {[["Total treatments", items.length], ["Available", items.filter((item) => item.isAvailable).length], ["Unavailable", items.filter((item) => !item.isAvailable).length]].map(([label, value]) => <article key={String(label)} className="rounded-[20px] border border-[#334b39]/10 bg-white/75 p-5"><p className="font-seasons text-3xl text-[#4c5534]">{value}</p><p className="mt-2 font-montserrat text-[10px] font-semibold text-[#80755f]">{label}</p></article>)}
        </section>

        <section className="mt-5 overflow-hidden rounded-[24px] border border-[#334b39]/10 bg-white/80">
          <div className="grid gap-3 border-b border-[#334b39]/10 p-4 lg:grid-cols-[1fr_220px_auto] lg:items-center sm:p-5">
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#334b39]/10 bg-[#f5f1e7] px-3"><Icon><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon><span className="sr-only">Search treatments</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treatments..." className="min-w-0 flex-1 bg-transparent font-montserrat text-[10px] outline-none" /></label>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="min-h-11 rounded-xl border border-[#334b39]/10 bg-[#f5f1e7] px-3 font-montserrat text-[10px] text-[#4c5534] outline-none"><option value="all">All categories</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select>
            <div className="flex rounded-full bg-[#edf0e8] p-1">{(["all", "available", "unavailable"] as const).map((status) => <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`min-h-9 rounded-full px-3 font-montserrat text-[8px] font-bold uppercase tracking-[0.08em] ${statusFilter === status ? "bg-white text-[#36513c] shadow-sm" : "text-[#858c85]"}`}>{status}</button>)}</div>
          </div>
          <div className="divide-y divide-[#334b39]/8">
            {visible.map((item) => <article key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#e9e4d8]">{item.image && item.image.startsWith("/") ? <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" /> : item.image ? <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" unoptimized /> : <span className="grid h-full w-full place-items-center font-seasons text-xl text-[#4f6442]">{item.name.slice(0,1)}</span>}</div>
              <div className="min-w-0 flex-1"><h2 className="font-montserrat text-[11px] font-semibold text-[#39473d]">{item.name}</h2><p className="mt-1 font-montserrat text-[9px] text-[#80755f]">{item.categoryName} / {item.groupName}</p><p className="mt-1 font-montserrat text-[10px] font-semibold text-[#4f6442]">{item.price}</p><span className={`mt-2 inline-flex rounded-full px-2.5 py-1 font-montserrat text-[8px] font-bold uppercase ${item.isAvailable ? "bg-[#e8eee3] text-[#4f6442]" : "bg-[#f1eee6] text-[#80755f]"}`}>{item.isAvailable ? "Available" : "Unavailable"}</span></div>
              <div className="flex shrink-0 flex-wrap gap-1.5"><button type="button" onClick={() => edit(item)} className="min-h-8 rounded-full border border-[#334b39]/15 px-3 font-montserrat text-[8px] font-bold uppercase text-[#4c5534]">Edit</button><button type="button" onClick={() => setPendingDelete(item)} className="min-h-8 rounded-full border border-[#8a5148]/25 px-3 font-montserrat text-[8px] font-bold uppercase text-[#8a5148]">Remove</button></div>
            </article>)}
            {!visible.length && <p className="p-12 text-center font-montserrat text-xs text-[#80755f]">No treatments match your filters.</p>}
          </div>
        </section>

        {formOpen && (
          <section ref={formRef} className="mt-5 scroll-mt-8 rounded-[24px] border border-[#334b39]/10 bg-white/80 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#80755f]">{editingId ? "Edit treatment" : "New treatment"}</p><h2 className="font-seasons mt-2 text-2xl text-[#4c5534]">{editingId ? "Update treatment details" : "Add a treatment"}</h2></div><button type="button" onClick={closeForm} className="font-montserrat text-[9px] font-bold uppercase text-[#718071]">Close</button></div>
            <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Treatment name *</span><input required value={form.name} onChange={(event) => update("name", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs outline-none" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Slug *</span><input required value={form.slug} onChange={(event) => update("slug", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs outline-none" placeholder="e.g. aqua-reset-facial" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Category</span><select value={form.categorySlug} onChange={(event) => chooseCategory(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs">{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Collection *</span><select required value={form.groupSlug} onChange={(event) => chooseGroup(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs">{(categories.find((category) => category.slug === form.categorySlug)?.groups ?? []).map((group) => <option key={group.slug} value={group.slug}>{group.title}</option>)}</select></label>
              <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Description</span><textarea rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Price</span><input value={form.price} onChange={(event) => update("price", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" placeholder="₱1,280" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Price label</span><select value={form.priceLabel} onChange={(event) => update("priceLabel", event.target.value as ManagedTreatmentInput["priceLabel"])} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs"><option>Per session</option><option>Starting price</option><option>Package</option><option>Price</option></select></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Package price</span><input value={form.packagePrice ?? ""} onChange={(event) => update("packagePrice", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Price note</span><input value={form.priceNote ?? ""} onChange={(event) => update("priceNote", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" /></label>
              <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Benefits (one per line)</span><textarea rows={3} value={joinLines(form.benefits)} onChange={(event) => update("benefits", splitLines(event.target.value))} className="w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Duration</span><input value={form.duration} onChange={(event) => update("duration", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" /></label>
              <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Sessions</span><input value={form.sessions} onChange={(event) => update("sessions", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" /></label>
              <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Downtime / recovery</span><input value={form.downtime} onChange={(event) => update("downtime", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs" /></label>
              <div className="md:col-span-2 rounded-2xl border border-dashed border-[#334b39]/20 bg-[#fffcf3] p-4"><p className="font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Treatment image</p>{imagePreview && <div className="relative mt-3 h-36 w-36 overflow-hidden rounded-xl"><Image src={imagePreview} alt="Treatment preview" fill sizes="144px" className="object-cover" unoptimized /></div>}<input type="file" accept="image/*" onChange={handleImage} className="mt-3 block w-full font-montserrat text-[10px] text-[#80755f] file:mr-3 file:rounded-full file:border-0 file:bg-[#4c5534] file:px-4 file:py-2 file:font-montserrat file:text-[9px] file:font-semibold file:text-white" /><p className="mt-2 font-montserrat text-[9px] text-[#80755f]">Preview only until persistent storage is connected.</p></div>
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#334b39]/10 pt-4"><label className="flex items-center gap-2 font-montserrat text-[10px] text-[#536257]"><input type="checkbox" checked={form.isAvailable} onChange={(event) => update("isAvailable", event.target.checked)} className="h-4 w-4 accent-[#4c5534]" /> Available on website</label><button type="submit" className="min-h-11 rounded-full bg-[#4c5534] px-6 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white">{editingId ? "Save changes" : "Add treatment"}</button></div>
            </form>
          </section>
        )}
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172119]/55 px-5 py-8 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDelete(null); }}>
          <section role="alertdialog" aria-modal="true" aria-labelledby="delete-treatment-title" className="w-full max-w-[440px] rounded-[24px] border border-[#334b39]/10 bg-[#fffcf3] p-6 shadow-2xl sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e8e2] text-[#8a5148]"><Icon><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6" /></Icon></div>
            <p className="mt-5 font-montserrat text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8a5148]">Remove treatment</p>
            <h2 id="delete-treatment-title" className="font-seasons mt-2 text-2xl text-[#4c5534]">Are you sure?</h2>
            <p className="mt-3 font-montserrat text-xs leading-6 text-[#80755f]">Remove <strong className="font-semibold text-[#4c5534]">{pendingDelete.name}</strong> from this preview list? This does not delete public website data.</p>
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setPendingDelete(null)} className="min-h-11 rounded-full border border-[#334b39]/20 px-5 font-montserrat text-[9px] font-semibold uppercase text-[#526557]">Cancel</button><button type="button" onClick={confirmDelete} className="min-h-11 rounded-full bg-[#8d5148] px-5 font-montserrat text-[9px] font-semibold uppercase text-white">Yes, remove</button></div>
          </section>
        </div>
      )}
      {notice && <div role="status" className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl border border-[#334b39]/10 bg-white px-5 py-4 font-montserrat text-[10px] leading-5 text-[#4f6442] shadow-xl">{notice}</div>}
    </main>
  );
}
