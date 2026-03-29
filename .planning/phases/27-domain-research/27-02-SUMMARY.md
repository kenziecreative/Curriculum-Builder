---
phase: 27-domain-research
plan: 02
subsystem: pipeline
tags: [routing, intake, resume, domain-research, chaining]

# Dependency graph
requires:
  - phase: 27-01
    provides: /curriculum:research command that intake and resume now route to
provides:
  - From-scratch intake chains to /curriculum:research instead of /curriculum:outcomes
  - Resume command routes to /curriculum:research between Stage 1 and Stage 2
  - Audit-mode intake continues to skip domain research (RSRCH-06 honored)
affects: [intake, resume, research, outcomes]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Audit-mode builds skip domain research — source materials serve as the evidence grounding"
    - "From-scratch builds always go through domain research before outcome design"

key-files:
  created: []
  modified:
    - .claude/commands/curriculum/intake/SKILL.md
    - .claude/commands/curriculum/resume/SKILL.md

key-decisions:
  - "Clean intake path routes to /curriculum:research; audit mode continues to /curriculum:outcomes — RSRCH-06 honored"
  - "Resume routing table includes three domain research states: not-started, in-progress, and skipped (audit mode)"

patterns-established:
  - "Stage 1.5 pattern: domain research inserts between intake and outcomes in from-scratch builds only"

requirements-completed: [RSRCH-06]

# Metrics
duration: 5min
completed: 2026-03-29
---

# Phase 27 Plan 02: Pipeline Wiring for Domain Research Summary

**From-scratch intake now chains to /curriculum:research and resume command routes through domain research between Stage 1 and Stage 2, with audit-mode builds correctly skipping research (RSRCH-06).**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-29T22:24:00Z
- **Completed:** 2026-03-29T22:25:17Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Clean intake path now routes to `/curriculum:research` in both STATE.md Next Action and closing message
- Audit mode path unchanged — still routes to `/curriculum:outcomes` (RSRCH-06 satisfied)
- Resume command routing table includes domain research with all three states: not-started, in-progress, and skipped

## Task Commits

Each task was committed atomically:

1. **Task 1: Update intake chaining for from-scratch vs audit-mode builds** - `6145c5e` (feat)
2. **Task 2: Update resume command with domain research routing** - `74b643a` (feat)

## Files Created/Modified

- `.claude/commands/curriculum/intake/SKILL.md` — Two targeted edits: clean intake STATE.md Next Action and closing message now point to /curriculum:research
- `.claude/commands/curriculum/resume/SKILL.md` — Three routing rows added between Stage 1 and Stage 2 for domain research not-started, in-progress, and skipped states

## Decisions Made

- Clean intake path routes to /curriculum:research; audit mode continues to /curriculum:outcomes — RSRCH-06 honored. Source materials replace the need for domain research since the evidence already exists.
- Resume routing table includes three domain research states to cover all transition scenarios.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 27 is fully complete: research command exists (Plan 01) and is wired into the pipeline (Plan 02)
- From-scratch build flow is now: intake → research → outcomes
- Audit-mode build flow is now: intake → outcomes (unchanged, as designed)
- Phase 28 (traceability / outcome linkage) can begin

---
*Phase: 27-domain-research*
*Completed: 2026-03-29*
