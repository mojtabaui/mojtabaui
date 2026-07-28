/**
 * یک‌بار مصرف: یادداشت‌های مالی و برچسب «دوره تأیید نشده» رو از جدول
 * StudentProject پاک می‌کنه. این جدول جای پیگیری پروژه‌ست نه دفتر مالی.
 *
 * اجرا:  npx tsx prisma/clear-student-notes.ts
 *
 * مقادیری که پاک می‌شن (پشتوانه، اگه بعداً لازم شد):
 *   راضیه حسینی [UI/UX]      ۳۴۶۰ مانده
 *   زهرا فرشچیان [UI/UX]     اقساطی ۲۶۰۰
 *   محمود سجادی [UI/UX]      ۲۶۰۰ مانده
 *   مرضیه دهقانی [UI/UX]     اقساطی ۲۶۰۰ مانده
 *   مریم فرهنگی [UI/UX]      دوره تأیید نشده  ← دوره‌اش تأیید شد
 *   مهدی الکن [UI]           اقساطی ۱ مانده
 *   مهنوش عزتی [UX]          اقساطی ۱۵۰۰ مانده
 *   میکائیل جمالی [UI/UX]    اقساطی ۲۶۰۰ مانده
 *   نگین شایسته نیا [UI/UX]  اقساطی ۲۶۰۰ مانده
 *   نیلوفر پروندی [UI/UX]    اقساطی ۲۶۰۰ مانده
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "node:fs";

function envFromFile(key: string): string {
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && m[1] === key) return m[2];
  }
  throw new Error(`${key} not found in .env.local`);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: envFromFile("DATABASE_URL") }),
});

(async () => {
  const cleared = await prisma.studentProject.updateMany({
    where: { NOT: { note: null } },
    data: { note: null },
  });
  console.log(`یادداشت پاک‌شده: ${cleared.count}`);

  // دادهٔ تستی که موقع بررسی فرم عمومی روی ردیف مریم فرهنگی [UI] نشست
  const test = await prisma.studentProject.updateMany({
    where: { topic: "تست اتصال فرم" },
    data: { topic: "", fileLink: "" },
  });
  console.log(`ردیف تستی پاک‌شده: ${test.count}`);

  const left = await prisma.studentProject.count({ where: { NOT: { note: null } } });
  const total = await prisma.studentProject.count();
  const certs = await prisma.certificate.count();
  console.log(`باقی‌مانده: ${left} | کل هنرجوها: ${total} | گواهی‌ها: ${certs}`);

  await prisma.$disconnect();
})();
