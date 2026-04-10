# Phase 13: Command Retrofit - Research

**Researched:** 2026-03-25
**Domain:** Claude Code plugin command files — output presentation, vocabulary enforcement, content quality
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Plan structure:** 4 plans, in this order:
1. **10 commands** — structural hiding + vocabulary replacement + warm handoffs + context-clear nudge. Commands: `init.md`, `intake.md`, `outcomes.md`, `assessments.md`, `modules.md`, `metaskills.md`, `validate.md`, `approve.md`, `resume.md`, `evaluation-mode.md`.
2. **marketing.md** — output format change (YAML → prose) + PAS/DOS quality upgrade. Schema write instruction updated in the same plan.
3. **transfer.md** — output format change (YAML → narrative prose) + plain headings. Schema write instruction updated in the same plan.
4. **session-generator.md** — slide outline format, facilitator note diagnostic depth, TMA label suppression, HTML comment stripping, NEEDS: marker enforcement.

Rationale: baseline patterns established across the 10 simpler commands before tackling the three hardest targets. Each command gets one pass covering structural hiding + vocabulary replacement — not two separate passes.

**Marketing output format:**
- Written file (`07-marketing/marketing-package.md`) changes from YAML to pure markdown prose
- File structure: program description → learning promises → audience positioning (prose paragraphs, copy-paste-ready)
- Traceability at bottom only: compact audit table with three columns: `| Claim | Source | Strength |`
- Traceability data never wraps around or interrupts the prose copy
- Schema (`stage-08-marketing.md`) stays as the field spec — only the write instruction in `marketing.md` changes

**Transfer output format:**
- Written file (`06-transfer/transfer-ecosystem.md`) changes from YAML to readable narrative with plain headings
- No YAML structure visible in the written file
- Schema (`stage-07-transfer.md`) stays as the field spec — only the write instruction in `transfer.md` changes

**Slide outline format (session-generator.md):**
- Three-field prose blocks per slide:
  - **On screen:** what appears on the slide (title, key visual, bullets if any)
  - **Why it matters:** pedagogical intent — what this slide is doing for the learner
  - **Facilitator:** what to say or do while this slide is showing
- Organized with plain section headings: Opening / Core Content / Practice / Close (no TMA arc labels)
- Slides numbered sequentially within sections
- Format encoded in session-generator.md instructions only — not in the session schema

**Facilitator notes format (session-generator.md):**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PRES-01 | All command output hides constraint enforcement steps — user sees result and brief plain-language callout only | Constraint enforcement sections already exist and run silently; the gap is that some commands surface step-by-step language in their transparency notes and section headings |
| PRES-02 | All insider terms replaced with plain language across every command | curriculum-voice.md prohibition table is the canonical source; gap analysis below identifies per-command leaks |
| PRES-03 | `/curriculum:outcomes` output uses structured ASCII formatting (box header, section dividers, tree hierarchy per backlog spec) | outcomes.md Output Presentation section needs formatting upgrade; currently uses plain markdown headers |
| PRES-04 | `/curriculum:assessments` output replaces alignment map with human-readable summary | assessments.md uses an "Assessment Alignment Map" table with outcome_id and Bloom Match columns — Outcome ID column is an insider term leak |
| PRES-05 | `/curriculum:modules` output removes all numbered constraint enforcement steps; keeps module table + sequence rationale paragraph | modules.md gate summary table is clean; transparency note uses "I adjusted N item(s)" — already clean-ish, but Constraint Enforcement section headings may surface |
| PRES-06 | All stage-completing commands end with warm synthesizing handoff paragraph | Named-handoff close is modeled in curriculum-voice.md; most commands have a brief forward-looking line but not a full synthesizing paragraph |
| PRES-07 | All stage-completing commands include context-clear nudge | No command currently includes this — it is a new pattern this phase |
| PRES-08 | `/curriculum:init` introduces dashboard with launch instructions; `/curriculum:sessions` and `/curriculum:validate` remind user dashboard has updated | init.md already has dashboard launch block; sessions.md and validate.md need dashboard reminder added |
| QUAL-01 | Slide outlines written as production direction (what goes on slide + intent + facilitator rationale) | session-generator.md currently writes slide-outline.md as a table with TMA Phase column — needs full format replacement |
| QUAL-02 | Facilitator notes include diagnostic direction: what to observe, what it signals, what move to make | session-generator.md facilitator-guide.md format has Timing Guide, Common Stumbling Points, Transition Notes — but no Watch for / What it means / Your move diagnostic structure |
| QUAL-03 | Marketing files are copy-paste-ready prose (PAS/DOS structure, VOC language, benefits-first) — traceability in separate section | marketing.md currently writes YAML to marketing-package.md; write instruction change required |
| QUAL-04 | Transfer ecosystem file is readable narrative with plain headings — no YAML structure in output | transfer.md currently writes YAML to transfer-ecosystem.md; write instruction change required |
| QUAL-05 | Session content shows full objective text everywhere IDs appear in conversation output | session-generator.md references outcome_ids in session.md headers (e.g., "## THEORY: Learning Objectives" lists IDs only) |
| QUAL-06 | NEEDS: markers fully resolved before any file is marked complete | validate.md and session-generator.md both need NEEDS: marker checks added |
| QUAL-07 | TMA phase labels never appear as visible labels in facilitator guides, participant materials, or slide outlines | session-generator.md currently writes "## ACTIVATE:", "## THEORY:", "## METHOD:", "## PRACTICE:", "## REFLECT:", "## TRANSFER:", "## DCR:" as section headers in session.md and uses TMA Phase column in slide-outline.md |
| QUAL-08 | HTML calculation comments and working notes stripped from all session output files | session-generator.md needs explicit strip instruction before writing any session file |
| QUAL-09 | Writing for Clarity principles applied across all generated content (kernel sentences, precise language, no warm-up copy) | curriculum-voice.md already prohibits filler phrases; QUAL-09 extends this to content generation, not just output formatting |
</phase_requirements>

