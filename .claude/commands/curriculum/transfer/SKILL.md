---
name: transfer
description: Design the full transfer ecosystem — pre-program readiness, in-program application, post-program spaced follow-up, community continuation, and measurement design — from your curriculum substance
disable-model-invocation: true
---

# /curriculum:transfer

Design the complete follow-through system for your program — what happens before, during, and after — so participants arrive ready, practice on real work, and have a structure to keep going when the program ends.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here.

### Directory scheme detection

After identifying `{project}`, detect which directory numbering scheme this workspace uses:
- If `workspace/{project}/00-project-brief/` exists → use legacy scheme (00-08)
- If `workspace/{project}/01-project-brief/` exists → use new scheme (01-09)

Use this mapping for all subsequent directory references in this command:

| Stage | Legacy (00-08) | New (01-09) |
|-------|---------------|-------------|
| 1 - Intake | 00-project-brief | 01-project-brief |
| 2 - Outcomes | 01-outcomes | 02-outcomes |
| 3 - Assessments | 02-assessments | 03-assessments |
| 4 - Modules | 03-modules | 04-modules |
| 5 - Sessions | 04-sessions | 05-sessions |
| 6 - Metaskills | 05-metaskills | 06-metaskills |
| 7 - Transfer | 06-transfer | 07-transfer |
| 8 - Marketing | 07-marketing | 08-marketing |
| 9 - Validation | 08-validation | 09-validation |

### 2. Check Stage 6 prerequisite

Read Stage 6 status from the workspace STATE.md. If Stage 6 status is not `complete`:

> Transfer design follows thinking skill activation. Run `/curriculum:metaskills` first.

Stop here.

### 3. Input Validation

Read `workspace/{project}/curriculum-registry.json`. If the file does not exist, stop and report:

> No curriculum registry found. This usually means the intake stage needs to be re-run with the updated pipeline.

Verify the following fields exist and are non-empty:
- `learner_profile.data.transfer_context`
- `learner_profile.data.skill_type`
- `learner_profile.data.contact_hours`
- `learner_profile.data.success_criteria`
- `outcome_wording.program_outcomes` (at least one entry)

If any field is missing or empty, stop and report:

> Cannot start Transfer — {specific field description} is missing from the registry. Run `/curriculum:outcomes` to generate it.

Do not proceed to generation.

### 4. Stale upstream check

Read `workspace/{project}/curriculum-registry.json`. Read the Stage Progress table from `workspace/{project}/STATE.md` to find completion dates for upstream stages.

This stage depends on the following registry data:

| Registry section | This stage needs it because |
|---|---|
| `outcome_wording` | Transfer activities are anchored to specific learning outcomes — the outcome statements must be current |
| `learner_profile` | Transfer context, skill type, contact hours, and success criteria determine the entire transfer ecosystem structure |

If Stage 7 status is `not-started`, skip this check — there is nothing to be stale against.

For each section above, compare `{section}.last_updated` against the upstream stage's completion date in STATE.md:
- `outcome_wording` — compare against Stage 2 (Outcomes) completion date
- `learner_profile` — compare against Stage 1 (Intake) completion date

If any registry section's `last_updated` is more recent than the upstream stage's completion date in STATE.md, show:

> **Heads up:** The learning outcomes were updated on {outcome_wording.last_updated} — after Outcomes last ran. The transfer design you're about to generate may not reflect the latest outcome changes. You can proceed, or re-run `/curriculum:outcomes` first to pick up the changes.

Use `AskUserQuestion`:
- **"Proceed anyway"** — continue to generation with current registry data
- **"I'll re-run the upstream stage first"** — stop here; user will re-run

If no sections are stale, proceed silently.

### 5. Check Stage 7 status

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

## Writing for Clarity

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ("In this section we will...", "Now that we have..."). Start every paragraph with the conclusion, then support it. Use precise language — numbers beat adjectives, specific beats general. This applies to everything the user reads — generated content, questions, status messages, and instructions.

