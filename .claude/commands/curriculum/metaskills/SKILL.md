---
name: metaskills
description: Map six core thinking skills to specific activation activities — enforces thinking routine specificity, developability sequence, and real-work transfer prompts
disable-model-invocation: true
---

# /curriculum:metaskills

Map the core thinking skills that run through your program to specific named activities and real-work connection prompts — so learners don't just acquire skills in training, they know exactly how to use them on the job.

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

### 2. Check Stage 5 prerequisite

Read Stage 5 status from the workspace STATE.md. If Stage 5 status is not `complete`:

> Thinking skill activation happens after session content is generated. Run `/curriculum:sessions` first.

Stop here.

### 3. Input Validation

Read `workspace/{project}/curriculum-registry.json`. If the file does not exist, stop and report:

> No curriculum registry found. This usually means the intake stage needs to be re-run with the updated pipeline.

Verify the following fields exist and are non-empty:
- `learner_profile.data.transfer_context`
- `outcome_wording.module_outcomes` (at least one entry)

If any field is missing or empty, stop and report:

> Cannot start Metaskills — {specific field description} is missing from the registry. Run `/curriculum:outcomes` to generate it.

Do not proceed to generation.

### 4. Check Stage 6 status

Read Stage 6 status from the workspace STATE.md:

- **`not-started`** — proceed to Generation section
- **`in-progress`** AND `05-metaskills/metaskill-map.md` exists — re-display the activation map gate and proceed directly to the Gate section
- **`in-progress`** AND no file exists — regenerate from scratch
- **`complete`** — respond:
  > Thinking skills are already mapped. Run `/curriculum:transfer` next.
  Stop here.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer helping a program sponsor connect learning to real work. Your tone is confident, warm, and direct — like a consultant who sees exactly how each skill the program develops will show up in participants' daily work. Lead with what learners will do and where they'll do it, not how the mapping was generated.

**Never use instructional design vocabulary with the user:**

Never say: metaskill, schema, enum, bloom_level, activation_activity, DAG, Bloom's, evidence_level, sequence_position, imagining_adjacent_practice

Say instead: thinking skill, practice activity, named thinking routine, real-work connection, evidence gap, adjacent practice

---

## Generation (silent)

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

### Source Material

Before generating, check `workspace/source-material/` for any files. If files exist, read them. These represent prior work the user has brought into the project — research, outlines, existing curriculum, or domain context. Generated content should build from and align with this material. The pipeline structures the user's knowledge; it does not replace it.

