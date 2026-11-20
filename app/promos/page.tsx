"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import BookingTrigger from "@/components/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/Icons";
import promo1Image from "@/public/images/promotions/promo1.png";
import promo2Image from "@/public/images/promotions/promo2.png";
import promo3Image from "@/public/images/promotions/promo3.png";

type PromoOffer = {
  id: string;
  name: string;
  category: "all" | "facials" | "lasers" | "wellness";
  categoryLabel: string;
  tag: string;
  treatment: string;
  sessions: string;
  promoPrice: string;
  regularPrice: string;
  validity: string;
  description: string;
  inclusions: string[];
  image: StaticImageData;
};

const promoOffers: PromoOffer[] = [
  {
    id: "facial-holiday",
    name: "Facial Holiday Treat",
    category: "facials",
    categoryLabel: "Facial Aesthetics",
    tag: "Best Seller",
    treatment: "Selected Premium Facial",
    sessions: "1 session",
    promoPrice: "Starts at ₱999",
    regularPrice: "Inquire for regular price",
    validity: "Limited time offer",
    description: "Deep cleansing, gentle exfoliation, and intense hydration to restore your skin's natural glow for any occasion.",
    inclusions: ["Skin analysis & consultation", "Deep pore extraction", "Targeted nutrient serum mask", "Cooling globe lymphatic massage"],
    image: promo1Image,
  },
  {
    id: "laser-holiday",
    name: "Laser Holiday Treat",
    category: "lasers",
    categoryLabel: "Laser & Skin Rejuvenation",
    tag: "High Demand",
    treatment: "Selected Laser Treatment",
    sessions: "1 session",
    promoPrice: "Starts at ₱999",
    regularPrice: "Inquire for regular price",
    validity: "Limited time offer",
    description: "Precision non-invasive laser resurfacing to address blemishes, hyperpigmentation, and fine lines with minimal downtime.",
    inclusions: ["Physician assessment", "Targeted laser toning", "Post-laser soothing application", "Sun protection care guide"],
    image: promo2Image,
  },
  {
    id: "drip-holiday",
    name: "Aesthera Drip Treat",
    category: "wellness",
    categoryLabel: "Wellness & Vitality",
    tag: "Signature",
    treatment: "Selected Wellness Drip",
    sessions: "1 session",
    promoPrice: "Starts at ₱899",
    regularPrice: "Inquire for regular price",
    validity: "Limited time offer",
    description: "Formulated blend of vital antioxidants, vitamins, and minerals delivered directly for instant rehydration and radiant skin.",
    inclusions: ["Vital signs screening", "Customized IV vitamin formulation", "Complimentary calming tea", "Comfort lounge access"],
    image: promo3Image,
  },
  {
    id: "facial-glow-bundle",
    name: "Radiance Duo Facial Package",
    category: "facials",
    categoryLabel: "Facial Aesthetics",
    tag: "Package Deal",
    treatment: "Oxy-Radiance & Hydration Infusion",
    sessions: "2 sessions",
    promoPrice: "Starts at ₱1,899",
    regularPrice: "₱2,800",
    validity: "Valid within 60 days of purchase",
    description: "Dual-session facial therapy targeting dullness, moisture loss, and uneven skin tone for sustained vitality.",
    inclusions: ["2 complete facial sessions", "Custom botanical booster", "Physician skin progress check"],
    image: promo1Image,
  },
  {
    id: "laser-rejuvenation-pack",
    name: "Complete Laser Toning Series",
    category: "lasers",
    categoryLabel: "Laser & Skin Rejuvenation",
    tag: "Bundle & Save",
    treatment: "Pico Genesis / Q-Switched Toning",
    sessions: "3 sessions",
    promoPrice: "Starts at ₱2,699",
    regularPrice: "₱4,500",
    validity: "Valid within 90 days of purchase",
    description: "Structured progressive laser sessions for visible pore refinement, collagen stimulation, and complexion clarity.",
    inclusions: ["3 laser toning sessions", "Post-procedure recovery serum", "Dedicated progress tracking"],
    image: promo2Image,
  },
  {
    id: "glow-vitality-infusion",
    name: "Glow & Vitality Drip Package",
    category: "wellness",
    categoryLabel: "Wellness & Vitality",
    tag: "Immunity & Skin",
    treatment: "Glutathione + Vitamin C Cocktail",
    sessions: "3 sessions",
    promoPrice: "Starts at ₱2,399",
    regularPrice: "₱3,600",
    validity: "Valid within 90 days of purchase",
    description: "Nourish your body from within with our medical-grade antioxidant infusion designed for detoxification and luminous tone.",
    inclusions: ["3 IV wellness infusions", "Blood pressure & health screening", "Relaxation suite session"],
    image: promo3Image,
  },
];

const promoCategories = [
  { id: "all", label: "All Offers" },
  { id: "facials", label: "Facial Aesthetics" },
  { id: "lasers", label: "Laser Treatments" },
  { id: "wellness", label: "Wellness & Drips" },
];

