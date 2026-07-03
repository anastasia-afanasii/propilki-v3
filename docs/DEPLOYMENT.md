# Deployment Guide

## Overview

PROPILKI is deployed as a static Vite SPA on **Vercel** with a custom domain, via Vercel's **native Git integration** (no workflow file in the repo).

| Item | Value |
|------|-------|
| Domain | propilki.online |
| Hosting | Vercel |
| CI/CD | Vercel Git integration (no GitHub Actions) |
| Production branch | main |

## How Deployment Works

1. Push a commit to `main` → Vercel auto-builds and deploys **production**.
2. Push to any other branch / open a PR → Vercel creates a **preview deployment** (unique URL).
3. Build: Vercel runs `npm install` + `npm run build` (Vite → `dist/`) and serves it on its edge CDN.

No secrets or workflow live in the repo — deploy config is in the Vercel project (Settings → Git, Build & Output, Domains, Node version).

## Local Development

```bash
npm install       # first time
npm run dev       # → http://localhost:8080/
npm run build     # production build → dist/
npm run preview   # preview the build locally
```

## SPA Routing on Vercel

Vercel serves static files directly; client-side routes need a rewrite:

```json
// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Any path (`/solo`, `/product/123`) is rewritten to `index.html` and React Router takes over. The old static-host SPA-redirect workaround was removed — unnecessary on Vercel.

## Environment

| Setting | Location | Value |
|---------|----------|-------|
| `base` | vite.config.ts | `"/"` (root — custom domain) |
| `BASE_URL` | `import.meta.env.BASE_URL` | injected by Vite at build time |
| Node version | Vercel Project Settings | default (recent LTS) — bump there if needed |
| Dev port | vite.config.ts | 8080 |

## Custom Domain

- `propilki.online` is attached in the Vercel project → Settings → Domains.
- DNS points at Vercel (per Vercel's records). Vercel provisions TLS + HSTS automatically.
- `base: "/"` in vite.config.ts (root domain).

## Custom Headers / CDN (available on Vercel)

Vercel supports a global CDN, HSTS, and custom response headers (the previous static host did not) — add them via `vercel.json` `headers` if an audit recommends security/cache headers.

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Images 404 | Check `base` in vite.config.ts is `"/"`; verify the file exists in `public/` |
| Routes 404 | Confirm the `vercel.json` rewrite is present (`/(.*)` → `/index.html`) |
| Stale content | Redeploy, or hard refresh (Cmd+Shift+R) |
| Build fails | Run `npm run build` locally first; check the Vercel build log |
| Dev port busy | `pkill -f vite` |
