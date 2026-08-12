import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET → فایل رزومه‌ای که توی فرم کوادکمپ آپلود شده.
 *
 * فایل توی دیتابیس نگه داشته می‌شه، پس تنها راه دیدنش همینه. فقط ادمین،
 * چون رزومه اطلاعات شخصیِ آدمه و لینکش نباید دست‌به‌دست بشه.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;

  const row = await prisma.quadcampApplication.findUnique({
    where: { id },
    select: { resumeData: true, resumeName: true, resumeMime: true },
  });

  if (!row?.resumeData) {
    return NextResponse.json({ error: "فایلی برای این ثبت‌نام نیست" }, { status: 404 });
  }

  // اسم فایل معمولاً فارسیه، پس فقط شکل RFC 5987 جواب می‌ده
  const name = encodeURIComponent(row.resumeName || "resume");

  return new Response(new Uint8Array(row.resumeData), {
    headers: {
      "Content-Type": row.resumeMime || "application/octet-stream",
      "Content-Disposition": `inline; filename*=UTF-8''${name}`,
      // رزومه نباید توی هیچ کش میانی بمونه
      "Cache-Control": "private, no-store",
    },
  });
}
