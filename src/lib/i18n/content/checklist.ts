import type { ChecklistTrack, ChecklistStage } from "@/lib/checklist";
import type { Lang } from "@/lib/i18n";

/**
 * ترجمهٔ چک‌لیست یادگیری. مثل بقیهٔ محتوا، انگلیسی روی فارسی سوار می‌شه و
 * کلیدش id مرحله‌ست.
 *
 * آیتم‌های هر مرحله با ترتیب جفت می‌شن نه با کلید — آیتم‌ها عنوانِ یکتا و
 * پایدار ندارن و کلیددادن به تک‌تکشون فقط یک لایهٔ اسم اضافه می‌کرد که خودش
 * باید هم‌گام نگه داشته می‌شد. اگر روزی تعداد آیتم‌های فارسی و انگلیسی یکی
 * نبود، آیتم‌های بی‌جفت فارسی می‌مونن به‌جای اینکه بیفتن.
 *
 * زمان‌ها («حدود ۲ هفته») هم ترجمه می‌شن چون عدد فارسی توی جملهٔ انگلیسی
 * خونده نمی‌شه.
 */

interface StageOverlay {
  title: string;
  subtitle: string;
  duration: string;
  items: { title: string; desc: string }[];
}

const UI_COURSE_EN = "UI Design Infinity";
const UX_COURSE_EN = "UX Design Infinity";
const PORTFOLIO_COURSE_EN = "The portfolio course";

/** برچسب دوره‌ها به فارسیه؛ اینجا برگردانده می‌شه تا لینکِ ته مرحله هم انگلیسی شه */
const COURSE_LABEL_EN: Record<string, string> = {
  "رابط کاربری بی‌نهایت": UI_COURSE_EN,
  "تجربه کاربری بی‌نهایت": UX_COURSE_EN,
  "دوره پرتفولیو": PORTFOLIO_COURSE_EN,
};

