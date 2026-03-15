# KNZ Curriculum Builder — Workspace Project

This is a KNZ Curriculum Builder workspace. All generation follows the schemas
in `.claude/reference/schemas/`. Schema fields are requirements, not suggestions.
Every stage output must match its schema exactly — required fields present,
enum fields using exact listed values.

---

## Constraint Hierarchy

When instructions conflict, the hierarchy resolves them in this order:

**Schema > Template > Checklist > Inline Directive > Framework Naming > Role Framing**

1. **Schema** — The schema file for the current stage is the highest authority
2. **Template** — Output templates override checklist items
3. **Checklist** — Checklist items override inline directives
4. **Inline Directive** — Task-level instructions override framework names
5. **Framework Naming** — Named frameworks (TMA, DCR) override role framing
6. **Role Framing** — The lowest-priority constraint

When a schema field contradicts a prose instruction, the schema wins.
When a template structure contradicts a checklist item, the template wins.
Do not ask for clarification when the hierarchy already resolves the conflict.

---

## Pipeline Sequence

Backward design is the generation sequence, not an orientation. The pipeline order
is the alignment mechanism — violating it produces misaligned curriculum.

**Stage order and prerequisites:**
- Stage 1 (Intake) must complete before Stage 2 (Outcomes)
- Stage 2 (Outcomes) must complete before Stage 3 (Assessments)
- Stage 3 (Assessments) must complete before Stage 4 (Module Structure)
- Stages 4–8 run autonomously after the Post-Assessment review gate is approved
- Stage 9 (Validation) runs after all prior stages are complete

**Review gates are hard stops:**
- Post-Intake gate: after Stage 1, before Stage 2
- Post-Assessment gate: after Stage 3, before Stages 4–8
- Final Validation gate: after Stage 9

Never generate content for a stage whose prerequisites are incomplete.
Never advance past a review gate without explicit user approval.

---

## Pedagogical Principles

These are the "why" behind the schemas. Schema files have the field-level "what."

**TMA Content Arc (Activate > Theory > Check > Method > Practice > Application > Reflect > Transfer)**
The TMA arc governs session-level sequencing within any delivery format. It is inside
session frameworks, not a replacement for them. Every session must progress through all
eight phases — skipping phases produces shallow learning without retention or transfer.

**DCR Analytical Method (Deconstruct > Compare > Rebuild > Validate)**
DCR develops expert-level analytical skill in wicked and ambiguous domains. Validate
phase applies when the domain has no single correct answer. Scaffold explicitly for novices
by providing the Deconstruct framework before asking for independent comparison.

**Transfer Design (Pre-program > In-program > Post-program)**
Transfer is the mechanism that makes everything else matter. Pre-program activities prime
retrieval and establish stakes. In-program activities apply to real work contexts. Post-program
activities embed the behavior in the learner's workflow. All three phases are required — the
transfer ecosystem is not enrichment, it is the point.

**Social Learning (Genuine Interdependence)**
Collaborative activities require structural interdependence — each participant needs the
others to complete the task. "Discuss with a partner" is not social learning. Activities
must define: what each role contributes, how outputs combine, and what the group produces
that no individual could produce alone.

**Backward Design (Outcomes > Assessments > Content)**
Generate outcomes first. Generate assessments from outcomes. Generate content to prepare
learners for the assessments. Never reverse this sequence — content-first design produces
activity-heavy curriculum that cannot demonstrate outcome attainment.

---

## Schema References

All schemas are in `.claude/reference/schemas/` in the KNZ Curriculum Builder plugin.
Each generation command includes the relevant stage schema as context before generating.
Generate output matching the schema structure. All required fields must be present.
Enum fields must use exact values listed in the schema — do not paraphrase or substitute.

Schema files by stage:
- `stage-01-intake.md` through `stage-09-validation.md`

---

## State Management

STATE.md is the single source of truth for pipeline position in this project.

- Read STATE.md at the start of every session (the session-start hook handles this)
- Update STATE.md after every stage transition
- Update STATE.md after every review gate decision
- Never announce "updating STATE.md" — state updates are silent
- Never ask "should I update STATE.md?" — always update it after transitions
- The Key Decisions section captures intake answers that affect all downstream stages

---

## Never

These are hard prohibitions, not guidelines. They encode the most commonly skipped
elements — the things that make training ineffective despite appearing complete.

1. **Never generate content without the relevant stage schema loaded as context.**
   Schema-less generation produces structurally incomplete output that cannot be validated.

2. **Never skip `transfer_connection` in session design.**
   It is a required schema field, not optional enrichment. Every session must connect its
   content to a specific real-world application context.

3. **Never use generic reflection prompts.**
   "What did you learn?" or "What was most valuable?" are not reflection — they are
   conversation starters. Reflection prompts must name the specific skill or concept from
   the session and ask learners to relate it to a concrete situation they face.

4. **Never create social learning activities without genuine interdependence structure.**
   Define roles, individual contributions, how outputs combine, and what the group produces
   that no individual could produce alone.

5. **Never advance past a review gate without explicit user approval.**
   Gates exist to surface misalignment before generating dependent stages. Proceeding
   without approval propagates errors into the entire downstream pipeline.

6. **Never write to a future-stage directory when the preceding stage is incomplete.**
   If Stage 2 is in-progress, do not write to `02-assessments/`. Pipeline order is
   enforced by directory writes, not just by STATE.md.

7. **Never announce state updates.**
   Do not say "I'm updating STATE.md" or "Let me check STATE.md." State management
   is infrastructure — it happens silently in the background of every interaction.

8. **Never treat the constraint hierarchy as optional.**
   When schema and instruction conflict, schema wins. No exceptions. No negotiation.
