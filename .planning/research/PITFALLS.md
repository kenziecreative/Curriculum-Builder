# Domain Pitfalls

**Domain:** Claude Code plugin with multi-stage pipeline — AI-assisted curriculum generation
**Researched:** 2026-03-15
**Sources:** 11-phase research project (knz-builder-research), Brand Compass reference implementation, Claude Code platform documentation (Phase 4 assessment), prompt architecture research (Phase 5)

---

## Critical Pitfalls

Mistakes that cause rewrites, pipeline failures, or outputs that defeat the pedagogical thesis.

---

### Pitfall 1: Instructions Are Not Constraints — Schema Drift

**What goes wrong:** Skills and agents receive instructions ("ensure each objective includes a Bloom's level") rather than schema-enforced required fields. The AI treats instructions as advisory. Bloom's levels get populated sometimes, skipped when generation is complex, or stated in prose rather than enum format. Validation catches some but not all. Output looks complete; pedagogical alignment is broken.

**Why it happens:** Instructions feel explicit at authoring time. The difference between "MUST include Bloom's level" and a required schema field feels theoretical until generation produces a session with `bloom_level: "higher order"` that passes no automated check.

**Consequences:** The tool's entire value proposition collapses. The thesis is that schema-enforced constraints produce structurally sound curriculum that instruction-based prompting cannot. If schemas are written as prose checklists inside skill prompts, the tool is the old template with extra steps.

**Prevention:**
- Every required pedagogical element becomes a required output field with defined type: enum, required string, boolean, or array with minimum length
- Schema format must be machine-checkable: YAML or JSON with explicit field names — not markdown bullets
- Validation agent reads schema first, checks output against it field-by-field — not open-ended "does this look complete?"
- Reference: Phase 5 constraint hierarchy. Design at levels 1-2 (schema, template) not levels 4-6 (inline MUST, framework naming, role framing)

**Detection:** If you find yourself writing "The AI should always include..." in a skill file, that is the signal. Convert to a required schema field immediately.

**Phase:** Address in Phase 1 (Foundation & Schema Design). Every schema must be finalized before the skill that uses it is built.

---

### Pitfall 2: Generate-and-Validate in the Same Call

**What goes wrong:** A skill generates module content and also validates it in the same agent call. The model flags its own problems and resolves them in the same pass — often by softening the concern or rationalizing the gap rather than actually fixing it. The validation report shows no issues. The output has the issues.

**Why it happens:** It is natural to want a single "generate good output" step. Splitting generation from validation feels like architectural overhead. But the research is explicit: LLMs asked to generate AND validate in one step "often validate away problems without solving them" (Phase 5, Phase 10).

**Consequences:** Tier 1 schema validation produces false passes. Formative assessment fields get populated with placeholder content that passes string-length checks. Social learning layers reference "partner discussion" and pass as complete. The pipeline advances on hollow output.

**Prevention:**
- Generation agents and validation agents are separate files with separate invocations
- Validation agents are read-only (no write access to content directories) — this forces them to evaluate rather than correct
- The validation agent receives the schema and the output as inputs; it does not have access to the generation prompt that produced the output
- Generate → validate → return findings → human or orchestrator decides whether to regenerate

**Detection:** If a single skill file contains both a generation prompt and a validation checklist that it evaluates itself, this pitfall is present.

**Phase:** Establish the generate/validate separation in Phase 1 architecture. Never collapse them later for "efficiency."

---

### Pitfall 3: Context Collapse in Long-Running Sessions

**What goes wrong:** The main orchestrating session accumulates context across pipeline stages. By Stage 5 (session generation), the session context includes full intake, outcomes, assessments, module overviews, and the current module being generated. For a 10-module semester-length program, this exceeds 100k tokens. Generation quality degrades silently — the model begins dropping constraints, losing track of earlier decisions, and producing output that doesn't align with upstream stages.

**Why it happens:** The subagent composition pattern prevents this, but only if it is architected deliberately. It is tempting to keep everything in the main session for "coherence." That coherence becomes a liability at scale.

**Consequences:** Late-stage outputs (session content, transfer ecosystem, marketing) contradict early-stage decisions (intake, outcomes). Schema enforcement degrades because the schema is now far back in context. Programs that worked at 90-minute scale fail at semester scale — creating an architectural change requirement that was supposed to be out of scope.

