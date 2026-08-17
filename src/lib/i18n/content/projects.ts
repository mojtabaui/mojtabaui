import type { StudentProject } from "@/lib/mock-data";
import type { Lang } from "@/lib/i18n";

/**
 * ترجمهٔ نمونه‌کارهای دانشجوها — مثل دوره‌ها، انگلیسی روی دادهٔ فارسی سوار می‌شه
 * و کلیدش همون id پروژه‌ست.
 *
 * اسم‌ها به لاتین نویسه‌گردانی شدن، نه ترجمه. اسم آدم ترجمه نمی‌شه، ولی توی
 * صفحهٔ انگلیسی خطِ فارسی هم خونده نمی‌شه و نمونه‌کار بدون اسمِ صاحبش
 * بی‌معنیه — نویسه‌گردانی تنها راهیه که هم اسم سرِ جاش می‌مونه هم خونده می‌شه.
 *
 * cohort ترجمه نشده چون هیچ‌جا رندر نمی‌شه؛ تاریخ‌های شمسی هم اگر بی‌دلیل به
 * میلادی برگردن، فقط جای اشتباه باز می‌کنن.
 *
 * برچسب‌ها از قبل انگلیسی‌ان و دست نمی‌خورن.
 */

export type ProjectOverlay = Partial<
  Pick<StudentProject, "studentName" | "projectTitle" | "description">
>;

