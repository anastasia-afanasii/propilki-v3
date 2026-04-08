---
name: optimize
description: Analyze and optimize performance — bundle size, images, lazy loading, re-renders
user_invocable: true
---

Run a full performance optimization pass:

1. **Bundle** — Run `npm run build`, report sizes. Check for heavy imports:
   - `grep -r "import \*" src/` for wildcard imports
   - Check if routes could be lazy-loaded with `React.lazy()`

2. **Images** — Check all images in public/:
   - `find public/ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) -exec ls -lh {} \;`
   - Flag any over 500KB
   - Check all `<img>` tags have `loading="lazy"` (except hero/above-fold)

3. **Runtime** — Search for common perf issues:
   - Inline objects in JSX: `style={{` or `className={[` patterns
   - Missing memoization on filtered/mapped arrays
   - useEffect with wrong deps

4. Report findings with specific file:line references and fix the quick wins automatically.
