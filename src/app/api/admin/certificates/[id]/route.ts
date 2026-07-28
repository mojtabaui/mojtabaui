import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * DELETE → حذف یک گواهی.
 *
 * توجه: بعد از حذف، لینک /certificate/<code> دیگه اعتبارسنجی نمی‌شه.
 * پس فقط برای گواهیِ اشتباه صادرشده استفاده بشه، نه برای پاک‌سازی آرشیو.
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const cert = await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ ok: true, code: cert.code, name: cert.studentName });
  } catch (e) {
    // P2025 = رکوردی برای حذف پیدا نشد (احتمالاً قبلاً حذف شده)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این گواهی پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
}
