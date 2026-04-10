# Phase 12: Voice System - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a shared voice reference file (`curriculum-voice.md`) that defines what all generated content sounds like — baseline tone, per-output-type tone modifiers (marketing only), a focused universal prohibition list, and signature move examples. Wire every command that generates user-facing content to read this file. Add critical inline guardrails to the 4 worst-offending commands (marketing, transfer, sessions, assessments). Conduct a persona audit of all 12 commands before writing the voice file, to surface contradictions and resolve them in the file itself. Phase 13 handles command-level cleanup.

</domain>

<decisions>
## Implementation Decisions

### Voice file structure
- Tone-first: open with baseline voice description, then per-output-type tone modifier (marketing only), then prohibition list, then signature moves
- Baseline voice: "confident colleague" — writes like a skilled colleague who already solved the problem; clear, direct, no hedging, no filler; results-first, not process-first
- Only marketing gets a per-output-type tone modifier section (write-to-enroll, benefits-first, persuasive register); outcomes, sessions, and transfer all share the same confident-practitioner baseline
- Stay under 150 lines

### Prohibition list scope
- Focused on ~10-15 universally wrong terms (wrong in any output, any context): schema, Bloom's, bloom_level, TMA, DCR, WIPPEA, outcome_id, YAML field names visible in output
- Command-specific terms (e.g., `implementation_intention` in transfer, `peer_accountability_structure`) stay local to each command's Persona section — not pulled into the voice file
- Voice file = documentation layer; per-command "Never say" lists = enforcement layer — both coexist

### Signature moves
- 3 cross-cutting patterns Claude should model across all output types:
  1. **Results-first framing** — state what was built before any explanation
  2. **Learner-subject outcomes** — participant always drives the verb (never "outcomes will be…")
  3. **Named-handoff close** — name what was built + exact next command before context-clear nudge
- These are positive examples to model, not locked templates

### Inline guardrails (worst 4 commands)
- Format: tight term list only — 3-5 highest-risk terms for THAT command, added as a bolded line inside the existing Persona section
- Placement: inside the existing `## Persona` section (not before Generation)
- Sessions is a special case: sessions.md orchestrator doesn't generate content — session-generator.md agent does
  - Orchestrator gets a reference to the voice file only (one line in a new minimal Persona section)
  - Session-generator agent gets the actual inline guardrails + voice file reference

### Persona audit scope
- Audit first: identify where existing Persona sections disagree (different tones, conflicting term replacements, missing personas). Then write the voice file to resolve those conflicts.
- 4 commands missing Persona sections: sessions.md (orchestrator), approve.md, validate.md, and evaluate-mode.md — all get a voice-file-reference-only addition (one line: "Read curriculum-voice.md before generating any content")
- Do NOT change existing local "Never say" lists during Phase 12 — leave them as-is; Phase 13 handles command-level cleanup

### Phase 12 scope boundary
- Phase 12: voice file creation + reference wiring in all 12 commands + inline guardrails in 4 worst offenders
- Phase 13: rewriting command Persona sections, trimming duplication with voice file, deeper output format changes
- Do not attempt command-level vocabulary replacement or output format changes in Phase 12

### Claude's Discretion
- Exact wording of the tone descriptor in the voice file ("confident colleague" is the model; exact phrasing is Claude's call)
- Which specific terms make the final universal prohibition list (within the guidance above)
- Exact form of the inline guardrail bolded line (as long as it's inside Persona and tight)

</decisions>

<specifics>
## Specific Ideas

- "Confident colleague" is the baseline: writes like a skilled colleague who already solved the problem — clear, direct, no hedging, no filler
- The voice file is documentation; per-command inline lists are enforcement — both layers are needed
- Sessions special case: inline guardrails belong in session-generator.md agent, not sessions.md orchestrator
- Phase 12 ends when the voice file exists and every command references it; command cleanup is Phase 13

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- 8 of 12 commands already have `## Persona` sections with "Never say / Say instead" lists — these are the source material for the persona audit
- Strongest existing personas: marketing.md and intake.md (most complete tone + prohibition treatment)
- Weakest/missing: sessions.md (orchestrator has no Persona), approve.md, validate.md, evaluate-mode.md

### Established Patterns
- Persona section format is consistent across the 8 commands that have it: tone description paragraph → "Never say / Say instead" bolded pairs
- Voice file goes in `.claude/reference/` (sibling to `doctrine-how-i-teach-how-i-learn.md` which already lives there)
- Commands reference other `.claude/reference/` files via `@` syntax in their execution context

### Integration Points
- Voice file: `.claude/reference/curriculum-voice.md` (new file)
- All 12 command Persona sections need a reference line added
- Session-generator agent: `.claude/plugins/curriculum/agents/session-generator.md` — add inline guardrails here, not in sessions.md orchestrator

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 12-voice-system*
*Context gathered: 2026-03-25*
