import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * PATCH → به‌روزرسانی موضوع پروژه یا شمارهٔ تسک.
 * body: { topic?: string, taskProgress?: number, note?: string }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const data: Prisma.StudentProjectUpdateInput = {};

  if (body.topic !== undefined) {
    data.topic = String(body.topic).trim().slice(0, 300);
  }
  if (body.note !== undefined) {
    const note = String(body.note).trim().slice(0, 500);
    data.note = note || null;
  }
  if (body.taskProgress !== undefined) {
    const n = Number(body.taskProgress);
    if (!Number.isInteger(n) || n < 0 || n > 99) {
      return NextResponse.json(
        { error: "شمارهٔ تسک باید عددی بین ۰ تا ۹۹ باشه" },
        { status: 400 }
      );
    }
    data.taskProgress = n;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "چیزی برای تغییر نیست" }, { status: 400 });
  }

  try {
    const student = await prisma.studentProject.update({ where: { id }, data });
    return NextResponse.json({ ok: true, student });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این دانشجو پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
}

/** DELETE → حذف یک ردیف از فهرست */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const student = await prisma.studentProject.delete({ where: { id } });
    return NextResponse.json({ ok: true, name: student.studentName });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این دانشجو پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
}
