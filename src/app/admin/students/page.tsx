import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma, type ProjectTrack } from "@prisma/client";
import { ArrowRight, GraduationCap, Search } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StudentRow from "@/components/admin/StudentRow";
import AddStudentsForm from "@/components/admin/AddStudentsForm";
import { intakeLabel, toLatinDigits, toPersianDigits } from "@/lib/persian-months";

/** ورودیِ جاری — دانشجوهای تیر ۱۴۰۵ */
const DEFAULT_YEAR = "1405";
const DEFAULT_MONTH = "04";

interface Props {
  searchParams: Promise<{ q?: string; track?: string; month?: string }>;
}

export default async function StudentsPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const track = ["UI", "UX"].includes(sp.track ?? "") ? (sp.track as ProjectTrack) : null;
  const month = toLatinDigits(sp.month ?? "").trim();

  const where: Prisma.StudentProjectWhereInput = {};
  if (q) {
    where.OR = [
      { studentName: { contains: q, mode: "insensitive" } },
      { topic: { contains: q, mode: "insensitive" } },
    ];
  }
  if (track) where.track = track;
  if (month) where.intakeMonth = month;

  const [students, allMonths, total] = await Promise.all([
    prisma.studentProject.findMany({
      where,
      orderBy: [{ intakeMonth: "desc" }, { track: "asc" }, { studentName: "asc" }],
    }),
    prisma.studentProject.findMany({
      distinct: ["intakeMonth"],
      select: { intakeMonth: true },
      orderBy: { intakeMonth: "desc" },
    }),
    prisma.studentProject.count(),
  ]);

  const isFiltered = Boolean(q || track || month);
  const withTopic = students.filter((s) => s.topic.trim()).length;
  const withLink = students.filter((s) => s.fileLink.trim()).length;

  // مرز ورودی‌ها باید ۳:۱ باشه چون تنها نشانهٔ کنترل بودنشونه
  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-1 focus:ring-[var(--violet)]/40 transition-colors";

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[var(--ink)] text-xl flex items-center gap-2">
              <GraduationCap size={19} className="text-[var(--violet)]" />
              دانشجوهای دوره‌های آفلاین
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1.5 leading-6">
              موضوع و هدف همون‌جا توی جدول قابل ویرایشه. کلیک کن، بنویس، برو بیرون.
              <br />
              فلش کنار هر ردیف رو بزن تا تسک‌ها، لینک فایل و سابقه‌اش باز شه.
            </p>
          </div>
          <AddStudentsForm defaultYear={DEFAULT_YEAR} defaultMonth={DEFAULT_MONTH} />
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">
              {isFiltered ? "در این فیلتر" : "کل دانشجوها"}
            </p>
            <p className="font-body text-lg text-[var(--ink)] mt-0.5">
              {toPersianDigits(students.length)}
              {isFiltered && (
                <span className="text-[var(--ink-4)] text-sm"> از {toPersianDigits(total)}</span>
              )}
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">موضوع وارد کرده‌اند</p>
            <p className="font-body text-lg text-emerald-400 mt-0.5">
              {toPersianDigits(withTopic)}
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">هنوز موضوع ندارند</p>
            <p className="font-body text-lg text-amber-400 mt-0.5">
              {toPersianDigits(students.length - withTopic)}
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">لینک فایل داده‌اند</p>
            <p className="font-body text-lg text-[var(--violet)] mt-0.5">
              {toPersianDigits(withLink)}
            </p>
          </div>
        </div>

        {/* ── Filters ── */}
        <form
          method="GET"
          action="/admin/students"
          className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3"
        >
          <div className="relative">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)] pointer-events-none"
            />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="نام دانشجو یا موضوع پروژه"
              className={`${inputCls} pr-10`}
            />
          </div>

          <select name="track" defaultValue={track ?? ""} className={inputCls}>
            <option value="">هر دو دوره</option>
            <option value="UI">رابط کاربری</option>
            <option value="UX">تجربه کاربری</option>
          </select>

          <select name="month" defaultValue={month} className={inputCls}>
            <option value="">همهٔ ماه‌ها</option>
            {allMonths.map((m) => (
              <option key={m.intakeMonth} value={m.intakeMonth}>
                {intakeLabel(m.intakeMonth)}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-[#8b5cf6] hover:bg-[#7c4ff0] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              فیلتر
            </button>
            {isFiltered && (
              <Link
                href="/admin/students"
                className="font-body text-sm text-[var(--ink-3)] hover:text-[var(--ink)] px-3 py-2.5 transition-colors"
              >
                پاک کردن
              </Link>
            )}
          </div>
        </form>

        {/* ── Table ── */}
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
          {students.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <GraduationCap size={26} className="text-[var(--ink-faint)] mx-auto mb-3" />
              <p className="font-body text-[var(--ink-4)] text-sm">
                {isFiltered
                  ? "کسی با این فیلترها پیدا نشد"
                  : "هنوز دانشجویی ثبت نشده — از دکمهٔ بالا اضافه کن"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    <th className="w-8" />
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      نام
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      دوره
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      ماه
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      موضوع پروژه
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      هدف
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      بررسی‌شده
                    </th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <StudentRow
                      key={s.id}
                      student={{
                        id: s.id,
                        studentName: s.studentName,
                        track: s.track,
                        intakeMonth: s.intakeMonth,
                        topic: s.topic,
                        fileLink: s.fileLink,
                        reviewedTasks: s.reviewedTasks,
                        background: s.background,
                        goal: s.goal,
                        note: s.note,
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="font-body text-xs text-[var(--ink-4)] mt-4 leading-relaxed">
          فعلاً دانشجوها حساب کاربری ندارن و همه‌چیز از همین‌جا وارد می‌شه. وقتی ایمیل‌هاشون
          جمع شد، فرم ورود موضوع می‌ره توی حساب خودشون و این جدول فقط برای دیدن و بررسی می‌مونه.
        </p>
      </div>
    </div>
  );
}
