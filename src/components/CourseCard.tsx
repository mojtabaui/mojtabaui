"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Layers, ArrowLeft, Calendar, User } from "lucide-react";
import { Course, formatPrice, formatStudents, typeLabel } from "@/lib/mock-data";

const imageMap: Record<string, string> = {
  "ui-infinity": "/images/ui_infinity.png",
  "ux-infinity": "/images/ux_infinity.png",
  "ui-offline":  "/images/ui_normal.png",
  "ux-offline":  "/images/ux_normal.png",
  "portfolio":   "/images/portfolio.png",
  "prototype":   "/images/prototype.png",
};

const colorMap: Record<string, { bg: string; badge: string; tag: string; accent: string }> = {
  "ui-infinity": { bg: "#FFF0EE", badge: "#FECACA",  tag: "#FECACA99",  accent: "#dc2626" },
  "ux-infinity": { bg: "#EEF3FF", badge: "#BFDBFE",  tag: "#BFDBFE99",  accent: "#1d4ed8" },
  "ui-offline":  { bg: "#FFF5F5", badge: "#FEE2E2",  tag: "#FEE2E299",  accent: "#ef4444" },
  "ux-offline":  { bg: "#F0F4FF", badge: "#DBEAFE",  tag: "#DBEAFE99",  accent: "#2563eb" },
  "portfolio":   { bg: "#F0FDF4", badge: "#BBF7D0",  tag: "#BBF7D099",  accent: "#16a34a" },
  "prototype":   { bg: "#FFF7ED", badge: "#FED7AA",  tag: "#FED7AA99",  accent: "#ea580c" },
  "claude-for-designers": { bg: "#FBF0EA", badge: "#F3D9C7", tag: "#F3D9C799", accent: "#C2410C" },

};

export default function CourseCard({ course }: { course: Course }) {
  const c   = colorMap[course.slug] ?? colorMap["ui-infinity"];
  const img = imageMap[course.slug];

  // کارت همیشه به صفحه‌ی خود دوره می‌ره، حتی وقتی دوره لینک خرید بیرونی داره.
  // قبلاً externalUrl کاربر رو مستقیم می‌برد اسپات‌پلیر و صفحه‌ی دوره با
  // سرفصل و توضیحاتش اصلاً دیده نمی‌شد. لینک بیرونی جای خودش، روی دکمه‌ی
  // خرید داخل همون صفحه‌ست.
  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ backgroundColor: c.bg }}
        className="rounded-3xl p-7 cursor-pointer"
      >
        {/* ── Header: subtitle+title (right) | image (left) ── */}
        <div className="flex items-start justify-between gap-5 mb-5">

          {/* Text — right side in RTL */}
          <div className="flex-1 min-w-0 pt-1">
            <div
              className="font-display text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: c.accent }}
            >
              {course.subtitle}
            </div>
            <h3 className="font-body font-bold text-[#1a1714] text-2xl leading-tight">
              {course.title}
            </h3>
          </div>

          {/* Image — left side in RTL, large, no bg */}
          {img && (
            <motion.div
              className="flex-shrink-0"
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
            >
              <Image
                src={img}
                alt={course.title}
                width={150}
                height={150}
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          )}
        </div>

        {/* ── Badges ── */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.isBestseller && (
            <span className="text-[11px] font-body font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: c.badge, color: c.accent }}>
              پرفروش
            </span>
          )}
          {course.isNew && (
            <span className="text-[11px] font-body font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: c.badge, color: c.accent }}>
              جدید
            </span>
          )}
          <span className="text-[11px] font-body font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: c.badge, color: c.accent }}>
            {typeLabel(course.type)}
          </span>
        </div>

        {/* ── Price ── */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-body font-bold text-xl text-[#1a1714]">
            {formatPrice(course.price)}
          </span>
          {course.originalPrice && (
            <span className="font-body text-sm text-[#a09990] line-through">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>

        {/* ── Description ── */}
        <p className="text-[#6b6560] text-sm font-body leading-relaxed line-clamp-2 mb-5">
          {course.description}
        </p>

        {/* ── Stats ── */}
        <div className="flex items-center flex-wrap gap-4 text-[#6b6560] text-xs font-body mb-5">
          {course.type === "workshop" ? (
            <>
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {course.durationHours} ساعت
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} /> {course.sessionDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={12} /> ظرفیت {course.capacity} نفر
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {course.videoHours} ساعت ویدیو
              </span>
              {course.type === "infinity" ? (
                <span className="flex items-center gap-1.5">
                  <Users size={12} /> {course.mentoringHours} ساعت منتورینگ
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> پشتیبانی {course.supportMonths} ماهه
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Layers size={12} /> {course.projects} پروژه
              </span>
            </>
          )}
          {/* دوره‌های تازه هنوز دانشجو ندارن، پس عدد صفر رو نشون نمی‌دیم */}
          {course.students > 0 && (
            <span className="flex items-center gap-1.5">
              <User size={12} /> {formatStudents(course.students)} دانشجو
            </span>
          )}
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[10px] font-body px-2.5 py-1 rounded-full"
              style={{ backgroundColor: c.tag, color: c.accent }}>
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="inline-flex items-center gap-2 bg-[#1a1714] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl"
          whileHover={{ gap: "10px" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          مشاهده دوره
          <ArrowLeft size={14} />
        </motion.div>

      </motion.div>
    </Link>
  );
}
