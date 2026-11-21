"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import BookingTrigger from "@/components/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/Icons";

type PromoCard = {
  id: string;
  title: string;
  category: "all" | "launch" | "facials" | "injectables" | "contour";
  categoryLabel: string;
  badge: string;
  subtitle: string;
  promoPrice: string;
  regularPrice?: string;
  savings?: string;
  description: string;
  recommendedFor?: string[];
  inclusions: string[];
  image: string;
  bonusText?: string;
};

const promoCards: PromoCard[] = [
  {
    id: "summer-ready-skin",
    title: "Your Summer-Ready Skin is Waiting",
    category: "launch",
    categoryLabel: "Summer Opening Special",
    badge: "Starting April 24",
    subtitle: "Feel and Look More Sculpted — Just in Time for Summer",
    promoPrice: "Up to 30% OFF",
    regularPrice: "Standard Rates",
    savings: "Pre-Launch Offer",
    description: "Get summer-ready before the grand opening! Enjoy exclusive pre-launch discounts on non-doctor's and doctor's procedures starting April 17–22, right before we officially open on April 24.",
    inclusions: [
      "Up to 30% discount on non-doctor's procedures",
      "Up to 20% discount on doctor's procedures",
      "Promotion valid April 17 – 22 only",
      "Unit 3 No.4 Madison Square Pioneer St., Boni Ave., Mandaluyong City"
    ],
    image: "/images/promotions/summer-ready.jpg",
    bonusText: "Pre-Opening Exclusive"
  },
  {
    id: "ultraformer-mpt",
    title: "Ultraformer MPT Full Face & Neck (800 Shots)",
    category: "contour",
    categoryLabel: "Advanced Non-Surgical Face Lifting",
    badge: "Flagship Lifting",
    subtitle: "Advanced Multi-Depth Micro & Macro Focused Ultrasound",
    promoPrice: "₱59,995",
    regularPrice: "₱79,995",
    savings: "Save ₱20,000",
    description: "Uses advanced multi-depth HIFU technology to lift, tighten, and contour the skin with greater precision, helping restore firmer, more youthful-looking facial contours.",
    recommendedFor: [
      "Sagging skin & loss of facial definition",
      "Fine lines and deep expression wrinkles",
      "Double chin and loose lower jawline",
      "Neck laxity and crepey skin texture"
    ],
    inclusions: [
      "Full Face + Neck complete 800 shots protocol",
      "+ FREE 1 Session of Lemon Bottle Fat Dissolving",
      "+ FREE 1 Session of Thera Exilift 360 RF Tightening",
      "Comprehensive physician vector mapping & depth check"
    ],
    image: "/images/promotions/ultraformer-mpt.jpg",
    bonusText: "FREE Lemon Bottle + FREE Exilift 360"
  },
  {
    id: "glass-skin-juvetox",
    title: "Glass Skin Glow with JuveTox",
    category: "injectables",
    categoryLabel: "Biostimulator & Pore Refinement",
    badge: "Most Popular",
    subtitle: "Juvelook PDLLA + 20 Units MicroTox + RemeePro",
    promoPrice: "₱27,990",
    regularPrice: "₱45,000",
    savings: "Save ₱17,010",
    description: "Combines the hydrating and collagen-boosting benefits of Juvelook with the wrinkle-relaxing effects of Botox. Deeply hydrates, refines pores, improves texture and firmness, and softens fine lines for a smoother, radiant glass skin finish.",
    recommendedFor: [
      "Dull skin lacking luminosity",
      "Enlarged pores & excess sebum",
      "Acne scars and shallow fine lines",
      "Loss of dermal elasticity and bounce"
    ],
    inclusions: [
      "Authentic Juvelook PDLLA hybrid biostimulator syringe",
      "20 units of medical MicroTox for pore and line smoothing",
      "RemeePro automated precision transdermal delivery",
      "Physician skin elasticity and recovery review"
    ],
    image: "/images/promotions/glass-skin-glow.jpg",
    bonusText: "Save ₱17,010 off regular price"
  },
  {
    id: "thera-luhilo-snow",
    title: "Translucent Skin with Thera Luhilo Snow",
    category: "injectables",
    categoryLabel: "Amino Acids & Peptide Complex",
    badge: "10% OFF",
    subtitle: "High & Low Molecular Weight Amino Acids + Peptides",
    promoPrice: "10% Discount",
    regularPrice: "₱21,990",
    savings: "Special 10% Off",
    description: "Deeply nourishes and brightens the skin to enhance clarity, hydration, and luminosity, revealing a naturally translucent and healthy-looking glow from within.",
    recommendedFor: [
      "Dull and uneven skin tone",
      "Dehydrated, parched skin barrier",
      "Pigmentation concerns & sun spots",
      "Skin lacking radiance and vitality"
    ],
    inclusions: [
      "High & low molecular weight bio-active amino formula",
      "Intensive hydration booster with instant translucency",
      "Gentle non-traumatic skin barrier delivery",
      "Physician skin assessment and personalized aftercare"
    ],
    image: "/images/promotions/luhilo-snow.jpg",
  },
  {
    id: "lemon-bottle-slimming",
    title: "Lemon Bottle Fat Dissolving Package",
    category: "contour",
    categoryLabel: "Targeted Lipolysis & Sculpting",
    badge: "Best Value 4+1",
    subtitle: "Lecithin + Bromelain + Vitamin Complex",
    promoPrice: "₱27,960 for 4+1 Bottles",
    regularPrice: "₱39,950",
    savings: "Save ₱11,990",
    description: "High-concentration lipolytic solution designed to target stubborn localized fat deposits across chin, arms, abdomen, or love handles safely and naturally.",
    inclusions: [
      "4+1 Lemon Bottle multi-vial package (5 bottles total)",
      "Single bottle promo available at ₱6,990 (Reg ₱7,990)",
      "FREE Thera Exilift 360 RF tightening with every treatment",
      "Body contour assessment & localized mapping"
    ],
    image: "/images/promotions/lemon-bottle.jpg",
    bonusText: "FREE Thera Exilift 360 Included"
  },
  {
    id: "botox-theratox",
    title: "TheraTox & TheraTox Elite Botox Promo",
    category: "injectables",
    categoryLabel: "Facial Rejuvenation",
    badge: "Per Unit Promo",
    subtitle: "Nabota & Xeomin Medical Neuromodulators",
    promoPrice: "As low as ₱150 / unit",
    regularPrice: "₱250 – ₱450 / unit",
    savings: "Per-Unit Special",
    description: "Smooth fine expression lines, soften masseter bulk for jawline slimming, or balance facial symmetry with FDA-cleared genuine neurotoxins administered by physicians.",
    inclusions: [
      "TheraTox (Nabota Korea): As low as ₱150 per unit",
      "TheraTox Elite (Xeomin Germany - Zero Complexing Proteins): As low as ₱350 per unit",
      "Targeted areas: Forehead, Crow's feet, Frown lines, Jawtox, Lip flip",
      "Physician facial dynamics assessment & touch-up review"
    ],
    image: "/images/promotions/botox-promo.jpg",
  },
  {
    id: "grand-launch",
    title: "Grand Launch Opening Offer",
    category: "launch",
    categoryLabel: "Grand Opening — April 25, 2026",
    badge: "We Open April 25",
    subtitle: "The Wait is Over — Unveil Your Best Form & Skin",
    promoPrice: "Up to 30% OFF",
    regularPrice: "Standard Rates",
    savings: "Grand Opening Discount",
    description: "The wait is over. Celebrate our official grand opening at Madison Square Pioneer on April 25, 2026! Enjoy exclusive tiered discounts across both aesthetician-led and doctor-led clinical procedures.",
    inclusions: [
      "Up to 30% discount on non-doctor's procedures",
      "Up to 20% discount on doctor's procedures",
      "Comprehensive skin analysis & consultation",
      "Unit 3 No.4 Madison Square Pioneer St., Boni Ave., Mandaluyong City"
    ],
    image: "/images/promotions/grand-launch.jpg",
    bonusText: "Official Grand Launch — April 25, 2026"
  },
  {
    id: "midyear-clarity-peels",
    title: "Midyear Promo — Medical Clarity Peels",
    category: "facials",
    categoryLabel: "Clinical Peels & Resurfacing",
    badge: "Midyear Special",
    subtitle: "Don't Miss These Limited-Time Offers!",
    promoPrice: "As low as ₱3,990",
    regularPrice: "Standard Session Rates",
    savings: "Midyear Price Drop",
    description: "Deep chemical and enzyme resurfacing targeting chronic breakouts, back acne, post-inflammatory pigmentation, and rough skin texture. Limited-time midyear pricing on our most-requested clinical peel treatments.",
    inclusions: [
      "Korean Body Clarity Renewal Peel — As low as ₱3,990 (Back acne, blemishes & skin clarity)",
      "Thera Biorenew Medical Peel — As low as ₱4,490 (Advanced medical-grade for acne & pigmentation)",
      "Korean Face Clarity Renewal Peel — As low as ₱5,480 (Targets acne, unclogs pores & smooths texture)",
      "Post-peel soothing application and clinical barrier advice"
    ],
    image: "/images/promotions/clarity-peels.jpg",
  },
  {
    id: "diode-laser-summer",
    title: "Diode Laser Hair-Free Summer Special",
    category: "contour",
    categoryLabel: "Laser Hair Removal",
    badge: "Seasonal",
    subtitle: "Painless Triple-Wavelength Diode Technology",
    promoPrice: "Up to 30% OFF",
    regularPrice: "Standard Session Rates",
    savings: "Summer Ready Deal",
    description: "One step closer to permanently smooth, hair-free underarms, legs, or bikini line. Our medical-grade cooling diode laser provides maximum comfort and efficacy.",
    inclusions: [
      "Up to 30% off non-doctor laser hair removal protocols",
      "Integrated contact crystal cooling for virtually painless sessions",
      "Safe and effective across varied skin phototypes",
      "Package bundles available for sustained hair reduction"
    ],
    image: "/images/promotions/diode-laser.jpg",
  },
  {
    id: "rejuran-june-promo",
    title: "Rejuran Cellular Skin Healer Special",
    category: "injectables",
    categoryLabel: "Polynucleotide Therapy",
    badge: "10% OFF",
    subtitle: "Revitalize Your Skin with Genuine Rejuran®",
    promoPrice: "10% Discount This Month",
    regularPrice: "Standard Package Price",
    savings: "Exclusive 10% Off",
    description: "Medical-grade wild salmon DNA polynucleotides (PN) that biologically repair damaged skin barriers, improve elasticity, and reverse cellular aging.",
    inclusions: [
      "10% discount on all Rejuran services (Healer, Eye, Scar)",
      "Deep micro-droplet dermal matrix delivery",
      "Physician skin thickness and recovery protocol",
      "Ideal for acne scars, enlarged pores, and sensitized skin"
    ],
    image: "/images/promotions/rejuran-discount.jpg",
  },
  {
    id: "mothers-day-contest",
    title: "The Glow She Gave — Mother's Day Special",
    category: "launch",
    categoryLabel: "Community Celebration",
    badge: "Special Contest",
    subtitle: "In Honor of Motherly Care & Grace",
    promoPrice: "FREE Pampering Prize",
    regularPrice: "Priceless Care",
    savings: "Complimentary Service",
    description: "In tribute to our late mother who inspired Aesthera Mère, share a heartwarming photo and message dedicated to your mom on Facebook or Instagram for a chance to win a free pampering service.",
    inclusions: [
      "1. Follow @aestheramereph on Facebook and Instagram",
      "2. Post a photo of your mom or mother figure on your feed",
      "3. Share the most heartfelt caption celebrating her glow",
      "Winner receives a complimentary Aesthera pampering experience"
    ],
    image: "/images/promotions/mothers-day.jpg",
    bonusText: "Tribute to Motherhood"
  },
];

