/**
 * فرم ترجیح پروژه (تکی یا گروهی) — تنظیمات مشترک بین فرم، API و پنل.
 * کلیدها توی دیتابیس می‌شینن؛ برچسب‌ها فقط برای نمایش و اکسلن.
 */

export type TeamupTrack = "UI" | "UX";
export type TeamupMode = "SOLO" | "GROUP";

export const TRACK_SLUG: Record<string, TeamupTrack> = { ui: "UI", ux: "UX" };

export const TRACK_LABEL: Record<TeamupTrack, string> = {
  UI: "طراحی رابط کاربری",
  UX: "طراحی تجربه کاربری",
};

export const MODE_LABEL: Record<TeamupMode, string> = {
  SOLO: "تکی",
  GROUP: "گروهی",
};

/**
 * محل زندگی. offset اختلاف تقریبی با تهران به دقیقه‌ست (مثبت یعنی جلوتر از ایران).
 * ساعت تابستانی و زمستانی بعضی جاها فرق می‌کنه، پس «حدود» است و برای
 * جور کردن تایم‌هاست، نه حساب دقیق.
 */
export const REGIONS = [
  { key: "iran", label: "ایران", offset: 0 },
  { key: "afghanistan", label: "افغانستان", offset: 60 },
  { key: "gulf_uae", label: "امارات و عمان", offset: 30 },
  { key: "gulf_other", label: "عراق، قطر، عربستان، کویت", offset: -30 },
  { key: "turkey", label: "ترکیه", offset: -30 },
  { key: "europe_east", label: "اروپای شرقی (اوکراین، یونان، رومانی…)", offset: -90 },
  { key: "europe_central", label: "اروپای مرکزی (آلمان، فرانسه، ایتالیا، هلند، سوئد…)", offset: -150 },
  { key: "uk", label: "بریتانیا و پرتغال", offset: -210 },
  { key: "na_east", label: "آمریکا و کانادا — ساحل شرقی", offset: -510 },
  { key: "na_central", label: "آمریکا و کانادا — مرکز", offset: -570 },
  { key: "na_west", label: "آمریکا و کانادا — ساحل غربی", offset: -690 },
  { key: "australia", label: "استرالیا", offset: 450 },
  { key: "other", label: "جای دیگر", offset: 0 },
] as const;

export type RegionKey = (typeof REGIONS)[number]["key"];

export function regionOf(key: string) {
  return REGIONS.find((r) => r.key === key);
}

/** «+۱:۳۰» یا «−۲:۳۰» برای نمایش */
export function formatOffset(minutes: number): string {
  if (minutes === 0) return "هم‌ساعت";
  const sign = minutes > 0 ? "+" : "−";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${h}:${String(m).padStart(2, "0")}`;
}

/** تایم‌هایی که می‌تونه وقت بذاره، به ساعت ایران */
export const TIME_SLOTS = [
  { key: "MORNING", label: "صبح تا ظهر", hint: "حدود ۸ تا ۱۲" },
  { key: "NOON", label: "ظهر تا عصر", hint: "حدود ۱۲ تا ۱۷" },
  { key: "EVENING", label: "عصر تا شب", hint: "حدود ۱۷ تا ۲۳" },
] as const;

export const TIME_LABEL: Record<string, string> = Object.fromEntries(
  TIME_SLOTS.map((s) => [s.key, `${s.label} (${s.hint})`])
);

/** سطح‌ها. هر دو مسیر چهار سطح دارن و هر فرم سطح مسیر خودش رو می‌پرسه */
export const LEVELS: Record<TeamupTrack, { value: number; title: string; body: string }[]> = {
  UI: [
    { value: 1, title: "سطح ۱", body: "تازه شروع کردم" },
    { value: 2, title: "سطح ۲", body: "آموزش دیدم، ولی هنوز پروژهٔ تمرینی نزدم" },
    { value: 3, title: "سطح ۳", body: "آموزش دیدم و پروژهٔ تمرینی هم دارم" },
    { value: 4, title: "سطح ۴", body: "آموزش دیدم و روی پروژهٔ واقعی هم کار کردم" },
  ],
  UX: [
    { value: 1, title: "سطح ۱", body: "تازه شروع کردم" },
    { value: 2, title: "سطح ۲", body: "آموزش دیدم، ولی هنوز پروژهٔ تمرینی نزدم" },
    { value: 3, title: "سطح ۳", body: "آموزش دیدم و پروژهٔ تمرینی هم دارم" },
    { value: 4, title: "سطح ۴", body: "آموزش دیدم و روی پروژهٔ واقعی هم کار کردم" },
  ],
};

/** سؤال مهارت: برای UI ابزار و کار، برای UX روش‌های پژوهش و طراحی */
export const SKILLS: Record<TeamupTrack, { question: string; options: { key: string; label: string }[] }> = {
  UI: {
    question: "کدوم‌ها رو توی فیگما راحت انجام می‌دی؟",
    options: [
      { key: "autolayout", label: "Auto Layout" },
      { key: "components", label: "کامپوننت و ویریانت" },
      { key: "variables", label: "متغیرها و استایل‌ها" },
      { key: "prototype", label: "پروتوتایپ و انیمیشن" },
      { key: "designsystem", label: "ساخت دیزاین سیستم" },
      { key: "responsive", label: "طراحی ریسپانسیو" },
      { key: "handoff", label: "تحویل به برنامه‌نویس" },
    ],
  },
  UX: {
    question: "کدوم‌ها رو قبلاً انجام دادی؟",
    options: [
      { key: "interview", label: "مصاحبهٔ کاربری" },
      { key: "survey", label: "پرسشنامه" },
      { key: "persona", label: "پرسونا و نقشهٔ سفر کاربر" },
      { key: "ia", label: "معماری اطلاعات" },
      { key: "wireframe", label: "وایرفریم" },
      { key: "usability", label: "تست کاربردپذیری" },
      { key: "analysis", label: "تحلیل و جمع‌بندی یافته‌ها" },
    ],
  },
};

export const HOURS = [
  { key: "lt5", label: "کمتر از ۵ ساعت" },
  { key: "5-10", label: "۵ تا ۱۰ ساعت" },
  { key: "10-15", label: "۱۰ تا ۱۵ ساعت" },
  { key: "gt15", label: "بیشتر از ۱۵ ساعت" },
] as const;

export const GOALS = [
  { key: "portfolio", label: "یک نمونه‌کار جدی برای پرتفولیو" },
  { key: "experience", label: "تجربهٔ کار تیمی واقعی" },
  { key: "learn", label: "یاد گرفتن از بقیه" },
  { key: "job", label: "آماده شدن برای مصاحبهٔ کاری" },
] as const;

const labelMap = (list: readonly { key: string; label: string }[]) =>
  Object.fromEntries(list.map((x) => [x.key, x.label]));

export const HOURS_LABEL = labelMap(HOURS);
export const GOAL_LABEL = labelMap(GOALS);

export function skillLabels(track: TeamupTrack): Record<string, string> {
  return labelMap(SKILLS[track].options);
}
