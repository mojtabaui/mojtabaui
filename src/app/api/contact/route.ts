import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 });
  }

  if (String(message).length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "پیام خیلی طولانیه — لطفاً کوتاه‌ترش کن" },
      { status: 400 }
    );
  }

  await prisma.contactMessage.create({
    data: {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      message: String(message).trim(),
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
