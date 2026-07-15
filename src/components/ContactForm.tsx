"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("نام، ایمیل و پیام رو پر کن");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setSent(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setError("خطا در ارسال — دوباره تلاش کن");
    }

    setLoading(false);
  }

  if (sent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-4 py-8 text-sm font-body text-center">
        <p className="font-semibold mb-1">پیامت رسید ✓</p>
        <p className="text-emerald-700/70 text-xs">
          در اولین فرصت جوابت رو می‌دم.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-emerald-700 underline font-body text-xs mt-4 hover:text-emerald-800 transition-colors"
        >
          ارسال پیام دیگر
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm text-right">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-sm text-[#6b6560] mb-1.5">نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمت"
              className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-[#6b6560] mb-1.5">ایمیل</label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block font-body text-sm text-[#6b6560] mb-1.5">
            شماره تماس <span className="text-[#c8c2ba]">(اختیاری)</span>
          </label>
          <input
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xxxxxxxxx"
            className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-[#6b6560] mb-1.5">پیام</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="سوالت رو بنویس..."
            className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-rose-500 text-xs font-body text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all mt-1"
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </div>
  );
}
