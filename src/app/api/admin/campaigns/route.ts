import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CAMPAIGN_TAG } from "@/lib/campaign.server";
import { requireAdmin, parseCampaignBody } from "@/lib/campaign-admin";

/** POST → کمپین تازه */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const parsed = parseCampaignBody(await req.json());
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const created = await prisma.campaign.create({ data: parsed.data });
  // بنر و قیمت‌ها همون لحظه عوض بشن، نه بعد از پنج دقیقهٔ کش
  revalidateTag(CAMPAIGN_TAG, { expire: 0 });
  return NextResponse.json({ ok: true, id: created.id });
}
