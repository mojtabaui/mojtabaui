import type { Metadata } from "next";
import { MARKS } from "@/components/LogoMarks";

export const metadata: Metadata = {
  title: "آزمایشگاه لوگو",
  robots: { index: false, follow: false },
};

/**
 * صفحه‌ی موقت انتخاب لوگو.
 *
 * هر کاندید در سه اندازه نشون داده می‌شه چون تنها تست واقعی یک مارک اینه که
 * در ۲۴ پیکسل هم نشکنه. کنارش نسخه‌ی روی زمینه‌ی تیره و نسخه‌ی بنفش هم هست
 * تا معلوم شه کدوم در همه‌ی کاربردها کار می‌کنه.
 */
export default function LogoLabPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-3">
          LOGO LAB
        </div>
        <h1 className="font-body font-black text-3xl text-[#1a1714] mb-3">
          هشت کاندید لوگو
        </h1>
        <p className="font-body text-[#6b6560] leading-relaxed max-w-2xl mb-12">
          هر کدوم در سه اندازه اومده. اون ستون ۲۴ پیکسلی مهم‌ترین ستونه، چون
          هر مارکی که اونجا تبدیل به لکه بشه، توی تب مرورگر و فاویکون شکست
          می‌خوره. شماره‌ی هر کدوم رو که پسندیدی بگو.
        </p>

        <div className="space-y-4">
          {MARKS.map(({ key, label, Comp }, i) => (
            <div
              key={key}
              className="bg-white border border-[#e8e2d9] rounded-3xl p-6 flex items-center gap-8 flex-wrap"
            >
              {/* شماره و نام */}
              <div className="w-40 flex-shrink-0">
                <div className="font-display font-black text-2xl text-[#1a1714]/15 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-body font-bold text-sm text-[#1a1714] mt-2">
                  {label}
                </div>
              </div>

              {/* بزرگ */}
              <div className="w-[92px] h-[92px] flex items-center justify-center">
                <Comp uid={`${key}-lg`} className="w-full h-full" />
              </div>

              {/* ۴۸ */}
              <div className="w-12 h-12 flex items-center justify-center">
                <Comp uid={`${key}-md`} className="w-full h-full" />
              </div>

              {/* ۲۴ */}
              <div className="w-6 h-6 flex items-center justify-center">
                <Comp uid={`${key}-sm`} className="w-full h-full" />
              </div>

              {/* روی تیره */}
              <div className="w-[92px] h-[92px] rounded-2xl bg-[#1a1714] flex items-center justify-center p-4">
                <Comp uid={`${key}-dark`} color="#FAF6F1" className="w-full h-full" />
              </div>

              {/* بنفش */}
              <div className="w-[92px] h-[92px] flex items-center justify-center">
                <Comp uid={`${key}-violet`} color="#7c5cfc" className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white border border-[#e8e2d9] rounded-3xl p-6">
          <h2 className="font-body font-bold text-[#1a1714] mb-3">ستون‌ها از راست</h2>
          <ol className="font-body text-sm text-[#6b6560] space-y-1.5 leading-relaxed">
            <li>بنفش برند، برای وقتی روی زمینه‌ی روشن با رنگ استفاده می‌شه</li>
            <li>روی زمینه‌ی تیره، مثل فوتر</li>
            <li>۲۴ پیکسل، تست فاویکون</li>
            <li>۴۸ پیکسل، تست نوبار</li>
            <li>اندازه‌ی بزرگ</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
