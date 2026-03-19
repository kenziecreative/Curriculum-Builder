# Roadmap: KNZ Curriculum Builder

## Overview

Seven phases that build a Claude Code plugin and React dashboard capable of taking a subject matter expert through a nine-stage curriculum generation pipeline — from conversational intake through delivery-ready curriculum packages with transfer ecosystem and marketing materials. Schema is established before skills, the session bridge is proven before pipeline stages depend on it, and the full plugin-to-dashboard loop is validated before the majority of content stages are built. Every phase delivers a coherent, verifiable capability; none requires the next phase to exist before the user can observe something working.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Schema and Foundation** - All nine-stage schemas with enumerated field values, CLAUDE.md pipeline rules, workspace scaffold, and STATE.md template (completed 2026-03-15)
- [x] **Phase 2: Core Plugin Infrastructure** - Session bridge, init and intake commands, stage gate hooks, and proven subagent chaining pattern (completed 2026-03-19)
- [ ] **Phase 3: Backward Design Core** - Outcome and assessment commands with schema enforcement and human review gates
- [ ] **Phase 4: Dashboard MVP** - React dashboard providing full pipeline status visibility and early deliverable navigation
- [ ] **Phase 5: Module and Session Generation** - Parallel subagent module and session generation with TMA arc, DCR, social learning, and facilitator materials
- [ ] **Phase 6: Validation Layer** - Separate validation agent with three-tier validation and field-level failure reporting
- [ ] **Phase 7: Full Pipeline Completion** - Metaskill mapping, transfer ecosystem, marketing derivation, and full stage gate enforcement

## Phase Details

### Phase 1: Schema and Foundation
**Goal**: The architectural load-bearing elements exist — every pipeline stage has a schema with machine-checkable enumerated fields, the workspace directory template is ready to scaffold new projects, and the CLAUDE.md pipeline rules establish the constraint hierarchy that prevents schema drift from the first commit
**Depends on**: Nothing (first phase)
**Requirements**: PIPE-02, PIPE-03, PIPE-08, INFR-01, INFR-02, INFR-10
**Success Criteria** (what must be TRUE):
  1. Each of the nine pipeline stages has a schema file with required fields and enumerated values — no string-only fields for any value that should be constrained (e.g., bloom_level is an enum, not a string)
  2. A new curriculum project can be scaffolded from the workspace directory template, producing the correct folder structure and empty STATE.md
  3. STATE.md has a defined structure that any command can write to and the session-start hook can parse without ambiguity
  4. CLAUDE.md establishes the constraint hierarchy (schema > template > checklist > directive > naming > framing) and pipeline sequencing rules in under 300 lines
  5. The backward design sequence is encoded as a dependency rule — schema files for outcomes exist before assessment schema, assessment schema before module schema
**Plans:** 3/3 plans complete
Plans:
- [ ] 01-01-PLAN.md — Core backward design schemas (intake through sessions, stages 1-5)
- [ ] 01-02-PLAN.md — Extended pipeline schemas (metaskills through validation, stages 6-9)
- [ ] 01-03-PLAN.md — Workspace scaffold template, STATE.md, project CLAUDE.md, session-start hook

### Phase 2: Core Plugin Infrastructure
**Goal**: A user can run `/knz-init` to start a new curriculum project and `/knz-intake` to complete Stage 1 with a guided conversational interview, with STATE.md correctly written at each transition and recoverable across session interruptions
**Depends on**: Phase 1
**Requirements**: PIPE-01, PIPE-04, INTK-01, INTK-02, INTK-03, INTK-04, INTK-05, INTK-06, INFR-03, INFR-04, INFR-05, INFR-06, INFR-11
**Success Criteria** (what must be TRUE):
  1. A Hello Alice SME (not an instructional designer) can complete the full intake interview without encountering a question that requires instructional design vocabulary to answer
  2. Intake pushes back on vague inputs — when a user provides a fuzzy learning goal, the command asks a clarifying question as an expert instructional designer would, not as a form validator
  3. After intake, STATE.md contains current stage, completed stages, key decisions from intake, and next action — a fresh session can restore context without re-explanation
  4. A simulated session interruption mid-intake can be resumed via the session-start hook, which surfaces the last completed action and blocks advancing without resolution
  5. The resume command (`/knz-resume`) shows current stage, last session summary, and next action in a scannable format
