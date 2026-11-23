"use client";

import Image from "next/image";
import { useBooking } from "@/components/BookingProvider";
import type { DoctorProfile } from "@/types/doctor";

export default function DoctorsDirectory({ doctors }: { doctors: DoctorProfile[] }) {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen bg-[#F6F3ED]">
      <section className="mx-auto max-w-[1200px] px-6 pb-14 pt-20 text-center md:px-10 md:pb-20">
        <p className="mb-4 font-montserrat text-[11px] uppercase tracking-[0.25em] text-[#4C5534]">
          AESTHERA MÈRE · OUR DOCTORS
        </p>
        <h1 className="font-bodoni text-5xl text-[#4C5534] md:text-6xl">Meet Our Experts</h1>
        <p className="mx-auto mt-5 max-w-[590px] font-montserrat text-sm leading-7 text-[#777568]">
          Discover the medical professionals behind our personalized approach to aesthetic care.
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-[#4C5534]/40" />
      </section>

      <div className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10">
        {doctors.map((doctor, index) => (
          <section key={doctor.id} id={doctor.id} className="mb-20 scroll-mt-32 md:mb-28">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className={`relative overflow-hidden rounded-[22px] bg-[#E8E4DC] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/5]">
                  {doctor.image ? (
                    <Image src={doctor.image} alt={`Portrait of ${doctor.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  ) : (
                    <div role="img" aria-label={`Portrait of ${doctor.name} coming soon`} className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFFCF3] to-[#80755F]/20 font-bodoni text-7xl text-[#4C5534]/30">
                      {doctor.shortName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="mb-3 font-montserrat text-[11px] font-medium uppercase tracking-[0.2em] text-[#4F6442]">{doctor.title}</p>
                <h2 className="font-bodoni text-[42px] leading-tight text-[#4C5534] md:text-[52px]">{doctor.name}</h2>
                {doctor.tagline && <p className="mt-3 font-montserrat text-[12px] tracking-wide text-[#777568]">{doctor.tagline}</p>}
                <div className="my-7 h-px w-16 bg-[#4C5534]/40" />

                <div className="space-y-4">
                  {doctor.biography.map((paragraph, i) => (
                    <p key={i} className="font-montserrat text-[13px] leading-[1.9] text-[#666759]">{paragraph}</p>
                  ))}
                </div>

                {doctor.expertise.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 font-bodoni text-[25px] text-[#4C5534]">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((item) => (
                        <span key={item} className="rounded-full border border-[#4C5534]/20 bg-white px-4 py-2 font-montserrat text-[11px] text-[#4C5534]">{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                <button type="button" onClick={() => openBooking("", doctor.shortName)} className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#4C5534] px-8 py-3.5 font-montserrat text-[12px] font-medium text-white transition hover:bg-[#39432D]">
                  Book a Consultation <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>

            {(doctor.credentials.length > 0 || doctor.affiliations.length > 0) && (
              <div className="mt-8 rounded-[22px] border border-[#E3DDD1] bg-white p-6 shadow-[0_10px_30px_rgba(60,50,30,0.04)] md:mt-10 md:p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {doctor.credentials.length > 0 && (
                    <div>
                      <h3 className="mb-5 font-bodoni text-[25px] text-[#4C5534]">Education & Credentials</h3>
                      <ul className="space-y-3">
                        {doctor.credentials.map((item) => <li key={item} className="flex gap-3 font-montserrat text-[12px] leading-6 text-[#666759]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F6442]" />{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {doctor.affiliations.length > 0 && (
                    <div>
                      <h3 className="mb-5 font-bodoni text-[25px] text-[#4C5534]">Professional Affiliations</h3>
                      <ul className="space-y-3">
                        {doctor.affiliations.map((item) => <li key={item} className="flex gap-3 font-montserrat text-[12px] leading-6 text-[#666759]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F6442]" />{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
