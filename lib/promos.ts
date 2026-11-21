/**
 * lib/promos.ts — Promo data-fetching layer
 *
 * RIGHT NOW (frontend only):
 *   getPromos() and getPricingTables() return hard-coded mock data.
 *   Images are served from /public/images/promotions/.
 *
 * WHEN BACKEND IS READY (Supabase / REST API):
 *   Replace the mock arrays below with real fetch/supabase calls.
 *   The page and components never need to change — only this file.
 *
 * Example future swap:
 *   import { supabase } from "@/lib/supabase";
 *   export async function getPromos() {
 *     const { data } = await supabase
 *       .from("promos")
 *       .select("*")
 *       .eq("is_active", true)
 *       .order("published_at", { ascending: false });
 *     return data ?? [];
 *   }
 *
 * Image folder convention:
 *   - Frontend-only: /public/images/promotions/<slug>.jpg
 *   - With backend:  Supabase Storage bucket "promos", filename "<slug>.jpg"
 *     URL pattern: https://<project>.supabase.co/storage/v1/object/public/promos/<slug>.jpg
 */

import type { PromoCard, PricingTable } from "@/types/promo";

// ---------------------------------------------------------------------------
// MOCK DATA — replace with DB/API calls when backend is ready
// ---------------------------------------------------------------------------