**Plans:** 2/2 plans complete
Plans:
- [ ] 02-01-PLAN.md — Init, resume, and approve commands (project scaffolding, session recovery, gate approval)
- [ ] 02-02-PLAN.md — Intake conversational command (guided interview with thematic batching and expert pushback)

### Phase 3: Backward Design Core
**Goal**: A user can generate learning outcomes and assessments that are structurally enforced to be aligned — every objective has a Bloom's level, a transfer specification, and a paired assessment at or above that Bloom's level — with a human review gate that pauses the pipeline after assessment design
**Depends on**: Phase 2
**Requirements**: PIPE-05, OUTC-01, OUTC-02, OUTC-03, OUTC-04, ASMT-01, ASMT-02, ASMT-03, ASMT-04
**Success Criteria** (what must be TRUE):
  1. Running `/knz-outcomes` produces a structured outcome hierarchy from program-level down to session-level, with every objective automatically tagged with a Bloom's taxonomy level drawn from the enumerated schema (not inferred from prose)
  2. The Bloom's distribution across a program spans at least 4 taxonomy levels — the schema enforces this, not the prose instruction
  3. Every learning objective has a transfer specification — how the skill transfers to real work — and the stage cannot complete if any objective is missing this field
  4. Running `/knz-assessments` produces assessments where every objective has exactly one paired assessment and every assessment's Bloom's level matches or exceeds its objective — mismatches are flagged before the stage completes
  5. The human review gate after assessment design pauses the pipeline and requires explicit user confirmation before Stage 4 can begin — no accidental advancement
**Plans**: TBD

### Phase 4: Dashboard MVP
**Goal**: A user can open the React dashboard and see accurate pipeline stage status (done / in-progress / not started) for their current curriculum project, read generated output files in the dashboard, and trust that the display reflects the actual workspace state
**Depends on**: Phase 3
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Success Criteria** (what must be TRUE):
  1. The dashboard reads directly from the workspace directory via filesystem — no API server, no manual refresh required for initial load
  2. Pipeline stage status accurately reflects STATE.md — a stage marked complete in STATE.md shows as complete in the dashboard within one auto-refresh cycle
  3. A user can navigate to any generated output file through the dashboard's deliverable view and read its rendered content (markdown rendered as HTML, not raw text)
  4. The dashboard auto-refreshes when workspace files change, so a user watching the dashboard during autonomous generation sees progress without reloading
  5. Formatted HTML output files exist alongside markdown source, making curriculum documents delivery-ready from the dashboard
**Plans**: TBD

### Phase 5: Module and Session Generation
**Goal**: A user can run `/knz-modules` to generate a sequenced module structure from their outcomes and assessments, then watch parallel subagents generate complete session content — including TMA arc, DCR scaffolding, social learning layer, facilitator guides, participant materials, and slide framework outlines — without the main session context collapsing
**Depends on**: Phase 3
**Requirements**: MODS-01, MODS-02, MODS-03, MODS-04, SESS-01, SESS-02, SESS-03, SESS-04, SESS-05, SESS-06, SESS-07, INFR-08, INFR-09
**Success Criteria** (what must be TRUE):
  1. Module structure is derived from outcomes and assessments — running `/knz-modules` on two programs with identical topic areas but different Bloom's distributions produces different module sequences
  2. Session templates are automatically selected per module based on intake data — a novice audience gets a different template than an expert audience for the same content domain
  3. Each generated session includes all eight TMA arc stages (ACTIVATE through TRANSFER) as required schema fields — a session missing any arc stage is flagged before the stage completes
  4. The social learning layer is fully populated for every module with all four sub-fields (activity type, interdependence structure, accountability mechanism, group processing prompt) — partial social learning entries are blocked by schema validation
  5. A multi-module program generates session content in parallel via subagents — the main session spawns workers and waits, rather than generating all session content sequentially in the primary context window
  6. Facilitator guides, participant handouts, and slide framework outlines are produced as separate files for each session
