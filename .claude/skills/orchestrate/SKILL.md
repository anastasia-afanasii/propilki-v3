---
name: orchestrate
description: Coordinate the specialist agents for a pre-deploy GO/NO-GO gate (or a design pass / custom chain) and synthesize one prioritized report
user-invocable: true
argument-hint: "[pre-deploy | design | <agent names>] (default: pre-deploy)"
---

Run a coordinated multi-agent flow over the PROPILKI project, then merge the results into ONE report. The argument picks the flow; default is `pre-deploy`.

Specialists available (in `.claude/agents/`): `reviewer`, `seo`, `deployer`, `architect`, `optimizer`, `designer`, `docs`.

**Scope:** this skill owns **code / SEO / deploy review**. Structure, `.claude` currency, docs and orphan/weight hygiene are `/housekeeping`'s job — don't duplicate them here. All rules come from `CLAUDE.md` (Code Review Checklist, Common Pitfalls, Locked Design System, Platform Constraints) — the single source of truth.

## Flows

### `pre-deploy` (default) — a GO / NO-GO gate before pushing to main
Scope each agent to the **current branch diff / changed files**. Run in this order:
1. **reviewer** — quality, patterns, mobile responsiveness, deploy safety (per CLAUDE.md Code Review Checklist).
2. **seo** — meta/title/description, Open Graph, JSON-LD, semantic HTML, image `alt` + `loading`.
3. **deployer** — `npm run build` passes, `base: "/"`, `basename={import.meta.env.BASE_URL}`, `404.html` base-sync, `.github/workflows/deploy.yml` intact.
End with a clear **GO** (safe to push) or **NO-GO** with blocking issues listed first.

> **Full/deep audit moved out.** A comprehensive whole-project audit — with adversarial verification and findings that land in `docs/TODO.md` — is now **`/deep-audit`**. This skill stays the fast pre-deploy gate.

### `design` — design-system pass
- **designer** agent (covers palette / redesign / layout). Enforce `CLAUDE.md → Locked Design System`. Flag any off-palette colour rather than proposing new ones.

### custom
If the argument names agents (e.g. `orchestrate reviewer seo`), run exactly those and synthesize.

## How to run it
- Spawn each specialist as a **subagent** (Task tool, `subagent_type` = the agent name), passing it the scope (changed files for `pre-deploy`; whole project otherwise).
- Run independent specialists **concurrently**; keep ordered only where a later step depends on an earlier fix.
- Collect every agent's findings, **dedupe** overlapping ones, sort **blocking → high → nice-to-have**.
- Produce ONE consolidated report. Keep it tight: blockers first, then a short list of the rest.

## Rules
- **Never auto-push or auto-deploy.** Output a GO/NO-GO; the user decides and explicitly approves the deploy.
- **Surface, don't silently fix.** Report issues; the fix-capable agents (seo/optimizer/designer/docs) apply changes only when the user explicitly asks — never during this gate.
- Respect `CLAUDE.md → Platform Constraints` (GitHub Pages limits, image policy, the Node/Vite cap).
- If a specialist finds nothing, say so — don't pad the report.
- After the run, offer to persist surviving findings via `/log-session`.
