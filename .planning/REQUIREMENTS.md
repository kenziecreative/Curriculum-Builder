# Requirements: KNZ Curriculum Builder

**Defined:** 2026-03-15
**Core Value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip

## v1 Requirements

### Pipeline Foundation

- [x] **PIPE-01**: User can initialize a new curriculum project with structured intake conversation
- [x] **PIPE-02**: Pipeline enforces backward design sequence — outcomes before assessments, assessments before content, content before marketing
- [x] **PIPE-03**: Each pipeline stage enforces schema-required output fields — missing fields block stage completion
- [x] **PIPE-04**: Human review gate pauses pipeline after intake for user confirmation before proceeding
- [x] **PIPE-05**: Human review gate pauses pipeline after assessment design for user confirmation
- [ ] **PIPE-06**: Human review gate pauses pipeline at final validation for user approval of complete package
- [ ] **PIPE-07**: Pipeline stages 4-8 (module structure through marketing) run autonomously without human intervention after assessment gate
- [x] **PIPE-08**: Pipeline handles programs from 90 minutes to full semester without architectural changes — duration is an intake parameter

### Structured Intake (Stage 1)

- [x] **INTK-01**: Intake uses guided conversational interview — questions in batches of 2-3, not a form dump
- [x] **INTK-02**: All intake questions are answerable by subject matter experts without instructional design vocabulary
- [x] **INTK-03**: Intake captures learner expertise level via behavioral description ("can do X, cannot yet do Y"), not self-report
- [x] **INTK-04**: Intake captures program duration, delivery context, and audience demographics
- [x] **INTK-05**: Intake reflects back captured information and confirms with user before advancing
- [x] **INTK-06**: Intake pushes back on vague inputs as an expert instructional designer would — not as a form validator

### Outcome Design (Stage 2)

- [x] **OUTC-01**: Learning objectives are automatically tagged with Bloom's taxonomy level based on intake
- [x] **OUTC-02**: Outcome hierarchy structures objectives from program-level down to session-level
- [x] **OUTC-03**: Transfer specification is required for every objective — how the skill transfers to real work
- [x] **OUTC-04**: Bloom's distribution spans 4+ taxonomy levels per program

### Assessment Design (Stage 3)

- [x] **ASMT-01**: Every learning objective has a paired assessment — 100% objective-assessment alignment
- [x] **ASMT-02**: Assessment Bloom's level matches or exceeds the paired objective's level
- [x] **ASMT-03**: Assessments include formative checks (during learning) not just summative (end of learning)
- [x] **ASMT-04**: Assessment rubric criteria are generated for each assessment

### Module Structure (Stage 4)

- [ ] **MODS-01**: Modules are decomposed from outcomes and assessments — not from topic lists
- [ ] **MODS-02**: Module sequencing respects prerequisite dependencies between objectives
- [ ] **MODS-03**: Session template is automatically selected per module based on intake data (Gagné, 5E/7E, Merrill, WIPPEA, Universal TMA Arc)
- [ ] **MODS-04**: Module count and session distribution scale with program duration

### Session Content (Stage 5)

- [ ] **SESS-01**: Each session follows the TMA content arc (ACTIVATE → THEORY → CHECK → METHOD → PRACTICE → APPLICATION → REFLECT → TRANSFER)
- [ ] **SESS-02**: DCR analytical method is applied within sessions with scaffolding for novice audiences
- [ ] **SESS-03**: Social learning layer is required per module with all four sub-fields: activity type, interdependence structure, accountability mechanism, group processing prompt
- [ ] **SESS-04**: Facilitator guides include timing cues, facilitation notes, common stumbling points, and transition guidance
- [ ] **SESS-05**: Participant-facing materials are generated: pre-work assignments, handouts, activity worksheets
- [ ] **SESS-06**: Presentation/slide framework outlines are generated (structural, not visual design)
- [ ] **SESS-07**: Parallel module generation via subagents for programs with multiple modules

### Metaskill Mapping (Stage 6)

- [ ] **META-01**: All six metaskills are mapped with activation activities — specific thinking routines, not labels
- [ ] **META-02**: Developability hierarchy is respected: Exploring/Creating (high evidence) before Innovating/Adapting
- [ ] **META-03**: Each metaskill activation includes a transfer prompt connecting to real-work application

