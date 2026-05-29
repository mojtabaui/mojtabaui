"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/mock-data";
import { Sparkles, Video } from "lucide-react";

interface Props {
  infinityCourses: Course[];
  videoCourses: Course[];
}

const tabs = [
  { key: "infinity", label: "بی‌نهایت", icon: <Sparkles size={14} />, desc: "ویدیو + منتورینگ + پروژه" },
  { key: "video",    label: "ویدیویی",  icon: <Video    size={14} />, desc: "بدون منتورینگ، به تمپو خودت" },
];

export default function CoursesClient({ infinityCourses, videoCourses }: Props) {
  const [active, setActive] = useState<"infinity" | "video">("infinity");
  const list = active === "infinity" ? infinityCourses : videoCourses;

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 p-1 bg-white border border-[#e8e2d9] rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key as "infinity" | "video")}
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
