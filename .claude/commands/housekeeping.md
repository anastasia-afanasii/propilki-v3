---
description: Periodic repo health review for PROPILKI — structure/layout, .claude setup currency, dead code + unused deps, image weight, catalog-data integrity, and deploy/CI hygiene. Report first; fix only with approval. Run weekly or after a big batch.
argument-hint: <optional focus: structure | code | images | catalog | ops | full>
allowed-tools: Agent, Read, Bash, Glob, Grep, Edit, AskUserQuestion
---

Periodic health review of the WHOLE repo — structure and hygiene, not feature work. Focus: $ARGUMENTS

**Boundaries:** this audits STRUCTURE + HYGIENE. Diff-scoped bug review is `/orchestrate reviewer`'s job; a full pre-deploy gate is `/orchestrate`. **Report first; apply only approved fixes; never delete image files without confirming** (convention: move non-fitting images to `public/images/unused/`, don't delete).

## Phase 1 — parallel audit (spawn general-purpose / Explore agents, one per lane, in a single message)

**Lane A — structure & .claude setup:**
- Root: stray files/dirs vs CLAUDE.md's documented layout; oversized files (`find . -size +5M -not -path './node_modules/*' -not -path './.git/*' -not -path './dist/*'`); gitignored bloat sitting in the tree (e.g. a raw image dump inside `src/` — kills the build via Tailwind's source scan).
- `.claude/`: does each agent / skill / memory file still match CURRENT practice? Stale references to renamed/removed files (e.g. `tailwind.config.ts` — TW4 has none); memory entries contradicting newer decisions. CLAUDE.md skills/agents list matches what's actually in `.claude/`.
- Docs: `docs/ARCHITECTURE.md` + `docs/CHANGELOG.md` present and not wildly stale.

**Lane B — code health (smells, not deep audit):**
- Dead code: exported-but-unreferenced components in `src/` (spot-check with grep).
- Unused deps: compare `package.json` deps vs actual imports; `npm outdated` + `npm audit` highlights. Note platform caps (Vite 6 max on Node 20) before flagging upgrades.
- Conventions: image paths must use `assetUrl()` / `import.meta.env.BASE_URL` (no bare `/images/...`); new routes added to BOTH `App.tsx` and `public/404.html`; no `as any`; `cursor-pointer` explicit (TW4 dropped the default); off-palette colours (locked system: black/white/gray, single Inter font).

**Lane C — images & catalog data:**
- Image weight: any `public/images/**` file > ~500 KB (should be WebP ≤1600px); missing `-640.webp` companion for a referenced image (breaks srcset); orphan images (zero references in `src/data/*.json` or components) → candidates for `public/images/unused/`.
- Catalog integrity: every `src/data/*.json` image ref exists on disk; JSON shapes match component Props / `src/types/catalog.ts`; duplicate products (same set listed twice) and thin galleries (single-image products vs the ≤5-angle norm) — flag for content.

**Lane D — ops & deploy:**
- Build: `npm run build` clean; `dist/` first-load JS not ballooning.
- CI: `gh run list` — latest deploy green? `.github/workflows/deploy.yml` sane; `base:"/"` in vite.config.ts and `404.html` in sync.
- Git: unpushed-commit count + age (flag if > ~15 or > 3 days); OG meta in index.html still points at propilki.online.

## Phase 2 — merge & prioritize

Merge the lanes into ONE prioritized list: 🔴 fix now (broken/risky) · 🟡 worth doing (debt) · 🟢 cosmetic. Deduplicate. For each: what, where, proposed action, and whether it's SAFE (mechanical, reversible) or needs a decision.

## Phase 3 — approval & fixes

Present the list, then `AskUserQuestion` (multiSelect) for which groups to run. Apply approved fixes only. Image moves go to `public/images/unused/` (never delete without confirming). Commit as one `chore: housekeeping` batch — **hold push** (deploying is the user's call).

## Phase 4 — report

What was found per lane, what was fixed, what was declined/deferred, and follow-ups. Communicate concisely, in Romanian.

**Cadence:** weekly, or after any large batch (image reprocessing, catalog dedup, big refactor).
