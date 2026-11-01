import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonalNote from "@/components/PersonalNote";
import DiscountNotifyForm from "@/components/DiscountNotifyForm";
import Reveal from "@/components/home-lab/Reveal";
import { STACHE_LEFT, STACHE_RIGHT, STACHE_HINGE } from "@/components/BrandMark";
import { getLang } from "@/lib/i18n/server";
import { getHomeData, chapter, num, TELEGRAM } from "@/components/home-lab/data";
import s from "./home-v3.module.css";

/**
 * نسخه‌ی جسور صفحه‌ی خانه.
 * Reading this as: صفحه‌ی خانه‌ی یک مدرسه‌ی طراحی برای آدم‌هایی که از نو
 * شروع می‌کنن، با لحظه‌های نمایشی برندبوک، dial ENERGY 3 / RHYTHM 3 / MOTION 2.
 *
 * موتیف: حرف یا عدد خیلی درشتِ بریده‌شده لبه‌ی هر بخش، با شفافیت کم.
 * همون کاری که برندبوک با «م» و گیومه می‌کنه. بنفش فقط روی نشان و کلمه‌ی
 * «از نو» در هیرو، و هاور ردیف دوره‌ها.
 * حرکت: تیتر هیرو خط به خط، نشان سه بار بال می‌زنه و می‌ایسته، بخش‌ها
 * موقع اسکرول ظاهر می‌شن. همه با «کاهش حرکت» خاموش.
 */

export const metadata: Metadata = {
  title: "نسخه‌ی جسور خانه | مدرسه دیزاین ملینا",
  robots: { index: false, follow: false },
};

