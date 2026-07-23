import Image from "next/image";
import BrandMark, { BrandGlyph } from "@/components/BrandMark";

/**
 * برندبوک در قالب استوری اینستاگرام.
 *
 * هر اسلاید دقیقاً نسبت ۹:۱۶ داره و اندازه‌ها بر حسب cqw تعریف شدن، پس
 * چه روی صفحه‌ی بزرگ ببینیش چه اسکرین‌شات ۱۰۸۰ در ۱۹۲۰ بگیری، چیدمان
 * یکسان می‌مونه. محتواش هم از خود سایت اومده نه از نو، تا با چیزی که
 * مخاطب توی سایت می‌بینه یکی باشه.
 */

const INK = "#1a1714";
const CREAM = "#FAF6F1";
const VIOLET = "#7c5cfc";

function Slide({
  children,
  bg = CREAM,
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <div
      className={`story-slide relative overflow-hidden flex flex-col ${className}`}
      style={{ aspectRatio: "9 / 16", backgroundColor: bg }}
    >
      {children}
    </div>
  );
}

/** شماره‌ی صفحه در پانویس هر اسلاید */
function Foot({ n, total, dark }: { n: string; total: string; dark?: boolean }) {
  const c = dark ? "text-white/30" : "text-[#a09990]";
  return (
    <div className={`mt-auto flex items-center justify-between ${c}`}>
      <span className="font-display text-[2cqw] tracking-[0.24em] uppercase">
        Melina Design School
      </span>
      <span className="font-display text-[2cqw] tracking-[0.2em]">
        {n} / {total}
      </span>
    </div>
  );
}

const TOTAL = "۰۸";

