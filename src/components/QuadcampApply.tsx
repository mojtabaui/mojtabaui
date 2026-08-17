"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import QuadcampForm from "@/components/QuadcampForm";
import { COPY, LANGS, LANG_LABEL, type Lang } from "@/lib/quadcamp-copy";

/**
 * پوستهٔ دوزبانهٔ صفحهٔ اپلای.
 *
 * زبان state ساده‌ایه، نه مسیر جدا — چون فرم نصفه‌کاره نباید با عوض کردن
 * زبان بپره. در عوض آدرس با replaceState به‌روز می‌شه تا لینک ?lang=en رو
 * بشه مستقیم برای کسی فرستاد.
 */
export default function QuadcampApply({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = COPY[lang];

  function pick(next: Lang) {
    setLang(next);
    // بدون ناوبری — فقط آدرس رو با چیزی که کاربر می‌بینه یکی می‌کنه
    const url = new URL(window.location.href);
    if (next === "fa") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  }

  return (
    <main
      lang={lang}
      dir={t.dir}
      data-lang={lang}
      className="panel native-cursor relative min-h-screen bg-[var(--page)] overflow-hidden"
    >
      {/* هالهٔ بنفش پشت سربرگ، همون لهجه‌ی رنگی خود سایت */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--violet) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-xl px-5 py-14 sm:py-20">
        {/* ── تعویض زبان ── */}
        <div className="mb-8 flex justify-end">
          <div className="inline-flex items-center gap-1 rounded-full border border-[var(--line-strong)] bg-[var(--card)] p-1">
            <Languages size={13} className="mx-1.5 text-[var(--ink-4)]" />
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => pick(code)}
                lang={code}
                aria-pressed={lang === code}
                className={`rounded-full px-3 py-1 font-body text-xs transition-colors ${
                  lang === code
                    ? "bg-[var(--violet)]/15 text-[var(--violet)]"
                    : "text-[var(--ink-4)] hover:text-[var(--ink-2)]"
                }`}
              >
                {LANG_LABEL[code]}
              </button>
            ))}
          </div>
        </div>

        <header className="mb-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[var(--violet)]/70" />
            <span className="font-display text-[11px] tracking-[0.2em] uppercase text-[var(--violet)]">
              {t.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[var(--ink)] leading-tight mb-3">
            {t.title}
          </h1>

          <p className="font-body text-sm text-[var(--ink-3)] leading-7">{t.intro}</p>
        </header>

        <QuadcampForm lang={lang} />

        <p className="mt-10 font-body text-xs text-[var(--ink-4)] leading-7 text-center">
          {t.footer}
        </p>
      </div>
    </main>
  );
}
