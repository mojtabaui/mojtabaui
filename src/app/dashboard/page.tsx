import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Key, User, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";
import { getLang } from "@/lib/i18n/server";
import { PAGES } from "@/lib/i18n/dict/pages";
import type { Lang } from "@/lib/i18n";

const courseColors: Record<string, { color: string; accent: string }> = {
  "ui-infinity": { color: "#FFF0EE", accent: "#dc2626" },
  "ux-infinity": { color: "#EEF3FF", accent: "#1d4ed8" },
  "ui-offline":  { color: "#FFF0EE", accent: "#dc2626" },
  "ux-offline":  { color: "#EEF3FF", accent: "#1d4ed8" },
};

function PaymentBanner({ status, lang }: { status?: string; lang: Lang }) {
  if (!status) return null;
  const t = PAGES[lang].dashboard.payment;

  if (status === "success") return (
    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-body mb-6">
      {t.success}
    </div>
  );

  if (status === "failed") return (
    <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl px-4 py-3 text-sm font-body mb-6">
      {t.failed}
    </div>
  );

  return null;
}

interface Props {
  searchParams: Promise<{ payment?: string }>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/login");

  const lang = await getLang();
  const t = PAGES[lang].dashboard;
  // تاریخ و مبلغ هم با زبان عوض می‌شن — تقویم شمسی توی صفحه‌ی انگلیسی
  // خونده نمی‌شه، و رقم فارسی وسط جمله‌ی انگلیسی هم همین‌طور
  const locale = lang === "fa" ? "fa-IR" : "en-GB";

  const { payment } = await searchParams;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      purchases: {
        where: { status: "SUCCESS" },
        include: { course: true },
        orderBy: { createdAt: "desc" },
      },
      licenses: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) redirect("/auth/login");

  const totalPaid = user.purchases.reduce((sum, p) => sum + p.amount, 0);
  const joinDate = user.createdAt.toLocaleDateString(locale);

  const sidebarLinks = [
    { icon: BookOpen, label: t.nav.courses,  active: true  },
    { icon: Key,      label: t.nav.licenses, active: false },
    { icon: User,     label: t.nav.profile,  active: false },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[var(--nav-h)] min-h-screen bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sticky top-24 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#f0ebe4]">
                  <div className="w-11 h-11 rounded-xl bg-[#f7f4ef] border border-[#e8e2d9] flex items-center justify-center">
                    <span className="font-body font-bold text-[#1a1714] text-base">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-[#1a1714] text-sm">{user.name}</div>
                    <div className="font-body text-[#a09990] text-xs">{user.email}</div>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <button
                      key={link.label}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all text-start ${
                        link.active
                          ? "bg-[#1a1714] text-white"
                          : "text-[#6b6560] hover:text-[#1a1714] hover:bg-[#f7f4ef]"
                      }`}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </button>
                  ))}
                  <LogoutButton />
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 className="font-body font-bold text-2xl text-[#1a1714]">
                  {t.greeting(user.name.split(" ")[0])}
                </h1>
                <p className="text-[#a09990] font-body text-sm mt-1">
                  {t.memberSince(joinDate)}
                </p>
              </div>

              <PaymentBanner status={payment} lang={lang} />

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: user.purchases.length.toLocaleString(locale), label: t.stats.purchased },
                  { value: user.licenses.length.toLocaleString(locale),  label: t.stats.licenses  },
                  { value: totalPaid.toLocaleString(locale),             label: t.stats.paid      },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-[#e8e2d9] rounded-2xl p-4 text-center shadow-sm">
                    <div className="font-body font-bold text-2xl text-[#1a1714] mb-1">{s.value}</div>
                    <div className="font-body text-[#a09990] text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Courses & Licenses */}
              <div>
                <h2 className="font-body font-bold text-lg text-[#1a1714] mb-4">{t.sectionTitle}</h2>

                {user.purchases.length === 0 ? (
                  <div className="bg-white border border-[#e8e2d9] rounded-2xl p-10 text-center">
                    <p className="text-[#a09990] font-body text-sm mb-4">{t.empty}</p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 bg-[#1a1714] text-white font-body text-sm font-semibold px-6 py-2.5 rounded-xl"
                    >
                      {t.browse}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.purchases.map((purchase) => {
                      const license = user.licenses.find((l) => l.courseId === purchase.courseId);
                      const c = courseColors[purchase.course.slug] ?? { color: "#F5F0FF", accent: "#7c5cfc" };
                      const purchaseDate = purchase.createdAt.toLocaleDateString(locale);

                      return (
                        <div key={purchase.id} className="bg-white border border-[#e8e2d9] rounded-2xl p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: c.color }}
                              >
                                <BookOpen size={16} style={{ color: c.accent }} />
                              </div>
                              <div>
                                <div className="font-body text-[10px] text-[#a09990] tracking-wider uppercase mb-0.5">
                                  {purchase.course.subtitle}
                                </div>
                                <div className="font-body font-semibold text-[#1a1714] text-sm">
                                  {purchase.course.title}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex-shrink-0">
                              <CheckCircle size={12} />
                              <span className="text-xs font-body">{t.paid}</span>
                            </div>
                          </div>

                          {license ? (
                            <div className="bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Key size={13} className="text-[#7c5cfc]" />
                                <span className="font-body text-xs text-[#6b6560] font-semibold">{t.license}</span>
                              </div>
                              <div
                                className="font-body text-sm text-[#1a1714] tracking-wider mb-3 bg-white border border-[#e8e2d9] rounded-lg px-3 py-2 select-all text-start"
                                dir="ltr"
                              >
                                {license.licenseKey}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[#a09990] text-xs font-body">
                                  <Clock size={11} />
                                  {t.expires}{" "}
                                  {license.expiresAt
                                    ? license.expiresAt.toLocaleDateString(locale)
                                    : t.lifetime}
                                </div>
                                <a
                                  href="https://spotplayer.ir"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[#7c5cfc] hover:text-[#5b3fd4] text-xs font-body transition-colors"
                                >
                                  {t.spotplayer}
                                  <ExternalLink size={11} />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-body text-amber-700">
                              {t.pending}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f0ebe4] text-xs font-body text-[#a09990]">
                            <span>{t.purchasedOn(purchaseDate)}</span>
                            <span>{purchase.amount.toLocaleString(locale)} {t.currency}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Browse more */}
              <div className="bg-[#1a1714] rounded-2xl p-6 text-center">
                <div className="text-white/60 font-body text-sm mb-1">{t.more.title}</div>
                <p className="text-white/30 font-body text-xs mb-4">{t.more.body}</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
                >
                  {t.more.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
