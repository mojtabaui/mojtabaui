import Image from "next/image";
import BrandMark, { BrandGlyph } from "@/components/BrandMark";

/**
 * برندبوک در قالب استوری اینستاگرام.
 *
 * هر اسلاید نسبت ۹:۱۶ داره و همه‌ی اندازه‌ها بر حسب cqw هستن، پس چه روی
 * صفحه ببینیش چه ۱۰۸۰ در ۱۹۲۰ خروجی بگیری، چیدمان یکی می‌مونه.
 *
 * ساخت بصری هر اسلاید سه لایه‌ست:
 *   • زمینه: رنگ تخت به‌علاوه‌ی بافت نقطه یا دانه
 *   • لایه‌ی تزئینی: حرف یا نشانِ غول‌پیکر که از لبه می‌زنه بیرون
 *   • محتوا: متن، روی همه
 * همون منطقی که کل سایت باهاش ساخته شده.
 */

const INK = "#1a1714";
const CREAM = "#FAF6F1";
const VIOLET = "#7c5cfc";

function Slide({
  children,
  bg = CREAM,
  dots,
  dark,
}: {
  children: React.ReactNode;
  bg?: string;
  dots?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className="story-slide relative overflow-hidden flex flex-col"
      style={{ aspectRatio: "9 / 16", backgroundColor: bg }}
    >
      {dots && (
        <div
          className={`absolute inset-0 pointer-events-none ${dark ? "dot-bg-dark" : "dot-bg"}`}
        />
      )}
      {/* دانه‌ی فیلم، به کل اسلاید عمق و گرمی می‌ده */}
      <div
        className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ opacity: dark ? 0.13 : 0.075 }}
      />
      {children}
    </div>
  );
}

function Foot({ n, dark }: { n: string; dark?: boolean }) {
  const c = dark ? "text-white/25" : "text-[#1a1714]/25";
  return (
    <div className={`relative mt-auto flex items-center justify-between ${c}`}>
      <span className="font-display text-[1.9cqw] tracking-[0.26em] uppercase">
        Melina Design School
      </span>
      <span className="font-display text-[1.9cqw] tracking-[0.2em]">{n} / ۰۸</span>
    </div>
  );
}

