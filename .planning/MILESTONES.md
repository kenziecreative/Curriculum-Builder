# Milestones

## v2.0 Existing Curriculum Support (Shipped: 2026-03-24)

**Phases completed:** 4 phases, 10 plans, 2 tasks

**Key accomplishments:**
1. `/curriculum:intake` routes fresh vs. existing at the opening question — one command, two paths, clean intake path unchanged
2. Audit mode ingests multiple source documents simultaneously, synthesizes before questioning, surfaces cross-document conflicts as named contradictions requiring resolution
3. Curriculum gap report produced alongside `project-brief.md` — Exists/Shallow/Missing per pipeline stage defined by schema-field-completeness, not quality language
4. Pre-population writes stage drafts from extracted content; downstream commands enforce schema compliance rather than generating from scratch
5. Full plugin namespace migration — all 12 commands + 2 agents moved to `/curriculum:*` under `.claude/plugins/curriculum/`, zero `/knz-*` references remaining
6. `/curriculum:evaluate` lets users run external curriculum through three-tier validation rubrics without the full pipeline, producing strengths-first scored reports with specific improvement recommendations

---

## v1.0 — KNZ Curriculum Builder MVP (Shipped: 2026-03-22)

**Phases:** 7 | **Plans:** 19 | **Timeline:** 2026-03-15 → 2026-03-22 (7 days)
**Requirements:** 61/61 satisfied

**Key accomplishments:**
1. All nine pipeline stage schemas authored with enumerated fields, backward design dependency chains, and duration scaling for programs from 90 minutes to full semester
2. `/knz-init` and `/knz-intake` deliver a guided conversational intake that SMEs can complete without instructional design vocabulary — with expert pushback on vague inputs
3. `/knz-outcomes` and `/knz-assessments` enforce Bloom's alignment, transfer specifications, and a global 4-level thinking distribution — with human review gate before proceeding
4. Parallel session generation via subagents produces complete TMA arc content, DCR scaffolding, social learning layer, facilitator guides, participant materials, and slide outlines for every session
5. Three-tier validation agent (separate from all generation) runs field-level checks, rubric confidence scores, and human review checklist — auto-triggered after session generation
6. Full autonomous pipeline chain: `/knz-sessions` → validate → metaskills → transfer → marketing, with PreToolUse hook enforcing stage sequencing at the filesystem level
7. React dashboard at localhost:3002 shows real-time pipeline status, renders generated output files inline, and auto-refreshes on workspace changes

**Known gaps at ship (fixed same session):**
- `knz-validator.md` referenced `assessment-plan.md` (nonexistent) — fixed to read actual assessment files
- `knz-marketing.md` referenced `assessment-design.md` (nonexistent) — fixed to `assessment-map.md`
- `ValidationReport.tsx` Tier 2 score parsing used wrong section header regex and snake_case label keys — fixed to match validator output format

**Archive:** `.planning/milestones/v1.0-ROADMAP.md`, `.planning/milestones/v1.0-REQUIREMENTS.md`

---
