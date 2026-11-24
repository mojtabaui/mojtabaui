"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send, X } from "lucide-react";
import { BrandGlyph } from "@/components/BrandMark";
import type { Lang } from "@/lib/i18n";

/**
 * مودال ثبت‌نام کارت‌به‌کارت.
 *
 * تا وقتی درگاه پرداخت نیست، این مودال جای آن را می‌گیرد: مبلغِ همان
 * دوره (با قیمت کمپین، اگر در جریان باشد)، شمارهٔ کارت، و فهرست چیزهایی
 * که بعد از پرداخت باید برای پشتیبانی فرستاده شود.
 *
 * `<dialog>` بومی است نه یک div: تله‌ی فوکوس، Esc و برگشتن فوکوس به دکمه
 * را خودِ مرورگر می‌دهد، و چون در لایهٔ بالایی صفحه رسم می‌شود هیچ
 * transform یا overflowِ والدی رویش اثر ندارد. کلاس `native-cursor` هم
 * برای همین است: نشانگر سفارشی سایت زیر این لایه می‌ماند.
 */

const CARD_NUMBER = "5041 7210 8543 7490";
const SUPPORT = "https://t.me/melina_support";

const COPY = {
  fa: {
    title: (c: string) => `ثبت‌نام در ${c}`,
    amount: "هزینهٔ ثبت‌نام",
    unit: "تومان",
    rial: (n: string) => `برابر با ${n} ریال`,
    pay: "این مبلغ رو به شمارهٔ کارت بالا کارت‌به‌کارت کن.",
    owner: "به نام مجتبی یزدان‌پناه",
    copy: "کپی شماره کارت",
    copied: "کپی شد",
    after: "بعد از پرداخت، این‌ها رو برای پشتیبانی بفرست",
    items: [
      "نام و نام خانوادگی فارسی",
      "نام و نام خانوادگی انگلیسی",
      "ایمیل",
      "شماره موبایل",
      "تصویر رسید پرداخت",
    ],
    send: "ارسال مشخصات در تلگرام",
    note: "بعد از تأیید پرداخت، اطلاعات دسترسی به دوره برات ارسال می‌شه.",
    ask: "قبل از پرداخت سؤال داری؟ بپرس",
    close: "بستن",
    message: (c: string, a: string) =>
      `سلام، مبلغ ${a} تومان رو برای ${c} کارت‌به‌کارت کردم.\n\n` +
      "نام و نام خانوادگی فارسی: \nنام و نام خانوادگی انگلیسی: \nایمیل: \nشماره موبایل: \n\n" +
      "تصویر رسید رو هم همین‌جا می‌فرستم.",
  },
  en: {
    title: (c: string) => `Enrol in ${c}`,
    amount: "Course fee",
    unit: "toman",
    rial: (n: string) => `Equal to ${n} rial`,
    pay: "Transfer this amount to the card above.",
    owner: "Mojtaba Yazdanpanah (مجتبی یزدان‌پناه)",
    copy: "Copy card number",
    copied: "Copied",
    after: "After paying, send these to support",
    items: [
      "Full name in Persian",
      "Full name in English",
      "Email",
      "Mobile number",
      "A photo of the payment receipt",
    ],
    send: "Send details on Telegram",
    note: "Once the payment is confirmed, we send your course access.",
    ask: "Question before paying? Ask us",
    close: "Close",
    message: (c: string, a: string) =>
      `Hi, I transferred ${a} toman for ${c}.\n\n` +
      "Full name in Persian: \nFull name in English: \nEmail: \nMobile number: \n\n" +
      "I will send the receipt photo here too.",
  },
} as const;

export type EnrollTheme = "robot" | "canary";

/** رنگ صحنه و کارت. روبوتایپ تک‌رنگ است؛ بقیهٔ دوره‌ها بنفشِ برند را دارند */
const THEME = {
  robot: { scene: "#0a0908", card: "#f4efe8", cardInk: "#1a1714", cardMute: "#6b6560", radius: "" },
  canary: { scene: "#E4DAD5", card: "#1a1714", cardInk: "#FAF6F1", cardMute: "rgba(250,246,241,.66)", radius: "rounded-2xl" },
} as const;

