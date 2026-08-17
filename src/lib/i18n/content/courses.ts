import type { Course, FAQ, CourseTopic, CourseTestimonial } from "@/lib/mock-data";
import type { Lang } from "@/lib/i18n";

/**
 * ترجمهٔ دادهٔ دوره‌ها.
 *
 * فایل mock-data دست‌نخورده فارسی می‌مونه و انگلیسی روش سوار می‌شه. این‌طوری
 * نسخهٔ فارسی — که نسخهٔ اصلیه — با هیچ تغییری اینجا خراب نمی‌شه، و هر فیلدی
 * که هنوز ترجمه نشده خودبه‌خود فارسی می‌مونه به‌جای اینکه خالی بشه.
 *
 * کلید همون slug دوره‌ست.
 */

export type CourseOverlay = Partial<
  Pick<
    Course,
    | "title"
    | "subtitle"
    | "description"
    | "longDescription"
    | "level"
    | "instructor"
    | "tags"
    | "features"
    | "topics"
    | "faqs"
    | "learningOutcomes"
    | "targetAudience"
    | "afterCompletion"
    | "testimonials"
  >
>;

/** سطح دوره — توی داده فارسیه و تایپش هم فارسیه، پس جدا نگه داشته می‌شه */
export const LEVEL_EN: Record<string, string> = {
  مقدماتی: "Beginner",
  متوسط: "Intermediate",
  پیشرفته: "Advanced",
};

const INSTRUCTOR_EN = "Mojtaba Yazdanpanah";

const infinityFeaturesEn = (projects: number, mentoringHours: number): string[] => [
  "Starts from zero, no prerequisites",
  `${projects} hands-on projects in the videos`,
  "You build the project yourself — in a group or alone",
  "A weekly plan for videos and tasks",
  "Support from the teacher",
  `${mentoringHours} hours of mentoring — project reviews and answers`,
  "SpotPlayer licence after purchase",
];

const offlineFeaturesEn = (projects: number): string[] => [
  "Starts from zero, no prerequisites",
  `${projects} hands-on projects in the videos`,
  "One year of support over Telegram",
  "SpotPlayer licence after purchase",
  "Free course updates",
  "No group mentoring sessions",
];

/** پرسش‌های مشترکِ هر دو دورهٔ بی‌نهایت */
const sharedInfinityFAQs = {
  noExperience: {
    q: "Do I need previous design experience?",
    a: "No. The course starts from absolute zero. All you need is basic familiarity with a computer.",
  },
  mentoring: {
    q: "How do the mentoring sessions work?",
    a: "They're live group sessions, one a week. Projects get reviewed, you ask questions and get direct feedback. You learn from everyone else's feedback too.",
  },
  missed: {
    q: "What if I miss a mentoring session?",
    a: "Every session is recorded and available afterwards. You never lose one.",
  },
};

const sharedOfflineFAQs = {
  noExperience: sharedInfinityFAQs.noExperience,
  support: {
    q: "What exactly does one year of support mean?",
    a: "You can ask your questions through Telegram support and get answers for a year. Replies usually come within 24 to 48 hours.",
  },
  updates: {
    q: "Does the content get updated?",
    a: "Yes. Every time the course is updated, access to the new material is free, forever.",
  },
  difference: {
    q: "How is this different from the Infinity version?",
    a: "The video content is identical. The difference is that the offline version has no group mentoring sessions — it suits people who want to move at their own tempo.",
  },
};

const uiInfinityFAQsEn: FAQ[] = [
  sharedInfinityFAQs.noExperience,
  {
    q: "What software do I need?",
    a: "Only Figma — the free version is entirely enough. Nothing else is required.",
  },
  sharedInfinityFAQs.mentoring,
  {
    q: "Should I do the projects alone or in a group?",
    a: "Either works. You can work alone or form a group with a classmate. It's your call — both paths get reviewed in the session.",
  },
  sharedInfinityFAQs.missed,
  {
    q: "What can I do after the course?",
    a: "You'll have a portfolio with five real projects. You're ready to enter the market as a UI designer, or to carry on with the UX course.",
  },
];