const STAGES_EN: Record<string, StageOverlay> = {
  "ui-tools": {
    title: "Figma and your workspace",
    subtitle:
      "Before any talk of aesthetics, you have to be able to build what's in your head without fighting the tool. This stage is only about fluency.",
    duration: "About 2 weeks",
    items: [
      { title: "The Figma window and its panels", desc: "Frames, layers, pages and the side panels. Enough that you don't get lost and you know where everything lives." },
      { title: "Frame versus group", desc: "Understand the difference. Getting this wrong here wrecks the structure of your whole file later." },
      { title: "Shapes, text and images", desc: "The basic drawing tools. Eighty per cent of everyday work is done with just these." },
      { title: "Align and distribute", desc: "Placing things precisely next to each other. The human eye picks up a few pixels of disorder." },
      { title: "Shared styles", desc: "Save colour and text as styles so one change updates everything, everywhere." },
      { title: "The shortcuts worth knowing", desc: "Learn the ten main ones by heart. You'll work twice as fast." },
      { title: "Keeping the file tidy", desc: "Name layers and pages properly. A messy file makes collaboration impossible." },
      { title: "Your first finished screen", desc: "Anything at all. Just finish it. Finishing matters far more than being flawless." },
    ],
  },
  "ui-layout": {
    title: "Layout and hierarchy",
    subtitle:
      "This is where amateur work parts company with professional work. Most weak designs don't have a tool problem, they have a layout problem.",
    duration: "About 2 weeks",
    items: [
      { title: "Visual hierarchy", desc: "Decide where the eye goes first and where it goes next. Control it with size, weight and contrast." },
      { title: "A spacing scale", desc: "Pick one scale — 4, 8, 16 — and don't leave it. Arbitrary spacing reads as sloppiness." },
      { title: "Proximity", desc: "Put related things close together and leave space between groups. The simplest way to create order." },
      { title: "Grids and columns", desc: "The underlying structure of a page. What quietly makes something feel professional." },
      { title: "White space", desc: "Empty space isn't decoration, it's a focusing tool. Filling every centimetre makes reading harder." },
      { title: "Balance and visual weight", desc: "Distributing weight across the page so one side doesn't feel misleadingly heavy." },
      { title: "Repetition and consistency", desc: "Repeat one pattern across the whole product. Consistency builds trust." },
      { title: "Redo the earlier exercise", desc: "Rebuild the screen from stage one with these principles and put the two side by side." },
    ],
  },
  "ui-type": {
    title: "Typography",
    subtitle:
      "Most of any interface is text. If your typography is weak, no colour or effect will save it.",
    duration: "About 2 weeks",
    items: [
      { title: "The anatomy of letterforms", desc: "X-height, ascenders and descenders. Understanding these turns font choice from guesswork into judgement." },
      { title: "A type scale", desc: "Build one harmonious scale instead of picking an arbitrary number each time." },
      { title: "Line height", desc: "Around 1.5× the font size for body text. Persian text needs more room than Latin." },
      { title: "Line length", desc: "Between sixty and seventy-five characters. Very long lines lose the eye on the way back." },
      { title: "Weight and emphasis", desc: "Build hierarchy with font weight, not with different colours." },
      { title: "Pairing Persian and Latin", desc: "Setting the two together properly, especially where numbers and English terms land mid-sentence." },
      { title: "Legibility on mobile", desc: "At least sixteen pixels for body text. Smaller than that and the user zooms." },
    ],
  },
  "ui-color": {
    title: "Colour and contrast",
    subtitle:
      "Colour has a job in an interface. It has to say what matters, what is clickable and what is dangerous.",
    duration: "About 2 weeks",
    items: [
      { title: "Building a colour ramp", desc: "From the brand colour, build a nine or ten step ramp from very light to very dark." },
      { title: "Neutrals", desc: "Most of the surface of a serious product is grey. Build yourself a good set of them." },
      { title: "Status colours", desc: "Success, error, warning and information. Each has to be recognisable instantly." },
      { title: "Contrast ratios", desc: "At least 4.5:1 for ordinary text. Light grey on white is unreadable for a lot of people." },
      { title: "Never let colour carry the message alone", desc: "Put an icon or a word next to it. A colour-blind user cannot tell your green from your red." },
      { title: "Use the accent sparingly", desc: "The less colour, the more emphasis it carries. Keep the brand colour for the primary action." },
      { title: "Dark mode", desc: "Dark mode is not inverted colours. It has to be designed and tested on its own terms." },
    ],
  },
  "ui-components": {
    title: "Auto Layout and components",
    subtitle:
      "Without this stage every small change turns into hours of manual work. This is where your work becomes something that scales.",
    duration: "About 3 weeks",
    items: [
      { title: "Auto Layout basics", desc: "Direction, gap and padding. The single most important Figma feature — everything else rides on it." },
      { title: "Nested Auto Layout", desc: "Layers within layers, for complex structures like a card inside a list." },
      { title: "Resizing behaviour", desc: "Deciding whether each piece stays fixed or stretches when the container changes." },
      { title: "Making components", desc: "Build once, use everywhere. This is the foundation of professional work." },
      { title: "Variants", desc: "Gather every state of a component into a single set." },
      { title: "Component properties", desc: "Make text, icons and state swappable without detaching from the component." },
      { title: "The base components", desc: "Button, input, label, avatar and card. Start with the simplest." },
      { title: "Every state", desc: "Default, hover, pressed, focus, disabled, loading and error." },
    ],
  },
  "ui-system": {
    title: "Design systems",
    subtitle:
      "Once a project gets big, you drown without a system. This is the stage that makes you hireable.",
    duration: "About 2 weeks",
    items: [
      { title: "Base tokens", desc: "Define colour, type, spacing, corner radius and shadow as variables." },
      { title: "Semantic naming", desc: "Name the use, not the colour. Error colour, surface colour — not 'red 500'." },
      { title: "A shared library", desc: "Turn the system into a library so it can be used across several files." },
      { title: "Short documentation", desc: "Three sentences per component: when to use it, when not to, and why." },
      { title: "Versions and changes", desc: "When something changes, everyone else has to understand what changed and why." },
      { title: "Working with developers", desc: "If a developer had no hand in building it, they won't use it." },
      { title: "Regular review", desc: "A system is alive. Prune it every so often or it swells." },
    ],
  },
  "ui-patterns": {
    title: "Patterns and responsive design",
    subtitle:
      "Users expect things to work the way they work everywhere else. Reinventing the wheel usually costs the user, not you.",
    duration: "About 3 weeks",
    items: [
      { title: "Navigation", desc: "Menus, tabs and breadcrumbs. The user should always know where they are." },
      { title: "Forms and inputs", desc: "Persistent labels, clear error messages and a sensible field order." },
      { title: "Tables and lists", desc: "Showing a lot of data without tiring the eye." },
      { title: "Modals and drawers", desc: "When to use which, and how to make closing them obvious." },
      { title: "Empty states", desc: "When there's no data yet. The best chance you'll get to guide the user." },
      { title: "Loading states", desc: "A skeleton of the page rather than a spinner. It feels faster." },
      { title: "Error states", desc: "Say what happened and what to do about it. 'An error occurred' is worth nothing." },
      { title: "Breakpoints", desc: "Start the design on mobile and let it open up to desktop." },
      { title: "Touch target size", desc: "At least forty-four pixels. A small icon on mobile means repeated mistakes." },
    ],
  },
  "ui-delivery": {
    title: "Handoff and portfolio",
    subtitle:
      "Until you've built a complete product and can defend it, you've been practising, not working.",
    duration: "About 4 weeks",
    items: [
      { title: "A complete project", desc: "One whole flow across several screens with every state — not a single pretty page." },
      { title: "Preparing for development", desc: "Clean naming, defined spacing and a file a developer can actually read." },
      { title: "Exporting properly", desc: "Icons and images in the right format and the right size." },
      { title: "The case study", desc: "Problem, constraints, options, decision, outcome. The 'why' is the part that counts." },
      { title: "Pick three strong projects", desc: "Three deep ones beat ten shallow ones. Be ruthless and cut." },
      { title: "Presenting and defending", desc: "Practise explaining your decisions out loud." },
      { title: "Taking critique", desc: "Show your work and take the criticism. You can't see your own blind spots." },
    ],
  },

  "ux-foundation": {
    title: "Foundations and design thinking",
    subtitle:
      "Before any tool you have to learn the way of thinking. UX means deciding for a reason, not by taste.",
    duration: "About 2 weeks",
    items: [
      { title: "UI versus UX", desc: "One is the surface, the other the path. Plenty of people conflate the two and end up confused." },
      { title: "The double diamond", desc: "Diverge and converge, twice. The framework that puts order on the whole job." },
      { title: "Framing the problem", desc: "The user's real problem, not the one you think it is." },
      { title: "Users versus customers", desc: "The person who uses it isn't always the person who pays for it." },
      { title: "Basic psychology", desc: "Cognitive load, Hick's law and Fitts's law. Why people get confused or slow." },
      { title: "Nielsen's heuristics", desc: "The ten classic principles still underpinning any interface evaluation." },
      { title: "Ethics in design", desc: "Learn to recognise dark patterns so you don't reach for one by accident." },
    ],
  },
  "ux-research": {
    title: "User research",
    subtitle:
      "Without research, designing is guessing confidently. You don't need a budget, you need the right method.",
    duration: "About 3 weeks",
    items: [
      { title: "Qualitative and quantitative", desc: "One tells you why, the other how much. Each has its place." },
      { title: "Writing the right question", desc: "A leading question buys you a worthless answer. Ask open ones." },
      { title: "User interviews", desc: "Ask about past behaviour, not opinions. A real memory is more honest." },
      { title: "The art of silence", desc: "After an answer, wait three seconds. The most valuable sentence comes after that pause." },
      { title: "Field observation", desc: "Watch how they actually work, not what they say they do." },
      { title: "Surveys", desc: "For when you need a number. Design one badly and you get bad data." },
      { title: "Competitor analysis", desc: "See how others solved the same problem and where they failed." },
      { title: "The data you already have", desc: "Support tickets and usage stats are a free gold mine." },
      { title: "How many is enough", desc: "Five people usually surface most of the real problems. Don't wait for a hundred." },
    ],
  },
  "ux-synthesis": {
    title: "Analysis and synthesis",
    subtitle:
      "Raw data is useless. The real skill is pulling a pattern out of a pile of scattered remarks.",
    duration: "About 2 weeks",
    items: [
      { title: "Affinity mapping", desc: "Cluster the notes until the recurring patterns surface on their own." },
      { title: "Personas", desc: "A real stand-in for your users, built on data — not a pretty invented character." },
      { title: "Journey maps", desc: "The user's whole path with how they feel at each point. Pain points give themselves away here." },
      { title: "Empathy maps", desc: "What they say, what they think, what they do and how they feel." },
      { title: "Jobs to be done", desc: "What the user is hiring the product to do for them." },
      { title: "Prioritising problems", desc: "You can't fix everything. Choose on impact and cost." },
      { title: "The problem statement", desc: "All the research, condensed into one clear sentence." },
      { title: "Presenting the findings", desc: "Research nobody understands may as well not have happened." },
    ],
  },
  "ux-ia": {
    title: "Information architecture",
    subtitle:
      "If the user can't find something, for them it doesn't exist. This stage is about building a mental map.",
    duration: "About 2 weeks",
    items: [
      { title: "Grouping content", desc: "Arranging information to match the user's head, not your org chart." },
      { title: "Card sorting", desc: "Let users build the categories themselves. The result is usually a surprise." },
      { title: "Tree structure", desc: "Depth versus breadth. A very deep menu means a lost user." },
      { title: "Labelling", desc: "Use the user's words, not internal company jargon." },
      { title: "Navigation patterns", desc: "Choosing between a sidebar, a bottom tab bar, or a combination." },
      { title: "Search and filters", desc: "Once there's a lot of content, search matters more than navigation." },
      { title: "Tree testing", desc: "Test the structure with no design at all. The cheapest test there is." },
    ],
  },
  "ux-flow": {
    title: "Flows and wireframes",
    subtitle:
      "Settle the path before the colour and the detail. A wireframe exists so you can be wrong quickly and fix it cheaply.",
    duration: "About 3 weeks",
    items: [
      { title: "User flows", desc: "The user's route from start to goal, with every branch." },
      { title: "Task flow maps", desc: "Decisions and conditions. This is where you find out how many states you really have." },
      { title: "Sketching on paper", desc: "The fastest way to get ten ideas out of your head. Beauty is beside the point." },
      { title: "Plain wireframes", desc: "Structure and hierarchy only, with no colour or particular typeface." },
      { title: "Real content", desc: "Don't design with lorem ipsum. Real text shows you real problems." },
      { title: "The secondary states", desc: "Empty, error, loading and far-too-much-data. This is where professionalism shows." },
      { title: "Cutting steps", desc: "Every extra step is drop-off. Cut ruthlessly." },
      { title: "Reviewing with the team", desc: "Check the flow with other people before moving on." },
    ],
  },
  "ux-prototype": {
    title: "Prototyping",
    subtitle:
      "An idea can't be tested until it can be clicked. A prototype turns talk into something you can put in a hand.",
    duration: "About 2 weeks",
    items: [
      { title: "Levels of fidelity", desc: "Know when a rough prototype is enough and when it has to be exact." },
      { title: "Linking screens", desc: "Building a clickable path in Figma so the flow can be walked." },
      { title: "Basic interactions", desc: "Hover, click, scroll, and opening and closing." },
      { title: "Motion with meaning", desc: "Movement should show cause and effect, not just look nice." },
      { title: "Prototyping for a test", desc: "Build only the part you're going to test. The rest is wasted time." },
      { title: "Sharing and feedback", desc: "Send a link and collect comments, rather than a flat image." },
    ],
  },
  "ux-testing": {
    title: "Testing and evaluation",
    subtitle:
      "This is where you find out whether you were right. Most designers avoid this stage because it's frightening.",
    duration: "About 2 weeks",
    items: [
      { title: "Writing scenarios", desc: "Give the user a job, not an instruction. Say: you want to cancel your subscription." },
      { title: "Testing without helping", desc: "Sit quietly and watch. Any help at all makes the test meaningless." },
      { title: "Think aloud", desc: "Ask the user to say what's going through their head. That's where confusion explains itself." },
      { title: "Recording observations", desc: "Note where they pause, where they go wrong and where they go back." },
      { title: "Heuristic evaluation", desc: "Walk the interface yourself against Nielsen's ten. Fast and free." },
      { title: "Accessibility testing", desc: "Try it with a keyboard and a screen reader. A great deal comes out here." },
      { title: "Prioritising findings", desc: "Not every problem weighs the same. Sort them by severity." },
      { title: "Iterate", desc: "Test, fix, test again. The third version is usually the presentable one." },
    ],
  },
  "ux-case": {
    title: "Case studies and presenting",
    subtitle:
      "Good work that isn't told doesn't get seen. In an interview it's the case study that gets you hired, not your screenshots.",
    duration: "About 3 weeks",
    items: [
      { title: "The shape of the story", desc: "Problem, process, decision, outcome. Tell it like a story." },
      { title: "Showing the process", desc: "The final output is worth less than the road you took to it." },
      { title: "Explaining the whys", desc: "Why you chose this option, and why you set the others aside." },
      { title: "Bringing numbers", desc: "If you have data, bring it. If you don't, say how you knew it worked." },
      { title: "Writing about failures", desc: "Where you got it wrong and then fixed it earns you the most credibility." },
      { title: "Your own part", desc: "Be clear about exactly which piece of the group's work was yours." },
      { title: "Rehearsing", desc: "Explain it out loud. Wherever you stumble is where the story is weak." },
    ],
  },
};

