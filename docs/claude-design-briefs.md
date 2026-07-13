# Claude Design Briefs — masaki-portfolio

Paste **one section at a time** into claude.ai's Design / Artifact mode.
Always include the "Shared constraints" block at the top of every prompt to
keep outputs consistent across pages.

Direction: **Editorial — bookshop / magazine feel.** Not SaaS. Not startup
landing page. Think paco.me, rauno.me, a well-set magazine page. Warm
paper, ink, generous whitespace, letters that know what they're doing.

---

## Shared constraints (copy to every prompt)

```
Design direction: Editorial. Bookshop / magazine / long-form writing.
NOT a SaaS landing page. NOT a startup marketing site. No hero gradients,
no product mockups, no feature cards, no "Get started" energy.

Framework + stack:
- Next.js 16 App Router + TypeScript + Tailwind CSS v4
- shadcn/ui is installed but USE IT SPARINGLY — this is a reading surface,
  not a component showcase. Prefer semantic HTML + Tailwind utility classes.
- Icons: lucide-react, used only for tiny inline affordances (ArrowUpRight
  next to text links, ArrowRight for "next"). Never as feature icons.
- No new libraries.

Palette (CSS variables already wired; use the token-mapped Tailwind classes):
- Background: bg-background (warm cream, not white)
- Text: text-foreground (warm near-black)
- Muted: text-muted-foreground (warm gray) for dates, captions, metadata
- Accent: text-primary / border-primary (ink blue) — used ONLY for inline
  link underlines and the small arrow glyph. Never as a filled button color.
- Borders: border-border (warm slate) — use hairlines (border-t) to
  separate sections, not boxes around content.
Do not introduce custom colors. Do not put content inside filled cards.

Typography:
- Display / editorial headings: use the `font-display` utility class
  (Fraunces variable serif with opsz 144 and SOFT 50). Pair with
  tracking-tight. Allow italic.
    - H1: text-5xl sm:text-6xl md:text-7xl font-display leading-[1.05]
    - H2: text-3xl sm:text-4xl font-display
- Section labels (small all-caps): text-xs uppercase tracking-[0.18em]
  text-muted-foreground. Pair with a hairline border-t.
- Body copy: text-base sm:text-lg text-foreground leading-relaxed.
  For paragraphs of prose, use max-w-[62ch] or max-w-prose (reading
  measure). Do not stretch body text across the full viewport.
- Dates / metadata / captions: text-sm text-muted-foreground, often
  tabular-nums for years.

Layout:
- Outer container: max-w-5xl mx-auto px-6. Generous py-20 / py-24 between
  major sections.
- Single column is the default. Two columns only when genuinely editorial
  (e.g. a sidebar of metadata next to prose).
- No rounded cards for content. No shadow-lg anywhere.
- Hairlines (border-t border-border) are the primary separator.

Links and calls to action:
- NO filled primary buttons on editorial pages. Inline text links instead.
- Style: underline underline-offset-4 decoration-border hover:decoration-primary
  hover:text-primary transition-colors. Append a small " →" (character
  arrow, not an SVG) or an inline ArrowUpRight for external.
- The ONLY exception: the /contact page may use a single outline button
  for the mailto — and even there, prefer a text link.

Images / avatars:
- No logo mark. No avatar circle. No abstract hero illustration.
- If an image is needed (future), treat it like a magazine photo —
  full-bleed or wide, captioned in small muted type underneath. Use
  next/image.

Motion:
- None beyond Tailwind's built-in transition-colors on hover.
- No scroll animations, no reveal effects, no marquees.

Output format:
- One single-file React TSX component, default-exported.
- Server Component. No "use client". No useState. No data fetching.
- Imports allowed: next/link, next/image, lucide-react icons.
- Placeholder copy is provided below — use it verbatim.

Tone: quiet confidence. Writer / operator, not founder / hustler.
Bilingual: primary copy is English, with small Japanese subcopy only
where noted. Japanese uses the inherited font stack (Noto Sans JP);
do not force it into the serif.
```

---

## Exploration prompt — Home direction variants (optional, before Brief 1)


## Brief 1 — Home page (`app/page.tsx`)

