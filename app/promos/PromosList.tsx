"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BookingTrigger from "@/components/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/Icons";
import type { PromoCard, PricingTable } from "@/types/promo";

// ---------------------------------------------------------------------------
// Category filter config
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: "all", label: "All Promos & Deals" },
  { id: "facials", label: "Facials & Skin" },
  { id: "laser", label: "Laser Treatments" },
  { id: "injectables", label: "Injectables" },
  { id: "contour", label: "Lifting & Contouring" },
  { id: "wellness", label: "Wellness" },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface PromosListProps {
  promos: PromoCard[];
  pricingTables: PricingTable[];
  adminMode?: boolean;
  onEditPromo?: (promo: PromoCard) => void;
  onTogglePromo?: (promo: PromoCard) => void;
  onRemovePromo?: (promo: PromoCard) => void;
  onPricingTablesChange?: (tables: PricingTable[]) => void;
}

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

function formatPrice(value: number): string {
  return pesoFormatter.format(value);
}

function getPromoPriceLabel(card: PromoCard): string | undefined {
  if (card.promoPriceLabel) return card.promoPriceLabel;
  if (typeof card.promoPrice === "number") return formatPrice(card.promoPrice);
  return undefined;
}

function getRegularPriceLabel(card: PromoCard): string | undefined {
  if (card.regularPriceLabel) return card.regularPriceLabel;
  if (typeof card.regularPrice === "number") return formatPrice(card.regularPrice);
  return undefined;
}

function CampaignBadge({ label }: { label: string }) {
  if (label !== "BEReady Holiday Deal") return label;

  return (
    <>
      <span className="font-extrabold tracking-[0.14em]">BER</span>
      <span className="font-semibold">eady Holiday Deal</span>
    </>
  );
}

