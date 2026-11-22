import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, Download, Inbox, Users } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { Empty } from "@/components/admin/Section";
import { toPersianDigits } from "@/lib/persian-months";
import { COLUMNS, toDisplay } from "@/lib/teamup-rows";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ track?: string; mode?: string }> };

const chip = (active: boolean) =>
  `font-body text-xs px-3 py-1.5 rounded-lg border transition-colors ${
    active
      ? "border-[var(--violet)] bg-[var(--violet)]/15 text-[var(--ink)]"
      : "border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)]"
  }`;

export default async function TeamupAdminPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const sp = await searchParams;
  const track = sp.track === "UI" || sp.track === "UX" ? sp.track : "";
  const mode = sp.mode === "SOLO" || sp.mode === "GROUP" ? sp.mode : "";

  let rows: Awaited<ReturnType<typeof prisma.teamupPreference.findMany>> = [];
  let tableMissing = false;
  try {
    rows = await prisma.teamupPreference.findMany({
      where: { ...(track ? { track } : {}), ...(mode ? { mode } : {}) },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // جدول تا وقتی prisma db push نخورده وجود نداره
    tableMissing = true;
  }

  const qs = (t: string, m: string) => {
    const p = new URLSearchParams();
    if (t) p.set("track", t);
    if (m) p.set("mode", m);
    const s = p.toString();
    return s ? `?${s}` : "";
  };

  const display = rows.map((r) => ({ id: r.id, ...toDisplay(r) }));
  const groupCount = rows.filter((r) => r.mode === "GROUP").length;

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
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
              <Users size={18} className="text-[var(--info)]" />
              پروژه تکی یا گروهی
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1" dir="ltr">
              /teamup/ui · /teamup/ux
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-body text-sm text-[var(--ink-4)]">
              <span className="text-[var(--ink)]">{toPersianDigits(rows.length)}</span> نفر ·{" "}
              {toPersianDigits(groupCount)} گروهی
            </span>
            <a
              href={`/api/admin/teamup/export${qs(track, mode)}`}
              className="inline-flex items-center gap-1.5 font-body text-xs px-3 py-2 rounded-lg bg-[var(--violet-deep)] text-white hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              خروجی اکسل
            </a>
            <PanelThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Link href={`/admin/teamup${qs("", mode)}`} className={chip(!track)}>همهٔ مسیرها</Link>
          <Link href={`/admin/teamup${qs("UI", mode)}`} className={chip(track === "UI")}>رابط کاربری</Link>
          <Link href={`/admin/teamup${qs("UX", mode)}`} className={chip(track === "UX")}>تجربه کاربری</Link>
          <span className="w-px h-5 bg-[var(--line-strong)] mx-1" />
          <Link href={`/admin/teamup${qs(track, "")}`} className={chip(!mode)}>تکی و گروهی</Link>
          <Link href={`/admin/teamup${qs(track, "GROUP")}`} className={chip(mode === "GROUP")}>گروهی</Link>
          <Link href={`/admin/teamup${qs(track, "SOLO")}`} className={chip(mode === "SOLO")}>تکی</Link>
        </div>

        {tableMissing ? (
          <div role="alert" className="bg-[var(--warn)]/10 border border-[var(--warn)]/30 rounded-2xl px-6 py-8">
            <p className="font-body text-sm text-[var(--warn)] mb-2">
              جدول این فرم هنوز توی دیتابیس ساخته نشده
            </p>
            <p
              dir="ltr"
              className="font-mono text-xs text-[var(--ink)] mt-2 text-left bg-[var(--page)] border border-[var(--line)] rounded-lg px-3 py-2 inline-block"
            >
              npx prisma db push
            </p>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-x-auto">
            {display.length === 0 ? (
              <Empty icon={Inbox}>هنوز کسی فرم رو پر نکرده</Empty>
            ) : (
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    {COLUMNS.map((c) => (
                      <th
                        key={c.key}
                        className="font-body font-medium text-xs text-[var(--ink-4)] px-3 py-3 whitespace-nowrap"
                      >
                        {c.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {display.map((r) => (
                    <tr key={r.id} className="border-b border-[var(--line)] last:border-0 align-top">
                      {COLUMNS.map((c) => {
                        const v = r[c.key];
                        const text = v instanceof Date ? v.toLocaleDateString("fa-IR") : String(v ?? "");
                        return (
                          <td
                            key={c.key}
                            dir={c.key === "contact" ? "ltr" : undefined}
                            className={`font-body text-xs text-[var(--ink-2)] px-3 py-2.5 leading-6 ${
                              c.key === "fullName"
                                ? "whitespace-nowrap font-medium text-[var(--ink)]"
                                : "min-w-[8rem]"
                            }`}
                          >
                            {text || <span className="text-[var(--ink-faint)]">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
