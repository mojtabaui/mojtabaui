# Figma agent prompt — Melina Design School brand book

پرامپت زیر کاملاً خودکفاست. هیچ لینکی رو باز نمی‌کنه و به هیچ سایتی وصل نمی‌شه —
همه‌ی رنگ‌ها، اندازه‌ها، مختصات و متن‌ها داخل خودش تایپ شدن.

**قبل از فرستادن، سه تا تصویر رو به agent پیوست کن:**
`public/images/instructor-portrait.jpg` · `public/images/sig.png` · `public/icon.svg`

انگلیسیه چون دستورِ ابزاره، ولی متن‌های فارسی عیناً داخلش نگه داشته شدن و باید بدون
ترجمه و بدون بازنویسی توی فایل بشینن.

---

## PROMPT — copy everything below this line

You are building a **brand book in Figma** for a Persian (RTL) design school called
**مدرسه دیزاین ملینا** — Melina Design School.

**You have no network access and you do not need any.** Every color, dimension,
coordinate and string you need is written out below. Do not try to open a URL, do not
look anything up, and do not invent content that is not specified here. If something is
genuinely missing, leave the slot empty and list it in the gaps frame described at the end.

### 0. Attached assets

Three images are attached to this message:

| File | Where it goes |
|---|---|
| `instructor-portrait.jpg` | Spread 04, full-bleed left half, grayscale, 45% opacity |
| `sig.png` | Spread 04, inverted to white, 56 px tall, width auto |
| `icon.svg` | Not placed on a spread. Keep it on the components page for reference. |

If an image did not arrive, create a frame of the right size named
`MISSING — instructor-portrait` (or the matching name), fill it 20% gray, and list it in
the gaps frame. Never substitute a stock photo.

### 1. The logo

Do not draw the logo by eye. It is a **solid, symmetric moustache**, built as one closed
path on a 120 × 120 box. Create it as a vector from this exact path data:

```
viewBox: 0 4 120 108
d: M60 54 C74 38 104 36 114 58 C104 48 80 54 68 70 C65 74 55 74 52 70
   C40 54 16 48 6 58 C16 36 46 38 60 54 Z
```

Single fill, no stroke, no effects. It must stay solid and readable down to 24 px. Its
outer tips read as canary wings — that reading is deliberate, do not round or soften them.

The **square lockup** is that path centered inside a rounded square: square 120 × 120,
corner radius 28, the mark scaled to 76% of the square's width and vertically centered.

### 2. Document setup

- Spreads are frames of **1600 × 1000 px**, in one horizontal row, 200 px apart.
- Layout grid on every spread: **12 columns, 80 px left and right margin, 40 px gutter**
  (so the content column is 1440 px wide, each column 83.33 px).
- Vertical rhythm is an **8 px** base. Chapter head → first content block = 80.
  Block → block = 120. Frame top padding = 100, bottom padding = 100.
- Persian text is **RTL and right-aligned**. Latin strings (`Chapter 01`, `mojtabaui.ir`,
  hex values, `Version 1 · 1405`) are **LTR and left-aligned**, set in Space Grotesk.
- Two Figma pages: `Brand Book` (the spreads) and `Components & Styles`.
- Frames named exactly: `01 Cover`, `02 Contents`, `03 اسم`, `04 چرایی`, `05 نشان`,
  `06 فضای امن`, `07 رنگ`, `08 تایپوگرافی`, `09 لحن`, `10 حرکت`, `11 Closing`.
- Auto Layout for all stacks. The only absolutely positioned items are the oversized
  decorative glyphs, which are called out per spread with coordinates.

### 3. Color — Figma variables, collection `Brand`

Four colors carry the whole system. The restraint is the brand; do not add a fifth.

| Variable | Hex | Use |
|---|---|---|
| `ink` | `#1a1714` | Body text, dark surfaces, primary button |
| `cream` | `#FAF6F1` | Default page background |
| `violet` | `#7c5cfc` | **Accent only** — links, tags, emphasis, rules. Never a large surface. |
| `line` | `#e8e2d9` | Dividers, card borders |

