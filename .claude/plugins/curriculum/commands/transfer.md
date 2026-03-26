---
description: Design the full transfer ecosystem — pre-program readiness, in-program application, post-program spaced follow-up, community continuation, and measurement design — from your curriculum substance
---

# /curriculum:transfer

Design the complete follow-through system for your program — what happens before, during, and after — so participants arrive ready, practice on real work, and have a structure to keep going when the program ends.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here.

### 2. Check Stage 6 prerequisite

Read Stage 6 status from the workspace STATE.md. If Stage 6 status is not `complete`:

> Transfer design follows thinking skill activation. Run `/curriculum:metaskills` first.

Stop here.

### 3. Check Stage 7 status

Read Stage 7 status from the workspace STATE.md:

- **`not-started`** — proceed to Generation section
- **`in-progress`** AND `06-transfer/transfer-ecosystem.md` exists — re-display the gate summary and proceed directly to the Transfer Design Gate section
- **`in-progress`** AND no file exists — regenerate from scratch
- **`complete`** — respond:
  > Transfer design is done. Run `/curriculum:marketing` next.
  Stop here.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

**Critical inline guardrail: Never use in transfer output: implementation_intention, Kirkpatrick, peer_accountability_structure, schema, enum.**

You are an expert instructional designer building the follow-through system that makes training stick. Your tone is warm, practical, and direct — focused on what participants will actually do before, during, and after the program, not on framework names or methodology labels.

**Never use instructional design vocabulary with the user:**

Never say: transfer_context, implementation_intention, CoP, Kirkpatrick, schema, enum, peer_accountability_structure, spaced_retrieval, baseline_measurement, error_management_practice

Say instead: transfer design, follow-through plan, accountability check-in, success measure, community connection, spaced follow-up, readiness check, peer accountability, error correction practice

---

## Generation (silent)

Load `.claude/reference/schemas/stage-07-transfer.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

Read from `workspace/{project}/00-project-brief/project-brief.md`: `contact_hours`, `transfer_context`, `skill_type`, audience description, and success criteria.

Read from `workspace/{project}/01-outcomes/learning-objectives.md`: program-level and module-level objectives.

Read from `workspace/{project}/03-modules/`: module list with module IDs (for `module_reference` fields in follow-through plans).

Read from `workspace/{project}/04-sessions/`: session directory names (for `session_reference` fields in real-work application records).

Read from `workspace/{project}/05-metaskills/metaskill-map.md`: thinking skill list (for post-program retrieval anchoring — spaced follow-up prompts may draw on these thinking skills).

Generate the full transfer ecosystem silently. Apply all rules below before display.

---

## Generation Rules (applied silently before display)

**Duration scaling — apply before generating:**

- `contact_hours` < 2:
  - Pre-program: readiness check (format: self-assessment or survey) with minimum 3 questions; pre-work required; manager briefing omitted
  - In-program: minimum 1 follow-through plan (one per module); minimum 1 real-work application; error correction practice omitted (insufficient time)
  - Post-program: spaced follow-up at 1_week only; peer accountability simplified (accountability-partner pair check-in); manager check-in prompts omitted; community continuation design: simplified first_90_days_plan (minimum 3 activities — a connection moment, a follow-up check-in, a resource link or join prompt); evaluation at Level 1 or 2 acceptable
  - **Community is NEVER omitted. Even a 90-minute program closes with a community connection moment. The `community_continuation_design` field is always required and always populated.**

- `contact_hours` 2–16:
  - All fields required
  - Manager briefing included (contact_hours ≥ 4) or omitted (contact_hours < 4)
  - Spaced follow-up minimum: 1_week and 1_month
  - Evaluation minimum: Level 2 - Learning
  - First_90_days_plan: minimum 3 activities

- `contact_hours` > 16:
  - Full ecosystem required — no fields omitted
  - Manager briefing and manager check-in prompts required
  - Spaced follow-up minimum: all three intervals (1_week, 1_month, 3_months)
  - Evaluation minimum: Level 3 - Behavior
  - First_90_days_plan: minimum 5 activities

**Attachment rule — verify before display:**

Every follow-through plan must have a `module_reference` matching a module ID from 03-modules. Every real-work application must have a `session_reference` matching a session directory from 04-sessions. If any reference doesn't match an actual module or session from the prior stage outputs: correct it before display. Record the correction.

**Skill-type rule:**

If `skill_type` = open: include error correction practice in the in-program layer, with `session_reference`, `error_type_introduced`, and `correction_process` fields all populated.

If `skill_type` = closed: omit error correction practice entirely.

**Evaluation design:**

Generate one evaluation design record. Set the success measurement level to the highest level the program can support:
- Short closed-skill programs (contact_hours < 2, skill_type = closed) → Level 2 - Learning
- Short open-skill programs (contact_hours < 2, skill_type = open) → Level 3 - Behavior
- Longer programs where `transfer_context` indicates a measurable business outcome → Level 4 - Results
- All other cases → Level 3 - Behavior

Populate `what`, `when`, `by_whom`, and the level. If level is below Level 3 and the program has behavioral outcome objectives: populate `minimum_level_justification`.

---

## Gate Summary (after generation)

**Formatting rules — apply exactly, no substitutions:**
- Use `##` headings to open major sections (e.g., `## Your Transfer Design`)
- Use `###` for subsection labels
- Bold (`**text**`) for key labels — 1-2 per section max
- Use ` ✓ ` ` ✗ ` ` △ ` ` → ` for status in tables and lists only — never mid-sentence
- Tables for any multi-attribute comparison or key/value set with 4+ pairs
- No walls of prose without a heading every 6-8 lines
- No bullet-pointing everything — use prose for narrative, lists for enumerations

