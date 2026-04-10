# Phase 10: Tool Architecture Proposal — What the Curriculum Builder Should Actually Be

## Core Finding

The curriculum builder is a Claude Code plugin that implements a nine-stage generation pipeline, where learning science constraints are encoded as schema-enforced required fields — not instructions, not style suggestions, not framework names. The architecture's value proposition is the constraint layer itself: the same AI model that produces marketing-heavy, pedagogically thin output when unconstrained produces structurally sound curriculum when generation is decomposed into sequential stages, each with required output fields and rubric-based validation. The minimum viable version is five stages: structured intake, outcome design, assessment design, module generation, and validation. Everything else — marketing, transfer ecosystem, community design — is important but can ship in a second iteration.

---

## Research Question 1: What Is the Right Architecture?

### The Decision: Plugin with Bundled Skills, Subagents, and Hooks

The architecture options were: slash commands, skills, a plugin with bundled subagents, or a CLAUDE.md-based context injection system. The evidence from Phases 4, 5, and 9 converges on a single answer: a Claude Code plugin that bundles skills (one per pipeline stage), subagents (for validation and parallel generation), and hooks (for enforcement gates).

The tradeoffs favor this architecture for three reasons.

First, a plugin provides distribution and versioning. The tool ships as a GitHub repo, installs via Claude Code's plugin system, and can be updated independently of the user's other tools. A CLAUDE.md-based approach would require manual file management and would not support the multi-agent orchestration that the generation pipeline requires. Phase 4 confirmed that plugin distribution is straightforward: GitHub repo → plugin marketplace → install. Phase 9 confirmed that the Claude Code plugin ecosystem supports this complexity — one documented system implements 112 agents, 16 orchestrators, 146 skills, and 79 tools.

Second, skills provide the right granularity for pipeline stages. Each skill is a self-contained workflow with its own prompt, its own output schema, and its own validation logic. Skills can read state, reference prior stage outputs, and produce structured artifacts. The skill-per-stage model maps directly to the sequential decomposition identified in Phase 5 as the mechanism that prevents misalignment — each stage's output is injected as constraint into the next stage.

Third, subagents solve the context management problem. A full curriculum — structured intake, outcomes, assessments, 8-12 modules with session designs, metaskill mappings, transfer ecosystem, marketing — could consume 100k+ tokens. The main session stays clean as orchestrator while subagents handle heavy generation (module content) and validation (rubric checks) with fresh context windows. Phase 4 confirmed this pattern works: this research project uses the same model for its source-processing and cross-referencing agents.

Hooks provide the enforcement layer that makes the pipeline non-bypassable by accident. A SessionStart hook reads STATE.md and loads the project's current position. A PreToolUse hook blocks writes to future-stage directories before prerequisites are complete. These are not security mechanisms — a determined user can override them — but they prevent the casual skipping of validation that the Phase 6 research identified as the universal failure mode of learning cycle implementation.

### The Plugin Structure

```
knz-learner-builder/
├── plugin.json                    # Plugin manifest
├── CLAUDE.md                      # Project constraints, doctrine summary, state management rules
├── hooks/
│   ├── session-start.md           # Read STATE.md, load project context
│   └── pre-tool-use.md            # Block writes to future-stage directories
├── skills/
│   ├── init-project.md            # Stage 0: Project scaffolding
│   ├── intake.md                  # Stage 1: Structured intake
│   ├── design-outcomes.md         # Stage 2: Outcome and understanding design
│   ├── design-assessments.md      # Stage 3: Assessment design (backward design)
│   ├── design-modules.md          # Stage 4: Module structure and sequencing
│   ├── generate-sessions.md       # Stage 5: Session-level content generation
│   ├── map-metaskills.md          # Stage 6: Metaskill mapping and validation
│   ├── design-transfer.md         # Stage 7: Transfer ecosystem design
│   ├── generate-marketing.md      # Stage 8: Marketing derivation
│   └── validate.md                # Stage 9: Full-curriculum validation
├── agents/
│   ├── module-generator.md        # Parallel module content generation
│   ├── session-generator.md       # Session-level content within modules
│   ├── validation-agent.md        # Rubric-based validation (read-only)
│   ├── metaskill-validator.md     # Coverage, distribution, progression checks
│   └── transfer-validator.md      # Transfer ecosystem completeness check
├── reference/
│   ├── doctrine.md                # Full pedagogical doctrine (loaded on demand)
│   ├── session-templates.md       # Framework-specific session templates
│   ├── metaskill-routines.md      # Thinking routine library per metaskill
│   ├── validation-rubric.md       # Enumerable checklist for validation agent
│   └── schemas/                   # Output schemas per stage
│       ├── intake-schema.md
│       ├── outcome-schema.md
│       ├── assessment-schema.md
│       ├── module-schema.md
│       ├── session-schema.md
│       ├── metaskill-schema.md
│       └── transfer-schema.md
└── templates/
    └── project-scaffold/          # Directory template for new curriculum projects
        ├── STATE.md
        ├── 01-intake/
        ├── 02-outcomes/
        ├── 03-assessments/
        ├── 04-modules/
        ├── 05-sessions/
        ├── 06-metaskills/
        ├── 07-transfer/
        ├── 08-marketing/
        └── validation/
```

