import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import PromoHeroSlideshow from "./PromoHeroSlideshow";
import PromosList from "./PromosList";
import { getPromos, getPricingTables } from "@/lib/promos";

const archivedPromoIds = new Set([
  "ultraformer-mpt",
  "glass-skin-juvetox",
  "thera-luhilo-snow",
  "lemon-bottle-slimming",
  "botox-theratox",
]);

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
        <PromosHero />
        <Suspense fallback={<PromosPageFallback />}>
          <PromosContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

function PromosHero() {
  return (
    <section
      aria-labelledby="promos-heading"
      className="relative isolate overflow-hidden border-b border-[#D8BC84]/35 bg-[#4C5534] text-[#FFFCF3]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_76%,rgba(218,185,124,0.22),transparent_58%),linear-gradient(135deg,#424B2E,#506044)] md:bg-[radial-gradient(ellipse_at_79%_49%,rgba(218,185,124,0.26),transparent_44%),linear-gradient(115deg,#424B2E,#506044)]"
      />

      <div className="mx-auto grid max-w-[1360px] items-center gap-9 px-6 py-10 md:min-h-[600px] md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-10 md:py-8 lg:px-16">
        <div className="max-w-[680px]">
          <p className="font-montserrat flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E1C48B]">
            <span aria-hidden="true" className="h-px w-9 bg-current" />
            The Holiday Treat
          </p>

          <h1 id="promos-heading" className="font-bodoni mt-4 text-[clamp(2.5rem,4.35vw,4.65rem)] font-normal leading-[1.04] tracking-[-0.025em]">
            Celebrate the season
            <em className="block text-[#E1C48B]">with a little glow.</em>
          </h1>

          <p className="font-montserrat mt-5 max-w-[390px] text-sm leading-relaxed md:text-[15px]">
            Indulge in the beauty of the season with exclusive offers on our
            signature aesthetic and wellness treatments.
          </p>

          <p className="font-montserrat mt-5 max-w-[390px] border-t border-[#E1C48B]/55 pt-4 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#E1C48B]">
            Exclusive seasonal offers
          </p>
        </div>

        <PromoHeroSlideshow />
      </div>
    </section>
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
      <PromosList
        promos={promos.filter((promo) => !archivedPromoIds.has(promo.id))}
        pricingTables={pricingTables}
      />

      <Consultation />
    </>
  );
}

function PromosPageFallback() {
  return (
    <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading promotions" aria-busy="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="aspect-[4/5] animate-pulse rounded-[20px] bg-[#80755F]/10" />
      ))}
    </section>
  );
}