const uxInfinityFAQsEn: FAQ[] = [
  sharedInfinityFAQs.noExperience,
  {
    q: "What software do I need?",
    a: "Figma, Miro and FigJam — all three have free versions, and they cover everything.",
  },
  sharedInfinityFAQs.mentoring,
  {
    q: "Should I do the projects alone or in a group?",
    a: "Either works. You can work alone or form a group with a classmate. Group work gives you genuine teamwork experience, and it shows in your portfolio.",
  },
  sharedInfinityFAQs.missed,
  {
    q: "What can I do after the course?",
    a: "You'll have a full case study and a UX portfolio. You can go after UX researcher or UX designer roles.",
  },
];

const uiOfflineFAQsEn: FAQ[] = [
  sharedOfflineFAQs.noExperience,
  {
    q: "What software do I need?",
    a: "Only Figma — the free version is entirely enough.",
  },
  sharedOfflineFAQs.support,
  sharedOfflineFAQs.updates,
  sharedOfflineFAQs.difference,
  {
    q: "What can I do after the course?",
    a: "You'll have a portfolio with five real projects. You're ready to enter the market as a UI designer.",
  },
];

const uxOfflineFAQsEn: FAQ[] = [
  sharedOfflineFAQs.noExperience,
  {
    q: "What software do I need?",
    a: "Figma, Miro and FigJam — all three have free versions.",
  },
  sharedOfflineFAQs.support,
  sharedOfflineFAQs.updates,
  sharedOfflineFAQs.difference,
  {
    q: "What can I do after the course?",
    a: "You'll have a full case study and a UX portfolio. You can go after UX researcher or UX designer roles.",
  },
];

const uiLearningOutcomesEn = [
  "The visual basics: colour, typography, spacing, elevation and icons",
  "Designing in Figma — from the basic tools to Variables, advanced Auto Layout and prototyping",
  "Building professional components with every state, variant and property",
  "The Atomic Design methodology and building a complete design system from scratch",
  "Responsive design for mobile, tablet and desktop",
  "Interaction design and the principles of micro-animation in UI",
  "Handing design over to developers — Inspect, tokens and documentation",
];

const uiTargetAudienceEn = [
  "Anyone starting design from zero — with no prerequisites at all",
  "Anyone who designs but whose foundations are shaky and wants to learn it systematically",
  "Developers who want to know design too",
  "Anyone who wants a real portfolio and a way into the job market",
];

const uiAfterCompletionEn = [
  "Five real portfolio-ready projects — from a podcast app to a design system",
  "The ability to design professional UI from idea to developer handoff",
  "A complete design system you built yourself",
  "Readiness for a job interview as a UI designer",
];

const uxLearningOutcomesEn = [
  "The full UX process from user research to testing — step by step",
  "Qualitative and quantitative research methods: interviews, surveys, Hotjar, Maze",
  "The tools of the trade: Figma, Miro and FigJam",
  "Building personas, customer journey maps and a precise problem definition",
  "Information architecture: user flows, sitemaps, card sorting and tree testing",
  "Fast wireframing and UX testing methods: usability tests and A/B tests",
  "Writing a professional case study for your portfolio",
];

const uxTargetAudienceEn = [
  "Anyone who wants to understand the design process from the user's side",
  "UI designers who want to learn UX and see further",
  "Anyone looking to move into UX research",
  "Anyone whose UX portfolio is weak, or doesn't exist yet",
];

const uxAfterCompletionEn = [
  "A complete case study from a real project — ready for your portfolio",
  "The ability to run the UX process end to end on your own",
  "Experience of working in a team on a real project",
  "Readiness for UX designer or UX researcher roles",
];

const uiInfinityTestimonialsEn: CourseTestimonial[] = [
  {
    name: "Negar",
    avatar: "N",
    text: "I started from zero. The weekly plan kept the videos from piling up. Patient mentoring, and the Q&A sessions were a course of their own.",
  },
  {
    name: "Amirhossein",
    avatar: "A",
    text: "I went to an interview — my confidence was extraordinary and I answered every technical question. The course wasn't even over yet.",
    outcome: "Interview passed",
  },
  {
    name: "Sanaz",
    avatar: "S",
    text: "I got hired after finishing. When I went through job ads, almost every skill they asked for had been in the course.",
    outcome: "Hired",
  },
  {
    name: "Arezoo",
    avatar: "A",
    text: "It brought order to my life. I met genuinely talented teammates — alongside my company work I got to take on another project.",
  },
];

