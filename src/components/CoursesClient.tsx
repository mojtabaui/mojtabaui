"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/mock-data";
import { Sparkles, Video, Presentation } from "lucide-react";
import { useLang } from "@/components/Providers";

type TabKey = "infinity" | "video" | "workshop";

interface Props {
  infinityCourses: Course[];
  videoCourses: Course[];
  workshopCourses: Course[];
}

const TAB_COPY = {
  fa: {
    infinity: { label: "بی‌نهایت", desc: "ویدیو + منتورینگ + پروژه" },
    video: { label: "ویدیویی", desc: "بدون منتورینگ، به تمپو خودت" },
    workshop: { label: "کارگاه‌ها", desc: "کارگاه‌های زنده و فشرده" },
  },
  en: {
    infinity: { label: "Infinity", desc: "video + mentoring + a project" },
    video: { label: "Video only", desc: "no mentoring, at your own tempo" },
    workshop: { label: "Workshops", desc: "live and intensive" },
  },
} as const;

const TAB_ICON: Record<TabKey, React.ReactNode> = {
  infinity: <Sparkles size={14} />,
  video: <Video size={14} />,
  workshop: <Presentation size={14} />,
};

export default function CoursesClient({ infinityCourses, videoCourses, workshopCourses }: Props) {
  const lang = useLang();
  const copy = TAB_COPY[lang];
  const [active, setActive] = useState<TabKey>("infinity");
  // تب‌های خالی نمایش داده نمی‌شن (مثلاً وقتی کارگاهی فعال نیست)
  const tabs = (Object.keys(copy) as TabKey[])
    .filter((key) => (key === "workshop" ? workshopCourses.length > 0 : true))
    .map((key) => ({ key, icon: TAB_ICON[key], ...copy[key] }));
  const list =
    active === "infinity" ? infinityCourses : active === "workshop" ? workshopCourses : videoCourses;

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 p-1 bg-white border border-[#e8e2d9] rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="relative px-5 py-2.5 rounded-xl text-sm font-body transition-colors duration-200 flex items-center gap-2"
          >
            {active === tab.key && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-[#1a1714] rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${active === tab.key ? "text-white" : "text-[#6b6560]"}`}>
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] hidden sm:inline transition-colors duration-200 ${active === tab.key ? "text-white/60" : "text-[#a09990]"}`}>
                — {tab.desc}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Course grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {list.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
