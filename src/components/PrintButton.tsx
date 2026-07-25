"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

/**
 * دانلودِ PDFِ گواهی.
 *
 * به‌جای پرینتِ مرورگر (که چون سند با واحدِ container-query/cqw ساخته شده موقعِ
 * چاپ نامرئی می‌شد)، از روی همون DOMِ رندرشده روی صفحه — جایی که cqwها به پیکسل
 * تبدیل شدن — عکس می‌گیریم و یک فایلِ PDF واقعی می‌سازیم. html2canvas-pro برای
 * پشتیبانی از رنگ‌های مدرن (oklch) به‌جای html2canvas معمولی استفاده شده.
 */
export default function PrintButton({ fileName = "certificate" }: { fileName?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    const el = document.getElementById("certificate");
    if (!el) return;
    setBusy(true);
    setError("");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      // فونت‌ها باید کامل لود شده باشن وگرنه متن با فونتِ جایگزین عکس گرفته می‌شه
      if (document.fonts?.ready) await document.fonts.ready;

      const canvas = await html2canvas(el, {
        scale: Math.max(2, Math.min(3, 2400 / el.clientWidth)),
        backgroundColor: "#FAF6F1",
        useCORS: true,
        logging: false,
      });

      const img = canvas.toDataURL("image/jpeg", 0.95);
      // نسبتِ گواهی ۱٫۴۱۴:۱ = نسبتِ A4 افقی، پس تمامِ صفحه رو پر می‌کنه.
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, "JPEG", 0, 0, w, h);
      pdf.save(`${fileName}.pdf`);
    } catch (e) {
      console.error(e);
      setError("ساختِ PDF ناموفق بود. دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDownload}
        disabled={busy}
        className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-70 disabled:cursor-wait text-white font-body font-bold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {busy ? "در حال ساخت PDF…" : "دانلود PDF"}
      </button>
      {error && <span className="font-body text-xs text-rose-500">{error}</span>}
    </div>
  );
}
