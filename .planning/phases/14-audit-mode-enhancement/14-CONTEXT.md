# Phase 14: Audit Mode Enhancement - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Refactor the monolithic audit mode block in `intake.md` into a dedicated `curriculum-auditor.md` specialist agent with a contractual return format. Add `content_quality` as a second per-stage dimension (alongside the existing `extraction_confidence`). Wire `modules.md` and `sessions.md` to read the mode assignment and handle existing content appropriately — validating strong content, enriching partial content, generating from scratch when absent. The clean intake path is unchanged.

</domain>

<decisions>
## Implementation Decisions

### Auditor agent trigger
- `intake.md` spawns `curriculum-auditor.md` as a Task subagent — same pattern as `sessions.md` spawning `session-generator.md`
- Auditor runs in its own context; returns structured output to intake.md
- `curriculum-auditor.md` must have an explicit Completion Signal section specifying the exact return format before being wired to intake.md

### Auditor return storage
- Auditor writes results to a file in `workspace/{project}/00-project-brief/` (name TBD — e.g., `audit-results.md`)
- intake.md reads the file after the agent returns
- Downstream commands (modules.md, sessions.md) read the same file to determine mode

### Auditor return format
- Markdown table per stage: `Stage | extraction_confidence | content_quality | summary`
- intake.md parses this table to determine: what follow-up questions to ask, what mode to assign per stage
- Completion Signal section in curriculum-auditor.md specifies this exact structure

### Isolation testing
- Plan includes a checkpoint task: run `curriculum-auditor.md` against the reference test case (6-session AI agent workflows workshop — facilitator guide + slide deck) before wiring to intake.md
- Verify Completion Signal returns correct format
- Only wire to intake.md after the checkpoint passes

### content_quality levels
- Determined by schema completeness, using the same rubric as the gap report
- **strong** = all required schema fields present and meet quality criteria
- **partial** = fields present but don't meet criteria (wrong Bloom's level, missing transfer_context, etc.)
- **absent** = no content found in source documents
- Mode selection uses `content_quality` exclusively — `extraction_confidence` drives follow-up question decisions, not mode assignment

### Three-mode routing
- **gap-fill** (`content_quality: absent`) — generate fresh from the project brief
- **enrich** (`content_quality: partial`) — keep valid fields, generate only what's missing or violating; mark added fields NEW, changed fields UPDATED in the summary table
- **hands-off** (`content_quality: strong`) — load pre-populated file, run enforcement checks, surface any NEEDS: markers or violations, present gate without regenerating

### Commands that read mode
- `modules.md` and `sessions.md` only — both already have `pre-populated` state branches; mode routing slots into those branches
- `outcomes.md` and `assessments.md` are out of scope for this phase

### Side-by-side diff trigger
- Always show comparison when in enrich or hands-off mode (content_quality: partial or strong)
- Triggered in modules.md (and sessions.md if applicable) before writing any files

### Side-by-side diff format
- Two-column table per module: `Module | From your materials | What will be added/changed`
- Each proposed change includes a one-line plain-language reason
- No schema field names, no ID references in the diff display
- After the diff: same gate pattern — approve / flag an issue / start over

### Mode confirmation UX
- Surfaced after extraction table, before follow-up questions
- Displayed as a stage table with plain-language "What will happen" descriptions:
  - gap-fill → "Build from scratch"
  - enrich → "Fill in what's missing"
  - hands-off → "Keep what you have and validate it"
- Mode names (gap-fill / enrich / hands-off) never shown to user — plain language only
- Confirmation gate: "Looks good" / "Change what happens to a stage" / "Start over"
- "Change what happens to a stage" allows per-stage mode override before any processing begins

### Claude's Discretion
- File name for audit results file in 00-project-brief/
- Exact wording of the Completion Signal format in curriculum-auditor.md
- How to handle `pre-populated` state when audit-results.md is absent (e.g., user manually dropped in files without running audit mode)
- Ordering of follow-up questions within the confirmation pass

</decisions>

<specifics>
## Specific Ideas

- Reference test case for isolation testing: 6-session × 90-min AI agent workflows workshop for developers. Existing materials: facilitator guide (detailed: session structure, exercises, facilitation notes, research appendix) + slide deck outline. Expected: strong extraction_confidence for program topic, format, audience; expected content_quality partial for outcomes (behavioral format likely missing), absent for transfer design and metaskills.
- The two dimensions must stay explicitly separate: `extraction_confidence` answers "was the content found?" — `content_quality` answers "is what was found strong enough to leave alone?" A document can have High extraction_confidence and still have partial content_quality (found it, but it doesn't meet schema requirements).

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `intake.md` Audit Mode section (Steps 1–6, ~350 lines): Full extraction logic, confidence rubric, conflict resolution rules, follow-up question templates, gap report structure — all move to curriculum-auditor.md. intake.md becomes the dispatcher.
- `session-generator.md`: Model for how a Task subagent agent file is structured — objective, instruction sections, Completion Signal. curriculum-auditor.md follows the same pattern.
- `modules.md` `pre-populated` branch: Already handles the case where module content exists. Mode routing slots into this branch — hands-off and enrich replace the current single behavior.
- `sessions.md` `pre-populated` branch: Same — existing branch gets mode-aware branching added.

### Established Patterns
- Vocabulary quarantine: never expose schema field names, enum values, or instructional design terminology — applies to all user-facing output from the auditor and mode confirmation display
- State management is always silent — no "I'm saving your progress" announcements
- Gate pattern: approve / flag an issue / start over (established Phase 2, used in intake, modules, sessions)
- Task subagent with Completion Signal: session-generator.md models the expected format

### Integration Points
- `workspace/{project}/00-project-brief/` — auditor writes results file here alongside project-brief.md and curriculum-gap-report.md
- `workspace/{project}/STATE.md` — mode assignment per stage may need to be stored here so downstream commands can read it without re-parsing the audit results file
- `modules.md` `pre-populated` branch — mode routing wires in here
- `sessions.md` `pre-populated` branch — mode routing wires in here

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 14-audit-mode-enhancement*
*Context gathered: 2026-03-25*
