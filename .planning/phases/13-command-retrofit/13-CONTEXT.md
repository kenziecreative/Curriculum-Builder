# Phase 13: Command Retrofit - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit all 12 commands and the session-generator agent so every output reads as a clean, polished result: no visible scaffolding, no insider vocabulary, warm handoffs between stages, context-clear nudges, and elevated content quality in the three highest-impact output types (slide outlines, facilitator notes, marketing prose). Schema write-format changes for marketing and transfer happen in the same pass as the corresponding command changes.

</domain>

<decisions>
## Implementation Decisions

### Plan structure

4 plans, in this order:

1. **10 commands** — structural hiding + vocabulary replacement + warm handoffs + context-clear nudge. Uniform change type; safe to batch. Commands: `init.md`, `intake.md`, `outcomes.md`, `assessments.md`, `modules.md`, `metaskills.md`, `validate.md`, `approve.md`, `resume.md`, `evaluation-mode.md`.
2. **marketing.md** — output format change (YAML → prose) + PAS/DOS quality upgrade. Schema write instruction updated in the same plan.
3. **transfer.md** — output format change (YAML → narrative prose) + plain headings. Schema write instruction updated in the same plan.
4. **session-generator.md** — slide outline format, facilitator note diagnostic depth, TMA label suppression, HTML comment stripping, NEEDS: marker enforcement.

Rationale: baseline patterns established across the 10 simpler commands before tackling the three hardest targets. Each command gets one pass covering structural hiding + vocabulary replacement — not two separate passes.

### Marketing output format

- Written file (`07-marketing/marketing-package.md`) changes from YAML to pure markdown prose
- File structure: program description → learning promises → audience positioning (prose paragraphs, copy-paste-ready)
- Traceability at bottom only: compact audit table with three columns: `| Claim | Source | Strength |`
- Traceability data never wraps around or interrupts the prose copy
- Schema (`stage-08-marketing.md`) stays as the field spec — only the write instruction in `marketing.md` changes

### Transfer output format

- Written file (`06-transfer/transfer-ecosystem.md`) changes from YAML to readable narrative with plain headings
- No YAML structure visible in the written file
- Schema (`stage-07-transfer.md`) stays as the field spec — only the write instruction in `transfer.md` changes

### Slide outline format (session-generator.md)

- Three-field prose blocks per slide:
  - **On screen:** what appears on the slide (title, key visual, bullets if any)
  - **Why it matters:** pedagogical intent — what this slide is doing for the learner
  - **Facilitator:** what to say or do while this slide is showing
- Organized with plain section headings: Opening / Core Content / Practice / Close (no TMA arc labels)
- Slides numbered sequentially within sections
- Format encoded in session-generator.md instructions only — not in the session schema

### Facilitator notes format (session-generator.md)

- Fixed three-part structure per note:
  - **Watch for:** observable learner behavior
  - **What it means:** what that behavior signals about learner state
  - **Your move:** specific facilitation action to take
- Appears in `facilitator-guide.md` only — not in `session.md` or participant materials
- Format encoded in session-generator.md instructions only — not in the session schema

### Claude's Discretion

- Exact wording of the plain section headings in slide outlines (Opening / Core Content / Practice / Close are the model; exact labels are Claude's call as long as no TMA vocabulary appears)
- Whether to include an estimated timing indicator per slide section
- Exact Persona section rewrites for the 10 batched commands (must be consistent with curriculum-voice.md baseline; specific tone phrasing is Claude's call)

</decisions>

<specifics>
## Specific Ideas

- Each command gets one pass — not two separate passes for structural and vocabulary changes
- session-generator.md is the highest-impact target because it produces the most content volume; it gets its own plan
- Schema files stay as field specs; write instructions in commands change to produce prose output
- The three-field slide format (On screen / Why it matters / Facilitator) is the production-direction model Kelsey wants — facilitators should be able to run a session from the outline alone

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets

- `curriculum-voice.md` — already written and wired to all 13 commands; baseline voice and prohibition list are the source of truth for all vocabulary cleanup in this phase
- `marketing.md` Persona — already has the strongest inline guardrails; Phase 13 upgrades the write instruction, not the persona
- `transfer.md` Persona — already has inline guardrails for transfer-specific vocabulary; Phase 13 upgrades the write instruction
- `sessions.md` orchestrator — does not generate content; only session-generator.md needs format changes

### Established Patterns

- Command files follow: description frontmatter → Output Formatting reference → title heading → Persona → Prerequisites → Generation sections
- Persona sections already reference `curriculum-voice.md` in all 13 commands (wired in Phase 12)
- Warm handoff close is already modeled in the voice file Signature Moves section (Named-handoff close) — commands need to implement it, not invent it
- Context-clear nudge is a new pattern this phase — "your work is saved — clear context before the next step" (per PRES-07)

### Integration Points

- `stage-08-marketing.md` schema — write instruction updated in Plan 2 (same commit as marketing.md changes)
- `stage-07-transfer.md` schema — write instruction updated in Plan 3 (same commit as transfer.md changes)
- `session-generator.md` agent — Plan 4 target; receives slide format and facilitator note structure as explicit generation instructions
- `sessions.md` orchestrator — no format changes needed; orchestrator routes to session-generator

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 13-command-retrofit*
*Context gathered: 2026-03-25*
