import type { Metadata } from "next";
import ProjectTopicForm from "@/components/ProjectTopicForm";

export const metadata: Metadata = {
  title: "ثبت موضوع پروژه",
  description: "هنرجوهای دوره‌های حضوری موضوع پروژهٔ پایانی‌شون رو اینجا ثبت می‌کنن.",
  robots: { index: false, follow: false },
};

export default function ProjectPage() {
  return (
    <main className="native-cursor min-h-screen bg-[#0a0908] px-5 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="font-display text-2xl sm:text-3xl text-[#fafaf9] mb-2">
          موضوع پروژه‌ات چیه؟
        </h1>
        <p className="font-body text-sm text-[#a8a29e] leading-7 mb-8">
          همون موضوعی که قراره تا آخر دوره روش کار کنی. لازم نیست کامل و نهایی باشه،
          یک جملهٔ روشن کافیه. بعداً هم می‌تونی عوضش کنی، فقط دوباره همین فرم رو پر کن.
        </p>
        <ProjectTopicForm />
      </div>
    </main>
  );
}
