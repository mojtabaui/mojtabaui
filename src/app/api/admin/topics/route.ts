import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { type ProjectTrack } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * POST → افزودن موضوع.
 * یا یکی‌یکی، یا چندتا با هم از یک متن چندخطی (هر خط یک موضوع).
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = await req.json();
  const track = String(body.track ?? "");
  if (track !== "UI" && track !== "UX") {
    return NextResponse.json({ error: "دوره نامعتبر است" }, { status: 400 });
  }

  const category = String(body.category ?? "").trim().slice(0, 100);
  const platform = String(body.platform ?? "").trim().slice(0, 60);
  const difficulty = String(body.difficulty ?? "").trim().slice(0, 40);
  const detail = String(body.detail ?? "").trim().slice(0, 600);
  const recommended = Boolean(body.recommended);

  // هر خط یک موضوع، تا بشه فهرست را یک‌جا چسبوند
  const titles = String(body.title ?? "")
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 200);

  if (titles.length === 0) {
    return NextResponse.json({ error: "عنوان موضوع خالیه" }, { status: 400 });
  }

  const existing = await prisma.projectTopic.findMany({
    where: { track: track as ProjectTrack },
    select: { title: true },
  });
  const seen = new Set(existing.map((e) => e.title));
  const fresh = titles.filter((t) => !seen.has(t));

  if (fresh.length === 0) {
    return NextResponse.json(
      { error: "این موضوع از قبل توی همین دوره هست" },
      { status: 409 }
    );
  }

  await prisma.projectTopic.createMany({
    data: fresh.map((title) => ({
      track: track as ProjectTrack,
      title: title.slice(0, 200),
      category,
      platform,
      difficulty,
      detail,
      recommended,
    })),
  });

  return NextResponse.json({
    ok: true,
    added: fresh.length,
    skipped: titles.length - fresh.length,
  });
}
