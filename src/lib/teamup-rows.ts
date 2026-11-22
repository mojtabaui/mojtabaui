import {
  GOAL_LABEL,
  HOURS_LABEL,
  MODE_LABEL,
  TEAM_SIZE_LABEL,
  TIME_LABEL,
  TRACK_LABEL,
  formatOffset,
  regionOf,
  skillLabels,
  type TeamupMode,
  type TeamupTrack,
} from "@/lib/teamup";

type Row = {
  track: string;
  fullName: string;
  contact: string;
  mode: string;
  region: string;
  city: string;
  timeSlots: string[];
  level: number | null;
  skills: string[];
  hoursPerWeek: string;
  teamSize: string;
  goal: string;
  partnerName: string;
  note: string;
  createdAt: Date;
};

/** پاسخ فارسی‌شده، با همون کلیدهای ستون‌های جدول و اکسل */
export function toDisplay(r: Row) {
  const t = r.track as TeamupTrack;
  const region = regionOf(r.region);
  const sk = skillLabels(t);
  return {
    track: TRACK_LABEL[t] ?? r.track,
    fullName: r.fullName,
    contact: r.contact,
    mode: MODE_LABEL[r.mode as TeamupMode] ?? r.mode,
    place: region ? [region.label, r.city].filter(Boolean).join(" — ") : "",
    offset: region && region.key !== "other" ? formatOffset(region.offset) : "",
    times: r.timeSlots.map((k) => TIME_LABEL[k] ?? k).join("، "),
    level: r.level ? `سطح ${r.level}` : "",
    skills: r.skills.map((k) => sk[k] ?? k).join("، "),
    hours: HOURS_LABEL[r.hoursPerWeek] ?? "",
    teamSize: TEAM_SIZE_LABEL[r.teamSize] ?? "",
    goal: GOAL_LABEL[r.goal] ?? "",
    partner: r.partnerName,
    note: r.note,
    date: r.createdAt,
  };
}

export type DisplayRow = ReturnType<typeof toDisplay>;

export const COLUMNS: { key: keyof DisplayRow; header: string; width: number }[] = [
  { key: "fullName", header: "نام", width: 22 },
  { key: "contact", header: "موبایل / تلگرام", width: 18 },
  { key: "track", header: "مسیر", width: 18 },
  { key: "mode", header: "تکی/گروهی", width: 11 },
  { key: "level", header: "سطح", width: 9 },
  { key: "place", header: "محل زندگی", width: 28 },
  { key: "offset", header: "اختلاف با ایران", width: 14 },
  { key: "times", header: "ساعت‌های آزاد (ایران)", width: 38 },
  { key: "hours", header: "ساعت در هفته", width: 16 },
  { key: "teamSize", header: "اندازهٔ تیم", width: 12 },
  { key: "goal", header: "هدف", width: 32 },
  { key: "skills", header: "مهارت‌ها", width: 40 },
  { key: "partner", header: "هم‌تیمی پیشنهادی", width: 20 },
  { key: "note", header: "توضیح", width: 36 },
  { key: "date", header: "تاریخ ثبت", width: 14 },
];
