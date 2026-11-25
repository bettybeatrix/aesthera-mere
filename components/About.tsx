
"use client";

import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";

const aboutImages = [
  {
    src: "/images/about/about.png",
    alt: "Aesthera Mère clinic interior",
  },
  {
    src: "/images/about/about2.png",
    alt: "Aesthera Mère treatment room",
  },
  {
    src: "/images/about/about3.png",
    alt: "Aesthera Mère clinic experience",
  },
];

const imageDurationMs = 3000;

const highlights = [
  "Expert-Led Care",
  "Personalized Treatments",
  "A Refined Clinic Experience",
];

export default function About() {
  const [activeImage, setActiveImage] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReduceMotion(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || aboutImages.length < 2) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveImage((current) =>
        (current + 1) % aboutImages.length
      );
    }, imageDurationMs);

    return () => window.clearTimeout(timeout);
  }, [activeImage, reduceMotion]);

  return (
    <section
      id="about"
      className="bg-[#FFFCF3] py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* LEFT - FADING IMAGE SLIDESHOW */}
          <div className="relative">
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px] bg-[#FFFCF3]">

              {aboutImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none ${
                    index === activeImage
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }`}
                  aria-hidden={index !== activeImage}
                >
                  <Image
                    src={image.src}
                    alt={
                      index === activeImage ? image.alt : ""
                    }
                    fill
                    quality={90}
                    priority={index === 0}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Soft bottom gradient */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#4C5534]/20 via-transparent to-transparent" />

              {/* Image indicators */}
              <div
                className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5"
                aria-hidden="true"
              >
                {aboutImages.map((image, index) => (
                  <span
                    key={image.src}
                    className="flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                        activeImage === index
                          ? "w-7 bg-[#FFFCF3]"
                          : "w-2 bg-[#FFFCF3]/60"
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - ABOUT CONTENT */}
          <div className="flex flex-col items-start">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#80755F]/60" />

              <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.22em] text-[#80755F]">
                Get to Know Aesthera Mère
              </span>
            </div>

            <h2
              className="max-w-[550px] text-[36px] leading-[1.15] text-[#4C5534] md:text-[48px] lg:text-[54px]"
              style={{
                fontFamily:
                  "'The Seasons', Georgia, serif",
              }}
            >
              Where Beauty Meets Thoughtful Care.
            </h2>

            <p className="mt-6 max-w-[510px] font-montserrat text-[13px] leading-[1.9] text-[#80755F] md:text-[14px]">
              At Aesthera Mère, aesthetic care is centered
              on individuality. We combine personalized
              treatments with a thoughtful approach to
              help you feel confident in your own beauty.
            </p>

            <span className="my-7 h-px w-full max-w-[440px] bg-[#80755F]/25" />

            <div className="flex flex-col gap-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4C5534]/30 text-[#4C5534]">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>

                  <span className="font-montserrat text-[13px] font-medium text-[#4C5534]">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-9 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#4C5534] px-7 py-3 font-montserrat text-[12px] font-medium text-[#FFFCF3] transition-all duration-300 hover:gap-5 hover:bg-[#4F6442] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
            >
              Discover Our Story

              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
