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
| Deploy | Vercel (native Git integration) | — |
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
│   │   ├── Biography
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
| `SiteFooter` | nails/Footer, online-courses/Footer | Brand / nav / social footer |
| `CornerBadge` | nails/PackagingVisual, nails/Biography, online-courses/AboutSection | Absolute-positioned corner label badge |
| `SectionHeading` | 7 nails sections (NailCatalog, HowItWorks, Championships, …) | Centered heading + divider (`light`/`dark` tone) |

## Image Strategy

- All paths use `${import.meta.env.BASE_URL}` prefix
- Hero images: `loading="eager"` (LCP optimization)
- Below-fold images: `loading="lazy"`
- Images stored in `public/images/`
- JSON data references relative paths (e.g., `"images/hero.webp"`)

## Deployment

Hosted on **Vercel** via native Git integration (no workflow file in the repo).

1. Push to `main` → Vercel auto-builds (`npm run build`) and deploys production
2. Branches / PRs get **preview deployments**
3. Custom domain: propilki.online (base: "/")
4. SPA routing: `vercel.json` rewrite serves `index.html` for any path (`/(.*)` → `/index.html`); React Router handles the rest — no legacy SPA-redirect hack

## Directory Structure

```
src/
├── App.tsx                    # Root: providers, router, routes
├── main.tsx                   # React DOM entry point
├── index.css                  # Tailwind v4 theme, CSS variables, utilities
├── lib/utils.ts               # cn() helper (tailwind-merge + clsx)
├── lib/site.ts                # SITE constant (canonical / OG base URL)
├── hooks/                     # useDocumentTitle, useMetaDescription, useOpenGraph, useJsonLd, useCanonical, useSwipe
├── pages/                     # Route page components
├── components/
│   ├── SiteHeader.tsx         # Shared responsive header
│   ├── SiteFooter.tsx         # Shared footer (brand / nav / social)
│   ├── FAQAccordion.tsx       # Shared FAQ accordion
│   ├── ReviewCarousel.tsx     # Shared review/testimonial carousel
│   ├── SectionHeading.tsx     # Shared centered heading + divider
│   ├── CornerBadge.tsx        # Shared corner label badge
│   ├── VideoModal.tsx         # Tutorial video modal (self-hosted mp4)
│   ├── FaviconSwitcher.tsx    # Route-based favicon swap
│   ├── ScrollToHash.tsx       # Hash anchor scrolling
│   ├── nails/                 # SOLO section components
│   ├── online-courses/        # Courses section components
│   └── ui/                    # shadcn/ui primitives (accordion, button, badge, card)
└── data/                      # JSON content files
```
