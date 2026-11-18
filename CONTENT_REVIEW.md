# Content review — please confirm before launch

You asked to confirm which numbers are real before anything is changed, so **nothing on this list has been
edited yet**. I checked each claim against your own CV (`public/Owoade_Opeyemi_CV.pdf`). The "In CV?" column
shows whether the CV backs it up.

**How to reply:** for each item, just say **keep**, **remove**, or give the **real number**
(e.g. "#7 real number is 18%"). Anything you mark *remove* gets rewritten as an honest description with no number.

All values live in `src/data/portfolioData.ts` unless noted.

## 1. Project metrics (shown on case-study pages)

| # | Claim | Project | Line | In CV? | Your call |
|---|-------|---------|------|--------|-----------|
| 1 | "4.2× faster" pilot resolution | QualityHub | 322 | No | |
| 2 | Interviewed 42 students and 8 officers | QualityHub | 340 | No | |
| 3 | "83% of interviewed students had never received follow-up" | QualityHub | 344 | No | |
| 4 | "Officers spent up to 14 hours/week filing memos" | QualityHub | 345 | No | |
| 5 | "Across 12 faculties" | QualityHub | 313 | No | |
| 6 | 14 core flows · < 4 s entry time · 120+ components | Pocketa | 494–496 | No | |
| 7 | Discovery with 60 students across 4 universities | Pocketa | 514 | No | |
| 8 | 34.2% waitlist conversion (card badge, metric, Ventics testimonial) | Ventics AI | 539, 571, 969 | No | |
| 9 | Usability score 94/100 · render wait drop < 2.1% | Ventics AI | 572–573 | No | |
| 10 | "Reduced perceived wait time by 48%" | Ventics AI | 592 | No | |
| 11 | Invoice in < 2 seconds | QuickBill | 635 | No | |
| 12 | 60 FPS · 99.9% Vercel uptime | FORGE | 683–684 | No | |
| 13 | +74% dwell time · 88% interaction rate · < 240 KB | Vale | 729–731 | No | |
| 14 | 41% projected default reduction · 4 languages · tier 2 & 3 cities | SmartAjo | 775–777 | No | |
| 15 | 1 tap to SOS · 18:1 contrast · < 3 s logging | CareCell | 820–822 | No | |
| 16 | +64% engagement · 100% facilitator approval · 4.8/5 playtest | Pivot | 865–867 | No | |

Already backed by your CV (no action needed): 1st Runner Up out of 14 teams, Honourable Mention + ₦100,000,
3-hour QuickBill build, 5-hour FORGE build, 36-hour BabaSika sprint, 92M informal workers, 10+ hackathons,
10+ students trained, 2+ years of experience, 2× award winner.

## 2. Career claims

| # | Claim | Where | In CV? | Your call |
|---|-------|-------|--------|-----------|
| 17 | Pocketa "onboarding for 20k+ users" | Career bricks, line 889 | No | |
| 18 | Cowrywise "organized financial literacy sessions for 200+ students" | Résumé modal, line 1084 | No (CV says "Represent Cowrywise in my community") | |
| 19 | Cowrywise title "Campus & Community Ambassador" | Bricks + résumé | CV says "Ambassador" | |

## 3. Testimonials — send me real ones

The three current quotes have no real person attached ("TEAM INNOVATEQAS" is your own team), and the Ventics one
repeats the unconfirmed 34.2%. You said you'll provide real quotes. For each one, send:

```
Name:        e.g. Ada Okafor
Role:        e.g. CEO
Company:     e.g. Ventics AI
Quote:       2–3 sentences in their words
Photo:       optional (square, 200 px+)
LinkedIn:    optional (lets visitors verify the quote)
```

They go in `TESTIMONIALS` in `src/data/portfolioData.ts`. Photos go in `public/assets/photos/testimonials/`.
Until you send them, the current three stay up.

## 4. Things only you can confirm

- [ ] **Contact email.** The site uses `uxforger@gmail.com`, but your CV uses `owoadeopeyemi11@gmail.com`.
      Which one should visitors use?
- [ ] **Social links.** I couldn't open these from my environment, so please click each once on the live site:
      `linkedin.com/in/owoade-opeyemi`, `x.com/theuxforger`, `github.com/theuxforger`, `wa.me/2348107522288`.
- [ ] **Screenshots for Vale, SmartAjo, CareCell, Pivot.** Each currently shows a designed placeholder poster.
      Drop a 1600 px-wide `.webp` in `public/assets/projects/` and set `mockupImage` (see README).
- [ ] **Booking link.** "Book a call" buttons scroll to the contact section. If you have Calendly or Cal.com,
      send the link and they'll open it instead.

## 5. Originality (worth a decision)

While sorting your assets I found screenshots of other designers' portfolios that were used as references.
They're now in `design-references/` and no longer published. A few pieces of your site follow them closely,
including some exact copy:

| Your section | Reference | Exact matching copy |
|---|---|---|
| Hero blocks + mascots | `image_35287cec.png` | "I design / products / and I / ship them." |
| Contact footer card | `image_980997b5.png` | "got an idea?" / "Let's build something fun." |
| Ask-me chat phone | `Screenshot_2026-11-02…png` (Marvelous Rose) | "Your project could be next.", "Can we hop on a call?", "Start your project with me…" |
| Project cards + sticky-note testimonials | `image_0ed0c9f9.png` and others (Jinadu Rashedat) | Layout only (the "…Yunno ?" notes were removed) |

Borrowing patterns is normal. Identical headlines and lines can get recognised in the Lagos design community,
though. If you'd like, I can rewrite those lines in your own voice. Your call.
