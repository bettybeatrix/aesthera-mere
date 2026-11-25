"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PromoModal } from "@/app/promos/PromosList";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { PROMOTIONS } from "@/lib/promos";

const offers = PROMOTIONS;

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

function promoPrice(offer: (typeof PROMOTIONS)[number]) {
  return offer.promoPriceLabel ??
    (typeof offer.promoPrice === "number" ? pesoFormatter.format(offer.promoPrice) : "Inquire for price");
}

function regularPrice(offer: (typeof PROMOTIONS)[number]) {
  return offer.regularPriceLabel ??
    (typeof offer.regularPrice === "number" ? pesoFormatter.format(offer.regularPrice) : undefined);
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

export default function Promos() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedOffer, setSelectedOffer] = useState<(typeof PROMOTIONS)[number] | null>(null);

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 24;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
    <section id="promos" aria-labelledby="promos-heading" className="relative isolate overflow-hidden bg-[#FFFCF3] px-6 py-10 md:px-10 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFFCF3] to-transparent" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-[700px]">
            <p className="mb-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">Limited-time offers</p>
            <h2 id="promos-heading" className="font-seasons text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.08] text-[#4C5534]">Our Promotions</h2>
            <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F]">Explore our current treatment offers. Final eligibility, inclusions, and validity are confirmed during consultation.</p>
          </div>
          <div className="w-full md:w-auto md:text-right">
            <p className="mb-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
              {offers.length} current offers
            </p>
            <Link href="/promos" className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#4C5534] px-6 font-montserrat text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_28px_-18px_rgba(30,58,42,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#35452F] hover:shadow-[0_18px_34px_-18px_rgba(30,58,42,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534] md:w-auto">
              View All Promos &amp; Packages
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1"><ChevronRightIcon className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 sm:gap-4">
          <button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous promotion" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4C5534]/30 bg-white text-[#4C5534] transition-colors hover:bg-[#4C5534] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div ref={carouselRef} role="region" aria-label="Current promotions" className="flex min-w-0 items-stretch snap-x snap-mandatory gap-5 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group flex w-[92%] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-[0_12px_30px_-22px_rgba(30,58,42,0.35)] sm:w-[68%] lg:w-[31.5%]"
            >
              {/* Promotion image */}
              <div className="relative aspect-[5/4] shrink-0 overflow-hidden bg-[#E7E1D7]">
                <Image
                  src={offer.image}
                  alt={`${offer.title} holiday promotion`}
                  fill
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#4C5534] px-3 py-1.5 font-montserrat text-[10px] tracking-[0.06em] text-white">
                  <CampaignBadge label={offer.badge} />
                </span>
              </div>

              {/* Promotion content */}
              <div className="flex flex-1 flex-col p-5">

                {/* Category */}
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80755F]">
                  {offer.categoryLabel}
                </p>

                {/* Treatment name */}
                <h3 className="mt-1.5 font-seasons text-2xl leading-tight text-[#4C5534]">
                  {offer.title}
                </h3>

                {/* Short description */}
                <p className="mt-1.5 font-montserrat text-xs leading-5 text-[#80755F]">
                  {offer.subtitle}
                </p>

                {/* Pricing */}
<div className="mt-3 border-t border-[#80755F]/15 pt-3">
  <p className="mb-1 font-montserrat text-[10px] font-medium uppercase tracking-[0.12em] text-[#80755F]">
    For as low as
  </p>

  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <span className="font-montserrat text-xl font-semibold text-[#4C5534]">
      {promoPrice(offer).replace(/^From\s+/i, "")}
    </span>

    {regularPrice(offer) && (
      <span className="font-montserrat text-xs text-[#80755F] line-through">
        {regularPrice(offer)}
      </span>
    )}
  </div>

  {offer.discountLabel && (
    <p className="mt-1 font-montserrat text-[10px] font-semibold tracking-wide text-[#4C5534]">
      {offer.discountLabel}
    </p>
  )}
</div>

                {/* Button stays aligned at the bottom */}
                <div className="mt-auto pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOffer(offer)}
                    className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#4C5534] px-4 font-montserrat text-xs font-semibold text-white transition-colors hover:bg-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4C5534]"
                  >
                    View Offer Details
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </article>
          ))}

          </div>

          <button type="button" onClick={() => moveCarousel(1)} aria-label="Next promotion" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4C5534] text-white transition-colors hover:bg-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
    {selectedOffer && (
      <PromoModal card={selectedOffer} onClose={() => setSelectedOffer(null)} />
    )}
    </>
  );
}
