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
