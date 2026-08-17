"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import LangSwitch from "@/components/LangSwitch";
import { useLang } from "@/components/Providers";
import { COMMON } from "@/lib/i18n/dict/common";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLang();
  const t = COMMON[lang];
  const rtl = lang === "fa";

  const navLinks = [
    { href: "/courses", label: t.nav.courses },
    { href: "/projects", label: t.nav.projects },
    { href: "/free", label: t.nav.free },
    { href: "/checklist", label: t.nav.checklist },
    // مقاله‌ها فقط فارسی‌ان، پس توی نسخهٔ انگلیسی اصلاً پیشنهاد نمی‌شن
    ...(rtl ? [{ href: "/articles", label: t.nav.articles }] : []),
    { href: "/certificates", label: t.nav.certificates },
    { href: "/#about", label: t.nav.about },
  ];

  /** پیکانِ «جلو» توی هر خط جهت خودش رو داره */
  const Forward = rtl ? ArrowLeft : ArrowRight;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f4ef]/90 backdrop-blur-sm border-b border-[#e8e2d9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[var(--nav-h)] flex items-center justify-between relative">

        {/* نشان و نام برند — ابتدای خط */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <BrandMark size={38} rounded={28} />
          <span className="font-body font-bold text-[15px] text-[#1a1714] whitespace-nowrap">
            {t.brand}
          </span>
        </Link>

        {/* منو، دقیقاً وسط.
            عنوان‌ها بلندن، پس در lg فشرده‌تر می‌شن تا با نشان و دکمه تلاقی نکنن
            و از xl به بعد فاصله‌ی راحتشون رو می‌گیرن. */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#6b6560] hover:text-[#1a1714] transition-colors text-[13px] xl:text-sm font-body whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* دکمه‌ی اقدام و تعویض زبان — انتهای خط.
            آیکن حساب کاربری موقتاً برداشته شده چون هنوز کاری نمی‌کنه؛
            تعویض زبان جای اون نشسته، بعد از CTA. */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.cta.start}
            <Forward size={15} />
          </Link>

          <LangSwitch />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t.menu.close : t.menu.open}
            className="text-[#6b6560] hover:text-[#1a1714] transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* بین md و lg منو بسته‌ست ولی دکمه‌ها هستن، پس فقط همبرگر می‌مونه */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t.menu.close : t.menu.open}
          className="hidden md:block lg:hidden text-[#6b6560] hover:text-[#1a1714] transition-colors"
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
            {t.cta.start}
            <Forward size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
