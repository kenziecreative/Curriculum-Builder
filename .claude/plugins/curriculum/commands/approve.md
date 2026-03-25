---
description: Review and approve a stage gate before advancing the pipeline
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:approve

Review what was produced so far, then decide how to proceed. This command handles review gates that are NOT inline — the post-assessment gate (after Stage 3) and the final validation gate (after Stage 9). The post-intake gate is handled inline by `/curriculum:intake` itself.

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague walking a program sponsor through a gate decision. Your tone is confident and clear — describe what was built, state what needs a decision, and make it easy to choose. Write in plain language about what learners will experience, not about pipeline mechanics.

## Behavior

### 1. Find active project

Look for `workspace/*/STATE.md`.

**No projects found:**
> No curriculum projects found. Run `/curriculum:init` to start one.

Stop here.

**Multiple projects found:** Use `AskUserQuestion` to let the user pick (same logic as `/curriculum:resume`).

### 2. Check for a pending gate

Read the Review Gates table from STATE.md. Find any gate with status `pending`.

**No gate pending:**

> Nothing to approve right now. Current position: Stage {N} ({Stage Name}).
> {Next Action from Session Continuity}

Stop here.

### 3. Present stage output summary

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

**For Final Validation gate only — run verify silently first:**

Before reading stage directories or showing any summary, spawn ONE Task with the content of `.claude/plugins/curriculum/commands/verify.md` and `workspace/{project}/STATE.md`. Instruct it: "Run the verify checks defined in verify.md against workspace/{project}/. Return the issue list only — do not print anything to the user." Collect the returned issue list and store it as `verify_issues`. Do NOT display verify results yet. Proceed to building the summary below.

(Post-Assessment gate: skip this step — no verify check needed.)

---

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

**For Final Validation gate, show the complete pipeline summary:**

Read each stage directory ONLY if that stage's status is `complete` in STATE.md. For any stage not yet complete, show "Not yet generated" for that section.

Display in this format:

---
## Your Complete Curriculum Package

**[Program Name]** — [Duration] program for [audience description from Stage 1 in plain language]

**What participants learn:**
[Outcome count from 01-outcomes/] learning objectives spanning [Bloom span in plain language, e.g., "recall through create"] thinking levels

**How you'll know they learned it:**
[Assessment count from 02-assessments/] assessments — [formative count] during-program checks, [summative count] end-of-program assessments

**Program structure:**
[Module count from 03-modules/] modules, [session count from 04-sessions/] sessions

**Thinking skills activated:**
[If Stage 6 complete: list each metaskill with its named activation activity, e.g., "Exploring: See-Think-Wonder"]
[If Stage 6 not complete: Not yet generated]

**Transfer support:**
[If Stage 7 complete:]
Before: [readiness check format from 06-transfer/]
During: [real-work application count] real-work applications
After: Spaced follow-up at [intervals], [accountability structure type]
Measuring: [plain-language Kirkpatrick level] — [what's being measured]
[If Stage 7 not complete: Not yet generated]

**Marketing materials:**
[If Stage 8 complete: count of marketing elements — list element types, e.g., "program description, 3 learning promises, audience positioning"]
[If Stage 8 not complete: Not yet generated]

**Validation:**
[If Stage 9 complete and tier_1_failures == 0: All required checks passed]
[If Stage 9 complete and tier_1_failures > 0: N issues pending — list plain-language descriptions]
[If Stage 9 not complete: Not yet run]

**Delivery readiness:** *(add after the Validation section above)*

If `verify_issues` is empty:
```
**Delivery readiness:** Ready to deliver — all checks passed.
```

If `verify_issues` is not empty:
```
**Delivery readiness:** {N} item{s} need attention before delivery:
- {file}: {plain-language description}. Run {fix command}.
[one line per blocker]
```

---
This is your complete curriculum package. Is it ready to deliver?

### 4. Gate decision

Use `AskUserQuestion` with three options:

**For assessments review:**
> Here's what was designed for your program's assessments. Take a look, then tell me how you'd like to proceed:
>
> **Option 1: Approve and continue** — The assessments look right. Move on to building out the module structure and session content.
> **Option 2: I have concerns** — Something doesn't look right. Describe what you want to change and I'll revise before we continue.
> **Option 3: Start this stage over** — The assessment design missed the mark. Restart Stage 3 from scratch.

**For final package review:**
> Review the summary above — this is everything that will be in your delivered curriculum package.

If `verify_issues` is empty (clean verify):
> **Option 1: Approve — mark as delivery-ready** — Everything looks right. Mark this curriculum package as delivery-ready.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

If `verify_issues` is not empty (verify found blockers):
> **Option 1: Fix issues before approving** — The items listed above need to be resolved before this curriculum can be marked delivery-ready. Run the commands listed to regenerate the affected files, then run `/curriculum:approve` again.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

### 5. Handle the decision

**Option 1: Approve and continue**

Update STATE.md silently:
- Set the gate's status to `approved` with today's date (YYYY-MM-DD)
- Update Session Continuity: Next Action points to the appropriate next stage command or step

**For Post-Assessment gate:** Confirm with a named handoff close — state what was approved and what command to run next:
> {What was approved — e.g., "Your assessments are approved and saved"}. Run `{next command}` to continue. Your work is saved — clear context before running the next command.

**For Final Validation gate only:** After updating STATE.md, show:
> Assembling your delivery package now...

Then invoke `/curriculum:assemble` as a Skill (same auto-trigger pattern as validate.md uses for metaskills). Do not wait for user input before invoking.

After assemble completes, show the confirmation message:
> Your curriculum is marked as delivery-ready and your delivery package is assembled. Files are in `workspace/{project}/delivery/`.

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

This command handles only these review points:
- **Assessments review** (after Stage 3, before Stages 4–8)
- **Final package review** (after Stage 9)

The **intake review** is handled inline by `/curriculum:intake`. If a user runs `/curriculum:approve` when only the intake review is pending, tell them:
> The intake review happens at the end of `/curriculum:intake`. Run that command to complete your intake and review.
