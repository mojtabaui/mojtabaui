import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Download, ChevronLeft, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Hero */}
        <section className="py-14" style={{ backgroundColor: article.color }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body mb-8 transition-colors"
            >
              <ChevronLeft size={14} className="rotate-180" />
              بازگشت به مقالات
            </Link>

            <div className="flex flex-wrap gap-2 mb-5">
              <span
                className="text-[11px] font-body font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: article.accent + "22", color: article.accent }}
              >
                {article.category}
              </span>
              {article.downloadFile && (
                <span
                  className="text-[11px] font-body font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: article.accent + "22", color: article.accent }}
                >
                  <Download size={10} />
                  دارای فایل دانلودی
                </span>
              )}
            </div>

            <h1 className="font-body font-bold text-3xl md:text-4xl text-[#1a1714] leading-tight mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-body text-[#a09990]">
              <span>{article.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {article.readTime} دقیقه مطالعه
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-body px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: article.accent + "15", color: article.accent }}
                >
                  <Tag size={8} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-[#4a4540] font-body text-base leading-[1.9]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Download box */}
          {article.downloadFile && (
            <div
              className="mt-12 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap"
              style={{ backgroundColor: article.color }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: article.accent + "22" }}
                >
                  <Download size={18} style={{ color: article.accent }} />
                </div>
                <div>
                  <div className="font-body font-semibold text-[#1a1714] text-sm">
                    {article.downloadFile.name}
                  </div>
                  <div className="text-[#a09990] text-xs font-body mt-0.5">
                    {article.downloadFile.size} — رایگان
                  </div>
                </div>
              </div>
              <a
                href={article.downloadFile.url}
                className="inline-flex items-center gap-2 text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
                style={{ backgroundColor: article.accent }}
              >
                دانلود رایگان
                <Download size={14} />
              </a>
            </div>
          )}

          {/* Related articles */}
          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#e8e2d9]">
              <h2 className="font-body font-bold text-lg text-[#1a1714] mb-5">مقالات دیگه</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {others.map((other) => (
                  <Link
                    key={other.id}
                    href={`/articles/${other.slug}`}
                    className="rounded-2xl p-5 hover:opacity-90 transition-opacity block"
                    style={{ backgroundColor: other.color }}
                  >
                    <span
                      className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full mb-3 inline-block"
                      style={{ backgroundColor: other.accent + "22", color: other.accent }}
                    >
                      {other.category}
                    </span>
                    <h3 className="font-body font-semibold text-[#1a1714] text-sm leading-snug mb-2">
                      {other.title}
                    </h3>
                    <span className="text-[10px] font-body text-[#a09990] flex items-center gap-1">
                      <Clock size={9} />
                      {other.readTime} دقیقه
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