Load `.claude/reference/schemas/stage-06-metaskills.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

Load `.claude/reference/audit-trail-format.md` for the canonical audit trail format. This must be available before the trail write step after successful draft promotion.

Read from `workspace/{project}/curriculum-registry.json` field `learner_profile.data`: `contact_hours` and `transfer_context`. Do not read these fields from project-brief.md.

**Canonical outcome wording:** When writing metaskill activation records that reference learning outcomes, read the exact outcome statement from `curriculum-registry.json` field `outcome_wording`. Use the statement verbatim. Do not paraphrase or summarize outcome statements in metaskill descriptions.

Read from `workspace/{project}/01-outcomes/learning-objectives.md`: objective list and bloom levels.

Read from `workspace/{project}/03-modules/module-structure.md` (or the module subdirectories under `workspace/{project}/03-modules/`): module list and module IDs for use in `module_reference` fields.

Read from `workspace/{project}/04-sessions/`: session directory names for use in `target_sessions` fields.

Generate the full metaskill activation map silently — no running commentary during generation. Then run these five constraint enforcement steps. All corrections are silent. Record what changed.

---

## Constraint Enforcement (runs before any output is shown)

**Step 1 — Duration scaling:**

Apply the ceiling rule before display:
- `contact_hours` < 2: maximum 3 activations; at least 1 must be Exploring, Creating, or Communicating (high evidence); all-six coverage rule waived
- `contact_hours` 2–16: 4–5 activations; coverage rule applies
- `contact_hours` > 16: all six thinking skills required; full coverage and distribution rules apply

If generated count exceeds ceiling: trim by removing lower-developability thinking skills first. Remove in this order: Adapting first, then Innovating, then Imagining, then Communicating, then Feeling (if used), then Creating — keeping Exploring last. Record any trims.

**Step 2 — Developability hierarchy:**

Assign `sequence_position` values across all activation records. Then verify:
- The first Innovating activation has a higher `sequence_position` than at least one Exploring activation AND at least one Creating activation
- The first Adapting activation has a higher `sequence_position` than at least one Exploring activation AND at least one Creating activation

If either constraint is violated: reorder `sequence_position` values to satisfy the constraint without changing content. Record the reordering.

**Step 3 — Thinking routine specificity:**

For each `activation_activity`: verify it names a specific thinking routine. The following patterns are prohibited and must be replaced:
- "encourage creativity", "encourage exploration", "encourage discussion"
- "discussion", "reflection", "brainstorm", "debrief", "explore", "discuss"
- Any phrase that could apply to any session without modification

Acceptable named routines include (not exhaustive): "See-Think-Wonder", "Claim-Support-Question", "Pre-mortem", "I Used to Think / Now I Think", "Connect-Extend-Challenge", "Five Whys", "Charette Protocol", "SCAMPER", "Circle of Viewpoints", "Ladder of Inference", "Think-Pair-Share with specific framing", "Compass Points".

If any activity is generic: replace with a named routine appropriate to the thinking skill and content domain. Record the replacement.

**Step 4 — Transfer prompt grounding:**

For each `transfer_prompt`: verify it references the specific `transfer_context` from Stage 1 — names a real work situation, artifact, or decision the learner will actually face. Generic phrases are prohibited:
- "apply this to your work"
- "think about how you use this"
- "consider how this applies to your situation"
- Any prompt that does not name a specific work context

If any prompt is generic: regenerate it with an explicit reference to the `transfer_context`. Record changes.

**Step 5 — Imagining conditional fields:**

For any record with thinking skill = Imagining:
- Set `evidence_gap_acknowledgment: true`
- Set `imagining_adjacent_practice` to one of: "scenario planning", "futures thinking", or "mental simulation" (pick the most appropriate for the content domain)
- Verify `activation_activity` names a routine consistent with the chosen adjacent practice (e.g., "Pre-mortem" aligns with scenario planning; "Futures Wheel" with futures thinking)

Record any fields added.

---

## Gate Display (after constraint enforcement)

**Formatting rules — apply exactly, no substitutions:**
- Use `##` headings to open major sections (e.g., `## Your Thinking Skill Activation Plan`)
- Use `###` for subsection labels
- Bold (`**text**`) for key labels — 1-2 per section max
- Use ` ✓ ` ` ✗ ` ` △ ` ` → ` for status in tables and lists only — never mid-sentence
- Tables for any multi-attribute comparison or key/value set with 4+ pairs
- No walls of prose without a heading every 6-8 lines
- No bullet-pointing everything — use prose for narrative, lists for enumerations

After all five steps complete, display the full activation plan. Format per thinking skill:

```
**[Thinking Skill Name]**
Practice activity: [named thinking routine]
When: [plain-language session reference, e.g., "Session 2 — application block"]
Real-work connection: [specific real-work situation from the learner's context]
```

For any Imagining record, add:

```
Note: This thinking skill has limited research evidence — the adjacent practice ([plain-language name of imagining_adjacent_practice]) is used to build the skill indirectly.
```

If constraint enforcement made any corrections, show a brief transparency note before the map (confident tone, not apologetic):

> I tightened [N] item(s) — [brief plain-language example, e.g., "replaced two generic activities with named thinking routines and grounded the real-work prompts in your business context"]. Here's the full activation plan:

Then show the activation plan, followed by:

> Does this activation plan match what you want for this program?

---

## Activation Plan Gate

After displaying the gate, silently update `workspace/{project}/STATE.md`:
- Stage 6 status: `in-progress`

Then use `AskUserQuestion` with three options:

- **"Approve and continue"** — write files, update STATE.md, show context-break handoff to /curriculum:transfer
- **"Flag an issue"** — ask what's wrong, full regeneration with all five steps re-run, re-display
- **"Start this stage over"** — destructive confirmation gate

**STOP after calling AskUserQuestion.** Do not generate any further output, do not proceed to the approval branch, do not invoke any subsequent commands until the user's response has been received. AskUserQuestion must be the final action in this response turn. Wait for the next conversation turn before acting on the result.

**Critical timing: Stage 6 status moves to `complete` ONLY in the "Approve and continue" branch. "Flag an issue" and "Start this stage over" never advance stage status to complete.**

---

## On "Approve and continue"

