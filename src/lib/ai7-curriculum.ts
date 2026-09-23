/**
 * زیرشاخهٔ هر درس، و پروژه‌ای که کنارِ دوره می‌رود.
 *
 * `odyssey.ts` نامِ فصل‌ها و درس‌ها را دارد چون صفحهٔ سیاره‌ها هم از
 * همان می‌خواند. آنچه اینجاست یک لایه پایین‌تر است: زیرِ هر درس، چه
 * چیزهایی واقعاً باز می‌شود.
 *
 * هر بند یک *اسلاید* از دکِ خودِ دوره است (`D:\robotype`،
 * صفتِ `data-c` روی هر `<section>`) نه خلاصه‌ای که این فایل ساخته باشد.
 * پس فهرست بلند است و باید هم باشد — همین است که «سرفصل» را از
 * «فهرستِ عنوان» جدا می‌کند.
 *
 * ترتیبِ `TOPICS[no][i]` با `MISSIONS[no].episodes[i]` یکی است و باید
 * یکی بماند؛ اگر درسی به فصلی اضافه شد، هر دو جا.
 *
 * هر هفت فصل حالا دک دارند و بندهایشان از همان دک‌ها استخراج شده.
 * نوشتنِ زیرشاخه برای چیزی که ساخته نشده، همان وعده‌ای
 * است که بعداً باید پسش گرفت — و در `Ai7Minimal` ردیفِ بی‌کلید
 * اصلاً باز نمی‌شود.
 *
 * انگلیسی‌اند، مثل نامِ درس‌ها. دلیلش در `odyssey.ts` بالای `Episode`.
 */
