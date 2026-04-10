---
phase: 06-validation-layer
plan: 01
subsystem: validation
tags: [curriculum-validation, task-dispatch, three-tier-validation, bloom-checks, tma-arc]

# Dependency graph
requires:
  - phase: 05-module-session-generation
    provides: session-generator.md subagent pattern and knz-sessions.md orchestrator pattern used as structural templates
  - phase: 01-schema-and-foundation
    provides: stage-09-validation.md schema with all 33 Tier 1 checks, 5 Tier 2 dimensions, and 9 Tier 3 items
provides:
  - knz-validator.md subagent that reads Stage 2–5 output and runs Tier 1/2/3 checks writing 3 report files
  - knz-validate.md orchestrator command that dispatches agent, verifies reports, presents plain-language results
  - Auto-trigger integration in knz-sessions.md that fires validation immediately after Stage 5 success path
affects: [07-transfer-design, 06-02-PLAN (if exists)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Separate agent file for validation — validator never inlined into any generation command"
    - "Task tool dispatch from orchestrator command — validation runs in a fresh agent call, never same context as generation"
    - "Duration-scaled Tier 2 — 90-min programs skip all qualitative dimensions; half-day and longer run all 5"
    - "Plain-language output translation — check IDs (T1-xx) never shown to user; dimension names become Transfer realism/Social learning/etc."
    - "Auto-advance after Stage 5 — knz-sessions auto-triggers knz-validate after file verification success, no manual step needed"

key-files:
  created:
    - .claude/agents/knz-validator.md
    - .claude/commands/knz-validate.md
  modified:
    - .claude/commands/knz-sessions.md

key-decisions:
  - "Validation agent is a separate file (knz-validator.md) from all generation commands — structural separation enforced by file boundaries, not just instructions"
  - "knz-validate.md dispatches via Task tool — ensures validation runs in a separate agent context, satisfying the separation rule in stage-09-validation.md"
  - "T1-07 Bloom comparison encoded as numeric mapping (Remember=1 through Create=6) in agent spec — prevents string comparison errors"
  - "T1-15 DAG check: empty prerequisite_modules is explicitly stated as ALWAYS valid — prevents false positives on single-module programs"
  - "T1-17 framed as semantic check (could this prompt be copied verbatim to any session?) not string match — three prohibited patterns are examples only"
  - "Auto-trigger fires AFTER silent STATE.md update in Completion Summary section — not in File Verification failure path"
  - "Conversation output uses plain English translations for all 18 check IDs — users never see T1-xx identifiers"
  - "Stage 9 status driven by actual tier_1_failures count: complete if 0, in-progress if >0 — state reflects curriculum quality, not mere invocation"

patterns-established:
  - "Validation agent persona: 'You do NOT modify any stage output files under any circumstances. You do NOT generate content. You do NOT offer to fix failures.' — state what the agent does NOT do"
  - "Completion signal format: structured text with tier_1_failures count, tier_2_scores, tier_3_items count — orchestrator parses this to drive state updates"
  - "All 3 report files overwritten on each run — idempotent validation runs with no stale partial results"

requirements-completed: [VALD-01, VALD-02, VALD-03, VALD-04, VALD-05, VALD-06]

# Metrics
duration: 4min
completed: 2026-03-21
---

# Phase 06 Plan 01: Validation Layer — Agent and Orchestrator Summary

**Three-tier curriculum validation layer: separate knz-validator.md subagent with Bloom numeric ordering, DAG checks, and semantic reflection check; knz-validate.md orchestrator with Task dispatch, plain-language output, and silent state updates; auto-trigger added to knz-sessions.md success path**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-21T20:48:04Z
- **Completed:** 2026-03-21T20:52:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Authored `knz-validator.md` as a read-only subagent covering all 18 applicable Tier 1 checks (Stages 2–5), all 5 Tier 2 rubric dimensions (duration-scaled), and Tier 3 items T3-06 and T3-07 — with explicit rules for Bloom numeric ordering, empty-array DAG validity, and semantic reflection check
- Authored `knz-validate.md` as an orchestrator command that checks Stage 5 prerequisite, dispatches a Task to the validator agent, verifies 3 report files, presents plain-language results (no tier jargon, no check IDs shown to user), and silently updates Stage 9 status and Final Validation gate
- Added auto-trigger block to `knz-sessions.md` Completion Summary section — fires `knz-validate` as a Skill immediately after all session files are verified (success path only)

## Task Commits

Each task was committed atomically:

1. **Task 1: Author knz-validator.md agent** - `dd89a5a` (feat)
2. **Task 2: Author knz-validate.md command and auto-trigger** - `be85419` (feat)

**Plan metadata:** (this commit)

## Files Created/Modified

- `.claude/agents/knz-validator.md` — Read-only validation worker; runs Tier 1/2/3 checks, writes schema-report.md, rubric-report.md, human-review-checklist.md to 08-validation/
- `.claude/commands/knz-validate.md` — Orchestrator command; Stage 5 prerequisite check, Task dispatch to validator, file verification, plain-language output, silent STATE.md update
- `.claude/commands/knz-sessions.md` — Added Auto-Trigger Validation section at end of Completion Summary; fires after silent STATE.md update (success path only)

## Decisions Made

- Validation agent is a separate file — structural separation enforced at file boundary, not just instructions
- Task tool dispatch ensures validation runs in a fresh agent context — satisfies the separation rule in stage-09-validation.md
- T1-07 uses numeric Bloom mapping in agent spec — prevents string comparison errors (e.g., "Apply" < "Analyze" evaluating incorrectly alphabetically)
- T1-15 empty-array rule stated explicitly — prevents false positives on single-module programs
- T1-17 framed as semantic check rather than pattern match — three prohibited strings are examples only
- Auto-trigger fires after STATE.md updates in Completion Summary, not in the File Verification failure path
- Stage 9 status driven by tier_1_failures count — quality of curriculum determines state, not mere invocation
- Plain English translations for all 18 check IDs — users never see T1-xx identifiers in conversation output

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- VALD-01 through VALD-06 all addressed
- Validation layer is structurally complete for Phase 6 scope (Stages 2–5)
- When Stage 7 (Transfer) and Stage 8 (Marketing) are built, T1-19 through T1-33 and T3-01 through T3-05 will become applicable — validator already handles these with "Not applicable — Stage N not yet generated" rows
- knz-sessions.md auto-trigger means the validation agent runs automatically after every successful Stage 5 completion without user needing to remember `/knz-validate`

---
*Phase: 06-validation-layer*
*Completed: 2026-03-21*