Group `support` in the same collection:

| Variable | Hex | Use |
|---|---|---|
| `neutral` | `#E4DAD5` | Warm neutral surface, used only on spread 09 |
| `text-muted` | `#6b6560` | Secondary body text on light |
| `text-faint` | `#a09990` | Captions and Latin eyebrows on light |
| `violet-light` | `#a78bfa` | Accent on dark surfaces only |
| `danger` | `#f43f5e` | The ✕ badge on the misuse cards, nowhere else |

Opacity conventions used repeatedly, apply as fill opacity not as a new color:
white at 50% for body on dark, white at 45% / 35% / 25% for descending emphasis on dark,
ink at 35% for struck-through text.

### 4. Textures — build these, do not import them

**Dot grid, light surfaces.** A 1 px radius circle, fill `#a09990` at 22% opacity, tiled on
a 22 × 22 px grid. Build one 22 × 22 component and tile it, or draw a single vector grid
covering the frame. Applies to spreads 03 and to the misuse card marked "busy".

**Dot grid, dark surfaces.** Same geometry, fill white at 7% opacity. Applies to spread 01.

**Grain.** A fractal noise texture at 190 × 190 px tile, blend mode Overlay. Opacity 14% on
spread 01, 16% on the panel in spread 03, 12% on spread 11. If you cannot generate noise,
use a fine 1 px random dot scatter at the same opacity and note it in the gaps frame.

### 5. Typography — create real text styles

One typeface carries the brand: **Meem** (Persian), weights **300 Light** and **700 Bold**
only. Hierarchy comes from weight, size and spacing — never from a second family.
**Space Grotesk Bold** appears only for Latin eyebrows, labels and hex values.

> If Meem is not installed, do not silently substitute. Use the closest available Persian
> sans, and list every affected style in the gaps frame so it can be corrected once the
> font is installed.

| Style name | Family | Weight | Size | Line height | Tracking | Case |
|---|---|---|---|---|---|---|
| `Cover / Title` | Meem | 700 | 180 | 1.15 | 0 | — |
| `Display / Black` | Meem | 700 | 88 | 1.15 | 0 | — |
| `Chapter / Title` | Meem | 700 | 76 | 1.25 | 0 | — |
| `Quote / Large` | Meem | 700 | 44 | 1.5 | 0 | — |
| `Heading / L` | Meem | 700 | 32 | 1.5 | 0 | — |
| `Heading / M` | Meem | 700 | 24 | 1.5 | 0 | — |
| `Body / L` | Meem | 300 | 20 | 2.0 | 0 | — |
| `Body / M` | Meem | 300 | 18 | 2.0 | 0 | — |
| `Caption` | Meem | 300 | 14 | 1.7 | 0 | — |
| `Eyebrow / Latin` | Space Grotesk | 700 | 11 | 1.2 | 0.30em | UPPER |
| `Label / Latin` | Space Grotesk | 700 | 11 | 1.2 | 0.24em | UPPER |
| `Mono / Hex` | Space Grotesk | 700 | 24 | 1.2 | 0.10em | — |
| `Stat / Number` | Space Grotesk | 700 | 40 | 1.1 | 0 | — |

**Never apply negative letter spacing to Persian.** Persian glyphs join; negative tracking
collapses them into each other. Open tracking belongs only to Latin uppercase eyebrows.

### 6. Components — page `Components & Styles`

1. **`Logo / Mark`** — the moustache vector inside a transparent 120 × 120 frame, with a
   `surface` variant property: `dark` (fill `cream`), `light` (fill `ink`),
   `accent` (fill `#ffffff`), `neutral` (fill `ink`).
2. **`Logo / Square`** — the rounded-square lockup from section 1, same four variants,
   background and mark swapping together.
3. **`Logo / Horizontal`** — `Logo / Square` at 44 px plus the wordmark `مدرسه دیزاین ملینا`
   in `Heading / M`, gap 16, vertically centered.
