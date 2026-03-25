# Retrospective: KNZ Curriculum Builder

---

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-22
**Phases:** 7 | **Plans:** 19

### What Was Built

- All nine pipeline stage schemas with enumerated fields and duration scaling
- Guided conversational intake (vocabulary quarantine enforced)
- Backward design enforced: outcomes → assessments → content → marketing
- Parallel session generation via subagents (TMA arc, DCR scaffolding, social learning)
- Three-tier validation agent separate from all generation commands
- Full autonomous pipeline chain with PreToolUse hook stage sequencing
- React dashboard with real-time pipeline status and deliverable rendering

### What Worked

- Schema-first sequencing: no rework once schemas were locked in Phase 1
- Subagent composition for session generation — context exhaustion never hit
- Validation agent structural separation: clean testing, no generation entanglement
- Backward design as generation sequence: alignment fell out naturally, no manual checking

### What Was Inefficient

- Three known gaps at ship required same-session fixes (validator path references, marketing path references, dashboard score parsing)
- Dashboard was its own git repo decision made mid-phase — should be in architecture earlier

### Key Lessons

- Schema changes cascade everywhere — freeze schemas before authoring skills, no exceptions
- AskUserQuestion gate timing is load-bearing: get the state transition right or the pipeline breaks at that stage
- "Silent constraint enforcement before display" pattern is the right model for all generation commands

---

## Milestone: v2.0 — Existing Curriculum Support

**Shipped:** 2026-03-24
**Phases:** 4 (8, 8.1, 9, 10) | **Plans:** 10
**Files changed:** 66 | **Lines:** ~8,800 insertions / 504 deletions
**Timeline:** 2026-03-22 → 2026-03-24 (2 days)

### What Was Built

- `/curriculum:intake` routing question (single command, two paths)
- Audit mode: multi-document ingestion, synthesis-first, extraction table with confidence levels, conflict detection
- Curriculum gap report (Exists/Shallow/Missing per stage, schema-field-completeness defined)
- Stage pre-population: drafts written from extracted content; NEEDS: marker pattern for targeted enrichment
- Downstream command branches: pre-populated detection in all four commands, enforcement-not-generation mode
- Plugin namespace migration: `/curriculum:*` throughout, zero `/knz-*` references
- `/curriculum:evaluate` + `curriculum-evaluator.md`: semantic extraction, three-tier rubrics, strengths-first report

### What Worked

- Inserting Phase 8.1 as a decimal phase mid-milestone worked cleanly — no numbering confusion
- "Read-all-then-synthesize" ordering in audit mode: explicit "do not ask questions" instruction prevents premature interruption
- Thin-content fallback per check (not per report): specific sections can be thin while others have full evidence
- Evaluation mode with no STATE.md side effects: clean standalone — runs anywhere, no pipeline entanglement

### What Was Inefficient

- REQUIREMENTS.md traceability table was stale throughout (all four v2.0 phases) — not worth maintaining manually; audit tool does the real verification
- Nyquist compliance partial for three of four phases — tests are written but not run live; acceptable for prompt-instruction code but a gap worth noting

### Patterns Established

- `pre-populated` status as first check in command status routing — must come before `in-progress` or file-existence check misroutes
- Vocabulary quarantine at the rubric layer (not the output layer) — enforce at the point closest to the source
- Evaluation mode structurally mirrors validate mode but never writes to STATE.md — pattern for any "read-only analysis" commands going forward

### Key Lessons

- Plugin naming matters at the `enabledPlugins` / `settings.json` layer — `settings.local.json` is silently ignored by Claude Code (confirmed GitHub issues)
- Conflict detection should be named contradictions with resolution required, not silent choices — users trust the tool more when conflicts are explicit
- Strengths-first output structure reduces defensiveness in evaluation reports — mirrors should come before critique

---

## Milestone: v3.0 — Output Quality

