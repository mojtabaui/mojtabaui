"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * «حرکت باید خاموش باشد؟» — بدون شکستنِ hydration.
 *
 * useReducedMotion روی سرور همیشه false می‌دهد چون matchMedia آنجا نیست.
 * اگر مستقیم با آن رندر را شرطی کنیم، سرور یک درخت می‌سازد و مرورگرِ
 * کاربری که حرکت را خاموش کرده درختی دیگر، و React کل شاخه را دور
 * می‌ریزد و دوباره می‌سازد.
 *
 * پس تا وقتی سوار نشده‌ایم عمداً false می‌گوییم — همان چیزی که سرور
 * گفته — و فقط بعد از اولین رندرِ مرورگر حقیقت را برمی‌گردانیم.
 */
export function useStill(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && !!reduce;
}
