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

## Milestone: v4.0 — SME-Ready

**Shipped:** 2026-03-28
**Phases:** 8 (17–24) | **Plans:** 20
**Files changed:** 49 | **Lines:** ~5,001 insertions / 293 deletions
**Timeline:** 2026-03-26 → 2026-03-28 (3 days)
**Commits:** 57

### What Was Built

- Canonical vocabulary enforcement: 31-entry never-say table in `curriculum-voice.md`, Writing for Clarity across all commands, three-layer enforcement on highest-stakes outputs
- Plain-language review gates: self-check questions at 4 approval points, constraint results with what+why explanations, thinking levels described naturally
- Curriculum registry (`curriculum-registry.json`): single source of truth with per-section timestamps, 6 stage commands write, all 8 downstream commands validate inputs
- Draft-then-audit pipeline for stages 4-8: `_drafts/` write → 4-check audit (completeness, registry consistency, vocabulary, schema) → promote
- Anti-softening integrity: Verification Integrity sections in 9 checking files, prohibited qualifier lists, binary pass/fail enforcement
- Goal-backward session verification: Exists/Substantive/Wired sub-checks with domain-term extraction
- Cross-stage integration check at final approval gate: bidirectional tracing of outcomes, assessments, module references
- Full validation coverage: T1-01 through T1-33 covering all 8 stages with plain-language translations
- 3-attempt deviation handling: cumulative constraint injection, auto-fix boundaries (vocabulary/registry/drift only), escalation format
- Context breaks replacing auto-chain: `/clear` handoffs between all stage transitions
- Module-level progress tracking in STATE.md with file-system-authoritative resume logic
- `/curriculum:revise` command: post-delivery feedback loop with registry-first change propagation
- Research input recognition in audit mode with conditional per-stage Research Insights
- Pipeline recovery fixes: validate.md next-action, resume.md routing table, dead command names

### What Worked

- Audit-then-close pattern: first audit identified 5 integration gaps (MC-01 through MC-05); phases 23-24 closed the high-priority ones cleanly
- Registry-first principle cascaded well: once established in Phase 19, all subsequent phases (20-22) could reference registry for verification without new architecture
- Anti-softening as inline sections (not shared reference): each file self-contained, no import chain to break
- Context-break pattern: eliminating auto-chain Skill invocations removed a whole class of context exhaustion problems
- Draft-then-audit pattern scaled naturally from stages 4-6 (Phase 19) to stages 7-8 (Phase 21) with stage-specific checks added incrementally

### What Was Inefficient

- SUMMARY.md `requirements_completed` frontmatter was inconsistent: 10 of 22 requirements missing from frontmatter despite being verified in VERIFICATION.md — frontmatter tracking is unreliable for multi-plan phases where a requirement spans multiple plans
- Previous audit file had to be re-audited: phases 23-24 were created from the first audit, but the audit file itself was stale — milestone audit should be a terminal step, not an iterative document
- Phase 22 ROADMAP checkboxes show `[ ]` despite both plans being complete — ROADMAP checkbox updates are a manual step that gets missed when plans are executed in rapid succession

### Patterns Established

- Registry-wins-over-files: centralized source is authoritative; stage file edits don't propagate — consistent principle for all cross-stage data
- Auto-fix boundary (3 categories only): vocabulary substitution, registry default fills, outcome drift correction — content decisions never auto-fixed
- Verification Integrity as inline structural constraint: placed before judgment logic in every checking file
- Escalation format: auto-fixes applied + remaining failures shown together — user sees complete picture
- Gap closure as numbered phases (23, 24): audit findings become first-class phases, not ad-hoc fixups

### Key Lessons

- Integration checking is the highest-value audit step: per-phase VERIFICATION catches local issues; cross-phase wiring catches the gaps that actually break user flows
- Writing for Clarity and voice reference are complementary but distinct: voice reference controls vocabulary; WfC controls prose quality — missing one doesn't break the other but degrades output
- Post-delivery revision (revise.md) is architecturally simple because registry-first principle was established earlier — the hardest work was in Phase 19, not Phase 22
- Pipeline recovery routing bugs are invisible until someone actually clears context mid-run — these are worth auditing explicitly, not just testing generation flows

### Cost Observations

- Model mix: 100% sonnet for subagents (integration checker, verifier, executor, planner), opus for orchestration
- Sessions: ~20 across 3 days
- Notable: v4.0 had 57 commits vs v3.0's ~45 — more commits per day but lower conflict rate due to smaller, focused changes

---

## Milestone: v5.0 — Generation Integrity

**Shipped:** 2026-03-30
**Phases:** 6 | **Plans:** 11

### What Was Built

