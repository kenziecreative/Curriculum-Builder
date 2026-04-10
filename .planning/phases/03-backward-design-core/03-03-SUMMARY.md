---
phase: 03-backward-design-core
plan: "03"
subsystem: curriculum-pipeline
tags: [knz-assessments, knz-outcomes, bloom-taxonomy, virtual-delivery, formative-assessment]

# Dependency graph
requires:
  - phase: 03-backward-design-core
    provides: knz-assessments command and formative-assessments.md test artifact from plan 03-02
provides:
  - Hardened Step 6 in knz-assessments.md — modality read from exact file path with fail-safe for missing field
  - Corrected FA-2 in formative-assessments.md — oral format substituted to written for virtual delivery
  - Updated knz-outcomes.md — Bloom span floor enforced as max(duration_scaled, 4) for all program sizes
affects: [phase-04-dashboard, phase-05-module-session, any future test runs of the Stage 2→3 pipeline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Fail-safe direction: when required field is missing, apply the more restrictive constraint (treat as virtual, not skip)"
    - "Global floor over duration-scaled: schema global floor (4 Bloom levels) overrides duration-scaled minimum in enforcement logic"

key-files:
  created: []
  modified:
    - .claude/commands/knz-assessments.md
    - .claude/commands/knz-outcomes.md
    - workspace/test-program/02-assessments/formative-assessments.md

key-decisions:
  - "Step 6 modality read uses exact file path (workspace/{project-name}/00-project-brief/project-brief.md) — eliminates ambiguity that caused silent skip in Phase 3 verification"
  - "Missing modality field defaults to virtual (fail-safe direction) — prevents oral assessments from slipping through when field is absent"
  - "Bloom span enforced as max(duration_scaled_minimum, 4) — short and medium programs must span 4 levels, matching the schema global floor in stage-02-outcomes.md line 122"

patterns-established:
  - "Enforcement fail-safe: when a constraint-triggering field cannot be read, apply the constraint rather than skip it"
  - "Schema global floor takes precedence over duration-scaled table values in enforcement logic and in checklist language"

requirements-completed: [PIPE-05, OUTC-01, OUTC-02, OUTC-03, OUTC-04, ASMT-01, ASMT-02, ASMT-03, ASMT-04]

# Metrics
duration: 5min
completed: 2026-03-20
---

# Phase 3 Plan 03: Gap Closure Summary

**Surgical enforcement fixes: Step 6 modality path hardened with fail-safe, FA-2 oral→written substitution applied, Bloom span floor raised to 4 for all program sizes via max(duration_scaled, 4)**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-20T11:13:34Z
- **Completed:** 2026-03-20T11:18:48Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Step 6 in knz-assessments.md now reads modality from the exact file path specified in the Generation section, eliminating the ambiguity that caused the silent skip during Phase 3 verification
- Fail-safe added: missing modality field defaults to virtual (not skip), preventing oral assessments from slipping through on incomplete data
- FA-2 in formative-assessments.md corrected from oral to written — title, instructions, and success_criteria updated to written-format equivalents; no oral format values remain in the file
- knz-outcomes.md Step 2 now enforces max(duration_scaled_minimum, 4) as the effective floor — medium programs with 3 Bloom levels now trigger auto-add behavior instead of passing
- Generation section thinking-level span table updated to show enforced minimums; Schema Compliance Checklist updated to reference the 4-level global minimum

## Task Commits

1. **Task 1: Harden Step 6 + correct FA-2 oral→written** - `e47760b` (fix)
2. **Task 2: Enforce max(duration_scaled, 4) Bloom span floor** - `f8c0e42` (fix)

## Files Created/Modified

- `.claude/commands/knz-assessments.md` — Step 6 opening instruction now specifies exact file path; fail-safe for missing modality field added
- `.claude/commands/knz-outcomes.md` — Step 2 enforced minimum table added; Generation section span table updated; Schema Compliance Checklist updated
- `workspace/test-program/02-assessments/formative-assessments.md` — FA-2 corrected from oral to written format

## Decisions Made

- Step 6 modality read references the exact file path already used in the Generation section to eliminate ambiguity — "Stage 01 intake" was underspecified
- Missing modality defaults to virtual (not skip) — fail-safe direction consistent with the principle that enforcement should err toward constraint application
- Bloom span floor is max(duration_scaled_minimum, 4) per schema line 122 — duration-scaled values for short and medium programs were below the schema's global floor

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 3 enforcement gaps are closed; the Stage 2→3 pipeline is now correct for virtual programs and for programs of any size regarding Bloom span
- Phase 4 (Dashboard) and Phase 5 (Module/Session) can proceed — both depend on Phase 3 output being correct
- No blockers introduced by this plan

---
*Phase: 03-backward-design-core*
*Completed: 2026-03-20*

## Self-Check: PASSED

- FOUND: .planning/phases/03-backward-design-core/03-03-SUMMARY.md
- FOUND: .claude/commands/knz-assessments.md (modified)
- FOUND: .claude/commands/knz-outcomes.md (modified)
- FOUND: workspace/test-program/02-assessments/formative-assessments.md (modified)
- FOUND commit e47760b: fix(03-03): harden Step 6 modality path + correct FA-2 oral→written substitution
- FOUND commit f8c0e42: fix(03-03): enforce max(duration_scaled, 4) Bloom span floor in knz-outcomes
- FOUND commit ac8cb3d: docs(03-03): complete gap-closure plan