**Never use instructional design vocabulary with the user:**

Never say: transfer_context, implementation_intention, CoP, Kirkpatrick, schema, enum, peer_accountability_structure, spaced_retrieval, baseline_measurement, error_management_practice

Say instead: transfer design, follow-through plan, accountability check-in, success measure, community connection, spaced follow-up, readiness check, peer accountability, error correction practice

---

## Generation (silent)

### Source Material

Before generating, check `workspace/source-material/` for any files. If files exist, read them. These represent prior work the user has brought into the project — research, outlines, existing curriculum, or domain context. Generated content should build from and align with this material. The pipeline structures the user's knowledge; it does not replace it.

Load `.claude/reference/schemas/stage-07-transfer.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

Load `.claude/reference/audit-trail-format.md` for the canonical audit trail format. This must be available before the trail write step after successful draft promotion.

Load `.claude/reference/alignment-check-reference.md` for the alignment check logic. This must be available before the alignment check step in the draft audit.

Read from `workspace/{project}/curriculum-registry.json` field `learner_profile.data`: `contact_hours`, `transfer_context`, `skill_type`, `target_audience` (for audience description), and `success_criteria`. Do not read these fields from project-brief.md.

**Canonical outcome wording:** When writing transfer design elements that reference learning outcomes, read the exact outcome statement from `curriculum-registry.json` field `outcome_wording`. Use the statement verbatim in transfer activity descriptions. Do not paraphrase.

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
- [Measurement approach, e.g., "Behavior change on the job"]: [what is being measured] — measured [when] by [by_whom]

Does this transfer design match what you need for this program?
```

Measurement approach translations (use these plain descriptions, never the framework labels):
- Reaction-level → "Participant satisfaction"
- Learning-level → "Knowledge and skill gain"
- Behavior-level → "Behavior change on the job"
- Results-level → "Business impact"

---

## Transfer Design Gate

After displaying the gate summary, silently update `workspace/{project}/STATE.md`:
- Stage 7 status: `in-progress`

Then use `AskUserQuestion` with three options:

- **"Approve and continue"** — write files, update STATE.md, show context-break handoff to /curriculum:marketing
- **"Flag an issue"** — ask what's wrong, full regeneration with all rules re-applied, re-display gate summary
- **"Start this stage over"** — destructive confirmation gate

**STOP after calling AskUserQuestion.** Do not generate any further output, do not proceed to the approval branch, do not invoke any subsequent commands until the user's response has been received. AskUserQuestion must be the final action in this response turn. Wait for the next conversation turn before acting on the result.

**Critical timing: Stage 7 status moves to `complete` ONLY in the "Approve and continue" branch.**

---

## On "Approve and continue"

1. Create `workspace/{project}/06-transfer/_drafts/` if it does not exist. Write `workspace/{project}/06-transfer/_drafts/transfer-ecosystem.md` as a narrative markdown document. Do not write YAML. The file must read as a shareable document — not a data structure.

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
   Plain language — no measurement framework labels.]

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

### Draft Audit

Run these 11 checks against the file in `workspace/{project}/06-transfer/_drafts/`. All 11 must pass before promotion.

**Check 1: File Completeness**
Verify `transfer-ecosystem.md` exists in `_drafts/` with non-zero content containing all required sections: Before the Program, During the Program, After the Program, How We'll Know It Worked.

**Check 2: Registry Consistency**
Read `curriculum-registry.json`. Verify:
- Module references in follow-through plans match module IDs in registry `time_allocations`
- Program outcomes referenced match registry `outcome_wording.program_outcomes`
- Contact hours assumptions match registry `learner_profile.data.contact_hours`

This is a blocking failure — inconsistent references mean the transfer design is based on stale data.

**Check 3: Vocabulary Scan**
Read `.claude/reference/curriculum-voice.md`. Scan the draft for any term in the never-say table. This is auto-fixable — substitute with the plain-language replacement.

