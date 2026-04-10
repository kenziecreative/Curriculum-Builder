---
phase: 07-full-pipeline-completion
plan: "02"
subsystem: enforcement-and-chain-wiring
tags: [pre-tool-use-hook, settings-json, auto-chain, knz-validate, knz-approve, stage-sequencing]
dependency_graph:
  requires: [07-01]
  provides: [PIPE-06, PIPE-07, INFR-07]
  affects: [knz-validate, knz-approve, all-write-operations-to-workspace]
tech_stack:
  added: []
  patterns:
    - PreToolUse hook with deny JSON output for stage sequencing enforcement
    - Skill invocation auto-chain pattern (mirrors knz-sessions → knz-validate)
    - Conditional stage reads in knz-approve final gate (only if status complete)
key_files:
  created:
    - .claude/hooks/pre-tool-use.sh
  modified:
    - .claude/settings.json
    - .claude/commands/knz-validate.md
    - .claude/commands/knz-approve.md
decisions:
  - Pre-tool-use.sh directory-to-stage mapping is explicit case statement (not derived from directory numbers) to handle 05-metaskills = Stage 6 correctly
  - Graceful STATE.md absence exits 0 (allow) — hook is safety net, not primary gate
  - Auto-trigger fires only on tier_1_failures == 0 — chain stops at failure message
  - Final gate reads each stage directory conditionally on STATE.md status — no broken reads if pipeline partially complete
metrics:
  duration: 2 minutes
  completed: 2026-03-22
  tasks_completed: 2
  files_modified: 4
---

# Phase 7 Plan 02: Pipeline Enforcement and Chain Wiring Summary

PreToolUse stage-sequencing hook + auto-chain from /knz-validate + full pipeline summary in /knz-approve final gate.

## What Was Built

### Task 1: PreToolUse Hook and settings.json Registration

Created `.claude/hooks/pre-tool-use.sh` — a bash script that intercepts Write and Edit tool calls at the filesystem level and blocks writes to workspace stage directories when the preceding pipeline stage is not complete in STATE.md.

Key implementation details:
- Reads stdin JSON, extracts `tool_name` and `tool_input.file_path` via python3
- Matches `workspace/{project}/0N-dirname/` regex to identify stage writes
- Explicit case statement maps directory prefixes to pipeline stages (critical: `05-*` maps to Stage 6 with PREREQ_NUM=5, not Stage 5)
- `08-*` (validation) always allowed — exits 0 unconditionally
- `00-*` always allowed — PREREQ_NUM=0 path exits 0
- Graceful absence: if STATE.md not found, exits 0 (workspace not yet initialized)
- Parses prereq stage status from STATE.md Stage Progress table using `grep -A1 "| $PREREQ_NUM "` pattern
- Outputs deny JSON with actionable message naming the missing stage and command to run

Updated `settings.json` to add a second entry to the `hooks.PreToolUse` array with `matcher: "Write|Edit"`. The original Bash entry (secrets check) is preserved. The array now has exactly two entries.

### Task 2: Auto-Chain in /knz-validate and Final Gate in /knz-approve

Added `## Auto-Trigger Metaskills` section to `knz-validate.md` immediately after the State Update section and before State Management Rules. The section:
- Fires ONLY when `tier_1_failures == 0`
- Shows a single confirmation line before invoking `/knz-metaskills` as a Skill
- Mirrors the Auto-Trigger Validation pattern already in `/knz-sessions`

Extended `/knz-approve` Final Validation gate (Step 3) to show a complete 8-section pipeline summary before the AskUserQuestion gate:
1. Program overview (name, duration, audience — from Stage 1)
2. Outcome count + Bloom span (from Stage 2)
3. Assessment counts — formative vs. summative (from Stage 3)
4. Module count + session count (from Stages 4 and 5)
5. Thinking skills activated — each metaskill with named activation activity (from Stage 6)
6. Transfer support — before/during/after/measurement (from Stage 7)
7. Marketing materials — element count and types (from Stage 8)
8. Validation status — pass or N issues pending (from Stage 9)

Each section reads from the corresponding stage directory only if that stage's status is `complete` in STATE.md. Incomplete stages show "Not yet generated" without breaking the command.

Updated the AskUserQuestion text for the Final Validation gate to use delivery-ready framing ("Approve — mark as delivery-ready" vs. the previous "Approve and continue").

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | e5ad15b | feat(07-02): add PreToolUse stage-sequencing hook and register in settings.json |
| Task 2 | 622d068 | feat(07-02): wire auto-chain in /knz-validate and extend /knz-approve final gate |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `.claude/hooks/pre-tool-use.sh` exists and is executable (chmod +x)
- `settings.json` PreToolUse array has exactly 2 entries: Bash (index 0) and Write|Edit (index 1)
- `bash -n .claude/hooks/pre-tool-use.sh` exits 0 (no syntax errors)
- `python3` settings.json parse asserts both matchers present
- `05-*)` case sets `PREREQ_NUM=5` (Stage 6 mapping is correct)
- `08-*)  exit 0` present (validation always allowed)
- `if [ ! -f "$STATE_FILE" ]; then exit 0` present (graceful absence)
- `knz-validate.md` contains "Auto-Trigger Metaskills" at line 189, after State Update and before State Management Rules
- `knz-approve.md` contains "Complete Curriculum Package" pipeline summary format
- `knz-approve.md` Final Validation gate AskUserQuestion updated to delivery-ready framing
- Commits e5ad15b and 622d068 exist in git log
