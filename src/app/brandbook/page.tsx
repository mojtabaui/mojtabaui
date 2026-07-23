import type { Metadata } from "next";
import Image from "next/image";
import BrandMark, { BrandGlyph } from "@/components/BrandMark";

export const metadata: Metadata = {
  title: "برندبوک | مدرسه دیزاین ملینا",
  robots: { index: false, follow: false },
};

/**
 * برندبوک، به‌صورت یک صفحه‌ی بلند.
 *
 * سبکش از اسکیل ui-ux-pro-max اومده: ترکیب Minimalism & Swiss Style برای
 * انضباط گرید و کنتراست، با Exaggerated Minimalism برای لحظه‌های نمایشی
 * (تایپ خیلی درشت، فضای خالی زیاد، تک‌رنگ لهجه). چیدمان فصل‌ها هم از الگوی
 * Scroll-Triggered Storytelling میاد: هر فصل رنگ زمینه‌ی خودش رو داره تا
 * موقع اسکرول، تغییر فصل حس بشه.
 *
 * فاصله‌ی منفی حروف فقط روی متن لاتین اعمال می‌شه؛ فارسی با tracking منفی
 * به هم می‌چسبه.
 */

const INK = "#1a1714";
const CREAM = "#FAF6F1";
const VIOLET = "#7c5cfc";

const chapters = [
  { id: "name", n: "۰۱", title: "اسم" },
  { id: "why", n: "۰۲", title: "چرایی" },
  { id: "mark", n: "۰۳", title: "نشان" },
  { id: "colour", n: "۰۴", title: "رنگ" },
  { id: "type", n: "۰۵", title: "تایپوگرافی" },
  { id: "voice", n: "۰۶", title: "لحن" },
  { id: "motion", n: "۰۷", title: "حرکت" },
];

