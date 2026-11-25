
"use client";

import BookingTrigger from "@/components/BookingTrigger";
import { ChevronRightIcon } from "@/components/Icons";
import { CLASSPASS_URL } from "@/lib/classpass";

export default function Consultation({ showClassPass = false }: { showClassPass?: boolean }) {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-[#FFFCF3]"
      style={{ padding: "1rem clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 2.5vw, 2.5rem)" }}
    >
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center rounded-[28px] border border-[#4F6442]/20 bg-white px-6 py-12 text-center md:px-12 md:py-16">

        {/* Small Heading */}
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#4F6442]">
          Your Journey Starts Here
        </p>

        {/* Main Heading */}
        <h2 className="font-seasons mt-4 max-w-[760px] text-4xl leading-tight text-[#1E3A2A] md:text-5xl">
          Ready to Begin Your Beauty Journey?
        </h2>

        {/* Description */}
        <p className="font-montserrat mt-6 max-w-[580px] text-sm leading-7 text-[#5C675D] md:text-base md:leading-8">
          Schedule a consultation with Aesthera Mère and find the treatments that are right for you.
        </p>

        <div className="mt-8 grid w-full max-w-[760px] gap-3 border-y border-[#4F6442]/15 py-5 font-montserrat text-sm text-[#5C675D] sm:grid-cols-2">
          <p><span className="font-semibold text-[#1E3A2A]">Clinic hours:</span> Mon–Tue &amp; Thu–Sun, 10:00 AM–8:00 PM · Wednesday closed</p>
          <a href="tel:+639189365679" className="transition-colors hover:text-[#1E3A2A]"><span className="font-semibold text-[#1E3A2A]">Call:</span> 0918 936 5679</a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <BookingTrigger className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534] bg-[#4C5534] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#35452F] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]" />
          <a href="https://www.facebook.com/aestheramereph/" target="_blank" rel="noopener noreferrer" className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534]/30 px-6 text-xs font-semibold text-[#4C5534] hover:bg-[#F6F3ED]">Facebook <ChevronRightIcon className="h-4 w-4" /></a>
          <a href="https://www.instagram.com/aestheramereph/" target="_blank" rel="noopener noreferrer" className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534]/30 px-6 text-xs font-semibold text-[#4C5534] hover:bg-[#F6F3ED]">Instagram <ChevronRightIcon className="h-4 w-4" /></a>
        </div>

        {showClassPass && (
          <div className="mt-8 w-full max-w-[760px]">
            <p className="flex items-center gap-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4F6442] before:h-px before:flex-1 before:bg-[#4F6442]/20 after:h-px after:flex-1 after:bg-[#4F6442]/20">
              Other ways to book
            </p>
            <p className="mt-4 font-montserrat text-sm leading-6 text-[#5C675D]">
              ClassPass members can book select treatments through ClassPass.
            </p>
            <a
              href={CLASSPASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534]/35 px-6 font-montserrat text-xs font-semibold text-[#4C5534] transition-colors hover:bg-[#F6F3ED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]"
            >
              Find us on ClassPass <ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
