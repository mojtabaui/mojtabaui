import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { MISSIONS, EPISODE_COUNT } from "@/lib/odyssey";
import { LAUNCH_SEATS, PRICING } from "@/lib/ai7-curriculum";
import type { Lang } from "@/lib/i18n";

/**
 * معرفیِ دورهٔ ROBOTYPE روی صفحهٔ اصلی.
 *
 * مشکی است چون پوسترِ دوره مشکی است و خودِ لندینگ هم با سیاهی باز
 * می‌شود — کسی که روی دکمه می‌زند باید حس کند وارد *همان* جایی شد
 * که اینجا دید، نه یک صفحهٔ دیگر.
 *
 * قیمت و ظرفیت از همان `PRICING` و `LAUNCH_SEATS` لندینگ می‌آیند، پس
 * با هر ثبت‌نام این نوار هم خودش جلو می‌رود.
 */

const faNum = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const COPY = {
  fa: {
    badge: "دورهٔ تازه · ثبت‌نام باز است",
    title: "آموزش AI برای طراحان محصول",
    lede: "از اولین پرامپت تا محصولی که خودت می‌سازی و منتشر می‌کنی. هر فصل یک تکهٔ واقعی از یک پروژهٔ واقعی را جلو می‌برد، و آخرش چیزی داری که می‌شود لینکش را برای بقیه فرستاد.",
    facts: [
      { k: "{ch} فصل", v: "{ep} درس ضبط‌شده" },
      { k: "پروژهٔ واقعی", v: "هم‌قدم، از پژوهش تا پروتوتایپ" },
      { k: "دسترسی همیشگی", v: "فصل‌های بعدی هم رایگان" },
    ],
    seats: "{n} جا از {cap} جای پلهٔ اول مانده",
    cta: "آشنایی با دوره",
    posterAlt: "پوستر دورهٔ ROBOTYPE: پیکرهٔ مشکیِ رباتی با گیتار",
  },
  en: {
    badge: "New course · enrolment open",
    title: "AI for product designers",
    lede: "From your first prompt to a product you build and ship yourself. Each chapter moves a real piece of a real project forward, and you finish with something you can send a link to.",
    facts: [
      { k: "{ch} chapters", v: "{ep} recorded lessons" },
      { k: "A real project", v: "Hamghadam, research to prototype" },
      { k: "Lifetime access", v: "later chapters included" },
    ],
    seats: "{n} of {cap} first-tier seats left",
    cta: "See the course",
    posterAlt: "ROBOTYPE course poster: a black robot figure with a guitar",
  },
} as const;

export default function RobotypePromo({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const price = PRICING[lang];
  const fa = lang === "fa";
  const num = (n: number) => (fa ? faNum(n) : String(n));
  const Forward = fa ? ArrowLeft : ArrowRight;
  const left = LAUNCH_SEATS.cap - LAUNCH_SEATS.taken;
  const fill = (s: string) =>
    s
      .replace("{ch}", num(MISSIONS.length))
      .replace("{ep}", num(EPISODE_COUNT))
      .replace("{n}", num(left))
      .replace("{cap}", num(LAUNCH_SEATS.cap));

  return (
    <section className="relative overflow-hidden border-y border-white/10" style={{ background: "#0a0908", color: "#f4efe8" }}>
      <div className="grain-static pointer-events-none absolute inset-0 mix-blend-overlay" style={{ opacity: 0.1 }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <FadeIn>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5">
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-body text-xs text-white/70">{c.badge}</span>
          </div>

          {/* نامِ دوره کوچک است چون پوسترِ کنارش همین کلمه را درشت دارد */}
          <p className="text-[0.72rem] tracking-[0.28em] text-white/45" dir="ltr" style={{ textAlign: fa ? "right" : "left" }}>
            ROBOTYPE · AI NATIVE PRODUCT DESIGN
          </p>

          <h2 className="mt-4 font-body text-2xl font-extrabold leading-snug md:text-3xl">{c.title}</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-loose text-white/60">{c.lede}</p>

          <dl className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {c.facts.map((f) => (
              <div key={f.k} className="bg-[#0a0908] px-5 py-4">
                <dt className="font-body text-sm font-bold">{fill(f.k)}</dt>
                <dd className="mt-1 font-body text-xs text-white/50">{fill(f.v)}</dd>
              </div>
            ))}
          </dl>

          {/* قیمت و ظرفیت — همان دو خبری که لندینگ بالای صفحه دارد */}
          <div className="mt-9 flex flex-wrap items-end gap-x-8 gap-y-5">
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2 font-body">
                <span className="text-3xl font-light tabular-nums">{price.tiers[0].price}</span>
                <span className="text-sm text-white/50">{price.unit}</span>
              </p>
              <p className="mt-1 flex items-baseline gap-2 font-body text-xs">
                <span className="tabular-nums text-white/40 line-through">{price.full}</span>
                <span className="font-semibold text-emerald-300">{price.tiers[0].off}</span>
              </p>
            </div>

            <div className="min-w-[200px] flex-1">
              <div
                role="meter"
                aria-valuemin={0}
                aria-valuemax={LAUNCH_SEATS.cap}
                aria-valuenow={LAUNCH_SEATS.taken}
                aria-label={fill(c.seats)}
                className="flex gap-[2px]"
              >
                {Array.from({ length: LAUNCH_SEATS.cap }, (_, i) => (
                  <span
                    key={i}
                    className="h-2 flex-1 rounded-[1px]"
                    style={{ background: i < LAUNCH_SEATS.taken ? "#f4efe8" : "rgba(244,239,232,.14)" }}
                  />
                ))}
              </div>
              <p className="mt-2 font-body text-xs text-white/60">{fill(c.seats)}</p>
            </div>
          </div>

          <Link
            href="/robotype"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#f4efe8] px-7 py-3.5 font-body font-semibold text-[#0a0908] transition-all hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
          >
            {c.cta}
            <Forward size={16} />
          </Link>
        </FadeIn>

        {/* پوستر — خودش یک لینک است؛ روی تصویرِ دوره زدن هم باید به دوره برود */}
        <FadeIn delay={0.12} className="order-first lg:order-none">
          <Link href="/robotype" className="group block overflow-hidden rounded-3xl border border-white/10" tabIndex={-1} aria-hidden="true">
            <Image
              src="/images/robotype-poster.webp"
              alt={c.posterAlt}
              width={900}
              height={1350}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="aspect-[4/5] w-full object-cover object-[50%_40%] transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-[2/3]"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