const uxInfinityTestimonialsEn: CourseTestimonial[] = [
  {
    name: "Paridokht",
    avatar: "P",
    text: "In my interview the only work they looked at was our group case study. They liked it a lot and most of the questions were about it.",
    outcome: "Hired",
  },
  {
    name: "Nazanin",
    avatar: "N",
    text: "UX was always vague to me. Here I learned to move through the process step by step. Every question mark I had is gone.",
  },
  {
    name: "Mahshid",
    avatar: "M",
    text: "Working in a group showed me how my teammates think and let me fix my weak spots. My knowledge and my confidence both went up.",
  },
  {
    name: "Nasrin",
    avatar: "N",
    text: "I interviewed at a company and said I'd taken Mojtaba Yazdanpanah's courses. They told me I really knew my stuff.",
    outcome: "Interview passed",
  },
];

const uiOfflineTestimonialsEn: CourseTestimonial[] = [
  {
    name: "Raha",
    avatar: "R",
    text: "When I went through job ads, almost every skill they asked for had been taught in the course.",
  },
  {
    name: "Hamed",
    avatar: "H",
    text: "The tasks and the videos moved in step. That's what made me learn the material properly — with no gaps.",
  },
  {
    name: "Karen",
    avatar: "K",
    text: "Looking at this field from the outside I was worried. I'm glad I picked this course.",
  },
];

const uxOfflineTestimonialsEn: CourseTestimonial[] = [
  {
    name: "Neda",
    avatar: "N",
    text: "A teacher's knowledge alone doesn't make learning happen. That sense of safety — that it's fine to get things wrong — is what makes the difference.",
  },
  {
    name: "Samira",
    avatar: "S",
    text: "I'd had bad experiences with online courses. This one changed my mind.",
  },
  {
    name: "Roza",
    avatar: "R",
    text: "For how much ground the material covers, it was presented simply and understandably — that deserves thanks.",
  },
];

const portfolioTopicsEn: CourseTopic[] = [
  {
    title: "Portfolio types and Portfoliobox",
    description: "The kinds of portfolio, why Portfoliobox is worth choosing, and building one step by step. Eleven lessons.",
  },
  {
    title: "A portfolio on WordPress",
    description: "From what a domain and host are to installing WordPress and working in Elementor. Designing the hero, services, skills, work, banner, blog, navigation and footer — plus the responsive version of each and image optimisation. Forty lessons.",
  },
  {
    title: "A PDF portfolio",
    description: "Size and cover design, the about page, work and contact pages, the back cover, an optimised export and finishing techniques. Nine lessons.",
  },
  {
    title: "An Instagram portfolio",
    description: "Personal branding, laying out the work, direct outreach, networking, automation and building a team. Seven lessons.",
  },
  {
    title: "A designer's resume",
    description: "Building a professional resume in six lessons.",
  },
];

const prototypeTopicsEn: CourseTopic[] = [
  {
    title: "Interaction in Figma",
    description: "An introduction to interaction, prototyping, triggers and responses, vertical and horizontal scroll, interactive components and prototyping a complete project. Thirteen lessons.",
  },
  {
    title: "The final Figma project",
    description: "Buttons, category hovers, menus, inputs and cards, animated banners and cards, splash, product page, carousel, interactive filters and authentication. Thirteen lessons.",
  },
  {
    title: "Getting started with ProtoPie",
    description: "An introduction to the tool and the course Telegram channel.",
  },
  {
    title: "Chapter 1: Interaction basics",
    description: "Action and reaction, how interaction differs from animation, triggers, responses, objects and the interaction triangle. Seven lessons.",
  },
  {
    title: "Chapter 2: A tour of ProtoPie",
    description: "The environment, file management and the Figma plugin.",
  },
  {
    title: "Chapter 3: ProtoPie",
    description: "Dashboard, basic and shape tools, text, containers, device frames, scenes, the layer panel, the timeline, triggers, responses, the property panel, touch areas and three mini-projects. Seventeen lessons.",
  },
  {
    title: "Chapter 4: Conditions",
    description: "The illusion of choice, and conditions in practice.",
  },
  {
    title: "Chapter 5: Chains",
    description: "Introduction, Start, Chain, Range and Detect. Five lessons.",
  },
  {
    title: "Chapter 6: Variables",
    description: "Introduction, creating a variable and three exercises with variables in practice. Five lessons.",
  },
  {
    title: "Chapter 7: Scroll",
    description: "Scrolling and paging.",
  },
  {
    title: "Chapter 8: The final project",
    description: "Building the Fitsho app end to end: hero, about, and the four steps of the BMI calculator. Seven lessons.",
  },
  {
    title: "Chapter 9: Sharing and practice",
    description: "Recording on desktop and on a phone, part-one exercises and Scroll to. Six lessons.",
  },
];

