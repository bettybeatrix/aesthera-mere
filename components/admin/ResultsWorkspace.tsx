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
    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item));
      setNotice("Result updated in this preview session.");
    } else {
      setItems((current) => [...current, { ...form, id: `result-${Date.now()}` }]);
      setNotice("Result added in this preview session.");
    }
    closeForm();
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
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><h1 className="font-seasons text-[clamp(2.4rem,4vw,3.7rem)] leading-none text-[#4c5534]">Results</h1><p className="mt-3 font-montserrat text-[11px] text-[#80755f]">Before-and-after gallery</p></div>
          <button type="button" onClick={openAdd} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4c5534] px-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#3d472a]"><Icon><path d="M12 5v14M5 12h14" /></Icon> Add result</button>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-2">
          <article className="rounded-[20px] border border-[#334b39]/10 bg-white/75 p-5"><p className="font-seasons text-3xl text-[#4c5534]">{items.length}</p><p className="mt-2 font-montserrat text-[10px] font-semibold text-[#80755f]">Comparisons</p></article>
          <article className="rounded-[20px] border border-[#334b39]/10 bg-white/75 p-5"><p className="font-seasons text-3xl text-[#4c5534]">{new Set(items.map((item) => item.title)).size}</p><p className="mt-2 font-montserrat text-[10px] font-semibold text-[#80755f]">Treatments</p></article>
        </section>

        {!editingId && resultForm && <div className="mb-6 mt-6">{resultForm}</div>}

        <section className="mt-6 overflow-hidden rounded-[24px] border border-[#334b39]/10 bg-white/80">
          <div className="border-b border-[#334b39]/10 p-4 sm:p-5"><label className="flex min-h-11 max-w-xl items-center gap-2 rounded-xl border border-[#334b39]/10 bg-[#f5f1e7] px-3"><Icon><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon><span className="sr-only">Search results</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treatments..." className="min-w-0 flex-1 bg-transparent font-montserrat text-[10px] outline-none" /></label></div>
          <div className="divide-y divide-[#334b39]/8">
            {visible.map((item) => <article key={item.id} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="grid w-28 shrink-0 grid-cols-2 gap-1">
                  {[item.before, item.after].map((src, index) => <div key={index} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#f5f1e7]"><Image src={src} alt={index ? "After" : "Before"} fill sizes="56px" className="object-cover" unoptimized /></div>)}
                </div>
                <div className="min-w-0"><h2 className="font-montserrat text-[11px] font-semibold text-[#39473d]">{item.title}</h2><p className="mt-1 font-montserrat text-[9px] text-[#80755f]">{item.view}</p><p className="mt-2 font-montserrat text-[9px] text-[#80755f]">Before & after comparison</p></div>
              </div>
              <div className="flex flex-wrap gap-2"><button type="button" onClick={() => openEdit(item)} className="min-h-9 rounded-full border border-[#334b39]/15 px-4 font-montserrat text-[9px] font-bold uppercase text-[#4c5534]">Edit</button><button type="button" onClick={() => setPendingDelete(item)} className="min-h-9 rounded-full border border-[#8a5148]/25 px-4 font-montserrat text-[9px] font-bold uppercase text-[#8a5148]">Remove</button></div>
              {editingId === item.id && resultForm && <div className="sm:col-span-2 rounded-2xl bg-[#f8f7f1] p-4 sm:p-5">{resultForm}</div>}
            </article>)}
            {!visible.length && <p className="p-12 text-center font-montserrat text-xs text-[#80755f]">No results match your search.</p>}
          </div>
        </section>
      </div>

      {pendingDelete && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172119]/55 px-5 py-8 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDelete(null); }}><section role="alertdialog" aria-modal="true" aria-labelledby="delete-result-title" className="w-full max-w-[420px] rounded-[24px] bg-[#fffcf3] p-6 shadow-2xl"><h2 id="delete-result-title" className="font-seasons text-2xl text-[#4c5534]">Remove this result?</h2><p className="mt-3 font-montserrat text-xs leading-6 text-[#80755f]">{pendingDelete.title} · {pendingDelete.view}</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setPendingDelete(null)} className="min-h-10 rounded-full border border-[#334b39]/20 px-5 font-montserrat text-[9px] font-semibold uppercase">Cancel</button><button type="button" onClick={removeResult} className="min-h-10 rounded-full bg-[#8a5148] px-5 font-montserrat text-[9px] font-semibold uppercase text-white">Remove</button></div></section></div>}
      {notice && <div role="status" className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl bg-white px-5 py-4 font-montserrat text-[10px] leading-5 text-[#4f6442] shadow-xl">{notice}</div>}
    </main>
  );
}
