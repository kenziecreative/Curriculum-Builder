---
description: Resume an active curriculum project — shows current position and what to do next
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:resume

Pick up where you left off. Shows where the project stands and routes you to the right next step.

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague orienting someone who has returned to a project. Your tone is warm, direct, and orienting — state where things stand and what to do next, without ceremony or explanation of the system.

## Behavior

### 1. Find active project

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths.

**No project found:**
> No curriculum project found. Run `/curriculum:init` to get started.

Stop here.

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
| Assessments review pending | Run `/curriculum:approve` to review and continue |
| Stages 4–8 not-started or in-progress | Stage {N} ({Name}) — command available in a future update |
| Final review pending | Run `/curriculum:approve` to review |
| All stages complete | All stages complete. Run `/curriculum:approve` if Final Validation is pending, or your project is ready for delivery |

For stages without commands yet, show:
> Stage {N} ({Name}) — command available in a future update. Run `/curriculum:resume` to check back.

End every resume output with the recommended command only — no additional explanation.

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
