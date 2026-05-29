import Link from "next/link";
import { BookOpen, Users, ShoppingBag, Key, Plus, Settings, ArrowLeft, TrendingUp } from "lucide-react";

const stats = [
  { label: "دوره‌ها", value: "6", icon: BookOpen, color: "text-violet-400 bg-violet-400/10" },
  { label: "کاربران", value: "4,521", icon: Users, color: "text-blue-400 bg-blue-400/10" },
  { label: "فروش این ماه", value: "۱۸۲", icon: ShoppingBag, color: "text-amber-400 bg-amber-400/10" },
  { label: "لایسنس فعال", value: "۴,۳۱۰", icon: Key, color: "text-emerald-400 bg-emerald-400/10" },
];

const recentPurchases = [
  { user: "علی احمدی", course: "اصول طراحی UI", amount: "490,000", date: "۱۴۰۴/۰۲/۲۷", status: "موفق" },
  { user: "مریم کریمی", course: "فیگما حرفه‌ای", amount: "790,000", date: "۱۴۰۴/۰۲/۲۷", status: "موفق" },
  { user: "رضا حسینی", course: "تحقیقات UX", amount: "690,000", date: "۱۴۰۴/۰۲/۲۶", status: "موفق" },
  { user: "سارا نوری", course: "سیستم‌های طراحی", amount: "1,200,000", date: "۱۴۰۴/۰۲/۲۶", status: "موفق" },
  { user: "محمد رضایی", course: "ساخت پرتفولیو", amount: "390,000", date: "۱۴۰۴/۰۲/۲۵", status: "ناموفق" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* Admin Topbar */}
      <header className="border-b border-[#1e1d1c] bg-[#0a0908]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center">
              <Settings size={14} className="text-white" />
            </div>
            <span className="font-body font-bold text-[#fafaf9] text-sm">پنل مدیریت</span>
            <span className="font-display text-[10px] text-[#57534e] tracking-wider uppercase">/ Admin</span>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-[#57534e] hover:text-[#a8a29e] text-xs font-body transition-colors">
            <span>بازگشت به سایت</span>
            <ArrowLeft size={12} />
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-px w-6 bg-[#8b5cf6]/60" />
            <span className="font-display text-xs tracking-[0.2em] uppercase text-[#8b5cf6]">Overview</span>
          </div>
          <h1 className="font-body font-bold text-2xl text-[#fafaf9]">داشبورد مدیریت</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={18} />
              </div>
              <div className="font-display font-bold text-2xl text-[#fafaf9] mb-0.5">{stat.value}</div>
              <div className="font-body text-[#57534e] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent purchases */}
          <div className="lg:col-span-2">
            <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1e1d1c] flex items-center justify-between">
                <h2 className="font-body font-semibold text-[#fafaf9] text-sm">آخرین خریدها</h2>
                <span className="font-display text-xs text-[#57534e] tracking-wider uppercase">Recent Purchases</span>
              </div>
              <div className="divide-y divide-[#1e1d1c]">
                {recentPurchases.map((p, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-body text-sm text-[#fafaf9] mb-0.5">{p.user}</div>
                      <div className="font-body text-xs text-[#57534e]">{p.course}</div>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <div className="font-display text-sm text-[#a8a29e] mb-1">{p.amount} تومان</div>
                      <div className={`text-[10px] font-body px-2 py-0.5 rounded-full border ${
                        p.status === "موفق"
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                          : "text-rose-400 bg-rose-400/10 border-rose-400/20"
                      }`}>
                        {p.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-5">
              <h2 className="font-body font-semibold text-[#fafaf9] text-sm mb-4">اقدامات سریع</h2>
              <div className="space-y-2.5">
                {[
                  { label: "افزودن دوره جدید", icon: Plus, href: "/admin/courses/new" },
                  { label: "مدیریت کاربران", icon: Users, href: "/admin/users" },
                  { label: "مدیریت لایسنس‌ها", icon: Key, href: "/admin/licenses" },
                  { label: "گزارش فروش", icon: TrendingUp, href: "/admin/reports" },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 w-full text-right bg-[#1c1b1a] hover:bg-[#242322] border border-[#2d2c2a] hover:border-[#8b5cf6]/30 rounded-xl px-4 py-3 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center group-hover:bg-[#8b5cf6]/20 transition-colors">
                      <action.icon size={13} className="text-[#8b5cf6]" />
                    </div>
                    <span className="font-body text-sm text-[#a8a29e] group-hover:text-[#fafaf9] transition-colors">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Revenue summary */}
            <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-5">
              <h2 className="font-body font-semibold text-[#fafaf9] text-sm mb-4">درآمد</h2>
              <div className="space-y-3">
                {[
                  { label: "امروز", value: "۲,۳۵۰,۰۰۰" },
                  { label: "این هفته", value: "۱۴,۸۰۰,۰۰۰" },
                  { label: "این ماه", value: "۵۶,۴۰۰,۰۰۰" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-body text-xs text-[#57534e]">{item.label}</span>
                    <span className="font-display text-sm text-[#fafaf9]">{item.value} ت</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