// ---------------------------------------------------------------------------
// Promo Detail Modal
// ---------------------------------------------------------------------------
export function PromoModal({
  card,
  onClose,
}: {
  card: PromoCard;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const discountLabel =
    typeof card.promoPrice === "number" &&
    typeof card.regularPrice === "number" &&
    card.regularPrice > 0
      ? `${Math.round((1 - card.promoPrice / card.regularPrice) * 100)}% OFF`
      : card.discountLabel;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#25291f]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-detail-title"
    >
      <div
        className="flex max-h-[92dvh] w-full max-w-[700px] flex-col overflow-hidden rounded-t-[24px] border border-[#80755F]/20 bg-[#FFFCF3] shadow-2xl sm:rounded-[24px]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-5 border-b border-[#80755F]/20 px-6 py-6 sm:px-8">
          <div className="min-w-0">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
              {card.categoryLabel}
            </p>
            <h2 id="promo-detail-title" className="font-seasons mt-2 text-2xl leading-tight text-[#4C5534] sm:text-3xl">
              {card.title}
            </h2>
            <p className="mt-2 font-montserrat text-sm leading-6 text-[#4f6442]">
              {card.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close promo details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#80755F]/25 text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <section aria-label="Promotion pricing" className="rounded-2xl border border-[#4f6442]/20 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                Special promotional price
              </span>
              {discountLabel && (
                <span className="rounded-full bg-[#4C5534] px-3 py-1.5 font-montserrat text-[10px] font-bold tracking-[0.08em] text-white">
                  {discountLabel}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="font-seasons text-4xl leading-none text-[#4C5534] sm:text-5xl">
                {getPromoPriceLabel(card) ?? "Price upon inquiry"}
              </span>
              {getRegularPriceLabel(card) && (
                <span className="pb-1 font-montserrat text-sm text-[#80755F] line-through">
                  {getRegularPriceLabel(card)}
                </span>
              )}
            </div>
            {card.savings && (
              <p className="mt-3 font-montserrat text-xs font-semibold text-[#4f6442]">
                {card.savings}
              </p>
            )}
            {card.bonusText && (
              <p className="mt-2 font-montserrat text-xs leading-5 text-[#80755F]">
                {card.bonusText}
              </p>
            )}
          </section>

          <section className="mt-6">
            <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
              About this offer
            </h3>
            <p className="mt-2 font-montserrat text-sm leading-7 text-[#4C5534]">
              {card.description}
            </p>
          </section>

          <div className="mt-6 grid gap-4 border-y border-[#80755F]/15 py-5 sm:grid-cols-2">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                Package / sessions
              </p>
              <p className="mt-2 font-montserrat text-xs leading-6 text-[#4C5534]">
                {card.sessions ?? "As specified in the treatment inclusions"}
              </p>
            </div>
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                Offer validity
              </p>
              <p className="mt-2 font-montserrat text-xs leading-6 text-[#4C5534]">
                {card.validity ?? (card.validUntil ? `Until ${card.validUntil}` : "While the offer is active")}
              </p>
            </div>
          </div>

          {card.recommendedFor && card.recommendedFor.length > 0 && (
            <section className="mt-6">
              <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                Recommended for
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {card.recommendedFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-montserrat text-xs leading-5 text-[#4C5534]">
                    <span className="mt-0.5 text-[#4f6442]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-6">
            <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
              Inclusions
            </h3>
            <ul className="mt-3 space-y-3">
              {card.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 font-montserrat text-xs leading-6 text-[#4C5534]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f6442]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {card.terms && card.terms.length > 0 && (
            <section className="mt-6 border-t border-[#80755F]/15 pt-5">
              <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                Terms and conditions
              </h3>
              <ul className="mt-3 space-y-2">
                {card.terms.map((term, idx) => (
                  <li key={idx} className="font-montserrat text-xs leading-6 text-[#80755F]">
                    {idx + 1}. {term}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <BookingTrigger
            initialTreatment={card.title}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4C5534]"
          >
            Avail This Promo <ArrowUpRightIcon className="h-4 w-4" />
          </BookingTrigger>
          <p className="mt-3 text-center font-montserrat text-[10px] leading-5 text-[#80755F]">
            Final eligibility, treatment plan, availability, and applicable terms are confirmed by the clinic.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Promo card — prominent discount and pricing, no hover-dependent content
// ---------------------------------------------------------------------------
export function PromoCardItem({
  card,
  onClick,
}: {
  card: PromoCard;
  onClick: () => void;
}) {
  const discountLabel =
    typeof card.promoPrice === "number" &&
    typeof card.regularPrice === "number" &&
    card.regularPrice > 0
      ? `${Math.round((1 - card.promoPrice / card.regularPrice) * 100)}% OFF`
      : card.discountLabel;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${card.title} details`}
      className="flex w-full flex-col overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white text-left shadow-[0_8px_24px_-20px_rgba(30,58,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4C5534] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E7E1D7]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          quality={85}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3 py-1.5 font-montserrat text-[10px] tracking-[0.06em] text-white">
          <CampaignBadge label={card.badge} />
        </span>
        {discountLabel && (
          <span className="absolute right-4 top-4 rounded-full bg-[#F4E9D7] px-3 py-1.5 font-montserrat text-[10px] font-bold tracking-[0.06em] text-[#4C5534]">
            {discountLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
          {card.categoryLabel}
        </p>
        <h3 className="font-seasons mt-1.5 text-xl leading-snug text-[#4C5534]">
          {card.title}
        </h3>

        <div className="mt-auto pt-5">
          <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
            Promo price
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-seasons text-3xl leading-none text-[#4C5534]">
              {getPromoPriceLabel(card) ?? "Price upon inquiry"}
            </span>
            {getRegularPriceLabel(card) && (
              <span className="font-montserrat text-xs text-[#80755F] line-through">
                {getRegularPriceLabel(card)}
              </span>
            )}
          </div>
          {card.savings && (
            <p className="mt-2 font-montserrat text-[11px] font-semibold text-[#4f6442]">
              {card.savings}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#80755F]/15 pt-3">
          <span className="font-montserrat text-[11px] font-semibold text-[#4f6442]">
            View full details
          </span>
          <ArrowUpRightIcon className="h-4 w-4 text-[#4f6442]" />
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Pricing Table
// ---------------------------------------------------------------------------
export function PricingTableBlock({
  table,
  adminMode = false,
  onSave,
  onRemove,
  onAddRow,
  onRemoveRow,
}: {
  table: PricingTable;
  adminMode?: boolean;
  onSave?: (table: PricingTable) => void;
  onRemove?: () => void;
  onAddRow?: () => void;
  onRemoveRow?: (index: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(table);
  const [confirmPackageDelete, setConfirmPackageDelete] = useState(false);
  const [rowToRemove, setRowToRemove] = useState<number | null>(null);

  useEffect(() => setDraft(table), [table]);

  function updateRow(index: number, key: keyof PricingTable["rows"][number], value: string) {
    const numeric = key !== "name";
    setDraft((current) => ({
      ...current,
      rows: current.rows.map((row, rowIndex) => rowIndex === index
        ? { ...row, [key]: numeric ? (value === "" ? 0 : Number(value)) : value }
        : row),
    }));
  }

  function cancelEdit() {
    setDraft(table);
    setEditing(false);
  }

  function saveEdit() {
    onSave?.(draft);
    setEditing(false);
  }

  return (
    <div className={`overflow-hidden rounded-[20px] border border-[#80755F]/20 ${adminMode ? "bg-[#F8F4EB]" : "bg-white"} shadow-sm`}>
      <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
        {adminMode && editing
          ? <input aria-label="Package table title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} className="w-full rounded-md border border-white/25 bg-white/10 px-2 py-1 font-seasons text-xl text-white outline-none" />
          : <h3 className="font-seasons text-xl">{table.title}</h3>}
        {adminMode && editing
          ? <input aria-label="Package table subtitle" value={draft.subtitle} onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))} className="mt-2 w-full rounded-md border border-white/20 bg-white/10 px-2 py-1 font-montserrat text-xs text-white outline-none" />
          : <p className="font-montserrat text-xs text-white/80">{table.subtitle}</p>}
        {adminMode && (
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            {editing ? <>
              <button type="button" onClick={cancelEdit} className="rounded-full border border-white/35 px-4 py-2 font-montserrat text-[8px] font-bold uppercase text-white/90 hover:bg-white/10">Cancel</button>
              <button type="button" onClick={saveEdit} className="rounded-full bg-[#D8C39A] px-4 py-2 font-montserrat text-[8px] font-bold uppercase text-[#3F4B32] hover:bg-[#E5D5B5]">Save changes</button>
            </> : <>
              <button type="button" onClick={() => setEditing(true)} className="rounded-full border border-white/35 px-4 py-2 font-montserrat text-[8px] font-bold uppercase text-white/90 hover:bg-white/10">Edit package</button>
              {onRemove && <button type="button" onClick={() => setConfirmPackageDelete(true)} className="rounded-full border border-[#E8B9A9]/60 px-4 py-2 font-montserrat text-[8px] font-bold uppercase text-[#FFE0D6] hover:bg-white/10">Delete package</button>}
            </>}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-montserrat text-xs">
          <thead className="border-b border-[#80755F]/15 bg-[#E8EEE3] text-[10px] uppercase tracking-wider text-[#4C5534]">
            <tr>
              <th className="px-6 py-3.5">Treatment</th>
              <th className="px-6 py-3.5">Regular</th>
              <th className="px-6 py-3.5">Promo Single</th>
              <th className="px-6 py-3.5">{table.packageType} Package</th>
              <th className="px-6 py-3.5">Effective / Session</th>
              {adminMode && editing && <th className="px-4 py-3.5">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#80755F]/10">
            {(editing ? draft.rows : table.rows).map((row, index) => (
              <tr key={`${row.name}-${index}`} className={index % 2 === 0 ? "bg-[#FBF8F1]" : "bg-[#F3F0E6]"}>
                <td className="px-6 py-4 font-semibold text-[#4C5534]">{adminMode && editing ? <input aria-label="Treatment name" type="text" value={row.name} onChange={(event) => updateRow(index, "name", event.target.value)} className="w-full min-w-[110px] rounded-md border border-[#80755F]/20 bg-white px-2 py-1.5 text-xs text-[#4C5534]" /> : row.name}</td>
                <td className="px-6 py-4 text-[#80755F]">{adminMode && editing ? <input aria-label="Regular price" type="number" min={0} step="0.01" value={row.regular} onChange={(event) => updateRow(index, "regular", event.target.value)} className="w-full min-w-[90px] rounded-md border border-[#80755F]/20 bg-white px-2 py-1.5 text-xs text-[#4C5534]" /> : formatPrice(row.regular)}</td>
                <td className="px-6 py-4 font-medium text-[#4C5534]">{adminMode && editing ? <input aria-label="Promo single price" type="number" min={0} step="0.01" value={row.promo} onChange={(event) => updateRow(index, "promo", event.target.value)} className="w-full min-w-[90px] rounded-md border border-[#80755F]/20 bg-white px-2 py-1.5 text-xs text-[#4C5534]" /> : formatPrice(row.promo)}</td>
                <td className="px-6 py-4 font-semibold text-[#4C5534]">{adminMode && editing ? <input aria-label="Package price" type="number" min={0} step="0.01" value={row.package} onChange={(event) => updateRow(index, "package", event.target.value)} className="w-full min-w-[90px] rounded-md border border-[#80755F]/20 bg-white px-2 py-1.5 text-xs text-[#4C5534]" /> : formatPrice(row.package)}</td>
                <td className="px-6 py-4 font-semibold text-[#4f6442]">{adminMode && editing ? <input aria-label="Effective price per session" type="number" min={0} step="0.01" value={row.effective} onChange={(event) => updateRow(index, "effective", event.target.value)} className="w-full min-w-[90px] rounded-md border border-[#80755F]/20 bg-white px-2 py-1.5 text-xs text-[#4C5534]" /> : formatPrice(row.effective)}</td>
                {adminMode && editing && <td className="px-4 py-4"><button type="button" onClick={() => setRowToRemove(index)} className="font-montserrat text-[8px] font-bold uppercase text-[#8A5148]">Remove row</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {adminMode && editing && <div className="flex justify-end border-t border-[#80755F]/15 bg-[#E8EEE3]/50 px-5 py-3"><button type="button" onClick={() => onAddRow?.()} className="rounded-full border border-[#4C5534]/25 bg-white px-4 py-2 font-montserrat text-[8px] font-bold uppercase text-[#4C5534] hover:bg-[#F5F1E7]">+ Add treatment row</button></div>}
      {(confirmPackageDelete || rowToRemove !== null) && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#25291f]/50 px-5 py-6 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setConfirmPackageDelete(false); setRowToRemove(null); } }}>
          <section role="alertdialog" aria-modal="true" aria-labelledby="package-delete-title" className="w-full max-w-[400px] rounded-[22px] border border-[#80755F]/20 bg-[#FFFCF3] p-6 shadow-2xl">
            <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A6653]">Confirm removal</p>
            <h3 id="package-delete-title" className="mt-2 font-seasons text-2xl text-[#4C5534]">{confirmPackageDelete ? "Delete this package?" : "Remove this treatment row?"}</h3>
            <p className="mt-2 font-montserrat text-xs leading-6 text-[#80755F]">{confirmPackageDelete ? "This package will be removed from the current editing session." : "This treatment row will be removed from the package draft."}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => { setConfirmPackageDelete(false); setRowToRemove(null); }} className="min-h-10 rounded-full border border-[#4C5534]/20 px-4 font-montserrat text-[9px] font-semibold uppercase text-[#4C5534]">Cancel</button>
              <button type="button" onClick={() => { if (confirmPackageDelete) onRemove?.(); else if (rowToRemove !== null) onRemoveRow?.(rowToRemove); setConfirmPackageDelete(false); setRowToRemove(null); }} className="min-h-10 rounded-full bg-[#8A5148] px-4 font-montserrat text-[9px] font-semibold uppercase text-white">Confirm delete</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
// ---------------------------------------------------------------------------
// Main exported client component
// ---------------------------------------------------------------------------
export default function PromosList({ promos, pricingTables, adminMode = false, onEditPromo, onTogglePromo, onRemovePromo, onPricingTablesChange }: PromosListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTableTab, setActiveTableTab] = useState<"facials" | "drips">("facials");
  const [showAllPromos, setShowAllPromos] = useState(false);
  const [adminSelectedPromo, setAdminSelectedPromo] = useState<PromoCard | null>(null);
  const selectedPromo = adminMode ? adminSelectedPromo : promos.find((promo) => promo.id === searchParams.get("offer")) ?? null;

  const openModal = useCallback((promo: PromoCard) => {
    if (adminMode) {
      setAdminSelectedPromo(promo);
      return;
    }
    router.replace(`/promos?offer=${encodeURIComponent(promo.id)}`, { scroll: false });
  }, [adminMode, router]);

  const closeModal = useCallback(() => {
    if (searchParams.has("offer")) {
      router.replace("/promos", { scroll: false });
    }
  }, [router, searchParams]);

  const filteredPromos =
    activeCategory === "all"
      ? promos
      : promos.filter((p) => p.category === activeCategory);
  const visiblePromos = showAllPromos ? filteredPromos : filteredPromos.slice(0, 6);
  const hasMorePromos = filteredPromos.length > 6;

  const facialTables = pricingTables.filter((t) =>
    ["premium-facials", "elite-facials"].includes(t.id)
  );
  const dripTables = pricingTables.filter((t) =>
    ["hero-drips", "divine-drips"].includes(t.id)
  );

  return (
    <>
      {/* ── Category Filter & Cards ────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
        {/* Filter Buttons */}
        <div className="mb-10">
          <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
            Filter by category
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAllPromos(false);
                  }}
                  className={`inline-flex min-h-11 items-center rounded-full border px-5 font-montserrat text-xs font-semibold transition-all ${
                    isActive
                      ? "border-[#4C5534] bg-[#4C5534] text-white shadow-sm"
                      : "border-[#80755F]/30 bg-transparent text-[#4C5534] hover:border-[#4C5534]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-[#80755F]/15 pb-5">
          <div>
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </p>
            <h2 className="font-seasons mt-2 text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[#4C5534]">
              Active Offers ({filteredPromos.length})
            </h2>
          </div>
          <p className="font-montserrat text-xs text-[#80755F]">
            Tap a card to see full details
          </p>
        </div>

        {/* Cards Grid */}
        {filteredPromos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePromos.map((card) => (
              <div key={card.id} className="relative">
                <PromoCardItem card={card} onClick={() => openModal(card)} />
                {adminMode && <div className="absolute bottom-[4.5rem] right-3 z-10 flex flex-wrap gap-1.5">
                  {onEditPromo && <button type="button" onClick={() => onEditPromo(card)} className="rounded-full border border-[#4C5534]/20 bg-[#FFFCF3] px-3 py-2 font-montserrat text-[8px] font-bold uppercase text-[#4C5534] shadow-sm">Edit details</button>}
                  {onTogglePromo && <button type="button" onClick={() => onTogglePromo(card)} className="rounded-full border border-[#4C5534]/20 bg-[#FFFCF3] px-3 py-2 font-montserrat text-[8px] font-bold uppercase text-[#4C5534] shadow-sm">{card.isActive === false ? "Activate" : "Deactivate"}</button>}
                  {onRemovePromo && <button type="button" onClick={() => onRemovePromo(card)} className="rounded-full border border-[#8A5148]/20 bg-[#FFFCF3] px-3 py-2 font-montserrat text-[8px] font-bold uppercase text-[#8A5148] shadow-sm">Remove</button>}
                </div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-seasons text-2xl text-[#4C5534]">
              No active promos in this category
            </p>
            <p className="mt-2 font-montserrat text-sm text-[#80755F]">
              Check back soon or browse all deals.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-6 rounded-full bg-[#4C5534] px-6 py-3 font-montserrat text-xs font-semibold text-white hover:bg-[#35452F]"
            >
              View All Promos
            </button>
          </div>
        )}

        {hasMorePromos && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllPromos((current) => !current)}
              aria-expanded={showAllPromos}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#4C5534]/35 bg-transparent px-7 font-montserrat text-xs font-semibold text-[#4C5534] transition-colors hover:bg-[#4C5534] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4C5534]"
            >
              {showAllPromos ? "Show Less" : `Show More (${filteredPromos.length - visiblePromos.length})`}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${showAllPromos ? "rotate-180" : "group-hover:translate-y-0.5"}`}
              >
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* ── Pricing Tables ─────────────────────────────────────────── */}
      <section className="border-t border-[#80755F]/15 bg-[#F9F5EC] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[750px] text-center">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#80755F]">
              Package Value Breakdown
            </p>
            <h2 className="font-seasons mt-3 text-[clamp(2.4rem,4.5vw,3.8rem)] leading-tight text-[#4C5534]">
              Official Treatment Packages
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#80755F]">
              Enjoy substantial savings with our structured treatment passes. Buy
              5 get 1 free on facials, or buy 10 get 2 free on hero wellness drips.
            </p>

            {/* Tab switcher */}
            <div className="mt-6 inline-flex rounded-full border border-[#80755F]/20 bg-white p-1">
              {(["facials", "drips"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTableTab(tab)}
                  className={`rounded-full px-6 py-2.5 font-montserrat text-xs font-semibold ${
                    activeTableTab === tab
                      ? "bg-[#4C5534] text-white shadow-sm"
                      : "text-[#4C5534]"
                  }`}
                >
                  {tab === "facials" ? "Facial Packages (5 + 1)" : "Aesthera Drips (10 + 2 & 5 + 1)"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-8">
            {(activeTableTab === "facials" ? facialTables : dripTables).map(
              (table) => (
                <PricingTableBlock key={table.id} table={table} adminMode={adminMode} onChange={onPricingTablesChange ? (nextTable) => onPricingTablesChange(pricingTables.map((item) => item.id === nextTable.id ? nextTable : item)) : undefined} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Detail Modal ───────────────────────────────────────────── */}
      {selectedPromo && (
        <PromoModal card={selectedPromo} onClose={() => adminMode ? setAdminSelectedPromo(null) : closeModal()} />
      )}
    </>
  );
}
