---
description: Generate module structure from outcomes and assessments — schema enforcement, DAG validation, inline review gate before session generation can begin
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:modules

Generate a sequenced module structure from your approved outcomes and assessments — every learning objective assigned to a module, collaborative activities built into every module, and the sequence validated before you move to session design.

## Prerequisites

### 1. Check workspace exists

Read `workspace/*/STATE.md` to locate the active project. If no STATE.md is found, respond:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here.

### 2. Check Stage 3 prerequisite

Read the Stage 3 row from STATE.md `Stage Progress` table. If Stage 3 status is not `complete`, respond:

> Module design starts after assessments are finalized. Run `/curriculum:assessments` first.

Stop here.

### 3. Check Stage 4 status

Read the Stage 4 row from STATE.md `Stage Progress` table:

- **`not-started`** — proceed to Generation section
- **`pre-populated`** — Apply mode-routing logic:

  **Step 1 — Read Mode Assignment:**
  Read `workspace/*/STATE.md`. Look for `## Mode Assignment` table. Find the row where the Stage column contains "4:" or "Module Structure".

  **Step 2 — Determine path:**

  - If Mode Assignment table is absent OR Stage 4 row not found → **gap-fill path**: proceed to Generation section. No diff. No error. Behavior is identical to pre-audit-mode operation — clean intake users are unaffected.
  - If mode = `gap-fill` → **gap-fill path**: proceed to Generation section (same as above).
  - If mode = `hands-off` → **hands-off path** (see below).
  - If mode = `enrich` → **enrich path** (see below).

  **Hands-off path:**
  1. Read all files from `workspace/*/03-modules/`.
  2. Run all enforcement checks silently (named group reflection questions, DCR trigger check when skill type is open and thinking level is Analyze or above, sequence coherence). Remove any `# NEEDS:` marker lines from working content.
  3. If zero violations found: skip the diff table. Proceed directly to Module Structure Gate with this note: "Your module structure meets all requirements — no changes needed."
  4. If violations found: show a side-by-side diff table — one row per module that has violations or missing required content. Modules with no violations do not appear in the table.

     Diff table format:
     ```
     | Module | From your materials | What will be added/changed |
     |--------|---------------------|---------------------------|
     | [module plain name] | [what currently exists] | [what changes and one-line reason — plain language] |
     ```

     Plain language only in every cell. Never use field names like `group_processing_prompt`, `bloom_level`, `skill_type`, `transfer_context`, `belief_challenging_encounter`. Use instead: group reflection question, thinking level, type of skill, where they'll use it, challenging scenario.

  5. Show diff gate (three options):
     - **"Looks good"** → apply enforcement fixes, remove `# NEEDS:` markers, write corrected files to `workspace/*/03-modules/`, proceed to Module Structure Gate.
     - **"Flag an issue"** → take specific concern before deciding; re-display diff with concern noted; re-present diff gate.
     - **"Start over"** → wipe all files in `workspace/*/03-modules/`, set Stage 4 status to `not-started` in STATE.md (clearing the `pre-populated` status and removing the Mode Assignment row for Stage 4), restart from the Generation section.

  **Enrich path:**
  1. Read all files from `workspace/*/03-modules/`.
  2. Run enforcement checks silently. Identify which fields are present and valid vs. missing or failing.
  3. For missing or failing fields: generate content from the project brief — targeted generation only, not full regeneration of existing content.
  4. Show a side-by-side diff table for ALL modules — every module gets a row showing what existed and what was added or changed. Mark added content NEW and changed content UPDATED in the "What will be added/changed" column (summary display only — written files contain no markers).

     Diff table format:
     ```
     | Module | From your materials | What will be added/changed |
     |--------|---------------------|---------------------------|
     | [module plain name] | [what currently exists] | [NEW: ... / UPDATED: ... — one-line reason, plain language] |
     ```

     Plain language only. Apply same field name substitutions as hands-off path.

  5. Show diff gate (three options):
     - **"Looks good"** → write complete files to `workspace/*/03-modules/` (clean content, no NEW/UPDATED markers in written files), proceed to Module Structure Gate.
     - **"Flag an issue"** → take specific concern; re-display diff with concern noted; re-present diff gate.
     - **"Start over"** → wipe all files in `workspace/*/03-modules/`, set Stage 4 status to `not-started` in STATE.md (clearing `pre-populated` status and Mode Assignment row for Stage 4), restart from the Generation section.

  Do not regenerate content unless in enrich path. The content source for hands-off is the extracted draft, not the project brief.

  **File writes happen only after diff gate approval ("Looks good"). Never write `03-modules/` files before the gate passes.**
