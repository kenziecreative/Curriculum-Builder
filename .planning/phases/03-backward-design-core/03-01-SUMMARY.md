---
phase: 03-backward-design-core
plan: 01
subsystem: plugin-commands
tags: [knz-outcomes, outcomes, bloom, backward-design, stage-02, command]

# Dependency graph
requires:
  - phase: 02-core-plugin-infrastructure
    provides: knz-intake command and STATE.md template patterns — prerequisite check, schema load, AskUserQuestion gate, silent state update
  - phase: 01-schema-and-foundation
    provides: stage-02-outcomes.md schema defining all required fields, enum values, duration scaling rules, and output file format
provides:
  - Test workspace (workspace/test-program/) with Stage 1 complete — enables manual verification of /knz-outcomes without running /knz-intake
  - /knz-outcomes command (knz-outcomes.md) — Stage 2 of the backward design pipeline
affects: [03-02-assessments, 04-dashboard, 05-module-session]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Constraint enforcement before display — all auto-corrections (verb replacement, level addition, transfer context fill) run silently before any output shown to user"
    - "Duration-scaled Bloom span minimums — contact_hours drives minimum unique thinking levels (short=2, medium=3, long=4)"
    - "Expertise-adaptive sequencing — self_direction_level from Stage 01 determines starting and target Bloom levels; progression visible in session outcome sequence"
    - "File-write only on approval — output exists in conversation context only until AskUserQuestion approval branch executes"
    - "Full regeneration on flag — never patch individual objectives; always regenerate full set and re-run all five constraint steps"

key-files:
  created:
    - workspace/test-program/STATE.md
    - workspace/test-program/00-project-brief/project-brief.md
    - .claude/commands/knz-outcomes.md
  modified: []

key-decisions:
  - "Constraint enforcement runs before display, not after — user never sees an objective with a prohibited verb; they only see the corrected version with a brief transparency note"
  - "AskUserQuestion gate controls file writes — no files are written to 01-outcomes/ until approval branch executes; generation output lives in conversation context only"
  - "Full set regeneration on 'Flag an issue' — patching individual objectives risks introducing consistency errors in hierarchy and Bloom progression; full regeneration with constraint re-run is safer"
  - "Test workspace uses 9 contact_hours (medium) with Stage 2 - Interested — this exercises the 3-level Bloom minimum and expertise-adaptive sequencing path"
  - "Plain language in all user-facing output — thinking levels named Recall/Understand/Apply/Analyze/Evaluate/Create; no 'Bloom's taxonomy', 'bloom_level', or 'outcome_id' ever shown to user"

patterns-established:
  - "Command section order: Prerequisites → Persona → Generation → Constraint Enforcement → Output Presentation → Review Gate → On Approval → State Management Rules → Schema Compliance Checklist"
  - "Transparency note on auto-correction: confident tone ('I strengthened...'), not apologetic; shown only when corrections were made"
  - "Prohibited verbs: understand, know, appreciate (and all conjugations) — replacement verb selected at same cognitive level, not elevated"

requirements-completed: [OUTC-01, OUTC-02, OUTC-03, OUTC-04]

# Metrics
duration: 20min
completed: 2026-03-19
---

# Phase 3 Plan 01: Backward Design Core Summary

**Test workspace for manual verification + /knz-outcomes command with silent constraint enforcement (prohibited verbs, thinking-level span, transfer context completeness) and AskUserQuestion review gate that writes files only on approval**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-19T00:00:00Z
- **Completed:** 2026-03-19
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Created a realistic test workspace (cash flow management, 9-hour medium program, Stage 2 - Interested) with Stage 1 complete — /knz-outcomes can now be run against it without first running /knz-intake
- Built /knz-outcomes command with five-step constraint enforcement (verb check, level span, transfer context, hierarchy integrity, change tracking) running silently before any output is displayed
- Established the approval-gated file-write pattern: outcome files are written only in the AskUserQuestion approval branch; generation lives in conversation context only

## Task Commits

1. **Task 1: Create test workspace with completed Stage 1 data** - `206cdf3` (feat)
2. **Task 2: Build /knz-outcomes command** - `20c8edd` (feat)

## Files Created/Modified

- `workspace/test-program/STATE.md` — Test workspace state with Stage 1 complete, Post-Intake approved, Stage 2 ready
- `workspace/test-program/00-project-brief/project-brief.md` — Completed intake brief with all required Stage 01 schema fields and exact enum values
- `.claude/commands/knz-outcomes.md` — /knz-outcomes command implementing Stage 2 outcome generation with constraint enforcement and review gate

## Decisions Made

- Constraint enforcement runs before display — user only ever sees corrected output, with a brief transparency note if corrections were made
- File writes are gated by AskUserQuestion approval — nothing is written to disk during generation or review
- "Flag an issue" triggers full regeneration, not patching — prevents hierarchy integrity errors from partial edits
- Test program is 9 contact hours (medium tier) with Stage 2 - Interested self-direction — exercises the 3-level Bloom minimum and expertise-adaptive progression path that will be most common for Hello Alice programs
- Plain language throughout: "thinking level" not "Bloom's taxonomy", "Recall/Understand/Apply/Analyze/Evaluate/Create" not enum field names

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Test workspace is ready for manual verification: run `/knz-outcomes` against `workspace/test-program/` to verify prerequisite check passes, constraint enforcement runs, distribution summary uses plain language, and AskUserQuestion gate appears
- On approval verification: confirm `workspace/test-program/01-outcomes/` contains all three files and STATE.md Stage 2 shows `complete`
- Plan 03-02 (/knz-assessments command) can now proceed — it will depend on Stage 2 complete as its prerequisite check, which this plan's test workspace can satisfy after manual verification

---
*Phase: 03-backward-design-core*
*Completed: 2026-03-19*
