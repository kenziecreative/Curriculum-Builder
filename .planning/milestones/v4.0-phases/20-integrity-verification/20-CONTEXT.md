# Phase 20: Integrity & Verification - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

The tool catches its own failures — vocabulary violations, outcome drift, generic content, broken links, and doctrine violations are flagged before the user sees the output. This phase expands the existing draft-then-audit mechanism (built in Phase 19) into a comprehensive integrity system that runs at every content stage, adds cross-stage tracing, goal-backward session verification, and anti-softening enforcement to all checking agents. It does NOT add new pipeline stages, change the generation flow, or create new user-facing commands.

</domain>

<decisions>
## Implementation Decisions

### Integrity agent architecture
- Expand the existing Phase 19 draft-then-audit mechanism — not a separate agent
- The 4 existing checks (completeness, registry consistency, vocabulary, schema) get extended with new failure modes: outcome drift, generic content, broken cross-stage links, missing formative assessment, pre-work gaps, doctrine violations
- All 7 failure modes are real risks — implement all of them as named checks
- Auto-fix mechanical issues (vocabulary substitution, missing field fill), block on content-level problems (generic content, outcome drift, doctrine violations)
- Runs at every content stage (stages 2-8), with each stage running the subset of checks relevant to its output

### Cross-stage integration check
- Part of the integrity agent — same mechanism, different check set — not a separate operation
- At final approval, runs the full cross-stage subset; during individual stages, runs only relevant subset (e.g., "do these assessments reference real outcomes?")
- Distinguishes "pending" (target stage not yet generated) from "broken" (target stage exists but doesn't contain the referenced ID) — follows existing validator pattern (T1-19+ marked "Not applicable")
- Checks registry AND actual stage files — if they disagree, report the drift
- Registry-file drift is a warning, not a blocking failure — matches Phase 19 "registry wins" philosophy; user decides if it matters
- Bidirectional tracing — check both directions (e.g., every assessment references a real outcome AND every outcome has at least one assessment)
- Traces three link types: outcome IDs, assessment links, module references — these are the structural backbone
- Additive to existing knz-validator — no duplication, no replacement; validator keeps its checks, integrity agent adds what validator doesn't cover
- Findings folded into the approve.md summary — no standalone traceability report; SME sees one unified view
- Auto-triggered when approve.md is invoked for the final gate — user doesn't invoke it separately

### Goal-backward session verification
- "Exists" — session files were created
- "Substantive" — session activities, examples, and discussion prompts contain topic-specific nouns from the module's content domain; generic placeholder content ("discuss the key concepts") fails; content should name the actual things being learned
- "Wired" — session references pre-work that was assigned, builds on previous sessions, and sets up what comes next; a session that could be rearranged in any order within the module isn't wired; this is about pedagogical flow being structurally real, not just labeled
- Stage 5 only — later stages have their own integrity checks via cross-stage tracing

### Anti-softening enforcement
- Primary concern: rationalizing failures away — the agent finds a problem but talks itself into "close enough"
- Explicit "Verification Integrity" rules section in each agent's prompt — not a shared reference file
- Applies to 5 files: knz-validator.md, the integrity agent, curriculum-evaluator.md, verify.md, approve.md — every file that makes or presents a pass/fail judgment
- Includes a prohibited-qualifier word list: words like "approximately", "mostly", "essentially", "close enough", "acceptable" that cannot be used when reporting check results
- Core rule: "A check either passes its defined criteria or it fails. No middle ground."

### Claude's Discretion
- Exact check definitions per stage (which of the 7 failure modes apply to stages 2, 3, 4, 5, 6, 7, 8)
- How to detect generic content (specific heuristics for matching topic-specific nouns from module specs against session content)
- How to detect "wired" sessions (what constitutes sufficient pre-work reference and sequencing evidence)
- Exact wording of the Verification Integrity section and prohibited-qualifier list
- Whether the expanded draft-then-audit mechanism needs architectural changes or just additional check functions added to the existing pattern

</decisions>

<specifics>
## Specific Ideas

- Generic content detection should check that session activities name the actual things being learned — "Analyze this specific customer complaint using the HEARD framework" is substantive; "Discuss the key concepts" is generic
- Anti-softening is primarily about preventing rationalization — the system looking like it worked when it didn't. The most dangerous form is when a check technically ran but the judgment was weak
- Cross-stage integration findings should feel like part of the approval summary, not a separate audit step — the SME sees one unified view of what passed and what needs attention

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 19 draft-then-audit pipeline: 4 checks (completeness, registry consistency, vocabulary, schema) in modules.md, sessions.md, metaskills.md — extend with new failure modes
- session-generator.md post-write verification scan (lines 396-415) — pattern for vocabulary and prohibited term detection
- knz-validator.md: T1-01 through T1-18 checks, 3 report files — integrity agent is additive, not replacement
- curriculum-registry.json: canonical data source for cross-stage tracing
- curriculum-voice.md: never-say table (31 entries) — vocabulary checks reference this

### Established Patterns
- Draft-then-audit: generate to _drafts/, run checks, auto-fix vocab, promote if all pass — integrity agent extends this pattern
- Validator check IDs (T1-XX): numbered check identification system — integrity checks could follow similar naming
- Three-layer vocabulary enforcement (voice ref + inline guardrail + never-say list) — integrity agent inherits this for its own output
- "Not applicable — Stage N not yet generated" pattern in validator — reuse for pending-vs-broken distinction

### Integration Points
- approve.md: Final gate needs cross-stage integrity check auto-triggered before presenting summary
- modules.md, sessions.md, metaskills.md: Existing draft-then-audit sections need expanded check sets
- knz-validator.md: Needs Verification Integrity section added (anti-softening)
- curriculum-evaluator.md: Needs Verification Integrity section added (anti-softening)
- verify.md: Needs Verification Integrity section added (anti-softening)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 20-integrity-verification*
*Context gathered: 2026-03-27*