---

## Research Question 2: What Should the Validation Layer Look Like?

### Validation Architecture: Three Tiers

The validation layer is where the tool's value is most concentrated. Phase 5 established that rubric-based validation against enumerable criteria works, while open-ended "improve this" prompts make output worse (ICLR 2024). Phase 9's ARCHED evidence confirms: AI-generated objectives match human quality (κw = 0.834) only when constrained by taxonomy and validated against rubric. Without those mechanisms, quality degrades in documented, predictable ways.

The validation layer operates at three tiers, each with different automation levels and different roles for human judgment.

**Tier 1: Schema Validation (Automated, Every Stage)**

Every stage's output must conform to a defined schema. Missing required fields are hard failures — the pipeline does not advance. This is the binding constraint mechanism identified in Phase 5 as the primary quality lever. Schema validation is not pedagogical judgment; it is structural completeness checking. Does every learning objective have a Bloom's level? Does every objective have a paired assessment? Does every module have a social learning layer? Does every metaskill-targeted activity include a transfer prompt?

These checks run automatically as part of each stage's skill. The validation subagent reads the stage output and checks it against the schema. A missing field produces a specific error — "Module 3 objective 'Analyze competitive dynamics' has no paired formative assessment" — not a generic quality warning. The skill then loops: generate → validate → fix → re-validate, until the schema is satisfied.

The schema validation checklist (compiled from Phases 2, 5, 6, 7, and 8):

**Per-objective checks:**
- Bloom's taxonomy level specified (enum: Remember, Understand, Apply, Analyze, Evaluate, Create)
- Verb matches claimed Bloom's level (not "understand" tagged as Analyze)
- Formative assessment present and level-matched
- Transfer task present
- Prerequisite knowledge stated

**Per-module checks:**
- Learning objectives present and schema-valid
- Content chunks sized for cognitive load (2-4 interacting elements per chunk for novices)
- Social learning layer present: activity type, interdependence structure, accountability mechanism, group processing prompt
- At least one belief-challenging encounter (disorienting dilemma, not marketing "aha")
- At least one activity type switch (modality change)

**Per-session checks:**
- All 8 required session fields present: prior_knowledge_activation, learning_objectives, content_chunks, formative_check, guided_practice, independent_practice, reflection_prompt, transfer_connection
- Session template matches session type (knowledge transfer → Gagné; inquiry → 5E; problem-solving → Merrill; professional development → WIPPEA)
- TMA content arc wrapped in activation and reflection bookends

**Per-metaskill-mapping checks:**
- Primary metaskill identified per module
- Activation activity specified (not just a label — a described pedagogical move)
- Observable indicator defined
- Transfer prompt included
- Assessment touchpoint specified

**Program-level checks:**
- All six metaskills activated across the program
- No single metaskill dominates (distribution check)
- Progression respects developability hierarchy (Exploring/Creating earlier; Innovating/Adapting later)
- Objective-assessment alignment: every objective has at least one assessment; every assessment maps to at least one objective
- Sequencing logic: prerequisite knowledge for module N is developed in modules before N

**Tier 2: Rubric Validation (Automated With Human Review, After Generation)**

Tier 2 checks are qualitative assessments that a validation subagent performs against named criteria, but that require human confirmation before the result is accepted. These sit in the "danger zone" of the jagged frontier (Phase 9) — the AI can flag potential problems, but a human must judge whether the flag is valid.

The rubric validation checklist:

