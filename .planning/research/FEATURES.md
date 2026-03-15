# Feature Landscape

**Domain:** Conversational pipeline tool with React dashboard — Claude Code plugin for curriculum generation
**Researched:** 2026-03-15
**Confidence:** HIGH — primary evidence from working reference implementation (knz-brand-guidance), 11-phase project research, and PRD

---

## How Features Were Identified

Evidence sources (in order of authority):
1. Working reference implementation: knz-brand-guidance Brand Compass plugin — directly observed commands, agents, dashboard patterns, and interaction flows
2. 11-phase research project (knz-builder-research) — tool design recommendations, architecture proposal, platform assessment
3. PRD and PROJECT.md — requirements, scope decisions, and explicit out-of-scope items

Web search was unavailable. All findings are derived from first-party sources with direct evidence.

---

## Table Stakes

Features that users expect from a multi-stage pipeline tool. Missing any of these makes the tool feel broken or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Session-resumable state (STATE.md)** | Multi-stage pipelines always span sessions; without state, users restart from scratch | Low | STATE.md pattern is fully proven in reference impl. Session-start hook auto-reads it. Must include: current stage, completed stages, key decisions, session log, next action |
| **One command per pipeline stage** | Users need clear entry points for each stage; a single `/go` command for a nine-stage process is confusing and non-resumable | Low | Reference impl has 16 commands (8 phases + checkpoints + resume + export + verify). Curriculum builder needs ~12 (9 stages + init + validate + resume) |
| **Resume command** | Sessions end. Users need to get back into context without re-reading everything | Low | `/brand-compass:resume` is the model. Must show: current stage, last session summary, completed work, next action |
| **Human review gates at critical decisions** | Pipeline tools that run to completion without checkpoints produce outputs users don't trust | Medium | Reference impl has Checkpoint A (strategic foundation) and Checkpoint B (identity complete). Curriculum builder gates: after intake, after assessment design, at final validation |
| **AskUserQuestion for discrete choices** | Presenting options as prose buries the decision; structured multi-select prevents misreading | Low | Used extensively in reference impl for asset pack selection, confirmation gates. Required wherever user makes a categorical choice |
| **State update after every phase completion** | If state isn't current, the resume flow breaks | Low | Silent state writes (no announcement to user). Reference impl mandates this at end of every phase command |
| **Confirmation gate before phase transition** | Advancing without user confirmation produces misaligned downstream stages | Low | Every phase in reference impl ends with "Does this look right?" + structured options before marking complete |
| **Progress visibility** | Users lose confidence when they can't see where they are in a pipeline | Medium | Dashboard shows phase completion status. Reference impl dashboard shows 8 phases with visual progress indicators |
| **Deliverable navigation** | Curriculum output volume is high (10+ files per program). Users need to find outputs without scrolling | Medium | Dashboard output panel/route. Reference impl has `/output` route listing all deliverables. Critical for curriculum builder — a nine-stage pipeline generates 20+ files |
| **Warm, persona-consistent conversational tone** | Cold, transactional commands make expert-guided tools feel like form submissions | Low | Reference impl wraps every command in a lead strategist persona. Curriculum builder should wrap in expert instructional designer voice |
| **Validation with specific error locations** | "Something's wrong" is useless; "Objective 3 has no paired assessment" is actionable | High | Reference impl's brand-verifier produces scored reports by file path and section. Curriculum builder needs schema-report.md with field-level failures |
| **Export/package command** | When done, users want a single handoff artifact — not instructions to find twelve files | Low | Reference impl's `/export` command verifies completeness, lists all files, produces summary. Curriculum builder needs equivalent final packaging step |
| **Subagent orchestration for long-running work** | Generation tasks that block the main context window break the conversation flow | High | Reference impl spawns agents (document-assembler, archetype-analyst, etc.) for heavy work. Curriculum builder needs module-generator and session-generator subagents for parallel module production |
| **Prevent accidental stage skipping** | Users will try to run stage 4 without completing stage 3; the output will be misaligned | Medium | PreToolUse hook blocks writes to future-stage directories. Reference impl uses this pattern. Behavioral, not cryptographic — prevents accidents, not intent |

---

## Differentiators

