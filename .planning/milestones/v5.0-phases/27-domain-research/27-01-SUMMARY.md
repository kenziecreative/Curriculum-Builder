---
phase: 27-domain-research
plan: "01"
subsystem: curriculum-pipeline
tags: [curriculum, domain-research, tavily, evidence-tagging, hypothesis-gathering]

# Dependency graph
requires:
  - phase: 25-audit-trail-infrastructure
    provides: audit-trail-format.md template and silent write patterns
  - phase: 26-canonical-outcome-registry
    provides: curriculum-registry.json learner_profile.data for research context
provides:
  - /curriculum:research stage command (SKILL.md)
  - Grounding document output to workspace/source-material/domain-research-findings.md
  - Domain research audit trail section (Stage 1.5)
affects:
  - 27-domain-research (Plan 02 — intake chaining and skip logic integration)
  - All downstream stages (outcomes, assessments, modules, sessions, metaskills, transfer, marketing) via source-material auto-pickup

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Evidence-label tagging pattern: SUPPORTED / COMPLICATED / CONTRADICTED / GAP applied per-hypothesis during research"
    - "Plain-language label display: 'Supported by evidence', 'It's more complicated than that', etc."
    - "Grounding document convention: domain-research-findings.md with per-finding curriculum implication"
    - "Stage 1.5 audit trail section: appended between Stage 1 and Stage 2"
    - "Hard approval gate pattern: SME must say 'Yes, let's go' before grounding doc is written"

key-files:
  created:
    - .claude/commands/curriculum/research/SKILL.md
  modified: []

key-decisions:
  - "Domain research is Stage 1.5 — inserts between intake and outcomes, not woven into intake"
  - "Evidence labels applied per-hypothesis during research, not after all research completes (RSRCH-03)"
  - "Grounding document lands in source-material/ for automatic downstream pickup via existing loading blocks"
  - "CONTRADICTED findings presented with deference — SME can confirm or add context the research missed"
  - "Source material skip guard included in prerequisites — command exits gracefully when materials already exist"

patterns-established:
  - "Progress indicator pattern: 'Researched N of total: [claim summary] — plain-language label' shown after each hypothesis"
  - "Claims guardrail: push for at least 3, guide toward consolidation above 7"
  - "Grounding doc implication field: per-finding one-sentence instruction for downstream stages"

requirements-completed: [RSRCH-01, RSRCH-02, RSRCH-03, RSRCH-04, RSRCH-05]

# Metrics
duration: 2min
completed: "2026-03-29"
---

# Phase 27 Plan 01: Domain Research Summary

**New /curriculum:research stage command with hypothesis gathering, Tavily web research, SUPPORTED/COMPLICATED/CONTRADICTED/GAP evidence tagging, SME review checkpoint with hard gate, and grounding document output to source-material/ for automatic downstream pickup**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-29T22:20:00Z
- **Completed:** 2026-03-29T22:22:18Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created complete `/curriculum:research` SKILL.md (325 lines) following established stage command patterns from intake and outcomes
- Implemented per-hypothesis evidence tagging with SUPPORTED/COMPLICATED/CONTRADICTED/GAP labels applied during research (not after)
- Built SME review checkpoint with deference pattern for CONTRADICTED findings and hard approval gate before grounding doc is written
- Grounding document written to `workspace/source-material/domain-research-findings.md` with per-finding curriculum implications for downstream stages
- Audit trail section (Stage 1.5) follows audit-trail-format.md with Build Summary counter updates, written silently

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the /curriculum:research SKILL.md command** - `9a0088c` (feat)

**Plan metadata:** (docs commit — see final commit below)

## Files Created/Modified

- `.claude/commands/curriculum/research/SKILL.md` — Full domain research stage command: prerequisites, hypothesis gathering, Tavily research, SME review, grounding document, audit trail, STATE.md updates

## Decisions Made

- Evidence labels applied per-hypothesis as research completes (not batched after all research) — enforces RSRCH-03 requirement and gives SME earlier visibility into findings
- Grounding document uses `domain-research-findings.md` filename by default (Claude's discretion per CONTEXT.md) but per-finding file organization remains at Claude's discretion
- Source material skip guard placed in prerequisites at step 4 — exits gracefully before any user interaction begins
- Stage numbered 1.5 in audit trail to sit between Stage 1: Intake and Stage 2: Outcomes without renumbering existing stages

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `/curriculum:research` command is complete and discoverable
- Plan 02 (intake chaining) is the logical next step: intake needs to chain to research for from-scratch builds and the skip logic at the intake level needs to be wired up
- All downstream stage commands will auto-pickup `domain-research-findings.md` via their existing source material loading blocks — no changes needed to those stages

---

*Phase: 27-domain-research*
*Completed: 2026-03-29*