export const TOPICS: Record<string, string[][]> = {
  // ۰۱ · AI Thinking — deck-m1
  "01": [
    [
      "What AI thinking is",
      "The three standing questions",
      "With AI, not like AI",
      "The thesis",
      "Who this course is not for",
      "How we work",
      "What you need open",
      "Deliverable: the prompt kit",
    ],
    [
      "What an LLM is",
      "How one is made",
      "What it is not",
      "Tokens",
      "Token economics",
      "Counting letters, live",
      "Prediction",
      "The loop behind every word",
      "Why your ideas start to rhyme",
      "Temperature",
      "One prompt, three temperatures",
      "Reproducibility",
      "The context window",
      "How much actually fits",
      "Attention decay",
      "Where you put the instruction",
      "Chunking twenty interviews",
      "Context rot",
      "The system prompt",
      "Six mechanisms, six rules",
    ],
    [
      "Sycophancy",
      "One question, two framings",
      "Asking it neutrally",
      "Hallucination",
      "Its four kinds",
      "A live failure: the crisis number",
      "Why search is not enough",
      "Containing it",
      "Regression to the mean",
      "The default signature",
      "Escaping the default",
      "Bias",
      "Bias on our own desk",
      "Three things not to conflate",
      "Containing bias",
      "The knowledge edge",
      "It never says it cannot",
      "Six weaknesses, six antidotes",
    ],
    [
      "Auditing your own week",
      "The right size of a task",
      "The three tests",
      "Scoring six real tasks",
      "The verification rule",
      "What checking actually costs",
      "The dangerous case: plausible and wrong",
      "The decision table",
      "The main trap",
      "Signing your name to it",
      "What you never paste",
      "Who owns the output",
      "What a good boundary looks like",
    ],
    [
      "Weak versus strong",
      "The five parts",
      "Role",
      "A role library for designers",
      "Input",
      "Delimiters",
      "Poisoned input",
      "Task",
      "Output",
      "Boundary",
      "Useless negatives",
      "The assembled prompt",
      "Prompting with images",
      "Critiquing a screenshot",
      "Debugging a bad output",
      "Common errors",
      "The five-part checklist",
    ],
    [
      "Few-shot",
      "How many examples, in what order",
      "Rewriting microcopy with examples",
      "Chain of thought",
      "Reasoning models",
      "Vocabulary",
      "A glossary of substitutions",
      "Structured output",
      "Enumerated values",
      "Divergence",
      "Three passes, three worlds",
      "Adversarial ideation",
      "The pre-mortem",
      "Chaining turns",
      "A/B on two prompts",
      "Choosing a model",
      "Which technique, when",
    ],
    [
      "What is wrong with chat",
      "The standing instruction",
      "Three levels of tooling",
      "Context files",
      "The harness",
      "Tools",
      "Screenshots as input",
      "The loop",
      "Feedback, the vital condition",
      "One complete loop, worked",
      "Where not to close a loop",
      "What a loop costs",
      "When not to build a harness",
    ],
    [
      "Define good first",
      "The rubric",
      "From a feeling to a rule",
      "Scoring with a rubric",
      "The stopping condition",
      "Three kinds of stop",
      "The confirmation trap",
      "Human review",
      "The autonomy spectrum",
      "Plan mode first",
      "The second reader",
      "Versioning your prompts",
    ],
    [
      "What a kit is",
      "Building your own",
      "The blank template",
      "Testing the kit",
      "Common kit mistakes",
      "Your library",
      "The chapter checklist",
    ],
  ],

  // ۰۲ · AI Tools — deck-m2
  "02": [
    [
      "Claude in three layers",
      "Layer 1: chat and artifacts",
      "Artifacts, precisely",
      "Layer 2: projects",
      "What belongs in project knowledge",
      "What a skill is",
      "Inside SKILL.md",
      "Writing the description line",
      "Where skills live",
      "Progressive loading",
      "Connectors and MCP",
      "Which connector, for what",
      "Before you connect anything",
      "Layer 3: Claude Code",
      "Permissions and plan mode",
      "CLAUDE.md",
      "Where that file gets read",
      "A weak and a strong CLAUDE.md",
      "The remaining parts",
      "Which model",
      "Which layer for which job",
    ],
    [
      "Same shape, different names",
      "Canvas",
      "Custom GPTs versus skills",
      "Inside a custom GPT",
      "The rest of ChatGPT",
      "What Codex is",
      "AGENTS.md",
      "Where Codex lives",
      "Getting started",
      "One task, end to end",
      "A right-sized task",
      "Review, not just generation",
      "Local or cloud",
      "Why cloud runs fail",
      "How much rope to give it",
      "Codex speaks MCP too",
      "What this gives designers",
      "Your first three jobs this week",
      "Choosing between them",
    ],
    [
      "Why this one is different",
      "The map of the tools",
      "The Figma family",
      "A tidy file makes a better output",
      "FigJam and Slides, in practice",
      "The real win is the boring place",
      "Copy, in place",
      "Repetitive layer chores",
      "First Draft",
      "A First Draft prompt",
      "Figma Make",
      "What to feed Make",
      "User-testing something that works",
      "Make or Claude Code",
      "Figma as a source (MCP)",
      "Dev Mode and Code Connect",
      "The Figma agent",
      "Before you touch a client file",
      "One full pipeline, research to code",
    ],
  ],

  // ۰۳ · AI Native UX Design — deck-m3
  "03": [
    [
      "The thesis of this chapter",
      "Three things the model cannot know",
      "How the work divides",
      "The real danger here",
      "Deliverable: the UX folder",
    ],
    [
      "A request is not a problem",
      "The brief in five lines",
      "Write the assumptions down",
      "Finding them in a real brief",
      "Three kinds of assumption",
      "The right How-Might-We",
      "The measure, before the solution",
      "The edge of the problem",
      "Common mistakes",
    ],
    [
      "Why research at all",
      "The plan on one page",
      "The shape of the guide",
      "The leading-question trap",
      "Repairing a question with a constraint",
      "Past, not future",
      "How many people, and who",
      "In the room",
      "Consent and data",
    ],
    [
      "From audio to text",
      "One at a time, not all at once",
      "Observation versus interpretation",
      "Watching it jump to interpretation",
      "The extraction instruction",
      "Same input, with a boundary",
      "The evidence table",
      "The second reader",
    ],
    [
      "Why this step is different",
      "By behaviour, not by topic",
      "The synthesis prompt",
      "What we expected and did not see",
      "Three sanity checks",
    ],
    [
      "What a use case is and is not",
      "The nine fields",
      "The use-case prompt",
      "A use case that is not a flow",
      "Coverage",
    ],
    [
      "This one you write yourself",
      "From a feeling to a pass/fail line",
      "A rubric that is too strict",
      "The folder you hand over",
      "The handoff test",
    ],
  ],

  // ۰۴ · Agentic UX Design — deck-m4
  "04": [
    [
      "Where the line actually is",
      "The three ingredients",
      "When not to build one",
      "Which design tasks need an agent",
      "What designing an agent means",
      "The common mistake",
      "The vocabulary, once and for all",
    ],
    [
      "The loop in four moves",
      "What gets sent each turn",
      "How the transcript grows",
      "How a tool is called",
      "An error is an observation too",
      "How the loop ends",
      "One complete loop, worked",
      "Tracing what happened inside",
    ],
    [
      "A tool as the model sees it",
      "The description is the important part",
      "Few and coarse beats many and fine",
      "Tool output",
      "Five tools you should not build",
      "Call it yourself before handing it over",
    ],
    [
      "The thing that runs out",
      "Context decay",
      "The four things that eat the window",
      "Compaction",
      "Files are the best memory",
      "The progress notebook",
      "Three layers of memory",
      "Retrieve, do not pile up",
      "Is your transcript healthy?",
    ],
    [
      "The four levels of building",
      "Skills: packaging a procedure",
      "Subagents: why separate",
      "How a subagent is written",
      "A good and a bad subagent",
      "Hooks: what always runs",
      "Which one, when",
      "Five traps while building",
    ],
    [
      "An unleashed agent is debt",
      "Three lines of defence",
      "Make mistakes cheap",
      "Evaluating an agent is different",
      "Twenty cases is enough",
      "Where the cost comes from",
      "The trust checklist",
    ],
    [
      "Why one is not enough",
      "The four layers",
      "Each layer: input, output, boundary",
      "Layers 1 and 2: PM and lead",
      "Layers 3 and 4: designer and QA",
      "The files are the real pipeline",
      "One handoff, worked",
      "Where the loop closes",
      "How many layers is enough",
      "What a PRD actually is",
      "A human PRD and an agent PRD",
      "The PRD skeleton",
      "An example: the empty state",
      "Acceptance criteria, the heart of it",
      "What does not belong in a PRD",
      "How a PM reads a PRD",
      "The gaps it surfaced",
      "A PRD is a living document",
    ],
    [
      "The build plan",
      "Step 0: the folder",
      "Step 1: the shared rules",
      "Step 2: five lines before any file",
      "Step 3: the QA file",
      "Step 4: test it on its own",
      "Step 5: the extraction agent",
      "Step 6: close the loop",
      "Reviewing the run",
      "The four things that break",
    ],
  ],
};

