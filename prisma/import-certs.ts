import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CERTS_DIR = path.join(__dirname, "certs");

/**
 * فایل UX ۱۴۰۳ فعلاً وارد نمی‌شه.
 *
 * دلیل: کدهاش (2040301+) دقیقاً با کدهای UX ۱۴۰۴ تداخل دارن — ۳۸ کد مشترک،
 * که هر کدوم به دو نفر متفاوت اشاره می‌کنن. چون گواهی‌ها قبلاً با همین کدها
 * صادر شدن، کد قابل تغییر نیست. UX ۱۴۰۴ تعداد بیشتری داره پس اون وارد می‌شه.
 * ضمناً کد 2040337 داخل خود همین فایل دو بار تکرار شده.
 *
 * بعد از اصلاح کدهای این فایل، فقط کافیه این ثابت رو خالی کنی.
 */
const SKIP_FILES_CONTAINING = "تجربه کاربری سال 1403";

interface CertRow {
  code: string;
  studentName: string;
  track: "UI" | "UX";
  year: string;
  startDate: string;
}

function parseFile(fileName: string): CertRow[] {
  const wb = XLSX.readFile(path.join(CERTS_DIR, fileName));
  const sheet = wb.Sheets[wb.SheetNames[0]];

  // ردیف اول متن راهنماست و هدر واقعی ردیف سومه، پس از ردیف ۳ به بعد می‌خونیم
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    header: ["id", "name", "date"],
    range: 2,
    defval: "",
  });

  const track: "UI" | "UX" = fileName.includes("رابط کاربری") ? "UI" : "UX";
  const year = fileName.includes("1403") ? "1403" : "1404";

  return rows
    .map((r) => ({
      code: String(r.id ?? "").trim(),
      studentName: String(r.name ?? "").trim(),
      startDate: String(r.date ?? "").trim(),
      track,
      year,
    }))
    // ردیف هدر و صدها ردیف خالی انتهای فایل‌ها حذف می‌شن؛ کد باید تماماً عددی باشه
    .filter((r) => r.studentName !== "" && /^\d+$/.test(r.code));
}

async function main() {
  const files = fs.readdirSync(CERTS_DIR).filter((f) => f.endsWith(".xlsx"));
  const all: CertRow[] = [];

  for (const file of files) {
    if (SKIP_FILES_CONTAINING && file.includes(SKIP_FILES_CONTAINING)) {
      console.log(`⏭  رد شد (کد تکراری): ${file}`);
      continue;
    }
    const rows = parseFile(file);
    console.log(`✓ ${rows[0]?.track} ${rows[0]?.year} — ${rows.length} رکورد`);
    all.push(...rows);
  }

  // محافظ: اگه فایل جدیدی در آینده کد تکراری داشت، قبل از خراب‌کردن دیتا متوقف شو
  const seen = new Map<string, string>();
  const dups: string[] = [];
  for (const r of all) {
    const prev = seen.get(r.code);
    if (prev) dups.push(`${r.code}: «${prev}» و «${r.studentName}»`);
    else seen.set(r.code, r.studentName);
  }
  if (dups.length) {
    console.error(`\n✗ ${dups.length} کد تکراری پیدا شد — ایمپورت متوقف شد:`);
    dups.forEach((d) => console.error("   " + d));
    process.exit(1);
  }

  for (const r of all) {
    await prisma.certificate.upsert({
      where: { code: r.code },
      update: r,
      create: r,
    });
  }

  const total = await prisma.certificate.count();
  console.log(`\n✅ ${all.length} رکورد وارد شد. مجموع در دیتابیس: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
