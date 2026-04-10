# KNZ Curriculum Builder

## What This Is

A Claude Code plugin with a React dashboard that produces delivery-ready curriculum packages for adult learners. It encodes pedagogical doctrine — TMA, DCR, Six Metaskills, Flipped Classroom — as structural constraints enforced through schemas, so that subject matter experts without instructional design training can produce curriculum that meets rigorous pedagogical standards. The tool handles the scaffold; the human handles the soul.

**Current state (v5.0):** Full pipeline with generation integrity layer. Every generation stage leaves an audit trail recording what was read, used, assumed, and confirmed — any curriculum claim can be traced back to its evidence source. Canonical outcome registry (`curriculum-registry.json`) prevents cross-stage drift by serving as single source of truth for learner profile and outcome wording. From-scratch builds grounded in verified domain research before generation begins. Post-generation alignment verification detects qualifier stripping, range narrowing, and ungrounded content across all 7 generation stages. Cross-stage consistency checks catch session/module mismatches and unverifiable marketing claims before approval. 17 commands + 4 agents under `/curriculum:*` namespace. Deployment is clone-and-run.

## Core Value

Every curriculum package that comes out of this tool produces genuine behavioral change — not just a pleasant learning experience — through structurally enforced pedagogy that no user can accidentally skip.

## Requirements

### Validated (v1.0)

- ✓ Nine-stage generation pipeline (Intake → Outcome Design → Assessment Design → Module Structure → Session Content → Metaskill Mapping → Transfer Ecosystem → Marketing Derivation → Full Validation) — v1.0
- ✓ Guided conversational intake answerable by SMEs without instructional design vocabulary — v1.0
- ✓ Schema-enforced constraints at every stage (required output fields, not suggestions) — v1.0
- ✓ Backward design as generation sequence (outcomes → assessments → content → marketing) — v1.0
- ✓ TMA content arc within sessions (all 8 phases required) — v1.0
- ✓ DCR analytical method with scaffolding for novices — v1.0
- ✓ Six Metaskills operationalized as thinking routines with developability hierarchy — v1.0
- ✓ Social learning layer required per module (all 4 sub-fields) — v1.0
- ✓ Facilitator guides, participant materials, slide outlines per session — v1.0
- ✓ Transfer ecosystem: pre/in/post-program with spaced retrieval, CoP, evaluation design — v1.0
- ✓ Three-tier validation: automated schema checks, rubric scoring, human review — v1.0
- ✓ Marketing materials derived from curriculum substance with full traceability — v1.0
- ✓ React dashboard for pipeline progress and deliverable navigation — v1.0
- ✓ Parallel module generation via subagents — v1.0
- ✓ Programs from 90 minutes to full semester without architectural changes — v1.0
- ✓ Human review gates at intake, assessment design, and final validation — v1.0
- ✓ Autonomous generation for middle pipeline stages (module structure through marketing) — v1.0
- ✓ State management across sessions (STATE.md protocol) — v1.0
- ✓ PreToolUse hook prevents accidental stage skipping — v1.0

### Validated (v2.0)

- ✓ `/curriculum:intake` opens by asking fresh vs. existing — routes to clean intake or audit mode — v2.0
- ✓ Audit mode accepts multiple source documents simultaneously and synthesizes before asking questions — v2.0
- ✓ Audit mode extracts intake schema fields from documents with confidence levels; asks only about gaps — v2.0
- ✓ Audit mode surfaces cross-document conflicts as named contradictions requiring resolution — v2.0
- ✓ Audit mode produces curriculum gap report alongside project-brief.md — v2.0
- ✓ Audit mode pre-populates stage files from existing content; downstream treats as drafts to enforce compliance — v2.0
- ✓ Evaluation mode: run external curriculum through validation rubrics without full pipeline — v2.0
- ✓ Evaluation mode produces scored report with specific improvement recommendations — v2.0
- ✓ All 12 commands + 2 agents under proper Claude Code plugin namespace (`/curriculum:*`) — v2.0

