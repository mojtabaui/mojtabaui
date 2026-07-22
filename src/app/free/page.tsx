import Link from "next/link";
import { Play, ArrowLeft, Mic, FileText, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { freeResources } from "@/lib/mock-data";

const courses  = freeResources.filter((r) => r.type === "course");
const voices   = freeResources.filter((r) => r.type === "voice");
const files    = freeResources.filter((r) => r.type === "file");

export default function FreePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Hero */}
        <section className="dot-bg-dark bg-[#1a1714] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-body text-xs text-white/70">همه چیز رایگان، بدون ثبت‌نام</span>
              </div>
              <h1 className="font-body font-extrabold text-4xl md:text-5xl text-white leading-tight mb-5">
                آموزش‌های رایگان
              </h1>
              <p className="text-white/50 font-body text-lg leading-relaxed">
                ویدیو، ویس و فایل آماده. بردار و استفاده کن.
              </p>
            </div>
          </div>
        </section>

        {/* Free Course */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center flex-shrink-0"><Play size={18} /></span>
            <div>
              <h2 className="font-body font-bold text-xl text-[#1a1714]">دوره رایگان</h2>
              <p className="text-[#a09990] text-xs font-body">ویدیوهای آموزشی بدون نیاز به ثبت‌نام</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Free Voices */}
        <section className="py-16 bg-white border-y border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-10 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center flex-shrink-0"><Mic size={18} /></span>
              <div>
                <h2 className="font-body font-bold text-xl text-[#1a1714]">ویس‌های رایگان</h2>
                <p className="text-[#a09990] text-xs font-body">پادکست‌های کوتاه برای شنیدن در مسیر</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {voices.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Free Files */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center flex-shrink-0"><FileText size={18} /></span>
            <div>
              <h2 className="font-body font-bold text-xl text-[#1a1714]">فایل‌های رایگان</h2>
              <p className="text-[#a09990] text-xs font-body">تمپلیت، کیت و چک‌لیست آماده</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#f7f4ef] border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-body font-bold text-2xl text-[#1a1714] mb-3">
              می‌خوای عمیق‌تر یاد بگیری؟
            </h2>
            <p className="text-[#a09990] font-body text-sm mb-6 max-w-md mx-auto">
              دوره‌های بی‌نهایت شامل ویدیو کامل، منتورینگ ۱۰ هفته‌ای و پروژه واقعیه.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold px-7 py-3.5 rounded-2xl transition-all"
            >
              مشاهده دوره‌ها
              <ArrowLeft size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ResourceCard({ item }: { item: (typeof freeResources)[0] }) {
  const isVoice = item.type === "voice";
  const isCourse = item.type === "course";

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{ backgroundColor: item.color }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* آیکون برداری به‌جای ایموجی — ایموجی روی هر سیستم فرق می‌کنه و با توکن رنگی کنترل نمی‌شه */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: item.accent + "18", color: item.accent }}
        >
          {isCourse ? <Play size={18} /> : isVoice ? <Mic size={18} /> : <FileText size={18} />}
        </div>
        <span
          className="text-[10px] font-body px-2.5 py-1 rounded-full mt-1"
          style={{ backgroundColor: item.accent + "18", color: item.accent }}
        >
          {item.meta}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-body font-bold text-[#1a1714] text-sm leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-[#6b6560] text-xs font-body leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* فعلاً همه‌ی منابع از طریق پشتیبانی تلگرام تحویل داده می‌شن، پس متن دکمه هم
          همون کاری رو می‌گه که واقعاً اتفاق می‌افته (نه «دانلود» که فایل مستقیم بده) */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 text-white font-body font-semibold text-xs px-4 py-2.5 rounded-xl transition-all w-full hover:opacity-90"
        style={{ backgroundColor: item.accent }}
      >
        <Send size={12} />
        {isCourse ? "دریافت در تلگرام" : isVoice ? "گوش بده در تلگرام" : "دریافت در تلگرام"}
      </a>
    </div>
  );
}