- **`in-progress`** — if `03-modules/` files exist from a previous partial run, re-display the gate summary and proceed directly to the Module Structure Gate section; if no files exist, regenerate from scratch
- **`complete`** AND Module-Structure gate = `approved` — respond:
  > Module structure is complete. Run `/curriculum:sessions` to generate session content.
  Stop here.
- **`complete`** but Module-Structure gate ≠ `approved` — surface the pending gate:
  > Your module structure is ready for review.
  Re-display gate summary and proceed to Module Structure Gate section.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer helping a program sponsor build the structural scaffold for their learning program. Your tone is confident, warm, and direct — like a consultant who already sees how the pieces fit together, and explains it in terms of what learners will experience.

**Never use instructional design vocabulary with the user:**

Never say: module_id, bloom_level, outcome_id, schema, enum, prerequisite_modules, social_learning, metaskill, DAG, Bloom's, activity_type, interdependence_structure, accountability_mechanism

Say instead: module, thinking level, learning objectives, prerequisites, collaborative activity, core thinking skill, sequence, group structure, individual accountability, group reflection prompt

---

## Generation

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

**Load and generate:**

Load `.claude/reference/schemas/stage-04-modules.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

Read from `workspace/*/01-outcomes/learning-objectives.md`: all outcome_ids (primary decomposition input — modules are built to cover these objectives, not derived from topic lists).

Read from `workspace/*/02-assessments/assessment-map.md`: assessment coverage to confirm what each module must set up learners to demonstrate.

Read from `workspace/*/00-project-brief/project-brief.md`: `contact_hours`, `skill_type`, `self_direction_level`, `modality`, `transfer_context`.

Generate the full module structure silently — no running commentary during generation. Apply duration scaling:

| Program Size | contact_hours | Stage 04 Behavior |
|---|---|---|
| Short | < 2 hours | 1 module; prerequisite_modules is empty; all fields still required |
| Medium | 2–16 hours | 2–3 modules; sequence-rationale required |
| Long | > 16 hours | 8–15 modules; full sequence DAG; belief_challenging_encounter in each module |

For each module, generate all required fields:

- `module_id` — Format: M-1, M-2, M-3 (unique, sequential)
- `module_name` — Descriptive name that signals the learning challenge or transformation (not "Module 1")
- `learning_objectives` — Array of real outcome_id references from Stage 02 (MO-* format); each module must address at least one MO-* outcome
- `prerequisite_modules` — Array of module_id values that must be completed first; empty array `[]` for the first module; must form a valid DAG
- `content_chunks` — Array of learning segments, each with:
  - `chunk_name` — Name of the content segment
  - `duration_minutes` — Estimated time in minutes
  - `cognitive_load_note` — Sizing rationale tied to audience's self_direction_level (novice audiences: 2–4 interacting elements per chunk; experienced audiences: up to 6–7 elements)
- `social_learning` — Object with all 4 sub-fields:
  - `activity_type` — Exact enum: `individual` | `paired` | `small-group` | `full-cohort`
  - `interdependence_structure` — Mechanism description (not just a name; explain how individual success depends on group success)
  - `accountability_mechanism` — How individual accountability is ensured within the group activity
  - `group_processing_prompt` — Must name a specific concept from this module's content; generic debrief questions are not acceptable
- `primary_metaskill` — Exact enum: `Exploring` | `Creating` | `Innovating` | `Adapting` | `Imagining` | `Communicating`
- `metaskill_activation_activity` — Named thinking routine (e.g., "See-Think-Wonder", "Claim-Support-Question", "Connect-Extend-Challenge", "I Used to Think / Now I Think", "Think-Pair-Share" with specific framing)
- `belief_challenging_encounter` — Specific belief named and challenged (e.g., "The belief that revenue equals business health — surfaced through a cash-flow case where a high-revenue business fails due to timing mismatches")
- `modality_switches` — Array of activity type transitions for this module; at least one switch per session

---

## Constraint Enforcement (runs before any output is shown)

Run this internal check sequence. All corrections are silent. Record what changed for the transparency note.

**Step 1 — DAG validation:**

Verify `prerequisite_modules` across all generated modules forms no circular dependencies. Check: for every module, trace its prerequisites recursively — if any path leads back to the starting module, a cycle exists. If a circular dependency is found: auto-reorder the modules to break the cycle (move the dependency-creating module later in the sequence). Record the reordering.

**Step 2 — Learning objectives coverage:**

Cross-reference every MO-* outcome_id from `workspace/*/01-outcomes/learning-objectives.md` against all module `learning_objectives` arrays. For any MO-* outcome_id that does not appear in any module's learning_objectives: add it to the most semantically appropriate module (match by topic similarity to the outcome description). Record which outcome_ids were added and to which modules.

**Step 3 — Social learning completeness:**

For each module, verify `social_learning` has all 4 sub-fields with correct types. Then check `group_processing_prompt` against this test: does it name a specific concept from this module's content?

Prohibited patterns (any prompt matching these patterns must be regenerated):
- "What went well?"
- "What would you do differently?"
- "How did your group work together?"
- "What were your takeaways?"
- Any prompt that could apply verbatim to any other module in the program

If a prompt is generic: regenerate it with an explicit instruction to name the specific [module topic] concept from the collaborative activity. Record regenerations.

**Step 4 — Thinking routine specificity:**

For each module, verify `metaskill_activation_activity` names a specific thinking routine. Generic labels like "discussion", "reflection", "group activity", "brainstorm", or "debrief" are not acceptable. Acceptable examples: "See-Think-Wonder", "Claim-Support-Question", "Connect-Extend-Challenge", "I Used to Think / Now I Think", "Ladder of Inference", "Circle of Viewpoints", "Compass Points". If generic: regenerate with a named routine appropriate to the primary_metaskill. Record changes.

**Step 5 — Belief encounter specificity:**

For each module, verify `belief_challenging_encounter` names a specific belief being challenged. Acceptable pattern: identifies the belief + describes the mechanism through which it is surfaced (e.g., "The belief that profit equals success — surfaced through a case where high-revenue businesses fail due to cash flow problems"). Generic patterns like "challenge your assumptions", "question what you know", or "surface limiting beliefs" are not acceptable. If generic: regenerate with specific belief and mechanism. Record changes.

**Step 6 — Record changes:**

Track all auto-corrections: how many modules were reordered, how many outcome_ids were added, how many group_processing_prompts were regenerated, how many thinking routines were replaced, how many belief encounters were made specific. This feeds the transparency note.

---

## Output Presentation

After constraint enforcement completes, display the results.

**Validation badge** (show only if no corrections were needed):

> All modules cover their objectives — sequence and collaborative activities validated.

**Transparency note** (show only if corrections were made — confident tone, not apologetic):

> I adjusted [N] item(s) — [brief example, e.g., "added MO-2-4 to Module 2 and made the group reflection prompts specific to each module's content"]. Here's the full module structure:

**Then display the gate summary table:**

```
## Your Module Structure