/* ── فصل‌های ۰۵ تا ۰۷ ───────────────────────────────────────────
 *
 * پنجم و ششم هم مثلِ چهارتای اول از دکِ واقعی درآمده‌اند
 * (`deck-m5.html` و `deck-m6.html`). هفتم هنوز دک ندارد و بندهایش
 * نوشته شده، نه استخراج — ساختارش از جمع‌بندیِ ماژول‌های قبلی
 * می‌آید که صریحاً می‌گویند بعدشان چه می‌آید. اگر دکش ساخته شد،
 * این کلید باید با همان روشِ بقیه بازنویسی شود.
 */

/** ۰۵ · AI Native UI Design — deck-m5 */
TOPICS["05"] = [
  [
    "What we bring into this chapter",
    "The thesis of this chapter",
    "Three things it cannot know about your interface",
    "Dividing the work, this time on the interface",
    "The real danger here",
    "Deliverable: the interface folder",
  ],
  [
    "A wireframe is not a low-detail drawing",
    "The three questions a skeleton answers",
    "Write it in text, not in boxes",
    "The skeleton prompt",
    "Hamghadam: the skeleton that came out",
    "Three interactions, and what that number cost",
    "Count the states here, not later",
  ],
  [
    "Why copy comes before layout",
    "Ninety characters, and why a number",
    "The glossary as machine input",
    "The microcopy prompt",
    "Hamghadam: the strings that survived",
    "Copy that diagnoses without permission",
    "The empty state, three things in this order",
    "Three strings left deliberately blank",
  ],
  [
    "An adjective versus a value",
    "Six things that must have values",
    "Three colour decisions that came from the folder",
    "Type and spacing: why a closed list",
    "Hamghadam: the block handed to the prompt",
    "Three tokens that were rejected",
    "The style guide test: one prompt, twice",
    "The components we deliberately do not have",
  ],
  [
    "Three files to feed it, and one we withhold",
    "The interface prompt",
    "Hamghadam: one state, from three files",
    "Four things it always adds uninvited",
    "Build the states one at a time",
    "The result card, where most of the work landed",
    "What this output still is not",
  ],
  [
    "General critique versus critique with a rubric",
    "Six rows that only mean something on an interface",
    "The interface QA prompt",
    "Hamghadam: the report that came back",
    "Three accessibility lines you can actually fail",
    "What cannot be seen from an image",
  ],
  [
    "Four files, and who each one is for",
    "The reproduction test",
    "Hamghadam: the folder that was handed over",
    "Three things that do not travel with the folder",
    "The ship test",
    "Where not to run this method",
  ],
];

/** ۰۶ · Agentic UI Design — deck-m6 */
TOPICS["06"] = [
  [
    "What we bring into this chapter",
    "What this chapter does not repeat",
    "The thesis of this chapter",
    "The real danger here",
    "Deliverable: two agents and a living scale",
    "Judging versus measuring",
    "Every row is one of three kinds",
    "Hamghadam: thirteen rows, three columns",
    "An executable row has three parts",
    "Hamghadam: the trap we fell into on row 1",
    "The one row no eye gets right",
    "There are three verdicts, not two",
  ],
  [
    "Three consumers, not one",
    "Three sections, and the third is the one everyone drops",
    "Read the scale from the file, not the prompt",
    "Hamghadam: the scale the agent reads from",
    "A value off the scale is not rounded",
    "Hamghadam: eight things that look like defects and are not",
    "A state the style guide never defined",
    "The test: second run, zero changes",
    "Count before you delete",
  ],
  [
    "What the builder can no longer see",
    "The dividing rule, in one line",
    "The builder's report is not evidence",
    "Hamghadam: the contract between layers, ten keys",
    "Hamghadam: ten findings, eight rejected",
    "Eight rejections, only three reasons",
    "The loop that closes is not the fixing loop",
    "Three that were neither rejected nor accepted",
  ],
  [
    "Screenshot versus file",
    "A finding with no address is not a finding",
    "The agent file, in full",
    "Count it, do not eyeball it",
    "The most valuable output is the absence list",
    "Hamghadam: three conflicts that were not resolved",
    "A value on screen with no source",
    "Four things this one still cannot see",
  ],
  [
    "Handoff is not a moment",
    "Three things that make a folder runnable",
    "Hamghadam: five lines that say everything",
    "A presentation is not a new document",
    "Hamghadam: the shape of the report that was built",
    "Hamghadam: the five things written as lessons",
    "The demo trap: AI built this in ten minutes",
    "Four things to say, not to be found",
  ],
];

