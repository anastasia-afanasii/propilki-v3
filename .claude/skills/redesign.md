---
name: redesign
description: Redesign a component or page — analyzes current design and applies modern improvements
user_invocable: true
---

Redesign the specified component or page. If no argument given, ask which page or component to redesign.

Steps:

1. Find and read the target component/page file
2. Analyze current design:
   - Layout structure (flex/grid)
   - Colors, typography, spacing
   - Responsive breakpoints
   - Shadows, borders, animations
3. Read the `@theme` block in `src/index.css` for the project's theme (Tailwind 4 — there is no `tailwind.config.ts`)
4. Propose specific changes with before/after Tailwind classes
5. Show the user what will change and why
6. Apply changes after the user confirms

Design direction: minimalist, **black/white/gray only — never introduce other colours**. Single Inter font, generous whitespace, sharp/minimal corners (the project uses `rounded-none` widely), capped image heights, clear typography hierarchy. Match the existing locked monochrome system.
