---
name: layout-audit
description: Audit a page's layout structure and suggest mobile-first responsive improvements
user_invocable: true
---

Audit the layout of a page or component. If no argument, ask which page.

Steps:

1. Read the target page and all components it imports
2. Map the layout tree:
   - Container widths (max-w-*)
   - Flex/grid structures
   - Breakpoint usage (sm:, md:, lg:, xl:)
   - Padding/margin at each level
   - Gap usage
3. Test mobile-first:
   - What does it look like with NO breakpoint prefix (mobile default)?
   - Are columns stacking properly?
   - Is text readable without zooming?
   - Are touch targets big enough (44px min)?
4. Report:
   - Layout diagram (text-based tree)
   - Issues found per breakpoint
   - Specific fixes with Tailwind classes
