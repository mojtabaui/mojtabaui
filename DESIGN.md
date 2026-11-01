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

## Override for `/home-next` (owner decision, 2026-11-01)
- The owner chose to break the brandbook's four-colour rule for this exploration: canary yellow becomes the lead colour, because Melina means canary and the brandbook has no yellow.
- Palette for this page: Canary `#FFD23F` + Ink `#1a1714` as the two cores, Cream `#FAF6F1` and Line `#e8e2d9` as neutrals. Violet is dropped here so yellow carries the identity alone.
- Secondary text on yellow: `#3d3833` (8.0:1). Ink on yellow: 12.4:1.
- Structure is also new: the page is a path picker ("where are you now?"), not the hero / courses / testimonials brochure.
- Corners are sharp (0 to 2px) and borders are 2px ink, to move away from the soft rounded current site.
- Dial: ENERGY 3 / RHYTHM 3 / MOTION 1 (hover and press, plus one wing flap of the mark when a path is chosen).
