import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import PromosList from "./PromosList";
import { getPromos, getPricingTables } from "@/lib/promos";

export const metadata = {
  title: "Promos & Packages | Aesthera Mère Beauty Creations",
  description:
    "Browse Aesthera Mère's current promotions, grand launch offers, and 5+1 treatment packages. Premium aesthetic care made accessible in Mandaluyong City.",
};

export default async function PromosPage() {
  // These calls currently return mock data.
  // When backend is ready, lib/promos.ts handles the real fetch — this page stays the same.
  const [promos, pricingTables] = await Promise.all([
    getPromos(),
    getPricingTables(),
  ]);

  return (
    <>
      <Navbar />

      <main className="bg-[#FFFCF3] text-[#4C5534]">
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <section className="border-b border-[#80755F]/15 px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]"
            >
              <Link href="/" className="hover:text-[#4C5534]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#4C5534]">
                Promos &amp; Packages
              </span>
            </nav>

            <div className="mt-8 max-w-[880px]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">
                Aesthera Mère • Madison Square Pioneer
              </p>
              <h1 className="font-seasons mt-3 text-[clamp(3.2rem,6.5vw,5.5rem)] leading-[0.95] text-[#4C5534]">
                Current Promotions &amp; Specials
              </h1>
              <p className="mt-3 font-seasons italic text-lg text-[#4f6442] sm:text-xl">
                "Premium Aesthetic Care, Made Accessible"
              </p>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">
                Discover our official seasonal specials, grand launch privileges,
                and signature 5+1 and 10+2 treatment passes. Designed to deliver
                authentic medical-grade aesthetics in a warm, unhurried, and
                welcoming sanctuary.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 font-montserrat text-xs text-[#4C5534]">
                <span className="flex items-center gap-1.5 font-semibold">
                  📍 Unit 3 No.4 Madison Square Pioneer St., Boni Ave.,
                  Mandaluyong City
                </span>
                <span className="text-[#80755F]">|</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  📞 0918 936 5679
                </span>
                <span className="text-[#80755F]">|</span>
                <span className="text-[#80755F]">@aestheramereph</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Interactive Promos List (client component) ───────────────── */}
        <PromosList promos={promos} pricingTables={pricingTables} />

        {/* ── Consultation CTA ─────────────────────────────────────────── */}
        <Consultation />
      </main>

      <Footer />
    </>
  );
}