/** ۰۷ · Vibe Coding For Product Designers — deck-m7 */
TOPICS["07"] = [
  [
    "What we bring into this chapter",
    "The thesis of this chapter",
    "The real danger here",
    "Deliverable: a URL that opens",
    "The definition, in three moves",
    "Three things it gets confused with",
    "What you can vibe code, and what you cannot",
    "One test, instead of memorising the table",
    "What you have that a programmer does not",
    "Reading versus writing",
    "Hamghadam: what ships and what does not",
  ],
  [
    "Why you need it at all",
    "Five words, and that is it",
    "The first fifteen minutes, step by step",
    "The sentence beside each commit",
    "‎.gitignore‎, the file with no undo",
    "A real example from this school",
    "Four things that are never committed",
  ],
  [
    "Deployment, in one sentence",
    "A server versus a platform",
    "Vercel, and why it is the one",
    "Your first ten minutes on Vercel",
    "Hamghadam and this site: what runs on what",
    "Three cases that genuinely need a server",
    "If you genuinely need one: where to buy",
    "Why a local build lies",
    "A domain, the last step",
  ],
  [
    "What to build with",
    "What to feed the model",
    "One change, run, look, commit",
    "Hamghadam: one state, from three files",
    "When it breaks",
    "Six questions before you send the link",
  ],
];

/** شمارِ زیرسرفصل‌های یک فصل — برای نوارِ مشخصاتِ کارتِ فصل */
export const topicCount = (no: string) =>
  (TOPICS[no] ?? []).reduce((n, t) => n + t.length, 0);

/**
 * ابزارها.
 *
 * در بنتو فقط نامشان چیپ‌وار هست و آن یک تیزر است. اینجا باز می‌شود،
 * چون سؤالِ واقعیِ خواننده «چه ابزارهایی؟» نیست، «داخلِ هرکدام چه
 * چیزی هست که من نمی‌دانم؟» است — و همان است که فصل دوم را می‌فروشد.
 */
export const TOOLS = {
  fa: {
    title: "ابزارهایی که واقعاً باهاشون کار می‌کنیم",
    lede:
      "یک فصل کامل را گذاشته‌ایم برای همین ابزارها؛ نه اینکه فقط اسمشان را معرفی کنیم، بلکه ببینیم هرکدام برای چه کاری خوب‌اند و کجا بهتره سراغشان برویم. ابزارها عوض می‌شوند، ولی این مدل دسته‌بندی و نگاه کردن به آن‌ها قرار نیست هر چند ماه از نو عوض شود.",
    items: [
      {
        name: "Claude",
        role: "سه لایه، از چت تا ترمینال",
        parts: [
          "چت و آرتیفکت",
          "پروژه و دانش پروژه",
          "اسکیل و SKILL.md",
          "کانکتور و MCP",
          "Claude Code و حالت نقشه",
          "CLAUDE.md",
        ],
        note: "بیشتر ما با لایهٔ اول شروع کرده‌ایم؛ ولی بخش جذاب ماجرا معمولاً وقتی شروع می‌شود که وارد دو لایهٔ بعدی می‌شویم.",
      },
      {
        name: "ChatGPT و Codex",
        role: "ابزارهایی که بیشتر از یک چت ساده‌اند",
        parts: [
          "Canvas",
          "GPT سفارشی",
          "Codex، محلی و ابری",
          "AGENTS.md",
          "بازبینی، نه فقط ساختن",
          "سطح دسترسی",
        ],
        note: "Codex فقط مخصوص برنامه‌نویس‌ها نیست. وقتی قرار است روی تعداد زیادی فایل کار کنی، تغییر بدهی یا یک پروژه را جلو ببری، اینجا خیلی بیشتر خودش را نشان می‌دهد.",
      },
      {
        name: "Figma AI",
        role: "درست جایی که فایل‌هایت هستند",
        parts: [
          "First Draft",
          "Figma Make",
          "Figma MCP و Dev Mode",
          "ایجنت فیگما",
          "FigJam و Slides",
          "ریزمتن، دقیقاً سر جای خودش",
        ],
        note: "کاربرد واقعی این ابزارها همیشه ساختن یک صفحه از صفر نیست. یکی از جاهایی که خیلی به درد می‌خورند، همان کارهای تکراری و خسته‌کنندهٔ لایه‌ها و فایل‌هاست.",
      },
    ],
    more: "و هر ابزار جدیدی که از راه برسه",
    moreNote:
      "ابزارهای AI خیلی سریع عوض می‌شوند. قرار نیست با هر تغییر، دوباره از صفر یاد بگیریم. چیزی که اینجا می‌سازیم یک روش کار است که با ابزارهای جدید هم قابل استفاده باشد.",
  },
  en: {
    title: "The tools, opened up",
    lede:
      "A whole chapter is about exactly these — not a tour, but which one was built for which job. When the tools move, this split stays put.",
    items: [
      {
        name: "Claude",
        role: "Three layers, chat to terminal",
        parts: [
          "Chat and artifacts",
          "Projects and project knowledge",
          "Skills and SKILL.md",
          "Connectors and MCP",
          "Claude Code and plan mode",
          "CLAUDE.md",
        ],
        note: "Most of us know only the first layer, and it is the other two that change the work.",
      },
      {
        name: "ChatGPT and Codex",
        role: "Same shape, different names",
        parts: [
          "Canvas",
          "Custom GPTs",
          "Codex, local and cloud",
          "AGENTS.md",
          "Review, not just generation",
          "How much rope to give it",
        ],
        note: "Codex is not only for engineers; bulk work on files happens there too.",
      },
      {
        name: "Figma AI",
        role: "Right where your file already is",
        parts: [
          "First Draft",
          "Figma Make",
          "Figma MCP and Dev Mode",
          "The Figma agent",
          "FigJam and Slides",
          "Copy, in place",
        ],
        note: "The real win is the boring place: repetitive layer chores, not generating screens from nothing.",
      },
    ],
    more: "and whatever lands next month",
    moreNote: "The tools move every few months. The split above does not.",
  },
} as const;

