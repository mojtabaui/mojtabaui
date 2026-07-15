import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  BookOpen,
  Users,
  Mail,
  Award,
  Settings,
  ArrowLeft,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const [userCount, courseCount, certCount, unreadCount, messages] =
    await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.certificate.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

  const stats = [
    {
      label: "کاربران",
      value: userCount.toLocaleString("fa-IR"),
      icon: Users,
      color: "text-blue-400 bg-blue-400/10",
    },
    {
      label: "دوره‌ها",
      value: courseCount.toLocaleString("fa-IR"),
      icon: BookOpen,
      color: "text-violet-400 bg-violet-400/10",
    },
    {
      label: "گواهینامه‌ها",
      value: certCount.toLocaleString("fa-IR"),
      icon: Award,
      color: "text-emerald-400 bg-emerald-400/10",
    },
    {
      label: "پیام خوانده‌نشده",
      value: unreadCount.toLocaleString("fa-IR"),
      icon: Mail,
      color: "text-amber-400 bg-amber-400/10",
    },
  ];

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
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#57534e] hover:text-[#a8a29e] text-xs font-body transition-colors"
          >
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
            <span className="font-display text-xs tracking-[0.2em] uppercase text-[#8b5cf6]">
              Overview
            </span>
          </div>
          <h1 className="font-body font-bold text-2xl text-[#fafaf9]">داشبورد مدیریت</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
              >
                <stat.icon size={18} />
              </div>
              <div className="font-display font-bold text-2xl text-[#fafaf9] mb-0.5">
                {stat.value}
              </div>
              <div className="font-body text-[#57534e] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contact messages */}
        <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1e1d1c] flex items-center justify-between">
            <h2 className="font-body font-semibold text-[#fafaf9] text-sm">
              پیام‌های تماس
            </h2>
            <span className="font-display text-xs text-[#57534e] tracking-wider uppercase">
              Contact Messages
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Mail size={24} className="text-[#2d2c2a] mx-auto mb-3" />
              <p className="font-body text-[#57534e] text-sm">هنوز پیامی نیومده</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1e1d1c]">
              {messages.map((msg) => (
                <div key={msg.id} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-body font-semibold text-[#fafaf9] text-sm">
                        {msg.name}
                      </span>
                      {!msg.isRead && (
                        <span className="text-[10px] font-body px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400">
                          جدید
                        </span>
                      )}
                    </div>
                    <span className="font-body text-[#57534e] text-xs">
                      {msg.createdAt.toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <a
                      href={`mailto:${msg.email}`}
                      dir="ltr"
                      className="flex items-center gap-1.5 font-body text-[#a8a29e] hover:text-[#fafaf9] text-xs transition-colors"
                    >
                      <Mail size={11} />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        dir="ltr"
                        className="flex items-center gap-1.5 font-body text-[#a8a29e] hover:text-[#fafaf9] text-xs transition-colors"
                      >
                        <Phone size={11} />
                        {msg.phone}
                      </a>
                    )}
                  </div>

                  <p className="font-body text-[#a8a29e] text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
