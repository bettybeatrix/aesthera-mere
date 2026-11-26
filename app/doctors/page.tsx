
"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingTrigger from "@/components/BookingTrigger";

// ======================================
// DOCTORS DATA
// ======================================

const doctors = [
  {
    id: "dr-dan",
    name: "Dr. Daniel ",
    shortName: "Dr. Dan",
    title: "Aesthetic Physician",
    tagline: "Regenerative • Wellness • Aesthetic Medicine",
    image: "/images/doctors/dr-dan.png",
    bio: [
      "Dr. John Daniel Co is an aesthetic physician dedicated to providing personalized, patient-centered aesthetic care. His practice focuses on non-surgical treatments, with an emphasis on precision, safety, and natural-looking results.",
      "With experience in facial injectables, skin boosters, biostimulators, and thread lifting, Dr. Co combines aesthetic techniques with individualized treatment planning to help patients address their aesthetic concerns.",
    ],
    expertise: [
      "Facial Injectables",
      "Dermal Fillers",
      "Botulinum Toxin",
      "Skin Boosters",
      "Biostimulators",
      "Thread Lifting",
      "Mesolipo",
    ],
    credentials: [
      "University of the East Ramon Magsaysay Medical Center",
      "De La Salle University–Dasmariñas — Nursing",
    ],
    affiliations: [
      "American Academy of Aesthetic Medicine",
      "Philippine Academy of Aesthetic and Age Management Medicine",
      "Philippine Science of Skin and Aesthetic Medicine",
    ],
  },
  {
    id: "dr-raine",
    name: "Dr. Raine",
    shortName: "Dr. Raine",
    title: "Aesthetic Physician",
    tagline: "Personalized Aesthetic & Skin Rejuvenation Care",
    image: "/images/doctors/dr-raine.png",
    bio: [
      "Dr. Raine is an aesthetic physician who focuses on personalized, evidence-based aesthetic care. Her approach combines individualized treatment planning with attention to patient safety, comfort, and naturally refined results.",
      "Her practice addresses concerns such as pigmentation, acne, and skin rejuvenation. She has experience in aesthetic injectables, dermal fillers, biostimulators, and other non-surgical aesthetic treatments.",
    ],
    expertise: [
      "Skin Rejuvenation",
      "Pigmentation & Acne Concerns",
      "Aesthetic Injectables",
      "Dermal Fillers",
      "Biostimulators",
      "Lipolytics",
      "Personalized Treatment Planning",
    ],
    credentials: [
      "University of the East Ramon Magsaysay Medical Center, Inc. — College of Medicine",
      "Postgraduate Internship — Jose Reyes Memorial Medical Center",
      "ECFMG-Certified",
    ],
    affiliations: [
      "Philippine Science of Skin and Aesthetic Medicine",
      "American Academy of Aesthetic Medicine",
    ],
  },
  {
    id: "dr-ian",
    name: "Dr. Ian",
    shortName: "Dr. Ian",
    title: "Aesthetic Physician",
    tagline: "Aesthetic Medicine • Regenerative Care • Hair Restoration",
    image: "/images/doctors/dr-ian-profile.png",
    bio: [
      "Dr. Ian Roces takes a personalized approach to aesthetic medicine, with a focus on natural-looking results. His work includes neurotoxins, dermal fillers, biostimulators, PRP, and microneedling.",
      "With fellowship training in cosmetic surgery, he also works with aesthetic technologies including Ulthera Prime, Vivace, and AlmaQ. He tailors treatment plans to each patient’s features and goals.",
    ],
    expertise: [
      "Neurotoxins",
      "Dermal Fillers",
      "Biostimulators",
      "PRP",
      "Microneedling",
      "Energy-Based Aesthetic Treatments",
    ],
    credentials: [
      "Fellowship Training in Cosmetic Surgery — Pan Pacific Aesthetic Institute (2024–2026)",
      "Advanced Korean Aesthetic Medicine",
      "Aesthetic Medicine (Level 5)",
      "FUE Hair Transplantation Training",
    ],
    affiliations: [
      "Philippine Society for Regenerative Medicine (PSGM)",
      "Philippine Regenerative & Integrative Medical Association (PRIMA)",
      "International Society of Aesthetics, Aging Control and Hair Transplantation (ISAAH)",
    ],
  },
];

// ======================================
// DOCTORS PAGE
// ======================================

