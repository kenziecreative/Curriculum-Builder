---
gsd_state_version: 1.0
milestone: v4.0
milestone_name: — SME-Ready
status: planning
stopped_at: Completed 22-01-PLAN.md (revise command)
last_updated: "2026-03-28T02:16:27.099Z"
last_activity: 2026-03-26 — v4.0 roadmap created
progress:
  total_phases: 6
  completed_phases: 6
  total_plans: 18
  completed_plans: 18
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-26)

**Core value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip
**Current focus:** v4.0 Phase 17 — Vocabulary & Plain Language

## Current Position

Phase: 17 of 22 (Vocabulary & Plain Language)
Plan: Not yet planned
Status: Ready to plan
Last activity: 2026-03-26 — v4.0 roadmap created

Progress: [░░░░░░░░░░] 0% (v4.0)

## Performance Metrics

**Velocity:**
- Total plans completed: 0 (v4.0); 29 total across all prior milestones
- Average duration: ~4 min/plan (v3.0 baseline)
- Total execution time: 0 hours (v4.0)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

*Updated after each plan completion*
| Phase 17 P01 | 20 | 2 tasks | 8 files |
| Phase 17-vocabulary-plain-language P03 | 4 | 2 tasks | 4 files |
| Phase 17 P02 | 15 | 3 tasks | 6 files |
| Phase 18 P01 | 98s | 2 tasks | 2 files |
| Phase 18-stage-guidance P02 | 8 | 2 tasks | 2 files |
| Phase 18-stage-guidance P03 | 4min | 2 tasks | 16 files |
| Phase 18-stage-guidance P04 | 3 | 1 tasks | 1 files |
| Phase 19-pipeline-infrastructure P01 | 3min | 2 tasks | 7 files |
| Phase 19-pipeline-infrastructure P03 | 3min | 2 tasks | 5 files |
| Phase 19-pipeline-infrastructure P02 | 5min | 2 tasks | 8 files |
| Phase 20-integrity-verification P01 | 2min | 2 tasks | 7 files |
| Phase 20-integrity-verification P03 | 5min | 2 tasks | 1 files |
| Phase 20-integrity-verification P02 | 2min | 2 tasks | 3 files |
| Phase 21-deviation-validation-coverage P01 | 2min | 2 tasks | 3 files |
| Phase 21-deviation-validation-coverage P02 | 3min | 2 tasks | 2 files |
| Phase 21-deviation-validation-coverage P03 | 6min | 1 tasks | 1 files |
| Phase 22-new-capabilities P02 | 2min | 2 tasks | 2 files |
| Phase 22-new-capabilities P01 | 8min | 2 tasks | 1 files |

## Accumulated Context

### Decisions