### Validated (v3.0)

- ✓ All command output hides constraint enforcement steps — user sees result and brief plain-language callout only — v3.0
- ✓ All insider terms replaced with plain language across every command (schema, linkage, TMA, DCR trigger, Bloom's labels, YAML field names as visible labels) — v3.0
- ✓ Slide outlines written as production direction (what goes on the slide + intent + facilitator rationale), not content inventory — v3.0
- ✓ Facilitator notes include diagnostic direction: what to observe, what it signals, what move to make — v3.0
- ✓ Marketing files are copy-paste-ready PAS/DOS prose with VOC language; traceability data in separate section — v3.0
- ✓ Transfer ecosystem file is readable narrative with plain headings — no YAML structure in output — v3.0
- ✓ TMA phase labels (ACTIVATE, THEORY, METHOD, etc.) never appear as visible labels in facilitator guides, participant materials, or slide outlines — v3.0
- ✓ `curriculum-voice.md` created as shared reference — tone per output type, guardrails, plain-language substitutions, signature moves — v3.0
- ✓ Every command that generates user-facing content references `curriculum-voice.md` before generating — v3.0
- ✓ Audit mode implements three content-handling modes (gap-fill / enrich / hands-off) via `curriculum-auditor.md` specialist agent — v3.0
- ✓ `curriculum-auditor.md` tested in isolation before wiring; explicit Completion Signal contract — v3.0
- ✓ Deployment changed to clone-and-run; `install.sh` deleted; `scripts/release.sh` added — v3.0
- ✓ Document assembler (`/curriculum:assemble`) and pre-delivery verifier (`/curriculum:verify`) added; HTML output co-located in `delivery/` — v3.0
- ✓ All stage-completing commands end with warm synthesizing handoff and context-clear nudge — v3.0

### Validated (v4.0)

- ✓ Canonical vocabulary enforcement — 31-entry never-say table, Writing for Clarity across all commands, three-layer enforcement on highest-stakes outputs — v4.0
- ✓ Plain-language review gates — self-check questions at every approval point, constraint results explain what+why, thinking levels in natural language — v4.0
- ✓ Curriculum registry (`curriculum-registry.json`) as single source of truth for cross-stage data — v4.0
- ✓ Draft-then-audit pipeline for all content stages (4-8) with 4-check quality gates — v4.0
- ✓ Pre-execution input validation on all downstream stage commands — v4.0
- ✓ Context breaks between auto-chained stages — v4.0
- ✓ Anti-softening integrity system — binary pass/fail in 9 checking files, prohibited qualifier lists — v4.0
- ✓ Goal-backward session verification (Exists/Substantive/Wired) — v4.0
- ✓ Cross-stage integration check at final approval gate — v4.0
- ✓ Curriculum integrity agent with named failure modes (outcome drift, generic content, doctrine violations, missing formative assessment, pre-work gaps) — v4.0
- ✓ Full validation T1-01 through T1-33 covering all 8 stages end-to-end — v4.0
- ✓ Structured deviation handling — 3-attempt retry with cumulative constraints, auto-fix boundaries, escalation — v4.0
- ✓ Sub-stage state tracking — module-level progress in STATE.md survives context clears — v4.0
- ✓ `/curriculum:revise` command for post-delivery feedback loops with targeted revision — v4.0
- ✓ Research input recognition in audit mode — structured research as source material — v4.0
- ✓ Stage numbering normalized (01-09 for new, auto-detection for legacy) — v4.0
- ✓ Pipeline recovery routing fixed (resume.md, validate.md next-action, dead command names) — v4.0

### Validated (v5.0)

- ✓ Generation audit trail — every stage records source material read, findings used, agent-generated content, and SME confirmations with timestamps — v5.0
- ✓ Canonical outcome registry — `curriculum-registry.json` stores learner profile and outcome wording; all downstream stages read from registry with stale upstream detection — v5.0
- ✓ Domain research for from-scratch builds — SME hypotheses researched against evidence, tagged, reviewed at checkpoint, saved as grounding document — v5.0
- ✓ Source material alignment verification — post-generation checks detect qualifier stripping, range narrowing, and assumed content; blocks draft promotion — v5.0
- ✓ Cross-stage consistency checking — session-to-module time math, prerequisite ordering, marketing claim-to-assessment chain; runs automatically before approve gate — v5.0

### Active

(No active requirements — next milestone not yet defined)

### Out of Scope

- Final slide/presentation visual design — structural outlines only
- LMS integration or platform-specific export formats — output is platform-agnostic markdown
- Learner-facing delivery platform — this builds curriculum, doesn't deliver it
- Real-time facilitation support during live training — future capability
- Automated learner assessment scoring — facilitator handles this
- Multi-language curriculum generation — English only for V1
- Video or multimedia content production — document-based output
- Integration with PM or CMS tools — no external tool dependencies
- Export/packaging, advanced dashboard, rubric calibration, longitudinal tracking — v3 (requires usage data)

## Context

**Research foundation:** 11-phase research project (22 sources) completed prior to build. Research location: `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/`

**Users:**
- Kelsey (Kenzie Creative) — deep pedagogical knowledge, builds and delivers training. Bottleneck is time, not knowledge.
- Hello Alice program team — SMEs who know their domains but are not instructional designers.

**Validation target:** Run the AI agent workflows workshop (6 × 90 min) through the pipeline as first real-world test. Existing materials: facilitator guide + slide deck outline. v2.0 audit mode was designed directly from this use case.

**Known research gaps:**
- Imagining as teachable metaskill: no consolidated evidence base
- DCR as integrated sequence: components validate separately, no studies test the named framework
- Cooperative learning at compressed durations: meta-analytic evidence from multi-week courses, untested at 90-min
- Integrated nine-stage pipeline untested as a system (first real program is the test)

## Constraints

- **Platform:** Claude Code plugin + React dashboard (Vite + React + TypeScript + Tailwind)
- **Builder:** Kelsey, building with Claude Code — not a traditional software developer
- **Budget:** Self-built; no external development cost beyond Claude Code usage
- **Output format:** Markdown source of truth + formatted HTML for delivery. Platform-agnostic
- **Duration range:** 90 minutes to full semester. Architecture handles this without modification
- **Context management:** Full curriculum can exceed 100k tokens. Subagent composition prevents context exhaustion

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Plugin + React dashboard (not pure plugin) | Dashboard value for tracking progress and navigating deliverables — curriculum output volume is high | ✓ Good — dashboard verified useful in v1.0 |
| Guided interview for intake (not form-based) | SMEs need conversational discovery, not a questionnaire | ✓ Good — vocabulary quarantine verified in command design |
| Gate intake, assessment, and final validation; auto-run middle stages | Middle stages are mechanical transformation. Human judgment needed at intake, design, and final review | ✓ Good — autonomous chain verified working |
| Full V1 scope (no truncated MVP) | Transfer ecosystem, marketing, facilitator guides are core, not extras | ✓ Good — complete pipeline shipped |
| Markdown + HTML output (no PDF) | Markdown as source of truth. HTML for delivery-ready handoff | ✓ Good — deferred PDF to v3 |
| Schema before skills | Every schema change cascades into every skill — schemas must be final before skill authoring | ✓ Good — no schema rework needed after Phase 1 |
| Unified `/curriculum:intake` with fresh/audit branch (v2.0) | Real-world use case: existing materials need enrichment, not replacement. One command asks the routing question | ✓ Good — single command handles both paths cleanly |
| Audit mode as document synthesis + gap report (v2.0) | Most value comes from surfacing what's missing, not just ingesting what exists | ✓ Good — Exists/Shallow/Missing framework provides actionable signal |
| Pre-population with enforcement (not replacement) (v2.0) | Existing content has value; pipeline should enrich it while still enforcing schema compliance | ✓ Good — NEEDS: marker pattern enables targeted enrichment |
| Plugin namespace migration as urgent inserted phase (v2.0) | `/knz-*` naming violated Claude Code plugin conventions; fix required before v2.0 ship | ✓ Good — zero `/knz-*` references remain |
| Evaluation mode as standalone command (v2.0) | External curriculum evaluation is a distinct use case from pipeline execution — no STATE.md entanglement | ✓ Good — `/curriculum:evaluate` runs independently, no side effects |
| Voice reference file + inline guardrails (v3.0) | Reference file is documentation; inline enforcement is the actual constraint — both needed for coverage and reliability | ✓ Good — four worst-offending commands have inline guardrails; others reference the file |
| Auditor agent contracted before wiring (v3.0) | First isolation run used wrong column names — agent must return the specified Completion Signal format reliably before intake.md depends on it | ✓ Good — zero intake failures from auditor contract mismatch |
| `content_quality` separate from `extraction_confidence` (v3.0) | Mode selection must not conflate "was source content found?" with "is existing content strong enough to leave alone?" — separate dimensions prevent over-writing good content | ✓ Good — hands-off mode protected strong existing content correctly |
| Clone-and-run replaces install script (v3.0) | `install.sh` deleted entirely, no deprecation stub — contradictory deployment state is worse than a hard break | ✓ Good — no install-script references remain |
| Standalone `generate-html.js` script (v3.0) | Keeps HTML generation self-contained for Bash invocation without a build step — `wrapHtml()` duplicated inline intentionally | ✓ Good — script runs without node module resolution issues |
| verify.md read-only, approve controls presentation (v3.0) | verify.md is a diagnostic tool, not a gate — approve.md owns the user-facing gate UI and decides when to invoke verify silently | ✓ Good — clean separation of diagnostic vs. gate responsibility |
| Canonical never-say table in curriculum-voice.md (v4.0) | All 31 prohibited terms centralized — per-command lists were drifting and incomplete | ✓ Good — single source of truth, all 20 files reference it |
| Registry-wins-over-files principle (v4.0) | curriculum-registry.json is authoritative; direct stage file edits don't propagate | ✓ Good — cross-stage drift structurally prevented |
| Draft-then-audit with auto-fix boundary (v4.0) | Content stages write to _drafts/ first; only vocabulary, registry defaults, and outcome drift are auto-fixable | ✓ Good — content decisions never silently changed |
| Anti-softening as inline Verification Integrity (v4.0) | Each checking file self-contained; enforcement loads automatically with the agent | ✓ Good — no soft passes observed in verification |
| Context breaks replace auto-chain (v4.0) | Every stage transition is explicit /clear + next command, not Skill invocation | ✓ Good — no context exhaustion in pipeline runs |
| revise.md registry-first change propagation (v4.0) | Update registry before any file changes; targeted regen via parent references | ✓ Good — consistent with Phase 19 principles |
| Audit trail as infrastructure-first (v5.0) | Build trail format and intake init before other phases — all v5.0 phases write to it | ✓ Good — no trail format changes needed after Phase 25 |
| Domain research as Stage 1.5, not part of intake (v5.0) | Separate command with own state tracking; cleaner skip logic for audit-mode builds | ✓ Good — intake stays unchanged for existing-material flows |
| Shared reference docs for alignment + consistency (v5.0) | alignment-check-reference.md and consistency-check-reference.md loaded by stages, not inline logic | ✓ Good — approve gate simplified; parallel structure scales |
| Marketing traceability variant instead of verbatim alignment (v5.0) | Marketing derives conversion copy — verbatim checks would reject legitimate rewording | ✓ Good — outcome ID linkage preserves traceability without constraining copy |
| Stale detection as warn-and-continue (v5.0) | Never block silently on stale data; user chooses to proceed or re-run upstream | ✓ Good — no false blocking observed |

---
*Last updated: 2026-03-30 after v5.0 milestone complete*
