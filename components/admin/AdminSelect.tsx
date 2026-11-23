"use client";

import { useEffect, useRef, useState } from "react";

type Option<T extends string> = { value: T; label: string };

export default function AdminSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  filterIcon = false,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  filterIcon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 font-montserrat text-[10px] font-medium transition-all ${open ? "bg-[#344b38] text-white shadow-sm" : "bg-[#f0f2ec] text-[#4f5f53] hover:bg-[#e7ece4]"}`}
      >
        {filterIcon && (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-4 w-4 shrink-0 opacity-70">
            <path d="M4 5h16M7 12h10M10 19h4" />
          </svg>
        )}
        <span className="truncate">{selected.label}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`ml-auto h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <div role="listbox" aria-label={label} className="absolute right-0 top-[calc(100%+8px)] z-50 w-full min-w-44 overflow-hidden rounded-2xl border border-[#344b38]/10 bg-[#fbfaf6] p-1.5 shadow-[0_20px_50px_-20px_rgba(32,50,36,0.45)]">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left font-montserrat text-[9px] transition-colors ${active ? "bg-[#e4ebe1] font-bold text-[#36513c]" : "text-[#667068] hover:bg-[#f0f1eb] hover:text-[#405745]"}`}
              >
                {option.label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#58745e]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
