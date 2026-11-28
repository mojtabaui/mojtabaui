"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ClipboardCheck, Copy, Play, Search, Trash2, X } from "lucide-react";
import { toLatinDigits, toPersianDigits } from "@/lib/persian-months";
import {
  INFINITY_COURSES,
  WEEKS,
  WEEK_COUNT,
  applyWeek,
  courseLabel,
} from "@/lib/infinity-progress";

export type InfinityStudentView = {
  id: string;
  name: string;
  phone: string;
  course: string;
  videosDone: number[];
  tasksDone: number[];
  note: string;
  teamGroup: number | null;
  topic: string;
  fileLink: string;
};

type Kind = "video" | "task";
type Progress = Pick<InfinityStudentView, "videosDone" | "tasksDone">;

const fa = toPersianDigits;

const COURSE_BADGE: Record<string, string> = {
  "ui-infinity": "text-[var(--violet)] border-[var(--violet-deep)]/30 bg-[var(--violet-deep)]/10",
  "ux-infinity": "text-[var(--ok)] border-[var(--ok)]/30 bg-[var(--ok)]/10",
};

/**
 * ماتریس پیگیری: هر ردیف یک دانشجو، هر ستون یک هفته، و توی هر خونه دو تیک —
 * ویدیوی اون هفته و تسک اون هفته.
 *
 * تیک‌ها همون لحظه روی صفحه می‌شینن و پشت‌سرهم (نه موازی) برای سرور می‌رن؛
 * اگه سرور رد کنه، همون تیک برمی‌گرده و خطا بالا نشون داده می‌شه.
 */
