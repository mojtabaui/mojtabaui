import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesClient from "@/components/CoursesClient";
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
        <section className="dot-bg pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
              <div className="max-w-xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
                  COURSES
                </div>
                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
                  دوره‌ها
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  از صفر تا حرفه‌ای. با منتورینگ زنده یا کاملاً خودخوان، هر طور که به تو می‌خوره.
                </p>
              </div>

              <div className="font-display font-black text-[#1a1714]/[0.07] text-7xl leading-none select-none">
                {fa(visible.length)}
              </div>
            </div>

            {/* آمار کوتاه */}
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
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6">
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
