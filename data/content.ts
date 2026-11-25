import type { ContentCategory, ContentEntry } from "@/types/content";
import { FAQ_ITEMS } from "@/app/faq/faqData";

const pageEntry = (
  id: string,
  category: ContentCategory,
  title: string,
  body: string,
  status: ContentEntry["status"] = "published",
): ContentEntry => ({
  id,
  category,
  title,
  body,
  status,
  updatedAt: "Not recorded",
});

export const initialContentEntries: ContentEntry[] = [
  pageEntry(
    "about-story",
    "About Us",
    "The Mère Standard",
    "Derived from the French word Mère, meaning mother, the name reflects values of nurturing, compassion, trust, and responsibility. Aesthera Mère delivers premium aesthetic and wellness solutions through personalized consultations and carefully selected treatment options.",
  ),
  ...FAQ_ITEMS.map((item) => pageEntry(
    `faq-${item.id}`,
    "FAQ",
    item.question,
    item.answer,
  )),
  pageEntry(
    "pre-treatment-care",
    "Pre-Treatment Care",
    "Pre-treatment care instructions",
    "Add clinic-approved preparation instructions for each treatment. Include what clients should do before the appointment, what they should avoid, expected preparation time, and when they should contact the clinic. Have the appropriate doctor review these instructions before publishing.",
    "draft",
  ),
  pageEntry(
    "post-treatment-care",
    "Post-Treatment Care",
    "Post-treatment care instructions",
    "Add clinic-approved aftercare instructions for each treatment. Include expected downtime, activities or products to avoid, normal reactions, warning signs, and when to contact the clinic. Have the appropriate doctor review these instructions before publishing.",
    "draft",
  ),
  pageEntry(
    "blog-start-here",
    "Blog Posts",
    "New educational article",
    "Draft an educational article here. Medical and treatment-related content must be reviewed by the clinic's appropriate medical professional before publication.",
    "draft",
  ),
  pageEntry(
    "privacy-policy",
    "Privacy Policy",
    "Privacy Policy",
    "Manage the clinic-approved privacy policy covering personal information collected through the website, purposes of processing, storage and retention, external services, data-subject rights, and privacy contact details. Review the full policy before publishing any changes.",
  ),
  pageEntry(
    "terms",
    "Terms & Conditions",
    "Terms of Use",
    "Manage the clinic-approved website terms covering website information, appointments and inquiries, treatments and results, pricing and promotions, acceptable use, external services, intellectual property, disclaimers, and contact information. Review the full terms before publishing changes.",
  ),
  pageEntry(
    "contact-details",
    "Contact Details",
    "Clinic contact information",
    "Address: Unit 3 No. 4, Madison Square, Pioneer St., Mandaluyong City, Metro Manila\nPhone: +63 918 936 5679\nFacebook: https://www.facebook.com/aestheramereph/\nInstagram: https://www.instagram.com/aestheramereph/\nTikTok: https://www.tiktok.com/@aestheramere",
  ),
  pageEntry(
    "clinic-hours",
    "Clinic Hours",
    "Operating hours",
    "Monday–Tuesday and Thursday–Sunday: 10:00 AM–8:00 PM\nWednesday: Closed",
  ),
];
