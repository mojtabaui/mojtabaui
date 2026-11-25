import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  WEEK_COUNT,
  applyWeek,
  isInfinityCourse,
  normalizePhone,
} from "@/lib/infinity-progress";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

function notFound() {
  return NextResponse.json({ error: "این دانشجو پیدا نشد" }, { status: 404 });
}

/**
 * PATCH → یکی از این‌ها:
 *   { kind: "video" | "task", week: 1..10, done: boolean }   تیک یک هفته
 *   { name?, phone?, note?, course? }                         ویرایش مشخصات
 *
 * تیک به‌صورت «این هفته انجام شد/نشد» می‌آد، نه کل آرایه؛ پس تکرارش بی‌ضرره
 * و دو تیک پشت‌سرهم همدیگه رو خراب نمی‌کنن.
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
  const data: Prisma.InfinityStudentUpdateInput = {};

  if (body.kind !== undefined) {
    const kind = String(body.kind);
    const week = Number(body.week);
    if (kind !== "video" && kind !== "task") {
      return NextResponse.json({ error: "نوع تیک نامعتبره" }, { status: 400 });
    }
    if (!Number.isInteger(week) || week < 1 || week > WEEK_COUNT) {
      return NextResponse.json({ error: "شمارهٔ هفته نامعتبره" }, { status: 400 });
    }
    if (typeof body.done !== "boolean") {
      return NextResponse.json({ error: "وضعیت تیک نامعتبره" }, { status: 400 });
    }

    const row = await prisma.infinityStudent.findUnique({
      where: { id },
      select: { videosDone: true, tasksDone: true },
    });
    if (!row) return notFound();

    if (kind === "video") data.videosDone = applyWeek(row.videosDone, week, body.done);
    else data.tasksDone = applyWeek(row.tasksDone, week, body.done);
  }

  if (body.name !== undefined) {
    const name = String(body.name).trim().slice(0, 120);
    if (!name) return NextResponse.json({ error: "اسم نمی‌تونه خالی باشه" }, { status: 400 });
    data.name = name;
  }
  if (body.phone !== undefined) {
    data.phone = normalizePhone(String(body.phone)).slice(0, 20);
  }
  if (body.note !== undefined) {
    data.note = String(body.note).trim().slice(0, 600);
  }
  if (body.teamGroup !== undefined) {
    if (body.teamGroup === null || body.teamGroup === "") {
      data.teamGroup = null;
    } else {
      const g = Number(body.teamGroup);
      if (!Number.isInteger(g) || g < 1 || g > 999) {
        return NextResponse.json({ error: "شمارهٔ گروه نامعتبره" }, { status: 400 });
      }
      data.teamGroup = g;
    }
  }
  if (body.course !== undefined) {
    const course = String(body.course);
    if (!isInfinityCourse(course)) {
      return NextResponse.json({ error: "دوره نامعتبره" }, { status: 400 });
    }
    data.course = course;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "چیزی برای تغییر نیست" }, { status: 400 });
  }

  try {
    const s = await prisma.infinityStudent.update({ where: { id }, data });
    return NextResponse.json({
      ok: true,
      student: { id: s.id, videosDone: s.videosDone, tasksDone: s.tasksDone },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return notFound();
    }
    throw e;
  }
}

/** DELETE → حذف یک دانشجو از فهرست */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const s = await prisma.infinityStudent.delete({ where: { id } });
    return NextResponse.json({ ok: true, name: s.name });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return notFound();
    }
    throw e;
  }
}
