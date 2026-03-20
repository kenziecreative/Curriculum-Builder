# Phase 3: Backward Design Core — Research

**Researched:** 2026-03-20
**Domain:** Claude Code command authoring — schema-in-prompt enforcement, auto-correction logic, inline review gates
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Outcome generation UX**
- `/knz-outcomes` generates immediately on run — reads intake data from STATE.md, generates all outcomes without asking clarifying questions first. Intake already captured everything the schema needs.
- Silent generation — no progress commentary. Full output appears when done.
- After generation, output is shown inline in conversation. AskUserQuestion: approve / flag an issue / regenerate. Mirrors the intake confirmation pattern.
- If user flags an issue: free-text description of what's wrong → command takes feedback and regenerates a revised set.

**Bloom's distribution enforcement**
- When generated objectives don't span the required Bloom's levels: auto-add objectives at missing levels. User sees the full set including added ones, with added objectives noted.
- Hard block — always enforced. No exceptions, no user negotiation. Schema duration scaling already handles size-based minimums (short=2, medium=3, long=4).
- If generated objectives contain prohibited verbs (understand, know, appreciate): auto-replace with schema-valid Bloom's verbs at the same level. User never sees the vague version.
- After distribution check passes: show a Bloom's distribution summary — a table with level | count | example verb — making pedagogical rigor visible without requiring the user to know what Bloom's is.

**Assessment review gate design (PIPE-05)**
- Post-assessment gate lives inline at the end of `/knz-assessments` — same pattern as intake gate. No separate `/knz-approve` command needed for this gate.
- User sees the assessment alignment map (objectives → assessments with Bloom match column) at the gate, then AskUserQuestion with the three-option approve/concern/start-over pattern established in Phase 2.
- If user selects "concern": free-text description → command revises assessments and re-presents the alignment map before asking again.
- After gate approval: brief confirmation line, STATE.md updated silently, Stage 3 marked complete, next step shown ("Next: /knz-modules").

**Misalignment auto-correction**
- If assessment Bloom level is below paired objective: auto-elevate silently before showing output. User never sees a misaligned version.
- If an objective has no paired assessment: auto-generate a missing assessment and include it in output. User reviews with everything already paired.
- Validation badge: if all checks pass (coverage, Bloom match, formative per module), show a brief line before the alignment map: "✓ All objectives paired — Bloom's levels aligned".
- Brief note after any auto-corrections: state what was added/elevated and why. Transparent without being noisy. Example: "I added an assessment for MO-2-3 and elevated FA-4 to Evaluate to match its objective."

### Claude's Discretion
- Exact wording of the Bloom's distribution summary table
- How to handle edge cases where duration scaling conflicts (e.g., a very short program where 4 levels is impossible)
- Whether `/knz-outcomes` writes files before or after inline review (files written on approval)
- Persona tone calibration for the brief framing before outcome generation

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PIPE-05 | Human review gate pauses pipeline after assessment design for user confirmation | Inline gate pattern established by knz-intake; same AskUserQuestion three-option structure applies at end of `/knz-assessments` |
| OUTC-01 | Learning objectives automatically tagged with Bloom's taxonomy level from intake data | Schema field `bloom_level` is a required enum; generation prompt includes the schema so the model tags the field directly — no post-hoc inference |
| OUTC-02 | Outcome hierarchy from program-level down to session-level | `outcome_level` enum (program/module/session) + `parent_outcome_id` reference chain; duration scaling governs how many levels appear |
| OUTC-03 | Transfer specification required for every objective | `transfer_context` is a required field in stage-02-outcomes.md; command logic blocks stage completion if any objective is missing it |
| OUTC-04 | Bloom's distribution spans 4+ taxonomy levels per program | Distribution check runs post-generation; auto-adds objectives at missing levels before showing output; schema duration scaling governs minimums |
| ASMT-01 | Every learning objective has a paired assessment | `paired_objective` is a required field; auto-generation of missing assessments ensures 100% coverage before display |
| ASMT-02 | Assessment Bloom's level matches or exceeds paired objective | Constraint stated in schema; auto-elevation logic runs pre-display; alignment map column makes it verifiable at the review gate |
| ASMT-03 | Assessments include formative checks, not just summative | Formative-per-module requirement in schema; validation check runs before showing output |
| ASMT-04 | Assessment rubric criteria generated for each assessment | `success_criteria_for_assessment` is a required schema field with observable-verb constraint |
</phase_requirements>