const COPY = {
  fa: {
    lines: ["طراحی رو", "از نو", "شروع کن."],
    accentLine: 1,
    body: "از صفر شروع می‌کنی، پروژه‌ی واقعی می‌سازی و هر هفته فیدبک می‌گیری. لازم نیست قبلش چیزی بلد باشی.",
    primary: "دوره‌ها و قیمت‌ها",
    secondary: "نمی‌دونم از کجا شروع کنم",
    facts: [
      { big: "۸ سال", small: "طراحی حرفه‌ای UI و UX" },
      { big: "۵ سال", small: "آموزش مستقیم به شاگردها" },
      { big: "۶٬۵۰۰+", small: "نفر تا الان توی دوره‌ها" },
    ],
    courses: {
      title: (count: string) => `${count} دوره، یک مسیر`,
      lede: "بی‌نهایت یعنی ده هفته با منتورینگ گروهی. ویدیویی یعنی هر وقت خودت خواستی.",
      hours: "ساعت ویدیو",
      projects: "پروژه",
      closed: "ثبت‌نام بسته‌ست",
      mentoring: "با منتورینگ",
      all: "مقایسه‌ی کامل دوره‌ها",
    },
    robotype: {
      kicker: "ROBOTYPE · AI NATIVE PRODUCT DESIGN",
      title: "دوره‌ی تازه: هوش مصنوعی برای طراح‌های محصول",
      body: "از اولین پرامپت تا محصولی که خودت می‌سازی و منتشر می‌کنی. آخرش چیزی داری که می‌شه لینکش رو برای بقیه فرستاد.",
      facts: (ch: string, ep: string) => [
        { big: ch, small: "فصل" },
        { big: ep, small: "درس ضبط‌شده" },
      ],
      cta: "برنامه‌ی دوره‌ی ROBOTYPE",
      posterAlt: "پوستر دوره‌ی ROBOTYPE: پیکره‌ی مشکی رباتی با گیتار",
    },
    process: { title: "هفته به هفته", lede: "دو مسیر، هر کدوم با ریتم خودش. هیچ‌کدوم تنهات نمی‌ذاره." },
    words: { title: "حرف شاگردها", more: "بقیه‌ی حرف‌ها" },
    work: {
      title: "چیزی که ساختن",
      lede: "پروژه‌های گروهی دوره‌ها. فایل‌ها بازن.",
      rail: "پروژه‌های شاگردها، به پهلو اسکرول کن",
      open: "فایل فیگما",
      openOther: "دیدن پروژه",
      all: "همه‌ی پروژه‌ها",
    },
    reading: { title: "نوشته‌ها", minutes: "دقیقه خواندن", all: "همه‌ی نوشته‌ها" },
    faq: { title: "سؤال‌ها", lede: "اگه جوابت این‌جا نبود، توی تلگرام بپرس. خودم جواب می‌دم." },
    close: {
      title: "بیا حرف بزنیم.",
      body: "ثبت‌نام بی‌نهایت فعلاً بسته‌ست. برای مشاوره و این‌که دوره‌ی بعدی کی شروع می‌شه، توی تلگرام پیام بده، یا شماره‌ت رو بذار تا وقتی باز شد خبرت کنیم.",
      telegram: "پیام در تلگرام",
    },
  },
  en: {
    lines: ["Start", "design over", "from zero."],
    accentLine: 1,
    body: "You start from zero, build a real project, and get feedback every week. Nothing to know beforehand.",
    primary: "Courses and prices",
    secondary: "I don't know where to start",
    facts: [
      { big: "8 years", small: "of UI and UX practice" },
      { big: "5 years", small: "of teaching students directly" },
      { big: "6,500+", small: "people through the courses" },
    ],
    courses: {
      title: (count: string) => `${count} courses, one path`,
      lede: "Infinity means ten weeks with group mentoring. Video means whenever you choose.",
      hours: "hours of video",
      projects: "projects",
      closed: "Enrolment closed",
      mentoring: "with mentoring",
      all: "Compare every course",
    },
    robotype: {
      kicker: "ROBOTYPE · AI NATIVE PRODUCT DESIGN",
      title: "New course: AI for product designers",
      body: "From your first prompt to a product you build and ship yourself. You finish with something you can send a link to.",
      facts: (ch: string, ep: string) => [
        { big: ch, small: "chapters" },
        { big: ep, small: "recorded lessons" },
      ],
      cta: "ROBOTYPE syllabus",
      posterAlt: "ROBOTYPE course poster: a black robot figure with a guitar",
    },
    process: { title: "Week by week", lede: "Two tracks, each with its own rhythm. Neither leaves you on your own." },
    words: { title: "In students' words", more: "More of what they said" },
    work: {
      title: "What they built",
      lede: "Group projects from the courses. The files are open.",
      rail: "Student projects, scroll sideways",
      open: "Figma file",
      openOther: "See the project",
      all: "All projects",
    },
    reading: { title: "", minutes: "", all: "" },
    faq: { title: "Questions", lede: "If yours is not here, ask on Telegram. I answer myself." },
    close: {
      title: "Let's talk.",
      body: "Infinity enrolment is closed for now. Message on Telegram for advice and to hear when the next cohort starts, or leave your number and we'll tell you when it opens.",
      telegram: "Message on Telegram",
    },
  },
} as const;

/** نشان برند با دو بال جدا تا بتونه بال بزنه. */
function FlappingMark({ size }: { size: number }) {
  return (
    <svg viewBox="0 4 120 108" width={size} height={(size * 108) / 120} className={s.mark} aria-hidden="true">
      <path d={STACHE_RIGHT} fill="currentColor" className={s.wingR} />
      <path d={STACHE_LEFT} fill="currentColor" className={s.wingL} />
      <ellipse cx={STACHE_HINGE.cx} cy={STACHE_HINGE.cy} rx={STACHE_HINGE.rx} ry={STACHE_HINGE.ry} fill="currentColor" />
    </svg>
  );
}

