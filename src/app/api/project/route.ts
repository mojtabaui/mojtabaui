import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * فرم عمومیِ ثبت موضوع پروژه.
 *
 * حساب کاربری لازم نداره: هنرجو اسمش رو تایپ می‌کنه و یک رمز دوره می‌ده.
 * هیچ فهرستی از اسم‌ها برنمی‌گرده — فقط ردیف‌های خودِ همون شخص.
 *
 * رمز از متغیر محیطی PROJECT_FORM_CODE خونده می‌شه.
 */

/** فاصله‌های اضافی، نیم‌فاصله، «ی» و «ک» عربی رو یکدست می‌کنه */
function normalize(name: string): string {
  return name
    .trim()
    .replace(/‌/g, " ")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function codeOk(input: string): boolean {
  const expected = process.env.PROJECT_FORM_CODE;
  if (!expected) return false;
  return input.trim() === expected.trim();
}

/** ردیف‌های یک نفر رو با تطبیق نرمال‌شدهٔ نام پیدا می‌کنه */
async function findRows(name: string) {
  const target = normalize(name);
  if (target.length < 3) return [];

  // اسم‌ها فارسی‌ان و املاشون کمی فرق می‌کنه، پس همه رو می‌گیریم و
  // نرمال‌شده مقایسه می‌کنیم. تعداد ردیف‌ها کمه و این کار سبکه.
  const all = await prisma.studentProject.findMany({
    select: { id: true, studentName: true, track: true, topic: true, intakeMonth: true },
  });

  return all.filter((r) => normalize(r.studentName) === target);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = String(body.action ?? "");
  const name = String(body.name ?? "");
  const code = String(body.code ?? "");

  if (!codeOk(code)) {
    return NextResponse.json({ error: "رمز دوره درست نیست" }, { status: 403 });
  }

  const rows = await findRows(name);
  if (rows.length === 0) {
    return NextResponse.json(
      {
        error:
          "با این اسم چیزی پیدا نشد. همون‌طور که موقع ثبت‌نام نوشتی بنویس، یا به پشتیبانی پیام بده.",
      },
      { status: 404 }
    );
  }

  // مرحلهٔ اول: فقط بگو چه دوره‌هایی داره و موضوع فعلی‌اش چیه
  if (action === "lookup") {
    return NextResponse.json({
      ok: true,
      name: rows[0].studentName,
      courses: rows.map((r) => ({ id: r.id, track: r.track, topic: r.topic })),
    });
  }

  // مرحلهٔ دوم: ثبت موضوع
  if (action === "submit") {
    const updates = Array.isArray(body.topics) ? body.topics : [];
    const allowed = new Set(rows.map((r) => r.id));
    let saved = 0;

    for (const u of updates) {
      const id = String(u?.id ?? "");
      const topic = String(u?.topic ?? "").trim().slice(0, 300);
      if (!allowed.has(id) || !topic) continue;
      await prisma.studentProject.update({ where: { id }, data: { topic } });
      saved += 1;
    }

    if (saved === 0) {
      return NextResponse.json({ error: "موضوعی برای ثبت نبود" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, saved });
  }

  return NextResponse.json({ error: "درخواست نامعتبر" }, { status: 400 });
}
