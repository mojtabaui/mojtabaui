import Link from "next/link";
import { BookOpen, Key, User, LogOut, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const mockUser = {
  name: "علی احمدی",
  email: "ali@example.com",
  joinDate: "۱۴۰۴/۰۱/۱۵",
};

const mockPurchases = [
  {
    id: "1",
    courseTitle: "رابط کاربری بی‌نهایت",
    courseSubtitle: "UI INFINITY",
    purchaseDate: "۱۴۰۴/۰۱/۲۰",
    amount: "۱,۹۹۰,۰۰۰ تومان",
    status: "موفق",
    license: "SP-2024-UI-A1B2C3D4",
    expiresAt: "مادام‌العمر",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    id: "2",
    courseTitle: "تجربه کاربری بی‌نهایت",
    courseSubtitle: "UX INFINITY",
    purchaseDate: "۱۴۰۴/۰۲/۰۵",
    amount: "۱,۴۹۰,۰۰۰ تومان",
    status: "موفق",
    license: "SP-2024-UX-X9Y8Z7W6",
    expiresAt: "مادام‌العمر",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
];

const sidebarLinks = [
  { icon: BookOpen, label: "دوره‌های من", active: true },
  { icon: Key, label: "لایسنس‌ها", active: false },
  { icon: User, label: "پروفایل", active: false },
];

export default function DashboardPage() {
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
                    <span className="font-body font-bold text-[#1a1714] text-base">ع</span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-[#1a1714] text-sm">{mockUser.name}</div>
                    <div className="font-body text-[#a09990] text-xs">{mockUser.email}</div>
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
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-[#a09990] hover:text-rose-500 hover:bg-rose-50 transition-all mt-4 text-right">
                    <LogOut size={16} />
                    خروج
                  </button>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 className="font-body font-bold text-2xl text-[#1a1714]">
                  سلام، {mockUser.name.split(" ")[0]} 👋
                </h1>
                <p className="text-[#a09990] font-body text-sm mt-1">
                  عضو از {mockUser.joinDate}
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "۲", label: "دوره خریداری‌شده" },
                  { value: "۲", label: "لایسنس فعال" },
                  { value: "۳,۴۸۰,۰۰۰", label: "تومان پرداخت‌شده" },
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
                <div className="space-y-4">
                  {mockPurchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="bg-white border border-[#e8e2d9] rounded-2xl p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: purchase.color }}
                          >
                            <BookOpen size={16} style={{ color: purchase.accent }} />
                          </div>
                          <div>
                            <div className="font-body text-[10px] text-[#a09990] tracking-wider uppercase mb-0.5">
                              {purchase.courseSubtitle}
                            </div>
                            <div className="font-body font-semibold text-[#1a1714] text-sm">
                              {purchase.courseTitle}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex-shrink-0">
                          <CheckCircle size={12} />
                          <span className="text-xs font-body">{purchase.status}</span>
                        </div>
                      </div>

                      {/* License box */}
                      <div className="bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Key size={13} className="text-[#7c5cfc]" />
                          <span className="font-body text-xs text-[#6b6560] font-semibold">لایسنس اسپات پلیر</span>
                        </div>
                        <div
                          className="font-body text-sm text-[#1a1714] tracking-wider mb-3 bg-white border border-[#e8e2d9] rounded-lg px-3 py-2 select-all text-left"
                          dir="ltr"
                        >
                          {purchase.license}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[#a09990] text-xs font-body">
                            <Clock size={11} />
                            انقضا: {purchase.expiresAt}
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

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f0ebe4] text-xs font-body text-[#a09990]">
                        <span>تاریخ خرید: {purchase.purchaseDate}</span>
                        <span>{purchase.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