**Prevention:**
- The main session is the orchestrator only. It reads state, launches subagents, incorporates outputs, advances STATE.md. It does not generate curriculum content.
- Each subagent gets: (1) the specific schema for its task, (2) the relevant upstream outputs as constraint context (not the entire pipeline history), (3) its own fresh 200k context window
- For parallel module generation: each module-generator subagent receives the intake brief, the outcome objectives relevant to that module, the assessment map for that module, and the module overview — not the full pipeline output
- STATE.md bridges sessions; file system bridges subagents. Neither requires everything in one context.

**Detection:** If any skill file begins accumulating all prior stage outputs as context before doing its generation work, the session is becoming the bottleneck. Subagent composition should have been invoked.

**Phase:** Phase 1 architecture must specify which stages use subagents and what context each subagent receives. This is not a later optimization — it shapes the entire file structure.

---

### Pitfall 4: STATE.md Drift — The Session Continuity Gap

**What goes wrong:** STATE.md is written at the end of sessions but not updated atomically at transitions. An agent completes, writes output to a file, and session ends before STATE.md reflects the completion. Next session starts, STATE.md says the module is "in progress," agent runs again, generates a second version of the same output in a different format, and the curriculum now has two divergent module-03.md files.

**Why it happens:** Writing state feels like overhead compared to the generation work. It gets deferred to "after I finish this module." Sessions end mid-task.

**Consequences:** Session restoration fails. The "next session picks up exactly where the last one left off" guarantee breaks. For a 90-minute program built in one session this is fine. For a semester-length program built across many sessions with pauses between, this is a project-ending problem.

**Prevention:**
- STATE.md write protocol is defined before first code: write at stage start, write at stage completion, write when any agent output is incorporated. Not "before ending the session" — at each transition.
- Running Agents table in STATE.md (borrowed from Brand Compass implementation) tracks what was launched and where its output lands. On session start, check this table before doing anything.
- The session-start hook reads STATE.md first and surfaces any Running Agents whose output exists but is not incorporated
- Treat an unincorporated agent output as a blocking condition — it must be resolved before advancing

**Detection:** If STATE.md is only written at session end, the protocol is inadequate. If the Running Agents table is absent, the protocol has a gap.

**Phase:** STATE.md protocol defined in Phase 1. Session-start hook implemented in Phase 2 (Core Plugin Infrastructure). Tested as part of Phase 2 validation — simulate a session interruption and verify clean recovery.

---

### Pitfall 5: Schema Fields Without Enumerated Values Become Advisory

**What goes wrong:** The Bloom's level field is defined as a string rather than an enum. The social learning activity type is "required" but accepts any string. The model populates these fields with values that are technically non-empty but pedagogically meaningless: `bloom_level: "high"`, `activity_type: "collaborative exercise"`, `interdependence_structure: "working together."` Schema validation passes because the fields are populated. Validation quality is zero.

**Why it happens:** Defining enums requires explicit decisions about what values are valid. It is easier to say "fill in a Bloom's level" than to enumerate `[Remember, Understand, Apply, Analyze, Evaluate, Create]` and write validation logic that rejects `"high"`. The effort feels disproportionate to the schema design task.

**Consequences:** Tier 1 validation loses meaning. The entire point of schema enforcement — making constraints binding rather than advisory — is undermined while appearing to work. Rubric validation must compensate, which requires human time on checks that should have been automated.

**Prevention:**
- Every schema field that maps to a learning science concept has an enumerated value set or minimum structural constraint:
  - `bloom_level`: enum `[Remember, Understand, Apply, Analyze, Evaluate, Create]`
  - `interdependence_structure`: must include at least one of `[positive goal interdependence, resource interdependence, role interdependence, reward interdependence]`
  - `session_template`: enum `[Gagne, 5E, Merrill, WIPPEA, Universal-TMA]`
  - `skill_type`: enum `[open, closed]`
- Validation agent checks enum values against the allowed list, not just field presence
- Free-text fields have minimum length requirements where length is a proxy for substantive content

**Detection:** Read any schema file. If any field could be satisfied by a single word or vague phrase without detection, it is not sufficiently constrained.

**Phase:** Phase 1 (Foundation & Schema Design) must produce complete schema specifications with enum values before any generation code is written. Schema is the specification, not an implementation detail.

