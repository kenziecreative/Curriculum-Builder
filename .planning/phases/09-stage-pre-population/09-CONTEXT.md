# Phase 9: Stage Pre-population - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

After audit mode intake completes and the user approves the gate, `/curriculum:intake` automatically writes draft stage files (`01-outcomes/`, `02-assessments/`, `03-modules/`, `04-sessions/`) from the source content Claude already read. Downstream commands (`/curriculum:outcomes`, `/curriculum:assessments`, `/curriculum:modules`, `/curriculum:sessions`) then detect these drafts and enter enforcement-and-enrichment mode rather than generation mode. Missing stages are untouched — downstream commands generate fresh from project brief for those. Clean intake path is unchanged.

</domain>

<decisions>
## Implementation Decisions

### Trigger and timing
- Pre-population runs automatically inside `/curriculum:intake`, immediately after the user approves the intake gate — no separate command
- Eligible stages: both **Exists** and **Shallow** entries from the gap report; **Missing** stages are skipped entirely
- All eligible stages write simultaneously in one pass at the end of intake — not one-at-a-time as user runs each downstream command
- After pre-population, show a summary table: `Stage | What was written | Issues found` (Bloom violations, missing fields flagged with count). Then: "Run `/curriculum:outcomes` to review and enforce schema."
- Sessions pre-population is **structure only**: session list, topic-to-outcome mapping, session template placeholder, pre-work if found in source materials. No attempt to write full facilitator guides, participant materials, or slide outlines — those are generation work.

### Downstream detection
- Pre-populated stages get status `pre-populated` in STATE.md — new enum value (distinct from `not-started`, `in-progress`, `complete`)
- When a downstream command detects `pre-populated` status: display the draft, run all enforcement steps silently (Bloom correction, verb replacement, etc.) against the existing content, show corrected version, then gate: "Looks good / Flag an issue / Start over"
- If user chooses "Start over" from a pre-populated draft: wipe the stage files, status → `not-started`, command restarts generation from project brief
- Pre-hook (`pre-tool-use.sh`) treats `pre-populated` the same as `in-progress` — prior stage must reach `complete` before next stage unlocks. Pre-populated ≠ approved.
- Pre-hook message when prior stage is `pre-populated`: "Stage N has a draft ready — run `/curriculum:[command]` to review and approve it first." (forward-looking, not blocking-error tone)

### Schema enforcement mode
- Pre-population writes extracted content faithfully. Where it fails schema, add inline markers in the file: `# NEEDS: [specific violation] — /curriculum:[command] will fix this`
- Violations are also surfaced in the post-intake summary table ("Issues found" column), so user knows what enforcement will address before they get to each stage
- Full silent auto-correction happens inside the downstream command's enforcement pass, not during pre-population write

### Partial coverage handling
- Stages marked **Missing** in the gap report: no pre-populated files written, STATE.md status stays `not-started`, downstream commands run their normal generation flow — zero special handling
- The gap report (from Phase 8) is the signal for what to pre-populate vs. generate — Phase 9 reads it, doesn't recreate it

### Claude's Discretion
- Exact inline marker format in pre-populated files (as long as it's human-readable and references the fixing command)
- Whether to batch or sequence violation checks during the pre-population write pass
- How to handle edge cases where gap report is absent (e.g., user ran clean intake then tries to trigger pre-population somehow)

</decisions>

<specifics>
## Specific Ideas

- The pre-population summary table mirrors the gap report format (same stages, same Exists/Shallow framing) but adds a "What was written" and "Issues found" column — continuity from what the user saw in the gap report
- The session structure pre-population should look like a session manifest: session names, which outcomes map to each, template TBD marker — enough for `/curriculum:sessions` to dispatch Tasks with real context rather than inferring from scratch

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `intake.md` audit mode section: already reads source documents and produces gap report — pre-population runs as a continuation of this same session, reusing what Claude already has in context
- `stage-02-outcomes.md` through `stage-05-sessions.md` schemas: define exactly what fields pre-populated files need to contain (and flag as NEEDS: where absent)
- AskUserQuestion gate pattern (`approve / flag an issue / start over`): established in Phase 3, reused by downstream commands in enforcement mode — pre-populated state enters exactly this gate after enforcement pass
- STATE.md `Stage Progress` status enum: needs `pre-populated` added as a new valid value between `not-started` and `in-progress`

### Established Patterns
- Silent enforcement before display (Phase 3): user never sees uncorrected intermediate state — applies in the downstream command's enforcement pass, not during pre-population write (write first with markers, enforce when user runs the command)
- Forward-looking blocked-command messages (Phase 7): "Run X to finish Stage N first" — `pre-populated` status uses same message style
- Progress announced per file during reading (Phase 8): same pattern applies if pre-population needs to announce per-stage writes
- One-pass simultaneous file writes (Phase 5): all stage files written at once, not progressively — pre-population follows the same rule

### Integration Points
- `workspace/{project}/curriculum-gap-report.md`: Phase 9 reads this to determine which stages are Exists/Shallow/Missing — it's the input signal for what to write
- `workspace/{project}/STATE.md`: needs `pre-populated` as a valid Stage Progress status value added to the schema
- `pre-tool-use.sh` PREREQ check: needs to handle `pre-populated` status — treat as equivalent to `in-progress` (blocks advancement, shows forward-looking message)
- Each downstream command's state-branch logic: add `pre-populated` branch alongside existing `not-started`, `in-progress`, `complete` branches

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-stage-pre-population*
*Context gathered: 2026-03-23*
