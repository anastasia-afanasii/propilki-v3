---
name: status
description: Quick project health check — git status, lint, build, and open issues in one shot
user_invocable: true
---

Run a quick project health check:

1. **Git** — Run `git status` and `git log --oneline -5` to show current state
2. **Lint** — Run `npx eslint --quiet src/ 2>&1` and report error count
3. **Build** — Run `npm run build 2>&1` and report pass/fail + sizes
4. **TypeScript** — Run `npx tsc --noEmit 2>&1` and report any type errors

Output a one-screen summary:
```
Git: [branch] — [clean/N uncommitted changes]
Lint: [N errors, N warnings]
Build: [pass/fail] — JS: X KB, CSS: X KB
Types: [pass/N errors]
```
