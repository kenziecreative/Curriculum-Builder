# Requirements: KNZ Curriculum Builder v2.0

**Defined:** 2026-03-22
**Core Value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip

## v2 Requirements

### Plugin Namespace Migration

- [x] **PLG-01**: All 12 curriculum commands and 2 agents are moved into a proper Claude Code plugin at `.claude/plugins/curriculum/`, invocable as `/curriculum:*`, with no `/knz-*` references remaining anywhere in `.claude/`

### Existing Curriculum Intake (Audit Mode)

- [x] **INTK-07**: `/knz-intake` opens by asking whether the user is starting fresh or bringing in existing materials — this determines the intake path, not a separate command
- [x] **INTK-08**: Audit mode accepts multiple source documents simultaneously (e.g., facilitator guide + slide deck outline + participant workbook) and synthesizes across all of them before asking any questions
- [x] **INTK-09**: Audit mode extracts intake schema fields from source documents and shows what it found, what confidence level it has on each field, and what it could not determine — before asking any follow-up questions
- [x] **INTK-10**: Audit mode surfaces conflicts between source documents (e.g., guide says half the session is hands-on but slide count implies lecture-heavy) as named contradictions requiring resolution, not silent choices
- [x] **INTK-11**: Audit mode produces a curriculum gap report alongside the standard `project-brief.md` — identifying what the existing materials have, what's shallow, and what's missing relative to the full pipeline schema
- [ ] **INTK-12**: Audit mode pre-populates stage files (outcomes, assessments, module structure, session content) to the extent source materials cover them, so the pipeline starts from what exists rather than generating from scratch — downstream commands treat pre-populated files as drafts to enforce schema compliance against, not blank slates to fill

### Evaluation Mode

- [ ] **EVAL-01**: User can run external curriculum through the validation rubrics without going through the full generation pipeline
- [ ] **EVAL-02**: Evaluation produces a scored report with specific improvement recommendations — field-level gaps, Tier 2 confidence scores, and Tier 3 human review items in the same format as post-generation validation

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PLG-01 | Phase 8.1 | Not started |
| INTK-07 | Phase 8 | Complete |
| INTK-08 | Phase 8 | Complete |
| INTK-09 | Phase 8 | Complete |
| INTK-10 | Phase 8 | Complete |
| INTK-11 | Phase 8 | Complete |
| INTK-12 | Phase 9 | Not started |
| EVAL-01 | Phase 10 | Not started |
| EVAL-02 | Phase 10 | Not started |

**Coverage:**
- v2 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-03-22*
*Updated: 2026-03-23 — added PLG-01 for Phase 08.1 plugin namespace migration*
