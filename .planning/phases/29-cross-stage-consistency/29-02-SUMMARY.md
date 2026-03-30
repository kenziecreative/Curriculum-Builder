---
phase: 29-cross-stage-consistency
plan: "02"
subsystem: stage-commands
tags: [consistency-checks, sessions, marketing, approve, cross-stage, audit]
dependency_graph:
  requires:
    - 29-01 (consistency-check-reference.md created)
    - 28-02 (alignment checks wired — consistency checks follow alignment)
  provides:
    - Automatic consistency checking in sessions and marketing draft audit
    - Approve gate using shared reference instead of inline logic
  affects:
    - sessions/SKILL.md (Check 10 added, 10-check audit loop)
    - marketing/SKILL.md (Check 9 added, 9-check audit loop)
    - approve/SKILL.md (inline Trace 1/2/3 replaced with Section 5 reference)
tech_stack:
  added: []
  patterns:
    - Per-stage consistency check follows same 3-attempt retry with cumulative constraints as alignment check
    - consistency-check-reference.md loaded alongside alignment-check-reference.md (parallel structure)
    - Approve gate loads shared reference doc instead of maintaining inline logic
key_files:
  created: []
  modified:
    - .claude/commands/curriculum/sessions/SKILL.md
    - .claude/commands/curriculum/marketing/SKILL.md
    - .claude/commands/curriculum/approve/SKILL.md
decisions:
  - Consistency check is Check 10 in sessions (after alignment at Check 9) and Check 9 in marketing (after alignment at Check 8) — it is always the final check
  - Skip guard consistent: sessions skip if Stage 4 (Modules) dir absent; marketing skips if Stage 2/3 absent
  - Both per-stage checks and approve gate load consistency-check-reference.md — no inline duplication
  - Approve gate preserves all existing display logic; only the check logic source changes
  - Stage consistency summary in Final Validation reads from audit trail — not re-runs the per-stage checks
metrics:
  duration: "5 minutes"
  completed: "2026-03-30"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 3
---

# Phase 29 Plan 02: Consistency Check Wiring Summary

Wired consistency checks into sessions and marketing stage commands, and refactored the approve gate to use consistency-check-reference.md for its final gate sweep instead of maintaining inline logic.

## What Was Built

### Task 1: Consistency checks in sessions and marketing

**sessions/SKILL.md:**
- Added load directive for `consistency-check-reference.md` in Source Material section
- Updated check count from nine to ten
- Added Check 10: Cross-Stage Consistency with three sub-checks:
  - 10a: Time math (session duration sums vs. module spec hours from registry)
  - 10b: Prerequisite ordering (sessions referencing outcomes from later modules)
  - 10c: Outcome ID coverage (every module outcome appears in at least one session)
- Updated Retry with Cumulative Constraints to include Check 10
- Added `**Consistency Check:**` trail write subsection after Alignment Check
- Updated Build Summary trail write to increment consistency checks counter

**marketing/SKILL.md:**
- Added load directive for `consistency-check-reference.md` in Source Material section
- Updated check count from 8 to 9
- Added Check 9: Cross-Stage Consistency (Marketing Claim Tracing)
  - Verifies every marketing claim's linked outcome ID has at least one assessment in registry
  - Structural check only — not semantic; claim → outcome ID → assessment chain
- Updated retry section (Checks 5–9 now) with consistency-check-reference.md Section 7 constraint format
- Added `**Consistency Check (Claim Tracing):**` trail write subsection after Alignment Check
- Updated Build Summary trail write to increment consistency checks counter

### Task 2: Approve gate refactor

**approve/SKILL.md:**
- Added load directive for `consistency-check-reference.md` in Audit Trail Reference section
- Replaced inline Cross-Stage Integration Check body (Trace 1/2/3 + drift detection) with reference to consistency-check-reference.md Section 5 (Final Gate Sweep)
- Preserved all existing `integration_findings` JSON structure
- Preserved all existing display logic (blocking/warning/pending classification, plain-language descriptions)
- Added `**Stage consistency:**` display block in Final Validation summary — reads per-stage consistency check results from audit trail
- Post-Assessment gate behavior unchanged

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- Sessions SKILL.md has Check 10 as the final numbered check in the draft audit
- Marketing SKILL.md has Check 9 as the final numbered check in the draft audit
- Both stage commands load consistency-check-reference.md via load directive
- Both stage commands have Consistency Check trail write subsection
- Both stage commands have Check 10/9 in the retry constraint section
- Approve gate references consistency-check-reference.md Section 5 instead of inline traces
- Approve gate's inline Trace 1/2/3 logic removed (0 grep matches for "Trace [123].*bidirectional")
- Approve gate display logic preserved (integration_findings has 11 references)
- Check counts updated: sessions "ten checks", marketing "9 checks"
- No changes to stages 2-4 or 6-7

## Self-Check: PASSED

- `.claude/commands/curriculum/sessions/SKILL.md` — FOUND, modified
- `.claude/commands/curriculum/marketing/SKILL.md` — FOUND, modified
- `.claude/commands/curriculum/approve/SKILL.md` — FOUND, modified
- Commit a195f1d — FOUND: feat(29-02): add consistency checks to sessions and marketing stage commands
- Commit 5870e51 — FOUND: feat(29-02): refactor approve gate to use consistency-check-reference.md