export default function PromosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredOffers =
    activeCategory === "all"
      ? promoOffers
      : promoOffers.filter((offer) => offer.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="bg-[#FFFCF3] text-[#4C5534]">
        {/* 1. Header & Breadcrumb */}
        <section className="border-b border-[#80755F]/15 px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
              <Link href="/" className="hover:text-[#4C5534]">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#4C5534]">Promos &amp; Packages</span>
            </nav>

            <div className="mt-8 max-w-[820px]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">
                Limited-Time Specials
              </p>
              <h1 className="font-seasons mt-3 text-[clamp(3.2rem,6.5vw,5.5rem)] leading-[0.95] text-[#4C5534]">
                Promotions &amp; Packages
              </h1>
              <p className="mt-5 font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">
                Discover our curated seasonal offers and multi-session treatment bundles. Every package is crafted with medical-grade precision to bring you visible, long-lasting aesthetic and wellness results.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Category Filter & Offers Grid */}
        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
          {/* Category Tabs */}
          <div className="mb-10">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              Filter by offer type
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {promoCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex min-h-11 items-center rounded-full border px-5 font-montserrat text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-[#4C5534] bg-[#4C5534] text-white"
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
                {promoCategories.find((c) => c.id === activeCategory)?.label}
              </p>
              <h2 className="font-seasons mt-2 text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[#4C5534]">
                Current Specials ({filteredOffers.length})
              </h2>
            </div>
            <p className="font-montserrat text-xs text-[#80755F]">
              Confirm validity when booking
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => (
              <article
                key={offer.id}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#80755F]/20 bg-white shadow-[0_18px_45px_-30px_rgba(30,58,42,0.35)] transition-all duration-300 hover:shadow-[0_22px_50px_-25px_rgba(30,58,42,0.45)]"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E1D7]">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    fill
                    quality={90}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3.5 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                    {offer.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                    {offer.categoryLabel}
                  </p>
                  <h3 className="font-seasons mt-2 text-2xl font-normal leading-tight text-[#4C5534]">
                    {offer.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#80755F]">
                    {offer.description}
                  </p>

                  {/* Pricing Details */}
                  <dl className="mt-5 space-y-2.5 border-y border-[#80755F]/15 py-4 font-montserrat text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#80755F]">Treatment</dt>
                      <dd className="text-right font-medium text-[#4C5534]">{offer.treatment}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#80755F]">Package Inclusions</dt>
                      <dd className="text-right font-medium text-[#4C5534]">{offer.sessions}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#80755F]">Promo Price</dt>
                      <dd className="text-right text-base font-bold text-[#4C5534]">{offer.promoPrice}</dd>
                    </div>
                    {offer.regularPrice && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#80755F]">Regular Price</dt>
                        <dd className="text-right text-[#80755F] line-through">{offer.regularPrice}</dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#80755F]">Validity</dt>
                      <dd className="max-w-[200px] text-right text-[11px] text-[#4C5534]">{offer.validity}</dd>
                    </div>
                  </dl>

                  {/* Feature Highlights */}
                  <div className="mt-4 flex-1">
                    <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                      What&apos;s Included:
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {offer.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 font-montserrat text-[11px] text-[#4C5534]">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4C5534]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger */}
                  <BookingTrigger
                    initialTreatment={offer.name}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white transition-all hover:bg-[#35452F]"
                  >
                    Book This Offer <ArrowUpRightIcon className="h-4 w-4" />
                  </BookingTrigger>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Package Guarantee / Value Proposition */}
        <section className="border-t border-[#80755F]/15 bg-[#F9F5EC] px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[680px] text-center">
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#80755F]">
                The Aesthera Standard
              </p>
              <h2 className="font-seasons mt-3 text-[clamp(2.4rem,4.5vw,3.8rem)] leading-tight text-[#4C5534]">
                Why Choose Our Curated Packages
              </h2>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F]">
                Every promotional offer is held to the same uncompromising medical standard as our signature services.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-[20px] border border-[#80755F]/15 bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4C5534]/10 font-seasons text-xl text-[#4C5534]">
                  01
                </div>
                <h3 className="font-seasons text-xl text-[#4C5534]">Physician Consulted</h3>
                <p className="mt-2.5 font-montserrat text-xs leading-6 text-[#80755F]">
                  Prior to any treatment, our aesthetic physicians assess your skin type and health profile to ensure maximum safety and clinical suitability.
                </p>
              </div>

              <div className="rounded-[20px] border border-[#80755F]/15 bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4C5534]/10 font-seasons text-xl text-[#4C5534]">
                  02
                </div>
                <h3 className="font-seasons text-xl text-[#4C5534]">Authentic Products &amp; Devices</h3>
                <p className="mt-2.5 font-montserrat text-xs leading-6 text-[#80755F]">
                  We exclusively utilize FDA-approved medical-grade machinery and authentic serums with proven safety and efficacy records.
                </p>
              </div>

              <div className="rounded-[20px] border border-[#80755F]/15 bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4C5534]/10 font-seasons text-xl text-[#4C5534]">
                  03
                </div>
                <h3 className="font-seasons text-xl text-[#4C5534]">Tailored Inclusions</h3>
                <p className="mt-2.5 font-montserrat text-xs leading-6 text-[#80755F]">
                  Our packages are structured as multi-step experiences — from preparatory deep cleansing to calming post-care regimens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Consultation Banner */}
        <Consultation />
      </main>

      <Footer />
    </>
  );
}
