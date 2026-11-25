"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BookingTrigger from "@/components/BookingTrigger";

const clinicPhotos = [
  { src: "/images/about/about.png", alt: "Clinic reception and waiting area", position: "50% 48%" },
  { src: "/images/about/about2.png", alt: "Aesthera Mère treatment room", position: "50% 52%" },
  { src: "/images/about/about3.png", alt: "Aesthera Mère reception desk", position: "50% 40%" },
];

const doctorPhotos = [
  { src: "/images/doctors/dr-dan.png", alt: "Dr. Dan at the clinic", position: "50% 34%" },
  { src: "/images/doctors/dr-raine.png", alt: "Dr. Raine at the clinic", position: "50% 34%" },
  { src: "/images/doctors/dr-ian-profile.png", alt: "Dr. Ian at the clinic", position: "50% 45%" },
];

function PhotoStack({
  photos,
  activeIndex,
  sizes,
}: {
  photos: typeof clinicPhotos;
  activeIndex: number;
  sizes: string;
}) {
  return photos.map((photo, index) => {
    const active = index === activeIndex;

    return (
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        aria-hidden={!active}
        fill
        sizes={sizes}
        fetchPriority={index === 0 ? "high" : undefined}
        className={`object-cover transition-opacity ease-in-out motion-reduce:transition-none ${
          active ? "z-10 opacity-100 duration-[1400ms]" : "opacity-0 delay-[1400ms] duration-0"
        }`}
        style={{ objectPosition: photo.position }}
      />
    );
  });
}

export default function ContactHero() {
  const [clinicIndex, setClinicIndex] = useState(0);
  const [doctorIndex, setDoctorIndex] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: number | undefined;

    function syncRotation() {
      window.clearInterval(interval);
      if (motion.matches) return;

      let advanceDoctor = true;
      interval = window.setInterval(() => {
        if (advanceDoctor) {
          setDoctorIndex((index) => (index + 1) % doctorPhotos.length);
        } else {
          setClinicIndex((index) => (index + 1) % clinicPhotos.length);
        }
        advanceDoctor = !advanceDoctor;
      }, 2500);
    }

    syncRotation();
    motion.addEventListener("change", syncRotation);

    return () => {
      window.clearInterval(interval);
      motion.removeEventListener("change", syncRotation);
    };
  }, []);

  return (
    <section aria-labelledby="contact-hero-title" className="px-4 pt-6 sm:px-6 md:px-10 md:pt-10">
      <div className="relative isolate mx-auto grid max-w-[1280px] items-center gap-9 overflow-hidden rounded-[24px] bg-[#F4F1E9] px-6 py-9 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-14 lg:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-52 -z-10 h-80 w-[34rem] -rotate-12 rounded-[50%] border border-[#B79A61]/20" />

        <div>
          <h1 id="contact-hero-title" className="font-seasons text-[clamp(2.65rem,5vw,4.7rem)] leading-[1.05] tracking-[-0.035em]">
            Let&apos;s get <em className="text-[#66734D]">in touch.</em>
          </h1>
          <div aria-hidden="true" className="my-5 h-px w-16 bg-[#B79A61]" />
          <p className="font-montserrat max-w-[370px] text-sm leading-7 text-[#4C5534]/90">
            Your beauty and wellness journey begins with a conversation. Our team is here to help.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookingTrigger className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4C5534] px-6 text-xs font-semibold text-white transition-colors hover:bg-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]" />
            <a href="tel:+639189365679" className="font-montserrat inline-flex min-h-12 items-center justify-center rounded-full border border-[#4C5534]/45 px-6 text-xs font-semibold transition-colors hover:bg-[#EDEFE6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]">
              Call the Clinic
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[600px]">
          <div className="relative aspect-[1.08/1]">
            <div className="absolute left-0 top-0 z-0 h-[82%] w-[88%] overflow-hidden rounded-[24%_24px_24px_24px] border border-[#B79A61] bg-[#E9DFCC] shadow-[0_12px_28px_rgba(76,85,52,0.13)]">
              <PhotoStack photos={clinicPhotos} activeIndex={clinicIndex} sizes="(min-width: 1280px) 485px, (min-width: 1024px) 42vw, (min-width: 768px) 528px, 78vw" />
              <span className="font-montserrat absolute bottom-3 left-3 z-20 rounded-full bg-[#FFFCF3]/95 px-3 py-1.5 text-[10px] font-medium">Inside the clinic</span>
            </div>

            <div className="absolute bottom-0 right-0 z-10 h-[52%] w-[63%] overflow-hidden rounded-[22%_22px_22%_22px] border-2 border-[#FFFCF3] bg-[#E9DFCC] shadow-[0_12px_28px_rgba(76,85,52,0.16)]">
              <PhotoStack photos={doctorPhotos} activeIndex={doctorIndex} sizes="(min-width: 1280px) 350px, (min-width: 1024px) 30vw, (min-width: 768px) 378px, 56vw" />
              <span className="font-montserrat absolute bottom-3 left-3 z-20 rounded-full bg-[#FFFCF3]/95 px-3 py-1.5 text-[10px] font-medium">Meet our doctors</span>
            </div>
          </div>

          <div className="font-montserrat mt-3 text-right text-xs motion-reduce:hidden">
            <span aria-label={`Clinic photo ${clinicIndex + 1} of ${clinicPhotos.length}`} className="tabular-nums">
              {clinicIndex + 1} / {clinicPhotos.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
