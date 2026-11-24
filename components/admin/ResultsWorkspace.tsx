"use client";

import Image from "next/image";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { treatmentResults } from "@/data/results";

type ResultEntry = { id: string; title: string; view: string; before: string; after: string };
type FormState = Omit<ResultEntry, "id">;
const emptyForm: FormState = { title: "", view: "Front view", before: "", after: "" };

const initialEntries: ResultEntry[] = treatmentResults.flatMap((result) =>
  result.photos.map((photo, index) => ({
    id: `${result.id}-${index}`,
    title: result.title,
    view: photo.view,
    before: photo.before.src,
    after: photo.after.src,
  })),
);

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">{children}</svg>;
}

export default function ResultsWorkspace() {
  const [items, setItems] = useState(initialEntries);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [notice, setNotice] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ResultEntry | null>(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => !term || [item.title, item.view].some((value) => value.toLowerCase().includes(term)));
  }, [items, query]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setNotice("");
    setFormOpen(true);
  }

  function openEdit(item: ResultEntry) {
    setEditingId(item.id);
    setForm({ title: item.title, view: item.view, before: item.before, after: item.after });
    setNotice("");
    setFormOpen(true);
  }

  function closeForm() {
    setEditingId(null);
    setFormOpen(false);
    setForm(emptyForm);
    setNotice("");
  }

  function handleImage(side: "before" | "after", event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : "";
      setForm((current) => ({ ...current, [side]: src }));
    };
    reader.readAsDataURL(file);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.view.trim() || !form.before || !form.after) {
      setNotice("Treatment name, view, before photo and after photo are required.");
      return;
    }
    const message = editingId
      ? "Result updated in this preview session."
      : "Result added in this preview session.";
    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item));
    } else {
      setItems((current) => [...current, { ...form, id: `result-${Date.now()}` }]);
    }
    closeForm();
    setNotice(message);
  }

  function removeResult() {
    if (!pendingDelete) return;
    setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
    if (editingId === pendingDelete.id) closeForm();
    setPendingDelete(null);
    setNotice("Result removed from this preview session.");
  }

  const resultForm = formOpen ? (
    <section className="rounded-[22px] border border-[#334b39]/10 bg-[#fffefa] p-5 shadow-[0_10px_32px_rgba(51,75,57,0.055)] sm:p-7">
      <div className="flex items-start justify-between gap-4 border-b border-[#334b39]/10 pb-4">
        <div><p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#80755f]">{editingId ? "Edit result" : "New result"}</p><h2 className="mt-2 font-seasons text-2xl text-[#4c5534]">{editingId ? "Update result" : "Add a result"}</h2></div>
        <button type="button" onClick={closeForm} className="rounded-full border border-[#334b39]/15 px-4 py-2 font-montserrat text-[9px] font-bold uppercase text-[#718071] transition-colors hover:bg-[#f4f1e8]">Close</button>
      </div>
      <form onSubmit={save} className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">Treatment *</span><input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs outline-none focus:border-[#71835e] focus:ring-2 focus:ring-[#71835e]/10" placeholder="e.g. Ultraformer MPT" /></label>
        <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755f]">View / area *</span><input required value={form.view} onChange={(event) => setForm((current) => ({ ...current, view: event.target.value }))} className="min-h-11 w-full rounded-xl border border-[#334b39]/15 bg-[#fffcf3] px-3 font-montserrat text-xs outline-none focus:border-[#71835e] focus:ring-2 focus:ring-[#71835e]/10" placeholder="e.g. Front view" /></label>
        {(["before", "after"] as const).map((side) => <div key={side} className="rounded-2xl border border-[#334b39]/10 bg-[#f8f7f1] p-4">
          <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80755f]">{side} photo *</p>
          {form[side] && <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl bg-white"><Image src={form[side]} alt={`${side} result preview`} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-contain" unoptimized /></div>}
          <input type="file" accept="image/*" onChange={(event) => handleImage(side, event)} className="mt-3 block w-full font-montserrat text-[10px] text-[#80755f] file:mr-3 file:rounded-full file:border-0 file:bg-[#4c5534] file:px-4 file:py-2 file:font-montserrat file:text-[9px] file:font-semibold file:text-white" />
        </div>)}
        <div className="md:col-span-2 flex justify-end border-t border-[#334b39]/10 pt-4"><button type="submit" className="min-h-11 rounded-full bg-[#4c5534] px-6 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#3d472a]">{editingId ? "Save changes" : "Add result"}</button></div>
      </form>
    </section>
  ) : null;

  return (
    <main className="min-h-screen px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1460px]">
        <section className="relative overflow-hidden rounded-[28px] bg-[#344b38] px-6 py-8 text-[#fffcf3] shadow-[0_18px_48px_-30px_rgba(30,55,35,0.75)] sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-1 top-0 h-44 w-44 rounded-full border border-white/10" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">Website management</p>
              <h1 className="mt-3 font-seasons text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.98]">Results gallery</h1>
              <p className="mt-4 max-w-xl font-montserrat text-xs leading-6 text-white/65">Manage treatment comparisons shown in the public before-and-after gallery.</p>
            </div>
            <div className="flex flex-wrap items-end gap-6">
              <div><p className="font-seasons text-4xl leading-none">{items.length.toString().padStart(2, "0")}</p><p className="mt-2 font-montserrat text-[8px] font-semibold uppercase tracking-[0.15em] text-white/55">Comparisons</p></div>
              <div className="h-10 w-px bg-white/20" />
              <div><p className="font-seasons text-4xl leading-none">{new Set(items.map((item) => item.title)).size.toString().padStart(2, "0")}</p><p className="mt-2 font-montserrat text-[8px] font-semibold uppercase tracking-[0.15em] text-white/55">Treatments</p></div>
              <button type="button" onClick={openAdd} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#fffcf3] px-5 font-montserrat text-[9px] font-bold uppercase tracking-[0.1em] text-[#344b38] transition-colors hover:bg-white"><Icon><path d="M12 5v14M5 12h14" /></Icon> Add result</button>
            </div>
          </div>
        </section>

        {!editingId && resultForm && <div className="mb-7 mt-7">{resultForm}</div>}

        <section className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><h2 className="font-seasons text-2xl text-[#4c5534]">Treatment comparisons</h2><p className="mt-1.5 font-montserrat text-[10px] text-[#80755f]">Before and after photographs, grouped by treatment.</p></div>
            <label className="flex min-h-10 w-full items-center gap-2 rounded-full border border-[#334b39]/12 bg-white px-4 sm:max-w-[300px]"><Icon><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon><span className="sr-only">Search results</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treatment or view..." className="min-w-0 flex-1 bg-transparent font-montserrat text-[10px] outline-none" /></label>
          </div>

          {visible.length > 0 ? (
            <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((item, index) => <article key={item.id} className="overflow-hidden rounded-[22px] border border-[#334b39]/10 bg-white shadow-[0_12px_32px_-28px_rgba(35,54,40,0.55)] transition-shadow hover:shadow-[0_18px_38px_-26px_rgba(35,54,40,0.45)]">
                <div className="relative bg-[#f4f1e8] p-3">
                  <div className="mb-3 flex items-center justify-between px-1"><span className="font-montserrat text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8a8d7e]">Comparison {(index + 1).toString().padStart(2, "0")}</span><span className="rounded-full bg-white/80 px-2.5 py-1 font-montserrat text-[8px] font-semibold uppercase text-[#66745c]">{item.view}</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    {[{src:item.before,label:"Before"},{src:item.after,label:"After"}].map((photo) => <figure key={photo.label} className="min-w-0">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e8e4dc]"><Image src={photo.src} alt={photo.label + " " + item.title} fill sizes="(max-width: 768px) 45vw, 25vw" className="object-cover" unoptimized /></div>
                      <figcaption className="mt-2 text-center font-montserrat text-[8px] font-bold uppercase tracking-[0.15em] text-[#69745f]">{photo.label}</figcaption>
                    </figure>)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <div className="min-w-0"><h3 className="truncate font-seasons text-xl text-[#4c5534]">{item.title}</h3><p className="mt-1 font-montserrat text-[9px] text-[#80755f]">{item.view}</p></div>
                  <div className="flex shrink-0 gap-2"><button type="button" onClick={() => openEdit(item)} className="min-h-9 rounded-full border border-[#334b39]/15 px-3.5 font-montserrat text-[8px] font-bold uppercase text-[#4c5534] transition-colors hover:bg-[#f5f1e7]">Edit</button><button type="button" onClick={() => setPendingDelete(item)} aria-label={"Remove " + item.title + " " + item.view} className="grid h-9 w-9 place-items-center rounded-full border border-[#8a5148]/20 text-[#8a5148] transition-colors hover:bg-[#fbefec]"><Icon><path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" /></Icon></button></div>
                </div>
                {editingId === item.id && resultForm && <div className="border-t border-[#334b39]/10 bg-[#f8f7f1] p-4 sm:p-5">{resultForm}</div>}
              </article>)}
            </div>
          ) : <div className="rounded-[22px] border border-dashed border-[#334b39]/20 bg-white/70 px-6 py-16 text-center"><p className="font-seasons text-2xl text-[#4c5534]">No matching results</p><p className="mt-2 font-montserrat text-[10px] text-[#80755f]">Try another treatment name or view.</p></div>}
        </section>
      </div>

      {pendingDelete && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172119]/55 px-5 py-8 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDelete(null); }}><section role="alertdialog" aria-modal="true" aria-labelledby="delete-result-title" className="w-full max-w-[420px] rounded-[24px] bg-[#fffcf3] p-6 shadow-2xl"><h2 id="delete-result-title" className="font-seasons text-2xl text-[#4c5534]">Remove this result?</h2><p className="mt-3 font-montserrat text-xs leading-6 text-[#80755f]">{pendingDelete.title} · {pendingDelete.view}</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setPendingDelete(null)} className="min-h-10 rounded-full border border-[#334b39]/20 px-5 font-montserrat text-[9px] font-semibold uppercase">Cancel</button><button type="button" onClick={removeResult} className="min-h-10 rounded-full bg-[#8a5148] px-5 font-montserrat text-[9px] font-semibold uppercase text-white">Remove</button></div></section></div>}
      {notice && <div role="status" className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl bg-white px-5 py-4 font-montserrat text-[10px] leading-5 text-[#4f6442] shadow-xl">{notice}</div>}
    </main>
  );}
