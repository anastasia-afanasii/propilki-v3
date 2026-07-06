# PROPILKI

PROPILKI is a React + Vite single-page application with two main sections:

- Online Courses (main landing page)
- SOLO Press-On Nails (product-focused catalog)

The project is fully JSON-driven and deployed on Vercel as an SPA at
[propilki.online](https://propilki.online).

## Tech Stack

- React 19 + TypeScript
- Vite 6 (SWC + Tailwind v4 plugins)
- React Router v6 (BrowserRouter)
- Tailwind CSS v4 (CSS-based config in `src/index.css`, no `tailwind.config.ts`)
- shadcn/ui (accordion, badge, button, card)
- Lucide Icons
- Vercel Web Analytics (`@vercel/analytics`)

## Pages & Routes

- `/` – Online Courses
- `/solo` – SOLO press-on nails catalog
- `/product/:id` – Product detail page
- `*` – 404 fallback

## Architecture

- Content stored in `src/data/*.json` (no backend, no API)
- No hardcoded images in components; paths resolved via `assetUrl()` +
  `import.meta.env.BASE_URL`
- Images are WebP with responsive `srcset` (`foo.webp` + `foo-640.webp`)
- Separate component systems: `components/nails`, `components/online-courses`,
  plus shared components (`SiteHeader`, `SiteFooter`, `ReviewCarousel`, …)

## Routing & Hosting

- BrowserRouter with `basename`
- `base: "/"` in `vite.config.ts` for the custom domain
- SPA deep links handled by Vercel's `vercel.json` rewrite (`/(.*)` → `/index.html`)
- Hash-based scrolling handled via `ScrollToHash`
- Deployed on Vercel via native Git integration — push to `main` auto-deploys production; branches/PRs get preview deployments

## Development

```bash
npm install      # install dependencies
npm run dev      # dev server on http://localhost:8080
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # ESLint
```
