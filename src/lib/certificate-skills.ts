/**
 * محتوای انگلیسیِ سند گواهی.
 *
 * فهرست مهارت‌ها خلاصه‌ی سرفصل هر دوره‌ست و روی خود گواهی چاپ می‌شه، چون
 * کارفرما با دیدن گواهی باید بفهمه دارنده‌اش دقیقاً چی بلده، نه فقط اینکه
 * یک دوره گذرونده.
 */

export interface TrackContent {
  /** عنوان رشته، همون‌طور که وسط متن گواهی میاد */
  discipline: string;
  /** ساعت آموزش که در متن ذکر می‌شه */
  hours: number;
  skills: string[];
}

export const TRACK_CONTENT: Record<string, TrackContent> = {
  UI: {
    discipline: "User Interface Design",
    hours: 150,
    skills: [
      "Introduction to User Interface Design",
      "Figma fundamentals and workflow",
      "Visual hierarchy and layout",
      "Spacing systems and grids",
      "Typography for interfaces",
      "Color theory and contrast",
      "Auto Layout and components",
      "Variants and component states",
      "Design systems and tokens",
      "UI patterns and navigation",
      "Responsive and adaptive design",
      "Developer handoff",
      "Portfolio project",
    ],
  },
  UX: {
    discipline: "User Experience Design",
    hours: 150,
    skills: [
      "Introduction to User Experience Design",
      "Design thinking method",
      "Problem and solution framing",
      "User research",
      "Analysis and synthesis",
      "Persona and customer journey map",
      "Information architecture",
      "User flows and sitemap",
      "Wireframes",
      "Prototyping",
      "Usability testing",
      "Interaction design",
      "Case study",
    ],
  },
  QC: {
    discipline: "QuadCamp Product Design",
    hours: 400,
    skills: [
      "Design foundations",
      "Figma fundamentals",
      "Visual hierarchy and layout",
      "Color and typography",
      "Components and reusability",
      "User research basics",
      "User flows and wireframes",
      "Prototyping",
      "Usability testing",
      "Team collaboration",
      "Final project",
    ],
  },
};

export function contentForTrack(track: string): TrackContent {
  return TRACK_CONTENT[track] ?? TRACK_CONTENT.UI;
}