---

## Summary

Phase 13 is a pure text-transformation phase. No new logic is being added to the plugin — every task is editing existing command files to change what users see, how content is written to disk, and how the agent formats its session output. There is no external library research needed; the domain is entirely internal to the codebase.

The research reveals three tiers of change complexity. The 10 batched commands (Plan 1) share a uniform change type: add or upgrade the Persona section, replace vocabulary that leaks past existing guardrails, add the warm handoff close, and add the context-clear nudge. These are mechanical edits with a clear pattern that can be applied consistently. The marketing and transfer commands (Plans 2-3) require a format change in the write instruction — the schema stays as the field spec but the file written to disk changes from YAML to prose. The session-generator (Plan 4) requires the most careful surgery because it controls the highest content volume: the slide outline format is being replaced wholesale, the facilitator note structure is being upgraded, and TMA label suppression needs to be extended beyond the inline guardrail to the actual output templates.

The most important planning insight: the current slide-outline.md output format is a table with a TMA Phase column. That column must be removed and the entire file format replaced with the three-field prose block structure. This is not a small edit — it is a full template replacement for one of the four session output files.

**Primary recommendation:** Treat Plans 1-3 as mechanical edits with a repeatable pattern. Plan 4 requires full template replacement of slide-outline.md format and structural upgrade of facilitator-guide.md — allocate separate tasks per output file type.

---

## Current State Audit

### Per-Command Gap Analysis

This is the diagnostic the planner needs to scope each task precisely.

#### `init.md`
- Persona: present (one-line, no tone description) — needs tone description added
- Vocabulary leaks: none visible in current output sections
- Warm handoff: has a brief "Let's start" line but no synthesizing paragraph — needs upgrade
- Context-clear nudge: absent — needs addition
- Dashboard: already has launch block (step 5b) — PRES-08 requirement met
- Stage-completing: YES (completes workspace setup, chains to intake)

#### `intake.md`
- Persona: present with vocabulary replacement table — already strong
- Vocabulary leaks: `self-direction level`, `schema`, `enum` appear in persona Never-say list (correctly) but may appear in Thematic Group section labels
- Warm handoff: need to verify approval branch close — likely needs upgrade
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 1)

#### `outcomes.md`
- Persona: present with vocabulary replacement table
- Vocabulary leaks: `bloom_level:` appears as a field label in the `learning-objectives.md` write format (line 248-250) — this is in the written file, not the conversation, but needs checking against QUAL-05
- Output format: PRES-03 requires structured ASCII formatting (box header, section dividers, tree hierarchy) — current format uses plain markdown headers; this is the biggest change for this command
- Warm handoff: approval branch ends with a paragraph — assess whether it meets the synthesizing standard
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 2)

#### `assessments.md`
- Persona: present with vocabulary replacement table
- Vocabulary leaks: Assessment Alignment Map table uses "Outcome ID" column header (PRES-04 flags this)
- PRES-04: "replaces alignment map with human-readable summary (count + what learners do + what it covers)" — this is a significant change to the gate display, not just vocabulary cleanup
- The written file `assessment-map.md` uses the full alignment table with outcome_id column — needs to change to human-readable format
- Warm handoff: approval branch ends with a brief confirmation — needs upgrade
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 3)