const facialRows = [
  { name: "Aqua Reset Facial", regular: "₱1,980", promo: "₱1,280", package: "₱6,400", effective: "₱1,066 / session" },
  { name: "Oxy Radiance Facial", regular: "₱2,280", promo: "₱1,580", package: "₱7,900", effective: "₱1,316 / session" },
  { name: "Carbon Laser Facial", regular: "₱2,480", promo: "₱1,580", package: "₱7,900", effective: "₱1,316 / session" },
  { name: "Korean Skin Reset Facial", regular: "₱2,480", promo: "₱1,680", package: "₱8,400", effective: "₱1,400 / session" },
  { name: "Korean Acne Clarity Facial", regular: "₱2,980", promo: "₱1,880", package: "₱9,400", effective: "₱1,566 / session" },
];

const eliteFacialRows = [
  { name: "Korean Whitening Facial", regular: "₱3,880", promo: "₱2,880", package: "₱14,400", effective: "₱2,400 / session" },
  { name: "Korean Age Defy Facial", regular: "₱3,880", promo: "₱2,880", package: "₱14,400", effective: "₱2,400 / session" },
  { name: "Aqua Reset Fusion", regular: "₱3,980", promo: "₱2,580", package: "₱12,900", effective: "₱2,150 / session" },
  { name: "Oxy Radiance Fusion", regular: "₱3,980", promo: "₱2,780", package: "₱13,900", effective: "₱2,316 / session" },
];

