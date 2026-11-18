# The UX Forger — portfolio of Owoade Opeyemi

Product Designer & Design Engineer. Live at **[uxforger.live](https://uxforger.live)**.

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Motion. The page is pre-rendered to static HTML at build time
and hydrated in the browser, so content appears instantly and is readable by search engines and link previews.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + pre-render → dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run lint       # type-check
```

## Deploy (Vercel or Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are needed.

## Edit content

Almost everything you'd want to change is in **`src/data/portfolioData.ts`**:

| What | Constant |
|------|----------|
| Name, email, links, availability, CV path | `PERSONAL_INFO` |
| Projects and case studies | `PROJECTS` |
| "What I work on" | `CAPABILITIES` |
| Playground experiments | `EXPERIMENTS` |
| Career bricks | `BRICK_COMPANIES` |
| Résumé experience / education / awards | `EXPERIENCES`, `EDUCATION_LIST`, `AWARDS_LIST` |
| Testimonials | `TESTIMONIALS` (supports optional `photo` and `link`) |
| Photo book chapters | `BOOK_CHAPTERS` |
| Life off the keyboard | `BEYOND_WORK_ITEMS` |

`CONTENT_REVIEW.md` lists the numbers and claims still waiting for your confirmation.

### Add or replace a project screenshot

1. Export the image at about **1600 px wide** as **WebP** (Squoosh, Figma export, or `cwebp`).
2. Save it as `public/assets/projects/<slug>.webp` (e.g. `vale.webp`).
3. Set `mockupImage: '/assets/projects/<slug>.webp'` on that project. Optional extra screens go in `gallery`.
4. Run `python3 scripts/generate-image-sizes.py` (needs Pillow). It records the image size so the page
   doesn't jump while it loads.

If an image is missing, the card shows a designed placeholder poster instead of a broken image.

### Replace the CV

Overwrite `public/Owoade_Opeyemi_CV.pdf` (or change `cvPdfUrl` / `cvFileName` in `PERSONAL_INFO`).

## Project structure

```
src/
  App.tsx                    page composition, deep links (#work/<slug>), overlays
  entry-server.tsx           build-time pre-render entry
  data/portfolioData.ts      all content
  data/imageSizes.ts         generated image dimensions
  components/
    layout/SiteHeader.tsx    nav, scroll-spy, progress bar, sound + ⌘K buttons
    sections/                Hero, Work, Capabilities, About, Playground, ContactFooter
    ui/                      SectionHeader, Reveal, Toast (+ copy helper), SmartImage
    FullScreenCaseStudy.tsx  case-study overlay (lazy-loaded)
    ResumeModal.tsx          résumé overlay (lazy-loaded)
    ForgeConsole.tsx         ⌘K / Ctrl+K quick search (lazy-loaded)
    InteractivePhotoBook.tsx, CompanyBricks.tsx, TestimonialCarousel.tsx,
    InteractiveChatPhone.tsx, PlaygroundInteractiveToys.tsx, MascotBuddies.tsx
  hooks/                     useFocusTrap, useScrollLock, useScrollSpy, useSoundMuted
  utils/                     motion presets, colour contrast helper, Web Audio sounds
public/assets/projects       project mockups (WebP)
public/assets/photos         personal photos (WebP)
scripts/                     prerender.mjs, generate-image-sizes.py
source-assets/               original full-size images (not deployed)
design-references/           other designers' portfolios used as inspiration (not deployed — don't publish)
```

## Design system

Tokens live in `src/index.css` under `@theme` (colours, fonts, shadows). Bright brand colours (`sun`, `coral`,
`cobalt`, `mint`, `lavender`) are for large shapes. Their `*-ink` versions are the WCAG-AA-safe shades for
small text. Motion presets (springs, eases, reveal variants) are in `src/utils/motion.ts`. Everything respects
`prefers-reduced-motion`.

## Quality bar (Lighthouse, Nov 2026 build)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile | 96 | 100 | 100 | 100 |
| Desktop | 98 | 100 | 100 | 100 |
