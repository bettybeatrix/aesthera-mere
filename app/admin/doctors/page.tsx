import DoctorsWorkspace from "@/components/admin/DoctorsWorkspace";
import { getDoctorProfiles } from "@/lib/doctors";

export const metadata = {
  title: "Doctors | Aesthera Mère Admin",
  description: "Manage doctor profiles displayed on the Aesthera Mère website.",
};

export default async function AdminDoctorsPage() {
  const doctors = await getDoctorProfiles();
  return <DoctorsWorkspace initialDoctors={doctors} />;
}