/**
 * شکلِ هر فصل.
 *
 * «ویدیوی ضبط‌شده» یک خانهٔ بنتو بود و چیزی نمی‌گفت. آنچه واقعاً
 * تحویل داده می‌شود چهار چیز است، و یکی‌شان — جزوه — همان چیزی است
 * که به کسی که هنوز حساب نخریده اجازه می‌دهد دنبال کند.
 */
export const FORMAT = {
  fa: {
    title: "هر فصل چه شکلیه؟",
    lede:
      "هر فصل فقط یک‌سری ویدیوی آموزشی نیست. یک بستهٔ کامل داریم: آموزش، کار روی پروژه، جزوه و تمرین. همه‌شان به هم وصل‌اند و قرار است آخرش یک خروجی واقعی داشته باشی.",
    items: [
      {
        t: "دک آموزش",
        d:
          "درس‌ها را اسلایدبه‌اسلاید جلو می‌بریم. هر اسلاید قرار است یک موضوع مشخص را بگوید و تمامش کند؛ نه اینکه وسط یک درس ده موضوع مختلف باز شود.",
      },
      {
        t: "دک پروژه",
        d:
          "همان چیزی که یاد گرفته‌ایم را روی پروژهٔ واقعی اجرا می‌کنیم. پرامپت واقعی، خروجی واقعی و مهم‌تر از همه تصمیمی که گرفتیم و دلیلش.",
      },
      {
        t: "جزوه",
        d:
          "پرامپت‌ها و خروجی‌های هر فصل را یک‌جا داری. اگر بخواهی بعداً برگردی و چیزی را دوباره انجام بدهی، لازم نیست ویدیو را از اول بگردی.",
      },
      {
        t: "تمرین",
        d:
          "آخر هر درس یک تمرین داریم و خروجی‌اش مستقیم به پروژه اضافه می‌شود. یعنی تمرین قرار نیست بعداً برود توی یک پوشه و برای همیشه فراموش شود.",
      },
    ],
    note:
      "و یک قانون مهم در کل دوره داریم: یک پروژه را با هم جلو می‌بریم. قرار نیست هرکس چند تمرین جدا بسازد و آخر دوره ده تا فایل نصفه‌نیمه داشته باشد.",
    group:
      "یک گروه هم برای رفع اشکال و اطلاع‌رسانی داریم. سؤالی که وسط کار برایت پیش می‌آید همان‌جا جواب می‌گیرد، و خبرِ فصل‌های تازه هم اول همان‌جا می‌آید.",
  },
  en: {
    title: "What a chapter actually is",
    lede:
      "Each chapter is a package, not a video. Three files that arrive together, and one exercise whose output goes somewhere.",
    items: [
      {
        t: "The teaching deck",
        d: "The lessons, slide by slide. Each slide says one thing and stops — no lesson carries two subjects.",
      },
      {
        t: "The project deck",
        d: "The same lesson, on the real product. The full prompt, the real output, and the decision that was made, with its reason.",
      },
      {
        t: "The handout",
        d: "Every prompt and output of that chapter in one file. If you have no account yet, this is how you follow along.",
      },
      {
        t: "The exercise",
        d: "One at the end of each lesson, and its output goes straight into the project folder — not into a folder you forget.",
      },
    ],
    note:
      "And one rule the whole course rests on: we carry one project together. Nobody builds a private thing on the side and finishes none of it.",
    group:
      "There is a group too, for questions and for news. Whatever stops you mid-task gets answered there, and new chapters are announced there first.",
  },
} as const;

/**
 * چند اسلاید از خودِ دک.
 *
 * ادعای «اسلایدهای دقیق» را هر صفحه‌ای می‌تواند بکند؛ نشان دادنشان
 * را نه. این چهارتا از همان فایل‌هایی گرفته شده‌اند که در دوره پخش
 * می‌شوند — بدونِ بازسازی، بدونِ تمیزکاری.
 *
 * چهارتا هم دلیل دارد: یکی از هر ماژولِ ضبط‌شده، و هرکدام یک *نوعِ*
 * متفاوت — تشریح، فهرستِ فیلد، نمودار، جدولِ مقدار. اگر هر چهار
 * یک‌شکل بودند، به‌جای «تنوعِ کار»، «یک قالبِ تکراری» دیده می‌شد.
 */
export const SLIDES = {
  fa: {
    title: "چند اسلاید از خودِ دوره",
    lede:
      "این‌ها اسلایدهای بازسازی‌شده برای نمایش نیستند؛ چند نمونه از همان فایل‌هایی‌اند که موقع آموزش واقعاً با آن‌ها کار می‌کنیم.",
    items: [
      { src: "/images/slides/m1-five-parts.png", cap: "فصل ۱ · پنج تکهٔ یک دستور" },
      { src: "/images/slides/m3-nine-fields.png", cap: "فصل ۳ · نُه فیلدِ یک یوزکیس" },
      { src: "/images/slides/m4-four-layers.png", cap: "فصل ۴ · چهار لایهٔ ایجنت" },
      { src: "/images/slides/m5-six-categories.png", cap: "فصل ۵ · شش چیزی که باید مقدار داشته باشند" },
    ],
  },
  en: {
    title: "A few slides, from the deck itself",
    lede: "Not mock-ups — screenshots of the same files that open in class.",
    items: [
      { src: "/images/slides/m1-five-parts.png", cap: "Ch 1 · The five parts of a prompt" },
      { src: "/images/slides/m3-nine-fields.png", cap: "Ch 3 · The nine fields of a use case" },
      { src: "/images/slides/m4-four-layers.png", cap: "Ch 4 · The four agent layers" },
      { src: "/images/slides/m5-six-categories.png", cap: "Ch 5 · Six things that need values" },
    ],
  },
} as const;

