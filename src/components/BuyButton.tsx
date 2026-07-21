"use client";

// ثبت‌نام موقتاً از طریق پشتیبانی تلگرام انجام می‌شه — درگاه پرداخت و حساب کاربری
// فعلاً غیرفعالن و فروش کارت‌به‌کارت از طریق پشتیبانی انجام می‌شه.
// برای برگردوندن خرید مستقیم: بلاک پرداختِ کامنت‌شده‌ی پایین رو جایگزین این نسخه کن.

const SUPPORT_TELEGRAM = "https://t.me/melina_support";

interface Props {
  slug: string;
  comingSoon?: boolean;
  externalUrl?: string;
}

export default function BuyButton({ comingSoon }: Props) {
  if (comingSoon) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center bg-[#e8e2d9] text-[#a09990] font-body font-semibold py-3.5 rounded-2xl text-sm cursor-not-allowed mb-3"
      >
        به زودی
      </button>
    );
  }

  return (
    <a
      href={SUPPORT_TELEGRAM}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold py-3.5 rounded-2xl transition-all mb-3 text-sm"
    >
      ثبت‌نام و مشاوره در تلگرام
    </a>
  );
}

/* ── خریدِ مستقیم (موقتاً غیرفعال) ─────────────────────────────────────────
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function BuyButtonPayment({ slug, comingSoon, externalUrl }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (comingSoon) {
    return (
      <button disabled className="w-full flex items-center justify-center bg-[#e8e2d9] text-[#a09990] font-body font-semibold py-3.5 rounded-2xl text-sm cursor-not-allowed mb-3">
        به زودی
      </button>
    );
  }

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold py-3.5 rounded-2xl transition-all mb-3 text-sm">
        خرید از اسپات‌پلیر
      </a>
    );
  }

  async function handleBuy() {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/courses/${slug}`);
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/payment/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    setError(data.error || "خطا در اتصال به درگاه پرداخت");
    setLoading(false);
  }

  return (
    <div>
      <button onClick={handleBuy} disabled={loading} className="w-full flex items-center justify-center bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all mb-3 text-sm">
        {loading ? "در حال انتقال به درگاه..." : !session ? "ورود و خرید دوره" : "خرید دوره"}
      </button>
      {error && <p className="text-rose-500 text-xs font-body text-center mt-1">{error}</p>}
    </div>
  );
}
──────────────────────────────────────────────────────────────────────────── */
