"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { PromoCard, PromoCategory, PromoCampaignSettings } from "@/types/promo";
import PromosList from "@/app/promos/PromosList";
import PromoCampaignHero from "@/components/promos/PromoCampaignHero";
import type { PricingTable } from "@/types/promo";

type Props = { initialPromos: PromoCard[]; initialPricingTables: PricingTable[]; initialCampaign: PromoCampaignSettings };
type PromoForm = Omit<PromoCard, "id">;

const blank: PromoForm = {
  title: "", category: "facials", categoryLabel: "", badge: "", subtitle: "",
  promoPrice: undefined, promoPriceLabel: "", regularPrice: undefined, regularPriceLabel: "",
  savings: "", description: "", recommendedFor: [], inclusions: [], image: "",
  bonusText: "", validity: "", validUntil: "", terms: [], sessions: "",
  publishedAt: new Date(0).toISOString(), isActive: true,
};

const categories: { value: Exclude<PromoCategory, "all">; label: string }[] = [
  { value: "launch", label: "Launch Offers" },
  { value: "facials", label: "Facials & Skin" },
  { value: "laser", label: "Laser Treatments" },
  { value: "wellness", label: "Wellness" },
  { value: "injectables", label: "Injectables" },
  { value: "contour", label: "Lifting & Contouring" },
];

const lines = (value: string[]) => (value ?? []).join("\n");
const parseLines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

function isExpired(promo: PromoCard, todayDate: string | null) {
  return Boolean(todayDate && promo.validUntil && promo.validUntil < todayDate);
}

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">{children}</svg>;
}

