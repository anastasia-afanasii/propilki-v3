---
name: palette
description: Analyze the project's color palette across all components and suggest improvements
user_invocable: true
---

Audit the entire project's color usage:

1. Read the `@theme` block in `src/index.css` for custom theme colors (Tailwind 4 — there is no `tailwind.config.ts`)
2. Search all `.tsx` files for color classes: `bg-*`, `text-*`, `border-*`, `from-*`, `to-*`, `ring-*`
3. Collect and group all unique colors used
4. Report:
   - Full palette table (color class → where it's used → how many times)
   - Inconsistencies (similar colors that should be unified)
   - Accessibility issues (low contrast text/background combos)
   - Missing semantic colors (no consistent accent, no consistent muted, etc.)
5. Suggest a unified palette with specific changes to the `@theme` block in `src/index.css` (note: the project is locked to a black/white/gray monochrome system — flag any off-palette colours rather than proposing new ones)
