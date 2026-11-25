"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const promoHeroImages = [
  "beready-holiday-deals.jpg",
  "facials-holiday.jpg",
  "laser-treatments-holiday.jpg",
  "ultraformer-mpt-holiday.jpg",
  "slimming-injections-holiday.jpg",
  "prx-glow-holiday.jpg",
  "rejuvanad-plus-holiday.jpg",
  "italian-lip-booster-holiday.jpg",
  "sculptra-holiday.jpg",
  "aptos-namica-holiday.jpg",
  "theratox-holiday.jpg",
  "wellness-shot-holiday.jpg",
];

const openingSlideDuration = 8000;
const offerSlideDuration = 4000;

export default function PromoHeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = (activeSlide + 1) % promoHeroImages.length;
  const previousSlide = (activeSlide - 1 + promoHeroImages.length) % promoHeroImages.length;

  useEffect(() => {
    if (promoHeroImages.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: number | undefined;

    function syncRotation() {
      window.clearTimeout(timeout);
      if (reducedMotion.matches) return;

      timeout = window.setTimeout(
        () => setActiveSlide(nextSlide),
        activeSlide === 0 ? openingSlideDuration : offerSlideDuration
      );
    }

    syncRotation();
    reducedMotion.addEventListener("change", syncRotation);

    return () => {
      window.clearTimeout(timeout);
      reducedMotion.removeEventListener("change", syncRotation);
    };
  }, [activeSlide, nextSlide]);

  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto aspect-[1638/2048] w-full max-w-[320px] md:max-w-[425px]">
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg border border-[#E1C48B]/65" />

      {promoHeroImages.map((filename, index) => {
        if (index !== activeSlide && index !== nextSlide && index !== previousSlide) return null;

        const src = `/images/promotions/${filename}`;

        return (
          <div
            key={filename}
            className={`absolute inset-0 overflow-hidden rounded-lg transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              fetchPriority={index === 0 ? "high" : undefined}
              sizes="(min-width: 1024px) 425px, (min-width: 768px) 43vw, (min-width: 368px) 320px, calc(100vw - 48px)"
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
