# Phase 22: New Capabilities - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Two additive features for a completed pipeline: `/curriculum:revise` lets users bring post-delivery feedback back into the pipeline for targeted revision with downstream propagation, and audit mode intake gains richer extraction when research documents are provided alongside regular source material. No existing commands change behavior. No new pipeline stages.

</domain>

<decisions>
## Implementation Decisions

### Revise command entry point (FEAT-01)
- User runs `/curriculum:revise` inside an existing completed project workspace — no separate import step
- Opens with free description, not a stage picker — SMEs think in problems, not pipeline stages. User describes what changed after delivery in plain language
- Optional category tagging (learner feedback, facilitator observations, content updates, scope changes) helps Claude route but is not required
- Claude maps the description to affected stages, shows the mapping with proposed changes, and waits for user confirmation before touching anything
- Supports multiple revision rounds in one session — after each cycle completes, asks "Anything else to revise?"
- Clearly distinct from in-process approve.md revision — this is explicitly for after delivery, not mid-build corrections

### Feedback analysis (FEAT-01)
- After user describes feedback, Claude asks targeted follow-ups about areas the user didn't mention — "Did you notice anything about pacing?" or "How did the transfer activities land?" — not a full interview, just gap probing
- Feedback categorized as fixes (something didn't work) vs. evolutions (something worked but could be better) — fixes get priority; evolutions are optional
- Categorization shown to user as part of the stage mapping confirmation — user sees what's a fix vs. what's an improvement before approving changes

### Change propagation (FEAT-01)
- Registry updated first, then downstream stages regenerated — consistent with Phase 19 "registry wins" principle
- Claude identifies every downstream file affected by the change, shows the impact map, and asks user which to regenerate — nothing changes without approval
- Targeted file regeneration only — if outcome MO-2-1 changed, only sessions under Module 2 get regenerated, not the entire sessions stage
- Regeneration uses the full draft-then-audit pipeline (write to _drafts/, 7-check audit, 3-attempt retry, promote) — same quality guarantees as first-time generation

### Revision tracking (FEAT-01)
- Lightweight revision log (revision-log.md) in project workspace — date, what changed, which stages affected, fix vs. evolution
- Git handles actual file history; revision log is human-readable summary for quick reference across delivery cycles

### Research input recognition (FEAT-02)
- No special mode or separate research intake — auditor handles research documents the same way it handles facilitator guides and slide decks
- Research gives the auditor more material to reach High confidence — a skill decomposition explicitly states outcomes in a way a slide deck doesn't
- Same confidence bar: High still means "explicitly stated in source material"
- Non-schema research insights (misconception inventories, expert-novice differences, transfer barriers, practitioner workflow quirks) captured in the gap report's relevant stage sections — downstream generators can read these
- User does not need to label documents as "research" — auditor recognizes the content type from the material itself

### Claude's Discretion
- Exact gap-probing questions for /curriculum:revise feedback capture (which areas to probe based on what user described)
- How to present the fix vs. evolution categorization in the stage mapping confirmation
- Whether revision-log.md is a new file or appended section in an existing project file
- How to structure gap report "Research insights" subsections per stage
- Technical approach for targeted file regeneration (how to identify affected files from registry links)

</decisions>

<specifics>
## Specific Ideas

- SMEs should never need to know pipeline stages to describe feedback — "Session 3 was too long and learners struggled with the hands-on exercise" is a complete input. Claude does the stage mapping internally
- The fix vs. evolution distinction mirrors how facilitators naturally debrief: "what broke" vs. "what could be better next time"
- Research input support is intentionally minimal — the auditor already reads everything, research just gives it richer material. No new user-facing complexity
- Revision log serves the "delivered Jan, revised Feb, revised again Apr" use case — SME can see the evolution of a curriculum across delivery cycles

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `intake.md` audit mode flow (lines 434-575): Document ingestion → auditor spawn → confidence table → follow-up → mode selection — research input extends this same flow
- `curriculum-auditor.md`: Agent that extracts against stage schemas — needs enrichment for research insight capture in gap report
- `approve.md` inline revision (lines 346-355): Existing pattern for describing an issue → Claude revises → registry updated — `/curriculum:revise` is the post-delivery version of this pattern
- `curriculum-registry-schema.md`: Four linked sections (learner_profile, outcome_wording, assessment_criteria, time_allocations) with parent references and `last_updated` timestamps — propagation engine
- Draft-then-audit pipeline in modules.md, sessions.md, metaskills.md, transfer.md, marketing.md: Full 7-check audit with 3-attempt retry — reused for revision regeneration

### Established Patterns
- Registry-first data flow (Phase 19): Registry is authoritative; stage files read from registry. Revise updates registry first, then regenerates
- Vocabulary quarantine: All user-facing text follows curriculum-voice.md — revise command output and feedback probing must comply
- Stage status tracking in STATE.md: Regenerated stages need status updates (back to in-progress during regen, complete after promotion)
- Targeted regeneration: session-generator.md already generates per-module — pattern for file-level targeting exists

### Integration Points
- New command file: `.claude/plugins/curriculum/commands/revise.md`
- Revision log: `workspace/{project}/revision-log.md` (new file)
- Gap report enrichment: `workspace/{project}/00-project-brief/curriculum-gap-report.md` gains "Research insights" subsections
- STATE.md: Revision cycles may temporarily set downstream stages back to in-progress
- Registry: `/curriculum:revise` writes to registry before triggering downstream regen

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 22-new-capabilities*
*Context gathered: 2026-03-27*
