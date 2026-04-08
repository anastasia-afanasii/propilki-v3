---
name: docs
description: Generate or update technical documentation and changelogs
user_invocable: true
---

Generate or update project documentation. If an argument is provided, generate that specific doc. Otherwise, generate all.

Available docs:

1. **changelog** — Write/update `docs/CHANGELOG.md` with recent changes (check git log)
2. **architecture** — Generate `docs/ARCHITECTURE.md` with component tree, data flow, route map
3. **components** — Generate `docs/COMPONENTS.md` with props/types for each component
4. **deployment** — Generate `docs/DEPLOYMENT.md` with build, deploy, and environment setup
5. **all** — Generate all of the above

Always read the current state of the code before writing docs. Use tables and code blocks for clarity.
