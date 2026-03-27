---
phase: 20-integrity-verification
plan: "02"
subsystem: draft-audit
tags: [integrity, content-checks, goal-backward, sessions, modules, metaskills]
dependency_graph:
  requires: [20-01]
  provides: [INTG-01, INTG-03]
  affects: [modules.md, sessions.md, metaskills.md]
tech_stack:
  added: []
  patterns: [goal-backward-verification, outcome-drift-check, generic-content-detection, doctrine-compliance]
key_files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/metaskills.md
decisions:
  - "Outcome drift is the only new auto-fixable check — all content-level failures (generic content, doctrine compliance, pre-work gaps, formative assessment, goal-backward substantive/wired) require regeneration"
  - "Goal-backward verification reports per-module with three named sub-checks (Exists/Substantive/Wired) so failures name the specific module and problem"
  - "Domain term extraction (3-5 terms per module spec) is the mechanism for the Substantive sub-check — concrete and repeatable without ID vocabulary"
metrics:
  duration: "2 min"
  completed: "2026-03-27"
  tasks_completed: 2
  files_modified: 3
---

# Phase 20 Plan 02: Content-Level Integrity Checks Summary

Expanded the draft-then-audit mechanism from 4 structural checks to a comprehensive 7/8/6-check integrity system with named content-level failure modes and goal-backward session verification that ensures sessions actually achieve their module goals.

## What Was Built

### modules.md — 7 checks total
Added three checks after Schema Compliance and before Verification Integrity:

- **Check 5: Outcome Drift** — Compares draft outcome wording against registry canonical wording. Auto-fixable by replacing with registry wording. Blocking.
- **Check 6: Generic Content Detection** — Verifies `content_chunks`, `group_processing_prompt`, `metaskill_activation_activity`, and `belief_challenging_encounter` contain topic-specific nouns. Blocking, requires regeneration.
- **Check 7: Doctrine Compliance** — Verifies all four `social_learning` sub-fields, `belief_challenging_encounter`, and `modality_switches` are populated with substantive content. Blocking, requires regeneration.

Updated promotion condition from "all four checks" to "all seven checks". Updated auto-fix logic to include outcome drift while clarifying generic content and doctrine compliance require regeneration.

### sessions.md — 8 checks total
Added four checks after Schema Compliance and before Verification Integrity:

- **Check 5: Outcome Drift** — Same pattern as modules.md. Auto-fixable.
- **Check 6: Missing Formative Assessment** — Verifies each module's sessions include at least one mid-module check-in point. Blocking, requires regeneration.
- **Check 7: Pre-work Gaps** — Verifies pre-work is named (not just referenced) and later sessions build on earlier ones. Blocking, requires regeneration.
- **Check 8: Goal-Backward Verification** — Three sub-checks per module:
  - **8a (Exists):** All 4 required files present for every session
  - **8b (Substantive):** Session activities contain 2+ domain-specific terms extracted from the module spec
  - **8c (Wired):** Sessions have pedagogical flow — each builds on the previous, pre-work is explicitly used

Goal-backward reports per module: "Module M-1 'Name': Exists YES, Substantive YES, Wired NO" with specific failure reason. Updated promotion condition from "all four checks" to "all eight checks".

### metaskills.md — 6 checks total
Added two checks after Schema Compliance and before Verification Integrity:

- **Check 5: Outcome Drift** — Same pattern as modules.md. Auto-fixable.
- **Check 6: Generic Content Detection** — Verifies `activation_activity` and `transfer_prompt` name specific domain concepts, not generic platitudes. Blocking, requires regeneration.

Updated promotion condition from "all four checks" to "all six checks".

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

Files exist:
- FOUND: .claude/plugins/curriculum/commands/modules.md
- FOUND: .claude/plugins/curriculum/commands/sessions.md
- FOUND: .claude/plugins/curriculum/commands/metaskills.md
- FOUND: .planning/phases/20-integrity-verification/20-02-SUMMARY.md

Commits verified:
- d0f60f8: feat(20-02): add content-level integrity checks to modules and metaskills draft audit
- 4aa81ea: feat(20-02): add content-level checks and goal-backward verification to sessions draft audit
