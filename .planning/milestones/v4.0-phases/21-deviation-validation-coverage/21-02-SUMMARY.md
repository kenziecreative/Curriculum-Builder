---
phase: 21-deviation-validation-coverage
plan: "02"
subsystem: curriculum-pipeline
tags: [draft-audit, validation, transfer, marketing, quality-gates]

# Dependency graph
requires:
  - phase: 19-pipeline-infrastructure
    provides: Draft-then-audit pattern established in modules.md (template followed here)
  - phase: 20-integrity-verification
    provides: Verification Integrity section pattern (anti-softening enforcement block)
provides:
  - Draft-then-audit pipeline for transfer.md (stage 7) with 10 checks covering T1-25 through T1-30
  - Draft-then-audit pipeline for marketing.md (stage 8) with 7 checks covering T1-31 through T1-33
  - Full promotion gate coverage across all content-generating stages (4-8)
affects:
  - phase: 22-new-capabilities (any new content stage must include draft-then-audit)
  - curriculum-approve (final gate now runs after all stages have already passed draft audits)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Draft-then-audit pattern extended to stages 7 and 8 — write to _drafts/, run checks, promote only on pass"
    - "3-attempt retry with cumulative constraint injection for content failures"
    - "Structural failures (completeness, registry, schema) stop immediately — no retry"
    - "Escalation uses plain-language problem + location + suggestion format"
    - "STATE.md writes conditional on successful promotion — not on file write"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/transfer.md
    - .claude/plugins/curriculum/commands/marketing.md

key-decisions:
  - "Transfer Draft Audit has 10 checks: 4 standard + 6 stage-specific (T1-25 transfer layers, T1-26 implementation intentions, T1-27 error management, T1-28 spaced retrieval match, T1-29 evaluation level, T1-30 community continuation)"
  - "Marketing Draft Audit has 7 checks: 4 standard + 3 stage-specific (T1-31 source citation completeness, T1-32 source element existence, T1-33 marketing ratio)"
  - "Marketing ratio auto-fix on retry specifies trimming targets: learning promises first, then audience positioning, keep direct-strength claims"
  - "STATE.md update in marketing.md is conditional on promotion — not on file write — consistent with transfer.md and stages 4-6 pattern"

patterns-established:
  - "Draft-then-audit: all content stages (4-8) now write to _drafts/ before deliverable directories"
  - "Verification Integrity block is inline in each command file — agents self-contained, enforcement loads automatically"

requirements-completed: [DEVL-02]

# Metrics
duration: 3min
completed: 2026-03-27
---

# Phase 21 Plan 02: Transfer and Marketing Draft-Audit Pipelines Summary

**Draft-then-audit pipeline added to transfer.md (10 checks, T1-25 to T1-30) and marketing.md (7 checks, T1-31 to T1-33) — all content stages 4-8 now have promotion gates**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-27T23:31:53Z
- **Completed:** 2026-03-27T23:35:10Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- transfer.md now writes to `06-transfer/_drafts/` and runs 10 audit checks before promoting to the deliverable directory
- marketing.md now writes to `07-marketing/_drafts/` and runs 7 audit checks before promoting to the deliverable directory
- Both files include Verification Integrity sections (anti-softening enforcement), 3-attempt retry with cumulative constraints, and plain-language escalation after 3 failures
- Stage 8 STATE.md update is now conditional on successful promotion (was unconditional after file write)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add draft-then-audit pipeline to transfer.md** - `a3298b3` (feat)
2. **Task 2: Add draft-then-audit pipeline to marketing.md** - `4a8fc24` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `.claude/plugins/curriculum/commands/transfer.md` - Added _drafts/ write target, 10-check Draft Audit (T1-25 to T1-30), 3-attempt retry, escalation, Verification Integrity
- `.claude/plugins/curriculum/commands/marketing.md` - Added _drafts/ write target, 7-check Draft Audit (T1-31 to T1-33), 3-attempt retry with ratio auto-fix, escalation, Verification Integrity, conditional STATE.md update

## Decisions Made
- Transfer checks 5-10 are all blocking failures requiring regeneration — no structural auto-fix possible for prose content
- Marketing Check 7 (ratio) includes specific auto-fix trim targets on retry, unlike other content checks
- STATE.md in marketing.md moved to be conditional on promotion — was previously written immediately after file write, which could mark a stage complete before the audit ran

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- All content stages (4-8) now have draft-then-audit pipelines with promotion gates
- Sessions.md and metaskills.md (stages 5-6) were updated in prior phases — pipeline coverage is complete
- Ready for Phase 21 Plan 03 if it exists, otherwise Phase 21 is complete

---
*Phase: 21-deviation-validation-coverage*
*Completed: 2026-03-27*
