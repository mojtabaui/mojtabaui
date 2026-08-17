import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesClient from "@/components/CoursesClient";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import MarqueeBand from "@/components/MarqueeBand";
import FormatCompare from "@/components/FormatCompare";
import { infinityCourses, videoCourses, workshopCourses, courses } from "@/lib/mock-data";
import { getLang } from "@/lib/i18n/server";
import { PAGES } from "@/lib/i18n/dict/pages";

export async function generateMetadata() {
  const t = PAGES[await getLang()].courses;
  return { title: t.metaTitle, description: t.metaDescription };
}

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default async function CoursesPage() {
  const lang = await getLang();
  const t = PAGES[lang].courses;
  const num = (n: number | string) => (lang === "fa" ? fa(n) : String(n));

  const visible = courses.filter((c) => !c.hidden);
  const totalHours = visible.reduce((sum, c) => sum + (c.videoHours ?? 0), 0);
  const totalProjects = visible.reduce((sum, c) => sum + (c.projects ?? 0), 0);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[var(--nav-h)] bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg pt-16 pb-12 relative overflow-hidden">
          {/* واژه‌ی تزئینیِ پس‌زمینه با پارالاکس */}
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
            <ParallaxY speed={50}>
              <span
                className="font-display font-black leading-none block text-[#1a1714]"
                style={{ fontSize: "clamp(8rem, 22vw, 17rem)", opacity: 0.035, marginRight: "-1.5rem" }}
              >
                LEARN
              </span>
            </ParallaxY>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
              <FadeIn className="max-w-xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
                  COURSES
                </div>
                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
                  {t.title}
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  {t.body}
                </p>
              </FadeIn>

              {/* پرتره‌ی مدرس */}
              <FadeIn delay={0.1}>
                <div className="relative flex items-end gap-4">
                  <div className="hidden sm:block text-end pb-2">
                    <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990] mb-1">
                      INSTRUCTOR
                    </div>
                    <div className="font-body font-bold text-sm text-[#1a1714]">{t.instructor}</div>
                    <div className="font-body text-xs text-[#a09990] mt-0.5">{t.experience}</div>
                  </div>
                  <div className="relative w-[150px] sm:w-[190px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_24px_50px_-30px_rgba(26,23,20,0.55)] bg-white flex-shrink-0">
                    <Image
                      src="/images/instructor-portrait.jpg"
                      alt={t.portraitAlt}
                      fill
                      priority
                      sizes="190px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* آمار کوتاه */}
            <FadeIn delay={0.12}>
              <div className="grid grid-cols-3 max-w-lg bg-white border border-[#e8e2d9] rounded-3xl overflow-hidden">
                {[
                  { num: num(visible.length), label: t.stats.courses },
                  { num: `${num(totalHours)}+`, label: t.stats.hours },
                  { num: `${num(totalProjects)}+`, label: t.stats.projects },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-5 py-5 text-center ${i < 2 ? "border-e border-[#f0ebe4]" : ""}`}
                  >
                    <div className="font-display font-black text-2xl text-[#1a1714]">{s.num}</div>
                    <div className="font-body text-[#a09990] text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <MarqueeBand />

        {/* Grid */}
        <section className="pb-24 pt-16 max-w-7xl mx-auto px-4 sm:px-6">
          <CoursesClient
            infinityCourses={infinityCourses}
            videoCourses={videoCourses}
            workshopCourses={workshopCourses}
          />
        </section>

        {/* مقایسه‌ی نسخه‌ها — از صفحه‌ی اصلی به این‌جا منتقل شد */}
        <FormatCompare />

      </main>
      <Footer />
    </>
  );
}
