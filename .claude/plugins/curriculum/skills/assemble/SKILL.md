---
name: assemble
description: Compile approved pipeline output into a delivery-ready package
disable-model-invocation: true
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:assemble — Delivery Package Assembler

You compile the pipeline output into a delivery-ready package. You do not spawn a Task agent — the file copy, HTML generation, and summary all happen in this command directly.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague confirming a package is ready to hand off. Lead with what's in the package, not the process that built it. Tone: confident, direct, warm.

## Writing for Clarity

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ("In this section we will...", "Now that we have..."). Start every paragraph with the conclusion, then support it. Use precise language — numbers beat adjectives, specific beats general. This applies to everything the user reads — generated content, questions, status messages, and instructions.

---

## Step 1 — Find active project

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths.

**No project found:**
> No curriculum project found. Run `/curriculum:init` to get started.

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

---

## Step 2 — Check Stage 5 prerequisite

Read the Stage 5 status from `workspace/{project}/STATE.md`.

If Stage 5 status is NOT `complete`:
> Sessions haven't been generated yet. Run `/curriculum:sessions` first.

Stop here.

---

## Step 3 — Assemble delivery files

Create the directory `workspace/{project}/delivery/` (overwrite if it already exists — re-running assemble is safe and idempotent).

Track two lists as you assemble:
- `assembled`: files successfully copied
- `missing`: files not found, with the command to generate them

### Session files

List all subdirectories under `workspace/{project}/04-sessions/` and sort them alphabetically. Assign sequential delivery names: the first sorted subdirectory becomes `session-1`, the second becomes `session-2`, and so on.

For each session subdirectory:
1. Create `workspace/{project}/delivery/session-N/`
2. If `workspace/{project}/04-sessions/{session-dir}/facilitator-guide.md` exists → copy to `delivery/session-N/facilitator-guide.md`. Add to `assembled`.
3. If `workspace/{project}/04-sessions/{session-dir}/participant-materials.md` exists → copy to `delivery/session-N/participant-materials.md`. Add to `assembled`.
4. If either file is missing → add to `missing` with note: "Run `/curriculum:sessions` to regenerate session content."

**Do NOT copy:** session.md, slide-outline.md, or any other files in the session directory.

### Transfer plan

Read `workspace/{project}/06-transfer/`.

If the directory contains any `.md` file → copy the first one found to `delivery/transfer-plan.md`. Add to `assembled`.

If the directory is empty or missing → add to `missing` with note: "Run `/curriculum:transfer` to generate the transfer plan."

### Marketing files

Read `workspace/{project}/07-marketing/`.

For each `.md` file in that directory → copy it to `delivery/{same filename}.md`. Add each to `assembled`.

If the directory is empty or missing → add to `missing` with note: "Run `/curriculum:marketing` to generate marketing materials."

---

## Step 4 — Generate HTML

After all file copies are complete, call generate-html.js via Bash. Run the command from the `dashboard/` directory so Node can resolve the `marked` dependency installed there:

```
cd {absolute path to dashboard/} && node {absolute path to .claude/plugins/curriculum/scripts/generate-html.js} {absolute path to workspace/{project}/} {project name}
```

To find the absolute path to the script: construct it from the plugin directory path. The script is located at `.claude/plugins/curriculum/scripts/generate-html.js` relative to the project root. Use the absolute path derived from the workspace location. The `dashboard/` directory is at the same level as `workspace/` and `.claude/`.

The script generates HTML versions of:
- `delivery/session-N/facilitator-guide.html` (for each session that has a facilitator-guide.md)
- `delivery/{marketing-filename}.html` (for each marketing .md file)

If the Bash call fails or returns an error: note it in the output but do not stop — the markdown files are still assembled and usable.

**HTML is NOT generated for:** participant-materials.md or transfer-plan.md.

---

## Step 5 — Show plain-language file list

Do NOT show a directory tree. Do NOT show a file count. Show a readable summary of what's in the package.

Format:

```
Your delivery package is ready.

What's included:

Session 1: facilitator guide + participant materials
Session 2: facilitator guide + participant materials
[... one line per session]
Transfer plan
[marketing file plain name] (+ web version)
[marketing file plain name] (+ web version)
```

Rules for this list:
- Use plain names, not file paths. "facilitator guide" not "facilitator-guide.md".
- For marketing entries: derive a plain name from the filename (e.g., `program-description.md` → "Program description"). Add "(+ web version)" if the HTML was generated successfully.
- For sessions: if a session is missing facilitator-guide.md or participant-materials.md, show the session entry with what IS present and note what's missing inline (e.g., "Session 2: facilitator guide — participant materials not yet generated").
- If HTML generation failed for a file that should have it, omit "(+ web version)" silently.

If there are missing files, show them after the included list:

```
Not yet generated:
- Transfer plan — Run `/curriculum:transfer` to generate it.
- Marketing materials — Run `/curriculum:marketing` to generate them.
```

Close with:

```
Files are in workspace/{project}/delivery/.
```

---

## Warm handoff close

**When invoked as a standalone command:**
> Your delivery package is assembled. Run `/curriculum:approve` to mark it delivery-ready.

**When invoked as a Skill from `/curriculum:approve`:** Do not show the warm handoff close — approve will provide the final confirmation message.

---

## State Management Rules

No STATE.md update is needed for assemble. Assembly is a packaging step, not a pipeline stage — it does not advance the pipeline or change any stage status.

All file reads and writes are silent. Never say:
- "Copying files"
- "Writing to disk"
- "Generating HTML"
- "Saving progress"
