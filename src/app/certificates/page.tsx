import type { Metadata } from "next";
import { ShieldCheck, ScanLine, BadgeCheck, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import CertificateLookup from "@/components/CertificateLookup";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";

export const metadata: Metadata = {
  title: "استعلام گواهی | مدرسه دیزاین ملینا",
  description: "اعتبار گواهی دوره‌های مدرسه دیزاین ملینا را با کد گواهی بررسی کنید.",
};

const steps = [
  {
    Icon: ScanLine,
    title: "کد رو از روی گواهی بردار",
    desc: "روی هر گواهی یک کد یکتا چاپ شده. همون رو کپی کن.",
  },
  {
    Icon: BadgeCheck,
    title: "توی کادر واردش کن",
    desc: "اعداد فارسی، حروف کوچک و خط تیره هم قبوله. خودمون مرتبش می‌کنیم.",
  },
  {
    Icon: ShieldCheck,
    title: "نتیجه رو ببین",
    desc: "اگر گواهی معتبر باشه، نام دانشجو و دوره‌ش رو نشون می‌دیم.",
  },
];

export default function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg pt-16 pb-10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <ParallaxY speed={50}>
              <span
                className="font-display font-black leading-none block text-[#1a1714]"
                style={{ fontSize: "clamp(7rem, 20vw, 15rem)", opacity: 0.035 }}
              >
                VERIFY
              </span>
            </ParallaxY>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
            <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
              CERTIFICATE
            </div>
            <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
              استعلام گواهی
            </h1>
            <p className="text-[#6b6560] font-body text-lg max-w-lg mx-auto leading-relaxed">
              هر گواهی ملینا یک کد یکتا داره. کد رو وارد کن تا اعتبارش رو همین‌جا ببینی.
            </p>
          </div>
        </section>

        {/* Lookup + info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* مراحل و راهنمای کد — سمت راست در RTL */}
            <div>
              <div className="space-y-4 mb-8">
                {steps.map(({ Icon, title, desc }, i) => (
                  <FadeIn key={title} delay={i * 0.08}>
                  <div
                    className="flex items-start gap-4 bg-white border border-[#e8e2d9] rounded-2xl p-5"
                  >
                    <span className="w-11 h-11 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-black text-xs text-[#c8c2ba]">
                          {["۰۱", "۰۲", "۰۳"][i]}
                        </span>
                        <h2 className="font-body font-bold text-sm text-[#1a1714]">{title}</h2>
                      </div>
                      <p className="font-body text-sm text-[#6b6560] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  </FadeIn>
                ))}
              </div>

              {/* نمونه گواهی */}
              <FadeIn delay={0.24}>
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_24px_50px_-30px_rgba(26,23,20,0.45)] bg-white">
                  <Image
                    src="/images/certificate-sample.jpg"
                    alt="نمونه گواهی مدرسه دیزاین ملینا"
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>

            {/* فرم استعلام — سمت چپ در RTL */}
            <div className="lg:sticky lg:top-24">
              <CertificateLookup />

              <div className="mt-6 bg-white border border-[#e8e2d9] rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Send size={16} />
                </span>
                <div>
                  <h3 className="font-body font-bold text-sm text-[#1a1714] mb-1">
                    کدت جواب نداد؟
                  </h3>
                  <p className="font-body text-sm text-[#6b6560] leading-relaxed mb-3">
                    اگر مطمئنی کد درسته ولی پیدا نشد، یک پیام بده تا دستی بررسیش کنم.
                  </p>
                  <a
                    href="https://t.me/melina_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-xs text-[#7c5cfc] hover:text-[#5b3fd4] transition-colors"
                  >
                    پیام در تلگرام
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
