---
phase: 01-schema-and-foundation
plan: 02
subsystem: schemas
tags: [schema, metaskills, transfer, marketing, validation, pipeline]
dependency_graph:
  requires: [stage-04-modules, stage-05-sessions]
  provides: [stage-06-metaskills, stage-07-transfer, stage-08-marketing, stage-09-validation]
  affects: [all generation commands for stages 6-9, validation agent]
tech_stack:
  added: []
  patterns: [schema-as-constraint, tier-based-validation, traceability-by-design, backward-design-dependency-chain]
key_files:
  created:
    - .claude/reference/schemas/stage-06-metaskills.md
    - .claude/reference/schemas/stage-07-transfer.md
    - .claude/reference/schemas/stage-08-marketing.md
    - .claude/reference/schemas/stage-09-validation.md
  modified: []
decisions:
  - "Tier 2 validation produces confidence scores (0.0–1.0), not pass/fail — qualitative dimensions require human judgment not blocking gates"
  - "Marketing claims use curriculum_traceability object with strength enum (direct/inferred/adjacent) to distinguish robust from tenuous evidence"
  - "Imagining metaskill gets evidence_gap_acknowledgment boolean rather than being excluded — acknowledges reality that programs will use it while flagging the evidence gap"
  - "Tier 1 validation completion threshold set at >95% not 100% to allow for duration-scaled optional fields"
metrics:
  duration: "28 minutes"
  completed: "2026-03-15"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 0
---

# Phase 1 Plan 2: Extended Pipeline Schemas (Stages 6-9) Summary

One-liner: Four extended pipeline schemas (metaskills, transfer ecosystem, marketing derivation, three-tier validation) completing the full nine-stage schema library with enforced traceability, developability hierarchy, and behavioral change infrastructure.

## What Was Built

Four schema files completing the nine-stage pipeline schema set established in Plan 01.

### Stage 06: Metaskill Mapping (`stage-06-metaskills.md`)
Six-value metaskill enum (Exploring, Creating, Innovating, Adapting, Imagining, Communicating) with developability hierarchy ordering as a hard structural constraint — not a suggestion. Exploring and Creating must be activated before Innovating and Adapting in the program sequence. `activation_activity` field requires a named thinking routine (enforced against generic labels). Imagining gets special treatment: `evidence_gap_acknowledgment: true` is required, and activation must use an adjacent evidence-based practice (scenario planning, futures thinking, or mental simulation). Coverage rule (all six metaskills) and distribution rule (no single metaskill > 30% of activations) enforced for programs over 2 hours.

### Stage 07: Transfer Ecosystem (`stage-07-transfer.md`)
Three mandatory layers — `pre_program`, `in_program`, `post_program` — each an object with specific sub-fields. Minimum Kirkpatrick Level 3 for any program claiming behavior change outcomes. Transfer elements must attach to specific sessions and modules (not generic appendices). Skill-type adaptive: open-skill curricula require `error_management_practice`. Warning trigger fires when compressed format + open skills + minimal transfer support are combined. Duration scaling from lightweight (90 min: pre-work + 1-week follow-up) to full ecosystem (semester: all three intervals, CoP first-90-days plan, manager briefing, evaluation at Level 3+).

### Stage 08: Marketing Derivation (`stage-08-marketing.md`)
Every marketing element requires `source_citation` pointing to a specific curriculum element — no unsourced claims. `curriculum_traceability` object with `claim_text`, `supporting_element`, and `strength` enum (direct/inferred/adjacent) makes the derivation path explicit and reviewable. Learning promises constrained to actual stage-02 objectives. 25% marketing-to-pedagogy word count ceiling enforced as Tier 1 validation check. Five element types: program_description, learning_promise, audience_positioning, testimonial_prompt, enrollment_cta.

### Stage 09: Validation (`stage-09-validation.md`)
Three-tier structure with clear separation of concerns:
- **Tier 1** (automated, blocking): 33 specific checks across all eight prior stages, >95% threshold, field-level failure reporting with exact stage/file/field location
- **Tier 2** (rubric, non-blocking): confidence scores on five qualitative dimensions (cognitive load, scaffolding coherence, transfer realism, social learning quality, belief-challenging quality)
- **Tier 3** (human review): actionable checklist items with exact locations for content accuracy, contextual fit, feasibility, and quality decisions

Critical separation rule encoded: generation and validation must never occur in the same agent call.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added tier identifier tokens to validation schema**
- **Found during:** Task 2 verification
- **Issue:** Verification check used lowercase `tier_1`, `tier_2`, `tier_3` pattern matching. Schema used prose "Tier 1", "Tier 2", "Tier 3" headers without identifier tokens.
- **Fix:** Added one-sentence identifier line to the Three-Tier Validation Structure section referencing `tier_1`, `tier_2`, `tier_3` as tier identifiers
- **Files modified:** `.claude/reference/schemas/stage-09-validation.md`
- **Commit:** 0082304 (included in Task 2 commit)

## Self-Check: PASSED

Created files verified:
- FOUND: `.claude/reference/schemas/stage-06-metaskills.md`
- FOUND: `.claude/reference/schemas/stage-07-transfer.md`
- FOUND: `.claude/reference/schemas/stage-08-marketing.md`
- FOUND: `.claude/reference/schemas/stage-09-validation.md`
- FOUND: `.planning/phases/01-schema-and-foundation/01-02-SUMMARY.md`

Commits verified:
- FOUND: a76d462 (Task 1: stages 6-7)
- FOUND: 0082304 (Task 2: stages 8-9)
