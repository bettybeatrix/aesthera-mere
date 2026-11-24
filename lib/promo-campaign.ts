import type { PromoCampaignSettings } from "@/types/promo";

export const PROMO_CAMPAIGN: PromoCampaignSettings = {
  eyebrow: "AESTHERA MÈRE · BEReady Holiday Deals",
  headlineLine1: "Holiday care,",
  headlineLine2: "thoughtfully priced.",
  description: "Explore current seasonal offers across facials, laser treatments, lifting, contouring, injectables, and wellness care. Final eligibility and availability are confirmed by the clinic.",
  heroImage: "/images/promotions/beready-holiday-deals.jpg",
  heroImageAlt: "Aesthera Mère BEReady Holiday Deals — up to 50% off selected treatments",
};

export async function getPromoCampaign(): Promise<PromoCampaignSettings> {
  return { ...PROMO_CAMPAIGN };
}
