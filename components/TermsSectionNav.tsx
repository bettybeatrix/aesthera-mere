
"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "acceptance", title: "Acceptance of terms" },
  { id: "website", title: "Website information" },
  { id: "appointments", title: "Appointments & inquiries" },
  { id: "treatments", title: "Treatments & results" },
  { id: "pricing", title: "Pricing & promotions" },
  { id: "conduct", title: "Acceptable use" },
  { id: "external", title: "External services" },
  { id: "ownership", title: "Intellectual property" },
  { id: "disclaimer", title: "Website disclaimers" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact information" },
];

export default function TermsSectionNav() {
  const [activeSection, setActiveSection] =
    useState("acceptance");

  useEffect(() => {
    const updateActiveSection = () => {
      // Account for the sticky navbar
      const offset = 180;

      let current = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (
          element &&
          element.getBoundingClientRect().top <= offset
        ) {
          current = section.id;
        }
      }

      // Highlight the final section at the page bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;

      if (isAtBottom) {
        current = sections[sections.length - 1].id;
      }

      setActiveSection((previous) =>
        previous === current ? previous : current
      );
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav
      aria-label="Terms of use sections"
      className="rounded-[16px] border border-[#4C5534]/10 bg-[#F6F3ED]/90 p-6"
    >
      <p className="mb-6 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4C5534]">
        On This Page
      </p>

      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`
                  relative block border-l-2 py-2 pl-4
                  font-montserrat text-[12px] leading-5
                  transition-all duration-300
                  ${
                    isActive
                      ? "border-[#B6A47D] font-semibold text-[#4C5534]"
                      : "border-transparent text-[#80755F] hover:border-[#B6A47D]/50 hover:text-[#4C5534]"
                  }
                `}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
