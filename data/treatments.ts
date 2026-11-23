export type Treatment = {
  slug: string;
  name: string;
  cardDescription?: string;
  description: string;
  price: string;
  packagePrice?: string;
  priceNote?: string;
  priceLabel: "Per session" | "Starting price" | "Package" | "Price";
  image: string;
  imageAvailable?: boolean;
  benefits: string[];
  duration: string;
  sessions: string;
  downtime: string;
  collection?: "Premium Facial Selections" | "Elite Facial Selections";
};

export type TreatmentGroup = {
  slug: string;
  title: string;
  description: string;
  image: string;
  treatments: Treatment[];
};

export type TreatmentCategory = {
  slug: "skin-radiance" | "lift-contour" | "rejuvenation-volume" | "body-wellness";
  name: string;
  introduction: string;
  image: string;
  groups: TreatmentGroup[];
};

const consultationDetails = {
  duration: "Confirmed during consultation",
  sessions: "Personalized after assessment",
  downtime: "Discussed before treatment",
};

const premiumFacials: Treatment[] = [
  {
    slug: "aqua-reset-facial",
    name: "Aqua Reset Facial",
    cardDescription: "Deep cleansing, gentle exfoliation, and hydration for smoother, refreshed-looking skin.",
    description: "Aqua Reset Facial is a refreshing skincare treatment designed to deeply cleanse, gently exfoliate, and hydrate the skin. It helps remove surface impurities and buildup while promoting a smoother, softer, and more refreshed-looking complexion.",
    price: "₱1,280",
    packagePrice: "5+1 package: ₱6,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf1.png",
    collection: "Premium Facial Selections",
    benefits: ["Dull or congested-looking skin", "Dehydrated skin", "Rough or uneven-feeling texture"],
    duration: "Confirmed during consultation",
    sessions: "Personalized after assessment",
    downtime: "Usually minimal; temporary redness or sensitivity may occur",
  },
  {
    slug: "oxy-radiance-facial",
    name: "Oxy Radiance Facial",
    cardDescription: "Hydration-focused facial care for a brighter, more refreshed-looking complexion.",
    description: "Oxy Radiance Facial is a hydration-focused facial designed to refresh dull or tired-looking skin. The clinic-selected steps support surface hydration and a smoother, more luminous appearance; the exact products and oxygen-infusion protocol are confirmed during consultation.",
    price: "₱1,580",
    packagePrice: "5+1 package: ₱7,900",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf2.png",
    collection: "Premium Facial Selections",
    benefits: ["Hydration support", "Brighter-looking complexion", "Refreshed appearance"],
    ...consultationDetails,
  },
  {
    slug: "carbon-laser-facial",
    name: "Carbon Laser Facial",
    cardDescription: "Laser facial care for the appearance of pores, oiliness, and uneven texture.",
    description: "Carbon Laser Facial combines a topical carbon preparation with laser energy to target surface buildup and excess oil. It is designed to refine the appearance of enlarged pores and uneven texture while leaving the complexion looking clearer and brighter.",
    price: "₱1,580",
    packagePrice: "5+1 package: ₱7,900",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf3.png",
    collection: "Premium Facial Selections",
    benefits: ["Pore refinement", "Smoother-looking texture", "Brighter-looking skin"],
    ...consultationDetails,
  },
];

const eliteFacials: Treatment[] = [
  {
    slug: "korean-skin-reset-facial",
    name: "Korean Skin Reset Facial",
    cardDescription: "Cleansing, exfoliation, and hydration for smoother, balanced-looking skin.",
    description: "Korean Skin Reset Facial is a multi-step facial centered on cleansing, gentle exfoliation, and hydration. It is designed to lift away surface buildup and support a smoother, clearer, and more balanced-looking complexion; the exact products used are selected after skin assessment.",
    price: "₱1,680",
    packagePrice: "5+1 package: ₱8,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf4.png",
    collection: "Premium Facial Selections",
    benefits: ["Deep cleansing", "Texture refinement", "Balanced hydration"],
    ...consultationDetails,
  },
  {
    slug: "korean-acne-clarity-facial",
    name: "Korean Acne Clarity Facial",
    cardDescription: "Clarifying facial care for congested and blemish-prone skin.",
    description: "Korean Acne Clarity Facial is a clarifying facial designed for congested and blemish-prone skin. Its clinic-selected cleansing and exfoliating steps help remove surface buildup and support a calmer, clearer-looking complexion without replacing medical acne care when it is needed.",
    price: "₱1,880",
    packagePrice: "5+1 package: ₱9,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf5.png",
    collection: "Premium Facial Selections",
    benefits: ["Pore cleansing", "Blemish-prone skin care", "Calmer-looking skin"],
    ...consultationDetails,
  },
  {
    slug: "korean-whitening-facial",
    name: "Korean Whitening Facial",
    cardDescription: "Brightening facial care for dull, uneven-looking skin tone.",
    description: "Korean Whitening Facial is a brightening-focused facial intended to improve the appearance of dullness and uneven tone. It combines clinic-selected cleansing, exfoliating, and hydrating steps for a fresher, more luminous look; it does not bleach or permanently change natural skin color.",
    price: "₱2,880",
    packagePrice: "5+1 package: ₱14,400",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef1.png",
    collection: "Elite Facial Selections",
    benefits: ["Deep cleansing", "Gentle exfoliation", "Brighter-looking skin"],
    ...consultationDetails,
  },
  {
    slug: "korean-age-defy-facial",
    name: "Korean Age Defy Facial",
    cardDescription: "Hydrating facial care for smoother, refreshed, supple-looking skin.",
    description: "Korean Age Defy Facial is a hydration and texture-focused facial for skin showing dryness or early visible signs of aging. The selected facial steps support a smoother, softer, and more supple-looking complexion, with products tailored during consultation.",
    price: "₱2,880",
    packagePrice: "5+1 package: ₱14,400",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef2.png",
    collection: "Elite Facial Selections",
    benefits: ["Hydration support", "Texture care", "Refreshed appearance"],
    ...consultationDetails,
  },
  {
    slug: "aqua-reset-fusion",
    name: "Aqua Reset Fusion",
    cardDescription: "Aqua cleansing and hydration paired with a clinic-selected enhancement.",
    description: "Aqua Reset Fusion builds on the cleansing, gentle exfoliation, and hydration goals of the Aqua Reset Facial with an additional clinic-selected enhancement. It is designed for clients seeking a more intensive refreshed-skin treatment; the fusion component and suitability are confirmed during assessment.",
    price: "₱2,580",
    packagePrice: "5+1 package: ₱12,900",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef3.png",
    collection: "Elite Facial Selections",
    benefits: ["Deep cleansing", "Exfoliation", "Enhanced hydration"],
    ...consultationDetails,
  },
  {
    slug: "oxy-radiance-fusion",
    name: "Oxy Radiance Fusion",
    cardDescription: "Radiance-focused hydration paired with a clinic-selected enhancement.",
    description: "Oxy Radiance Fusion combines the hydration and radiance goals of the Oxy Radiance Facial with an additional clinic-selected enhancement. It is designed to support a smoother, brighter, more revitalized appearance, while the precise fusion protocol is personalized after consultation.",
    price: "₱2,780",
    packagePrice: "5+1 package: ₱13,900",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/epf5.png",
    collection: "Elite Facial Selections",
    benefits: ["Hydration support", "Radiance care", "Revitalized appearance"],
    ...consultationDetails,
  },
];

