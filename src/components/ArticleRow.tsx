"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { useState } from "react";
import type { Article } from "@/lib/mock-data";

interface Props {
  article: Article;
  index: number;
}

export default function ArticleRow({ article, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="relative flex items-center gap-4 sm:gap-6 py-6"
      style={{
        borderBottom: "1px solid #e8e2d9",
        backgroundColor: hovered ? article.accent + "0d" : "transparent",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated right accent bar */}
      <span
        aria-hidden
        className="absolute right-0 rounded-full pointer-events-none"
        style={{
          top: "12px",
          bottom: "12px",
          width: "3px",
          backgroundColor: article.accent,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleY(1)" : "scaleY(0.2)",
          transformOrigin: "center",
          transition: "opacity 0.25s, transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Index number */}
      <span
        className="font-display text-[11px] font-bold tracking-[0.18em] flex-shrink-0 w-7"
        style={{
          color: hovered ? article.accent : "#cfc9c1",
          transition: "color 0.25s",
        }}
      >
        {num}
      </span>

      {/* Title */}
      <h3 className="font-body font-bold text-[#1a1714] text-[15px] sm:text-[17px] leading-snug flex-1">
        {article.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        <span
          className="hidden lg:inline-flex text-[10px] font-body font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: article.accent + "15", color: article.accent }}
        >
          {article.category}
        </span>
        <span className="text-[11px] font-body text-[#b0a89f] whitespace-nowrap">
          {article.readTime} دقیقه
        </span>
        <span
          className="hidden sm:flex items-center gap-1 text-[10px] font-body font-semibold whitespace-nowrap"
          style={{
            color: article.accent,
            width: "52px",
            opacity: article.downloadFile ? 1 : 0,
          }}
        >
          <Download size={10} />
          دانلود
        </span>
      </div>
    </Link>
  );
}