export default function PromotionsWorkspace({ initialPromos, initialPricingTables, initialCampaign }: Props) {
  const [promos, setPromos] = useState(initialPromos);
  const [pricingTables, setPricingTables] = useState(initialPricingTables);
  const [campaign, setCampaign] = useState(initialCampaign);
  const [todayDate, setTodayDate] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive" | "expired">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromoForm>(blank);
  const [imagePreview, setImagePreview] = useState("");
  const [previewDetailsOpen, setPreviewDetailsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [pendingDelete, setPendingDelete] = useState<PromoCard | null>(null);

  useEffect(() => {
    setTodayDate(new Date().toISOString().slice(0, 10));
  }, []);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return promos.filter((promo) => {
      const matchesText = !term || [promo.title, promo.subtitle, promo.categoryLabel].some((value) => value.toLowerCase().includes(term));
      const current = !isExpired(promo, todayDate) && promo.isActive !== false;
      const matchesStatus = status === "all" || (status === "active" ? current : status === "expired" ? isExpired(promo, todayDate) : promo.isActive === false && !isExpired(promo, todayDate));
      return matchesText && matchesStatus;
    });
  }, [promos, query, status, todayDate]);

  function openNew() {
    setEditingId(null);
    setForm({ ...blank, publishedAt: new Date().toISOString() });
    setImagePreview("");
    setNotice("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(blank);
    setImagePreview("");
  }

  function edit(promo: PromoCard) {
    const { id, ...values } = promo;
    setEditingId(id);
    setForm({ ...values, recommendedFor: values.recommendedFor ?? [], inclusions: values.inclusions ?? [], terms: values.terms ?? [] });
    setImagePreview(promo.image);
    setNotice("");
    setFormOpen(true);
  }

  function update<K extends keyof PromoForm>(key: K, value: PromoForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(src);
      update("image", src);
      setNotice("Image preview loaded. Persistent media storage will be connected with the backend.");
    };
    reader.readAsDataURL(file);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.categoryLabel.trim() || !form.badge.trim() || !form.image.trim()) {
      setNotice("Title, category label, badge and image are required.");
      return;
    }
    if (form.validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(form.validUntil)) {
      setNotice("Please enter a valid offer end date.");
      return;
    }
    const now = new Date().toISOString();
    if (editingId) {
      setPromos((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item));
      setNotice("Promotion updated in this preview session only.");
    } else {
      setPromos((current) => [...current, { ...form, id: `promo-${Date.now()}` }]);
      setNotice("Promotion added in this preview session only.");
    }
    closeForm();
    void now;
  }

  function toggleActive(promo: PromoCard) {
    setPromos((current) => current.map((item) => item.id === promo.id ? { ...item, isActive: item.isActive === false } : item));
    setNotice(`${promo.title} marked ${promo.isActive === false ? "active" : "inactive"} in this preview session only.`);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setPromos((current) => current.filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
    setNotice("Promotion removed from this preview session only.");
  }

  const activeCount = promos.filter((promo) => !isExpired(promo, todayDate) && promo.isActive !== false).length;
  const inactiveCount = promos.filter((promo) => promo.isActive === false && !isExpired(promo, todayDate)).length;
  const expiredCount = promos.filter((promo) => isExpired(promo, todayDate)).length;

    const previewPromo: PromoCard = {
    ...form,
    id: editingId ?? "promotion-preview",
    title: form.title || "Your promotion title",
    categoryLabel: form.categoryLabel || categories.find((item) => item.value === form.category)?.label || "Category",
    badge: form.badge || "BEReady Holiday Deal",
    subtitle: form.subtitle || "Your promotion subtitle",
    description: form.description || "Your offer description will appear here.",
    inclusions: form.inclusions?.length ? form.inclusions : ["Your offer inclusions will appear here."],
    image: imagePreview || form.image || "/images/promotions/beready-holiday-deals.jpg",
  };

  const promotionForm = formOpen ? (
          <section className="promo-form-reveal rounded-[22px] border border-[#4C5534]/10 bg-[#fffefa] p-5 shadow-[0_10px_32px_rgba(51,75,57,0.055)] sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">{editingId ? "Edit promotion" : "New promotion"}</p><h2 className="font-seasons mt-2 text-2xl">{editingId ? "Update promotion details" : "Add a promotion"}</h2></div><button type="button" onClick={closeForm} className="font-montserrat text-[9px] font-bold uppercase text-[#4F6442]">Close</button></div>
            <form onSubmit={save} className="mt-6 space-y-6">
              <section className="space-y-4">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">Offer details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Promotion title *</span><input required value={form.title} onChange={(event) => update("title", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Category</span><select value={form.category} onChange={(event) => update("category", event.target.value as PromoForm["category"])} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs">{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Category label *</span><input required value={form.categoryLabel} onChange={(event) => update("categoryLabel", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Card badge *</span><input required value={form.badge} onChange={(event) => update("badge", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Subtitle</span><input value={form.subtitle} onChange={(event) => update("subtitle", event.target.value)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                </div>
              </section>

              <section className="space-y-4 border-t border-[#80755F]/15 pt-6">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">Pricing & savings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-[#F5F1E7] p-4">
                    <p className="mb-3 font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Promotional price</p>
                    <div className="grid gap-3">
                      <label><span className="mb-1.5 block font-montserrat text-[9px] text-[#80755F]">Numeric amount</span><input type="number" min="0" step="0.01" value={form.promoPrice ?? ""} onChange={(event) => update("promoPrice", event.target.value === "" ? undefined : Number(event.target.value))} className="min-h-10 w-full rounded-lg border border-[#80755F]/20 bg-white px-3 font-montserrat text-xs" /></label>
                      <label><span className="mb-1.5 block font-montserrat text-[9px] text-[#80755F]">Display label (optional)</span><input value={form.promoPriceLabel ?? ""} onChange={(event) => update("promoPriceLabel", event.target.value || undefined)} className="min-h-10 w-full rounded-lg border border-[#80755F]/20 bg-white px-3 font-montserrat text-xs" placeholder="e.g. From ₱150 / unit" /></label>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F5F1E7] p-4">
                    <p className="mb-3 font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Regular price</p>
                    <div className="grid gap-3">
                      <label><span className="mb-1.5 block font-montserrat text-[9px] text-[#80755F]">Numeric amount</span><input type="number" min="0" step="0.01" value={form.regularPrice ?? ""} onChange={(event) => update("regularPrice", event.target.value === "" ? undefined : Number(event.target.value))} className="min-h-10 w-full rounded-lg border border-[#80755F]/20 bg-white px-3 font-montserrat text-xs" /></label>
                      <label><span className="mb-1.5 block font-montserrat text-[9px] text-[#80755F]">Display label (optional)</span><input value={form.regularPriceLabel ?? ""} onChange={(event) => update("regularPriceLabel", event.target.value || undefined)} className="min-h-10 w-full rounded-lg border border-[#80755F]/20 bg-white px-3 font-montserrat text-xs" placeholder="e.g. ₱250–₱450 / unit" /></label>
                    </div>
                  </div>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Discount label</span><input value={form.discountLabel ?? ""} onChange={(event) => update("discountLabel", event.target.value || undefined)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" placeholder="e.g. UP TO 40% OFF" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Savings text</span><input value={form.savings ?? ""} onChange={(event) => update("savings", event.target.value || undefined)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" placeholder="e.g. Save ₱17,010" /></label>
                </div>
              </section>

              <section className="space-y-4 border-t border-[#80755F]/15 pt-6">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">Offer information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Description</span><textarea rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} className="w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Package / sessions</span><input value={form.sessions ?? ""} onChange={(event) => update("sessions", event.target.value || undefined)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                  <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Bonus / free inclusions summary</span><input value={form.bonusText ?? ""} onChange={(event) => update("bonusText", event.target.value || undefined)} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                  <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Recommended for (one per line)</span><textarea rows={3} value={lines(form.recommendedFor ?? [])} onChange={(event) => update("recommendedFor", parseLines(event.target.value))} className="w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
                  <label className="block md:col-span-2"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Inclusions (one per line)</span><textarea required rows={4} value={lines(form.inclusions)} onChange={(event) => update("inclusions", parseLines(event.target.value))} className="w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
                </div>
              </section>

<section className="space-y-4 border-t border-[#80755F]/15 pt-6">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">Validity & conditions</h3>
                <label className="block max-w-md"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Valid until</span><input type="date" value={form.validUntil ?? ""} onChange={(event) => {
                  const value = event.target.value || undefined;
                  update("validUntil", value);
                  update("validity", value ? `Valid until ${new Date(value + "T12:00:00").toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}.` : undefined);
                }} className="min-h-11 w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 font-montserrat text-xs" /></label>
                <label className="block"><span className="mb-1.5 block font-montserrat text-[9px] font-semibold uppercase text-[#80755F]">Terms and conditions (one per line)</span><textarea rows={3} value={lines(form.terms ?? [])} onChange={(event) => update("terms", parseLines(event.target.value))} className="w-full rounded-xl border border-[#80755F]/20 bg-[#FFFCF3] px-3 py-3 font-montserrat text-xs leading-6" /></label>
              </section>

              <section className="space-y-4 border-t border-[#80755F]/15 pt-6">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">Promotion image</h3>
                <div className="rounded-2xl border border-dashed border-[#80755F]/25 bg-[#F5F1E7] p-4">{imagePreview && <div className="relative mt-1 h-36 w-36 overflow-hidden rounded-xl">{imagePreview.startsWith("/") ? <Image src={imagePreview} alt="Promotion preview" fill sizes="144px" className="object-cover" /> : <Image src={imagePreview} alt="Promotion preview" fill sizes="144px" className="object-cover" unoptimized />}</div>}<input type="file" accept="image/*" onChange={handleImage} className="mt-3 block w-full font-montserrat text-[10px] text-[#80755F] file:mr-3 file:rounded-full file:border-0 file:bg-[#4C5534] file:px-4 file:py-2 file:font-montserrat file:text-[9px] file:font-semibold file:text-white" /></div>
              </section>

              <div className="flex justify-end border-t border-[#80755F]/15 pt-5"><button type="submit" className="min-h-11 rounded-full bg-[#4C5534] px-6 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white">{editingId ? "Save changes" : "Add promotion"}</button></div>
            </form>
          </section>
  ) : null;

  const previewPromos = useMemo(() => {
    if (!formOpen) return promos;
    const previewItem: PromoCard = {
      ...form,
      id: editingId ?? "admin-promotion-preview",
      title: form.title || "Your promotion title",
      categoryLabel: form.categoryLabel || categories.find((item) => item.value === form.category)?.label || "Category",
      badge: form.badge || "BEReady Holiday Deal",
      subtitle: form.subtitle || "Your promotion subtitle",
      description: form.description || "Your offer description will appear here.",
      inclusions: form.inclusions?.length ? form.inclusions : ["Your offer inclusions will appear here."],
      image: imagePreview || form.image || "/images/promotions/promo1.png",
    };
    return editingId
      ? promos.map((item) => item.id === editingId ? previewItem : item)
      : [...promos, previewItem];
  }, [promos, formOpen, form, editingId, imagePreview]);

  

  return (
    <>
      <style jsx>{`
        @keyframes promoFormReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .promo-form-reveal { animation: promoFormReveal 220ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .promo-form-reveal { animation: none; } }
      `}</style>
    <main className="min-h-screen bg-[#FFFCF3] text-[#4C5534]">
      <header className="border-b border-[#80755F]/15 bg-white px-6 py-7 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">Website management</p>
            <h1 className="mt-2 font-seasons text-[clamp(2.2rem,4vw,3.2rem)] leading-none text-[#4C5534]">Promotions</h1>
          </div>
          <div className="flex flex-wrap gap-5">
            <div><p className="font-seasons text-2xl text-[#4C5534]">{promos.length}</p><p className="font-montserrat text-[8px] font-semibold uppercase tracking-wide text-[#80755F]">Offers</p></div>
            <div><p className="font-seasons text-2xl text-[#4C5534]">{activeCount}</p><p className="font-montserrat text-[8px] font-semibold uppercase tracking-wide text-[#80755F]">Active</p></div>
            <div><p className="font-seasons text-2xl text-[#4C5534]">{expiredCount}</p><p className="font-montserrat text-[8px] font-semibold uppercase tracking-wide text-[#80755F]">Expired</p></div>
          </div>
        </div>
      </header>
      <div className="border-b border-[#80755F]/15 bg-[#F5F1E7] px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
          <span className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">Editing Promotions page</span>
          <button type="button" onClick={openNew} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#4C5534] px-4 font-montserrat text-[9px] font-semibold uppercase text-white"><Icon><path d="M12 5v14M5 12h14" /></Icon> Add promotion</button>
        </div>
      </div>
      <PromoCampaignHero campaign={campaign} editable onChange={setCampaign} onSave={() => setNotice("Hero changes saved in this editing session. Permanent saving will be enabled with the backend.")} />
      {formOpen && promotionForm && <div className="mx-auto max-w-[1180px] px-6 py-6 md:px-10">{promotionForm}</div>}
      <PromosList
        promos={previewPromos}
        pricingTables={pricingTables}
        adminMode
        onEditPromo={edit}
        onTogglePromo={toggleActive}
        onRemovePromo={setPendingDelete}
        onPricingTablesChange={setPricingTables}
      />
      <div className="mx-auto max-w-[1180px] px-6 pb-12 md:px-10"><div className="flex justify-end"><button type="button" onClick={() => setNotice("Campaign changes are currently held in this editing session. Persistent publishing will be connected to the backend.")} className="min-h-10 rounded-full border border-[#4C5534]/25 px-5 font-montserrat text-[9px] font-semibold uppercase text-[#4C5534]">Save changes</button></div></div>
      {pendingDelete && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172119]/55 px-5 py-8 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDelete(null); }}><section role="alertdialog" aria-modal="true" aria-labelledby="delete-promo-title" className="w-full max-w-[440px] rounded-[24px] border border-[#4C5534]/10 bg-[#FFFCF3] p-6 shadow-2xl"><p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A5148]">Remove promotion</p><h2 id="delete-promo-title" className="font-seasons mt-2 text-2xl">Are you sure?</h2><p className="mt-3 font-montserrat text-xs leading-6 text-[#80755F]">Remove <strong>{pendingDelete.title}</strong> from this editing session?</p><div className="mt-7 flex justify-end gap-2"><button type="button" onClick={() => setPendingDelete(null)} className="min-h-11 rounded-full border border-[#4C5534]/20 px-5 font-montserrat text-[9px] font-semibold uppercase">Cancel</button><button type="button" onClick={confirmDelete} className="min-h-11 rounded-full bg-[#8A5148] px-5 font-montserrat text-[9px] font-semibold uppercase text-white">Remove</button></div></section></div>}
      {notice && <div role="status" className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl border border-[#4C5534]/10 bg-white px-5 py-4 font-montserrat text-[10px] leading-5 text-[#4F6442] shadow-xl">{notice}</div>}
    </main>
    </>
  );
}