#### `modules.md`
- Persona: present with vocabulary replacement table
- Vocabulary leaks: `module_id` appears in module-spec.md write format header (`**Module ID:** [module_id]`) — written file, not conversation
- Output format: gate summary table is already relatively clean; sequence rationale paragraph is present
- PRES-05: "removes all numbered constraint enforcement steps" — the constraint enforcement section runs silently; the transparency note ("I adjusted N item(s)") is already clean
- Warm handoff: approval branch has brief confirmation — needs upgrade
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 4)

#### `metaskills.md`
- Persona: present with vocabulary replacement table; `metaskill` in Never-say list
- Vocabulary leaks: gate display uses `activation_activity`, `transfer_prompt` as labels (lines 131-135) — these are field-name leaks
- Warm handoff: approval branch has one-line "Thinking skills mapped" — too brief; needs upgrade
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 6, auto-triggers transfer)

#### `validate.md`
- Persona: present (one-line reference only) — needs tone description
- PRES-08: needs dashboard reminder added (sessions.md and validate.md both need it)
- QUAL-06: needs NEEDS: marker check in validation output — validate should flag if any session file contains unresolved NEEDS: markers
- Warm handoff: all-pass path ends with "Run /curriculum:approve" — needs synthesizing paragraph
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (completes Stage 9, auto-triggers metaskills on pass)

#### `approve.md`
- Persona: present (one-line reference only) — needs tone description
- Vocabulary leaks: "Post-Assessment gate", "Final Validation gate" are internal pipeline terms — assess whether these need plain language substitutes
- Warm handoff: approval branch says "Approved. {Next stage described.}" — very brief; needs upgrade
- Context-clear nudge: absent — needs addition
- Stage-completing: YES (marks gates approved, routes to next stage)

#### `resume.md`
- Persona: present (one-line reference only) — needs tone description
- Not stage-completing — it is an orientation command
- Warm handoff and context-clear nudge: not applicable (resume routes, does not complete a stage)
- Vocabulary: "Stage {N}" references are fine; "Review gate pending" is acceptable plain language

#### `evaluation-mode.md`
- Persona: present (one-line reference only) — needs tone description
- Not pipeline stage-completing (eval is standalone)
- Warm handoff: Conversation Output ends with report reference — assess if this needs a closing line
- PRES-02: check IDs are already translated to plain language in the output

### Vocabulary Leak Inventory

Terms that appear in user-facing output sections (conversation display or written file format templates) across all commands. The prohibition list comes from `curriculum-voice.md`.

| Leaked Term | Location | Command(s) |
|-------------|----------|------------|
| `bloom_level:` as field label | learning-objectives.md write format | outcomes.md |
| `Outcome ID` column header | Assessment Alignment Map table | assessments.md |
| `Bloom Match` column header | Assessment Alignment Map table | assessments.md |
| `paired_objective:`, `bloom_level:` as field labels | formative/summative-assessments.md write format | assessments.md |
| `module_id` as field label | module-spec.md write format | modules.md |
| `activation_activity`, `transfer_prompt` as display labels | metaskill gate display | metaskills.md |
| `## ACTIVATE:`, `## THEORY:`, `## CHECK:`, `## METHOD:`, `## PRACTICE:`, `## REFLECT:`, `## TRANSFER:`, `## DCR:` | session.md template | session-generator.md |
| `TMA Phase` column | slide-outline.md table | session-generator.md |
| `session_template:` as field label | session.md header | session-generator.md |
| `**Template:**` with enum values | facilitator-guide.md header | session-generator.md |
| `**TMA Phases:** ACTIVATE > THEORY > ...` | facilitator-guide.md header | session-generator.md |

### Commands Without Explicit Tone Descriptions in Persona

These commands have a one-line `Read .claude/reference/curriculum-voice.md` reference but no tone description:
- `validate.md`
- `approve.md`
- `resume.md`
- `evaluation-mode.md`
- `sessions.md` (orchestrator — routes only, but still generates user-facing output)

Per the Phase 12 decision: "6 commands missing Persona sections get minimal one-line Persona only — Phase 13 will add tone descriptions in a single pass." Phase 13 delivers those tone descriptions.

### Session-Generator Format: Current vs Required

This is the highest-complexity change in the phase.

