---
phase: 15-delivery-layer
plan: "03"
subsystem: delivery-layer
tags: [verify, approve, delivery-gate, slip-through-safety-net, assemble-trigger]
dependency_graph:
  requires: [15-01, 15-02]
  provides: [verify-command, approve-final-gate-with-verify-assemble]
  affects: [approve.md, verify.md, delivery workflow]
tech_stack:
  added: []
  patterns: [Task-dispatch-for-silent-verify, Skill-auto-trigger-for-assemble, conditional-gate-option-replacement]
key_files:
  created:
    - .claude/plugins/curriculum/commands/verify.md
  modified:
    - .claude/plugins/curriculum/commands/approve.md
decisions:
  - verify.md is read-only diagnostic — no STATE.md write; approve controls all presentation when invoking silently
  - verify.md documents silent invocation but does not detect mode — approve passes result handling responsibility entirely
  - Option 1 replacement strategy: blockers swap Approve text for Fix-first text; Options 2 and 3 remain available in both states
  - assemble triggered as Skill (auto-chain pattern from validate.md metaskills trigger) after Final Validation approval
  - Post-Assessment gate path in approve.md is fully unchanged — all verify/assemble changes are Final Validation only
metrics:
  duration: "~2 min"
  completed_date: "2026-03-25"
  tasks_completed: 2
  files_changed: 2
---

# Phase 15 Plan 03: Verify Command and Approve Gate Wiring Summary

Standalone `/curriculum:verify` command that checks completed curriculum for delivery readiness, plus `/curriculum:approve` Final Validation gate updated to run verify silently before the summary and trigger assemble after approval.

## What Was Built

### verify.md — Delivery Readiness Checker

New standalone command at `.claude/plugins/curriculum/commands/verify.md`.

Three check categories:
- **Check A — Missing required stage files:** Six required files/directories checked for existence (01-outcomes through 07-marketing). Each missing item reports with the fix command.
- **Check B1 — NEEDS: markers:** Scans session, transfer, and marketing output files for lines starting with `NEEDS:`.
- **Check B2 — TMA phase labels as headings:** Scans for Markdown headings whose sole text is ACTIVATE, THEORY, METHOD, APPLICATION, BRIDGE, or TRANSFER.
- **Check B3 — HTML comments:** Scans for `<!--` anywhere in output files.

Output format: plain-language, file-specific, one entry per issue with relative path + description + fix command. No check IDs, no technical patterns shown.

Warm handoff close for standalone use: passes → prompt to run `/curriculum:approve`; fails → fix commands in the issue list are the next step.

Documents silent invocation pattern (from approve via Task tool) without needing to detect mode.

### approve.md — Final Validation Gate Updates

Four changes to the Final Validation gate path only:

1. **Verify runs first (silently):** Before reading stage directories, spawns one Task with verify.md context. Collects `verify_issues` list. Does not display results yet.
2. **Delivery Readiness section added to summary:** Appears after the Validation section in the complete package display. Shows "Ready to deliver — all checks passed" or lists each blocker with fix command.
3. **Option 1 gated by verify results:** Clean verify → existing Approve option unchanged. Blockers present → Option 1 text replaced with "Fix issues before approving" message. Options 2 and 3 remain available in both states.
4. **Assemble triggered after Option 1 approval:** After STATE.md update, shows "Assembling your delivery package now..." then invokes `/curriculum:assemble` as a Skill (same auto-chain pattern as validate.md metaskills trigger). Confirmation message follows after assemble completes.

Post-Assessment gate path: completely unchanged.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- verify.md exists: PASS
- verify.md line count (149 lines, minimum 60): PASS
- verify.md contains curriculum-voice.md reference: PASS
- verify.md contains NEEDS: marker check: PASS
- verify.md contains TMA header check: PASS
- verify.md contains HTML comment check: PASS
- verify.md contains missing required files check: PASS
- verify.md contains plain-language output with file + fix command: PASS
- approve.md verify references (7 matches, minimum 2): PASS
- approve.md assemble references (3 matches, minimum 1): PASS
- approve.md Post-Assessment gate unchanged: PASS

## Self-Check: PASSED

All files exist, all commits verified, all must-have truths satisfied.

## Commits

- `069f393` feat(15-03): add /curriculum:verify command — delivery readiness checker
- `19a65d1` feat(15-03): wire verify + assemble into approve.md Final Validation gate
