import type { Metadata } from "next";
import { connection } from "next/server";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DoctorsDirectory from "@/components/DoctorsDirectory";
import { getDoctorProfiles } from "@/lib/doctors";

export const metadata: Metadata = {
  title: "Our Doctors | Aesthera Mère",
  description: "Meet the medical professionals behind Aesthera Mère's personalized approach to aesthetic care.",
};

export default async function DoctorsPage() {
  // Doctor availability depends on the current date. Defer this read until a
  // request is available instead of evaluating it during build-time prerendering.
  await connection();

  const doctors = await getDoctorProfiles();
  const today = new Date().toISOString().slice(0, 10);
  const availableDoctors = doctors.filter((doctor) =>
    !doctor.leaveStartDate || !doctor.leaveEndDate ||
    today < doctor.leaveStartDate || today > doctor.leaveEndDate
  );

  return (
    <>
      <Navbar />
      <DoctorsDirectory doctors={availableDoctors} />
      <Footer />
    </>
  );
}