const MOCK_PROMOS: PromoCard[] = [
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
    description:
      "Get summer-ready before the grand opening! Enjoy exclusive pre-launch discounts on non-doctor's and doctor's procedures starting April 17–22, right before we officially open on April 24.",
    inclusions: [
      "Up to 30% discount on non-doctor's procedures",
      "Up to 20% discount on doctor's procedures",
      "Promotion valid April 17 – 22 only",
      "Unit 3 No.4 Madison Square Pioneer St., Boni Ave., Mandaluyong City",
    ],
    image: "/images/promotions/summer-ready.jpg",
    bonusText: "Pre-Opening Exclusive",
    publishedAt: "2026-04-17T00:00:00Z",
    isActive: true,
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
    description:
      "Uses advanced multi-depth HIFU technology to lift, tighten, and contour the skin with greater precision, helping restore firmer, more youthful-looking facial contours.",
    recommendedFor: [
      "Sagging skin & loss of facial definition",
      "Fine lines and deep expression wrinkles",
      "Double chin and loose lower jawline",
      "Neck laxity and crepey skin texture",
    ],
    inclusions: [
      "Full Face + Neck complete 800 shots protocol",
      "+ FREE 1 Session of Lemon Bottle Fat Dissolving",
      "+ FREE 1 Session of Thera Exilift 360 RF Tightening",
      "Comprehensive physician vector mapping & depth check",
    ],
    image: "/images/promotions/ultraformer-mpt.jpg",
    bonusText: "FREE Lemon Bottle + FREE Exilift 360",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "Combines the hydrating and collagen-boosting benefits of Juvelook with the wrinkle-relaxing effects of Botox. Deeply hydrates, refines pores, improves texture and firmness, and softens fine lines for a smoother, radiant glass skin finish.",
    recommendedFor: [
      "Dull skin lacking luminosity",
      "Enlarged pores & excess sebum",
      "Acne scars and shallow fine lines",
      "Loss of dermal elasticity and bounce",
    ],
    inclusions: [
      "Authentic Juvelook PDLLA hybrid biostimulator syringe",
      "20 units of medical MicroTox for pore and line smoothing",
      "RemeePro automated precision transdermal delivery",
      "Physician skin elasticity and recovery review",
    ],
    image: "/images/promotions/glass-skin-glow.jpg",
    bonusText: "Save ₱17,010 off regular price",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "Deeply nourishes and brightens the skin to enhance clarity, hydration, and luminosity, revealing a naturally translucent and healthy-looking glow from within.",
    recommendedFor: [
      "Dull and uneven skin tone",
      "Dehydrated, parched skin barrier",
      "Pigmentation concerns & sun spots",
      "Skin lacking radiance and vitality",
    ],
    inclusions: [
      "High & low molecular weight bio-active amino formula",
      "Intensive hydration booster with instant translucency",
      "Gentle non-traumatic skin barrier delivery",
      "Physician skin assessment and personalized aftercare",
    ],
    image: "/images/promotions/luhilo-snow.jpg",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "High-concentration lipolytic solution designed to target stubborn localized fat deposits across chin, arms, abdomen, or love handles safely and naturally.",
    inclusions: [
      "4+1 Lemon Bottle multi-vial package (5 bottles total)",
      "Single bottle promo available at ₱6,990 (Reg ₱7,990)",
      "FREE Thera Exilift 360 RF tightening with every treatment",
      "Body contour assessment & localized mapping",
    ],
    image: "/images/promotions/lemon-bottle.jpg",
    bonusText: "FREE Thera Exilift 360 Included",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "Smooth fine expression lines, soften masseter bulk for jawline slimming, or balance facial symmetry with FDA-cleared genuine neurotoxins administered by physicians.",
    inclusions: [
      "TheraTox (Nabota Korea): As low as ₱150 per unit",
      "TheraTox Elite (Xeomin Germany - Zero Complexing Proteins): As low as ₱350 per unit",
      "Targeted areas: Forehead, Crow's feet, Frown lines, Jawtox, Lip flip",
      "Physician facial dynamics assessment & touch-up review",
    ],
    image: "/images/promotions/botox-promo.jpg",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "The wait is over. Celebrate our official grand opening at Madison Square Pioneer on April 25, 2026! Enjoy exclusive tiered discounts across both aesthetician-led and doctor-led clinical procedures.",
    inclusions: [
      "Up to 30% discount on non-doctor's procedures",
      "Up to 20% discount on doctor's procedures",
      "Comprehensive skin analysis & consultation",
      "Unit 3 No.4 Madison Square Pioneer St., Boni Ave., Mandaluyong City",
    ],
    image: "/images/promotions/grand-launch.jpg",
    bonusText: "Official Grand Launch — April 25, 2026",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "Deep chemical and enzyme resurfacing targeting chronic breakouts, back acne, post-inflammatory pigmentation, and rough skin texture. Limited-time midyear pricing on our most-requested clinical peel treatments.",
    inclusions: [
      "Korean Body Clarity Renewal Peel — As low as ₱3,990 (Back acne, blemishes & skin clarity)",
      "Thera Biorenew Medical Peel — As low as ₱4,490 (Advanced medical-grade for acne & pigmentation)",
      "Korean Face Clarity Renewal Peel — As low as ₱5,480 (Targets acne, unclogs pores & smooths texture)",
      "Post-peel soothing application and clinical barrier advice",
    ],
    image: "/images/promotions/clarity-peels.jpg",
    publishedAt: "2026-06-01T00:00:00Z",
    isActive: true,
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
    description:
      "One step closer to permanently smooth, hair-free underarms, legs, or bikini line. Our medical-grade cooling diode laser provides maximum comfort and efficacy.",
    inclusions: [
      "Up to 30% off non-doctor laser hair removal protocols",
      "Integrated contact crystal cooling for virtually painless sessions",
      "Safe and effective across varied skin phototypes",
      "Package bundles available for sustained hair reduction",
    ],
    image: "/images/promotions/diode-laser.jpg",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
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
    description:
      "Medical-grade wild salmon DNA polynucleotides (PN) that biologically repair damaged skin barriers, improve elasticity, and reverse cellular aging.",
    inclusions: [
      "10% discount on all Rejuran services (Healer, Eye, Scar)",
      "Deep micro-droplet dermal matrix delivery",
      "Physician skin thickness and recovery protocol",
      "Ideal for acne scars, enlarged pores, and sensitized skin",
    ],
    image: "/images/promotions/rejuran-discount.jpg",
    publishedAt: "2026-06-01T00:00:00Z",
    isActive: true,
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
    description:
      "In tribute to our late mother who inspired Aesthera Mère, share a heartwarming photo and message dedicated to your mom on Facebook or Instagram for a chance to win a free pampering service.",
    inclusions: [
      "1. Follow @aestheramereph on Facebook and Instagram",
      "2. Post a photo of your mom or mother figure on your feed",
      "3. Share the most heartfelt caption celebrating her glow",
      "Winner receives a complimentary Aesthera pampering experience",
    ],
    image: "/images/promotions/mothers-day.jpg",
    bonusText: "Tribute to Motherhood",
    publishedAt: "2026-05-11T00:00:00Z",
    isActive: true,
  },
];