### Transfer Ecosystem (Stage 7)

- [ ] **TRNS-01**: Pre-program design includes readiness assessment, manager briefing, and baseline measurement
- [ ] **TRNS-02**: In-program design includes implementation intentions and real-work application exercises
- [ ] **TRNS-03**: Post-program design includes spaced retrieval at 1/4/12 weeks, peer accountability, community continuation, and evaluation design
- [ ] **TRNS-04**: Transfer elements are attached to specific sessions and modules — not generic appendices

### Marketing Derivation (Stage 8)

- [ ] **MKTG-01**: Program descriptions are derived from curriculum substance — every claim traces to a specific curriculum element
- [ ] **MKTG-02**: Learning promises reflect actual outcomes, not aspirational language
- [ ] **MKTG-03**: Audience positioning is grounded in intake demographics and expertise data
- [ ] **MKTG-04**: Marketing-to-pedagogy ratio is < 25% of total output

### Validation (Stage 9)

- [ ] **VALD-01**: Tier 1 automated schema validation checks all required fields are populated (> 95% completion rate)
- [ ] **VALD-02**: Tier 1 validation blocks completion if required fields are missing
- [ ] **VALD-03**: Tier 2 rubric-based scoring produces confidence scores, not pass/fail, for qualitative dimensions
- [ ] **VALD-04**: Tier 3 surfaces specific items for human review with actionable descriptions and locations
- [ ] **VALD-05**: Generation and validation use separate subagents — never generate and validate in a single call
- [ ] **VALD-06**: Validation report identifies specific field-level failures with locations

### Plugin Infrastructure

- [x] **INFR-01**: STATE.md tracks current stage, completed stages, key decisions, and next action across sessions
- [x] **INFR-02**: Session-start hook automatically reads STATE.md and restores context
- [x] **INFR-03**: One command per pipeline stage as clear entry points
- [x] **INFR-04**: Resume command shows current stage, last session summary, completed work, and next action
- [x] **INFR-05**: Confirmation gate at every stage transition — user confirms before advancing
- [x] **INFR-06**: AskUserQuestion used for all categorical/binary decision points
- [ ] **INFR-07**: PreToolUse hook prevents accidental stage skipping
- [ ] **INFR-08**: Subagent orchestration for parallel module generation
- [ ] **INFR-09**: Subagent chaining enables autonomous middle stages (4-8) without manual intervention
- [x] **INFR-10**: State updates are silent — never announce "updating STATE.md"
- [x] **INFR-11**: Expert instructional designer persona maintained in conversational tone

### Dashboard

- [ ] **DASH-01**: React dashboard displays pipeline progress — stage completion status (done/in-progress/not started)
- [ ] **DASH-02**: Dashboard provides deliverable navigation for all generated output files
- [ ] **DASH-03**: Dashboard reads from workspace directory via filesystem — no API needed
- [ ] **DASH-04**: Formatted HTML output alongside markdown for delivery-ready documents
- [ ] **DASH-05**: Dashboard auto-refreshes when workspace files change

## v2 Requirements

### Evaluation Mode

- **EVAL-01**: User can evaluate existing external curriculum against the same validation rubrics
- **EVAL-02**: Evaluation produces a scored report with specific improvement recommendations

### Enhanced Validation

- **VALD-07**: Rubric calibration against real-world delivery outcomes
- **VALD-08**: Longitudinal tracking of validation accuracy across programs

### Export & Packaging

- **EXPRT-01**: Export command packages all deliverables into a single handoff artifact
- **EXPRT-02**: PDF output option for facilitator guides and participant materials

### Advanced Dashboard

- **DASH-06**: Side-by-side comparison of multiple program versions
- **DASH-07**: Validation report visualization with drill-down

## Out of Scope

