"use client";

import Image from "next/image";
import type { PromoCampaignSettings } from "@/types/promo";

type Props = {
  campaign: PromoCampaignSettings;
  editable?: boolean;
  onChange?: (next: PromoCampaignSettings) => void;
};

export default function PromoCampaignHero({ campaign, editable = false, onChange }: Props) {
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

  return (
    <section className="border-b border-[#80755F]/15 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
        <div className="max-w-[760px]">
          {editable ? (
            <input aria-label="Campaign eyebrow" value={campaign.eyebrow} onChange={(event) => update("eyebrow", event.target.value)} className="w-full border-b border-dashed border-[#80755F]/40 bg-transparent pb-1 font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#80755F] outline-none focus:border-[#4C5534]" />
          ) : (
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] text-[#80755F]">{campaign.eyebrow}</p>
          )}

          {editable ? (
            <div className="mt-4 space-y-1">
              <input aria-label="Hero headline first line" value={campaign.headlineLine1} onChange={(event) => update("headlineLine1", event.target.value)} className="w-full border-b border-dashed border-[#80755F]/40 bg-transparent font-seasons text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534] outline-none focus:border-[#4C5534]" />
              <input aria-label="Hero headline second line" value={campaign.headlineLine2} onChange={(event) => update("headlineLine2", event.target.value)} className="w-full border-b border-dashed border-[#80755F]/40 bg-transparent font-seasons text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534] outline-none focus:border-[#4C5534]" />
            </div>
          ) : (
            <h1 className="font-seasons mt-4 text-[clamp(3rem,7vw,5.8rem)] leading-[0.94] text-[#4C5534]">{campaign.headlineLine1}<br />{campaign.headlineLine2}</h1>
          )}

          {editable ? (
            <textarea aria-label="Campaign description" rows={3} value={campaign.description} onChange={(event) => update("description", event.target.value)} className="mt-6 w-full resize-y border-b border-dashed border-[#80755F]/40 bg-transparent font-montserrat text-sm leading-7 text-[#80755F] outline-none focus:border-[#4C5534] md:text-base" />
          ) : (
            <p className="mt-6 max-w-[700px] font-montserrat text-sm leading-7 text-[#80755F] md:text-base">{campaign.description}</p>
          )}
          {editable && <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#4C5534]/25 px-4 py-2 font-montserrat text-[9px] font-semibold uppercase text-[#4C5534]">Change campaign poster<input type="file" accept="image/*" onChange={uploadPoster} className="sr-only" /></label>}
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[390px] overflow-hidden rounded-[20px] border border-[#80755F]/15 bg-[#F4E9D7] shadow-[0_18px_45px_-32px_rgba(30,58,42,0.45)] md:max-w-[435px] lg:mr-0">
          {campaign.heroImage && <Image src={campaign.heroImage} alt={campaign.heroImageAlt} fill priority sizes="(max-width: 1023px) 90vw, 32vw" className="object-cover" unoptimized={!campaign.heroImage.startsWith("/")} />}
        </div>
      </div>
    </section>
  );
}
