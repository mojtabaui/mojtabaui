import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * فرم عمومیِ ثبت موضوع پروژه.
 *
 * حساب کاربری لازم نداره: هنرجو اسمش رو تایپ می‌کنه و رمز دوره‌اش رو می‌ده.
 * هیچ فهرستی از اسم‌ها برنمی‌گرده — فقط ردیف خودِ همون شخص در همون دوره.
 *
 * هر دوره رمز جداگانه داره:
 *   PROJECT_FORM_CODE_UI  → دورهٔ طراحی رابط کاربری
 *   PROJECT_FORM_CODE_UX  → دورهٔ طراحی تجربه کاربری
 *
 * یعنی رمز خودش تعیین می‌کنه ردیف کدوم دوره باز بشه، و کسی که هر دو دوره
 * رو داره دو بار جدا پر می‌کنه. این عمدیه: موضوع پروژهٔ رابط و تجربه
 * معمولاً یکی نیست و با یک فرم مشترک قاتی می‌شد.
 */

type Track = "UI" | "UX";

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

/** فقط http و https — جلوی javascript: و امثالش رو می‌گیره */
function isSafeLink(url: string): boolean {
  try {
    const p = new URL(url).protocol;
    return p === "http:" || p === "https:";
  } catch {
    return false;
  }
}

/** رمز رو به دوره ترجمه می‌کنه. اگه به هیچ‌کدوم نخوره null برمی‌گرده. */
function trackForCode(input: string): Track | null {
  const given = input.trim();
  if (!given) return null;

  const ui = process.env.PROJECT_FORM_CODE_UI?.trim();
  const ux = process.env.PROJECT_FORM_CODE_UX?.trim();

  if (ui && given === ui) return "UI";
  if (ux && given === ux) return "UX";
  return null;
}

/** ردیف همین شخص در همین دوره */
async function findRows(name: string, track: Track) {
  const target = normalize(name);
  if (target.length < 3) return [];

  // اسم‌ها فارسی‌ان و املاشون کمی فرق می‌کنه، پس ردیف‌های همون دوره رو
  // می‌گیریم و نرمال‌شده مقایسه می‌کنیم. تعدادشون کمه و این کار سبکه.
  const all = await prisma.studentProject.findMany({
    where: { track },
    select: {
      id: true,
      studentName: true,
      track: true,
      topic: true,
      fileLink: true,
      intakeMonth: true,
    },
  });

  return all.filter((r) => normalize(r.studentName) === target);
}

/** آیا این اسم اصلاً در دورهٔ دیگه هست — برای اینکه خطا راهنما باشه */
async function existsInOtherTrack(name: string, track: Track): Promise<boolean> {
  const other: Track = track === "UI" ? "UX" : "UI";
  const rows = await findRows(name, other);
  return rows.length > 0;
}

const TRACK_LABEL: Record<Track, string> = {
  UI: "طراحی رابط کاربری",
  UX: "طراحی تجربه کاربری",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = String(body.action ?? "");
  const name = String(body.name ?? "");
  const code = String(body.code ?? "");

  const track = trackForCode(code);
  if (!track) {
    return NextResponse.json({ error: "رمز دوره درست نیست" }, { status: 403 });
  }

  const rows = await findRows(name, track);

  if (rows.length === 0) {
    // اگه توی دورهٔ دیگه هست، مشکل اسم نیست، رمزه. همینو بگیم.
    if (await existsInOtherTrack(name, track)) {
      const other = track === "UI" ? "UX" : "UI";
      return NextResponse.json(
        {
          error: `اسمت پیدا شد ولی توی دورهٔ ${TRACK_LABEL[track]} ثبت نیستی. رمز دورهٔ ${TRACK_LABEL[other]} رو بزن.`,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        error:
          "با این اسم چیزی پیدا نشد. همون‌طور که موقع ثبت‌نام نوشتی بنویس، یا به پشتیبانی پیام بده.",
      },
      { status: 404 }
    );
  }

  // مرحلهٔ اول: بگو کدوم دوره‌ست، موضوع فعلی‌اش چیه، و چه گزینه‌هایی داره
  if (action === "lookup") {
    const topics = await prisma.projectTopic.findMany({
      where: { track, active: true },
      orderBy: [{ category: "asc" }, { recommended: "desc" }, { title: "asc" }],
      select: {
        id: true,
        title: true,
        category: true,
        difficulty: true,
        detail: true,
        recommended: true,
      },
    });

    return NextResponse.json({
      ok: true,
      name: rows[0].studentName,
      topics,
      courses: rows.map((r) => ({
        id: r.id,
        track: r.track,
        topic: r.topic,
        fileLink: r.fileLink,
      })),
    });
  }

  // مرحلهٔ دوم: ثبت موضوع و لینک فایل
  if (action === "submit") {
    const updates = Array.isArray(body.topics) ? body.topics : [];
    // فقط ردیف‌هایی که همین رمز بازشون کرده. یعنی رمز دورهٔ رابط
    // نمی‌تونه ردیف دورهٔ تجربه رو بنویسه، حتی اگه شناسه‌اش رو بفرسته.
    const allowed = new Set(rows.map((r) => r.id));
    let saved = 0;

    for (const u of updates) {
      const id = String(u?.id ?? "");
      if (!allowed.has(id)) continue;

      const topic = String(u?.topic ?? "").trim().slice(0, 300);
      const link = String(u?.fileLink ?? "").trim().slice(0, 500);

      if (link && !isSafeLink(link)) {
        return NextResponse.json(
          { error: "لینک باید با http یا https شروع بشه" },
          { status: 400 }
        );
      }

      const data: { topic?: string; fileLink?: string } = {};
      if (topic) data.topic = topic;
      if (link) data.fileLink = link;
      if (Object.keys(data).length === 0) continue;

      await prisma.studentProject.update({ where: { id }, data });
      saved += 1;
    }

    if (saved === 0) {
      return NextResponse.json({ error: "چیزی برای ثبت نبود" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, saved });
  }

  return NextResponse.json({ error: "درخواست نامعتبر" }, { status: 400 });
}