export default function InfinityBoard({ students }: { students: InfinityStudentView[] }) {
  const [q, setQ] = useState("");
  const [course, setCourse] = useState<string>("all");
  const [onlyBehind, setOnlyBehind] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState("");
  // تیک‌های محلی روی داده‌ای که از سرور اومده؛ بعد از refresh هم با سرور یکی‌ان
  const [local, setLocal] = useState<Record<string, Progress>>({});
  const queue = useRef<Promise<void>>(Promise.resolve());

  const view = (s: InfinityStudentView): InfinityStudentView => ({ ...s, ...local[s.id] });

  function toggle(s: InfinityStudentView, kind: Kind, week: number) {
    const cur = view(s);
    const key = kind === "video" ? "videosDone" : "tasksDone";
    const done = !cur[key].includes(week);
    setError("");
    setLocal((l) => {
      const base = l[s.id] ?? { videosDone: s.videosDone, tasksDone: s.tasksDone };
      return { ...l, [s.id]: { ...base, [key]: applyWeek(base[key], week, done) } };
    });

    queue.current = queue.current.then(async () => {
      try {
        const res = await fetch(`/api/admin/infinity/${s.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, week, done }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "ذخیره نشد");
        }
      } catch (e) {
        // فقط همین یک تیک برمی‌گرده، بقیهٔ تیک‌های اخیر سر جاشون می‌مونن
        setLocal((l) => {
          const base = l[s.id] ?? { videosDone: s.videosDone, tasksDone: s.tasksDone };
          return { ...l, [s.id]: { ...base, [key]: applyWeek(base[key], week, !done) } };
        });
        setError(
          `تیک ${s.name} (هفتهٔ ${fa(week)}) ذخیره نشد — ${
            e instanceof Error ? e.message : "خطا در ارتباط با سرور"
          }`
        );
      }
    });
  }

  const rows = useMemo(() => {
    const term = q.trim();
    return students
      .map((s) => ({ ...s, ...local[s.id] }))
      .filter((s) => (course === "all" ? true : s.course === course))
      .filter((s) => (term ? s.name.includes(term) || s.phone.includes(term) : true))
      .filter((s) =>
        onlyBehind ? s.videosDone.length < WEEK_COUNT || s.tasksDone.length < WEEK_COUNT : true
      );
  }, [students, local, q, course, onlyBehind]);

  // فقط «نام + شمارهٔ گروه» برای شیر کردن؛ مرتب بر اساس گروه، کسانی که گروه ندارن نمیان
  const [copied, setCopied] = useState(false);
  const shareText = rows
    .filter((s) => s.teamGroup !== null)
    .sort((a, b) => a.teamGroup! - b.teamGroup!)
    .map((s) => `${s.name} — گروه ${fa(s.teamGroup!)}`)
    .join("\n");

  async function copyGroups() {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("کپی نشد — مرورگر اجازهٔ دسترسی به کلیپ‌بورد نداد");
    }
  }

  // آمار روی همین فهرستِ فیلترشده
  const n = rows.length;
  const videoSum = rows.reduce((a, s) => a + s.videosDone.length, 0);
  const taskSum = rows.reduce((a, s) => a + s.tasksDone.length, 0);
  const pct = (sum: number) => (n ? Math.round((sum / (n * WEEK_COUNT)) * 100) : 0);
  const finished = rows.filter(
    (s) => s.videosDone.length === WEEK_COUNT && s.tasksDone.length === WEEK_COUNT
  ).length;
  const weekVideo = WEEKS.map((w) => rows.filter((s) => s.videosDone.includes(w)).length);
  const weekTask = WEEKS.map((w) => rows.filter((s) => s.tasksDone.includes(w)).length);

  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-1 focus:ring-[var(--violet)]/40 transition-colors";

  const hasFilter = Boolean(q.trim() || course !== "all" || onlyBehind);

  return (
    <>
      {/* ── آمار ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <Stat label={hasFilter ? "در این فیلتر" : "کل دانشجوها"} value={fa(n)} tone="var(--ink)" />
        <Stat label="میانگین ویدیو دیده‌شده" value={`${fa(pct(videoSum))}٪`} tone="var(--info)" />
        <Stat label="میانگین تسک انجام‌شده" value={`${fa(pct(taskSum))}٪`} tone="var(--ok)" />
        <Stat label="هر ده هفته را تمام کرده" value={fa(finished)} tone="var(--violet)" />
      </div>

      {/* ── فیلتر ── */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-center">
        <div className="relative">
          <Search
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)] pointer-events-none"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="جستجوی نام یا موبایل"
            placeholder="نام یا موبایل"
            className={`${inputCls} pr-10`}
          />
        </div>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          aria-label="دوره"
          className={inputCls}
        >
          <option value="all">همهٔ دوره‌ها</option>
          {INFINITY_COURSES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label} بی‌نهایت
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 font-body text-sm text-[var(--ink-3)] cursor-pointer select-none px-1">
          <input
            type="checkbox"
            checked={onlyBehind}
            onChange={(e) => setOnlyBehind(e.target.checked)}
            className="w-4 h-4 accent-[var(--violet-deep)]"
          />
          فقط ناتمام‌ها
        </label>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start justify-between gap-3 bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-xl px-4 py-3"
        >
          <p className="font-body text-sm text-[var(--danger)] leading-6">{error}</p>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="بستن پیام"
            className="text-[var(--danger)] p-0.5 shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── راهنما ── */}
      <div className="flex items-center gap-5 flex-wrap mb-3 font-body text-xs text-[var(--ink-3)]">
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-5 rounded-md grid place-items-center border border-[var(--info)]/50 bg-[var(--info)]/15 text-[var(--info)]">
            <Play size={10} fill="currentColor" />
          </span>
          ویدیوی هفته دیده شده
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-5 rounded-md grid place-items-center border border-[var(--ok)]/50 bg-[var(--ok)]/15 text-[var(--ok)]">
            <ClipboardCheck size={11} />
          </span>
          تسک هفته انجام شده
        </span>
        <button
          type="button"
          onClick={copyGroups}
          disabled={!shareText}
          className="mr-auto flex items-center gap-1.5 font-body text-xs px-3 py-1.5 rounded-lg border border-[var(--line-strong)] text-[var(--ink-2,var(--ink-3))] hover:border-[var(--violet)] hover:text-[var(--violet)] disabled:opacity-40 disabled:hover:border-[var(--line-strong)] disabled:hover:text-[var(--ink-3)] transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "کپی شد" : "کپی نام و گروه‌ها"}
        </button>
      </div>

      {/* ── ماتریس ── */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
        {rows.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <p className="font-body text-[var(--ink-4)] text-sm">
              {hasFilter
                ? "کسی با این فیلترها پیدا نشد"
                : "هنوز دانشجویی ثبت نشده — از دکمهٔ بالا فهرست رو بچسبون"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] lg:min-w-0 border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky right-0 z-10 bg-[var(--card)] border-b border-[var(--line)] px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal w-[170px]"
                  >
                    دانشجو
                  </th>
                  {WEEKS.map((w) => (
                    <th
                      key={w}
                      scope="col"
                      className="border-b border-[var(--line)] px-0.5 py-2 font-body font-normal"
                    >
                      <div className="text-xs text-[var(--ink-3)]" title={`هفتهٔ ${fa(w)}`}>ه{fa(w)}</div>
                      <div className="mt-1 flex items-center justify-center gap-1 text-[10px]">
                        <span
                          className="flex items-center gap-0.5 text-[var(--info)]"
                          title={`ویدیوی هفتهٔ ${fa(w)}: ${fa(weekVideo[w - 1])} از ${fa(n)} نفر`}
                        >
                          <Play size={8} fill="currentColor" />
                          {fa(weekVideo[w - 1])}
                        </span>
                        <span
                          className="flex items-center gap-0.5 text-[var(--ok)]"
                          title={`تسک هفتهٔ ${fa(w)}: ${fa(weekTask[w - 1])} از ${fa(n)} نفر`}
                        >
                          <ClipboardCheck size={9} />
                          {fa(weekTask[w - 1])}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="border-b border-[var(--line)] px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal w-[100px]"
                  >
                    جمع
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[var(--line)] px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal w-[14%]"
                  >
                    موضوع
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[var(--line)] px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal w-[14%]"
                  >
                    لینک فایل
                  </th>
                  <th className="border-b border-[var(--line)] w-10" />
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => {
                  const open = openId === s.id;
                  const source = students.find((x) => x.id === s.id)!;
                  return (
                    <Fragment key={s.id}>
                      <tr className="group">
                        <th
                          scope="row"
                          className="sticky right-0 z-10 bg-[var(--card)] group-hover:bg-[var(--card-raised)] border-b border-[var(--line)] px-3 py-2.5 text-right font-normal transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`shrink-0 font-body text-[10px] px-1.5 py-0.5 rounded-md border ${
                                COURSE_BADGE[s.course] ?? ""
                              }`}
                            >
                              {INFINITY_COURSES.find((c) => c.slug === s.course)?.short ?? "؟"}
                            </span>
                            <span className="min-w-0">
                              <span className="block font-body text-sm text-[var(--ink)] truncate max-w-[125px]">
                                {s.name}
                              </span>
                              {s.teamGroup !== null && (
                                <span className="block font-body text-[10px] text-[var(--violet)]">
                                  گروه {fa(s.teamGroup)}
                                </span>
                              )}
                              {s.note && (
                                <span className="block font-body text-[10px] text-[var(--warn)] truncate max-w-[125px]">
                                  {s.note}
                                </span>
                              )}
                            </span>
                          </div>
                        </th>

                        {WEEKS.map((w) => {
                          const v = s.videosDone.includes(w);
                          const t = s.tasksDone.includes(w);
                          return (
                            <td
                              key={w}
                              className={`border-b border-[var(--line)] px-0.5 py-2 text-center transition-colors group-hover:bg-[var(--card-raised)] ${
                                v && t ? "bg-[var(--ok)]/[0.06]" : ""
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <Tick
                                  on={v}
                                  tone="info"
                                  label={`ویدیوی هفتهٔ ${fa(w)} — ${s.name}`}
                                  onClick={() => toggle(source, "video", w)}
                                >
                                  <Play size={11} fill={v ? "currentColor" : "none"} />
                                </Tick>
                                <Tick
                                  on={t}
                                  tone="ok"
                                  label={`تسک هفتهٔ ${fa(w)} — ${s.name}`}
                                  onClick={() => toggle(source, "task", w)}
                                >
                                  <ClipboardCheck size={12} />
                                </Tick>
                              </div>
                            </td>
                          );
                        })}

                        <td className="border-b border-[var(--line)] px-2 py-2 group-hover:bg-[var(--card-raised)] transition-colors">
                          <Bar label="ویدیو" value={s.videosDone.length} tone="var(--info)" />
                          <Bar label="تسک" value={s.tasksDone.length} tone="var(--ok)" />
                        </td>

                        <td className="border-b border-[var(--line)] px-2 py-2 group-hover:bg-[var(--card-raised)] transition-colors">
                          <CellInput
                            studentId={s.id}
                            field="topic"
                            initial={source.topic}
                            label={`موضوع ${s.name}`}
                            placeholder="موضوع"
                            onError={setError}
                          />
                        </td>
                        <td className="border-b border-[var(--line)] px-2 py-2 group-hover:bg-[var(--card-raised)] transition-colors">
                          <CellInput
                            studentId={s.id}
                            field="fileLink"
                            initial={source.fileLink}
                            label={`لینک فایل ${s.name}`}
                            placeholder="https://…"
                            ltr
                            onError={setError}
                          />
                        </td>

                        <td className="border-b border-[var(--line)] px-1 group-hover:bg-[var(--card-raised)] transition-colors">
                          <button
                            type="button"
                            onClick={() => setOpenId(open ? null : s.id)}
                            aria-expanded={open}
                            aria-label={`مشخصات و یادداشت ${s.name}`}
                            className="text-[var(--ink-4)] hover:text-[var(--ink-3)] p-2 rounded-md transition-colors"
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${open ? "rotate-180" : ""}`}
                            />
                          </button>
                        </td>
                      </tr>

                      {open && (
                        <tr>
                          <td
                            colSpan={WEEK_COUNT + 5}
                            className="bg-[var(--card-raised)] border-b border-[var(--line)] px-4 py-4"
                          >
                            <StudentDetail
                              student={source}
                              onDeleted={() => setOpenId(null)}
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/** خونهٔ متنی که خودت دستی پر می‌کنی؛ با خارج شدن از خونه ذخیره می‌شه */
function CellInput({
  studentId,
  field,
  initial,
  label,
  placeholder,
  ltr,
  onError,
}: {
  studentId: string;
  field: "topic" | "fileLink";
  initial: string;
  label: string;
  placeholder: string;
  ltr?: boolean;
  onError: (msg: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(initial);

  async function save() {
    const next = value.trim();
    if (next === saved) return;
    try {
      const res = await fetch(`/api/admin/infinity/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        onError(data.error || "ذخیره نشد");
        return;
      }
      setSaved(next);
      setValue(next);
    } catch {
      onError("خطا در ارتباط با سرور");
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      dir={ltr ? "ltr" : undefined}
      size={1}
      title={value}
      aria-label={label}
      placeholder={placeholder}
      className={`w-full min-w-0 bg-[var(--page)] border border-[var(--line-strong)]/50 focus:border-[var(--violet)] rounded-lg px-2.5 py-1.5 font-body text-xs text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors ${
        ltr ? "text-left" : ""
      }`}
    />
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
      <p className="font-body text-xs text-[var(--ink-4)]">{label}</p>
      <p className="font-body text-lg mt-0.5" style={{ color: tone }}>
        {value}
      </p>
    </div>
  );
}

