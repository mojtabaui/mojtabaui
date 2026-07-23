"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft, User } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const navLinks = [
  { href: "/courses", label: "دوره‌ها" },
  { href: "/projects", label: "نمونه کارها" },
  { href: "/free", label: "رایگان" },
  { href: "/checklist", label: "چک‌لیست یادگیری" },
  { href: "/articles", label: "مقالات" },
  { href: "/certificates", label: "گواهی‌ها" },
  { href: "/#about", label: "درباره من" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f4ef]/90 backdrop-blur-sm border-b border-[#e8e2d9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">

        {/* نشان و نام برند — راست در RTL */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <BrandMark size={38} rounded={28} />
          <span className="font-body font-bold text-[15px] text-[#1a1714] whitespace-nowrap">
            مدرسه دیزاین ملینا
          </span>
        </Link>

        {/* منو، دقیقاً وسط */}
        <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#6b6560] hover:text-[#1a1714] transition-colors text-sm font-body whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* دکمه‌ی اقدام و حساب کاربری — چپ در RTL.
            در RTL اولین عنصرِ DOM سمت راست می‌شینه، پس CTA اول میاد تا
            آیکن حساب سمت چپِ دکمه بیفته. */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            شروع کن
            <ArrowLeft size={15} />
          </Link>

          {/* حساب کاربری هنوز فعال نیست، پس button غیرفعاله نه لینک.
              راهنمای «به زودی» با hover و focus هر دو باز می‌شه تا کاربر
              کیبورد هم ببیندش. */}
          <div className="relative group">
            <button
              type="button"
              disabled
              aria-label="حساب کاربری، به زودی"
              className="w-10 h-10 rounded-xl bg-white border border-[#e8e2d9] flex items-center justify-center text-[#a09990] cursor-not-allowed transition-colors group-hover:border-[#1a1714]/20 group-hover:text-[#6b6560]"
            >
              <User size={16} />
            </button>
            <span
              role="tooltip"
              className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-lg bg-[#1a1714] px-2.5 py-1.5 font-body text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            >
              به زودی
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          className="lg:hidden text-[#6b6560] hover:text-[#1a1714] transition-colors md:mr-4"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-[#e8e2d9] bg-[#f7f4ef] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-[#6b6560] hover:text-[#1a1714] py-2 text-sm font-body transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/courses"
            onClick={() => setIsOpen(false)}
            className="md:hidden flex items-center justify-center gap-2 bg-[#1a1714] text-white font-body font-semibold text-sm py-3 rounded-xl mt-2"
          >
            شروع کن
            <ArrowLeft size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
