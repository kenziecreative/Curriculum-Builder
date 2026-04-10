---
phase: 22-new-capabilities
plan: "01"
subsystem: commands
tags: [curriculum-plugin, post-delivery, revision, registry, draft-then-audit]

# Dependency graph
requires:
  - phase: 19-pipeline-infrastructure
    provides: Registry-first data flow and draft-then-audit pipeline pattern
  - phase: 21-deviation-validation-coverage
    provides: Auto-fix boundary definition and escalation format
  - phase: 17-vocabulary-plain-language
    provides: curriculum-voice.md canonical never-say table and Writing for Clarity block
provides:
  - /curriculum:revise command for post-delivery feedback and targeted revision
  - revision-log.md pattern for tracking changes across delivery cycles
  - Registry-first change propagation with targeted file regeneration
affects: [22-new-capabilities plan 02, any phase adding new stage commands]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Post-delivery revision command pattern with free-text feedback capture, fix/improvement categorization, impact map confirmation, and registry-first execution
    - Gap probing pattern: 2-3 targeted follow-ups on unmentioned areas after initial description
    - Revision log append-only pattern for tracking changes across delivery cycles

key-files:
  created:
    - .claude/plugins/curriculum/commands/revise.md
  modified: []

key-decisions:
  - "revise.md references stage command files by name for draft-then-audit pipeline rather than re-specifying audit checks — keeps checks authoritative in one place"
  - "Registry updated silently before any file regeneration — consistent with Phase 19 registry-wins principle"
  - "Targeted scope enforcement via registry parent references — changing MO-2-1 only regenerates Module 2 sessions, not all sessions"
  - "Never-say list extended with revise-specific technical jargon (regeneration pipeline, propagation engine, downstream cascade) to protect SME-facing plain language"

patterns-established:
  - "Post-delivery vs mid-build distinction: revise.md for after delivery (all stages complete), approve.md option 2 for mid-build corrections"
  - "Revision-log.md append-only pattern: each revision session adds one dated section, git handles actual file history"

requirements-completed: [FEAT-01]

# Metrics
duration: 8min
completed: 2026-03-28
---

# Phase 22 Plan 01: New Capabilities — Revise Command Summary

**Post-delivery revision command that maps free-text SME feedback to affected stages, categorizes changes as fixes vs improvements, executes registry-first updates with targeted downstream regeneration, and tracks all changes in a revision log**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-28T02:13:29Z
- **Completed:** 2026-03-28T02:21:30Z
- **Tasks:** 2 (Task 1: write command; Task 2: verify integration contracts)
- **Files modified:** 1

## Accomplishments

- Complete `/curriculum:revise` command file (339 lines) covering the full post-delivery revision flow
- Six-step process: feedback capture, gap probing, categorize/map, impact confirmation, execute changes, completion loop
- Integration contracts verified: registry schema reference, vocabulary enforcement, draft-then-audit pipeline, STATE.md tracking, directory scheme detection
- Never-say list extended with 10 revise-specific technical terms to protect SME-facing plain language

## Task Commits

Each task was committed atomically:

1. **Task 1: Write /curriculum:revise command** - `e70a1b3` (feat)
2. **Task 2: Verify integration contracts** - No file changes, all contracts passed on first check

**Plan metadata:** (docs commit — see final commit)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/revise.md` — Complete `/curriculum:revise` command: feedback capture, gap probing, fix/improvement categorization, impact map, registry-first execution, targeted regeneration via draft-then-audit, revision log, completion loop

## Decisions Made

- Referenced stage command files by name for audit checks rather than re-specifying them — keeps audit logic authoritative in one place and ensures revise.md stays current when stage commands evolve
- Registry updated silently (no announcement) before any file regeneration — consistent with how approve.md handles the same operation and with Phase 19 registry-wins principle
- Targeted scope via registry parent references — if outcome MO-2-1 changed, only Module 2 sessions regenerated, not all sessions
- Extended never-say list with revise-specific jargon (regeneration pipeline, propagation engine, downstream cascade, change propagation, trigger downstream) — these are the terms most likely to surface when writing about this kind of workflow

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `/curriculum:revise` command complete and ready for use
- Phase 22 Plan 02 (FEAT-02: research input recognition for audit mode intake) is next
- No blockers

---
*Phase: 22-new-capabilities*
*Completed: 2026-03-28*