Features that distinguish this tool. Not expected by users of generic pipeline tools, but deliver outsized value for this use case.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Schema-enforced required output fields** | Makes it structurally impossible to produce curriculum missing formative assessment, reflection, or transfer design — the elements that are universally omitted under time pressure | High | This is the core architectural bet of the entire project. Schema is the constraint layer, not the prompt. Every pipeline stage needs required-field enforcement that blocks completion if fields are absent |
| **Backward design as generation sequence** | Outcomes before assessments, assessments before content — the pipeline ORDER is the alignment mechanism. Tools that start with content topics produce content-coverage-biased curriculum | High | Outcome Design → Assessment Design → Module Structure is non-negotiable ordering. Research found the old template generated topics (Step 8) without objectives — this is the architectural root cause of the quality problem |
| **SME-accessible intake (no ID vocabulary required)** | Subject matter experts can answer intake without knowing Bloom's taxonomy, scaffolding theory, or transfer design — the tool does pedagogical translation behind the scenes | High | Critical for Hello Alice use case. Questions must use domain language, not instructional design language. Expertise level captured via behavioral description ("can do X, cannot yet do Y"), not self-report levels |
| **Expertise-adaptive session template selection** | Automatically selects the right session template (Gagné, 5E, Merrill, WIPPEA, Universal TMA Arc) based on intake data — novice audiences get different structure than experienced practitioners | High | Based on Grow's 4-stage self-direction model and skill type (open vs. closed). Template selection is automatic, not a user menu |
| **Parallel module generation via subagents** | Long programs (8-12 modules) generate concurrently rather than sequentially — a 45-minute wall time for a semester program vs. 4 hours | High | Module sequencing must be generated first (prerequisite logic), then module content can run in parallel. Each subagent gets a fresh context window, preventing context exhaustion |
| **Three-tier validation with confidence scores** | Tier 1: automated schema checks (blocking). Tier 2: rubric-based scoring with confidence scores (advisory). Tier 3: human review surfacing with specific action items | High | Separate generation from validation — a single model asked to generate AND validate validates away problems. Confidence scores, not pass/fail, for qualitative judgments (cognitive load appropriateness, transfer realism) |
| **Transfer ecosystem as required output (not optional)** | Pre-program readiness + in-program implementation intentions + post-program spaced retrieval at 1/4/12 weeks is what makes behavioral change claims valid. Every other tool treats this as optional or omits it entirely | High | Transfer ecosystem is Stage 7. Research (Phase 8) found cooperative learning meta-analytic evidence (d=0.54-0.78) is primarily from multi-week courses — compressed programs need explicit transfer scaffolding |
| **Marketing derived from curriculum, not invented** | Every marketing claim is traceable to a specific curriculum element — program descriptions cannot promise what the curriculum doesn't deliver | Medium | Stage 8 generates marketing from Stage 1-7 outputs. Research found existing template was 60-65% marketing / 20-25% pedagogy. This stage inverts that ratio by making pedagogy the source of truth |
| **Six Metaskills as thinking routines (not labels)** | Curriculum that claims to develop critical thinking as a label vs. curriculum that includes specific thinking routines students practice are entirely different products | High | Metaskill mapping (Stage 6) requires activation activity — a specific thinking routine — not just a label. Developability hierarchy respected: Exploring/Creating (high evidence) before Innovating/Adapting |
| **Social learning layer required per module** | Activity type + interdependence structure + accountability mechanism + group processing prompt — all four required, not just "include group activity" | Medium | Schema-enforced at module level. Research found "discuss with a partner" is not genuine interdependence. Required sub-fields prevent the superficial compliance that passes schema checks but produces low-quality social learning |
| **Dictation tip at intake** | Spoken answers are less edited and closer to authentic voice — a concrete tip that changes input quality | Low | Reference impl includes this in start command. Curriculum builder analog: encouraging SMEs to describe their learners and success criteria as if talking to a colleague, not filling a form |
| **Duration-agnostic architecture (90 min to semester)** | The same pipeline handles a 90-minute workshop and a 16-week course without tool modification — duration is an intake parameter, not an architectural branch | Medium | Session count, module count, and transfer ecosystem depth scale off duration. Research found no existing tool handles this range cleanly |

---

## Anti-Features

