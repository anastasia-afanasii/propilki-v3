# PROPILKI v3

## Project Overview
React + Vite + TypeScript SPA for a nail design business (PROPILKI). Online courses landing page and SOLO nail catalog with product detail pages. Deployed on GitHub Pages at propilki.online.

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 6 (SWC plugin + Tailwind v4 plugin)
- **Styling:** Tailwind CSS 4 + shadcn/ui (accordion, badge, button, card)
- **Routing:** react-router-dom v6 (BrowserRouter)
- **State:** local React state (JSON-driven content, no external state library)
- **Data:** JSON-driven content (no backend)

## Project Structure
```
src/
  pages/              # Index (courses), Solo (nails), ProductPage, NotFound
  components/
    SiteHeader.tsx    # Shared responsive nav (configurable links)
    FAQAccordion.tsx  # Shared FAQ component (neutral/themed variants)
    ReviewCarousel.tsx # Shared carousel (auto-play, swipe, keyboard)
    FaviconSwitcher.tsx
    ScrollToHash.tsx
    nails/            # SOLO section: Header, Hero, NailCatalog, ProductCard, etc.
    online-courses/   # Courses section: Header, HeroSection, CourseCard, etc.
    ui/               # shadcn/ui: accordion, badge, button, card
  data/               # propilki.json, solo.json, nailCatalog.json
  lib/utils.ts        # cn() helper
public/images/        # All product and content images
docs/                 # ARCHITECTURE, CHANGELOG, COMPONENTS, DEPLOYMENT, PRODUCT
.claude/
  agents/             # 7 specialists: reviewer, deployer, designer, architect, optimizer, seo, docs
  skills/             # each as <name>/SKILL.md: orchestrate, validate, status, log-session, recall
  commands/           # /housekeeping
  settings.json        # Tracked perms (deny guardrails) + hooks
  settings.local.json  # Local perm overrides (gitignored)
```

## Routes
- `/` — Online Courses (homepage)
- `/solo` — SOLO nail catalog
- `/product/:id` — Product detail page
- `*` — 404 fallback

## Commands
- `npm run dev` — Dev server on port 8080
- `npm run build` — Production build to dist/
- `npm run preview` — Preview production build
- `npm run lint` — ESLint

## Architecture
- **JSON-driven content** — all data in `src/data/*.json`, no API
- **Image paths** use `${import.meta.env.BASE_URL}` prefix everywhere
- **Shared components** — SiteHeader, FAQAccordion, ReviewCarousel eliminate duplication
- **SPA routing on GitHub Pages** — 404.html redirect + `?p=` query param
- **`base: "/"`** in vite.config.ts for custom domain
- **Tailwind 4** — CSS-based config in index.css, Vite plugin (no PostCSS)
- **Path alias** `@/` maps to `src/`

## Code Review Checklist
- [ ] Image paths use `${import.meta.env.BASE_URL}` prefix (via `assetUrl()`)
- [ ] New routes added to `App.tsx` only — `public/404.html` is a generic `?p=` catch-all, no per-route edit needed
- [ ] JSON data changes match component Props types / `src/types/catalog.ts`
- [ ] No hardcoded URLs (except OG meta tags)
- [ ] Mobile responsive (sm:, md:, lg: prefixes)
- [ ] No `as any` — proper TypeScript types
- [ ] Images: WebP + `-640.webp` srcset (via `imgSrcSet()`), alt text, hero=eager, below-fold=lazy
- [ ] Buttons: aria-labels on icon-only buttons
- [ ] New shared logic → shared component, not duplication

## Common Pitfalls
- **`base` in vite.config.ts** affects all image paths, routing, 404 redirect
- **404.html** is a generic `?p=` catch-all — keep in sync with `base` URL only, not per-route
- **OG meta tags** in index.html hardcoded to propilki.online
- **JSON schema changes** must match component Props types
- **Tailwind 4** — no tailwind.config.ts, config lives in index.css `@theme` block
- **cursor: pointer** must be set explicitly (Tailwind 4 removed the default)

## Locked Design System
Single source of truth — agents/skills must enforce this, not restate their own copy.
- **Colours:** black / white / gray ONLY. Never introduce other colours (product colour *swatches* in catalog data are the only exception).
- **Typography:** single Inter font; hierarchy via size/weight contrast.
- **Corners:** sharp/minimal — `rounded-none` widely; avoid large radii.
- **Shadows:** soft and sparing (`shadow-sm`, occasional `shadow-md`).
- **Spacing:** generous whitespace. **Animations:** subtle (`hover:scale-105`, `transition-all`).
- **Style:** minimalist/understated, not decorative.

## Platform Constraints (not code-fixable — don't flag as bugs)
- **CDN / HSTS / custom headers** — GitHub Pages doesn't allow them.
- **Render-blocking CSS** — inherent to a Vite SPA; CSS is tiny (~10KB gz).
- **Backlinks** — external SEO, not code.
- **Vite major upgrade** — local Node is v22 (upgrade possible), but `.github/workflows/deploy.yml` pins Node 20, so the Vite 6 cap holds for CI/deploy until that Node is bumped. Not an "easy win".
- **Images:** strict **WebP** (no AVIF), ≤1600px, with a `-640.webp` srcset companion.

## Tooling Cadence (`.claude/`)
| When | Run |
|------|-----|
| Before every push / deploy | `/orchestrate` (pre-deploy GO/NO-GO gate) |
| Weekly / after a big batch | `/housekeeping` (structure + hygiene) |
| After catalog / JSON edits | `/validate` |
| End of a substantive session | `/log-session` (persist findings to memory) |

- **`/orchestrate`** owns code / SEO / deploy review (invokes the 7 agents). **`/housekeeping`** owns structure, `.claude` currency, docs, orphans/weight. They do not overlap. Diff-level bug review → `/orchestrate reviewer`.
- **Report-only by default.** Agents that can edit (`seo`, `optimizer`, `designer`, `docs`) apply fixes only when explicitly asked — never silently during a gate. Persist surviving findings via `/log-session`.
