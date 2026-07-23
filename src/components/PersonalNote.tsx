import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { BrandGlyph } from "@/components/BrandMark";

/**
 * یادداشت شخصی مدرس.
 *
 * عمداً از بقیه‌ی سکشن‌ها آروم‌تره: بدون کارت، بدون آمار، بدون دکمه.
 * تنها جای سایت که اول‌شخص حرف می‌زنه، پس هر چیزی که حس فروش بده
 * لحنش رو خراب می‌کنه.
 */
export default function PersonalNote() {
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
                A NOTE
              </span>
              <span className="h-px flex-1 bg-[#e8e2d9]" />
            </div>

            <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4] mb-8">
              چرا اسمش ملینا شد
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-6 font-body text-[#4a4540] text-[1.0625rem] leading-[2]">
              <p>
                ملینا اسم یک قناری زرده. پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم
                می‌شنوی. وقتی دنبال اسم می‌گشتم، دنبال چیزی بودم که حس امید بده.
              </p>
              <p>
                چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک چیزی رو پشت سر
                می‌ذارن. یکی رشته‌ای که هیچ‌وقت دوستش نداشت، یکی شغلی که خسته‌ش کرده،
                یکی هم چند سال این‌ور و اون‌ور رفتن بی‌نتیجه. آدم وقتی می‌خواد از نو
                شروع کنه، بیشتر از هر چیزی به امید احتیاج داره.
              </p>
              <p>
                سال اول تدریسم یک چیزی فهمیدم که هنوز هم باور دارم. چیزی که یادگیری رو
                ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو باشه. اینکه وقتی گیر
                کردی، کسی باشه که بگه اشکالی نداره، بیا با هم نگاهش کنیم.
              </p>
              <p>
                من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم.
              </p>
              <p className="text-[#1a1714] font-semibold">
                هر چیزی که اینجا می‌بینی، از برنامه‌ی هفتگی تا اینکه خودم جواب سوال‌ها رو
                می‌دم، برای همینه. که هیچ‌کس وسط راه حس نکنه تنها مونده.
              </p>
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
                  مجتبا یزدانپناه
                </div>
                <div className="font-body text-xs text-[#a09990] mt-0.5">
                  بنیان‌گذار مدرسه دیزاین ملینا
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
