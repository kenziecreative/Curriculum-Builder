---
description: Initialize a new curriculum project workspace
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:init

Set up a fresh workspace for a new curriculum project. Creates the project directory structure, STATE.md, and CLAUDE.md, then starts the intake conversation.

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague handing off a completed setup. Your tone is warm, confident, and direct — state what was done and what comes next, without ceremony.

## Behavior

### 1. Get project name

If the user ran `/curriculum:init {project name}`, use that as the project name.

If no name was provided, ask:

> **What should we call this project?**

Use `AskUserQuestion` with `type: free_text` — no options list, no example values. The user types their answer directly. Normalize the input: lowercase, spaces replaced with hyphens, strip special characters.

### 2. Check for existing workspace

List subdirectories under `workspace/`. If any subdirectory contains a `STATE.md` file, a project already exists in this workspace:

> A project already exists in this workspace. Run `/curriculum:resume` to continue it, or start a fresh clone for a new curriculum.

Stop here — do not overwrite.

### 3. Create workspace directory structure

Create `workspace/{project-name}/` with the following directories (per the manifest in `templates/project-scaffold/.gitkeep-dirs`):

```
workspace/{project-name}/
  00-project-brief/
  01-outcomes/
  02-assessments/
  03-modules/
  04-sessions/
  05-metaskills/
  06-transfer/
  07-marketing/
  08-validation/
  source-material/
  delivery/
```

No placeholder files inside the directories — each pipeline command creates its output when it runs.

### 4. Create STATE.md

Copy the contents of `templates/project-scaffold/STATE.md` into `workspace/{project-name}/STATE.md`.

After copying, update the Session Continuity section:
- **Last Session:** today's date (ISO format, YYYY-MM-DD)
- **Next Action:** Run /curriculum:intake to begin structured intake

Do this silently — no announcement.

### 5. Create CLAUDE.md

Copy `templates/project-scaffold/CLAUDE.md` into `workspace/{project-name}/CLAUDE.md` without modification.

Do this silently — no announcement.

### 5b. Show dashboard launch command

Before outputting the step 6 confirmation, output this block:

---
**Your workspace is ready. To view it in the dashboard:**

```
cd dashboard && npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

---

### 6. Confirm and chain into intake

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

Output exactly this confirmation (substituting the real project name):

> **{Project Name}** is ready. Let's start with a few questions about your program and learners.

Then immediately begin the intake conversation as described in `/curriculum:intake`. When `/curriculum:intake` is available as a command, chain to it directly. Until then, prompt the user with:

> Run `/curriculum:intake` to continue.

Your workspace is set up and ready. Run `/curriculum:intake` to start the intake interview. Your work is saved — clear context before running the next command.

## Silent State Rule

Never announce state operations. Do not say:
- "Creating STATE.md"
- "Setting up your workspace"
- "Initializing the project directory"
- "I'm updating STATE.md"

The user sees the confirmation message and the workspace appears — nothing else.

## Error Handling

If directory creation fails for any reason, report the specific failure clearly:

> Could not create `workspace/{project-name}/`. Check that the `workspace/` directory is writable and try again.

Do not partially complete the setup — if any step fails, report the failure and stop.