function ChapterHead({
  n,
  title,
  sub,
  dark,
}: {
  n: string;
  title: string;
  sub: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-16 md:mb-20">
      <div
        className={`font-display text-[11px] font-bold tracking-[0.3em] uppercase mb-6 ${
          dark ? "text-[#a78bfa]" : "text-[#7c5cfc]"
        }`}
      >
        Chapter {n}
      </div>
      <h2
        className={`font-body font-black leading-[1.25] mb-6 ${
          dark ? "text-white" : "text-[#1a1714]"
        }`}
        style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
      >
        {title}
      </h2>
      <p
        className={`font-body text-lg md:text-xl leading-[2] max-w-2xl ${
          dark ? "text-white/50" : "text-[#6b6560]"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}

export default function BrandBookPage() {
  return (
    <main className="bg-[#FAF6F1]">

      {/* ── جلد ── */}
      <section className="relative min-h-screen bg-[#1a1714] dot-bg-dark overflow-hidden flex flex-col justify-between">
        <div
          className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ opacity: 0.14 }}
        />
        {/* سیبیل عظیم، بریده از لبه */}
        <div className="absolute -bottom-[18vw] -left-[12vw] w-[92vw] opacity-[0.06] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-white" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 pt-16">
          <div className="flex items-center gap-4">
            <BrandMark size={44} rounded={28} bg={CREAM} fg={INK} />
            <span className="font-body font-bold text-white text-lg">
              مدرسه دیزاین ملینا
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 pb-20">
          <h1
            className="font-body font-black text-white leading-[1.15]"
            style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}
          >
            برندبوک
          </h1>
          <div className="flex items-end justify-between flex-wrap gap-8 mt-10">
            <p className="font-body text-white/45 text-lg leading-[2] max-w-md">
              این سند می‌گه ملینا چه شکلیه، چطور حرف می‌زنه و چرا اصلاً وجود داره.
            </p>
            <div
              dir="ltr"
              className="font-display text-[11px] tracking-[0.34em] uppercase text-white/25"
            >
              Version 1 · 1405
            </div>
          </div>
        </div>
      </section>

      {/* ── فهرست ── */}
      <section className="bg-[#FAF6F1] border-b border-[#e8e2d9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-[#a09990] mb-10">
            Contents
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5">
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group flex items-baseline gap-4 py-2 border-b border-[#e8e2d9] hover:border-[#1a1714]/30 transition-colors"
                >
                  <span className="font-display font-black text-sm text-[#7c5cfc]">
                    {c.n}
                  </span>
                  <span className="font-body font-bold text-[#1a1714] group-hover:opacity-60 transition-opacity">
                    {c.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── ۰۱ اسم ── */}
      <section id="name" className="scroll-mt-8 relative overflow-hidden dot-bg">
        <div
          className="absolute -right-[6vw] top-[10vw] font-display font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(8rem, 26vw, 26rem)", color: INK, opacity: 0.04 }}
        >
          MELINA
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۱"
            title="ملینا یعنی قناری زرد"
            sub="پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی."
          />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-7 font-body text-[#4a4540] text-lg leading-[2.1]">
              <p>
                دنبال اسمی بودم که حس امید بده. چون آدم‌هایی که میان دیزاین یاد
                بگیرن، بیشترشون دارن یک چیزی رو پشت سر می‌ذارن. یکی رشته‌ای که
                هیچ‌وقت دوستش نداشت، یکی شغلی که خسته‌ش کرده، یکی هم چند سال این‌ور
                و اون‌ور رفتن بی‌نتیجه.
              </p>
              <p>
                آدم وقتی می‌خواد از نو شروع کنه، بیشتر از هر چیزی به امید احتیاج
                داره.
              </p>
            </div>
            <div className="relative aspect-square rounded-3xl bg-[#1a1714] overflow-hidden flex items-center justify-center">
              <div
                className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{ opacity: 0.16 }}
              />
              <BrandGlyph className="w-[58%] h-auto text-[#7c5cfc] relative" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ۰۲ چرایی ── */}
      <section id="why" className="scroll-mt-8 relative bg-[#1a1714] overflow-hidden">
        <div className="absolute inset-0 md:right-1/2">
          <Image
            src="/images/instructor-portrait.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top opacity-30 md:opacity-45 grayscale"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1a1714 20%, rgba(26,23,20,0.55) 70%, rgba(26,23,20,0.2) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <div className="md:w-1/2 md:mr-auto">
            <ChapterHead
              n="۰۲"
              title="چرا وجود داره"
              sub="این بخش، تنها جاییه که کل ماجرا خلاصه می‌شه."
              dark
            />
            <blockquote
              className="font-body font-black text-white leading-[1.5] border-r-4 border-[#7c5cfc] pr-6"
              style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)" }}
            >
              چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو
              باشه.
            </blockquote>
            <p className="font-body text-white/50 text-lg leading-[2.1] mt-10 max-w-lg">
              من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم. هر
              چیزی که اینجا هست، از برنامه‌ی هفتگی تا اینکه خودم جواب سوال‌ها رو
              می‌دم، برای همینه.
            </p>
            <div className="flex items-center gap-5 mt-12">
              <Image
                src="/images/sig.png"
                alt=""
                width={690}
                height={252}
                className="h-14 w-auto invert opacity-80"
              />
              <div>
                <div className="font-body font-bold text-white">مجتبا یزدانپناه</div>
                <div className="font-body text-white/35 text-sm mt-0.5">
                  بنیان‌گذار
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ۰۳ نشان ── */}
      <section id="mark" className="scroll-mt-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۳"
            title="نشان"
            sub="سیبیل. چون همه با همین می‌شناسنش، و لبه‌هاش مثل بال قناریه."
          />

          {/* نمایش اصلی */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {[
              { bg: "#1a1714", fg: "#FAF6F1", label: "روی تیره" },
              { bg: "#FAF6F1", fg: "#1a1714", label: "روی روشن", border: true },
              { bg: "#7c5cfc", fg: "#ffffff", label: "روی لهجه" },
              { bg: "#E4DAD5", fg: "#1a1714", label: "روی خنثی" },
            ].map((v) => (
              <div key={v.label}>
                <div
                  className="aspect-square rounded-3xl flex items-center justify-center"
                  style={{
                    backgroundColor: v.bg,
                    border: v.border ? "1px solid #e8e2d9" : undefined,
                  }}
                >
                  <BrandGlyph className="w-[52%] h-auto" style={{ color: v.fg }} />
                </div>
                <div className="font-body text-sm text-[#6b6560] mt-3">{v.label}</div>
              </div>
            ))}
          </div>

          {/* فضای امن */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
            <div>
              <h3 className="font-body font-black text-2xl text-[#1a1714] mb-4">
                فضای امن
              </h3>
              <p className="font-body text-[#6b6560] text-lg leading-[2]">
                دور نشان همیشه به اندازه‌ی نصف ارتفاع خودش فضای خالی بذار. هیچ متن،
                خط یا تصویری نباید وارد این محدوده بشه.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl border border-[#e8e2d9] bg-white flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-[50%] border border-dashed border-[#7c5cfc]/40 rounded-2xl" />
                <BrandMark className="w-28 h-auto relative" rounded={28} />
              </div>
            </div>
          </div>

          {/* اشتباه‌های رایج */}
          <h3 className="font-body font-black text-2xl text-[#1a1714] mb-8">
            این کارها رو نکن
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "کشیده یا فشرده نکن", cls: "scale-x-150" },
              { label: "نچرخونش", cls: "rotate-[18deg]" },
              { label: "رنگ دلخواه نده", cls: "", color: "#16a34a" },
              { label: "روی تصویر شلوغ نذار", cls: "", busy: true },
            ].map((m) => (
              <div key={m.label}>
                <div
                  className={`relative aspect-square rounded-3xl border border-[#e8e2d9] flex items-center justify-center overflow-hidden ${
                    m.busy ? "bg-[#E4DAD5] dot-bg" : "bg-white"
                  }`}
                >
                  <BrandGlyph
                    className={`w-[48%] h-auto ${m.cls}`}
                    style={{ color: m.color ?? INK }}
                  />
                  <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-display font-black text-sm">
                    ✕
                  </span>
                </div>
                <div className="font-body text-sm text-[#6b6560] mt-3">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ۰۴ رنگ ── */}
      <section id="colour" className="scroll-mt-8 bg-[#1a1714]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۴"
            title="رنگ"
            sub="چهار رنگ، نه بیشتر. بنفش فقط برای تاکید، نه برای سطح."
            dark
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                hex: "#1a1714",
                name: "مشکی برند",
                use: "متن اصلی، سطح تیره، دکمه‌ی اول",
                on: "#FAF6F1",
                border: true,
              },
              {
                hex: "#FAF6F1",
                name: "کرم",
                use: "پس‌زمینه‌ی اصلی همه‌ی صفحات",
                on: "#1a1714",
              },
              {
                hex: "#7c5cfc",
                name: "بنفش",
                use: "فقط تاکید. لینک، برچسب، لهجه",
                on: "#ffffff",
              },
              {
                hex: "#e8e2d9",
                name: "خط و حاشیه",
                use: "جداکننده، قاب کارت",
                on: "#1a1714",
              },
            ].map((c) => (
              <div
                key={c.hex}
                className="rounded-3xl p-8 flex flex-col justify-between min-h-[220px]"
                style={{
                  backgroundColor: c.hex,
                  border: c.border ? "1px solid rgba(255,255,255,0.12)" : undefined,
                }}
              >
                <div
                  dir="ltr"
                  className="font-display font-bold text-2xl tracking-[0.1em]"
                  style={{ color: c.on }}
                >
                  {c.hex}
                </div>
                <div>
                  <div
                    className="font-body font-black text-xl"
                    style={{ color: c.on }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="font-body text-sm mt-2 leading-relaxed"
                    style={{ color: c.on, opacity: 0.6 }}
                  >
                    {c.use}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-body text-white/40 text-lg leading-[2] mt-12 max-w-2xl">
            قاعده‌ی ساده: هر چه رنگ کمتر، تاکید بیشتر. اگر همه‌جای صفحه رنگیه، هیچ‌جا
            مهم نیست.
          </p>
        </div>
      </section>

      {/* ── ۰۵ تایپوگرافی ── */}
      <section id="type" className="scroll-mt-8 relative overflow-hidden">
        <div
          className="absolute -top-[8vw] -left-[2vw] font-body font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(14rem, 40vw, 44rem)", color: INK, opacity: 0.035 }}
        >
          م
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۵"
            title="تایپوگرافی"
            sub="یک قلم برای همه‌چیز: میم. تفاوت‌ها از وزن و فاصله میان، نه از قلم دوم."
          />

          <div className="border-y border-[#e8e2d9] divide-y divide-[#e8e2d9]">
            {[
              { size: "clamp(2.6rem, 7vw, 5.5rem)", w: "900", label: "Display · Black", sample: "آموزش اصولی" },
              { size: "clamp(1.6rem, 3.4vw, 2.4rem)", w: "900", label: "Heading · Black", sample: "چرا وجود داره" },
              { size: "1.125rem", w: "300", label: "Body · Light · leading 2", sample: "متن بدنه با فاصله‌ی خط باز، چون فارسی به فضا احتیاج داره." },
              { size: "0.875rem", w: "300", label: "Caption · Light", sample: "توضیح کوتاه زیر عنصرها" },
            ].map((t) => (
              <div key={t.label} className="py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10">
                <div
                  dir="ltr"
                  className="font-display text-[11px] tracking-[0.24em] uppercase text-[#a09990] md:w-56 flex-shrink-0"
                >
                  {t.label}
                </div>
                <div
                  className="font-body text-[#1a1714] leading-[1.5]"
                  style={{ fontSize: t.size, fontWeight: Number(t.w) }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mt-14">
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8">
              <div className="font-body font-bold text-[#1a1714] mb-3">بکن</div>
              <ul className="font-body text-[#6b6560] leading-[2] space-y-2 text-sm">
                <li>ارتفاع خط بدنه را روی ۲ نگه دار</li>
                <li>تیتر فارسی را زیر ۱.۳ نبر</li>
                <li>eyebrow لاتین با tracking باز</li>
              </ul>
            </div>
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8">
              <div className="font-body font-bold text-[#1a1714] mb-3">نکن</div>
              <ul className="font-body text-[#6b6560] leading-[2] space-y-2 text-sm">
                <li>فاصله‌ی حروف فارسی را منفی نکن</li>
                <li>قلم دوم اضافه نکن</li>
                <li>متن بدنه را زیر ۱۶ پیکسل نبر</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ۰۶ لحن ── */}
      <section id="voice" className="scroll-mt-8 bg-[#E4DAD5] relative overflow-hidden">
        <div
          className="absolute -top-[6vw] right-[4vw] font-display font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(12rem, 34vw, 34rem)", color: INK, opacity: 0.05 }}
        >
          &quot;
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۶"
            title="لحن"
            sub="هر جمله‌ای که هر مدرسه‌ی دیگه‌ای هم می‌تونه بگه، حذف می‌شه."
          />
          <div className="space-y-10 max-w-3xl">
            {[
              { no: "جامع‌ترین دوره‌ی UI", yes: "۵۵ ساعت ویدیو و ۵ پروژه‌ی واقعی" },
              { no: "تجربه‌ی یادگیری بی‌نظیر", yes: "هر هفته فیدبک می‌گیری" },
              { no: "همه چیزی که نیاز داری", yes: "لازم نیست قبلش چیزی بلد باشی" },
              { no: "بهترین انتخاب برای آینده‌ت", yes: "اگه این دوره برات مناسب نبود، خودم می‌گم" },
            ].map((r) => (
              <div key={r.yes} className="flex gap-6">
                <span className="font-display font-black text-lg text-[#1a1714]/20 mt-1 flex-shrink-0">
                  ✕
                </span>
                <div>
                  <div className="font-body text-[#1a1714]/35 line-through text-lg leading-[1.8]">
                    {r.no}
                  </div>
                  <div
                    className="font-body font-black text-[#1a1714] leading-[1.7] mt-2"
                    style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.8rem)" }}
                  >
                    {r.yes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ۰۷ حرکت ── */}
      <section id="motion" className="scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 md:py-36">
          <ChapterHead
            n="۰۷"
            title="حرکت"
            sub="حرکت باید معنی داشته باشه. اگر فقط قشنگه، حذفش کن."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: "۱۵۰ تا ۳۰۰", u: "میلی‌ثانیه", d: "ریزتعامل‌ها: هاور، فشردن، تغییر حالت" },
              { t: "۶۰۰", u: "میلی‌ثانیه", d: "ظاهر شدن بخش‌ها هنگام اسکرول" },
              { t: "۰.۷۲ / ۱.۳۵", u: "ثانیه", d: "بال‌زدن نشانگر، در حرکت و در سکون" },
            ].map((m) => (
              <div key={m.d} className="bg-white border border-[#e8e2d9] rounded-3xl p-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-4xl text-[#1a1714]">
                    {m.t}
                  </span>
                  <span className="font-body text-sm text-[#a09990]">{m.u}</span>
                </div>
                <p className="font-body text-[#6b6560] leading-relaxed mt-4 text-sm">
                  {m.d}
                </p>
              </div>
            ))}
          </div>
          <p className="font-body text-[#6b6560] text-lg leading-[2] mt-10 max-w-2xl">
            همه‌ی حرکت‌ها به تنظیم «کاهش حرکت» سیستم احترام می‌ذارن. کسی که اون رو
            روشن کرده، نسخه‌ی ساکن سایت رو می‌بینه.
          </p>
        </div>
      </section>

      {/* ── پایان ── */}
      <section className="relative bg-[#7c5cfc] overflow-hidden">
        <div
          className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ opacity: 0.12 }}
        />
        <div className="absolute -bottom-[16vw] -left-[10vw] w-[80vw] opacity-[0.12] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-32 md:py-44">
          <BrandGlyph className="w-24 h-auto text-white mb-12" />
          <p
            className="font-body font-black text-white leading-[1.45] max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
          >
            که هیچ‌کس وسط راه حس نکنه تنها مونده.
          </p>
          <div className="flex items-center gap-4 mt-16">
            <span className="h-px w-16 bg-white/40" />
            <span
              dir="ltr"
              className="font-display text-[11px] tracking-[0.34em] uppercase text-white/70"
            >
              mojtabaui.ir
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
