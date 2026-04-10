---
phase: 24-validation-coverage-alignment
plan: "01"
subsystem: validation
tags: [validate, knz-validator, tier1, tier3, plain-language, dispatch]

# Dependency graph
requires:
  - phase: 21-deviation-validation-coverage
    provides: knz-validator.md with T1-01 through T1-33 and T3-01 through T3-09 implemented
provides:
  - validate.md dispatch instruction covering full T1-01 through T1-33 range
  - validate.md dispatch instruction covering full T3-01 through T3-09 range
  - 15 new plain-language translation rows (T1-19 through T1-33) in Conversation Output table
affects:
  - curriculum:validate command behavior
  - user-visible validation failure messages for stages 6-8

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dispatch instruction in orchestrator command matches validator agent Rule 2 scope exactly"
    - "Every validator check ID has a corresponding plain-language translation row — raw IDs never reach users"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/validate.md

key-decisions:
  - "validate.md dispatch now references metaskills, transfer, and marketing directories using scheme variables already defined in validate.md's Directory scheme detection section — no new variables introduced"
  - "T3 graceful degradation pattern: 'for any stage not yet generated, mark those checks as not applicable' replaces explicit exclusion list — future-proof for any stage sequence"

patterns-established:
  - "Translation table completeness rule: every T1 check ID in the validator agent must have a corresponding row in the Conversation Output table — gap between validator scope and translation table should be zero"

requirements-completed: [DEVL-02, VOCAB-02, MC-01]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 24 Plan 01: Validation Coverage Alignment Summary

**validate.md dispatch instruction aligned to full T1-01–T1-33 and T3-01–T3-09 scope, with 15 plain-language translation rows added for stages 6-8 checks**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-28T04:04:31Z
- **Completed:** 2026-03-28T04:06:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Dispatch instruction T1 range updated from T1-01–T1-18 to T1-01–T1-33 — stages 6-8 checks now fire on every validation run
- Dispatch instruction T3 range updated from "T3-06, T3-07 only" to "T3-01 through T3-09 with graceful degradation" — no more hard exclusions for later stages
- Stage directory list in dispatch expanded to include metaskills, transfer, and marketing directories using existing scheme detection variables
- 15 new translation rows added (T1-19 through T1-33) — any validation failure for a stage 6-8 check now produces a readable user message, never a raw check ID

## Task Commits

Each task was committed atomically:

1. **Task 1: Update Task dispatch instruction to full check range** - `9048995` (feat)
2. **Task 2: Add plain-language translation rows for T1-19 through T1-33** - `5e302b7` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/validate.md` — dispatch instruction updated (T1/T3 range + directory list), 15 translation rows added

## Decisions Made

- validate.md dispatch now references metaskills, transfer, and marketing directories using scheme variables already defined in validate.md's Directory scheme detection section — no new variables introduced
- T3 graceful degradation pattern: "for any stage not yet generated, mark those checks as not applicable" replaces explicit exclusion list — future-proof for any stage sequence

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 24 Plan 01 complete — validate.md now fully aligned with knz-validator.md scope
- All 33 Tier 1 checks and all 9 Tier 3 checks will fire on validation runs where stage output exists
- No further plans in phase 24

---
*Phase: 24-validation-coverage-alignment*
*Completed: 2026-03-28*
