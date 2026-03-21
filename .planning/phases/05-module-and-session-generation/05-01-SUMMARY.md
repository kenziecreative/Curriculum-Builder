---
phase: 05-module-and-session-generation
plan: 01
subsystem: curriculum-generation
tags: [slash-command, module-structure, schema-enforcement, backward-design, social-learning]

# Dependency graph
requires:
  - phase: 03-backward-design-core
    provides: /knz-outcomes and /knz-assessments command patterns used as structural template
  - phase: 01-schema-and-foundation
    provides: stage-04-modules.md schema defining all required module fields and enum values
provides:
  - /knz-modules slash command that generates sequenced module structure from Stage 02 outcomes and Stage 03 assessments
  - DAG validation (circular dependency detection and auto-reorder)
  - Social learning completeness enforcement with content-specific group_processing_prompt check
  - Infer-and-review gate pattern with plain-language summary table before any files are written
affects:
  - 05-02-session-generator (depends on 03-modules/ files produced by /knz-modules approval)
  - stage-04-modules schema (command is the executable consumer of this schema)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Infer-and-review pattern: generate silently, enforce constraints silently, gate on plain-language summary, write files only on approval"
    - "DAG validation pattern: trace prerequisite chains recursively to detect cycles before display"
    - "Constraint specificity test: group_processing_prompt must name a concept from this module — prohibited patterns listed explicitly"

key-files:
  created:
    - .claude/commands/knz-modules.md
  modified: []

key-decisions:
  - "Gate summary table shows module_name (not module_id) — 'Module' column never exposes M-1 format to users"
  - "All 03-modules/ files written simultaneously on approval — never progressively to prevent partial state"
  - "group_processing_prompt specificity enforced in Step 3 with prohibited pattern list including 4 named generic patterns"
  - "Thinking routine specificity enforced in Step 4 — named routines (See-Think-Wonder etc.) required; 'discussion' and 'reflection' blocked"
  - "Constraint enforcement runs before any output — user only sees corrected structure"
  - "Stage 4 in-progress branch: re-display gate summary if 03-modules/ files exist; regenerate if no files"

patterns-established:
  - "Pattern: Prerequisites check uses 3-step gate (workspace → prior stage → current stage status branch)"
  - "Pattern: Transparency note uses confident tone ('I adjusted N items') not apologetic tone ('I had to fix')"
  - "Pattern: Destructive confirmation uses nested AskUserQuestion — 'Start this over' requires second confirmation before any reset"

requirements-completed: [MODS-01, MODS-02, MODS-03, MODS-04, SESS-03]

# Metrics
duration: 15min
completed: 2026-03-20
---

# Phase 5 Plan 01: Module Generation Command Summary

**/knz-modules slash command with 6-step silent constraint enforcement, DAG validation, plain-language gate summary, and schema-compliant file output on approval**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-20T00:00:00Z
- **Completed:** 2026-03-20T00:15:00Z
- **Tasks:** 2 of 2 complete
- **Files modified:** 1

## Accomplishments

- Authored `/knz-modules` slash command following the knz-assessments.md structural pattern exactly
- Implemented 6-step silent constraint enforcement: DAG validation, learning objectives coverage, social learning completeness, thinking routine specificity, belief encounter specificity, change recording
- Gate summary table uses plain-language columns only — no schema field names, no module_id (M-1) in display
- Approval branch writes `sequence-rationale.md` and all `M-N/module-spec.md` files simultaneously (not progressively)
- All 4 social_learning sub-fields enforced with explicit content-specific test for `group_processing_prompt`

## Task Commits

Each task was committed atomically:

1. **Task 1: Author /knz-modules command** - `30371f8` (feat)
2. **Task 2: Checkpoint — human end-to-end verification** - approved by user (2026-03-21)

## Files Created/Modified

- `.claude/commands/knz-modules.md` — Complete slash command (315 lines): Prerequisites (3 checks), Persona, Generation with duration scaling, Constraint Enforcement (Steps 1-6), Output Presentation with gate table, Module Structure Gate (AskUserQuestion 3 options), On Approve/Concerns/Start Over branches, State Management Rules, Schema Compliance Checklist

## Decisions Made

- Gate summary table uses `module_name` in "Module" column, never `module_id` format (M-1) — consistent with plain-language principle throughout
- All `03-modules/` files written simultaneously in approval branch — prevents partial state if something fails mid-write
- `group_processing_prompt` specificity tested against 4 named prohibited patterns (not a regex) — explicit examples make the constraint unambiguous to the executing model
- `in-progress` branch checks for existing `03-modules/` files before deciding to re-display vs. regenerate — handles interrupted sessions gracefully
- Step 6 "Record changes" tracks all 5 categories of auto-corrections to feed a single transparency note — consolidates feedback rather than one notice per step

## Deviations from Plan

None — plan executed exactly as written. The command follows the knz-assessments.md structural pattern with all sections in the specified order.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `/knz-modules` command is authored, committed, and human-verified end-to-end
- Human confirmed: gate summary displays with plain-language columns, approval writes `03-modules/` files, STATE.md updates silently
- Phase 5 Plan 01 complete — Phase 5 Plan 02 (`/knz-sessions` command + session-generator subagent) is next

## Self-Check: PASSED

- `.claude/commands/knz-modules.md` exists: FOUND
- Commit `30371f8` exists: FOUND
- All required sections present: Prerequisites (3 checks), Persona, Generation, Constraint Enforcement (6 steps), Output Presentation, Module Structure Gate, On Approve, On Concerns, On Start Over, State Management Rules, Schema Compliance Checklist
- Gate table column headers are plain-language: Module, Objectives Covered, Sessions Planned, Core Thinking Skill, What This Module Challenges — no schema field names
- Human end-to-end verification: PASSED (approved 2026-03-21)

---
*Phase: 05-module-and-session-generation*
*Completed: 2026-03-20*
