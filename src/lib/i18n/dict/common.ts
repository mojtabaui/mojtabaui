import type { Lang } from "@/lib/i18n";

/**
 * چرم سایت — چیزهایی که توی هر صفحه تکرار می‌شن: نوار بالا، فوتر، و
 * عنوان‌های مشترک.
 *
 * دو زبان کنار هم نوشته می‌شن نه توی دو فایل جدا، چون جدا که باشن یکی
 * عوض می‌شه و اون یکی جا می‌مونه.
 */

export const COMMON = {
  fa: {
    brand: "مدرسه دیزاین ملینا",
    tagline: "آموزش تخصصی UI/UX",

    nav: {
      courses: "دوره‌ها",
      projects: "نمونه کارها",
      free: "منابع رایگان",
      checklist: "چک‌لیست یادگیری",
      articles: "مقالات",
      certificates: "گواهی‌ها",
      about: "درباره من",
    },

    cta: {
      start: "شروع کن",
      seeCourses: "مشاهده دوره‌ها",
    },

    account: {
      label: "حساب کاربری، به زودی",
      soon: "به زودی",
    },

    menu: {
      open: "باز کردن منو",
      close: "بستن منو",
    },

    footer: {
      columns: {
        courses: "COURSES",
        content: "CONTENT",
        about: "ABOUT",
        connect: "CONNECT",
      },
      courses: {
        uiInfinity: "UI بی‌نهایت",
        uxInfinity: "UX بی‌نهایت",
        uiOffline: "UI آفلاین",
        portfolio: "پرتفولیو",
        prototype: "پروتوتایپ",
      },
      content: {
        checklist: "چک‌لیست یادگیری",
        articles: "مقالات",
        free: "منابع رایگان",
        projects: "نمونه‌کارهای دانشجوها",
        allCourses: "همه دوره‌ها",
        verify: "استعلام گواهی",
      },
      about: {
        aboutMe: "درباره من",
        portfolio: "پرتفولیو",
        contact: "تماس با من",
      },
      rights: "© ۱۴۰۵ مدرسه دیزاین ملینا · همه حقوق محفوظ است",
    },

    lang: {
      switch: "زبان سایت",
    },
  },

  en: {
    brand: "Melina Design School",
    tagline: "UI/UX training, taught properly",

    nav: {
      courses: "Courses",
      projects: "Student work",
      free: "Free resources",
      checklist: "Learning checklist",
      articles: "Articles",
      certificates: "Certificates",
      about: "About me",
    },

    cta: {
      start: "Get started",
      seeCourses: "Browse courses",
    },

    account: {
      label: "Account — coming soon",
      soon: "Coming soon",
    },

    menu: {
      open: "Open menu",
      close: "Close menu",
    },

    footer: {
      columns: {
        courses: "COURSES",
        content: "CONTENT",
        about: "ABOUT",
        connect: "CONNECT",
      },
      courses: {
        uiInfinity: "UI Infinity",
        uxInfinity: "UX Infinity",
        uiOffline: "UI Offline",
        portfolio: "Portfolio",
        prototype: "Prototyping",
      },
      content: {
        checklist: "Learning checklist",
        articles: "Articles",
        free: "Free resources",
        projects: "Student work",
        allCourses: "All courses",
        verify: "Verify a certificate",
      },
      about: {
        aboutMe: "About me",
        portfolio: "Portfolio",
        contact: "Contact",
      },
      rights: "© 2026 Melina Design School · All rights reserved",
    },

    lang: {
      switch: "Site language",
    },
  },
} as const;

export type CommonDict = (typeof COMMON)[Lang];