const heroDripRows = [
  { name: "Harmonia’s Push (Balance & Vitality)", regular: "₱1,990", promo: "₱1,190", package: "₱11,900", effective: "₱991 / drip" },
  { name: "Helen’s Drip (Trio Radiance)", regular: "₱2,990", promo: "₱1,890", package: "₱18,900", effective: "₱1,575 / drip" },
  { name: "Achilles’ Drip (Myers Cocktail & Energy)", regular: "₱3,480", promo: "₱1,990", package: "₱19,900", effective: "₱1,658 / drip" },
];

const divineDripRows = [
  { name: "Aphrodite Drip (Whitening + Anti-Aging)", regular: "₱3,990", promo: "₱2,990", package: "₱14,950", effective: "₱2,491 / drip" },
  { name: "Poseidon Drip (Immunity Booster + Anti-Aging)", regular: "₱3,490", promo: "₱2,990", package: "₱14,950", effective: "₱2,491 / drip" },
  { name: "Artemis Drip (Slimming + Metabolism)", regular: "₱4,490", promo: "₱3,290", package: "₱16,450", effective: "₱2,741 / drip" },
  { name: "Apollo Drip (Repair + Cellular Glow)", regular: "₱3,490", promo: "₱2,290", package: "₱11,450", effective: "₱1,908 / drip" },
  { name: "Zeus (Energy + Peak Performance)", regular: "₱5,990", promo: "₱3,990", package: "₱19,950", effective: "₱3,325 / drip" },
];

