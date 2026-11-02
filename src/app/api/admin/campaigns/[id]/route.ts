import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CAMPAIGN_TAG } from "@/lib/campaign.server";
import { requireAdmin, parseCampaignBody } from "@/lib/campaign-admin";

type Ctx = { params: Promise<{ id: string }> };

/**
 * PATCH → ویرایش کامل کمپین، یا فقط روشن/خاموش کردنش
 * (بدنه‌ای که فقط active داره).
 */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    if (Object.keys(body).length === 1 && "active" in body) {
      await prisma.campaign.update({ where: { id }, data: { active: Boolean(body.active) } });
    } else {
      const parsed = parseCampaignBody(body);
      if ("error" in parsed) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
      }
      await prisma.campaign.update({ where: { id }, data: parsed.data });
    }
  } catch {
    return NextResponse.json({ error: "کمپین پیدا نشد" }, { status: 404 });
  }

  revalidateTag(CAMPAIGN_TAG, { expire: 0 });
  return NextResponse.json({ ok: true });
}

/** DELETE → حذف کمپین */
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const { id } = await params;
  try {
    await prisma.campaign.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "کمپین پیدا نشد" }, { status: 404 });
  }

  revalidateTag(CAMPAIGN_TAG, { expire: 0 });
  return NextResponse.json({ ok: true });
}
