---
phase: 05-module-and-session-generation
plan: 02
subsystem: session-generation
tags: [session-generator, knz-sessions, parallel-dispatch, TMA-arc, DCR, subagents]
dependency_graph:
  requires: [05-01-PLAN]
  provides: [session-generator-agent, knz-sessions-command]
  affects: [stage-05-sessions, workspace/04-sessions/]
tech_stack:
  added: []
  patterns: [parallel-Task-dispatch, per-module-subagent-isolation, schema-in-prompt]
key_files:
  created:
    - .claude/agents/session-generator.md
    - .claude/commands/knz-sessions.md
  modified: []
decisions:
  - One Task subagent per module (not per session) keeps Task count bounded and simplifies error handling per the research anti-patterns
  - DCR trigger is explicit boolean check (skill_type==open AND bloom>=Analyze) rather than inference — prevents silent omission
  - Stage 5 status stays in-progress on partial failure — retry re-dispatches only incomplete modules
  - No AskUserQuestion anywhere in /knz-sessions — full autonomy after Stage 4 approval
  - Prohibited reflection stems listed explicitly in session-generator with required alternative pattern
metrics:
  duration_minutes: 3
  completed_date: "2026-03-20"
  tasks_completed: 2
  tasks_total: 3
  files_created: 2
  files_modified: 0
---

# Phase 5 Plan 02: Session Generation — session-generator Worker + /knz-sessions Orchestrator

**One-liner:** Parallel session generation via per-module Task subagents enforcing 8-field TMA arc, DCR conditional scaffold, and content-specific reflection prompts across all modules.

## What Was Built

Two files that together enable fully autonomous session generation after Stage 4 approval:

**`.claude/agents/session-generator.md`** — The per-module worker. When spawned by /knz-sessions, it:
- Receives module_spec, outcomes, project_brief, schema, and output_dir from the orchestrator
- Selects session template per 5-rule precedence order (gagne/merrill/5e_7e/wippea/universal_tma_arc)
- Generates all sessions for its assigned module with all 8 TMA arc fields enforced
- Applies DCR fields when skill_type==open AND bloom_level>=Analyze (explicit trigger, not inferred)
- Applies novice scaffolding for DCR when self_direction_level is Stage 1-2
- Enforces prohibited reflection stems and requires content-specific prompt_text
- Writes 4 files per session (session.md, facilitator-guide.md, participant-materials.md, slide-outline.md) to the M-N-S-N directory
- Returns a completion signal listing all session directories created

**`.claude/commands/knz-sessions.md`** — The orchestrator. When invoked:
- Checks prerequisites: workspace exists, Stage 4 complete, Stage 5 not already complete
- Reads all module specs and shared context files
- Dispatches all Tasks simultaneously (no sequential await)
- Shows per-module progress lines as each Task completes
- Verifies all 4 files exist per session before marking Stage 5 complete
- Supports retry: in-progress state re-dispatches only incomplete modules
- All STATE.md operations are silent; no AskUserQuestion anywhere

## Architecture Note

The subagent-per-module pattern isolates session content to individual worker contexts. This prevents the main /knz-sessions context from accumulating the full volume of session content (4 files × N sessions × N modules), which would collapse context on programs with 3+ modules. The orchestrator manages dispatch, progress, and verification without holding any session content itself.

## Deviations from Plan

None — plan executed exactly as written.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author session-generator subagent | 445fb16 | .claude/agents/session-generator.md |
| 2 | Author /knz-sessions orchestrator command | 0f8f4b9 | .claude/commands/knz-sessions.md |

## Checkpoint Status

**Task 3 (Checkpoint: Verify /knz-sessions parallel generation end-to-end)** — PENDING human verification.

This checkpoint requires the user to run `/knz-sessions` on the test-program, observe parallel dispatch behavior, and verify the 04-sessions/ directory structure and file content.

## Self-Check

### Files Created
- `.claude/agents/session-generator.md` — FOUND
- `.claude/commands/knz-sessions.md` — FOUND

### Commits
- 445fb16 — FOUND (session-generator subagent)
- 0f8f4b9 — FOUND (knz-sessions orchestrator)

## Self-Check: PASSED