**Current `slide-outline.md` format:**
```
# Slide Framework: [session_name]
**Session:** [M-N-S-N] | **Template:** [session_template]

| Section | TMA Phase | Slides | Purpose |
|---------|-----------|--------|---------|
[one row per slide_framework_outline entry]
[section_name | tma_phase | estimated_slides | content_notes]
```

Problems: exposes TMA Phase column (QUAL-07), session_template (PRES-02), and provides no production direction (QUAL-01).

**Required `slide-outline.md` format (per CONTEXT.md decisions):**
```
# [session_name] — Slide Outline

## Opening
**Slide 1 — [slide title]**
- **On screen:** [what appears on the slide]
- **Why it matters:** [pedagogical intent]
- **Facilitator:** [what to say or do]

**Slide 2 — [slide title]**
[same three-field block]

## Core Content
[numbered slides continuing sequentially]

## Practice
[...]

## Close
[...]
```

**Current `facilitator-guide.md` format:**
```
# Facilitator Guide: [session_name]
**Session ID:** [M-N-S-N]
**Total Duration:** [N] minutes
**Template:** [session_template]
**TMA Phases:** ACTIVATE > THEORY > CHECK > METHOD > PRACTICE > REFLECT > TRANSFER

## Session at a Glance
[...]

## Timing Guide
| Time | Activity | Facilitator Action |

## Common Stumbling Points
1. [stumbling point] — [facilitator response]

## Transition Notes
[...]
```

Problems: exposes `Template:` field with enum value, `TMA Phases:` with arc labels (QUAL-07, PRES-02).

**Required facilitator note additions (QUAL-02):** Each stumbling point needs the three-part diagnostic structure:
```
**Watch for:** [observable learner behavior]
**What it means:** [what that behavior signals about learner state]
**Your move:** [specific facilitation action to take]
```

**Current `session.md` template problems:**
- Section headers use TMA arc labels verbatim: `## ACTIVATE:`, `## THEORY:`, `## CHECK:`, `## METHOD:`, `## PRACTICE:`, `## REFLECT:`, `## TRANSFER:`, `## DCR:`
- `**session_template:**` uses enum value as label
- QUAL-05: `## THEORY: Learning Objectives` lists outcome_ids only — needs full objective text alongside IDs

### Marketing Write Instruction: Current vs Required

**Current write instruction (marketing.md line 117):**
> Write `workspace/{project}/07-marketing/marketing-package.md` with complete schema-compliant YAML content.

**Required:** Write as pure markdown prose. Program description → learning promises → audience positioning as copy-paste-ready prose paragraphs. Traceability at bottom only as compact audit table `| Claim | Source | Strength |`.

The schema (`stage-08-marketing.md`) stays unchanged. Only the write instruction in marketing.md changes, and the schema's "write instruction" note (if any) needs to match.

### Transfer Write Instruction: Current vs Required

**Current write instruction (transfer.md line 179):**
> Write `workspace/{project}/06-transfer/transfer-ecosystem.md` with complete schema-compliant YAML content.

**Required:** Write as readable narrative document with plain headings. Three sections: Before the Program / During the Program / After the Program. Content within each section is prose, not YAML key-value pairs.

### Missing Patterns: Warm Handoff and Context-Clear Nudge

**Warm synthesizing handoff** (PRES-06): The voice file models this as Named-handoff close:
> "You have 7 outcomes and 14 assessments. Run `/curriculum:modules` to organize them into a program sequence."

Current state: most commands end with a brief one-liner like "Run `/curriculum:assessments`." The upgrade is to add the synthesizing sentence that names what was built, before the next-step line.

**Context-clear nudge** (PRES-07): New pattern, absent from every command. Required wording per requirements: "your work is saved — clear context before the next step." Must appear in every stage-completing command.

Stage-completing commands (where both patterns are required):
- `init.md` — completes workspace setup, chains to intake
- `intake.md` — completes Stage 1
- `outcomes.md` — completes Stage 2
- `assessments.md` — completes Stage 3
- `modules.md` — completes Stage 4
- `sessions.md` — completes Stage 5 (orchestrator, but generates summary output)
- `metaskills.md` — completes Stage 6
- `transfer.md` — completes Stage 7
- `marketing.md` — completes Stage 8
- `validate.md` — completes Stage 9
- `approve.md` — completes gate reviews

Note: `resume.md` and `evaluation-mode.md` do not complete pipeline stages — warm handoff and context-clear nudge are not applicable to them.

---

