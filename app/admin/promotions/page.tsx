import PromotionsWorkspace from "@/components/admin/PromotionsWorkspace";
import { getAllPromos } from "@/lib/promos";

export const metadata = {
  title: "Promotions | Aesthera Mère Admin",
};

export default async function AdminPromotionsPage() {
  const promos = await getAllPromos();
  return <PromotionsWorkspace initialPromos={promos} />;
}
