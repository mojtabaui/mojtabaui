import QuadcampForm from "@/components/QuadcampForm";
import LangSwitch from "@/components/LangSwitch";
import { COPY } from "@/lib/i18n/dict/quadcamp";
import type { Lang } from "@/lib/i18n";

/**
 * پوستهٔ صفحهٔ اپلای.
 *
 * دکمهٔ تعویض زبان اینجا نیست — همون سوییچ سراسری نوار بالا این صفحه رو
 * هم عوض می‌کنه، و دو تا کلید برای یک کار گیج‌کننده بود.
 */
export default function QuadcampApply({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <main className="panel native-cursor relative min-h-screen bg-[var(--page)] overflow-hidden">
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
        {/* این صفحه نوار بالای سایت رو نداره، پس سوییچ زبان خودش رو لازم داره */}
        <div className="mb-8 flex justify-end">
          <LangSwitch tone="panel" />
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