| Feature | Reason |
|---------|--------|
| Final slide/visual design | Structural outlines only — visual design requires brand context and tools outside curriculum scope |
| LMS integration or export | Platform-agnostic markdown prevents lock-in. Facilitators adapt to their delivery context |
| Learner-facing delivery platform | This builds curriculum, doesn't deliver it. Different product surface entirely |
| Automated learner assessment scoring | Open-skill assessments require human judgment. Tool designs rubrics, not scores |
| Real-time facilitation support | Different interaction model (mobile-first, real-time). Future product, not V1 feature |
| Multi-language generation | Quality constraint enforcement requires language-specific doctrine encoding |
| Video/multimedia production | Document-based output. Multimedia is a separate production workflow |
| Editable outputs in dashboard | Dashboard is for navigation and status. Editing happens in user's editor |
| Multi-user collaboration | Single-owner project model. File-based state handles handoff when needed |
| Template marketplace | Schema reference files ship with the plugin. No community/sharing infrastructure |
| PDF output | HTML is sufficient for delivery-ready formatted documents |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PIPE-01 | Phase 2 | Complete |
| PIPE-02 | Phase 1 | Complete |
| PIPE-03 | Phase 1 | Complete |
| PIPE-04 | Phase 2 | Complete |
| PIPE-05 | Phase 3 | Complete |
| PIPE-06 | Phase 7 | Pending |
| PIPE-07 | Phase 7 | Pending |
| PIPE-08 | Phase 1 | Complete |
| INTK-01 | Phase 2 | Complete |
| INTK-02 | Phase 2 | Complete |
| INTK-03 | Phase 2 | Complete |
| INTK-04 | Phase 2 | Complete |
| INTK-05 | Phase 2 | Complete |
| INTK-06 | Phase 2 | Complete |
| OUTC-01 | Phase 3 | Complete |
| OUTC-02 | Phase 3 | Complete |
| OUTC-03 | Phase 3 | Complete |
| OUTC-04 | Phase 3 | Complete |
| ASMT-01 | Phase 3 | Complete |
| ASMT-02 | Phase 3 | Complete |
| ASMT-03 | Phase 3 | Complete |
| ASMT-04 | Phase 3 | Complete |
| MODS-01 | Phase 5 | Pending |
| MODS-02 | Phase 5 | Pending |
| MODS-03 | Phase 5 | Pending |
| MODS-04 | Phase 5 | Pending |
| SESS-01 | Phase 5 | Pending |
| SESS-02 | Phase 5 | Pending |
| SESS-03 | Phase 5 | Pending |
| SESS-04 | Phase 5 | Pending |
| SESS-05 | Phase 5 | Pending |
| SESS-06 | Phase 5 | Pending |
| SESS-07 | Phase 5 | Pending |
| META-01 | Phase 7 | Pending |
| META-02 | Phase 7 | Pending |
| META-03 | Phase 7 | Pending |
| TRNS-01 | Phase 7 | Pending |
| TRNS-02 | Phase 7 | Pending |
| TRNS-03 | Phase 7 | Pending |
| TRNS-04 | Phase 7 | Pending |
| MKTG-01 | Phase 7 | Pending |
| MKTG-02 | Phase 7 | Pending |
| MKTG-03 | Phase 7 | Pending |
| MKTG-04 | Phase 7 | Pending |
| VALD-01 | Phase 6 | Pending |
| VALD-02 | Phase 6 | Pending |
| VALD-03 | Phase 6 | Pending |
| VALD-04 | Phase 6 | Pending |
| VALD-05 | Phase 6 | Pending |
| VALD-06 | Phase 6 | Pending |
| INFR-01 | Phase 1 | Complete |
| INFR-02 | Phase 1 | Complete |
| INFR-03 | Phase 2 | Complete |
| INFR-04 | Phase 2 | Complete |
| INFR-05 | Phase 2 | Complete |
| INFR-06 | Phase 2 | Complete |
| INFR-07 | Phase 7 | Pending |
| INFR-08 | Phase 5 | Pending |
| INFR-09 | Phase 5 | Pending |
| INFR-10 | Phase 1 | Complete |
| INFR-11 | Phase 2 | Complete |
| DASH-01 | Phase 4 | Pending |
| DASH-02 | Phase 4 | Pending |
| DASH-03 | Phase 4 | Pending |
| DASH-04 | Phase 4 | Pending |
| DASH-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 61 total
- Mapped to phases: 61
- Unmapped: 0

---
*Requirements defined: 2026-03-15*
*Last updated: 2026-03-15 after roadmap creation — all 61 requirements mapped to 7 phases*
