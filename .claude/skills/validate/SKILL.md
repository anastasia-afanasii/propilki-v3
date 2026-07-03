---
name: validate
description: Validate JSON data files — check schema, image references, required fields match component expectations
user-invocable: true
---

Validate all JSON data files against what components actually expect:

1. **Read each JSON file** in `src/data/`:
   - `propilki.json` — used by Index.tsx → HeroSection, AboutSection, CoursesSection, ReviewsSection, FAQSection
   - `solo.json` — used by Solo.tsx and its nails sections (Header, Hero, NailCatalog, HowItWorks, PackagingVisual, Championships, Competitions, CelebrityWorks, Testimonials, FAQ, Footer)
   - `nailCatalog.json` — used by NailCatalog.tsx and ProductPage.tsx (products conform to `src/types/catalog.ts`)

2. **For each component**, read its Props type and verify the JSON provides all required fields. Report missing or mistyped fields.

3. **Verify image paths** — for every image path in the JSON files, check the file exists in `public/`. Every referenced `foo.webp` should also have its `foo-640.webp` srcset companion (missing companion breaks srcset).

4. **Check for orphaned images** — list files in `public/images/` NOT referenced by any JSON file or component (exclude the `-640.webp` companions, which are referenced via the `imgSrcSet()` convention). Candidates to move to `public/images/unused/` — never delete without confirming.

5. Output:
   - Per-file validation: fields present/missing
   - Image paths: all found / missing list; missing `-640` companions
   - Orphaned images: files not referenced anywhere
