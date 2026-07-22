# پرامپت‌های تصویر سایت ملینا

هدف این فایل اینه که همه‌ی تصویرهای سایت **یک زبان بصری واحد** داشته باشن.
اگر هر تصویر رو با سلیقه‌ی جدا بسازیم، سایت شلوغ و بی‌هویت می‌شه.

---

## ۰. بلوک سبک مشترک (مهم‌ترین بخش)

این متن رو **به انتهای هر پرامپت** اضافه کن. این چیزیه که همه‌ی تصویرها رو خانواده می‌کنه:

```
minimal editorial vector illustration, flat geometric shapes with subtle paper grain,
warm cream background #FAF6F1, near-black ink #1a1714, generous negative space,
calm and confident, swiss design influence, soft long shadows, no text, no letters,
no words, no photorealism, no 3d render, no glossy chrome, no stock photo people,
no gradients heavy, centered composition
```

### چیزهایی که حتماً باید رعایت شه

| قانون | دلیل |
|---|---|
| **no text, no letters** رو حذف نکن | هوش مصنوعی متن فارسی رو خراب می‌سازه و روی سایت فارسی افتضاح می‌شه |
| پس‌زمینه همیشه `#FAF6F1` | تصویر باید توی کارت سایت حل شه، نه اینکه وصله به‌نظر برسه |
| فقط **یک رنگ لهجه** در هر تصویر | رنگ لهجه‌ی هر مقاله پایین اومده. دو رنگ لهجه یعنی شلوغی |
| نسبت **۱۶:۹** برای کاور مقاله | کارت‌ها همین نسبت رو دارن |

---

## ۱. کاور مقالات (اولویت اول)

**چرا اول:** ده تا مقاله الان هیچ تصویری ندارن و کارت‌ها فقط متنن.
این بزرگ‌ترین جای خالی سایته.

- **نسبت:** ۱۶:۹
- **اندازه:** ۱۶۰۰ در ۹۰۰ پیکسل
- **مسیر:** `public/images/articles/<slug>.jpg`

### ۱. هوش مصنوعی جای طراح‌ها رو می‌گیره؟
`ai-and-designer-job.jpg` · رنگ لهجه `#7c3aed`

```
a human hand and a geometric robotic hand reaching toward the same design tool,
neither dominating, balanced composition, accent color violet #7c3aed
```

### ۲. پرامپت‌نویسی برای طراح‌ها
`prompting-for-designers.jpg` · رنگ لهجه `#6d28d9`

```
an abstract funnel turning scattered chaotic small shapes into one clean ordered
rectangle, precision and clarity, accent color deep violet #6d28d9
```

### ۳. طراحی رابط برای محصولات هوش مصنوعی
`designing-ai-interfaces.jpg` · رنگ لهجه `#1d4ed8`

```
an abstract chat interface panel floating, with a soft pulsing dot indicating
thinking, and a subtle question mark shape formed by negative space suggesting
uncertainty, accent color blue #1d4ed8
```

### ۴. ۱۰ اشتباه رایج در طراحی فرم‌ها
`form-design-mistakes.jpg` · رنگ لهجه `#dc2626`

```
an abstract vertical form with stacked input field rectangles, one field visibly
broken and tilted out of alignment, the rest neatly aligned, accent color red #dc2626
```

### ۵. دیزاین سیستم رو از کجا شروع کنیم
`design-system-guide.jpg` · رنگ لهجه `#0d9488`

```
modular building blocks snapping together into an organized grid system,
lego like logic without lego branding, accent color teal #0d9488
```

### ۶. رنگ در رابط کاربری
`color-in-ui.jpg` · رنگ لهجه `#ea580c`

```
overlapping translucent color swatch circles forming a controlled palette ladder
from light to dark, accent color orange #ea580c
```

### ۷. دسترس‌پذیری
`accessibility-basics.jpg` · رنگ لهجه `#059669`

```
an abstract eye shape and a ripple of sound waves merging into one symmetric mark,
inclusive and calm, accent color emerald #059669
```

### ۸. پورتفولیویی که کارفرما تا آخر می‌خونه
`portfolio-guide.jpg` · رنگ لهجه `#db2777`

```
three portfolio cards fanned out, the front one clearly sharper and more refined
than the two behind it, quality over quantity, accent color pink #db2777
```

### ۹. تحقیق کاربر بدون بودجه
`user-research-basics.jpg` · رنگ لهجه `#ca8a04`

```
two abstract speech bubbles facing each other, one much larger and listening,
a small magnifier resting inside it, accent color amber #ca8a04
```

