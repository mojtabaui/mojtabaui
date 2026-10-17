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
 * PATCH → اصلاح تاریخ شروع یک گواهیِ صادرشده.
 *
 * فقط همین یک فیلد. کد و نام و دوره بعد از صدور دست‌نخورده می‌مونن، چون
 * کد جای دیگه‌ای پخش شده و عوض کردنش یعنی بی‌اعتبار کردن گواهی‌ای که
 * دست دانشجوئه.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  if (typeof body.startDate !== "string") {
    return NextResponse.json({ error: "تاریخ شروع نامعتبر است" }, { status: 400 });
  }
  // رشته‌ی آزاده چون روی سند عیناً چاپ می‌شه، ولی طولش محدوده تا خط
  // پایین سند نشکنه
  const startDate = body.startDate.trim().slice(0, 60);

  try {
    const cert = await prisma.certificate.update({
      where: { id },
      data: { startDate },
    });
    return NextResponse.json({ ok: true, startDate: cert.startDate });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این گواهی پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
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