const MOCK_PRICING_TABLES: PricingTable[] = [
  {
    id: "premium-facials",
    title: "Aesthera Premium Facials (5 + 1 Package)",
    subtitle: "Every package includes 6 total sessions (Buy 5, Get 1 FREE)",
    packageType: "5+1",
    rows: [
      { name: "Aqua Reset Facial", regular: "₱1,980", promo: "₱1,280", package: "₱6,400", effective: "₱1,066 / session" },
      { name: "Oxy Radiance Facial", regular: "₱2,280", promo: "₱1,580", package: "₱7,900", effective: "₱1,316 / session" },
      { name: "Carbon Laser Facial", regular: "₱2,480", promo: "₱1,580", package: "₱7,900", effective: "₱1,316 / session" },
      { name: "Korean Skin Reset Facial", regular: "₱2,480", promo: "₱1,680", package: "₱8,400", effective: "₱1,400 / session" },
      { name: "Korean Acne Clarity Facial", regular: "₱2,980", promo: "₱1,880", package: "₱9,400", effective: "₱1,566 / session" },
    ],
  },
  {
    id: "elite-facials",
    title: "Aesthera Elite Facials (5 + 1 Package)",
    subtitle: "Elevated multi-technology fusion and Korean specialized care",
    packageType: "5+1",
    rows: [
      { name: "Korean Whitening Facial", regular: "₱3,880", promo: "₱2,880", package: "₱14,400", effective: "₱2,400 / session" },
      { name: "Korean Age Defy Facial", regular: "₱3,880", promo: "₱2,880", package: "₱14,400", effective: "₱2,400 / session" },
      { name: "Aqua Reset Fusion", regular: "₱3,980", promo: "₱2,580", package: "₱12,900", effective: "₱2,150 / session" },
      { name: "Oxy Radiance Fusion", regular: "₱3,980", promo: "₱2,780", package: "₱13,900", effective: "₱2,316 / session" },
    ],
  },
  {
    id: "hero-drips",
    title: "Aesthera Hero Drips (10 + 2 Package Pass)",
    subtitle: "Buy 10 infusions, get 2 FREE (12 total infusions)",
    packageType: "10+2",
    rows: [
      { name: "Harmonia's Push (Balance & Vitality)", regular: "₱1,990", promo: "₱1,190", package: "₱11,900", effective: "₱991 / drip" },
      { name: "Helen's Drip (Trio Radiance)", regular: "₱2,990", promo: "₱1,890", package: "₱18,900", effective: "₱1,575 / drip" },
      { name: "Achilles' Drip (Myers Cocktail & Energy)", regular: "₱3,480", promo: "₱1,990", package: "₱19,900", effective: "₱1,658 / drip" },
    ],
  },
  {
    id: "divine-drips",
    title: "Aesthera Divine Drips (5 + 1 Package Pass)",
    subtitle: "Premium formulations for immunity, slimming, whitening, and performance",
    packageType: "5+1",
    rows: [
      { name: "Aphrodite Drip (Whitening + Anti-Aging)", regular: "₱3,990", promo: "₱2,990", package: "₱14,950", effective: "₱2,491 / drip" },
      { name: "Poseidon Drip (Immunity Booster + Anti-Aging)", regular: "₱3,490", promo: "₱2,990", package: "₱14,950", effective: "₱2,491 / drip" },
      { name: "Artemis Drip (Slimming + Metabolism)", regular: "₱4,490", promo: "₱3,290", package: "₱16,450", effective: "₱2,741 / drip" },
      { name: "Apollo Drip (Repair + Cellular Glow)", regular: "₱3,490", promo: "₱2,290", package: "₱11,450", effective: "₱1,908 / drip" },
      { name: "Zeus (Energy + Peak Performance)", regular: "₱5,990", promo: "₱3,990", package: "₱19,950", effective: "₱3,325 / drip" },
    ],
  },
];

// ---------------------------------------------------------------------------
// DATA FETCHING FUNCTIONS
// Replace the return statements below with real API/Supabase calls later.
// ---------------------------------------------------------------------------

/**
 * Returns all active promo cards, sorted newest first.
 * When backend is ready: query `promos` table where is_active = true.
 */
export async function getPromos(): Promise<PromoCard[]> {
  // TODO: replace with Supabase / REST API call
  // const { data } = await supabase.from("promos").select("*").eq("is_active", true).order("published_at", { ascending: false });
  // return data ?? [];
  return MOCK_PROMOS.filter((p) => p.isActive !== false).sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
  );
}

/**
 * Returns all pricing tables (facials + drips).
 * When backend is ready: query `pricing_tables` table with related `pricing_rows`.
 */
export async function getPricingTables(): Promise<PricingTable[]> {
  // TODO: replace with Supabase / REST API call
  return MOCK_PRICING_TABLES;
}
