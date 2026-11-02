import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/campaign-admin";
import { findLicenseCourse, type LicenseCourse } from "@/lib/license-courses";
import { renderWelcomeLetter, letterFileName } from "@/lib/welcome-letter";

type Ctx = { params: Promise<{ id: string }> };

/**
 * GET → نامهٔ خوش‌آمدِ یک لایسنس.
 * بدون پارامتر توی مرورگر با نوار چاپ باز می‌شه؛ ?download=1 همون
 * فایل خودبسنده رو برای فرستادن دانلود می‌کنه. فقط ادمین: هر نامه
 * یک کلید لایسنس داره.
 */
export async function GET(req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  const row = await prisma.spotLicense.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "لایسنس پیدا نشد" }, { status: 404 });

  const courses = row.courseIds
    .map(findLicenseCourse)
    .filter((c): c is LicenseCourse => Boolean(c));

  const download = req.nextUrl.searchParams.has("download");
  const html = await renderWelcomeLetter({
    name: row.name,
    licenseKey: row.key,
    courses,
    devices: row.devices,
    issuedAt: row.createdAt,
    toolbar: download ? undefined : { downloadHref: `${req.nextUrl.pathname}?download=1` },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex",
  };
  if (download) {
    const file = letterFileName(row.name);
    headers["Content-Disposition"] =
      `attachment; filename="welcome.html"; filename*=UTF-8''${encodeURIComponent(file)}`;
  }
  return new NextResponse(html, { headers });
}