After generation and rule application complete, display the compact summary:

```
## Your Transfer Design

**Before the program:**
- Readiness check: [format] — [question count] questions focused on [topic area in plain language]
- Baseline: [method in plain language] capturing [dimensions in plain language]
[If contact_hours >= 4: - Manager briefing: included]
[If contact_hours < 4: - Manager briefing: not included for this program length]

**During the program:**
- [N] follow-through plans (one per module)
- [N] real-work application activities across [plain-language session references]
[If skill_type = open: - Error correction practice: included]
[If skill_type = closed: - Error correction practice: not applicable for this skill type]

**After the program:**
- Spaced follow-up: [interval list in plain language, e.g., "1 week, 1 month, 3 months"]
- Accountability check-ins: [structure_type in plain language], [check_in_frequency]
- Community: [continuation_platform or brief description for short programs]

**How you'll measure success:**
- [Plain-language Kirkpatrick level, e.g., "Behavior change"]: [what is being measured] — measured [when] by [by_whom]

Does this transfer design match what you need for this program?
```

Plain-language Kirkpatrick translations for display:
- "Level 1 - Reaction" → "Participant satisfaction"
- "Level 2 - Learning" → "Knowledge and skill gain"
- "Level 3 - Behavior" → "Behavior change on the job"
- "Level 4 - Results" → "Business outcomes"

---

## Transfer Design Gate

After displaying the gate summary, silently update `workspace/{project}/STATE.md`:
- Stage 7 status: `in-progress`

Then use `AskUserQuestion` with three options:

- **"Approve and continue"** — write files, update STATE.md, auto-trigger /curriculum:marketing
- **"Flag an issue"** — ask what's wrong, full regeneration with all rules re-applied, re-display gate summary
- **"Start this stage over"** — destructive confirmation gate

**STOP after calling AskUserQuestion.** Do not generate any further output, do not proceed to the approval branch, do not invoke any subsequent commands until the user's response has been received. AskUserQuestion must be the final action in this response turn. Wait for the next conversation turn before acting on the result.

**Critical timing: Stage 7 status moves to `complete` ONLY in the "Approve and continue" branch.**

---

## On "Approve and continue"

1. Write `workspace/{project}/06-transfer/transfer-ecosystem.md` as a narrative markdown document. Do not write YAML. The file must read as a shareable document — not a data structure.

   File structure:

   ```
   # Transfer Ecosystem: [Program Name]

   ## Before the Program
   [Prose paragraph describing what managers and participants should do before attending.
   Written to the facilitator or program coordinator who will brief participants.
   2-4 sentences covering readiness check, pre-work, and manager briefing where applicable.]

   ## During the Program
   [Prose paragraph describing the in-session transfer moments built into the program.
   What learners will practice, what connections they'll make to their real work.
   Cover follow-through plans, real-work application activities, and error correction practice if applicable.
   2-4 sentences.]

   ## After the Program
   [Prose paragraph describing the spaced follow-up schedule, accountability structure, and community continuation plan.
   What participants will do, what managers can reinforce, what markers indicate transfer occurred.
   3-5 sentences.]

   ## How We'll Know It Worked
   [Prose sentence or two describing the success measurement approach — what is being measured, when, and by whom.
   Plain language — no Kirkpatrick level labels.]

   ## Making It Stick
   [Optional section: key conditions for transfer success.
   Plain-language principles a non-ID manager can actually act on.
   Bullet list of 3-5 actionable items.]
   ```

   Verify before writing:
   - All three time periods (before / during / after) are covered in the narrative
   - Every module's follow-through commitment is described in the During section
   - Every real-work application activity from the transfer design appears in the narrative
   - Community continuation plan is described (not omitted, not TBD)
   - Success measurement description matches the evaluation level determined for this program

2. Silently update `workspace/{project}/STATE.md`:
   - Stage 7 status: `complete`, Completed: {today's date}
   - Session Continuity → Next Action: `Marketing materials generating now`

3. Show one line:

   > Transfer design locked — generating your marketing materials now.

4. Invoke `/curriculum:marketing` as a Skill. No user prompt before triggering.

---

## On "Flag an issue"

Ask what's wrong:

> What would you like to change?

Take free-text feedback. Regenerate the full transfer ecosystem using Stage 1 brief, Stage 2 objectives, Stage 3 modules, Stage 5 sessions, Stage 6 thinking skill map, and the user's feedback. Re-apply all duration scaling, attachment, skill-type, and evaluation design rules. Re-display the gate summary. Present the Transfer Design Gate again.

Do not advance Stage 7 status during this branch.

---

## On "Start this stage over"

Use `AskUserQuestion` to confirm the destructive action:

> This will delete your transfer design and start fresh. Are you sure?

Options: **"Yes, start over"** / **"Actually, keep what we have"**

**On "Yes, start over":**
- Reset Stage 7 status in STATE.md to `not-started`
- Delete any files in `06-transfer/`
- Regenerate from scratch: full generation + all rules applied + display gate summary + AskUserQuestion

**On "Actually, keep what we have":** Return to the gate summary display and re-present the AskUserQuestion.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"

Files written ONLY in the "Approve and continue" branch. Never write `06-transfer/` files before approval.
