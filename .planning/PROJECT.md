# KNZ Curriculum Builder

## What This Is

A Claude Code plugin with a React dashboard that produces delivery-ready curriculum packages for adult learners. It encodes pedagogical doctrine — TMA, DCR, Six Metaskills, Flipped Classroom — as structural constraints enforced through schemas, so that subject matter experts without instructional design training can produce curriculum that meets rigorous pedagogical standards. The tool handles the scaffold; the human handles the soul.

## Core Value

Every curriculum package that comes out of this tool produces genuine behavioral change — not just a pleasant learning experience — through structurally enforced pedagogy that no user can accidentally skip.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Nine-stage generation pipeline (Intake → Outcome Design → Assessment Design → Module Structure → Session Content → Metaskill Mapping → Transfer Ecosystem → Marketing Derivation → Full Validation)
- [ ] Guided conversational intake answerable by SMEs without instructional design vocabulary
- [ ] Schema-enforced constraints at every stage (required output fields, not suggestions)
- [ ] Backward design as generation sequence (outcomes → assessments → content → marketing)
- [ ] TMA content arc within sessions (ACTIVATE → THEORY → CHECK → METHOD → PRACTICE → APPLICATION → REFLECT → TRANSFER)
- [ ] DCR analytical method with scaffolding for novices and validation for wicked domains
- [ ] Six Metaskills operationalized as thinking routines with developability hierarchy
- [ ] Social learning layer required per module (activity type, interdependence, accountability, group processing)
- [ ] Expertise-adaptive design keyed off intake (strategy, template selection, TMA ordering)
- [ ] Session template library (Gagné-derived, 5E/7E, Merrill, WIPPEA, Universal Arc with TMA)
- [ ] Facilitator guides with timing, facilitation notes, stumbling points, transitions
- [ ] Participant materials: pre-work, handouts, activity worksheets
- [ ] Presentation/slide framework outlines (structural, not final design)
- [ ] Transfer ecosystem: pre-program (readiness, manager briefing, baseline), in-program (implementation intentions, real-work application), post-program (spaced retrieval 1/4/12 weeks, peer accountability, community continuation, evaluation)
- [ ] Three-tier validation: automated schema checks, rubric-based scoring with confidence, human review surfacing
- [ ] Marketing materials derived from curriculum substance
- [ ] React dashboard for pipeline progress tracking and deliverable navigation
- [ ] Markdown as source of truth with formatted output (HTML/PDF) for delivery
- [ ] State management across sessions (STATE.md protocol)
- [ ] Parallel module generation via subagents
- [ ] Platform-agnostic output (no LMS lock-in)
- [ ] Programs from 90 minutes to full semester without architectural changes
- [ ] Human review gates at intake, after assessment design, and at final validation
- [ ] Autonomous generation for middle pipeline stages (module structure through marketing)

### Out of Scope

- Final slide/presentation visual design — structural outlines only
- LMS integration or platform-specific export formats — output is platform-agnostic markdown
- Learner-facing delivery platform — this builds curriculum, doesn't deliver it
- Real-time facilitation support during live training — future capability
- Automated learner assessment scoring — facilitator handles this
- Multi-language curriculum generation — English only for V1
- Video or multimedia content production — document-based output
- Standalone curriculum evaluation mode — validation architecture exists for self-checking, but evaluating external curriculum is a future workflow
- Integration with PM or CMS tools — no external tool dependencies

## Context

**Research foundation:** 11-phase research project (22 sources) completed prior to build. Validated constraint architecture as the correct approach. Research found existing template was biased 60-65% marketing / 20-25% pedagogy. Design recommendations, schema specifications, validation protocols, and architecture decisions are documented in the research outputs.

**Research location:** `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/`

**Interaction model reference:** Brand Compass plugin (`/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/`) demonstrates the conversational walkthrough + React dashboard pattern. Curriculum builder uses the same architectural approach: phase commands drive conversation, background agents do concurrent work, AskUserQuestion for discrete decisions, STATE.md bridges sessions, React dashboard shows progress and deliverables.

**Pipeline flow model:** Deep human involvement at intake → review checkpoint after outcome + assessment design (stages 2-3) → stages 4-8 run autonomously with schema enforcement → gate at final validation (stage 9). For short programs (90 min), this may flow in one session. For semester-length programs, natural session breaks occur between stage groups.

**Users:**
- Kelsey (Kenzie Creative) — deep pedagogical knowledge, builds and delivers training. Bottleneck is time, not knowledge.
- Hello Alice program team — SMEs who know their domains but are not instructional designers. Intake must be answerable without instructional design vocabulary.

**Validation target:** AccessU day-long training, May 2026. Content is outlined but not developed in depth. First real-world test of the full pipeline.

**Known research gaps:**
- Imagining as teachable metaskill: no consolidated evidence base; activated through adjacent practices
- DCR as integrated sequence: components validate separately, no studies test the named framework
- Cooperative learning at compressed durations: meta-analytic evidence from multi-week courses, untested at 90-min
- Minimum viable CoP formation time unknown for compressed formats
- Integrated nine-stage pipeline untested as a system (AccessU is first test)

## Constraints

- **Platform:** Claude Code plugin + React dashboard (Vite + React + TypeScript + Tailwind)
- **Builder:** Kelsey, building with Claude Code — not a traditional software developer
- **Budget:** Self-built; no external development cost beyond Claude Code usage
- **Timeline:** No hard deadline. AccessU validation target May 2026
- **Output format:** Markdown source of truth + formatted HTML/PDF for delivery. Platform-agnostic
- **Duration range:** 90 minutes to full semester. Architecture handles this without modification
- **Context management:** Full curriculum can exceed 100k tokens. Subagent composition prevents context exhaustion

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Plugin + React dashboard (not pure plugin) | Brand Compass experience showed dashboard value for tracking progress and organizing deliverables. Curriculum output volume is even higher — dashboard prevents "scroll to find it" problem | — Pending |
| Guided interview for intake (not form-based) | SMEs need conversational discovery, not a questionnaire. Pedagogical translation happens behind the scenes | — Pending |
| Gate intake, assessment, and final validation; auto-run middle stages | Middle stages (4-8) are mechanical transformation of upstream decisions. Schema enforcement handles quality. Human judgment needed at intake, assessment design, and final review | — Pending |
| Full V1 scope (no truncated MVP) | AI handles structural overhead — truncated MVP still leaves admin burden that defeats the purpose. Transfer ecosystem, marketing, facilitator guides are core, not extras | — Pending |
| Markdown + HTML output (no PDF) | Markdown as source of truth for flexibility. HTML for delivery-ready handoff to facilitators. PDF deferred — HTML is sufficient | — Pending |
| Evaluation mode deferred | Not enough existing curriculum to compare against. Validation architecture exists for self-checking; standalone evaluation workflow is future | — Pending |
| Cross-program consistency | Schema enforcement and shared doctrine produce structural consistency across programs. Organizational brand/voice consistency (e.g., Hello Alice conventions) may need an org-context file — evaluate after second program runs through pipeline | — Pending |

---
*Last updated: 2026-03-15 after initialization*
