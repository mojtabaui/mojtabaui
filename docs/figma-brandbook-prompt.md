# Figma agent prompt — Melina Design School brand book

پرامپت زیر رو کامل کپی کن و به Figma agent بده.
انگلیسیه چون دستورِ ابزاره، ولی همه‌ی متن‌های فارسی عیناً داخلش نگه داشته شدن و
باید بدون ترجمه و بدون بازنویسی توی فایل بشینن.

---

## PROMPT — copy everything below this line

You are building a **brand book in Figma** for a Persian (RTL) design school called
**مدرسه دیزاین ملینا** — Melina Design School. The live brand book already exists as a
web page. Your job is to rebuild it as a proper, well-structured Figma document with
real styles, variables and components — not a screenshot tracing.

### 1. Source of truth

Fetch and read this page first. Everything below is confirmed against it, but read it
anyway so you match the actual proportions, rhythm and hierarchy:

```
https://mojtabaui.ir/brandbook
```

Also look at the site the brand belongs to, so the brand book matches the product:

```
https://mojtabaui.ir
https://mojtabaui.ir/courses
```

### 2. Assets to extract from the web

Download these and place them in the file:

| Asset | URL | Used in |
|---|---|---|
| Founder portrait | `https://mojtabaui.ir/images/instructor-portrait.jpg` | Chapter 02, full-bleed, grayscale, 45% opacity over black |
| Signature | `https://mojtabaui.ir/images/sig.png` | Chapter 02, inverted to white |
| App icon | `https://mojtabaui.ir/icon.svg` | Cover, small |

**Do not trace the logo from a screenshot.** Rebuild it as a real vector from this
path data. It is a solid moustache, symmetric, drawn on a 120×120 box:

```
viewBox: 0 4 120 108
d: M60 54 C74 38 104 36 114 58 C104 48 80 54 68 70 C65 74 55 74 52 70
   C40 54 16 48 6 58 C16 36 46 38 60 54 Z
```

The shape is a closed path with a single fill. It must stay solid and clean at every
size. Its edges read as canary wings — that is intentional, do not soften them.

### 3. Document setup

- Canvas frames: **1600 × 1000 px** spreads, laid out left to right in one row, 200 px apart.
- Text direction: **RTL** for all Persian text. Latin labels (`Chapter 01`, `mojtabaui.ir`,
  hex codes) are LTR and set in Space Grotesk.
- One Figma page named `Brand Book`, plus a second page named `Components & Styles`.
- Every spread is a top-level frame named `01 Cover`, `02 Contents`, `03 Name`, and so on.
- Use Auto Layout everywhere. No absolutely positioned text except the oversized
  decorative background glyphs described per spread.

### 4. Color — create these as Figma variables in a collection named `Brand`

Four colors, no more. This constraint is itself part of the brand.

| Variable | Hex | Use |
|---|---|---|
| `ink` | `#1a1714` | Body text, dark surfaces, primary button |
| `cream` | `#FAF6F1` | The default page background everywhere |
| `violet` | `#7c5cfc` | **Accent only** — links, tags, emphasis. Never a large surface. |
| `line` | `#e8e2d9` | Dividers, card borders |

Supporting values, same collection, group `support`:

| Variable | Hex | Use |
|---|---|---|
| `neutral` | `#E4DAD5` | Warm neutral surface (used for the Voice chapter) |
| `text-muted` | `#6b6560` | Secondary body text |
| `text-faint` | `#a09990` | Captions, Latin eyebrows on light |
| `violet-light` | `#a78bfa` | Accent on dark surfaces only |

Rule to write on the color spread verbatim:

> قاعده‌ی ساده: هر چه رنگ کمتر، تاکید بیشتر. اگر همه‌جای صفحه رنگیه، هیچ‌جا مهم نیست.

### 5. Typography — create text styles

One typeface carries the whole brand: **Meem** (Persian), weights **300 Light** and
**700 Bold** only. Differences come from weight and spacing, never from a second family.
**Space Grotesk** is used only for Latin eyebrows, labels and hex codes.

> If Meem is not available in this Figma environment, do not silently substitute.
> Use the closest available Persian sans, and add a red note on the Components page
> listing every text style that fell back, so it can be fixed after the font is installed.

| Style name | Family | Weight | Size | Line height | Tracking |
|---|---|---|---|---|---|
| `Display / Black` | Meem | 700 | 88 | 1.15 | 0 |
| `Chapter Title` | Meem | 700 | 80 | 1.25 | 0 |
| `Heading / L` | Meem | 700 | 38 | 1.5 | 0 |
| `Heading / M` | Meem | 700 | 24 | 1.5 | 0 |
| `Body / L` | Meem | 300 | 20 | 2.0 | 0 |
| `Body / M` | Meem | 300 | 18 | 2.0 | 0 |
| `Caption` | Meem | 300 | 14 | 1.7 | 0 |
| `Eyebrow / Latin` | Space Grotesk | 700 | 11 | 1.2 | 0.3em, UPPERCASE |
| `Mono / Hex` | Space Grotesk | 700 | 24 | 1.2 | 0.1em |

