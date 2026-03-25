---
phase: 15-delivery-layer
plan: 02
subsystem: plugin-commands
tags: [curriculum-plugin, delivery, html-generation, file-assembly]

# Dependency graph
requires:
  - phase: 15-01
    provides: generate-html.js standalone script for HTML conversion
provides:
  - "/curriculum:assemble command that compiles delivery-scoped files into session-organized delivery/ directory"
  - "Plain-language file list output showing what is and is not included in the package"
  - "Partial assembly support — notes missing files with fix commands, never silently drops content"
affects: [approve.md, delivery-layer integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Direct file copy in orchestrator (no Task agent) — assemble is purely mechanical, no generation"
    - "Idempotent delivery/ directory — always overwrite on re-run"
    - "Partial assembly pattern — copy what exists, note what is missing with the fix command"

key-files:
  created:
    - .claude/plugins/curriculum/commands/assemble.md
  modified: []

key-decisions:
  - "assemble.md handles file copy directly (no Task agent) — packaging is mechanical, dispatching a Task would add latency with no benefit"
  - "delivery/ is always overwritten on re-run — idempotent assembly means the user can safely re-run after fixing missing stages"
  - "HTML generated only for facilitator guides and marketing files — participant materials and transfer plan stay markdown-only per Phase 15 scope decision"
  - "Partial assembly is acceptable — copy what is available, note what is missing with the fix command (never silently produce an incomplete package)"

patterns-established:
  - "Packaging commands do not update STATE.md — assembly is not a pipeline stage"
  - "Missing-file reporting pattern: list under Not yet generated with the exact command to run"

requirements-completed: [DLVR-01]

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 15 Plan 02: Delivery Layer Summary

**/curriculum:assemble command that copies facilitator guides, participant materials, transfer plan, and marketing files into a session-organized delivery/ directory and generates HTML via generate-html.js**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-25T20:30:00Z
- **Completed:** 2026-03-25T20:35:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- assemble.md command written as standalone orchestrator (no Task agent needed)
- Delivery structure matches locked decision: session-N/ subfolders with facilitator guide + participant materials, transfer and marketing at delivery/ root
- HTML generation via generate-html.js called after file copy with correct call signature
- Partial assembly handling: copies what exists, reports missing files with the fix command
- Warm handoff close directs to /curriculum:approve

## Task Commits

1. **Task 1: Write assemble.md command** - `af7fd1a` (feat)

**Plan metadata:** (included in task commit — single task plan)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/assemble.md` - Delivery package assembler command (160 lines)

## Decisions Made

- assemble.md handles file copy directly without spawning a Task agent — packaging is mechanical (copy files, call a script), no generation required, Task overhead unwarranted
- delivery/ directory always overwritten on re-run — idempotent behavior means the user can safely re-run assemble after completing a missing stage
- HTML generated only for facilitator guides and marketing files — participant materials and transfer plan are markdown-only per scope locked in 15-01

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 03 will add an assemble call to approve.md so the delivery package is assembled automatically when the user approves the final curriculum
- assemble.md is callable standalone (per plan) and designed to accept a call from approve.md

## Self-Check

- [x] `.claude/plugins/curriculum/commands/assemble.md` — FOUND (160 lines)
- [x] References curriculum-voice.md — FOUND
- [x] References facilitator-guide.md — FOUND
- [x] References participant-materials.md — FOUND
- [x] References generate-html.js — FOUND
- [x] References delivery/session- — FOUND
- [x] Does NOT copy session.md (only "Do NOT copy" mention) — VERIFIED
- [x] Does NOT copy slide-outline.md (only "Do NOT copy" mention) — VERIFIED
- [x] Commit af7fd1a exists — VERIFIED

## Self-Check: PASSED

---
*Phase: 15-delivery-layer*
*Completed: 2026-03-25*