- **Cognitive load appropriateness:** Are content chunks appropriately sized for the stated learner expertise level? (Worked examples for novices; open problems for experts — expertise reversal effect)
- **Scaffolding coherence:** Does the curriculum progress from more structured to less structured instruction in a way that matches the audience's self-direction level?
- **Transfer realism:** Are application tasks using realistic scenarios that approximate the learner's actual work context, or are they generic exercises?
- **Belief-challenging encounter quality:** Do disorienting dilemmas genuinely challenge assumptions the target audience holds, or are they superficial provocations?
- **Social learning structure quality:** Do collaborative activities have genuine positive interdependence (not just "discuss with a partner"), individual accountability, and group processing?
- **DCR scaffolding for novices:** If learners are domain novices, are comparisons explicitly paired and progressively aligned (close → distant)?
- **Andragogical fit:** Does the curriculum's directive-to-facilitative balance match the stated cultural context and self-direction level?

The validation subagent produces a report with specific findings and confidence levels. The user reviews the report and accepts, rejects, or requests revision for each finding. This is the structured human judgment point — the tool surfaces what to look for and provides initial assessment; the human makes the final call.

**Tier 3: Transfer Ecosystem Validation (Human-Driven, Program Level)**

Tier 3 validates elements outside the AI's competence frontier — elements that require contextual knowledge the tool cannot possess. These are surfaced as structured prompts for the user, not as automated checks.

- **Pre-program readiness:** Has the tool generated a readiness assessment that captures the right baseline for this specific audience? (Only the curriculum designer/client knows the audience well enough to validate this)
- **Manager/supervisor involvement:** Are the manager briefing templates appropriate for the organizational context? (The tool generates templates; the user validates fit)
- **Post-program follow-up:** Are the spaced retrieval intervals and peer accountability structures realistic for this audience's post-program environment?
- **Community continuation:** Is the CoP seeding design appropriate given the cohort's likely post-program contact patterns?
- **Evaluation design:** Are the proposed measurement instruments feasible in the deployment context? Is the proposed Kirkpatrick level appropriate?

---

## Research Question 3: How Should the Doctrine Be Encoded?

### The Three-Layer Doctrine Encoding

The doctrine cannot live in a single location. Phase 5's constraint hierarchy (schema > template > checklist > inline MUST > framework naming > role framing) means the doctrine must be distributed across the architecture at the constraint level where each element is most effective.

**Layer 1: CLAUDE.md — The Constraint Summary**

CLAUDE.md contains the doctrine's principles as operational rules, not as philosophy. This is what the AI reads at the start of every session. It includes: the generation pipeline order (intake → outcomes → assessments → modules → sessions → metaskills → transfer → marketing → validation), the constraint hierarchy rule (schema-enforced fields are binding; instructions are advisory), the backward design principle (assessments before content), the TMA integration rule (TMA is the content arc within a session design framework that includes activation and reflection bookends), the social learning requirement (every module needs a social learning layer), and the state management protocol (read STATE.md first, update STATE.md at transitions).

CLAUDE.md does NOT contain the full doctrine text, the complete session template specifications, the metaskill thinking routine library, or the validation rubric. These are reference files loaded on demand by the skills that need them. Phase 4 confirmed this pattern: CLAUDE.md stays lean; reference files carry the detail.

**Layer 2: Schemas — The Binding Constraints**

The output schemas per stage are where the doctrine's requirements become structurally enforceable. When the module schema requires a `social_learning_layer` field with sub-fields for `activity_type`, `interdependence_structure`, `accountability_mechanism`, and `group_processing_prompt`, the AI cannot produce a module without social learning — not because it's told to include social learning (advisory), but because the output structure requires it (binding).

This is the single most important architectural decision. The schemas encode:

- Phase 2 findings: Bloom's level required per objective, formative assessment required per objective, transfer task required
- Phase 5 findings: structured intake required fields, backward design generation order
- Phase 6 findings: 8 required session fields, session template selection logic, belief-challenging encounters
- Phase 7 findings: per-module metaskill mapping with 5 required fields, per-program metaskill validation with 3 checks
- Phase 8 findings: social learning layer per module, transfer ecosystem (pre/in/post), self-direction level as intake field, open vs. closed skill classification, DCR-V (Validate step)

The schemas are the doctrine made structural. Everything the research says must be present in pedagogically sound curriculum becomes a required field in the appropriate schema.

**Layer 3: Reference Files — The Design Knowledge**

