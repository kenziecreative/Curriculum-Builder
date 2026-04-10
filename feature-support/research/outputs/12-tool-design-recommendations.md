# Tool Design Recommendations — Prioritized Design Brief

This document is a design brief for building the KNZ Curriculum Builder. It can be handed directly to a builder. Every recommendation is traceable to research findings documented in the phase outputs.

---

## Priority 1: MVP — Ship First, Extend Later

Build the five-stage MVP before the full nine-stage pipeline. The MVP addresses the existing template's documented root causes using proven constraint mechanisms. If it works, everything else is an extension of a proven architecture.

### MVP Stages

**Stage 1: Structured Intake (`/knz-intake`)**

Conversational interview guided by required fields. No curriculum generation occurs — this stage only collects inputs.

Required fields:
- Program topic and domain
- Target audience: specific prior knowledge ("can do X, cannot yet do Y" — not "intermediate")
- Transfer context: where, when, and how will learning be applied?
- Success criteria: what does a capable graduate look like in behavioral terms?
- Duration and format constraints (cohort-based, self-paced, hybrid; in-person, virtual, blended; total contact hours)
- Learner self-direction level for this domain (Grow's 4 stages)
- Skill type: open (adaptive, interpersonal) vs. closed (procedural, technical)
- Cultural context: individual vs. collective learning orientation

Output: `00-project-brief.md`

*Why this matters:* The Stanford SCALE paper (2025) confirms structured input UI significantly outperforms open prompt interface. Transfer goals are the most underspecified input in existing tools and the most useful for preventing generic output. The old template started generating with nothing but a topic. (Phase 5)

**Stage 2: Outcome Design (`/knz-outcomes`)**

Input: `00-project-brief.md`
Output: `01-outcomes/enduring-understandings.md`, `01-outcomes/essential-questions.md`, `01-outcomes/learning-objectives.md`

Every objective requires:
- Specific, measurable outcome statement
- Bloom's taxonomy level (enum: Remember, Understand, Apply, Analyze, Evaluate, Create)
- Prerequisite knowledge
- Transfer context

For novice audiences (Grow Stage 1-2): progression starts at Remember/Understand, builds to Apply/Analyze. For experienced audiences (Grow Stage 3-4): can start at Apply/Analyze, push toward Evaluate/Create.

*Why this matters:* Backward design's first move. The old template's Step 8 generated topics without objectives — the architectural cause of content-coverage bias. (Phases 1, 5)

**Stage 3: Assessment Design (`/knz-assessments`)**

Input: `01-outcomes/learning-objectives.md`
Output: `02-assessments/assessment-map.md`, `02-assessments/formative-assessments.md`, `02-assessments/summative-assessments.md`

Constraints:
- Every objective has at least one paired assessment
- Assessment Bloom's level matches objective Bloom's level
- Open-skill curricula → performance-based assessments (demonstrations, case analyses, simulated decisions)
- Closed-skill curricula → procedural assessments
- Formative assessments required per module; summative required at program level

Output makes alignment visible: `assessment-map.md` is an objective-to-assessment matrix.

*Why this matters:* Backward design's second move. The old template had no assessment design step. (Phases 1, 5, 11)

**Stage 4: Module Generation (`/knz-modules`)**

Input: `00-project-brief.md`, `01-outcomes/`, `02-assessments/`
Output: `03-modules/sequence-rationale.md`, per-module directories with session designs

Per module, required:
- Learning objectives (inherited from Stage 2)
- Content chunks sized for cognitive load (2-4 interacting elements for novices)
- At least one session with 8 required fields:
  1. `prior_knowledge_activation`
  2. `learning_objectives`
  3. `content_chunks`
  4. `formative_check`
  5. `guided_practice`
  6. `independent_practice`
  7. `reflection_prompt`
  8. `transfer_connection`
- Social learning layer: activity type, interdependence structure, accountability mechanism, group processing prompt
- Primary metaskill with activation activity (a thinking routine, not a label)
- At least one belief-challenging encounter (disorienting dilemma, not marketing "aha")
- At least one activity type switch (modality change)

Session template selection:
- Knowledge transfer → Gagné-derived template
- Inquiry/exploration → 5E/7E-derived template
- Problem-solving → Merrill-derived template
- Professional development → WIPPEA-derived template
- Default → Universal Arc with TMA overlay

TMA integration: ACTIVATE → THEORY → CHECK → METHOD → PRACTICE → APPLICATION → REFLECT → TRANSFER

Module generation can run in parallel via subagents. Module sequencing must be generated first (with prerequisite rationale), then sessions generated per-module with module overview as constraint.

*Why this matters:* Addresses all five root causes from Phase 1 simultaneously. Schema-enforced session fields make it structurally impossible to produce a curriculum without formative assessment, reflection, transfer design, or social learning. (Phases 1, 2, 5, 6, 7, 8)

**Stage 5: Validation (`/knz-validate`)**

Input: All prior stage outputs
Output: `validation/schema-report.md`, `validation/rubric-report.md`

Tier 1 (automated schema checks):
- Every objective has Bloom's level, paired assessment, transfer task, prerequisite
- Every session has all 8 required fields
- Every module has social learning layer with all sub-fields
- Every module has metaskill mapping with activation activity (not just label)
- Bloom's level verbs match claimed levels
- Sequencing shows prerequisite logic
- Coverage: all six metaskills activated across program

Tier 2 (automated + human review):
- Cognitive load appropriateness for stated expertise level
- Scaffolding coherence (more structured → less structured)
- Transfer realism (realistic scenarios vs. generic exercises)
- Social learning structure quality (genuine interdependence vs. "discuss with partner")
- Belief-challenging encounter quality (genuine assumption challenge vs. superficial provocation)

Schema failures block completion. Rubric findings surfaced for human review with confidence scores.

*Why this matters:* "Check your response" is useless. Enumerable checklist-based validation works. Separate generation from validation — a single model asked to generate AND validate often validates away problems without solving them. (Phases 5, 9, 11)

---

## Priority 2: What Ships After MVP

Once the MVP is validated, extend in this order:

### Stage 6: Full Metaskill Mapping (`/knz-metaskills`)

MVP generates per-module metaskill maps during Stage 4. V2 adds program-level validation:
- Coverage report: all six metaskills activated
- Distribution report: no single metaskill dominates
- Progression map: Exploring/Creating (high evidence) earlier; Innovating/Adapting later; Imagining via adjacent practices with evidence-gap framing

### Stage 7: Transfer Ecosystem Design (`/knz-transfer`)

The single largest architectural expansion from Phase 8. Three required layers:

Pre-program:
- Readiness assessment
- Manager briefing template
- Baseline measurement instrument
- Pre-work calibrated to self-direction level

In-program:
- Implementation intentions per module ("When X, I will Y" — d = 0.65)
- Real-work application tasks using participants' actual work
- Error management practice opportunities

Post-program:
- Spaced retrieval prompts at 1 week, 1 month, 3 months
- Peer accountability structures
- Manager check-in prompts
- Community continuation design (CoP seeding → continuation)
- Evaluation design: what, when, by whom, at what Kirkpatrick level (minimum Level 3 for behavior change claims)

Open-skill curricula get heavier transfer scaffolding than closed-skill. Warn when compressed format + open skills + minimal transfer support are combined.

### Stage 8: Marketing Derivation (`/knz-marketing`)

Every marketing claim traceable to a specific curriculum element. Output:
- Program description derived from curriculum content
- Learning promises constrained by what the curriculum actually delivers
- Audience positioning based on intake profile

### Stage 9: Full-Curriculum Validation (`/knz-validate-full`)

Adds Tier 3 (human-driven transfer validation):
- Pre-program readiness assessment fit
- Manager briefing appropriateness for organizational context
- Post-program follow-up feasibility
- CoP seeding design appropriateness
- Evaluation design feasibility

Anti-failure-mode checks: for each of 7 documented compressed-program failure modes, verify the curriculum includes countermeasures.

---

## Priority 3: Architecture Decisions

### Plugin Structure

```
knz-learner-builder/
├── plugin.json
├── CLAUDE.md                      # Layer 1: operational rules (lean)
├── hooks/
│   ├── session-start.md           # Read STATE.md, load context
│   └── pre-tool-use.md            # Block writes to future-stage directories
├── skills/
│   ├── init-project.md            # Stage 0: scaffolding
│   ├── intake.md                  # Stage 1
│   ├── design-outcomes.md         # Stage 2
│   ├── design-assessments.md      # Stage 3
│   ├── design-modules.md          # Stage 4
│   ├── generate-sessions.md       # Stage 5 (V2)
│   ├── map-metaskills.md          # Stage 6 (V2)
│   ├── design-transfer.md         # Stage 7 (V2)
│   ├── generate-marketing.md      # Stage 8 (V2)
│   └── validate.md                # Stage 5/9
├── agents/
│   ├── module-generator.md        # Parallel module generation
│   ├── session-generator.md       # Session content within modules
│   ├── validation-agent.md        # Rubric checks (read-only)
│   ├── metaskill-validator.md     # Coverage/distribution/progression
│   └── transfer-validator.md      # Transfer ecosystem completeness
├── reference/
│   ├── doctrine.md                # Layer 3: full doctrine text
│   ├── session-templates.md       # Gagné, 5E, Merrill, WIPPEA templates
│   ├── metaskill-routines.md      # Thinking routine library per metaskill
│   ├── validation-rubric.md       # Enumerable checklist
│   └── schemas/                   # Layer 2: binding constraints
│       ├── intake-schema.md
│       ├── outcome-schema.md
│       ├── assessment-schema.md
│       ├── module-schema.md
│       ├── session-schema.md
│       ├── metaskill-schema.md
│       └── transfer-schema.md
└── templates/
    └── project-scaffold/
```

### Three-Layer Doctrine Encoding

**Layer 1 (CLAUDE.md):** Pipeline order, constraint hierarchy rule, backward design principle, TMA integration rule (content arc inside session framework), social learning requirement, state management protocol. No full doctrine text — stays lean.

**Layer 2 (Schemas):** Required output fields per stage. This is where research findings become structural requirements. The schema IS the constraint specification.

**Layer 3 (Reference files):** Full doctrine, session template library, metaskill thinking routine vocabulary, validation rubric. Loaded on demand by skills that need them.

### State Management

STATE.md tracks: current stage, completed stages, validation status, key decisions. CLAUDE.md mandates reading it first on every session. Hooks enforce stage ordering — PreToolUse blocks writes to future-stage directories before prerequisites complete.

### Context Management

Main session stays clean as orchestrator. Subagents handle heavy generation (module content, session designs) and validation (rubric checks) with fresh context windows. A full 12-module curriculum could consume 100k+ tokens; subagent composition prevents context exhaustion.

---

## Priority 4: Doctrine Refinements to Encode

These refinements should be implemented in the reference files and schemas:

1. **TMA bookends.** TMA is the content arc (THEORY → METHOD → APPLICATION) inside a session framework (ACTIVATE → ... → REFLECT → TRANSFER). The session schema requires both.

2. **DCR-V.** Extend DCR to Deconstruct → Compare → Rebuild → Validate. Validate step required for wicked-domain curricula.

3. **DCR scaffolding for novices.** Progressive alignment: close comparisons first, distant comparisons later. Explicitly paired cases. Structural cues for comparison. Encoded in module schema when audience is Grow Stage 1-2.

4. **Social learning layer.** Required per module. Activity type (individual/paired/small-group/full-cohort), positive interdependence structure, individual accountability mechanism, group processing prompt. Target: 40-50% collaborative activities.

5. **Andragogical defaults.** Self-direction, experience-leveraging, problem-centered orientation as strong defaults adjustable based on cultural context and domain expertise. Intake captures the adjustment variables.

6. **Expertise-adaptive design.** Three dimensions keyed off intake: (a) instructional strategy (worked examples vs. open problems), (b) session template (Gagné for novices, Merrill for experienced), (c) TMA ordering (Theory-first for novices, Application-first for experts with productive failure).

7. **Metaskill scope.** Either add a 7th social/interpersonal metaskill or reframe the six as intrapersonal capacities with collaborative activity types that activate their social expressions. Either way, the activity vocabulary must include structured collaboration formats.

8. **Imagining framing.** Activate through adjacent evidence-based practices (scenario planning, futures thinking, mental simulation). Explicitly frame the evidence gap — do not present as equivalent to the high-evidence metaskills (Exploring, Creating).

---

## Priority 5: Validation Protocol

### Testable Success Criteria

The tool succeeds if:

| # | Criterion | Automatable? | Threshold |
|---|-----------|-------------|-----------|
| 1 | Schema completion rate | Yes | > 95% of required fields populated |
| 2 | Objective-assessment alignment | Yes | 100% — every objective has ≥1 assessment |
| 3 | Bloom's level distribution | Yes | Activities span ≥ 4 taxonomy levels |
| 4 | Transfer design presence | Yes | Every module has ≥1 transfer mechanism |
| 5 | Expert blind preference | No | Preferred on ≥ 6 of 8 dimensions |
| 6 | Marketing-to-pedagogy ratio | Yes | < 25% (vs. 60-65% in current template) |
| 7 | Metaskill coverage | Yes | All 6 activated with transfer prompts |
| 8 | Expert congruence analysis | No | No broken alignment chain links |

### Head-to-Head Comparison Protocol

1. Select single topic and audience
2. Generate curriculum with existing template
3. Generate curriculum with new tool, same topic and audience
4. Standardize both outputs to identical presentation template
5. De-identify sources
6. Recruit 3-5 instructional design practitioners
7. Present pairs on 8 comparison dimensions: objective-assessment alignment, scaffolding logic, transfer design, formative assessment integration, metaskill activation, marketing-to-pedagogy ratio, cognitive level distribution, learner engagement design
8. Collect binary preferences and qualitative commentary
9. Calculate inter-rater reliability (weighted kappa for ordered categories, ICC for continuous)
10. Analyze qualitative feedback

### Rapid Prototyping Validation

Before generating full curricula: generate a single module, evaluate using Tessmer's expert review (congruence, content, design, feasibility sub-analyses), revise tool's prompts and schemas based on findings, repeat until module passes all rubric criteria. Only then generate full curriculum.

---

## Quick Win: Immediate Template Improvement

Even before building the full tool, three changes to the existing template would measurably improve output:

1. **Change the role framing** from "facilitator specializing in storytelling" to "instructional designer performing backward design for competency-based curriculum."

2. **Reorder the steps:** Learning outcomes (current Step 6) → Assessment design (new step) → Curriculum structure (current Step 8) → Marketing elements (current Steps 3-5, 9-10). Move all marketing after curriculum.

3. **Add three required fields** to Step 8: "For each learning objective, specify: (a) the Bloom's taxonomy level, (b) one formative assessment that checks this objective, (c) one transfer task that applies this learning beyond the program."

These three changes operate at three different constraint levels (role framing, generation order, schema-like requirements) and address the three most consequential root causes. They are implementable in 30 minutes and would produce a measurable shift in output quality — though not the structural transformation the full tool provides.

---

*All recommendations traceable to research phases 1-11. This document is a design brief, not a specification — implementation-level details (exact schema formats, enum values, validation rule syntax) require engineering work beyond the scope of this research.*
