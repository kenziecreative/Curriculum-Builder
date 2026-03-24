---
description: Generate session content for all modules in parallel — dispatches subagent workers per module, shows progress, verifies output, marks Stage 5 complete without manual intervention
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:sessions — Session Generation Orchestrator

You are the session generation orchestrator. You read the module structure, dispatch one Task subagent per module in parallel, show progress as each module completes, verify all output files exist, and mark Stage 5 complete. You do NOT generate session content yourself — all generation happens in worker subagents.

---

## Prerequisites

### 1. Check workspace exists

Read `workspace/*/STATE.md`. Glob for any STATE.md under workspace/. If no STATE.md is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here. Do not proceed.

### 2. Check Stage 4 prerequisite

Read the Stage 4 status from the workspace STATE.md. If Stage 4 status is not `complete`:

> Session generation starts after the module structure is approved. Run `/curriculum:modules` first.

Stop here. Do not proceed.

### 3. Check Stage 5 status

Read Stage 5 status from the workspace STATE.md:

- `not-started` → Proceed to Module Reading section
- `pre-populated` → Read `workspace/*/04-sessions/session-manifest.md`. Run structure enforcement
  silently: verify each session has named outcomes mapped, flag sessions with NEEDS: template
  marker. Remove any `# NEEDS:` lines from the display (markers stay in raw file until full
  generation replaces them). Display the session manifest summary: session names, mapped outcomes,
  template TBD indicators. Present the review gate (three options below). Do not dispatch
  generation subagents — full session content generation happens only after the user approves or
  flags an issue.
  On "Looks good": proceed to Module Reading section and dispatch subagent Tasks as normal
  (session manifest provides context for each Task). Set Stage 5 status to `in-progress`.
  On "Flag an issue": take feedback, regenerate the manifest from project brief plus feedback,
  re-display. Do not dispatch full generation.
  On "Start over": wipe `workspace/*/04-sessions/`, set Stage 5 status to `not-started` (clearing
  the `pre-populated` status), restart from Module Reading section as if `not-started`.
- `in-progress` → Check which session directories already exist in `workspace/{project-name}/04-sessions/`. Identify which modules are missing complete session files (all 4 files per session). Re-dispatch Tasks only for incomplete modules. Proceed to Parallel Generation with the incomplete module list only.
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
- Output directory: `workspace/{project-name}/04-sessions/`

**Instructions to include in each Task:**
> Generate all [session_count] sessions for module [module_name]. Follow the session-generator.md specification exactly. Write 4 files per session: session.md, facilitator-guide.md, participant-materials.md, slide-outline.md. Directory format: {output_dir}M-N-S-N/ for each session. Enforce all TMA arc requirements. Apply DCR fields if skill_type==open AND bloom_level>=Analyze. Apply prohibited reflection stem rules. Return a completion signal listing which sessions were written.

As each Task completes and returns its completion signal, print one progress line:

> [module_name] sessions written — [N remaining] remaining.

Where [N remaining] counts how many Tasks have not yet returned. When the final Task returns, print:

> All modules complete — verifying files now.

---

## File Verification

After all Tasks report complete, verify that the expected files exist for every session across all modules. Do this by checking the file system directly.

For each module M-N with X sessions:
For each session M-N-S-1 through M-N-S-X:

Check that all 4 files exist:
- `workspace/{project-name}/04-sessions/M-N-S-N/session.md`
- `workspace/{project-name}/04-sessions/M-N-S-N/facilitator-guide.md`
- `workspace/{project-name}/04-sessions/M-N-S-N/participant-materials.md`
- `workspace/{project-name}/04-sessions/M-N-S-N/slide-outline.md`

**If any files are missing:**

> I wasn't able to write sessions for "[module_name]" — the files for that module are missing. Run `/curriculum:sessions` again to retry. (Your other modules are intact.)

Do NOT mark Stage 5 complete. Report each module that failed. Keep Stage 5 status as `in-progress`.

**If all files are verified:**

Proceed to Completion Summary.

---

## Completion Summary

Show:

```
Session generation complete.

[module_name 1]: [N] sessions
[module_name 2]: [N] sessions
[...]

[Total] sessions generated — all facilitator guides, participant materials, and slide outlines written.

Next: `/curriculum:validate` to run quality validation on your curriculum.
```

Silently update workspace STATE.md:
- Stage 5 status: `complete`
- Completed date: today's date in YYYY-MM-DD format
- Session Continuity → Next Action: Run /curriculum:validate to validate curriculum

Do not announce these state changes.

---

## Auto-Trigger Validation

After writing all STATE.md updates, automatically invoke the validation command:

> Running validation on your completed curriculum — this checks all required fields and scores quality dimensions.

Invoke `/curriculum:validate` as a Skill.

Do not wait for user input. This is the same auto-advance pattern used between discussion and planning phases.

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
