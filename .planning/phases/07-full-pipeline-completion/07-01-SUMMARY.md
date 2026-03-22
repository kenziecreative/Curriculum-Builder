---
phase: 07-full-pipeline-completion
plan: "01"
subsystem: generation-commands
tags: [metaskills, transfer-ecosystem, marketing-derivation, pipeline-completion, command-authoring]
dependency_graph:
  requires:
    - "06-validation-layer (knz-validate, knz-validator patterns)"
    - ".claude/reference/schemas/stage-06-metaskills.md"
    - ".claude/reference/schemas/stage-07-transfer.md"
    - ".claude/reference/schemas/stage-08-marketing.md"
  provides:
    - "/knz-metaskills command (Stage 6)"
    - "/knz-transfer command (Stage 7)"
    - "/knz-marketing command (Stage 8)"
  affects:
    - "07-02 auto-chain wiring (these commands are the chain links)"
    - "workspace/{project}/05-metaskills/"
    - "workspace/{project}/06-transfer/"
    - "workspace/{project}/07-marketing/"
tech_stack:
  added: []
  patterns:
    - "infer-and-review gate (from knz-modules, knz-sessions)"
    - "summary-gate pattern (from knz-modules)"
    - "auto-trigger via Skill invocation (from knz-sessions, knz-validate)"
    - "AskUserQuestion three-option gate with destructive confirmation"
    - "silent constraint enforcement before display"
    - "immediate file write without mid-pipeline gate (knz-marketing)"
key_files:
  created:
    - ".claude/commands/knz-metaskills.md"
    - ".claude/commands/knz-transfer.md"
    - ".claude/commands/knz-marketing.md"
  modified: []
decisions:
  - "knz-marketing writes files immediately (no mid-pipeline gate) — /knz-approve is the final review gate covering the full package including marketing; this avoids a redundant approval step"
  - "Community of Practice continuation design is always present — even 90-min programs close with a community connection moment; the simplified three-activity first_90_days_plan is the floor, not absence"
  - "Kirkpatrick level appears in transfer gate summary only through plain-language translation table — internal schema field names never shown to users; translations: Level 1 → Participant satisfaction, Level 2 → Knowledge and skill gain, Level 3 → Behavior change on the job, Level 4 → Business outcomes"
  - "knz-metaskills five-step constraint enforcement runs silently before display — user sees only corrected output with brief transparency note if changes were made"
  - "Trim order for duration scaling in knz-metaskills: remove Adapting first, then Innovating, then Imagining, then Communicating, keeping Exploring last — reflects developability hierarchy"
metrics:
  duration_minutes: 12
  completed_date: "2026-03-22"
  tasks_completed: 3
  tasks_total: 3
  files_created: 3
  files_modified: 0
---

# Phase 7 Plan 01: Stage 6-8 Generation Commands Summary

Three generation commands authored — `/knz-metaskills` (Stage 6), `/knz-transfer` (Stage 7), `/knz-marketing` (Stage 8) — completing the content-generation pipeline from thinking skill activation through marketing derivation, following established command patterns exactly.

## What Was Built

### /knz-metaskills (Stage 6)

Five silent constraint enforcement steps run before the gate display:

1. **Duration scaling** — ceiling applied based on contact_hours (< 2 → max 3 activations; 2–16 → 4–5; > 16 → all six required); trim order follows developability hierarchy
2. **Developability hierarchy** — Innovating and Adapting sequence_positions verified to come after at least one Exploring and one Creating activation; reordered if violated
3. **Thinking routine specificity** — generic labels ("discussion", "reflection", "brainstorm") blocked; named routines required (See-Think-Wonder, Claim-Support-Question, Pre-mortem, etc.)
4. **Transfer prompt grounding** — prompts must name a specific real-work situation from Stage 1 transfer_context; generic encouragement phrases blocked
5. **Imagining conditional fields** — evidence_gap_acknowledgment set to true; imagining_adjacent_practice set to one of scenario planning / futures thinking / mental simulation

Gate: AskUserQuestion with approve / flag an issue / start this stage over (nested destructive confirmation). Auto-triggers /knz-transfer on approval.

### /knz-transfer (Stage 7)

Duration scaling applied across three tiers with CoP never-omit rule enforced at every tier. Community continuation design is always required — 90-min programs get a simplified three-activity first_90_days_plan; longer programs get 5+ activities.

Attachment rule: every follow-through plan (implementation intention) must have a module_reference matching an actual module from 03-modules; every real-work application must have a session_reference matching an actual session from 04-sessions.

Skill-type rule: error correction practice required for open-skill programs, omitted for closed-skill.

Evaluation design: Kirkpatrick level set programmatically by program duration and skill_type; displayed to users as plain English (e.g., "Behavior change on the job") via translation table.

Gate: compact summary format showing all three layers + success measurement. AskUserQuestion with three options. Auto-triggers /knz-marketing on approval.

### /knz-marketing (Stage 8)

Key distinction from other commands: **no mid-pipeline review gate.** Files written immediately after generation. /knz-approve is the final review gate for the complete package.

Generation reads all prior stages. Every element requires source_citation + curriculum_traceability object (claim_text, supporting_element, strength). If a claim cannot be grounded in a specific curriculum source, it is not included.

Duration scaling: 90-min → program_description only; half-day to 2-day → program_description + learning_promises + audience_positioning; multi-week → all five element types.

Traceability display shows marketing copy with adjacent source footnotes — user sees both the enrollment copy and what grounds each claim. Ends with "Run /knz-approve" prompt. No auto-trigger.

## Chain

```
/knz-sessions (Stage 5) → auto-triggers /knz-validate
/knz-validate (Stage 9) → on pass: user runs /knz-metaskills manually (or auto-chain in Plan 02)
/knz-metaskills (Stage 6) → approval → auto-triggers /knz-transfer
/knz-transfer (Stage 7) → approval → auto-triggers /knz-marketing
/knz-marketing (Stage 8) → immediate write → "Run /knz-approve"
/knz-approve → final delivery-ready gate
```

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Task | Command | Commit | Description |
|------|---------|--------|-------------|
| 1 | /knz-metaskills | 5d69382 | Stage 6 thinking skill activation |
| 2 | /knz-transfer | 411b3ce | Stage 7 transfer ecosystem design |
| 3 | /knz-marketing | 97d81e4 | Stage 8 marketing derivation |

## Self-Check: PASSED

- [x] `.claude/commands/knz-metaskills.md` — exists, 224 lines
- [x] `.claude/commands/knz-transfer.md` — exists, 229 lines
- [x] `.claude/commands/knz-marketing.md` — exists, 170 lines
- [x] All three commits verified in git log
- [x] All three files have YAML frontmatter description field
- [x] knz-metaskills.md contains all five constraint steps and auto-triggers knz-transfer
- [x] knz-transfer.md contains compact gate summary and auto-triggers knz-marketing
- [x] knz-marketing.md writes immediately (no gate), ends with Run /knz-approve (no auto-trigger)
- [x] Community of Practice never omitted in knz-transfer.md
- [x] No ID vocabulary in user-facing output sections
