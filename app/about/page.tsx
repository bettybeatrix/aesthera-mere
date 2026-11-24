import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Aesthera Mère | Our Story, Philosophy & Clinic",
  description:
    "Discover the Aesthera Mère story, philosophy, clinic, and professional standards.",
};

const facilityImages = [
  {
    src: "/images/about/about.png",
    alt: "Aesthera Mère clinic reception",
  },
  {
    src: "/images/about/about2.png",
    alt: "Aesthera Mère treatment room",
  },
  {
    src: "/images/about/about3.png",
    alt: "Aesthera Mère clinic interior",
  },
];

const values = [
  {
    number: "01",
    title: "Integrity First",
    description:
      "Honest, transparent, and ethical decision-making in every recommendation.",
  },
  {
    number: "02",
    title: "Excellence in Care",
    description:
      "Professional expertise, continuous improvement, and uncompromising standards.",
  },
  {
    number: "03",
    title: "Innovation with Purpose",
    description:
      "Thoughtful use of modern technologies to create meaningful improvements.",
  },
  {
    number: "04",
    title: "Accountability",
    description:
      "Ownership of our actions, commitments, and the quality of every client experience.",
  },
  {
    number: "05",
    title: "People-Centered",
    description:
      "Care that begins with listening and respects each client's goals and comfort.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#FFFCF3] text-[#4C5534]">
        <section className="relative border-b border-[#80755F]/15">
          <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#80755F]">
                Our story · Our standard
              </p>
              <h1 className="mt-5 max-w-[760px] font-seasons text-[clamp(3.8rem,8vw,7.2rem)] leading-[0.88] tracking-[-0.045em]">
                Care with
                <span className="block italic text-[#7A8560]">lasting meaning.</span>
              </h1>
            </div>
            <div className="border-l border-[#B59A67]/60 pb-1 pl-6 md:pl-8">
              <p className="font-montserrat max-w-[480px] text-sm leading-7 text-[#6F7568] md:text-[15px] md:leading-8">
                Aesthera Mère is RiveraMère Innovations Inc.&apos;s flagship aesthetic
                clinic—created around the belief that beauty care should combine
                medical insight, honest guidance, and a genuinely personal experience.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#4C5534] px-6 py-16 text-[#FFFCF3] md:px-10 md:py-24" aria-labelledby="story-title">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFFCF3]/65">
                01 / The clinic story
              </p>
              <h2 id="story-title" className="mt-4 font-seasons text-[clamp(3rem,6vw,5.3rem)] leading-[0.94]">
                The Mère Standard
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div className="space-y-5 font-montserrat text-[14px] leading-8 text-[#FFFCF3]/75">
                <p>
                  Derived from the French word <em>Mère</em>, meaning mother,
                  the name reflects values of nurturing, compassion, trust, and
                  responsibility.
                </p>
                <p>
                  Aesthera Mère delivers premium aesthetic and wellness solutions
                  through personalized consultations and carefully selected
                  treatment options.
                </p>
              </div>
              <div className="rounded-[24px] border border-[#80755F]/15 bg-[#F4F1E8] p-7 text-[#4C5534]">
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
                  Founded
                </p>
                <p className="mt-2 font-seasons text-4xl">2025</p>
                <div className="my-5 h-px bg-[#80755F]/15" />
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
                  Parent company
                </p>
                <p className="mt-2 font-montserrat text-sm font-semibold leading-6">
                  RiveraMère Innovations Inc.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#EDEFE6] px-6 py-16 md:px-10 md:py-24" aria-labelledby="philosophy-title">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">
                  02 / Philosophy
                </p>
                <h2 id="philosophy-title" className="mt-4 max-w-[560px] font-seasons text-[clamp(3rem,5.5vw,5.2rem)] leading-[0.95]">
                  Beauty is personal.
                  <span className="block italic text-[#7A8560]">Care should be, too.</span>
                </h2>
              </div>
              <blockquote className="border-l border-[#B59A67] pl-7 font-seasons text-[26px] leading-[1.25] text-[#4C5534] md:pl-10 md:text-[34px]">
                “Rather than simply providing services, we aim to build lasting
                relationships founded on genuine care, professional excellence,
                and integrity.”
              </blockquote>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-[#4C5534]/10 bg-[#4C5534]/10 md:grid-cols-2 xl:grid-cols-5">
              {values.map((value) => (
                <article key={value.number} className="min-h-[220px] bg-[#FFFCF3] p-7">
                  <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#B59A67]">
                    {value.number}
                  </p>
                  <h3 className="mt-6 font-seasons text-[25px] leading-tight">
                    {value.title}
                  </h3>
                  <p className="mt-4 font-montserrat text-[12px] leading-6 text-[#777568]">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-8 border-t border-[#4C5534]/15 pt-10 md:grid-cols-2">
              <div>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
                  Our mission
                </p>
                <p className="mt-3 font-seasons text-[25px] leading-[1.35] md:text-[29px]">
                  To build purpose-driven businesses that deliver trusted beauty,
                  wellness, and healthcare solutions through ethical leadership,
                  operational excellence, and meaningful client experiences.
                </p>
              </div>
              <div>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">
                  Our vision
                </p>
                <p className="mt-3 font-seasons text-[25px] leading-[1.35] md:text-[29px]">
                  To become one of the Philippines&apos; most respected beauty and
                  wellness groups, set high standards of care, and create lasting
                  value for people and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 md:py-24" aria-labelledby="facility-title">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-9 flex items-end justify-between gap-6">
              <div>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B59A67]">
                  03 / The clinic
                </p>
                <h2 id="facility-title" className="mt-4 font-seasons text-[clamp(3rem,5vw,5rem)] leading-none">
                  Designed for comfort
                </h2>
              </div>
              <Link
                href="/contact"
                className="hidden min-h-11 items-center gap-2 rounded-full border border-[#4C5534]/30 px-5 font-montserrat text-[11px] font-semibold sm:inline-flex"
              >
                Visit Us <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
              {facilityImages.map((image, index) => (
                <figure
                  key={image.src}
                  className={`relative overflow-hidden rounded-[20px] bg-[#E6E1D5] ${
                    index === 0
                      ? "aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto"
                      : "aspect-[16/10] md:col-span-5"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 md:py-24" aria-labelledby="credentials-title">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-8 md:grid-cols-2">
              <article className="rounded-[24px] border border-[#80755F]/15 p-7 md:p-9">
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B59A67]">
                  Professional standards
                </p>
                <h2 id="credentials-title" className="mt-3 font-seasons text-[34px] leading-tight md:text-[42px]">
                  Licenses & accreditations
                </h2>
                <p className="mt-5 font-montserrat text-[13px] leading-7 text-[#777568]">
                  Current clinic, physician, and professional credentials are available
                  for verification by direct request. We recommend asking our team to
                  provide the relevant license or registration before your procedure.
                </p>
                <a href="tel:+639189365679" className="mt-6 inline-flex min-h-11 items-center gap-2 font-montserrat text-[12px] font-semibold underline underline-offset-4">
                  Request Verification <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </article>
              <article className="rounded-[24px] border border-[#80755F]/15 p-7 md:p-9">
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B59A67]">
                  Payment partners
                </p>
                <h2 className="mt-3 font-seasons text-[34px] leading-tight md:text-[42px]">
                  HMO partners
                </h2>
                <p className="mt-5 font-montserrat text-[13px] leading-7 text-[#777568]">
                  A published HMO partner list is not yet available on this page.
                  Please contact the clinic to confirm coverage, eligibility, required
                  documents, and cash-out requirements before booking.
                </p>
                <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 font-montserrat text-[12px] font-semibold underline underline-offset-4">
                  Confirm Coverage <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
