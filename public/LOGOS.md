# Logo files to drop in

Marks sit transparent (no plate) in the top-right of each card. Drop a
PNG at the path below and it appears automatically; leave it out and it
stays clean (no broken image). Transparent background, trimmed tight,
roughly 2x display size for retina. Horizontal lockups sit best.

## Work cards — `public/work/logos/<slug>.png`

Work cards are **dark**, and the code forces each mark to **white**, so
**any version works** (black, colour, whatever): it renders as a clean
white silhouette. Colour is dropped for consistency; if you want a
mark to keep its brand colour, say so and I'll turn the filter off for
that slug and you provide a light-on-transparent version.

| file               | brand        | status  |
| ------------------ | ------------ | ------- |
| `cubic-innov8.png` | Cubic Innov8 | needed  |
| `vai-studio.png`   | VAI Studio   | needed  |
| `review365.png`    | Review365    | needed  |
| `vacanti-ai.png`   | Vacanti AI   | placed  |
| `kodoku.png`       | Kodoku       | needed  |

## Community cards — `public/community/<slug>.png`

Community cards are **light** and keep the logo's own colour, so use a
**dark or full-colour** version here.

| file           | brand           | status |
| -------------- | --------------- | ------ |
| `zepi.png`     | Zepi            | placed |
| `ai-salon.png` | AI Salon Sydney | needed |

## In the repos already (can be pulled in)

- VAI: `vai-motion/public/assets/vai-logo-wordmark.png` (black, fits the tile)
- Vacanti: `vacanti-ai-web/public/logo/vacanti-logo-dark-h.png` (dark)
- Zepi: `vacanti-ai-web/public/logo/zepi-logo-dark-h.png` (already used)

## Detail-page screenshots (separate)

The `/work/<slug>` detail pages show a screenshot from
`public/work/<slug>.png` (plus optional `<slug>.mp4`). Same slugs, plus
research: `warden`, `draft-prediction`, `weather-api`, `cloud-elt`,
`image-captioning`, `rental-regression`.
