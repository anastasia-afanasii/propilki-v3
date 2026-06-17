---
name: orchestrate
description: Coordinate the specialist agents end-to-end — pre-deploy gate, full audit, or a custom chain — and synthesize one prioritized report
user_invocable: true
---

Run a coordinated multi-agent flow over the PROPILKI project, then merge the results into ONE report. The argument picks the flow; default is `pre-deploy`.

Specialists available (in `.claude/agents/`): `reviewer`, `seo`, `deployer`, `architect`, `optimizer`, `designer`, `docs`.

## Flows

### `pre-deploy` (default) — a GO / NO-GO gate before pushing to main
Scope each agent to the **current branch diff / changed files**. Run in this order:
1. **reviewer** — quality, patterns, mobile responsiveness, deploy safety (`${import.meta.env.BASE_URL}` on image paths, new routes in App.tsx **and** public/404.html, JSON ↔ component Props, no `as any`).
2. **seo** — meta/title/description, Open Graph, JSON-LD, semantic HTML, image `alt` + `loading`.
3. **deployer** — `npm run build` passes, `base: "/"`, `basename={import.meta.env.BASE_URL}`, 404.html in sync, `.github/workflows/deploy.yml` intact.
End with a clear **GO** (safe to push) or **NO-GO** with blocking issues listed first.

### `full-audit` — comprehensive health check (no deploy)
Whole-project scope. Run the independent ones concurrently, then synthesize:
- **architect** (structure / deps / bundle), **optimizer** (perf / images / Core Web Vitals), **seo**, **reviewer**.
Group findings by severity and dedupe overlaps (e.g. reviewer + optimizer both flagging an image).

### `design` — design-system pass
- **designer** + the `palette` skill. Enforce the locked system: **black/white/gray only, single Inter font, minimal/sharp corners**. Flag any off-palette colour rather than proposing new ones.

### custom
If the argument names agents (e.g. `orchestrate reviewer seo`), run exactly those and synthesize.

## How to run it
- Spawn each specialist as a **subagent** (Task tool, `subagent_type` = the agent name), passing it the scope (changed files for `pre-deploy`; whole project otherwise).
- Run independent specialists **concurrently**; keep ordered only where a later step depends on an earlier fix.
- Collect every agent's findings, **dedupe** overlapping ones, sort **blocking → high → nice-to-have**.
- Produce ONE consolidated report. Keep it tight: blockers first, then a short list of the rest.

## Rules
- **Never auto-push or auto-deploy.** Output a GO/NO-GO; the user decides and explicitly approves the deploy.
- **Surface, don't silently fix.** Report issues; apply fixes only when the user asks (or the chosen agent is allowed to and the user confirms).
- Respect project constraints: monochrome/minimalist design, GitHub Pages limits (no CDN/HSTS), Vite 6 max (Node 20.11), JSON-driven content.
- If a specialist finds nothing, say so — don't pad the report.
