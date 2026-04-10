---
phase: 02-core-plugin-infrastructure
plan: "02"
subsystem: plugin-commands
tags: [claude-code, commands, intake, conversational-interview, state-management]

requires:
  - phase: 02-01
    provides: "initialized workspace with STATE.md template, /knz-init scaffolding, AskUserQuestion pattern"
provides:
  - /knz-intake command — conversational intake interview with thematic batching, expert pushback, incremental saves, and inline review gate
affects:
  - 02-03 and beyond (all downstream pipeline stage commands depend on project-brief.md written by intake)
  - Stage 1 schema (intake is the only consumer of stage-01-intake.md at runtime)

tech-stack:
  added: []
  patterns:
    - "Thematic question batching: questions grouped by subject (learners / program / success) not by schema field"
    - "Hidden schema mapping: user sees conversational questions, command internally maps to schema fields"
    - "Expert pushback pattern: vague answers trigger one reframe before accepting — mirrors real instructional design consultation"
    - "Incremental STATE.md writes: Silently update STATE.md after each group completes, not just at the end"
    - "Inline gate pattern: confirmation summary + AskUserQuestion IS the Post-Intake gate approval — no separate /knz-approve needed"
    - "Derived field pattern: context_of_use synthesized from transfer_context + audience without an extra question"
    - "Resume from interruption: reads Stopped At from STATE.md, skips completed groups on restart"

key-files:
  created:
    - .claude/commands/knz-intake.md
  modified: []

key-decisions:
  - "Questions ask about learners, then program structure, then success — not in schema field order — because that's how a consultant conversation flows"
  - "Self-direction level (Grow model enum) is mapped internally from conversational answer — enum values never exposed to user"
  - "cultural_orientation question is conditional (>= 2hr contact_hours) and uses plain language framing (individual achievement vs group harmony)"
  - "context_of_use is derived, not asked — synthesized from transfer_context + target_audience.description when writing the brief"
  - "Pushback is exactly once per field — the command asks once, reframes if vague, then accepts the second answer even if imperfect"
  - "Start-over path requires AskUserQuestion confirmation to prevent accidental data loss"

patterns-established:
  - "Pushback pattern: vague answer → one reframe question with a concrete example → accept result"
  - "Conditional question pattern: check numeric threshold (contact_hours) before asking conditional question"
  - "Schema compliance checklist: internal checklist before writing output file, not surfaced to user"

requirements-completed: [PIPE-04, INTK-01, INTK-02, INTK-03, INTK-04, INTK-05, INTK-06, INFR-05, INFR-11]

duration: 5min
completed: 2026-03-19
---

# Phase 02 Plan 02: Intake Conversation Command Summary

**Conversational intake interview command that captures all nine Stage 1 schema fields from a Hello Alice SME in three thematic question rounds, with expert pushback on vague answers, incremental STATE.md saves after each round, and an inline review gate that doubles as Post-Intake gate approval**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-19T03:57:43Z
- **Completed:** 2026-03-19T04:03:00Z
- **Tasks:** 2 of 2
- **Files modified:** 1

## Accomplishments

- `/knz-intake` captures all required Stage 1 schema fields (`program_topic`, `target_audience.*`, `transfer_context`, `success_criteria`, `duration_and_format.*`, `self_direction_level`, `skill_type`, `cultural_orientation`) without using instructional design vocabulary
- Three thematic groups (learners / program / success) with pushback rules for each common failure mode: vague prior_knowledge, broad topic, abstract transfer context, unmeasurable success criteria
- Grow model self-direction level mapped internally from conversational answer — enum values hidden from user
- Incremental STATE.md writes after each group (three separate `Silently update STATE.md` calls) so session interruption preserves progress
- Confirmation summary uses user's own words, not field names — followed by AskUserQuestion gate with "Looks good / Edit something / Start over" options
- `context_of_use` derived from `transfer_context` + audience description without a separate question

## Task Commits

1. **Task 1: Create /knz-intake conversational command** — `16d0c0a` (feat)
2. **Task 2: Verify intake conversation design** — checkpoint:human-verify (approved by user)

## Files Created/Modified

- `.claude/commands/knz-intake.md` — 365-line conversational interview command with all thematic groups, pushback rules, incremental saves, and inline gate

## Decisions Made

- Questions are ordered by conversational logic (learners → program → success), not by schema field order. This matches how a discovery conversation actually flows and avoids the SME feeling like they're filling out a form.
- The Grow model self-direction enum is never exposed to the user. The command maps conversational signals to the four enum values internally. This prevents vocabulary confusion ("what's Stage 3 - Involved mean?").
- `cultural_orientation` is conditional on `contact_hours >= 2` and uses plain-language framing ("individual achievement vs group harmony") rather than the enum values.
- `context_of_use` is not a separate question — it is synthesized when writing the brief. The field already exists in the conversation via `transfer_context` and `target_audience.description`.
- Pushback is exactly one reframe attempt per field. The command pushes back with a concrete example, then accepts the second answer. This respects the SME's time while still enforcing quality.
- The start-over path requires a second AskUserQuestion confirmation to prevent accidental data loss.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Intake pipeline is complete and approved: `/knz-init` scaffolds the workspace, `/knz-intake` captures Stage 1 data and writes `project-brief.md`, `/knz-resume` surfaces current position at any point
- Phase 2 (Core Plugin Infrastructure) is fully executed
- Stage 2 (Outcome Design) pipeline command can be built immediately — it depends on `project-brief.md` which intake now produces
- Outstanding todo carried forward: validate intake questions with Hello Alice SME before schema lock

## Self-Check

- [x] `.claude/commands/knz-intake.md` — exists, 365 lines (> 100 min), references stage-01-intake schema
- [x] All intake schema required fields covered: program_topic, target_audience (description/prior_knowledge/context_of_use), transfer_context, success_criteria, duration_and_format (all 5 sub-fields), self_direction_level, skill_type, cultural_orientation (conditional), cohort_size/prerequisite_programs (conditional)
- [x] Pushback examples exist for: vague prior_knowledge, broad program_topic, abstract transfer_context, unmeasurable success_criteria
- [x] AskUserQuestion used with three options at gate
- [x] Three separate "Silently update STATE.md" calls — one after each group
- [x] Post-intake gate handled inline (confirmation IS the gate)
- [x] project-brief.md output documented with schema compliance checklist
- [x] No instructional design vocabulary in user-facing question text
- [x] Task commit exists: 16d0c0a

## Self-Check: PASSED

---

*Phase: 02-core-plugin-infrastructure*
*Completed: 2026-03-19*
