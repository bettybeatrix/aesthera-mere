import type { PromoCard, PricingTable } from "@/types/promo";

const MOCK_PROMOS: PromoCard[] = [

  {
    id: "ultraformer-mpt",
    title: "Ultraformer MPT Full Face & Neck (800 Shots)",
    category: "contour",
    categoryLabel: "Advanced Non-Surgical Face Lifting",
    badge: "Flagship Lifting",
    subtitle: "Advanced Multi-Depth Micro & Macro Focused Ultrasound",
    promoPrice: 59995,
    regularPrice: 79995,
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
    sessions: "800 shots · Full face and neck protocol",
    validUntil: "2026-12-31",
    validity: "Valid until December 31, 2026 (sample frontend offer).",
    terms: [
      "Sample offer and pricing are for frontend demonstration only.",
      "Discount applies to the listed treatment or package only.",
      "Treatment suitability, exact dosage or shot allocation, and final treatment plan are confirmed during consultation.",
      "Offers cannot be combined with other discounts unless the clinic confirms otherwise.",
      "Appointments are subject to clinic availability.",
    ],
    image: "/images/promotions/ultraformer-mpt.jpg",
    bonusText: "FREE Lemon Bottle + FREE Exilift 360",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
    terms: [
      "Offer details and sample pricing are for frontend demonstration only.",
      "Treatment suitability and final treatment plan are confirmed during consultation.",
      "Availability and final pricing will be updated when the website backend is connected.",
    ],
  },
  {
    id: "glass-skin-juvetox",
    title: "Glass Skin Glow with JuveTox",
    category: "injectables",
    categoryLabel: "Biostimulator & Pore Refinement",
    badge: "Most Popular",
    subtitle: "Juvelook PDLLA + 20 Units MicroTox + RemeePro",
    promoPrice: 27990,
    regularPrice: 45000,
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
    sessions: "1 combined Juvelook + 20-unit MicroTox treatment package",
    validUntil: "2026-12-31",
    validity: "Valid until December 31, 2026 (sample frontend offer).",
    terms: [
      "Sample offer and pricing are for frontend demonstration only.",
      "Discount applies to the listed treatment or package only.",
      "Treatment suitability, exact dosage or shot allocation, and final treatment plan are confirmed during consultation.",
      "Offers cannot be combined with other discounts unless the clinic confirms otherwise.",
      "Appointments are subject to clinic availability.",
    ],
    image: "/images/promotions/glass-skin-glow.jpg",
    bonusText: "Save ₱17,010 off regular price",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
    terms: [
      "Offer details and sample pricing are for frontend demonstration only.",
      "Treatment suitability and final treatment plan are confirmed during consultation.",
      "Availability and final pricing will be updated when the website backend is connected.",
    ],
  },
  {
    id: "thera-luhilo-snow",
    title: "Translucent Skin with Thera Luhilo Snow",
    category: "injectables",
    categoryLabel: "Amino Acids & Peptide Complex",
    badge: "10% OFF",
    subtitle: "High & Low Molecular Weight Amino Acids + Peptides",
    promoPrice: 19791,
    regularPrice: 21990,
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
    sessions: "1 Thera Luhilo Snow treatment session",
    validUntil: "2026-12-31",
    validity: "Valid until December 31, 2026 (sample frontend offer).",
    terms: [
      "Sample offer and pricing are for frontend demonstration only.",
      "Discount applies to the listed treatment or package only.",
      "Treatment suitability, exact dosage or shot allocation, and final treatment plan are confirmed during consultation.",
      "Offers cannot be combined with other discounts unless the clinic confirms otherwise.",
      "Appointments are subject to clinic availability.",
    ],
    image: "/images/promotions/luhilo-snow.jpg",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
    terms: [
      "Offer details and sample pricing are for frontend demonstration only.",
      "Treatment suitability and final treatment plan are confirmed during consultation.",
      "Availability and final pricing will be updated when the website backend is connected.",
    ],
  },
  {
    id: "lemon-bottle-slimming",
    title: "Lemon Bottle Fat Dissolving Package",
    category: "contour",
    categoryLabel: "Targeted Lipolysis & Sculpting",
    badge: "Best Value 4+1",
    subtitle: "Lecithin + Bromelain + Vitamin Complex",
    promoPrice: 27960,
    regularPrice: 39950,
    savings: "Save ₱11,990",
    description:
      "High-concentration lipolytic solution designed to target stubborn localized fat deposits across chin, arms, abdomen, or love handles safely and naturally.",
    inclusions: [
      "4+1 Lemon Bottle multi-vial package (5 bottles total)",
      "Single bottle promo available at ₱6,990 (Reg ₱7,990)",
      "FREE Thera Exilift 360 RF tightening with every treatment",
      "Body contour assessment & localized mapping",
    ],
    sessions: "4 + 1 package · 5 bottles total",
    validUntil: "2026-12-31",
    validity: "Valid until December 31, 2026 (sample frontend offer).",
    terms: [
      "Sample offer and pricing are for frontend demonstration only.",
      "Discount applies to the listed treatment or package only.",
      "Treatment suitability, exact dosage or shot allocation, and final treatment plan are confirmed during consultation.",
      "Offers cannot be combined with other discounts unless the clinic confirms otherwise.",
      "Appointments are subject to clinic availability.",
    ],
    image: "/images/promotions/lemon-bottle.jpg",
    bonusText: "FREE Thera Exilift 360 Included",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
    terms: [
      "Offer details and sample pricing are for frontend demonstration only.",
      "Treatment suitability and final treatment plan are confirmed during consultation.",
      "Availability and final pricing will be updated when the website backend is connected.",
    ],
  },
  {
    id: "botox-theratox",
    title: "TheraTox & TheraTox Elite Botox Promo",
    category: "injectables",
    categoryLabel: "Facial Rejuvenation",
    badge: "Per Unit Promo",
    subtitle: "Nabota & Xeomin Medical Neuromodulators",
    promoPrice: 150,
    regularPrice: 250,
    promoPriceLabel: "From ₱150 / unit",
    regularPriceLabel: "₱250 – ₱450 / unit",
    discountLabel: "UP TO 40% OFF",
    savings: "Nabota from ₱150/unit; Xeomin from ₱350/unit",
    description:
      "Smooth fine expression lines, soften masseter bulk for jawline slimming, or balance facial symmetry with genuine neurotoxins administered by physicians.",
    inclusions: [
      "TheraTox (Nabota Korea): As low as ₱150 per unit",
      "TheraTox Elite (Xeomin Germany - Zero Complexing Proteins): As low as ₱350 per unit",
      "Targeted areas: Forehead, Crow's feet, Frown lines, Jawtox, Lip flip",
      "Physician facial dynamics assessment & touch-up review",
    ],
    sessions: "Priced per unit; final unit count determined during physician consultation",
    validUntil: "2026-12-31",
    validity: "Valid until December 31, 2026 (sample frontend offer).",
    terms: [
      "Sample offer and pricing are for frontend demonstration only.",
      "Discount applies to the listed treatment or package only.",
      "Treatment suitability, exact dosage or shot allocation, and final treatment plan are confirmed during consultation.",
      "Offers cannot be combined with other discounts unless the clinic confirms otherwise.",
      "Appointments are subject to clinic availability.",
    ],
    image: "/images/promotions/botox-promo.jpg",
    publishedAt: "2026-04-25T00:00:00Z",
    isActive: true,
    terms: [
      "Offer details and sample pricing are for frontend demonstration only.",
      "Treatment suitability and final treatment plan are confirmed during consultation.",
      "Availability and final pricing will be updated when the website backend is connected.",
    ],
  },





];