```
Direction: GIANT NAME COVER. The opening view of this site is a
full-viewport typographic cover, the way a hardcover book or a design
magazine front page would handle the name. References: KODO NISHIMURA
(buddhist monk / makeup artist), DIGITAL DESIGNER, kkuida. The name is
the only thing you see on arrival; everything else is below the fold.

Layout: single column, max-w-5xl container, mx-auto, px-6.
Two distinct movements:
  (a) The cover — occupies ~90vh on desktop, ~85vh on mobile.
  (b) The reading below — starts with a clear top hairline and stays
      within the editorial pattern we already use on other pages.

────────────────────────────────────────────────────────────
MOVEMENT (a) — THE COVER
────────────────────────────────────────────────────────────

Markup pattern:
  <section class="relative flex min-h-[calc(100vh-64px)] flex-col
                  justify-between py-10 md:py-16">
    … cover contents …
  </section>

Top row — a single row, split left/right, text-xs uppercase
tracking-[0.22em] text-muted-foreground:
  LEFT:  "PORTFOLIO · Nº 001"
  RIGHT: "Sydney · 2026"
(Use <div class="flex items-start justify-between">.)

Center — the name, the whole point of the page.
Render as a <h1>, font-display, set on two lines, flush left. Use a
clamp for size so it scales across viewports:
  class="font-display font-normal leading-[0.92]
         tracking-[-0.02em]
         text-[clamp(3rem,8vw,7rem)]"
Inside the h1, two lines:
  Line 1: "Masaki"
  Line 2: "Kawakami."     ← note the period, deliberately
Both lines sit on their own <span class="block">. The period is part of
the second line — this is the editorial gesture that separates a
portfolio header from a corporate hero.

Below the name, a small meta block, mt-8 md:mt-10, with two rows:
  Row 1: <p class="text-sm uppercase tracking-[0.22em]
                  text-muted-foreground">
           AI-Native Full-Stack Builder · Sydney, AU
         </p>
  Row 2: <p class="mt-2 text-sm text-muted-foreground">
           川上 正樹 — ビルダー / 日本語・英語バイリンガル
         </p>
(The Japanese line uses the inherited font stack — Noto Sans JP — not
the serif. The serif is reserved for the English display name.)

Bottom row of the cover — a single muted line, text-xs uppercase
tracking-[0.22em] text-muted-foreground, right-aligned:
  "↓ Read on"
(Character arrow; no SVG, no animation.)

────────────────────────────────────────────────────────────
MOVEMENT (b) — THE READING
────────────────────────────────────────────────────────────

Starts with a <div class="border-t border-border"></div> hairline, then
py-20 md:py-24 spacing. From here down, follow the editorial pattern
used across the site: section labels (text-xs uppercase
tracking-[0.18em] muted), font-display subheads, max-w-[62ch] prose,
year-prefixed work list, inline text links (no buttons).

Sections under the cover:

1. Label "ABOUT"
   One paragraph, max-w-[62ch], text-lg leading-relaxed:
     "Full-stack builder with a background in HR and startup operations.
     Currently COO at Cubic Innov8 and founding engineer on Zepi Recruit,
     an AI job-matching platform for Japanese speakers in Australia.
     Writing software that does its job and gets out of the way."
   Inline link below: "More about me →" (→ /about).

2. Label "SELECTED WORK"
   Year-prefixed list, hairline rows. Same pattern used elsewhere:
     <li class="group grid grid-cols-[6ch_1fr] items-baseline gap-6
                border-t border-border py-6
                md:grid-cols-[6ch_1fr_auto]">
       <span class="text-sm tabular-nums text-muted-foreground">2025–</span>
       <span>
         <Link class="font-display text-2xl decoration-transparent
                      underline-offset-4
                      group-hover:text-primary group-hover:underline
                      group-hover:decoration-primary
                      transition-colors md:text-3xl">
           Zepi Recruit
         </Link>
         <span class="mt-1 block text-sm text-muted-foreground">
           AI job matching for Japanese speakers in Australia.
         </span>
       </span>
       <span class="col-span-2 text-xs uppercase tracking-[0.18em]
                    text-muted-foreground
                    md:col-span-1 md:justify-self-end">
         Founding Engineer
       </span>
     </li>
   Three rows (Zepi Recruit, Review 365, Capstone Warden), close the
   list with a final border-t.
   Below the list, a right-aligned inline link: "All work →" (→ /work).

3. Label "A SHORT NOTE"
   Two paragraphs, max-w-[62ch], text-lg leading-relaxed:
     "I spent five years in HR at Canon Marketing Japan before pivoting
     into data and AI at UTS. That detour is the whole point. The best
     recruiting software I've seen was built by people who've sat in
     the recruiter's chair — so I'm building it."
     "I work across the stack — Next.js, Supabase, Claude, Python — but
     I'm not attached to any of it. Tools are tools. The interesting
     problem is always upstream."

4. Closing strip (above the site Footer component).
   Centered, text-sm text-muted-foreground, preceded by
   <div class="border-t border-border"></div> and pt-10:
     "Open to roles in Australia and Japan, and to selected freelance
     work. Say hello →"
   "Say hello →" is an inline link to /contact, styled with
   underline decoration-border hover:decoration-primary
   hover:text-primary.

────────────────────────────────────────────────────────────
NON-NEGOTIABLES
────────────────────────────────────────────────────────────

- The cover must be typography only. No photo, no avatar, no monogram,
  no SVG illustration, no gradient, no background image, no motion, no
  marquee, no split-screen.
- Do NOT add badges ("Open to work", etc.) to the cover. The meta
  block handles everything.
- Do NOT use filled <Button>. Every call-to-action is an inline text
  link with a trailing "→" character.
- Do NOT import shadcn Card / Badge / Button on this page at all.
- Do NOT animate anything. Tailwind's transition-colors on hover is
  the entire motion budget.

Output one TSX file as a Server Component. Default export: HomePage.
No "use client".
```

