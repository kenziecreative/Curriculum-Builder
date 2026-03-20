# KNZ Curriculum Builder

A Claude Code plugin that encodes pedagogical doctrine as structural constraints to produce delivery-ready curriculum for adult learners. Built for Kenzie Creative and Hello Alice.

## When Starting a Session

1. Read `.planning/STATE.md` for current position and recent decisions
2. Read `.planning/LEARNINGS.md` for insights that should change your approach
3. Check auto-memory for user preferences and project context

## Project Context

- **Type:** Claude Code plugin (skills, subagents, hooks, reference files)
- **Users:** Kelsey (deep pedagogical knowledge) + Hello Alice SMEs (domain experts, not instructional designers)
- **Output:** Delivery-ready curriculum packages (90 min to full semester)
- **Research:** Extensive 11-phase research in sibling directory `knz-builder-research/`
- **PRD:** `.planning/PRD.md`
- **Design brief:** See research outputs `12-tool-design-recommendations.md` for architecture details

## Foundational Doctrine

Read `.claude/reference/doctrine-how-i-teach-how-i-learn.md` when working on any content-facing stage (sessions, modules, transfer design, metaskills). This is Kelsey's personal pedagogical doctrine — the six metaskills, Theory→Method→Application teaching model, Deconstruct→Compare→Rebuild learning model, and the flipped classroom rationale. It is the philosophical foundation the entire pipeline is built on, not a research artifact. Key implications:

- **Theory→Method→Application** governs session structure (Stage 5): theory delivered before sessions, live time reserved for application
- **Flipped classroom** means pre-work is not optional — it is the structural mechanism that makes application sessions possible
- **Six metaskills** (Exploring, Creating, Feeling, Imagining, Innovating, Adapting) are the transfer layer — Stage 6 builds directly from this
- **Deconstruct→Compare→Rebuild** is the learner's model for wicked domains — informs how transfer tasks should be designed

## Core Principles

- **Schema over instruction.** Encode pedagogical requirements as required output fields, not generation instructions. Constraint hierarchy: schema > template > checklist > inline directive > framework naming > role framing.
- **Backward design as generation sequence.** Outcomes before assessments, assessments before content, content before marketing. The pipeline order IS the alignment mechanism.
- **Enforce what gets skipped.** Reflection, formative assessment, transfer design, and social learning are the most commonly omitted elements. These get the most rigorous schema enforcement.
- **The tool handles the scaffold, the human handles the soul.** Structural rigor is automated; content decisions stay with the human.
- **Training produces behavioral change.** The transfer ecosystem (pre/in/post-program) is not optional — it is the mechanism that makes everything else matter.

## Auto Memory

Save memories when you learn something about the user, receive feedback, discover project context, or find useful references. Check MEMORY.md in the auto-memory directory for existing memories before saving duplicates. Keep the MEMORY.md index under 200 lines.

## State Management

Update `.planning/STATE.md` before ending any session where substantive work was done. A fresh session should be able to pick up exactly where the last one left off.
