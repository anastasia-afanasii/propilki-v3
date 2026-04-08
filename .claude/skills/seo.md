---
name: seo
description: Run a full SEO audit — meta tags, OG, semantic HTML, robots.txt, structured data suggestions
user_invocable: true
---

Run a full SEO audit:

1. **Read `index.html`** — Check title, meta description, OG tags, twitter cards, favicon, canonical URL
2. **Read `public/robots.txt`** — Verify it allows crawling
3. **Read `public/404.html`** — Check SPA redirect preserves SEO
4. **Read each page component** (Index.tsx, Solo.tsx, ProductPage.tsx) — Check:
   - One `<h1>` per page
   - Heading hierarchy (h1→h2→h3)
   - Semantic landmarks (`<section>`, `<nav>`, `<footer>`)
   - All images have alt text
5. **Check for missing SEO elements:**
   - No `<link rel="canonical">`?
   - No per-route `<title>` changes?
   - No JSON-LD structured data?
   - No sitemap.xml?

Report with pass/fail per item and specific fixes.