4. **`Swatch`** — 700 × 220 card, 24 radius, 32 padding, Auto Layout space-between vertical.
   Hex at the top in `Mono / Hex`, then name in `Heading / M` and usage in `Caption` at 60%
   opacity at the bottom. A boolean `border` property adds a 1 px white-12% stroke.
5. **`Spec Card`** — 440 × 240, fill `#ffffff`, 1 px `line` stroke, 24 radius, 32 padding.
6. **`Misuse Card`** — 320 × 320 square, 24 radius, 1 px `line` stroke, fill `#ffffff`,
   the mark centered at 48% width, plus a 28 px `danger` circle pinned 12 px from the
   **top-left** corner containing a white ✕.

Radius scale: 16 small chips · 24 cards · 28 the logo square · 32 large panels.

---

## The spreads

Persian below is final copy. Paste it exactly. Do not translate, rewrite, shorten or
"improve" it. No lorem ipsum anywhere.

### 01 Cover — background `ink`

- Dark dot grid over the whole frame.
- Grain overlay, 14%.
- The moustache mark, huge and cropped: width **1500 px**, positioned so its left edge is
  at x = **−190** and its bottom edge is at y = **1160** — it bleeds off the bottom-left
  corner. Fill white at **6%**.
- Top-left, at x 80 y 80: `Logo / Horizontal`, `dark` variant, mark at 44 px, wordmark white.
- Bottom block, left-aligned, starting x 80:
  - `برندبوک` in `Cover / Title`, white, baseline around y 760.
  - 40 px below it, `Body / L` in white 45%, max width 460:
    `این سند می‌گه ملینا چه شکلیه، چطور حرف می‌زنه و چرا اصلاً وجود داره.`
- Bottom-right, x 1520 right-aligned, y 900, LTR, `Eyebrow / Latin`, white 25%:
  `Version 1 · 1405`

### 02 Contents — background `cream`

- Top: `Eyebrow / Latin` in `text-faint`: `CONTENTS`
- Below it, 60 px gap: a **4-column grid**, 40 px gutter, 20 px row gap. Seven rows flow
  right to left then down. Each item is a horizontal Auto Layout, 16 px gap, 12 px bottom
  padding, with a 1 px `line` bottom border:
  - index number in Space Grotesk Bold 14, fill `violet`
  - title in `Heading / M`, fill `ink`

| ۰۱ | ۰۲ | ۰۳ | ۰۴ | ۰۵ | ۰۶ | ۰۷ |
|---|---|---|---|---|---|---|
| اسم | چرایی | نشان | رنگ | تایپوگرافی | لحن | حرکت |

- A 1 px `line` rule across the full content width at the bottom of the frame.

### 03 اسم — background `cream`

- Light dot grid over the whole frame.
- Decorative: `MELINA` in Space Grotesk Bold, size **380**, fill `ink` at **4%**, LTR,
  positioned so it bleeds off the **right** edge — set its right edge at x = 1700, top at
  y = 180. It sits behind everything.
- Chapter head (the standard three-part stack, see "Chapter head" below):
  - eyebrow `CHAPTER 01`
  - title `ملینا یعنی قناری زرد`
  - subtitle `پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی.`
- Two columns below, 80 px gap, top aligned. **Right column** (first in RTL), width 700,
  `Body / L` in `#4a4540`, two paragraphs with 28 px between them:

> دنبال اسمی بودم که حس امید بده. چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک چیزی رو پشت سر می‌ذارن. یکی رشته‌ای که هیچ‌وقت دوستش نداشت، یکی شغلی که خسته‌ش کرده، یکی هم چند سال این‌ور و اون‌ور رفتن بی‌نتیجه.

> آدم وقتی می‌خواد از نو شروع کنه، بیشتر از هر چیزی به امید احتیاج داره.

