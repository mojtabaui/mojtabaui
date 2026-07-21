"use client";

import { useState } from "react";
import { BellRing, Check } from "lucide-react";

export default function DiscountNotifyForm() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) {
      setError("شماره موبایلت رو وارد کن");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setDone(true);
      }
    } catch {
      setError("خطا در ارسال — دوباره تلاش کن");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 shadow-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Check size={22} />
        </div>
        <p className="font-body font-bold text-[#1a1714] mb-1">ثبت شد ✓</p>
        <p className="font-body text-sm text-[#6b6560] leading-relaxed">
          زمان تخفیف‌ها و ثبت‌نام‌های ویژه رو برات پیامک می‌کنیم.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center flex-shrink-0">
          <BellRing size={18} />
        </span>
        <div>
          <div className="font-body font-bold text-[#1a1714] text-sm">اطلاع از تخفیف‌ها</div>
          <div className="font-body text-xs text-[#a09990]">شماره‌ت رو بذار، خبرت می‌کنیم</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-body text-sm text-[#6b6560] mb-1.5">
            شماره موبایل
          </label>
          <input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xxxxxxxxx"
            className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors text-center tracking-widest"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-[#6b6560] mb-1.5">
            نام <span className="text-[#c8c2ba]">(اختیاری)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمت"
            className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
          />
        </div>

        {error && <p className="text-rose-500 text-xs font-body text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all"
        >
          {loading ? "در حال ثبت..." : "می‌خوام از تخفیف‌ها باخبر شم"}
        </button>

        <p className="text-[#a09990] font-body text-[11px] text-center leading-relaxed">
          فقط برای اطلاع‌رسانی تخفیف و دوره‌های جدید — اسپم نمی‌فرستیم.
        </p>
      </form>
    </div>
  );
}