Features to explicitly NOT build in V1. Each has a deliberate reason.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Final slide/visual design generation** | Structural slide outlines belong in the pipeline. Final visual design requires brand context, tools, and decisions that are outside curriculum scope and would balloon scope significantly | Generate slide framework outlines (section structure, key points per slide, timing) as a curriculum artifact. Visual design is the facilitator's job |
| **LMS export or platform-specific formats** | Lock-in to any single LMS (Canvas, Moodle, Blackboard) creates dependencies that limit where the output can be used. Every LMS has different import formats | Markdown as source of truth. Platform-agnostic output. Facilitators adapt to their delivery context |
| **Learner-facing delivery platform** | This tool builds curriculum — it does not deliver it. Building a delivery layer doubles scope with no pedagogical leverage | Output is documents for facilitators. Delivery is the facilitator's job |
| **Automated learner assessment scoring** | Scoring open-skill assessments (demonstrations, case analyses, interpersonal exercises) requires human judgment that automated scoring cannot replicate without validity problems | Design assessment rubrics that facilitators use. The validation layer validates the rubric design, not the scoring |
| **Real-time facilitation support** | Supporting live facilitation requires a different interaction model (mobile-first, split-second responses, interruption-tolerant) and different context (what's happening NOW vs. what was planned) | Mark as future capability. V1 produces the facilitator guide. Real-time support is a separate product surface |
| **Multi-language curriculum generation** | Quality constraint enforcement in other languages requires doctrine encoding in those languages and validation rubrics calibrated for language-specific pedagogy norms | English only for V1. Multilingual is a future extension that requires separate research |
| **Evaluation mode for external curriculum** | Evaluating curriculum someone else built requires the same validation architecture but a different intake flow. V1 is generation-first — the validation architecture exists for self-checking, not standalone evaluation | Defer evaluation mode to V2. The validation rubric and agents will be reusable when this is prioritized |
| **Progress bars or percentage-complete indicators** | Percentage completion is meaningless for a pipeline where Stage 1 data quality determines all downstream quality. A false precision metric creates false confidence | Show stage completion (done / in-progress / not started) — binary state per stage, not percentage |
| **Editable outputs inside the dashboard** | In-browser editing of generated markdown adds frontend complexity (rich text editor, save state, conflict resolution) with no pedagogical value | Outputs open in the user's editor. Dashboard is for navigation and status, not editing |
| **Notifications or background polling** | Subagent completion in Claude Code does not require polling infrastructure — the main orchestrator waits for subagent Task() returns | Use Claude Code's native Task() subagent pattern. No webhooks, polling, or notification infrastructure needed |
| **Multi-user collaboration** | Multi-user state management (concurrent edits, conflict resolution, permissions) is a significant engineering problem that doesn't serve the primary use case (Kelsey + Hello Alice SME, not a team editing simultaneously) | Single-owner project model. File-based state (STATE.md) is the collaboration mechanism when needed |
| **Template marketplace or community features** | Sharing templates across users requires authentication, storage, and moderation infrastructure that has nothing to do with curriculum quality | Schema reference files are the template layer. They ship with the plugin and version with the codebase |

---

## Feature Dependencies

```
STATE.md initialization → everything else (nothing works without project state)

Stage 1 (Intake) → Stage 2 (Outcome Design)
Stage 2 (Outcome Design) → Stage 3 (Assessment Design)
Stage 3 (Assessment Design) → Stage 4 (Module Structure)
Stage 4 (Module Structure) → Stage 5 (Session Content)
Stage 5 (Session Content) → Stage 6 (Metaskill Mapping)
Stage 5 (Session Content) → Stage 7 (Transfer Ecosystem)
Stage 6 + Stage 7 → Stage 8 (Marketing Derivation)
Stages 1-8 complete → Stage 9 (Full Validation)

Parallel module generation → Stage 4 completion (sequencing must exist before parallel generation)
Transfer ecosystem design → Session content complete (implementation intentions attached to specific sessions)
Marketing derivation → Curriculum substance (claims must trace to specific elements)

Schema-enforced required fields → All generation stages (fields are constraints, not suggestions)
Human review gate → Intake complete, Assessment design complete, Final validation complete
AskUserQuestion → Every confirmation decision point

Dashboard deliverable view → Output files exist (reactive display, not generated separately)
Export command → Stage 9 (full validation) complete
```

---

## MVP Recommendation

The five-stage MVP identified in the research is correct. Do not truncate further — AI handles structural overhead, and a truncated MVP still leaves the administrative burden that defeats the purpose.

**MVP (Ship First):**
1. Stage 1: Structured intake with schema-enforced required fields
2. Stage 2: Outcome design (Bloom's-tagged, transfer-specified)
3. Stage 3: Assessment design (paired to every objective, Bloom's-matched)
4. Stage 4: Module structure with session template selection
5. Stage 5: Session content generation (TMA arc, social learning, metaskill per module)
6. Stage 9 lite: Automated schema validation (Tier 1 only — required field completeness)

**Plus infrastructure (required for MVP):**
- STATE.md + session-start hook (nothing works without this)
- Resume command (multi-session work requires it)
- One dashboard route for progress + one for deliverable navigation
- Human review gates at intake and after assessment design

**Defer to V2:**
- Stage 6: Full metaskill mapping and program-level coverage report
- Stage 7: Transfer ecosystem design (pre/in/post-program)
- Stage 8: Marketing derivation
- Stage 9 full: Tier 2 (rubric scoring) and Tier 3 (transfer validation)
- Export packaging command
- Formatted HTML/PDF output (markdown is sufficient for V1)

**Rationale for deferred features:**
- Stage 7 (Transfer ecosystem) is the single largest architectural expansion and the least validated for compressed formats — defer until MVP pipeline is proven
- Marketing derivation requires completed curriculum substance — natural V2 when stages 1-7 are solid
- Tier 2/3 validation requires rubric calibration against real outputs — can only be built after MVP generates real curriculum

---

## Interaction Patterns That Work

Derived from direct observation of the reference implementation:

**Questions in batches of 2-3, not all at once.** The intake command should group related questions rather than dumping the full intake schema. Reference impl does this explicitly in start.md.

**Reflect back before advancing.** After gathering a group of inputs, summarize what was captured and confirm before proceeding. This catches misunderstandings early and builds user confidence in the tool.

**AskUserQuestion for every binary or categorical decision.** Prose options get misread. Structured buttons eliminate ambiguity. Use for: confirmation gates, stage transitions, option selection.

**Persona-consistent pushback.** When user inputs conflict with pedagogical constraints (e.g., no transfer context specified, objectives that are too vague), the tool pushes back as an expert instructional designer would — not as a form validator. "This objective is accurate, but is it specific enough to assess?" not "ERROR: objective missing measurable verb."

**Silent state updates.** Never announce "I'm updating STATE.md." Just do it. Users don't care about the mechanism; they care that context persists.

**Concrete next action in every state.** The STATE.md Next Action field must be specific enough that a fresh Claude session can resume without asking the user to re-explain context. "Run /knz-outcomes to begin outcome design for AccessU program" not "Continue curriculum development."

**Checkpoint as strategic pause, not just gate.** Reference impl's checkpoint commands present everything built so far as a coherent whole and ask "Does this hold together?" — not just "Are all fields filled?" This is the moment to catch misalignment before downstream work bakes it in.

---

## Confidence Assessment

| Area | Confidence | Source |
|------|------------|--------|
| Table stakes features | HIGH | Direct observation from working reference implementation |
| Differentiator features | HIGH | 11-phase research outputs + PRD + project design recommendations |
| Anti-features | HIGH | Explicit out-of-scope decisions in PRD + PROJECT.md with rationale |
| Interaction patterns | HIGH | Direct observation of brand-compass command behavior and agent prompts |
| MVP recommendation | HIGH | Research recommendation (12-tool-design-recommendations.md) + PRD alignment |
| Feature dependencies | MEDIUM | Derived from pipeline architecture — some ordering constraints assumed from backward design principle |

---

## Sources

- `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/.claude/commands/brand-compass/` — 16 commands, full reference implementation
- `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/.claude/agents/` — 13 agents, full reference implementation
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/research/outputs/12-tool-design-recommendations.md` — Prioritized design brief, MVP stages, V2 extensions
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/research/outputs/10-tool-architecture-proposal.md` — Plugin structure, enforcement architecture
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/research/outputs/04-claude-code-platform-assessment.md` — Platform capabilities and constraints
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-src/.planning/PRD.md` — Explicit scope decisions and rationale
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-src/.planning/PROJECT.md` — Requirements, constraints, key decisions
