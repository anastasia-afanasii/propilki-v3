---
name: deploy-check
description: Verify the project is ready to deploy to GitHub Pages
user_invocable: true
---

Run a full deployment readiness check:

1. **Build** — Run `npm run build` and check for errors
2. **Assets** — Verify all images in `src/data/*.json` exist in `public/`:
   - Read each JSON file, extract image paths
   - Check each path exists with `ls`
3. **Config** — Verify:
   - `base: "/"` in `vite.config.ts`
   - `BrowserRouter basename={import.meta.env.BASE_URL}` in `src/App.tsx`
   - `public/404.html` redirect works with current base
   - `.github/workflows/deploy.yml` exists and is valid
4. **Lint** — Run `npm run lint` and report issues

Output a clear READY / NOT READY verdict with details.
