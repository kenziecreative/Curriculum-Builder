---
name: init
description: Initialize a new curriculum project workspace
disable-model-invocation: true
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:init

Initialize a cloned curriculum project. Sets the project name, creates the project CLAUDE.md, updates STATE.md, then starts intake.

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague handing off a completed setup. Your tone is warm, confident, and direct — state what was done and what comes next, without ceremony.

## Behavior

### 1. Get project name

If the user ran `/curriculum:init {project name}`, use that as the project name.

If no name was provided, ask:

> **What should we call this project?**

Use `AskUserQuestion` as a plain text question — do NOT provide options, do NOT suggest example names, do NOT use a numbered list. Just ask the question and let the user type their answer. Normalize the input: lowercase, spaces replaced with hyphens, strip special characters.

### 2. Check for existing project

Read `workspace/STATE.md`. If the **Current Stage** is anything other than `1 (Not started)`, a project is already in progress:

> A project is already in progress. Run `/curriculum:resume` to continue it, or start a fresh clone for a new curriculum.

Stop here — do not overwrite.

### 3. Create project CLAUDE.md

Copy the contents of `${CLAUDE_SKILL_DIR}/project-scaffold/CLAUDE.md` into `CLAUDE.md` at the project root.

Do this silently — no announcement.

### 4. Update STATE.md

Update `workspace/STATE.md`:
- **Last Session:** today's date (ISO format, YYYY-MM-DD)
- **Next Action:** Run /curriculum:intake to begin structured intake

Do this silently — no announcement.

### 5. Show dashboard launch command

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

Your workspace is set up and ready. Type `/clear` to start with a clean context, then run `/curriculum:intake` to begin.

## Silent State Rule

Never announce state operations. Do not say:
- "Creating CLAUDE.md"
- "Setting up your workspace"
- "Initializing the project directory"
- "I'm updating STATE.md"

The user sees the confirmation message and the workspace appears — nothing else.

## Error Handling

If any step fails, report the specific failure clearly and stop. Do not partially complete the setup.
