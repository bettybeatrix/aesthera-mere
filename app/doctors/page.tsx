import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DoctorsDirectory from "@/components/DoctorsDirectory";
import { getDoctorProfiles } from "@/lib/doctors";

export const metadata: Metadata = {
  title: "Our Doctors | Aesthera Mère",
  description: "Meet the medical professionals behind Aesthera Mère's personalized approach to aesthetic care.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctorProfiles();
  const publishedDoctors = doctors.filter((doctor) => doctor.isPublished);

  return (
    <>
      <Navbar />
      <DoctorsDirectory doctors={publishedDoctors} />
      <Footer />
    </>
  );
}
