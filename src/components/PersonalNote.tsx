import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { BrandGlyph } from "@/components/BrandMark";
import { getLang } from "@/lib/i18n/server";
import { NOTE } from "@/lib/i18n/dict/note";

/**
 * یادداشت شخصی مدرس.
 *
 * عمداً از بقیه‌ی سکشن‌ها آروم‌تره: بدون کارت، بدون آمار، بدون دکمه.
 * تنها جای سایت که اول‌شخص حرف می‌زنه، پس هر چیزی که حس فروش بده
 * لحنش رو خراب می‌کنه.
 */
export default async function PersonalNote() {
  const t = NOTE[await getLang()];

  return (
    <section className="py-24 bg-white border-y border-[#e8e2d9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#7c5cfc]">
                <BrandGlyph size={30} />
              </span>
              <span className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990]">
                {t.kicker}
              </span>
              <span className="h-px flex-1 bg-[#e8e2d9]" />
            </div>

            <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4] mb-8">
              {t.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-6 font-body text-[#4a4540] text-[1.0625rem] leading-[2]">
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-[#1a1714] font-semibold">{t.closing}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="mt-10 pt-8 border-t border-[#f0ebe4] flex items-center gap-4">
              <Image
                src="/images/sig.png"
                alt=""
                width={690}
                height={252}
                className="h-12 w-auto opacity-90 select-none"
              />
              <div className="leading-tight">
                <div className="font-body font-bold text-sm text-[#1a1714]">
                  {t.name}
                </div>
                <div className="font-body text-xs text-[#a09990] mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
