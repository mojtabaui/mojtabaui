"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/courses", label: "دوره‌ها" },
  { href: "/projects", label: "نمونه کارها" },
  { href: "/free", label: "رایگان" },
  { href: "/articles", label: "مقالات" },
  { href: "/certificates", label: "گواهی‌ها" },
  { href: "/#about", label: "درباره من" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f4ef]/90 backdrop-blur-sm border-b border-[#e8e2d9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1a1714] flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">m</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm text-[#1a1714]">mojtabaui</div>
            <div className="text-[#a09990] text-[10px] font-body -mt-0.5">مدرسه دیزاین ملینا</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-[#6b6560] hover:text-[#1a1714] transition-colors text-sm font-body">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ورود / ثبت‌نام / پنل — موقتاً مخفی تا وقتی حساب کاربری رو دوباره فعال کنیم.
            صفحه‌هاش پابرجان (/auth/login مستقیم باز می‌شه)، فقط از منو برداشته شدن.
            برای برگردوندن: کامنت پایین رو بردار. */}
        {/* <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login"
            className="text-[#6b6560] hover:text-[#1a1714] text-sm transition-colors font-body">
            ورود
          </Link>
          <Link href="/auth/register"
            className="bg-[#1a1714] hover:bg-[#2d2926] text-white text-sm px-4 py-2 rounded-xl transition-colors font-body font-medium">
            ثبت‌نام رایگان
          </Link>
          <Link href="/dashboard"
            className="w-9 h-9 rounded-xl bg-white border border-[#e8e2d9] hover:border-[#7c5cfc]/40 flex items-center justify-center transition-colors text-[#6b6560]">
            <User size={15} />
          </Link>
        </div> */}

        <button onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#6b6560] hover:text-[#1a1714] transition-colors">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#e8e2d9] bg-[#f7f4ef] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className="block text-[#6b6560] hover:text-[#1a1714] py-2 text-sm font-body transition-colors">
              {link.label}
            </Link>
          ))}
          {/* ورود/ثبت‌نام موبایل — موقتاً مخفی (بالا رو ببین) */}
          {/* <div className="pt-3 border-t border-[#e8e2d9] flex gap-3">
            <Link href="/auth/login"
              className="flex-1 text-center border border-[#e8e2d9] text-[#6b6560] text-sm py-2 rounded-xl font-body">
              ورود
            </Link>
            <Link href="/auth/register"
              className="flex-1 text-center bg-[#1a1714] text-white text-sm py-2 rounded-xl font-body">
              ثبت‌نام
            </Link>
          </div> */}
        </div>
      )}
    </header>
  );
}