1. Write `workspace/{project}/{metaskills-dir}/_drafts/metaskill-map.md` with complete schema-compliant YAML content. Use the detected scheme directory name for `{metaskills-dir}`: `05-metaskills` for the legacy scheme (00-08), `06-metaskills` for the new scheme (01-09). All required fields per the stage-06-metaskills.md schema must be present, including:
   - `metaskill_name` (exact enum value)
   - `activation_activity` (named thinking routine)
   - `transfer_prompt` (grounded in real-work context)
   - `target_sessions` (array of session references from stage-05 output)
   - `module_reference` (module ID from stage-04 output)
   - `sequence_position` (integer reflecting developability hierarchy)
   - `evidence_level` (matches prescribed level: Exploring/Creating/Communicating → high; Innovating/Adapting → moderate; Imagining → emerging)
   - `evidence_gap_acknowledgment` (true only for Imagining; false or omitted for others)
   - `imagining_adjacent_practice` (only for Imagining records)

2. Run the Draft Audit against `workspace/{project}/{metaskills-dir}/_drafts/`. All six checks must pass before promotion.

### Draft Audit

**Check 1: File Completeness**
Verify `metaskill-map.md` exists in `_drafts/` with non-zero content.

**Check 2: Registry Consistency**
Read `workspace/{project}/curriculum-registry.json`. For each module ID and session reference in the draft file, verify it exists in the registry. Flag any ID that appears in drafts but not in the registry.

**Check 3: Vocabulary Scan**
Read `.claude/reference/curriculum-voice.md` never-say table. Scan the draft file for prohibited terms. List any violations found with file path and line content.

**Check 4: Schema Compliance**
Read `.claude/reference/schemas/stage-06-metaskills.md`. Verify all required fields are present in the draft file. Flag any missing required fields.

**Check 5: Outcome Drift**
Read `workspace/{project}/curriculum-registry.json` fields `outcome_wording.program_outcomes` and `outcome_wording.module_outcomes`. For each outcome ID referenced in the draft metaskill map, compare the outcome statement text against the registry's canonical wording. If the wording has changed beyond minor formatting (capitalization, punctuation), flag it as outcome drift. Report the outcome ID, the registry wording, and the draft wording.

This is a blocking failure — outcome wording must match the registry. Auto-fix by replacing draft wording with registry canonical wording.

**Check 6: Generic Content Detection**
For each metaskill entry's `activation_activity` and `transfer_prompt`: verify the content names specific skills, scenarios, or domain concepts from the curriculum. A thinking routine or prompt that could apply to any program without modification fails.

Patterns that fail: "Think about how this applies to your work", "Discuss the key concepts from this module", "Reflect on what you learned". Patterns that pass: "Use the Five Whys to trace a customer complaint back to its root cause", "Identify one service recovery scenario from last month where you could have applied the HEARD framework differently".

This is a blocking failure — generic content cannot be auto-fixed. It requires regeneration.

### Verification Integrity

A check either passes its defined criteria or it fails. No middle ground.

**Rules:**
1. Do not rationalize a passing result. If a check's defined criteria are not met, the check fails — regardless of how close the result is.
2. Do not downgrade severity. If the check definition says "blocking," it blocks. You do not have the authority to change a blocking failure to a warning.
3. Do not invent passing conditions. If the criteria say "every outcome ID must have at least one assessment," then 9 out of 10 is a failure, not "substantially complete."
4. Do not soften failure descriptions. Report exactly what failed and why. Do not add qualifiers that minimize the problem.
5. Do not bypass checks. Every defined check runs. A check that was skipped is treated as a failure, not an omission.

**Prohibited qualifiers — never use these when reporting check results:**
approximately, mostly, essentially, close enough, acceptable, nearly, substantially, reasonably, adequate, sufficient, largely, broadly, generally, for the most part, in most cases, with minor exceptions

**If you find yourself wanting to write "mostly passes" or "essentially meets the criteria," the check failed.**

**Audit Result:**

If all six checks pass: promote the file from `_drafts/` to `workspace/{project}/{metaskills-dir}/metaskill-map.md` (move, not copy). Delete the `_drafts/` directory after successful promotion. Then proceed to steps 3 and 4 below.

If any check fails:

### Auto-Fix Pass

1. Attempt auto-fix for deterministic failures only:
   - Vocabulary violations: substitute with the plain-language replacement from curriculum-voice.md
   - Missing fields with obvious defaults: fill from registry data
   - Outcome drift: replace draft wording with registry canonical wording
2. Re-run the failing check(s) after auto-fix.
3. Track what was fixed: "{N} vocabulary issues fixed, {N} outcome wording corrected, {N} registry defaults filled."

**Auto-fix boundary — these three categories only.** Anything involving content judgment (generic content) is NOT auto-fixable. Do not attempt to patch content problems — they require regeneration.

**Structural failures do not enter the retry loop.** File completeness (Check 1), registry consistency (Check 2), and schema compliance (Check 4) indicate a generation error, not a content quality issue. If any of these still fail after auto-fix, stop immediately and report — do not attempt retry.