export default function BrandBook() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {/* ۰۱ — جلد */}
      <Slide bg={INK} dots dark>
        {/* سیبیل غول‌پیکر که از بالا بیرون زده */}
        <div className="absolute -top-[14cqw] -left-[26cqw] w-[150cqw] opacity-[0.07] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-white" />
        </div>

        <div className="relative flex-1 flex flex-col justify-end px-[9cqw] pb-[4cqw]">
          <div className="w-[26cqw] mb-[8cqw]">
            <BrandMark className="w-full h-auto" bg={CREAM} fg={INK} rounded={28} />
          </div>
          <h1 className="font-body font-black text-[9.6cqw] text-white leading-[1.32]">
            مدرسه
            <br />
            دیزاین ملینا
          </h1>
          <div className="flex items-center gap-[3cqw] mt-[5cqw]">
            <span className="h-px w-[12cqw] bg-[#a78bfa]" />
            <span className="font-display text-[2.4cqw] tracking-[0.32em] uppercase text-[#a78bfa]">
              Brand Book
            </span>
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۱" dark />
        </div>
      </Slide>

      {/* ۰۲ — اسم */}
      <Slide dots>
        {/* واژه‌ی غول‌پیکر که از لبه می‌زنه بیرون */}
        <div
          className="absolute -right-[10cqw] top-[16cqw] font-display font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "34cqw", color: INK, opacity: 0.05 }}
        >
          MELINA
        </div>
        {/* بال، چرخیده */}
        <div className="absolute -left-[16cqw] bottom-[16cqw] w-[62cqw] rotate-[-14deg] opacity-[0.13] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-[#7c5cfc]" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#7c5cfc] mb-[3.5cqw]">
            The Name
          </div>
          <h2 className="font-body font-black text-[8cqw] text-[#1a1714] leading-[1.36]">
            ملینا یعنی
            <br />
            قناری زرد
          </h2>
          <div className="h-px w-[22cqw] bg-[#1a1714]/15 my-[5.5cqw]" />
          <p className="font-body text-[3.2cqw] text-[#4a4540] leading-[2.15] max-w-[80%]">
            پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی. دنبال اسمی بودم که حس
            امید بده، چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک چیزی رو
            پشت سر می‌ذارن.
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۲" />
        </div>
      </Slide>

      {/* ۰۳ — چرا ساخته شد، روی پرتره */}
      <Slide bg={INK} dark>
        <div className="absolute inset-0">
          <Image
            src="/images/instructor-portrait.jpg"
            alt=""
            fill
            sizes="500px"
            className="object-cover object-top opacity-[0.42] grayscale"
          />
          {/* گرادیان تا متن پایین خوانا بمونه */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1a1714 30%, rgba(26,23,20,0.72) 55%, rgba(26,23,20,0.15) 100%)",
            }}
          />
        </div>

        <div className="relative flex-1 flex flex-col justify-end px-[9cqw] pb-[3cqw]">
          <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#a78bfa] mb-[4cqw]">
            Why It Exists
          </div>
          <p className="font-body font-black text-[6.2cqw] text-white leading-[1.5]">
            چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو باشه.
          </p>
          <div className="flex items-center gap-[3.5cqw] mt-[6cqw]">
            <Image
              src="/images/sig.png"
              alt=""
              width={690}
              height={252}
              className="h-[8cqw] w-auto invert opacity-80"
            />
            <div className="font-body font-bold text-[2.5cqw] text-white/70">
              مجتبا یزدانپناه
            </div>
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۳" dark />
        </div>
      </Slide>

      {/* ۰۴ — نشان */}
      <Slide>
        {/* سیبیل عظیم و بریده، پشت همه */}
        <div className="absolute -bottom-[20cqw] -right-[30cqw] w-[150cqw] opacity-[0.06] rotate-[8deg] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-[#1a1714]" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#7c5cfc] mb-[2.5cqw]">
            The Mark
          </div>
          <h2 className="font-body font-black text-[6cqw] text-[#1a1714] leading-[1.4] mb-[6cqw]">
            سیبیل
          </h2>

          <div className="grid grid-cols-2 gap-[3.5cqw]">
            <div className="aspect-square rounded-[4cqw] bg-[#1a1714] flex items-center justify-center shadow-[0_4cqw_9cqw_-5cqw_rgba(26,23,20,0.6)]">
              <BrandGlyph className="w-[54%] h-auto text-[#FAF6F1]" />
            </div>
            <div className="aspect-square rounded-[4cqw] bg-white border border-[#e8e2d9] flex items-center justify-center">
              <BrandGlyph className="w-[54%] h-auto text-[#1a1714]" />
            </div>
            <div className="aspect-square rounded-[4cqw] bg-[#7c5cfc] flex items-center justify-center shadow-[0_4cqw_9cqw_-5cqw_rgba(124,92,252,0.7)]">
              <BrandGlyph className="w-[54%] h-auto text-white" />
            </div>
            <div className="aspect-square rounded-[4cqw] bg-[#E4DAD5] flex items-center justify-center">
              <BrandMark className="w-[64%] h-auto" rounded={28} />
            </div>
          </div>

          <p className="font-body text-[2.8cqw] text-[#6b6560] leading-[2] mt-[5.5cqw]">
            چون همه با همین می‌شناسنش. لبه‌هاش هم مثل بال قناریه.
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۴" />
        </div>
      </Slide>

      {/* ۰۵ — رنگ، بلوک‌های تمام‌عرض */}
      <Slide>
        <div className="relative flex-1 flex flex-col">
          <div className="px-[9cqw] pt-[9cqw] pb-[5cqw]">
            <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#7c5cfc] mb-[2.5cqw]">
              Colour
            </div>
            <h2 className="font-body font-black text-[6cqw] text-[#1a1714] leading-[1.4]">
              چهار رنگ، نه بیشتر
            </h2>
          </div>

          {/* بلوک‌های تمام‌عرض، هر کدام برچسب داخل خودش */}
          <div className="flex-1 flex flex-col">
            {[
              { hex: "#1a1714", name: "مشکی برند", use: "متن و سطح تیره", on: "#FAF6F1" },
              { hex: "#FAF6F1", name: "کرم", use: "پس‌زمینه‌ی اصلی", on: "#1a1714" },
              { hex: "#7c5cfc", name: "بنفش", use: "فقط تاکید", on: "#ffffff" },
              { hex: "#e8e2d9", name: "خط و حاشیه", use: "جداکننده‌ها", on: "#1a1714" },
            ].map((c) => (
              <div
                key={c.hex}
                className="flex-1 flex items-center justify-between px-[9cqw]"
                style={{ backgroundColor: c.hex }}
              >
                <div>
                  <div
                    className="font-body font-bold text-[3.4cqw]"
                    style={{ color: c.on }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="font-body text-[2.4cqw] mt-[0.5cqw]"
                    style={{ color: c.on, opacity: 0.55 }}
                  >
                    {c.use}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="font-display font-bold text-[2.8cqw] tracking-[0.14em]"
                  style={{ color: c.on, opacity: 0.75 }}
                >
                  {c.hex}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-[9cqw] py-[6cqw] bg-[#FAF6F1]">
          <Foot n="۰۵" />
        </div>
      </Slide>

      {/* ۰۶ — تایپوگرافی */}
      <Slide bg={INK} dark>
        {/* میمِ عظیم و بریده */}
        <div
          className="absolute -top-[6cqw] -left-[4cqw] font-body font-black leading-none pointer-events-none select-none text-white"
          style={{ fontSize: "62cqw", opacity: 0.055 }}
        >
          م
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#a78bfa] mb-[5cqw]">
            Typography
          </div>

          <div className="font-body font-black text-[13cqw] text-white leading-[1.15]">
            آ ب پ
          </div>
          <div className="font-display text-[2.3cqw] tracking-[0.24em] uppercase text-white/30 mt-[2cqw]">
            Meem · Display &amp; Body
          </div>

          <div className="h-px w-full bg-white/10 my-[6cqw]" />

          <div className="space-y-[3.5cqw]">
            <div>
              <div className="font-body font-black text-[5cqw] text-white leading-[1.45]">
                تیتر سیاه و فشرده
              </div>
              <div className="font-display text-[2cqw] tracking-[0.2em] uppercase text-white/25 mt-[1cqw]">
                Black · leading 1.4
              </div>
            </div>
            <div>
              <div className="font-body text-[3cqw] text-white/60 leading-[2.1]">
                متن بدنه با فاصله‌ی خط باز، چون فارسی به فضا احتیاج داره و خوانایی از
                هر افکتی مهم‌تره.
              </div>
              <div className="font-display text-[2cqw] tracking-[0.2em] uppercase text-white/25 mt-[1.5cqw]">
                Light · leading 2
              </div>
            </div>
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۶" dark />
        </div>
      </Slide>

      {/* ۰۷ — لحن */}
      <Slide bg="#E4DAD5">
        <div
          className="absolute -top-[10cqw] right-[4cqw] font-display font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "48cqw", color: INK, opacity: 0.05 }}
        >
          &quot;
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.1cqw] font-bold tracking-[0.28em] uppercase text-[#8a5cf6] mb-[2.5cqw]">
            Voice
          </div>
          <h2 className="font-body font-black text-[6cqw] text-[#1a1714] leading-[1.4] mb-[6cqw]">
            حرفی که فقط ما
            <br />
            می‌تونیم بزنیم
          </h2>

          <div className="space-y-[4.5cqw]">
            {[
              { no: "جامع‌ترین دوره", yes: "۵۵ ساعت ویدیو و ۵ پروژه" },
              { no: "تجربه‌ی یادگیری بی‌نظیر", yes: "هر هفته فیدبک می‌گیری" },
              { no: "همه چیزی که نیاز داری", yes: "لازم نیست قبلش چیزی بلد باشی" },
            ].map((r) => (
              <div key={r.yes} className="flex gap-[3.5cqw]">
                <span className="font-display font-black text-[2.4cqw] text-[#1a1714]/20 mt-[1cqw]">
                  ✕
                </span>
                <div>
                  <div className="font-body text-[2.9cqw] text-[#1a1714]/35 line-through leading-[1.7]">
                    {r.no}
                  </div>
                  <div className="font-body font-black text-[3.6cqw] text-[#1a1714] leading-[1.7] mt-[1cqw]">
                    {r.yes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۷" />
        </div>
      </Slide>

      {/* ۰۸ — پایان */}
      <Slide bg={VIOLET} dark>
        <div className="absolute -bottom-[24cqw] -left-[24cqw] w-[150cqw] opacity-[0.12] pointer-events-none">
          <BrandGlyph className="w-full h-auto text-white" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="w-[20cqw] mb-[8cqw]">
            <BrandGlyph className="w-full h-auto text-white" />
          </div>
          <p className="font-body font-black text-[6.6cqw] text-white leading-[1.5]">
            که هیچ‌کس وسط راه
            <br />
            حس نکنه تنها مونده.
          </p>
          <div className="flex items-center gap-[3cqw] mt-[8cqw]">
            <span className="h-px w-[12cqw] bg-white/40" />
            <span
              dir="ltr"
              className="font-display text-[2.6cqw] tracking-[0.3em] uppercase text-white/70"
            >
              mojtabaui.ir
            </span>
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۸" dark />
        </div>
      </Slide>
    </div>
  );
}
