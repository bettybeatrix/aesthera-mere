import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookingTrigger from "@/components/BookingTrigger";
import type { Treatment, TreatmentCategory, TreatmentGroup } from "@/data/treatments";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TreatmentDetailPage({
  category,
  group,
  treatment,
}: {
  category: TreatmentCategory;
  group: TreatmentGroup;
  treatment: Treatment;
}) {
  const collectionLabel = treatment.collection ?? group.title;
  const backHref = "/treatments/" + category.slug + "/" + group.slug;
  const packageMatch = treatment.packagePrice?.match(/^(.+?):\s*(₱[^;]+)$/);
  let packageLabel = "Package offer";
  if (packageMatch) {
    if (/package/i.test(packageMatch[1])) {
      packageLabel = packageMatch[1].replace(/package/i, "Package");
    } else if (/session/i.test(packageMatch[1])) {
      packageLabel = packageMatch[1];
    } else {
      packageLabel = packageMatch[1] + " Package";
    }
  }
  const packageValue = packageMatch?.[2] ?? treatment.packagePrice;
  const facts = [
    ["Best for", treatment.benefits.join(", ")],
    ["Treatment time", treatment.duration],
    ["Downtime", treatment.downtime],
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#F6F3ED] text-[#4C5534]">
        <div className="border-b border-[#80755F]/15 px-6 py-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.13em] text-[#80755F] sm:text-[10px]">
            <Link href="/" className="transition-colors hover:text-[#4C5534]">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/treatments" className="transition-colors hover:text-[#4C5534]">Treatments</Link>
            <span aria-hidden="true">/</span>
            <Link href={"/treatments/" + category.slug} className="transition-colors hover:text-[#4C5534]">{category.name}</Link>
            <span aria-hidden="true">/</span>
            <Link href={backHref} className="transition-colors hover:text-[#4C5534]">{group.title}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#4C5534]">{treatment.name}</span>
          </nav>
        </div>

        <section className="px-5 pb-10 pt-6 sm:px-6 md:px-10 md:pb-14 md:pt-9 lg:pb-16 lg:pt-11">
          <article className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-14 xl:gap-20">
            <div className="flex min-w-0 flex-col lg:py-2">
              <div>
                <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.17em] text-[#80755F] sm:text-[10px]">{collectionLabel}</p>
                <h1 className="mt-3 max-w-[760px] font-bodoni text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.015em] text-[#4C5534]">{treatment.name}</h1>
                <div aria-hidden="true" className="mt-5 h-px w-14 bg-[#B39552]" />
                <p className="mt-5 max-w-[700px] font-montserrat text-[13px] leading-6 text-[#80755F] sm:text-[14px] sm:leading-7">{treatment.description}</p>
              </div>

              <section className="mt-8" aria-labelledby="treatment-facts-heading">
                <h2 id="treatment-facts-heading" className="font-bodoni text-[1.85rem] font-normal leading-tight text-[#4C5534]">At a Glance</h2>
                <dl className="mt-4 divide-y divide-[#80755F]/18 border-y border-[#80755F]/20">
                  {facts.map(([label, value]) => (
                    <div key={label} className="grid gap-1 py-3 sm:grid-cols-[145px_1fr] sm:gap-6">
                      <dt className="font-montserrat text-[10px] font-bold uppercase tracking-[0.12em] text-[#4C5534]">{label}</dt>
                      <dd className="font-montserrat text-[12px] leading-5 text-[#80755F] sm:text-[13px]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div className="mt-7 grid gap-5 border-b border-[#80755F]/20 pb-6 sm:grid-cols-2">
                <div>
                  <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80755F]">{treatment.priceLabel}</p>
                  <p className="mt-1.5 font-seasons text-[1.9rem] leading-tight text-[#4C5534]">{treatment.price}</p>
                </div>
                {treatment.packagePrice && (
                  <div>
                    <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80755F]">{packageLabel}</p>
                    <p className="mt-1.5 font-seasons text-[1.9rem] leading-tight text-[#4C5534]">{packageValue}</p>
                  </div>
                )}
              </div>

              {treatment.priceNote && (
                <p className="mt-3 font-montserrat text-[11px] leading-5 text-[#80755F]">{treatment.priceNote}</p>
              )}

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BookingTrigger initialTreatment={treatment.name} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#4C5534] px-8 font-montserrat text-xs font-semibold text-white transition-colors hover:bg-[#4F6442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">
                Book an Appointment
                <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </BookingTrigger>
                <Link href={backHref} className="inline-flex items-center gap-2 font-montserrat text-[11px] font-semibold text-[#4C5534] transition-colors hover:text-[#80755F]">
                  <span aria-hidden="true">←</span>
                  Back to Treatments
                </Link>
              </div>
              <p className="mt-4 font-montserrat text-[11px] leading-5 text-[#80755F]">Final treatment plan is confirmed during consultation.</p>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[22px] bg-[#80755F]/10 shadow-[0_16px_38px_rgba(76,85,52,0.12)] sm:h-[460px] lg:mt-7 lg:h-[560px]">
              {treatment.imageAvailable === false ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#E9D8BD] px-6 text-center">
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4C5534]/70">Treatment image coming soon</p>
                </div>
              ) : (
                <>
                  <Image src={treatment.image} alt={treatment.name} fill priority quality={92} sizes="(max-width: 1023px) 100vw, 46vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#4C5534]/10 to-transparent" />
                </>
              )}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
