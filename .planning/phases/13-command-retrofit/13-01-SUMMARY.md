---
phase: 13-command-retrofit
plan: 01
subsystem: curriculum-commands
tags: [presentation, voice, PRES-01, PRES-03, PRES-04, PRES-08, QUAL-05, QUAL-06, QUAL-09]

# Dependency graph
requires:
  - phase: 12-voice-system
    provides: curriculum-voice.md reference file wired to all 13 command files + inline guardrails
provides:
  - Plain-language Conversation Output across all 11 command files (no prohibited terms in user-facing sections)
  - ASCII box formatting for outcomes display (PRES-03)
  - Plain-language assessment summary replacing alignment map display (PRES-04)
  - NEEDS: marker check in validate.md (QUAL-06)
  - Dashboard reminders in validate.md, init.md, sessions.md (PRES-08)
  - Writing for Clarity instruction in all generation sections (QUAL-09)
  - Warm handoffs in all stage-completing commands
  - Context-clear nudges in non-auto-chained stage-completing commands
  - Tone descriptions added to all Persona sections
affects:
  - phase-14-audit
  - marketing.md (Plan 2 — receives context-clear nudge at end of auto-chain)
  - transfer.md (Plan 2 — auto-chained, no nudge)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Named-handoff close: two sentences — what was built, what command to run next"
    - "Context-clear nudge: single sentence, no jargon — absent from auto-chained commands"
    - "Writing for Clarity: kernel sentences, no warm-up openers, conclusion-first paragraphs"
    - "ASCII box formatting for program outcomes display"
    - "Plain-language assessment gate display: count/action summary, no alignment map table"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/init.md
    - .claude/plugins/curriculum/commands/intake.md
    - .claude/plugins/curriculum/commands/outcomes.md
    - .claude/plugins/curriculum/commands/assessments.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/metaskills.md
    - .claude/plugins/curriculum/commands/validate.md
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/resume.md
    - .claude/plugins/curriculum/commands/evaluation-mode.md
    - .claude/plugins/curriculum/commands/sessions.md

key-decisions:
  - "bloom_level, outcome_id, module_id as display labels moved to HTML comments in written file formats — internal field tracking preserved without surfacing field names to users"
  - "activation_activity and transfer_prompt renamed to Practice activity and Real-work connection in metaskills gate display — schema field names stay internal"
  - "Post-Assessment gate and Final Validation gate renamed to plain descriptions in user-facing sections (assessments review, final package review) — gate status values in STATE.md unchanged"
  - "TMA arc reference in sessions.md subagent instructions replaced with plain description — agent instructions are not user-facing but the term is still prohibited"
  - "sessions.md and metaskills.md: context-clear nudge intentionally absent — these auto-trigger the next command; user cannot clear context mid-chain"
  - "Writing for Clarity instruction added to generation sections only — not to all sections, only where Claude produces user-visible text"

patterns-established:
  - "Inline comment pattern for internal field tracking: <!-- internal: field_name=[value] --> preserves schema compliance without exposing field names"
  - "Constraint Enforcement and Schema Compliance Checklist sections are internal-facing — prohibited terms are acceptable there as technical references"
  - "Never-say lists in Persona sections use the prohibited terms as the thing-being-prohibited — this is correct and expected"

requirements-completed: [PRES-01, PRES-02, PRES-03, PRES-04, PRES-05, PRES-06, PRES-07, PRES-08, QUAL-05, QUAL-06, QUAL-09]

# Metrics
duration: 6min
completed: 2026-03-25
---

# Phase 13 Plan 01: Command Retrofit Summary

