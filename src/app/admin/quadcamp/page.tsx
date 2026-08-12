import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, Briefcase, ExternalLink, FileText, Inbox, Link2 } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { Empty } from "@/components/admin/Section";
import { toPersianDigits } from "@/lib/persian-months";

export const dynamic = "force-dynamic";

/** حجم فایل رزومه، برای اینکه معلوم باشه اسکنِ ۳ مگابایتیه یا PDF واقعی */
function humanSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${toPersianDigits(mb.toFixed(1))} مگ`;
  return `${toPersianDigits(Math.max(1, Math.round(bytes / 1024)))} کیلو`;
}

export default async function QuadcampApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const apps = await prisma.quadcampApplication.findMany({
    orderBy: { createdAt: "desc" },
    // resumeData عمداً نیست — چند مگابایت فایل رو برای یک فهرست نمی‌کشیم بالا
    select: {
      id: true,
      fullName: true,
      portfolioUrl: true,
      resumeUrl: true,
      resumeName: true,
      resumeSize: true,
      isRead: true,
      createdAt: true,
    },
  });

  // مثل صندوق ورودی: باز کردنِ همین صفحه یعنی دیدیشون. نشانِ «جدید» فقط
  // برای این بار می‌مونه و دفعهٔ بعد صفحه تمیزه.
  const unread = apps.filter((a) => !a.isRead).length;
  if (unread > 0) {
    await prisma.quadcampApplication.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
  }

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* ── سربرگ ── */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[var(--ink)] text-xl flex items-center gap-2">
              <Briefcase size={18} className="text-[var(--info)]" />
              ثبت‌نام‌های کوادکمپ
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-[var(--ink-4)]">
              <span className="text-[var(--ink)]">{toPersianDigits(apps.length)}</span> نفر
              {unread > 0 && (
                <span className="text-[var(--warn)]">
                  {" "}
                  · {toPersianDigits(unread)} تازه
                </span>
              )}
            </span>
            <PanelThemeToggle />
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
          {apps.length === 0 ? (
            <Empty icon={Inbox}>هنوز کسی فرم رو پر نکرده</Empty>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {apps.map((app) => (
                <article key={app.id} className="px-5 sm:px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-body font-semibold text-[var(--ink)] text-sm">
                        {app.fullName}
                      </span>
                      {!app.isRead && (
                        <span className="text-[10px] font-body px-2 py-0.5 rounded-full bg-[var(--warn)]/15 text-[var(--warn)]">
                          جدید
                        </span>
                      )}
                    </div>
                    <span className="font-body text-[var(--ink-4)] text-xs">
                      {app.createdAt.toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="flex items-center gap-1.5 font-body text-xs text-[var(--violet)] hover:underline underline-offset-4 text-left truncate"
                    >
                      <Link2 size={12} className="shrink-0" />
                      <span className="truncate">{app.portfolioUrl}</span>
                    </a>

                    {/* رزومه یا فایلِ آپلودشده‌ست یا لینک درایو — گاهی هر دو */}
                    {app.resumeSize > 0 && (
                      <a
                        href={`/api/admin/quadcamp/${app.id}/resume`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-body text-xs text-[var(--ok)] hover:underline underline-offset-4"
                      >
                        <FileText size={12} className="shrink-0" />
                        <span className="truncate">{app.resumeName || "رزومه"}</span>
                        <span className="text-[var(--ink-4)] shrink-0">
                          ({humanSize(app.resumeSize)})
                        </span>
                      </a>
                    )}

                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="flex items-center gap-1.5 font-body text-xs text-[var(--info)] hover:underline underline-offset-4 text-left truncate"
                      >
                        <ExternalLink size={12} className="shrink-0" />
                        <span className="truncate">{app.resumeUrl}</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
