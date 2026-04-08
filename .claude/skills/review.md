---
name: review
description: Review staged or recent code changes for quality and deployment safety
user_invocable: true
---

Review the current code changes in this project. Follow these steps:

1. Run `git diff --cached` to see staged changes. If nothing is staged, run `git diff` for unstaged changes. If no changes at all, run `git diff HEAD~1` for the last commit.

2. For each changed file, check:
   - Image paths use `${import.meta.env.BASE_URL}` prefix
   - TypeScript correctness (no type errors)
   - Tailwind responsive classes for mobile
   - No hardcoded URLs (except OG meta tags)
   - Components follow existing patterns in the codebase

3. Run `npx eslint --quiet` on changed `.ts`/`.tsx` files

4. Output a concise review:
   - 🔴 Must fix (blocks deploy)
   - 🟡 Should fix (quality issues)
   - 🟢 Looks good (what's clean)