## Architecture Patterns

### Command File Structure (Established Pattern)

Every command follows this structure (do not deviate):
```
---
description: [one-line description]
---

## Output Formatting
[skill reference line — unchanged in Phase 13]

# /curriculum:[command-name]
[Brief plain-language description]

## Persona
Read .claude/reference/curriculum-voice.md before generating any user-facing content.
[Tone description — paragraph]
[Critical inline guardrail: Never use: ...]
[Never use / Say instead table]

## Prerequisites
[...]

## Generation / Behavior
[...]
```

Phase 13 edits are confined to: Persona section (add tone description), output display sections (vocabulary replacement, format changes), file write instructions (format changes for marketing and transfer), and closing sections (warm handoff + context-clear nudge).

### The One-Pass Rule

Per CONTEXT.md: "Each command gets one pass — not two separate passes for structural and vocabulary changes." This means:
- The planner must scope each task to cover ALL changes for a given command file
- No task should touch only vocabulary or only structure for a command — both happen in the same task
- This applies even when the changes are different types (persona upgrade + vocabulary + handoff + nudge = one task per command)

### Schema Stays Unchanged

The write instruction in `marketing.md` and `transfer.md` changes. The schema files (`stage-08-marketing.md`, `stage-07-transfer.md`) stay as field specs. Only the instruction about how to format the written output file changes.

Exception: if the schema file contains a write instruction or output format note, that note should be updated to match. Read both schema files before writing tasks — the relevant sections are at the end of each schema file.

### Session-Generator: Instructions vs Schema

The slide outline format and facilitator note diagnostic structure are encoded in `session-generator.md` instructions only — not in `stage-05-sessions.md`. This means:
- `stage-05-sessions.md` schema is unchanged
- `session-generator.md` output file templates are rewritten
- The `slide_framework_outline` field in the schema still exists as a generation input; the output format for `slide-outline.md` is determined by the agent instructions

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Vocabulary enforcement | Custom find-replace logic | Edit the Persona Never-say list and inline guardrail | The inline guardrail pattern is already established and working — add to it, don't create parallel enforcement |
| Format specification | Separate format schema file | Encode format in session-generator.md instructions | Per CONTEXT.md decision: format encoded in agent instructions only |
| Warm handoff wording | Per-command custom closings | Model on curriculum-voice.md Named-handoff close | Consistency across commands is the goal; voice file is the source of truth |
| Context-clear nudge | Per-command variations | Standardize the exact phrase | PRES-07 specifies: "your work is saved — clear context before the next step" |

---

## Common Pitfalls

### Pitfall 1: Schema Field Names in Written File Templates
**What goes wrong:** The write instruction in a command specifies output format like `**bloom_level:** [enum value]` — this schema field name becomes a visible label in the written file, then surfaces when `/curriculum:approve` reads the file and summarizes it.
**Why it happens:** Write format templates were copied from schema field names for precision, not for user readability.
**How to avoid:** In the write format templates, use plain-language labels (e.g., `**Thinking level:**` instead of `**bloom_level:**`). Check every `## On "Approve and continue"` section for field-name leaks.
**Warning signs:** Any label that matches a field name from the corresponding schema file.

### Pitfall 2: Partial Format Replacement on Slide Outline
**What goes wrong:** Updating the session-generator.md slide outline instructions but leaving the table format in the `### slide-outline.md` output template section.
**Why it happens:** The instructions section and the output template section are separate in the file.
**How to avoid:** Read session-generator.md top-to-bottom and update ALL sections that reference slide outline format: the output template AND any instructions that describe what goes in slides.

### Pitfall 3: TMA Labels in session.md Template
**What goes wrong:** Removing TMA labels from slide-outline.md but leaving them in session.md section headers (`## ACTIVATE:`, `## THEORY:`, etc.).
**Why it happens:** session.md is not listed as a consumer-facing file, but it is read by the validation agent and displayed when users open files in their workspace.
**How to avoid:** Per QUAL-07, TMA labels must not appear in facilitator guides, participant materials, or slide outlines. session.md is not explicitly listed — but the validation agent reads it, and users may open it. Replace TMA arc labels in session.md section headers with plain-language equivalents (e.g., "## Opening Activity", "## Learning Objectives", "## Content", "## Understanding Check", "## Guided Practice", "## Independent Practice", "## Reflection", "## Real-World Connection").

