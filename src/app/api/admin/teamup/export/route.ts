import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ExcelJS from "exceljs";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COLUMNS, toDisplay } from "@/lib/teamup-rows";

export const dynamic = "force-dynamic";

/**
 * GET → خروجی اکسل پاسخ‌های فرم ترجیح پروژه.
 * ?track=UI|UX و ?mode=SOLO|GROUP اختیاری‌ان؛ بدون‌شون همه رو می‌ده.
 * هر مسیر یک شیت جدا داره تا ستون‌های سطح و مهارتش قاطی نشه.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const sp = req.nextUrl.searchParams;
  const track = sp.get("track");
  const mode = sp.get("mode");

  const rows = await prisma.teamupPreference.findMany({
    where: {
      ...(track === "UI" || track === "UX" ? { track } : {}),
      ...(mode === "SOLO" || mode === "GROUP" ? { mode } : {}),
    },
    orderBy: [{ createdAt: "asc" }],
  });

  const wb = new ExcelJS.Workbook();
  const tracks = track === "UI" || track === "UX" ? [track] : ["UI", "UX"];

  for (const t of tracks) {
    const ws = wb.addWorksheet(t === "UI" ? "رابط کاربری" : "تجربه کاربری", {
      views: [{ rightToLeft: true, state: "frozen", ySplit: 1 }],
    });
    ws.columns = COLUMNS.map((c) => ({ header: c.header, key: c.key, width: c.width }));

    const head = ws.getRow(1);
    head.font = { bold: true };
    head.alignment = { vertical: "middle", horizontal: "center" };
    head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE9E4FB" } };

    for (const r of rows.filter((x) => x.track === t)) {
      const d = toDisplay(r);
      ws.addRow({ ...d, date: d.date.toLocaleDateString("fa-IR") });
    }

    ws.eachRow((row, i) => {
      if (i === 1) return;
      row.alignment = { vertical: "top", wrapText: true };
    });
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNS.length } };
  }

  const buffer = await wb.xlsx.writeBuffer();
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="teamup-${stamp}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
