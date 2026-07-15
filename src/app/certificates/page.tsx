import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateLookup from "@/components/CertificateLookup";

export const metadata: Metadata = {
  title: "استعلام گواهی | مدرسه دیزاین ملینا",
  description: "اعتبار گواهی دوره‌های مدرسه دیزاین ملینا را با کد گواهی بررسی کنید.",
};

export default function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">
        <section className="dot-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                CERTIFICATE
              </div>
              <h1 className="font-body font-bold text-4xl md:text-5xl text-[#1a1714] mb-3">
                استعلام گواهی
              </h1>
              <p className="text-[#a09990] font-body text-base max-w-md mx-auto">
                کد گواهیت رو وارد کن تا اعتبارش رو بررسی کنیم
              </p>
            </div>

            <CertificateLookup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
