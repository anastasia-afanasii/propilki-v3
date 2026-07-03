---
description: Periodic repo health review for PROPILKI — structure/layout, .claude setup currency, docs drift, dead code + unused deps, image weight, catalog-data integrity, and deploy/CI hygiene. Report first; fix only with approval. Run weekly or after a big batch.
argument-hint: <optional focus: structure | code | images | catalog | ops | docs | full>
allowed-tools: Agent, Read, Bash, Glob, Grep, Edit, AskUserQuestion
---

Periodic **hygiene** review of the WHOLE repo — structure, currency and cruft, NOT feature work. Focus: $ARGUMENTS

**Boundaries (crisp — don't overlap `/orchestrate`):**
- This owns **structure, `.claude` currency, docs drift, orphans/weight, ops hygiene**.
- Deep code / SEO / deploy review is **`/orchestrate`**'s job (it runs the specialist agents). Here, surface *smells* only; for diff-level bugs say "run `/orchestrate reviewer`".
- All rules live in `CLAUDE.md` (single source of truth) — check *against* it, don't restate it.
- **Report first; apply only approved fixes; never delete image files without confirming** (convention: move non-fitting images to `public/images/unused/`).

## Phase 1 — parallel audit (spawn agents in a single message, one per lane)

Use `general-purpose`/`Explore` agents for the structural lanes (file-level hygiene, not deep review):

**Lane A — structure & `.claude` currency:**
- Root layout vs `CLAUDE.md`; oversized files (`find . -size +5M -not -path './node_modules/*' -not -path './.git/*' -not -path './dist/*'`); any large asset dump inside `src/` (Tailwind v4 scans `src/` → breaks the build); stray `.DS_Store`.
- `.claude/`: does each agent / skill / command still match CURRENT practice? Stale references to renamed/removed files; skills must be `<name>/SKILL.md` with `user-invocable: true` (hyphen); `CLAUDE.md`'s agents/skills list matches disk; **no rule restated inline that should point at `CLAUDE.md`** (stale-copy risk).

**Lane B — code smells (NOT a deep review — that's `/orchestrate`):**
- Dead code: exported-but-unreferenced components in `src/` (spot-check). Unused deps: `package.json` vs imports; `npm outdated` + `npm audit` highlights (respect the Node/Vite cap in `CLAUDE.md → Platform Constraints`). Duplicated CSS/logic. Anything deeper → defer to `/orchestrate`.

**Lane C — images & catalog data:**
- Image weight: any `public/images/**` > 500 KB (should be WebP ≤1600px); a referenced `foo.webp` missing its `-640.webp` companion (breaks srcset); orphan images (0 refs) → candidates for `public/images/unused/`.
- Catalog integrity: every `src/data/*.json` image ref exists; shapes match `src/types/catalog.ts`; duplicate products (same set twice) and thin galleries (single-image vs the ≤5-angle norm) → flag for content.

**Lane D — ops & deploy:**
- `npm run build` clean; `dist/` first-load JS not ballooning; `gh run list` latest deploy green; `base:"/"` in vite.config.ts and `404.html` base-sync; unpushed-commit count/age (flag > ~15 or > 3 days); OG meta in index.html points at propilki.online.

**Docs (Lane A tail, or `focus: docs`):** if `docs/*.md` have drifted (wrong counts, removed deps, stale skill/route lists), spawn the **`docs` agent** to propose a refresh (report-first). This is the one specialist housekeeping invokes — docs maintenance is its domain, and `/orchestrate` never runs `docs`.

## Phase 2 — merge & prioritize
Merge the lanes into ONE prioritized list: 🔴 fix now · 🟡 debt · 🟢 cosmetic. Deduplicate. For each: what, where, proposed action, SAFE (mechanical/reversible) or DECISION.

## Phase 3 — approval & fixes
Present the list, then `AskUserQuestion` (multiSelect) for which groups to run. Apply approved fixes only. Image moves → `public/images/unused/` (never delete without confirming). Commit as one `chore: housekeeping` batch — **hold push** (deploying is the user's call).

## Phase 4 — report & persist
Report per lane: found / fixed / declined / follow-ups. Communicate concisely, in Romanian. **Then offer to persist the surviving findings + decisions via `/log-session`** so they don't evaporate (and land in `MEMORY.md`).

**Cadence:** weekly, or after any large batch (image reprocessing, catalog dedup, big refactor). See `CLAUDE.md → Tooling Cadence`.
