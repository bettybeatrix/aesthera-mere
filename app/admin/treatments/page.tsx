import TreatmentsWorkspace from "@/components/admin/TreatmentsWorkspace";
import { getManagedTreatments } from "@/lib/treatments";

export const metadata = {
  title: "Treatments | Aesthera Mère Admin",
  description: "Manage treatment categories, collections, prices and public details.",
};

export default async function AdminTreatmentsPage() {
  const treatments = await getManagedTreatments();
  return <TreatmentsWorkspace initialTreatments={treatments} />;
}
