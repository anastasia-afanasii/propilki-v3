---
name: architecture
description: Map and analyze the full project architecture — component tree, data flow, file organization
user_invocable: true
---

Generate a complete architecture analysis:

1. **Component tree** — Read `src/App.tsx` and each page, trace the full component hierarchy:
   ```
   App
   ├── / → Index (OnlineCourses)
   │   ├── Header
   │   ├── HeroSection
   │   └── ...
   └── /solo → Solo
       ├── Header
       └── ...
   ```

2. **Data flow** — For each JSON file in `src/data/`, trace which pages load it and which components receive which fields

3. **Shared vs duplicated** — Find components, hooks, or utilities used by both sections (online-courses + nails). Flag any duplication

4. **File organization** — Check naming conventions, folder structure, file sizes. Flag files over 200 lines

5. **Dependency graph** — Which components import which? Any circular dependencies?

Output a clear architecture map with recommendations for improvement.
