/**
 * تسک‌های دوره‌های آفلاین — هشت هفته، هر هفته چند تسک.
 *
 * تیک خوردن هر تسک یعنی **منتور بررسی‌اش کرده**، نه اینکه دانشجو تحویل داده.
 * پس ستون تسک‌ها وضعیتِ کارِ منتور رو نشون می‌ده، نه پیشرفت دانشجو رو.
 *
 * ⚠️ فهرست پایین هنوز موقتیه. وقتی ریز تسک‌های واقعی رسید، فقط همین
 * آرایه رو عوض کن؛ بقیهٔ کد (API، جدول، فیلترها) خودش تطبیق پیدا می‌کنه.
 * فقط حواست باشه id‌ها رو عوض نکنی، چون توی دیتابیس ذخیره شدن.
 */

export type Task = {
  /** شناسهٔ ثابت — توی دیتابیس همین عدد ذخیره می‌شه */
  id: number;
  week: number;
  title: string;
};

export const WEEK_COUNT = 8;

export const TASKS: Task[] = [
  { id: 1, week: 1, title: "تسک ۱" },
  { id: 2, week: 1, title: "تسک ۲" },
  { id: 3, week: 2, title: "تسک ۳" },
  { id: 4, week: 2, title: "تسک ۴" },
  { id: 5, week: 3, title: "تسک ۵" },
  { id: 6, week: 3, title: "تسک ۶" },
  { id: 7, week: 4, title: "تسک ۷" },
  { id: 8, week: 4, title: "تسک ۸" },
  { id: 9, week: 5, title: "تسک ۹" },
  { id: 10, week: 5, title: "تسک ۱۰" },
  { id: 11, week: 6, title: "تسک ۱۱" },
  { id: 12, week: 6, title: "تسک ۱۲" },
  { id: 13, week: 7, title: "تسک ۱۳" },
  { id: 14, week: 7, title: "تسک ۱۴" },
  { id: 15, week: 8, title: "تسک ۱۵" },
  { id: 16, week: 8, title: "تسک ۱۶" },
];

export const TASK_COUNT = TASKS.length;

/** تسک‌ها را هفته‌به‌هفته گروه می‌کند */
export function tasksByWeek(): { week: number; tasks: Task[] }[] {
  const map = new Map<number, Task[]>();
  for (const t of TASKS) {
    if (!map.has(t.week)) map.set(t.week, []);
    map.get(t.week)!.push(t);
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([week, tasks]) => ({ week, tasks }));
}

export const GOAL_LABEL: Record<string, string> = {
  UNKNOWN: "نگفته",
  LEARNING: "یادگیری و ارتقا",
  EMPLOYMENT: "استخدام",
  FREELANCE: "فریلنس",
  BOTH: "استخدام و فریلنس",
};

export const GOAL_VALUES = ["UNKNOWN", "LEARNING", "EMPLOYMENT", "FREELANCE", "BOTH"] as const;