### Pitfall 4: Losing the Warm Handoff on Auto-Trigger Commands
**What goes wrong:** Commands that auto-trigger the next command (metaskills auto-triggers transfer; transfer auto-triggers marketing) show a one-line transition message instead of a warm handoff.
**Why it happens:** Auto-trigger commands intentionally keep the transition message brief so the auto-triggered command can present its own output immediately.
**How to avoid:** The warm handoff applies to the stage-completing confirmation shown before the auto-trigger, not the auto-trigger message itself. The one-line trigger message (`"Transfer design locked — generating your marketing materials now."`) stays brief. The handoff is the sentence before it that names what was built.

### Pitfall 5: Context-Clear Nudge on Auto-Chained Stages
**What goes wrong:** Adding "clear context before the next step" to a command that auto-triggers the next command. This contradicts the auto-trigger behavior — the user cannot clear context mid-chain.
**Why it happens:** The context-clear nudge requirement is applied uniformly without checking for auto-trigger behavior.
**How to avoid:** Context-clear nudge applies at the END of a complete workflow segment, not at every stage boundary. For auto-chained stages (metaskills → transfer → marketing), the nudge appears only after the final command in the chain completes (marketing). Verify which commands auto-trigger and which require explicit user action before placing the nudge.

### Pitfall 6: Marketing Traceability Interrupting Prose
**What goes wrong:** The current marketing display format in the conversation (marketing.md lines 127-143) shows `→ Source:` footnotes inline with each paragraph — this pattern might get preserved in the written file format change.
**Why it happens:** The conversation display and the written file format are different things but use similar structure in the current command.
**How to avoid:** The written `marketing-package.md` file must have traceability ONLY at the bottom as the compact audit table. The conversation display (shown to user during the session, not written to disk) can show source footnotes inline. These are two separate sections in the command file.

---

## Code Examples

### Pattern: Warm Synthesizing Handoff + Context-Clear Nudge

From curriculum-voice.md Signature Moves — Named-handoff close model:

```markdown
> You have 7 outcomes and 14 assessments. Run `/curriculum:modules` to organize them into a program sequence.
```

Phase 13 upgrade pattern for a stage-completing command (two-sentence synthesizing handoff + nudge):

```markdown
> You have [X] outcomes covering [plain description of scope] and [Y] assessments — [formative count] check-ins
> and [summative count] final assessments across [N] modules. Your work is saved — clear context, then run
> `/curriculum:modules` to build the module structure.
```

The context-clear nudge is integrated into the handoff sentence, not added as a separate paragraph.

### Pattern: Persona Section with Tone Description

From `outcomes.md` (strongest current example):

```markdown
## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer helping a program sponsor develop their learning outcomes. Your
tone is warm, confident, and substantive — like a trusted consultant who thinks in outcomes but speaks
in plain language.

**Never use instructional design vocabulary with the user:**

Never say: Bloom's taxonomy, bloom_level, outcome_id, schema, enum, formative assessment, transfer_context,
parent_outcome_id, Bloom's

Say instead: thinking level, complexity level, skills, objectives, outcomes, specific work situation,
what they'll do on the job.
```

Commands currently missing tone descriptions should follow this pattern. The inline guardrail is additive — it supplements the voice file's prohibition list with command-specific terms.

### Pattern: Marketing Written File Format

Current (YAML):
```yaml
element_type: program_description
content: "..."
source_citation: "..."
curriculum_traceability:
  claim_text: "..."
  supporting_element: "..."
  strength: direct
```

Required (prose with bottom traceability):
```markdown
## [Program Name]

[Program description — 2-3 sentence compelling prose, copy-paste-ready]

**What you'll be able to do:**
[Learning promise 1 — behavioral outcome statement written to enroll]
[Learning promise 2]
[...]

**Who this is for:**
[Audience positioning — warm enrollment language]

---

## Traceability

| Claim | Source | Strength |
|-------|--------|----------|
| [verbatim claim text] | [plain-language source reference] | direct/inferred/adjacent |
```

### Pattern: Transfer Written File Format

Current (YAML):
```yaml
pre_program:
  readiness_assessment:
    format: self-assessment
    questions:
      - "..."
```

Required (narrative with plain headings):
```markdown
# Transfer Plan: [Program Name]

## Before the Program

**How participants prepare:** [Plain-language description of readiness check and pre-work]

**Measuring starting points:** [Plain-language description of baseline measurement]

## During the Program

**Applying to real work:** [Plain-language description of real-work application activities]

**Commitment actions:** [Plain-language description of when/I-will commitments]

## After the Program

**Staying connected and building on it:** [Plain-language description of spaced follow-up and community]

**How you'll know it worked:** [Plain-language description of evaluation approach]
```