const premiumEliteFacials = [...premiumFacials, ...eliteFacials];

type TreatmentContent = Pick<Treatment, "cardDescription" | "description" | "benefits" | "downtime">;

const content = (
  cardDescription: string,
  description: string,
  benefits: string[],
  downtime = "Varies by treatment area and intensity; confirmed during consultation",
): TreatmentContent => ({ cardDescription, description, benefits, downtime });

const injectableDowntime = "Temporary redness, swelling, tenderness, or bruising may occur";
const energyDowntime = "Temporary redness, warmth, swelling, or sensitivity may occur";
const peelDowntime = "Peeling, dryness, redness, or sensitivity may occur depending on peel depth";
const ivDowntime = "Usually minimal; temporary discomfort or bruising at the IV site may occur";

const hairRemovalContent = content(
  "Light-based hair reduction tailored to the selected treatment area.",
  "This light-based hair-reduction treatment directs controlled energy toward pigment in the hair follicle to slow future growth. Because hair grows in cycles, a clinician normally plans a series of sessions after reviewing skin tone, hair color, treatment area, and medical history.",
  ["Unwanted facial or body hair", "Reduced frequency of shaving or waxing", "A personalized multi-session plan"],
  energyDowntime,
);

const exosomeSkinContent = content(
  "A skin-renewal procedure paired with a clinic-selected exosome product.",
  "This treatment pairs a controlled skin-renewal procedure with the clinic's selected exosome-based product. Exosome products and their combination with microneedling or energy devices have not been broadly authorized for cosmetic claims by the U.S. FDA, so the exact product, evidence, risks, and suitability should be reviewed with the treating physician before proceeding.",
  ["Clients considering an advanced skin-renewal protocol", "A physician-led product and safety review", "Texture and overall skin-quality goals"],
  "Downtime depends on the paired procedure and may include redness, swelling, sensitivity, or peeling",
);

const exosomeHairContent = content(
  "Scalp microneedling paired with a clinic-selected exosome product.",
  "This protocol combines scalp microneedling with the clinic's selected exosome-based product for clients concerned about hair density. Evidence and regulatory status vary by product, and microneedling devices are not generally cleared to deliver exosome products, so candidacy, alternatives, and risks require physician review.",
  ["Early hair-density concerns", "A clinician-assessed scalp treatment plan", "Clients who understand the product's evidence and limitations"],
  "Temporary scalp redness, tenderness, pinpoint bleeding, or swelling may occur",
);

const hifuFaceContent = content(
  "Focused ultrasound for non-surgical face and neck tightening.",
  "This non-invasive treatment delivers focused ultrasound energy beneath the skin to create controlled heating at selected depths. It is intended to support firmer-looking skin and improved facial or neck definition without surgery, with results and suitability depending on anatomy, skin laxity, and the device settings selected by the clinician.",
  ["Mild to moderate skin laxity", "Jawline and neck definition", "A non-surgical tightening option"],
  energyDowntime,
);

const hifuBodyContent = content(
  "Focused ultrasound for selected areas of body contour and firmness.",
  "This non-invasive body treatment uses focused ultrasound energy to heat selected tissue beneath the skin. It is designed to support contour and firmness in a localized area, but it is not a weight-loss procedure and does not replace nutrition, activity, or medically indicated care.",
  ["Localized contour concerns", "Selected areas of mild laxity", "A non-surgical body-treatment option"],
  energyDowntime,
);

const fillerContent = content(
  "Physician-led injectable treatment for balanced, natural-looking volume.",
  "Dermal filler is an injectable treatment used to restore or enhance volume and refine facial proportions. Product choice, placement, and amount are individualized after an anatomical assessment; although most reactions are temporary, rare vascular complications can be serious and require prompt medical care.",
  ["Facial volume or contour concerns", "Proportion and profile refinement", "A conservative, anatomy-led treatment plan"],
  injectableDowntime,
);

const boosterContent = content(
  "Injectable skin-quality treatment tailored to an individual concern.",
  "This injectable skin-booster protocol is selected to support hydration and overall skin quality rather than create structural volume. The exact product, active ingredients, delivery method, expected benefits, and regulatory status must be confirmed during the medical consultation.",
  ["Dehydrated or dull-looking skin", "Fine texture concerns", "A personalized skin-quality plan"],
  injectableDowntime,
);

const rejuranContent = content(
  "Polynucleotide-based injectable care for skin-quality concerns.",
  "Rejuran is a polynucleotide-based injectable treatment used in some markets for skin-quality and repair-focused goals. Product selection and placement vary by concern, and regulatory approval differs by country, so the physician will confirm authenticity, suitability, realistic outcomes, and alternatives before treatment.",
  ["Texture and elasticity concerns", "Fine, crepey-looking skin", "A physician-led skin-quality plan"],
  injectableDowntime,
);

const juvelookContent = content(
  "Injectable collagen-support treatment for selected skin-quality concerns.",
  "JuveLook is an injectable product generally described as combining poly-D,L-lactic acid particles with hyaluronic acid for gradual skin-quality and collagen-support goals. Technique and placement differ by treatment area, and local regulatory status should be confirmed during a physician consultation.",
  ["Fine texture concerns", "Gradual collagen-support goals", "Area-specific physician assessment"],
  injectableDowntime,
);

const ivContent = content(
  "Clinician-supervised IV infusion with a formula confirmed after assessment.",
  "This intravenous wellness infusion delivers the clinic's selected formula directly into a vein. Because the menu does not list the complete ingredients or evidence for this proprietary blend, the clinician should review the exact contents, source, intended purpose, contraindications, and alternatives before treatment; it is not a substitute for diagnosis or medical care.",
  ["Clients who have completed medical screening", "A formula selected around an identified need", "Clinician-supervised administration"],
  ivDowntime,
);

