# Project Research Summary

**Project:** KNZ Curriculum Builder
**Domain:** Claude Code plugin with multi-stage pipeline and React dashboard — AI-assisted curriculum generation
**Researched:** 2026-03-15
**Confidence:** HIGH — all primary evidence from working reference implementation (knz-brand-guidance), 11-phase research project (knz-builder-research), and direct inspection of production code

## Executive Summary

The KNZ Curriculum Builder is a Claude Code plugin that encodes pedagogical doctrine as structural constraints, producing delivery-ready curriculum for adult learners without requiring instructional design knowledge from the SME user. Experts build tools like this using two integrated layers: a conversational pipeline layer (commands, agents, hooks, schemas, reference files) that generates curriculum through backward design sequence, and a read-only React dashboard that reads the same workspace directory to surface progress and deliverables. The reference implementation (knz-brand-guidance Brand Compass plugin) provides a fully proven architectural pattern — the curriculum builder is not speculative. Every major technical choice has a working production analog to copy from.

The recommended approach is to build schema first, pipeline second, dashboard third. The tool's entire value proposition rests on the thesis that schema-enforced required fields produce structurally sound curriculum that instruction-based prompting cannot. If schema design is rushed or treated as an implementation detail, the tool degrades into a more elaborate version of the existing template it was designed to replace. The nine-stage pipeline follows strict backward design ordering (outcomes before assessments, assessments before content, content before marketing) with three human review gates at intake, assessment design, and final validation. Stages 4-8 run autonomously through subagent chaining; human gates await explicit command invocation.

The most critical risk is schema drift: required fields defined as prose instructions rather than machine-checkable enumerated types. The second-most critical risk is context collapse: generating curriculum content inside the main orchestrating session rather than spawning subagents with fresh context windows per module. Both risks have clear preventions — schema-first design with enum values enforced in validation, and the orchestrator-only pattern for the main session — but both require deliberate architectural commitment from Phase 1. These are not implementation details to revisit later; they are architectural load-bearing choices.

## Key Findings

### Recommended Stack

The stack is not speculative. The reference implementation (knz-brand-guidance) provides a verified, production-running stack in exact version numbers. The curriculum builder adds one new requirement (PDF/print output) and nothing else. Copy the reference implementation's `package.json`, `vite.config.ts`, `tsconfig.json`, and `eslint.config.js` as the starting point; do not rebuild from scratch.

**Core technologies:**
- React 19 + Vite 7 + TypeScript 5.9: UI framework — verified from reference `package.json`, concurrent features and `import.meta.glob` workspace loading are architecturally critical
- Tailwind CSS v4 + @tailwindcss/vite: styling — v4 CSS-first config (`@theme` in CSS, no PostCSS config) is cleaner and matches reference exactly
- react-router-dom v7: routing — nine stage routes model from reference's eight-phase route structure
- react-markdown + remark-gfm: deliverable rendering — renders markdown as React elements, not `dangerouslySetInnerHTML`; required for curriculum tables, checklists, and GFM spec
- Radix UI primitives (collapsible, slot): accessible UI components — headless, keyboard-navigable, used for stage panels and button composition
- No state management library: dashboard is read-only; Claude writes STATE.md, dashboard reads it; `useState` for UI state only
- @react-pdf/renderer (conditional): PDF export — evaluate `window.print()` with Tailwind print CSS first; add `@react-pdf/renderer` only if print CSS cannot meet fidelity requirements. Verify React 19 compatibility before pinning.
- Plugin layer: zero npm dependencies — pure markdown files with YAML frontmatter in Claude Code's `.claude/` directory structure

**Critical Vite patterns to preserve:**
- `serveWorkspace()` middleware: serves `workspace/` at `/workspace/` URLs for runtime file fetching
- `import.meta.glob` for STATE.md: build-time loading of session bridge file
- `@` path alias to `./src`: use consistently