### Pattern: Slide Outline Block Format

```markdown
## Opening

**Slide 1 — [Slide Title]**
- **On screen:** [Title, opening question or image description, 1-2 bullet points if any]
- **Why it matters:** [What this slide accomplishes for the learner — pedagogical purpose]
- **Facilitator:** [What to say or do while this slide is showing]

**Slide 2 — [Slide Title]**
- **On screen:** [...]
- **Why it matters:** [...]
- **Facilitator:** [...]

## Core Content

**Slide 3 — [Slide Title]**
[continue numbering sequentially across sections]
```

### Pattern: Facilitator Diagnostic Note (QUAL-02)

Current (stumbling point format):
```
1. [stumbling point] — [facilitator response]
```

Required (three-part diagnostic):
```markdown
**Watch for:** [Observable learner behavior — what the facilitator actually sees or hears]
**What it means:** [What that behavior signals about the learner's state — interpretation]
**Your move:** [Specific facilitation action — concrete, not generic]
```

### Pattern: Session.md TMA Label Replacement

Current section headers in session.md template:
```
## ACTIVATE: Prior Knowledge Activation
## THEORY: Learning Objectives
## THEORY: Content
## CHECK: Formative Check
## METHOD: Guided Practice
## PRACTICE: Independent Practice
## REFLECT: Reflection Prompt
## TRANSFER: Transfer Connection
## DCR: Deconstruct–Compare–Rebuild
```

Plain-language replacements (TMA arc labels suppressed per QUAL-07):
```
## Opening Activity
## Learning Objectives
## Content
## Understanding Check
## Guided Practice
## Independent Practice
## Reflection
## Real-World Connection
## Deconstruct–Compare–Rebuild
```

The DCR section keeps its descriptive name since "Deconstruct–Compare–Rebuild" is plain language. The inline guardrail in session-generator.md already says these labels are structural only — Phase 13 makes the output templates match the guardrail.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Install-script distribution | Clone-and-run | Phase 11 | Plugin lives in cloned repo; workspace inside repo |
| No shared voice reference | curriculum-voice.md shared reference | Phase 12 | All 13 commands read voice file before generating |
| Per-command inline guardrails only | Voice file + per-command guardrails | Phase 12 | Two-layer enforcement; voice file is documentation, command guardrail is enforcement |
| Persona sections missing in 6 commands | One-line Persona in all 13 commands | Phase 12 | Phase 13 adds tone descriptions in a single pass |

---

## Open Questions

1. **Warm handoff on auto-triggered commands**
   - What we know: metaskills auto-triggers transfer, transfer auto-triggers marketing, sessions auto-triggers validate
   - What's unclear: where exactly the warm synthesizing handoff appears in the output of auto-chain transitions — before or after the trigger message
   - Recommendation: Synthesizing sentence appears in the stage-completing confirmation; the one-line trigger message stays brief. Planner should specify the exact position in each auto-trigger command.

2. **QUAL-05: Full objective text in session.md THEORY section**
   - What we know: session.md currently lists outcome_ids as a bullet list under `## THEORY: Learning Objectives`
   - What's unclear: whether the full objective text needs to be fetched from learning-objectives.md during generation, or whether the session schema already carries the outcome statement text
   - Recommendation: The session schema (stage-05-sessions.md) stores `learning_objectives` as an array of outcome_id strings, not full text. To implement QUAL-05, session-generator.md needs an instruction to look up the outcome statement from the provided `outcomes` context document and display both the ID (for traceability) and the full text.

3. **PRES-03: ASCII formatting spec for outcomes**
   - What we know: PRES-03 requires "box header, section dividers, tree hierarchy per backlog spec"
   - What's unclear: the "backlog spec" reference — this specification was not found in the files read
   - Recommendation: Planner should treat the ASCII formatting as Claude's discretion unless Kelsey can surface the backlog spec. A reasonable default: box header with program name, section dividers between Program/Module/Session levels, indented tree structure for the hierarchy.

4. **NEEDS: marker enforcement in session-generator.md**
   - What we know: QUAL-06 requires NEEDS: markers to be resolved before any file is marked complete; the session-generator is the primary source of NEEDS: markers
   - What's unclear: exactly when and how the session-generator currently uses NEEDS: markers (likely as placeholders when a required field can't be populated)
   - Recommendation: Add an explicit post-generation check in session-generator.md: before writing any session file, scan for `# NEEDS:` in the generated content. If found, flag the specific session and field rather than writing an incomplete file.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual inspection — no automated test suite exists for this plugin |