---

## Summary

Phase 3 builds two Claude Code command files — `knz-outcomes.md` and `knz-assessments.md` — that implement the backward design generation pipeline. Both schemas already exist and are complete. This phase is entirely about command behavior: reading the right inputs, generating schema-compliant output, enforcing constraints silently before showing results, and pausing for human confirmation at the right moment.

The key architectural insight is that all constraint enforcement happens before the user sees output, not after. Auto-correction (verb replacement, level addition, Bloom elevation) is silent. The user reviews a clean, already-valid output. This mirrors the way an expert instructional designer would work — delivering finished work for review, not a draft with errors attached.

Both commands follow the same three-part structure established by `/knz-intake`: (1) read context, generate silently, (2) enforce constraints before display, (3) present output with AskUserQuestion gate. The assessment gate is the PIPE-05 gate that prevents Stage 4 from starting without explicit approval.

**Primary recommendation:** Build both command files as straightforward extensions of the knz-intake pattern. The generation logic and gate logic are already proven in Phase 2 — the primary work is encoding the constraint enforcement rules (distribution check, auto-add, auto-elevate) as explicit conditional logic inside the command prose, and embedding the relevant schema as generation context via a Load instruction.

---

## Standard Stack

### Core (existing infrastructure — no new installs)

| Asset | Location | Purpose | Why Standard |
|-------|----------|---------|--------------|
| Claude Code command files (.md) | `.claude/commands/` | Command definitions Claude executes | Established pattern in Phase 2 |
| stage-02-outcomes.md | `.claude/reference/schemas/` | Generation schema for `/knz-outcomes` | Already complete; command includes as context |
| stage-03-assessments.md | `.claude/reference/schemas/` | Generation schema for `/knz-assessments` | Already complete; command includes as context |
| workspace `STATE.md` | `workspace/{project}/STATE.md` | Reads Stage 1+2 status; writes Stage 3 gate approval | Established in Phase 1 |
| AskUserQuestion tool | Claude Code built-in | All categorical decision points | INFR-06 requirement |

### New Files This Phase Creates

| File | Location | Purpose |
|------|----------|---------|
| `knz-outcomes.md` | `.claude/commands/` | Generates outcome hierarchy from intake data |
| `knz-assessments.md` | `.claude/commands/` | Generates assessments + inline PIPE-05 gate |

### No New Dependencies

This phase adds zero new packages, tools, or schemas. All schemas are built. All infrastructure exists. This is pure command-file authoring.

---

## Architecture Patterns

### Recommended Command File Structure

Both new commands follow this section structure (matching knz-intake.md):

```
---
description: [one-line description for /help display]
---

# /knz-[command]

[Opening line: what this command does]

## Prerequisites

[Check workspace exists + check stage gate status]

## Persona

[Expert ID tone — warm, substantive, no vocabulary exposure]

## [Generation section]

[Load schema → generate → apply constraints → present output]

## [Gate / Confirmation section]

[AskUserQuestion with three-option pattern]

## State Management Rules

[Silent STATE.md update protocol]

## Schema Compliance Checklist

[Pre-output internal verification checklist]
```

### Pattern 1: Schema-in-Prompt Generation

**What:** The command explicitly loads the relevant schema file as generation context before generating output. Claude reads the schema's required fields, enum constraints, and validation rules and uses them as direct generation constraints rather than post-hoc filters.

**When to use:** Every generation step that must produce schema-compliant output.

**Established precedent (from knz-intake.md line 238):**
```
Load `.claude/reference/schemas/stage-01-intake.md` as generation context before writing.
The output file must contain ALL required fields with exact enum values per the schema.
```

**For Phase 3:** Both commands use the same pattern:
- `/knz-outcomes` loads `stage-02-outcomes.md` before generating learning-objectives.md
- `/knz-assessments` loads `stage-03-assessments.md` before generating assessment files

### Pattern 2: Silent Auto-Correction Before Display

**What:** All constraint validation and auto-correction runs before output is shown to the user. The command enforces an internal correction sequence, then presents the cleaned result. The user never sees an invalid state.