**One-pass structural and vocabulary cleanup across all 11 commands — prohibited terms removed from user-facing sections, ASCII outcomes display, plain-language assessment summary, NEEDS: marker check, dashboard reminders, and Writing for Clarity enforcement throughout**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-25T13:55:05Z
- **Completed:** 2026-03-25T14:01:49Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Removed all prohibited terms from Conversation Output sections across all 11 command files (bloom_level, outcome_id, module_id, activation_activity, transfer_prompt, Outcome ID, Bloom Match, TMA arc visible to users)
- Added ASCII box formatting to outcomes.md Conversation Output (PRES-03) using ╔/║/╚ box structure with └─ tree hierarchy for module/session outcomes
- Replaced Assessment Alignment Map table (with Outcome ID and Bloom Match columns) with plain-language summary format in assessments.md (PRES-04)
- Added NEEDS: marker check to validate.md — scans session files for unresolved markers before reporting results (QUAL-06)
- Added dashboard reminders to validate.md, init.md, sessions.md (PRES-08)
- Added Writing for Clarity instruction to generation sections in all stage-completing commands (QUAL-09)
- Added tone descriptions to Persona sections in all 11 command files
- Added warm handoffs (two-sentence named-handoff closes) to all stage-completing commands
- Added context-clear nudges to all stage-completing commands where user must act manually — intentionally absent from metaskills.md and sessions.md (auto-chained)
- Moved bloom_level, outcome_id, module_id from display labels to inline HTML comments in written file formats — internal tracking preserved without surfacing field names

## Task Commits

1. **Task 1: Retrofit init, intake, outcomes, assessments, modules** - `e9cdf55` (feat)
2. **Task 2: Retrofit metaskills, validate, approve, resume, evaluate, sessions** - `2b2f2d2` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/init.md` — Persona tone, Writing for Clarity, warm handoff + context-clear nudge, dashboard block confirmed
- `.claude/plugins/curriculum/commands/intake.md` — Warm handoffs + context-clear nudges at both clean intake and audit mode closes
- `.claude/plugins/curriculum/commands/outcomes.md` — ASCII box formatting, bloom_level/outcome_id removed from display format, Writing for Clarity, warm handoff + nudge
- `.claude/plugins/curriculum/commands/assessments.md` — Assessment Alignment Map replaced with plain-language summary, paired_objective/bloom_level removed from file format, Writing for Clarity, warm handoff + nudge
- `.claude/plugins/curriculum/commands/modules.md` — module_id display label replaced with plain label, Writing for Clarity, warm handoff + nudge
- `.claude/plugins/curriculum/commands/metaskills.md` — activation_activity/transfer_prompt replaced in gate display, Writing for Clarity, warm handoff (no context-clear nudge — auto-chained)
- `.claude/plugins/curriculum/commands/validate.md` — Persona tone, NEEDS: marker check, dashboard reminder, Writing for Clarity
- `.claude/plugins/curriculum/commands/approve.md` — Persona tone, Writing for Clarity, gate terminology plain-languaged, warm handoff + context-clear nudge in approval confirmation
- `.claude/plugins/curriculum/commands/resume.md` — Persona tone, plain routing table labels, clear closing instruction
- `.claude/plugins/curriculum/commands/evaluation-mode.md` — Persona tone description
- `.claude/plugins/curriculum/commands/sessions.md` — Persona tone, dashboard reminder, Writing for Clarity, TMA arc reference removed from subagent instructions (no context-clear nudge — auto-chained)

## Decisions Made

- `bloom_level`, `outcome_id`, `module_id` as display labels moved to inline HTML comments in written file formats — internal field tracking preserved without surfacing field names to users
- `activation_activity` and `transfer_prompt` renamed to "Practice activity" and "Real-work connection" in metaskills gate display
- "Post-Assessment gate" and "Final Validation gate" replaced with plain descriptions in user-facing gate decision text; STATE.md key names unchanged
- `TMA arc` in sessions.md subagent task instructions replaced with "session arc requirements" — agent-to-agent instructions are not user-facing but the term is still prohibited per voice file
- `sessions.md` and `metaskills.md` context-clear nudge intentionally absent — these auto-trigger the next command; nudge belongs only at end of auto-chain in marketing.md (Plan 2)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- All 11 commands now conform to the clean-output standard established in Phase 12
- Plan 2 (marketing.md, transfer.md, session-generator.md) can proceed — the three hardest commands inherit the baseline pattern set here
- Context-clear nudge placement for marketing.md confirmed: it is the final command in the auto-chain and receives the nudge

---
*Phase: 13-command-retrofit*
*Completed: 2026-03-25*
