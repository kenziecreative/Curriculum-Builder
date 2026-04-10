# Phase 12: Voice System - Research

**Researched:** 2026-03-25
**Domain:** Prompt engineering — Claude Code plugin command file authoring, voice/tone consistency patterns
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Voice file structure**
- Tone-first: open with baseline voice description, then per-output-type tone modifier (marketing only), then prohibition list, then signature moves
- Baseline voice: "confident colleague" — writes like a skilled colleague who already solved the problem; clear, direct, no hedging, no filler; results-first, not process-first
- Only marketing gets a per-output-type tone modifier section (write-to-enroll, benefits-first, persuasive register); outcomes, sessions, and transfer all share the same confident-practitioner baseline
- Stay under 150 lines

**Prohibition list scope**
- Focused on ~10-15 universally wrong terms (wrong in any output, any context): schema, Bloom's, bloom_level, TMA, DCR, WIPPEA, outcome_id, YAML field names visible in output
- Command-specific terms (e.g., `implementation_intention` in transfer, `peer_accountability_structure`) stay local to each command's Persona section — not pulled into the voice file
- Voice file = documentation layer; per-command "Never say" lists = enforcement layer — both coexist

**Signature moves**
- 3 cross-cutting patterns Claude should model across all output types:
  1. Results-first framing — state what was built before any explanation
  2. Learner-subject outcomes — participant always drives the verb (never "outcomes will be…")
  3. Named-handoff close — name what was built + exact next command before context-clear nudge
- These are positive examples to model, not locked templates

**Inline guardrails (worst 4 commands)**
- Format: tight term list only — 3-5 highest-risk terms for THAT command, added as a bolded line inside the existing Persona section
- Placement: inside the existing `## Persona` section (not before Generation)
- Sessions is a special case: sessions.md orchestrator doesn't generate content — session-generator.md agent does
  - Orchestrator gets a reference to the voice file only (one line in a new minimal Persona section)
  - Session-generator agent gets the actual inline guardrails + voice file reference

**Persona audit scope**
- Audit first: identify where existing Persona sections disagree (different tones, conflicting term replacements, missing personas). Then write the voice file to resolve those conflicts.
- 4 commands missing Persona sections: sessions.md (orchestrator), approve.md, validate.md, and evaluate-mode.md — all get a voice-file-reference-only addition (one line: "Read curriculum-voice.md before generating any content")
- Do NOT change existing local "Never say" lists during Phase 12 — leave them as-is; Phase 13 handles command-level cleanup

**Phase 12 scope boundary**
- Phase 12: voice file creation + reference wiring in all 12 commands + inline guardrails in 4 worst offenders
- Phase 13: rewriting command Persona sections, trimming duplication with voice file, deeper output format changes
- Do not attempt command-level vocabulary replacement or output format changes in Phase 12

