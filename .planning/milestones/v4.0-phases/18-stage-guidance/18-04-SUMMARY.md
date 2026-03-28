---
phase: 18-stage-guidance
plan: "04"
subsystem: stage-guidance
tags: [intake, review-gate, self-check, plain-language, sme-guidance]

# Dependency graph
requires:
  - phase: 18-stage-guidance
    provides: established self-check pattern from approve.md and assessments.md

provides:
  - Self-check block at the intake review gate with 4 program-brief-accuracy questions
  - All four review gates now have self-check questions (GUIDE-01 complete)

affects: [intake.md, sme-facing gate guidance, GUIDE-01]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Self-check block uses ### Self-check — before you decide heading with Ask yourself: lead-in"
    - "Intake register questions ask 'did we capture this right?' not 'is the learning design sound?'"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/intake.md

key-decisions:
  - "Intake self-check questions target program brief accuracy (audience, format, success criteria, anything missed) — not learning design evaluation"
  - "Used approve.md standalone-gate format (### heading + Ask yourself: prose lead) rather than assessments.md blockquote format — intake gate is a standalone gate"

patterns-established:
  - "Intake register self-check: audience accuracy, format realism, success criteria completeness, completeness catch-all"

requirements-completed: [GUIDE-01]

# Metrics
duration: 3min
completed: 2026-03-27
---

# Phase 18 Plan 04: Stage Guidance Summary

**Intake review gate now has 4 plain-language self-check questions that help SMEs verify the captured program brief is accurate — completing GUIDE-01 coverage across all four review gates**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-27T02:45:00Z
- **Completed:** 2026-03-27T02:48:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added a self-check block between the "Your Program at a Glance" summary and the AskUserQuestion gate in intake.md
- 4 questions in the intake register: audience match, format realism, success criteria completeness, and a catch-all for anything missed
- Matched the `### Self-check — before you decide` heading + `Ask yourself:` lead-in pattern from approve.md
- No ID vocabulary; questions read like a sharp colleague doing a brief review, not a compliance checklist

## Task Commits

Each task was committed atomically:

1. **Task 1: Add self-check questions to intake review gate** - `1baec8d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/intake.md` — Self-check block inserted at lines 257-265 between summary divider and AskUserQuestion gate

## Decisions Made

- Intake self-check uses standalone-gate format (### heading + Ask yourself: prose lead-in) rather than blockquote format — intake is a top-level gate, same as the approve.md gates, not an inline gate embedded in a generation step
- Questions stay in program-brief-accuracy register: "did we capture your program correctly?" not "is the learning design sound?" — SME is verifying captured data, not evaluating curriculum quality at this point

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- GUIDE-01 is complete: all four review gates (intake, assessments.md PIPE-05, approve.md post-assessment, approve.md final validation) now have self-check questions
- Phase 18 stage guidance work is complete — ready for the next phase in the roadmap

---
*Phase: 18-stage-guidance*
*Completed: 2026-03-27*
