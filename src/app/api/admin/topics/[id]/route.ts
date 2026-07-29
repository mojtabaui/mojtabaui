import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/** PATCH → ویرایش موضوع، یا روشن و خاموش کردنش */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const data: Prisma.ProjectTopicUpdateInput = {};

  if (body.title !== undefined) {
    const title = String(body.title).trim().slice(0, 200);
    if (!title) {
      return NextResponse.json({ error: "عنوان خالیه" }, { status: 400 });
    }
    data.title = title;
  }
  if (body.category !== undefined) data.category = String(body.category).trim().slice(0, 100);
  if (body.platform !== undefined) data.platform = String(body.platform).trim().slice(0, 60);
  if (body.difficulty !== undefined) data.difficulty = String(body.difficulty).trim().slice(0, 40);
  if (body.detail !== undefined) data.detail = String(body.detail).trim().slice(0, 600);
  if (body.recommended !== undefined) data.recommended = Boolean(body.recommended);
  if (body.active !== undefined) data.active = Boolean(body.active);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "چیزی برای تغییر نیست" }, { status: 400 });
  }

  try {
    const topic = await prisma.projectTopic.update({ where: { id }, data });
    return NextResponse.json({ ok: true, topic });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این موضوع پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
}

/** DELETE → حذف کامل. برای کنار گذاشتن موقت، به‌جاش active را خاموش کن. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const topic = await prisma.projectTopic.delete({ where: { id } });
    return NextResponse.json({ ok: true, title: topic.title });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "این موضوع پیدا نشد" }, { status: 404 });
    }
    throw e;
  }
}