const treatmentContentBySlug: Record<string, TreatmentContent> = {
  "ipl-whitening": content("IPL care for the appearance of sun spots and uneven tone.", "Intense pulsed light uses filtered, broad-spectrum light to target selected pigment in the skin. It is designed to soften the appearance of sun-related discoloration and uneven tone, while settings and candidacy must be chosen carefully for the client's skin type and pigment pattern.", ["Sun-related spots", "Uneven-looking tone", "A brighter, more even-looking complexion"], energyDowntime),
  "ipl-hair-removal": hairRemovalContent,
  "ipl-skin-clarity": content("IPL care for selected redness and pigment-related clarity concerns.", "Intense pulsed light delivers controlled pulses of broad-spectrum light that can be selected for visible pigment or vascular targets. This treatment is designed to improve overall clarity and evenness, with the target concern and safe settings confirmed after a skin assessment.", ["Selected brown spots", "Visible redness", "Uneven-looking complexion"], energyDowntime),
  "ipl-bright-smooth": content("IPL care for a brighter, smoother, more even-looking complexion.", "IPL Bright and Smooth uses controlled broad-spectrum light to address selected color irregularities and support a more even-looking surface. It is best approached as a series planned around skin type, sun exposure, and the specific pigment or redness being treated.", ["Dull or uneven-looking tone", "Selected sun-related discoloration", "Overall clarity and smoothness goals"], energyDowntime),
  "diode-hair-removal": hairRemovalContent,
  "thera-pico-laser": content("Short-pulse laser care for selected pigment and texture concerns.", "A picosecond laser delivers extremely short pulses of energy that break selected pigment into smaller particles while limiting prolonged heat exposure. Depending on the device and settings, it may be used for certain pigmentation, tattoo, or texture concerns after a clinician confirms the indication and skin type.", ["Selected pigmentation concerns", "Certain tattoo or discoloration concerns", "A clinician-selected laser plan"], energyDowntime),
  "thera-fractional-laser": content("Fractional laser resurfacing for texture, scars, and visible skin renewal.", "Fractional laser treatment creates a pattern of microscopic treatment zones while leaving surrounding skin untreated. This controlled resurfacing approach is used to improve the appearance of texture, fine lines, and selected scars, with treatment depth determining recovery time and risk.", ["Uneven texture", "Selected acne or other scars", "Fine lines and visible photoaging"], "Redness, swelling, sensitivity, crusting, or peeling may occur; recovery varies with treatment depth"),
  "precision-laser-wart-removal": content("Targeted laser removal for a clinician-confirmed wart.", "Precision laser wart removal uses focused energy to destroy selected wart tissue after the lesion has been examined. A clinician must first confirm that the growth is appropriate for laser treatment, since not every raised or pigmented lesion is a wart and some require diagnostic evaluation.", ["Clinician-confirmed warts", "A localized treatment area", "Lesions appropriate for laser removal"], "Tenderness, crusting, redness, or a small wound may occur while the area heals"),

  "thera-biorenew-peel": content("Clinic-selected chemical peel for tone and texture renewal.", "A chemical peel applies a controlled exfoliating solution to remove selected outer layers of skin and encourage a fresher-looking surface. Peel strength and ingredients determine the expected improvement, recovery, and risk of irritation or pigment change, so they are selected after a skin assessment.", ["Dull or uneven-looking skin", "Rough texture", "Selected superficial discoloration"], peelDowntime),
  "korean-facial-skin-renewal-peel": content("Facial peel care for smoother texture and a refreshed-looking tone.", "This facial renewal peel uses a clinic-selected exfoliating formula to loosen damaged surface cells and reveal a smoother-looking complexion. The precise acids, concentration, number of layers, and aftercare are confirmed according to skin type and sensitivity.", ["Dullness", "Uneven-looking texture", "Selected superficial pigment concerns"], peelDowntime),
  "korean-body-clarity-renewal-peel": content("Body peel care for rough texture and uneven-looking tone.", "This body renewal peel applies a controlled exfoliating formula to a selected area to address surface buildup, roughness, and uneven-looking tone. The treatment strength and area-specific aftercare are customized to reduce irritation and pigment-change risk.", ["Rough body texture", "Congestion in selected body areas", "Uneven-looking body skin tone"], peelDowntime),
  "thera-prx-glow": content("No-needle topical biostimulation peel for radiance and texture goals.", "Thera PRX Glow is a professionally applied topical treatment intended to support brighter-looking, smoother skin with limited surface peeling compared with traditional medium-depth peels. The exact PRX product, ingredients, application layers, and candidacy should be confirmed by the clinic before treatment.", ["Dull-looking skin", "Fine texture concerns", "Face or face-and-neck radiance goals"], peelDowntime),
  "thera-prx-glow-premium": content("Enhanced PRX protocol for radiance and texture-focused care.", "Thera PRX Glow Premium builds on the clinic's PRX topical protocol with a premium enhancement selected for the client's skin goals. Because the menu does not identify the added product or steps, the complete formula, expected benefit, and recovery instructions are confirmed during consultation.", ["Dullness and uneven-looking texture", "A more intensive topical renewal plan", "Face or face-and-neck care"], peelDowntime),
  "thera-prx-glow-elite": content("Elite PRX protocol personalized for advanced skin-quality goals.", "Thera PRX Glow Elite is the clinic's highest-tier PRX-based topical renewal protocol. Its exact enhancements are proprietary and should be reviewed before treatment, including product names, ingredients, evidence, potential irritation, and how it differs from the standard and premium options.", ["Advanced radiance and texture goals", "A personalized elite protocol", "Clients who have completed a full skin assessment"], peelDowntime),
  "thera-scarflift-precision": content("Targeted scar-focused resurfacing for selected areas.", "Thera ScarFlift Precision is a localized scar-revision protocol intended to improve the appearance of selected textural irregularities. The clinic must confirm the device or technique used, scar type, treatment depth, and whether another approach would be safer or more effective.", ["Selected acne or traumatic scars", "Localized textural irregularities", "A targeted clinician-led plan"], "Redness, swelling, sensitivity, crusting, or peeling may occur depending on the technique used"),
  "thera-scarflift-infusion": content("Scar-focused resurfacing paired with a clinic-selected topical infusion.", "Thera ScarFlift Infusion combines a scar-focused procedure with a clinic-selected product intended to support the treatment plan. The exact resurfacing method and infused product are not specified in the menu and must be reviewed for evidence, compatibility, and safety before treatment.", ["Selected scars and uneven texture", "A combined procedure plan", "Clients who understand the product and recovery requirements"], "Recovery depends on the procedure and may include redness, swelling, sensitivity, crusting, or peeling"),

  "thera-skinpen-microneedling": content("Medical microneedling for selected scars, wrinkles, and texture concerns.", "SkinPen microneedling uses sterile, fine needles to create controlled microscopic channels in the skin. Authorized microneedling devices are used for specific indications such as the appearance of certain acne scars and facial wrinkles; candidacy, needle depth, infection control, and aftercare require a trained provider.", ["Selected facial acne scars", "Fine lines and texture concerns", "A clinician-controlled renewal treatment"], "Redness, tightness, pinpoint bleeding, itching, or peeling may last several days"),
  "thera-prp-regenerative-therapy-face": content("Autologous platelet-rich plasma treatment for selected skin-quality goals.", "PRP is prepared from a sample of the client's own blood to concentrate platelets, then applied or injected according to the physician's protocol. It is offered for skin-quality goals, but preparation methods and evidence vary, and combining PRP with microneedling has not been broadly reviewed by the U.S. FDA.", ["Texture and overall skin-quality goals", "Clients seeking an autologous option", "A physician-reviewed treatment plan"], injectableDowntime),
  "thera-xosomes-elite-skinpen": exosomeSkinContent,
  "thera-xosomes-elite-rf-microneedling": exosomeSkinContent,
  "thera-xosomes-elite-co2-fractional": exosomeSkinContent,
  "thera-xosomes-elite-remeepro": exosomeSkinContent,
  "thera-prp-regenerative-therapy-hair": content("Autologous platelet-rich plasma injections for physician-assessed hair loss.", "Hair PRP uses a concentration of platelets prepared from the client's own blood and injected into the scalp. It may be considered for selected types of hair thinning, but diagnosis matters because hormonal, nutritional, inflammatory, scarring, and other causes require different treatment.", ["Early non-scarring hair thinning", "A clinician-confirmed diagnosis", "An autologous treatment option"], "Temporary scalp tenderness, redness, swelling, or pinpoint bleeding may occur"),
  "hair-thera-xosomes-premium-dr-pen": exosomeHairContent,
  "hair-thera-xosomes-premium-remeepro": exosomeHairContent,
  "hair-thera-xosomes-elite-dr-pen": exosomeHairContent,
  "hair-thera-xosomes-elite-remeepro": exosomeHairContent,

  "thera-hifu-contouring-face-neck": hifuFaceContent,
  "ultraformer-mpt-face-neck": hifuFaceContent,
  "thera-hifu-contouring-body": hifuBodyContent,
  "thera-exilift-360": content("Non-invasive energy-based care for localized contour and firmness.", "Thera Exilift 360 is presented as a non-invasive contouring treatment for selected body areas. The menu does not identify the exact device platform or energy type, so the clinic should confirm how it works, its regulatory status, expected result, contraindications, and whether it targets skin, fat, or both.", ["Localized contour concerns", "Mild firmness goals", "A non-surgical treatment plan"], energyDowntime),
  "thera-cryolipo": content("Controlled cooling for localized, pinchable fat bulges.", "Cryolipolysis uses controlled cooling to damage a portion of fat cells in a selected area, which the body gradually clears. It is intended for body contouring rather than weight loss; uncommon but important risks include prolonged pain, contour irregularity, and paradoxical fat enlargement.", ["Localized pinchable fat", "Body-contour refinement", "Clients near a stable weight"], "Temporary numbness, redness, swelling, tenderness, or bruising may occur"),
  "ultraformer-mpt-body": hifuBodyContent,
  "therasculpt-neo": content("Non-invasive muscle-stimulation treatment for improved definition.", "TheraSculpt Neo is presented as a non-invasive body treatment intended to stimulate muscle contractions for tone and definition. The exact energy platform and device authorization should be confirmed by the clinic, and the treatment does not replace strength training or medically indicated weight management.", ["Selected muscle-definition goals", "A non-surgical body program", "Clients cleared for energy-based muscle stimulation"], "Temporary muscle soreness or fatigue may occur"),
  "thera-slimming-injections": content("A physician-assessed injection and energy-based contouring combination.", "Thera Slimming Injections combines the product marketed as Lemon Bottle with Thera Exilift 360. The exact injectable ingredients, registration status, evidence, and risks must be verified before treatment; this localized contouring service is not a substitute for medical weight management.", ["Localized contour concerns", "Clients who complete medical eligibility screening", "A clear review of the injectable product and alternatives"], "Injection-site redness, swelling, bruising, tenderness, or other product-specific reactions may occur"),
  "thera-body-contouring-program": content("A multi-modality contouring program combining injections, energy, and muscle stimulation.", "This program combines the product marketed as Lemon Bottle, Thera Exilift 360, and TheraSculpt Neo for localized body-contour goals. Because it combines multiple modalities, the clinic should verify each device and injectable product, explain how the components differ, and screen for cumulative risks before enrollment.", ["A structured multi-modality contour plan", "Localized contour and muscle-definition goals", "Clients cleared for every program component"], "Recovery varies by component and may include injection-site reactions, warmth, tenderness, or muscle soreness"),

  "theratox": content("Botulinum toxin treatment planned by facial area and muscle activity.", "TheraTox is a botulinum toxin treatment that temporarily reduces signaling between selected nerves and muscles. It may soften dynamic expression lines or address other physician-selected areas, with dose and placement individualized to anatomy, movement, and the specific product used.", ["Dynamic expression lines", "Selected facial-muscle or sweating concerns", "A physician-led dosing plan"], injectableDowntime),
  "theratox-elite-xeomin": content("Xeomin botulinum toxin treatment tailored by area and muscle activity.", "TheraTox Elite uses Xeomin, an injectable botulinum toxin product that temporarily reduces activity in specifically targeted muscles. A physician determines whether the requested area is appropriate, selects the dose and placement, and reviews risks such as asymmetry, eyelid effects, swallowing difficulty, or unintended weakness.", ["Dynamic expression lines", "Selected physician-assessed treatment areas", "Individualized dosing and placement"], injectableDowntime),
  "thera-lip-premium-filler": fillerContent,
  "thera-lip-elite-filler": fillerContent,
  "thera-premium-filler": fillerContent,
  "thera-elite-filler": fillerContent,
  "thera-radiance-signature-booster": boosterContent,
  "thera-repair-signature-booster": boosterContent,
  "thera-lift-signature-booster": boosterContent,
  "thera-rejuran-h": rejuranContent,
  "thera-rejuran-h-remeepro": rejuranContent,
  "thera-rejuran-h-plus": rejuranContent,
  "thera-rejuran-h-plus-remeepro": rejuranContent,
  "thera-painless-rejuran": rejuranContent,
  "thera-rejuran-i": rejuranContent,
  "thera-rejuran-s": rejuranContent,
  "thera-luhilo-classic": boosterContent,
  "thera-luhilo-snow": boosterContent,
  "thera-juvelook": juvelookContent,
  "thera-juvelook-remeepro": juvelookContent,
  "thera-juvelook-cannula": juvelookContent,
  "thera-juvelook-undereye": juvelookContent,
  "thera-italian-lip-booster": content("Injectable lip-hydration treatment for a soft, refreshed appearance.", "This lip booster is presented as an injectable treatment focused on hydration and surface quality rather than substantial structural volume. The exact product, ingredients, regulatory status, and expected difference from lip filler should be confirmed with the physician before treatment.", ["Dry or finely lined-looking lips", "Subtle hydration goals", "Clients seeking less volume than traditional filler"], injectableDowntime),
  "thera-nctf-treatment": boosterContent,
  "thera-sculptra": content("PLLA injectable treatment for gradual facial collagen support.", "Sculptra is an injectable poly-L-lactic acid implant used for selected facial contour deficiencies and wrinkles. Improvement develops gradually as the treatment supports structural correction, and a licensed clinician determines placement, number of sessions, and whether the client is an appropriate candidate.", ["Gradual facial-volume correction", "Cheek and selected wrinkle concerns", "Clients comfortable with a staged treatment plan"], injectableDowntime),
  "thera-sculptra-collagen-renewal-program": content("A staged Sculptra program for gradual collagen and contour support.", "This program organizes Sculptra, an injectable poly-L-lactic acid treatment, into a physician-planned course for gradual facial correction. The number of vials and visits must be based on anatomy and treatment goals rather than the package alone, and results develop over time rather than immediately.", ["Gradual facial contour support", "A physician-planned series", "Longer-term collagen and wrinkle goals"], injectableDowntime),

  "harmonias-push": ivContent,
  "helens-drip": ivContent,
  "hercules-drip": ivContent,
  "aphrodite-drip": ivContent,
  "poseidon-drip": ivContent,
  "zeus": ivContent,
  "apollo-drip": ivContent,
  "artemis-drip": ivContent,
  "thera-nad-plus": content("Clinician-supervised NAD+ infusion after medical screening.", "Thera NAD+ is an intravenous infusion containing nicotinamide adenine dinucleotide at the menu-listed dose. Evidence for many marketed wellness and anti-aging claims remains limited, and sterile sourcing, infusion rate, contraindications, and possible reactions should be reviewed before treatment.", ["Clients who complete medical screening", "A clearly documented sterile product source", "Realistic expectations about limited wellness evidence"], ivDowntime),
  "thera-nad-plus-elite": content("Premium NAD+ infusion with the exact formula confirmed before treatment.", "Thera NAD+ Elite is the clinic's premium NAD+ infusion option. The menu identifies the dose but not every ingredient or how it differs from standard NAD+, so the clinician should disclose the full RejuvaNAD+ formula, sterile source, evidence, infusion protocol, and risks before administration.", ["Clients who complete medical screening", "A documented review of the elite formula", "Realistic expectations about limited wellness evidence"], ivDowntime),
  "glp-1-compound-weight-management": content("Doctor-supervised compounded GLP-1 protocol for eligible weight-management patients.", "This protocol uses a compounded GLP-1–based medication as part of a medically supervised weight-management plan. Compounded products are not FDA-approved and can differ in concentration, ingredients, and quality, so the prescribing clinician must confirm the active drug, licensed source, dose, eligibility, interactions, and monitoring plan.", ["Eligible adults after medical assessment", "Structured nutrition and activity support", "Ongoing prescription monitoring"], "Medication side effects can include nausea, vomiting, diarrhea, constipation, abdominal symptoms, and other serious reactions"),
  "mounjaro-weight-management": content("Doctor-supervised tirzepatide protocol with eligibility and safety monitoring.", "Mounjaro contains tirzepatide, a GIP and GLP-1 receptor agonist approved for type 2 diabetes; tirzepatide is approved for chronic weight management under the Zepbound brand for eligible patients. Use for weight management requires prescription screening, dose titration, nutrition and activity support, and monitoring for gastrointestinal and other serious adverse effects.", ["Eligible adults after medical assessment", "A structured long-term weight-management plan", "Ongoing monitoring and dose review"], "Common reactions include nausea, diarrhea, reduced appetite, vomiting, constipation, indigestion, and abdominal pain"),
  "collagen-boost": content("Optional IV add-on with ingredients confirmed before administration.", "Collagen Boost is offered as an ampoule added to an eligible IV treatment. The menu does not disclose the active ingredient or evidence supporting a collagen claim, so the clinic should provide the product name, complete formulation, sterile source, contraindications, and expected purpose before consent.", ["Clients already eligible for an IV treatment", "A documented ingredient and safety review", "Use only when clinically appropriate"], ivDowntime),
  "placenta-boost": content("Optional placenta-derived IV add-on requiring full product disclosure.", "Placenta Boost is offered as an ampoule added to an eligible IV treatment. Placenta-derived products vary in source and regulatory status, so the exact brand, ingredients, donor and infection safeguards, evidence, contraindications, and local authorization should be reviewed before administration.", ["Clients already eligible for an IV treatment", "A documented product and source review", "Physician-confirmed suitability"], ivDowntime),
};

