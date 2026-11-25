import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingTrigger from "@/components/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & Visit Us | Aesthera Mère",
  description:
    "Visit Aesthera Mère in Mandaluyong, check clinic hours, get directions, or book a consultation.",
};

const mapsUrl =
  "https://www.google.com/maps/place/Aesthera+Mere+Beauty+Creations/@14.570535,121.0493446,17z/data=!4m8!3m7!1s0x3397c9ff0d4effff:0x8f90fb8a8325a1c2!8m2!3d14.5705298!4d121.0519195!9m1!1b1!16s%2Fg%2F11nb_t70wc";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/aestheramereph/" },
  { label: "Instagram", href: "https://www.instagram.com/aestheramereph/" },
  { label: "TikTok", href: "https://www.tiktok.com/@aestheramere" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="border-b border-[#80755F]/20 px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[1180px]">
            <div>
              <h1 className="font-seasons max-w-[720px] text-[clamp(3.2rem,10vw,7rem)] leading-[1.06] tracking-[-0.035em] sm:leading-[0.98]">
                Let&apos;s get <span className="block italic text-[#7A8560] sm:inline">in touch.</span>
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookingTrigger className="font-montserrat inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#4C5534] px-7 text-xs font-semibold text-white transition-colors hover:bg-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]">
                  Book Appointment <ArrowUpRightIcon className="h-4 w-4" />
                </BookingTrigger>
                <a href="tel:+639189365679" className="font-montserrat inline-flex min-h-12 items-center justify-center rounded-full border border-[#4C5534]/35 px-7 text-xs font-semibold text-[#4C5534] transition-colors hover:bg-[#EDEFE6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]">
                  Call the Clinic
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="contact-details-title">
          <div className="mx-auto max-w-[1180px]">
            <h2 id="contact-details-title" className="font-seasons text-[clamp(2.6rem,5vw,4.2rem)] leading-none">Plan Your Visit</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-[#80755F]/20 bg-white p-7 md:p-8">
                <h3 className="font-seasons text-2xl leading-tight">Visit Us</h3>
                <address className="font-montserrat mt-5 text-sm not-italic leading-7 text-[#6F7568]">
                  Unit 3 No. 4, Madison Square,<br />Pioneer St., Mandaluyong City,<br />Metro Manila
                </address>
              </div>
              <div className="rounded-[22px] border border-[#80755F]/20 bg-white p-7 md:p-8">
                <h3 className="font-seasons text-2xl leading-tight">Opening Hours</h3>
                <p className="font-montserrat mt-5 text-sm leading-7 text-[#6F7568]">Monday–Tuesday &amp; Thursday–Sunday<br />10:00 AM–8:00 PM</p>
                <p className="font-montserrat mt-3 text-sm leading-7 text-[#6F7568]">Wednesday · Closed</p>
              </div>
              <div className="rounded-[22px] border border-[#80755F]/20 bg-white p-7 md:p-8">
                <h3 className="font-seasons text-2xl leading-tight">Contact</h3>
                <a href="tel:+639189365679" className="font-montserrat mt-5 inline-block text-sm font-semibold leading-7 hover:underline hover:underline-offset-4">+63 918 936 5679</a>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="font-montserrat inline-flex min-h-9 items-center gap-1 text-xs font-semibold hover:underline hover:underline-offset-4">{link.label}<ArrowUpRightIcon className="h-3.5 w-3.5" /></a>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="px-6 pb-20 md:px-10 md:pb-28" aria-labelledby="location-title">
          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-[#EDEFE6]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 id="location-title" className="font-seasons text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95]">Map &amp; Directions</h2>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-montserrat mt-7 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#4C5534] px-7 text-xs font-semibold text-white transition-colors hover:bg-[#35452F]">
                  Open in Google Maps <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </div>
              <iframe title="Map to Aesthera Mère Beauty Creations" src="https://www.google.com/maps?q=14.5705298,121.0519195&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-[340px] w-full border-0 md:min-h-[440px]" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
