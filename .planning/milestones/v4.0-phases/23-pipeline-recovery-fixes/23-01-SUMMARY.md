---
phase: 23-pipeline-recovery-fixes
plan: 01
subsystem: pipeline
tags: [resume, validate, routing, command-names, state-management]

# Dependency graph
requires:
  - phase: 22-new-capabilities
    provides: revise and research commands completing the full command set
provides:
  - Correct next-action routing after validation passes (curriculum:metaskills)
  - Complete resume routing table with real command names for all pipeline stages 2-8
  - Dead /knz-* command names replaced with /curriculum:* in template and fixture STATE.md files
affects: [pipeline-recovery, resume, validate, templates]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "All pipeline stages 2-8 have real command entries in resume routing table — no placeholder text allowed"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/validate.md
    - .claude/plugins/curriculum/commands/resume.md
    - templates/project-scaffold/STATE.md
    - dashboard/src/test/fixtures/STATE.md

key-decisions:
  - "validate.md State Update next-action after passing validation routes to curriculum:metaskills — not curriculum:approve; approve is a separate gate not a post-validation step"
  - "resume.md routing table now has 7 explicit stage rows (stages 2-8) replacing one generic placeholder row and one fallback template block"
  - "Dead /knz-* command names in STATE.md files replaced with /curriculum:* — consistent with renamed plugin"

patterns-established:
  - "All stages must have real command entries in resume routing table before shipping"

requirements-completed: [PIPE-05, MC-02, MC-03, MC-05]

# Metrics
duration: 5min
completed: 2026-03-28
---

# Phase 23 Plan 01: Pipeline Recovery Fixes Summary

**Four text corrections that close three pipeline dead-ends: wrong post-validation route (approve vs metaskills), placeholder rows in resume routing for stages 2-8, and dead /knz-* command names in template and fixture STATE.md files**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-28T03:33:00Z
- **Completed:** 2026-03-28T03:38:55Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- validate.md State Update now correctly routes to /curriculum:metaskills after validation passes (was incorrectly routing to /curriculum:approve)
- resume.md routing table replaced two placeholder rows and one fallback template block with seven explicit stage entries covering stages 2-8
- templates/project-scaffold/STATE.md updated from /knz-intake and /knz-resume to /curriculum:intake and /curriculum:resume
- dashboard/src/test/fixtures/STATE.md updated from /knz-modules and /knz-resume to /curriculum:modules and /curriculum:resume

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix validate.md next-action and resume.md routing table** - `fdf6ed2` (fix)
2. **Task 2: Fix dead command names in template and fixture STATE.md files** - `e4d8f4c` (fix)

## Files Created/Modified
- `.claude/plugins/curriculum/commands/validate.md` - Changed State Update next-action from curriculum:approve to curriculum:metaskills
- `.claude/plugins/curriculum/commands/resume.md` - Replaced placeholder rows with real command entries for all stages 2-8; removed fallback template block
- `templates/project-scaffold/STATE.md` - Replaced /knz-intake and /knz-resume with /curriculum:intake and /curriculum:resume
- `dashboard/src/test/fixtures/STATE.md` - Replaced /knz-modules and /knz-resume with /curriculum:modules and /curriculum:resume

## Decisions Made
- validate.md routes to curriculum:metaskills after validation, not curriculum:approve — the user-facing handoff at line 243 already had this right; the State Update write was the only remaining incorrect reference
- resume.md now has seven explicit rows for stages 2-8 — the generic placeholder "Stages 4-8" row and the fallback template prose are fully removed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All four pipeline recovery fixes from this plan are complete
- Phase 24 (remaining gap closure items) can proceed
- Users clearing context mid-pipeline will now be routed correctly at all pipeline stages

---
*Phase: 23-pipeline-recovery-fixes*
*Completed: 2026-03-28*
