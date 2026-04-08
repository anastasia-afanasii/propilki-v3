---
name: seo
description: Run a full SEO audit or fix specific SEO issues — meta tags, headings, images, structured data, keywords
user_invocable: true
---

Run a full SEO audit and fix issues. If an argument is given (e.g., `/seo fix`, `/seo audit`, `/seo images`), focus on that area.

## Full audit steps:

1. **Meta tags** — Read `index.html`, check title (keywords, <60 chars), description (150-220 chars), canonical, OG tags, Twitter cards, favicon (.ico + SVG)

2. **Headings** — For each page (Index, Solo, ProductPage, NotFound):
   - Grep for `<h1`, `<h2`, `<h3` in the page and all its child components
   - Verify exactly 1 h1, proper hierarchy

3. **Images** — For every `<img>` in src/:
   - Has `alt` attribute?
   - Has `width` and `height`?
   - Has `loading="lazy"` (or "eager" for hero)?
   - Source file is WebP (not JPEG/PNG)?
   - File size under 500KB?

4. **Semantic HTML** — Check every page has `<main>`, `<nav>`, `<footer>`

5. **SPA SEO** — Verify:
   - useDocumentTitle used in every page
   - useCanonical used in App.tsx
   - public/404.html is proper error page with SPA redirect
   - sitemap.xml lists all routes
   - robots.txt references sitemap

6. **Keywords** — Check top keywords appear in title, description, h1, h2:
   - Homepage: nail, courses, manicure, propilki
   - Solo: press-on, nails, handcrafted, solo

7. **Structured data** — Check JSON-LD in index.html

8. **Performance** — Run `npm run build`, check bundle sizes

**Do NOT flag:** CDN (GitHub Pages limitation), HSTS (server-side), render-blocking CSS (SPA inherent), backlinks (manual work).

Report with pass/fail per item. Fix all fixable issues automatically, then commit if asked.
