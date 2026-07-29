import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CertificateForm from "@/components/admin/CertificateForm";
import DeleteCertificateButton from "@/components/admin/DeleteCertificateButton";
import { Section, Empty, ScrollArea } from "@/components/admin/Section";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { toPersianDigits } from "@/lib/persian-months";
import {
  BookOpen,
  Users,
  Mail,
  Award,
  Settings,
  ArrowLeft,
  Phone,
  BellRing,
  GraduationCap,
  Link2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const [
    userCount,
    courseCount,
    certCount,
    subscriberCount,
    studentCount,
    studentsWithTopic,
    unreadCount,
    messages,
    recentCerts,
    subscribers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.certificate.count(),
    prisma.discountSubscriber.count(),
    prisma.studentProject.count(),
    prisma.studentProject.count({ where: { NOT: { topic: "" } } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.certificate.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.discountSubscriber.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  const fa = (n: number) => toPersianDigits(String(n));

  const stats = [
    { label: "کاربران", value: userCount, icon: Users, tone: "var(--info)" },
    { label: "دوره‌ها", value: courseCount, icon: BookOpen, tone: "var(--violet)" },
    { label: "گواهینامه‌ها", value: certCount, icon: Award, tone: "var(--ok)" },
    { label: "مشترکین تخفیف", value: subscriberCount, icon: BellRing, tone: "var(--warn)" },
  ];

  const trackLabel = (t: string) =>
    t === "UI" ? "رابط کاربری" : t === "UX" ? "تجربه کاربری" : "کوادکمپ";

  return (
    <div className="min-h-screen bg-[var(--page)]">
      <header className="border-b border-[var(--line)] bg-[var(--page)]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[var(--violet-deep)] flex items-center justify-center">
              <Settings size={14} className="text-white" />
            </div>
            <span className="font-body font-bold text-[var(--ink)] text-sm">پنل مدیریت</span>
          </div>
          <div className="flex items-center gap-3">
            <PanelThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[var(--ink-3)] hover:text-[var(--ink)] text-xs font-body transition-colors"
            >
              <span>بازگشت به سایت</span>
              <ArrowLeft size={12} />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── تیتر صفحه ── */}
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="h-px w-6 bg-[var(--violet)]/70" />
            <span className="font-display text-[11px] tracking-[0.2em] uppercase text-[var(--violet)]">
              Overview
            </span>
          </div>
          <h1 className="font-body font-bold text-2xl text-[var(--ink)]">داشبورد مدیریت</h1>
        </div>

        {/* ── آمار ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                // رنگ از توکن میاد، پس شفافیت باید با color-mix ساخته بشه
                // نه با چسبوندن آلفا به رشته
                style={{
                  color: s.tone,
                  backgroundColor: `color-mix(in srgb, ${s.tone} 14%, transparent)`,
                }}
              >
                <s.icon size={17} />
              </div>
              <div className="font-display font-bold text-2xl text-[var(--ink)] mb-1">
                {fa(s.value)}
              </div>
              <div className="font-body text-[var(--ink-4)] text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── میان‌برها ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <Link
            href="/admin/students"
            className="group bg-[var(--card)] hover:bg-[var(--card-raised)] border border-[var(--line)] hover:border-[var(--violet)]/45 rounded-2xl px-5 py-5 flex items-start gap-4 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--violet)]/15 text-[var(--violet)] flex items-center justify-center shrink-0">
              <GraduationCap size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-body font-semibold text-[var(--ink)] text-sm mb-1">
                دانشجوهای دوره‌های آفلاین
              </h2>
              <p className="font-body text-xs text-[var(--ink-4)] leading-6">
                موضوع پروژه، لینک فایل و تسک‌های بررسی‌شده
              </p>
              <p className="font-body text-xs text-[var(--ink-3)] mt-2">
                <span className="text-[var(--ink)]">{fa(studentsWithTopic)}</span> از{" "}
                {fa(studentCount)} موضوعشون رو ثبت کرده‌اند
              </p>
            </div>
            <span className="font-body text-sm text-[var(--violet)] shrink-0 mt-0.5">←</span>
          </Link>

          <Link
            href="/project"
            target="_blank"
            className="group bg-[var(--card)] hover:bg-[var(--card-raised)] border border-[var(--line)] hover:border-[var(--violet)]/45 rounded-2xl px-5 py-5 flex items-start gap-4 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--ok)]/15 text-[var(--ok)] flex items-center justify-center shrink-0">
              <Link2 size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-body font-semibold text-[var(--ink)] text-sm mb-1">
                فرم ثبت موضوع
              </h2>
              <p className="font-body text-xs text-[var(--ink-4)] leading-6">
                لینکی که توی کانال می‌ذاری تا خودشون موضوع و فایلشون رو بفرستن
              </p>
              <p
                dir="ltr"
                className="font-mono text-[11px] text-[var(--ink-3)] mt-2 text-left"
              >
                mojtabaui.ir/project
              </p>
            </div>
            <span className="font-body text-sm text-[var(--ok)] shrink-0 mt-0.5">←</span>
          </Link>
        </div>

        {/* ── گواهی‌ها ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          <CertificateForm />

          <Section
            title="گواهی‌های اخیر"
            icon={Award}
            accent="var(--ok)"
            href="/admin/certificates"
            hrefLabel={`دیدن همه (${fa(certCount)})`}
          >
            {recentCerts.length === 0 ? (
              <Empty icon={Award}>هنوز گواهی‌ای صادر نشده</Empty>
            ) : (
              <div className="divide-y divide-[var(--line)]">
                {recentCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-body text-[var(--ink)] text-sm truncate">
                        {cert.studentName}
                      </p>
                      <p className="font-body text-[var(--ink-4)] text-xs mt-0.5">
                        {trackLabel(cert.track)}
                        {cert.year ? ` · سال ${toPersianDigits(String(cert.year))}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`/certificate/${cert.code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="دیدن گواهی"
                        dir="ltr"
                        className="font-mono text-xs text-[var(--violet)] hover:text-[#c4b5fd] bg-[var(--page)] border border-[var(--line-strong)]/50 hover:border-[var(--violet)]/60 rounded-lg px-2.5 py-1 tracking-widest transition-colors"
                      >
                        {cert.code}
                      </a>
                      <DeleteCertificateButton id={cert.id} name={cert.studentName} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* ── مشترکین تخفیف ── */}
        <Section
          title="مشترکین اطلاع‌رسانی تخفیف"
          icon={BellRing}
          accent="var(--warn)"
          meta={`${fa(subscribers.length)} شماره`}
        >
          {subscribers.length === 0 ? (
            <Empty icon={BellRing}>هنوز کسی ثبت‌نام نکرده</Empty>
          ) : (
            <ScrollArea>
              <div className="divide-y divide-[var(--line)]">
                {subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-5 sm:px-6 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <a
                        href={`tel:${sub.phone}`}
                        dir="ltr"
                        className="flex items-center gap-1.5 font-body text-[var(--ink-2)] hover:text-[var(--warn)] text-sm transition-colors"
                      >
                        <Phone size={12} className="text-[var(--ink-faint)]" />
                        {sub.phone}
                      </a>
                      {sub.name && (
                        <span className="font-body text-[var(--ink-4)] text-xs truncate">
                          {sub.name}
                        </span>
                      )}
                    </div>
                    <span className="font-body text-[var(--ink-4)] text-xs shrink-0">
                      {sub.createdAt.toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </Section>

        {/* ── پیام‌های تماس ── */}
        <Section
          title="پیام‌های تماس"
          icon={Mail}
          accent="var(--info)"
          meta={
            unreadCount > 0 ? (
              <span className="text-[var(--warn)]">{fa(unreadCount)} خوانده‌نشده</span>
            ) : (
              `${fa(messages.length)} پیام`
            )
          }
        >
          {messages.length === 0 ? (
            <Empty icon={Mail}>هنوز پیامی نیومده</Empty>
          ) : (
            <ScrollArea max="34rem">
              <div className="divide-y divide-[var(--line)]">
                {messages.map((msg) => (
                  <article key={msg.id} className="px-5 sm:px-6 py-5">
                    <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-body font-semibold text-[var(--ink)] text-sm">
                          {msg.name}
                        </span>
                        {!msg.isRead && (
                          <span className="text-[10px] font-body px-2 py-0.5 rounded-full bg-[var(--warn)]/15 text-[var(--warn)]">
                            جدید
                          </span>
                        )}
                      </div>
                      <span className="font-body text-[var(--ink-4)] text-xs">
                        {msg.createdAt.toLocaleDateString("fa-IR")}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <a
                        href={`mailto:${msg.email}`}
                        dir="ltr"
                        className="flex items-center gap-1.5 font-body text-[var(--ink-3)] hover:text-[var(--ink)] text-xs transition-colors"
                      >
                        <Mail size={11} />
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          dir="ltr"
                          className="flex items-center gap-1.5 font-body text-[var(--ink-3)] hover:text-[var(--ink)] text-xs transition-colors"
                        >
                          <Phone size={11} />
                          {msg.phone}
                        </a>
                      )}
                    </div>

                    <p className="font-body text-[var(--ink-2)] text-sm leading-7 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </article>
                ))}
              </div>
            </ScrollArea>
          )}
        </Section>
      </div>
    </div>
  );
}
