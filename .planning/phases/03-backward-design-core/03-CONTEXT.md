# Phase 3: Backward Design Core - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Build two commands — `/knz-outcomes` and `/knz-assessments` — that generate structurally enforced, aligned learning objectives and assessments. Schemas already exist (stage-02-outcomes.md, stage-03-assessments.md). This phase is about command behavior: how generation runs, how schema constraints are enforced during generation (not post-hoc), and the human review gate after assessment design that prevents Stage 4 from starting without explicit approval.

</domain>

<decisions>
## Implementation Decisions

### Outcome generation UX
- `/knz-outcomes` generates immediately on run — reads intake data from STATE.md, generates all outcomes without asking clarifying questions first. Intake already captured everything the schema needs.
- Silent generation — no progress commentary. Full output appears when done.
- After generation, output is shown inline in conversation. AskUserQuestion: approve / flag an issue / regenerate. Mirrors the intake confirmation pattern.
- If user flags an issue: free-text description of what's wrong → command takes feedback and regenerates a revised set.

### Bloom's distribution enforcement
- When generated objectives don't span the required Bloom's levels: auto-add objectives at missing levels. User sees the full set including added ones, with added objectives noted.
- Hard block — always enforced. No exceptions, no user negotiation. Schema duration scaling already handles size-based minimums (short=2, medium=3, long=4).
- If generated objectives contain prohibited verbs (understand, know, appreciate): auto-replace with schema-valid Bloom's verbs at the same level. User never sees the vague version.
- After distribution check passes: show a Bloom's distribution summary — a table with level | count | example verb — making pedagogical rigor visible without requiring the user to know what Bloom's is.

### Assessment review gate design (PIPE-05)
- Post-assessment gate lives inline at the end of `/knz-assessments` — same pattern as intake gate. No separate `/knz-approve` command needed for this gate.
- User sees the assessment alignment map (objectives → assessments with Bloom match column) at the gate, then AskUserQuestion with the three-option approve/concern/start-over pattern established in Phase 2.
- If user selects "concern": free-text description → command revises assessments and re-presents the alignment map before asking again.
- After gate approval: brief confirmation line, STATE.md updated silently, Stage 3 marked complete, next step shown ("Next: /knz-modules").

### Misalignment auto-correction
- If assessment Bloom level is below paired objective: auto-elevate silently before showing output. User never sees a misaligned version.
- If an objective has no paired assessment: auto-generate a missing assessment and include it in output. User reviews with everything already paired.
- Validation badge: if all checks pass (coverage, Bloom match, formative per module), show a brief line before the alignment map: "✓ All objectives paired — Bloom's levels aligned".
- Brief note after any auto-corrections: state what was added/elevated and why. Transparent without being noisy. Example: "I added an assessment for MO-2-3 and elevated FA-4 to Evaluate to match its objective."

### Claude's Discretion
- Exact wording of the Bloom's distribution summary table
- How to handle edge cases where duration scaling conflicts (e.g., a very short program where 4 levels is impossible)
- Whether `/knz-outcomes` writes files before or after inline review (files written on approval)
- Persona tone calibration for the brief framing before outcome generation

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.claude/reference/schemas/stage-02-outcomes.md` — Complete outcomes schema with all required fields, enum values, Bloom's distribution rules, duration scaling, and validation rules. `/knz-outcomes` generates output matching this schema.
- `.claude/reference/schemas/stage-03-assessments.md` — Complete assessments schema with assessment_id, paired_objective, bloom_level constraints (must match or exceed objective), format enum, skill_type constraints, formative/summative requirements.
- `.claude/commands/knz-intake.md` — Established command pattern: thematic batching, AskUserQuestion for decisions, inline confirmation gate, incremental STATE.md saves. `/knz-outcomes` and `/knz-assessments` follow similar structure without the thematic question rounds.

### Established Patterns
- Schema-in-prompt enforcement: commands include the relevant schema file as generation context. No runtime validation until Phase 6. Both new commands follow this pattern.
- AskUserQuestion for all categorical decisions (INFR-06): approve/flag/regenerate for outcomes; approve/concern/start-over for assessment gate.
- Silent STATE.md updates (INFR-10): never announce "updating STATE.md".
- Expert instructional designer persona (INFR-11): no ID vocabulary with user. Bloom's distribution table shows levels without using "Bloom's" — use "complexity level" or just the verb tier labels.

### Integration Points
- `workspace/{project-name}/STATE.md` — Commands read Stage 2 status; Stage 3 gate approval written here.
- `workspace/{project-name}/01-outcomes/` — `/knz-outcomes` writes: enduring-understandings.md, essential-questions.md, learning-objectives.md (on approval).
- `workspace/{project-name}/02-assessments/` — `/knz-assessments` writes: assessment-map.md, formative-assessments.md, summative-assessments.md (on approval).
- `.claude/commands/` — New command files: `knz-outcomes.md`, `knz-assessments.md`.

</code_context>

<specifics>
## Specific Ideas

- The Bloom's distribution summary should feel like evidence of quality, not a technical report. Frame it for a non-ID user: "Your program covers 5 cognitive levels — from remembering facts to creating new plans" rather than "Bloom's distribution: 5/6 levels covered."
- The auto-correction transparency note should be concise and confident, not apologetic — the command is doing its job by catching and fixing these, not making a mistake.
- The inline assessment gate mirrors the intake confirmation pattern — AskUserQuestion with approve/concern/start-over. The alignment map IS the evidence that justifies approval.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-backward-design-core*
*Context gathered: 2026-03-19*
