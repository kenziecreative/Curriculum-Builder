---
phase: 03-backward-design-core
plan: 02
subsystem: plugin-commands
tags: [knz-assessments, assessments, bloom, backward-design, stage-03, pipe-05, command, alignment-map]

# Dependency graph
requires:
  - phase: 03-01
    provides: /knz-outcomes command and test workspace with Stage 2 complete — prerequisite for /knz-assessments
  - phase: 01-schema-and-foundation
    provides: stage-03-assessments.md schema defining required fields, enum values, skill-type constraints, and output file format
  - phase: 02-core-plugin-infrastructure
    provides: AskUserQuestion gate pattern, silent state update convention, and three-option approve/concern/start-over structure
provides:
  - /knz-assessments command (knz-assessments.md) — Stage 3 of the backward design pipeline
  - Full Stage 2→3 pipeline verified end-to-end against test workspace (workspace/test-program/)
  - test-program 01-outcomes/ and 02-assessments/ files confirming both stages complete and Post-Assessment gate approved
affects: [04-dashboard, 05-module-session]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "PIPE-05 gate pattern: AskUserQuestion after alignment map display; stage/gate STATUS writes happen only in the Approve branch — never in concern or start-over branches"
    - "Gate status progression: not-reached → pending (when alignment map first shown) → approved (only on explicit Approve selection)"
    - "File-write timing: 02-assessments/ files written only after approval; never during generation or review"
    - "Auto-elevation before display: assessment Bloom level silently raised to match objective level before alignment map is shown"
    - "Plain language alignment map: Type shows 'formative check'/'final assessment'; Bloom Match column shows human-readable relationship (e.g., Apply >= Apply)"

key-files:
  created:
    - .claude/commands/knz-assessments.md
    - workspace/test-program/01-outcomes/enduring-understandings.md
    - workspace/test-program/01-outcomes/essential-questions.md
    - workspace/test-program/01-outcomes/learning-objectives.md
    - workspace/test-program/02-assessments/assessment-map.md
    - workspace/test-program/02-assessments/formative-assessments.md
    - workspace/test-program/02-assessments/summative-assessments.md
  modified:
    - workspace/test-program/STATE.md

key-decisions:
  - "PIPE-05 gate timing: Post-Assessment status moves to pending when alignment map is first presented; moves to approved only on explicit 'Approve and continue' — concern and start-over branches never advance status"
  - "Five-step constraint enforcement runs silently before display: (1) coverage, (2) Bloom alignment + auto-elevation, (3) formative coverage, (4) success criteria observable verbs, (5) skill-type compliance"
  - "Plain language alignment map: 'formative check' and 'final assessment' in Type column; Bloom Match shows relational expression not enum values — legible to non-ID users"
  - "Destructive confirmation gate on 'Start this stage over': nested AskUserQuestion prevents accidental restart"
  - "Three output files always written together on approval: assessment-map.md, formative-assessments.md, summative-assessments.md — never partial writes"

patterns-established:
  - "Assessment alignment map as gate evidence: the map IS the evidence the user evaluates; it is shown before AskUserQuestion so approval is an informed decision"
  - "Auto-elevation reporting: transparency note names specific assessment IDs that were elevated and why — confident tone, not apologetic"
  - "Stage-3-only file creation: 02-assessments/ does not exist until approval branch fires; checking for its existence is a valid proxy for gate approval status"

requirements-completed: [ASMT-01, ASMT-02, ASMT-03, ASMT-04, PIPE-05]

# Metrics
duration: ~25min
completed: 2026-03-20
---

# Phase 3 Plan 02: Backward Design Core Summary