const categories = [
  { id: "all", label: "All Promos & Deals" },
  { id: "contour", label: "Ultraformer MPT & Slimming" },
  { id: "injectables", label: "JuveTox, Luhilo & Botox" },
  { id: "launch", label: "Grand Launch & Summer Offers" },
  { id: "facials", label: "Medical Peels & 5+1 Facials" },
];

export default function PromosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTableTab, setActiveTableTab] = useState<"facials" | "drips">("facials");

  const filteredCards =
    activeCategory === "all"
      ? promoCards
      : promoCards.filter((card) => card.category === activeCategory);

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

            <div className="mt-8 max-w-[880px]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">
                Aesthera Mère • Madison Square Pioneer
              </p>
              <h1 className="font-seasons mt-3 text-[clamp(3.2rem,6.5vw,5.5rem)] leading-[0.95] text-[#4C5534]">
                Current Promotions &amp; Specials
              </h1>
              <p className="mt-3 font-seasons italic text-lg text-[#4f6442] sm:text-xl">
                “Premium Aesthetic Care, Made Accessible”
              </p>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">
                Discover our official seasonal specials, grand launch privileges, and signature 5+1 and 10+2 treatment passes. Designed to deliver authentic medical-grade aesthetics in a warm, unhurried, and welcoming sanctuary.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-montserrat text-[#4C5534]">
                <span className="flex items-center gap-1.5 font-semibold">
                  📍 Unit 3 No.4 Madison Square Pioneer St., Boni Ave., Mandaluyong City
                </span>
                <span className="text-[#80755F]">|</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  📞 0918 936 5679
                </span>
                <span className="text-[#80755F]">|</span>
                <span className="text-[#80755F]">
                  @aestheramereph
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Category Filter & Featured Deals Grid */}
        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
          <div className="mb-10">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              Filter promotions by category
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {categories.map((cat) => {
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
                {categories.find((c) => c.id === activeCategory)?.label}
              </p>
              <h2 className="font-seasons mt-2 text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[#4C5534]">
                Active Offers ({filteredCards.length})
              </h2>
            </div>
            <p className="font-montserrat text-xs text-[#80755F]">
              Confirm slot availability upon booking
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <article
                key={card.id}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#80755F]/20 bg-white shadow-[0_18px_45px_-30px_rgba(30,58,42,0.35)] transition-all duration-300 hover:shadow-[0_24px_50px_-20px_rgba(30,58,42,0.45)]"
              >
                {/* Visual Banner */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E7E1D7]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    quality={90}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3.5 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                    {card.badge}
                  </span>
                  {card.savings && (
                    <span className="absolute right-4 top-4 rounded-full bg-[#4f6442] px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
                      {card.savings}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                    {card.categoryLabel}
                  </p>
                  <h3 className="font-seasons mt-2 text-2xl font-normal leading-tight text-[#4C5534]">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-montserrat text-xs font-semibold text-[#4f6442]">
                    {card.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#80755F]">
                    {card.description}
                  </p>

                  {/* Recommended For List */}
                  {card.recommendedFor && card.recommendedFor.length > 0 && (
                    <div className="mt-4 rounded-xl bg-[#4C5534]/5 p-3.5">
                      <p className="font-montserrat text-[10px] font-semibold uppercase tracking-wider text-[#4C5534]">
                        Recommended For:
                      </p>
                      <ul className="mt-1.5 grid grid-cols-1 gap-1 text-[11px] font-montserrat text-[#4C5534]">
                        {card.recommendedFor.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#4f6442]">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing Details */}
                  <div className="mt-5 rounded-xl bg-[#FFFCF3] border border-[#80755F]/15 p-4 font-montserrat">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#80755F]">Promo Rate</span>
                      <span className="text-lg font-bold text-[#4C5534]">{card.promoPrice}</span>
                    </div>
                    {card.regularPrice && (
                      <div className="mt-1 flex items-baseline justify-between gap-2 text-xs text-[#80755F]">
                        <span>Regular Rate</span>
                        <span className="line-through">{card.regularPrice}</span>
                      </div>
                    )}
                    {card.bonusText && (
                      <div className="mt-2 text-[11px] font-semibold text-[#4f6442] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4f6442]" />
                        {card.bonusText}
                      </div>
                    )}
                  </div>

                  {/* Inclusions List */}
                  <div className="mt-4 flex-1">
                    <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                      Key Highlights &amp; Inclusions:
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {card.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 font-montserrat text-[11px] text-[#4C5534]">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f6442]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger */}
                  <BookingTrigger
                    initialTreatment={card.title}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white transition-all hover:bg-[#35452F]"
                  >
                    Avail This Promo <ArrowUpRightIcon className="h-4 w-4" />
                  </BookingTrigger>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Official 5+1 and 10+2 Package Rate Tables */}
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
                Enjoy substantial savings with our structured treatment passes. Buy 5 get 1 free on facials, or buy 10 get 2 free on hero wellness drips.
              </p>

              {/* Table Switcher */}
              <div className="mt-6 inline-flex rounded-full border border-[#80755F]/20 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setActiveTableTab("facials")}
                  className={`rounded-full px-6 py-2.5 font-montserrat text-xs font-semibold transition-all ${
                    activeTableTab === "facials"
                      ? "bg-[#4C5534] text-white shadow-sm"
                      : "text-[#4C5534] hover:text-[#80755F]"
                  }`}
                >
                  Facial Packages (5 + 1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTableTab("drips")}
                  className={`rounded-full px-6 py-2.5 font-montserrat text-xs font-semibold transition-all ${
                    activeTableTab === "drips"
                      ? "bg-[#4C5534] text-white shadow-sm"
                      : "text-[#4C5534] hover:text-[#80755F]"
                  }`}
                >
                  Aesthera Drips (10 + 2 &amp; 5 + 1)
                </button>
              </div>
            </div>

            {/* Facials Table */}
            {activeTableTab === "facials" && (
              <div className="mt-10 space-y-8">
                {/* Premium Facials */}
                <div className="overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-sm">
                  <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
                    <h3 className="font-seasons text-xl">Aesthera Premium Facials (5 + 1 Package)</h3>
                    <p className="text-xs font-montserrat text-white/80">Every package includes 6 total sessions (Buy 5, Get 1 FREE)</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-montserrat text-xs">
                      <thead className="border-b border-[#80755F]/15 bg-[#FFFCF3] text-[10px] uppercase tracking-wider text-[#80755F]">
                        <tr>
                          <th className="px-6 py-3.5">Treatment</th>
                          <th className="px-6 py-3.5">Regular Single</th>
                          <th className="px-6 py-3.5">Promo Single</th>
                          <th className="px-6 py-3.5">5+1 Package Price</th>
                          <th className="px-6 py-3.5">Effective / Session</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#80755F]/10">
                        {facialRows.map((row) => (
                          <tr key={row.name} className="hover:bg-[#FFFCF3]/60 transition-colors">
                            <td className="px-6 py-4 font-semibold text-[#4C5534]">{row.name}</td>
                            <td className="px-6 py-4 text-[#80755F] line-through">{row.regular}</td>
                            <td className="px-6 py-4 font-medium text-[#4C5534]">{row.promo}</td>
                            <td className="px-6 py-4 font-bold text-[#4C5534]">{row.package}</td>
                            <td className="px-6 py-4 font-semibold text-[#4f6442]">{row.effective}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Elite Facials */}
                <div className="overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-sm">
                  <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
                    <h3 className="font-seasons text-xl">Aesthera Elite Facials (5 + 1 Package)</h3>
                    <p className="text-xs font-montserrat text-white/80">Elevated multi-technology fusion and Korean specialized care</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-montserrat text-xs">
                      <thead className="border-b border-[#80755F]/15 bg-[#FFFCF3] text-[10px] uppercase tracking-wider text-[#80755F]">
                        <tr>
                          <th className="px-6 py-3.5">Treatment</th>
                          <th className="px-6 py-3.5">Regular Single</th>
                          <th className="px-6 py-3.5">Promo Single</th>
                          <th className="px-6 py-3.5">5+1 Package Price</th>
                          <th className="px-6 py-3.5">Effective / Session</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#80755F]/10">
                        {eliteFacialRows.map((row) => (
                          <tr key={row.name} className="hover:bg-[#FFFCF3]/60 transition-colors">
                            <td className="px-6 py-4 font-semibold text-[#4C5534]">{row.name}</td>
                            <td className="px-6 py-4 text-[#80755F] line-through">{row.regular}</td>
                            <td className="px-6 py-4 font-medium text-[#4C5534]">{row.promo}</td>
                            <td className="px-6 py-4 font-bold text-[#4C5534]">{row.package}</td>
                            <td className="px-6 py-4 font-semibold text-[#4f6442]">{row.effective}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Drips Table */}
            {activeTableTab === "drips" && (
              <div className="mt-10 space-y-8">
                {/* Hero Drips */}
                <div className="overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-sm">
                  <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
                    <h3 className="font-seasons text-xl">Aesthera Hero Drips (10 + 2 Package Pass)</h3>
                    <p className="text-xs font-montserrat text-white/80">Buy 10 infusions, get 2 FREE (12 total infusions)</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-montserrat text-xs">
                      <thead className="border-b border-[#80755F]/15 bg-[#FFFCF3] text-[10px] uppercase tracking-wider text-[#80755F]">
                        <tr>
                          <th className="px-6 py-3.5">Treatment</th>
                          <th className="px-6 py-3.5">Regular Single</th>
                          <th className="px-6 py-3.5">Promo Single</th>
                          <th className="px-6 py-3.5">10+2 Package Price</th>
                          <th className="px-6 py-3.5">Effective / Drip</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#80755F]/10">
                        {heroDripRows.map((row) => (
                          <tr key={row.name} className="hover:bg-[#FFFCF3]/60 transition-colors">
                            <td className="px-6 py-4 font-semibold text-[#4C5534]">{row.name}</td>
                            <td className="px-6 py-4 text-[#80755F] line-through">{row.regular}</td>
                            <td className="px-6 py-4 font-medium text-[#4C5534]">{row.promo}</td>
                            <td className="px-6 py-4 font-bold text-[#4C5534]">{row.package}</td>
                            <td className="px-6 py-4 font-semibold text-[#4f6442]">{row.effective}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Divine Drips */}
                <div className="overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-sm">
                  <div className="border-b border-[#80755F]/15 bg-[#4C5534] px-6 py-4 text-white">
                    <h3 className="font-seasons text-xl">Aesthera Divine Drips (5 + 1 Package Pass)</h3>
                    <p className="text-xs font-montserrat text-white/80">Premium formulations for immunity, slimming, whitening, and performance</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-montserrat text-xs">
                      <thead className="border-b border-[#80755F]/15 bg-[#FFFCF3] text-[10px] uppercase tracking-wider text-[#80755F]">
                        <tr>
                          <th className="px-6 py-3.5">Treatment</th>
                          <th className="px-6 py-3.5">Regular Single</th>
                          <th className="px-6 py-3.5">Promo Single</th>
                          <th className="px-6 py-3.5">5+1 Package Price</th>
                          <th className="px-6 py-3.5">Effective / Drip</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#80755F]/10">
                        {divineDripRows.map((row) => (
                          <tr key={row.name} className="hover:bg-[#FFFCF3]/60 transition-colors">
                            <td className="px-6 py-4 font-semibold text-[#4C5534]">{row.name}</td>
                            <td className="px-6 py-4 text-[#80755F] line-through">{row.regular}</td>
                            <td className="px-6 py-4 font-medium text-[#4C5534]">{row.promo}</td>
                            <td className="px-6 py-4 font-bold text-[#4C5534]">{row.package}</td>
                            <td className="px-6 py-4 font-semibold text-[#4f6442]">{row.effective}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. Consultation Banner */}
        <Consultation />
      </main>

      <Footer />
    </>
  );
}
