"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";
import { DEFAULT_LANG, type Lang } from "@/lib/i18n";
import type { CampaignInfo } from "@/lib/campaign";

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

/**
 * کمپین جاری هم به همین دلیل از لِی‌اوت میاد: نوار بالا کلاینتیه و نمی‌تونه
 * دیتابیس بخونه، ولی بنر کمپین باید روی همهٔ صفحه‌ها توش باشه.
 * serverNow ساعتیه که سرور باهاش رندر کرده، تا شمارنده توی اولین رندرِ
 * کلاینت همون عددِ HTML سرور رو نشون بده.
 */
export interface CampaignContextValue {
  campaign: CampaignInfo | null;
  serverNow: number;
}

const CampaignContext = createContext<CampaignContextValue>({ campaign: null, serverNow: 0 });

export function useCampaign(): CampaignContextValue {
  return useContext(CampaignContext);
}

export default function Providers({
  lang,
  campaign = { campaign: null, serverNow: 0 },
  children,
}: {
  lang: Lang;
  campaign?: CampaignContextValue;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={lang}>
      <CampaignContext.Provider value={campaign}>
        <SessionProvider>{children}</SessionProvider>
      </CampaignContext.Provider>
    </LangContext.Provider>
  );
}
