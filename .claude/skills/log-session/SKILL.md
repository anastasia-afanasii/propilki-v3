---
name: log-session
description: Log what was changed in the current session to persistent memory for cross-conversation tracking
user-invocable: true
argument-hint: "[summary] (optional — auto-generates if omitted)"
---

# Log Session

Save a record of what was done in the current conversation to the persistent memory system so it can be recalled in future conversations.

## Steps

1. **Review** all changes made in the current conversation:
   - Files created or edited (check tool call history)
   - Decisions made
   - Issues found or fixed
   - Key context the user shared

2. **Write** a session log memory file to the memory directory at:
   `~/.claude/projects/-Users-nastea-Desktop-propilki-v3/memory/`

   Use this format:
   ```markdown
   ---
   name: session-YYYY-MM-DD-short-description
   description: One-line summary of what was done
   metadata:
     type: project
   ---

   ## Changes
   - [list each file changed and what was done]

   ## Decisions
   - [list key decisions or directions taken]

   ## Context
   - [any important context for future sessions]

   **Why:** Track project evolution across conversations.
   **How to apply:** When starting new work, check recent session logs to understand current state.
   ```

3. **Distill typed durable memories** — beyond the dated journal, capture information
   useful in *future* conversations as typed memory files in the same directory. For each
   category below, check if there's something worth saving; skip categories with nothing new:

   - **User** (role, expertise, working style, preferences)
   - **Feedback** (corrections "don't do X" + confirmations "yes exactly")
   - **Project** (architectural decisions, non-obvious *why*, constraints)
   - **Reference** (external systems, dashboards, links)

   Write each to (or update) a hyphen-named file with frontmatter (`name`,
   `description`, `metadata.type`), e.g. `feedback-minimal-scope.md`.

4. **Update** the `MEMORY.md` index in the same directory — one line per new entry.

5. **Report** a short summary to the user confirming what was logged.

## Guidelines

- Keep entries concise — what changed and why, not how.
- Use absolute dates, never relative (convert "today" → e.g. "2026-06-20").
- Don't log trivial read-only exploration — only substantive work.
- If a session log already exists for today, append rather than duplicate.
- **Update, don't duplicate** — edit the relevant existing memory file first.
- Do NOT save what git/CLAUDE.md already records (code structure, file paths,
  past fixes, git history). DO save *why* decisions were made, user
  preferences, corrections, non-obvious context.
- Keep `MEMORY.md` lines under ~150 characters.
