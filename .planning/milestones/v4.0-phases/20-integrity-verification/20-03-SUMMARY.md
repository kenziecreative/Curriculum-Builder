---
phase: 20-integrity-verification
plan: "03"
subsystem: curriculum-plugin
tags: [cross-stage-tracing, integrity-check, approve, curriculum-registry, bidirectional-tracing]

# Dependency graph
requires:
  - phase: 20-01
    provides: Verification Integrity anti-softening rules already in approve.md
  - phase: 19-01
    provides: curriculum-registry.json as canonical data source for cross-stage tracing
provides:
  - Cross-stage integration check auto-triggered at final approval gate
  - Bidirectional tracing of outcome IDs, assessment links, and module references
  - Plain-language integrity findings folded into unified approval summary
  - Four-branch gate decision logic combining verify_issues and integration_findings.blocking
affects: [approve.md, curriculum-registry, final-validation-gate]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Registry-wins: curriculum-registry.json is authoritative source for all IDs; stage file drift is WARNING not blocking"
    - "Pending-vs-broken: missing stage directory = pending (informational); stage exists but ID missing = broken (blocking)"
    - "Unified approval view: cross-stage integrity findings folded into approve.md summary, not a separate report"
    - "Four-branch gate: verify_issues x integration_findings.blocking = four distinct Option 1 messages"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/approve.md

key-decisions:
  - "Cross-stage integration check runs alongside verify spawn at Final Validation gate — both populate before the summary is shown"
  - "Findings stored as integration_findings JSON with blocking/warnings/pending arrays"
  - "Blocking findings (broken refs, orphaned outcomes, phantom/unregistered modules) block approval same as verify_issues"
  - "Registry-file drift is WARNING — registry wins per Phase 19 principle; user decides if stage file wording matters"
  - "Plain-language descriptions used for all user-facing findings — no 'orphaned reference', 'phantom module', or 'registry drift' shown to SME"
  - "Pending stages (not yet generated) are INFORMATIONAL — not failures"

patterns-established:
  - "Integration check: bidirectional tracing across three link types (outcomes, assessments, modules) using registry as canonical source"
  - "Gate branch logic: verify_issues and integration_findings.blocking are evaluated independently, four combinations map to four Option 1 texts"

requirements-completed: [INTG-02]

# Metrics
duration: 5min
completed: 2026-03-27
---

# Phase 20 Plan 03: Cross-Stage Integration Check Summary

**Bidirectional cross-stage tracing added to approve.md final gate — three link types (outcomes, assessments, modules) verified against curriculum-registry.json, with plain-language findings folded into the unified approval summary**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-27T20:50:00Z
- **Completed:** 2026-03-27T20:55:09Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Cross-Stage Integration Check section added to approve.md, running alongside verify spawn at Final Validation gate
- Three bidirectional traces implemented: Outcome IDs (Stage 2 registry vs Stages 3/4/5), Assessment Links (registry vs stage files), Module References (registry vs stage 4/5 directories)
- Registry-file drift detection added as WARNING (non-blocking), following Phase 19 "registry wins" principle
- Integration findings folded into "Your Complete Curriculum Package" summary as a "Curriculum integrity" section
- Gate decision updated with four-branch logic combining verify_issues and integration_findings.blocking — warnings never block approval

## Task Commits

1. **Task 1: Add cross-stage integration check to approve.md** - `42499a5` (feat)
2. **Task 2: Fold integration findings into approval summary and gate decision** - `a66e875` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/approve.md` — Cross-Stage Integration Check section added (Task 1); Curriculum integrity display and four-branch gate decision added (Task 2)

## Decisions Made

- Cross-stage check runs in the same preparation step as the verify spawn — both complete before the summary is shown. This keeps the flow linear: collect all findings, then display once.
- Pending-vs-broken distinction uses the established pattern from knz-validator ("Not applicable — Stage N not yet generated") — same heuristic, stage directory existence on disk is the signal.
- Blocking findings (broken references, orphaned outcomes, phantom modules, unregistered modules) block approval at the same level as verify_issues — no distinction in severity between the two check systems.
- Gate decision uses four explicit branches rather than a combined "either" check — makes the exact Option 1 message match the specific failure mix precisely.
- Plain-language finding descriptions avoid all internal labels: "phantom module" becomes "listed in the curriculum plan but has no session files"; "registry drift" becomes "wording difference between the master plan and stage files".

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 20 Plan 03 complete. approve.md now has full cross-stage integrity verification at the final gate.
- The three-plan phase 20 integrity suite is now complete: Plan 01 (anti-softening Verification Integrity sections), Plan 02 (content-level checks in draft-then-audit pipeline), Plan 03 (cross-stage integration check at approval gate).

---
*Phase: 20-integrity-verification*
*Completed: 2026-03-27*
