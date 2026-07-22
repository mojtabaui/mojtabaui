import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesClient from "@/components/CoursesClient";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import MarqueeBand from "@/components/MarqueeBand";
import { infinityCourses, videoCourses, workshopCourses, courses } from "@/lib/mock-data";

export const metadata = {
  title: "دوره‌ها | مدرسه دیزاین ملینا",
  description: "دوره‌های طراحی رابط و تجربه کاربری، با منتورینگ زنده یا کاملاً خودخوان.",
};

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function CoursesPage() {
  const visible = courses.filter((c) => !c.hidden);
  const totalHours = visible.reduce((sum, c) => sum + (c.videoHours ?? 0), 0);
  const totalProjects = visible.reduce((sum, c) => sum + (c.projects ?? 0), 0);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 bg-[#FAF6F1]">

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
                  دوره‌ها
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  از صفر تا حرفه‌ای. با منتورینگ زنده یا کاملاً خودخوان، هر طور که به تو می‌خوره.
                </p>
              </FadeIn>

              {/* پرتره‌ی مدرس */}
              <FadeIn delay={0.1}>
                <div className="relative flex items-end gap-4">
                  <div className="hidden sm:block text-left pb-2">
                    <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990] mb-1">
                      INSTRUCTOR
                    </div>
                    <div className="font-body font-bold text-sm text-[#1a1714]">مجتبا یزدانپناه</div>
                    <div className="font-body text-xs text-[#a09990] mt-0.5">۸ سال تجربه</div>
                  </div>
                  <div className="relative w-[150px] sm:w-[190px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_24px_50px_-30px_rgba(26,23,20,0.55)] bg-white flex-shrink-0">
                    <Image
                      src="/images/instructor-portrait.jpg"
                      alt="مجتبا یزدانپناه، مدرس دوره‌ها"
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
                  { num: fa(visible.length), label: "دوره" },
                  { num: `${fa(totalHours)}+`, label: "ساعت آموزش" },
                  { num: `${fa(totalProjects)}+`, label: "پروژه عملی" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-5 py-5 text-center ${i < 2 ? "border-l border-[#f0ebe4]" : ""}`}
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

      </main>
      <Footer />
    </>
  );
}