**Plans**: TBD

### Phase 6: Validation Layer
**Goal**: A dedicated validation agent — separate from all generation agents — can evaluate a partially or fully generated curriculum package, produce a schema-report with field-level failures and specific locations, block completion when required fields are missing, and surface specific human review items with actionable descriptions
**Depends on**: Phase 5
**Requirements**: VALD-01, VALD-02, VALD-03, VALD-04, VALD-05, VALD-06
**Success Criteria** (what must be TRUE):
  1. Generation and validation never occur in the same agent call — the validation agent is a separate file with read-only access to content directories
  2. Running `/knz-validate` on a curriculum package with a missing required field produces a schema-report that names the exact field, the stage it belongs to, and the location of the failure — not a generic "something is wrong" message
  3. Tier 1 validation blocks stage completion when required fields are absent — a curriculum with any missing required field cannot be marked complete regardless of overall quality
  4. Tier 2 rubric scoring produces confidence scores (not pass/fail) for qualitative dimensions — a session that technically satisfies all required fields but has thin transfer prompts receives a lower confidence score, not a pass
  5. The ValidationReport dashboard component surfaces specific human review items with enough description that the user knows exactly what to fix without reading the raw schema-report file
**Plans**: TBD

### Phase 7: Full Pipeline Completion
**Goal**: The complete nine-stage pipeline is operational — metaskill activation routines, transfer ecosystem, and marketing materials all generate from curriculum substance with schema enforcement — and the PreToolUse hook fully prevents stage skipping across all nine stages
**Depends on**: Phase 6
**Requirements**: PIPE-06, PIPE-07, META-01, META-02, META-03, TRNS-01, TRNS-02, TRNS-03, TRNS-04, MKTG-01, MKTG-02, MKTG-03, MKTG-04, INFR-07
**Success Criteria** (what must be TRUE):
  1. Running `/knz-metaskills` produces activation activities that are specific named thinking routines — not labels like "encourage creativity" — with a transfer prompt connecting each metaskill to real-work application
  2. The developability hierarchy is respected in metaskill activation — Exploring and Creating metaskills are activated before Innovating and Adapting, enforced by schema ordering rules
  3. Transfer elements (pre-program, in-program, post-program) attach to specific sessions and modules in the generated output — they are not generic appendices at the end of the curriculum package
  4. Running `/knz-marketing` produces program descriptions where every claim traces to a specific curriculum element — marketing output includes source citations to the curriculum substance it derives from — and the output is written for conversion: compelling, engaging descriptions that make people want to enroll, not dry summaries of curriculum contents
  5. The marketing-to-pedagogy ratio in total output is below 25% — the schema enforces this ceiling, not prose instructions
  6. The PreToolUse hook blocks writes to any future-stage directory when the preceding stage is not marked complete in STATE.md — attempting to run Stage 7 without Stage 6 complete is blocked, not warned
  7. The final human review gate presents a complete curriculum summary and requires explicit approval before the package is marked delivery-ready
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

Note: Phase 4 (Dashboard MVP) depends on Phase 3 completing the full loop. Phase 5 (Module and Session Generation) also depends on Phase 3 — phases 4 and 5 can run in parallel after Phase 3 completes if desired.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Schema and Foundation | 3/3 | Complete   | 2026-03-15 |
| 2. Core Plugin Infrastructure | 2/2 | Complete   | 2026-03-19 |
| 3. Backward Design Core | 0/TBD | Not started | - |
| 4. Dashboard MVP | 0/TBD | Not started | - |
| 5. Module and Session Generation | 0/TBD | Not started | - |
| 6. Validation Layer | 0/TBD | Not started | - |
| 7. Full Pipeline Completion | 0/TBD | Not started | - |