| Config file | None |
| Quick run command | Read generated file, scan for prohibited terms |
| Full suite command | Run a full curriculum pipeline against a test program and inspect all output files |

This is a Claude Code plugin (markdown command files). There is no executable test suite. Validation is behavioral: does running the command produce output that meets the success criteria? The planner should design verification tasks as manual spot-checks rather than automated test runs.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PRES-01 | Output hides constraint enforcement steps | manual-spot-check | Read output sections of each command; confirm no "Running Step N" language visible | ❌ Wave 0 |
| PRES-02 | All insider terms absent from output | manual-scan | Grep command files for prohibited terms in user-facing sections | ❌ Wave 0 |
| PRES-03 | outcomes ASCII formatting | manual-spot-check | Read outcomes.md Output Presentation section | ❌ Wave 0 |
| PRES-04 | assessments human-readable summary | manual-spot-check | Read assessments.md gate display section | ❌ Wave 0 |
| PRES-05 | modules removes numbered enforcement steps | manual-spot-check | Read modules.md Output Presentation section | ❌ Wave 0 |
| PRES-06 | Warm handoff in all stage-completing commands | manual-scan | Read closing section of each stage-completing command | ❌ Wave 0 |
| PRES-07 | Context-clear nudge in all stage-completing commands | manual-scan | Grep for "clear context" across all command files | ❌ Wave 0 |
| PRES-08 | Dashboard reminders in sessions and validate | manual-spot-check | Read sessions.md and validate.md completion sections | ❌ Wave 0 |
| QUAL-01 | Slide outline as production direction | manual-spot-check | Read session-generator.md slide-outline.md template section | ❌ Wave 0 |
| QUAL-02 | Facilitator notes with diagnostic direction | manual-spot-check | Read session-generator.md facilitator-guide.md template section | ❌ Wave 0 |
| QUAL-03 | Marketing file as copy-paste prose | manual-spot-check | Read marketing.md write instruction and display section | ❌ Wave 0 |
| QUAL-04 | Transfer file as readable narrative | manual-spot-check | Read transfer.md write instruction | ❌ Wave 0 |
| QUAL-05 | Full objective text in session output | manual-spot-check | Read session-generator.md THEORY section template | ❌ Wave 0 |
| QUAL-06 | NEEDS: markers resolved before file marked complete | manual-spot-check | Read session-generator.md for NEEDS: check before write | ❌ Wave 0 |
| QUAL-07 | TMA labels absent from output files | manual-scan | Grep session-generator.md output templates for ACTIVATE, THEORY, METHOD, PRACTICE, REFLECT, TRANSFER | ❌ Wave 0 |
| QUAL-08 | HTML comments stripped from session files | manual-spot-check | Read session-generator.md for HTML strip instruction | ❌ Wave 0 |
| QUAL-09 | Writing for Clarity applied | manual-spot-check | Read Persona sections for kernel sentence guidance | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Read the changed file and verify the specific requirement it addresses
- **Per plan merge:** Scan all changed files as a set for consistency (vocabulary, warm handoff wording, nudge placement)
- **Phase gate:** Full success criteria checklist from CONTEXT.md before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No automated test infrastructure needed — this is a markdown-file plugin
- [ ] Planner should design a verification checklist task at end of each plan that reads changed files and confirms prohibited terms are absent

---

## Sources

### Primary (HIGH confidence)
- Direct file reads of all 13 command files — current state documented from source
- Direct file read of `curriculum-voice.md` — prohibition list and signature moves
- Direct file read of `session-generator.md` — current template format for all 4 output files
- Direct file read of `stage-08-marketing.md` and `stage-07-transfer.md` — current write instructions
- `13-CONTEXT.md` — locked implementation decisions

### Secondary (MEDIUM confidence)
- `REQUIREMENTS.md` — requirement descriptions cross-referenced with file audit
- `STATE.md` — project history and prior decisions

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Current state audit: HIGH — all files read directly; gaps identified from source
- Change scope per command: HIGH — derived from direct file comparison against requirements
- Format patterns: HIGH — locked in CONTEXT.md decisions
- Warm handoff / nudge placement on auto-chain: MEDIUM — edge cases identified, requires planner judgment

**Research date:** 2026-03-25
**Valid until:** This research covers static markdown files — valid until files are changed. The auto-chain pitfall (Open Question 1) is the main ambiguity for planning.