Reference files contain the full doctrine text, the session template library (Gagné-derived, 5E-derived, Merrill-derived, WIPPEA-derived), the metaskill thinking routine vocabulary (mapped to Visible Thinking Routines and design thinking activity archetypes), the validation rubric, and the DCR scaffolding guidelines. These are loaded by skills when needed — the session generation skill loads `session-templates.md`; the metaskill mapping skill loads `metaskill-routines.md`.

This three-layer encoding solves the problem Phase 5 identified: the old template operated at the instruction level (paragraphs of guidance that the AI treated as advisory). The new tool operates at the schema level (required fields the AI must populate) backed by reference files (domain knowledge the AI draws from when populating those fields).

---

## Research Question 4: What Should the Output Format Be?

### Auditable Output: Making Pedagogical Grounding Visible

The old template's output format made pedagogical grounding invisible. A reader could not tell whether the curriculum was sequenced based on scaffolding logic or topic convenience, whether assessments were aligned to objectives or generated independently, whether activities developed metaskills or merely mentioned them. The new tool's output must make the pedagogical architecture visible and auditable — not because the end learner reads it, but because the curriculum designer, reviewer, and client need to see the design logic.

**The output structure per curriculum project:**

```
curriculum-project/
├── 00-project-brief.md            # Intake summary: audience, context, constraints, success criteria
├── 01-outcomes/
│   ├── enduring-understandings.md  # Big ideas the program builds toward
│   ├── essential-questions.md      # Questions that drive inquiry
│   └── learning-objectives.md     # Objectives with Bloom's levels, prerequisites, transfer contexts
├── 02-assessments/
│   ├── assessment-map.md          # Objective-to-assessment alignment matrix
│   ├── formative-assessments.md   # Per-module formative checks
│   └── summative-assessments.md   # Program-level evidence of learning
├── 03-modules/
│   ├── sequence-rationale.md      # Why modules are ordered this way (prerequisite logic, scaffolding)
│   └── module-01/
│       ├── module-overview.md     # Objectives, content summary, session count
│       ├── session-01.md          # Full session design with 8 required fields
│       ├── session-02.md
│       ├── social-learning.md     # Activity types, interdependence, accountability, group processing
│       └── metaskill-map.md       # Primary metaskill, activation activity, indicator, transfer, assessment
├── 04-metaskills/
│   ├── coverage-report.md         # Which metaskills activated where (all 6 must appear)
│   ├── distribution-report.md     # Balance across modules
│   └── progression-map.md         # Developability hierarchy respected
├── 05-transfer/
│   ├── pre-program/
│   │   ├── readiness-assessment.md
│   │   ├── manager-briefing.md
│   │   └── baseline-measurement.md
│   ├── in-program/
│   │   ├── implementation-intentions.md  # "When X, I will Y" per module
│   │   └── real-work-applications.md     # Application tasks using participants' actual work
│   └── post-program/
│       ├── spaced-retrieval.md           # 1-week, 1-month, 3-month prompts
│       ├── peer-accountability.md        # Structures for ongoing mutual support
│       ├── community-continuation.md     # CoP seeding → continuation design
│       └── evaluation-design.md          # What, when, by whom, at what Kirkpatrick level
├── 06-marketing/
│   ├── program-description.md     # Derived from curriculum, not generated independently
│   ├── learning-promises.md       # What can be honestly promised based on what the curriculum does
│   └── audience-positioning.md    # Who this is for, based on the intake profile
└── validation/
    ├── schema-report.md           # Tier 1: all required fields present
    ├── rubric-report.md           # Tier 2: qualitative checks with confidence levels
    └── transfer-review.md         # Tier 3: human review prompts and responses
```

**What makes this different from the old template's output:**

The old template produced: a promise statement, program title, hooks, a "magic gifts" framework, an audience avatar, curriculum outline (single step, least specified), aha moments (as marketing copy), delivery format, and marketing content.

The new tool produces: structured intake summary, enduring understandings, learning objectives with Bloom's levels, assessment-objective alignment matrix, module sequence with prerequisite rationale, full session designs with 8 required pedagogical fields, metaskill mapping with activation activities, a three-layer transfer ecosystem, and marketing derived last from the completed curriculum.

The structural difference is that every design decision in the new output is traceable. A reviewer can ask "why is Module 3 before Module 4?" and find the answer in `sequence-rationale.md`. They can ask "which metaskills does this program develop and how?" and find the answer in `04-metaskills/`. They can ask "what happens after the program ends?" and find a specific, designed answer in `05-transfer/post-program/`. None of these questions are answerable from the old template's output, because the old template did not design for them.