const promptToProductTopicsEn: CourseTopic[] = [
  {
    title: "Session 1 · The designer in the age of AI",
    description: "Turn the fear of falling behind into an advantage: what changed, which skill is now gold, and where AI does not replace a designer.",
  },
  {
    title: "Session 1 · The language you speak to AI",
    description: "Writing the brief, giving context, defining personas and constraints, and building a personal prompt library that stays yours.",
  },
  {
    title: "Session 1 · From idea to concept",
    description: "Ideation, building the user flow, and writing UI copy and microcopy — fast, but with a designer's judgement.",
  },
  {
    title: "Session 1 · Building the interface with Figma AI",
    description: "Generating and editing an interface quickly with Figma AI, and more importantly, critiquing and refining the output with an eye that knows design.",
  },
  {
    title: "Session 2 · A design system, fast",
    description: "Defining tokens, naming and documenting components with AI's help, so the design is ready to become code.",
  },
  {
    title: "Session 2 · The bridge to code with Claude Code",
    description: "Turning the Figma design into a real, working front end with Claude Code, without being a programmer.",
  },
  {
    title: "Session 2 · Interaction and states",
    description: "Adding interaction, empty, error and loading states, and making it responsive — all under your direction.",
  },
  {
    title: "Session 3 · Deploying on Vercel",
    description: "From local code to a product online: a real link you can show, that opens on a phone too.",
  },
  {
    title: "Session 3 · Automating the repetitive work",
    description: "Accessibility audits, competitor research and generating states with agents and workflows, not just chat.",
  },
  {
    title: "Session 3 · An AI-first portfolio",
    description: "Building a case study that shows the AI-first process — which right now is a hiring advantage.",
  },
];

const promptToProductFAQsEn: FAQ[] = [
  {
    q: "Is this workshop for me?",
    a: "If you're a designer afraid of falling behind the AI wave, yes. It isn't for absolute beginners; it assumes you know design and want to bring AI into your work.",
  },
  {
    q: "How many sessions, and how are they run?",
    a: "Three live online sessions of three hours, interactive and hands-on, on a real project that we carry all the way to deployment.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. The bridge to code is handled by Claude Code and you direct it; you won't write it line by line, but you'll understand what it's building.",
  },
  {
    q: "Which tools do I need?",
    a: "Figma for design (with Figma AI), Claude Code for the code, and a free Vercel account for deployment. I'll show you how to set them up in the workshop.",
  },
  {
    q: "Are the sessions recorded?",
    a: "Yes, all three are recorded and available to you afterwards.",
  },
];