**Correction sequence for `/knz-outcomes`:**

1. Check for prohibited verbs in `outcome_statement` (understand, know, appreciate) → replace with schema-valid Bloom's verb at the same cognitive level
2. Check Bloom's distribution against duration-scaled minimum (short=2, medium=3, long=4) → auto-add objectives at missing levels if needed
3. Record what was changed (for transparency note)
4. Display corrected output with brief transparency note if corrections were made

**Correction sequence for `/knz-assessments`:**

1. Check every objective has a `paired_objective` → auto-generate missing assessments
2. Check every assessment `bloom_level >= paired_objective bloom_level` → auto-elevate mismatched assessments
3. Check at least one formative per module → auto-add formative if missing
4. Record what was changed
5. Display corrected output with brief transparency note; show validation badge if no corrections needed

**Transparency note pattern (established in CONTEXT.md):**
> I added an assessment for MO-2-3 and elevated FA-4 to Evaluate to match its objective.

Tone: confident, not apologetic. The command is doing its job.

### Pattern 3: Inline Review Gate with AskUserQuestion

**What:** After displaying output, use AskUserQuestion to pause the pipeline at a decision point. Established by knz-intake; used by both Phase 3 commands.

**Three-option pattern (from knz-approve.md, adapted for inline use):**

For `/knz-outcomes`:
- **"Looks good"** — write files to `01-outcomes/`, update STATE.md (Stage 2 in-progress → complete... wait, see note below), show next step
- **"Flag an issue"** — free-text field → regenerate with feedback → re-present
- **"Start over"** — destructive confirmation → regenerate from scratch

For `/knz-assessments` (PIPE-05 gate):
- **"Approve and continue"** — write files to `02-assessments/`, update STATE.md (Stage 3 complete, Post-Assessment gate approved), show "Next: /knz-modules"
- **"I have concerns"** — free-text field → revise assessments → re-present alignment map → gate again
- **"Start this stage over"** — destructive confirmation → clear output → reset Stage 3 to not-started

**Critical distinction:** `/knz-outcomes` gate is a soft review (regenerate on feedback); `/knz-assessments` gate is PIPE-05 (marks the pipeline gate that unlocks Stages 4–8).

### Pattern 4: State Machine Progression

**What:** Commands read current stage status from workspace STATE.md and block execution if prerequisites aren't met.

**Prerequisite check logic:**

For `/knz-outcomes`:
```
Read Stage 1 status from workspace STATE.md.
If Stage 1 != "complete": block with forward-looking message (not an error).
  Example: "Outcome design starts after intake. Run /knz-intake first."
If Stage 2 == "complete": show already-complete message.
  Example: "Outcomes are already designed for this program. Run /knz-assessments to continue."
If Stage 2 == "in-progress": resume (re-display saved output if exists, or regenerate).
If Stage 2 == "not-started": proceed to generation.
```

For `/knz-assessments`:
```
Read Stage 2 status from workspace STATE.md.
If Stage 2 != "complete": block with forward-looking message.
  Example: "Assessment design starts after outcomes. Run /knz-outcomes first."
If Stage 3 == "complete" AND Post-Assessment gate == "approved": show already-complete message.
  Example: "Assessments are approved. Stage 4 is next — run /knz-modules."
If Stage 3 == "in-progress": resume.
If Stage 3 == "not-started": proceed to generation.
```

**Established precedent (Phase 2 decision):** "Unavailable stage commands show forward-looking message rather than error to preserve user orientation."

### Pattern 5: Bloom's Distribution Summary Table

**What:** After outcome generation, display a summary table that makes pedagogical quality visible to a non-ID user. Kelsey's direction: frame it as evidence, not a technical report.

**Claude's discretion area** — recommended approach based on CONTEXT.md guidance:

```
Your program spans [N] thinking levels — from [lowest level description] to [highest level description].

| Thinking Level | Skills Covered | Example Verb |
|----------------|----------------|--------------|
| Recall         | 3              | identify     |
| Apply          | 4              | demonstrate  |
| Analyze        | 2              | compare      |
| Create         | 2              | design       |
```

Avoid "Bloom's taxonomy" in user-facing text. Use "thinking level" or "complexity level" or just the verb tier labels per INFR-11.

### Pattern 6: Assessment Alignment Map

