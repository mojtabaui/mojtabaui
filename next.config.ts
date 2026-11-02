import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // نامهٔ خوش‌آمد قلم‌ها و استایلش رو موقع اجرا از دیسک می‌خونه؛
  // روی Vercel این فایل‌ها خودبه‌خود کنار تابع نمی‌رن.
  outputFileTracingIncludes: {
    "/api/admin/licenses/*/welcome": [
      "./welcome/welcome.css",
      "./handout/jozve-ai-access.svg",
      "./handout/Michroma.woff2",
      "./handout/SpaceGrotesk.woff2",
      "./public/fonts/Meem-Light.ttf",
      "./public/fonts/Meem-Bold.ttf",
    ],
  },
};

export default nextConfig;
