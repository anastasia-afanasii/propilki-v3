#!/usr/bin/env bash
# PreToolUse (Write|Edit) hook — block content that clearly contains a secret
# before it can be written into a tracked file. High-precision patterns only
# (private keys + provider tokens) → effectively zero false positives.
set -uo pipefail

input="$(cat)"
content="$(printf '%s' "$input" | jq -r '.tool_input.content // .tool_input.new_string // ""' 2>/dev/null)"
[ -z "$content" ] && exit 0

if printf '%s' "$content" | grep -Eq \
  -e '-----BEGIN ([A-Z]+ )?PRIVATE KEY-----' \
  -e 'AKIA[0-9A-Z]{16}' \
  -e 'gh[pousr]_[A-Za-z0-9]{36}' \
  -e 'xox[baprs]-[A-Za-z0-9-]{10,}' \
  -e 'sk_live_[0-9a-zA-Z]{24,}'; then
  cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: the content looks like it contains a secret (private key or provider token). Put secrets in an untracked .env or a secrets manager — never in a tracked file."}}
JSON
fi
exit 0
