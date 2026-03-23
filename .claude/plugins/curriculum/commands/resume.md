---
description: Resume an active curriculum project — shows current position and what to do next
---

# /curriculum:resume

Pick up where you left off. Shows where the project stands and routes you to the right next step.

## Behavior

### 1. Find active project

Look for `workspace/*/STATE.md`.

**No projects found:**
> No curriculum projects found. Run `/curriculum:init` to start one.

Stop here.

**One project found:** Use it.

**Multiple projects found:** Use `AskUserQuestion` to let the user pick:

> Which project would you like to resume?
> [List of project names from workspace directory names, title-cased]

### 2. Read STATE.md

Parse the following from `workspace/{project-name}/STATE.md`:

- Pipeline Position (Current Stage and Status)
- Stage Progress table
- Key Decisions (if intake is complete)
- Review Gates table
- Session Continuity (Last Session, Stopped At, Next Action, Resume Command)

### 3. Display status block

Show a clean, scannable summary. No walls of text.

**Format:**

```
**{Project Name}**

Stage {N}: {Stage Name} — {status}
{If Stopped At is set}: Last stopped at: {Stopped At value}
Next: {Next Action value}
```

If intake is complete (Stage 1: complete), add one line below the stage info:

```
Program: {Duration} for {Audience} ({Expertise Level})
```

If a Review Gate has status `pending`, surface it prominently:

```
> Review gate pending: {Gate Name}. Use /curriculum:approve to continue.
```

**Do not show:**
- Stage Progress table by default (show only if the user asks for detail)
- Gate rows that are `not-reached`
- Any explanation of how STATE.md works

### 4. Route to next action

Based on current position, end with the recommended command:

| Situation | Route |
|---|---|
| Stage 1 not-started | Run `/curriculum:intake` to begin |
| Stage 1 in-progress | Run `/curriculum:intake` to continue |
| Post-Intake gate pending | Run `/curriculum:approve` to review and continue |
| Stage 2 not-started or in-progress | Stage 2 (Outcome Design) — command available soon |
| Stage 3 not-started or in-progress | Stage 3 (Assessment Design) — command available soon |
| Post-Assessment gate pending | Run `/curriculum:approve` to review and continue |
| Stages 4–8 not-started or in-progress | Stage {N} ({Name}) — command available in a future update |
| Final Validation gate pending | Run `/curriculum:approve` to review |
| All stages complete | All stages complete. Run `/curriculum:approve` if Final Validation is pending, or your project is ready for delivery |

For stages without commands yet, show:
> Stage {N} ({Name}) — command available in a future update. Run `/curriculum:resume` to check back.

## Silent State Rule

Never announce state operations. Surface the information directly. Do not say:
- "Let me check STATE.md"
- "I'm reading your project state"
- "Checking where we left off"

The user experiences orientation — not a system explaining itself.

## Mid-stage interruption

If `Stopped At` is set and the current stage is `in-progress`, note clearly:

> Stage {N} was interrupted. Finish the current stage before advancing.

This is informational only — do not block any commands.