export default function BrandBook() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {/* ۰۱ — جلد */}
      <Slide bg={INK}>
        <div className="flex-1 flex flex-col items-center justify-center px-[9cqw] text-center">
          <div className="w-[34cqw]">
            <BrandMark className="w-full h-auto" bg={CREAM} fg={INK} rounded={28} />
          </div>
          <h1 className="font-body font-black text-[7.4cqw] text-white leading-[1.45] mt-[7cqw]">
            مدرسه دیزاین ملینا
          </h1>
          <p className="font-display text-[2.5cqw] tracking-[0.3em] uppercase text-white/35 mt-[2.5cqw]">
            Brand Book
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۱" total={TOTAL} dark />
        </div>
      </Slide>

      {/* ۰۲ — اسم از کجا آمد */}
      <Slide>
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <span className="text-[#7c5cfc] mb-[5cqw]">
            <BrandGlyph className="w-[16cqw] h-auto" />
          </span>
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-[#a09990] mb-[3cqw]">
            The Name
          </div>
          <h2 className="font-body font-black text-[6.4cqw] text-[#1a1714] leading-[1.4] mb-[5cqw]">
            ملینا یعنی قناری زرد
          </h2>
          <p className="font-body text-[3.3cqw] text-[#4a4540] leading-[2.1]">
            پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی. دنبال اسمی بودم که
            حس امید بده، چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک
            چیزی رو پشت سر می‌ذارن.
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۲" total={TOTAL} />
        </div>
      </Slide>

      {/* ۰۳ — چرا ساخته شد */}
      <Slide bg="#E4DAD5">
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-[#8a7b74] mb-[3cqw]">
            Why It Exists
          </div>
          <p className="font-body font-black text-[5.4cqw] text-[#1a1714] leading-[1.55]">
            چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو
            باشه.
          </p>
          <p className="font-body text-[3.2cqw] text-[#4a4540] leading-[2.1] mt-[5cqw]">
            من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم.
          </p>
          <div className="flex items-center gap-[3cqw] mt-[7cqw]">
            <Image
              src="/images/sig.png"
              alt=""
              width={690}
              height={252}
              className="h-[9cqw] w-auto opacity-90"
            />
            <div className="font-body font-bold text-[2.6cqw] text-[#1a1714]">
              مجتبا یزدانپناه
            </div>
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۳" total={TOTAL} />
        </div>
      </Slide>

      {/* ۰۴ — نشان */}
      <Slide>
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-[#a09990] mb-[5cqw]">
            The Mark
          </div>
          <div className="grid grid-cols-2 gap-[4cqw]">
            <div className="aspect-square rounded-[4cqw] bg-[#1a1714] flex items-center justify-center">
              <BrandGlyph className="w-[52%] h-auto text-[#FAF6F1]" />
            </div>
            <div className="aspect-square rounded-[4cqw] border border-[#e8e2d9] bg-white flex items-center justify-center">
              <BrandGlyph className="w-[52%] h-auto text-[#1a1714]" />
            </div>
            <div className="aspect-square rounded-[4cqw] bg-[#7c5cfc] flex items-center justify-center">
              <BrandGlyph className="w-[52%] h-auto text-white" />
            </div>
            <div className="aspect-square rounded-[4cqw] border border-[#e8e2d9] flex items-center justify-center">
              <BrandMark className="w-[62%] h-auto" rounded={28} />
            </div>
          </div>
          <p className="font-body text-[2.7cqw] text-[#6b6560] leading-[2] mt-[5cqw]">
            سیبیل. چون همه با همین می‌شناسنش. لبه‌هاش هم مثل بال قناریه.
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۴" total={TOTAL} />
        </div>
      </Slide>

      {/* ۰۵ — رنگ */}
      <Slide>
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-[#a09990] mb-[5cqw]">
            Colour
          </div>
          <div className="space-y-[3cqw]">
            {[
              { hex: "#1a1714", name: "مشکی برند", use: "متن و سطح تیره" },
              { hex: "#FAF6F1", name: "کرم", use: "پس‌زمینه‌ی اصلی", border: true },
              { hex: "#7c5cfc", name: "بنفش", use: "فقط تاکید" },
              { hex: "#e8e2d9", name: "خط و حاشیه", use: "جداکننده‌ها" },
            ].map((c) => (
              <div key={c.hex} className="flex items-center gap-[4cqw]">
                <span
                  className="w-[16cqw] h-[16cqw] rounded-[3cqw] flex-shrink-0"
                  style={{
                    backgroundColor: c.hex,
                    border: c.border ? "1px solid #e8e2d9" : undefined,
                  }}
                />
                <div>
                  <div className="font-body font-bold text-[3.1cqw] text-[#1a1714]">
                    {c.name}
                  </div>
                  <div
                    dir="ltr"
                    className="font-display text-[2.6cqw] text-[#a09990] tracking-[0.12em] mt-[0.6cqw]"
                  >
                    {c.hex}
                  </div>
                  <div className="font-body text-[2.4cqw] text-[#6b6560] mt-[0.4cqw]">
                    {c.use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۵" total={TOTAL} />
        </div>
      </Slide>

      {/* ۰۶ — تایپوگرافی */}
      <Slide bg={INK}>
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-white/35 mb-[5cqw]">
            Typography
          </div>
          <div className="font-body font-black text-[11cqw] text-white leading-[1.3]">
            میم
          </div>
          <div className="h-px w-full bg-white/12 my-[5cqw]" />
          <div className="font-body font-black text-[4.6cqw] text-white leading-[1.5] mb-[2cqw]">
            تیتر سیاه و فشرده
          </div>
          <div className="font-body text-[3cqw] text-white/55 leading-[2]">
            متن بدنه با فاصله‌ی خط باز، چون فارسی به فضا احتیاج داره و خوانایی از
            هر افکتی مهم‌تره.
          </div>
          <div className="font-display text-[2.4cqw] tracking-[0.3em] uppercase text-[#a78bfa] mt-[5cqw]">
            Latin Eyebrow
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۶" total={TOTAL} dark />
        </div>
      </Slide>

      {/* ۰۷ — لحن */}
      <Slide>
        <div className="flex-1 flex flex-col justify-center px-[9cqw]">
          <div className="font-display text-[2.2cqw] font-bold tracking-[0.26em] uppercase text-[#a09990] mb-[5cqw]">
            Voice
          </div>
          <div className="space-y-[4cqw]">
            {[
              { no: "جامع‌ترین دوره", yes: "۵۵ ساعت ویدیو و ۵ پروژه" },
              { no: "تجربه‌ی یادگیری بی‌نظیر", yes: "هر هفته فیدبک می‌گیری" },
              { no: "همه چیزی که نیاز داری", yes: "لازم نیست قبلش چیزی بلد باشی" },
            ].map((r) => (
              <div key={r.yes}>
                <div className="font-body text-[2.9cqw] text-[#c8c2ba] line-through leading-[1.8]">
                  {r.no}
                </div>
                <div className="font-body font-bold text-[3.4cqw] text-[#1a1714] leading-[1.8] mt-[0.8cqw]">
                  {r.yes}
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-[2.7cqw] text-[#6b6560] leading-[2] mt-[6cqw]">
            هر جمله‌ای که هر مدرسه‌ی دیگه‌ای هم می‌تونه بگه، حذف می‌شه.
          </p>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۷" total={TOTAL} />
        </div>
      </Slide>

      {/* ۰۸ — پایان */}
      <Slide bg={VIOLET}>
        <div className="flex-1 flex flex-col items-center justify-center px-[9cqw] text-center">
          <BrandGlyph className="w-[26cqw] h-auto text-white" />
          <p className="font-body font-black text-[5.6cqw] text-white leading-[1.5] mt-[7cqw]">
            که هیچ‌کس وسط راه حس نکنه تنها مونده.
          </p>
          <div
            dir="ltr"
            className="font-display text-[2.8cqw] tracking-[0.28em] uppercase text-white/60 mt-[7cqw]"
          >
            mojtabaui.ir
          </div>
        </div>
        <div className="px-[9cqw] pb-[8cqw]">
          <Foot n="۰۸" total={TOTAL} dark />
        </div>
      </Slide>
    </div>
  );
}