**Check 4: Schema Compliance**
Load `.claude/reference/schemas/stage-07-transfer.md`. Verify all required fields for the program's duration tier are covered in the narrative (the file is prose, but it must address every required schema element).

**Check 5: Transfer Layer Coverage (T1-25)**
Verify all three transfer layers are present in the narrative: pre-program (Before the Program section), in-program (During the Program section), post-program (After the Program section). Each section must contain substantive content, not placeholder text.

This is a blocking failure — requires regeneration.

**Check 6: Implementation Intentions (T1-26)**
Verify that the During the Program section references specific follow-through commitments for each module (at minimum one per module from the module list). Generic references like "each module includes a follow-through plan" without naming the modules are not acceptable.

This is a blocking failure — requires regeneration.

**Check 7: Error Management (T1-27)**
If `skill_type` from the registry is "open": verify the During section includes error correction practice with specific error types and correction processes. If `skill_type` is "closed": this check passes automatically.

This is a blocking failure — requires regeneration.

**Check 8: Spaced Retrieval Match (T1-28)**
Verify the After the Program section describes spaced follow-up at the intervals matching the duration scaling rules (1 week only for < 2 hours; 1 week + 1 month for 2-16 hours; all three intervals for > 16 hours). The number of described follow-up touchpoints must match the number of intervals.

This is a blocking failure — requires regeneration.

**Check 9: Evaluation Level (T1-29)**
Verify the How We'll Know It Worked section describes a measurement approach at or above the minimum level for this program type (Level 2 for short closed-skill; Level 3 for short open-skill or longer programs; Level 4 when business outcomes are specified). If below minimum, check whether `minimum_level_justification` rationale is present in the narrative.

This is a blocking failure — requires regeneration.

**Check 10: Community Continuation (T1-30)**
Verify the After the Program section includes community continuation content that is not empty, not "TBD", and not placeholder text. Must describe a specific continuation mechanism (platform, format, or activity).

This is a blocking failure — requires regeneration.

**Check 11: Source Material Alignment**

If no files exist in `workspace/{project}/source-material/` AND no `workspace/{project}/source-material/domain-research-findings.md` exists, skip this check — there is nothing to align against. Record in the trail: "Alignment Check: Skipped — no source material available."

Using the logic in `.claude/reference/alignment-check-reference.md`:

1. Read source material files from `workspace/{project}/source-material/` (including `domain-research-findings.md` if present).
2. Compare the draft transfer ecosystem against source material. Grounding-required areas for this stage: real-work application scenarios, success indicators. NOT checked: transfer activity structure, timeline logistics, community continuation format.
3. Check for all three distortion types: qualifier stripping, range narrowing, over-claiming grounding.
4. Flag any assumed content (content in grounding-required areas with no source backing) — this is a warning, not a block.
5. Report using the format in alignment-check-reference.md Section 6.

This is a blocking failure — alignment issues cannot be auto-fixed. They require re-generation.

### Verification Integrity

A check either passes its defined criteria or it fails. No middle ground.

**Rules:**
1. Do not rationalize a passing result. If a check's defined criteria are not met, the check fails — regardless of how close the result is.
2. Do not downgrade severity. If the check definition says "blocking," it blocks. You do not have the authority to change a blocking failure to a warning.
3. Do not invent passing conditions. If the criteria say "every module must be named," then one unnamed module is a failure, not "substantially complete."
4. Do not soften failure descriptions. Report exactly what failed and why. Do not add qualifiers that minimize the problem.
5. Do not bypass checks. Every defined check runs. A check that was skipped is treated as a failure, not an omission.

**Prohibited qualifiers — never use these when reporting check results:**
approximately, mostly, essentially, close enough, acceptable, nearly, substantially, reasonably, adequate, sufficient, largely, broadly, generally, for the most part, in most cases, with minor exceptions

**If you find yourself wanting to write "mostly passes" or "essentially meets the criteria," the check failed.**

**Audit Result:**

