import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/zarinpal";
import { createLicense } from "@/lib/spotplayer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (status !== "OK" || !authority) {
    return NextResponse.redirect(new URL("/dashboard?payment=failed", req.url));
  }

  const purchase = await prisma.purchase.findFirst({
    where: { authority, status: "PENDING" },
    include: { course: true, user: true },
  });
  if (!purchase) {
    return NextResponse.redirect(new URL("/dashboard?payment=notfound", req.url));
  }

  const result = await verifyPayment(authority, purchase.amount * 10);

  if (result.data?.code !== 100 && result.data?.code !== 101) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { status: "FAILED" },
    });
    return NextResponse.redirect(new URL("/dashboard?payment=failed", req.url));
  }

  await prisma.purchase.update({
    where: { id: purchase.id },
    data: { status: "SUCCESS", refId: String(result.data.ref_id) },
  });

  if (purchase.course.spotplayerId) {
    const licenseData = await createLicense({
      courses: [purchase.course.spotplayerId],
      name: purchase.user.name,
      watermark: purchase.user.phone || purchase.user.email,
      payload: purchase.id,
    });
    await prisma.spotPlayerLicense.create({
      data: {
        userId: purchase.userId,
        courseId: purchase.courseId,
        licenseKey: licenseData.key,
      },
    });
  }

  return NextResponse.redirect(new URL("/dashboard?payment=success", req.url));
}
