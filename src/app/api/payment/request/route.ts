import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
  }

  const { slug } = await req.json();
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return NextResponse.json({ error: "دوره یافت نشد" }, { status: 404 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });

  const existingPurchase = await prisma.purchase.findFirst({
    where: { userId: user.id, courseId: course.id, status: "SUCCESS" },
  });
  if (existingPurchase) {
    return NextResponse.json({ error: "این دوره قبلاً خریداری شده" }, { status: 409 });
  }

  const result = await requestPayment(
    course.price * 10,
    `خرید دوره ${course.title}`,
    user.email
  );

  if (result.data?.code !== 100) {
    return NextResponse.json({ error: "خطا در اتصال به درگاه پرداخت" }, { status: 500 });
  }

  await prisma.purchase.create({
    data: {
      userId: user.id,
      courseId: course.id,
      amount: course.price,
      authority: result.data.authority,
      status: "PENDING",
    },
  });

  return NextResponse.json({ url: getPaymentUrl(result.data.authority) });
}
