# Phase 7: Full Pipeline Completion - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the final three content-generation commands — `/knz-metaskills`, `/knz-transfer`, `/knz-marketing` — wire the autonomous chain from validate through to the final delivery gate, and implement the PreToolUse hook that enforces stage sequencing across all nine pipeline stages. When Phase 7 completes, the entire nine-stage pipeline is operational and delivery-ready packages can be produced end-to-end.

</domain>

<decisions>
## Implementation Decisions

### Command chaining & auto-advance
- Auto-chain: validate → metaskills → transfer → marketing runs as one autonomous pipeline after `/knz-sessions` completes
- Chain fires ONLY when Tier 1 validation is clean (zero Tier 1 failures) — failures stop the chain with a clear "Fix these before continuing" message
- No review gates between Stages 6–8 — consistent with PIPE-07 (autonomous middle stages)
- Final `/knz-approve` gate presents a full pipeline summary before marking package delivery-ready
- Final gate summary format: program overview (intake), outcome count + Bloom distribution, assessment count, module/session count, metaskill activation coverage, transfer layer summary, marketing element count, validation status — one consolidated scannable view

### /knz-metaskills generation
- Infer-and-review pattern — same as prior generation commands: silent generation, output shown, AskUserQuestion gate, free-text flag → full regeneration, write on approval
- Carries forward all prior command patterns: silent STATE.md updates, plain language, no ID vocabulary

### /knz-transfer generation
- Summary gate pattern (like `/knz-modules`): compact summary presented before writing files
- Key field to surface at gate: evaluation design — Kirkpatrick level and what's being measured. This is the most consequential field to review before locking (defines how behavioral change is measured)
- Secondary summary elements: pre-program setup, in-program application count, post-program spaced retrieval schedule + peer accountability structure
- Gate options: approve / flag an issue / start over (consistent with Phase 3/5 pattern)
- Files written on approval (not before)
- Community of Practice: scale down for short programs (90-min gets lightweight version) but never omit — even a 90-min program closes with a connection moment, join link, or follow-up check-in. Schema's simplified continuation_design for short formats is used, not skipped.

### /knz-marketing generation
- Voice: genuinely compelling, write-to-enroll. Within the traceability constraint, copy should feel like real program marketing — not a dry curriculum summary. The traceability constraint prevents puffery; within that constraint, persuasive framing is intentional.
- Audience positioning: behavioral description (can X, cannot yet Y) is translated into warm enrollment language in the `content` field. The schema language is preserved in `curriculum_traceability` fields for evidence integrity; the copy reads human.
- Traceability display at final gate: adjacent footnote style — clean marketing copy shown first, compact evidence note below each element ("→ Source: stage-02 OBJ-03 (Apply)"). Full traceability fields live in the file; conversation shows the summary format.
- Infer-and-review pattern — same as other commands, no separate gate (final delivery gate covers review)

### PreToolUse hook
- Watches: Write and Edit tool calls where the file path contains `workspace/{project}/0N-*` stage directories
- Logic: intercept → parse stage number from path → check if preceding stage is marked complete in STATE.md → block if not
- Block message format: specific and actionable — "Stage N ([Stage Name]) requires Stage N-1 to be complete. Stage N-1 is currently [status]. Run /knz-[command] to finish it first."
- Coverage: all nine stages uniformly — one hook, complete enforcement from Stage 1 through Stage 8. No exceptions for earlier stages.

### Claude's Discretion
- Exact subagent implementation for any parallel generation within Stages 6–8 (if needed)
- Detailed formatting within metaskill activation output (how thinking routines are presented)
- How the chain communicates progress between stages during autonomous run (per-stage completion lines vs. single completion message)
- Whether /knz-metaskills, /knz-transfer, /knz-marketing run fully autonomously in sequence or if user can see per-stage completion during the chain
- How PreToolUse hook reads STATE.md (shell script vs. node helper vs. inline parse)

</decisions>

<specifics>
## Specific Ideas

- The final /knz-approve gate should feel like a "this is what you built" moment — not just a checkbox. Full pipeline summary gives the user a complete picture of the package before they approve it delivery-ready.
- Marketing copy should make people want to enroll. The schema enforces that every claim is grounded — that's the floor. The ceiling is genuinely good copy.
- The adjacent footnote format for traceability ("→ Source: stage-02 OBJ-03") keeps the review clean. The user can verify claims are grounded without reading raw schema fields.
- The PreToolUse hook block message should name exactly what's missing and exactly what command to run. No ambiguity — user should know immediately what to do.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.claude/reference/schemas/stage-06-metaskills.md` — Complete metaskill schema with all validation rules, developability hierarchy, duration scaling, Imagining adjacent practice requirement
- `.claude/reference/schemas/stage-07-transfer.md` — Complete transfer ecosystem schema: pre/in/post layers, CoP design, evaluation design, skill-type adaptive rules, duration scaling
- `.claude/reference/schemas/stage-08-marketing.md` — Marketing schema with traceability constraints, ratio rule, duration scaling by element type
- `.claude/commands/knz-sessions.md` — Auto-chain trigger point: chain from sessions → validate (Phase 6) extends to → metaskills → transfer → marketing → final gate
- `.claude/commands/knz-validate.md` — Chain handoff point: after validation runs and Tier 1 is clean, chain advances to /knz-metaskills
- `.claude/commands/knz-modules.md` — Established summary-gate pattern for /knz-transfer to follow
- `.claude/agents/knz-validator.md` — Existing separate validation agent; metaskills/transfer/marketing generation runs in command context (not separate agents, unless parallel is needed)
- `.claude/hooks/session-start.md` — Existing hook; PreToolUse hook is a new hook file in `.claude/hooks/`

### Established Patterns
- Infer-and-review: silent generation → full output → AskUserQuestion gate → free-text flag → regenerate → write on approval
- Silent STATE.md updates (INFR-10): never announce state changes
- Plain language throughout: no ID vocabulary ("thinking levels" not "Bloom's taxonomy")
- Separate agent rule (VALD-05): validation is a separate agent; generation commands are not
- Skill invocation chaining: discuss→plan→execute pattern (GSD); sessions→validate now extends to →metaskills→transfer→marketing
- AskUserQuestion gate with approve/flag/start-over + destructive confirmation on start-over (Phase 3/5)

### Integration Points
- `workspace/{project}/05-metaskills/` — New: `/knz-metaskills` writes `metaskill-map.md` on approval
- `workspace/{project}/06-transfer/` — New: `/knz-transfer` writes `transfer-ecosystem.md` on approval
- `workspace/{project}/07-marketing/` — New: `/knz-marketing` writes `marketing-package.md` on approval
- `workspace/{project}/STATE.md` — Each command reads prior stage completion, writes its own stage complete
- `.claude/hooks/pre-tool-use.md` (or `.claude/settings.json` hook config) — New PreToolUse hook file
- `.claude/commands/knz-approve.md` — Extended: final delivery gate (PIPE-06) added to existing approve command scope
- `dashboard/` — Stage 9 ValidationReport already wired; Stages 6-8 output files appear in deliverable navigation via existing workspace-loader auto-discovery

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-full-pipeline-completion*
*Context gathered: 2026-03-22*
