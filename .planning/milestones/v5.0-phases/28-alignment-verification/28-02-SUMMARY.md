---
phase: 28-alignment-verification
plan: "02"
subsystem: draft-audit-pipeline
tags: [alignment-verification, source-material, distortion-detection, draft-audit, generation-integrity]
dependency-graph:
  requires: [28-01]
  provides: [ALIGN-01, ALIGN-02, ALIGN-03, ALIGN-04, ALIGN-05, ALIGN-06]
  affects: [all-generation-stages]
tech-stack:
  added: []
  patterns: [alignment-check-reference-integration, skip-guard-pattern, traceability-variant-marketing]
key-files:
  created: []
  modified:
    - .claude/commands/curriculum/outcomes/SKILL.md
    - .claude/commands/curriculum/assessments/SKILL.md
    - .claude/commands/curriculum/modules/SKILL.md
    - .claude/commands/curriculum/sessions/SKILL.md
    - .claude/commands/curriculum/metaskills/SKILL.md
    - .claude/commands/curriculum/transfer/SKILL.md
    - .claude/commands/curriculum/marketing/SKILL.md
decisions:
  - "Stages 2-7 use verbatim alignment checks; stage 8 (marketing) uses traceability variant — outcome ID linkage + distortion checks, no verbatim alignment"
  - "Alignment check skip guard is identical across all 7 stages: no source-material/ files AND no domain-research-findings.md = skip, trail records Skipped"
  - "Transfer check count updated to 11 (was 10); sessions to 9 (was 8); modules to 8 (was 7); metaskills to 7 (was 6); marketing to 8 (was 7)"
  - "Alignment issues are never auto-fixable in any stage — consistent with existing auto-fix boundary"
  - "Alignment Check subsection in trail written only on pass — never written if check skipped or stage escalated without passing"
  - "Build Summary alignment checks counter incremented in all 7 stages"
metrics:
  duration: "7 minutes"
  completed: "2026-03-30"
  tasks-completed: 2
  files-modified: 7
---

# Phase 28 Plan 02: Alignment Check Wiring Summary

Alignment checks wired into all 7 generation stage commands — every stage now verifies output against source material before promotion, with the marketing stage using a traceability variant instead of verbatim alignment.

## What Was Built

Plan 01 defined what alignment checks do. This plan wired them in. Every generation stage command (outcomes through marketing) now loads `alignment-check-reference.md`, runs the alignment check as a numbered draft audit check, and records results in the audit trail.

**Integration pattern used consistently across all stages:**
- Load directive added in the source material / reference loading section
- Skip guard: if no `workspace/source-material/` files AND no `domain-research-findings.md`, skip check and record "Alignment Check: Skipped — no source material available." in trail
- Alignment check runs after all existing checks pass
- Blocking failures trigger 3-attempt retry with cumulative constraint injection
- Never auto-fixable
- Alignment Check subsection written to audit trail only after check passes
- Build Summary alignment checks counter incremented

## Stage-by-Stage Changes

**Stage 2 (Outcomes):** Alignment check added after constraint enforcement, before review gate display. Grounding-required areas: program outcomes, module outcomes, session outcomes, enduring understandings, essential questions.

**Stage 3 (Assessments):** Alignment check added after constraint enforcement, before PIPE-05 gate display. Grounding-required areas: assessment criteria, performance indicators, rubric standards.

**Stage 4 (Modules):** Check 8 (Source Material Alignment) added after Check 7 (Doctrine Compliance). Check count updated to 8. Grounding-required areas: module descriptions, key concepts, prerequisite rationale.

**Stage 5 (Sessions):** Check 9 (Source Material Alignment) added after Check 8 (Goal-Backward Verification). Check count updated to 9. Grounding-required areas: key concept explanations, pre-work content rationale. NOT checked: session activities, discussion prompts, time blocks, facilitator guide logistics. Retry scope is per-module, consistent with other content failures.

**Stage 6 (Metaskills):** Check 7 (Source Material Alignment) added after Check 6 (Generic Content Detection). Check count updated to 7. Grounding-required areas: thinking skill activation rationale, domain-specific examples. NOT checked: activation activity structure, facilitation logistics.

**Stage 7 (Transfer):** Check 11 (Source Material Alignment) added after Check 10 (Community Continuation). Check count updated to 11. Grounding-required areas: real-work application scenarios, success indicators. NOT checked: transfer activity structure, timeline logistics, community continuation format.

**Stage 8 (Marketing) — Traceability Variant:** Check 8 (Source Material Alignment — Marketing Traceability) added after Check 7 (Marketing Ratio). Check count updated to 8. Does NOT check verbatim alignment. Checks: (1) every learning promise links to an outcome ID that exists in registry; (2) qualifier stripping applied to factual claims; (3) range narrowing applied to factual claims; (4) over-claiming grounding verified. NOT checked: VOC language, PAS/DOS choice, headline formulas, emotional language derivation.

## Audit Trail Write Pattern

All 7 stages write an **Alignment Check** subsection after "Read but Not Referenced" in their trail write steps. Format is consistent:
- Result: PASS
- Issues found
- Distortions detected
- Assumed content areas
- Attempts

The subsection is omitted if the check was skipped (no source material) or if the stage escalated without ever passing. This completes the traceability chain: source material loaded → output generated → alignment verified → result recorded.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

Verified after SUMMARY creation.
