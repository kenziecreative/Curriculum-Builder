# Session-Start Hook

**Fires:** At the start of every Claude Code session in a KNZ Curriculum Builder workspace
**Purpose:** Restore pipeline context so every session continues seamlessly from the last

---

## Behavior

### Step 1: Detect active curriculum project

Look for `workspace/*/STATE.md` at the plugin root. If no `workspace/` directory exists,
or if no STATE.md is found within it, do nothing — the user has not initialized a project
yet. Skip all subsequent steps silently.

### Step 2: Read STATE.md

Parse the following fields from STATE.md:
- `Pipeline Position` — Current Stage number and status
- `Stage Progress` table — Which stages are complete, in-progress, or not-started
- `Key Decisions` section — Intake answers that govern all downstream generation
- `Review Gates` table — Gate statuses (not-reached, pending, approved)
- `Session Continuity` — Last Session date, Stopped At, Next Action, Resume Command

### Step 3: Surface context to the user

Present a brief, scannable context block at the start of the session. Do not preface it
with "I'm reading STATE.md" or "Let me check where we left off" — surface the information
directly as ambient context. The user should feel oriented, not informed that a process ran.

**What to include:**

If intake is not yet started (Stage 1: not-started):
> This project hasn't started intake yet. Run /knz-intake to begin.

If a stage is in-progress (any stage: in-progress):
> **[Project Name]** — Stage [N] ([Stage Name]) is in progress.
> Stopped at: [Stopped At value]
> Next: [Next Action value]

If a review gate is pending:
> Review gate pending: [Gate Name]. Approve to continue to Stage [N].

If all stages through the last completed stage are done and no gate is pending:
> **[Project Name]** — Stage [N] complete. Ready for Stage [N+1].
> Next: [Next Action value]

Include a one-line summary of Key Decisions if intake is complete (Stage 1: complete):
> Intake: [Duration] program for [Audience] ([Expertise Level], [Skill Type])

### Step 4: Flag mid-stage interruption

If `Stopped At` is populated and the current stage status is `in-progress`, the session
was interrupted before the stage completed. Note this clearly:

> Stage [N] was interrupted. Resolve the current stage before advancing.

Do not block any commands — this is informational, not a gate. The user decides how to proceed.

### Step 5: Pending gate awareness

If any Review Gate has status `pending`, remind the user:

> The [Gate Name] review gate is pending your approval. Use /knz-approve to continue.

If the gate is `not-reached`, do not mention it. Only surface gates the user needs to act on.

---

## Silent State Rule (INFR-10)

Never announce state operations. The following phrases are prohibited:
- "Let me check STATE.md"
- "I'm reading the project state"
- "Updating STATE.md"
- "I'll update your progress"
- "Checking where we left off"

State management is infrastructure. It happens in the background of every interaction.
The user experiences continuity — not a system that explains itself.

---

## Graceful Absence

If any of these conditions are true, skip all output silently:
- `workspace/` directory does not exist
- No subdirectory in `workspace/` contains a STATE.md
- STATE.md exists but cannot be parsed (malformed)

Do not log errors or explain the absence. The user will initialize when ready.

---

## Example Output (Stage 4 in-progress, post-assessment gate approved)

```
**Hello Alice — Entrepreneurship Fundamentals** — Stage 4 (Module Structure) in progress.
Stopped at: Draft module arc for Module 3 of 5
Next: Run /knz-modules to continue module structure generation

Intake: 8-week program for early-stage entrepreneurs (novice, practical skill)
```

---

## Hook Registration

This hook is registered in the plugin's Claude Code configuration. It fires automatically
on session start when Claude Code opens a workspace that contains this plugin. No manual
invocation is needed.

File: `.claude/hooks/session-start.md`
Scope: Plugin-level (applies to all curriculum project workspaces under this plugin)
Trigger: Session start
