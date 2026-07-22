import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateDocument from "@/components/CertificateDocument";
import PrintButton from "@/components/PrintButton";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ code: string }>;
}

/** ارقام فارسی/عربی و جداکننده‌ها را به شکل ذخیره‌شده برمی‌گرداند */
function normalize(raw: string) {
  return decodeURIComponent(raw)
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .toUpperCase()
    .replace(/[\s-]/g, "")
    .trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const cert = await prisma.certificate.findUnique({ where: { code: normalize(code) } });
  if (!cert) return { title: "گواهی یافت نشد | مدرسه دیزاین ملینا" };
  return {
    title: `گواهی ${cert.studentName} | مدرسه دیزاین ملینا`,
    description: `گواهی پایان دوره‌ی ${cert.studentName} با کد ${cert.code}`,
  };
}

export default async function CertificatePage({ params }: Props) {
  const { code } = await params;
  const cert = await prisma.certificate.findUnique({
    where: { code: normalize(code) },
  });
  if (!cert) notFound();

  // QR سمت سرور ساخته می‌شه و به‌صورت data URL جاسازی می‌شه، تا موقع چاپ
  // به هیچ درخواست شبکه‌ای وابسته نباشه.
  const qrDataUrl = await QRCode.toDataURL(
    `https://mojtabaui.ir/certificate/${cert.code}`,
    { margin: 0, width: 320, color: { dark: "#1a1714", light: "#ffffff" } }
  );

  return (
    <>
      <div className="no-print">
        <Navbar />
      </div>

      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          {/* نوار بالا */}
          <div className="no-print flex items-center justify-between gap-4 flex-wrap mb-8">
            <div>
              <Link
                href="/certificates"
                className="inline-flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body mb-4 transition-colors"
              >
                <ChevronLeft size={14} className="rotate-180" />
                استعلام گواهی دیگر
              </Link>
              <div className="flex items-center gap-2 text-emerald-600">
                <ShieldCheck size={17} />
                <span className="font-body font-bold text-sm">این گواهی معتبر است</span>
              </div>
            </div>

            <PrintButton />
          </div>

          {/* سند */}
          <div className="rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_30px_70px_-40px_rgba(26,23,20,0.5)] bg-white">
            <CertificateDocument cert={cert} qrDataUrl={qrDataUrl} />
          </div>

          <p className="no-print font-body text-xs text-[#a09990] text-center mt-6 leading-relaxed">
            برای ذخیره به صورت PDF، دکمه‌ی بالا را بزنید و در پنجره‌ی چاپ مقصد را روی
            «Save as PDF» بگذارید. اندازه‌ی کاغذ روی A4 افقی تنظیم شده است.
          </p>
        </section>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