**/knz-assessments command with five-step silent constraint enforcement (coverage, Bloom auto-elevation, formative coverage, observable verbs, skill-type compliance), alignment map evidence display, and PIPE-05 AskUserQuestion gate that writes three output files and marks the Post-Assessment gate approved — verified end-to-end against test workspace**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-03-20T00:00:00Z
- **Completed:** 2026-03-20
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Built /knz-assessments command implementing the full Stage 3 generation pipeline: reads Stage 2 outcomes, generates assessments, runs five constraint enforcement steps silently, displays alignment map, and presents the PIPE-05 gate via AskUserQuestion
- Enforced the critical PIPE-05 gate timing: STATE.md writes for stage status and Post-Assessment gate happen only in the "Approve and continue" branch; concern and start-over branches never advance status
- Verified the full Stage 2→3 pipeline end-to-end against workspace/test-program/ — all 12 checkpoints confirmed: 01-outcomes/ and 02-assessments/ files written, Stage 2 and Stage 3 complete, Post-Assessment gate approved, Next Action set to /knz-modules

## Task Commits

Each task was committed atomically:

1. **Task 1: Build /knz-assessments command with PIPE-05 gate** - `06b0f1e` (feat)
   - Also: `7f6ab68` (fix — delivery format constraints + pedagogy doctrine enforcement added during implementation)
2. **Task 2: Verify full Stage 2→3 pipeline end-to-end** - `35ba516` (feat — verification output files)

## Files Created/Modified

- `.claude/commands/knz-assessments.md` — /knz-assessments command with five-step constraint enforcement, alignment map output, and PIPE-05 inline AskUserQuestion gate
- `workspace/test-program/STATE.md` — Updated by pipeline: Stage 2 complete, Stage 3 complete, Post-Assessment gate approved
- `workspace/test-program/01-outcomes/enduring-understandings.md` — Generated by /knz-outcomes verification run
- `workspace/test-program/01-outcomes/essential-questions.md` — Generated by /knz-outcomes verification run
- `workspace/test-program/01-outcomes/learning-objectives.md` — Generated by /knz-outcomes verification run
- `workspace/test-program/02-assessments/assessment-map.md` — Written by /knz-assessments on approval: full alignment map
- `workspace/test-program/02-assessments/formative-assessments.md` — Written by /knz-assessments on approval: formative specs
- `workspace/test-program/02-assessments/summative-assessments.md` — Written by /knz-assessments on approval: summative specs

## Decisions Made

- PIPE-05 gate timing is the most critical correctness requirement: state writes happen only in the approval branch — this was the primary design constraint that drove all branching logic in the command
- Plain language throughout the alignment map: "formative check"/"final assessment" for type; Bloom Match uses relational expression (Apply >= Apply) rather than enum values — non-ID users can read and evaluate the map without vocabulary training
- Destructive confirmation (nested AskUserQuestion) on "Start this stage over" prevents accidental data loss — same pattern as established in Phase 2 for other destructive actions
- Five constraint enforcement steps run silently as an internal pipeline before any output is shown — user only sees corrected results, with a brief transparency note naming specific changes if any were made

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added delivery format constraints and pedagogy doctrine enforcement**
- **Found during:** Task 1 (Build /knz-assessments command)
- **Issue:** Initial implementation lacked explicit constraints on assessment format diversity and pedagogical quality requirements from the schema
- **Fix:** Added enforcement rules for delivery format distribution (ensuring variety beyond single-format assessments) and pedagogical doctrine alignment per project CLAUDE.md
- **Files modified:** .claude/commands/knz-assessments.md
- **Verification:** Command review confirmed format constraints present
- **Committed in:** 7f6ab68

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Auto-fix added correctness requirements for format diversity. No scope creep — constraint enforcement section was already planned; this added specificity.

## Issues Encountered

None during verification — all 12 pipeline checkpoints passed on first run.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Stage 2→3 pipeline is complete and verified: /knz-outcomes + /knz-assessments both operational against test workspace
- Post-Assessment gate is approved in test workspace STATE.md — Stage 4 (/knz-modules) is unblocked
- Phase 3 is now complete: both plans (03-01 and 03-02) done
- Phase 4 (Dashboard) and Phase 5 (Module/Session commands) can proceed — both depend on Phase 3 completing, which it now has
- Next: Phase 4 or Phase 5 per ROADMAP.md priority order

---
*Phase: 03-backward-design-core*
*Completed: 2026-03-20*
