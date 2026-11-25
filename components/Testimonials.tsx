
"use client";

import { useState, type CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/Icons";
import { featuredTestimonials, supportingTestimonials } from "@/data/testimonials";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=aesthera+mere+beauty+creations&sca_esv=9c0ea2fc79e91fa8&biw=1536&bih=695&sxsrf=AKL5yDh4Yw6YgVbTwB9yTzPXpWWkAP_DBg%3A1794556159209&ei=_8D2ariwDPW3rfcP75nWmQ4&uact=5&oq=aesthera+mere+beauty+creations&gs_lp=Egxnd3Mtd2l6LXNlcnAiHmFlc3RoZXJhIG1lcmUgYmVhdXR5IGNyZWF0aW9uczIEECMYJzIHECMY8AUYJzILEC4YgAQYxwEYrwEyBhAAGBYYHjIGEAAYFhgeMgIQJjILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIFEAAY7wVIwAJQL1gvcAF4AJABAJgBjAGgAYwBqgEDMC4xuAEDyAEA-AEBmAIBoAKRAZgDAIgGAZIHAzAuMaAHjguyBwMwLjG4B5EBwgcDMi0xyAcDgAgB&sclient=gws-wiz-serp#lrd=0x3397c9ff0d4effff:0x8f90fb8a8325a1c2,1,,,,";

function reviewMotionStyle(
  index: number,
  activeIndex: number,
  count: number,
  axis: "x" | "y",
  stagger: number
): CSSProperties {
  const isActive = index === activeIndex;
  const isNext = (index - activeIndex + count) % count === 1;
  const distance = isActive ? 0 : (isNext ? 1 : -1) * (axis === "x" ? 22 : 6);

  return {
    opacity: isActive ? 1 : 0,
    transform: axis === "x" ? `translate3d(${distance}px, 0, 0)` : `translate3d(0, ${distance}px, 0)`,
    transitionProperty: "opacity, transform",
    transitionDuration: isActive ? "400ms" : "180ms",
    transitionDelay: isActive ? `${180 + stagger * 60}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  };
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [supportingOffset, setSupportingOffset] = useState(0);

  const previous = () => {
    setActive(
      (index) =>
        (index - 1 + featuredTestimonials.length) %
        featuredTestimonials.length
    );
    setSupportingOffset(
      (index) =>
        (index - 1 + supportingTestimonials.length) %
        supportingTestimonials.length
    );
  };

  const next = () => {
    setActive(
      (index) => (index + 1) % featuredTestimonials.length
    );
    setSupportingOffset(
      (index) => (index + 1) % supportingTestimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="bg-[#FFFCF3] py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        {/* SECTION HEADING */}
        <div className="mb-5 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B5AD80]" />

            <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.22em] text-[#80755F]">
              Words From Our Clients
            </span>

            <span className="h-px w-8 bg-[#B5AD80]" />
          </div>

          <h2
            className="text-[36px] leading-tight text-[#4C5534] md:text-[48px]"
            style={{
              fontFamily: "'The Seasons', Georgia, serif",
            }}
          >
            The Aesthera Experience
          </h2>
        </div>

        {/* FEATURED TESTIMONIAL */}
        <div className="relative mx-auto max-w-[1050px] overflow-hidden rounded-[18px] px-6 py-7 text-center text-[#FFFCF3] shadow-[0_12px_28px_rgba(52,65,44,0.12)] md:px-12 md:py-9" style={{ backgroundImage: "linear-gradient(135deg, #B5AD80 0%, #89956C 25%, #4F6442 55%, #34412C 100%)" }}>

          {/* Decorative quotation mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 left-5 select-none text-[130px] leading-none text-[#FFFCF3]/20"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            “
          </span>

          <div className="relative z-10 mx-auto grid max-w-[850px] items-center" aria-live="polite" aria-atomic="true">
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                aria-hidden={index !== active}
                className="col-start-1 row-start-1 flex flex-col items-center motion-reduce:!transition-none"
                style={reviewMotionStyle(index, active, featuredTestimonials.length, "x", 0)}
              >
                <span className="mb-4 h-px w-10 bg-[#FFFCF3]/60" />

                {typeof testimonial.rating === "number" && (
                  <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} filled={i < (testimonial.rating ?? 0)} className="h-4 w-4" />
                    ))}
                  </div>
                )}

                <blockquote className="text-[18px] leading-[1.55] md:text-[21px]" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>
                  “{testimonial.quote}”
                </blockquote>

                <span className="my-4 h-px w-9 bg-[#FFFCF3]/50" />

                <p className="font-montserrat text-[12px] font-medium">{testimonial.name}</p>
                {testimonial.detail && <p className="mt-1 font-montserrat text-[10px] uppercase tracking-[0.12em] text-[#FFFCF3]/80">{testimonial.detail}</p>}
              </div>
            ))}
          </div>

          {/* Only show arrows when there are multiple featured reviews */}
          {featuredTestimonials.length > 1 && (
            <div className="relative z-10 mt-5 flex items-center justify-center gap-5">

              <button
                type="button"
                onClick={previous}
                aria-label="Previous featured testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFCF3]/50 text-[#FFFCF3] transition-all duration-300 hover:bg-[#FFFCF3] hover:text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFCF3]"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              <span className="font-montserrat text-[10px] tracking-[0.12em] text-[#FFFCF3]/80">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(featuredTestimonials.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={next}
                aria-label="Next featured testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFCF3]/50 text-[#FFFCF3] transition-all duration-300 hover:bg-[#FFFCF3] hover:text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFCF3]"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* SUPPORTING TESTIMONIALS */}
        <div className="mx-auto mt-7 max-w-[1050px]">
          <h3 className="mb-3 text-center font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-[#80755F]">
            More Client Reviews
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: Math.min(2, supportingTestimonials.length) }, (_, cardIndex) => (
              <article
                key={cardIndex}
                className="grid min-h-[135px] overflow-hidden rounded-[16px] border border-[#80755F]/15 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(76,85,52,0.06)]"
                aria-live="polite"
                aria-atomic="true"
              >
                {supportingTestimonials.map((_, offset) => {
                  const testimonial = supportingTestimonials[(offset + cardIndex) % supportingTestimonials.length];
                  return (
                    <div
                      key={offset}
                      aria-hidden={offset !== supportingOffset}
                      className="col-start-1 row-start-1 flex flex-col justify-between motion-reduce:!transition-none"
                      style={reviewMotionStyle(offset, supportingOffset, supportingTestimonials.length, "y", cardIndex + 1)}
                    >
                      <p className="font-montserrat text-[12px] leading-[1.75] text-[#4C5534]">“{testimonial.quote}”</p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-montserrat text-[11px] font-medium text-[#80755F]">{testimonial.name}</span>
                        <span className="font-montserrat text-[10px] uppercase tracking-[0.1em] text-[#80755F]">{testimonial.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </div>

        {/* GOOGLE REVIEWS BUTTON */}
        <div className="mt-7 flex flex-col items-center gap-3 text-center">

          <p className="font-montserrat text-[12px] text-[#80755F]">
            Discover what our clients are saying on Google.
          </p>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[#4C5534] px-6 py-3 font-montserrat text-[12px] font-medium text-[#4C5534] transition-all duration-300 hover:bg-[#4C5534] hover:text-[#FFFCF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
          >
            Read Our Google Reviews

            <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
