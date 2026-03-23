# Roadmap: KNZ Curriculum Builder

## Milestones

- ✅ **v1.0 — MVP** — Phases 1-7 (shipped 2026-03-22) — [archive](.planning/milestones/v1.0-ROADMAP.md)
- 🚧 **v2.0 — Existing Curriculum Support** — Phases 8-10 (planned)

---

## ✅ v1.0 — MVP (Phases 1-7, shipped 2026-03-22)

Full nine-stage curriculum generation pipeline operational. SME-friendly intake, schema-enforced backward design, parallel session generation, three-tier validation, autonomous pipeline chain, React dashboard.

See [v1.0 archive](.planning/milestones/v1.0-ROADMAP.md) for full phase details.

---

## 🚧 v2.0 — Existing Curriculum Support

**Milestone goal:** A user can bring existing curriculum materials — facilitator guides, slide outlines, participant workbooks — into the pipeline. The system routes to audit mode or clean intake based on a single upfront question, synthesizes across multiple source documents, surfaces gaps and conflicts, and pre-populates stage files so the pipeline enriches what exists rather than replacing it.

**Definition of done:**
1. `/curriculum:intake` asks fresh vs. existing upfront and routes correctly
2. Audit mode reads multiple documents simultaneously, extracts schema fields with confidence levels, asks only about genuine gaps
3. Conflicts between source documents are named and resolved before proceeding
4. A curriculum gap report is produced alongside project-brief.md — naming what's missing relative to full schema
5. Stage files are pre-populated from existing content; downstream commands enforce compliance rather than generating from scratch
6. Evaluation mode lets a user run external curriculum through validation rubrics without the full pipeline

### Phase 8: Audit Mode Intake

**Plans:** 3/3 plans complete

Plans:
- [ ] 08-01-PLAN.md — /curriculum:init scaffold + /curriculum:intake routing question (INTK-07)
- [ ] 08-02-PLAN.md — Audit Mode Steps 1-4: ingestion, extraction table, confidence rubric, follow-up questions (INTK-08, INTK-09, INTK-10)
- [ ] 08-03-PLAN.md — Audit Mode Steps 5-6: confirmation gate, file writing, curriculum gap report (INTK-11)

**Goal:** `/curriculum:intake` accepts existing curriculum documents, synthesizes across all of them, surfaces gaps and conflicts, and produces a project-brief.md plus curriculum gap report — so the pipeline starts from what exists rather than generating cold.

**Depends on:** Phase 7 (v1.0 complete)
**Requirements:** INTK-07, INTK-08, INTK-09, INTK-10, INTK-11

**Success Criteria:**
1. Opening question routes correctly — clean intake path unchanged; audit mode path activated when user indicates existing materials
2. Multiple documents accepted simultaneously; synthesis happens before any questions are asked
3. Extraction result shown with confidence levels per field; follow-up questions limited to genuine gaps (not the full interview)
4. Cross-document conflicts surfaced as named contradictions with resolution required before proceeding
5. Curriculum gap report identifies what exists, what's shallow, and what's missing relative to full pipeline schema

### Phase 08.1: Restructure curriculum commands into plugin namespace (INSERTED)

**Goal:** All 12 curriculum commands and 2 agents are moved into a proper Claude Code plugin at `.claude/plugins/curriculum/`, invocable as `/curriculum:*`, with zero `/knz-*` references remaining anywhere in `.claude/`.
**Requirements:** PLG-01
**Depends on:** Phase 8
**Plans:** 1/2 plans executed

Plans:
- [ ] 08.1-01-PLAN.md — Create plugin scaffold, move 12 commands + 2 agents, activate in settings.json (PLG-01)
- [ ] 08.1-02-PLAN.md — Update all /knz-* internal references to /curriculum:* across command files and hooks (PLG-01)

### Phase 9: Stage Pre-population

**Goal:** Audit mode pre-populates stage files (outcomes, assessments, module structure, session content) from extracted existing content, so downstream commands start from drafts to enforce rather than blank slates to fill.

**Depends on:** Phase 8
**Requirements:** INTK-12
**Plans:** 1/3 plans executed

Plans:
- [ ] 09-01-PLAN.md — Wave 0 test fixtures: test STATE.md with pre-populated rows + hook unit test script (INTK-12)
- [ ] 09-02-PLAN.md — Core infrastructure: intake.md pre-population write block + pre-tool-use.sh hook update (INTK-12)
- [ ] 09-03-PLAN.md — Downstream command branches: pre-populated detection in outcomes, assessments, modules, sessions + end-to-end verification (INTK-12)

**Success Criteria:**
1. Stage files written from extracted content at whatever level of completeness the source materials support
2. Downstream commands (`/curriculum:outcomes`, `/curriculum:assessments`, `/curriculum:modules`, `/curriculum:sessions`) detect pre-populated files and switch to compliance-and-enrichment mode rather than generation mode
3. Schema enforcement still runs — pre-populated content that fails schema is flagged, not silently accepted
4. Partial pre-population handled gracefully — if only outcomes exist, later stages still generate normally

### Phase 10: Evaluation Mode

**Goal:** A user can run external curriculum through the validation rubrics without going through the full generation pipeline — producing a scored report with specific improvement recommendations.

**Depends on:** Phase 8
**Requirements:** EVAL-01, EVAL-02

**Success Criteria:**
1. `/curriculum:evaluate` (or evaluation branch of existing command) accepts curriculum documents and runs them through the three-tier validation schema
2. Report names specific field-level gaps, Tier 2 confidence scores, and Tier 3 human review items — same format as post-generation validation
3. Improvement recommendations are specific and actionable — not generic "add more transfer design" but "Session 3 is missing a transfer_connection field; add a real-work application activity tied to the cash flow scenario from intake"

---

## Progress

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1–7 (archived) | v1.0 | 19/19 | Complete | 2026-03-22 |
| 8. Audit Mode Intake | v2.0 | 3/3 | Complete | 2026-03-22 |
| 8.1. Plugin Namespace Migration | 2/2 | Complete    | 2026-03-23 | — |
| 9. Stage Pre-population | 1/3 | In Progress|  | — |
| 10. Evaluation Mode | v2.0 | 0 | Not started | — |
