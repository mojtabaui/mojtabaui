"use client";

import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  color: string;
  accent: string;
}

const INITIAL = 9;

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="relative h-full bg-white/[0.04] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors overflow-hidden">
      {/* Decorative big quote */}
      <div
        className="absolute -top-2 left-4 font-display font-black leading-none select-none pointer-events-none"
        style={{ fontSize: "6rem", color: "white", opacity: 0.04 }}
      >
        &ldquo;
      </div>
      <div className="relative">
        <p className="text-white/70 font-body text-sm leading-relaxed mb-6">{t.text}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-body font-bold flex-shrink-0"
              style={{ backgroundColor: t.color, color: t.accent }}
            >
              {t.avatar}
            </div>
            <div>
              <div className="font-body font-semibold text-white text-sm">{t.name}</div>
              <div className="text-white/30 text-[10px] font-body">{t.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((j) => (
              <Star key={j} size={9} fill={t.accent} style={{ color: t.accent }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * گرید فیدبک‌ها با «مشاهده‌ی بیشتر».
 *
 * ۹ تای اول همیشه پیداست؛ بقیه پشت دکمه جمع می‌شن تا صفحه‌ی اصلی کوتاه بمونه.
 * چون باز و بسته شدن state داره، این تکه کلاینت‌ه، ولی خودِ داده از سرور میاد.
 */
export default function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const [expanded, setExpanded] = useState(false);
  const rest = testimonials.slice(INITIAL);
  const hasMore = rest.length > 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.slice(0, INITIAL).map((t, i) => (
          <FadeIn key={t.name + i} delay={i * 0.05}>
            <Card t={t} />
          </FadeIn>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {rest.map((t, i) => (
                <motion.div
                  key={t.name + i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card t={t} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-body font-semibold text-sm px-6 py-3 rounded-2xl transition-all"
          >
            {expanded ? "بستن" : `مشاهده‌ی ${toFa(rest.length)} فیدبک دیگر`}
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </>
  );
}

function toFa(n: number) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}