**Shipped:** 2026-03-25
**Phases:** 6 (11–16) | **Plans:** 15
**Files changed:** 46 | **Lines:** ~3,480 insertions / 434 deletions
**Timeline:** 2026-03-24 → 2026-03-25 (2 days)

### What Was Built

- Curriculum voice system: `curriculum-voice.md` reference file + inline guardrails in four worst-offending commands
- Full command retrofit: 15 commands/agents — zero prohibited terms, warm handoffs, TMA labels suppressed, NEEDS: markers enforced
- `curriculum-auditor.md` specialist agent with contracted Completion Signal interface
- Three-mode audit routing (gap-fill / enrich / hands-off) via `content_quality` dimension
- Clone-and-run deployment: `install.sh` deleted, `scripts/release.sh` added, `WORKSPACE_DIR` env var support
- Delivery layer: `/curriculum:assemble`, `/curriculum:verify`, standalone `generate-html.js`, `handleHotUpdate` wiring
- Three post-audit gap fixes: HTML co-location in `delivery/session-N/`, verify.md Stage 4 false-positive, intake pre-pop filename

### What Worked

- "Reference file is documentation, inline is enforcement" pattern: voice system works because the four worst-offender commands have inline guardrails, not just a pointer to the file
- Auditor agent isolation test before wiring: first test run caught wrong column names — fixing before wiring prevented a class of intake failures
- Audit pass before milestone complete: three wiring gaps caught and fixed as Phase 16 instead of discovered post-ship
- Delivery layer scope clarity: narrow assembler scope (facilitator + marketing only) kept `delivery/` lean and reasoning tractable

### What Was Inefficient

- Phase 13 plan count grew from 4 to 5 mid-execution — context-clear nudge and vocabulary gaps warranted a fifth plan; better to estimate breadth-heavy phases at upper bound
- The v3.0 ROADMAP archive captured from the in-progress roadmap (with some unchecked checkboxes) — milestone archive should be written after completion, not copied from working state

### Patterns Established

- `content_quality` (strong/partial/absent) separate from `extraction_confidence` (High/Medium/Low/None) — two-dimension assessment prevents conflating "found source content" with "source content is worth keeping"
- Specialist agent with explicit Completion Signal contract before wiring to an orchestrating command — agent tested in isolation first
- Delivery layer as separate milestone phase (not appended to generation) — HTML output and assembler require clean source content as prerequisite
- Post-audit gap closure as an inserted decimal phase (16) — gap closure is a first-class deliverable, not a fixup

### Key Lessons

- Voice enforcement works at the inline layer, not the reference layer — the reference file creates the vocabulary; the inline guardrail prevents the violation at the command level
- Delivery scope creep risk is real: "delivery package" can mean many things; explicit exclusion list (slide outlines, validation reports excluded from `delivery/`) was the right call
- Session subdirectory recursion was a silent bug for the entire v1.0–v2.0 lifecycle — no session HTML was ever produced by the batch process; caught only when the delivery layer was built

---

## Cross-Milestone Trends

| Trend | v1.0 | v2.0 | v3.0 |
|-------|------|------|------|
| Days to ship | 7 | 2 | 2 |
| Plans completed | 19 | 10 | 15 |
| Files changed | — | 66 | 46 |
| Known gaps at ship | 3 (fixed same session) | 0 blockers (tech debt only) | 3 gaps fixed as Phase 16 |
| Audit passed | n/a | ✓ (re-audit after fix pass) | ✓ (28/28 requirements) |

**Velocity:** Stable at 2 days for v2.0 and v3.0, with v3.0 covering 15 plans (50% more than v2.0). Breadth-heavy retrofits (Phase 13) are faster per plan than architecture-heavy features.

**Quality:** Audit-first pattern holding — all three v3.0 gaps caught and fixed before milestone close. Post-audit gap closure as an inserted phase (16) is working well as a pattern.

**Scope management:** v3.0 delivery scope was well-bounded (explicit exclusion list). Phase 13 plan count grew mid-execution but was contained within the phase. Delivery layer scope definition is the highest leverage design decision for future output-facing milestones.
