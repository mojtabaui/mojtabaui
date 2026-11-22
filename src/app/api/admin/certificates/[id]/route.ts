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
 * PATCH → اصلاح تاریخ شروع و/یا تاریخ صدورِ یک گواهیِ صادرشده.
 *
 * body: { startDate?: string, issueDate?: "YYYY-MM-DD" } — هرکدوم که بیاد
 * همون عوض می‌شه. کد و نام و دوره بعد از صدور دست‌نخورده می‌مونن، چون
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

  const data: Prisma.CertificateUpdateInput = {};

  if (body.startDate !== undefined) {
    if (typeof body.startDate !== "string") {
      return NextResponse.json({ error: "تاریخ شروع نامعتبر است" }, { status: 400 });
    }
    // رشته‌ی آزاده چون روی سند عیناً چاپ می‌شه، ولی طولش محدوده تا خط
    // پایین سند نشکنه
    data.startDate = body.startDate.trim().slice(0, 60);
  }

  if (body.issueDate !== undefined) {
    // «Date of issue» روی سند از createdAt میاد. ظهرِ UTC ذخیره می‌شه تا
    // با هیچ منطقهٔ زمانی‌ای روزش یکی عقب یا جلو نیفته.
    const m = typeof body.issueDate === "string" && /^(\d{4})-(\d{2})-(\d{2})$/.exec(body.issueDate);
    const d = m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12)) : null;
    if (!m || !d || d.getUTCMonth() !== +m[2] - 1 || d.getUTCFullYear() < 2015 || d.getTime() > Date.now() + 86_400_000) {
      return NextResponse.json({ error: "تاریخ صدور نامعتبر است" }, { status: 400 });
    }
    data.createdAt = d;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "چیزی برای ذخیره نیست" }, { status: 400 });
  }

  try {
    const cert = await prisma.certificate.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, startDate: cert.startDate, issueDate: cert.createdAt.toISOString().slice(0, 10) });
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
