"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { setError("پذیرش قوانین الزامی است"); return; }
    if (form.password.length < 8) { setError("رمز عبور باید حداقل ۸ کاراکتر باشد"); return; }
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "خطایی رخ داد");
      return;
    }

    router.push("/auth/login?registered=1");
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-xl bg-[#1a1714] flex items-center justify-center">
              <span className="text-white font-body font-bold text-xs">m</span>
            </div>
            <span className="font-body font-bold text-[#1a1714]">mojtabaui</span>
          </Link>
          <h1 className="font-body font-bold text-2xl text-[#1a1714] mb-1">بیا شروع کنیم</h1>
          <p className="text-[#a09990] font-body text-sm">حساب رایگان بساز و یاد بگیر</p>
        </div>

        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">نام و نام‌خانوادگی</label>
              <input
                type="text"
                placeholder="مثلاً علی احمدی"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">ایمیل</label>
              <input
                type="email"
                placeholder="example@email.com"
                dir="ltr"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">شماره موبایل</label>
              <input
                type="tel"
                placeholder="09xxxxxxxxx"
                dir="ltr"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">رمز عبور</label>
              <input
                type="password"
                placeholder="حداقل ۸ کاراکتر"
                dir="ltr"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <label className="flex items-start gap-2 text-[#a09990] font-body text-xs cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#7c5cfc] mt-0.5 flex-shrink-0"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                با{" "}
                <a href="#" className="text-[#7c5cfc] hover:text-[#5b3fd4] transition-colors">قوانین و مقررات</a>
                {" "}سایت موافقم
              </span>
            </label>

            {error && (
              <p className="text-rose-500 text-xs font-body text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all mt-1"
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#a09990] font-body text-sm mt-6">
          قبلاً ثبت‌نام کردی؟{" "}
          <Link href="/auth/login" className="text-[#1a1714] font-semibold hover:text-[#7c5cfc] transition-colors">
            وارد شو
          </Link>
        </p>
      </div>
    </div>
  );
}