### Expected Features

See FEATURES.md for full detail. Summary below.

**Must have (table stakes):**
- STATE.md session bridge — multi-stage pipelines span sessions; without state, users restart from scratch
- One slash command per pipeline stage — clear entry points for each of nine stages plus init, validate, resume
- Resume command — sessions end; context must restore without re-explanation
- Human review gates — after intake, after assessment design, at final validation
- AskUserQuestion at every categorical decision — prose options get misread; structured buttons eliminate ambiguity
- Stage gate enforcement (PreToolUse hook) — blocks writes to future-stage directories when prerequisites incomplete
- Progress visibility dashboard — pipeline stage status with visual indicators
- Deliverable navigation — 20+ files in a nine-stage program; users need browseable index, not file tree
- Subagent orchestration — generation tasks that block the main context window break at scale
- Validation with specific error locations — field-level failures, not vague "something's wrong"

**Should have (differentiators — V1):**
- Schema-enforced required output fields — makes it structurally impossible to omit formative assessment, reflection, and transfer design
- Backward design as generation sequence — pipeline order is the alignment mechanism; outcomes before assessments, assessments before content
- SME-accessible intake — no instructional design vocabulary required; behavioral descriptions map to pedagogical variables internally
- Expertise-adaptive session template selection — automatic based on intake; Gagné / 5E / Merrill / WIPPEA / Universal TMA Arc
- Parallel module generation via subagents — 45 min wall time for a semester program vs. 4 hours
- Three-tier validation — schema checks (blocking), rubric scoring (advisory), human review surface (specific action items)
- Duration-agnostic architecture — same pipeline handles 90-minute workshop and 16-week course

**Defer to V2:**
- Stage 6: Full metaskill mapping and program-level coverage report
- Stage 7: Transfer ecosystem design (pre/in/post-program spaced retrieval)
- Stage 8: Marketing derivation
- Stage 9 full: Tier 2 rubric scoring and Tier 3 transfer validation
- Export packaging command
- Formatted HTML/PDF output (markdown sufficient for V1)

**Explicit anti-features (never build):**
- Final slide/visual design generation
- LMS export or platform-specific formats
- Learner-facing delivery platform
- Automated learner assessment scoring
- Multi-user collaboration
- Editable outputs in dashboard
- Progress percentage bars (binary stage status only)

### Architecture Approach

The architecture has two halves that share one communication channel: the filesystem. The plugin (commands, agents, hooks, schemas, reference files) writes to `workspace/`. The React dashboard reads from `workspace/`. No API, no backend, no database. STATE.md is the session bridge — written by commands at every stage transition, read by the session-start hook, read by the dashboard's `state-loader.ts`. This pattern is fully proven in the reference implementation.

**Major components:**
1. Commands (`commands/knz-builder/*.md`) — one per pipeline stage; orchestrate conversation, spawn subagents, update STATE.md; never generate curriculum content directly
2. Agents (`agents/*.md`) — fresh context windows for generation and validation; module-generator and session-generator run in parallel; validation-agent is read-only
3. Reference files (`reference/schemas/*.md`, `reference/doctrine.md`, `reference/session-templates.md`) — three-layer doctrine encoding: CLAUDE.md (pipeline rules), schemas (binding required-field constraints), reference doctrine (loaded on demand)
4. Hooks (`settings.json`) — SessionStart for context restoration; PreToolUse for stage gate enforcement
5. STATE.md — current stage, completed stages, running agents table, key decisions, session log; written at every transition, never just at session end
6. Dashboard (`dashboard/src/`) — read-only React app; PipelineSidebar, StagePage, DeliverablesPage, OutputViewer, ValidationReport; no writes to workspace

**Critical patterns:**
- Command as orchestrator, agents as workers — main session never generates curriculum content
- Three-layer doctrine encoding — schema over instruction; binding constraints in required fields, not prose
- Parallel module generation requires sequential sequencing first — module overviews complete before parallel session generation begins
- Separate generation from validation — distinct agent files, distinct Task() calls; validation agent is read-only