---

### Pitfall 6: Skills Can't Call Skills — Pipeline Continuity Breaks

**What goes wrong:** A skill is designed to complete Stage 3 (Assessment Design) and then automatically invoke Stage 4 (Module Structure). Claude Code's architecture prevents this — skills cannot call skills directly. The user finishes Stage 3 and waits. Nothing happens. The pipeline has an invisible gap that the user must manually bridge by invoking the next command.

**Why it happens:** The automation expectation is that the pipeline flows automatically between stages. The platform constraint (skills cannot call skills) is known from Phase 4 research but easy to forget during implementation when the goal is seamless flow.

**Consequences:** For autonomous middle stages (4-8 in the nine-stage pipeline), manual invocation defeats the automation value proposition. User must remember to run `/knz-sessions` after `/knz-modules` completes. If the user doesn't, STATE.md correctly shows module stage complete but session stage never starts.

**Prevention:**
- Subagent composition is the documented workaround: a skill completes its stage, then spawns a subagent with the next stage's skill content injected as its prompt
- Design the pipeline flow explicitly: which stage transitions are automatic (subagent-to-subagent handoff) and which are intentional human gates (human invokes next command)
- Per the PRD: Stages 4-8 run autonomously; human gates are at Intake (Stage 1), after Assessment Design (Stage 3), and at Final Validation (Stage 9). This means Stages 4-8 must use subagent chaining, not skill invocation.
- Document this pattern in CLAUDE.md: "Stage transitions within autonomous phases use subagent composition. Human gate stages await explicit command invocation."

**Detection:** If a skill prompt ends with "now the user should run /knz-[next-stage]" for an autonomous stage, the pipeline flow is broken.

**Phase:** Phase 2 (Core Plugin Infrastructure) must implement and test the subagent chaining pattern before Stage 4-8 skills are built. The chain pattern is a prerequisite for autonomous pipeline operation.

---

## Moderate Pitfalls

Mistakes that reduce output quality or create significant rework without causing architectural failure.

---

### Pitfall 7: Naming Metaskills Without Enacting Them — The IB ATL Warning

**What goes wrong:** The metaskill mapping stage generates a `primary_metaskill` field containing a label ("Exploring") and a thin `activation_activity` that describes what learners will do without specifying the pedagogical move that activates the metaskill. Example: `activation_activity: "learners will explore the topic through case discussion"`. This passes schema validation if the field is populated. It does not implement metaskill development.

**Why it happens:** Metaskills are abstract. The difference between naming a metaskill and operationalizing it through a thinking routine requires specific pedagogical vocabulary that the generation agent may not apply without explicit constraint.

**Consequences:** Phase 7 of the research identified this as "the IB ATL failure mode" — teachers embedded ATL skills in unit planners but did not make them visible in classroom activities; over time, implementation got worse, not better. A curriculum builder that produces metaskill labels without activation routines reproduces this failure at generation speed.

**Prevention:**
- `activation_activity` field requires a named thinking routine from the Visible Thinking Routines library or an equivalent structured move — not a description of what learners do
- The metaskill reference file maps each metaskill to its activation routines: `Exploring → [See-Think-Wonder, Question Starts, Headlines]`, `Adapting → [I Used to Think... Now I Think, Claim-Support-Question]`
- Validation agent checks: does the activation activity reference a named routine or a structurally described move? A description of the content is not an activation routine.
- `observable_indicator` field must describe a specific learner behavior (what you would see), not a learning outcome statement

**Detection:** Read any generated metaskill-map.md. If the activation activity could be described by someone who doesn't know the metaskill framework, it is too thin.

**Phase:** Phase 3 (Intake through Outcomes) builds the metaskill reference file. Phase 5 (Module and Session Generation) implements the mapping schema. The reference file must exist before the schema is used.

---

### Pitfall 8: Reflection and Transfer Fields as Afterthoughts

**What goes wrong:** The session schema has 8 required fields. During generation, fields 1-5 (activation, objectives, content, formative check, guided practice) are substantive. Fields 6-8 (independent practice, reflection prompt, transfer connection) receive thin placeholder content: `reflection_prompt: "What did you learn today?"`, `transfer_connection: "Think about how you can apply this at work."` Both fields are populated, schema validation passes, pedagogical value is zero.

