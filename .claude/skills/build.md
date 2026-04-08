---
name: build
description: Run production build and report results clearly
user_invocable: true
---

Run the production build and report results:

1. Run `npm run build`
2. If it succeeds, report:
   - Bundle sizes (JS, CSS)
   - Any warnings (chunk size, deprecations)
   - Build time
3. If it fails, show the error clearly and suggest a fix