### Retry with Cumulative Constraints (content failures only)

If blocking failures remain after auto-fix, those failures are from Check 6 (generic content), AND this is not yet attempt 3:

**Attempt tracking:** This is attempt {current} of 3 for {file name}.

1. Collect all remaining blocking failure reasons into a constraint list.
2. Regenerate ONLY the failing file — not the entire stage output. Inject the constraint list into the generation prompt:

   > The previous draft of {file} failed these checks:
   > - {failure 1 reason}
   > - {failure 2 reason from attempt 1, if attempt 2+}
   >
   > Regenerate this file. The new version MUST avoid these specific problems.

3. Write the regenerated file to `_drafts/`, replacing the failing draft.
4. Re-run ALL checks (not just the previously failing ones) on the regenerated file.
5. If all checks pass: proceed to promotion.
6. If checks still fail: increment attempt counter. If under 3, loop back to step 1 with the cumulative constraint list (attempt 2 carries failure reasons from attempt 1; attempt 3 carries reasons from attempts 1 and 2).

### Escalation (after 3 failed attempts)

If the file has failed 3 attempts:

1. Stop the stage. Do not promote any files. Do not mark the stage complete.
2. Present the escalation report:

   > Draft audit tried 3 times to fix {file} and could not resolve all issues.
   >
   > **What was auto-fixed:** {brief summary — e.g., "Fixed 2 vocabulary issues, corrected outcome wording in 1 place"}
   >
   > **What still needs attention:**
   > - **{Check name}** in {file path}, {section/field}: {plain-language description of the problem} — {concrete suggestion for what to change}
   > - **{Check name}** in {file path}, {section/field}: {plain-language description} — {suggestion}
   >
   > The draft files are in `_drafts/` if you want to edit them directly, or run `/curriculum:metaskills` to start fresh.

3. The escalation message must follow curriculum-voice.md — no ID jargon. Problem descriptions use the same plain language as the check failure messages established in Phase 18.

3. Update audit trail (only after successful promotion):

   Read `workspace/{project}/audit-trail.md`. If Stage 6's section already exists (re-generation), replace it. Otherwise append.

   Write the Stage 6 section following the format in `.claude/reference/audit-trail-format.md`:

   **Grounded In:** For each thinking skill activation record produced, list:
   - **[Thinking skill name]**: which source material file grounded the activation activity and transfer prompt, and the specific claim, work context, or domain concept that shaped it

   **Agent-Generated:** List content produced from the agent's own knowledge — e.g., "Thinking skill selection and assignment to modules", "Developability sequence ordering", "Imagining adjacent practice classification", "Evidence level assignments".

   **Read but Not Referenced:** List any source material files that were loaded but not incorporated into the metaskill map. If all loaded files were referenced, write: All loaded files were referenced above. If no source files were loaded, omit this subsection.

   Update the Build Summary block at the top of the trail:
   - Add "Stage 6: Metaskills" to the Stages completed list
   - Recalculate grounding percentage

   Do this silently — no announcement to the user.

4. Silently update `workspace/{project}/STATE.md` (only after successful promotion):
   - Stage 6 status: `complete`, Completed: {today's date}
   - Session Continuity → Next Action: `Run /curriculum:transfer to design the follow-through system`

5. Show one line:

   > Your thinking skill map is written and saved. Type `/clear` now, then run `/curriculum:transfer` to design the follow-through system.

---

## On "Flag an issue"

Ask what's wrong:

> What would you like to change?

Take free-text feedback. Regenerate the full activation map using Stage 1 brief, Stage 2 objectives, Stage 3 modules, Stage 5 sessions, and the user's feedback. Re-run all five constraint enforcement steps. Re-display the transparency note (if corrections were made) and the full activation plan. Present the Activation Plan Gate again.

Do not advance Stage 6 status during this branch.

---

## On "Start this stage over"

Use `AskUserQuestion` to confirm the destructive action:

> This will delete your thinking skill activation plan and start fresh. Are you sure?

Options: **"Yes, start over"** / **"Actually, keep what we have"**

**On "Yes, start over":**
- Reset Stage 6 status in STATE.md to `not-started`
- Delete any files in `05-metaskills/`
- Regenerate from scratch: full generation + all five constraint steps + display gate + AskUserQuestion

**On "Actually, keep what we have":** Return to the gate display and re-present the AskUserQuestion.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"

Files written ONLY in the "Approve and continue" branch. Never write `05-metaskills/` files before approval.
