
"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "responsible", title: "Who is responsible" },
  { id: "information", title: "Information you enter" },
  { id: "contact", title: "Contacting the clinic" },
  { id: "storage", title: "Cookies & outside services" },
  { id: "retention", title: "How long information remains" },
  { id: "rights", title: "Your privacy rights" },
  { id: "updates", title: "Changes to this policy" },
];

export default function PrivacySectionNav() {
  const [activeSection, setActiveSection] = useState(
    "responsible"
  );

  useEffect(() => {

const updateActiveSection = () => {
  const offset = 180;
  let current = sections[0].id;

  // Detect the section currently being read
  for (const section of sections) {
    const element = document.getElementById(section.id);

    if (
      element &&
      element.getBoundingClientRect().top <= offset
    ) {
      current = section.id;
    }
  }

  // Ensure the final section becomes active
  // when the visitor reaches the page bottom
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
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );
      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, []);

  return (
    <nav
      aria-label="Privacy policy sections"
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
