---
phase: 21-deviation-validation-coverage
plan: "01"
subsystem: curriculum-commands
tags: [draft-audit, deviation-handling, retry-logic, escalation, plain-language]

requires:
  - phase: 20-integrity-verification
    provides: draft-audit check definitions and verification integrity rules
  - phase: 17-vocabulary-plain-language
    provides: curriculum-voice.md canonical substitution table referenced by auto-fix

provides:
  - 3-attempt retry with cumulative constraint injection in modules.md draft audit
  - 3-attempt retry with cumulative constraint injection in sessions.md draft audit
  - 3-attempt retry with cumulative constraint injection in metaskills.md draft audit
  - Auto-fix boundary documentation (vocabulary, registry defaults, outcome drift only)
  - Structural failure short-circuit (completeness, registry consistency, schema stop immediately)
  - Plain-language escalation format (problem + location + suggestion per failure)

affects: [sessions, modules, metaskills, pipeline-audit-behavior]

tech-stack:
  added: []
  patterns:
    - "Auto-Fix Pass -> Retry with Cumulative Constraints -> Escalation is the deviation handling sequence in all draft audit sections"
    - "Retry is scoped to content failures only — structural failures short-circuit before retry"
    - "Cumulative constraint injection: attempt N carries all failure reasons from attempts 1 through N-1"
    - "Per-module retry budget for sessions (3 attempts per module, not per check)"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/metaskills.md

key-decisions:
  - "Retry loop targets content failures (generic content, doctrine compliance, formative assessment, pre-work gaps, goal-backward Substantive/Wired) — structural failures (completeness, registry consistency, schema) stop immediately because they indicate generation errors, not quality problems"
  - "Auto-fix boundary is exactly three categories: vocabulary substitution, registry default fills, outcome drift correction — content judgment problems always require regeneration"
  - "Sessions retry is per-module: 3 total attempts per module, not per check type — avoids disproportionate retry cost on multi-module programs"
  - "Escalation format shows both auto-fixes applied and remaining failures — user sees the full picture before deciding to edit drafts or restart"

patterns-established:
  - "Auto-Fix Pass section: document boundary explicitly — three categories, nothing more"
  - "Structural failure short-circuit note: placed between Auto-Fix and Retry sections in every audit"
  - "Retry section: cumulative constraint list carried forward through attempts, injected as numbered failures into regeneration prompt"
  - "Escalation section: curriculum-voice.md reference ensures no ID jargon in user-facing failure descriptions"

requirements-completed: [DEVL-01]

duration: 2min
completed: 2026-03-27
---

# Phase 21 Plan 01: Deviation Validation Coverage Summary

**3-attempt retry with cumulative constraint injection replaces one-shot stop-and-report in all three draft audit sections (modules.md, sessions.md, metaskills.md)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-27T23:31:51Z
- **Completed:** 2026-03-27T23:33:51Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- All three draft audit sections now retry up to 3 times before escalating, with each attempt injecting the cumulative list of previous failure reasons into the regeneration prompt
- Auto-fix boundary explicitly documented in all three files: vocabulary substitution, registry default fills, and outcome drift correction are the only auto-fixable categories
- Structural failures (file completeness, registry consistency, schema compliance) short-circuit before the retry loop with a clear note explaining the distinction
- Escalation messages follow a plain-language problem + location + suggestion format per curriculum-voice.md, replacing the generic "run the command again" instruction
- Sessions retry pattern adapted for per-module budgeting: 3 total attempts per module, not per check type

## Task Commits

Each task was committed atomically:

1. **Task 1: Add 3-attempt retry with cumulative constraints to modules.md and metaskills.md** - `6590013` (feat)
2. **Task 2: Add 3-attempt retry with cumulative constraints to sessions.md** - `000f0dd` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/modules.md` - Replaced stop-on-failure Audit Result with Auto-Fix Pass, Retry with Cumulative Constraints, and Escalation sections
- `.claude/plugins/curriculum/commands/metaskills.md` - Same pattern; content failure trigger is Check 6 (generic content) only
- `.claude/plugins/curriculum/commands/sessions.md` - Same pattern with per-module retry budget and module/session-specific escalation format

## Decisions Made

- Retry loop is content-failure-only: structural failures (completeness, registry consistency, schema) stop immediately because they indicate a broken generation, not a quality issue that more attempts can fix
- Auto-fix boundary is exactly three categories (vocabulary, registry defaults, outcome drift) — this was already the boundary in Phase 20; this plan makes it explicit and named
- Sessions retry is per-module with 3 total attempts per module — prevents disproportionate retry cost where a single failing check type could consume 9 attempts across 3 check types in a 3-module program
- Escalation format includes "What was auto-fixed" alongside "What still needs attention" — user sees the complete picture before deciding to edit drafts directly or restart the command

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Deviation handling for draft audits is complete in modules.md, sessions.md, and metaskills.md
- Phase 21 Plan 02 can proceed to address any remaining validation coverage gaps per ROADMAP.md

---
*Phase: 21-deviation-validation-coverage*
*Completed: 2026-03-27*
