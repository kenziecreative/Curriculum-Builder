---
phase: 01-schema-and-foundation
plan: 01
subsystem: schemas
tags: [schemas, backward-design, bloom, TMA-arc, social-learning, DCR, cognitive-load]
dependency_graph:
  requires: []
  provides:
    - stage-01-intake schema with enumerated values for delivery_mode, modality, self_direction_level, skill_type, cultural_orientation
    - stage-02-outcomes schema with Bloom's 6-value enum and outcome hierarchy
    - stage-03-assessments schema with assessment format enum and bloom alignment constraint
    - stage-04-modules schema with social learning 4 sub-fields and metaskill enum
    - stage-05-sessions schema with 8 TMA arc required fields and DCR integration
  affects:
    - All subsequent pipeline commands that include schemas as generation context
    - Phase 2 skills (which will reference these schemas)
    - Phase 3 commands (which generate output conforming to these schemas)
tech_stack:
  added: []
  patterns:
    - Schema-as-prompt-context: markdown spec files included in generation commands to constrain output
    - Backward design dependency chain: each schema declares depends_on to enforce pipeline sequence
    - Enum-over-freetext: all constrained fields use explicit enumerated values, never free text
key_files:
  created:
    - .claude/reference/schemas/stage-01-intake.md
    - .claude/reference/schemas/stage-02-outcomes.md
    - .claude/reference/schemas/stage-03-assessments.md
    - .claude/reference/schemas/stage-04-modules.md
    - .claude/reference/schemas/stage-05-sessions.md
  modified: []
decisions:
  - "Session output directory is 04-sessions/ (top-level, not nested under 03-modules/) per context decision"
  - "Schema enforcement is schema-in-prompt only — no runtime validation in Phase 1 (deferred to Phase 6)"
  - "Session template selection follows 5 enum values: gagne, 5e_7e, merrill, wippea, universal_tma_arc"
  - "Metaskill enum uses 6 values; 7th metaskill deferred pending Kelsey/research decision"
  - "cultural_orientation is required for programs >= 2 hours, not for shorter programs"
metrics:
  duration_minutes: 18
  completed_date: "2026-03-15"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 1 Plan 1: Pipeline Stage Schemas (1-5) Summary

**One-liner:** Five pipeline stage schemas with explicit enums for Bloom's taxonomy, TMA arc, social learning, DCR, and assessment alignment — the structural load-bearing foundation for all subsequent curriculum generation.

---

## What Was Built

Five markdown schema spec files in `.claude/reference/schemas/`, one per pipeline stage:

**stage-01-intake.md** — Intake stage schema capturing program_topic, target_audience with behavioral prior_knowledge format, transfer_context, success_criteria, duration_and_format (3 enums: delivery_mode, modality, session structure), self_direction_level (Grow model, 4-value enum), skill_type (open/closed enum), and cultural_orientation (3-value enum, required for programs >= 2 hours). Extended fields for long programs (cohort_size, prerequisite_programs).

**stage-02-outcomes.md** — Outcome design schema with Bloom's Revised Taxonomy as an explicit 6-value enum (Remember, Understand, Apply, Analyze, Evaluate, Create). Three-level outcome hierarchy (program > module > session) with parent_outcome_id references. Expertise-adaptive sequencing rules mapping Grow self-direction levels to Bloom starting points. Duration scaling from 2-3 objectives (short) to 15-25 (semester).

**stage-03-assessments.md** — Assessment design schema with 10-value format enum (performance-based, procedural, reflective, portfolio, case-analysis, simulation, demonstration, written, oral, peer-review). Bloom alignment constraint: assessment bloom_level must be >= paired_objective bloom_level. Skill-type constraints: open skills require performance-based/simulation; closed skills require procedural/demonstration. Formative/summative requirements by program size.

**stage-04-modules.md** — Module structure schema with social_learning as a required object with all 4 sub-fields: activity_type (4-value enum: individual, paired, small-group, full-cohort), interdependence_structure, accountability_mechanism, and group_processing_prompt. Primary_metaskill as 6-value enum. Metaskill_activation_activity requiring a specific thinking routine name. Belief_challenging_encounter and modality_switches as required fields. DAG sequencing constraint for prerequisite_modules.

**stage-05-sessions.md** — Session schema with all 8 TMA arc fields as required: prior_knowledge_activation (ACTIVATE), learning_objectives (THEORY), content_chunks (THEORY), formative_check (CHECK), guided_practice (METHOD), independent_practice (PRACTICE), reflection_prompt (REFLECT), transfer_connection (TRANSFER). Session template selection via 5-value enum. DCR integration fields with novice scaffolding rules. Facilitator_notes, participant_materials, and slide_framework_outline as required fields.

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Key Design Choices

**Why generic reflection prompts are blocked by schema:** The reflection_prompt field includes an explicit "prohibited" list of generic stems ("What did you learn today?", "What went well?"). This is a schema-level enforcement mechanism — the field's constraint description itself prevents the generation command from producing hollow reflection.

**Why transfer_connection references intake transfer_context:** The `application_scenario` sub-field must reference the specific `transfer_context` from Stage 01, not invent a new context. This chains stages together: intake context flows through to every session, ensuring the program never loses its "why it matters" grounding.

**Why social learning requires interdependence_structure:** The sub-field description requires the mechanism to be described, not just named. This prevents compliance theater ("we have group work") in favor of actual cooperative design ("each pair has one scenario card and one role card — neither can complete the task alone").

---

## Self-Check: PASSED

Files verified present:
- `.claude/reference/schemas/stage-01-intake.md` — FOUND
- `.claude/reference/schemas/stage-02-outcomes.md` — FOUND (contains bloom_level, Remember, depends_on stage-01)
- `.claude/reference/schemas/stage-03-assessments.md` — FOUND (contains paired_objective, depends_on stage-02)
- `.claude/reference/schemas/stage-04-modules.md` — FOUND (contains social_learning, interdependence_structure)
- `.claude/reference/schemas/stage-05-sessions.md` — FOUND (contains all 8 TMA arc fields, depends_on stage-04)

Commits verified:
- `6bc3d2d` — feat(01-01): create intake, outcome, and assessment schemas (stages 1-3)
- `7a043f1` — feat(01-01): create module and session schemas (stages 4-5)