### Claude's Discretion
- Exact wording of the tone descriptor in the voice file ("confident colleague" is the model; exact phrasing is Claude's call)
- Which specific terms make the final universal prohibition list (within the guidance above)
- Exact form of the inline guardrail bolded line (as long as it's inside Persona and tight)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VOICE-01 | `curriculum-voice.md` created as shared reference — tone per output type, guardrails (terms that never appear), plain-language substitutions, signature moves | Persona audit findings establish what goes in the file; contradiction analysis determines what the baseline must resolve |
| VOICE-02 | Every command that generates user-facing content references `curriculum-voice.md` before generating | Command-by-command audit identifies exactly which 12 commands need the reference line and what form it takes per command type |
</phase_requirements>

---

## Summary

Phase 12 is a documentation and wiring phase: create one reference file, add reference lines to 12 command files, and add inline guardrails to 4. The primary technical challenge is not writing — it is the persona audit that must come first. Without auditing all 12 commands for contradictions, the voice file risks encoding a false baseline, and the inline guardrails risk duplicating terms the commands already prohibit.

The research below documents findings from a full read of all 12 commands and 1 agent. Key discoveries: the 8 commands with existing Persona sections have genuinely consistent baseline tone (warm, confident, direct, practitioner-register) but vary significantly in which terms they prohibit. The 4 commands missing Persona sections (sessions.md orchestrator, approve.md, validate.md, evaluate-mode.md) are all procedural routers or validators — they produce minimal user-facing prose, which is why they were not given Persona sections initially. The voice reference file and inline guardrails approach is well-matched to what the codebase actually needs.

**Primary recommendation:** Complete the persona audit findings table below before writing a single line of `curriculum-voice.md`. Use contradictions in the existing "Never say" lists to decide what belongs in the universal prohibition list versus stays local to each command.

---

## Persona Audit Findings

This is the core research artifact for this phase. Read all 12 commands; findings documented below.

### Commands with Existing Persona Sections (8 of 12)

| Command | Tone Description (verbatim) | "Never say" terms | "Say instead" terms | Notable |
|---------|----------------------------|-------------------|---------------------|---------|
| **intake.md** | "warm, curious, and substantive — like a trusted consultant who genuinely wants to understand what they're building" | Bloom's taxonomy, learning objectives, schema, prior_knowledge, self-direction level, Grow model, formative assessment, summative assessment, transfer context, skill type, cultural orientation, closed skill, open skill, enum | plain conversational language; specific questions | Strongest conversational persona; most prohibition terms |
| **outcomes.md** | "warm, confident, and substantive — like a trusted consultant who thinks in outcomes but speaks in plain language" | Bloom's taxonomy, bloom_level, outcome_id, schema, enum, formative assessment, transfer_context, parent_outcome_id, Bloom's | thinking level, complexity level, skills, objectives, outcomes, specific work situation, what they'll do on the job | Slightly more formal than intake; consistent baseline |
| **assessments.md** | "confident, warm, and direct — like a consultant who knows exactly what each outcome needs to be tested properly, but explains it in terms of what learners will actually do" | Bloom's taxonomy, bloom_level, paired_objective, formative assessment, summative assessment, assessment_type, schema, enum, Bloom's | complexity level, thinking level, check-in assessment, final project, how well it measures the skill, check-in activity, final assessment | "consultant" framing consistent; formative/summative fully replaced |
| **modules.md** | "confident, warm, and direct — like a consultant who already sees how the pieces fit together, and explains it in terms of what learners will experience" | module_id, bloom_level, outcome_id, schema, enum, prerequisite_modules, social_learning, metaskill, DAG, Bloom's, activity_type, interdependence_structure, accountability_mechanism | module, thinking level, learning objectives, prerequisites, collaborative activity, core thinking skill, sequence, group structure, individual accountability, group reflection prompt | Most extensive prohibition list of any command; heavy structural vocabulary |
| **metaskills.md** | "confident, warm, and direct — like a consultant who sees exactly how each skill the program develops will show up in participants' daily work" | metaskill, schema, enum, bloom_level, activation_activity, DAG, Bloom's, evidence_level, sequence_position, imagining_adjacent_practice | thinking skill, activation activity, named thinking routine, real-work connection, evidence gap, adjacent practice | Same "confident, warm, direct" pattern as modules and assessments |
| **transfer.md** | "warm, practical, and direct — focused on what participants will actually do before, during, and after the program, not on framework names or methodology labels" | transfer_context, implementation_intention, CoP, Kirkpatrick, schema, enum, peer_accountability_structure, spaced_retrieval, baseline_measurement, error_management_practice | transfer design, follow-through plan, accountability check-in, success measure, community connection, spaced follow-up, readiness check, peer accountability, error correction practice | "Warm, practical, direct" slightly differs from "confident" pattern; most prohibition terms are command-specific |
| **marketing.md** | "warm, compelling, and write-to-enroll" | curriculum_traceability, source_citation, schema, enum, bloom_level, learning_objective_id, element_type, claim_type | (no "Say instead" pairs — prohibition framed as "never expose technical fields to the user in marketing output") | Only command with write-to-enroll register; no structured "Say instead" pairs; prohibition list is schema field names only |
| **marketing.md** (constraint section) | N/A — constraint section separately reiterates: "You will understand X" is not acceptable; "You will be able to X" is the floor | (within Generation Constraints, not Persona) | "You'll walk away with X built" preferred | Marketing has two voice layers: Persona section + constraint-layer prose standards |

### Commands Missing Persona Sections (4 of 12)

| Command | Why Missing | What It Generates | Phase 12 Action |
|---------|-------------|-------------------|-----------------|
| **sessions.md** (orchestrator) | Orchestrator only — dispatches tasks, shows progress, verifies files. Produces minimal prose: progress lines, completion summary | Progress messages, completion table, "Run /curriculum:validate" prompt | Add one-line reference to voice file in new minimal Persona section |
| **approve.md** | Review gate handler — reads gate status, shows summaries, routes decisions | Stage output summaries, gate decision prompts, confirmation messages | Add one-line reference to voice file in new minimal Persona section |
| **validate.md** | Validation orchestrator — dispatches validator agent, shows pass/fail results | Pass/fail messages, issue list, quality rating display | Add one-line reference to voice file in new minimal Persona section |
| **evaluate-mode.md** | Evaluation orchestrator — dispatches evaluator agent, shows scored results | Evaluation results, strengths summary, issue list | Add one-line reference to voice file in new minimal Persona section |

Also: **resume.md** and **init.md** — reviewed and confirmed: neither has a Persona section, but both produce user-facing messages. They are not in the "4 worst offenders" and not in CONTEXT.md's explicit list of 4 missing. Research confirms these two commands do have voice-affecting output (project status display, workspace confirmation). CONTEXT.md specifies "all 12 commands" for the reference line — include resume.md and init.md in the wiring pass.

**Actual count of 12 commands (all files in commands/ directory):**
approve.md, assessments.md, evaluation-mode.md, init.md, intake.md, marketing.md, metaskills.md, modules.md, outcomes.md, resume.md, sessions.md, transfer.md, validate.md — that is 13 files.

**Discrepancy:** 13 files exist, but the phase is scoped to "all 12 commands." The file named `evaluation-mode.md` is likely what CONTEXT.md calls `evaluate-mode.md`. Count: 13 command files. Resolution: include all 13 in the reference wiring pass; CONTEXT.md's "12 commands" likely reflects the count at the time of the discussion, and the 13th (evaluate-mode.md) should receive the same one-line treatment as the other missing-Persona commands.

### Tone Contradiction Analysis

| Dimension | Findings | Conflict Level | Resolution for Voice File |
|-----------|----------|----------------|--------------------------|
| **Core register** | "consultant," "trusted colleague," "practitioner" — all 8 commands use some variant; transfer.md says "practical" instead of "confident" | LOW | Baseline: "confident colleague" as specified. "Practical" in transfer is not contradictory — it describes the content domain, not the persona register |
| **Warm** | Present in all 8 Persona sections | NONE | Include in baseline as settled |
| **Direct** | Present in 6 of 8 (not marketing, not intake) | LOW | Include in baseline; marketing's "compelling" register is an additive modifier, not a contradiction |
| **Prohibition overlap** | `schema`, `enum`, `bloom_level`, `Bloom's` appear in multiple commands' Never-say lists; these are strong universal-prohibition candidates | CONSISTENT | Move these to the universal list; they are wrong in any output context |
| **Prohibition divergence** | `Kirkpatrick`, `CoP`, `implementation_intention` appear only in transfer.md; `curriculum_traceability`, `source_citation` appear only in marketing.md | COMMAND-SPECIFIC | These stay in their respective command Persona sections per the locked decision; do NOT include in the universal file |
| **"Say instead" coverage** | Most commands have concrete substitution pairs; marketing.md does not — its prohibition is framed as "never expose technical fields" without positive alternatives | GAP | The voice file's prohibition list should include plain-language substitutions; marketing.md's approach can be normalized toward this pattern in Phase 13 |
| **Results-first framing** | Not explicitly modeled in any existing Persona section; the "You'll walk away with X built" language in marketing.md is the closest expression | ABSENT | This signature move needs to be added to the voice file as a positive example |
| **Named-handoff close** | Partially present across commands (each ends with "Run /curriculum:X" prompts) but not consistently framed as a signature pattern | WEAK | Should be formalized in the voice file |

### Universal Prohibition List — Recommended Terms

Based on cross-command analysis: terms that appear in multiple command "Never say" lists OR that represent schema internals that should never surface in any output type.

**Clearly universal (wrong in any context):**
- `schema` — appears in intake, outcomes, assessments, modules, metaskills, transfer
- `enum` — appears in intake, outcomes, assessments, modules, metaskills, transfer
- `Bloom's taxonomy` / `Bloom's` / `bloom_level` — appears in intake, outcomes, assessments, modules, metaskills
- `outcome_id` — appears in outcomes, modules
- `TMA` — referenced in session-generator; never user-facing
- `DCR` — referenced in session-generator; never user-facing
- `WIPPEA` — session template name; never user-facing
- YAML field names visible in output (the category, not every individual name)

**Claude's discretion to finalize:** The CONTEXT.md specifies ~10-15 terms. The 8 above are clearly universal. The remaining 2-7 slots could include: `metaskill` (in metaskills.md list), `DAG`, `contact_hours` (intake prohibition notes include this implicitly in the vocabulary quarantine).

**Command-specific — stay local, do NOT move to voice file:**
- `Kirkpatrick`, `CoP`, `peer_accountability_structure`, `spaced_retrieval`, `baseline_measurement`, `error_management_practice`, `implementation_intention` — transfer.md only
- `curriculum_traceability`, `source_citation`, `learning_objective_id`, `element_type`, `claim_type` — marketing.md only
- `module_id`, `prerequisite_modules`, `social_learning`, `interdependence_structure`, `accountability_mechanism` — modules.md only
- `paired_objective`, `assessment_type` — assessments.md only

### Worst-Offending Commands — Inline Guardrail Targets

| Command | Why It's a Worst Offender | Highest-Risk Terms for Inline Guardrail |
|---------|--------------------------|----------------------------------------|
| **marketing.md** | Generates persuasive copy directly facing program sponsors + enrollees; technical fields in copy would be visible to learners; write-to-enroll register makes structural jargon especially jarring | `schema`, `curriculum_traceability`, `bloom_level`, `learning_objective_id`, `element_type` |
| **transfer.md** | Generates narrative output (Gate Summary) plus YAML file — QUAL-04 requirement is "readable narrative, no YAML structure in output"; YAML field names leaking is the core risk; the gate summary is user-facing prose | `implementation_intention`, `Kirkpatrick`, `peer_accountability_structure`, `schema`, `enum` |
| **session-generator.md** (agent) | Generates 4 files per session including facilitator guides and participant materials; TMA arc labels (ACTIVATE, THEORY, METHOD, APPLY) must never appear as visible labels in output; DCR field names must not appear; most text-intensive generation in the pipeline | `TMA`, `DCR`, `WIPPEA`, `ACTIVATE`, `METHOD`, `APPLICATION` (as visible labels), `bloom_level` |
| **assessments.md** | Generates assessment alignment map; Bloom's language and outcome_id references are structurally embedded in the data model; risk of them leaking into the user-facing table is high | `Bloom's`, `bloom_level`, `paired_objective`, `outcome_id`, `formative assessment`, `summative assessment` |

**Special case resolution (from CONTEXT.md):** For sessions.md orchestrator — add voice file reference only. For session-generator.md agent — add inline guardrails plus voice file reference. This is the correct split: the orchestrator produces only short routing messages; the agent generates all content.

### Commands Currently Without Any Voice Guidance (highest risk of regression)

| Command | Current State | Voice Risk |
|---------|---------------|------------|
| **sessions.md** (orchestrator) | No Persona section | LOW — produces only progress messages and routing text |
| **approve.md** | No Persona section | MEDIUM — produces gate summaries and "complete curriculum package" display that is user-facing, enrollee-relevant |
| **validate.md** | No Persona section | LOW-MEDIUM — produces technical failure descriptions; plain-language check ID translations are already present |
| **evaluate-mode.md** | No Persona section | MEDIUM — produces evaluation results and recommendations for external curriculum; voice matters for credibility |
| **resume.md** | No Persona section | LOW — routing only |
| **init.md** | No Persona section | LOW — setup confirmation and workspace instructions |

---

## Architecture Patterns

### Reference File Pattern

This codebase already uses `.claude/reference/` for shared context:
- `.claude/reference/doctrine-how-i-teach-how-i-learn.md` — pedagogical doctrine, consulted by content-facing stages
- `.claude/reference/schemas/` — per-stage schema files, loaded as generation context

The voice file follows the same pattern: a static reference file in `.claude/reference/` that commands load before generating. This is an established, proven integration point.

**Reference loading pattern in existing commands:**
Commands load reference files via this pattern in their Generation section:
> Load `.claude/reference/schemas/stage-XX-[name].md` as generation context before generating.

The voice file reference follows the same convention. Location: `.claude/reference/curriculum-voice.md`.

### Where the Reference Line Goes — Per Command Type

Based on the audit:

**Commands with existing Persona sections (8 commands):** Add the reference line inside the existing `## Persona` section, at the top before the tone description paragraph. Format: `Read .claude/reference/curriculum-voice.md before generating any user-facing content.`

**Commands missing Persona sections — content-routing orchestrators (4 commands: sessions.md, approve.md, validate.md, evaluate-mode.md):** Add a new minimal `## Persona` section with one line only. Do not write a tone paragraph — Phase 13 handles that. Format:
```
## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.
```

**session-generator.md agent (1 agent, not command):** Add a `## Persona` section with voice file reference AND inline guardrails. This is where the sessions-domain guardrails live, not in sessions.md orchestrator.

### Inline Guardrail Format Pattern

From CONTEXT.md: tight term list inside the existing Persona section, bolded. Based on existing "Never say" patterns in the codebase:

```markdown
**Critical: Never use in any output: [term-1], [term-2], [term-3].**
```

This is consistent with the existing bolded "Never say" pattern already present in marketing.md and transfer.md. Adding the inline guardrail as a bolded critical note inside Persona (after the reference line, before the tone description) fits the existing visual grammar without requiring format changes.

### Voice File Structure

```
# Curriculum Voice

## Baseline Voice
[One paragraph: "confident colleague" description]

## Marketing — Additional Register
[One paragraph: write-to-enroll additions for marketing.md only]

## Terms That Never Appear in Output
[Table: Term | Say Instead — ~10-15 rows]

## Signature Moves
[3 pattern descriptions with brief examples]
```

This structure fits the 150-line constraint. Estimated line count: ~8 (header + intro) + ~20 (baseline voice) + ~10 (marketing modifier) + ~25 (prohibition table) + ~30 (signature moves) = ~93 lines, leaving buffer.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Per-command voice drift | A separate voice section in every command | A single `curriculum-voice.md` reference file + inline guardrails only where highest-risk | Single source of truth; changes propagate automatically |
| Universal prohibition enforcement | Duplicating the full prohibition list in every command | Inline only the top 3-5 terms per worst-offending command; point to voice file for the rest | Duplication creates maintenance debt; inline is for highest-risk terms only |
| Tone documentation | Rewriting all Persona sections in Phase 12 | Voice file as documentation layer; leave existing Persona sections intact until Phase 13 | Phase 13 is scoped for Persona cleanup; doing it in Phase 12 expands scope past the phase boundary |

---

## Common Pitfalls

### Pitfall 1: Voice File Scope Creep
**What goes wrong:** The voice file grows past 150 lines as command-specific terms get added.
**Why it happens:** It feels safer to put every prohibition in one place.
**How to avoid:** Only universally-wrong terms go in the voice file. Command-specific terms (Kirkpatrick, implementation_intention, curriculum_traceability) stay in their command's Persona section. The CONTEXT.md decision is explicit on this.
**Warning signs:** Voice file exceeds 100 lines during drafting.

### Pitfall 2: Auditing After Writing
**What goes wrong:** Writing the voice file before completing the persona audit produces a baseline that doesn't actually resolve the contradictions between existing commands.
**Why it happens:** Writing feels like progress; auditing feels like preparation.
**How to avoid:** The persona audit findings above must be the source material for the voice file. Do not draft a single line of `curriculum-voice.md` until the contradiction analysis is complete.
**Warning signs:** Voice file tone description doesn't map to the tone descriptions already in the 8 existing Persona sections.

### Pitfall 3: Inline Guardrails in the Wrong File
**What goes wrong:** Inline guardrails added to sessions.md orchestrator instead of session-generator.md agent.
**Why it happens:** sessions.md is the user-facing command; it's intuitive to put guardrails there.
**How to avoid:** The orchestrator produces routing prose only (progress lines, completion summary). The agent generates all content (facilitator guides, participant materials, slide outlines). Guardrails belong where generation happens.
**Warning signs:** sessions.md gets an inline guardrail list; session-generator.md gets only a reference line.

### Pitfall 4: Adding Persona Sections That Do More Than One Line
**What goes wrong:** The 4 commands missing Persona sections get full tone-paragraph Persona sections added in Phase 12.
**Why it happens:** It feels incomplete to add one line when other commands have full Persona sections.
**How to avoid:** Phase 13 is explicitly scoped for Persona rewriting. Phase 12 adds the voice file reference only. The one-line form IS the Phase 12 deliverable for these commands.
**Warning signs:** Approve.md, validate.md, evaluate-mode.md, or sessions.md gets more than 2-3 lines in their new Persona section.

### Pitfall 5: Counting 12 vs 13 Commands
**What goes wrong:** Missing a command in the wiring pass because the count was assumed to be 12.
**Why it happens:** The phase description says "all 12 commands" but 13 files exist in commands/.
**How to avoid:** Work from the actual file list: approve.md, assessments.md, evaluation-mode.md, init.md, intake.md, marketing.md, metaskills.md, modules.md, outcomes.md, resume.md, sessions.md, transfer.md, validate.md. Wire all 13.
**Warning signs:** evaluate-mode.md is missed in the final verification.

---

## Code Examples

### Existing Persona Section Pattern (marketing.md — strongest example)

```markdown
## Persona

You are an expert instructional designer writing enrollment marketing — your voice is warm, compelling, and write-to-enroll. The traceability requirement is the floor: every claim must be grounded in the curriculum. Within that floor, the copy must make a real person want to register. Dry curriculum summaries and neutral factual descriptions are not acceptable. Copy should answer the question: "Why should I show up?"

**Never expose technical fields to the user in marketing output:**

Never use in copy or display: curriculum_traceability, source_citation, schema, enum, bloom_level, learning_objective_id, element_type, claim_type

These fields exist in the file — they never appear in the conversation display.
```

### Proposed Pattern After Phase 12 (marketing.md)

```markdown
## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer writing enrollment marketing — your voice is warm, compelling, and write-to-enroll. The traceability requirement is the floor: every claim must be grounded in the curriculum. Within that floor, the copy must make a real person want to register. Dry curriculum summaries and neutral factual descriptions are not acceptable. Copy should answer the question: "Why should I show up?"

**Critical inline guardrail: Never use in marketing copy: schema, curriculum_traceability, bloom_level, learning_objective_id, element_type.**

Never expose technical fields to the user in marketing output:
[existing prohibition list remains]
```

The voice file reference goes at the top of Persona. The inline guardrail (tight, 3-5 highest-risk terms) is a separate bolded line. The existing prohibition list stays intact (Phase 13 will consolidate).

### Proposed Pattern for Missing Persona Commands (approve.md example)

```markdown
## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.
```

This is the complete Phase 12 addition. No tone paragraph, no prohibition list. Phase 13 will expand this.

### Proposed session-generator.md Addition

```markdown
## Persona

Read .claude/reference/curriculum-voice.md before generating any session content.

**Critical inline guardrail: TMA, DCR, WIPPEA, bloom_level, and session template names (gagne, merrill, 5e_7e, universal_tma_arc) never appear as visible labels in facilitator guides, participant materials, or slide outlines. These are structural tags only.**
```

The session-generator has no existing Persona section. This adds one. The inline guardrail covers the highest-risk terms for content generation (TMA and DCR labels appearing as section headers in generated content).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — this is a Claude Code plugin; all "tests" are runtime behavioral checks |
| Config file | None — no jest, vitest, or pytest configuration present |
| Quick run command | Manual: run `/curriculum:marketing` and verify no prohibited terms appear in output |
| Full suite command | Manual: run through a full pipeline (init → approve) and scan all conversation output for prohibited terms |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VOICE-01 | `curriculum-voice.md` exists at `.claude/reference/` with all required sections | Structural | `ls .claude/reference/curriculum-voice.md` — file exists and is under 150 lines | ❌ Wave 0 — file created in this phase |
| VOICE-01 | Prohibition table contains 10-15 universal terms with substitutions | Structural | `wc -l .claude/reference/curriculum-voice.md` — confirm < 150 lines; `grep -c "\|" .claude/reference/curriculum-voice.md` — confirm table rows | ❌ Wave 0 |
| VOICE-02 | Every content-generating command has voice file reference | Structural | `grep -l "curriculum-voice.md" .claude/plugins/curriculum/commands/*.md .claude/plugins/curriculum/agents/session-generator.md` — should return all 13 command files + agent | ❌ Wave 0 — reference lines added in this phase |
| VOICE-02 | Four worst-offending commands have inline guardrail bolded line | Structural | `grep -c "Critical inline guardrail" .claude/plugins/curriculum/commands/marketing.md` — should return 1 (repeat for transfer.md, assessments.md, and session-generator.md) | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `grep -l "curriculum-voice.md" .claude/plugins/curriculum/commands/*.md | wc -l` — count should reach 13 by end of phase
- **Per wave merge:** Full structural check: all 4 verification commands above
- **Phase gate:** All 4 structural checks pass before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `.claude/reference/curriculum-voice.md` — the file itself; created in Task 1 of this phase
- [ ] Reference lines in all 13 command files — added in Task 2
- [ ] Inline guardrails in marketing.md, transfer.md, assessments.md, session-generator.md — added in Task 3

*(No test framework infrastructure needed — verification is file-existence and grep checks.)*

---

## Sources

### Primary (HIGH confidence)
- Direct read of all 12 command files and session-generator.md agent — persona audit is first-party analysis of the codebase
- `.planning/phases/12-voice-system/12-CONTEXT.md` — locked decisions direct from user discussion
- `.planning/REQUIREMENTS.md` — VOICE-01 and VOICE-02 requirement definitions

### Secondary (MEDIUM confidence)
- `.claude/reference/doctrine-how-i-teach-how-i-learn.md` — informs why certain terms (TMA, DCR, Bloom's) are internal structural vocabulary and should never appear as user-facing labels
- Existing Persona section patterns across the 8 commands that have them — empirical baseline for what the "confident colleague" voice looks like when already implemented

### Tertiary (LOW confidence)
- None — all findings are grounded in direct file analysis

---

## Metadata

**Confidence breakdown:**
- Persona audit findings: HIGH — direct read of all files; no inference required
- Universal prohibition list: HIGH for the core 8 terms; MEDIUM for the discretionary 2-7 remaining slots (Claude's call)
- Architecture patterns: HIGH — follows established patterns already in use in the codebase
- Pitfalls: HIGH — derived from direct contradictions found in the audit

**Research date:** 2026-03-25
**Valid until:** Until any command file is modified (structural; no external dependencies)
