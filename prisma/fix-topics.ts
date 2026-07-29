/**
 * یک‌بار مصرف: دو ردیفی که موقع وارد کردن از شیت خراب شدن.
 *
 * اجرا:  npx tsx prisma/fix-topics.ts
 *
 * ۱) «معرفی آژانس خدمات منزل» — این سطر توی شیت ستون پلتفرم رو نداشت،
 *    پس همه‌چیز یک خانه لغزید: «ساده» رفت توی پلتفرم و توضیح رفت توی
 *    درجهٔ سختی.
 *
 * ۲) «اپلیکیشن راهنمای والدین دارای فرزند با نیازهای خاص» — سختیش
 *    «سحن» مونده بود. اصلاحش توی اسکریپت استخراج با \b نوشته شده بود و
 *    \b روی حروف فارسی مرز کلمه تشخیص نمی‌ده، برای همین اعمال نشد.
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
  const a = await prisma.projectTopic.updateMany({
    where: { title: "معرفی آژانس خدمات منزل", track: "UI" },
    data: {
      platform: "وبسایت",
      difficulty: "ساده",
      detail:
        "طراحی و ارائه استایل گاید و رابط کاربری حداقل صفحه اصلی لندینگ بصورت ریسپانسیو",
    },
  });

  const b = await prisma.projectTopic.updateMany({
    where: { difficulty: "سحن" },
    data: { difficulty: "سخت" },
  });

  console.log(`آژانس خدمات منزل: ${a.count} | سحن→سخت: ${b.count}`);

  const OK = ["ساده", "متوسط", "سخت", "آسان", ""];
  const left = await prisma.projectTopic.count({
    where: { NOT: { difficulty: { in: OK } } },
  });
  const noDetail = await prisma.projectTopic.count({ where: { detail: "" } });
  console.log(`سختیِ نامعتبر باقی‌مانده: ${left} | بدون توضیح: ${noDetail}`);

  await prisma.$disconnect();
})();