**What:** The alignment map IS the evidence that justifies the PIPE-05 gate approval. It must be legible to a non-ID user.

**Schema-specified format (from stage-03-assessments.md):**
```markdown
## Assessment Alignment Map

| Outcome ID | Outcome (abbreviated) | Assessment ID | Assessment Name | Type | Bloom Match |
|------------|----------------------|---------------|-----------------|------|-------------|
| PO-1       | ...                  | SA-1          | ...         | summative | Evaluate >= Evaluate |
| MO-1-1     | ...                  | FA-1          | ...         | formative | Apply >= Apply |
```

The `Bloom Match` column (e.g., "Apply >= Apply") makes the alignment rule legible without requiring the user to know the rule. If any row shows ">=" that's evidence the assessment meets or exceeds. The validation badge "✓ All objectives paired — Bloom's levels aligned" can appear above the table when all rows pass.

### Anti-Patterns to Avoid

- **Post-hoc validation display:** Never show the user an invalid output and then tell them it was fixed. Fix first, show clean result.
- **Schema vocabulary exposure:** Never say "bloom_level", "outcome_id", "paired_objective", "formative assessment" in user-facing text. Use plain language.
- **Gate announcement:** Never say "I'm now checking your outcomes against the schema" or "running Bloom's validation." Constraints run invisibly.
- **Progress commentary during generation:** Silent generation — no "I'm building your outcomes now..." running commentary. Full output appears when done.
- **Separate /knz-approve for these gates:** The post-outcomes review and the post-assessments gate are inline. Do not tell users to run `/knz-approve` for Stage 2 or Stage 3. `/knz-approve` handles the same post-assessment gate IF the user arrives there outside the normal flow (it reads STATE.md and surfaces the pending gate).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Bloom's taxonomy level ordering | A custom level comparison function | Schema enum order (Remember, Understand, Apply, Analyze, Evaluate, Create) | Order is stable and documented in schema; reference by enum position |
| Assessment coverage tracking | A separate tracking mechanism | `paired_objective` field + alignment map table | Schema already provides the reference structure |
| Gate state | Custom gate tracking fields | Existing `Review Gates` table in workspace STATE.md | Already defined in STATE.md template with `Post-Assessment` row |
| Verb validation | A dictionary lookup | Schema enum values + prohibited verb list in outcomes schema | Schema already specifies prohibited verbs and valid replacements |
| Duration scaling logic | Separate config file | Duration scaling table already in stage-02-outcomes.md and stage-03-assessments.md | Tables are authoritative; command logic reads from schema prose |

**Key insight:** Both schemas are complete and comprehensive. The command files are orchestration prose that invokes the schemas — they do not re-encode the schema rules. The schema IS the constraint. The command tells Claude to load and apply the schema.

---

## Common Pitfalls

### Pitfall 1: Writing Files Before Approval

**What goes wrong:** Command writes output files to `01-outcomes/` or `02-assessments/` before the review gate, then the user wants to regenerate.

**Why it happens:** Treating file-writing as a generation step rather than a confirmation step.

**How to avoid:** Files are written only in the "Approve" branch of AskUserQuestion. During generation and display, output exists only in the conversation context. Claude's discretion area covers this: "Whether `/knz-outcomes` writes files before or after inline review — files written on approval."

**Warning signs:** Command structure that writes files before presenting the gate question.

### Pitfall 2: Bloom Level Comparison Without Ordering

**What goes wrong:** Auto-elevation logic fails because the command treats Bloom's levels as unordered labels rather than an ordered enum.

**Why it happens:** String comparison ("Evaluate" != "Apply") doesn't express "Evaluate > Apply."

**How to avoid:** Define the ordered list explicitly in the command's constraint section: Remember < Understand < Apply < Analyze < Evaluate < Create. Elevation means moving to the next step up on this ordered list that equals or exceeds the objective's level.

**Warning signs:** Correction logic that only checks equality, not ordering.

### Pitfall 3: Partial Regeneration State

**What goes wrong:** User selects "Flag an issue" on outcomes, provides feedback, command regenerates only the flagged objectives — leaving the rest as-is. Bloom's distribution may now be wrong.

**Why it happens:** Treating regeneration as a targeted edit rather than a full regeneration.

