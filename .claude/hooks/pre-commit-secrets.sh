#!/bin/bash
# Lightweight secret detection for staged files
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
STAGED=$(git -C "$PROJECT_DIR" diff --cached --name-only 2>/dev/null)
[ -z "$STAGED" ] && exit 0

FOUND=""
while IFS= read -r file; do
  [ ! -f "$PROJECT_DIR/$file" ] && continue
  # Skip binary files
  file -b --mime "$PROJECT_DIR/$file" 2>/dev/null | grep -q 'binary' && continue
  # Check for common secret patterns
  MATCHES=$(grep -nEi '(sk_live_|sk_test_|AKIA[A-Z0-9]{16}|ghp_[a-zA-Z0-9]{36}|glpat-|xox[bpas]-|-----BEGIN (RSA |EC )?PRIVATE KEY|api[_-]?key\s*[:=]\s*['\''"][a-zA-Z0-9]{20,}|secret[_-]?key\s*[:=]\s*['\''"][a-zA-Z0-9]{20,})' "$PROJECT_DIR/$file" 2>/dev/null)
  [ -n "$MATCHES" ] && FOUND="${FOUND}\n${file}:\n${MATCHES}\n"
done <<< "$STAGED"

if [ -n "$FOUND" ]; then
  echo "SECRETS CHECK: Potential secrets detected in staged files:" >&2
  echo -e "$FOUND" >&2
  echo "Review these matches. If they are false positives, proceed. If real secrets, unstage the files." >&2
  exit 2
fi
exit 0
