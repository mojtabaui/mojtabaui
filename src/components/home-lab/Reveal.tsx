"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ظاهر شدن بخش موقع اسکرول، با ۶۰۰ میلی‌ثانیه‌ی برندبوک.
 *
 * محتوا هیچ‌وقت پنهان رندر نمی‌شه: فقط وقتی جاوااسکریپت اجرا شده، کاربر
 * «کاهش حرکت» رو روشن نکرده و عنصر هنوز زیر صفحه‌ست، حالت انتظار می‌گیره.
 * پس بدون JS، با کاهش حرکت، یا برای چیزی که از اول توی دیده، هیچ پرشی نیست.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // فقط جابه‌جایی، بدون شفافیت. اگه observer به هر دلیلی اجرا نشه، محتوا
    // ۲۴ پیکسل پایین‌تر می‌مونه ولی دیده می‌شه.
    el.style.transform = "translateY(24px)";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transition = `transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
        el.style.transform = "none";
        io.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
