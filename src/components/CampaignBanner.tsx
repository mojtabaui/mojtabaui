"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { campaignPhase, type CampaignInfo } from "@/lib/campaign";

const COPY = {
  fa: {
    upcomingTag: "به‌زودی",
    liveTag: "کمپین شروع شد",
    upcoming: "تا شروع کمپین",
    live: "تا پایان کمپین",
    units: ["روز", "ساعت", "دقیقه", "ثانیه"],
    cta: "دیدن دوره‌ها",
  },
  en: {
    upcomingTag: "Coming soon",
    liveTag: "Live now",
    upcoming: "Starts in",
    live: "Ends in",
    units: ["days", "hrs", "min", "sec"],
    cta: "See courses",
  },
} as const;

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/**
 * بنر کمپین بالای صفحهٔ اصلی.
 *
 * قبل از شروع تا لحظهٔ شروع می‌شمره؛ همین که به صفر رسید خودش می‌ره روی
 * «تا پایان کمپین» و صفحه رو یک بار تازه می‌کنه تا قیمت‌های کمپینی از
 * سرور بیان. بعد از پایان هم یک تازه‌سازیِ دیگه و بنر کنار می‌ره.
 *
 * اولین رندر با ساعتِ سرور انجام می‌شه تا HTML سرور و کلاینت یکی باشن.
 */
export default function CampaignBanner({
  campaign,
  serverNow,
  lang,
}: {
  campaign: CampaignInfo;
  serverNow: number;
  lang: "fa" | "en";
}) {
  const t = COPY[lang];
  const router = useRouter();
  const [now, setNow] = useState(serverNow);
  const phase = campaignPhase(campaign, now);
  const lastPhase = useRef(phase);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (lastPhase.current !== phase) {
      lastPhase.current = phase;
      router.refresh();
    }
  }, [phase, router]);

  if (phase === "ended") return null;

  const target = Date.parse(phase === "upcoming" ? campaign.startsAt : campaign.endsAt);
  const parts = split(target - now);
  const num = (n: number) =>
    lang === "fa" ? n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0");
  const live = phase === "live";

  return (
    <div className="w-full bg-[#1a1714] text-[#FAF6F1] border-b border-[#2a2520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1 font-body text-[11px] ${
              live ? "bg-[#7c5cfc] text-white" : "bg-white/10 text-white/75"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-white pulse-dot" : "bg-[#e8a33d]"}`} />
            {live ? t.liveTag : t.upcomingTag}
          </span>
          <div className="min-w-0">
            <p className="font-body font-bold text-sm leading-6 truncate">{campaign.title}</p>
            {campaign.subtitle && (
              <p className="font-body text-xs text-white/55 leading-5 truncate">{campaign.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="font-body text-xs text-white/55">{live ? t.live : t.upcoming}</span>
          <div role="timer" className="flex items-center gap-1.5" dir="ltr">
            {/* در چیدمان چپ‌به‌راست روز اول میاد؛ برای فارسی برعکسش می‌کنیم تا روز سمت راست باشه */}
            {(lang === "fa" ? [...parts.keys()].reverse() : [...parts.keys()]).map((i) => (
              <div key={i} className="flex flex-col items-center min-w-[2.6rem] rounded-lg bg-white/[0.07] px-1.5 py-1">
                <span className="font-display font-bold text-base leading-5 tabular-nums">{num(parts[i])}</span>
                <span className="font-body text-[10px] text-white/45 leading-4">{t.units[i]}</span>
              </div>
            ))}
          </div>
          {live && (
            <Link
              href="/courses"
              className="hidden md:inline-flex font-body text-xs font-bold bg-[#FAF6F1] text-[#1a1714] rounded-full px-4 py-2 hover:bg-white transition-colors"
            >
              {t.cta}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
