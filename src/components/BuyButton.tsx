"use client";

// درگاه پرداخت و حساب کاربری فعلاً غیرفعالن. دکمه مودال کارت‌به‌کارت رو باز
// می‌کنه و مشخصات بعد از پرداخت برای پشتیبانی تلگرام فرستاده می‌شه.
// برای برگردوندن خرید مستقیم: بلاک پرداختِ کامنت‌شده‌ی پایین رو جایگزین این نسخه کن.

import { useState } from "react";
import { useLang } from "@/components/Providers";
import EnrollModal from "@/components/EnrollModal";
import { FORMS } from "@/lib/i18n/dict/forms";

interface Props {
  slug: string;
  title: string;
  /** تومان؛ اگه کمپین در جریانه، قیمت کمپینی */
  price: number;
  originalPrice?: number;
  comingSoon?: boolean;
  externalUrl?: string;
}

export default function BuyButton({ title, price, originalPrice, comingSoon }: Props) {
  const lang = useLang();
  const t = FORMS[lang].buy;
  const [open, setOpen] = useState(false);

  if (comingSoon) {
    return (
      <div className="mb-3">
        <button
          disabled
          className="w-full flex items-center justify-center bg-[#e8e2d9] text-[#a09990] font-body font-semibold py-3.5 rounded-2xl text-sm cursor-not-allowed"
        >
          {t.closed}
        </button>
        <p className="text-center text-[#a09990] text-xs font-body mt-2">
          {t.closedNote}
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="w-full flex items-center justify-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold py-3.5 rounded-2xl transition-all mb-3 text-sm"
      >
        {t.enroll}
      </button>
      {open && (
        <EnrollModal
          lang={lang}
          course={title}
          amount={price}
          original={originalPrice}
          onClose={() => setOpen(false)}
        />
      )}
    </>
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
