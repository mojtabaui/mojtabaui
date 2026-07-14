import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Key, User, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";

const courseColors: Record<string, { color: string; accent: string }> = {
  "ui-infinity": { color: "#FFF0EE", accent: "#dc2626" },
  "ux-infinity": { color: "#EEF3FF", accent: "#1d4ed8" },
  "ui-offline":  { color: "#FFF0EE", accent: "#dc2626" },
  "ux-offline":  { color: "#EEF3FF", accent: "#1d4ed8" },
};

function PaymentBanner({ status }: { status?: string }) {
  if (!status) return null;

  if (status === "success") return (
    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-body mb-6">
      ✓ پرداخت موفق بود. لایسنس شما در پنل فعال شده است.
    </div>
  );

  if (status === "failed") return (
    <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl px-4 py-3 text-sm font-body mb-6">
      پرداخت ناموفق بود. در صورت کسر مبلغ، ظرف ۷۲ ساعت بازگشت داده می‌شه.
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
  const joinDate = user.createdAt.toLocaleDateString("fa-IR");

  const sidebarLinks = [
    { icon: BookOpen, label: "دوره‌های من", active: true },
    { icon: Key,      label: "لایسنس‌ها",    active: false },
    { icon: User,     label: "پروفایل",       active: false },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all text-right ${
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
                  سلام، {user.name.split(" ")[0]} 👋
                </h1>
                <p className="text-[#a09990] font-body text-sm mt-1">
                  عضو از {joinDate}
                </p>
              </div>

              <PaymentBanner status={payment} />

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: String(user.purchases.length), label: "دوره خریداری‌شده" },
                  { value: String(user.licenses.length),   label: "لایسنس فعال"       },
                  { value: totalPaid.toLocaleString("fa-IR"), label: "تومان پرداخت‌شده" },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-[#e8e2d9] rounded-2xl p-4 text-center shadow-sm">
                    <div className="font-body font-bold text-2xl text-[#1a1714] mb-1">{s.value}</div>
                    <div className="font-body text-[#a09990] text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Courses & Licenses */}
              <div>
                <h2 className="font-body font-bold text-lg text-[#1a1714] mb-4">دوره‌ها و لایسنس‌ها</h2>

                {user.purchases.length === 0 ? (
                  <div className="bg-white border border-[#e8e2d9] rounded-2xl p-10 text-center">
                    <p className="text-[#a09990] font-body text-sm mb-4">هنوز دوره‌ای خریداری نکردی</p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 bg-[#1a1714] text-white font-body text-sm font-semibold px-6 py-2.5 rounded-xl"
                    >
                      مشاهده دوره‌ها
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.purchases.map((purchase) => {
                      const license = user.licenses.find((l) => l.courseId === purchase.courseId);
                      const c = courseColors[purchase.course.slug] ?? { color: "#F5F0FF", accent: "#7c5cfc" };
                      const purchaseDate = purchase.createdAt.toLocaleDateString("fa-IR");

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
                              <span className="text-xs font-body">موفق</span>
                            </div>
                          </div>

                          {license ? (
                            <div className="bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Key size={13} className="text-[#7c5cfc]" />
                                <span className="font-body text-xs text-[#6b6560] font-semibold">لایسنس اسپات پلیر</span>
                              </div>
                              <div
                                className="font-body text-sm text-[#1a1714] tracking-wider mb-3 bg-white border border-[#e8e2d9] rounded-lg px-3 py-2 select-all text-left"
                                dir="ltr"
                              >
                                {license.licenseKey}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[#a09990] text-xs font-body">
                                  <Clock size={11} />
                                  انقضا:{" "}
                                  {license.expiresAt
                                    ? license.expiresAt.toLocaleDateString("fa-IR")
                                    : "مادام‌العمر"}
                                </div>
                                <a
                                  href="https://spotplayer.ir"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[#7c5cfc] hover:text-[#5b3fd4] text-xs font-body transition-colors"
                                >
                                  ورود به اسپات پلیر
                                  <ExternalLink size={11} />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-body text-amber-700">
                              لایسنس در حال پردازش است. اگه بعد از چند دقیقه هنوز ندیدی باهام در تماس باش.
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f0ebe4] text-xs font-body text-[#a09990]">
                            <span>تاریخ خرید: {purchaseDate}</span>
                            <span>{purchase.amount.toLocaleString("fa-IR")} تومان</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Browse more */}
              <div className="bg-[#1a1714] rounded-2xl p-6 text-center">
                <div className="text-white/60 font-body text-sm mb-1">دوره بیشتری می‌خوای یاد بگیری؟</div>
                <p className="text-white/30 font-body text-xs mb-4">همه دوره‌ها در یه جا</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
                >
                  مشاهده دوره‌ها
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
