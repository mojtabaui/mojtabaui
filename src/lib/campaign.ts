/**
 * کمپین: بنرِ شمارش معکوسِ صفحهٔ اصلی + قیمتِ کمپینیِ هر دوره.
 *
 * این فایل خالصه (بدون دیتابیس) تا هم سرور و هم کامپوننت‌های کلاینت
 * ازش استفاده کنن. خوندن از دیتابیس توی campaign.server.ts هست.
 *
 * سه مرحله داره:
 *   upcoming → هنوز شروع نشده؛ بنر «تا شروع کمپین» رو می‌شمره
 *   live     → شروع شده؛ بنر «تا پایان کمپین» رو می‌شمره و قیمت‌ها کمپینی‌ان
 *   ended    → تموم شده؛ نه بنر هست نه تخفیف
 */

import type { Course } from "@/lib/mock-data";

export interface CampaignInfo {
  id: string;
  title: string;
  subtitle: string;
  /** ISO — بعد از کش سریالایز می‌شه، پس Date نگه نمی‌داریم */
  startsAt: string;
  endsAt: string;
  active: boolean;
  /** شناسهٔ دوره → قیمت کمپین به تومان */
  prices: Record<string, number>;
}

export type CampaignPhase = "upcoming" | "live" | "ended";

export function campaignPhase(c: Pick<CampaignInfo, "startsAt" | "endsAt">, now: number): CampaignPhase {
  if (now < Date.parse(c.startsAt)) return "upcoming";
  if (now < Date.parse(c.endsAt)) return "live";
  return "ended";
}

/**
 * از بین کمپین‌های فعال، اونی که الان باید دیده بشه: اگه یکی در جریانه
 * همون، وگرنه نزدیک‌ترینِ آینده.
 */
export function pickCampaign(list: CampaignInfo[], now: number): CampaignInfo | null {
  const open = list.filter((c) => c.active && campaignPhase(c, now) !== "ended");
  return (
    open.find((c) => campaignPhase(c, now) === "live") ??
    open.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))[0] ??
    null
  );
}

/**
 * قیمت کمپین رو فقط وقتی کمپین در جریانه روی دوره می‌ذاره. قیمتِ قبلی
 * می‌ره توی originalPrice تا کارت‌ها و صفحهٔ دوره خط‌خورده نشونش بدن
 * و درصد تخفیف خودش حساب بشه.
 */
export function applyCampaignPrices<T extends Course>(
  list: T[],
  campaign: CampaignInfo | null,
  now: number,
): T[] {
  if (!campaign || campaignPhase(campaign, now) !== "live") return list;
  return list.map((c) => applyCampaignPrice(c, campaign, now));
}

export function applyCampaignPrice<T extends Course>(
  course: T,
  campaign: CampaignInfo | null,
  now: number,
): T {
  if (!campaign || campaignPhase(campaign, now) !== "live") return course;
  const p = campaign.prices[course.id];
  if (!p || p <= 0 || p >= course.price) return course;
  return { ...course, price: p, originalPrice: course.originalPrice ?? course.price };
}

// ─── تاریخ شمسی ⇄ زمان واقعی (ساعت تهران) ───────────────────────────
//
// ادمین تاریخ رو شمسی و ساعت رو به وقت تهران وارد می‌کنه. سرور Vercel
// روی UTC هست، پس تبدیل باید صریحاً با منطقهٔ Asia/Tehran انجام بشه،
// نه با منطقهٔ زمانیِ هر جایی که کد داره اجرا می‌شه.

const TEHRAN = "Asia/Tehran";

const div = (a: number, b: number) => ~~(a / b);
const mod = (a: number, b: number) => a - ~~(a / b) * b;

// الگوریتم jalaali-js (کالِندر بیرونی، ۳۳ ساله)
const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394,
  2456, 3178,
];

function jalCal(jy: number) {
  const gy = jy + 621;
  let leapJ = -14;
  let jp = BREAKS[0];
  let jump = 0;
  for (let i = 1; i < BREAKS.length; i++) {
    const jm = BREAKS[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  const n = jy - jp;
  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  return { gy, march: 20 + leapJ - leapG };
}

function g2d(gy: number, gm: number, gd: number) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

function jalaliToGregorian(jy: number, jm: number, jd: number) {
  const r = jalCal(jy);
  return d2g(g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1);
}

export interface JalaliParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

/** یک لحظه → تاریخ و ساعتِ شمسی به وقت تهران */
export function toTehranParts(date: Date | string | number): JalaliParts {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
    timeZone: TEHRAN,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(date));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute") };
}

/**
 * تاریخ شمسی + ساعت تهران → لحظهٔ واقعی. اگه تاریخ وجود نداشته باشه
 * (مثلاً ۳۱ مهر یا ۳۰ اسفندِ سال غیرکبیسه) null برمی‌گردونه.
 */
export function fromTehranParts(p: JalaliParts): Date | null {
  const { year, month, day, hour, minute } = p;
  if (![year, month, day, hour, minute].every(Number.isInteger)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  const g = jalaliToGregorian(year, month, day);
  // حدس اول با +۳:۳۰، بعد با چیزی که Intl برای تهران می‌گه اصلاح می‌شه
  const wall = Date.UTC(g.gy, g.gm - 1, g.gd, hour, minute);
  let guess = wall - 210 * 60_000;
  const back = toTehranParts(guess);
  const backG = jalaliToGregorian(back.year, back.month, back.day);
  const backWall = Date.UTC(backG.gy, backG.gm - 1, backG.gd, back.hour, back.minute);
  guess += wall - backWall;

  // تاریخ ناموجود رو Intl به روز بعد می‌بره؛ با رفت‌وبرگشت پیداش می‌کنیم
  const check = toTehranParts(guess);
  if (check.year !== year || check.month !== month || check.day !== day) return null;
  return new Date(guess);
}

/** «۱۱ آبان ۱۴۰۵، ساعت ۱۸:۰۰» */
export function formatTehran(date: Date | string | number): string {
  const d = new Date(date);
  const day = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TEHRAN,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("fa-IR", {
    timeZone: TEHRAN,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(d);
  return `${day}، ساعت ${time}`;
}
