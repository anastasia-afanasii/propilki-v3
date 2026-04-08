# PROPILKI v3

## Project Overview
React + Vite + TypeScript SPA for a nail design business (PROPILKI). Online courses landing page and SOLO nail catalog with product detail pages. Deployed on GitHub Pages at propilki.online.

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 6 (SWC plugin + Tailwind v4 plugin)
- **Styling:** Tailwind CSS 4 + shadcn/ui (accordion, button, badge, card, tooltip, sonner)
- **Routing:** react-router-dom v6 (BrowserRouter)
- **State:** @tanstack/react-query
- **Toast:** Sonner
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
    ui/               # shadcn/ui: accordion, button, badge, card, tooltip, sonner
  data/               # propilki.json, solo.json, nailCatalog.json
  lib/utils.ts        # cn() helper
public/images/        # All product and content images
docs/                 # ARCHITECTURE.md, CHANGELOG.md
.claude/
  agents/             # reviewer, deployer, designer, architect, optimizer, seo, docs
  skills/             # /review, /build, /dev, /deploy-check, /optimize, /seo, /docs, etc.
  settings.local.json # Hooks and permissions (gitignored)
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
- [ ] Image paths use `${import.meta.env.BASE_URL}` prefix
- [ ] New routes added to both App.tsx and public/404.html
- [ ] JSON data changes match component Props types
- [ ] No hardcoded URLs (except OG meta tags)
- [ ] Mobile responsive (sm:, md:, lg: prefixes)
- [ ] No `as any` — proper TypeScript types
- [ ] Images: alt text, hero=eager, below-fold=lazy
- [ ] Buttons: aria-labels on icon-only buttons
- [ ] New shared logic → shared component, not duplication

## Common Pitfalls
- **`base` in vite.config.ts** affects all image paths, routing, 404 redirect
- **404.html** must stay in sync with base URL
- **OG meta tags** in index.html hardcoded to propilki.online
- **JSON schema changes** must match component Props types
- **Tailwind 4** — no tailwind.config.ts, config lives in index.css `@theme` block
- **cursor: pointer** must be set explicitly (Tailwind 4 removed the default)
