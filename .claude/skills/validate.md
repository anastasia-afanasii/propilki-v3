---
name: validate
description: Validate JSON data files — check schema, image references, required fields match component expectations
user_invocable: true
---

Validate all JSON data files against what components actually expect:

1. **Read each JSON file** in `src/data/`:
   - `propilki.json` — used by Index.tsx → HeroSection, AboutSection, CoursesSection, ReviewsSection, FAQSection
   - `solo.json` — used by Solo.tsx → Header, Hero, NailCatalog, TipCreationProcess, HowItWorks, PackagingVisual, Championships, Competitions, CelebrityWorks, Testimonials, FAQ, Footer
   - `nailCatalog.json` — used by NailCatalog.tsx and ProductPage.tsx

2. **For each component**, read its Props type and verify the JSON provides all required fields. Report missing or mistyped fields.

3. **Verify image paths** — for every image path in the JSON files, check the file exists in `public/` using `ls`.

4. **Check for orphaned images** — list images in `public/images*/` that are NOT referenced by any JSON file.

5. Output:
   - Per-file validation: fields present/missing
   - Image paths: all found / missing list
   - Orphaned images: files not referenced anywhere