type PendingMenuTreatment = Pick<Treatment, "slug" | "name" | "price" | "priceLabel" | "image"> &
  Pick<Partial<Treatment>, "packagePrice" | "priceNote">;

function createPendingMenuTreatment(input: PendingMenuTreatment): Treatment {
  const researchedContent = treatmentContentBySlug[input.slug];

  if (!researchedContent) {
    throw new Error(`Missing treatment content for ${input.slug}`);
  }

  return {
    ...input,
    ...researchedContent,
    imageAvailable: false,
    duration: consultationDetails.duration,
    sessions: consultationDetails.sessions,
  };
}

const laserTreatments: Treatment[] = [
  createPendingMenuTreatment({ slug: "ipl-whitening", name: "IPL Whitening", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-whitening.png" }),
  createPendingMenuTreatment({ slug: "ipl-hair-removal", name: "IPL Hair Removal", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-hair-removal.png" }),
  createPendingMenuTreatment({ slug: "ipl-skin-clarity", name: "IPL Skin Clarity", price: "₱1,495–₱2,495 by area", packagePrice: "5+2: ₱7,475–₱12,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-skin-clarity.png" }),
  createPendingMenuTreatment({ slug: "ipl-bright-smooth", name: "IPL Bright and Smooth", price: "₱2,495–₱3,995 by area", packagePrice: "5+2: ₱12,475–₱19,975", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-bright-smooth.png" }),
  createPendingMenuTreatment({ slug: "diode-hair-removal", name: "Diode Hair Removal", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/diode-hair-removal.png" }),
  createPendingMenuTreatment({ slug: "thera-pico-laser", name: "Thera Pico Laser / Thera Pico Treatment", price: "₱1,495–₱3,495 by area", packagePrice: "5+2: ₱7,475–₱17,475", priceNote: "Overview lists a ₱1,495 starting price.", priceLabel: "Starting price", image: "/images/treatments/laser-treatments/thera-pico-laser.png" }),
  createPendingMenuTreatment({ slug: "thera-fractional-laser", name: "Thera Fractional Laser", price: "₱2,995–₱6,995 by area", packagePrice: "3+1: ₱8,985–₱20,985", priceLabel: "Per session", image: "/images/treatments/laser-treatments/thera-fractional-laser.png" }),
  createPendingMenuTreatment({ slug: "precision-laser-wart-removal", name: "Precision Laser Wart Removal", price: "₱2,995 per area", packagePrice: "3+1: ₱8,985", priceLabel: "Price", image: "/images/treatments/laser-treatments/precision-laser-wart-removal.png" }),
];

const skinPeelsResurfacing: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-biorenew-peel", name: "Thera BioRenew Peel", price: "₱4,790–₱8,990 by area", packagePrice: "3+1: ₱14,370–₱26,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-biorenew-peel.png" }),
  createPendingMenuTreatment({ slug: "korean-facial-skin-renewal-peel", name: "Korean Facial Skin Renewal Peel", price: "₱5,480", packagePrice: "3 sessions (10% off): ₱14,796", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/korean-facial-skin-renewal-peel.png" }),
  createPendingMenuTreatment({ slug: "korean-body-clarity-renewal-peel", name: "Korean Body Clarity Renewal Peel", price: "₱3,990–₱6,990 by area", packagePrice: "3 sessions (10% off): ₱10,773–₱18,873", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/korean-body-clarity-renewal-peel.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow", name: "Thera PRX Glow", price: "₱9,990 full face; ₱11,990 face + neck", packagePrice: "3 sessions: ₱23,976–₱28,976", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow-premium", name: "Thera PRX Glow Premium", price: "₱12,990 full face; ₱14,990 face + neck", packagePrice: "3 sessions: ₱31,176–₱35,976", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow-premium.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow-elite", name: "Thera PRX Glow Elite", price: "₱21,990 full face; ₱23,990 face + neck", packagePrice: "3 sessions: ₱52,776–₱57,576", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow-elite.png" }),
  createPendingMenuTreatment({ slug: "thera-scarflift-precision", name: "Thera ScarFlift Precision", price: "₱4,990", packagePrice: "3+1: ₱14,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-scarflift-precision.png" }),
  createPendingMenuTreatment({ slug: "thera-scarflift-infusion", name: "Thera ScarFlift Infusion", price: "₱5,990", packagePrice: "3+1: ₱17,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-scarflift-infusion.png" }),
];

const microneedlingSkinRepair: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-skinpen-microneedling", name: "Thera SkinPen Microneedling", price: "₱11,990", packagePrice: "3 sessions (15% off): ₱30,574.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-skinpen-microneedling.png" }),
  createPendingMenuTreatment({ slug: "thera-prp-regenerative-therapy-face", name: "TheraPRP Regenerative Therapy – Face", price: "₱3,990", packagePrice: "3 sessions (20% off): ₱9,576", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-prp-face.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-skinpen", name: "TheraXosomes Elite (ASCE+) – SkinPen", price: "₱24,990", packagePrice: "3 sessions (15% off): ₱63,724.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-skinpen.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-rf-microneedling", name: "TheraXosomes Elite (ASCE+) – RF Microneedling", price: "₱18,990", packagePrice: "3 sessions (15% off): ₱48,424.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-rf-microneedling.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-co2-fractional", name: "TheraXosomes Elite (ASCE+) – CO2 Fractional", price: "₱18,990", packagePrice: "3 sessions (15% off): ₱48,424.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-co2-fractional.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-remeepro", name: "TheraXosomes Elite (ASCE+) – RemeePro", price: "₱24,990", packagePrice: "3 sessions (15% off): ₱63,724.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-remeepro.png" }),
];

const hairRestoration: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-prp-regenerative-therapy-hair", name: "TheraPRP Regenerative Therapy – Hair", price: "₱4,990", packagePrice: "3 sessions (20% off): ₱11,976", priceLabel: "Per session", image: "/images/treatments/hair-restoration/thera-prp-hair.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-premium-dr-pen", name: "Hair TheraXosomes Premium – Dr. Pen", price: "₱7,990", packagePrice: "3 sessions (15% off): ₱20,374.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-premium-dr-pen.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-premium-remeepro", name: "Hair TheraXosomes Premium – RemeePro", price: "₱10,990", packagePrice: "3 sessions (15% off): ₱28,024.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-premium-remeepro.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-elite-dr-pen", name: "Hair TheraXosomes Elite (ASCE+) – Dr. Pen", price: "₱19,990", packagePrice: "3 sessions (15% off): ₱50,974.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-elite-dr-pen.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-elite-remeepro", name: "Hair TheraXosomes Elite (ASCE+) – RemeePro", price: "₱23,990", packagePrice: "3 sessions (15% off): ₱61,174.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-elite-remeepro.png" }),
];

const faceLiftingTightening: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-hifu-contouring-face-neck", name: "Thera HIFU Contouring (12D) – Face & Neck", price: "₱2,995–₱4,995 by area", packagePrice: "3+1: ₱8,985–₱14,985", priceLabel: "Per session", image: "/images/treatments/face-lifting-tightening/thera-hifu-face-neck.png" }),
  createPendingMenuTreatment({ slug: "ultraformer-mpt-face-neck", name: "Ultraformer MPT – Face & Neck", price: "₱39,990–₱59,990 by area", priceLabel: "Price", image: "/images/treatments/face-lifting-tightening/ultraformer-mpt-face-neck.png" }),
];

const bodyContouringFatReduction: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-hifu-contouring-body", name: "Thera HIFU Contouring (12D) – Body", price: "₱4,995–₱5,995 by area", packagePrice: "3+1: ₱14,985–₱17,985", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-hifu-body.png" }),
  createPendingMenuTreatment({ slug: "thera-exilift-360", name: "Thera Exilift 360", price: "₱1,995–₱2,995 by size", packagePrice: "5+2: ₱9,975–₱14,975", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-exilift-360.png" }),
  createPendingMenuTreatment({ slug: "thera-cryolipo", name: "Thera Cryolipo", price: "₱3,995 any area", packagePrice: "5+1: ₱19,975", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-cryolipo.png" }),
  createPendingMenuTreatment({ slug: "ultraformer-mpt-body", name: "Ultraformer MPT – Abdomen & Arms", price: "₱89,990 abdomen; ₱74,990 arms", priceLabel: "Price", image: "/images/treatments/body-contouring-fat-reduction/ultraformer-mpt-body.png" }),
];

const muscleToning: Treatment[] = [
  createPendingMenuTreatment({ slug: "therasculpt-neo", name: "TheraSculpt Neo", price: "₱2,495", packagePrice: "5+2: ₱12,475", priceLabel: "Per session", image: "/images/treatments/muscle-toning/therasculpt-neo.png" }),
];

const slimmingBodySculptingPrograms: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-slimming-injections", name: "Thera Slimming Injections", price: "₱6,990", packagePrice: "4+1: ₱27,960", priceNote: "Includes Lemon Bottle + Thera Exilift 360.", priceLabel: "Per session", image: "/images/treatments/slimming-body-sculpting/thera-slimming-injections.png" }),
  createPendingMenuTreatment({ slug: "thera-body-contouring-program", name: "Thera Body Contouring Program", price: "₱9,990", packagePrice: "4+1: ₱39,960", priceNote: "Includes Lemon Bottle + Thera Exilift 360 + TheraSculpt Neo.", priceLabel: "Per session", image: "/images/treatments/slimming-body-sculpting/thera-body-contouring-program.png" }),
];

const theraToxAreaPrices = "Forehead ₱4,990; Frowns ₱4,990; Crow’s Feet ₱4,990; Jawtox ₱8,990; Nefertiti ₱4,990; Lip Flip ₱3,590; Nosetox ₱4,990; Sweatox ₱14,990; Traptox ₱9,990; Barbie Arms/Legs ₱14,990.";
const theraToxEliteAreaPrices = "Forehead ₱7,490; Frowns ₱7,490; Crow’s Feet ₱7,490; Jawtox ₱16,990; Nefertiti ₱7,490; Lip Flip ₱4,990; Nosetox ₱7,490; Sweatox ₱29,990; Traptox ₱10,990; Barbie Arms/Legs ₱29,990.";

const botoxTreatments: Treatment[] = [
  createPendingMenuTreatment({ slug: "theratox", name: "TheraTox", price: "₱3,590–₱14,990 depending on area", priceNote: theraToxAreaPrices, priceLabel: "Per session", image: "/images/treatments/botox-treatments/theratox.png" }),
  createPendingMenuTreatment({ slug: "theratox-elite-xeomin", name: "TheraTox Elite (Xeomin)", price: "₱4,990–₱29,990 depending on area", priceNote: theraToxEliteAreaPrices, priceLabel: "Per session", image: "/images/treatments/botox-treatments/theratox-elite-xeomin.png" }),
];

const dermalLipFillers: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-lip-premium-filler", name: "Thera Lip Premium Filler", price: "₱11,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-lip-premium-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-lip-elite-filler", name: "Thera Lip Elite Filler", price: "₱23,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-lip-elite-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-premium-filler", name: "Thera Premium Filler", price: "₱11,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-premium-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-elite-filler", name: "Thera Elite Filler", price: "₱23,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-elite-filler.png" }),
];

const signatureSkinBoosters: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-radiance-signature-booster", name: "Thera Radiance Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-radiance-signature-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-repair-signature-booster", name: "Thera Repair Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-repair-signature-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-lift-signature-booster", name: "Thera Lift Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-lift-signature-booster.png" }),
];

const eliteSkinBoostersRenewal: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-rejuran-h", name: "Thera Rejuran H", price: "₱23,995", packagePrice: "3 sessions: ₱64,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-remeepro", name: "Thera Rejuran H + RemeePro", price: "₱26,995", packagePrice: "3 sessions: ₱72,886.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-plus", name: "Thera Rejuran H+", price: "₱35,995", packagePrice: "3 sessions: ₱97,186.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-plus.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-plus-remeepro", name: "Thera Rejuran H+ + RemeePro", price: "₱38,995", packagePrice: "3 sessions: ₱105,286.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-plus-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-painless-rejuran", name: "Thera Painless Rejuran", price: "₱39,995", packagePrice: "3 sessions: ₱107,986.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-painless-rejuran.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-i", name: "Thera Rejuran I", price: "₱13,995", packagePrice: "3 sessions: ₱37,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-i.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-s", name: "Thera Rejuran S", price: "₱13,995", packagePrice: "3 sessions: ₱37,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-s.png" }),
  createPendingMenuTreatment({ slug: "thera-luhilo-classic", name: "Thera Luhilo Classic", price: "₱18,990", packagePrice: "3 sessions: ₱51,273", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-luhilo-classic.png" }),
  createPendingMenuTreatment({ slug: "thera-luhilo-snow", name: "Thera Luhilo Snow", price: "₱21,990", packagePrice: "3 sessions: ₱59,373", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-luhilo-snow.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook", name: "Thera JuveLook", price: "₱19,990", packagePrice: "3 sessions: ₱47,976", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-remeepro", name: "Thera JuveLook with RemeePro", price: "₱22,990", packagePrice: "3 sessions: ₱55,176", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-cannula", name: "Thera JuveLook with Cannula", price: "₱22,990", packagePrice: "3 sessions: ₱55,176", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-cannula.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-undereye", name: "Thera JuveLook – Undereye", price: "₱13,990", packagePrice: "3 sessions: ₱33,576", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-undereye.png" }),
  createPendingMenuTreatment({ slug: "thera-italian-lip-booster", name: "Thera Italian Lip Booster", price: "₱12,990", packagePrice: "3 sessions: ₱35,073", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-italian-lip-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-nctf-treatment", name: "Thera NCTF Treatment", price: "₱18,990", packagePrice: "3 sessions: ₱51,273", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-nctf-treatment.png" }),
  createPendingMenuTreatment({ slug: "thera-sculptra", name: "Thera Sculptra", price: "₱44,990", priceLabel: "Price", image: "/images/treatments/elite-skin-boosters/thera-sculptra.png" }),
];

const collagenRenewalPrograms: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-sculptra-collagen-renewal-program", name: "Thera Sculptra Collagen Renewal Program", price: "₱134,970", priceLabel: "Package", image: "/images/treatments/collagen-renewal/thera-sculptra-collagen-renewal-program.png" }),
];

const heroAestheraDrips: Treatment[] = [
  createPendingMenuTreatment({ slug: "harmonias-push", name: "Harmonia’s Push (Balance)", price: "₱1,190", packagePrice: "10+2: ₱11,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/harmonias-push.png" }),
  createPendingMenuTreatment({ slug: "helens-drip", name: "Helen’s Drip (Trio)", price: "₱1,890", packagePrice: "10+2: ₱18,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/helens-drip.png" }),
  createPendingMenuTreatment({ slug: "hercules-drip", name: "Hercules Drip (Myer’s Cocktail)", price: "₱1,990", packagePrice: "10+2: ₱19,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/hercules-drip.png" }),
];

const divineAestheraDrips: Treatment[] = [
  createPendingMenuTreatment({ slug: "aphrodite-drip", name: "Aphrodite Drip", price: "₱2,990", packagePrice: "5+1: ₱14,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/aphrodite-drip.png" }),
  createPendingMenuTreatment({ slug: "poseidon-drip", name: "Poseidon Drip", price: "₱2,990", packagePrice: "5+1: ₱14,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/poseidon-drip.png" }),
  createPendingMenuTreatment({ slug: "zeus", name: "Zeus", price: "₱3,990", packagePrice: "5+1: ₱19,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/zeus.png" }),
  createPendingMenuTreatment({ slug: "apollo-drip", name: "Apollo Drip", price: "₱2,290", packagePrice: "5+1: ₱11,450", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/apollo-drip.png" }),
  createPendingMenuTreatment({ slug: "artemis-drip", name: "Artemis Drip", price: "₱3,290", packagePrice: "5+1: ₱16,450", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/artemis-drip.png" }),
];

const nadTherapy: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-nad-plus", name: "Thera NAD+", price: "125 mg: ₱9,990; 250 mg: ₱16,990", packagePrice: "3 sessions — 125 mg: ₱26,973; 250 mg: ₱45,873", priceLabel: "Per session", image: "/images/treatments/nad-therapy/thera-nad-plus.png" }),
  createPendingMenuTreatment({ slug: "thera-nad-plus-elite", name: "Thera NAD+ Elite (RejuvaNAD+)", price: "125 mg: ₱11,990; 250 mg: ₱19,990", packagePrice: "3 sessions — 125 mg: ₱32,373; 250 mg: ₱53,973", priceLabel: "Per session", image: "/images/treatments/nad-therapy/thera-nad-plus-elite.png" }),
];

const weightManagementProtocols: Treatment[] = [
  createPendingMenuTreatment({ slug: "glp-1-compound-weight-management", name: "GLP-1 Compound Weight Management Protocol", price: "2.5 mg: ₱2,490; 5 mg: ₱3,490; 7.5 mg: ₱4,490", packagePrice: "3+1 — 2.5 mg: ₱7,968; 5 mg: ₱11,168; 7.5 mg: ₱14,368", priceLabel: "Per session", image: "/images/treatments/weight-management/glp-1-compound.png" }),
  createPendingMenuTreatment({ slug: "mounjaro-weight-management", name: "Mounjaro Weight Management Protocol", price: "2.5 mg: ₱13,995; 5 mg: ₱15,995; 7.5 mg: ₱21,995", priceLabel: "Per session", image: "/images/treatments/weight-management/mounjaro.png" }),
];

const ivDripAddons: Treatment[] = [
  createPendingMenuTreatment({ slug: "collagen-boost", name: "Collagen Boost", price: "₱300 per ampoule", priceLabel: "Price", image: "/images/treatments/iv-drip-addons/collagen-boost.png" }),
  createPendingMenuTreatment({ slug: "placenta-boost", name: "Placenta Boost", price: "₱1,200 per ampoule", priceLabel: "Price", image: "/images/treatments/iv-drip-addons/placenta-boost.png" }),
];

export const treatmentCategories: TreatmentCategory[] = [
  {
    slug: "skin-radiance",
    name: "Skin & Radiance",
    introduction: "Refine texture, clarity, and glow with treatments selected around your skin's individual needs.",
    image: "/images/treatments/treatment1.png",
    groups: [
      { slug: "premium-elite-facials", title: "Premium & Elite Facials", description: "Essential and elevated facial care for hydration, clarity, and renewed radiance.", image: "/images/treatments/pf1.png", treatments: premiumEliteFacials },
      { slug: "laser-treatments", title: "Laser Treatments", description: "Advanced skin-focused treatment options.", image: "/images/treatments/treatment1.png", treatments: laserTreatments },
      { slug: "skin-peels-resurfacing", title: "Skin Peels & Resurfacing", description: "Care focused on texture and overall skin appearance.", image: "/images/treatments/pf2.png", treatments: skinPeelsResurfacing },
      { slug: "microneedling-skin-repair", title: "Microneedling & Skin Repair", description: "Targeted options for skin renewal and repair.", image: "/images/treatments/pf3.png", treatments: microneedlingSkinRepair },
      { slug: "hair-restoration", title: "Hair Restoration", description: "Personalized options for hair and scalp concerns.", image: "/images/treatments/pf4.png", treatments: hairRestoration },
    ],
  },
  {
    slug: "lift-contour",
    name: "Lifting & Contouring",
    introduction: "Explore considered face and body treatments designed around definition, balance, and contour.",
    image: "/images/treatments/treatment2.png",
    groups: [
      { slug: "face-body-lifting", title: "Face Lifting & Tightening", description: "Non-surgical options designed around lift and definition.", image: "/images/treatments/treatment2.png", treatments: faceLiftingTightening },
      { slug: "body-sculpting", title: "Body Contouring & Fat Reduction", description: "Body-focused treatments for contour and definition.", image: "/images/treatments/treatment4.png", treatments: bodyContouringFatReduction },
      { slug: "muscle-toning", title: "Muscle Toning", description: "Treatment options focused on muscle definition.", image: "/images/treatments/pf3.png", treatments: muscleToning },
      { slug: "slimming-treatments", title: "Slimming & Body Sculpting Programs", description: "Guided treatment options aligned with body goals.", image: "/images/treatments/pf2.png", treatments: slimmingBodySculptingPrograms },
    ],
  },
  {
    slug: "rejuvenation-volume",
    name: "Facial Rejuvenation",
    introduction: "Discover physician-led options for refreshed-looking skin, balanced volume, and natural-looking renewal.",
    image: "/images/treatments/treatment3.png",
    groups: [
      { slug: "botox-treatments", title: "TheraTox / Botox Services", description: "Consultation-led options for expression lines and facial balance.", image: "/images/treatments/treatment3.png", treatments: botoxTreatments },
      { slug: "dermal-fillers", title: "Dermal & Lip Fillers", description: "Personalized treatments focused on proportion and volume.", image: "/images/treatments/pf3.png", treatments: dermalLipFillers },
      { slug: "signature-skin-boosters", title: "Signature Skin Boosters", description: "Aesthera Mère booster options tailored to individual goals.", image: "/images/treatments/pf4.png", treatments: signatureSkinBoosters },
      { slug: "renewal-therapy", title: "Elite Skin Boosters & Renewal Therapy", description: "Regenerative options for refreshed-looking skin.", image: "/images/treatments/pf1.png", treatments: eliteSkinBoostersRenewal },
      { slug: "collagen-treatments", title: "Collagen Renewal Programs", description: "Treatments selected to support skin structure and renewal.", image: "/images/treatments/pf2.png", treatments: collagenRenewalPrograms },
    ],
  },
  {
    slug: "body-wellness",
    name: "Wellness & Weight Management",
    introduction: "Support your aesthetic and wellness goals with personalized therapies and guided programs.",
    image: "/images/treatments/treatment4.png",
    groups: [
      { slug: "hero-aesthera-drips", title: "Hero Aesthera Drips", description: "Aesthera Mère IV options provided after medical assessment.", image: "/images/treatments/treatment4.png", treatments: heroAestheraDrips },
      { slug: "divine-aesthera-drips", title: "Divine Aesthera Drips", description: "Premium IV options selected around individual wellness goals.", image: "/images/treatments/pf4.png", treatments: divineAestheraDrips },
      { slug: "nad-therapy", title: "NAD+ Therapy", description: "Clinician-guided NAD+ options following suitability screening.", image: "/images/treatments/pf3.png", treatments: nadTherapy },
      { slug: "weight-management", title: "Weight Management Protocols", description: "Doctor-guided programs based on assessment and eligibility.", image: "/images/treatments/pf2.png", treatments: weightManagementProtocols },
      { slug: "iv-drip-addons", title: "IV Drip Add-ons", description: "Optional add-ons for eligible IV drip treatments.", image: "/images/treatments/pf5.png", treatments: ivDripAddons },
    ],
  },
];

export function getTreatmentCategory(slug: string) {
  return treatmentCategories.find((category) => category.slug === slug);
}

export function getTreatmentGroup(categorySlug: string, groupSlug: string) {
  const category = getTreatmentCategory(categorySlug);
  const group = category?.groups.find((item) => item.slug === groupSlug);
  return category && group ? { category, group } : undefined;
}

export function getTreatment(categorySlug: string, groupSlug: string, treatmentSlug: string) {
  const result = getTreatmentGroup(categorySlug, groupSlug);
  const treatment = result?.group.treatments.find((item) => item.slug === treatmentSlug);
  return result && treatment ? { ...result, treatment } : undefined;
}
