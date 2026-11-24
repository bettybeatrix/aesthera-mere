import type { PromoCampaignSettings } from "@/types/promo";

export const PROMO_CAMPAIGN: PromoCampaignSettings = {
  eyebrow: "Aesthera Mère · Promos & Packages",
  headlineLine1: "Offers worth",
  headlineLine2: "coming back for.",
  description: "Explore our current treatment specials, seasonal offers, and signature treatment passes designed around accessible, medical-grade aesthetic care.",
  heroImage: "/images/promotions/promo-background.png",
  heroImageAlt: "Aesthera Mère promotions and packages",
};

export async function getPromoCampaign(): Promise<PromoCampaignSettings> {
  return { ...PROMO_CAMPAIGN };
}
