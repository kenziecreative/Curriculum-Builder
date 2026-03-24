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

## Cross-Milestone Trends

| Trend | v1.0 | v2.0 |
|-------|------|------|
| Days to ship | 7 | 2 |
| Plans completed | 19 | 10 |
| Files changed | — | 66 |
| Known gaps at ship | 3 (fixed same session) | 0 blockers (tech debt only) |
| Audit passed | n/a | ✓ (re-audit after fix pass) |

**Velocity:** Accelerating — v2.0 shipped in 2 days vs v1.0's 7, with similar plan density. Likely driven by accumulated pattern library and reduced schema uncertainty.

**Quality:** Audit tool caught one real gap (PLG-01 partial) before ship — fixed same session. Pattern of shipping clean then doing a same-session fix pass appears stable.
