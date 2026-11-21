import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import PromosList from "./PromosList";
import { getPromos, getPricingTables } from "@/lib/promos";

export const metadata = {
  title: "Promos & Packages | Aesthera Mère Beauty Creations",
  description:
    "Browse Aesthera Mère's current promotions and treatment packages.",
};

export default async function PromosPage() {
  const [promos, pricingTables] = await Promise.all([
    getPromos(),
    getPricingTables(),
  ]);

  return (
    <>
      <Navbar />

      <main className="bg-[#FFFCF3] text-[#4C5534]">
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
      </main>

      <Footer />
    </>
  );
}
