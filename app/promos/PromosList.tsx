"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BookingTrigger from "@/components/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/Icons";
import type { PromoCard, PricingTable } from "@/types/promo";

// ---------------------------------------------------------------------------
// Category filter config
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: "all", label: "All Promos & Deals" },
  { id: "contour", label: "Ultraformer MPT & Slimming" },
  { id: "injectables", label: "JuveTox, Luhilo & Botox" },
  { id: "launch", label: "Grand Launch & Summer Offers" },
  { id: "facials", label: "Medical Peels & 5+1 Facials" },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface PromosListProps {
  promos: PromoCard[];
  pricingTables: PricingTable[];
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
  if (typeof card.promoPrice === "number") return formatPrice(card.promoPrice);
  return card.promoPriceLabel;
}

function getRegularPriceLabel(card: PromoCard): string | undefined {
  if (typeof card.regularPrice === "number") return formatPrice(card.regularPrice);
  return card.regularPriceLabel;
}

// ---------------------------------------------------------------------------
// Promo Detail Modal
// ---------------------------------------------------------------------------
function PromoModal({
  card,
  onClose,
}: {
  card: PromoCard;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // Lock body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      {/* Panel — stop click propagation so clicks inside don't close */}
      <div
        className="relative flex max-h-[92dvh] w-full max-w-[680px] flex-col overflow-hidden rounded-t-[28px] bg-[#FFFCF3] shadow-2xl sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-64">
          <Image
            src={card.image}
            alt={card.title}
            fill
            quality={90}
            sizes="680px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges on image */}
          <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3.5 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow">
            {card.badge}
          </span>
          {card.savings && (
            <span className="absolute right-4 top-4 rounded-full bg-[#4f6442] px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow">
              {card.savings}
            </span>
          )}

          {/* Title over image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {card.categoryLabel}
            </p>
            <h2 className="font-seasons mt-1 text-2xl leading-tight text-white sm:text-3xl">
              {card.title}
            </h2>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {/* Subtitle */}
          <p className="font-montserrat text-xs font-semibold text-[#4f6442]">
            {card.subtitle}
          </p>

          {/* Description */}
          <p className="mt-3 font-montserrat text-sm leading-7 text-[#80755F]">
            {card.description}
          </p>

          {/* Pricing details — render only the values supplied by the promo data. */}
          {(getPromoPriceLabel(card) || getRegularPriceLabel(card) || card.bonusText) && (
            <div className="mt-5 rounded-2xl border border-[#80755F]/15 bg-white p-5 font-montserrat">
              {getPromoPriceLabel(card) && (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#80755F]">
                    Promo Rate
                  </span>
                  <span className="text-right text-xl font-semibold text-[#4C5534]">
                    {getPromoPriceLabel(card)}
                  </span>
                </div>
              )}
              {getRegularPriceLabel(card) && (
                <div className="mt-2 flex items-baseline justify-between gap-3 text-xs text-[#80755F]">
                  <span>Regular Rate</span>
                  <span className="text-right">{getRegularPriceLabel(card)}</span>
                </div>
              )}
              {card.bonusText && (
                <div className="mt-3 rounded-xl bg-[#4f6442]/10 px-4 py-2.5 text-xs font-semibold text-[#4f6442]">
                  {card.bonusText}
                </div>
              )}
            </div>
          )}

          {/* Recommended For */}
          {card.recommendedFor && card.recommendedFor.length > 0 && (
            <div className="mt-5">
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                Recommended For
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {card.recommendedFor.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 font-montserrat text-xs text-[#4C5534]"
                  >
                    <span className="mt-0.5 text-[#4f6442]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inclusions */}
          <div className="mt-5">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
              What&apos;s Included
            </p>
            <ul className="mt-3 space-y-2.5">
              {card.inclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 font-montserrat text-xs text-[#4C5534]"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f6442]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <BookingTrigger
            initialTreatment={card.title}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white transition-all hover:bg-[#35452F]"
          >
            Avail This Promo <ArrowUpRightIcon className="h-4 w-4" />
          </BookingTrigger>

          {/* bottom breathing room for mobile */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Clean Promo Card (minimal — click to open modal)
// ---------------------------------------------------------------------------
function PromoCardItem({
  card,
  onClick,
}: {
  card: PromoCard;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex w-full flex-col overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white text-left shadow-[0_8px_24px_-20px_rgba(30,58,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4C5534] focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E7E1D7]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          quality={85}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow">
          {card.badge}
        </span>

        {/* Savings chip */}
        {card.savings && (
          <span className="absolute right-4 top-4 rounded-full bg-[#4f6442] px-3 py-1 font-montserrat text-[10px] font-semibold text-white shadow">
            {card.savings}
          </span>
        )}
      </div>

      {/* Card footer — always visible */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
          {card.categoryLabel}
        </p>
        <h3 className="font-seasons mt-1.5 text-xl leading-snug text-[#4C5534]">
          {card.title}
        </h3>

        {/* Price row */}
        <div className="mt-auto flex items-baseline justify-between gap-3 pt-4">
          <span className="font-montserrat text-base font-semibold text-[#4C5534]">
            {getPromoPriceLabel(card) ?? "Explore offer"}
          </span>
          {getRegularPriceLabel(card) && (
            <span className="font-montserrat text-xs text-[#80755F]">
              {getRegularPriceLabel(card)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5 font-montserrat text-[11px] font-semibold text-[#4f6442]">
          View full details
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Pricing Table
// ---------------------------------------------------------------------------
function PricingTableBlock({ table }: { table: PricingTable }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-sm">
      <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
        <h3 className="font-seasons text-xl">{table.title}</h3>
        <p className="font-montserrat text-xs text-white/80">{table.subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-montserrat text-xs">
          <thead className="border-b border-[#80755F]/15 bg-[#FFFCF3] text-[10px] uppercase tracking-wider text-[#80755F]">
            <tr>
              <th className="px-6 py-3.5">Treatment</th>
              <th className="px-6 py-3.5">Regular</th>
              <th className="px-6 py-3.5">Promo Single</th>
              <th className="px-6 py-3.5">{table.packageType} Package</th>
              <th className="px-6 py-3.5">Effective / Session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#80755F]/10">
            {table.rows.map((row) => (
              <tr key={row.name}>
                <td className="px-6 py-4 font-semibold text-[#4C5534]">{row.name}</td>
                <td className="px-6 py-4 text-[#80755F]">{formatPrice(row.regular)}</td>
                <td className="px-6 py-4 font-medium text-[#4C5534]">{formatPrice(row.promo)}</td>
                <td className="px-6 py-4 font-semibold text-[#4C5534]">{formatPrice(row.package)}</td>
                <td className="px-6 py-4 font-semibold text-[#4f6442]">{formatPrice(row.effective)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main exported client component
// ---------------------------------------------------------------------------
export default function PromosList({ promos, pricingTables }: PromosListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTableTab, setActiveTableTab] = useState<"facials" | "drips">("facials");
  const [selectedPromo, setSelectedPromo] = useState<PromoCard | null>(null);

  const closeModal = useCallback(() => setSelectedPromo(null), []);

  const filteredPromos =
    activeCategory === "all"
      ? promos
      : promos.filter((p) => p.category === activeCategory);

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
                  onClick={() => setActiveCategory(cat.id)}
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
            {filteredPromos.map((card) => (
              <PromoCardItem
                key={card.id}
                card={card}
                onClick={() => setSelectedPromo(card)}
              />
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
                <PricingTableBlock key={table.id} table={table} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Detail Modal ───────────────────────────────────────────── */}
      {selectedPromo && (
        <PromoModal card={selectedPromo} onClose={closeModal} />
      )}
    </>
  );
}
