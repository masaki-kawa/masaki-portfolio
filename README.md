# masaki-portfolio

Personal portfolio site for Masaki Kawakami. Next.js 16 App Router +
Tailwind CSS v4 + shadcn/ui, deployed on Vercel.

## Architecture

- **Routing:** `src/app/` (App Router). Dynamic case studies at
  `src/app/work/[slug]/page.tsx`.
- **Content registry:** `src/content/` — single source of truth for site
  metadata (`site.ts`), profile (`profile.ts`), and projects (`projects.ts`).
  Edit content here; pages pick it up automatically.
- **Layout:** `src/components/layout/` — `Navbar`, `Footer`, `Container`.
- **UI primitives:** `src/components/ui/` — shadcn/ui components only.
- **Styling:** Tailwind v4 with CSS variables in `src/app/globals.css`.
  Accent colour is indigo-600; base palette is white + slate.

## Working style

Page-level UI is designed in Claude Design (claude.ai) and integrated here.
See `docs/claude-design-briefs.md` for the per-page prompts that keep
generated UI consistent across the site.

## Commands

```bash
pnpm dev         # Turbopack dev server
pnpm build       # production build
pnpm lint        # eslint
```

## Deploy

Push to `main` → Vercel auto-deploys.

## Disclosures used on the site

- Zepi Recruit is a product inside the Zepi talent hub at Cubic Innov8
  Group. I contribute as founding engineer; source code is not public.
- Review 365 client names are withheld under confidentiality.
- Capstone Warden is in-progress UTS research; results are not yet public.
