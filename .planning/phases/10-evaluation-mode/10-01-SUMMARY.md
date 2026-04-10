---
phase: 10-evaluation-mode
plan: 01
subsystem: plugin-agents
tags: [curriculum-evaluation, semantic-extraction, validation, three-tier, agent-spec]

requires:
  - phase: 06-validation-layer
    provides: knz-validator.md architectural pattern and stage-09-validation.md schema
  - phase: 08-audit-mode-intake
    provides: source-material/ workspace directory convention

provides:
  - curriculum-evaluator.md — evaluation worker agent with semantic extraction, three-tier rubric, and evaluation-report.md output

affects:
  - 10-02 (evaluation-mode.md command — dispatches this agent)

tech-stack:
  added: []
  patterns:
    - "Semantic extraction before schema checks — extract content meaning, then check pedagogical requirements"
    - "Duration inference cascade — HIGH/MEDIUM/LOW/assumed confidence levels when duration unknown"
    - "Thin-content fallback — general guidance with explicit flag rather than hallucinated specifics"
    - "Write restriction to source-material/ — mirroring 08-validation/ restriction in knz-validator.md"

key-files:
  created:
    - .claude/plugins/curriculum/agents/curriculum-evaluator.md
  modified: []

key-decisions:
  - "Semantic equivalence rule (Rule 2) explicit — source documents never use pipeline field names; extraction failure not curriculum failure"
  - "Duration inference adds confidence levels (HIGH/MEDIUM/LOW/assumed) to completion signal — Plan 02 command can display confidence to user"
  - "Tier 2 scores output as N/10 integers in report (consistent with Phase 6 convention — Math.round from 0.0–1.0)"
  - "Thin-content fallback applied per check, not per report — specific sections can be thin while others have full evidence"
  - "Report opens with strengths section — negative-only reports create defensiveness; strengths ground the feedback"
  - "Human Review Items section omitted entirely if no Tier 3 items apply — cleaner report for simple curricula"

patterns-established:
  - "Evaluation agent mirrors validation agent structure (knz-validator.md) but replaces structured field reads with semantic extraction"
  - "Plain-language-only output rule (Rule 9) enforced in both report and completion signal — schema vocabulary never reaches user"

requirements-completed: [EVAL-01, EVAL-02]

duration: 2min
completed: 2026-03-24
---

# Phase 10 Plan 01: Evaluation Mode — Curriculum Evaluator Agent Summary

**Semantic extraction worker agent for external curriculum evaluation — reads unstructured source documents, applies three-tier validation rubric semantically, and writes a scored evaluation-report.md with strengths-first structure and content-grounded recommendations.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-24T02:25:27Z
- **Completed:** 2026-03-24T02:28:01Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Authored complete curriculum-evaluator.md agent spec modeled on knz-validator.md but adapted for unstructured source document input
- Defined semantic extraction model (Rule 1) that builds internal content summary across all validated dimensions before any check runs
- Established duration inference cascade with confidence levels (HIGH/MEDIUM/LOW/assumed) for cases where program duration is unknown
- Enforced write restriction to source-material/ with explicit 08-validation/ prohibition and explicit error handling under all conditions
- Built Check Translation Table for T1-01 through T1-33 in plain language — no schema vocabulary in user-facing output
- Defined five Tier 2 dimension descriptions as semantic evidence patterns for unstructured documents

## Task Commits

1. **Task 1: Author curriculum-evaluator.md — evaluation worker agent** - `e86f27d` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `.claude/plugins/curriculum/agents/curriculum-evaluator.md` — Complete evaluation worker agent with 9 rules, Check Translation Table, Tier 2 dimension descriptions, output file spec, completion signal, and error handling

## Decisions Made

- **Semantic equivalence rule is explicit:** Rule 2 names the failure mode ("An evaluation report where every check fails on well-designed curriculum is a semantic extraction failure, not an accurate result"). This prevents the agent from pattern-matching for schema field names that will never appear in external documents.
- **Confidence levels in completion signal:** Duration inference adds HIGH/MEDIUM/LOW/assumed so the orchestrating command (Plan 02) can surface this to the user rather than presenting an inferred duration as fact.
- **Tier 2 scores as N/10 integers:** Consistent with the Phase 6 convention established in the dashboard (Math.round of 0.0–1.0 raw scores). Clean for non-technical users.
- **Thin-content fallback is per-check:** Sections can be partially thin. A well-developed outcomes section should get a substantive recommendation even if sessions are not yet written.
- **Report structure: strengths first, then issues:** Evaluation reports that open with failures create defensive reactions. Naming what works well first creates receptiveness to the issues that follow.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- curriculum-evaluator.md is complete and ready to be dispatched by evaluation-mode.md (Plan 02)
- Completion signal format is stable — Plan 02 can parse `tier_1_failures`, `tier_2_scores`, `tier_3_items`, `program_duration_used`, and `file_written` directly
- Write restriction and path conventions are established — Plan 02 should reference source-material/ as the report location in its user-facing output

---
*Phase: 10-evaluation-mode*
*Completed: 2026-03-24*
