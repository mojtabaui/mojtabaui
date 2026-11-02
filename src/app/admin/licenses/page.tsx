import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, KeyRound, Plus, FileText, Download } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LICENSE_COURSES, findLicenseCourse } from "@/lib/license-courses";
import LicenseForm from "@/components/admin/LicenseForm";
import CopyButton from "@/components/admin/CopyButton";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { Section, Empty, ScrollArea } from "@/components/admin/Section";
import { toPersianDigits } from "@/lib/persian-months";

export const dynamic = "force-dynamic";

export default async function LicensesPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  let rows: Awaited<ReturnType<typeof prisma.spotLicense.findMany>> = [];
  let dbError = false;
  try {
    rows = await prisma.spotLicense.findMany({ orderBy: { createdAt: "desc" }, take: 300 });
  } catch {
    // معمولاً یعنی جدول هنوز با prisma db push ساخته نشده
    dbError = true;
  }

  const options = LICENSE_COURSES.map((c) => ({
    id: c.spotplayerId,
    title: c.title,
    devices: c.devices,
    disabled: !c.spotplayerId,
    noGroup: !c.group,
  }));
  const keyMissing = !process.env.SPOTPLAYER_API_KEY;

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[var(--ink)] text-xl flex items-center gap-2">
              <KeyRound size={19} className="text-[var(--ok)]" />
              لایسنس اسپات‌پلیر
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1.5 leading-6">
              لایسنس مستقیم روی پنل اسپات‌پلیر ساخته می‌شه و موبایل خریدار روی ویدیو واترمارک
              می‌خوره.
              <br />
              برای هر نفر یک نامهٔ خوش‌آمد با کلید و QR گروه دوره ساخته می‌شه که می‌تونی چاپ
              کنی، PDF بگیری یا همون فایل HTML رو بفرستی.
            </p>
          </div>
          <PanelThemeToggle />
        </div>

        {keyMissing && (
          <div className="border border-[var(--danger)]/40 bg-[var(--danger)]/10 rounded-2xl px-5 py-4 font-body text-sm text-[var(--ink-2)] leading-7">
            کلید API اسپات‌پلیر تنظیم نشده. متغیر{" "}
            <code dir="ltr" className="font-mono text-xs bg-[var(--page)] px-1.5 py-0.5 rounded">
              SPOTPLAYER_API_KEY
            </code>{" "}
            رو توی تنظیمات Vercel اضافه کن.
          </div>
        )}

        {dbError && (
          <div className="border border-[var(--warn)]/40 bg-[var(--warn)]/10 rounded-2xl px-5 py-4 font-body text-sm text-[var(--ink-2)] leading-7">
            جدول لایسنس‌ها توی دیتابیس پیدا نشد. یک بار{" "}
            <code dir="ltr" className="font-mono text-xs bg-[var(--page)] px-1.5 py-0.5 rounded">
              npx prisma db push
            </code>{" "}
            لازمه. تا اون موقع لایسنس ساخته می‌شه ولی نامه و سابقه‌اش نمی‌مونه.
          </div>
        )}

        <Section title="لایسنس تازه" icon={Plus} accent="var(--violet)">
          <div className="px-5 sm:px-6 py-5">
            <LicenseForm courses={options} />
          </div>
        </Section>

        <Section
          title="لایسنس‌های صادرشده"
          icon={KeyRound}
          accent="var(--ok)"
          meta={`${toPersianDigits(rows.length)} لایسنس`}
        >
          {rows.length === 0 ? (
            <Empty icon={KeyRound}>هنوز لایسنسی از پنل صادر نشده</Empty>
          ) : (
            <ScrollArea max="40rem">
              <div className="divide-y divide-[var(--line)]">
                {rows.map((r) => {
                  const titles = r.courseIds.map((id) => findLicenseCourse(id)?.title ?? id);
                  const href = `/api/admin/licenses/${r.id}/welcome`;
                  return (
                    <div key={r.id} className="px-5 sm:px-6 py-3.5 flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-body text-sm text-[var(--ink)] truncate">
                          <bdi>{r.name}</bdi>
                          <span dir="ltr" className="text-[var(--ink-4)] text-xs ms-2">
                            {r.phone}
                          </span>
                          {r.test && (
                            <span className="text-[10px] font-body px-2 py-0.5 rounded-full bg-[var(--warn)]/15 text-[var(--warn)] ms-2">
                              تست
                            </span>
                          )}
                        </p>
                        <p className="font-body text-xs text-[var(--ink-4)] mt-0.5 truncate">
                          {titles.join(" · ")} · {r.createdAt.toLocaleDateString("fa-IR")}
                          {r.note && ` · ${r.note}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <CopyButton value={r.key} label="کپی کلید" />
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener"
                          title="دیدن نامه"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/60 transition-colors"
                        >
                          <FileText size={14} />
                        </a>
                        <a
                          href={`${href}?download=1`}
                          title="دانلود نامه"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/60 transition-colors"
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </Section>
      </div>
    </div>
  );
}
