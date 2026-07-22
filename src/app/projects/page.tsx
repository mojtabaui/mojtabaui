"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Send, Layers, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { studentProjects, type StudentProject } from "@/lib/mock-data";

type Filter = "all" | "ui" | "ux";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown =
    filter === "ui" ? studentProjects.filter((p) => p.courseType === "ui") :
    filter === "ux" ? studentProjects.filter((p) => p.courseType === "ux") :
    studentProjects;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-8 flex-wrap">
              <div className="max-w-xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
                  STUDENT WORK
                </div>
                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
                  نمونه کارها
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  پروژه‌های واقعی دانشجوهای دوره‌های رابط و تجربه کاربری، روی فیگما یا به
                  شکل کیس استادی.
                </p>
              </div>
              <div className="font-display font-black text-[#1a1714]/[0.07] text-7xl leading-none select-none">
                {String(studentProjects.length).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}
              </div>
            </div>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <div className="inline-flex items-center bg-white border border-[#e8e2d9] rounded-2xl p-1.5 gap-1">
            {([
              { key: "all", label: "همه" },
              { key: "ui",  label: "رابط کاربری" },
              { key: "ux",  label: "تجربه کاربری" },
            ] as { key: Filter; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-5 py-2 rounded-xl text-sm font-body transition-all ${
                  filter === tab.key
                    ? "bg-[#1a1714] text-white font-semibold"
                    : "text-[#6b6560] hover:text-[#1a1714]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6">
          {shown.length === 0 ? (
            <div className="text-center py-20 text-[#a09990] font-body text-sm">
              به‌زودی پروژه‌ها اضافه می‌شن...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shown.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a1714]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-body font-bold text-xl text-white mb-2">
              می‌خوای پروژه‌ات اینجا باشه؟
            </h2>
            <p className="text-white/40 font-body text-sm mb-6">
              دوره بی‌نهایت رو بخر، پروژه بزن، اینجا نمایش بده.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body font-semibold px-6 py-3 rounded-2xl transition-all text-sm"
            >
              مشاهده دوره‌ها
              <ArrowLeft size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectCard({ project }: { project: StudentProject }) {
  const isUI    = project.courseType === "ui";
  const isFigma = project.linkType === "figma";
  const color   = isUI ? "#FFF0EE" : "#EEF3FF";
  const accent  = isUI ? "#dc2626" : "#1d4ed8";

  return (
    <div className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden group hover:shadow-md transition-shadow">

      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.projectTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: color }}
          >
            <span className="opacity-30">{isUI ? "🖥" : "📋"}</span>
          </div>
        )}
        {/* Badge overlay */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <span
            className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: color + "ee", color: accent }}
          >
            {isUI ? "UI" : "UX"}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-body text-[#6b6560] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {isFigma ? <><Layers size={9} /> Figma</> : <><Send size={9} /> PDF</>}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-body font-bold text-[#1a1714] text-sm leading-snug mb-1.5">
          {project.projectTitle}
        </h3>
        <p className="text-[#6b6560] text-xs font-body leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-body px-2 py-0.5 rounded-full bg-[#f7f4ef] text-[#6b6560]">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#f0ebe4]">
          <span className="text-[#a09990] text-xs font-body">{project.studentName}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-body font-semibold transition-colors"
            style={{ color: accent }}
          >
            {isFigma ? "باز کن در Figma" : "دانلود PDF"}
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
