# Product Documentation

## Overview

PROPILKI is a web platform for a professional nail artist business with two main sections:

1. **Online Courses** (`/`) — Nail education courses (online + offline)
2. **SOLO Press-On Nails** (`/solo`) — Handcrafted press-on nail catalog with product detail pages

**Live URL:** https://propilki.online

---

## Pages

### Homepage — Online Courses (`/`)

The courses landing page showcases nail education offerings.

**Sections (in order):**
| Section | Component | Data source |
|---------|-----------|-------------|
| Header | Header → SiteHeader | `propilki.json → header` |
| Hero + Stats | HeroSection + StatsGrid | `propilki.json → hero, stats` |
| About the Instructor | AboutSection | `propilki.json → about` |
| Course Catalog | CoursesSection + CourseCard | `propilki.json → coursesSection, courses` |
| Student Reviews | ReviewsSection → ReviewCarousel | `propilki.json → reviews` |
| FAQ | FAQSection → FAQAccordion | `propilki.json → faq` |
| Footer | Footer | hardcoded |

**Courses offered (3):**
1. Online course (Udemy link) — Dry file manicure technique
2. Offline course — Filing mastery (€200)
3. Offline course — Self-master training (€400)

**Stats displayed:** 2,000+ students, 4.9★ rating, 95% success rate, 24/7 support

---

### SOLO Nail Catalog (`/solo`)

The press-on nails showcase and product catalog.

**Sections (in order):**
| Section | Component | Data source |
|---------|-----------|-------------|
| Header | Header → SiteHeader | `solo.json → header` |
| Hero Carousel | Hero | `solo.json → heroCarousel` (4 slides, 4s auto-play) |
| Product Catalog | NailCatalog + ProductCard | `nailCatalog.json → products` |
| How Tips Are Made | TipCreationProcess | `solo.json → tipCreationProcess` |
| How It Works | HowItWorks | `solo.json → howItWorks` |
| Packaging | PackagingVisual | `solo.json → packaging` |
| Championships | Championships | `solo.json → championships` |
| Competitions | Competitions | `solo.json → competitions` |
| Celebrity Works | CelebrityWorks | `solo.json → celebrityWorks` |
| Testimonials | Testimonials → ReviewCarousel | `solo.json → testimonials` (9 reviews, 5s auto-play) |
| FAQ | FAQ → FAQAccordion | `solo.json → faq` (6 Q&As) |
| Footer | Footer | `solo.json → footer` |

---

### Product Detail (`/product/:id`)

Individual product page with image gallery, details, and order button.

**Features:**
- Swipeable image gallery (keyboard + touch + mouse)
- Thumbnail strip navigation
- Product details: name, price, category, length, colors, availability
- "Order now" button → Instagram DM

---

## Product Catalog

**26 products** across 4 categories:

| Category | Count | Price | Lengths |
|----------|-------|-------|---------|
| Art Press-Ons | 7 | €80 | Short, Medium, Long |
| 3D Designs | 11 | €60 | Short, Medium, Long |
| Korean-Inspired Trends | 5 | €50 | Short, Medium |
| Monochrome Elegance | 6 | €30 | Short, Medium |

**Catalog features:**
- Category filter tabs
- Responsive grid (1-4 columns)
- Pagination (2 items/page mobile, 8 desktop)
- Hover-to-reveal "View Details" button

---

## Content Management

All content is managed through JSON files — no CMS or database required.

### propilki.json
Controls the Online Courses page.
| Key | Controls |
|-----|----------|
| `header` | Mobile menu aria label |
| `hero` | Hero section: title, description, CTA, image |
| `stats` | 4 stat counters with icons |
| `about` | Instructor bio, image, badge, social proof |
| `coursesSection` | Section header (pill + title) |
| `courses` | Array of 3 course cards with features, prices, links |
| `reviews` | 3 student review texts |
| `faq` | 5 Q&A items |

### solo.json
Controls the SOLO nails page.
| Key | Controls |
|-----|----------|
| `header` | Logo text, mobile aria label |
| `heroCarousel` | 4 hero slides with auto-play timing |
| `catalog` | Section header, category order, badge label |
| `tipCreationProcess` | 4 creation steps + highlight image |
| `howItWorks` | 4 application steps + help card |
| `packaging` | Package contents list + image |
| `championships` | Award section with items |
| `competitions` | Event details with images |
| `celebrityWorks` | Gallery with 6 images + bullet points |
| `testimonials` | 9 review texts with auto-play timing |
| `faq` | 6 Q&A items |
| `footer` | Brand text, copyright |

### nailCatalog.json
Product database.
| Field | Type | Example |
|-------|------|---------|
| `id` | number | 101 |
| `name` | string | "Floral Fantasy" |
| `price` | string | "€80" |
| `category` | string | "Art Press-Ons" |
| `images` | string[] | ["images/nails/nails-art/art-1-1.webp"] |
| `colors` | string[] | ["Mixed"] |
| `length` | string | "Medium" |

---

## External Links

| Destination | Where used |
|-------------|-----------|
| Udemy course | CourseCard (online course CTA) |
| Instagram @propilki.moldova | Online courses Footer |
| Instagram @solo.lo_nails | SOLO Footer, ProductPage "Order now" |

---

## SEO

| Tag | Value |
|-----|-------|
| Title | PROPILKI |
| Description | Professional nail design, press-on nails and nail education by PROPILKI. |
| OG Image | https://propilki.online/propilki_logo.svg |
| OG URL | https://propilki.online |
| Twitter Card | summary_large_image |
| Favicon | Swaps between propilki/solo based on route |
