"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  callbackUrl: string;
  registered: boolean;
}

export default function LoginForm({ callbackUrl, registered }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("ایمیل یا رمز عبور اشتباه است");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-xl bg-[#1a1714] flex items-center justify-center">
              <span className="text-white font-body font-bold text-xs">m</span>
            </div>
            <span className="font-body font-bold text-[#1a1714]">mojtabaui</span>
          </Link>
          <h1 className="font-body font-bold text-2xl text-[#1a1714] mb-1">خوش برگشتی</h1>
          <p className="text-[#a09990] font-body text-sm">وارد حسابت شو و دوره‌هاتو ببین</p>
        </div>

        {registered && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-body mb-4 text-center">
            ثبت‌نام موفق بود — الان وارد شو
          </div>
        )}

        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">ایمیل</label>
              <input
                type="email"
                placeholder="example@email.com"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-body text-sm text-[#6b6560]">رمز عبور</label>
                <a href="#" className="text-[#7c5cfc] hover:text-[#5b3fd4] font-body text-xs transition-colors">فراموشی رمز</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <label className="flex items-center gap-2 text-[#a09990] font-body text-xs cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#7c5cfc] w-3.5 h-3.5"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              مرا به خاطر بسپار
            </label>

            {error && (
              <p className="text-rose-500 text-xs font-body text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all mt-1"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#a09990] font-body text-sm mt-6">
          حساب نداری؟{" "}
          <Link href="/auth/register" className="text-[#1a1714] font-semibold hover:text-[#7c5cfc] transition-colors">
            ثبت‌نام کن
          </Link>
        </p>
      </div>
    </div>
  );
}
