import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronLeft, Tag, Calendar, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import { articles } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const [lead, ...paragraphs] = article.body;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Hero */}
        <section
          className="pt-12 pb-16 relative overflow-hidden"
          style={{ backgroundColor: article.color }}
        >
          {/* واترمارک دسته‌بندی */}
          <div className="absolute -bottom-8 left-0 pointer-events-none select-none hidden md:block" aria-hidden>
            <ParallaxY speed={34}>
              <span
                className="font-display font-black leading-none block"
                style={{ fontSize: "9rem", color: article.accent, opacity: 0.07 }}
              >
                {article.tags[0]}
              </span>
            </ParallaxY>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body mb-10 transition-colors"
            >
              <ChevronLeft size={14} className="rotate-180" />
              بازگشت به مقالات
            </Link>

            <span
              className="inline-block text-[11px] font-body font-bold px-3 py-1 rounded-full mb-5 text-white"
              style={{ backgroundColor: article.accent }}
            >
              {article.category}
            </span>

            <h1 className="font-body font-black text-3xl md:text-[2.6rem] text-[#1a1714] leading-[1.35] mb-6">
              {article.title}
            </h1>

            <p className="font-body text-[#6b6560] text-lg leading-relaxed mb-7 max-w-2xl">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm font-body text-[#a09990] pt-5 border-t border-[#1a1714]/[0.07]">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime} دقیقه مطالعه
              </span>
              <span className="font-body text-[#6b6560]">مجتبا یزدانپناه</span>
            </div>
          </div>
        </section>

        {/* کاور مقاله */}
        {article.cover && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_28px_60px_-30px_rgba(26,23,20,0.45)] bg-[#f7f4ef]">
              <Image
                src={article.cover}
                alt=""
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
          <article>
            {/* پاراگراف اول به‌عنوان لید، درشت‌تر و پررنگ‌تر */}
            <p
              className="font-body text-[#1a1714] text-xl leading-[1.85] mb-8 pr-5 border-r-[3px]"
              style={{ borderColor: article.accent }}
            >
              {lead}
            </p>

            <div className="space-y-6">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-[#4a4540] font-body text-[1.0625rem] leading-[2]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* برچسب‌ها */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#e8e2d9]">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-body px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-white border border-[#e8e2d9] text-[#6b6560]"
              >
                <Tag size={9} style={{ color: article.accent }} />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA پایان مقاله */}
          <FadeIn><div
            className="mt-10 rounded-3xl p-8 border relative overflow-hidden"
            style={{ backgroundColor: article.color, borderColor: `${article.accent}26` }}
          >
            <h2 className="font-body font-black text-xl text-[#1a1714] leading-relaxed mb-2.5">
              سوالی برات پیش اومد؟
            </h2>
            <p className="font-body text-[#6b6560] text-sm leading-relaxed mb-6 max-w-lg">
              اگر جایی از این مطلب برات مبهم بود یا می‌خوای بدونی کدوم دوره به کارت میاد،
              در تلگرام بپرس. خودم جواب می‌دم.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://t.me/melina_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-body font-bold text-sm px-5 py-3 rounded-2xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: article.accent }}
              >
                <Send size={15} />
                پرسیدن در تلگرام
              </a>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm px-5 py-3 rounded-2xl bg-white/70 hover:bg-white transition-colors text-[#1a1714]"
              >
                دیدن دوره‌ها
                <ChevronLeft size={14} />
              </Link>
            </div>
          </div></FadeIn>

          {/* Related articles */}
          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#e8e2d9]">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990]">
                  KEEP READING
                </h2>
                <span className="h-px flex-1 bg-[#e8e2d9]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((other, i) => (
                  <FadeIn key={other.id} delay={i * 0.08}>
                  <Link
                    href={`/articles/${other.slug}`}
                    className="group bg-white border border-[#e8e2d9] rounded-2xl p-5 hover:border-[#1a1714]/20 hover:-translate-y-0.5 transition-all block relative overflow-hidden"
                  >
                    <span
                      className="absolute top-0 right-5 left-5 h-[3px] rounded-b-full"
                      style={{ backgroundColor: other.accent }}
                    />
                    <span
                      className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full mb-3 inline-block mt-1"
                      style={{ backgroundColor: other.color, color: other.accent }}
                    >
                      {other.category}
                    </span>
                    <h3 className="font-body font-bold text-[#1a1714] text-sm leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                      {other.title}
                    </h3>
                    <span className="text-[10px] font-body text-[#a09990] flex items-center gap-1">
                      <Clock size={9} />
                      {other.readTime} دقیقه
                    </span>
                  </Link>
                  </FadeIn>
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
