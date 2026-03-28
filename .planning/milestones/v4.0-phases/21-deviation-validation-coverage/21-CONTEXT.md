# Phase 21: Deviation & Validation Coverage - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

The tool handles problems cleanly — small fixable issues resolve automatically, real problems escalate to the user, and validation covers the full pipeline not just the first half. This phase adds structured deviation handling (auto-fix → retry → escalate) to all draft-audit stages, extends the draft-then-audit pipeline to stages 7-8 (Transfer and Marketing), and ensures validation coverage runs end-to-end through stage 8. It does NOT add new pipeline stages, change the generation flow, or create new user-facing commands.

</domain>

<decisions>
## Implementation Decisions

### Deviation escalation policy (DEVL-01)
- 3-attempt regeneration limit per file — when a blocking failure is found, regenerate the failing content with the failure reason injected as a constraint, then re-audit
- Cumulative constraint injection — attempt 2 carries failure 1's reason, attempt 3 carries failures 1+2's reasons; generator gets progressively more specific guidance about what NOT to do
- Per-file budget, not per-check — a file with 2 different blocking failures (e.g., generic content AND doctrine compliance) gets 3 total attempts, not 3 per failure type
- After 3 failed attempts: stop the stage, show all 3 failure reports to the user, drafts stay in `_drafts/` for manual editing
- Report and wait on escalation — no prescriptive menu of next-step options; user decides what to do (re-run, edit draft, move on)

### Stages 7-8 draft-then-audit pipeline (DEVL-02 partial)
- Transfer (stage 7) and Marketing (stage 8) get the full `_drafts/` draft-then-audit pipeline — same pattern as stages 4-6
- Transfer draft audit checks (beyond standard 4): coverage of all three transfer layers (pre/in/post-program), implementation intentions reference specific modules, spaced retrieval prompts match outcome count, community continuation isn't placeholder text — maps to T1-25 through T1-30
- Marketing draft audit checks (beyond standard 4): every marketing claim traces to an actual curriculum element (source_citation), marketing word count stays under 25% of curriculum content — maps to T1-31 through T1-33
- Same 3-attempt retry pattern as stages 4-6 — consistent across all draft-audit stages

### Escalation presentation
- Plain language: problem + location + suggestion — "This session uses placeholder language instead of naming specific skills" with file/section location and a concrete suggestion like "The session about conflict resolution should reference the HEARD framework by name"
- Shows both auto-fixes applied AND remaining failures — brief summary of auto-fixes ("Fixed 3 vocabulary issues, corrected outcome wording in 2 places") alongside detailed breakdown of what still needs attention
- Same vocabulary enforcement as all other user-facing output — follows curriculum-voice.md, no ID jargon in escalation messages

### Auto-fix boundaries
- Keep it tight — only three categories are auto-fixable: vocabulary substitution (from canonical table), missing fields with obvious defaults (from registry), outcome drift correction (replace with registry canonical wording)
- No content-level auto-fixes — anything involving content judgment (rewording, adding substance, rewriting sections) triggers regeneration, not a patch
- Auto-fix logging: silent on success (content promoted, user never sees fix list); brief log only during escalation so user sees the system tried before stopping

### Claude's Discretion
- Whether deviation handling is inline in each command or in a shared reference file — pick what works best given the Phase 20 pattern (Verification Integrity is inline per-file)
- Exact check definitions for stages 7-8 (which of the expanded failure modes apply beyond the T1-XX checks)
- How to structure the cumulative constraint injection technically (prompt format, placement within regeneration instructions)
- Whether to add any new failure modes specific to stages 7-8 beyond the existing T1-25 through T1-33

</decisions>

<specifics>
## Specific Ideas

- The 3-attempt retry with cumulative constraints is designed to give the generator progressively tighter guidance — each failure teaches the next attempt what specifically to avoid
- Auto-fix boundary is intentionally narrow: the system should never silently change content decisions. Only mechanical, deterministic fixes (vocab swaps, registry data fills, drift corrections) qualify
- Escalation showing both auto-fixes and remaining failures builds user trust — the system worked hard before stopping, not just giving up on the first problem
- Stages 7-8 getting the full draft pipeline closes the last validation gap — every content stage now has a promotion gate, not just the middle of the pipeline

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 19 draft-then-audit pipeline: 4 standard checks (completeness, registry consistency, vocabulary, schema) in modules.md, sessions.md, metaskills.md — extend to transfer.md and marketing.md
- Phase 20 expanded checks: 7 failure modes (outcome drift, generic content, broken cross-stage links, missing formative assessment, pre-work gaps, doctrine violations, vocabulary violations) — subset applies to stages 7-8
- session-generator.md post-write verification scan (lines 396-415) — pattern for vocabulary and prohibited term detection
- curriculum-voice.md: never-say table (31 entries) — vocabulary audit references this canonical list
- knz-validator.md: T1-19 through T1-33 check definitions — these are the source of truth for what stages 6-8 need validated

### Established Patterns
- Draft-then-audit flow: generate to `_drafts/`, run checks, auto-fix vocab, promote if all pass — this is the pattern being extended
- "Not applicable — Stage N not yet generated" pattern in validator — reuse for pending-vs-broken distinction in cross-stage checks
- Verification Integrity sections inline per-file (Phase 20) — deviation handling may follow this pattern
- Three-layer vocabulary enforcement (voice ref + inline guardrail + never-say list) — escalation messages must comply

### Integration Points
- transfer.md: Needs `_drafts/` directory creation, draft-write flow, 4 standard checks + stage-specific checks (T1-25 to T1-30), 3-attempt retry logic, escalation presentation
- marketing.md: Needs `_drafts/` directory creation, draft-write flow, 4 standard checks + stage-specific checks (T1-31 to T1-33), 3-attempt retry logic, escalation presentation
- modules.md, sessions.md, metaskills.md: Need 3-attempt retry logic added to existing draft-then-audit sections (currently stop on first blocking failure)
- All draft-audit stages: Need cumulative constraint injection mechanism for retry attempts
- All draft-audit stages: Need escalation presentation format (problem + location + suggestion + auto-fix summary)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 21-deviation-validation-coverage*
*Context gathered: 2026-03-27*
