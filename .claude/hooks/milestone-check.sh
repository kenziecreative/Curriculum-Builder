#!/bin/bash
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
RECENT_COMMITS=$(git -C "$PROJECT_DIR" log --oneline --since='30 minutes ago' -5 2>/dev/null || echo "")
[ -z "$RECENT_COMMITS" ] && exit 0

MILESTONE_COMMIT=0
echo "$RECENT_COMMITS" | grep -qiE '(complete|finish|implement|ship|release|milestone|phase|v[0-9])' && MILESTONE_COMMIT=1
[ "$MILESTONE_COMMIT" -eq 0 ] && exit 0

STATE_TOUCHED=0
MODIFIED=$(git -C "$PROJECT_DIR" diff --name-only HEAD 2>/dev/null; git -C "$PROJECT_DIR" diff --cached --name-only 2>/dev/null)
echo "$MODIFIED" | grep -q 'STATE\.md' && STATE_TOUCHED=1
RECENT_FILES=$(git -C "$PROJECT_DIR" diff --name-only HEAD~3..HEAD 2>/dev/null || echo "")
echo "$RECENT_FILES" | grep -q 'STATE\.md' && STATE_TOUCHED=1

if [ "$STATE_TOUCHED" -eq 0 ]; then
  echo "MILESTONE CHECK: Recent commits suggest significant work completed. Update STATE.md with current position before stopping." >&2
  exit 2
fi
exit 0
