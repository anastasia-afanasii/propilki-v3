---
description: Deep whole-project audit — architect + optimizer + seo + reviewer find issues, independent verifiers refute each, and CONFIRMED findings land in docs/TODO.md (not a single-pass advisory that evaporates). Report-only.
argument-hint: <optional lane — architecture | perf | seo | code — else all>
allowed-tools: Agent, Read, Bash, Glob, Grep, Edit, Write
---

A thorough, whole-project health audit with adversarial verification and durable findings. Focus: $ARGUMENTS. **Report-only — never edit source; findings land as TODO items.**

This is the heavy sibling of `/propilki-orchestrate` (the fast pre-deploy GATE). Use `/propilki-orchestrate` before a push; use `/propilki-deep-audit` periodically for depth.

## Phase 1 — find (parallel specialists, whole-project scope)
Spawn concurrently (Task, `subagent_type` = agent name): **architect** (structure/deps/bundle), **optimizer** (perf/images), **seo** (meta/OG/semantics), **reviewer** (code quality/a11y). All report-only. Each returns findings with severity + `file:line`. Rules come from `CLAUDE.md` (single source of truth) — agents don't restate them.

## Phase 2 — adversarial verification (kill false positives)
For each material finding, spawn an INDEPENDENT verifier (Task, `subagent_type: general-purpose`) that tries to **refute** it — read the actual code/data and rule real vs false. **Default to refuted when uncertain.** Keep only findings a verifier confirms; drop the rest (single-pass agent output over-reports — this is the find→refute pattern). List what was dropped so nothing is silently hidden.

## Phase 3 — findings must land (no evaporation)
Append every CONFIRMED finding to **`docs/TODO.md`** (create if absent) under a dated `## Deep-audit YYYY-MM-DD` heading, each a checkbox: `- [ ] 🔴/🟡/🟢 [area] what — where — proposed fix`. Deduplicate against items already open in `docs/TODO.md`. Then present a tight summary (counts by severity + the blockers) and point at `docs/TODO.md` for the full list.

## Rules
- **Report-only.** No source edits — findings become TODO items; fixing them is a separate approved pass (`/propilki-orchestrate`, `/propilki-update-docs`, or direct).
- Never auto-push or deploy.
- **Boundary:** depth audit of code/perf/seo/structure. Diff-scoped pre-deploy GO/NO-GO is `/propilki-orchestrate`; docs currency is `/propilki-update-docs`; repo hygiene is `/propilki-housekeeping`.

**Cadence:** monthly, or before a milestone (see `CLAUDE.md → Tooling Cadence`).
