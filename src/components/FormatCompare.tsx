import Link from "next/link";
import { Check, Minus, ChevronLeft } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { infinityCourses, videoCourses, formatPrice } from "@/lib/mock-data";

/**
 * مقایسه‌ی «کدوم نسخه به تو می‌خوره» — بی‌نهایت در برابر آفلاین.
 *
 * قبلاً وسطِ صفحه‌ی اصلی بود و شلوغش می‌کرد؛ حالا سرِ جای درستش، صفحه‌ی
 * دوره‌هاست که آدم دقیقاً همون‌جا داره بین نسخه‌ها انتخاب می‌کنه.
 */
export default function FormatCompare() {
  const plans = [
    {
      name: "بی‌نهایت",
      tag: "ثبت‌نام بسته",
      price: infinityCourses[0]?.price,
      desc: "برای کسی که می‌خواد کنارش کسی باشه. ثبت‌نامش فعلاً باز نیست.",
      featured: false,
      rows: [
        { label: "۵۵ ساعت ویدیوی کامل", has: true },
        { label: "۵ پروژه عملی", has: true },
        { label: "۲۰ ساعت منتورینگ زنده", has: true },
        { label: "برنامه‌ی هفتگی و گروه هم‌دوره‌ای", has: true },
        { label: "فیدبک مستقیم روی کارت", has: true },
        { label: "گواهی پایان دوره", has: true },
      ],
    },
    {
      name: "آفلاین",
      tag: "الان باز است",
      price: videoCourses.find((c) => c.slug === "ui-offline")?.price,
      desc: "همون محتوا و همون برنامه‌ی هفتگی، با تمپوی خودت.",
      featured: true,
      rows: [
        { label: "۵۵ ساعت ویدیوی کامل", has: true },
        { label: "۵ پروژه عملی", has: true },
        { label: "۲۰ ساعت منتورینگ زنده", has: false },
        { label: "برنامه‌ی هفتگی", has: true },
        { label: "پشتیبانی تلگرامی ۱۲ ماهه", has: true },
        { label: "گواهی پایان دوره", has: true },
      ],
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-[#e8e2d9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="mb-12 max-w-xl">
            <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
              WHICH ONE
            </div>
            <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714] mb-3">
              کدوم نسخه به تو می‌خوره؟
            </h2>
            <p className="text-[#6b6560] font-body leading-relaxed">
              محتوای ویدیویی هر دو نسخه دقیقاً یکیه. فرق‌شون توی همراهیه.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`h-full rounded-3xl p-7 border transition-all ${
                  plan.featured
                    ? "bg-[#1a1714] border-[#1a1714] shadow-[0_24px_50px_-28px_rgba(26,23,20,0.7)]"
                    : "bg-[#FAF6F1] border-[#e8e2d9]"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3
                    className={`font-body font-black text-xl ${
                      plan.featured ? "text-white" : "text-[#1a1714]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <span
                    className={`text-[10px] font-body font-bold px-2.5 py-1 rounded-full ${
                      plan.featured
                        ? "bg-[#7c5cfc] text-white"
                        : "bg-white text-[#6b6560] border border-[#e8e2d9]"
                    }`}
                  >
                    {plan.tag}
                  </span>
                </div>

                <p
                  className={`font-body text-sm leading-relaxed mb-5 ${
                    plan.featured ? "text-white/45" : "text-[#6b6560]"
                  }`}
                >
                  {plan.desc}
                </p>

                {plan.price && (
                  <div
                    className={`font-body font-black text-2xl mb-6 ${
                      plan.featured ? "text-white" : "text-[#1a1714]"
                    }`}
                  >
                    {formatPrice(plan.price)}
                  </div>
                )}

                <ul className="space-y-3 mb-7">
                  {plan.rows.map((row) => (
                    <li key={row.label} className="flex items-start gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          row.has
                            ? plan.featured
                              ? "bg-emerald-400/20 text-emerald-400"
                              : "bg-emerald-500/10 text-emerald-600"
                            : plan.featured
                              ? "bg-white/[0.06] text-white/25"
                              : "bg-[#e8e2d9] text-[#a09990]"
                        }`}
                      >
                        {row.has ? <Check size={10} /> : <Minus size={10} />}
                      </span>
                      <span
                        className={`font-body text-sm leading-relaxed ${
                          row.has
                            ? plan.featured
                              ? "text-white/80"
                              : "text-[#4a4540]"
                            : plan.featured
                              ? "text-white/25 line-through"
                              : "text-[#a09990] line-through"
                        }`}
                      >
                        {row.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.featured ? "/courses/ui-infinity" : "/courses/ui-offline"}
                  className={`inline-flex items-center justify-center gap-2 w-full font-body font-bold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.01] ${
                    plan.featured
                      ? "bg-white text-[#1a1714] hover:bg-white/90"
                      : "bg-[#1a1714] text-white hover:bg-[#2d2926]"
                  }`}
                >
                  جزئیات دوره
                  <ChevronLeft size={15} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
