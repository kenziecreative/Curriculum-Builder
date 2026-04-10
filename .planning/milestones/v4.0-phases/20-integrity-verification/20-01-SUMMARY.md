---
phase: 20-integrity-verification
plan: "01"
subsystem: curriculum-plugin
tags: [verification, anti-softening, quality-gates, curriculum-pipeline]

# Dependency graph
requires:
  - phase: 19-pipeline-infrastructure
    provides: draft-then-audit pipeline in stages 4-6 (the pipeline pass/fail judgments these sections protect)
provides:
  - Anti-softening enforcement embedded in all 7 pass/fail judgment points
  - Prohibited-qualifier word list in every checking agent
  - "A check either passes its defined criteria or it fails" rule as structural constraint
affects:
  - 20-02 (any further integrity verification work)
  - All future curriculum pipeline runs that invoke knz-validator, curriculum-evaluator, verify, approve, modules, sessions, or metaskills

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Verification Integrity section placed BEFORE judgment logic in every checking agent — not after, not at end of file"
    - "## heading level for standalone agent/command files; ### heading level for sections embedded inside Draft Audit subsections"
    - "Prohibited-qualifier list inline in each file (not via shared reference) — each file self-contained"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/agents/knz-validator.md
    - .claude/plugins/curriculum/agents/curriculum-evaluator.md
    - .claude/plugins/curriculum/commands/verify.md
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/metaskills.md

key-decisions:
  - "Verification Integrity sections are inline in each file, not a shared reference — each agent self-contained so no dependency chain required to load enforcement rules"
  - "approve.md gets Verification Integrity because it PRESENTS check results from other agents — it must not soften what they reported"
  - "### heading level for draft-audit embedded sections — matches the heading hierarchy of the surrounding Draft Audit section"

patterns-established:
  - "Verification Integrity: every file that makes or presents a pass/fail judgment contains the anti-softening section placed before the judgment point"

requirements-completed: [INTG-04]

# Metrics
duration: 2min
completed: 2026-03-27
---

# Phase 20 Plan 01: Verification Integrity Summary

**Anti-softening enforcement added to all 7 pass/fail judgment points — prohibited-qualifier word list and 5 binary-judgment rules now inline in every checking agent**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-27T20:50:06Z
- **Completed:** 2026-03-27T20:51:41Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Added `## Verification Integrity` section to 4 standalone agent/checker files (knz-validator, curriculum-evaluator, verify, approve) before each file's judgment logic
- Added `### Verification Integrity` section to 3 draft-audit command files (modules, sessions, metaskills) immediately before the Audit Result judgment in each
- Every section contains identical content: 5 binary-judgment rules + prohibited-qualifier word list + "mostly passes" trigger warning

## Task Commits

1. **Task 1: Add Verification Integrity to agent and checker files** - `3b7246b` (feat)
2. **Task 2: Add Verification Integrity to draft-audit command files** - `f449196` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `.claude/plugins/curriculum/agents/knz-validator.md` — Verification Integrity added after Vocabulary Guardrails, before Context Received
- `.claude/plugins/curriculum/agents/curriculum-evaluator.md` — Verification Integrity added before Evaluation Rules
- `.claude/plugins/curriculum/commands/verify.md` — Verification Integrity added after Writing for Clarity, before Step 1
- `.claude/plugins/curriculum/commands/approve.md` — Verification Integrity added after Never-say List, before Behavior
- `.claude/plugins/curriculum/commands/modules.md` — Verification Integrity added before Audit Result in Draft Audit section
- `.claude/plugins/curriculum/commands/sessions.md` — Verification Integrity added before Audit Result in Draft Audit section
- `.claude/plugins/curriculum/commands/metaskills.md` — Verification Integrity added before Audit Result in Draft Audit section

## Decisions Made

- Sections are inline in each file rather than via shared reference — each agent is self-contained so loading a checking agent automatically loads its enforcement rules without an additional file dependency.
- approve.md received Verification Integrity even though it presents check results rather than running checks directly — it can soften reported failures when writing output, so it needs the same constraint.
- Draft-audit sections use ### heading level to fit the hierarchy of the enclosing section.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 7 pass/fail judgment files now contain structural anti-softening enforcement
- Phase 20 Plan 02 (if it exists) can build on this foundation
- Ready for whatever comes next in the integrity verification phase

---
*Phase: 20-integrity-verification*
*Completed: 2026-03-27*
