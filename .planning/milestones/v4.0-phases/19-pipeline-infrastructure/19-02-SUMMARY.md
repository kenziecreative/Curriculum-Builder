---
phase: 19-pipeline-infrastructure
plan: "02"
subsystem: pipeline
tags: [curriculum-pipeline, validation, quality-gates, input-validation, draft-audit]

# Dependency graph
requires:
  - phase: 19-01
    provides: curriculum-registry.json as the central data source that input validation reads from

provides:
  - Pre-execution input validation in all 8 downstream stage commands (outcomes through validate)
  - Draft-then-audit pipeline for stages 4-6 (modules, sessions, metaskills)
  - Four-check audit gate: file completeness, registry consistency, vocabulary scan, schema compliance
  - Auto-fix logic for vocabulary violations before promotion
  - Named failure messages pointing to the specific missing field and which command to re-run

affects: [20-integrity-checks, any phase that generates content in stages 4-6]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Input Validation prerequisite step: numbered step after stage prereq check, before status check — validates registry fields exist before generation starts"
    - "Draft-then-audit write pattern: generate to {stage-dir}/_drafts/, run four checks, auto-fix vocab violations, promote or report failures"
    - "Four-check audit sequence: completeness → registry consistency → vocabulary scan → schema compliance"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/outcomes.md
    - .claude/plugins/curriculum/commands/assessments.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/metaskills.md
    - .claude/plugins/curriculum/commands/transfer.md
    - .claude/plugins/curriculum/commands/marketing.md
    - .claude/plugins/curriculum/commands/validate.md

key-decisions:
  - "Input Validation is additive — existing stage status checks remain unchanged; validation is a new numbered prerequisite step between the predecessor status check and the current stage status check"
  - "validate.md gets a simpler check — registry file existence only, since it reads everything and cannot enumerate specific missing fields at the prerequisite stage"
  - "metaskills.md _drafts path uses {metaskills-dir} variable (05-metaskills legacy / 06-metaskills new) — scheme-aware via existing detection block at command top"
  - "Auto-fix for vocabulary violations references curriculum-voice.md substitution table — plain-language replacements are already specified there, no duplication needed"
  - "Failure messages name the specific field and the command to re-run — mirrors the pattern established in Phase 18 for failure message clarity"

requirements-completed:
  - PIPE-01
  - PIPE-02

# Metrics
duration: 5min
completed: 2026-03-27
---

# Phase 19 Plan 02: Pipeline Quality Gates Summary

**Pre-execution input validation added to all 8 downstream commands, plus draft-then-audit pipeline for stages 4-6 with four-check gate and auto-fix vocabulary substitution**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-27T14:53:52Z
- **Completed:** 2026-03-27T14:58:38Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- All 8 downstream stage commands (outcomes through validate) now validate registry fields before generation starts — missing data stops execution with a specific named error
- Stages 4-6 (modules, sessions, metaskills) now write to `_drafts/` subdirectory first and run four audit checks before promoting content to the deliverable directory
- Vocabulary violations in drafts are auto-fixed using the curriculum-voice.md substitution table before reporting failures
- Draft audit failure messages name the specific file and problem, and tell the user which command to re-run

## Task Commits

1. **Task 1: Add pre-execution input validation to all downstream stage commands** - `4d31352` (feat)
2. **Task 2: Add draft-then-audit flow to stages 4-6** - `d6286a9` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/outcomes.md` - Added Input Validation step: checks learner_profile.data fields (target_audience, expertise_level, skill_type, transfer_context, contact_hours)
- `.claude/plugins/curriculum/commands/assessments.md` - Added Input Validation step: checks outcome_wording program_outcomes and module_outcomes with id and statement fields
- `.claude/plugins/curriculum/commands/modules.md` - Added Input Validation step + Draft Audit section; write target changed to `_drafts/`
- `.claude/plugins/curriculum/commands/sessions.md` - Added Input Validation step; Task output directory changed to `_drafts/`; File Verification replaced by Draft Audit section
- `.claude/plugins/curriculum/commands/metaskills.md` - Added Input Validation step + Draft Audit section; write target changed to `{metaskills-dir}/_drafts/` (scheme-aware)
- `.claude/plugins/curriculum/commands/transfer.md` - Added Input Validation step: checks transfer_context, skill_type, contact_hours, success_criteria, program_outcomes
- `.claude/plugins/curriculum/commands/marketing.md` - Added Input Validation step: checks target_audience, transfer_context, program_outcomes, assessment_criteria
- `.claude/plugins/curriculum/commands/validate.md` - Added Input Validation step: checks registry file existence

## Decisions Made

- Input Validation is additive — existing stage status checks remain unchanged; it is a new numbered prerequisite step slotted between predecessor status check and current stage status check
- validate.md gets existence-only check since it reads everything and cannot enumerate specific fields at the prerequisite stage
- metaskills.md _drafts path is scheme-aware via `{metaskills-dir}` variable (05-metaskills legacy / 06-metaskills new)
- Auto-fix for vocabulary violations references curriculum-voice.md substitution table rather than duplicating the table inline

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Phase 19-03 (if planned) can build on the draft-then-audit infrastructure
- Phase 20 (Integrity) can use the registry consistency check pattern established here as a reference for the integrity agent's cross-stage validation approach

---
*Phase: 19-pipeline-infrastructure*
*Completed: 2026-03-27*
