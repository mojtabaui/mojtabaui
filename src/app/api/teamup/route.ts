import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toLatinDigits } from "@/lib/persian-months";
import {
  GOALS,
  HOURS,
  LEVELS,
  REGIONS,
  SKILLS,
  TIME_SLOTS,
  type TeamupTrack,
} from "@/lib/teamup";

/**
 * فرم عمومیِ ترجیح پروژه، تکی یا گروهی.
 *
 * تکی فقط اسم و راه تماس می‌گیره. گروهی بقیه رو هم لازم داره.
 * هر نفر در هر مسیر (UI یا UX) یک ردیف داره: با همون راه تماس دوباره
 * پر کنه، ردیف قبلی جایگزین می‌شه نه اینکه دوتا بشه.
 */

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** فقط مقدارهایی که توی فهرست مجازن */
const pickMany = (v: unknown, allowed: string[]) =>
  Array.isArray(v) ? allowed.filter((a) => v.includes(a)) : [];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("درخواست درست نبود، دوباره امتحان کن");
  }

  // فیلد مخفی برای رباط‌ها: آدم نمی‌بینتش، پس پر شدنش یعنی رباط
  if (body.website) return NextResponse.json({ ok: true });

  const track = body.track === "UI" || body.track === "UX" ? (body.track as TeamupTrack) : null;
  if (!track) return bad("مسیر مشخص نیست");

  const fullName = clean(body.fullName, 80);
  if (fullName.length < 3 || !fullName.includes(" ")) {
    return bad("اسم و فامیلت رو کامل بنویس، مثل «زهرا محمدی»");
  }

  const contact = toLatinDigits(clean(body.contact, 80)).toLowerCase();
  const isPhone = /^(\+98|0098|0)?9\d{9}$/.test(contact.replace(/[\s-]/g, ""));
  const isHandle = /^@?[a-z0-9_.]{4,}$/.test(contact);
  if (!isPhone && !isHandle) {
    return bad("شمارهٔ موبایل یا آیدی تلگرامت رو درست بنویس");
  }
  const contactKey = isPhone
    ? "0" + contact.replace(/[\s-]/g, "").replace(/^(\+98|0098|0)/, "")
    : contact.startsWith("@")
      ? contact
      : "@" + contact;

  if (body.mode !== "SOLO" && body.mode !== "GROUP") {
    return bad("تکی یا گروهی رو انتخاب کن");
  }

  // ── تکی: تمام ──
  if (body.mode === "SOLO") {
    const data = {
      fullName,
      mode: "SOLO",
      region: "",
      city: "",
      timeSlots: [],
      level: null,
      skills: [],
      hoursPerWeek: "",
      goal: "",
      note: "",
    };
    await prisma.teamupPreference.upsert({
      where: { track_contact: { track, contact: contactKey } },
      create: { track, contact: contactKey, ...data },
      update: data,
    });
    return NextResponse.json({ ok: true });
  }

  // ── گروهی ──
  const region = String(body.region ?? "");
  if (!REGIONS.some((r) => r.key === region)) return bad("محل زندگیت رو انتخاب کن");

  const city = clean(body.city, 60);
  if (region === "other" && city.length < 2) {
    return bad("چون «جای دیگر» رو زدی، اسم کشور و شهرت رو بنویس");
  }

  const timeSlots = pickMany(body.timeSlots, TIME_SLOTS.map((s) => s.key));
  if (timeSlots.length === 0) return bad("حداقل یک بازهٔ زمانی انتخاب کن");

  const level = Number(body.level);
  if (!LEVELS[track].some((l) => l.value === level)) return bad("سطحت رو انتخاب کن");

  const hoursPerWeek = String(body.hoursPerWeek ?? "");
  if (!HOURS.some((h) => h.key === hoursPerWeek)) return bad("بگو هفته‌ای چند ساعت وقت داری");

  const goal = String(body.goal ?? "");
  if (!GOALS.some((g) => g.key === goal)) return bad("هدفت از پروژه رو انتخاب کن");

  const data = {
    fullName,
    mode: "GROUP",
    region,
    city,
    timeSlots,
    level,
    skills: pickMany(body.skills, SKILLS[track].options.map((o) => o.key)),
    hoursPerWeek,
    goal,
    note: clean(body.note, 500),
  };

  await prisma.teamupPreference.upsert({
    where: { track_contact: { track, contact: contactKey } },
    create: { track, contact: contactKey, ...data },
    update: data,
  });
  return NextResponse.json({ ok: true });
}
