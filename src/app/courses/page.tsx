import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesClient from "@/components/CoursesClient";
import { infinityCourses, videoCourses, workshopCourses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-body font-bold text-4xl md:text-5xl text-[#1a1714] mb-2">
            دوره‌ها
          </h1>
          <p className="text-[#a09990] font-body text-lg mb-12 max-w-xl">
            از صفر تا حرفه‌ای — با یا بدون منتورینگ، هر طور که راحتی.
          </p>
          <CoursesClient
            infinityCourses={infinityCourses}
            videoCourses={videoCourses}
            workshopCourses={workshopCourses}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
