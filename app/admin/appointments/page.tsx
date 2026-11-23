import type { Metadata } from "next";
import AppointmentsWorkspace from "@/components/admin/AppointmentsWorkspace";

export const metadata: Metadata = {
  title: "Appointments | Aesthera Mère Admin",
  description: "Design preview for managing Aesthera Mère appointments.",
};

export default function AppointmentsPage() {
  return <AppointmentsWorkspace />;
}