### Critical Pitfalls

1. **Schema drift: instructions masquerading as constraints** — Every required pedagogical element must be a machine-checkable field with enumerated values, not a prose instruction. `bloom_level` must be an enum `[Remember, Understand, Apply, Analyze, Evaluate, Create]`, not a string. Validation agent checks enum values against the allowed list, not just field presence. If you find yourself writing "the AI should always include..." in a skill file, convert it to a required schema field immediately.

2. **Generate-and-validate in the same call** — Generation agents and validation agents are separate files with separate Task() invocations. Validation agent is read-only (no write access to content directories). A single model asked to generate and validate in one call often validates away structural problems rather than flagging them. Establish this separation in Phase 1; never collapse for efficiency.

3. **Context collapse in long-running sessions** — The main session is the orchestrator only. Every content generation call (module content, session designs) spawns a subagent with a fresh context window. Each subagent receives only what it needs: the relevant schema, the relevant reference files, and the specific upstream outputs it depends on — not the full pipeline history. A 10-module semester program exceeds 100k tokens in the main session by Stage 5.

4. **STATE.md drift** — Write STATE.md at stage start, at stage completion, and when any agent output is incorporated. Not "before ending the session." The Running Agents table in STATE.md tracks what was launched and where its output lands. The session-start hook surfaces any unincorporated agent outputs as blocking conditions. Test this with a simulated session interruption in Phase 2.

5. **Skills cannot call skills — autonomous stages need subagent chaining** — Claude Code's architecture prevents a skill from invoking another skill. Stages 4-8 (autonomous) must use subagent composition to chain. Design the subagent chaining pattern in Phase 2 before any Stage 4-8 skills are built. If a skill prompt ends with "now the user should run /knz-[next-stage]" for an autonomous stage, the pipeline flow is broken.

## Implications for Roadmap

The architecture research provides a complete suggested build order. The phases below follow both dependency direction and risk surface — highest architectural risk validated earliest.

### Phase 1: Foundation and Schema Design

**Rationale:** Schema is the load-bearing architectural element. Everything downstream depends on schema correctness. Building skills before schemas are finalized means every schema change triggers skill rewrites. This phase has the highest conceptual leverage and the least code.
**Delivers:** Complete schema specifications for all nine stages with enumerated field values; CLAUDE.md with pipeline rules and constraint hierarchy; workspace directory template (`project-scaffold/`); STATE.md template and structure.
**Addresses:** Table stakes (STATE.md session bridge), differentiators (schema-enforced required fields)
**Avoids:** Pitfall 1 (schema drift), Pitfall 5 (schema fields without enumerated values), Pitfall 12 (CLAUDE.md overload — 300-line ceiling enforced from day one)
**Research flag:** Standard patterns — schema design is well-specified in research. No deeper research needed; execute against existing specifications.

### Phase 2: Core Plugin Infrastructure

