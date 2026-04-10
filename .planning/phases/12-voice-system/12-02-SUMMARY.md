---
phase: 12-voice-system
plan: 02
subsystem: curriculum-plugin
tags: [voice-system, persona, curriculum, claude-plugin]

# Dependency graph
requires:
  - phase: 12-voice-system plan 01
    provides: curriculum-voice.md reference file at .claude/reference/
provides:
  - Voice file reference wired into all 13 command files
  - Inline guardrails in the 4 worst-offending commands
  - New Persona sections in 6 commands that were missing them
  - session-generator.md agent Persona section with reference + guardrail
affects:
  - Phase 13 (command retrofit): all command files now have Persona sections to expand
  - All future content-generating commands will read curriculum-voice.md before output

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Voice reference pattern: all content-generating commands reference curriculum-voice.md at top of Persona section"
    - "Inline guardrail pattern: worst-offending commands have bolded Critical inline guardrail line between reference and tone description"
    - "Minimal Persona pattern: commands without tone descriptions get one-line Persona only; Phase 13 expands"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/intake.md
    - .claude/plugins/curriculum/commands/outcomes.md
    - .claude/plugins/curriculum/commands/assessments.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/metaskills.md
    - .claude/plugins/curriculum/commands/transfer.md
    - .claude/plugins/curriculum/commands/marketing.md
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/validate.md
    - .claude/plugins/curriculum/commands/evaluation-mode.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/init.md
    - .claude/plugins/curriculum/commands/resume.md
    - .claude/plugins/curriculum/agents/session-generator.md

key-decisions:
  - "sessions.md (orchestrator) gets reference line only — it routes, does not generate content; session-generator.md (agent) gets reference + inline guardrail because it generates all session content"
  - "assessments.md inline guardrail uses bloom_level instead of Bloom's — Bloom's is already in the existing Never-say list, avoiding redundancy"
  - "6 commands missing Persona sections get minimal one-line Persona only — Phase 13 will expand with full tone descriptions"

requirements-completed: [VOICE-02]

# Metrics
duration: 2min
completed: 2026-03-25
---

# Phase 12 Plan 02: Voice System — Command Wiring Summary

**All 13 command files and session-generator agent now reference curriculum-voice.md, with inline term guardrails in the 4 highest-risk output commands**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T10:15:51Z
- **Completed:** 2026-03-25T10:17:25Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Wired curriculum-voice.md reference into all 13 command files (7 with existing Persona sections, 6 with new minimal Persona sections)
- Added inline guardrails to the 4 highest-risk commands: marketing.md, transfer.md, assessments.md, and session-generator.md
- session-generator.md agent gained a new Persona section with reference line and guardrail blocking TMA, DCR, WIPPEA, bloom_level, and template names as visible labels
- sessions.md orchestrator received reference-line-only Persona (correct: orchestrator routes, does not generate content)

## Task Commits

1. **Task 1: Add reference line to all 13 commands** - `ef93481` (feat)
2. **Task 2: Add inline guardrails to 4 worst-offending files** - `ce87cea` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/intake.md` - Reference line added at top of existing Persona
- `.claude/plugins/curriculum/commands/outcomes.md` - Reference line added at top of existing Persona
- `.claude/plugins/curriculum/commands/assessments.md` - Reference line + inline guardrail (bloom_level, paired_objective, outcome_id, formative assessment, summative assessment)
- `.claude/plugins/curriculum/commands/modules.md` - Reference line added at top of existing Persona
- `.claude/plugins/curriculum/commands/metaskills.md` - Reference line added at top of existing Persona
- `.claude/plugins/curriculum/commands/transfer.md` - Reference line + inline guardrail (implementation_intention, Kirkpatrick, peer_accountability_structure, schema, enum)
- `.claude/plugins/curriculum/commands/marketing.md` - Reference line + inline guardrail (schema, curriculum_traceability, bloom_level, learning_objective_id, element_type)
- `.claude/plugins/curriculum/commands/approve.md` - New minimal one-line Persona section
- `.claude/plugins/curriculum/commands/validate.md` - New minimal one-line Persona section
- `.claude/plugins/curriculum/commands/evaluation-mode.md` - New minimal one-line Persona section
- `.claude/plugins/curriculum/commands/sessions.md` - New minimal one-line Persona section (orchestrator)
- `.claude/plugins/curriculum/commands/init.md` - New minimal one-line Persona section
- `.claude/plugins/curriculum/commands/resume.md` - New minimal one-line Persona section
- `.claude/plugins/curriculum/agents/session-generator.md` - New Persona section with reference line + inline guardrail

## Decisions Made

- sessions.md gets reference-only Persona (orchestrator produces routing prose, not content); session-generator.md gets reference + guardrail (generates all session content)
- assessments.md guardrail uses `bloom_level` not `Bloom's` — Bloom's is already in the file's existing Never-say list; using bloom_level avoids redundancy while targeting the field-name leak risk
- 6 commands missing Persona sections get minimal one-line Persona only — Phase 13 will add tone descriptions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Phase 12 Plan 03 (final voice system plan) can now proceed
- All command files have Persona sections — Phase 13 (command retrofit) has a complete foundation to expand
- The voice-to-command link is complete: curriculum-voice.md exists and all commands that generate content are instructed to read it

---
*Phase: 12-voice-system*
*Completed: 2026-03-25*