**Why it happens:** Generation proceeds linearly through the schema. By field 6, the generation agent has expended most of its attention on earlier fields. The final fields receive less attention. This mirrors the documented human tendency — reflection and transfer are the most commonly skipped elements in instructional practice (Phase 5 research finding).

**Consequences:** The transfer ecosystem design in Stage 7 depends on in-session transfer connections being substantive. Marketing derivation in Stage 8 depends on honest transfer claims. Generic reflection prompts and transfer connections undermine both. The tool produces the same structural weakness it was designed to prevent, inside fields that look populated.

**Prevention:**
- `reflection_prompt` has a minimum quality constraint: it must be a metacognitive question (about the learner's thinking process) not a content recall question. Validation agent checks: does the prompt ask about the learner's thinking, reasoning, or change in perspective? Or does it ask about content recall?
- `transfer_connection` must reference the specific transfer context captured in intake: `transfer_context` from the project brief is injected into the session generation prompt. A generic "apply at work" without reference to the specific work context is a validation failure.
- Generate the transfer connection first within the session schema (not last). Invert the field order in the generation prompt — transfer context is the anchor, earlier fields fill in toward it.

**Detection:** Read any generated session file. If the reflection prompt could appear in any curriculum on any topic, it is generic. If the transfer connection doesn't reference the specific audience work context from intake, it is a placeholder.

**Phase:** Phase 4 (Module and Session Generation). Session schema design must include validation logic for these fields, not just field presence.

---

### Pitfall 9: Parallel Module Generation Without Sequence Constraints

**What goes wrong:** Module generation subagents are launched in parallel for efficiency. Each subagent receives the intake, outcomes, and assessment map. Module 3 is generated without knowledge of what Module 2 will cover. When modules are assembled, the prerequisite logic doesn't hold — Module 3 assumes concepts developed in Module 2 that Module 2's parallel generation didn't prioritize.

**Why it happens:** Parallel generation is correct for session content within a module (each session has the module overview as constraint). It is incorrect for modules themselves, which must be sequenced first, then generated.

**Consequences:** The `sequence-rationale.md` file says one thing; the module content does another. Prerequisite logic is stated but not implemented. A reviewer or the validation agent will catch this, but remediation requires regenerating multiple modules.

**Prevention:**
- Module structure and sequencing (Stage 4a) runs sequentially: module overviews are generated one at a time, each constrained by the prior module's output, producing the complete sequence with prerequisite rationale before any session content generation begins
- Session content generation (Stage 4b / Stage 5) then runs in parallel within each module, with the module overview as a fixed constraint
- STATE.md tracks: "module overviews complete" as a gate before "session generation begins"
- This is the documented architecture from Phase 10: "Module sequencing must be generated first (with prerequisite rationale), then sessions generated per-module with module overview as constraint"

**Detection:** If the pipeline launches parallel module generation before a complete sequence with prerequisite rationale exists, the sequencing will be inconsistent.

**Phase:** Phase 4 (Module and Session Generation). The two-step within Stage 4 — sequence first, then parallel generation — must be specified in the skill design, not discovered during testing.

---

### Pitfall 10: React Dashboard as Decoration

**What goes wrong:** The React dashboard is built as a progress tracker that shows which pipeline stages are complete. It is not connected to the actual content pipeline. A user building a 10-module semester program cannot navigate to a specific module's session, compare the assessment map against the objectives, or review the validation report's findings while editing the curriculum. The dashboard is aesthetic, not functional.

**Why it happens:** Dashboard development is separated from pipeline development. The dashboard is built from STATE.md (which stages are done) rather than from the curriculum content (what was produced). The deliverable navigation requirement — preventing the "scroll to find it" problem — requires content-aware views, not stage-status views.

**Consequences:** The dashboard justification from the PRD ("curriculum output volume is even higher — dashboard prevents 'scroll to find it' problem") is not realized. Users navigate the file system directly. The dashboard adds build complexity without delivering the navigation value.

**Prevention:**
- Dashboard design begins from the user's navigation needs, not from the STATE.md structure
- Required views: (1) pipeline stage status, (2) deliverable index with clickable navigation to actual files, (3) validation report surfacing with findings inline, (4) assessment-objective alignment matrix as a visual
- File-based communication protocol is defined before dashboard build: which files the dashboard reads, in what format, with what refresh mechanism
- The dashboard reads curriculum content files directly (markdown) — not a separate data layer. Parsing markdown for display is simpler than maintaining a parallel data structure.

**Detection:** If the dashboard prototype shows only stage completion status and not the actual curriculum deliverables it produces, it is not solving the problem it was built for.

**Phase:** Phase 2 (Core Plugin Infrastructure) defines the file communication protocol. Dashboard Phase (whichever phase builds the React component) requires the protocol to be stable before UI work begins.

---

### Pitfall 11: Enforcement Is Behavioral, Not Structural — Know the Ceiling

**What goes wrong:** The plugin is built with the expectation that hooks and STATE.md gates will prevent users from bypassing pipeline stages. A user asks conversationally "can you just generate the marketing for me without the outcomes step?" and the system complies, because the enforcement is probabilistic (Claude will resist but can be convinced), not structural (a compiler that refuses to run).

**Why it happens:** The Platform Phase 4 assessment documented this explicitly: "Enforcement is behavioral, not structural. A user can always override through conversation." This constraint is known but its implications for UX and user communication are not always designed for.

**Consequences:** A well-meaning user (especially the Hello Alice team without instructional design training) bypasses validation gates by accident or by asking for shortcuts. The pipeline produces partial curriculum that the user believes is complete because no hard error was thrown.

**Prevention:**
- Design the user experience around the constraint, not against it: make stage gates feel like natural conversation pauses, not bureaucratic stops
- The skill prompts for gate stages (Intake, Assessment Review, Final Validation) explicitly frame why the gate exists and what breaks without it — the user should understand, not just comply
- STATE.md gate checks surface as: "We're at the assessment review gate. Before sessions are generated, you need to confirm these assessments are right — here's why that matters" — not as an error message
- CLAUDE.md includes the principle: "When a user requests a shortcut that would bypass a gate, explain what breaks. If they insist after understanding the tradeoff, document the bypass in STATE.md and proceed — but do not comply silently."
- Accept that the system is probabilistically robust, not absolutely enforced. Design quality checks in downstream stages that would surface upstream gaps.

**Detection:** If the hook system is designed as if it prevents all bypasses, the expectation is wrong. Design for user understanding, not tool-level blocking.

**Phase:** Phase 1 (Foundation & Schema Design) — the behavioral enforcement ceiling must be understood before any gate design. Phase 3 (Intake and Outcomes) — gate UX design.

---

## Minor Pitfalls

---

### Pitfall 12: CLAUDE.md Overload

**What goes wrong:** CLAUDE.md accumulates full doctrine text, schema specifications, session template library, and validation rubric. It becomes a 3,000-line file loaded on every session. Context is consumed before any work begins. The session-start hook that was supposed to restore project state is now competing with doctrine recitation for context budget.

**Why it happens:** CLAUDE.md is the most accessible place to put operational guidance. Every new requirement goes there. It grows without a deletion policy.

**Prevention:**
- CLAUDE.md contains: pipeline order (one sentence each), constraint hierarchy rule, state management protocol, and pointers to reference files — nothing else
- Full doctrine lives in `reference/doctrine.md`, loaded on demand by skills that need it
- Session templates live in `reference/session-templates.md`, loaded by the session generation skill
- Schema specifications live in `reference/schemas/`, loaded by validation agents
- CLAUDE.md should be readable in under 2 minutes. If it is not, it has grown past its purpose.

**Phase:** Phase 1 defines CLAUDE.md scope. Enforce a review gate: if CLAUDE.md exceeds 300 lines, audit and migrate to reference files before adding anything new.

---

### Pitfall 13: SME Intake Questions Require Instructional Design Vocabulary

**What goes wrong:** The structured intake asks "What is the learner's self-direction level on Grow's SSDL scale?" The Hello Alice program team does not know what SSDL means. The intake is abandoned or answered with guesses that produce the wrong expertise-adaptive template selection.

**Why it happens:** Intake is designed from the schema inward (what data does the pipeline need?) rather than from the user outward (what can an SME answer without training?).

**Consequences:** The tool fails its secondary user. Hello Alice SMEs fall back to Kelsey to complete the intake, which recreates the bottleneck the tool was built to remove.

**Prevention:**
- Every intake question is phrased in terms of learner behavior and domain knowledge, not instructional design frameworks
- "Self-direction level" becomes: "Think about learners arriving at this training. Circle the description that best fits: (A) They need step-by-step guidance and clear structure, (B) They can follow a structure but need motivation and encouragement, (C) They know what they need to learn but need help connecting concepts, (D) They could mostly learn this on their own but benefit from structure"
- The intake skill maps SME-answerable descriptions to the underlying pedagogical variables internally — the SME never sees "Grow Stage 2"
- Test the intake with at least one Hello Alice team member before committing to the schema. If they cannot answer every question using only their domain knowledge, revise.

**Phase:** Phase 3 (Intake and Outcomes) intake design and testing.

---

### Pitfall 14: Output Volume Without Navigation — The Scroll Problem

**What goes wrong:** A 10-module program generates 40+ markdown files across 8 directories. The user finishes generation and immediately faces a file tree they cannot navigate efficiently. They cannot find the facilitator guide for Module 3, cannot compare the assessment map against the objectives, and cannot locate the validation report findings. The curriculum is complete but unusable.

**Why it happens:** Generation is optimized. Navigation is not designed.

**Prevention:**
- `00-project-brief.md` includes a generated index: every file in the project with a one-line description and its path
- The React dashboard's deliverable view is a navigable index — clicking any item opens it. This is the primary navigation mechanism, not the file explorer.
- The document assembler (Stage 8 equivalent) generates a compiled facilitator package: a single file with all session guides assembled in sequence. Facilitators use this, not the directory structure.
- File naming follows a sortable convention: `module-03-session-02-facilitator-guide.md` — alphabetical sort produces delivery order.

**Phase:** Phase 4 (Module and Session Generation) establishes file naming conventions. Phase with React dashboard implements navigable index.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Schema design | Instructions masquerading as constraints (Pitfall 1) | All required fields as machine-checkable types with enums |
| Architecture setup | Generate-validate collapse (Pitfall 2) | Separate agent files for generation and validation from day one |
| Pipeline design | Skills-can't-call-skills gap (Pitfall 6) | Design subagent chaining pattern before Stage 4-8 skills are built |
| State management | STATE.md drift (Pitfall 4) | Write protocol defined and session-start hook tested in Phase 2 |
| Module generation | Parallel sequencing before overviews complete (Pitfall 9) | Two-step Stage 4: sequence-first gate, then parallel session generation |
| Session generation | Reflection/transfer as afterthoughts (Pitfall 8) | Invert field generation order; transfer context injected from intake |
| Metaskill mapping | Naming without enacting (Pitfall 7) | Require named thinking routines in activation_activity field |
| React dashboard | Dashboard as decoration (Pitfall 10) | Define file communication protocol before UI build; content views required |
| Context management | Session context collapse at scale (Pitfall 3) | Main session is orchestrator only; subagents handle all generation |
| Intake design | ID vocabulary leaking into SME-facing questions (Pitfall 13) | Test intake with Hello Alice team before schema lock |
| CLAUDE.md | Doctrine accumulation (Pitfall 12) | 300-line ceiling; reference file architecture enforced from Phase 1 |
| Gate enforcement | Expecting structural enforcement from behavioral system (Pitfall 11) | Design UX for user understanding, not tool-level blocking |

---

## Sources

- Research Phase 4: Claude Code Platform Assessment (`knz-builder-research/research/outputs/04-claude-code-platform-assessment.md`) — HIGH confidence
- Research Phase 5: Prompt Architecture for Pedagogical Constraint (`05-prompt-architecture-for-pedagogy.md`) — HIGH confidence (multiple external sources verified)
- Research Phase 10: Tool Architecture Proposal (`10-tool-architecture-proposal.md`) — HIGH confidence
- Research Phase 7: Metaskills Operationalization (`07-metaskills-operationalization.md`) — HIGH confidence
- Research Phase 6: Session Design Frameworks (`06-session-design-frameworks.md`) — HIGH confidence
- Brand Compass Plugin (`knz-brand-guidance/CLAUDE.md`) — HIGH confidence (working reference implementation, same architectural pattern)
- Research Gaps Document (`knz-builder-research/research/gaps.md`) — HIGH confidence (self-reported known gaps from the research itself)
- PRD Known Technical Risks (`.planning/PRD.md`, Section 9) — HIGH confidence (domain expert judgment)