/** حرف یا عدد خیلی درشت پشت بخش، بریده‌شده با لبه. فقط تزئین هویتی، از برندبوک. */
function Ghost({ text, dark, side = "end" }: { text: string; dark?: boolean; side?: "start" | "end" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-[0.18em] ${side === "start" ? "-start-[0.04em]" : "-end-[0.04em]"} font-body font-black leading-none pointer-events-none select-none`}
      style={{ fontSize: "clamp(9rem, 26vw, 24rem)", color: dark ? "#FAF6F1" : "#1a1714", opacity: dark ? 0.06 : 0.05 }}
    >
      {text}
    </span>
  );
}

function SectionTitle({ title, lede, dark }: { title: string; lede?: string; dark?: boolean }) {
  return (
    <Reveal className="relative mb-12 md:mb-16">
      <h2
        className={`font-body font-black leading-[1.3] ${dark ? "text-[#FAF6F1]" : "text-[#1a1714]"}`}
        style={{ fontSize: "clamp(2.2rem, 6vw, 4.8rem)" }}
      >
        {title}
      </h2>
      {lede && (
        <p className={`font-body text-lg leading-[2] mt-5 max-w-xl ${dark ? "text-[#FAF6F1]/70" : "text-[#5e5853]"}`}>{lede}</p>
      )}
    </Reveal>
  );
}

export default async function HomeBold() {
  const lang = await getLang();
  const c = COPY[lang];
  const d = getHomeData(lang);
  const fa = lang === "fa";
  const sep = fa ? "، " : ", ";
  let n = 0;
  const next = () => chapter(++n, lang);

  const [leadQuote, ...otherQuotes] = d.testimonials;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF6F1] text-[#1a1714]">

        {/* ─── هیرو: تیتر سه‌خطی تمام‌عرض روی مشکی. پرتره ته قاب می‌شینه، نشان بالای تیتر. ─── */}
        <section className="relative overflow-hidden bg-[#1a1714] text-[#FAF6F1] pt-[var(--nav-h)]">
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-8 items-end" style={{ minHeight: "clamp(600px, 92vh, 920px)" }}>
            <div className="lg:col-span-7 relative z-10 pt-14 lg:pt-0 lg:pb-24">
              <span className="text-[#9d85ff] inline-block mb-8">
                <FlappingMark size={64} />
              </span>
              <h1 className="font-body font-black leading-[1.15]" style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
                {c.lines.map((line, i) => (
                  <span key={line} className={`${s.line} ${i === c.accentLine ? "text-[#9d85ff]" : ""}`}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="font-body text-lg leading-[2] text-[#FAF6F1]/75 mt-8 max-w-md">{c.body}</p>
              <div className="flex flex-wrap gap-3 mt-10">
                <Link
                  href="/courses"
                  className="inline-flex items-center min-h-[52px] px-8 rounded-xl bg-[#FAF6F1] text-[#1a1714] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]"
                >
                  {c.primary}
                </Link>
                <Link
                  href="/checklist"
                  className="inline-flex items-center min-h-[52px] px-7 rounded-xl border border-[#FAF6F1]/30 font-body transition-colors duration-200 hover:border-[#FAF6F1] hover:bg-[#FAF6F1]/10 active:bg-[#FAF6F1]/15"
                >
                  {c.secondary}
                </Link>
              </div>
            </div>
            {/* پرتره زمینه‌ی سفید داره. روی مشکی یک قاب کرم عمدی می‌شه و
                multiply سفید عکس رو با کرم یکی می‌کنه، نه یک مربع سفید وصله‌ای. */}
            <div className="lg:col-span-5 relative self-end -mx-5 sm:mx-0 bg-[#FAF6F1] sm:rounded-t-[2rem] overflow-hidden">
              <Image
                src="/images/hero.png"
                alt={d.t.hero.portraitAlt}
                width={960}
                height={944}
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="w-full max-w-[520px] h-auto mx-auto mix-blend-multiply"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </div>

          {/* سه واقعیت مدرس، با عدد درشت. اعداد همون‌هاییه که صفحه‌ی اصلی از قبل اعلام کرده. */}
          <div className="relative border-t border-[#FAF6F1]/15">
            <dl className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3">
              {c.facts.map((f, i) => (
                <div key={f.big} className={`py-7 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-s border-[#FAF6F1]/15" : "sm:ps-0"}`}>
                  <dt className="font-body font-black text-3xl md:text-4xl">{f.big}</dt>
                  <dd className="font-body text-[#FAF6F1]/70 mt-1">{f.small}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── دوره‌ها: عنوان‌های درشت، هر ردیف یک لینک. بدون کارت، چون مقایسه با چشم روی یک ستون راحت‌تره. ─── */}
        <section className="relative overflow-hidden">
          <Ghost text={next()} />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
            <SectionTitle title={c.courses.title(num(d.courses.length, lang))} lede={c.courses.lede} />
            <ul className="border-t border-[#1a1714]">
              {d.courses.map((course, i) => (
                <li key={course.slug} className="border-b border-[#1a1714]/15">
                  <Reveal delay={i * 40}>
                    <Link href={`/courses/${course.slug}`} className={`${s.row} group grid md:grid-cols-[1fr_auto] items-center gap-x-10 gap-y-3 py-7 md:py-9`}>
                      <span>
                        <span
                          className={`${s.rowTitle} block font-body font-black leading-[1.35] group-hover:text-[#6240e0]`}
                          style={{ fontSize: "clamp(1.6rem, 3.6vw, 3rem)" }}
                        >
                          {course.title}
                        </span>
                        <span className="block font-body text-[#6b6560] mt-2">
                          <span dir="ltr">{course.latin}</span>
                          {course.mentoring && <>{sep}{c.courses.mentoring}</>}
                        </span>
                      </span>
                      <span className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-body md:text-end">
                        <span>{course.videoHours} {c.courses.hours}</span>
                        <span>{course.projects} {c.courses.projects}</span>
                        {course.closed ? (
                          <span className="text-[#6b6560]">{c.courses.closed}</span>
                        ) : (
                          <span className="font-black text-lg">{course.price}</span>
                        )}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Link href="/courses" className="inline-flex items-center min-h-[48px] mt-10 px-7 rounded-xl bg-[#1a1714] text-[#FAF6F1] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-[#3a342f] active:scale-[0.98]">
              {c.courses.all}
            </Link>
          </div>
        </section>

        {/* ─── ROBOTYPE: پوستر تمام‌قد تا لبه. این‌جا تصویر حرف اول رو می‌زنه، نه متن. ─── */}
        <section className="bg-[#0a0908] text-[#f4efe8]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px] lg:min-h-[640px]">
              <Image
                src="/images/robotype-poster.webp"
                alt={c.robotype.posterAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <Reveal className="px-5 sm:px-10 lg:px-16 py-16 lg:py-24 self-center max-w-2xl">
              <p dir="ltr" className={`font-display text-xs tracking-[0.28em] text-[#f4efe8]/60 ${fa ? "text-right" : ""}`}>{c.robotype.kicker}</p>
              <h2 className="font-body font-black leading-[1.35] mt-5" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}>
                {c.robotype.title}
              </h2>
              <p className="font-body text-lg leading-[2] text-[#f4efe8]/70 mt-6">{c.robotype.body}</p>
              <dl className="flex flex-wrap gap-x-12 gap-y-6 mt-10">
                {c.robotype.facts(d.robotype.chapters, d.robotype.lessons).map((f) => (
                  <div key={f.small}>
                    <dt className="font-body font-black text-4xl">{f.big}</dt>
                    <dd className="font-body text-[#f4efe8]/70 mt-1">{f.small}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-body font-black text-4xl">{d.robotype.price}</dt>
                  <dd className="font-body text-[#f4efe8]/70 mt-1">{d.robotype.unit}</dd>
                </div>
              </dl>
              <Link href="/robotype" className="inline-flex items-center min-h-[52px] px-8 mt-12 rounded-xl bg-[#f4efe8] text-[#0a0908] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]">
                {c.robotype.cta}
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ─── روند: هر مسیر یک نوار افقی پنج‌قدمی. عدد درشت قدم، چون آدم‌ها دنبال «الان کجام» می‌گردن. ─── */}
        <section className="relative overflow-hidden bg-[#E4DAD5]">
          <Ghost text={next()} side="end" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
            <SectionTitle title={c.process.title} lede={c.process.lede} />
            <div className="space-y-16">
              {d.tracks.map((track) => (
                <Reveal key={track.name}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 pb-5 border-b-2 border-[#1a1714]">
                    <h3 className="font-body font-black text-2xl md:text-3xl">{track.name}</h3>
                    <span className="font-body text-[#5e5853]">{track.tag}</span>
                  </div>
                  <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8">
                    {track.steps.map((step, i) => (
                      <li key={step} className="pt-6 pb-2 border-b lg:border-b-0 border-[#1a1714]/15">
                        <span className="block font-body font-black text-5xl text-[#7d756f] leading-none">{d.t.howItWorks.digits[i]}</span>
                        <span className="block font-body leading-[2] mt-4">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              ))}
            </div>
            <dl className="grid sm:grid-cols-3 gap-8 mt-16 pt-10 border-t border-[#1a1714]/15">
              {d.notes.map((note) => (
                <div key={note.title}>
                  <dt className="font-body font-bold">{note.title}</dt>
                  <dd className="font-body text-[#4a4540] leading-[2] mt-1">{note.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── حرف شاگردها: یک جمله در ابعاد تیتر. بقیه روی نوار افقی، هر کس بخواد ادامه می‌ده. ─── */}
        <section className="relative overflow-hidden">
          <Ghost text={fa ? "«" : "“"} />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-10">
            <p className="font-body text-[#6b6560] mb-8">{c.words.title}</p>
            {leadQuote && (
              <Reveal>
                <figure>
                  <blockquote className="font-body font-black leading-[1.55] max-w-5xl" style={{ fontSize: "clamp(1.6rem, 3.8vw, 3.2rem)" }}>
                    {leadQuote.text}
                  </blockquote>
                  <figcaption className="font-body text-lg mt-8">
                    <span className="font-bold">{leadQuote.name}</span>
                    <span className="text-[#6b6560]">{sep}{leadQuote.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </div>
          <div className="max-w-7xl mx-auto pb-24 md:pb-32">
            <h3 className="font-body font-bold px-5 sm:px-8 mt-10 mb-5">{c.words.more}</h3>
            <ul className={`${s.rail} flex gap-5 overflow-x-auto px-5 sm:px-8 pb-4`} aria-label={c.words.more}>
              {otherQuotes.map((q) => (
                <li key={q.name} className="flex-shrink-0 w-[min(84vw,380px)] border-t-2 border-[#1a1714] pt-5">
                  <figure>
                    <blockquote className="font-body leading-[2]">{q.text}</blockquote>
                    <figcaption className="font-body text-sm mt-4">
                      <span className="font-bold">{q.name}</span>
                      <span className="text-[#6b6560]">{sep}{q.role}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── کار شاگردها: نوار افقی تصویرهای بزرگ روی مشکی، مثل دیوار نمایشگاه. ─── */}
        <section className="relative overflow-hidden bg-[#1a1714] text-[#FAF6F1]">
          <Ghost text={next()} dark side="end" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32">
            <SectionTitle title={c.work.title} lede={c.work.lede} dark />
          </div>
          <div className="relative max-w-7xl mx-auto pb-24 md:pb-32">
            <ul className={`${s.rail} flex gap-6 overflow-x-auto px-5 sm:px-8 pb-5`} aria-label={c.work.rail}>
              {d.projects.map((p) => (
                <li key={p.id} className="flex-shrink-0 w-[min(86vw,560px)]">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="overflow-hidden rounded-2xl bg-[#2a2520] aspect-[16/10]">
                      {p.cover && (
                        <Image
                          src={p.cover}
                          alt=""
                          width={1280}
                          height={800}
                          sizes="(min-width: 640px) 560px, 86vw"
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="flex items-baseline justify-between gap-4 mt-5">
                      <span>
                        <span className="block font-body font-black text-2xl"><bdi>{p.name}</bdi></span>
                        <span className="block font-body text-[#FAF6F1]/70 mt-1">{p.kind}</span>
                      </span>
                      <span className="font-body text-sm text-[#FAF6F1]/70 underline underline-offset-4 group-hover:text-[#FAF6F1] flex-shrink-0">
                        {p.figma ? c.work.open : c.work.openOther}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-5 sm:px-8 mt-10">
              <Link href="/projects" className="inline-flex items-center min-h-[48px] px-7 rounded-xl border border-[#FAF6F1]/30 font-body font-bold transition-colors duration-200 hover:border-[#FAF6F1] hover:bg-[#FAF6F1]/10">
                {c.work.all}
              </Link>
            </div>
          </div>
        </section>

        {/* ─── نوشته‌ها (فقط فارسی): دو ستون، عنوان درشت. ─── */}
        {d.articles.length > 0 && (
          <section className="relative overflow-hidden">
            <Ghost text={next()} />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
              <SectionTitle title={c.reading.title} />
              <ul className="grid md:grid-cols-2 gap-x-12">
                {d.articles.map((a) => (
                  <li key={a.id} className="border-t border-[#1a1714]/15">
                    <Link href={`/articles/${a.slug}`} className="group block py-8">
                      <span className="block font-body font-black text-xl md:text-2xl leading-[1.6] group-hover:text-[#6240e0] transition-colors duration-200">
                        {a.title}
                      </span>
                      <span className="block font-body text-[#6b6560] mt-3">
                        {a.readTime.toLocaleString("fa-IR")} {c.reading.minutes}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/articles" className="inline-flex items-center min-h-[44px] mt-4 font-body font-bold text-[#6240e0] underline underline-offset-8 decoration-1 hover:decoration-2">
                {c.reading.all}
              </Link>
            </div>
          </section>
        )}

        <PersonalNote />

        {/* ─── سؤال‌ها: تیتر ثابت کنار، سؤال‌ها کنارش. با اسکرول، تیتر سر جاش می‌مونه. ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <SectionTitle title={c.faq.title} lede={c.faq.lede} />
            </div>
          </div>
          <div className="lg:col-span-8 border-t-2 border-[#1a1714]">
            {d.faqs.map((f) => (
              <details key={f.q} className="group border-b border-[#1a1714]/15">
                <summary className="flex items-start justify-between gap-6 py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-body font-black text-lg md:text-xl leading-[1.8]">{f.q}</span>
                  <span aria-hidden="true" className="font-display text-3xl leading-none mt-1 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="font-body text-[#4a4540] leading-[2] pb-8 max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ─── پایان: تیتر خیلی درشت روی مشکی، فرم روی کرم کنارش. ─── */}
        <section className="relative overflow-hidden bg-[#1a1714] text-[#FAF6F1]">
          <Ghost text={fa ? "م" : "M"} dark side="end" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32 grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <h2 className="font-body font-black leading-[1.2]" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
                {c.close.title}
              </h2>
              <p className="font-body text-lg leading-[2] text-[#FAF6F1]/75 mt-7 max-w-md">{c.close.body}</p>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[52px] px-8 mt-10 rounded-xl bg-[#FAF6F1] text-[#1a1714] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]"
              >
                {c.close.telegram}
              </a>
            </Reveal>
            <div className="bg-[#FAF6F1] text-[#1a1714] rounded-3xl p-6 sm:p-8">
              <DiscountNotifyForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