/** برای چه کسی — با دلیل، نه فقط یک خط */
export const FIT = {
  fa: {
    yes: [
      {
        t: "طراح محصولی که از تحویل فایل و منتظر ماندن برای توسعه خسته شده",
        d:
          "چیزی که طراحی می‌کنی لازم نیست همیشه منتظر بماند تا یک نفر دیگر آن را بسازد. توی این دوره دقیقاً می‌ریم سراغ همین فاصله بین «طراحی کردم» و «واقعاً ساخته شد».",
      },
      {
        t: "با AI کار کردی ولی نتیجه‌ها یه روز خوبن، یه روز افتضاح",
        d:
          "یک روز خروجی عالی می‌گیری و روز بعد نمی‌فهمی چرا همان کار جواب نمی‌دهد. مشکل همیشه پرامپت نیست؛ خیلی وقت‌ها اصلاً نمی‌دانیم چه معیاری برای خوب و بد بودن خروجی داریم.",
      },
      {
        t: "یک ایدهٔ نیمه‌کاره داری و دوست داری بالاخره تمومش کنی",
        d:
          "فصل آخر دقیقاً برای همین است. از یک فایل و ایده شروع می‌کنیم و می‌رسیم به محصولی که یک آدرس دارد، باز می‌شود و می‌توانی لینکش را برای بقیه بفرستی.",
      },
      {
        t: "می‌خوای سریع‌تر کار کنی، ولی نمی‌خوای تصمیم‌گیری رو بسپری دست AI",
        d:
          "این دقیقاً یکی از موضوعات اصلی دوره است. قرار نیست AI جای قضاوت طراحی تو را بگیرد؛ قرار است کمک کند سریع‌تر و بهتر تصمیم بگیری.",
      },
    ],
    no: [
      {
        t: "دنبال یک لیست بلندبالا از پرامپت‌های آماده‌ای",
        d:
          "این دوره قرار نیست یک فایل پر از پرامپت تحویلت بده. پرامپت آماده شاید برای یک کار مشخص جواب بدهد، ولی وقتی مسئله عوض شود دوباره می‌مانی و یک پرامپت جدید. اینجا قرار است یاد بگیری چطور خودت روش درست کار کردن را پیدا کنی.",
      },
      {
        t: "می‌خوای کل طراحی رو بسپری به AI",
        d:
          "پس احتمالاً این دوره مناسب تو نیست. یکی از اولین چیزهایی که یاد می‌گیریم اینه که چه کارهایی را بهتره بسپری به AI و کجاها هنوز خودت باید پشت فرمان باشی.",
      },
      {
        t: "فقط دنبال معرفی ابزارهای جدیدی",
        d:
          "ابزارها خیلی سریع عوض می‌شوند. اگر فقط اسم و دکمه‌های ابزارها را یاد بگیری، چند ماه دیگر دوباره باید از اول شروع کنی. اینجا بیشتر روی روش کار تمرکز داریم.",
      },
      {
        t: "وقت تمرین کردن نداری",
        d:
          "هر درس تمرین دارد و قرار است خروجی تمرین وارد پروژه شود. بدون تمرین هم می‌شود ویدیوها را دید، ولی آن موقع بخش مهم دوره را از دست می‌دهی.",
      },
    ],
  },
  en: {
    yes: [
      {
        t: "A product designer tired of shipping files and waiting",
        d: "What you designed no longer has to sit in a queue for someone else to build. The whole course is about that gap.",
      },
      {
        t: "Someone who has used AI but gets results like coin flips",
        d: "Brilliant one day, useless the next. The difference is not the prompt — it is the missing criteria and boundaries.",
      },
      {
        t: "Someone sitting on a half-finished idea who wants to land it",
        d: "That is exactly the last chapter: from a file to a URL that opens and can be sent to someone.",
      },
      {
        t: "Someone who wants speed without handing over judgement",
        d: "That line is the subject of chapter one, and it is never dropped afterwards.",
      },
    ],
    no: [
      {
        t: "Looking for a ready-made list of prompts",
        d: "A prompt list is like a list of Photoshop shortcuts: useless without understanding layers. This builds a method, not a list.",
      },
      {
        t: "Hoping to hand the design work over entirely",
        d: "Chapter one is about where not to hand it over. If the answer you want is “everywhere”, this is not that course.",
      },
      {
        t: "Here for a tour of the tools",
        d: "Tools move every few months. What you learn here still works after they have moved.",
      },
      {
        t: "Unable to make time to practise",
        d: "Every lesson has an exercise whose output feeds the project. Without it, this is only watching.",
      },
    ],
  },
} as const;

