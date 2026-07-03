---
name: propilki-status
description: Quick project health check — git status, lint, build, and open issues in one shot
user-invocable: true
---

Run a quick project health check:

1. **Git** — `git status` and `git log --oneline -5`; note commits ahead of `origin/main`.
2. **Lint** — `npx eslint --quiet src/ 2>&1` and report error/warning count.
3. **Build** — `npm run build 2>&1` and report pass/fail + main bundle size (gzip).
4. **TypeScript** — `npx tsc --noEmit 2>&1` and report any type errors.

Output a one-screen summary:
```
Git:   [branch] — [clean / N uncommitted] — [N ahead of origin]
Lint:  [N errors, N warnings]
Build: [pass/fail] — JS: X KB gz, CSS: X KB gz
Types: [pass / N errors]
```