### ۱۰. اولین کار طراحی
`first-design-job.jpg` · رنگ لهجه `#2563eb`

```
an abstract stepped path leading from a small dot up to an open doorway shape,
beginning of a career, accent color blue #2563eb
```

---

## ۲. صفحه‌ی چک‌لیست یادگیری

- **کاور اصلی:** `public/images/checklist-hero.jpg` · نسبت ۳:۲ · ۱۶۰۰ در ۱۰۶۷

```
an abstract winding path made of six connected geometric segments, each segment
slightly more refined than the previous, ending in a small flag, sense of ordered
progress, accent color violet #7c5cfc
```

- **تصویر هر مرحله (اختیاری):** `public/images/checklist/<id>.jpg` · مربع ۸۰۰ در ۸۰۰

| فایل | پرامپت اختصاصی | رنگ |
|---|---|---|
| `foundation.jpg` | `a hand placing the first foundation block on empty ground` | `#dc2626` |
| `visual.jpg` | `an abstract layout where spacing and hierarchy are visibly measured by thin guide lines` | `#ea580c` |
| `ux.jpg` | `a branching flow diagram of simple nodes, one path highlighted as the chosen route` | `#1d4ed8` |
| `system.jpg` | `identical modular components arranged in a strict repeating grid` | `#0d9488` |
| `project.jpg` | `several screens of one product connected in sequence forming a complete flow` | `#7c5cfc` |
| `portfolio.jpg` | `an open portfolio spread with one project presented prominently` | `#db2777` |

---

## ۳. صفحه‌ی گواهی‌ها

**ماکاپ گواهی:** `public/images/certificate-sample.jpg` · نسبت ۴:۳ · ۱۴۰۰ در ۱۰۵۰

```
an abstract certificate document shown at a slight angle with a seal badge shape
in the corner and a small barcode like verification mark, official but modern and
minimal, accent color violet #7c5cfc
```

> ⚠️ حتماً `no text, no letters` رو نگه دار. گواهی جعلی با متن ناخوانا بدترین حالته.

---

## ۴. کاور فایل‌های رایگان

- `public/images/free/50-styles.jpg` · مربع ۱۰۰۰ در ۱۰۰۰

```
fifty small abstract ui style thumbnails arranged in a dense neat grid, each a
slightly different visual treatment, accent color violet #7c5cfc
```

- `public/images/free/700-chatgpt.jpg` · مربع ۱۰۰۰ در ۱۰۰۰

```
a tall stack of small abstract command cards seen from a slight angle, suggesting
a large organized library, accent color emerald #16a34a
```

---

## ۵. تصویر اشتراک‌گذاری (OG image)

وقتی لینک سایت رو توی تلگرام و اینستاگرام می‌فرستی، این تصویر نشون داده می‌شه.
الان نداریم و لینک‌ها خالی و بی‌جذابیت می‌افتن.

`public/og.jpg` · **دقیقاً ۱۲۰۰ در ۶۳۰**

```
a wide minimal composition with a single bold geometric mark centered on warm cream,
generous empty space around it, editorial poster feeling, accent color violet #7c5cfc
```

> برای این یکی می‌تونی متن رو خودت بعداً توی فیگما اضافه کنی، چون اسم برند باید
> درست و خوانا باشه و هوش مصنوعی فارسی رو خراب می‌نویسه.

---

## ۶. نکات خروجی گرفتن

1. **فرمت:** ترجیحاً WebP. اگر ابزارت JPG می‌ده، اشکالی نداره، خودم تبدیل می‌کنم.
2. **حجم:** هر تصویر زیر ۳۰۰ کیلوبایت. تصویر سنگین سرعت سایت رو می‌کشه.
3. **چند نسخه بگیر:** از هر پرامپت سه چهار خروجی بگیر و بهترین رو نگه دار.
4. اگر ابزارت پارامتر نسبت داره، از `--ar 16:9` برای کاور مقاله استفاده کن.

---

## بعد از ساختن

فایل‌ها رو توی همون مسیرهای بالا بذار و بهم بگو. من:

- فیلد `cover` رو به تایپ `Article` اضافه می‌کنم
- کاور رو توی کارت‌های لیست مقالات و بالای صفحه‌ی خواندن نمایش می‌دم
- با `next/image` بهینه‌سازی و lazy load می‌کنم تا سرعت نیفته
- برای تصویرهای غایب یه حالت جایگزین می‌ذارم که چیزی نشکنه
