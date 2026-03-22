#!/bin/bash
# .claude/hooks/pre-tool-use.sh
# PreToolUse hook: enforces stage sequencing by blocking Write/Edit tool calls
# to workspace stage directories when the preceding stage is not complete.
#
# Source: Claude Code hooks reference (https://code.claude.com/docs/en/hooks)
# Receives Write/Edit tool input as JSON on stdin
# Outputs deny JSON to block, or exits 0 to allow

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))" 2>/dev/null)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

# Only check writes into workspace stage directories
# Pattern: workspace/{project-name}/NN-dirname/
if [[ ! "$FILE_PATH" =~ workspace/([^/]+)/(0[0-9]-[^/]+)/ ]]; then
  exit 0
fi

PROJECT_NAME="${BASH_REMATCH[1]}"
STAGE_DIR="${BASH_REMATCH[2]}"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
STATE_FILE="$PROJECT_DIR/workspace/$PROJECT_NAME/STATE.md"

# Map directory prefix to pipeline stage.
# CRITICAL: directory numbers do NOT equal pipeline stage numbers.
# 00-project-brief = Stage 1, 01-outcomes = Stage 2, ..., 05-metaskills = Stage 6, etc.
# PREREQ_NUM=0 means no prerequisite (always allow).
case "$STAGE_DIR" in
  00-*)  PREREQ_NUM=0; PREREQ_NAME="none"; STAGE_NUM=1; STAGE_NAME="Intake"; PREREQ_CMD="" ;;
  01-*)  PREREQ_NUM=1; PREREQ_NAME="Intake"; STAGE_NUM=2; STAGE_NAME="Outcome Design"; PREREQ_CMD="/knz-intake" ;;
  02-*)  PREREQ_NUM=2; PREREQ_NAME="Outcome Design"; STAGE_NUM=3; STAGE_NAME="Assessment Design"; PREREQ_CMD="/knz-outcomes" ;;
  03-*)  PREREQ_NUM=3; PREREQ_NAME="Assessment Design"; STAGE_NUM=4; STAGE_NAME="Module Structure"; PREREQ_CMD="/knz-assessments" ;;
  04-*)  PREREQ_NUM=4; PREREQ_NAME="Module Structure"; STAGE_NUM=5; STAGE_NAME="Session Content"; PREREQ_CMD="/knz-modules" ;;
  05-*)  PREREQ_NUM=5; PREREQ_NAME="Session Content"; STAGE_NUM=6; STAGE_NAME="Metaskill Mapping"; PREREQ_CMD="/knz-sessions" ;;
  06-*)  PREREQ_NUM=6; PREREQ_NAME="Metaskill Mapping"; STAGE_NUM=7; STAGE_NAME="Transfer Ecosystem"; PREREQ_CMD="/knz-metaskills" ;;
  07-*)  PREREQ_NUM=7; PREREQ_NAME="Transfer Ecosystem"; STAGE_NUM=8; STAGE_NAME="Marketing Derivation"; PREREQ_CMD="/knz-transfer" ;;
  08-*)  exit 0 ;;  # Validation — allow writes anytime after Stage 5
  *)     exit 0 ;;  # Unknown directory — allow
esac

# Stage 1 (Intake) has no prerequisite — always allow
[ "$PREREQ_NUM" -eq 0 ] && exit 0

# Graceful absence: if no STATE.md found, allow writes (hook is a safety net, not primary gate)
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

# Parse preceding stage status from STATE.md Stage Progress table.
# Rows look like: | 5 | Session Content | complete |
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|complete' | head -1)

if [ "$PREREQ_STATUS" = "complete" ]; then
  exit 0  # Prerequisite complete — allow write
fi

# Block with actionable message naming the missing stage and command to run
REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be complete. Stage $PREREQ_NUM is currently ${PREREQ_STATUS:-not-started}. Run $PREREQ_CMD to finish it first."

python3 -c "
import json, sys
print(json.dumps({
  'hookSpecificOutput': {
    'hookEventName': 'PreToolUse',
    'permissionDecision': 'deny',
    'permissionDecisionReason': sys.argv[1]
  }
}))" "$REASON"
exit 0
