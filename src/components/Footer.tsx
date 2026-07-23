import Link from "next/link";
import { BrandGlyph } from "@/components/BrandMark";
import { Send, Camera, Mail, ExternalLink, ArrowLeft } from "lucide-react";

const courses = [
  { href: "/courses/ui-infinity", label: "UI بی‌نهایت" },
  { href: "/courses/ux-infinity", label: "UX بی‌نهایت" },
  { href: "/courses/ui-offline",  label: "UI آفلاین"   },
  { href: "/courses/portfolio",   label: "پورتفولیو"    },
  { href: "/courses/prototype",   label: "پروتوتایپ"    },
];

const content = [
  { href: "/checklist",    label: "چک‌لیست یادگیری"        },
  { href: "/articles",     label: "مقالات"               },
  { href: "/free",         label: "منابع رایگان"          },
  { href: "/projects",     label: "نمونه‌کارهای دانشجوها" },
  { href: "/courses",      label: "همه دوره‌ها"           },
  { href: "/certificates", label: "استعلام گواهی"         },
];

const about = [
  { href: "/#about",                         label: "درباره من", ext: false },
  { href: "https://myazdanpanah.vercel.app", label: "پرتفولیو",  ext: true  },
  { href: "/#contact",                       label: "تماس با من", ext: false },
  // ورود/ثبت‌نام موقتاً مخفی — با حساب کاربری برمی‌گردن:
  // { href: "/auth/login",    label: "ورود به پنل",    ext: false },
  // { href: "/auth/register", label: "ثبت‌نام رایگان", ext: false },
];

const socials = [
  { href: "https://instagram.com/mojtabaui",           label: "Instagram", Icon: Camera },
  { href: "https://t.me/melina_support",               label: "Telegram",  Icon: Send   },
  { href: "mailto:mojtaba.yazdanpanah0771@gmail.com",  label: "Email",     Icon: Mail   },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1714] text-white mt-auto">

      {/* ── Brand banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 border-b border-white/[0.06]">
        <div className="flex items-end justify-between flex-wrap gap-8">

          {/* Brand — DOM first = RIGHT in RTL */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <BrandGlyph size={52} className="text-[#FAF6F1] flex-shrink-0" />
              <span className="font-body font-black text-2xl tracking-tight">مدرسه دیزاین ملینا</span>
            </div>
            <p className="text-white/40 text-sm font-body">آموزش تخصصی UI/UX</p>
          </div>

          {/* CTA — DOM second = LEFT in RTL */}
          {/* تا وقتی حساب کاربری مخفیه، CTA به‌جای ثبت‌نام به دوره‌ها می‌ره */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-white text-[#1a1714] font-body font-bold text-sm px-5 py-3 rounded-2xl hover:bg-white/90 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={14} />
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* دوره‌ها — DOM first = rightmost in RTL */}
          <div>
            <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
              COURSES
            </div>
            <div className="space-y-3.5">
              {courses.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-white/45 hover:text-white text-sm font-body transition-colors leading-relaxed"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* محتوا */}
          <div>
            <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
              CONTENT
            </div>
            <div className="space-y-3.5">
              {content.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-white/45 hover:text-white text-sm font-body transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* mojtabaui */}
          <div>
            <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
              ABOUT
            </div>
            <div className="space-y-3.5">
              {about.map((l) =>
                l.ext ? (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/45 hover:text-white text-sm font-body transition-colors"
                  >
                    {l.label}
                    <ExternalLink size={11} className="opacity-50" />
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block text-white/45 hover:text-white text-sm font-body transition-colors"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* ارتباط — DOM last = leftmost in RTL */}
          <div>
            <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
              CONNECT
            </div>
            <div className="space-y-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/45 hover:text-white text-sm font-body transition-colors group"
                >
                  <span className="w-8 h-8 rounded-xl bg-white/[0.06] group-hover:bg-white/[0.12] flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon size={14} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <span className="text-white/20 text-xs font-body">© ۱۴۰۵ مدرسه دیزاین ملینا · همه حقوق محفوظ است</span>
        <span className="text-white/20 text-[11px] font-display tracking-[0.25em]">UI · UX · DESIGN</span>
      </div>

    </footer>
  );
}