Hard rules, and put them on the typography spread as a بکن / نکن pair of cards:

**بکن**
- ارتفاع خط بدنه را روی ۲ نگه دار
- تیتر فارسی را زیر ۱.۳ نبر
- eyebrow لاتین با tracking باز

**نکن**
- فاصله‌ی حروف فارسی را منفی نکن
- قلم دوم اضافه نکن
- متن بدنه را زیر ۱۶ پیکسل نبر

Never apply negative letter spacing to Persian. Persian glyphs join; negative tracking
collapses them. Latin uppercase eyebrows are the only place tracking opens up.

### 6. Components to build on the `Components & Styles` page

1. **`Logo / Mark`** — the moustache vector, with a `surface` variant property:
   `dark` (cream mark on `#1a1714`), `light` (ink mark on `#FAF6F1`),
   `accent` (white mark on `#7c5cfc`), `neutral` (ink mark on `#E4DAD5`).
2. **`Logo / Lockup`** — mark + `مدرسه دیزاین ملینا` set in Meem Bold, gap 16, same variants.
3. **`Swatch`** — a 1:1 card, hex in `Mono / Hex` at the top, name and usage at the bottom,
   text color driven by a `on` property so it stays legible on its own fill.
4. **`Spec Card`** — white fill, 1px `line` border, 24px radius, 32px padding.
5. **`Do / Dont`** — same card with a red ✕ badge pinned to its top-left corner.

Corner radius scale: 16 for small chips, 24 for cards, 28 for the logo container square.

### 7. The spreads — content is final, use it verbatim

Persian text below must be pasted exactly. Do not translate it, do not rewrite it, do not
"improve" it. Do not add lorem ipsum anywhere: if a slot has no copy, leave it empty and
flag it.

**01 · Cover** — Full `ink` background with a fine dot texture and a subtle grain overlay
at 14% opacity. The logo mark, enormous, cropped by the bottom-left edge at 6% white
opacity. Lockup small at the top-left. Headline `برندبوک` at the largest size the frame
allows. Under it: `این سند می‌گه ملینا چه شکلیه، چطور حرف می‌زنه و چرا اصلاً وجود داره.`
Bottom-right, LTR, faint: `Version 1 · 1405`.

**02 · Contents** — `cream` background. Latin eyebrow `Contents`. A four-column list, each
row a violet index number and a Persian title over a `line` bottom border:
۰۱ اسم · ۰۲ چرایی · ۰۳ نشان · ۰۴ رنگ · ۰۵ تایپوگرافی · ۰۶ لحن · ۰۷ حرکت

**03 · اسم (Chapter 01)** — `cream`, dot texture. Giant `MELINA` bleeding off the right edge
at 4% ink. Title: `ملینا یعنی قناری زرد`. Subtitle: `پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی.`
Two columns. Left column body text:

> دنبال اسمی بودم که حس امید بده. چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک چیزی رو پشت سر می‌ذارن. یکی رشته‌ای که هیچ‌وقت دوستش نداشت، یکی شغلی که خسته‌ش کرده، یکی هم چند سال این‌ور و اون‌ور رفتن بی‌نتیجه.
>
> آدم وقتی می‌خواد از نو شروع کنه، بیشتر از هر چیزی به امید احتیاج داره.

Right column: a 1:1 `ink` panel with grain, the mark centered at 58% width in `violet`.

**04 · چرایی (Chapter 02)** — Full-bleed founder portrait on the right half, grayscale, 45%
opacity, with a bottom-up `ink` gradient over it. Content sits on the left half.
Title `چرا وجود داره`, subtitle `این بخش، تنها جاییه که کل ماجرا خلاصه می‌شه.`
Pull quote, white, black weight, with a 4px `violet` bar on its right edge:

> چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو باشه.

Body under it:

> من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم. هر چیزی که اینجا هست، از برنامه‌ی هفتگی تا اینکه خودم جواب سوال‌ها رو می‌دم، برای همینه.

Foot of the spread: the signature image inverted to white, then `مجتبا یزدانپناه` and
below it `بنیان‌گذار`.

**05 · نشان (Chapter 03)** — `cream`. Title `نشان`, subtitle
`سیبیل. چون همه با همین می‌شناسنش، و لبه‌هاش مثل بال قناریه.`
A row of four 1:1 panels using the `Logo / Mark` variants, captioned
`روی تیره` · `روی روشن` · `روی لهجه` · `روی خنثی`.

**06 · فضای امن و اشتباه‌ها** — Clear space demo: the lockup inside a dashed `violet` box
offset by 50% of the mark's own height on every side. Rule text:

> دور نشان همیشه به اندازه‌ی نصف ارتفاع خودش فضای خالی بذار. هیچ متن، خط یا تصویری نباید وارد این محدوده بشه.