---

## Brief 2 — Work index (`app/work/page.tsx`)

```
Goal: A contents page. Not a grid of product cards.

Layout: single column, max-w-5xl.

Sections:

1. Header block
   - Small label: "WORK"
   - H1 (font-display, text-5xl md:text-6xl): "Selected work, 2024–"
   - Lead paragraph (max-w-[62ch], text-lg, muted):
     "A reading list of projects I've shipped or am actively shipping.
     AI products, local-SEO software, and in-progress research. Most of
     it started as a question I couldn't answer by reading alone."

2. The list (hairline-separated rows, same pattern as Home's "Selected work")
   For each project, a row:
     - Year column (tabular-nums, muted, 6ch)
     - Title (font-display text-2xl), plus a one-line subtitle underneath
       (text-sm muted)
     - Role / status column on the right (small all-caps muted)
   The whole row is wrapped in a <Link> to /work/[slug]. Hover:
   decoration-primary on the title, text-primary.
   Include all three projects: Zepi Recruit, Review 365, Capstone Warden.

3. Hairline + small label: "ABOUT THIS LIST"
   A short paragraph (max-w-[62ch], muted, text-base):
     "Source code for Zepi Recruit is private. Review 365 client names
     are withheld under confidentiality. Capstone Warden is in-progress
     UTS research — results are not yet public."

Output as a Server Component. Default export: WorkPage.
```

---

## Brief 3 — Case study: Zepi Recruit (`app/work/[slug]/page.tsx`, slug="zepi-match")

