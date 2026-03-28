# Milestones

## v4.0 — SME-Ready (Shipped: 2026-03-28)

**Phases:** 17–24 | **Plans:** 20 | **Commits:** 57 | **Timeline:** 2026-03-26 → 2026-03-28 (3 days)
**Requirements:** 22/22 satisfied | **Audit:** tech_debt (all requirements met, non-blocking items)

**Key accomplishments:**
1. Canonical vocabulary enforcement — 31-entry never-say table in `curriculum-voice.md` + Writing for Clarity standardized across all commands and agents; zero ID jargon reaches users in any pipeline output
2. Plain-language review gates — self-check questions at every approval point; constraint results explain what was checked and why it matters; thinking levels described in natural language instead of Bloom labels
3. Curriculum registry + quality pipeline — `curriculum-registry.json` as single source of truth, draft-then-audit with 4-check gates for stages 4-8, pre-execution input validation, context breaks between all stages
4. Anti-softening integrity system — binary pass/fail enforcement in 9 checking files; goal-backward session verification (Exists/Substantive/Wired); cross-stage integration check at final approval gate
5. Full end-to-end validation — T1-01 through T1-33 covering all 8 stages; 3-attempt deviation handling with cumulative constraint injection; plain-language translations for every check
6. Post-delivery revision + research input — `/curriculum:revise` for targeted feedback loops after delivery; audit mode recognizes structured research documents as source material; pipeline recovery routing completed

**Tech debt accepted:**
- 7 commands missing Writing for Clarity prose block (voice reference present)
- 3 draft-audit preambles say "four checks" (gate logic correct)
- validate.md hardcodes legacy directory path (new-scheme workspaces)
- resume.md missing route to /curriculum:revise

**Archive:** `.planning/milestones/v4.0-ROADMAP.md`, `.planning/milestones/v4.0-REQUIREMENTS.md`

---

## v3.0 — Output Quality (Shipped: 2026-03-25)

**Phases:** 11–16 | **Plans:** 15 | **Timeline:** 2026-03-24 → 2026-03-25 (2 days)
**Requirements:** 28/28 satisfied

**Key accomplishments:**
1. Delivery pipeline now produces a polished `delivery/` package — HTML + markdown co-located per session, assembler and verifier commands wired to the final approval gate
2. Curriculum voice system established — shared `curriculum-voice.md` reference file with inline guardrails in the four worst-offending commands — machinery hidden from all output
3. All 15 commands and agents retrofitted: zero prohibited terms, warm handoffs, plain-language vocabulary, TMA labels suppressed, NEEDS: markers enforced before any file marked complete
4. Audit mode now routes to three intelligent content-handling modes (gap-fill / enrich / hands-off) via a dedicated `curriculum-auditor.md` specialist agent with a contracted Completion Signal interface
5. Clone-and-run deployment model replaces install script — one clone, one command, working setup with `WORKSPACE_DIR` env var support and `scripts/release.sh` for public sync
6. Three delivery-layer wiring gaps closed post-audit: HTML co-located in `delivery/session-N/`, verify.md Stage 4 false-positive eliminated, audit pre-population writes `assessment-map.md` (file modules.md reads)

**Archive:** `.planning/milestones/v3.0-ROADMAP.md`, `.planning/milestones/v3.0-REQUIREMENTS.md`

---

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
