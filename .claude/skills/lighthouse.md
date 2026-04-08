---
name: lighthouse
description: Manual Lighthouse-style audit — check Core Web Vitals factors without running a browser
user_invocable: true
---

Perform a code-level audit targeting Core Web Vitals:

1. **LCP (Largest Contentful Paint)**
   - Is the hero image preloaded or prioritized? (should NOT have `loading="lazy"`)
   - Are fonts loaded efficiently?
   - Is critical CSS inlined or loaded early?
   - Any render-blocking scripts in `<head>`?

2. **CLS (Cumulative Layout Shift)**
   - Do all images have explicit dimensions or `aspect-ratio`?
   - Are fonts causing FOUT/FOIT?
   - Any dynamic content injected above the fold?

3. **INP (Interaction to Next Paint)**
   - Any heavy synchronous operations on click handlers?
   - Are lists virtualized if long?
   - Event handlers properly debounced?

4. **Accessibility**
   - All images have alt text?
   - All buttons/links have accessible names?
   - Color contrast sufficient?
   - Keyboard navigation works?

5. **SEO**
   - Meta title and description present?
   - OG tags correct?
   - Semantic HTML (h1, h2, nav, main, footer)?

Report with pass/fail per item and fixes for failures.
