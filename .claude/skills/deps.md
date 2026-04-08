---
name: deps
description: Audit dependencies — find unused, outdated, or vulnerable packages
user_invocable: true
---

Audit all project dependencies:

1. **Unused packages** — For each dependency in package.json, search if it's actually imported anywhere in src/:
   - `grep -r "from ['\"]<package>" src/` for each package
   - Report packages with zero imports

2. **Outdated** — Run `npm outdated` and show what can be updated

3. **Vulnerabilities** — Run `npm audit` and report issues

4. **Size impact** — Check the heaviest packages:
   - `du -sh node_modules/<package>` for the top dependencies

5. Report a table: package | used? | current | latest | size | issues
