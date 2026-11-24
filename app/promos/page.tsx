import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import PromosList from "./PromosList";
import { getPromos, getPricingTables } from "@/lib/promos";

export const metadata: Metadata = {
  title: "Promos & Packages | Aesthera Mère Beauty Creations",
  description:
    "Browse Aesthera Mère's current BEReady Holiday Deals and treatment packages.",
};

export default function PromosPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <Suspense fallback={<PromosPageFallback />}>
          <PromosContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

async function PromosContent() {
  // Promo expiry depends on today's date. Wait for the incoming request before
  // reading the clock so Next.js Cache Components does not evaluate it during
  // build-time prerendering.
  await connection();

  const [promos, pricingTables] = await Promise.all([
    getPromos(),
    getPricingTables(),
  ]);

  return (
    <>
      <section className="border-b border-[#80755F]/15 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-[760px]">
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#80755F]">
              AESTHERA MÈRE · <span className="font-extrabold tracking-[0.28em] text-[#4C5534]">BER</span>eady Holiday Deals
            </p>

            <h1 className="font-seasons mt-4 text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]">
              Holiday care,
              <br />
              thoughtfully priced.
            </h1>

            <p className="mt-6 max-w-[700px] font-montserrat text-sm leading-7 text-[#80755F] md:text-base">
              Explore current seasonal offers across facials, laser treatments,
              lifting, contouring, injectables, and wellness care. Final
              eligibility and availability are confirmed by the clinic.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[270px] overflow-hidden rounded-[20px] border border-[#80755F]/15 bg-[#F4E9D7] shadow-[0_18px_45px_-32px_rgba(30,58,42,0.45)] md:max-w-[300px] lg:mr-0">
            <Image
              src="/images/promotions/beready-holiday-deals.jpg"
              alt="BEReady Holiday Deals — up to 50% off selected Aesthera Mère treatments"
              fill
              priority
              sizes="(max-width: 1023px) 90vw, 32vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <PromosList promos={promos} pricingTables={pricingTables} />

      <Consultation />
    </>
  );
}

function PromosPageFallback() {
  return (
    <>
      <section className="border-b border-[#80755F]/15 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1180px] animate-pulse">
          <div className="h-3 w-48 rounded bg-[#80755F]/15" />
          <div className="mt-6 h-20 max-w-xl rounded bg-[#80755F]/10" />
          <div className="mt-5 h-4 max-w-2xl rounded bg-[#80755F]/10" />
        </div>
      </section>
      <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading promotions" aria-busy="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="aspect-[4/5] animate-pulse rounded-[20px] bg-[#80755F]/10" />
        ))}
      </section>
    </>
  );
}