```
Goal: A long-form essay about a project, not a product brochure. A hiring
manager should read this the way they'd read a magazine feature on
someone else.

Layout: max-w-3xl (narrower than other pages — reading measure). The
sidebar of metadata sits ABOVE the prose, not beside it, in a compact
metadata block.

Sections (top to bottom):

1. Breadcrumb (tiny, muted)
   ← Back to work     (inline text link to /work)

2. Editorial header
   - Small label: "CASE STUDY · FOUNDING ENGINEER · 2025–"
   - H1 (font-display text-5xl md:text-6xl leading-[1.05]):
     "Zepi Recruit"
   - Deck (one line, font-display italic, text-2xl md:text-3xl
     text-muted-foreground, max-w-[48ch]):
     "An AI job-matching platform built for Japanese speakers
     navigating the Australian job market."

3. Metadata strip — a compact, hairline-bordered row (border-y,
   py-4 my-10), laid out as grid-cols-2 md:grid-cols-4 gap-6,
   each cell: tiny uppercase label on top, value below.
     ROLE            Founding Engineer
     PERIOD          2025 — present
     STATUS          Production
     SOURCE          Private

4. Body — long-form prose, max-w-[62ch], text-lg leading-relaxed, with
   subsection headings set in font-display text-2xl md:text-3xl, each
   preceded by a small uppercase label. Structure:

   "THE PROBLEM"
     Japanese speakers looking for work in Australia run into two
     walls at once. First, the job market is scattered across Seek,
     Indeed, LinkedIn, and a long tail of ATS pages at individual
     companies. Second, the resume they spent a decade learning to
     write — 履歴書 / 職務経歴書 — is the wrong shape for most AU
     employers, and the AU-style resume is the wrong shape for the
     Japanese-owned companies hiring bilingually in Sydney. Existing
     tools solve one slice each; none solves the whole flow.

   "THE APPROACH"
     Next.js 16 on Vercel, Supabase + pgvector for semantic matching,
     Anthropic Claude for every generation task, and a Chrome MV3
     extension that injects a match score directly into LinkedIn job
     pages. Aggregation blends Adzuna and JSearch with direct
     Greenhouse / Lever / Ashby ATS pulls — a differentiated
     first-party data source, not a scraping layer.

   "WHAT I BUILT"
     Set as a continuous paragraph followed by a simple unbulleted
     list of six items, each one line, tabular in feel:
       — Full architecture: web/API, Chrome extension, data model, AI pipeline
       — Matching score (embedding cosine + rules + seniority + language fit)
       — Seven resume templates across AU and JP conventions
       — Caching layer on job summaries, match explanations, embeddings
       — Chrome extension with independent OAuth and a side-panel UI
       — Stripe billing, tier quotas, Clerk auth, EN/JA i18n

   "WHAT IT CHANGED"
     One tight paragraph noting shipped outcomes without hype: six
     job-data sources unified; 50+ AU tech companies pulled directly
     from ATS endpoints; five Australian metro areas covered by the
     daily aggregation; bilingual UX on day one.

5. Disclosure (set as a small italic muted paragraph, max-w-[62ch],
   preceded by border-t pt-8 mt-16, label "A NOTE"):
     "Zepi Recruit is a product inside the Zepi talent hub at Cubic
     Innov8 Group. The source code is private; architecture and
     screenshots shown here are approved for public use."

6. Pager (at the very bottom, between border-t lines)
   Two inline links, muted, text-sm:
     ← Review 365               Capstone Warden →

Output as a Server Component. No cards, no filled buttons, no ASCII
diagram boxes — the writing is the content.
```

---

## Brief 4 — Case study: Review 365 (`slug="review365"`)

```
Same structural skeleton as Brief 3. Editorial long-form, max-w-3xl,
font-display for H1 and subsection headings, hairlines between sections.

Editorial header:
  Small label: "CASE STUDY · COO · 2024–"
  H1: "Review 365"
  Deck: "AI-assisted Google review collection for local businesses
  in Sydney's hospitality scene."

Metadata strip:
  ROLE      COO — sales, strategy, reporting
  PERIOD    2024 — present
  STATUS    Production
  CLIENTS   Withheld

Body subsections (same heading style as Brief 3):

  "THE PROBLEM"
    Local businesses — restaurants especially — know that written
    Google reviews move rankings and star-only reviews don't. Stores
    want the reviews; customers don't want to write them. Every
    serious operator eventually builds some ad hoc QR-code-and-pray
    system. Most of them stall.

  "THE APPROACH"
    Review 365 turns a short multiple-choice survey into an AI-drafted
    review the customer can read, edit if they want, and paste into
    Google. Beyond the product itself, the real work has been
    operational: a monthly client reporting process built around
    Fact / Interpretation / Recommendation, and a GTM motion focused
    on Sydney hospitality.

  A pull-quote block — large, font-display, italic, max-w-[48ch],
  text-3xl md:text-4xl, with a small muted caption underneath.
  No border, no card — just air above and below:
    "Ads rent attention. Reviews build trust."
    — Positioning line used in Review 365 sales

  "WHAT I DO HERE"
    A short continuous paragraph, then an unbulleted em-dash list:
      — B2B sales and pitching to Sydney restaurants and local shops
      — Google Business Profile audits and per-client local-SEO strategy
      — Monthly client report framework (growth + ranking + AI-search visibility + recommendations)
      — Semi-automated reporting pipeline (CSV + PDF + manual YAML → Claude draft → Notion)
      — Positioning and messaging

  "WHAT HAS CHANGED"
    A single tight paragraph: multiple Sydney hospitality clients
    onboarded; AI-search visibility improved to the point one client
    was featured in a ChatGPT-generated "top restaurants" list;
    monthly reporting operationalised with the operator kept in the
    loop rather than replaced.

Disclosure note (italic muted, preceded by border-t pt-8 mt-16, label "A NOTE"):
  "Review 365 is a product of Cubic Innov8 Group. Client names are
  withheld under confidentiality."

Pager:
  ← Zepi Recruit                 Capstone Warden →

Output as a Server Component.
```

