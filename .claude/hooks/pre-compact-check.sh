#!/bin/bash
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
MODIFIED=$(git -C "$PROJECT_DIR" diff --name-only HEAD 2>/dev/null; git -C "$PROJECT_DIR" diff --cached --name-only 2>/dev/null)
[ -z "$MODIFIED" ] && exit 0

# Check if any substantive files changed (not just planning/config files)
WORK_CHANGED=0
echo "$MODIFIED" | grep -qvE '(STATE\.md|LEARNINGS\.md|MEMORY\.md|\.claude/|\.planning/)' && WORK_CHANGED=1
[ "$WORK_CHANGED" -eq 0 ] && exit 0

STATE_TOUCHED=0
echo "$MODIFIED" | grep -q 'STATE\.md' && STATE_TOUCHED=1

WARNINGS=""
[ "$STATE_TOUCHED" -eq 0 ] && WARNINGS="${WARNINGS}STATE.md not updated. "
[ -n "$WARNINGS" ] && echo "PRE-COMPACT DOC CHECK: ${WARNINGS}Update now — context is about to be compressed."
exit 0
