/**
 * تسک‌های دوره‌های آفلاین — از همون پلنر هفتگیِ خود سایت خونده می‌شن،
 * نه از یک فهرست جدا. یعنی اگه پلنر عوض شه، این هم عوض می‌شه و هیچ‌وقت
 * دو تا نسخهٔ ناهماهنگ نداریم.
 *
 * تیک خوردن هر تسک یعنی **منتور بررسی‌اش کرده**، نه اینکه دانشجو تحویل داده.
 *
 * ⚠️ شناسه‌ها (id) از ترتیب تسک‌ها در پلنر ساخته می‌شن و توی دیتابیس ذخیره
 * می‌شن. اگه تسکی رو از وسط پلنر حذف کنی، تیک‌های بعدش یکی جابه‌جا می‌شن.
 * اضافه کردن به آخر هر هفته بی‌خطره.
 */
import { planners } from "@/lib/planner";

export type Task = {
  /** شناسهٔ ثابت در محدودهٔ همون دوره — توی دیتابیس همین عدد ذخیره می‌شه */
  id: number;
  week: number;
  title: string;
  desc?: string;
  /** این تسک یکی از چند گزینهٔ جایگزینه، نه یک تسک مستقل */
  alternative: boolean;
};

export type Track = "UI" | "UX";

function build(track: Track): Task[] {
  const planner = planners[track.toLowerCase() as "ui" | "ux"];
  const out: Task[] = [];
  let id = 0;

  planner.weeks.forEach((w, weekIndex) => {
    w.tasks.forEach((t, taskIndex) => {
      id += 1;
      out.push({
        id,
        week: weekIndex + 1,
        title: t.title,
        desc: t.desc,
        // وقتی هفته حالت «یکی رو انتخاب کن» داره، گزینه‌های بعد از اولی جایگزین‌ان
        alternative: Boolean(w.either) && taskIndex > 0,
      });
    });
  });

  return out;
}

const CACHE: Record<Track, Task[]> = { UI: build("UI"), UX: build("UX") };

export function tasksFor(track: Track): Task[] {
  return CACHE[track];
}

export function taskCount(track: Track): number {
  return CACHE[track].length;
}

/** بیشترین تعداد تسک بین دو دوره — برای اعتبارسنجی سمت سرور */
export const MAX_TASK_ID = Math.max(CACHE.UI.length, CACHE.UX.length);

/** تسک‌های یک دوره را هفته‌به‌هفته گروه می‌کند */
export function tasksByWeek(track: Track): { week: number; tasks: Task[] }[] {
  const map = new Map<number, Task[]>();
  for (const t of CACHE[track]) {
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