---

## Brief 5 — Case study: Capstone Warden (`slug="capstone-warden"`)

```
Same skeleton as Brief 3. Tone: academic but accessible. This piece
should feel like a thesis proposal, not a product page.

Editorial header:
  Small label: "CASE STUDY · UTS RESEARCH · IN PROGRESS"
  H1: "Capstone Warden"
  Deck: "Detecting prompt injection by inspecting the reasoning
  trace of a language model — not only its final answer."

Metadata strip:
  ROLE       Researcher (UTS Capstone)
  PERIOD     2025 — 2026
  STATUS     In progress
  OUTPUTS    Thesis and write-up, 2026

Body subsections:

  "THE PROBLEM"
    Production LLM applications are routinely exposed to prompt-injection
    attacks — naive concatenation, ignore-previous, fake-completion,
    and combinations of the above. Output-only filters miss subtle
    compliance cases, where the model partially obeys an injected
    instruction while producing an answer that appears valid. The
    research question: can we detect attacks earlier and more
    reliably by inspecting chain-of-thought rather than output alone?

  "THE APPROACH"
    A pipeline where a victim LLM processes each prompt — attack or
    benign — and emits both an answer and a reasoning trace. A
    second model, the Warden, inspects both and produces a binary
    detection signal. Two Warden variants are compared: a rule-based
    implementation and an LLM-as-judge. The evaluation harness
    computes Attack Success Rate, True Positive Rate, and False
    Positive Rate across attack categories.

  "THE TAXONOMY" — followed by a minimalist two-column table
  (grid-cols-[10rem_1fr] gap-6, border-y py-6), each row one line:
     naive            Direct concatenation of an attack into context
     ignore_previous  "Ignore previous instructions and …"
     fake_completion  A fake assistant turn to coax task completion
     combined         Two or more of the above, composed
     benign           Legitimate input, used for false-positive testing

  "WHAT I'VE DONE"
    An em-dash list, same style as Brief 3:
      — Defined the experimental pipeline and attack taxonomy
      — Implemented rule-based and LLM-as-judge Warden variants
      — Wrote the evaluation harness (ASR / TPR / FPR)
      — Evaluation datasets: deepset/prompt-injections, BIPIA, plus hand-crafted attacks

  "WHAT COMES NEXT"
    One short paragraph: results are pending; the thesis and a
    public write-up are planned for 2026. Calibration work — on
    threshold selection and on reducing false positives in the
    LLM-as-judge variant — is the current focus.

Disclosure note (italic muted, border-t pt-8 mt-16, label "A NOTE"):
  "This research is ongoing at UTS. Methodology shown here is at the
  design stage. Results and conclusions will be published on
  completion."

Pager:
  ← Review 365                 (no next — this is the last entry)

Output as a Server Component.
```

---

## Brief 6 — About page (`app/about/page.tsx`)

