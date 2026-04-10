---
phase: 12-voice-system
plan: 01
subsystem: voice
tags: [voice, style-guide, prohibition-list, curriculum-plugin, reference-file]

# Dependency graph
requires: []
provides:
  - Shared voice reference file at .claude/reference/curriculum-voice.md
  - Confident-colleague baseline tone definition grounded in persona audit
  - 15-term universal prohibition table with plain-language substitutes
  - Three cross-cutting signature moves with examples
  - Marketing additional-register definition (write-to-enroll)
affects:
  - 12-02 (command reference wiring — points all 13 commands to this file)
  - 12-03 (inline guardrails — builds on this file for worst-offending commands)
  - 13-voice-cleanup (Persona section rewriting uses this as source of truth)
  - All curriculum command files (voice source of record)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Voice reference file at .claude/reference/ — static documentation loaded by commands before generation"
    - "Prohibition table format: Term | Say Instead — universal terms only, command-specific terms stay local"
    - "Signature moves as positive examples, not locked templates"

key-files:
  created:
    - .claude/reference/curriculum-voice.md
  modified: []

key-decisions:
  - "Only marketing gets an additional-register section; all other output types share the confident-colleague baseline"
  - "Universal prohibition list capped at 15 terms — command-specific terms (Kirkpatrick, implementation_intention, etc.) stay in their command files"
  - "formative assessment and summative assessment included as universal terms — appear in intake, outcomes, and assessments commands"
  - "contact_hours included as universal term — internal field that should never surface in output"

patterns-established:
  - "Voice reference file is documentation layer; per-command Never-say lists are enforcement layer — both coexist"
  - "Prohibition table rows include omit instructions (not just term-swaps) for structural vocabulary with no plain-language equivalent"

requirements-completed:
  - VOICE-01

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 12 Plan 01: Voice System Summary

**Shared voice reference file with confident-colleague baseline, 15-term universal prohibition table, and three signature moves — grounded in full persona audit of all 12 commands**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-25T10:11:44Z
- **Completed:** 2026-03-25T10:16:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `.claude/reference/curriculum-voice.md` — 53 lines, 4 sections, under 150-line constraint
- Universal prohibition table: 15 terms derived from cross-command persona audit (schema, enum, Bloom's variants, TMA, DCR, WIPPEA, outcome_id, YAML field names, metaskill, DAG, formative/summative assessment, contact_hours)
- Baseline voice paragraph encodes warm + confident + direct + results-first from convergence of all 8 existing Persona sections
- Marketing additional-register section scoped exclusively to write-to-enroll output
- Three signature moves (results-first framing, learner-subject outcomes, named-handoff close) with weak/strong example pairs

## Task Commits

1. **Task 1: Write curriculum-voice.md** - `d8728e4` (feat)

## Files Created/Modified

- `.claude/reference/curriculum-voice.md` — Shared voice reference for all curriculum command files

## Decisions Made

- `formative assessment` and `summative assessment` added to universal prohibition table (appear in 3+ commands; not command-specific)
- `contact_hours` added as universal term (intake vocabulary quarantine; never user-facing in any context)
- `metaskill` added over `DAG` (metaskill appears in metaskills.md Never-say list; DAG also included — both are clearly universal)
- All 15 slots filled at top of the 10-15 range — every included term has clear justification from the persona audit

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `curriculum-voice.md` exists and is ready for Plan 02 reference wiring
- Plan 02 task: add `Read .claude/reference/curriculum-voice.md before generating any user-facing content.` to all 13 command files
- No blockers

---
*Phase: 12-voice-system*
*Completed: 2026-03-25*