Then `این کارها رو نکن` with four `Do / Dont` cards, each showing the mark abused:
`کشیده یا فشرده نکن` (horizontally scaled 150%) · `نچرخونش` (rotated 18°) ·
`رنگ دلخواه نده` (filled `#16a34a`) · `روی تصویر شلوغ نذار` (on a busy dotted surface).

**07 · رنگ (Chapter 04)** — Full `ink` background. Title `رنگ`, subtitle
`چهار رنگ، نه بیشتر. بنفش فقط برای تاکید، نه برای سطح.`
Four `Swatch` instances in a 2×2 grid, minimum height 220:

| Hex | Name | Usage |
|---|---|---|
| `#1a1714` | مشکی برند | متن اصلی، سطح تیره، دکمه‌ی اول |
| `#FAF6F1` | کرم | پس‌زمینه‌ی اصلی همه‌ی صفحات |
| `#7c5cfc` | بنفش | فقط تاکید. لینک، برچسب، لهجه |
| `#e8e2d9` | خط و حاشیه | جداکننده، قاب کارت |

The `#1a1714` swatch needs a 12% white border so it separates from the background.

**08 · تایپوگرافی (Chapter 05)** — `cream`, with a single enormous `م` bleeding off the
top-left at 3.5% ink. Title `تایپوگرافی`, subtitle
`یک قلم برای همه‌چیز: میم. تفاوت‌ها از وزن و فاصله میان، نه از قلم دوم.`
A specimen table, rows divided by `line` rules, Latin label on the left in
`Eyebrow / Latin`, sample on the right:

- `Display · Black` → `آموزش اصولی`
- `Heading · Black` → `چرا وجود داره`
- `Body · Light · leading 2` → `متن بدنه با فاصله‌ی خط باز، چون فارسی به فضا احتیاج داره.`
- `Caption · Light` → `توضیح کوتاه زیر عنصرها`

Then the بکن / نکن cards from section 5 above.

**09 · لحن (Chapter 06)** — `#E4DAD5` background with a giant `"` at 5% ink bleeding off the
top-right. Title `لحن`, subtitle `هر جمله‌ای که هر مدرسه‌ی دیگه‌ای هم می‌تونه بگه، حذف می‌شه.`
Four rows. Each row: a faint ✕, then the rejected line struck through in 35% ink, then the
brand's actual line in black weight below it:

| ✕ | ✓ |
|---|---|
| جامع‌ترین دوره‌ی UI | ۵۵ ساعت ویدیو و ۵ پروژه‌ی واقعی |
| تجربه‌ی یادگیری بی‌نظیر | هر هفته فیدبک می‌گیری |
| همه چیزی که نیاز داری | لازم نیست قبلش چیزی بلد باشی |
| بهترین انتخاب برای آینده‌ت | اگه این دوره برات مناسب نبود، خودم می‌گم |

The pattern is the point: replace claims with checkable facts.

**10 · حرکت (Chapter 07)** — `cream`. Title `حرکت`, subtitle
`حرکت باید معنی داشته باشه. اگر فقط قشنگه، حذفش کن.`
Three `Spec Card`s:

| Number | Unit | Meaning |
|---|---|---|
| ۱۵۰ تا ۳۰۰ | میلی‌ثانیه | ریزتعامل‌ها: هاور، فشردن، تغییر حالت |
| ۶۰۰ | میلی‌ثانیه | ظاهر شدن بخش‌ها هنگام اسکرول |
| ۰.۷۲ / ۱.۳۵ | ثانیه | بال‌زدن نشانگر، در حرکت و در سکون |

Closing line:

> همه‌ی حرکت‌ها به تنظیم «کاهش حرکت» سیستم احترام می‌ذارن. کسی که اون رو روشن کرده، نسخه‌ی ساکن سایت رو می‌بینه.

**11 · Closing** — Full `violet` background with grain at 12%, the mark cropped off the
bottom-left at 12% white. The mark again, small, at the top. Then, huge, in white black weight:

> که هیچ‌کس وسط راه حس نکنه تنها مونده.

Bottom: a short white rule, then LTR `mojtabaui.ir` in `Eyebrow / Latin`.

### 8. Layout rules that hold across every spread

- Content sits in a 12-column grid with 80 px outer margins and 40 px gutters.
- Vertical rhythm: 8 px base. Chapter head to content is 80. Section to section is 120.
- Every chapter head is the same three-part stack: Latin `Chapter 0X` eyebrow in violet,
  then the Persian title, then one line of subtitle in muted text at line height 2.
- Chapters alternate background so scrolling feels like turning a section:
  cream → dark → cream → dark → cream → neutral → cream → violet.
- Body copy never exceeds ~640 px of measure.
- Violet is never a card fill or a page background except the final spread. It is a
  4px bar, a label, a number, an eyebrow. That restraint is the brand.

### 9. Deliverables

1. The `Brand Book` page with all 11 spreads.
2. The `Components & Styles` page with the components, all color variables and all text
   styles published as real Figma styles, not raw values.
3. A short frame at the end of the components page listing anything you could not match —
   missing font, missing asset, any place you had to guess. Be explicit; do not paper over
   a gap.
