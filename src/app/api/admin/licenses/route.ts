import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/campaign-admin";
import { findLicenseCourse } from "@/lib/license-courses";
import { createLicense, SpotPlayerError } from "@/lib/spotplayer";
import { toLatinDigits } from "@/lib/persian-months";

/**
 * POST → یک لایسنس تازه روی اسپات‌پلیر برای یک نفر، و ثبتش توی دیتابیس.
 * ثبت گروهی از سمت فرم نفر به نفر همین رو صدا می‌زنه تا خطای یک نفر
 * بقیه رو نخوابونه.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = String(body.name ?? "").trim().slice(0, 120);
  const phone = toLatinDigits(String(body.phone ?? "")).replace(/[\s-]/g, "").slice(0, 30);
  const note = String(body.note ?? "").trim().slice(0, 300);
  const test = Boolean(body.test);

  // فقط شناسه‌هایی که توی فهرست دوره‌ها هستن پذیرفته می‌شن
  const courses = Array.isArray(body.courseIds)
    ? [...new Set(body.courseIds.map(String))]
        .map(findLicenseCourse)
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];

  // بدون عدد مشخص، کمترین سهمیهٔ دوره‌های انتخاب‌شده — تا چیزی که
  // توی نامه نوشته می‌شه با لایسنس واقعی یکی باشه
  const devicesRaw = Number(toLatinDigits(String(body.devices ?? "")));
  const devices =
    Number.isInteger(devicesRaw) && devicesRaw > 0
      ? Math.min(devicesRaw, 99)
      : courses.length
        ? Math.min(...courses.map((c) => c.devices))
        : undefined;

  if (!name) return NextResponse.json({ error: "اسم خالیه" }, { status: 400 });
  if (!/^\+?\d{6,15}$/.test(phone)) {
    return NextResponse.json({ error: "شمارهٔ موبایل درست نیست" }, { status: 400 });
  }
  if (courses.length === 0) {
    return NextResponse.json({ error: "حداقل یک دوره انتخاب کن" }, { status: 400 });
  }

  const courseIds = courses.map((c) => c.spotplayerId);
  let license;
  try {
    license = await createLicense({ courses: courseIds, name, watermark: phone, test, devices });
  } catch (e) {
    const msg = e instanceof SpotPlayerError ? e.message : "ارتباط با اسپات‌پلیر برقرار نشد";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // لایسنس روی اسپات‌پلیر ساخته شده؛ اگه ثبت دیتابیس شکست بخوره کلید
  // نباید گم بشه، پس در هر حال برگردونده می‌شه.
  let id: string | null = null;
  try {
    const row = await prisma.spotLicense.create({
      data: {
        spotId: license.id,
        key: license.key,
        url: license.url,
        name,
        phone,
        courseIds,
        test,
        devices: devices ?? null,
        note,
      },
    });
    id = row.id;
  } catch {
    // پایین با id خالی گزارش می‌شه
  }

  return NextResponse.json({ ok: true, id, key: license.key, url: license.url });
}
