---
phase: 26-canonical-outcome-registry
plan: 01
subsystem: curriculum-plugin
tags: [curriculum-registry, learner-profile, outcome-wording, canon, skill-md]

# Dependency graph
requires:
  - phase: 25-audit-trail-infrastructure
    provides: audit trail format and registry write patterns established by intake and outcomes stages
provides:
  - All 6 downstream generation stages (3-8) read learner profile from curriculum-registry.json learner_profile.data
  - All 6 downstream generation stages enforce canonical outcome wording from curriculum-registry.json outcome_wording
  - CANON-01 confirmed: outcomes/SKILL.md writes outcome_wording to registry on approval
affects:
  - 27-domain-research-integration
  - 28-alignment-verification
  - Any stage that reads from the curriculum pipeline

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Registry-first data sourcing: structured learner data reads go to curriculum-registry.json learner_profile.data, not project-brief.md"
    - "Canonical outcome injection: generation stages pull verbatim outcome statements from outcome_wording registry section"
    - "Marketing derivation exception: marketing derives emotional copy from canonical outcomes but maintains outcome ID linkage for traceability"

key-files:
  created: []
  modified:
    - .claude/commands/curriculum/assessments/SKILL.md
    - .claude/commands/curriculum/modules/SKILL.md
    - .claude/commands/curriculum/sessions/SKILL.md
    - .claude/commands/curriculum/metaskills/SKILL.md
    - .claude/commands/curriculum/transfer/SKILL.md
    - .claude/commands/curriculum/marketing/SKILL.md

key-decisions:
  - "Stages 3-8 read skill_type, contact_hours, modality, transfer_context, and related learner fields from curriculum-registry.json learner_profile.data — not from project-brief.md"
  - "project-brief.md is retained as a human-readable narrative document but is no longer a structured data source for any generation stage"
  - "Marketing is the only stage allowed to derive (not copy verbatim) outcome wording — it must maintain outcome ID linkage via audit trail for Phase 28 traceability"
  - "sessions/SKILL.md passes outcome_wording section from registry to each Task worker, not just learner_profile data"

patterns-established:
  - "Do not read these fields from project-brief.md: canonical phrase appended to every structured data read replacement"
  - "Canonical outcome wording block: standard directive format added to all 6 generation stage SKILL.md files after the learner_profile read"

requirements-completed: [CANON-01, CANON-02, CANON-04]

# Metrics
duration: 12min
completed: 2026-03-29
---

# Phase 26 Plan 01: Canonical Outcome Registry Summary

**Registry-first data sourcing enforced across all 6 downstream stages — learner profile reads switched from project-brief.md to curriculum-registry.json, and verbatim outcome wording injection added to prevent paraphrase drift**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-29
- **Completed:** 2026-03-29
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- All 6 downstream generation stages (assessments, modules, sessions, metaskills, transfer, marketing) now read structured learner data from curriculum-registry.json learner_profile.data instead of project-brief.md
- All 6 stages have a canonical outcome wording directive — 5 structural stages require verbatim wording, marketing stage uses derivation with outcome ID linkage
- CANON-01 confirmed present and correct: outcomes/SKILL.md writes the full outcome_wording section to the registry on approval
- sessions/SKILL.md updated to pass outcome_wording section to each Task worker subagent so session content can enforce canonical wording

## Task Commits

Each task was committed atomically:

1. **Task 1: Switch learner profile reads to registry** - `3ca1f60` (feat)
2. **Task 2: Add canonical outcome wording injection** - `822e0d0` (feat)

## Files Created/Modified
- `.claude/commands/curriculum/assessments/SKILL.md` — reads skill_type, contact_hours, modality from learner_profile.data; canonical outcome wording directive added
- `.claude/commands/curriculum/modules/SKILL.md` — reads contact_hours, skill_type, self_direction_level, modality, transfer_context from learner_profile.data; canonical outcome wording directive added
- `.claude/commands/curriculum/sessions/SKILL.md` — passes learner_profile.data (all 9 fields) and outcome_wording section to Task workers; canonical wording directive in Task instructions
- `.claude/commands/curriculum/metaskills/SKILL.md` — reads contact_hours and transfer_context from learner_profile.data; canonical outcome wording directive added
- `.claude/commands/curriculum/transfer/SKILL.md` — reads contact_hours, transfer_context, skill_type, target_audience, success_criteria from learner_profile.data; canonical outcome wording directive added
- `.claude/commands/curriculum/marketing/SKILL.md` — reads target_audience, transfer_context, contact_hours from learner_profile.data; reads program name from meta.project_name; marketing exception canonical wording directive with audit trail linkage requirement

## Decisions Made
- project-brief.md retained as human-readable narrative document but stripped as a structured data source from all generation stages. The file still exists in workspaces and can be read for narrative context, but no stage should pull skill_type, contact_hours, modality, or similar structured fields from it.
- marketing/SKILL.md gets a derivation exception rather than verbatim requirement — conversion copy cannot use literal outcome statements, but outcome ID linkage ensures Phase 28 (Alignment Verification) can trace every marketing claim to a canonical outcome.
- sessions/SKILL.md's Task workers receive the full outcome_wording section from the registry because they generate content downstream and need canonical wording available without having to re-read the registry themselves.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- CANON-01, CANON-02, CANON-04 are complete — canonical registry infrastructure is in place
- Phase 27 (Domain Research Integration) can proceed: the registry is the authoritative source for all learner and outcome data across the pipeline
- Phase 28 (Alignment Verification) has the outcome ID linkage it needs from marketing to do traceability checks

---
*Phase: 26-canonical-outcome-registry*
*Completed: 2026-03-29*
