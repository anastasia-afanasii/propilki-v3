# Component Reference

## Shared Components

### SiteHeader
Responsive navigation header used by both sections.

```tsx
<SiteHeader
  logoText="PROPILKI"
  logoTo="/"
  mobileAriaLabel="Open menu"
  links={[
    { to: "/#about", label: "About" },
    { to: "/solo", label: "Press-on Nails", highlight: true },
  ]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `logoText` | string | Brand name displayed in header |
| `logoTo` | string | Logo click destination route |
| `links` | NavLink[] | Navigation items |
| `mobileAriaLabel` | string? | Hamburger button aria-label |

NavLink: `{ to: string, label: string, highlight?: boolean }`

---

### FAQAccordion
Reusable accordion component with two visual variants.

```tsx
<FAQAccordion
  title="FAQ"
  items={[{ question: "...", answer: "..." }]}
  pill={{ icon: BookOpen, text: "FAQ" }}
  variant="themed"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | string? | Section anchor ID (default: "faq") |
| `title` | string | Section heading |
| `items` | { question, answer }[] | Q&A items |
| `pill` | { icon, text }? | Optional pill badge above title |
| `variant` | "neutral" \| "themed" | neutral = gray tones, themed = shadcn tokens |

---

### ReviewCarousel
Swipeable testimonial/review carousel with keyboard, touch, and auto-play.

```tsx
<ReviewCarousel
  id="testimonials"
  title="What clients say"
  items={["Review text...", { text: "Another..." }]}
  autoPlayMs={5000}
  variant="neutral"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | string? | Section anchor ID |
| `title` | string | Section heading |
| `subtitle` | string? | Subheading text |
| `items` | (string \| { text: string })[] | Review texts |
| `autoPlayMs` | number? | Auto-advance interval (undefined = no auto-play) |
| `pill` | { icon, text }? | Optional pill badge |
| `variant` | "neutral" \| "themed" | Visual variant |

---

### SiteFooter
Shared footer used by both `nails/Footer.tsx` and `online-courses/Footer.tsx`.

| Prop | Type | Description |
|------|------|-------------|
| `brandTitle` | string | Footer heading |
| `brandDescription` | string | Footer body text |
| `nav` | { label, to, highlight? }[] | Footer nav links |
| `copyright` | string | Copyright line |
| `navHeading` | string? | Nav column heading (default "Navigation") |
| `socials` | { instagram?, email? }? | Social links |

---

### SectionHeading
Centered section heading + divider, used across 7 nails sections.

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Heading text (renders `<h2>`) |
| `subtitle` | string? | Optional subheading |
| `tone` | "light" \| "dark" | Colour scheme (default "light") |
| `subtitleClassName` | string? | Classes for the subtitle |

---

### CornerBadge
Absolute-positioned corner label badge (e.g. "10+ Years / Experience").

| Prop | Type | Description |
|------|------|-------------|
| `line1` | string? | Top line |
| `line2` | string? | Bottom line |
| `side` | "left" \| "right" | Corner anchor (default "right") |
| `tone` | "solid" \| "glass" | Opaque dark vs translucent (default "solid") |
| `className` | string? | Extra container classes |
| `textClassName` | string? | Extra text classes |

---

## Page Components

### Index (Online Courses)
Route: `/` | File: `src/pages/Index.tsx`
Loads `propilki.json` and distributes sections to child components.

### Solo (SOLO Nails)
Route: `/solo` | File: `src/pages/Solo.tsx`
Loads `solo.json` and renders 11 content sections (Hero, NailCatalog, TipCreationProcess, HowItWorks, PackagingVisual, Championships, Competitions, CelebrityWorks, Biography, Testimonials, FAQ) plus Header/Footer.

### ProductPage
Route: `/product/:id` | File: `src/pages/ProductPage.tsx`
Loads product from `nailCatalog.json` by URL param. Shows image gallery + details.

### NotFound
Route: `*` | File: `src/pages/NotFound.tsx`
404 fallback with navigation back to home.

---

## Nails Section Components

| Component | Props source | Lines | Description |
|-----------|-------------|-------|-------------|
| Header | `solo.json → header` | 26 | Wrapper → SiteHeader |
| Hero | `solo.json → heroCarousel` | 92 | Image carousel with auto-play dots |
| NailCatalog | `solo.json → catalog` + `nailCatalog.json` | 251 | Filtered grid + pagination |
| ProductCard | NailProduct + badgeLabel | 86 | Product card with hover overlay |
| TipCreationProcess | `solo.json → tipCreationProcess` | 112 | 4-step process + highlight image |
| HowItWorks | `solo.json → howItWorks` | 109 | Application guide + PDF link + Watch-Tutorial video |
| VideoModal | `src`, `open`, `onClose`, `title?` | 52 | Modal player for the self-hosted tutorial mp4 (in `components/`) |
| PackagingVisual | `solo.json → packaging` | 85 | Package contents + image |
| Championships | `solo.json → championships` | 79 | Award showcase |
| Competitions | `solo.json → competitions` | 74 | Competition gallery |
| CelebrityWorks | `solo.json → celebrityWorks` | 119 | Image gallery + info bullets |
| Testimonials | `solo.json → testimonials` | 23 | Wrapper → ReviewCarousel |
| FAQ | `solo.json → faq` | 19 | Wrapper → FAQAccordion |
| Biography | `solo.json → biography` | 61 | Artist portrait + bio |
| Footer | `solo.json → footer` | 88 | Brand info + social links |

---

## Online Courses Section Components

| Component | Props source | Lines | Description |
|-----------|-------------|-------|-------------|
| Header | `propilki.json → header` | 24 | Wrapper → SiteHeader |
| HeroSection | `propilki.json → hero, stats` | 83 | Hero image + CTA + StatsGrid |
| StatsGrid | `propilki.json → stats` | 40 | 4-column stat counters with icons |
| AboutSection | `propilki.json → about` | 109 | Instructor bio with badge |
| CoursesSection | `propilki.json → courses` | 43 | Course card list |
| CourseCard | single course object | 89 | Course details + features + CTA |
| CourseFeatures | features string[] | 33 | Checkmark feature list |
| AdditionalLectures | lectures string[] | 31 | Expandable lecture list |
| ReviewsSection | `propilki.json → reviews` | 16 | Wrapper → ReviewCarousel |
| FAQSection | `propilki.json → faq` | 21 | Wrapper → FAQAccordion |
| Footer | hardcoded | 80 | Brand info + social links |

---

## UI Primitives (shadcn/ui)

| Component | File | Based on |
|-----------|------|----------|
| Accordion | ui/accordion.tsx | @radix-ui/react-accordion |
| Button | ui/button.tsx | class-variance-authority |
| Badge | ui/badge.tsx | class-variance-authority |
| Card | ui/card.tsx | div with cn() |