**How to avoid:** On any flag-and-regenerate cycle, regenerate the full set using the original intake data plus the user's feedback. Re-run all constraint checks. Re-display the full output. Do not patch individual objectives.

**Warning signs:** Regeneration section that references specific `outcome_id` values to update.

### Pitfall 4: Gate State Out of Sync

**What goes wrong:** `/knz-assessments` reaches the PIPE-05 gate, user selects "I have concerns," command revises and re-presents — but STATE.md was already updated to `Stage 3: complete` or `Post-Assessment: pending` at the wrong point.

**Why it happens:** STATE.md writes interleaved with gate decision logic instead of strictly at approval.

**How to avoid:** STATE.md stage progression writes happen only in the "Approve and continue" branch. "I have concerns" and "Start over" branches never advance stage status. Gate status moves from `not-reached` → `pending` only when the alignment map is first presented; `pending` → `approved` only on final approval.

**Warning signs:** STATE.md write calls appearing before the AskUserQuestion block.

### Pitfall 5: Short-Program Edge Case for Bloom Distribution

**What goes wrong:** A < 2 hour program generates only 2-3 session objectives. The distribution check tries to add objectives to reach 4 levels, but the program size doesn't support that.

**Why it happens:** Hard-coding the 4-level minimum without reading the duration-scaling table.

**How to avoid:** Distribution minimum is duration-dependent. Short < 2 hr = 2 levels minimum; Medium 2-16 hr = 3 levels; Long > 16 hr = 4 levels. Read `contact_hours` from intake data, apply the correct minimum. If short program already spans 2 levels, distribution check passes. Claude's discretion area notes this edge case explicitly.

**Warning signs:** Distribution enforcement that doesn't read `contact_hours` before applying the minimum.

### Pitfall 6: CONTEXT.md says gate is inline, but /knz-approve also handles it

**What goes wrong:** Planner creates a task to "update /knz-approve to handle the post-assessment gate" in addition to the inline gate in `/knz-assessments`. Now the gate can be triggered two ways, and they update STATE.md differently.

**Why it happens:** Misreading the CONTEXT.md decision about inline gate vs the existing knz-approve.md scope.

**How to avoid:** Both are correct and intentional. The `/knz-assessments` inline gate IS the primary path — it handles the gate at the end of normal execution. `/knz-approve` already handles the same gate as a fallback (it reads `pending` gate status from STATE.md). No changes to `/knz-approve` are needed. The two commands share the same STATE.md gate field — they don't duplicate logic, they both read/write the same `Post-Assessment` row.

---

## Code Examples

Verified patterns from the existing command files:

