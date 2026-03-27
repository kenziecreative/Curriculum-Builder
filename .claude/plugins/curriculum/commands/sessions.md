---
description: Generate session content for all modules in parallel — dispatches subagent workers per module, shows progress, verifies output, marks Stage 5 complete without manual intervention
---

# /curriculum:sessions — Session Generation Orchestrator

You are the session generation orchestrator. You read the module structure, dispatch one Task subagent per module in parallel, show progress as each module completes, verify all output files exist, and mark Stage 5 complete. You do NOT generate session content yourself — all generation happens in worker subagents.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague reporting what was generated and what happens next. Your tone is confident and brief — state what was built, confirm the output, and name the next step. Do not explain the generation process.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here. Do not proceed.

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

### 2. Check Stage 4 prerequisite

Read the Stage 4 status from the workspace STATE.md. If Stage 4 status is not `complete`:

> Session generation starts after the module structure is approved. Run `/curriculum:modules` first.

Stop here. Do not proceed.

### 3. Input Validation

Read `workspace/{project}/curriculum-registry.json`. If the file does not exist, stop and report:

> No curriculum registry found. This usually means the intake stage needs to be re-run with the updated pipeline.

Verify the following fields exist and are non-empty:
- `time_allocations.modules` (at least one module entry)
- Each module entry has `sessions_planned` > 0
- `outcome_wording.session_outcomes` (at least one entry)

If any field is missing or empty, stop and report:

> Cannot start Sessions — {specific field description} is missing from the registry. Run `/curriculum:modules` to generate it.

Do not proceed to generation.

### 4. Check Stage 5 status

Read Stage 5 status from the workspace STATE.md:

- `not-started` → Proceed to Module Reading section
- `pre-populated` → Apply mode-routing logic:

  **Step 1 — Read Mode Assignment:**
  Read `workspace/{project}/STATE.md`. Look for `## Mode Assignment` table. Find the row where the Stage column contains "5:" or "Session Content".

  **Step 2 — Determine path:**

  - If Mode Assignment table is absent OR Stage 5 row not found → **gap-fill path**: proceed to existing session generation behavior. No diff. No error. Clean intake users are unaffected — behavior is identical to pre-audit-mode operation.
  - If mode = `gap-fill` → **gap-fill path**: same as above.
  - If mode = `hands-off` → **hands-off path** (see below).
  - If mode = `enrich` → **enrich path** (see below).

  **Gap-fill path (absent Mode Assignment or gap-fill mode):**
  Read `workspace/*/04-sessions/session-manifest.md`. Run structure enforcement silently: verify each session has named outcomes mapped, flag sessions with `# NEEDS:` template markers. Remove any `# NEEDS:` lines from the display (markers stay in raw file until full generation replaces them). Display the session manifest summary: session names, mapped outcomes, template TBD indicators. Present the review gate. Do not dispatch generation subagents — full session content generation happens only after the user approves.
  On "Looks good": proceed to Module Reading section and dispatch subagent Tasks as normal. Set Stage 5 status to `in-progress`.
  On "Flag an issue": take feedback, regenerate the manifest from project brief plus feedback, re-display. Do not dispatch full generation.
  On "Start over": wipe `workspace/*/04-sessions/`, set Stage 5 status to `not-started` (clearing the `pre-populated` status and removing the Mode Assignment row for Stage 5), restart from Module Reading section as if `not-started`.

  **Hands-off path:**
  1. Read all session files from `workspace/*/04-sessions/`.
  2. Run enforcement checks silently: verify session arc completeness (Theory→Method→Application structure), check for `# NEEDS:` template markers, strip any HTML comments from working content.
  3. If zero violations found: skip the diff table. Proceed directly to session display with this note: "Your session content meets all requirements — no changes needed." Then present the review gate.
  4. If violations found: show a side-by-side diff table — one row per session that has violations or missing required content. Sessions with no violations do not appear in the table.

     Diff table format:
     ```
     | Session | From your materials | What will be added/changed |
     |---------|---------------------|---------------------------|
     | [session plain name] | [what currently exists] | [what changes and one-line reason — plain language] |
     ```

     Plain language only in every cell. Never use field names or internal labels.

  5. Show diff gate (three options):
     - **"Looks good"** → apply enforcement fixes, remove `# NEEDS:` markers, strip HTML comments, write corrected files to `workspace/*/04-sessions/`, proceed to session generation via Module Reading section.
     - **"Flag an issue"** → take specific concern; re-display diff with concern noted; re-present diff gate.
     - **"Start over"** → wipe `workspace/*/04-sessions/`, set Stage 5 status to `not-started` in STATE.md (clearing `pre-populated` status and removing the Mode Assignment row for Stage 5), restart from Module Reading section as if `not-started`.

  **Enrich path:**
  1. Read all session files from `workspace/*/04-sessions/`.
  2. Run enforcement checks silently. Identify which sessions have missing required elements: pre-work absent, transfer activities missing, group reflection questions absent.
  3. For missing elements only: generate targeted content per session from the project brief and module specs — not full session regeneration.
  4. Show a side-by-side diff table for ALL sessions — every session gets a row showing what existed and what was added or changed. Mark added content NEW and changed content UPDATED in the "What will be added/changed" column (summary display only — written files contain no markers).

     Diff table format:
     ```
     | Session | From your materials | What will be added/changed |
     |---------|---------------------|---------------------------|
     | [session plain name] | [what currently exists] | [NEW: ... / UPDATED: ... — one-line reason, plain language] |
     ```

     Plain language only in every cell. Never use field names or internal labels.

  5. Show diff gate (three options):
     - **"Looks good"** → write complete session files to `workspace/*/04-sessions/` (clean content, no NEW/UPDATED markers in written files), proceed to session generation dispatch via Module Reading section.
     - **"Flag an issue"** → take specific concern; re-display diff with concern noted; re-present diff gate.
     - **"Start over"** → wipe `workspace/*/04-sessions/`, set Stage 5 status to `not-started` in STATE.md (clearing `pre-populated` status and Mode Assignment row for Stage 5), restart from Module Reading section as if `not-started`.

  **File writes happen only after diff gate approval ("Looks good"). Never write `04-sessions/` files before the gate passes.**
