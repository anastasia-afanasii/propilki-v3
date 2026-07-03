---
name: propilki-recall
description: Recall past work, decisions, and context from memory — search across all session logs and memories
user-invocable: true
argument-hint: "[topic] (optional — shows all if omitted)"
---

# Recall

Search and display saved memories from past conversations.

## Steps

1. **Read** the `MEMORY.md` index at:
   `~/.claude/projects/-Users-nastea-Desktop-propilki-v3/memory/MEMORY.md`

2. **If a topic argument is provided:**
   - Search memory file names and descriptions for relevant matches
   - Read only the matching memory files
   - Present findings grouped by relevance

3. **If no argument:**
   - Read all memory files
   - Present a summary grouped by type:
     - **Session logs** — what was changed and when
     - **Project** — ongoing work, goals, decisions
     - **User** — preferences and context
     - **Feedback** — how to approach work
     - **Reference** — external resources and links

4. **Report** findings in a clean, scannable format (bullets, newest session
   logs first).

## Guidelines

- Sort session logs reverse-chronologically (newest first).
- Flag any memories that look stale (old logs about completed work).
- If no memories exist yet, say so and suggest running `/propilki-log-session`.
- Verify before recommending: if a memory names a file, function, or flag,
  confirm it still exists in the repo first.
