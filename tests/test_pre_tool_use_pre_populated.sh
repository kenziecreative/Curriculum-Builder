#!/bin/bash
# Hook unit test: pre-populated status produces forward-looking deny message
# Usage: bash tests/test_pre_tool_use_pre_populated.sh

set -euo pipefail

PROJECT_ROOT=$(git -C "$(dirname "$0")" rev-parse --show-toplevel 2>/dev/null | head -1)
if [ -z "$PROJECT_ROOT" ]; then
  PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
fi
export CLAUDE_PROJECT_DIR="$PROJECT_ROOT"

PAYLOAD='{"tool_name":"Write","tool_input":{"file_path":"workspace/test-program/02-assessments/assessment-plan.md"}}'

OUTPUT=$(echo "$PAYLOAD" | bash "$PROJECT_ROOT/.claude/hooks/pre-tool-use.sh" 2>&1)

PASS=true

if ! echo "$OUTPUT" | grep -q '"permissionDecision": "deny"'; then
  echo "FAIL: expected permissionDecision=deny, got: $OUTPUT"
  PASS=false
fi

if ! echo "$OUTPUT" | grep -q 'has a draft ready'; then
  echo "FAIL: expected forward-looking 'has a draft ready' message, got: $OUTPUT"
  echo "NOTE: This will fail until Plan 02 updates the hook — expected at this point."
  PASS=false
fi

if [ "$PASS" = "true" ]; then
  echo "PASS: hook blocks write with forward-looking message when prior stage is pre-populated"
fi
