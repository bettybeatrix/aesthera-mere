import ContentWorkspace from "@/components/admin/ContentWorkspace";
import { initialContentEntries } from "@/data/content";

export const metadata = {
  title: "Content | Aesthera Mère Admin",
};

export default function AdminContentPage() {
  return <ContentWorkspace initialEntries={initialContentEntries} />;
}