const TRACKS_EN: Record<string, { label: string; tagline: string; weeks: string }> = {
  ui: {
    label: "UI design",
    tagline:
      "The path to building interfaces that both work properly and look professional. From tool fluency through to a design system and a portfolio.",
    weeks: "About 20 weeks",
  },
  ux: {
    label: "UX design",
    tagline:
      "The path to understanding the user and deciding for a reason. From research and analysis through to testing and telling the story of the work.",
    weeks: "About 19 weeks",
  },
};

function localizeStage(stage: ChecklistStage): ChecklistStage {
  const en = STAGES_EN[stage.id];
  if (!en) return stage;

  return {
    ...stage,
    title: en.title,
    subtitle: en.subtitle,
    duration: en.duration,
    // بدون جفتِ انگلیسی، آیتم فارسی می‌مونه به‌جای اینکه خالی بشه
    items: stage.items.map((item, i) => en.items[i] ?? item),
    course: stage.course && {
      ...stage.course,
      label: COURSE_LABEL_EN[stage.course.label] ?? stage.course.label,
    },
  };
}

/** مسیرها را به زبان خواسته‌شده برمی‌گرداند؛ فارسی دست‌نخورده رد می‌شه */
export function localizeTracks(
  tracks: readonly ChecklistTrack[],
  lang: Lang
): ChecklistTrack[] {
  if (lang === "fa") return [...tracks];

  return tracks.map((track) => ({
    ...track,
    ...TRACKS_EN[track.key],
    stages: track.stages.map(localizeStage),
  }));
}
