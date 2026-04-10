# Phase 5: Prompt Architecture for Pedagogical Constraint

## Core Finding

The difference between "uses learning science vocabulary" and "implements learning science logic" comes down to six mechanisms, each addressing a different failure mode. No single mechanism is sufficient. Together, they define what the engine needs to do — and this is what determines the tool's shape.

---

## The Six Mechanisms

### 1. Role Framing → Register Initialization (not quality guarantee)

Personas don't improve factual accuracy (empirically tested: 162 roles, 2,410 questions, 4 LLM families — no improvement over no-persona control). What role framing reliably does is change register and format conventions. "Workshop facilitator/storyteller" activates narrative conventions. "Instructional designer performing backward design" activates structural conventions.

**Engine rule:** Use a structure-activating role ("instructional designer who builds competency-based curriculum using backward design") not an engagement-activating role. But don't rely on it — the role is register initialization, not a quality mechanism.

### 2. Schema-Enforced Output → Binding Constraints

This is the single most important finding. Constraints in an output schema are binding. Constraints stated as instructions are advisory. The old template operated at the advisory level ("ensure each outcome is specific and actionable"). The engine should operate at the schema level (required fields the model must populate or fail validation).

**The constraint hierarchy (strongest to weakest):**
1. Schema-enforced required fields (JSON/YAML with validation)
2. Structured output template with required sections
3. Output checklist the AI verifies before submitting
4. Inline "MUST" constraints
5. Framework naming ("use Bloom's taxonomy")
6. Role framing

The old template operated at levels 5-6. The engine should operate at levels 1-3.

**Engine rule:** Design a curriculum schema with required child fields per objective: `bloom_level` (enum), `formative_assessment` (required), `transfer_task` (required), `prerequisite_knowledge` (required). The schema IS the constraint specification.

### 3. Sequential Decomposition → Architectural Alignment

The old template tried single-pass generation with stop-gates. Research identifies a "working memory" failure mode: AI loses track of previously generated assessments when generating content in the same call, leading to misaligned output.

Sequential decomposition across multiple calls solves this structurally: each stage's output is injected as constraint into the next stage.

**Engine rule:** The generation sequence is a multi-stage pipeline, not a single prompt:

1. **Input collection** — structured intake
2. **Enduring understandings and essential questions**
3. **Learning objectives** — with required Bloom's levels
4. **Assessment design** — constrained by objectives
5. **Module structure and sequencing** — constrained by objectives + assessments
6. **Activities and learning experiences**
7. **Validation** — rubric check
8. **Marketing** — derived from completed curriculum

Each stage's output feeds the next as constraint. This IS backward design implemented as a generation pipeline.

### 4. Rubric-Based Validation → Structural Completeness Check

LLMs asked to "improve" output generically perform worse than the original (ICLR 2024). But rubric-based self-critique — checking against a specific named checklist — is categorically different and works.

"Check your response" is useless. "For each objective, verify: (1) Bloom's level verb specified, (2) formative assessment present and level-matched, (3) transfer task present, (4) prerequisite stated" is the difference between decoration and mechanism.

**Engine rule:** Include a validation stage with an enumerable checklist. Separate the critique step from the revision step — the model asked to validate AND revise in one step often revises away the problem without solving it.

### 5. Structured Intake → Something to Reason From

The Stanford SCALE paper (2025) confirms empirically: a structured input UI significantly outperforms an open prompt interface. Current AI curriculum tools collect topic + audience level. What they miss — and what produces the most improvement per unit of input effort:

1. **Specific prior knowledge** — not "intermediate" but "learner can do X but cannot yet do Y"
2. **Transfer context** — where/when/how will this learning be applied?
3. **Success criteria** — what does a capable graduate look like in concrete behavioral terms?
4. **Duration and format constraints**
5. **Enduring understandings** — the big ideas the curriculum builds toward

Transfer goals are the most underspecified input in existing tools and the most useful for preventing generic output.

**Engine rule:** Build a structured intake, not a free-text prompt. Required fields before any generation begins.

### 6. Generation Order → Marketing Last

Generating marketing first anchors the curriculum to persuasion goals. Marketing language overpromises specificity, compresses timelines, and flattens prerequisite complexity. Generating marketing last, derived from the completed curriculum, inverts this: marketing claims are constrained by what the curriculum actually does.

**Engine rule:** Marketing is the final stage, derived from completed curriculum. This isn't preference — it's the mechanism for preventing marketing priming from contaminating instructional design.

---

## What This Tells Us About the Tool's Shape

Phase 5 answers the question from Phase 4: "we can't say whether this is a single command or a multi-skill plugin until we know what the generation logic requires."

Now we know. The engine needs:

1. **A structured intake step** — collecting specific inputs before anything generates
2. **A multi-stage generation pipeline** — at minimum 6-8 stages, each constrained by prior output
3. **Schema-enforced output at each stage** — required fields, not instructions
4. **A validation step** — rubric-based, separate from generation
5. **Marketing as a derivative final step**

This is not a single command. It's a multi-stage workflow. But the complexity comes from the generation logic, not from tool architecture overhead — each stage is a focused generation task with clear inputs, schema, and output.

The question of exactly how many stages, exactly what the intake form asks, and exactly what the schema requires — that's Phases 6-8 (session design, metaskills operationalization, adult learning) feeding into Phase 10 (tool architecture).

---

*Phase 5 complete. Source: [prompt-architecture-for-pedagogy.md]*
