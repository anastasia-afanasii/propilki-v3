# Deployment Guide

## Overview

PROPILKI is deployed as a static SPA on GitHub Pages with a custom domain.

| Item | Value |
|------|-------|
| Repository | TiredGarfield/propilki-v3 |
| Domain | propilki.online |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Branch | main |

## How Deployment Works

1. Push commit to `main` branch
2. GitHub Actions workflow triggers (`.github/workflows/deploy.yml`)
3. Workflow steps:
   - Checkout code
   - Setup Node.js 20
   - `npm ci` (install dependencies)
   - `npm run build` (Vite production build → `dist/`)
   - Upload `dist/` as GitHub Pages artifact
   - Deploy to GitHub Pages

## Local Development

```bash
# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
# → http://localhost:8080/

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Build Output

```
dist/
├── index.html          # Entry point
├── 404.html            # SPA routing fallback
├── assets/
│   ├── index-*.css     # ~55 KB (9 KB gzip)
│   └── index-*.js      # ~450 KB (137 KB gzip)
├── images/             # All product/content images
├── propilki_favicon.svg
├── solo_favicon.svg
├── propilki_logo.svg
├── solo_logo.svg
├── placeholder.svg
└── robots.txt
```

## Environment

| Setting | Location | Value |
|---------|----------|-------|
| `base` | vite.config.ts | `"/"` (root — required for custom domain) |
| `BASE_URL` | `import.meta.env.BASE_URL` | Injected by Vite at build time |
| Port | vite.config.ts | 8080 |

## SPA Routing on GitHub Pages

GitHub Pages doesn't support client-side routing natively. The workaround:

1. `public/404.html` catches all unknown routes
2. Redirects to `/?p=<encoded-path>&h=<hash>`
3. `App.tsx` IIFE decodes the `?p=` param and restores the URL via `history.replaceState`

**Important:** If you change the `base` URL, update `public/404.html` to match.

## Custom Domain Setup

1. In GitHub repo → Settings → Pages → Custom domain: `propilki.online`
2. DNS records point to GitHub Pages IPs
3. `base: "/"` in vite.config.ts (not `/propilki-v3/`)

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Images 404 on deploy | Check `base` in vite.config.ts matches deployment |
| Routes show 404 | Verify `public/404.html` redirect logic matches `base` |
| Stale content | Clear browser cache or hard refresh (Cmd+Shift+R) |
| Build fails | Run `npm run build` locally first to debug |
| Dev server port busy | Kill existing: `pkill -f vite` |
