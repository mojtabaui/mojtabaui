"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";
import { DEFAULT_LANG, type Lang } from "@/lib/i18n";

/**
 * زبان از لِی‌اوت ریشه میاد پایین.
 *
 * کامپوننت‌های کلاینتی نمی‌تونن هدر بخونن و prop دادن به تک‌تکشون یعنی
 * دست‌کاری هر صفحه‌ای که ازشون استفاده می‌کنه. کانتکست همون یک مقدار رو
 * یک‌جا پخش می‌کنه.
 */
const LangContext = createContext<Lang>(DEFAULT_LANG);

export function useLang(): Lang {
  return useContext(LangContext);
}

export default function Providers({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={lang}>
      <SessionProvider>{children}</SessionProvider>
    </LangContext.Provider>
  );
}