export const COURSE_EN: Record<string, CourseOverlay> = {
  "ui-infinity": {
    title: "UI Design Infinity",
    subtitle: "UI DESIGN INFINITY",
    description: "From Figma to design systems. Five real projects and 20 hours of group mentoring.",
    longDescription:
      "55 hours of video plus 20 hours of live mentoring — you learn how to reach your audience, build a real brand, and enter the market as a professional UI designer.",
    level: "Beginner",
    instructor: INSTRUCTOR_EN,
    features: infinityFeaturesEn(5, 20),
    faqs: uiInfinityFAQsEn,
    learningOutcomes: uiLearningOutcomesEn,
    targetAudience: uiTargetAudienceEn,
    afterCompletion: uiAfterCompletionEn,
    testimonials: uiInfinityTestimonialsEn,
  },

  "ux-infinity": {
    title: "UX Design Infinity",
    subtitle: "UX DESIGN INFINITY",
    description: "From user research to information architecture. Two real projects and 20 hours of mentoring.",
    longDescription:
      "35 hours of video plus 20 hours of live mentoring — from design thinking to a real case study. You learn how to find the user's problem, analyse it, and answer it.",
    level: "Beginner",
    instructor: INSTRUCTOR_EN,
    features: infinityFeaturesEn(2, 20),
    faqs: uxInfinityFAQsEn,
    learningOutcomes: uxLearningOutcomesEn,
    targetAudience: uxTargetAudienceEn,
    afterCompletion: uxAfterCompletionEn,
    testimonials: uxInfinityTestimonialsEn,
  },

  "ui-offline": {
    title: "UI Design",
    subtitle: "UI DESIGN",
    description:
      "The same content as the Infinity course: 55 hours of video, five real projects and a year of support. Only the mentoring sessions are missing.",
    longDescription:
      "The same videos and projects as the Infinity course, with a year of Telegram support. For anyone who wants to move at their own tempo.",
    level: "Beginner",
    instructor: INSTRUCTOR_EN,
    features: offlineFeaturesEn(5),
    faqs: uiOfflineFAQsEn,
    learningOutcomes: uiLearningOutcomesEn,
    targetAudience: uiTargetAudienceEn,
    afterCompletion: uiAfterCompletionEn,
    testimonials: uiOfflineTestimonialsEn,
  },

  "ux-offline": {
    title: "UX Design",
    subtitle: "UX DESIGN",
    description:
      "The same content as the Infinity course — 35 hours of video, two real projects, a year of support. Without the mentoring sessions.",
    longDescription:
      "The same videos and projects as the Infinity course, with a year of Telegram support. For anyone who wants to move at their own tempo.",
    level: "Beginner",
    instructor: INSTRUCTOR_EN,
    features: offlineFeaturesEn(2),
    faqs: uxOfflineFAQsEn,
    learningOutcomes: uxLearningOutcomesEn,
    targetAudience: uxTargetAudienceEn,
    afterCompletion: uxAfterCompletionEn,
    testimonials: uxOfflineTestimonialsEn,
  },

  portfolio: {
    title: "Portfolio Design",
    subtitle: "PORTFOLIO DESIGN",
    description:
      "How to build a UI/UX portfolio that convinces a hiring manager — from the case study to showing the work.",
    level: "Beginner",
    instructor: INSTRUCTOR_EN,
    topics: portfolioTopicsEn,
  },

  prototype: {
    title: "Prototype Design",
    subtitle: "PROTOTYPE DESIGN",
    description:
      "Building professional interactive prototypes in Figma — from basic animation to complex flows.",
    level: "Intermediate",
    instructor: INSTRUCTOR_EN,
    topics: prototypeTopicsEn,
  },

  "prompt-to-product": {
    title: "Prompt to Product workshop",
    subtitle: "PROMPT TO PRODUCT",
    description:
      "Three live sessions for the designer who refuses to fall behind the AI wave — from prompt and idea, through Figma AI and Claude Code, to a product deployed on Vercel.",
    longDescription:
      "This workshop is for a designer who knows their craft but fears being left behind by AI. Across three three-hour sessions we carry one real feature all the way: from brief and idea, to an interface with Figma AI, to live code with Claude Code, and finally a deployment on Vercel with a link you can show. The focus isn't a single tool; it's the AI-first way of thinking and the designer's judgement — the part no tool replaces.",
    level: "Intermediate",
    instructor: INSTRUCTOR_EN,
    topics: promptToProductTopicsEn,
    faqs: promptToProductFAQsEn,
  },
};

/**
 * دوره رو به زبان خواسته‌شده برمی‌گردونه.
 *
 * هر فیلدی که ترجمه‌اش نیومده باشه فارسی می‌مونه — نصفه‌بودنِ ترجمه بهتر از
 * خالی‌بودنِ صفحه‌ست.
 */
export function localizeCourse(course: Course, lang: Lang): Course {
  if (lang === "fa") return course;
  const en = COURSE_EN[course.slug];
  return en ? { ...course, ...en } : course;
}

export function localizeCourses(list: Course[], lang: Lang): Course[] {
  return lang === "fa" ? list : list.map((c) => localizeCourse(c, lang));
}
