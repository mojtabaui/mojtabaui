"use client";

const ITEMS = [
  "UI Design", "UX Design", "Figma", "Design System",
  "Atomic Design", "Typography", "Color Theory", "Interaction Design",
  "User Research", "Wireframe", "Case Study", "Mentoring",
  "Real Projects", "From Zero", "Card Sorting", "Prototyping",
];

export default function MarqueeBand() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-[#2a2520] bg-[#1a1714] py-3 select-none" dir="ltr">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 px-5">
              {item}
            </span>
            <span className="text-white/10 text-[10px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