export default function DoctorsPage() {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (window.sessionStorage.getItem("aesthera-doctor-profile-scroll") !== id) return;

    const profile = document.getElementById(id);
    if (!profile) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      profile.scrollIntoView({ behavior: "instant", block: "start" });
      window.sessionStorage.removeItem("aesthera-doctor-profile-scroll");
      return;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousBehavior;

    const frame = window.requestAnimationFrame(() => {
      profile.scrollIntoView({ behavior: "smooth", block: "start" });
      window.sessionStorage.removeItem("aesthera-doctor-profile-scroll");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFFCF3]">


{/* PAGE INTRODUCTION */}
<section className="mx-auto max-w-[1200px] px-6 pb-5 pt-14 text-center md:px-10 md:pb-8 md:pt-16">

  <p className="mb-3 font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#4C5534]">
    AESTHERA MÈRE · OUR DOCTORS
  </p>

  <h1 className="font-seasons text-[44px] leading-[1.1] text-[#4C5534] sm:text-[50px] md:text-[56px]">
    Meet Our Experts
  </h1>

  <div className="mx-auto my-5 h-px w-14 bg-[#B59A67]" />

  <p className="mx-auto max-w-[650px] font-montserrat text-[13px] leading-7 text-[#666759] md:text-[14px]">
    Get to know the medical professionals dedicated to personalized aesthetic care.
  </p>

</section>


        {/* DOCTOR PROFILES */}
        <div>
          {doctors.map((doctor, index) => (
            <section
              key={doctor.id}
              id={doctor.id}
              className="scroll-mt-32 bg-[#FFFCF3]"
            >
              <div
  className={`mx-auto max-w-[1200px] px-6 pb-16 md:px-10 md:pb-20 ${
    index === 0
      ? "pt-8 md:pt-10"
      : "pt-16 md:pt-20"
  }`}
>
                {/* MAIN DOCTOR PROFILE */}
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">

                  {/* DOCTOR IMAGE */}
                  <div
                    className={`relative mx-auto w-full max-w-[480px] md:max-w-none ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#E8E4DC] shadow-[0_18px_45px_rgba(60,50,30,0.09)]">
                      <Image
                        src={doctor.image}
                        alt={`Portrait of ${doctor.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority={index === 0}
                        className={`object-cover transition-transform duration-700 motion-reduce:transition-none hover:scale-[1.025] motion-reduce:hover:scale-100 ${
                          doctor.id === "dr-ian"
                            ? "object-[50%_40%]"
                            : "object-center"
                        }`}
                      />
                    </div>
                  </div>

                  {/* DOCTOR INFORMATION */}
                  <div
                    className={`${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <p className="mb-3 font-montserrat text-[11px] font-medium uppercase tracking-[0.2em] text-[#4F6442]">
                      {doctor.title}
                    </p>

                    <h2 className="font-bodoni text-[40px] leading-[1.12] text-[#4C5534] sm:text-[46px] lg:text-[52px]">
                      {doctor.name}
                    </h2>

                    <p className="mt-3 font-montserrat text-[12px] leading-6 tracking-wide text-[#777568]">
                      {doctor.tagline}
                    </p>

                    <div className="my-6 h-px w-14 bg-[#B59A67]" />

                    {/* BIOGRAPHY */}
                    <div className="space-y-4">
                      {doctor.bio.map((paragraph, i) => (
                        <p
                          key={i}
                          className="font-montserrat text-[13px] leading-[1.9] text-[#666759] md:text-[14px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* AREAS OF EXPERTISE */}
                    <div className="mt-7">
                      <h3 className="mb-4 font-seasons font-bold text-[27px] text-[#4C5534]">
                        Areas of Expertise
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {doctor.expertise.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full border border-[#4C5534]/25 px-4 py-2 font-montserrat text-[11px] leading-5 text-[#4C5534] transition-colors duration-300 hover:border-[#4C5534] hover:bg-[#4C5534] hover:text-white ${
                              index % 2 === 0
                                ? "bg-white/60"
                                : "bg-[#F6F3ED]/70"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* BOOKING BUTTON */}
                    <BookingTrigger
                      initialDoctor={doctor.shortName}
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#4C5534] px-7 py-3.5 font-montserrat text-[12px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#39432D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534] motion-reduce:transform-none"
                    />
                  </div>
                </div>

                {/* PROFESSIONAL BACKGROUND */}
                <div className="mt-14 md:mt-16">

                  {/* SECTION EYEBROW */}
                  <div className="mb-9 flex items-center gap-4 md:gap-7">
                    <span className="h-px flex-1 bg-[#B59A67]/60" />

                    <p className="text-center font-montserrat text-[10px] font-medium uppercase tracking-[0.16em] text-[#4C5534] sm:tracking-[0.22em]">
                      Professional Background
                    </p>

                    <span className="h-px flex-1 bg-[#B59A67]/60" />
                  </div>

                  {/* EDITORIAL TWO-COLUMN LAYOUT */}
                  <div className="grid gap-10 md:grid-cols-2 md:gap-12">

                    {/* EDUCATION */}
                    <div>
                      <p className="mb-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B59A67]">
                        01 / Education
                      </p>

                      <h3 className="font-seasons font-bold text-[27px] leading-tight text-[#4C5534] md:text-[30px]">
                        Education & Credentials
                      </h3>

                      <div className="mb-5 mt-4 h-px w-full bg-[#B59A67]/40" />

                      <ul className="space-y-4">
                        {doctor.credentials.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 font-montserrat text-[13px] leading-[1.8] text-[#666759]"
                          >
                            <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#4F6442]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* PROFESSIONAL AFFILIATIONS */}
                    <div>
                      <p className="mb-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B59A67]">
                        02 / Affiliations
                      </p>

                      <h3 className="font-seasons font-bold text-[27px] leading-tight text-[#4C5534] md:text-[30px]">
                        Professional Affiliations
                      </h3>

                      <div className="mb-5 mt-4 h-px w-full bg-[#B59A67]/40" />

                      <ul className="space-y-4">
                        {doctor.affiliations.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 font-montserrat text-[13px] leading-[1.8] text-[#666759]"
                          >
                            <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#4F6442]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
