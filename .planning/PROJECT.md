# KNZ Curriculum Builder

## What This Is

A Claude Code plugin with a React dashboard that produces delivery-ready curriculum packages for adult learners. It encodes pedagogical doctrine — TMA, DCR, Six Metaskills, Flipped Classroom — as structural constraints enforced through schemas, so that subject matter experts without instructional design training can produce curriculum that meets rigorous pedagogical standards. The tool handles the scaffold; the human handles the soul.

**Current state (v1.0):** Nine-stage pipeline is fully operational. A user can run `/knz-init` through `/knz-approve` and receive a complete curriculum package — outcomes, assessments, module structure, session content, metaskill activations, transfer ecosystem, and marketing materials — with schema enforcement throughout. React dashboard shows pipeline progress and renders all deliverables.

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

### Active (v2.0)

- [ ] `/knz-intake` opens by asking fresh vs. existing — routes to clean intake or audit mode
- [ ] Audit mode accepts multiple source documents simultaneously and synthesizes before asking questions
- [ ] Audit mode extracts intake schema fields from documents with confidence levels; asks only about gaps
- [ ] Audit mode surfaces cross-document conflicts as named contradictions requiring resolution
- [ ] Audit mode produces curriculum gap report alongside project-brief.md
- [ ] Audit mode pre-populates stage files from existing content; downstream treats as drafts to enforce compliance
- [ ] Evaluation mode: run external curriculum through validation rubrics without full pipeline
- [ ] Evaluation mode produces scored report with specific improvement recommendations

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

**Validation target:** Run the AI agent workflows workshop (6 × 90 min) through the pipeline as first real-world test. Existing materials: facilitator guide + slide deck outline. v2.0 audit mode is designed directly from this use case.

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
| Unified /knz-intake with fresh/audit branch (v2.0) | Real-world use case: existing materials need enrichment, not replacement. One command asks the routing question | — Pending |
| Audit mode as document synthesis + gap report (v2.0) | Most value comes from surfacing what's missing, not just ingesting what exists | — Pending |

---
*Last updated: 2026-03-22 after v1.0 milestone completion*
