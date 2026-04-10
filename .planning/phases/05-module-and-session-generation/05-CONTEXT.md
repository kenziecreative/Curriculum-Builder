# Phase 5: Module and Session Generation - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build two commands — `/knz-modules` and `/knz-sessions` — that generate a sequenced module structure and complete session content (TMA arc, DCR scaffolding, social learning, facilitator guides, participant materials, slide outlines) using parallel subagents so the main session context doesn't collapse. Schemas already exist (stage-04-modules.md, stage-05-sessions.md). This phase is about command behavior, generation flow, review gate design, parallelization pattern, and file organization.

</domain>

<decisions>
## Implementation Decisions

### /knz-modules generation UX
- Infer and review pattern — same as /knz-outcomes and /knz-assessments: command reads intake + outcomes + assessments, generates the full module structure silently, then presents for review. No structuring questions before generating.
- On approval: write all module spec files simultaneously (not progressively). Generate-first, write-on-approval matches established pattern.
- If user flags an issue: free-text description → full regeneration (not targeted patching). Consistent with /knz-assessments "flag an issue" behavior.
- Start over option uses destructive confirmation nested AskUserQuestion (established in Phase 3).

### Module review gate summary view
- Gate shows a compact summary table: module name | objectives covered | sessions planned | primary metaskill | belief being challenged.
- Sequence rationale in 1-2 sentences above the table.
- Belief-challenging encounter is the right field to surface at the gate (not social learning type) — it tells the user what each module is *actually disrupting*, which is catchable before session generation runs.
- Social learning type visible in the written module-spec.md files but not in the gate summary.
- Gate options: approve / flag an issue / start over — consistent with Phase 3 pattern.
- After approval: brief confirmation line, STATE.md updated silently, Stage 4 marked complete, next step shown ("Next: /knz-sessions").

### Session generation trigger
- Separate command invocation — user runs `/knz-sessions` explicitly after `/knz-modules` completes. No auto-chaining. Clean separation, natural pause point between module structure and session content. Consistent with /knz-outcomes → /knz-assessments → /knz-modules sequence.
- `/knz-sessions` generates all sessions for all modules in one invocation. No per-module triggering. Subagents handle each module's sessions in parallel.
- Progress visibility: per-module completion updates as subagents finish ("Module 1 sessions done — 2 remaining"). Between fully silent and verbose — user can see generation is happening without being overwhelmed.
- No review gate at session completion — module structure was already approved. Write all session files automatically when subagents complete, then show a brief completion summary.
- Completion summary: list of all sessions generated per module, total session count, STATE.md updated, next step shown ("Next: /knz-validate" or the relevant Phase 6 command).

### Materials file layout
- Per-session directory structure: `04-sessions/M-1-S-1/` contains `session.md`, `facilitator-guide.md`, `participant-materials.md`, `slide-outline.md`.
- `session.md` is the full TMA arc spec (all 8 required fields + DCR elements + header fields) — what the validation agent reads in Phase 6.
- `facilitator-guide.md`, `participant-materials.md`, `slide-outline.md` are derived extractions formatted for actual use — not raw schema output.
- Module specs stay in `03-modules/` (sequence-rationale.md + per-module module-spec.md). Stage boundary maintained. Sessions in `04-sessions/`, modules in `03-modules/`.

### Claude's Discretion
- Exact subagent implementation pattern for spawning per-module workers (Task agents vs. Agent tool)
- How /knz-sessions distributes work: one subagent per module, or one per session
- Facilitator guide formatting within facilitator-guide.md (how timing cues are presented, etc.)
- Slide outline formatting within slide-outline.md
- Pre-work content in participant-materials.md when pre-work is "none"
- Error handling if a subagent fails mid-generation

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.claude/reference/schemas/stage-04-modules.md` — Complete module schema: module_id, module_name, learning_objectives (refs to Stage 02), prerequisite_modules (DAG), content_chunks with cognitive_load_note, social_learning (all 4 sub-fields required), primary_metaskill (6-value enum), metaskill_activation_activity (specific thinking routines only), belief_challenging_encounter, modality_switches.
- `.claude/reference/schemas/stage-05-sessions.md` — Complete session schema: all 8 TMA arc fields required, DCR fields (conditional on open skill + Analyze+), facilitator_notes (3 sub-fields), participant_materials (3 sub-fields), slide_framework_outline (4 sub-fields per entry), session_template enum (5 values), reflection_type enum (4 values).
- `.claude/commands/knz-outcomes.md` — Established infer-and-review pattern: silent generation, full output appears, AskUserQuestion gate, free-text flag → regenerate cycle, files written on approval.
- `.claude/commands/knz-assessments.md` — Established alignment map gate pattern: approve/flag/start-over with destructive confirmation on start-over, auto-corrections noted transparently.

### Established Patterns
- Schema-in-prompt enforcement: commands include the relevant schema as generation context. Subagents generating session content must also receive the stage-05-sessions.md schema.
- AskUserQuestion for all categorical decisions (INFR-06): gate with approve/flag/start-over.
- Silent STATE.md updates (INFR-10): never announce "updating STATE.md".
- Expert instructional designer persona (INFR-11): no ID vocabulary with user.
- Approve-before-write pattern (Phase 3): files written on gate approval, not before.
- State progression: Stage 4 → complete after /knz-modules approval; Stage 5 → complete after /knz-sessions writes all files.

### Integration Points
- `workspace/{project-name}/03-modules/` — `/knz-modules` writes: `sequence-rationale.md`, `M-1/module-spec.md`, `M-2/module-spec.md`, etc. (on approval).
- `workspace/{project-name}/04-sessions/M-1-S-1/` — `/knz-sessions` writes: `session.md`, `facilitator-guide.md`, `participant-materials.md`, `slide-outline.md` per session (auto-write on completion).
- `workspace/{project-name}/STATE.md` — /knz-modules reads Stage 3 status (must be complete); writes Stage 4 complete on approval. /knz-sessions reads Stage 4 status; writes Stage 5 complete on finish.
- `.claude/agents/` — New subagent file(s) for session generation workers.
- `.claude/commands/knz-modules.md`, `.claude/commands/knz-sessions.md` — New command files.

</code_context>

<specifics>
## Specific Ideas

- Progress updates during /knz-sessions should match the pattern: brief per-module lines as each subagent completes ("Module 1 sessions done — 2 remaining"). Not a spinner, not verbose — just enough to know it's working.
- The belief-challenging encounter in the module gate summary is the pedagogically meaningful field to show — it tells the user what each module is actually disrupting, which is the thing most likely to be wrong and most important to catch before session generation runs.
- Facilitator guide, participant materials, and slide outline are "derived extractions" — they're not separate schemas, they're the relevant fields from session.md formatted for their audience (facilitator vs. learner vs. presenter). The distinction matters for how subagents should produce them.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-module-and-session-generation*
*Context gathered: 2026-03-20*
