---
description: Refresh drifted docs — invoke the `docs` agent to reconcile docs/*.md + CLAUDE.md + README against the actual code/data, then apply approved edits. Report-first.
argument-hint: <optional: a doc area — architecture | product | changelog | claude | readme — else all>
allowed-tools: Agent, Read, Bash, Glob, Grep, Edit
---

Refresh documentation that has drifted from reality. Focus: $ARGUMENTS

This is the verb for the `docs` agent (which otherwise has no command).

## Steps
1. Spawn the **`docs` agent** (Task, `subagent_type: docs`), scoped to the target file(s) — default: all of `docs/*.md` + the structure/stack claims in `CLAUDE.md` + `README.md`.
2. The agent **verifies every factual claim against the code/data before proposing edits**:
   - product / category counts vs `src/data/nailCatalog.json`
   - dependency list vs `package.json`
   - route list vs `src/App.tsx`
   - agent / skill / command list vs `.claude/` on disk
   - stack + image policy vs reality (Tailwind v4 CSS config, WebP + `-640` srcset, no state library)
3. It reports drift + proposed edits per its output-format contract — **report-first, no silent writes**.
4. Present the diff; on approval, apply. Commit as `docs: refresh` — **hold push**.

**Boundary:** doc *content currency* only. Structure/hygiene is `/housekeeping`; code review is `/orchestrate`. All rules live in `CLAUDE.md` — reconcile docs *to* it, don't restate it elsewhere.
**Cadence:** after a batch that changes counts/deps/routes, or when `/housekeeping` flags doc drift.