const EN: Record<string, ProjectOverlay> = {
  sp1: {
    studentName: "Mohammad Talebi, Bahar Javadnia, Niayesh Akhavan, Reyhaneh Falahati, Fariba Mohammadi",
    projectTitle: "iLearn — an online course marketplace",
    description:
      "25 screens, 150+ components, full Auto Layout, a prototype and a style guide — UI Infinity, summer 2025.",
  },
  sp2: {
    studentName: "Mohammadreza Ghadiani, Atefeh Naderi, Ensiyeh Gholipour, Elham Hasani",
    projectTitle: "Lozi — a shop for graphic services",
    description:
      "40+ screens, 40+ components, a complete style guide and prototype — UI Infinity, winter 2024.",
  },
  sp3: {
    studentName: "Maliheh Pourhashemi, Mahla Afkhami",
    projectTitle: "NFT Marketplace",
    description:
      "50+ screens, 100+ components, the full flow and a style guide — UI Infinity, autumn 2024.",
  },
  sp4: {
    studentName: "Mobina Jamshidjam, Shirin Ayazi, Rahil Omranian, Maryam Mohammadi",
    projectTitle: "Soundflow — music streaming and downloads",
    description:
      "20+ screens, 100+ components, Auto Layout, fully responsive on desktop and mobile, with a prototype and style guide.",
  },
  sp5: {
    studentName: "Mina Borhani, Fazel Mikaeili, Siran Anvari",
    projectTitle: "NFT Product Marketplace",
    description:
      "60+ screens, 20+ components, Auto Layout, responsive, with a prototype and style guide.",
  },
  sp6: {
    studentName: "Fatemeh Yousefi, Sana Safaei, Fatemeh Safari, Aida Esmaeili, Zeynab Aliabbasi",
    projectTitle: "NFT Marketplace — Rare NFTs",
    description:
      "200+ screens, 80+ components and variants, Auto Layout, fully responsive, with a prototype and style guide.",
  },
  sp8: {
    studentName: "Roya Soltanmohammadi, Zahra Mohammadzadeh, Atefeh Nayebi, Ghazaleh Ghalaei, Fatemeh Soltani",
    projectTitle: "NamaPlus — a film streaming app",
    description:
      "100+ screens, 50+ components, Auto Layout, variants, an animated prototype and a style guide.",
  },
  sp9: {
    studentName: "Behnam Mousavi, Kimia Pirnia, Fatemeh Vafaei",
    projectTitle: "IELTS — a language learning app",
    description:
      "50+ screens, 120+ components, Auto Layout, variants, the full flow and a style guide.",
  },
  sp10: {
    studentName: "Ghazaleh Shiri, Arezou Mohammadalizadeh, Hadis Heydari, Nafas Emadlou",
    projectTitle: "Regal — a women's clothing store",
    description:
      "100+ screens, 50+ components, variants, a mobile version, fully responsive, Auto Layout and a style guide.",
  },
  sp11: {
    studentName: "Mohammad Nasrollahi, Sima Shirdel, Karen Alaei, Maryam Golafzani",
    projectTitle: "T.Movie — film and series streaming",
    description:
      "10+ screens, 30+ components, a dashboard-led project with rich interaction and a style guide.",
  },
  sp12: {
    studentName: "Mohammad Abdi, Mehrdad Torabi",
    projectTitle: "TechnoShop — a consumer electronics store",
    description:
      "30+ screens, 80+ components, responsive, with an app version and a style guide.",
  },
  sp13: {
    studentName: "Zahra Saeedi, Mina Ahmadi, Mohammad Abdi, Alireza Rokni, Zahra Baeedi",
    projectTitle: "Varzesh 3 — a website redesign",
    description:
      "A redesign of 8+ screens, componentised, responsive, with an app version and a style guide.",
  },
  sp14: {
    studentName: "Elham Jarrahzadeh, Mohammadjavad Azimi, Parand Mohammadi",
    projectTitle: "Music Streaming — streaming and downloads",
    description:
      "25+ screens, 100+ components, variants, fully responsive on mobile and desktop, Auto Layout and a style guide.",
  },
  sp15: {
    studentName: "Amirhossein Azargasht, Arash Zarei, Mohammadreza Jahannama, Zahra Vadipour",
    projectTitle: "Film and series streaming — website",
    description:
      "20+ screens, dark and light modes, fully responsive, a rich prototype and a style guide.",
  },
  sp16: {
    studentName: "Negin Norouzi",
    projectTitle: "A children's bookshop app",
    description:
      "15+ screens, componentised, with a prototype and style guide — the designer was hired as a designer after the course.",
  },
  sp17: {
    studentName: "Elaheh Basirnia, Amirhossein Taghizadeh, Reza Abbasi",
    projectTitle: "MelodyMatrix — music streaming",
    description:
      "25+ screens, 40+ components including responsive cards, Auto Layout, fully responsive, with a prototype and style guide.",
  },

  // ── UX case studies ──
  sp18: {
    studentName: "Aida Behrouzi, Masoumeh Kamali, Zahra Ghanbartalab, Mohaddeseh Adineh, Pegah Kharand",
    projectTitle: "WH — a women's health app",
    description:
      "A single joined-up answer to the women's health experience, built around awareness and empathy.",
  },
  sp19: {
    studentName: "Hananeh Farkoosh",
    projectTitle: "Divar redesign — a better way to post a listing",
    description:
      "A redesign of posting and managing listings, to cut drop-off and make trades feel safer and more trustworthy.",
  },
  sp20: {
    studentName: "Marziyeh Narimanpour, Fatemehsadat Motamedfar, Mina Borhani",
    projectTitle: "Calmind — coursework automation for students",
    description:
      "One smart place for students to manage the week's coursework, keep stress in check and log how they feel.",
  },
  sp21: {
    studentName: "Bahar Javadnia, Masoumeh Ahmadi, Fariba Heydari, Shahin Seyfi Alagoz, Toktam Mazaheri",
    projectTitle: "UniMind — student mental health",
    description:
      "An app for quieting the mind, logging feelings and pushing back against burnout in students under pressure.",
  },
  sp22: {
    studentName: "Parand Shokatyari, Mozhgan Aboudi, Samaneh Abedini",
    projectTitle: "Petzy — pet care without the hassle",
    description:
      "Low-friction pet care for people with no time: booking a sitter you can trust, and checking in remotely.",
  },
  sp23: {
    studentName: "Kimia Pirnia, Baran Amirkhanlou, Mohammad Nourbakhsh, Saeedeh Emami, Kimia Fouladi",
    projectTitle: "Vita Fit — sticking with exercise and diet",
    description:
      "Getting busy people to stay with an exercise and diet plan, through personalisation and gamification.",
  },
  sp24: {
    studentName: "Maliheh Pourhashemi, Mahla Afkhami, Mahsa Vahabzadeh",
    projectTitle: "DietBetes — diet plans for diabetes",
    description:
      "Making the process of getting a diet plan faster and simpler for people with diabetes, with help from AI.",
  },
  sp25: {
    studentName: "Zeynab Banihashemi, Hasti Rad, Ghazal Masoumpour, Nahid Ghahremani, Maryam Hafezi",
    projectTitle: "DevLoop — keeping junior developers going",
    description:
      "Helping junior developers stay motivated while they learn, and show their projects to employers.",
  },
  sp26: {
    studentName: "Aida Esmaeili, Farimah Haseli, Mehdi Hosseinabadi, Azarnoush Mirzaei",
    projectTitle: "Ayad — a pupil's assistant",
    description:
      "Personal planning and better focus for school pupils, with smart task reminders and time management.",
  },
  sp27: {
    studentName: "Mobina Jamshidjam, Bahar Seraghi, Mahin Khodayari, Zeynab Sayah, Faezeh Dashti",
    projectTitle: "A ride-hailing service for children and teenagers",
    description:
      "Safe transport with parental oversight, and a journey children and teenagers can be trusted to take.",
  },
  sp28: {
    studentName: "Safa Jahankhah",
    projectTitle: "A VOD platform — films and series",
    description:
      "A real client project: films and series, smart recommendations, watching together, and talking to other film fans.",
  },
  sp29: {
    studentName: "Behshid Mohammadi, Aref Langari, Fatemeh Yousefi, Negin Nikseresht, Sheyda Hedayati",
    projectTitle: "A smart parenting assistant",
    description:
      "Tailored, intelligent parenting advice, with each family's data kept private.",
  },
  sp30: {
    studentName: "Ghazaleh Shiri",
    projectTitle: "Regal — an app for a women's clothing boutique",
    description:
      "A step-by-step guide to measuring your size, easy buying and proper search, for a women's clothing boutique.",
  },
  sp31: {
    studentName: "Sahar Nejadbahram",
    projectTitle: "ZENON — an AI chatbot dashboard",
    description:
      "The dashboard for an AI chatbot: 10+ screens, 100+ components and variants, and a complete prototype. Designed over ten weeks on the UI Infinity course.",
  },
  sp32: {
    studentName: "Samira Mirzaei",
    projectTitle: "MetaMint — an NFT marketplace",
    description:
      "A complete NFT marketplace with every screen it needs: home, the marketplace itself, item detail, the buying flow, the user profile, wallet connection and a 404. Professional, and ready to ship.",
  },
};

/** پروژه‌ها را به زبان خواسته‌شده برمی‌گرداند؛ فارسی دست‌نخورده رد می‌شه */
export function localizeProjects(
  projects: readonly StudentProject[],
  lang: Lang
): StudentProject[] {
  if (lang === "fa") return [...projects];
  return projects.map((p) => ({ ...p, ...EN[p.id] }));
}