- **Left column**: a 480 × 480 square, radius 32, fill `ink`, grain at 16%, with the mark
  centered at 58% of the square's width, fill `violet`.

### 04 چرایی — background `ink`

- `instructor-portrait.jpg` fills the **left half** of the frame (x 0 → 800, y 0 → 1000),
  object-fit cover, aligned to the top of the image, **grayscale**, opacity **45%**.
- Over the photo, a linear gradient bottom → top:
  `#1a1714` solid at 0–20%, `rgba(26,23,20,0.55)` at 70%, `rgba(26,23,20,0.2)` at 100%.
- All content sits in the **right half**, x from 880 to 1520, right-aligned.
  - Chapter head, dark variant: eyebrow `CHAPTER 02` in `violet-light`, title `چرا وجود داره`
    in white, subtitle `این بخش، تنها جاییه که کل ماجرا خلاصه می‌شه.` in white 50%.
  - Pull quote in `Quote / Large`, white, with a **4 px `violet` bar on its right edge** and
    24 px padding between bar and text:

> چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو باشه.

  - 40 px below, `Body / L` in white 50%, max width 560:

> من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم. هر چیزی که اینجا هست، از برنامه‌ی هفتگی تا اینکه خودم جواب سوال‌ها رو می‌دم، برای همینه.

  - 56 px below, a horizontal row, 20 px gap, vertically centered:
    `sig.png` inverted to white at 80% opacity, height 56 px, width auto — then a stack:
    `مجتبا یزدانپناه` in `Heading / M` white, and under it `بنیان‌گذار` in `Caption` white 35%.

### 05 نشان — background `cream`

- Chapter head: `CHAPTER 03` · `نشان` ·
  `سیبیل. چون همه با همین می‌شناسنش، و لبه‌هاش مثل بال قناریه.`
- A row of **four 320 × 320 squares**, radius 32, 40 px gap, each containing `Logo / Mark`
  at 52% of the square's width, centered. Caption in `Caption` / `text-muted` 16 px below
  each square.

| Square fill | Mark fill | Extra | Caption |
|---|---|---|---|
| `#1a1714` | `#FAF6F1` | — | روی تیره |
| `#FAF6F1` | `#1a1714` | 1 px `line` stroke | روی روشن |
| `#7c5cfc` | `#ffffff` | — | روی لهجه |
| `#E4DAD5` | `#1a1714` | — | روی خنثی |

- Below, 120 px down, a two-column block, 80 px gap, vertically centered:
  - Right column: `فضای امن` in `Heading / L`, then `Body / L` in `text-muted`, max 560:

