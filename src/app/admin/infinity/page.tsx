import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, ListChecks } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InfinityBoard, { type InfinityStudentView } from "@/components/admin/InfinityBoard";
import AddInfinityStudentsForm from "@/components/admin/AddInfinityStudentsForm";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";

export const dynamic = "force-dynamic";

export default async function InfinityAdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  let students: InfinityStudentView[] = [];
  let tableMissing = false;
  try {
    const rows = await prisma.infinityStudent.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
    students = rows.map((s) => ({
      id: s.id,
      name: s.name,
      phone: s.phone,
      course: s.course,
      videosDone: s.videosDone,
      tasksDone: s.tasksDone,
      note: s.note,
    }));
  } catch {
    // جدول تا وقتی prisma db push نخورده وجود نداره
    tableMissing = true;
  }

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
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
              <ListChecks size={19} className="text-[var(--violet)]" />
              پیگیری دانشجوهای بی‌نهایت
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1.5 leading-6">
              برای هر دانشجو و هر هفته دو تیک بزن: ویدیو و تسک. اسپات‌پلیر گزارش تماشا
              نمی‌ده، پس این تیک‌ها رو خودت می‌زنی.
              <br />
              فلش آخر هر ردیف: موبایل، یادداشت و حذف.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <PanelThemeToggle />
            {!tableMissing && <AddInfinityStudentsForm />}
          </div>
        </div>

        {tableMissing ? (
          <div
            role="alert"
            className="bg-[var(--warn)]/10 border border-[var(--warn)]/30 rounded-2xl px-6 py-8"
          >
            <p className="font-body text-sm text-[var(--warn)] mb-2">
              جدول دانشجوهای بی‌نهایت هنوز توی دیتابیس ساخته نشده
            </p>
            <p className="font-body text-xs text-[var(--ink-3)] leading-6">
              یک بار این دستور رو توی پوشهٔ پروژه اجرا کن و صفحه رو تازه کن:
            </p>
            <p
              dir="ltr"
              className="font-mono text-xs text-[var(--ink)] mt-2 text-left bg-[var(--page)] border border-[var(--line)] rounded-lg px-3 py-2 inline-block"
            >
              npx prisma db push
            </p>
          </div>
        ) : (
          <InfinityBoard students={students} />
        )}
      </div>
    </div>
  );
}