---

## Research Question 5: What Does the Minimum Viable Version Look Like?

### MVP: Five Stages That Demonstrably Outperform the Template

The full architecture is nine stages plus validation. The minimum viable version that would demonstrably outperform the existing template needs five stages — the stages that address the template's documented root causes (Phase 1) using the constraint mechanisms proven to work (Phase 5).

**MVP Stage 1: Structured Intake (`/knz-intake`)**

Collects the inputs that the old template never asked for. Required fields:

- Program topic and domain
- Target audience description (not just "level" but specific prior knowledge: "can do X, cannot yet do Y")
- Transfer context: where, when, and how will learning be applied?
- Success criteria: what does a capable graduate look like in behavioral terms?
- Duration and format constraints
- Learner self-direction level for this domain (Grow's 4 stages)
- Skill type: open (adaptive, interpersonal) vs. closed (procedural, technical)
- Cultural context: individual vs. collective learning orientation

This stage alone addresses the "something to reason from" gap. The old template started generating with nothing but a topic. The MVP starts generating with a structured specification.

**MVP Stage 2: Outcome Design (`/knz-outcomes`)**

Generates enduring understandings, essential questions, and learning objectives. Each objective must include:

- A specific, measurable outcome statement
- Bloom's taxonomy level (enum, not free text)
- Prerequisite knowledge
- Transfer context (where this applies beyond the program)

This stage implements backward design's first move: define what learners will be able to do before designing how to get them there. The old template's Step 8 (Curriculum) generated topics and activities without defining objectives first — the architectural cause of its content-coverage bias.

**MVP Stage 3: Assessment Design (`/knz-assessments`)**

Generates assessments constrained by the outcomes from Stage 2. Every objective must have at least one paired assessment. Every assessment must specify what it measures and at what Bloom's level. Formative assessments are required per module; summative assessments are required at program level.

This stage implements backward design's second move: define evidence of learning before designing learning experiences. The old template had no assessment design step at all.

**MVP Stage 4: Module Generation (`/knz-modules`)**

Generates module content constrained by outcomes (Stage 2) and assessments (Stage 3). Each module must include:

- Learning objectives (inherited from Stage 2)
- Content chunks sized for cognitive load
- At least one session with the 8 required fields (prior knowledge activation, objectives, content chunks, formative check, guided practice, independent practice, reflection prompt, transfer connection)
- Social learning layer (activity type, interdependence, accountability, group processing)
- Primary metaskill with activation activity

Module generation can run in parallel using subagents — each module generator receives the full intake, outcomes, and assessments as context, plus the specific module's position in the sequence.

**MVP Stage 5: Validation (`/knz-validate`)**

Runs the Tier 1 schema validation and Tier 2 rubric validation. Produces a pass/fail report with specific findings. Schema failures block completion; rubric findings are surfaced for human review.

### What the MVP Omits (For V2)

- **Transfer ecosystem design** (Stage 7): Pre-program, in-program application tasks, and post-program follow-up structures. Important, but the MVP's session-level transfer prompts provide a baseline.
- **Marketing derivation** (Stage 8): The MVP user generates their own marketing. The tool proves its value through pedagogical quality, not marketing convenience.
- **Metaskill coverage validation** (full Stage 6): The MVP generates per-module metaskill mappings in Stage 4, but the program-level coverage, distribution, and progression validation is V2.
- **Community continuation design**: CoP seeding structures are V2.
- **Evaluation design**: Kirkpatrick-level measurement planning is V2.

### What the MVP Proves

The MVP demonstrates the thesis's core claim with the smallest possible scope. It shows that:

1. A structured intake produces better-specified generation input than a free-text prompt
2. Backward design (outcomes → assessments → content) produces better-aligned curriculum than topic-first generation
3. Schema-enforced required fields (Bloom's levels, formative assessments, social learning layers, transfer connections) produce structurally complete sessions that the old template's output systematically lacks
4. Rubric-based validation catches pedagogical quality issues that open-ended "improve this" prompts miss

If the MVP produces curriculum with these four properties, the thesis is confirmed — and the remaining stages (transfer ecosystem, marketing derivation, full metaskill validation) are extensions of a proven architecture, not speculative additions.

---

## The Generation Pipeline in Detail

### Stage 0: Project Initialization (`/knz-init`)

Creates the project directory from the scaffold template. Initializes STATE.md with project metadata. Sets up the directory structure for all subsequent stages. No generation occurs — this is pure scaffolding.

### Stage 1: Structured Intake (`/knz-intake`)

**Input:** Conversational interview with the user, guided by required intake fields.
**Output:** `00-project-brief.md` with all required fields populated.
**Constraint level:** The skill guides the conversation to ensure all required fields are captured. Does not generate curriculum content.

The intake collects information at three levels:

*Program level:* Topic, domain, duration, format (cohort-based, self-paced, hybrid), delivery mode (in-person, virtual, blended), total contact hours.

*Audience level:* Specific prior knowledge (not "intermediate" but "can do X, cannot yet do Y"), transfer context (where/when/how learning will be applied), success criteria (behavioral terms), self-direction level (Grow's 4 stages for this domain), cultural context (individual vs. collective orientation, comfort with self-direction, power dynamics), skill type (open vs. closed).

*Design level:* Enduring understandings (the big ideas), essential questions (the inquiry drivers), any non-negotiable content or sequence requirements, organizational constraints (technology, budget, facilitator expertise).

### Stage 2: Outcome Design (`/knz-outcomes`)

**Input:** `00-project-brief.md`
**Output:** `01-outcomes/enduring-understandings.md`, `01-outcomes/essential-questions.md`, `01-outcomes/learning-objectives.md`
**Constraint level:** Schema-enforced. Every objective requires Bloom's level (enum), prerequisite knowledge, and transfer context.

The skill loads the doctrine reference file for TMA sequencing guidance and generates objectives that progress through Bloom's levels in alignment with the program's scaffolding logic. For novice audiences (Grow Stage 1-2), the progression starts at Remember/Understand and builds to Apply/Analyze. For experienced audiences (Grow Stage 3-4), the progression can start at Apply/Analyze and push toward Evaluate/Create.

### Stage 3: Assessment Design (`/knz-assessments`)

**Input:** `01-outcomes/learning-objectives.md`
**Output:** `02-assessments/assessment-map.md`, `02-assessments/formative-assessments.md`, `02-assessments/summative-assessments.md`
**Constraint level:** Schema-enforced. Every objective must have at least one paired assessment. Assessment Bloom's level must match objective Bloom's level.

This is backward design's critical step — designing evidence of learning before designing learning experiences. The old template skipped this entirely. The assessment-map.md makes the objective-assessment alignment visible and auditable.

For open-skill curricula (identified in intake), the skill generates performance-based assessments (demonstrations, case analyses, simulated decisions) rather than knowledge-recall assessments (quizzes, multiple choice). For closed-skill curricula, procedural assessments (can the learner execute the steps?) are appropriate.

### Stage 4: Module Structure and Sequencing (`/knz-modules`)

**Input:** `00-project-brief.md`, `01-outcomes/`, `02-assessments/`
**Output:** `03-modules/sequence-rationale.md`, `03-modules/module-NN/module-overview.md` (per module)
**Constraint level:** Schema-enforced. Prerequisite logic must be explicit. Each module overview must specify which objectives it addresses, what prior knowledge it assumes, and what it builds toward.

The sequencing rationale is a required output — not just the module order, but WHY the modules are in this order. This makes the scaffolding logic visible. The old template generated curriculum as a topic list; the new tool generates curriculum as a prerequisite chain.

Module overviews are generated sequentially (each module's output constrains the next module's assumed prior knowledge) but module content (Stage 5) can be generated in parallel once all overviews are complete.

### Stage 5: Session-Level Content Generation (`/knz-sessions`)

**Input:** `03-modules/module-NN/module-overview.md`, `02-assessments/`, session template reference file
**Output:** `03-modules/module-NN/session-NN.md`, `03-modules/module-NN/social-learning.md`
**Constraint level:** Schema-enforced. 8 required session fields. Session template selection based on session type. Social learning layer required.

This stage generates the actual learning experiences. Each session follows the expanded TMA framework:

```
ACTIVATE → THEORY → CHECK → METHOD → PRACTICE → APPLICATION → REFLECT → TRANSFER
```

The skill selects the appropriate session template based on the session type captured in the module overview (knowledge transfer → Gagné-derived; inquiry → 5E-derived; problem-solving → Merrill-derived; professional development → WIPPEA-derived). TMA maps to the content delivery portion of whichever template is selected.

Session generation runs via subagents — each module's sessions can be generated in parallel, with the module overview and assessment requirements injected as constraints. Each subagent has access to the session template reference file and the doctrine's cognitive load guidelines.

The social learning layer is generated per module, specifying: which activities are individual, paired, small-group, or full-cohort; what the positive interdependence structure is for collaborative activities; how individual accountability is maintained; and what group processing prompts are used. The target is at least 40-50% collaborative activities, based on Phase 8's meta-analytic evidence.

### Stage 6: Metaskill Mapping (`/knz-metaskills`)

**Input:** `03-modules/` (all module and session content)
**Output:** `03-modules/module-NN/metaskill-map.md` (per module), `04-metaskills/coverage-report.md`, `04-metaskills/distribution-report.md`, `04-metaskills/progression-map.md`
**Constraint level:** Schema-enforced per module; validation-enforced at program level.

Per-module mapping identifies the primary metaskill(s) and specifies five required fields: (1) the activation activity — a specific thinking routine or design exercise, not a label, (2) the observable indicator — what behavior demonstrates the metaskill is being exercised, (3) the transfer prompt — a reflection question that helps learners dis-embed the metaskill from this context, (4) the assessment touchpoint — how metaskill development is formatively assessed, (5) the metaskill's role — whether it operates as a design constraint (shaping the activity's structure) or a learning outcome (something learners explicitly name and reflect on), or both.

Program-level validation checks: (a) all six metaskills are activated across the program, (b) no single metaskill dominates the distribution, (c) the progression respects the developability hierarchy — Exploring and Creating (high evidence) in earlier modules; Innovating and Adapting (moderate evidence, harder to develop) in later modules; Imagining activated through adjacent practices (scenario planning, futures thinking) with appropriate framing about the evidence gap.

### Stage 7: Transfer Ecosystem Design (`/knz-transfer`)

**Input:** `00-project-brief.md`, `03-modules/` (all content)
**Output:** `05-transfer/` (pre-program, in-program, post-program)
**Constraint level:** Schema-enforced. Three layers required.

Pre-program: readiness assessment, manager briefing template, baseline measurement instrument, pre-work calibrated to learner self-direction level.

In-program: implementation intentions ("When X, I will Y") per module, real-work application tasks using participants' actual work contexts, error management practice opportunities.

Post-program: spaced retrieval prompts at 1-week, 1-month, and 3-month intervals. Peer accountability structures. Manager check-in prompts. Community continuation design (CoP seeding → continuation structures). Evaluation design specifying what will be measured, when, by whom, and at what Kirkpatrick level (minimum Level 3 for programs claiming behavior change).

The open vs. closed skill classification from intake determines transfer support intensity. Open-skill curricula (leadership, strategy, communication) get heavier transfer scaffolding; closed-skill curricula (procedures, technical operations) can rely more on practice and repetition.

### Stage 8: Marketing Derivation (`/knz-marketing`)

**Input:** All prior stage outputs
**Output:** `06-marketing/program-description.md`, `06-marketing/learning-promises.md`, `06-marketing/audience-positioning.md`
**Constraint level:** Schema-enforced. Marketing claims must be traceable to curriculum content.

Marketing is the final stage. Every promise in the marketing output must reference a specific curriculum element that delivers on that promise. "You'll develop strategic decision-making" must trace to specific modules, objectives, and activities that develop strategic decision-making. This inverts the old template's architecture, where marketing claims were generated first and curriculum was rationalized to support them.

The marketing derivation skill reads the full curriculum and extracts: what the program actually teaches (from outcomes), what evidence of learning it produces (from assessments), what specific capacities it develops (from metaskill mapping), and what post-program support structures exist (from transfer ecosystem). Marketing copy is constrained by these realities.

### Stage 9: Full-Curriculum Validation (`/knz-validate`)

**Input:** All prior stage outputs
**Output:** `validation/schema-report.md`, `validation/rubric-report.md`, `validation/transfer-review.md`
**Constraint level:** This IS the constraint enforcement mechanism.

The validation stage runs all three tiers. Tier 1 (schema) runs automatically and produces pass/fail results. Tier 2 (rubric) runs automatically and surfaces findings for human review. Tier 3 (transfer ecosystem) generates structured prompts for the user to evaluate.

Schema failures require revision before the curriculum is considered complete. Rubric findings are advisory — the user may accept or override them with justification. Transfer review prompts are designed to surface contextual considerations the tool cannot assess.

The validation stage also runs the anti-failure-mode checks from Phase 8. For each of the seven documented failure modes of compressed programs (content without transfer, satisfaction surveys as evidence, open skills taught with closed methods, environmental mismatch, forgetting curve, community dissolution, insufficient practice), the validator checks whether the curriculum includes countermeasures.

---

## Architectural Principles (From the Research)

These principles are not design preferences — they are findings from Phases 1-9, compiled as architectural rules.

**1. Schema over instruction.** The constraint hierarchy is: schema-enforced required fields > structured output template > output checklist > inline MUST > framework naming > role framing. Design at the highest level possible. (Phase 5)

**2. Generation order is alignment order.** Intake → outcomes → assessments → content → marketing. This sequence IS backward design. Changing the order changes the output quality. (Phases 1, 5)

**3. Enforce what gets skipped.** Reflection, formative assessment, transfer design, and social learning are the elements that practitioners and AI generators most commonly omit. These must be the most rigorously schema-enforced elements, not the least. (Phases 2, 6, 7, 8)

**4. Validate against enumerable criteria, not open prompts.** "Is this good?" produces worse output than "Does this objective specify a Bloom's level, have a paired assessment, and include a transfer context?" (Phase 5)

**5. Separate generation from validation.** The model that generates content and the model that validates it should be in different calls. A single model asked to generate-and-validate often validates away problems without solving them. (Phase 5)

**6. Adapt to expertise, don't assume it.** Learner expertise level changes which instructional approach works. Self-direction is developmental and domain-relative. The intake must capture these variables and the generation must adapt. (Phases 2, 6, 8)

**7. Social learning is structural, not optional.** Cooperative learning outperforms individual learning by d = 0.54-0.78. The social learning layer is a required schema field, not an enhancement. (Phase 8)

**8. Transfer is an ecosystem, not a feature.** Training design is one of three necessary conditions for durable transfer. The tool must generate pre-program, in-program, and post-program transfer structures. (Phase 8)

**9. The tool structures human judgment; it does not replace it.** The jagged frontier maps what to automate (formatting), what to constrain (content, objectives, assessments), and what to keep human (needs analysis, strategic reasoning). The tool's intake structures human judgment; the tool's schemas constrain AI generation; the tool's validation surfaces issues for human decision. (Phase 9)

**10. Marketing derives from curriculum, not the reverse.** The generation order eliminates marketing priming. Marketing claims are constrained by what the curriculum actually delivers. (Phases 1, 5)

---

## Finding Tags Summary

| Claim | Tag | Evidence |
|---|---|---|
| A Claude Code plugin with bundled skills/subagents/hooks is the right architecture | SUPPORTED | Phase 4 platform assessment; Phase 9 ecosystem review (112-agent system exists); GSD reference implementation |
| Schema-enforced output fields are the primary constraint mechanism | SUPPORTED | Phase 5 constraint hierarchy; Phase 9 ARCHED validation (κw = 0.834 with constraints) |
| Three-tier validation (schema + rubric + human review) addresses the quality gap | SUPPORTED | Phase 5 (rubric-based works, open-ended doesn't); Phase 9 (quality gap documented and systematic) |
| The doctrine should be encoded across three layers (CLAUDE.md, schemas, reference files) | EMERGING | Synthesized from Phase 4 (platform model) + Phase 5 (constraint hierarchy); not tested as integrated unit |
| A five-stage MVP can demonstrably outperform the existing template | EMERGING | Each stage addresses documented root causes (Phase 1) using proven mechanisms (Phase 5); the integrated MVP has not been tested |
| The full nine-stage pipeline produces pedagogically complete curriculum | EMERGING | Each stage is evidence-grounded (Phases 2-8); the complete pipeline is a design proposal, not a tested system |
| Output format should make pedagogical grounding visible and auditable | SUPPORTED | Phase 1 (old template's design logic was invisible); Phase 9 (quality gap partly due to unverifiable design claims) |
| Generation order (backward design as pipeline) prevents marketing priming | SUPPORTED | Phase 1 (template sequencing caused marketing bias); Phase 5 (sequential decomposition prevents misalignment) |

---

*Phase 10 complete. This output synthesizes findings from all prior phases (1-9) into a concrete architectural proposal. All findings traceable to source phases noted in text.*