- [Roadmap v4.0]: Phase 17 (Vocabulary) before Phase 18 (Guidance) — guidance references the same vocabulary; clean the language first
- [Roadmap v4.0]: Phase 19 (Infrastructure) before Phase 20 (Integrity) — registry is the data source the integrity agent checks against; draft pipeline is the location the audit checks
- [Roadmap v4.0]: DEVL-03 (stage numbering) moved to Phase 18 — pairs naturally with gate guidance since both address what users read at review points
- [Roadmap v4.0]: Phase 22 (New Capabilities) last — FEAT-01 and FEAT-02 are additive, not quality fixes; nothing depends on them
- [Phase 17]: Alphabetized never-say table in curriculum-voice.md (31 entries) — all prohibited terms from all commands now in single canonical source
- [Phase 17]: Standard Writing for Clarity block and voice reference instruction established — identical wording across all command files creates uniform enforcement surface
- [Phase 17-03]: Three-layer treatment for curriculum-evaluator.md — voice reference + Writing for Clarity + post-write scan for SME-facing output
- [Phase 17-03]: Post-write scans reference curriculum-voice.md canonical table rather than hardcoding per-agent lists
- [Phase 17]: Three-layer vocabulary enforcement pattern for approve.md: voice ref + inline guardrail + never-say table
- [Phase 17]: curriculum_traceability replaced with source_link in marketing.md hints — schema field name survives in schema file, not in command instructions
- [Phase 18]: Self-check questions use concrete job-readiness language at review gates — SME evaluates like a sharp colleague, not an ID professional
- [Phase 18]: Bloom span replaced with 'building from X to Y' instruction pattern in approve.md — agent fills natural activity descriptions, never taxonomy labels
- [Phase 18-02]: Em-dash separator for combining what+why in constraint failure lines — reads as one idea with two parts
- [Phase 18-02]: validate.md failure messages now show 'what was checked — why it matters' so SMEs understand significance without ID training
- [Phase 18-03]: Auto-detection is additive: existing directory references remain as default legacy pattern — detection block tells Claude which mapping to use without rewriting every path
- [Phase 18-03]: Directory scheme detection pivots on 00-project-brief vs 01-project-brief presence — unambiguous signal for legacy vs new workspace
- [Phase 18-04]: Intake self-check questions target program brief accuracy (audience, format, success criteria, completeness catch-all) — not learning design evaluation; SME is verifying captured data, not auditing curriculum quality
- [Phase 19-01]: Registry wins over stage files on conflict — centralized source is authoritative, direct edits to stage files do not propagate automatically
- [Phase 19-01]: Intake gets two registry write locations (fresh and audit paths) — both approval branches write project-brief.md so both need registry writes
- [Phase 19-03]: Context-break pattern applies to all stage transitions (stages 5-8) — no stage inherits a saturated context window from a predecessor; consistent with stages 1-4 pattern
- [Phase 19-03]: Module Progress tracking is SILENT — not-started/in-progress/complete per module; resume logic trusts file system over STATE.md when they disagree
- [Phase 19-02]: Input Validation is additive — existing stage status checks unchanged; validation added as numbered prerequisite step between predecessor status check and current stage status check
- [Phase 19-02]: Draft-then-audit pattern for stages 4-6: generate to _drafts/, run four checks (completeness, registry consistency, vocabulary, schema), auto-fix vocab violations, promote only if all checks pass
- [Phase 20-01]: Verification Integrity sections are inline in each file (not shared reference) — each agent self-contained so enforcement loads automatically with the agent
- [Phase 20-01]: approve.md gets Verification Integrity because it presents check results from other agents and can soften what they reported
- [Phase 20-03]: Cross-stage integration check runs alongside verify spawn at Final Validation gate; findings stored as integration_findings with blocking/warnings/pending arrays
- [Phase 20-03]: Registry-file drift is WARNING not blocking — registry wins per Phase 19 principle; user decides if stage file wording matters
- [Phase 20-03]: Gate decision uses four-branch logic: verify_issues x integration_findings.blocking each evaluated independently; warnings never block approval
- [Phase 20-02]: Outcome drift is auto-fixable; generic content, doctrine compliance, pre-work gaps, formative assessment, and goal-backward substantive/wired failures all require regeneration
- [Phase 20-02]: Goal-backward verification reports per-module with Exists/Substantive/Wired sub-checks — domain term extraction is the mechanism for the Substantive check
- [Phase 21]: Retry loop is content-failure-only — structural failures (completeness, registry consistency, schema) stop immediately, not enter retry loop
- [Phase 21]: Auto-fix boundary made explicit: vocabulary substitution, registry default fills, outcome drift correction — three categories only in all draft audits
- [Phase 21]: Sessions retry is per-module with 3 total attempts per module, not per check type — prevents disproportionate retry cost on multi-module programs
- [Phase 21]: Escalation format shows both auto-fixes applied and remaining failures so user sees the complete picture before deciding to edit drafts or restart
- [Phase 21-02]: Transfer Draft Audit has 10 checks: 4 standard + 6 stage-specific (transfer layers, implementation intentions, error management, spaced retrieval match, evaluation level, community continuation)
- [Phase 21-02]: Marketing Draft Audit has 7 checks: 4 standard + 3 stage-specific (source citation completeness, source element existence, marketing ratio with trim targets on retry)
- [Phase 21-02]: STATE.md update in marketing.md is conditional on promotion — not on file write — consistent with transfer.md and stages 4-6 pattern
- [Phase 21-03]: Validator covers all 33 Tier 1 checks and all 9 Tier 3 items — no stub rows remain for stages that exist
- [Phase 21-03]: Graceful degradation preserved: missing stages still get 'Not applicable' so partial pipelines validate cleanly
- [Phase 22-02]: Research content treated as equal evidence for extraction_confidence — no special tier; same High/Medium/Low/None bar applies regardless of source type
- [Phase 22-02]: Research insights stay in gap report only (not pre-populated into stage files) — downstream generators read gap report on startup, zero changes needed to any downstream command
- [Phase 22-02]: Research Insights sections are conditional and omitted when empty — preserves clean output for SMEs who don't bring research documents
- [Phase 22-01]: revise.md references stage command files by name for draft-then-audit pipeline rather than re-specifying audit checks
- [Phase 22-01]: Registry updated silently before any file regeneration — registry-first principle consistent with Phase 19
- [Phase 22-01]: Post-delivery vs mid-build distinction enforced via prerequisites: revise.md requires all stages complete, approve.md option 2 is mid-build

### Pending Todos

- Validate intake question design with Hello Alice team
- Decide on metaskill social dimension: 7th metaskill or reframe six as intrapersonal with collaborative activation

### Blockers/Concerns

- [Phase 7 flag] Metaskill-to-thinking-routine vocabulary must be reviewed against Phase 7 research before Phase 7 planning
- [Phase 4/7 flag] @react-pdf/renderer React 19 compatibility unverified

## Session Continuity

Last session: 2026-03-28T02:16:27.093Z
Stopped at: Completed 22-01-PLAN.md (revise command)
Resume file: None
