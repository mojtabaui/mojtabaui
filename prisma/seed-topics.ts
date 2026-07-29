/**
 * وارد کردن موضوع‌های پیشنهادی از شیت ورودی تیر ۱۴۰۵.
 *
 * اجرا:  npx tsx prisma/seed-topics.ts
 *
 * قابل تکرار اجراست: موضوعی که عنوان و دوره‌اش از قبل هست دوباره ساخته
 * نمی‌شه. پس اگه شیت را به‌روز کردی و دوباره اجرا کردی، فقط تازه‌ها اضافه
 * می‌شن و چیزی که خودت از پنل اضافه کرده بودی پاک نمی‌شه.
 *
 * منبع: prisma/project-topics.json — از PDF خروجیِ گوگل‌شیت استخراج شده.
 */
import { PrismaClient, type ProjectTrack } from "@prisma/client";
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

type Row = {
  track: "UI" | "UX";
  title: string;
  category: string;
  platform: string;
  difficulty: string;
  detail: string;
  recommended: boolean;
};

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: envFromFile("DATABASE_URL") }),
});

(async () => {
  const rows: Row[] = JSON.parse(
    readFileSync("prisma/project-topics.json", "utf8")
  );

  const existing = await prisma.projectTopic.findMany({
    select: { track: true, title: true },
  });
  const seen = new Set(existing.map((e) => `${e.track}::${e.title}`));

  const fresh = rows.filter((r) => !seen.has(`${r.track}::${r.title}`));

  if (fresh.length === 0) {
    console.log("همه‌ی موضوع‌ها از قبل هستن، چیزی اضافه نشد.");
  } else {
    await prisma.projectTopic.createMany({
      data: fresh.map((r) => ({
        track: r.track as ProjectTrack,
        title: r.title,
        category: r.category,
        platform: r.platform,
        difficulty: r.difficulty,
        detail: r.detail,
        recommended: r.recommended,
      })),
    });
    console.log(`اضافه شد: ${fresh.length}`);
  }

  const ui = await prisma.projectTopic.count({ where: { track: "UI" } });
  const ux = await prisma.projectTopic.count({ where: { track: "UX" } });
  const rec = await prisma.projectTopic.count({ where: { recommended: true } });
  console.log(`رابط: ${ui} | تجربه: ${ux} | پیشنهادی: ${rec}`);

  await prisma.$disconnect();
})();
