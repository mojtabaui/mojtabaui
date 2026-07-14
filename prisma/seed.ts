import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const courses = [
    {
      slug: "ui-infinity",
      title: "طراحی رابط کاربری بی‌نهایت",
      subtitle: "UI INFINITY",
      description: "ویدیو + ۱۰ هفته منتورینگ + پروژه واقعی — دوره جامع UI از مبتدی تا حرفه‌ای",
      price: 7000000,
      level: "BEGINNER" as const,
      isPublished: true,
      spotplayerId: null as string | null, // TODO: شناسه دوره در اسپات پلیر رو اینجا بذار
    },
    {
      slug: "ux-infinity",
      title: "طراحی تجربه کاربری بی‌نهایت",
      subtitle: "UX INFINITY",
      description: "ویدیو + ۱۰ هفته منتورینگ + پروژه واقعی — دوره جامع UX از مبتدی تا حرفه‌ای",
      price: 7000000,
      level: "BEGINNER" as const,
      isPublished: true,
      spotplayerId: null as string | null, // TODO: شناسه دوره در اسپات پلیر
    },
    {
      slug: "ui-offline",
      title: "طراحی رابط کاربری",
      subtitle: "UI DESIGN",
      description: "دوره آفلاین UI — ویدیوهای کامل بدون منتورینگ",
      price: 4000000,
      level: "BEGINNER" as const,
      isPublished: true,
      spotplayerId: null as string | null, // TODO: شناسه دوره در اسپات پلیر
    },
    {
      slug: "ux-offline",
      title: "طراحی تجربه کاربری",
      subtitle: "UX DESIGN",
      description: "دوره آفلاین UX — ویدیوهای کامل بدون منتورینگ",
      price: 4000000,
      level: "BEGINNER" as const,
      isPublished: true,
      spotplayerId: null as string | null, // TODO: شناسه دوره در اسپات پلیر
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
    console.log(`✓ ${course.slug}`);
  }

  console.log("\nدوره‌ها با موفقیت در دیتابیس ثبت شدن.");
  console.log("یادت باشه spotplayerId هر دوره رو بعد از دریافت از اسپات پلیر آپدیت کنی.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
