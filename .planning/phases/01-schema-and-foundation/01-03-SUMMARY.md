---
phase: 01-schema-and-foundation
plan: "03"
subsystem: workspace-scaffold
tags: [scaffold, state-management, hooks, session-bridging, constraint-hierarchy]
dependency_graph:
  requires: []
  provides:
    - templates/project-scaffold/STATE.md
    - templates/project-scaffold/CLAUDE.md
    - templates/project-scaffold/.gitkeep-dirs
    - .claude/hooks/session-start.md
  affects:
    - All future /knz-init command implementations
    - Session context restoration for curriculum workspace projects
tech_stack:
  added: []
  patterns:
    - STATE.md as single source of truth for pipeline position
    - Silent state management (INFR-10) encoded in both hook and project CLAUDE.md
    - Constraint hierarchy (Schema > Template > Checklist > ...) as explicit numbered rule
key_files:
  created:
    - templates/project-scaffold/STATE.md
    - templates/project-scaffold/CLAUDE.md
    - templates/project-scaffold/.gitkeep-dirs
    - .claude/hooks/session-start.md
  modified: []
decisions:
  - "STATE.md template uses explicit status enums (not-started | in-progress | complete; not-reached | pending | approved) to support programmatic parsing"
  - "Project CLAUDE.md at 143 lines (well under 300-line cap) — numbered constraint hierarchy with inline summary line 'Schema > Template > ...' for both human and grep readability"
  - "Session-start hook as markdown reference file (not shell script) — describes Claude behavioral rules, not executable steps"
  - "INFR-10 silent state rule encoded in both project CLAUDE.md and session-start hook with explicit prohibited phrases list"
metrics:
  duration: "~3 minutes"
  completed: "2026-03-15"
  tasks_completed: 2
  files_created: 4
  files_modified: 0
---

# Phase 1 Plan 3: Workspace Scaffold and Session-Start Hook Summary

**One-liner:** Static workspace scaffold template (STATE.md + project CLAUDE.md + directory manifest) with session-start hook that restores curriculum pipeline context silently on resume.

---

## What Was Built

### templates/project-scaffold/STATE.md
Pipeline state template for new curriculum projects. Tracks: current stage (0-9), stage-level status per pipeline step, key decisions from intake (duration/audience/expertise/skill-type/self-direction/transfer-context/cultural-orientation), review gate statuses (Post-Intake/Post-Assessment/Final Validation), and session continuity (last session, stopped-at, next action, resume command). Uses explicit status enums for programmatic parsing.

### templates/project-scaffold/CLAUDE.md (143 lines)
Project-level behavioral specification governing all generation within a curriculum workspace. Contains:
- **Constraint Hierarchy** — Schema > Template > Checklist > Inline Directive > Framework Naming > Role Framing, stated as both a visual priority chain and numbered list
- **Pipeline Sequence** — Backward design sequence stated as a rule with explicit stage prerequisites and hard gate stops
- **Pedagogical Principles** — TMA content arc, DCR analytical method, transfer design, social learning (genuine interdependence), backward design — each in 2-3 sentences
- **Schema References** — Points to `.claude/reference/schemas/` in the plugin
- **State Management** — Silent update rules, STATE.md as single source of truth
- **Never Section** — 8 hard prohibitions for commonly skipped elements (transfer_connection, generic reflection, social learning without interdependence, schema-less generation, gate skipping, future-stage writes, state announcement, hierarchy bypass)

### templates/project-scaffold/.gitkeep-dirs
Reference manifest for the /knz-init command documenting which directories to create: `00-project-brief/` through `08-validation/` plus `delivery/`. Notes that no placeholder files are created — each command creates output when it runs.

### .claude/hooks/session-start.md
Claude behavioral hook for session start. Detects active curriculum projects via `workspace/*/STATE.md`, reads pipeline position and continuity fields, surfaces context to user without announcing the read (INFR-10), flags mid-stage interruptions, surfaces pending review gates, and skips silently when no project exists.

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Self-Check

**Files created:**
- [x] templates/project-scaffold/STATE.md — exists, contains "Current Stage" and "Review Gates" sections
- [x] templates/project-scaffold/CLAUDE.md — exists, 143 lines (under 300), contains "Constraint Hierarchy" and "Schema > Template"
- [x] templates/project-scaffold/.gitkeep-dirs — exists, documents 9-stage directory structure
- [x] .claude/hooks/session-start.md — exists, references STATE.md, encodes INFR-10

**Commits:**
- [x] 0216a96 — feat(01-03): create workspace scaffold template
- [x] 19d43e2 — feat(01-03): create session-start hook for STATE.md context restoration

## Self-Check: PASSED
