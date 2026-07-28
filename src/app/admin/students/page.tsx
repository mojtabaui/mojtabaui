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

  const inputCls =
    "w-full bg-[#0a0908] border border-[#2d2c2a] rounded-xl px-4 py-2.5 font-body text-sm text-[#fafaf9] placeholder:text-[#57534e] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors";

  return (
    <div className="min-h-screen bg-[#0a0908] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[#57534e] hover:text-[#a8a29e] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[#fafaf9] text-xl flex items-center gap-2">
              <GraduationCap size={19} className="text-[#8b5cf6]" />
              دانشجوهای دوره‌های آفلاین
            </h1>
            <p className="font-body text-xs text-[#57534e] mt-1.5">
              موضوع پروژه و شمارهٔ تسک همون‌جا توی جدول قابل ویرایشه — کلیک کن، بنویس، برو بیرون.
            </p>
          </div>
          <AddStudentsForm defaultYear={DEFAULT_YEAR} defaultMonth={DEFAULT_MONTH} />
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-[#111110] border border-[#2d2c2a] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[#57534e]">
              {isFiltered ? "در این فیلتر" : "کل دانشجوها"}
            </p>
            <p className="font-body text-lg text-[#fafaf9] mt-0.5">
              {toPersianDigits(students.length)}
              {isFiltered && (
                <span className="text-[#57534e] text-sm"> از {toPersianDigits(total)}</span>
              )}
            </p>
          </div>
          <div className="bg-[#111110] border border-[#2d2c2a] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[#57534e]">موضوع وارد کرده‌اند</p>
            <p className="font-body text-lg text-emerald-400 mt-0.5">
              {toPersianDigits(withTopic)}
            </p>
          </div>
          <div className="bg-[#111110] border border-[#2d2c2a] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[#57534e]">هنوز موضوع ندارند</p>
            <p className="font-body text-lg text-amber-400 mt-0.5">
              {toPersianDigits(students.length - withTopic)}
            </p>
          </div>
        </div>

        {/* ── Filters ── */}
        <form
          method="GET"
          action="/admin/students"
          className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3"
        >
          <div className="relative">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#57534e] pointer-events-none"
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
                className="font-body text-sm text-[#a8a29e] hover:text-[#fafaf9] px-3 py-2.5 transition-colors"
              >
                پاک کردن
              </Link>
            )}
          </div>
        </form>

        {/* ── Table ── */}
        <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl overflow-hidden">
          {students.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <GraduationCap size={26} className="text-[#2d2c2a] mx-auto mb-3" />
              <p className="font-body text-[#57534e] text-sm">
                {isFiltered
                  ? "کسی با این فیلترها پیدا نشد"
                  : "هنوز دانشجویی ثبت نشده — از دکمهٔ بالا اضافه کن"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#1e1d1c]">
                    <th className="w-8" />
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
                      نام
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
                      دوره
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
                      ماه
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
                      موضوع پروژه
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
                      هدف
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[#57534e] font-normal">
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

        <p className="font-body text-xs text-[#57534e] mt-4 leading-relaxed">
          فعلاً دانشجوها حساب کاربری ندارن و همه‌چیز از همین‌جا وارد می‌شه. وقتی ایمیل‌هاشون
          جمع شد، فرم ورود موضوع می‌ره توی حساب خودشون و این جدول فقط برای دیدن و بررسی می‌مونه.
        </p>
      </div>
    </div>
  );
}
