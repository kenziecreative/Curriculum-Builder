---
phase: 17-vocabulary-plain-language
plan: 01
subsystem: curriculum-plugin
tags: [vocabulary, plain-language, writing-for-clarity, curriculum-voice, commands]

# Dependency graph
requires: []
provides:
  - "curriculum-voice.md: canonical 31-entry never-say table with all prohibited terms and plain-language replacements"
  - "7 command files: standardized Writing for Clarity block and identical curriculum-voice.md reference instruction"
affects: [17-02, 17-03, all command files that reference curriculum-voice.md]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Standard Writing for Clarity block: identical wording across all command files"
    - "Voice reference instruction: same format and placement in every command Persona section"
    - "Layered never-say architecture: canonical table in curriculum-voice.md + command-local lists where needed"

key-files:
  created: []
  modified:
    - ".claude/reference/curriculum-voice.md"
    - ".claude/plugins/curriculum/commands/resume.md"
    - ".claude/plugins/curriculum/commands/verify.md"
    - ".claude/plugins/curriculum/commands/assemble.md"
    - ".claude/plugins/curriculum/commands/evaluation-mode.md"
    - ".claude/plugins/curriculum/commands/intake.md"
    - ".claude/plugins/curriculum/commands/approve.md"
    - ".claude/plugins/curriculum/commands/transfer.md"

key-decisions:
  - "Alphabetized never-say table in curriculum-voice.md for auditability — all 31 entries sorted, easy to scan for coverage gaps"
  - "WfC block placed immediately after Persona section in each command — consistent placement makes it easy to audit across files"
  - "Kept existing per-file never-say lists in intake.md and transfer.md — they are additive, not replaced by canonical table"

patterns-established:
  - "Standard WfC block: Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers. Start every paragraph with the conclusion, then support it. Use precise language — numbers beat adjectives, specific beats general. Applies to everything the user reads."
  - "Standard voice reference: Read .claude/reference/curriculum-voice.md before generating any user-facing content."

requirements-completed: [VOCAB-02, VOCAB-03]

# Metrics
duration: 20min
completed: 2026-03-27
---

# Phase 17 Plan 01: Vocabulary Plain Language Summary

**Canonical 31-entry never-say table in curriculum-voice.md and standardized Writing for Clarity enforcement across all 7 previously unprotected command files**

## Performance

- **Duration:** 20 min
- **Started:** 2026-03-27T01:01:00Z
- **Completed:** 2026-03-27T01:21:03Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Expanded curriculum-voice.md never-say table from 13 to 31 entries, alphabetized, capturing all previously local-only prohibited terms from individual command files
- Added standardized `## Writing for Clarity` section to 7 command files (resume, verify, assemble, evaluation-mode, intake, approve, transfer) with identical wording across all
- Standardized curriculum-voice.md reference instruction to identical format in all 15 command files — fixed verify.md which said "user-facing output" instead of "user-facing content"

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand curriculum-voice.md canonical never-say table** - `c6b38b3` (feat)
2. **Task 2: Add standardized Writing for Clarity and voice reference to all remaining commands** - `ec2ff9a` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `.claude/reference/curriculum-voice.md` - Never-say table expanded from 13 to 31 entries, alphabetized; added baseline_measurement, Bloom's, bloom_level, CoP, curriculum_traceability, element_type, error_management_practice, group_processing_prompt, implementation_intention, Kirkpatrick, learning_objective_id, parent_module_id, peer_accountability_structure, primary_metaskill, self_direction_level, skill_type, spaced_retrieval, transfer_context
- `.claude/plugins/curriculum/commands/resume.md` - Added Writing for Clarity section after Persona
- `.claude/plugins/curriculum/commands/verify.md` - Fixed voice reference wording; added Writing for Clarity section
- `.claude/plugins/curriculum/commands/assemble.md` - Added Writing for Clarity section after Persona
- `.claude/plugins/curriculum/commands/evaluation-mode.md` - Added Writing for Clarity section after Persona
- `.claude/plugins/curriculum/commands/intake.md` - Added Writing for Clarity section after existing never-say list
- `.claude/plugins/curriculum/commands/approve.md` - Added Writing for Clarity section after Persona
- `.claude/plugins/curriculum/commands/transfer.md` - Added Writing for Clarity section between persona description and never-say list

## Decisions Made

- Alphabetized the full never-say table (vs. append-only) — makes gaps visible at a glance and is easier to audit for completeness
- Kept command-local never-say lists in intake.md and transfer.md intact — they provide defense-in-depth and are more contextually specific than the canonical table entries
- Placed WfC block immediately after the Persona section in every file — consistent placement means any auditor knows exactly where to look

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- curriculum-voice.md is the canonical single source for all prohibited terms — Plans 02 and 03 can reference it directly
- All 7 newly updated commands have identical WfC enforcement surface — ready for Plan 02's template jargon cleanup
- All 15 commands use identical voice reference instruction wording — uniform enforcement point confirmed

---
*Phase: 17-vocabulary-plain-language*
*Completed: 2026-03-27*