### Prerequisites Check Pattern (from knz-intake.md)
```markdown
## Prerequisites

### 1. Check workspace exists

Read `workspace/*/STATE.md` to locate the active project. If no STATE.md is found, respond:

> It looks like you haven't set up a project workspace yet. Run `/knz-init` first to get started.

Stop here.

### 2. Check Stage N status

Read the Stage N row from STATE.md `Stage Progress` table.

- **`not-started`** — proceed to [generation section]
- **`in-progress`** — [resume logic]
- **`complete`** — respond:

> [forward-looking message]. Run `/knz-[next]` to continue.

Stop here.
```

### Schema Load + Generation Pattern (from knz-intake.md, "On Looks good" section)
```markdown
Load `.claude/reference/schemas/stage-0N-[name].md` as generation context before writing.
The output file must contain ALL required fields with exact enum values per the schema.
```

### Silent STATE.md Update Pattern (from knz-intake.md)
```markdown
Silently update STATE.md:
- `Stage Progress` → Stage N status: `complete`, Completed: {today's date}
- `Review Gates` → Post-Assessment: `approved`, Approved: {today's date}
- `Session Continuity` → **Next Action:** Run /knz-[next] to begin [stage name]
```

### AskUserQuestion Three-Option Gate Pattern (from knz-approve.md)
```markdown
Use `AskUserQuestion` with three options:

- **"Approve and continue"** — [what happens]
- **"I have concerns"** — [what happens]
- **"Start this stage over"** — [destructive, with confirmation]
```

### Destructive Confirmation Pattern (from knz-intake.md)
```markdown
Use `AskUserQuestion` to confirm the destructive action:

> Are you sure? This will clear all the [outputs] from this stage and start from the beginning.

Options: **"Yes, start over"** / **"Actually, keep what we have"**
```

### Assessment Alignment Map Format (from stage-03-assessments.md)
```markdown
## Assessment Alignment Map

| Outcome ID | Outcome (abbreviated) | Assessment ID | Assessment Name | Type | Bloom Match |
|------------|----------------------|---------------|-----------------|------|-------------|
| PO-1       | ...                  | SA-1          | ...             | summative | Evaluate >= Evaluate |
| MO-1-1     | ...                  | FA-1          | ...             | formative | Apply >= Apply |
```

### Recommended Bloom's Distribution Summary Format (Claude's discretion)
```markdown
Your program spans [N] thinking levels — from [description of lowest] to [description of highest].

| Thinking Level | Objectives | Example Verb Used |
|----------------|------------|-------------------|
| Recall         | 3          | identify          |
| Apply          | 4          | demonstrate       |
| Analyze        | 2          | compare           |
| Create         | 2          | design            |
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Gate as separate command (`/knz-approve`) | Gate inline in generation command | Decided Phase 2 (Phase 02-01 decision log) | Post-intake and post-assessment gates are inline; `/knz-approve` is fallback only |
| Schema as passive reference | Schema loaded as generation context before output | Phase 1 (INFR-03 pattern) | Schema rules are active constraints during generation, not post-hoc checks |
| Validation blocks with error messages | Auto-correction before display | CONTEXT.md decision | User never sees invalid state — corrections are transparent in a brief note |

**Note on `/knz-approve` scope:** The command already exists and already handles the Post-Assessment gate as a fallback (it reads `pending` gate status from STATE.md). This phase does NOT need to modify `/knz-approve`. The inline gate in `/knz-assessments` is the primary flow. If a user somehow gets to a state where Stage 3 is complete but the gate shows `pending`, `/knz-approve` catches it. Both paths write to the same `Review Gates` row in STATE.md.

---

## Open Questions

1. **Resume behavior for partially-generated outcomes**
   - What we know: `/knz-intake` uses `Stopped At` in STATE.md to resume from the last completed thematic group. Outcomes has no thematic groups — it generates the full hierarchy in one pass.
   - What's unclear: If a session is interrupted mid-generation (e.g., context limit, session end), should `/knz-outcomes` regenerate from scratch or attempt to resume from the partial output?
   - Recommendation: Given that generation is one pass (not thematic batching), regenerate from scratch on resume. The intake data is stable. Cost is low. Partial outcomes are harder to reason about than clean regeneration. Add a STATE.md `Stopped At` value of "Generating outcomes" that triggers regeneration (not resumption) on next run.

2. **Bloom level ordering in command prose**
   - What we know: Schema defines the six levels. Auto-elevation needs to compare levels (e.g., "Apply < Evaluate").
   - What's unclear: The schema doesn't explicitly document the ordinal order as a numbered list.
   - Recommendation: Command files explicitly state the ordered sequence as a numbered list in the constraint enforcement section: 1=Remember, 2=Understand, 3=Apply, 4=Analyze, 5=Evaluate, 6=Create. This makes the auto-elevation comparison rule unambiguous for Claude during execution.

3. **`/knz-outcomes` gate: does it mark Stage 2 complete?**
   - What we know: The PIPE-05 gate (in `/knz-assessments`) marks Stage 3 complete and unlocks Stage 4. The `/knz-outcomes` gate is a softer approval that writes the outcome files.
   - What's unclear: Should Stage 2 be marked `complete` when the user approves outcomes, or only when `/knz-assessments` completes?
   - Recommendation: Mark Stage 2 `complete` on outcome approval (when files are written). `/knz-assessments` prerequisite check reads Stage 2 status — this is the gate that allows assessment design to begin. Consistent with how Stage 1 works (intake approval marks Stage 1 complete, unlocks Stage 2).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — this is a Claude Code plugin (markdown command files, no executable code) |
| Config file | N/A |
| Quick run command | Manual: run `/knz-outcomes` and `/knz-assessments` against a test workspace project |
| Full suite command | Manual: full pipeline smoke test from `/knz-init` through Stage 3 gate approval |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PIPE-05 | Assessment gate pauses pipeline, requires explicit approval | manual-only | Run `/knz-assessments`, verify AskUserQuestion appears and Stage 4 blocked without approval | ❌ Wave 0 — create test workspace |
| OUTC-01 | Objectives tagged with Bloom's level | manual-only | Inspect `01-outcomes/learning-objectives.md` — every objective has `bloom_level` field with valid enum | ❌ Wave 0 |
| OUTC-02 | Hierarchy: program → module → session | manual-only | Inspect `01-outcomes/learning-objectives.md` — all three levels present, IDs in correct format | ❌ Wave 0 |
| OUTC-03 | Transfer spec required on every objective | manual-only | Inspect `learning-objectives.md` — no objective missing `transfer_context` field | ❌ Wave 0 |
| OUTC-04 | Bloom's distribution spans 4+ levels | manual-only | Inspect distribution summary table in conversation output; count unique levels | ❌ Wave 0 |
| ASMT-01 | 100% objective-assessment coverage | manual-only | Inspect `02-assessments/assessment-map.md` — every outcome_id appears in at least one row | ❌ Wave 0 |
| ASMT-02 | Assessment Bloom >= objective Bloom | manual-only | Inspect `assessment-map.md` Bloom Match column — all rows show >= not < | ❌ Wave 0 |
| ASMT-03 | Formative assessments present | manual-only | Inspect `02-assessments/formative-assessments.md` — at least one per module | ❌ Wave 0 |
| ASMT-04 | Rubric criteria generated | manual-only | Inspect `02-assessments/formative-assessments.md` and `summative-assessments.md` — every entry has `success_criteria` field | ❌ Wave 0 |

**Justification for manual-only:** Claude Code commands are markdown instruction files interpreted by the Claude model. There is no runtime to instrument, no function to unit test, no assertion framework applicable. Validation is observational — run the command against a test workspace, inspect the outputs. Automated testing at this layer would require a Claude API harness outside the project scope.

### Sampling Rate
- **Per task:** Manual inspection of generated output files after each command is implemented
- **Per wave merge:** Full pipeline smoke test from `/knz-init` through Stage 3 approval
- **Phase gate:** Full pipeline smoke test green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `workspace/test-program/` — test workspace with completed Stage 1 intake data for smoke testing
- [ ] Test program brief should represent a medium-duration program (2-16 hours) to exercise the 3-level Bloom minimum path
- [ ] Second test case: short program (< 2 hours) to test the 2-level minimum path and verify the distribution edge case

*(No framework install needed — markdown command files require no build toolchain)*

---

## Sources

### Primary (HIGH confidence)
- `/knz-intake.md` — established gate pattern, persona rules, AskUserQuestion usage, STATE.md update conventions, schema-in-prompt generation pattern (direct inspection)
- `/knz-approve.md` — three-option gate structure, Post-Assessment gate scope, destructive confirmation pattern (direct inspection)
- `.claude/reference/schemas/stage-02-outcomes.md` — outcomes schema: all required fields, enum values, Bloom's distribution rules, duration scaling, validation rules (direct inspection)
- `.claude/reference/schemas/stage-03-assessments.md` — assessments schema: assessment fields, Bloom alignment constraint, skill-type constraints, formative/summative requirements (direct inspection)
- `templates/project-scaffold/STATE.md` — workspace state structure, Review Gates table, gate status enums (direct inspection)
- `03-CONTEXT.md` — all locked implementation decisions (direct inspection)

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` accumulated decisions — Phase 02-01 decision: post-assessment gate scope, three-option pattern, unavailable stage command handling (direct inspection)
- `.planning/REQUIREMENTS.md` — PIPE-05, OUTC-01 through OUTC-04, ASMT-01 through ASMT-04 definitions (direct inspection)

### Tertiary (LOW confidence)
- None — all findings derived from direct code and document inspection within the project

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all assets are existing, inspected files in the project
- Architecture patterns: HIGH — derived directly from knz-intake.md and knz-approve.md source; all patterns are established
- Pitfalls: HIGH — derived from schema constraints and CONTEXT.md decisions; no speculation
- Validation architecture: HIGH — reflects actual project structure (no test framework exists; this is correct, not a gap)

**Research date:** 2026-03-20
**Valid until:** Stable until schema files change — schemas are locked per project decisions
