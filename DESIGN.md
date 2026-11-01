# DESIGN.md: مدرسه دیزاین ملینا

Source: transcribed from the brandbook at `src/app/brandbook/page.tsx` (the owner's own document). Nothing here is invented; where the brandbook is silent, the line says so.

## Identity
- Name: Melina (ملینا) means canary. A small bird you hear from behind the window.
- Why it exists: people who come to learn design are usually leaving something behind. The school is there to give them hope and a structure to start again.
- Mark: the moustache glyph (`BrandGlyph` / `BrandMark`). Its edges read as a canary's wings. Keep clear space of half its height around it.

## Palette (four colours, no more)
- Ink `#1a1714`: body text, dark surfaces, the primary button.
- Cream `#FAF6F1`: the base background of every page.
- Line `#e8e2d9`: dividers, card frames.
- Violet `#7c5cfc`: emphasis only (link, label, accent). Never a surface.
- Supporting tones already in the brandbook: muted text `#6b6560`, dim `#a09990`, warm section tone `#E4DAD5`.
- Rule: the fewer colours, the stronger the emphasis.

## Typography
- One typeface for everything: Meem (`--font-meem`). Differences come from weight and spacing, not a second face.
- Display and headings: Black. Body: Light, line-height 2. Caption: Light.
- Persian headings never below line-height 1.3. Never negative letter-spacing on Persian. Body never below 16px.
- Latin eyebrows may use open tracking (brandbook allows it).
- English pages use Space Grotesk (already wired in `globals.css`).

## Voice
- Any sentence another school could also say gets cut.
- Specific beats superlative: "۵۵ ساعت ویدیو و ۵ پروژه‌ی واقعی", not "the most complete course".
- First person belongs to Mojtaba's personal note only.

## Motion
- Micro-interactions 150 to 300ms. Section reveal 600ms. Mark wing flap 0.72s moving / 1.35s at rest.
- Motion must mean something; if it is only pretty, cut it.
- Everything respects reduced motion. Content is never hidden waiting for an animation.

## Dials (two explorations of the home page)
- `/home-v2` editorial: ENERGY 2 / RHYTHM 3 / MOTION 1
- `/home-v3` bold: ENERGY 3 / RHYTHM 3 / MOTION 2