**Rationale:** The session bridge (STATE.md + session-start hook) must work before anything else depends on it. The init command and intake command validate the full command-to-STATE.md-to-dashboard loop. The subagent chaining pattern must be proven before Stage 4-8 skills are designed.
**Delivers:** `settings.json` (SessionStart hook), `init.md` (Stage 0 command), `intake.md` (Stage 1 command), `intake-schema.md`, subagent chaining pattern validated, session interruption recovery tested.
**Implements:** Hook registration, STATE.md write protocol, PreToolUse stage gate (scaffolded), subagent composition pattern
**Avoids:** Pitfall 4 (STATE.md drift), Pitfall 6 (skills-can't-call-skills gap), Pitfall 13 (ID vocabulary in SME-facing intake — test with Hello Alice team before schema lock)
**Research flag:** Standard patterns — reference implementation provides direct analogs for hook structure and STATE.md protocol.

### Phase 3: Backward Design Core (Outcomes + Assessments)

**Rationale:** Outcomes and assessments are the backbone of backward design. These two stages generate the constraint context that all downstream stages depend on. Validating schema enforcement here — required fields blocking advancement when incomplete — proves the core architectural thesis before module generation adds complexity.
**Delivers:** `outcome-schema.md`, `assessment-schema.md`, `outcomes.md` command (Stage 2), `assessments.md` command (Stage 3), human review gate after assessment design
**Addresses:** Differentiator (backward design as generation sequence), table stake (confirmation gate before phase transition)
**Avoids:** Pitfall 1 (instructions vs. constraints — Bloom's enum validated here), Pitfall 8 (reflection/transfer as afterthoughts — transfer context captured at intake, injected into outcome design)
**Research flag:** Standard patterns for outcome and assessment design. Session template selection and metaskill frameworks are well-specified in research outputs.

### Phase 4: Dashboard MVP

**Rationale:** Completing the full loop — plugin writes, dashboard reads, user sees progress — before adding more pipeline stages validates the file communication protocol and surfaces any STATE.md parsing issues while the schema is still simple.
**Delivers:** `AppLayout.tsx`, `PipelineSidebar.tsx`, `OverviewPage.tsx`, `StagePage.tsx`, `content-loader.ts`, `vite.config.ts` with `serveWorkspace()` middleware
**Uses:** React 19, Vite 7, Tailwind v4, react-router-dom v7, `import.meta.glob`
**Implements:** File communication protocol (defined before UI build), pipeline stage status view, early deliverable navigation stub
**Avoids:** Pitfall 10 (dashboard as decoration — content views required from the start, not just stage status)
**Research flag:** Standard patterns — reference implementation provides near-complete implementation to adapt, not rebuild.

### Phase 5: Module and Session Generation with Parallel Subagents

**Rationale:** Module generation is the highest complexity stage — it introduces parallel subagent spawning, sequential sequencing before parallel generation, and the first stress test of context management at scale. Building and validating this pattern before the remaining pipeline stages means any architectural issues surface while there is still room to address them.
**Delivers:** `reference/session-templates.md`, `module-schema.md`, `session-schema.md`, `module-generator.md` agent, `session-generator.md` agent, `modules.md` command (Stage 4) with two-step sequencing-then-parallel pattern
**Addresses:** Differentiator (parallel module generation via subagents), differentiator (expertise-adaptive session template selection)
**Avoids:** Pitfall 3 (context collapse), Pitfall 9 (parallel generation before sequence complete — two-step Stage 4 gate enforced in STATE.md)
**Research flag:** Standard patterns for subagent composition from reference implementation. Session template selection (Gagné, 5E, Merrill, WIPPEA, Universal TMA Arc) is well-specified in Phase 6 research.

### Phase 6: Validation Layer

**Rationale:** Validation must be built and proven before the full pipeline is complete. Attempting validation after all nine stages exist makes it hard to isolate which stage's output is failing. Early validation also confirms that schema enforcement is blocking (not advisory) while only two stages of output exist.
**Delivers:** `reference/validation-rubric.md`, `validation-agent.md` (read-only), `validate.md` command (Stage 9 lite — Tier 1 only), `ValidationReport.tsx` dashboard component
**Implements:** Generate-validate separation pattern, schema-report.md with field-level failures, hard block on required field absence
**Avoids:** Pitfall 2 (generate-and-validate in same call), Pitfall 5 (schema fields without enumerated values caught here by validation logic)
**Research flag:** Standard patterns — three-tier validation architecture well-specified in Phase 10 and Phase 12 research.

### Phase 7: Full Pipeline Completion (Metaskills + Transfer + Marketing)

**Rationale:** Stages 6, 7, and 8 build on completed session content and are deferred from MVP. Metaskills and transfer are the stages most prone to being thin (naming without enacting, generic reflection prompts) — they require the most careful schema enforcement and the richest reference files. Marketing derivation runs last by design, after all curriculum substance exists.
**Delivers:** `metaskill-schema.md`, `transfer-schema.md`, `reference/metaskill-routines.md`, `reference/doctrine.md`, `metaskill-validator.md` agent, `transfer-validator.md` agent, `metaskills.md` command (Stage 6), `transfer.md` command (Stage 7), `marketing.md` command (Stage 8), PreToolUse hook for full stage gate enforcement
**Addresses:** Differentiators (metaskill activation routines, transfer ecosystem as required output, marketing derived from curriculum)
**Avoids:** Pitfall 7 (metaskill naming without enacting — named thinking routines required in activation_activity), Pitfall 8 (reflection/transfer as afterthoughts — transfer context injected from intake, generated first within session schema)
**Research flag:** Metaskill operationalization (Pitfall 7) is a documented failure mode from Phase 7 research — the metaskill-routines reference file requires careful authoring to be specific enough. Consider a focused review of the metaskill activation vocabulary before building Stage 6.

### Phase 8: Dashboard Deliverable Navigation and Output Viewer

**Rationale:** With the full pipeline generating 20+ files, deliverable navigation becomes critical. This phase completes the dashboard to its full functional scope.
**Delivers:** `DeliverablesPage.tsx`, `OutputViewer.tsx` (react-markdown rendering + iframe for HTML), sortable file naming convention enforced, compiled facilitator package generation
**Addresses:** Table stake (deliverable navigation), minor pitfall (output volume without navigation)
**Avoids:** Pitfall 14 (scroll problem — navigable index, not file tree)
**Research flag:** Standard patterns — OutputViewer pattern is fully implemented in reference implementation. PDF output decision (window.print() vs. @react-pdf/renderer) needs React 19 compatibility check for @react-pdf/renderer before this phase.

### Phase Ordering Rationale

- Schema before skills: every schema change cascades into every skill that uses it. Schema must be final before skill authoring begins.
- Session bridge before pipeline stages: STATE.md drift and session recovery must be proven before multiple stages depend on them.
- Full loop early: completing plugin-to-dashboard data flow in Phase 4 (before most stages exist) means any file communication issues surface when the system is still simple.
- Parallel generation after sequential sequencing: module overviews must exist as a constraint layer before session generation parallelizes. This is a Stage 4 internal gate, not an inter-phase gate.
- Validation before full pipeline: catching schema enforcement failures early, before all nine stages exist, reduces cascading rework.
- Metaskills and transfer last among content stages: these are V2-deferred features that build on proven session content generation. MVP is Stages 1-5 plus Stage 9 lite.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 7 (Metaskills):** The metaskill-to-thinking-routine vocabulary mapping requires careful authoring. Phase 7 research identified the IB ATL failure mode specifically — naming without enacting. Before building Stage 6, review the metaskill-routines reference file specification in Phase 7 research output and verify the activation routine vocabulary is complete and specific.
- **Phase 8 (PDF output):** @react-pdf/renderer React 19 compatibility is unverified. Before adding the dependency, check current npm registry and consider `window.print()` with Tailwind print CSS as the simpler first option.

Phases with standard patterns (skip `/gsd:research-phase`):
- **Phase 1 (Schema Design):** Fully specified in Phase 5 and Phase 10 research outputs. Execute against existing specifications.
- **Phase 2 (Core Plugin Infrastructure):** Reference implementation provides direct analogs. No novel patterns.
- **Phase 3 (Backward Design Core):** Outcome and assessment schema specifications exist. Session template selection is fully documented.
- **Phase 4 (Dashboard MVP):** Reference implementation is near-complete. Adapt, don't rebuild.
- **Phase 5 (Module Generation):** Subagent composition pattern proven in reference. Session template library specified.
- **Phase 6 (Validation Layer):** Three-tier validation architecture fully specified in Phase 10 and Phase 12 research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core dependencies verified from working reference `package.json`. Only @react-pdf/renderer is unverified (React 19 compatibility). |
| Features | HIGH | Table stakes and differentiators derived from working reference implementation + 11-phase research + PRD. Anti-features have explicit out-of-scope rationale. |
| Architecture | HIGH | Two-layer architecture (plugin + dashboard) is proven in production reference implementation. Build order derived from dependency analysis + risk surface. |
| Pitfalls | HIGH | 14 specific pitfalls with detection signals and phase-specific mitigations. Sourced from Phase 4 and Phase 5 research, Phase 10 architecture proposal, and direct reference implementation observation. |

**Overall confidence:** HIGH

### Gaps to Address

- **@react-pdf/renderer React 19 compatibility:** Unverified. Evaluate `window.print()` with Tailwind print CSS first. If insufficient, verify @react-pdf/renderer v4.x against current npm registry before adding to dependencies. Address in Phase 8 planning.
- **Hello Alice intake question testing:** SME-accessible intake questions must be tested with at least one Hello Alice team member before schema lock. If any question requires instructional design vocabulary to answer, revise before Stage 1 skill is built. Address in Phase 3.
- **Metaskill activation routine vocabulary completeness:** The `reference/metaskill-routines.md` file maps each of the Six Metaskills to their activation thinking routines. This mapping must be complete and specific before Stage 6 schema is used. Review Phase 7 research output before Phase 7 planning.
- **Transfer ecosystem depth for compressed formats:** Phase 8 research found cooperative learning meta-analytic evidence is primarily from multi-week courses. The transfer ecosystem design for 90-minute workshops needs validation against the compressed format. This is a V2 concern (Stage 7 deferred from MVP) but should inform transfer connection field design in session schema.

## Sources

### Primary (HIGH confidence)
- Reference implementation `package.json`: `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/package.json` — verified stack versions
- Reference implementation `vite.config.ts`: `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/vite.config.ts` — `serveWorkspace()` middleware pattern
- Reference implementation `src/lib/state-loader.ts`: STATE.md parsing pattern
- Reference implementation `src/components/OutputViewer.tsx`: react-markdown rendering pattern
- Reference implementation `.claude/commands/brand-compass/` (16 commands): command orchestration, AskUserQuestion, confirmation gates, persona
- Reference implementation `.claude/agents/` (13 agents): subagent frontmatter, generation/validation separation
- Research Phase 4: Claude Code Platform Assessment — hook types, behavioral enforcement ceiling, skills-can't-call-skills constraint
- Research Phase 5: Prompt Architecture for Pedagogical Constraint — constraint hierarchy (schema > template > checklist > directive > naming > framing)
- Research Phase 10: Tool Architecture Proposal — nine-stage pipeline, three-layer doctrine, two-step module generation, validation tiers
- Research Phase 12: Tool Design Recommendations — MVP stage selection, build order, V2 extensions
- PRD: `.planning/PRD.md` — explicit scope decisions, out-of-scope items with rationale
- PROJECT.md: `.planning/PROJECT.md` — requirements and key decisions

### Secondary (MEDIUM confidence)
- Research Phase 6: Session Design Frameworks — Gagné, 5E, Merrill, WIPPEA template specifications
- Research Phase 7: Metaskills Operationalization — IB ATL failure mode, Visible Thinking Routines vocabulary
- Research Phase 8: Transfer Ecosystem Design — cooperative learning meta-analytic evidence, compressed format concerns
- Research gaps document: `knz-builder-research/research/gaps.md` — self-reported known research gaps

### Tertiary (LOW confidence / needs verification)
- @react-pdf/renderer React 19 compatibility — training data only; must verify against current npm registry before use

---
*Research completed: 2026-03-15*
*Ready for roadmap: yes*
