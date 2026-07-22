"use client";

import { Download } from "lucide-react";

/** چاپ مرورگر، که مقصدش می‌تونه Save as PDF باشه */
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-bold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <Download size={16} />
      دانلود PDF
    </button>
  );
}