/** یک تیک. رنگ فقط تأکیده؛ آیکن و حالت پرشده هم تفاوت روشن/خاموش رو می‌رسونن */
function Tick({
  on,
  tone,
  label,
  onClick,
  children,
}: {
  on: boolean;
  tone: "info" | "ok";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const onCls =
    tone === "info"
      ? "bg-[var(--info)]/15 border-[var(--info)]/60 text-[var(--info)]"
      : "bg-[var(--ok)]/15 border-[var(--ok)]/60 text-[var(--ok)]";
  const offCls =
    tone === "info"
      ? "border-[var(--line-strong)]/60 text-[var(--ink-4)] hover:border-[var(--info)] hover:text-[var(--info)]"
      : "border-[var(--line-strong)]/60 text-[var(--ink-4)] hover:border-[var(--ok)] hover:text-[var(--ok)]";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={`w-7 h-6 rounded-md border grid place-items-center transition-colors focus-visible:outline-2 focus-visible:outline-[var(--violet)] ${
        on ? onCls : offCls
      }`}
    >
      {children}
    </button>
  );
}

function Bar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center gap-2 my-0.5">
      <span className="font-body text-[10px] text-[var(--ink-4)] w-7 shrink-0">{label}</span>
      <div className="h-1.5 flex-1 rounded-full bg-[var(--line)] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${(value / WEEK_COUNT) * 100}%`, backgroundColor: tone }}
        />
      </div>
      <span className="font-body text-[10px] text-[var(--ink-3)] w-9 text-left shrink-0">
        {fa(value)}/{fa(WEEK_COUNT)}
      </span>
    </div>
  );
}