const MOCK_PRICING_TABLES: PricingTable[] = [
  {
    id: "premium-facials",
    title: "Aesthera Premium Facials (5 + 1 Package)",
    subtitle: "Every package includes 6 total sessions (Buy 5, Get 1 FREE)",
    packageType: "5+1",
    rows: [
      { name: "Aqua Reset Facial", regular: 1980, promo: 1280, package: 6400, effective: 1066 },
      { name: "Oxy Radiance Facial", regular: 2280, promo: 1580, package: 7900, effective: 1316 },
      { name: "Carbon Laser Facial", regular: 2480, promo: 1580, package: 7900, effective: 1316 },
      { name: "Korean Skin Reset Facial", regular: 2480, promo: 1680, package: 8400, effective: 1400 },
      { name: "Korean Acne Clarity Facial", regular: 2980, promo: 1880, package: 9400, effective: 1566 },
    ],
  },
  {
    id: "elite-facials",
    title: "Aesthera Elite Facials (5 + 1 Package)",
    subtitle: "Elevated multi-technology fusion and Korean specialized care",
    packageType: "5+1",
    rows: [
      { name: "Korean Whitening Facial", regular: 3880, promo: 2880, package: 14400, effective: 2400 },
      { name: "Korean Age Defy Facial", regular: 3880, promo: 2880, package: 14400, effective: 2400 },
      { name: "Aqua Reset Fusion", regular: 3980, promo: 2580, package: 12900, effective: 2150 },
      { name: "Oxy Radiance Fusion", regular: 3980, promo: 2780, package: 13900, effective: 2316 },
    ],
  },
  {
    id: "hero-drips",
    title: "Aesthera Hero Drips (10 + 2 Package Pass)",
    subtitle: "Buy 10 infusions, get 2 FREE (12 total infusions)",
    packageType: "10+2",
    rows: [
      { name: "Harmonia's Push (Balance & Vitality)", regular: 1990, promo: 1190, package: 11900, effective: 991 },
      { name: "Helen's Drip (Trio Radiance)", regular: 2990, promo: 1890, package: 18900, effective: 1575 },
      { name: "Achilles' Drip (Myers Cocktail & Energy)", regular: 3480, promo: 1990, package: 19900, effective: 1658 },
    ],
  },
  {
    id: "divine-drips",
    title: "Aesthera Divine Drips (5 + 1 Package Pass)",
    subtitle: "Premium formulations for immunity, slimming, whitening, and performance",
    packageType: "5+1",
    rows: [
      { name: "Aphrodite Drip (Whitening + Anti-Aging)", regular: 3990, promo: 2990, package: 14950, effective: 2491 },
      { name: "Poseidon Drip (Immunity Booster + Anti-Aging)", regular: 3490, promo: 2990, package: 14950, effective: 2491 },
      { name: "Artemis Drip (Slimming + Metabolism)", regular: 4490, promo: 3290, package: 16450, effective: 2741 },
      { name: "Apollo Drip (Repair + Cellular Glow)", regular: 3490, promo: 2290, package: 11450, effective: 1908 },
      { name: "Zeus (Energy + Peak Performance)", regular: 5990, promo: 3990, package: 19950, effective: 3325 },
    ],
  },
];

export async function getPromos(): Promise<PromoCard[]> {
  const todayInManila = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return MOCK_PROMOS
    .filter((promo) => {
      if (promo.isActive === false) return false;
      if (promo.validUntil && promo.validUntil < todayInManila) return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );
}

export async function getPricingTables(): Promise<PricingTable[]> {
  return MOCK_PRICING_TABLES;
}