```
Goal: A short, readable essay about the arc from HR to AI. Not a CV.
A reader should finish in under two minutes and understand why Zepi
Recruit is the thing I'm qualified to build.

Layout: max-w-3xl, single column.

Sections:

1. Small label: "ABOUT"
   H1 (font-display text-5xl md:text-6xl):
     "From the recruiter's chair <em class="italic font-normal">to the
     engineer's</em>."
   Japanese subcopy, text-base text-muted-foreground:
     "採用の現場にいた人間が、採用のためのソフトウェアを作る。"
   Lead paragraph (max-w-[62ch], text-lg, muted):
     "Five years in HR at a major Japanese enterprise. A Master's in
     Data Science at UTS. COO at Cubic Innov8. Founding engineer on
     an AI recruiting product. The through-line is obvious once you
     know it's there."

2. Hairline + small label: "THE ARC"
   A vertical timeline, but set editorially — no dots, no connectors.
   Each entry:
     - Years on the left (tabular-nums text-muted-foreground, 10ch)
     - Title (font-display text-2xl)
     - Org (text-sm text-muted-foreground)
     - One short paragraph (text-base, max-w-[62ch])
   Entries, in order:
     2017 — 2021   |  HR & Recruiting  |  Canon Marketing Japan, Tokyo
       "Five years in HR at a major Japanese enterprise — hiring
       operations, candidate management, the daily mechanics of how
       a company decides who to hire. The reason I'm useful in
       recruiting tech now."
     2024 — 2026   |  Master of Data Science and Innovation  |  UTS, Sydney
       "Pivoted into data and AI. Coursework across machine
       learning, data engineering (Airflow, dbt, Snowflake, GCP),
       visualisation, and an ongoing Capstone on LLM
       prompt-injection detection."
     2024 —        |  COO  |  Cubic Innov8, Sydney
       "Operations across a group of businesses — Zepi talent hub,
       Review 365 local-SEO, bilingual consulting, cross-border M&A,
       and a podcast on the side. Strategy, customer conversations,
       and AI-driven product work."
     2025 —        |  Founding Engineer  |  Zepi Recruit
       "Built an AI job-matching platform from zero as the founding
       engineer. Next.js, Supabase with pgvector, Claude, a Chrome
       extension on LinkedIn, Stripe billing. Target user: the
       Japanese speaker looking for work in Australia."

3. Hairline + small label: "HOW I WORK"
   Three short paragraphs (max-w-[62ch], text-lg):
     "I prefer writing software that reads well to software that
     demos well. A good codebase is quiet."
     "I default to the stack I can ship fastest on — Next.js,
     TypeScript, Python, Supabase, Claude — but I change tools
     whenever the problem asks me to."
     "I pay for the things I use. The obvious ones: Anthropic, Vercel,
     Supabase, Cursor, Linear, GitHub. Good tools are cheap."

4. Hairline + small label: "ELSEWHERE"
   A bare three-line list, no icons, inline text links:
       Email     sng1006.trade@gmail.com
       LinkedIn  linkedin.com/in/masaki-kawakami-563643354
       GitHub    github.com/masaki-kawa
   Laid out as a two-column grid (grid-cols-[8rem_1fr] gap-4).

Output as a Server Component. No contact form, no filled button, no
"Let's work together" block.
```

---

## Integration checklist (my side after you paste TSX)

For each generated TSX I receive, I will:
- Replace inline copy with imports from `@/content/profile.ts`,
  `@/content/projects.ts`, `@/content/site.ts` where reasonable
- Swap any `<img>` to `next/image` with correct `sizes`
- Ensure Server-Component compatibility (no `"use client"` unless truly needed)
- Wire metadata via `export const metadata`
- Commit in a single meaningful commit per brief

---

## Order of operations

1. Brief 1 (Home). Get the editorial direction right here first.
2. Brief 2 (Work index). Easy follow-up once the Home type lockup lands.
3. Briefs 3-5 (case studies). The dynamic `[slug]/page.tsx` will split
   into per-slug renderings once we know what variation is worth it.
4. Brief 6 (About).
5. /contact stays minimal — no brief needed.

Then: a polish pass (OG image in the same editorial type), sitemap,
Vercel deploy.
