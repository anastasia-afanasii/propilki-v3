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
3. Read `tailwind.config.ts` for the project's theme
4. Propose specific changes with before/after Tailwind classes
5. Show the user what will change and why
6. Apply changes after the user confirms

Design direction: clean, modern, elegant — appropriate for a beauty/nail business. Generous whitespace, soft shadows, rounded corners, clear typography hierarchy.
