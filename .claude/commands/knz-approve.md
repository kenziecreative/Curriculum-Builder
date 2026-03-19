---
description: Review and approve a stage gate before advancing the pipeline
---

# /knz-approve

Review what was produced so far, then decide how to proceed. This command handles review gates that are NOT inline — the post-assessment gate (after Stage 3) and the final validation gate (after Stage 9). The post-intake gate is handled inline by `/knz-intake` itself.

## Behavior

### 1. Find active project

Look for `workspace/*/STATE.md`.

**No projects found:**
> No curriculum projects found. Run `/knz-init` to start one.

Stop here.

**Multiple projects found:** Use `AskUserQuestion` to let the user pick (same logic as `/knz-resume`).

### 2. Check for a pending gate

Read the Review Gates table from STATE.md. Find any gate with status `pending`.

**No gate pending:**

> Nothing to approve right now. Current position: Stage {N} ({Stage Name}).
> {Next Action from Session Continuity}

Stop here.

### 3. Present stage output summary

Read the relevant stage output directory for the pending gate:

| Gate | Read from |
|---|---|
| Post-Assessment | `02-assessments/` |
| Final Validation | `08-validation/` |

Summarize what was produced in plain language. Do not use schema field names or instructional design vocabulary unless the user used those terms during intake. Focus on what the learner experiences and what the program will actually do.

**For Post-Assessment gate, include:**
- How many assessments were designed and for which outcomes
- What the main performance tasks look like (one-line description each)
- Any notable decisions made during assessment design

**For Final Validation gate, include:**
- Overall validation result
- Any gaps or concerns the validation found
- Whether the program is ready for delivery or needs revision

Keep the summary under 10 lines. If outputs are complex, highlight the most important 3–5 points.

### 4. Gate decision

Use `AskUserQuestion` with three options:

**For Post-Assessment gate:**
> Here's what was designed for your program's assessments. Take a look, then tell me how you'd like to proceed:
>
> **Option 1: Approve and continue** — The assessments look right. Move on to building out the module structure and session content.
> **Option 2: I have concerns** — Something doesn't look right. Describe what you want to change and I'll revise before we continue.
> **Option 3: Start this stage over** — The assessment design missed the mark. Restart Stage 3 from scratch.

**For Final Validation gate:**
> Here's the validation summary for your program. How would you like to proceed?
>
> **Option 1: Approve and continue** — The validation looks good. Mark this program as ready for delivery.
> **Option 2: I have concerns** — Something needs fixing. Describe the issue and I'll revise before final approval.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

### 5. Handle the decision

**Option 1: Approve and continue**

Update STATE.md silently:
- Set the gate's status to `approved` with today's date (YYYY-MM-DD)
- Update Session Continuity: Next Action points to the appropriate next stage command or step

Confirm:
> Approved. {Next stage or action described in one sentence.}

**Option 2: I have concerns**

Ask the user to describe what needs changing:
> What would you like to change? Describe the specific issue and I'll revise.

Do NOT mark the gate as approved. Do NOT advance the pipeline. Once the user describes the concern, address it in the relevant stage output directory, then re-surface the gate for approval.

**Option 3: Start this stage over**

Confirm the destructive action before proceeding. Use `AskUserQuestion`:

> Are you sure you want to start Stage {N} ({Stage Name}) over? This will clear all output from that stage.
> - **Yes, start over** — clears the stage output and resets status to not-started
> - **No, go back** — returns to the approval options

If confirmed:
- Clear the stage output directory contents
- Reset the stage status in STATE.md to `not-started`
- Reset the gate status to `not-reached`
- Update Session Continuity with the appropriate next action

Confirm:
> Stage {N} ({Stage Name}) has been reset. Run the appropriate command to regenerate.

## Silent State Rule

All STATE.md updates happen without announcement. Do not say:
- "I'm updating STATE.md"
- "Marking the gate as approved"
- "Resetting the stage status"

The user sees the confirmation message — nothing else.

## Gate scope

This command handles only these gates:
- **Post-Assessment gate** (after Stage 3, before Stages 4–8)
- **Final Validation gate** (after Stage 9)

The **Post-Intake gate** is handled inline by `/knz-intake`. If a user runs `/knz-approve` when only the Post-Intake gate is pending, tell them:
> The intake review happens at the end of `/knz-intake`. Run that command to complete your intake and review.
