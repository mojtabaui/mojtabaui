import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import {
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  LANG_HEADER,
  resolveLang,
  toLang,
} from "@/lib/i18n";

/**
 * دو کار می‌کنه: نگهبانی مسیرهای خصوصی، و حل‌کردن زبان صفحه.
 *
 * زبان اینجا حل می‌شه نه توی صفحه‌ها، چون <html lang dir> توی لِی‌اوت
 * ریشه ساخته می‌شه و لِی‌اوت به searchParams دسترسی نداره. پروکسی زبان
 * رو با هدر می‌فرسته تا هم لِی‌اوت و هم صفحه‌ها یک جواب واحد بگیرن.
 *
 * (فایل قبلاً middleware.ts بود؛ نکست ۱۶ این قرارداد رو به proxy تغییر داد.)
 */

/** مسیرهایی که بدون ورود باز نمی‌شن */
const GUARDED = /^\/(dashboard|admin)(\/|$)/;

const requireAuth = withAuth(
  function guard(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

/** پاسخِ عبور، با زبانِ حل‌شده روی هدر درخواست */
function passThrough(req: NextRequest) {
  // ?lang صریح‌ترین حرفه؛ بعدش کوکی، بعدش فارسی
  const fromUrl = toLang(req.nextUrl.searchParams.get("lang"));
  const lang = fromUrl ?? resolveLang(req.cookies.get(LANG_COOKIE)?.value);

  const headers = new Headers(req.headers);
  headers.set(LANG_HEADER, lang);

  const res = NextResponse.next({ request: { headers } });

  // انتخاب صریح ماندگار می‌شه تا لینک‌های داخلی لازم نباشه ?lang رو حمل کنن
  if (fromUrl) {
    res.cookies.set(LANG_COOKIE, fromUrl, {
      path: "/",
      maxAge: LANG_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return res;
}

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  if (GUARDED.test(req.nextUrl.pathname)) {
    const res = await requireAuth(
      req as Parameters<typeof requireAuth>[0],
      event
    );
    // پاسخِ «بذار رد بشه» این هدر رو داره؛ هر چیز دیگه‌ای یعنی ریدایرکت
    // یا ردِ دسترسی و باید دست‌نخورده برگرده
    if (res && !res.headers.has("x-middleware-next")) return res;
  }

  return passThrough(req);
}

export const config = {
  matcher: [
    // همه‌چیز جز دارایی‌های ثابت و APIها — زبان فقط به کار رندر صفحه میاد
    "/((?!_next/static|_next/image|api/|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|glb|mp4|pdf|ttf|woff2?)$).*)",
  ],
};
