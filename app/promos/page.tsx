import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import PromosList from "./PromosList";
import { getPromos, getPricingTables } from "@/lib/promos";

export const metadata: Metadata = {
  title: "Promos & Packages | Aesthera Mère Beauty Creations",
  description:
    "Browse Aesthera Mère's current promotions and treatment packages.",
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
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[820px]">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#80755F]">
              Aesthera Mère · Promos & Packages
            </p>

            <h1 className="font-seasons mt-4 text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]">
              Offers worth
              <br />
              coming back for.
            </h1>

            <p className="mt-6 max-w-[700px] font-montserrat text-sm leading-7 text-[#80755F] md:text-base">
              Explore our current treatment specials, seasonal offers, and
              signature treatment passes designed around accessible,
              medical-grade aesthetic care.
            </p>
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
