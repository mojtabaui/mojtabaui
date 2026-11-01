import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonalNote from "@/components/PersonalNote";
import DiscountNotifyForm from "@/components/DiscountNotifyForm";
import PathPicker from "@/components/home-next/PathPicker";
import { featuredProjects } from "@/lib/mock-data";
import { getLang } from "@/lib/i18n/server";
import { getPaths, courseFacts, TELEGRAM } from "./paths";
import s from "@/components/home-next/home-next.module.css";

/**
 * صفحه‌ی خانه‌ی مسیرمحور.
 * Reading this as: صفحه‌ی ورود یک مدرسه‌ی طراحی برای آدم‌هایی که هنوز
 * نمی‌دونن از کجا شروع کنن، با هویت زرد قناری و چیدمان ساختاری تیز،
 * dial ENERGY 3 / RHYTHM 3 / MOTION 1.
 *
 * چرا این شکل: صفحه‌ی فعلی بروشوره و همه‌ی دوره‌ها رو به همه نشون می‌ده.
 * این‌جا اول می‌پرسه کجای مسیری، بعد فقط چیزی رو نشون می‌ده که به همون
 * آدم مربوطه. برای کسی که از قبل می‌دونه چی می‌خواد، فهرست کامل پایین‌تره.
 *
 * رنگ: زرد قناری چون ملینا یعنی قناری (تصمیم مالک، DESIGN.md).
 * گوشه‌ها تیز و خط‌ها دو پیکسلی، تا از حس نرم و گرد سایت فعلی دور بشه.
 */

export const metadata: Metadata = {
  title: "از کجا شروع کنم؟ | مدرسه دیزاین ملینا",
  robots: { index: false, follow: false },
};

const COPY = {
  fa: {
    picker: {
      question: "الان کجای مسیری؟",
      sub: "یکی رو انتخاب کن. بقیه‌ی صفحه بر اساس جوابت چیده می‌شه.",
      groupLabel: "انتخاب مسیر",
      empty: "هنوز مسیری انتخاب نکردی. یکی از چهار گزینه‌ی بالا رو بزن تا دوره، قدم اول و حرف شاگردهایی که همین‌جا بودن این‌جا بیاد.",
      firstStep: "قدم اول:",
      courses: "دوره‌های این مسیر",
      words: "کسایی که همین‌جا بودن",
      change: "انتخاب یک مسیر دیگه",
    },
    index: {
      title: "می‌دونی چی می‌خوای؟",
      lede: "همه‌ی دوره‌ها، یک‌جا.",
      mentoring: "با منتورینگ گروهی",
      all: "صفحه‌ی دوره‌ها با جزئیات کامل",
    },
    work: {
      title: "کار شاگردها",
      lede: "پروژه‌های گروهی دوره‌ها. فایل‌ها بازن و می‌تونی داخلشون رو ببینی.",
      rail: "پروژه‌های شاگردها، به پهلو اسکرول کن",
      open: "فایل فیگما",
      all: "همه‌ی پروژه‌ها",
    },
    close: {
      title: "ثبت‌نام دوره‌های بی‌نهایت فعلاً بسته‌ست.",
      body: "شماره‌ت رو بذار تا وقتی باز شد اول از همه خبرت کنیم. یا همین الان توی تلگرام بپرس.",
      telegram: "پرسیدن در تلگرام",
    },
  },
  en: {
    picker: {
      question: "Where are you right now?",
      sub: "Pick one. The rest of the page arranges itself around your answer.",
      groupLabel: "Choose a path",
      empty: "No path chosen yet. Pick one of the four above and the course, the first step, and words from students who were in the same place will appear here.",
      firstStep: "First step:",
      courses: "Courses on this path",
      words: "People who were here",
      change: "Choose a different path",
    },
    index: {
      title: "Already know what you want?",
      lede: "Every course, in one place.",
      mentoring: "with group mentoring",
      all: "Courses page with full details",
    },
    work: {
      title: "Student work",
      lede: "Group projects from the courses. The files are open, so you can look inside.",
      rail: "Student projects, scroll sideways",
      open: "Figma file",
      all: "All projects",
    },
    close: {
      title: "Infinity enrolment is closed for now.",
      body: "Leave your number and you'll hear first when it opens. Or ask on Telegram right now.",
      telegram: "Ask on Telegram",
    },
  },
} as const;

