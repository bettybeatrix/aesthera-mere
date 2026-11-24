import PromotionsWorkspace from "@/components/admin/PromotionsWorkspace";
import { getAllPromos, getPricingTables } from "@/lib/promos";
import { getPromoCampaign } from "@/lib/promo-campaign";

export const metadata = {
  title: "Promotions | Aesthera Mère Admin",
};

export default async function AdminPromotionsPage() {
  const [promos, pricingTables, campaign] = await Promise.all([
    getAllPromos(),
    getPricingTables(),
    getPromoCampaign(),
  ]);

  return (
    <PromotionsWorkspace
      initialPromos={promos}
      initialPricingTables={pricingTables}
      initialCampaign={campaign}
    />
  );
}