/** پیش از شروع — پنج چیزی که باید *بیاوری* */
export const NEED = {
  fa: [
    {
      t: "یک مدلِ متنی",
      d:
        "هر مدلی که بهش دسترسی داری. حتی نسخهٔ رایگان برای شروع و فصل اول کافی است. هرجا نسخهٔ پولی واقعاً ارزش داشته باشد، همان‌جا توضیح می‌دهیم چرا.",
    },
    {
      t: "یک ویرایشگرِ متنِ ساده",
      d:
        "کیت پرامپت چهار فایل متنی است. Notion، Word یا حتی Notepad کاملاً کافی است. چیز عجیب و غریبی لازم نداری.",
    },
    {
      t: "Figma",
      d: "از فصل دوم به بعد لازم می‌شود. تا قبل از آن اصلاً لازم نیست بازش کنی.",
    },
    {
      t: "هیچ دانش کدی",
      d:
        "لازم نیست برنامه‌نویس باشی. یک اسکریپت کوتاه در فصل اول می‌بینیم، ولی قرار نیست بنویسی‌اش. در عوض یاد می‌گیری کد را بخوانی و در صورت نیاز تغییرش بدهی.",
    },
    {
      t: "یک دفتر",
      d:
        "شاید به نظر بی‌ربط بیاد، ولی از همهٔ ابزارها مهم‌تره. بعضی چیزها را قبل از اینکه به سراغ AI برویم، روی کاغذ درمی‌آوریم. درس چهارم فصل اول هم دقیقاً از همین‌جا شروع می‌شود.",
    },
    {
      t: "اشتراکِ AI — برای پروژه، نه برای تماشا",
      d:
        "برای دیدن درس‌ها لازم نیست هیچ اشتراکی بخری. هر راهِ رایگانی هم که برای گرفتن توکن باشد، تا وقتی که هست همین‌جا معرفی می‌کنیم. ولی برای اینکه یک پروژه را واقعاً از صفر تا صد جلو ببری، دست‌کم یکی از اشتراک‌ها را لازم داری.",
    },
  ],
  en: [
    {
      t: "One text model",
      d: "Whichever you can reach. Its free tier is enough for chapter one; where upgrading actually pays is covered in the course.",
    },
    {
      t: "A plain text editor",
      d: "The prompt kit is four text files. Notion, Word, even Notepad. That is the whole requirement.",
    },
    {
      t: "Figma",
      d: "Needed from chapter two onward. Before that we do not open it at all.",
    },
    {
      t: "No coding knowledge",
      d: "We look at one short script in chapter one, but you are not expected to write it. We do not run from code either: you will read it and change it.",
    },
    {
      t: "A notebook",
      d: "Not a tool, and more important than any of them. The fourth lesson of chapter one starts on paper, not at a keyboard.",
    },
    {
      t: "A subscription — for the project, not the lessons",
      d: "Watching the course costs nothing beyond the course. Any free route to tokens gets shared here for as long as it lasts. Carrying one project the whole way, though, takes at least one paid plan.",
    },
  ],
} as const;

/**
 * پروژه‌های دوره.
 *
 * دو محصول، نه یک تمرینِ ساختگی. عددهای پایین از خودِ پروندهٔ پژوهش
 * می‌آیند (`research/datas/`)، نه از این فایل.
 */
/**
 * پروژهٔ دوره — **یکی**، نه دوتا.
 *
 * نسخهٔ قبل نَفَس و هم‌قدم را کنارِ هم می‌گذاشت، با عددهای پژوهش و
 * پروندهٔ تحویلی و فهرستِ چیزهایی که خراب شد. همه‌اش درست بود و
 * همه‌اش زیادی: خواننده در این نقطه هنوز نمی‌داند دوره چیست و
 * هشت عددِ پژوهش برایش معنا ندارد.
 *
 * حالا فقط یک محصول، و فقط آن چیزی که بدونش نمی‌شود فهمید چرا این
 * پروژه انتخاب شده: تناقضِ مرکزی‌اش. جزئیاتِ پژوهش سرِ جای خودش،
 * در فصل‌های سوم و چهارم می‌آید.
 */