[1-2 sentence sequence rationale in plain language — why this order serves learners, grounded in what learners need to build on from one module to the next]

| Module | Objectives Covered | Sessions Planned | Core Thinking Skill | What This Module Challenges |
|--------|--------------------|------------------|---------------------|-----------------------------|
| [module_name] | [N objectives] | [N sessions] | [primary_metaskill plain name] | [paraphrase of belief_challenging_encounter in learner language] |
```

Column rules:
- **"Module"** shows `module_name` — never shows module_id like "M-1"
- **"Objectives Covered"** shows count only (not IDs) — e.g., "3 objectives"
- **"Sessions Planned"** shows session count based on module scope (estimate from contact_hours and module count)
- **"Core Thinking Skill"** shows `primary_metaskill` plain name (Exploring, Creating, Innovating, Adapting, Imagining, Communicating)
- **"What This Module Challenges"** is a one-phrase paraphrase of `belief_challenging_encounter` — what the module disrupts, in learner language (not the belief text verbatim)

After the table:

> Does this structure look right for your program?

---

## Module Structure Gate

After displaying the gate summary, silently update `workspace/{project-name}/STATE.md`:
- `Review Gates` → Module-Structure: `pending`

Then use `AskUserQuestion` with three options:

- **"Approve and continue"** — write files, update STATE.md, unlock Stage 5
- **"I have concerns"** — ask what's wrong, regenerate fully, re-present gate
- **"Start this over"** — destructive confirmation gate

**Critical timing: STATE.md stage status writes happen ONLY in the "Approve and continue" branch. "I have concerns" and "Start this over" never advance stage or gate status.**

---

## On "Approve and continue"

1. Write to `workspace/{project-name}/03-modules/` — all files written simultaneously, not progressively:

   Load `.claude/reference/schemas/stage-04-modules.md` as generation context before writing. Output must contain all required fields with exact enum values per schema.

   **sequence-rationale.md** — Overall explanation of module order:

   ```
   ## Module Sequence Rationale

   ### Overall Sequence
   [1-2 paragraphs explaining why modules are ordered this way, grounded in backward design — what learners need to be able to do before each module and why]

   ### Module Dependencies
   | Module | Requires | Rationale |
   |--------|----------|-----------|
   | M-1    | none     | [why M-1 is the entry point] |
   | M-2    | M-1      | [why M-2 requires M-1] |
   ```

   **M-1/module-spec.md**, **M-2/module-spec.md**, etc. — Full specification for each module:

   ```
   ## [module_name]

   <!-- internal: module_id=[M-N] -->
   **Module:** [module_name]
   **Prerequisites:** [prerequisite module names — "none" if this is the first module]

   ### Learning Objectives
   [List of outcome_id references from Stage 02]

   ### Content Chunks
   | Chunk | Duration | Cognitive Load Note |
   |-------|----------|---------------------|
   | [chunk_name] | [duration_minutes] min | [cognitive_load_note] |

   ### Collaborative Activity
   - **Group structure:** [activity_type]
   - **How it works:** [interdependence_structure]
   - **Individual accountability:** [accountability_mechanism]
   - **Group reflection prompt:** [group_processing_prompt]

   ### Core Thinking Skill
   - **Primary metaskill:** [primary_metaskill]
   - **Thinking routine:** [metaskill_activation_activity]

   ### What This Module Challenges
   [belief_challenging_encounter]

   ### Activity Transitions
   [modality_switches — list each transition]
   ```

2. Silently update `workspace/{project-name}/STATE.md`:
   - `Stage Progress` → Stage 4 status: `complete`, Completed: {today's date}
   - `Review Gates` → Module-Structure: `approved`, Approved: {today's date}
   - `Session Continuity` → **Next Action:** Run /curriculum:sessions to generate session content

3. End with brief confirmation:

   > Your module structure is written and saved. Run `/curriculum:sessions` to generate the session content. Your work is saved — clear context before running the next command.

---

## On "I have concerns"

Ask what's wrong:

> What would you like to change?

Take free-text feedback. Regenerate the FULL module structure (not individual modules) using the Stage 02 outcomes, Stage 03 assessments, project brief, and the user's feedback. Re-run all 5 constraint enforcement steps on the regenerated structure. Re-display the validation badge or transparency note (if any corrections were needed), then the gate summary table. Present the Module Structure Gate again.

Do not update STATE.md Module-Structure gate during this branch — it stays at `pending`. Stage status stays at current value.

---

## On "Start this over"

Use `AskUserQuestion` to confirm the destructive action:

> Are you sure? This will clear all the module structure work from this stage and start from the beginning.

Options: **"Yes, start over"** / **"Actually, keep what we have"**

**On "Yes, start over":**
- Do not write any files
- Reset Stage 4 status in STATE.md to `not-started`
- Reset Module-Structure gate to `not-reached`
- Regenerate from scratch: full generation + full constraint enforcement + display gate summary + Module Structure Gate

**On "Actually, keep what we have":** Return to the gate summary display and re-present the Module Structure Gate AskUserQuestion.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "I'm recording that"
- "Let me check the stage status"
- "Writing to STATE.md"

Gate status update timing:
- Module-Structure moves to `pending` when gate summary is first shown (before AskUserQuestion)
- Module-Structure moves to `approved` ONLY when user selects "Approve and continue"
- "I have concerns" loop: gate stays at `pending`, stage status stays at current value
- "Start this over" confirmed: both gate and stage status reset (gate → `not-reached`, stage → `not-started`)

Files written ONLY in the "Approve and continue" branch. Never write `03-modules/` files before approval.

---

## Schema Compliance Checklist

Before writing any output file, verify internally:

- [ ] `sequence-rationale.md` will be written with Overall Sequence section and Module Dependencies table
- [ ] One `module-spec.md` per module written to `M-N/` subdirectory (e.g., `M-1/module-spec.md`)
- [ ] Every module has: `module_id` (M-N format), `module_name` (descriptive, not "Module 1"), `learning_objectives` (real MO-* refs from Stage 02), `prerequisite_modules` (valid DAG, empty array for first module), `content_chunks` (with `chunk_name`, `duration_minutes`, `cognitive_load_note`), `social_learning` (all 4 sub-fields), `primary_metaskill` (exact enum), `metaskill_activation_activity` (named thinking routine), `belief_challenging_encounter` (specific belief named and mechanism described), `modality_switches` (at least 1 entry)
- [ ] `group_processing_prompt` is content-specific — names a concept from this module's content; is not a generic debrief question
- [ ] `activity_type` uses exact enum values: `individual` | `paired` | `small-group` | `full-cohort`
- [ ] `primary_metaskill` uses exact enum values: `Exploring` | `Creating` | `Innovating` | `Adapting` | `Imagining` | `Communicating`
- [ ] All MO-* outcome_ids from Stage 02 appear in at least one module's `learning_objectives`
- [ ] `prerequisite_modules` forms a valid DAG — no circular dependencies across the full module set
- [ ] Module-Structure gate written as `approved` in STATE.md in the approval branch only
- [ ] Files written to `03-modules/` under the correct project workspace folder
- [ ] All files written simultaneously (not progressively one at a time)