- `in-progress` → Read the Module Progress table from workspace STATE.md. Identify modules with status `not-started` or `in-progress`. Cross-reference against the file system to confirm which session directories are actually complete (all 4 files per session present). Re-dispatch Tasks only for modules that are not complete. Update Module Progress entries for any modules that have complete files on disk but were not marked `complete` in STATE.md — this handles the case where files were written but STATE.md was not updated before context cleared. Proceed to Parallel Generation with the incomplete module list only.
- `complete` → Respond: "Sessions are already generated for this program. All session content is in `04-sessions/`." Stop here.

---

## Module Reading

Read all module specs from `workspace/{project-name}/03-modules/`. For each subdirectory named M-N (e.g., M-1, M-2) that contains a `module-spec.md`:

- Extract: `module_id`, `module_name`, `sessions_planned` count from module-spec.md
- Build module list: `[{module_id, module_name, session_count, spec_path}]`

Also read these files in full — they are passed to each worker:
- `workspace/{project-name}/01-outcomes/learning-objectives.md`
- `workspace/{project-name}/00-project-brief/project-brief.md`

Read `.claude/reference/schemas/stage-05-sessions.md` — also passed to each worker.

Silently update workspace STATE.md Stage 5 status to `in-progress`. Do not announce this.

Write a Module Progress table to workspace STATE.md with one row per module, all set to `not-started`. Do this silently.

| Module | Name | Sessions | Status |
|--------|------|----------|--------|
| M-1 | {name} | {count} | not-started |
| M-2 | {name} | {count} | not-started |
...

(Replace placeholders with actual module data from the module list. Do not include header row template markers in the written file.)

Show:

> Generating sessions for [N] modules — [total session count] sessions total. This runs in parallel; I'll update you as each module completes.

Where [total session count] is the sum of `session_count` across all modules.

---

## Parallel Generation

For EACH module in the module list, spawn a Task subagent simultaneously. Do NOT await one Task before dispatching the next. Dispatch all Tasks at the same time.

Each Task receives:

**Description of work:**
> Generate all sessions for module [module_name] per the session-generator agent specification at .claude/plugins/curriculum/agents/session-generator.md

**Context provided to the Task:**
- The full content of `03-modules/M-N/module-spec.md` for this module
- The full content of `01-outcomes/learning-objectives.md`
- The full content of `00-project-brief/project-brief.md`
- The full content of `.claude/reference/schemas/stage-05-sessions.md`
- Output directory: `workspace/{project-name}/04-sessions/_drafts/`

**Instructions to include in each Task:**
> Generate all [session_count] sessions for module [module_name]. Follow the session-generator.md specification exactly. Write 4 files per session: session.md, facilitator-guide.md, participant-materials.md, slide-outline.md. Directory format: {output_dir}M-N-S-N/ for each session. Enforce all session arc requirements per the schema. Apply transfer design fields if skill_type==open AND bloom_level>=Analyze. Apply prohibited reflection stem rules. Return a completion signal listing which sessions were written.

As each Task completes and returns its completion signal, print one progress line:

> [module_name] sessions written — [N remaining] remaining.

After printing the progress line, silently update the Module Progress table in workspace STATE.md: set this module's status to `complete`.

Where [N remaining] counts how many Tasks have not yet returned. When the final Task returns, print:

> All modules complete — running draft audit now.

---

## Draft Audit

After all Tasks report complete, run these four checks against the files in `workspace/{project-name}/04-sessions/_drafts/`. All four must pass before promotion.

