# Changelog

## 2026-04-08 — Major Cleanup, Optimization & Modernization

### Removed
- **Lovable scaffolding** — removed `lovable-tagger` dependency and `componentTagger()` plugin from vite.config.ts
- **42 unused shadcn/ui components** — kept only accordion, button, badge, card, tooltip, sonner
- **31 unused Radix/library packages** — removed alongside unused UI components
- **Unused dependencies** — `@hookform/resolvers`, `date-fns`, `zod`, `cmdk`, `embla-carousel-react`, `react-hook-form`, `next-themes`, `recharts`, `react-resizable-panels`, `react-day-picker`, `vaul`, `input-otp`, `@radix-ui/react-toast` (and 20+ more Radix packages)
- **Dead files** — `Benefits.tsx` (never imported), `use-mobile.tsx` (unused hook), `ui/use-toast.ts` (redundant wrapper)
- **Old toast system** — removed Radix-based Toaster/toast/use-toast, kept Sonner only
- **Stale files** — `bun.lockb` (project uses npm), `postcss.config.js`, `tailwind.config.ts` (Tailwind 4 uses CSS config)
- **Old image copies** — deleted `public/images-propilki/` (14 MB) and `public/images-solo/` (55 MB), duplicates of images now in `public/images/`

### Added
- **CLAUDE.md** — project context for Claude Code sessions
- **Agents** — reviewer, deployer, designer, architect, optimizer, seo, docs
- **Skills** — /review, /build, /dev, /deploy-check, /redesign, /palette, /layout-audit, /optimize, /deps, /architecture, /lighthouse, /status, /validate, /seo, /docs
- **Hooks** — auto-lint on file edit, build validation before commit, PreCompact context preservation
- **Project memory** — persistent notes for future sessions
- **Shared components** — `SiteHeader`, `FAQAccordion`, `ReviewCarousel` (eliminated ~400 lines of duplication)
- **`ProductCard`** component — extracted from NailCatalog.tsx (310 → 251 lines)
- **Technical docs** — `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md`
- **Cursor pointer fix** — restored `cursor: pointer` on interactive elements (Tailwind 4 removed the default)

### Changed (Upgrades)
- **TypeScript** 5.6 → 6.0
- **React** 18.3 → 19.2
- **Vite** 5.4 → 6.4
- **Tailwind CSS** 3.4 → 4.2 (CSS-based config, Vite plugin, removed PostCSS)
- **ESLint** fixed version mismatch (eslint 9.39 + typescript-eslint 8.11)
- All `@radix-ui/*` packages updated to latest
- `@tanstack/react-query`, `sonner`, `tailwind-merge`, `postcss`, `autoprefixer` updated

### Fixed
- **Deprecated `baseUrl`** in tsconfig.app.json and tsconfig.json — removed (not needed with `paths`)
- **15 → 0 ESLint errors** — replaced all `as any` casts with proper TypeScript types across 9 files
- **Stale closure** in Testimonials.tsx useEffect — stabilized with `useCallback`
- **Missing `aria-label`** on Testimonials pagination dots and NailCatalog pagination buttons
- **Missing `loading="lazy"`** on 6 below-fold images (CelebrityWorks, Championships, Competitions, TipCreationProcess, ProductPage thumbnails)
- **Hero `loading="eager"`** — changed from "lazy" to "eager" on hero images (LCP improvement)
- **Unused `BookOpen` import** in FAQ.tsx
- **Legacy `addListener` fallback** in NailCatalog.tsx — replaced with modern `addEventListener`
- **Romanian comments** translated to English (Hero.tsx, AboutSection.tsx)
- **Redundant comments** removed (CourseCard.tsx, ProductPage.tsx)
- **Unused Card sub-exports** trimmed (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

### Security
- **10 → 0 vulnerabilities** — `npm audit fix` + Vite upgrade resolved all issues

### Performance
- **JS bundle** 1,172 KB → 450 KB (-62%)
- **CSS bundle** 78 KB → 55 KB (-30%)
- **JS gzip** 258 KB → 137 KB (-47%)
- **npm packages** 404 → ~260 (-35%)
- **node_modules** 173 MB (from ~300+ MB)
- **Images** removed 69 MB of old copies
