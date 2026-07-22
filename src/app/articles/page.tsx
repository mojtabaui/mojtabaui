import Link from "next/link";
import { Clock, ChevronLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/mock-data";

export const metadata = {
  title: "مقالات | مدرسه دیزاین ملینا",
  description:
    "آموزش‌های متنی طراحی رابط و تجربه کاربری، هوش مصنوعی برای طراح‌ها و مسیر بازار کار.",
};

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-8 flex-wrap">
              <div className="max-w-xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
                  JOURNAL
                </div>
                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
                  مقالات
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  آموزش متنی، نکته‌های عملی و تجربه‌های واقعی از طراحی محصول. همه رایگان.
                </p>
              </div>
              <div className="font-display font-black text-[#1a1714]/[0.07] text-7xl leading-none select-none">
                {String(articles.length).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
          <Link href={`/articles/${featured.slug}`} className="group block">
            <article
              className="relative overflow-hidden rounded-[2rem] border transition-all hover:shadow-[0_28px_60px_-30px_rgba(26,23,20,0.4)]"
              style={{ backgroundColor: featured.color, borderColor: `${featured.accent}26` }}
            >
              {/* عدد تزئینی بزرگ */}
              <span
                className="absolute -bottom-10 left-4 font-display font-black leading-none select-none pointer-events-none"
                style={{ fontSize: "12rem", color: featured.accent, opacity: 0.09 }}
                aria-hidden
              >
                ۰۱
              </span>

              <div className="relative p-8 md:p-12 max-w-3xl">
                <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                  <span
                    className="text-[11px] font-body font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: featured.accent }}
                  >
                    تازه‌ترین
                  </span>
                  <span
                    className="text-[11px] font-body font-semibold px-3 py-1 rounded-full bg-white/70"
                    style={{ color: featured.accent }}
                  >
                    {featured.category}
                  </span>
                </div>

                <h2 className="font-body font-black text-2xl md:text-4xl text-[#1a1714] leading-[1.3] mb-4 group-hover:opacity-80 transition-opacity">
                  {featured.title}
                </h2>
                <p className="font-body text-[#6b6560] leading-relaxed mb-7 max-w-2xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-5 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2 font-body font-bold text-sm px-5 py-2.5 rounded-2xl text-white transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: featured.accent }}
                  >
                    بخون
                    <ChevronLeft size={15} />
                  </span>
                  <span className="flex items-center gap-1.5 text-[#6b6560] text-xs font-body">
                    <Clock size={12} />
                    {featured.readTime} دقیقه
                  </span>
                  <span className="flex items-center gap-1.5 text-[#a09990] text-xs font-body">
                    <Calendar size={12} />
                    {featured.date}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* Grid */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 py-8">
            <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990]">
              ALL ARTICLES
            </span>
            <span className="h-px flex-1 bg-[#e8e2d9]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article, i) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block h-full"
              >
                <article className="relative h-full bg-white border border-[#e8e2d9] rounded-3xl p-6 flex flex-col hover:border-[#1a1714]/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(26,23,20,0.35)] transition-all overflow-hidden">
                  {/* خط لهجه‌دار بالای کارت */}
                  <span
                    className="absolute top-0 right-6 left-6 h-[3px] rounded-b-full"
                    style={{ backgroundColor: article.accent }}
                  />
                  {/* شماره‌ی کم‌رنگ */}
                  <span
                    className="absolute top-4 left-5 font-display font-black text-4xl leading-none select-none pointer-events-none"
                    style={{ color: article.accent, opacity: 0.12 }}
                    aria-hidden
                  >
                    {String(i + 2).padStart(2, "0")}
                  </span>

                  <span
                    className="self-start text-[10px] font-body font-semibold px-2.5 py-1 rounded-full mb-4 mt-1"
                    style={{ backgroundColor: article.color, color: article.accent }}
                  >
                    {article.category}
                  </span>

                  <h2 className="font-body font-bold text-[#1a1714] leading-snug mb-2.5 group-hover:opacity-70 transition-opacity">
                    {article.title}
                  </h2>
                  <p className="text-[#6b6560] font-body text-sm leading-relaxed line-clamp-3 mb-6">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#f0ebe4] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#a09990] text-xs font-body">
                      <Clock size={11} />
                      {article.readTime} دقیقه
                    </span>
                    <ChevronLeft
                      size={15}
                      className="text-[#c8c2ba] group-hover:text-[#1a1714] group-hover:-translate-x-0.5 transition-all"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
