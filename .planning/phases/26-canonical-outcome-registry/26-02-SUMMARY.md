---
phase: 26-canonical-outcome-registry
plan: 02
subsystem: curriculum-plugin
tags: [curriculum-registry, stale-detection, outcome-wording, canon, skill-md, revise]

# Dependency graph
requires:
  - phase: 26-canonical-outcome-registry
    plan: 01
    provides: registry learner_profile and outcome_wording sections established; all 6 downstream stages read from registry

provides:
  - Stale upstream detection in all 6 downstream generation stages (assessments, modules, sessions, metaskills, transfer, marketing)
  - Revise command flags downstream stages as potentially stale after mid-pipeline registry updates
  - CANON-03 enforced: outcome changes must propagate from registry; stages detect and warn when running against outdated data

affects:
  - 27-domain-research-integration
  - 28-alignment-verification
  - Any stage command that runs after upstream registry data changes

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Stale detection: compare registry section last_updated against upstream stage completion date from STATE.md Stage Progress table"
    - "Warn-and-continue: stale detection shows AskUserQuestion with Proceed anyway or re-run upstream — never blocks silently"
    - "Skip when not-started: stale check only runs when stage has been completed before (status not not-started)"
    - "Propagation summary: revise step 5a-ii shows which completed stages depend on modified registry sections before step 5b lists files"

key-files:
  created: []
  modified:
    - .claude/commands/curriculum/assessments/SKILL.md
    - .claude/commands/curriculum/modules/SKILL.md
    - .claude/commands/curriculum/sessions/SKILL.md
    - .claude/commands/curriculum/metaskills/SKILL.md
    - .claude/commands/curriculum/transfer/SKILL.md
    - .claude/commands/curriculum/marketing/SKILL.md
    - .claude/commands/curriculum/revise/SKILL.md

key-decisions:
  - "Stale detection is warn-and-continue for all stages — user sees the warning and chooses to proceed or re-run; generation is never silently blocked"
  - "Stale check is skipped when stage status is not-started — nothing to be stale against; runs when pre-populated (audit mode)"
  - "Revise step 5a-ii shows a plain-language summary of which stages depend on the modified registry section BEFORE step 5b lists specific files for regeneration"
  - "Note added after step 5b AskUserQuestion: skipped stages will show stale warning on next run because registry was updated after they completed"

patterns-established:
  - "Registration before check: each stage's stale check is placed between input validation (step 3) and stage status routing (step 4/5), so it runs on every invocation of a previously-run stage"
  - "Dependency specificity: each stage's stale table names the specific registry sections it depends on and why, not a generic all-sections check"

requirements-completed: [CANON-03]

# Metrics
duration: 14min
completed: 2026-03-29
---

# Phase 26 Plan 02: Canonical Outcome Registry — Stale Detection Summary

**Stale upstream detection added to all 6 downstream generation stages; revise command now flags which completed stages depend on modified registry sections before offering regeneration**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-29T18:07:48Z
- **Completed:** 2026-03-29T18:22:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Added "Stale upstream check" section to assessments, modules, sessions, metaskills, transfer, and marketing SKILL.md files — each check is specific to that stage's registry dependencies
- Extended revise/SKILL.md with step 5a-ii that shows a plain-language summary of stale downstream stages after registry update, and a note that skipped files will trigger stale warnings on next run
- CANON-03 is now enforced end-to-end: if outcomes are revised mid-pipeline, revise shows which stages are affected, and those stages warn the user on next run

## Task Commits

Each task was committed atomically:

1. **Task 1: Add stale upstream detection to all 6 downstream generation stages** - `a5fe1a1` (feat)
2. **Task 2: Extend /curriculum:revise to flag downstream stages as stale on mid-pipeline registry changes** - `6b002d2` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `.claude/commands/curriculum/assessments/SKILL.md` — added stale check for outcome_wording and learner_profile (Stage 1/2 completion dates)
- `.claude/commands/curriculum/modules/SKILL.md` — added stale check for outcome_wording, assessment_criteria, and learner_profile (Stage 1/2/3 completion dates)
- `.claude/commands/curriculum/sessions/SKILL.md` — added stale check for outcome_wording, time_allocations, and learner_profile (Stage 1/2/4 completion dates)
- `.claude/commands/curriculum/metaskills/SKILL.md` — added stale check for outcome_wording and learner_profile (Stage 1/2 completion dates)
- `.claude/commands/curriculum/transfer/SKILL.md` — added stale check for outcome_wording and learner_profile (Stage 1/2 completion dates)
- `.claude/commands/curriculum/marketing/SKILL.md` — added stale check for outcome_wording and learner_profile (Stage 1/2 completion dates)
- `.claude/commands/curriculum/revise/SKILL.md` — added step 5a-ii and note in step 5b

## Decisions Made

- Stale detection is warn-and-continue for all stages — user sees the warning and chooses to proceed or re-run; generation is never silently blocked
- Stale check is skipped when stage status is `not-started`; runs when status is `pre-populated` (audit mode content may be based on older registry data)
- Revise step 5a-ii shows the plain-language stale summary before step 5b lists files, giving the user context for why regeneration is needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Phase 26 (Canonical Outcome Registry) is now complete: Plan 01 established registry-first data sourcing and canonical outcome injection; Plan 02 adds stale detection and propagation
- Phase 27 (Domain Research Integration) can proceed — both CANON-01 and CANON-03 are satisfied

---
*Phase: 26-canonical-outcome-registry*
*Completed: 2026-03-29*