export const PROJECTS = {
  fa: {
    title: "یک پروژه که از اول تا آخر با هم جلو می‌بریم",
    lede:
      "قرار نیست هر فصل یک تمرین جدا بسازی و آخرش چندتا فایل نصفه‌نیمه داشته باشی. یک محصول واقعی داریم و در هر فصل یک قسمت از آن را جلو می‌بریم.",
    name: "هم‌قدم",
    what: "پیدا کردن و رزرو جلسهٔ روان‌درمانی",
    body:
      "مسئلهٔ اصلی محصول اینه که هرچه سؤال‌های بیشتری از کاربر می‌پرسیم، از یک طرف تطبیق بهتر می‌شود و از طرف دیگر احتمال ریزش کاربر بالا می‌رود. پروژه از یک بریف چهارخطی شروع می‌شود و قدم‌به‌قدم می‌رسد به پژوهش، یوزکیس‌های معیاردار، ایجنت و PRD؛ بعد هم وارد وایرفریم، دیزاین‌سیستم، صفحه‌های رابط و پروتوتایپ می‌شویم.",
    why:
      "وقتی روی یک محصول ساده با AI کار می‌کنی، خیلی از جواب‌های AI در نگاه اول درست به نظر می‌رسند. اینجا هر تصمیم اشتباه یک اثر واقعی روی محصول دارد و دقیقاً به همین دلیل فرصت خوبی داریم که یاد بگیریم کجا باید به AI اعتماد کنیم و کجا نه.",
    /**
     * خروجی‌ها هم UX و هم UI.
     *
     * تا اینجا فقط تا PRD می‌آمد و همان‌جا تمام می‌شد — که یعنی
     * خواننده فکر می‌کرد این دوره به رابط نمی‌رسد. فهرست حالا تا
     * پروتوتایپ و کیس‌استادی ادامه دارد، چون فصل‌های پنجم و ششم
     * دقیقاً همان‌ها را می‌سازند.
     */
    out: [
      "جدول شواهد",
      "دو پرسونا",
      "هشت یوزکیس",
      "PRD",
      "ایجنت QA",
      "وایرفریم",
      "دیزاین‌سیستم کوچک",
      "کتابخانه کامپوننت",
      "صفحه‌های رابط",
      "پروتوتایپ",
      "کیس‌استادی",
    ],
  },
  en: {
    title: "The product we carry together",
    lede:
      "Nobody builds a private exercise on the side. One real product sits on the table and each chapter moves a piece of it forward.",
    name: "Hamghadam",
    what: "Finding and booking a therapy session",
    body:
      "Its central tension: every question you ask improves the match and increases the drop-off. It starts from a four-sentence brief and runs to research, use cases with acceptance criteria, agents and a PRD — and from there to wireframes, a design system, the screens and a prototype.",
    why: "On an easy product the model always looks right. Here a wrong decision costs something real — which is the only condition under which you learn.",
    out: [
      "The evidence table",
      "Two personas",
      "Eight use cases",
      "A PRD",
      "A QA agent",
      "Wireframes",
      "A small design system",
      "A component library",
      "The interface screens",
      "A prototype",
      "A case study",
    ],
  },
} as const;

/**
 * ظرفیتِ پلهٔ *فعلی* و اینکه چندتایش پر شده.
 *
 * نوارِ ظرفیتِ صفحه از همین می‌خواند. با هر ثبت‌نام `taken` یکی بالا
 * می‌رود؛ وقتی به `cap` رسید، در `PRICING.tiers` آن پله `done` و
 * پلهٔ بعدی `now` می‌شود و `taken` از صفر شروع می‌کند.
 */
export const LAUNCH_SEATS = { cap: 30, taken: 21 } as const;

/**
 * قیمت.
 *
 * پیش‌تر عمداً روی صفحه نبود چون عددِ کپی‌شده کهنه می‌شود. حالا که
 * تخفیفِ رونمایی پلکانی است، خودِ پله بخشی از پیام است و نبودنش
 * بی‌معنا می‌کند. هر عدد فقط یک بار اینجا نوشته شده تا وقتِ عوض شدن،
 * یک جا عوض شود.
 */
export const PRICING = {
  fa: {
    title: "قیمت",
    head: "تخفیف رونمایی، پلکانی",
    lede:
      "دوره تازه رونمایی شده و قیمتش پلکانی بالا می‌رود. پلهٔ اول تکمیل شد؛ الان پلهٔ دوم باز است و بعد از آن قیمت به عدد اصلی می‌رسد.",
    unit: "تومان",
    fullLabel: "قیمت اصلی دوره",
    full: "۱۲٬۰۰۰٬۰۰۰",
    tiers: [
      { seat: "۳۰ نفر اول", price: "۶٬۰۰۰٬۰۰۰", off: "۵۰٪ تخفیف", now: false, done: true },
      { seat: "۳۰ نفر دوم", price: "۷٬۰۰۰٬۰۰۰", off: "۴۲٪ تخفیف", now: true, done: false },
      { seat: "بعد از آن", price: "۱۲٬۰۰۰٬۰۰۰", off: "قیمت اصلی", now: false, done: false },
    ],
    note:
      "هزینه را فقط یک‌بار پرداخت می‌کنی و دسترسی همیشگی است. فصل‌هایی هم که بعداً به دوره اضافه شوند، بدون پرداخت اضافه برایت باز می‌شوند.",
  },
  en: {
    title: "Price",
    head: "A launch price, in steps",
    lede: "The course has just launched and the price climbs in steps. The first thirty seats are gone; the second step is open now, and after that it is the full price.",
    unit: "toman",
    fullLabel: "Full price",
    full: "12,000,000",
    tiers: [
      { seat: "First 30 seats", price: "6,000,000", off: "50% off", now: false, done: true },
      { seat: "Next 30 seats", price: "7,000,000", off: "42% off", now: true, done: false },
      { seat: "After that", price: "12,000,000", off: "full price", now: false, done: false },
    ],
    note: "One payment, permanent access. Chapters added later open up without a new charge.",
  },
} as const;

/**
 * پلهٔ فعلی — تنها منبعِ «الان قیمت چند است».
 *
 * پیش‌تر هم لندینگ و هم `RobotypePromo` مستقیم `tiers[0]` را
 * می‌خواندند، یعنی «پلهٔ اول» و «پلهٔ فعلی» یک چیز فرض شده بودند.
 * تا وقتی پلهٔ اول باز بود این درست کار می‌کرد و لحظه‌ای که بسته شد،
 * هر دو صفحه قیمتِ تمام‌شده را نشان می‌دادند. حالا پرچمِ `now`
 * تصمیم می‌گیرد و جابه‌جایی پله یک خط است.
 */
export const currentTier = (lang: keyof typeof PRICING) =>
  PRICING[lang].tiers.find((t) => t.now) ?? PRICING[lang].tiers[0];