/** مشخصات، یادداشت و حذف — با باز کردن ردیف دیده می‌شه تا ماتریس شلوغ نشه */
function StudentDetail({
  student,
  onDeleted,
}: {
  student: InfinityStudentView;
  onDeleted: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState(student.phone);
  const [note, setNote] = useState(student.note);
  const [group, setGroup] = useState(student.teamGroup === null ? "" : String(student.teamGroup));
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  async function patch(payload: Record<string, unknown>) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/infinity/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "ذخیره نشد");
      } else {
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setSaving(false);
  }

  async function remove() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/infinity/${student.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "حذف نشد");
        setSaving(false);
        setConfirming(false);
        return;
      }
      onDeleted();
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
      setSaving(false);
      setConfirming(false);
    }
  }

  const field =
    "w-full bg-[var(--page)] border border-[var(--line-strong)]/70 focus:border-[var(--violet)] rounded-xl px-3 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors disabled:opacity-60";
  const labelCls = "block font-body text-xs text-[var(--ink-4)] mb-1.5";
  const id = (s: string) => `${s}-${student.id}`;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
        <div>
          <label htmlFor={id("name")} className={labelCls}>
            نام
          </label>
          <input
            id={id("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name.trim() && name.trim() !== student.name && patch({ name })}
            disabled={saving}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelCls}>
            موبایل
          </label>
          <input
            id={id("phone")}
            dir="ltr"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => phone.trim() !== student.phone && patch({ phone })}
            disabled={saving}
            placeholder="09…"
            className={`${field} text-left`}
          />
        </div>
        <div>
          <label htmlFor={id("group")} className={labelCls}>
            شمارهٔ گروه
          </label>
          <input
            id={id("group")}
            dir="ltr"
            inputMode="numeric"
            value={group}
            onChange={(e) => setGroup(toLatinDigits(e.target.value).replace(/\D/g, "").slice(0, 3))}
            onBlur={() => {
              const next = group === "" ? null : Number(group);
              if (next !== student.teamGroup) patch({ teamGroup: next });
            }}
            disabled={saving}
            placeholder="مثلاً ۹۰"
            className={`${field} text-left w-28`}
          />
        </div>
        <div>
          <label htmlFor={id("course")} className={labelCls}>
            دوره
          </label>
          <select
            id={id("course")}
            value={student.course}
            onChange={(e) => patch({ course: e.target.value })}
            disabled={saving}
            className={`${field} cursor-pointer`}
          >
            {INFINITY_COURSES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {courseLabel(c.slug)} بی‌نهایت
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={id("note")} className={labelCls}>
          یادداشت <span className="text-[var(--ink-4)]">(زیر اسمش توی جدول دیده می‌شه)</span>
        </label>
        <textarea
          id={id("note")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => note.trim() !== student.note && patch({ note })}
          disabled={saving}
          rows={2}
          placeholder="مثلاً: هفتهٔ ۴ رو با تأخیر تحویل داد"
          className={`${field} resize-y leading-6`}
        />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        {error ? (
          <span role="alert" className="font-body text-xs text-[var(--danger)]">
            {error}
          </span>
        ) : (
          <span />
        )}
        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-[var(--ink-3)]">
              {student.name} حذف بشه؟
            </span>
            <button
              type="button"
              onClick={remove}
              disabled={saving}
              aria-label="بله، حذف کن"
              className="text-[var(--danger)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--danger)]/40 transition-colors"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={saving}
              aria-label="بی‌خیال"
              className="text-[var(--ink-3)] hover:text-[var(--ink)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--line-strong)]/60 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--danger)] px-2 py-1.5 rounded-lg transition-colors"
          >
            <Trash2 size={13} />
            حذف از فهرست
          </button>
        )}
      </div>
    </div>
  );
}