export default async function HomeNext({ searchParams }: { searchParams: Promise<{ path?: string | string[] }> }) {
  const lang = await getLang();
  const c = COPY[lang];
  const fa = lang === "fa";
  const paths = getPaths(lang);
  const asked = (await searchParams).path;
  const initial = paths.find((p) => p.id === asked)?.id ?? null;
  const courses = courseFacts(lang);

  // عنوان پروژه‌ها «اسم — نوع» نوشته شده؛ دو تکه‌ش می‌کنیم
  const projects = featuredProjects.map((p) => {
    const [name, kind] = p.projectTitle.split(/\s+—\s+/);
    return { ...p, name, kind: kind ?? "" };
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF6F1] text-[#1a1714]">
        <PathPicker paths={paths} copy={c.picker} lang={lang} initial={initial} />

        {/* ─── فهرست کامل: برای کسی که سؤال بالا رو لازم نداره. جدول فشرده، دو ستون روی دسکتاپ. ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-body font-black leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                {c.index.title}
              </h2>
              <p className="font-body text-lg text-[#5e5853] mt-3">{c.index.lede}</p>
            </div>
            <Link href="/courses" className="inline-flex items-center min-h-[44px] font-body font-bold underline underline-offset-[6px] decoration-2 decoration-[#1a1714]/30 hover:decoration-[#1a1714]">
              {c.index.all}
            </Link>
          </div>
          <ul className="grid md:grid-cols-2 border-t-2 border-[#1a1714]">
            {courses.map(({ slug, latin, fact, mentoring }, i) => (
              <li key={slug} className={`border-b-2 border-[#1a1714] ${i % 2 === 0 ? "md:border-e-2" : ""}`}>
                <Link href={fact.href} className="group block h-full p-5 md:p-7 transition-colors duration-200 hover:bg-[#FFD23F] active:bg-[#f5c518]">
                  <span className="block font-body font-black text-xl md:text-2xl leading-[1.5]">{fact.title}</span>
                  <span className="block font-body text-sm text-[#5e5853] group-hover:text-[#3d3833] mt-1">
                    <span dir="ltr">{latin}</span>
                    {mentoring && <>{fa ? "، " : ", "}{c.index.mentoring}</>}
                  </span>
                  <span className="flex flex-wrap gap-x-5 gap-y-1 font-body mt-4">
                    {fact.meta.map((m, j) => (
                      <span key={m} className={j === fact.meta.length - 1 && !fact.closed ? "font-black" : ""}>{m}</span>
                    ))}
                    {fact.closed && <span className="text-[#5e5853] group-hover:text-[#3d3833]">{fact.closed}</span>}
                  </span>
                </Link>
              </li>
            ))}
            <li className={`border-b-2 border-[#1a1714] ${courses.length % 2 === 0 ? "md:border-e-2" : ""}`}>
              <Link href="/robotype" className="group block h-full p-5 md:p-7 bg-[#1a1714] text-[#FAF6F1] transition-colors duration-200 hover:bg-[#2d2824]">
                <span className="block font-display font-bold text-xl md:text-2xl tracking-[0.12em]" dir="ltr" style={{ textAlign: fa ? "right" : "left" }}>ROBOTYPE</span>
                <span className="block font-body text-sm text-[#FAF6F1]/75 mt-1">{paths.find((p) => p.id === "ai")?.label}</span>
                <span className="flex flex-wrap gap-x-5 gap-y-1 font-body mt-4">
                  {paths.find((p) => p.id === "ai")?.courses[0]?.meta.map((m) => <span key={m}>{m}</span>)}
                </span>
              </Link>
            </li>
          </ul>
        </section>

        {/* ─── کار شاگردها: نوار افقی با قاب دو پیکسلی مشکی، مثل دیوار نمایشگاه. ─── */}
        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10">
            <h2 className="font-body font-black leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              {c.work.title}
            </h2>
            <p className="font-body text-lg text-[#5e5853] mt-3 max-w-xl">{c.work.lede}</p>
          </div>
          <div className="max-w-7xl mx-auto">
            <ul className={`${s.rail} flex gap-6 overflow-x-auto px-5 sm:px-8 pb-5`} aria-label={c.work.rail}>
              {projects.map((p) => (
                <li key={p.id} className="flex-shrink-0 w-[min(84vw,520px)]">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="border-2 border-[#1a1714] bg-[#e8e2d9] aspect-[16/10] overflow-hidden">
                      {p.coverImage && (
                        <Image
                          src={p.coverImage}
                          alt=""
                          width={1280}
                          height={800}
                          sizes="(min-width: 640px) 520px, 84vw"
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="flex items-baseline justify-between gap-4 mt-4">
                      <span>
                        <span className="block font-body font-black text-xl"><bdi>{p.name}</bdi></span>
                        <span className="block font-body text-[#5e5853] mt-0.5">{p.kind}</span>
                      </span>
                      <span className="font-body text-sm underline underline-offset-4 flex-shrink-0">
                        {p.linkType === "figma" ? c.work.open : p.url.includes("t.me") ? "Telegram" : ""}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-6">
            <Link href="/projects" className="inline-flex items-center min-h-[44px] font-body font-bold underline underline-offset-[6px] decoration-2 decoration-[#1a1714]/30 hover:decoration-[#1a1714]">
              {c.work.all}
            </Link>
          </div>
        </section>

        {/* یادداشت مدرس دلیل زرد بودن صفحه رو می‌گه: ملینا یعنی قناری */}
        <PersonalNote />

        {/* ─── پایان: صادق درباره‌ی بسته بودن ثبت‌نام، فرم توی قاب سفید روی زرد. ─── */}
        <section className="bg-[#FFD23F]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-body font-black leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                {c.close.title}
              </h2>
              <p className="font-body text-lg leading-[2] text-[#3d3833] mt-5 max-w-md">{c.close.body}</p>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[52px] px-8 mt-9 bg-[#1a1714] text-[#FFD23F] font-body font-black transition-[background-color,transform] duration-200 hover:bg-[#3a342f] active:scale-[0.98]"
              >
                {c.close.telegram}
              </a>
            </div>
            <DiscountNotifyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