export default function EnrollModal({
  lang,
  course,
  amount,
  original,
  theme = "canary",
  onClose,
}: {
  lang: Lang;
  /** نام دوره، همان‌طور که وسط جمله می‌نشیند */
  course: string;
  /** تومان */
  amount: number;
  /** قیمت قبل از تخفیف؛ فقط اگر از `amount` بیشتر باشد خط‌خورده دیده می‌شود */
  original?: number;
  theme?: EnrollTheme;
  onClose: () => void;
}) {
  const t = COPY[lang];
  const c = THEME[theme];
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const n = (v: number) => v.toLocaleString(lang === "fa" ? "fa-IR" : "en-US");

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copyCard() {
    try {
      await navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ""));
      setCopied(true);
    } catch {
      // بدون دسترسی به کلیپ‌بورد، شماره همان‌جا قابل انتخاب است
    }
  }

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // کلیک روی خودِ dialog یعنی پس‌زمینه؛ محتوا داخل یک div است
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby="enroll-title"
      className={`enroll native-cursor fixed inset-x-0 bottom-0 top-auto m-0 max-h-[94dvh] w-full max-w-full overflow-y-auto overscroll-contain border-0 p-0 text-start font-body sm:inset-0 sm:m-auto sm:max-w-[460px] ${
        c.radius && "rounded-t-3xl sm:rounded-3xl"
      }`}
      style={{ background: "#FAF6F1", color: "#1a1714" }}
    >
      <style>{`
        .enroll::backdrop { background: rgba(10,9,8,.72); }
        @media (prefers-reduced-motion: no-preference) {
          .enroll .enroll-peek { animation: enroll-peek .5s cubic-bezier(.2,.9,.3,1) both; }
          @keyframes enroll-peek { from { transform: translateY(46%); } to { transform: none; } }
        }
      `}</style>

      <div>
        {/* ── صحنه: شخصیت از پشتِ کارت سرک می‌کشد ── */}
        <div className="relative overflow-hidden px-5 pb-6 pt-[132px] sm:px-7" style={{ background: c.scene }}>
          <div className="enroll-peek pointer-events-none absolute inset-x-0 top-0 h-[134px]" aria-hidden="true">
            {theme === "robot" ? <Robot /> : <Canary />}
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute end-3 top-3 z-20 flex size-11 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{ color: theme === "robot" ? "#f4efe8" : "#1a1714" }}
          >
            <X size={20} />
          </button>

          {/* خودِ کارت بانکی، با شمارهٔ واقعی */}
          <div className={`relative overflow-hidden p-5 sm:p-6 ${c.radius}`} style={{ background: c.card, color: c.cardInk }}>
            <div className="relative flex items-center justify-between">
              <Chip ink={c.cardInk} />
              <BrandGlyph size={34} style={{ color: c.cardInk }} />
            </div>
            <p
              dir="ltr"
              className="relative mt-6 select-all whitespace-nowrap text-center font-display text-[clamp(1.2rem,6.1vw,1.65rem)] font-bold tabular-nums tracking-[0.06em]"
            >
              {CARD_NUMBER}
            </p>
            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm" style={{ color: c.cardMute }}>
                {t.owner}
              </span>
              <button
                type="button"
                onClick={copyCard}
                className={`inline-flex min-h-10 items-center gap-2 px-3.5 text-sm font-bold transition-opacity hover:opacity-85 ${c.radius && "rounded-xl"}`}
                style={{ background: c.cardInk, color: c.card }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span aria-live="polite">{copied ? t.copied : t.copy}</span>
              </button>
            </div>
          </div>

          {/* انگشت‌ها/پاها روی لبهٔ کارت، جلوتر از خودش */}
          <div className="pointer-events-none absolute inset-x-0 top-[118px] z-10 h-8" aria-hidden="true">
            {theme === "robot" ? <Fingers /> : <Feet />}
          </div>
        </div>

        {/* ── متن ── */}
        <div className="px-5 pb-6 pt-6 sm:px-7 sm:pb-7">
          <h2 id="enroll-title" className="text-lg font-bold leading-[1.6]">
            {t.title(course)}
          </h2>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-y border-[#e8e2d9] py-3.5">
            <span className="text-sm text-[#6b6560]">{t.amount}</span>
            <span className="text-end">
              <span className="flex flex-wrap items-baseline justify-end gap-x-2.5">
                {original && original > amount ? (
                  <span className="text-sm text-[#6b6560] line-through">{n(original)}</span>
                ) : null}
                <span className="text-2xl font-bold">{n(amount)}</span>
                <span className="text-sm text-[#6b6560]">{t.unit}</span>
              </span>
              {/* اپ‌های بانکی ریال می‌گیرند؛ یک صفر کم، پرداختِ یک‌دهم است */}
              <span className="mt-0.5 block text-xs text-[#6b6560]">{t.rial(n(amount * 10))}</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#6b6560]">{t.pay}</p>

          <h3 className="mt-5 text-sm font-bold">{t.after}</h3>
          <ul className="mt-2.5 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
            {t.items.map((it) => (
              <li key={it} className="flex items-baseline gap-2.5 text-sm leading-7">
                <span className="size-1.5 shrink-0 -translate-y-0.5 bg-[#1a1714]" aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>

          <a
            href={`${SUPPORT}?text=${encodeURIComponent(t.message(course, n(amount)))}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 bg-[#1a1714] px-6 text-[0.95rem] font-bold text-[#FAF6F1] transition-opacity hover:opacity-88 ${c.radius}`}
          >
            <Send size={17} aria-hidden="true" />
            {t.send}
          </a>
          <p className="mt-3 text-center text-xs leading-6 text-[#6b6560]">{t.note}</p>
          <p className="mt-1 text-center">
            <a
              href={SUPPORT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 text-sm text-[#1a1714] underline underline-offset-4"
            >
              {t.ask}
            </a>
          </p>
        </div>
      </div>
    </dialog>
  );
}

/** تراشهٔ کارت */
function Chip({ ink }: { ink: string }) {
  return (
    <svg width="42" height="31" viewBox="0 0 42 31" fill="none" stroke={ink} strokeWidth="1.6" aria-hidden="true">
      <rect x="1" y="1" width="40" height="29" rx="5" />
      <path d="M1 11h13v9H1M41 11H28v9h13M14 1v29M28 1v29" opacity=".75" />
    </svg>
  );
}

/** کاغذ رسید با لبهٔ دندانه‌دار */
function Receipt({ transform, paper, ink }: { transform: string; paper: string; ink: string }) {
  return (
    <g transform={transform}>
      <path d="M0 0H50V66l-5-5-5 5-5-5-5 5-5-5-5 5-5-5-5 5-5-5-5 5Z" fill={paper} />
      <path d="M9 14h22M9 24h32M9 34h26" stroke={ink} strokeWidth="3" strokeLinecap="round" opacity=".28" />
      <path d="M17 47l6 6 11-12" stroke={ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

/* هر چهار نقاشی یک قاب دارند (۴۶۰ واحد، وسط‌چین) تا پشت و جلوی کارت جفت شوند */

function Robot() {
  return (
    <svg viewBox="0 0 460 134" className="absolute left-1/2 top-0 h-full w-[460px] max-w-none -translate-x-1/2">
      <defs>
        <radialGradient id="en-halo" cx=".5" cy=".62" r=".5">
          <stop offset="0" stopColor="#f4efe8" stopOpacity=".2" />
          <stop offset="1" stopColor="#f4efe8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="en-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d8a87" />
          <stop offset=".3" stopColor="#2b2a2a" />
          <stop offset=".62" stopColor="#0b0b0c" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="en-rim" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".16" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".84" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="#fff" stopOpacity=".95" />
        </linearGradient>
        <filter id="en-glow" x="-60%" y="-200%" width="220%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <ellipse cx="230" cy="92" rx="210" ry="120" fill="url(#en-halo)" />
      <circle cx="230" cy="112" r="98" fill="none" stroke="#f4efe8" strokeOpacity=".2" />
      <Receipt transform="translate(352 48) rotate(9)" paper="#f4efe8" ink="#1a1714" />
      <path
        d="M230 14c41 0 63 31 63 69 0 33-20 66-63 72-43-6-63-39-63-72 0-38 22-69 63-69Z"
        fill="url(#en-head)"
        stroke="url(#en-rim)"
        strokeWidth="2.5"
      />
      <path d="M200 27c16-11 44-11 60 0 6 12-4 27-30 27s-36-15-30-27Z" fill="#fff" opacity=".3" />
      <rect x="160" y="80" width="9" height="30" rx="4.5" fill="#1b1b1c" stroke="#fff" strokeOpacity=".35" />
      <rect x="291" y="80" width="9" height="30" rx="4.5" fill="#1b1b1c" stroke="#fff" strokeOpacity=".35" />
      {/* چشم‌ها: دو شکافِ افقی، مثل ربات خودِ صفحه */}
      <g fill="#fff">
        <g filter="url(#en-glow)" opacity=".85">
          <rect x="184" y="86" width="32" height="10" rx="3" />
          <rect x="244" y="86" width="32" height="10" rx="3" />
        </g>
        <rect x="184" y="86" width="32" height="10" rx="3" />
        <rect x="244" y="86" width="32" height="10" rx="3" />
      </g>
    </svg>
  );
}

function Fingers() {
  const hand = (x: number) =>
    [0, 15, 30, 45].map((d) => (
      <g key={d} transform={`translate(${x + d} ${d === 0 || d === 45 ? 5 : 2})`}>
        <rect width="12" height="25" rx="6" fill="#0d0d0e" />
        <path d="M3.4 6v11" stroke="#fff" strokeOpacity=".55" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M1 9.5h10" stroke="#fff" strokeOpacity=".16" />
      </g>
    ));
  return (
    <svg viewBox="0 0 460 32" className="absolute left-1/2 top-0 h-full w-[460px] max-w-none -translate-x-1/2">
      {hand(96)}
      {hand(307)}
    </svg>
  );
}

function Canary() {
  return (
    <svg viewBox="0 0 460 134" className="absolute left-1/2 top-0 h-full w-[460px] max-w-none -translate-x-1/2">
      <circle cx="222" cy="96" r="88" fill="#FAF6F1" opacity=".6" />
      {/* دم */}
      <path d="M190 103 132 121l11-13-15-5 60-18Z" fill="#5d40d8" />
      {/* تن و سر */}
      <path d="M182 100c-8-34 14-60 46-64 8-17 25-25 42-20 20 6 28 26 21 45 0 34-25 60-60 60-24 0-44-6-49-21Z" fill="#7c5cfc" />
      <path d="M214 119c26 5 56-8 68-33-2 20-22 37-50 37-7 0-13-1-18-4Z" fill="#FAF6F1" opacity=".35" />
      {/* بال */}
      <path d="M190 94c8-24 36-32 56-16-4 25-32 36-56 16Z" fill="#5d40d8" />
      <path d="M202 93c12 4 24 1 32-7M208 86c9 2 17 0 23-5" stroke="#FAF6F1" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* منقار و چشم */}
      <path d="M290 38l21 9-22 8Z" fill="#1a1714" />
      <circle cx="270" cy="38" r="6" fill="#1a1714" />
      <circle cx="272" cy="36" r="2" fill="#fff" />
      <Receipt transform="translate(302 47) rotate(7)" paper="#fff" ink="#1a1714" />
    </svg>
  );
}

function Feet() {
  return (
    <svg viewBox="0 0 460 32" className="absolute left-1/2 top-0 h-full w-[460px] max-w-none -translate-x-1/2">
      <g stroke="#1a1714" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M222 2v11M244 1v12" />
      </g>
      <g stroke="#7c5cfc" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M222 14v6M215 14v4M229 14v4M244 14v6M237 14v4M251 14v4" />
      </g>
    </svg>
  );
}