If all 11 checks pass: promote `transfer-ecosystem.md` from `workspace/{project}/06-transfer/_drafts/` to `workspace/{project}/06-transfer/transfer-ecosystem.md` (move, not copy). Delete the `_drafts/` directory after successful promotion. Then proceed to the STATE.md update and completion message below.

If any check fails:
1. Attempt auto-fix for simple failures:
   - Vocabulary violations (Check 3): substitute with the plain-language replacement from curriculum-voice.md
   - Registry consistency defaults (Check 2): correct module ID references using registry canonical IDs
   - Outcome drift: replace draft outcome wording with registry canonical wording
2. Re-run the failing check(s) after auto-fix.
3. If content checks (Checks 5–11) still fail after auto-fix: regenerate the transfer ecosystem narrative. Re-run all 11 checks on the new draft. Track this as attempt 2.

   **Retry constraint injection:** Each retry must add cumulative constraints to the regeneration prompt:
   - Attempt 2: inject the specific failing check criteria as explicit generation constraints
   - Attempt 3: inject both the attempt-2 constraints plus the verbatim failure reason from attempt 2

4. After 3 failed attempts, stop and escalate. Do not promote. Do not mark the stage complete. Present the escalation in plain language:

   > I wasn't able to produce a transfer design that passes all checks after three tries. Here's what kept failing:
   > - [Plain-language description of the specific problem — what was missing or wrong, not the check ID]
   > - [Where in the file the problem appeared]
   > - [What to try: specific suggestion for how to provide different input or adjust the program design]
   >
   > Run `/curriculum:transfer` again and flag an issue to provide different direction.

5. Structural failures (Checks 1, 2, 4) stop immediately — no retry. Report the specific failure and stop.

   Alignment issues that persist at escalation must be described in plain language: what the source material says, what the draft said instead, and what the user needs to correct. No internal codes or check IDs.

2. Update audit trail (only after successful promotion):

   Read `workspace/{project}/audit-trail.md`. If Stage 7's section already exists (re-generation), replace it. Otherwise append.

   Write the Stage 7 section following the format in `.claude/reference/audit-trail-format.md`:

   **Grounded In:** For each transfer layer produced, list:
   - **Pre-program activities**: which source material file and specific claim or audience context shaped the readiness check design
   - **In-program follow-through plans**: which source material file and specific claim shaped the real-work application activities or follow-through commitments per module
   - **Post-program spaced follow-up**: which source material file and specific claim shaped the spaced retrieval intervals or accountability structure
   - **Community continuation**: which source material file (if any) shaped the community continuation design

   **Agent-Generated:** List content produced from the agent's own knowledge — e.g., "Evaluation level determination", "Spaced follow-up interval selection", "Error correction practice design (open-skill programs)", "Manager briefing structure", "Accountability check-in format".

   **Read but Not Referenced:** List any source material files that were loaded but not incorporated into transfer design. If all loaded files were referenced, write: All loaded files were referenced above. If no source files were loaded, omit this subsection.

   **Alignment Check:** (write only if alignment check passed — omit this subsection if check was skipped or if stage escalated before passing)
   - **Result:** PASS
   - **Issues found:** {0 or count of issues that were resolved through retry}
   - **Distortions detected:** {count — qualifier stripped, range narrowed, or over-claimed grounding}
   - **Assumed content areas:** {list section names where no source backing was found, or "None"}
   - **Attempts:** {1 if passed on first try, 2 or 3 if retries were needed}

   Update the Build Summary block at the top of the trail:
   - Add "Stage 7: Transfer" to the Stages completed list
   - Recalculate grounding percentage
   - Increment alignment checks counter by 1 (or note "skipped" if no source material)

   Do this silently — no announcement to the user.

3. Silently update `workspace/{project}/STATE.md` (only after successful promotion):
   - Stage 7 status: `complete`, Completed: {today's date}
   - Session Continuity → Next Action: `Run /curriculum:marketing to generate enrollment materials`

4. Show one line:

   > Your transfer ecosystem is written and saved. Type `/clear` now, then run `/curriculum:marketing` to generate enrollment materials.

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
