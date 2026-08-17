"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGS, LANG_LABEL, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/Providers";
import { COMMON } from "@/lib/i18n/dict/common";

/**
 * تعویض زبان.
 *
 * فقط ?lang رو به همین آدرس می‌چسبونه و می‌ره؛ بقیه‌اش کار پروکسیه که
 * کوکی رو ست می‌کنه. از useSearchParams استفاده نمی‌کنیم و آدرس رو از
 * خود مرورگر می‌گیریم تا این کامپوننت هیچ صفحه‌ای رو مجبور به Suspense
 * نکنه.
 */
/**
 * light: زمینهٔ کرمیِ سایت · dark: فوتر تیره · panel: صفحه‌های توکن‌دار مثل اپلای
 */
type Tone = "light" | "dark" | "panel";

const TONE: Record<Tone, { box: string; on: string; off: string }> = {
  light: {
    box: "bg-white border border-[#e8e2d9]",
    on: "bg-[#1a1714] text-white",
    off: "text-[#6b6560] hover:text-[#1a1714]",
  },
  dark: {
    box: "bg-white/[0.06]",
    on: "bg-white/15 text-white",
    off: "text-white/45 hover:text-white/80",
  },
  panel: {
    box: "bg-[var(--card)] border border-[var(--line-strong)]",
    on: "bg-[var(--violet)]/15 text-[var(--violet)]",
    off: "text-[var(--ink-4)] hover:text-[var(--ink-2)]",
  },
};

export default function LangSwitch({ tone = "light" }: { tone?: Tone }) {
  const lang = useLang();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Lang) {
    if (next === lang) return;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    startTransition(() => {
      router.push(url.pathname + url.search);
      // سرور باید دوباره رندر بشه وگرنه نسخهٔ کش‌شدهٔ زبان قبلی می‌مونه
      router.refresh();
    });
  }

  const skin = TONE[tone];

  return (
    <div
      role="group"
      aria-label={COMMON[lang].lang.switch}
      className={`inline-flex items-center rounded-xl p-0.5 ${skin.box} ${
        pending ? "opacity-60" : ""
      }`}
    >
      {LANGS.map((code) => {
        const on = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => switchTo(code)}
            aria-pressed={on}
            className={`rounded-[10px] px-2.5 py-1.5 font-body text-[11px] leading-none transition-colors ${
              on ? skin.on : skin.off
            }`}
          >
            {/* اسم کوتاه، چون توی نوار بالا جا تنگه */}
            {code === "fa" ? "فا" : "EN"}
            <span className="sr-only"> — {LANG_LABEL[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