### Check 1: File Completeness
Verify the expected files exist for every session across all modules. Do this by checking the file system directly.

For each module M-N with X sessions, for each session M-N-S-1 through M-N-S-X, verify all 4 files exist with non-zero content:
- `workspace/{project-name}/04-sessions/_drafts/M-N-S-N/session.md`
- `workspace/{project-name}/04-sessions/_drafts/M-N-S-N/facilitator-guide.md`
- `workspace/{project-name}/04-sessions/_drafts/M-N-S-N/participant-materials.md`
- `workspace/{project-name}/04-sessions/_drafts/M-N-S-N/slide-outline.md`

If any module's files are missing, report immediately (do not proceed to other checks):

> I wasn't able to write sessions for "[module_name]" — the files for that module are missing. Run `/curriculum:sessions` again to retry. (Your other modules are intact.)

Do NOT mark Stage 5 complete. Keep Stage 5 status as `in-progress`. Do not proceed.

### Check 2: Registry Consistency
Read `workspace/{project-name}/curriculum-registry.json`. For each outcome ID and module ID referenced in the draft session files, verify it exists in the registry. Flag any ID that appears in drafts but not in the registry.

### Check 3: Vocabulary Scan
Read `.claude/reference/curriculum-voice.md` never-say table. Scan all draft files for prohibited terms. List any violations found with file path and line content.

### Check 4: Schema Compliance
Read `.claude/reference/schemas/stage-05-sessions.md`. Verify all required fields are present in draft session files. Flag any missing required fields.

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

### Audit Result

If all four checks pass: promote files from `_drafts/` to `workspace/{project-name}/04-sessions/` (move, not copy). Delete the `_drafts/` directory after successful promotion. Then update the curriculum registry and proceed to Completion Summary.

If any check fails:
1. Attempt auto-fix for simple failures:
   - Vocabulary violations: substitute with the plain-language replacement from curriculum-voice.md
   - Missing fields that have obvious default values: fill in from registry data
2. Re-run the failing check(s) after auto-fix.
3. If still failing after auto-fix: stop and report the specific failures. Do not promote. Do not mark the stage complete.

   > Draft audit found {N} issue(s) that could not be auto-fixed:
   > - {file}: {specific problem}
   >
   > Fix these issues and run `/curriculum:sessions` again.

**After successful promotion**, update curriculum registry silently:

Load `.claude/reference/schemas/curriculum-registry-schema.md` for the exact JSON structure. Update `workspace/{project-name}/curriculum-registry.json`:

- Read the existing registry file.
- For each module in `time_allocations.modules[]`, count the actual session directories that exist under `workspace/{project-name}/04-sessions/M-N-S-*/` and set `sessions_completed` to that count.
- Set `time_allocations.last_updated` to current ISO datetime.
- Write the file as formatted JSON (2-space indent).

Do this silently — no announcement to the user.

Proceed to Completion Summary.

---

## Completion Summary

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

**Formatting rules — apply exactly, no substitutions:**
- Use `##` headings to open major sections (e.g., `## Session Generation Complete`)
- Use `###` for subsection labels
- Bold (`**text**`) for key labels — 1-2 per section max
- Use ` ✓ ` ` ✗ ` ` △ ` ` → ` for status in tables and lists only — never mid-sentence
- Tables for any multi-attribute comparison or key/value set with 4+ pairs
- No walls of prose without a heading every 6-8 lines
- No bullet-pointing everything — use prose for narrative, lists for enumerations

Show:

```
Session generation complete.

[module_name 1]: [N] sessions
[module_name 2]: [N] sessions
[...]

[Total] sessions generated — all facilitator guides, participant materials, and slide outlines written.

Your dashboard has been updated with the session plan.

Next: `/curriculum:validate` to run quality validation on your curriculum.
```

Silently update workspace STATE.md:
- Stage 5 status: `complete`
- Completed date: today's date in YYYY-MM-DD format
- Session Continuity → Next Action: Run /curriculum:validate to validate curriculum
- All Module Progress entries: set to `complete`

Do not announce these state changes.

---

## Next Stage Handoff

After writing all STATE.md updates and confirming all files verified:

> Sessions complete. Type `/clear` now, then run `/curriculum:validate` to check your curriculum.

Do not invoke validate automatically. Do not proceed in the current context. The user must clear context and run the next command manually. This ensures validation runs with a fresh context window, not a saturated one from session generation.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"

**Stage 5 status timing:**
- Moves to `in-progress` immediately before Task dispatch (after module reading)
- Moves to `complete` ONLY after file verification succeeds for all modules
- Stays `in-progress` if any module files are missing after verification

**No AskUserQuestion anywhere in this command.** Session generation is fully autonomous after Stage 4 approval. The only interactions are:
1. Reading the progress updates as modules complete
2. Reading the final completion summary

If the user has not approved Stage 4, the Prerequisites section stops the command with a clear message. Otherwise, the command runs to completion without any user prompts.
