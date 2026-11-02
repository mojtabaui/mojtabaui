"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, X } from "lucide-react";
import { fromTehranParts, toTehranParts, formatTehran, type CampaignInfo } from "@/lib/campaign";
import { PERSIAN_MONTHS, toLatinDigits, toPersianDigits } from "@/lib/persian-months";

export interface CampaignCourseOption {
  id: string;
  title: string;
  price: number;
}

interface DateField {
  year: string;
  month: string;
  day: string;
  time: string;
}

function toField(iso: string | null, fallbackHour: number): DateField {
  const p = toTehranParts(iso ?? Date.now());
  return {
    year: String(p.year),
    month: String(p.month),
    day: String(p.day),
    time: iso
      ? `${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`
      : `${String(fallbackHour).padStart(2, "0")}:00`,
  };
}

function fieldToDate(f: DateField): Date | null {
  const [h, m] = toLatinDigits(f.time).split(":").map(Number);
  return fromTehranParts({
    year: Number(toLatinDigits(f.year)),
    month: Number(f.month),
    day: Number(toLatinDigits(f.day)),
    hour: h,
    minute: m,
  });
}

/** «۵٬۰۰۰٬۰۰۰» یا «5,000,000» → 5000000 */
function parseToman(v: string): number {
  const n = Number(toLatinDigits(v).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const toman = (n: number) => `${n.toLocaleString("fa-IR")} تومان`;

/**
 * ساخت یا ویرایش کمپین.
 *
 * تاریخ شمسی و ساعت به وقت تهران وارد می‌شه و همین‌جا به لحظهٔ واقعی
 * تبدیل می‌شه؛ زیر هر تاریخ همون چیزی نوشته می‌شه که روی سایت حساب می‌شه
 * تا اشتباهِ روز و ماه قبل از ذخیره دیده بشه.
 */
export default function CampaignForm({
  courses,
  initial,
  onDone,
}: {
  courses: CampaignCourseOption[];
  initial?: CampaignInfo;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [start, setStart] = useState<DateField>(() => toField(initial?.startsAt ?? null, 10));
  const [end, setEnd] = useState<DateField>(() => toField(initial?.endsAt ?? null, 23));
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      courses.map((c) => [c.id, initial?.prices[c.id] ? initial.prices[c.id].toLocaleString("fa-IR") : ""]),
    ),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const startDate = useMemo(() => fieldToDate(start), [start]);
  const endDate = useMemo(() => fieldToDate(end), [end]);

  const field =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-3 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] transition-colors";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!startDate) return setError("تاریخ شروع وجود نداره؛ روز و ماه رو چک کن");
    if (!endDate) return setError("تاریخ پایان وجود نداره؛ روز و ماه رو چک کن");
    if (endDate <= startDate) return setError("پایان کمپین باید بعد از شروعش باشه");

    const priceMap: Record<string, number> = {};
    for (const c of courses) {
      const n = parseToman(prices[c.id] ?? "");
      if (!n) continue;
      if (n >= c.price) return setError(`قیمت کمپینِ «${c.title}» از قیمت فعلیش کمتر نیست`);
      priceMap[c.id] = n;
    }

    setBusy(true);
    try {
      const res = await fetch(initial ? `/api/admin/campaigns/${initial.id}` : "/api/admin/campaigns", {
        method: initial ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          startsAt: startDate.toISOString(),
          endsAt: endDate.toISOString(),
          active: initial?.active ?? true,
          prices: priceMap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "ذخیره نشد");
      } else {
        if (!initial) {
          setTitle("");
          setSubtitle("");
          setPrices(Object.fromEntries(courses.map((c) => [c.id, ""])));
        }
        router.refresh();
        onDone?.();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setBusy(false);
  }

  // تابع رندر، نه کامپوننت: کامپوننتِ تعریف‌شده داخل کامپوننت با هر
  // تایپ از نو mount می‌شد و فوکوس از کادر می‌پرید.
  function dateInputs(
    label: string,
    value: DateField,
    onChange: (v: DateField) => void,
    resolved: Date | null,
  ) {
    return (
      <fieldset>
        <legend className="font-body text-xs text-[var(--ink-3)] mb-2">{label}</legend>
        <div className="grid grid-cols-[1fr_1.6fr_1.2fr_1.3fr] gap-2">
          <input
            inputMode="numeric"
            aria-label={`${label}، روز`}
            placeholder="روز"
            value={value.day}
            onChange={(e) => onChange({ ...value, day: e.target.value })}
            className={field + " text-center"}
          />
          <select
            aria-label={`${label}، ماه`}
            value={value.month}
            onChange={(e) => onChange({ ...value, month: e.target.value })}
            className={field}
          >
            {PERSIAN_MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1)}>
                {m}
              </option>
            ))}
          </select>
          <input
            inputMode="numeric"
            aria-label={`${label}، سال`}
            placeholder="سال"
            value={value.year}
            onChange={(e) => onChange({ ...value, year: e.target.value })}
            className={field + " text-center"}
          />
          <input
            type="time"
            aria-label={`${label}، ساعت`}
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
            className={field + " text-center"}
            dir="ltr"
          />
        </div>
        <p className="font-body text-[11px] mt-1.5 min-h-[1rem]">
          {resolved ? (
            <span className="text-[var(--ink-4)]">{formatTehran(resolved)} به وقت تهران</span>
          ) : (
            <span className="text-[var(--danger)]">این تاریخ وجود نداره</span>
          )}
        </p>
      </fieldset>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="font-body text-xs text-[var(--ink-3)] mb-2 block">عنوان روی بنر</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً کمپین یلدا"
            className={field}
          />
        </label>
        <label className="block">
          <span className="font-body text-xs text-[var(--ink-3)] mb-2 block">
            توضیح کوتاه <span className="text-[var(--ink-4)]">(اختیاری)</span>
          </span>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="مثلاً تا ۴۰٪ تخفیف روی دوره‌های آفلاین"
            className={field}
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {dateInputs("شروع کمپین", start, setStart, startDate)}
        {dateInputs("پایان کمپین", end, setEnd, endDate)}
      </div>

      <div>
        <p className="font-body text-xs text-[var(--ink-3)] mb-1">قیمت دوره‌ها در کمپین</p>
        <p className="font-body text-[11px] text-[var(--ink-4)] mb-3 leading-5">
          خالی یعنی اون دوره توی کمپین تخفیف نداره. قیمت کمپینی فقط از لحظهٔ شروع
          تا پایان روی سایت می‌شینه و قیمت قبلی خط‌خورده کنارش نشون داده می‌شه.
        </p>
        <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-xl overflow-hidden">
          {courses.map((c) => {
            const n = parseToman(prices[c.id] ?? "");
            const pct = n && n < c.price ? Math.round((1 - n / c.price) * 100) : 0;
            const invalid = n > 0 && n >= c.price;
            return (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 flex-wrap sm:flex-nowrap">
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-[var(--ink)] truncate">{c.title}</p>
                  <p className="font-body text-[11px] text-[var(--ink-4)]">قیمت فعلی: {toman(c.price)}</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    inputMode="numeric"
                    dir="ltr"
                    aria-label={`قیمت کمپینِ ${c.title} به تومان`}
                    placeholder="بدون تخفیف"
                    value={prices[c.id] ?? ""}
                    onChange={(e) => setPrices((p) => ({ ...p, [c.id]: e.target.value }))}
                    onBlur={() =>
                      setPrices((p) => ({ ...p, [c.id]: n ? n.toLocaleString("fa-IR") : "" }))
                    }
                    className={`${field} sm:w-44 text-left ${invalid ? "!border-[var(--warn)]" : ""}`}
                  />
                  <span className="font-body text-xs w-14 shrink-0 text-start">
                    {invalid ? (
                      <span className="text-[var(--warn)]">بیشتره</span>
                    ) : pct ? (
                      <span className="text-[var(--ok)]">{toPersianDigits(pct)}٪</span>
                    ) : (
                      <span className="text-[var(--ink-faint)]">—</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {error && <p className="font-body text-sm text-[var(--warn)]">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 bg-[var(--violet-deep)] hover:opacity-90 disabled:opacity-50 text-white font-body text-sm rounded-xl px-5 py-2.5 transition-opacity"
        >
          <Megaphone size={15} />
          {busy ? "در حال ذخیره…" : initial ? "ذخیرهٔ تغییرات" : "ساخت کمپین"}
        </button>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--ink-3)] hover:text-[var(--ink)] px-3 py-2.5"
          >
            <X size={14} />
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}