- Audit trail infrastructure: format reference doc, intake initialization, trail-writing in all 7 generation stages + approve + revise
- Canonical outcome registry: learner_profile.data and outcome_wording as single source of truth, stale upstream detection, revise command mid-pipeline staleness flagging
- Domain research command: hypothesis gathering, web evidence search, evidence tagging, SME review checkpoint, grounding document output, pipeline integration with intake/resume routing
- Alignment verification: reference doc with 3 distortion types, wired into all 7 stages as blocking draft audit check, marketing traceability variant
- Cross-stage consistency: reference doc with session-to-module time math, prerequisite ordering, marketing claim-to-assessment chain; approve gate refactored from inline logic to shared reference
- Tech debt closure: Build Summary counter init fix, domain-research-findings.md path anchoring

### What Worked

- Reference-doc-then-wiring pattern: Phase 28 and 29 each split into "create reference doc" + "wire into stages" plans — this kept each plan focused and the reference doc was stable by the time wiring started
- Infrastructure-first sequencing: audit trail and registry built before research/alignment/consistency — no rework needed when later phases wrote to these
- Shared reference parallel structure: alignment-check-reference.md and consistency-check-reference.md mirror each other's integration pattern, making the second one faster to wire
- Accepting tech debt at milestone boundary: stopping the audit→fix→re-audit loop after one iteration preserved momentum

### What Was Inefficient

- Audit→fix→re-audit cycle: first audit found 2 gaps, Phase 30 fixed them, second audit found 3 new gaps — the integration checker explores broadly each time with no convergence guarantee. Should treat the first audit as terminal and track new findings as backlog items.
- SUMMARY frontmatter `requirements_completed` unreliable again: 5 of 25 requirements missing from frontmatter despite being verified — same pattern as v4.0. This field is not worth enforcing for multi-plan phases.
- v5.0 ROADMAP plan checkboxes stale: Phases 29 and 30 show `[ ]` in ROADMAP despite being complete — same manual-update gap as v4.0

### Patterns Established

- Reference doc as shared behavioral contract: checking files (alignment, consistency) are loaded by stages at runtime — the reference doc is the API, the SKILL.md wiring is the consumer
- Stage-specific check variants: marketing gets traceability variant of alignment (no verbatim), sessions/marketing get consistency checks while stages 2-4/6-7 don't — variant scoping prevents false positives
- Warn-and-continue for stale detection: never block silently, always let user choose — prevents pipeline frustration while surfacing the issue
- Tech debt acceptance as deliberate milestone decision: audit identifies gaps, one fix pass runs, remaining items go to backlog — no second audit cycle

### Key Lessons

- Integration checking does not converge: each run explores the full codebase and can find new edge cases indefinitely. Treat the first post-fix audit as terminal. Track remaining findings in backlog, don't create more phases.
- The "core motivation" finding from user testing (agent ignoring source material) is now structurally addressed by alignment verification — but runtime behavior still needs live validation
- Domain research as Stage 1.5 (separate command, not part of intake) was the right call — intake stayed unchanged for existing-material flows

### Cost Observations

- Model mix: 100% sonnet for subagents (integration checker, verifier, executor, planner), opus for orchestration
- Sessions: ~8 across 2 days
- Notable: v5.0 was the fastest milestone (2 days, 11 plans) — infrastructure-heavy phases with well-understood patterns from v4.0

---

## Cross-Milestone Trends

| Trend | v1.0 | v2.0 | v3.0 | v4.0 | v5.0 |
|-------|------|------|------|------|------|
| Days to ship | 7 | 2 | 2 | 3 | 2 |
| Plans completed | 19 | 10 | 15 | 20 | 11 |
| Files changed | — | 66 | 46 | 49 | 27 |
| Commits | — | — | ~45 | 57 | 21 feat |
| Known gaps at ship | 3 (fixed same session) | 0 blockers (tech debt only) | 3 gaps fixed as Phase 16 | 4 gaps fixed as Phases 23-24, 7 tech debt items accepted | 2 gaps fixed as Phase 30, 3 gaps accepted as backlog |
| Audit passed | n/a | ✓ (re-audit after fix pass) | ✓ (28/28 requirements) | ✓ (22/22 requirements, tech_debt status) | ✓ (25/25 requirements, tech_debt status) |

**Velocity:** v5.0 at 2 days for 11 plans (5.5 plans/day). Lower plans/day than v3.0/v4.0 but each plan touched more files cross-cuttingly (reference docs wired into 7+ stage commands). Total time is the fastest milestone despite infrastructure density.

**Quality:** Audit cycle lesson learned — v5.0 ran audit twice (first found 2 gaps → Phase 30 fixed them, second found 3 new gaps → accepted as backlog). The integration checker doesn't converge, so the pattern is now: one audit, one fix pass, ship with remaining items in backlog. No more re-audit cycles.

**Scope management:** v5.0 scope grew from 5 planned phases (25-29) to 6 (25-30) via audit-driven gap closure. Phase 30 was small (1 plan, 2 tasks). Scope growth pattern is consistent across v3.0-v5.0 — audit findings become a final cleanup phase.
