# Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2 |
| Language | TypeScript | 6.0 |
| Build | Vite | 6.4 |
| Styling | Tailwind CSS | 4.2 |
| UI Library | shadcn/ui (Radix primitives) | — |
| Routing | react-router-dom | 6.30 |
| State | @tanstack/react-query | 5.96 |
| Toast | Sonner | 1.7 |
| Deploy | GitHub Pages + GitHub Actions | — |
| Domain | propilki.online | — |

## Route Map

```
/                → Index.tsx      → Online Courses homepage
/solo            → Solo.tsx       → SOLO nail catalog
/product/:id     → ProductPage.tsx → Individual product detail
*                → NotFound.tsx   → 404 fallback
```

## Component Tree

```
App.tsx
├── TooltipProvider
├── Toaster (Sonner)
├── BrowserRouter (basename = import.meta.env.BASE_URL)
│   ├── FaviconSwitcher (swaps favicon per route)
│   ├── ScrollToHash (scroll-to-anchor on navigation)
│   │
│   ├── "/" → Index (Online Courses)
│   │   ├── Header → SiteHeader (shared)
│   │   ├── HeroSection
│   │   │   └── StatsGrid
│   │   ├── AboutSection
│   │   ├── CoursesSection
│   │   │   └── CourseCard
│   │   │       ├── CourseFeatures
│   │   │       └── AdditionalLectures
│   │   ├── ReviewsSection → ReviewCarousel (shared)
│   │   ├── FAQSection → FAQAccordion (shared)
│   │   └── Footer
│   │
│   ├── "/solo" → Solo
│   │   ├── Header → SiteHeader (shared)
│   │   ├── Hero (carousel)
│   │   ├── NailCatalog
│   │   │   └── ProductCard
│   │   ├── TipCreationProcess
│   │   ├── HowItWorks
│   │   ├── PackagingVisual
│   │   ├── Championships
│   │   ├── Competitions
│   │   ├── CelebrityWorks
│   │   ├── Testimonials → ReviewCarousel (shared)
│   │   ├── FAQ → FAQAccordion (shared)
│   │   └── Footer
│   │
│   └── "/product/:id" → ProductPage
│       ├── Header → SiteHeader (shared)
│       └── Footer
```

## Data Flow

All content is JSON-driven — no backend, no API calls.

```
src/data/propilki.json  → Index.tsx → distributes to child components via props
src/data/solo.json      → Solo.tsx  → distributes to child components via props
src/data/nailCatalog.json → NailCatalog.tsx, ProductPage.tsx → product listing & detail
```

## Shared Components

| Component | Used by | Purpose |
|-----------|---------|---------|
| `SiteHeader` | nails/Header, online-courses/Header | Responsive nav with configurable links |
| `FAQAccordion` | nails/FAQ, online-courses/FAQSection | Accordion with neutral/themed variants |
| `ReviewCarousel` | nails/Testimonials, online-courses/ReviewsSection | Swipeable carousel with auto-play |

## Image Strategy

- All paths use `${import.meta.env.BASE_URL}` prefix
- Hero images: `loading="eager"` (LCP optimization)
- Below-fold images: `loading="lazy"`
- Images stored in `public/images/`
- JSON data references relative paths (e.g., `"images/hero.jpeg"`)

## Deployment

1. Push to `main` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. `npm ci` → `npm run build` → upload `dist/` to GitHub Pages
4. Custom domain: propilki.online (base: "/")
5. SPA routing: `public/404.html` redirects to `/?p=<encoded-path>`

## Directory Structure

```
src/
├── App.tsx                    # Root: providers, router, routes
├── main.tsx                   # React DOM entry point
├── index.css                  # Tailwind v4 theme, CSS variables, utilities
├── lib/utils.ts               # cn() helper (tailwind-merge + clsx)
├── pages/                     # Route page components
├── components/
│   ├── SiteHeader.tsx         # Shared responsive header
│   ├── FAQAccordion.tsx       # Shared FAQ accordion
│   ├── ReviewCarousel.tsx     # Shared review/testimonial carousel
│   ├── FaviconSwitcher.tsx    # Route-based favicon swap
│   ├── ScrollToHash.tsx       # Hash anchor scrolling
│   ├── nails/                 # SOLO section components
│   ├── online-courses/        # Courses section components
│   └── ui/                    # shadcn/ui primitives (accordion, button, badge, card, tooltip, sonner)
└── data/                      # JSON content files
```
