import Link from "next/link";
import { Clock, Download, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/mock-data";

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white border border-[#e8e2d9] rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#7c5cfc]" />
              <span className="font-body text-xs text-[#6b6560]">آموزش رایگان — متنی</span>
            </div>
            <h1 className="font-body font-extrabold text-4xl md:text-5xl text-[#1a1714] leading-tight mb-4">
              مقالات
            </h1>
            <p className="text-[#6b6560] font-body text-lg leading-relaxed">
              آموزش‌های متنی، نکات عملی و گاهی یه فایل دانلودی — رایگان.
            </p>
          </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {articles.map((article, i) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
                <article className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden hover:border-[#1a1714]/20 hover:shadow-sm transition-all flex">
                  {/* Colored left border */}
                  <div className="w-1 flex-shrink-0 rounded-r-full" style={{ backgroundColor: article.accent }} />

                  <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Index number */}
                    <div
                      className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-sm font-display font-bold flex-shrink-0"
                      style={{ backgroundColor: article.color, color: article.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: article.color, color: article.accent }}
                        >
                          {article.category}
                        </span>
                        {article.downloadFile && (
                          <span className="flex items-center gap-1 text-[10px] font-body"
                            style={{ color: article.accent }}>
                            <Download size={9} />
                            دارای فایل
                          </span>
                        )}
                      </div>

                      <h2 className="font-body font-bold text-[#1a1714] text-base leading-snug mb-1 group-hover:opacity-70 transition-opacity">
                        {article.title}
                      </h2>
                      <p className="text-[#a09990] font-body text-xs leading-relaxed line-clamp-1">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                      <span className="text-[#c8c2ba] text-xs font-body whitespace-nowrap">
                        {article.readTime} دقیقه
                      </span>
                      <ChevronLeft size={14} className="text-[#c8c2ba] group-hover:text-[#1a1714] transition-colors" />
                    </div>
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
