"use client";

import Image from "next/image";
import { useState } from "react";
import type { PromoCampaignSettings } from "@/types/promo";

type Props = {
  campaign: PromoCampaignSettings;
  editable?: boolean;
  onChange?: (next: PromoCampaignSettings) => void;
  onSave?: () => void;
};

export default function PromoCampaignHero({ campaign, editable = false, onChange, onSave }: Props) {
  const [editing, setEditing] = useState(false);

  function update<K extends keyof PromoCampaignSettings>(key: K, value: PromoCampaignSettings[K]) {
    onChange?.({ ...campaign, [key]: value });
  }

  function uploadPoster(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") update("heroImage", reader.result);
    };
    reader.readAsDataURL(file);
  }

  const fieldClass = "w-full border-b border-dashed border-[#80755F]/40 bg-transparent outline-none focus:border-[#4C5534]";

  return (
    <section className="relative border-b border-[#80755F]/15 px-6 py-14 md:px-10 md:py-20">
      {editable && !editing && (
        <button type="button" onClick={() => setEditing(true)} className="absolute right-6 top-5 inline-flex min-h-9 items-center gap-2 rounded-full border border-[#4C5534]/20 bg-white/90 px-4 font-montserrat text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4C5534] shadow-sm transition-colors hover:bg-[#F5F1E7] md:right-10" aria-label="Edit campaign hero">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m14 5 5 5M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" /></svg>
          Edit
        </button>
      )}

      <div className="mx-auto grid max-w-[1280px] items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(280px,390px)]">
        <div className="max-w-[760px]">
          {editing ? (
            <input aria-label="Campaign eyebrow" value={campaign.eyebrow} onChange={(event) => update("eyebrow", event.target.value)} className={fieldClass + " pb-1 font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#80755F]"} />
          ) : (
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#80755F]">{campaign.eyebrow}</p>
          )}

          {editing ? (
            <div className="mt-4 space-y-1">
              <input aria-label="Hero headline first line" value={campaign.headlineLine1} onChange={(event) => update("headlineLine1", event.target.value)} className={fieldClass + " font-seasons text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]"} />
              <input aria-label="Hero headline second line" value={campaign.headlineLine2} onChange={(event) => update("headlineLine2", event.target.value)} className={fieldClass + " font-seasons text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]"} />
            </div>
          ) : (
            <h1 className="font-seasons mt-4 text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]">{campaign.headlineLine1}<br />{campaign.headlineLine2}</h1>
          )}

          {editing ? (
            <textarea aria-label="Campaign description" rows={3} value={campaign.description} onChange={(event) => update("description", event.target.value)} className={fieldClass + " mt-6 resize-y font-montserrat text-sm leading-7 text-[#80755F] md:text-base"} />
          ) : (
            <p className="mt-6 max-w-[700px] font-montserrat text-sm leading-7 text-[#80755F] md:text-base">{campaign.description}</p>
          )}
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[18px] border border-[#80755F]/15 bg-[#F4E9D7] shadow-[0_18px_45px_-32px_rgba(30,58,42,0.45)] lg:mr-0">
          {campaign.heroImage && <Image src={campaign.heroImage} alt={campaign.heroImageAlt} fill priority sizes="(max-width: 1023px) 80vw, 300px" className="object-cover" unoptimized={!campaign.heroImage.startsWith("/")} />}
          {editing && (
            <label className="absolute bottom-3 right-3 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/80 bg-white/95 text-[#4C5534] shadow-md transition-transform hover:scale-105" title="Change campaign image">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z" /><circle cx="12" cy="13" r="3" /></svg>
              <input type="file" accept="image/*" onChange={uploadPoster} className="sr-only" />
            </label>
          )}
        </div>
      </div>

      {editing && (
        <div className="mx-auto mt-6 flex max-w-[1280px] justify-end gap-2">
          <button type="button" onClick={() => setEditing(false)} className="min-h-10 rounded-full border border-[#4C5534]/20 px-5 font-montserrat text-[9px] font-semibold uppercase text-[#4C5534]">Cancel</button>
          <button type="button" onClick={() => { onSave?.(); setEditing(false); }} className="min-h-10 rounded-full bg-[#4C5534] px-6 font-montserrat text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#35452F]">Save Changes</button>
        </div>
      )}
    </section>
  );
}
