"use client";

import BookingTrigger from "@/components/BookingTrigger";
import { ChevronRightIcon } from "@/components/Icons";
import { CLASSPASS_URL } from "@/lib/classpass";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/aestheramereph/" },
  { name: "Instagram", url: "https://www.instagram.com/aestheramereph/" },
  { name: "TikTok", url: "https://www.tiktok.com/@aestheramere" },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") return <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-7H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v7A10 10 0 0 0 22 12Z" /></svg>;
  if (name === "Instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" /></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M16.7 2h-3.2v13.3a3.3 3.3 0 1 1-2.8-3.27V8.76a6.5 6.5 0 1 0 6 6.48V8.5a8.3 8.3 0 0 0 4.9 1.45V5.34A5.1 5.1 0 0 1 16.7 2Z" /></svg>;
}

export default function Consultation({ showClassPass = false }: { showClassPass?: boolean }) {
  return (
    <section id="consultation" className="bg-[#FFFCF3] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1280px] rounded-[18px] border border-[#DDD9CE] bg-white px-6 py-9 text-center shadow-[0_16px_45px_rgba(76,85,52,0.12)] sm:px-10 sm:py-11 lg:px-16">
          <div className="mx-auto mb-4 h-px w-12 bg-[#D5B47C]" aria-hidden="true" />
          <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.27em] text-[#1E3A2A]">Your Journey Starts Here</p>
          <h2 className="font-seasons mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-[#1E3A2A]">Ready to Begin Your Beauty Journey?</h2>
          <p className="font-montserrat mt-3 text-sm leading-6 text-[#1E3A2A]">Discover personalized aesthetic care designed around you.</p>
          <BookingTrigger className="font-montserrat mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4C5534] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]" />

          <div className={`mx-auto mt-9 grid max-w-[1030px] gap-y-6 border-t border-[#4C5534]/15 pt-7 text-center sm:grid-cols-2 ${showClassPass ? "md:grid-cols-3" : ""}`}>
            <div className="sm:px-6">
              <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A2A]">Clinic Hours</h3>
              <p className="mt-2 font-montserrat text-sm leading-6 text-[#1E3A2A]">Mon–Tue &amp; Thu–Sun<br />10:00 AM – 8:00 PM</p>
              <p className="font-montserrat text-xs text-[#1E3A2A]">Closed every Wednesday</p>
            </div>
            <div className="border-t border-[#4C5534]/15 pt-6 sm:border-l sm:border-t-0 sm:px-6 sm:pt-0">
              <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A2A]">Get in Touch</h3>
              <a href="tel:+639189365679" className="mt-2 inline-block font-montserrat text-sm text-[#1E3A2A] hover:text-[#80632F]">0918 936 5679</a>
              <div className="mt-3 flex justify-center gap-2">
                {socialLinks.map(({ name, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Aesthera Mère on ${name}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4C5534] text-[#4C5534] transition-colors hover:bg-[#4C5534] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">
                    <SocialIcon name={name} />
                  </a>
                ))}
              </div>
            </div>
            {showClassPass && (
              <div className="border-t border-[#4C5534]/15 pt-6 sm:col-span-2 md:col-span-1 md:border-l md:border-t-0 md:px-6 md:pt-0">
                <h3 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A2A]">Other Ways to Book</h3>
                <p className="mt-2 font-montserrat text-sm text-[#1E3A2A]">Available on ClassPass</p>
                <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-9 items-center gap-3 rounded-full border border-[#4C5534]/45 px-5 font-montserrat text-xs text-[#4C5534] transition-colors hover:bg-[#F5F2EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">Find us on ClassPass <ChevronRightIcon className="h-3.5 w-3.5" /></a>
              </div>
            )}
          </div>
      </div>
    </section>
  );
}