> دور نشان همیشه به اندازه‌ی نصف ارتفاع خودش فضای خالی بذار. هیچ متن، خط یا تصویری نباید وارد این محدوده بشه.

  - Left column: a 640 × 480 panel, radius 32, fill `#ffffff`, 1 px `line` stroke. Centered
    inside it, `Logo / Square` at 112 px, surrounded by a **dashed rectangle** offset
    outward by exactly **56 px on every side** (half the mark's height), 1 px dashed stroke
    in `violet` at 40%, radius 16.

### 06 فضای امن — background `cream`

> If spread 05 already has room for the clear-space block, keep 06 for the misuse grid
> alone and give it more air. Do not split a block across two spreads.

- Heading `این کارها رو نکن` in `Heading / L`, `ink`.
- A row of **four `Misuse Card`s**, 40 px gap, each with the mark abused as described, and a
  `Caption` in `text-muted` 16 px below the card:

| Abuse | Caption |
|---|---|
| Mark scaled horizontally to 150%, vertical unchanged | کشیده یا فشرده نکن |
| Mark rotated 18° | نچرخونش |
| Mark filled `#16a34a` | رنگ دلخواه نده |
| Card fill `#E4DAD5` + light dot grid, mark in `ink` on top | روی تصویر شلوغ نذار |

### 07 رنگ — background `ink`

- Chapter head, dark variant: `CHAPTER 04` · `رنگ` ·
  `چهار رنگ، نه بیشتر. بنفش فقط برای تاکید، نه برای سطح.`
- Four `Swatch` instances in a **2 × 2 grid**, 20 px gap, each 700 × 220.

| Hex | Name | Usage | Text color | Border |
|---|---|---|---|---|
| `#1a1714` | مشکی برند | متن اصلی، سطح تیره، دکمه‌ی اول | `#FAF6F1` | yes, white 12% |
| `#FAF6F1` | کرم | پس‌زمینه‌ی اصلی همه‌ی صفحات | `#1a1714` | no |
| `#7c5cfc` | بنفش | فقط تاکید. لینک، برچسب، لهجه | `#ffffff` | no |
| `#e8e2d9` | خط و حاشیه | جداکننده، قاب کارت | `#1a1714` | no |

- Below the grid, 48 px down, `Body / L` in white 40%, max width 720:

> قاعده‌ی ساده: هر چه رنگ کمتر، تاکید بیشتر. اگر همه‌جای صفحه رنگیه، هیچ‌جا مهم نیست.

### 08 تایپوگرافی — background `cream`

- Decorative: a single Persian letter `م` in Meem Bold, size **560**, fill `ink` at **3.5%**,
  bleeding off the **top-left** — set its left edge at x = −40 and its top at y = −140.
- Chapter head: `CHAPTER 05` · `تایپوگرافی` ·
  `یک قلم برای همه‌چیز: میم. تفاوت‌ها از وزن و فاصله میان، نه از قلم دوم.`
- A specimen table with a 1 px `line` rule above the first row and below every row.
  Each row: 40 px vertical padding, horizontal Auto Layout, 60 px gap. The Latin label sits
  in a fixed 240 px column in `Label / Latin` / `text-faint`; the sample fills the rest in
  `ink`.

| Label (LTR) | Sample size / weight | Sample |
|---|---|---|
| `DISPLAY · BLACK` | 76 / 700 | آموزش اصولی |
| `HEADING · BLACK` | 34 / 700 | چرا وجود داره |
| `BODY · LIGHT · LEADING 2` | 20 / 300, line height 2 | متن بدنه با فاصله‌ی خط باز، چون فارسی به فضا احتیاج داره. |
| `CAPTION · LIGHT` | 14 / 300 | توضیح کوتاه زیر عنصرها |

- 56 px below, two `Spec Card`s side by side, 32 px gap, each 700 wide:

**Card 1** — heading `بکن` in `Heading / M`, then a `Body / M` list in `text-muted`,
line height 2:
- ارتفاع خط بدنه را روی ۲ نگه دار
- تیتر فارسی را زیر ۱.۳ نبر
- eyebrow لاتین با tracking باز

**Card 2** — heading `نکن`, same treatment:
- فاصله‌ی حروف فارسی را منفی نکن
- قلم دوم اضافه نکن
- متن بدنه را زیر ۱۶ پیکسل نبر

### 09 لحن — background `neutral` `#E4DAD5`

- Decorative: a single `"` glyph in Space Grotesk Bold, size **480**, fill `ink` at **5%**,
  bleeding off the **top-right** — right edge at x = 1540, top at y = −120.
- Chapter head: `CHAPTER 06` · `لحن` ·
  `هر جمله‌ای که هر مدرسه‌ی دیگه‌ای هم می‌تونه بگه، حذف می‌شه.`
- Four rows, 40 px apart, max width 900. Each row is a horizontal Auto Layout, 24 px gap:
  - a ✕ in Space Grotesk Bold 18, `ink` at 20%, top aligned
  - a vertical stack: the rejected line in `Body / L`, `ink` at 35%, **strikethrough** —
    then 8 px below, the real line in Meem Bold **30 / line height 1.7**, `ink` solid.

| ✕ rejected | ✓ real |
|---|---|
| جامع‌ترین دوره‌ی UI | ۵۵ ساعت ویدیو و ۵ پروژه‌ی واقعی |
| تجربه‌ی یادگیری بی‌نظیر | هر هفته فیدبک می‌گیری |
| همه چیزی که نیاز داری | لازم نیست قبلش چیزی بلد باشی |
| بهترین انتخاب برای آینده‌ت | اگه این دوره برات مناسب نبود، خودم می‌گم |

The pattern is the lesson: every claim is replaced by something checkable.

### 10 حرکت — background `cream`

- Chapter head: `CHAPTER 07` · `حرکت` ·
  `حرکت باید معنی داشته باشه. اگر فقط قشنگه، حذفش کن.`
- Three `Spec Card`s in a row, 20 px gap. Inside each: a baseline-aligned horizontal pair —
  the number in `Stat / Number` `ink`, then the unit in `Caption` `text-faint` — then 24 px
  below, the description in `Body / M` `text-muted`.

| Number | Unit | Description |
|---|---|---|
| ۱۵۰ تا ۳۰۰ | میلی‌ثانیه | ریزتعامل‌ها: هاور، فشردن، تغییر حالت |
| ۶۰۰ | میلی‌ثانیه | ظاهر شدن بخش‌ها هنگام اسکرول |
| ۰.۷۲ / ۱.۳۵ | ثانیه | بال‌زدن نشانگر، در حرکت و در سکون |

- 40 px below, `Body / L` in `text-muted`, max width 720:

> همه‌ی حرکت‌ها به تنظیم «کاهش حرکت» سیستم احترام می‌ذارن. کسی که اون رو روشن کرده، نسخه‌ی ساکن سایت رو می‌بینه.

### 11 Closing — background `violet` `#7c5cfc`

- Grain overlay at 12%.
- The mark, width **1280**, left edge at x = −160, bottom edge at y = 1150, fill white at
  **12%** — bleeding off the bottom-left.
- Content, right-aligned, x from 80 to 1520:
  - `Logo / Mark` `accent` variant at 96 px wide, at the top.
  - 48 px below, in Meem Bold **64 / line height 1.45**, white, max width 1000:

> که هیچ‌کس وسط راه حس نکنه تنها مونده.

  - 64 px below, a horizontal row, 16 px gap, vertically centered: a 64 × 1 white-40% rule,
    then LTR `mojtabaui.ir` in `Eyebrow / Latin`, white 70%.

---

## Chapter head — the repeating pattern

Identical on every chapter spread. Vertical Auto Layout, right-aligned:

1. `Eyebrow / Latin`, LTR, text `CHAPTER 0X`. Fill `violet` on light spreads,
   `violet-light` on dark ones. 24 px bottom gap.
2. Title in `Chapter / Title`. Fill `ink` on light, `#ffffff` on dark. 24 px bottom gap.
3. One line of subtitle in `Body / L`, max width 720. Fill `text-muted` on light,
   white 50% on dark.

Then 80 px before the first content block.

## Rules that hold across the whole document

- Backgrounds alternate so moving through the book feels like turning sections:
  ink → cream → cream → ink → cream → cream → ink → cream → neutral → cream → violet.
- Body copy never exceeds about **720 px** of measure. Persian needs air; long measure at
  line height 2 becomes unreadable.
- **Violet is never a card fill or a page background except the final spread.** It is a
  4 px bar, a small label, an index number, an eyebrow. That restraint is the brand.
- No drop shadows anywhere. Depth comes from surface color, not elevation.
- No gradient except the single photo scrim on spread 04.
- No icon set, no illustration, no stock imagery. The moustache is the only graphic device.

## Deliverables

1. Page `Brand Book` with all 11 spreads, in order, correctly named.
2. Page `Components & Styles` with the six components, all Brand and support variables, and
   all text styles published as real Figma styles rather than loose values.
3. A frame at the end of the components page named `GAPS`, listing every thing you could
   not match — a missing font, a missing image, a texture you approximated, any place you
   had to guess. Be explicit and complete. An honest gap list is worth more than a spread
   that looks finished and is wrong.
