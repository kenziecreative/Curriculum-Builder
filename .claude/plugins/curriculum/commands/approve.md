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

## Writing for Clarity

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ("In this section we will...", "Now that we have..."). Start every paragraph with the conclusion, then support it. Use precise language — numbers beat adjectives, specific beats general. This applies to everything the user reads — generated content, questions, status messages, and instructions.

**Critical inline guardrail: Never use in approval output: bloom_level, Kirkpatrick, outcome_id, schema, formative assessment, summative assessment, TMA, DAG, metaskill, parent_module_id, self_direction_level. Reference the full prohibited-term list in curriculum-voice.md.**

## Never-say List — Approval Output

These terms must never appear in the final gate summary, gate options, or any text the user reads during the approval flow. Use the plain-language replacement from curriculum-voice.md.

| Never say | Say instead |
|-----------|-------------|
| Kirkpatrick | success measurement, impact measurement |
| bloom_level, Bloom's | thinking level |
| formative assessment | check-in assessment |
| summative assessment | final assessment |
| metaskill | thinking skill, core skill |
| DAG | sequence, learning path |
| outcome_id, MO-X-X | (reference by name or number) |
| schema | (omit) |
| TMA | (omit) |
| parent_module_id | (omit) |
| self_direction_level | learner readiness |

## Verification Integrity

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

---

## Behavior

### 1. Find active project

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

### Cross-Stage Integration Check

**Also for Final Validation gate — run cross-stage integration check:**

Before showing any summary, trace the three link types below across all stages. Read `workspace/{project}/curriculum-registry.json` as the canonical source. Then read the actual stage files to verify consistency. Store all findings as `integration_findings`.

For stages not yet generated, mark each finding as "Pending — Stage N not yet generated" (not broken). Use the established pattern: if the target stage directory does not exist on disk, the reference is pending, not broken.

**Trace 1: Outcome IDs (bidirectional)**

- Forward: For every outcome ID in `outcome_wording.program_outcomes` and `outcome_wording.module_outcomes`, verify it appears in at least one assessment's `linked_outcomes` (Stage 3), at least one module's `learning_objectives` (Stage 4), and at least one session's content (Stage 5). An outcome that exists in the registry but is never assessed, never assigned to a module, or never taught in a session is an orphaned outcome — BLOCKING.
- Backward: For every outcome ID referenced in assessments, modules, or sessions, verify it exists in the registry's `outcome_wording`. An ID that appears in a downstream stage but not in the registry is a broken reference — BLOCKING.
- For stages not yet generated: mark as "Pending — Stage N not yet generated" — not a failure.

**Trace 2: Assessment Links (bidirectional)**

- Forward: For every assessment in `assessment_criteria.assessments`, verify its `linked_outcomes` reference real outcome IDs that exist in the registry.
- Backward: For every outcome ID in the registry, verify at least one assessment links to it. An outcome with no assessment is an uncovered outcome — BLOCKING.
- For stages not yet generated: mark as pending.

**Trace 3: Module References (bidirectional)**

- Forward: For every module in `time_allocations.modules`, verify it has a corresponding module spec directory (Stage 4) and session directories (Stage 5). A module in the registry with no files is a phantom module — BLOCKING.
- Backward: For every module directory that exists on disk, verify it has a corresponding entry in the registry. A directory with no registry entry is an unregistered module — BLOCKING.
- Verify `prerequisite_modules` references in module specs point to real module IDs. A prerequisite that references a non-existent module is a broken dependency — BLOCKING.
- For stages not yet generated: mark as pending.

**Registry-file drift detection:**

After all three traces, compare the registry data against the actual stage files for any content discrepancies (e.g., outcome statement in registry differs from outcome statement in 01-outcomes/ files). Report drift as a WARNING — not blocking. Per the Phase 19 "registry wins" principle, the registry is authoritative; user decides whether the stage file wording matters.

**Result classification:**

- Broken references (ID exists in one stage but not another where it should): BLOCKING
- Orphaned outcomes (defined but never used downstream): BLOCKING
- Phantom or unregistered modules: BLOCKING
- Registry-file drift: WARNING
- Pending (stage not yet generated): INFORMATIONAL — not a failure

Store all findings in `integration_findings` with this structure:

```json
{
  "blocking": [{ "type": "", "description": "", "source_stage": "", "target_stage": "", "id": "" }],
  "warnings": [{ "type": "", "description": "", "details": "" }],
  "pending": [{ "stage": "", "reason": "" }]
}
```

(Post-Assessment gate: skip this check — cross-stage tracing is not applicable at this gate.)

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

### Self-check — before you decide

Ask yourself:
- Does the final assessment match what you'd expect someone to actually do on the job?
- If a learner passed every assessment, would you trust they can do this work?
- Are there any skills you care about that don't have a way to prove the learner can do them?
- Do the check-in assessments catch problems early enough, or would a learner reach the end before finding out they're lost?

**For Final Validation gate, show the complete pipeline summary:**

Read each stage directory ONLY if that stage's status is `complete` in STATE.md. For any stage not yet complete, show "Not yet generated" for that section.

Display in this format:

---
## Your Complete Curriculum Package

**[Program Name]** — [Duration] program for [audience description from Stage 1 in plain language]

**What participants learn:**
[Outcome count from 01-outcomes/] learning objectives, building from [natural description of lowest thinking level activities] to [natural description of highest thinking level activities]
(Describe the span using what learners DO, not taxonomy labels. Examples: "building from foundational knowledge to hands-on application", "building from understanding key concepts to creating original work", "building from identifying patterns to designing solutions". Never use Bloom level names like "remember", "analyze", "evaluate", or "create" as labels — embed them as natural descriptions of learner activity.)

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
Measuring: [measurement approach, e.g., "behavior change on the job"] — [what's being measured]
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

**Curriculum integrity:** *(add after Delivery readiness)*

If `integration_findings.blocking` is empty AND `integration_findings.warnings` is empty:
```
**Curriculum integrity:** All cross-stage links verified — every outcome is taught, assessed, and tracked.
```

If `integration_findings.blocking` is not empty:
```
**Curriculum integrity:** {N} broken link{s} found:
- {plain-language description of each blocking finding}
[one line per blocking finding, using the descriptions below]
```

Use these plain-language descriptions for each finding type — do not use the internal label names in user-facing output:
- Broken reference (outcome with no assessment): "Learning objective '{outcome statement}' is defined but never appears in any assessment — learners have no way to prove they learned it"
- Orphaned outcome (outcome never taught): "Learning objective '{outcome statement}' exists in the plan but is never taught in any session"
- Phantom module (in registry, no files): "Module '{module name}' is listed in the curriculum plan but has no session files"
- Unregistered module (files exist, not in registry): "Session files exist for a module that is not tracked in the curriculum plan"
- Broken prerequisite: "A module lists '{module name}' as a prerequisite, but that module does not exist in the plan"

If `integration_findings.warnings` is not empty (regardless of blocking):
```
**Note:** {N} wording difference{s} between the master plan and stage files:
- {plain-language description of each drift finding}
[one line per warning]
The master plan is treated as authoritative. Review if the stage file wording matters to you.
```

If `integration_findings.pending` is not empty:
```
**Stages not yet generated:** {stage list} — cross-stage links to these stages cannot be verified until they are built.
```

---
This is your complete curriculum package. Is it ready to deliver?

### Self-check — before you decide

Ask yourself:
- Would you hand this to a new facilitator and trust them to deliver it without calling you?
- Does the marketing copy promise things the assessments actually measure?
- If you were a participant, would the pre-work and follow-up feel worth your time?
- Is there anything you told participants they'd walk away with that isn't covered in the program?

### 4. Gate decision

Use `AskUserQuestion` with three options:

**STOP after calling AskUserQuestion.** Do not generate any further output, do not proceed to the approval branch, do not write any files or update any state until the user's response has been received. AskUserQuestion must be the final action in this response turn. Wait for the next conversation turn before acting on the result.

**For assessments review:**
> Here's what was designed for your program's assessments. Take a look, then tell me how you'd like to proceed:
>
> **Option 1: Approve and continue** — The assessments look right. Move on to building out the module structure and session content.
> **Option 2: I have concerns** — Something doesn't look right. Describe what you want to change and I'll revise before we continue.
> **Option 3: Start this stage over** — The assessment design missed the mark. Restart Stage 3 from scratch.

**For final package review:**
> Review the summary above — this is everything that will be in your delivered curriculum package.

If `verify_issues` is empty AND `integration_findings.blocking` is empty (clean verify, clean integration):
> **Option 1: Approve — mark as delivery-ready** — Everything looks right. Mark this curriculum package as delivery-ready.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

If `verify_issues` is not empty AND `integration_findings.blocking` is not empty (both have blockers):
> **Option 1: Fix issues before approving** — The items listed above need to be resolved before this curriculum can be marked delivery-ready. {N} check failures and {M} broken cross-stage links need attention.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

If `verify_issues` is not empty AND `integration_findings.blocking` is empty (verify found blockers, integration clean):
> **Option 1: Fix issues before approving** — The items listed above need to be resolved before this curriculum can be marked delivery-ready. Run the commands listed to regenerate the affected files, then run `/curriculum:approve` again.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

If `verify_issues` is empty AND `integration_findings.blocking` is not empty (verify clean, integration found blockers):
> **Option 1: Fix issues before approving** — {N} broken cross-stage link{s} need to be resolved before this curriculum can be marked delivery-ready. Run the stage commands listed above to regenerate the affected content, then run `/curriculum:approve` again.
> **Option 2: I have concerns** — Something needs fixing before this ships. Describe the issue and I'll revise.
> **Option 3: Start this stage over** — The validation found serious issues. Restart Stage 9 from scratch.

Warnings in `integration_findings.warnings` do not affect which gate option set is shown — warnings are informational and do not block approval.

### 5. Handle the decision

**Option 1: Approve and continue**

Update STATE.md silently:
- Set the gate's status to `approved` with today's date (YYYY-MM-DD)
- Update Session Continuity: Next Action points to the appropriate next stage command or step

**For Post-Assessment gate:** Confirm with a named handoff close — state what was approved and what command to run next:
> {What was approved — e.g., "Your assessments are approved and saved"}. Type `/clear` now, then run `{next command}` to continue.

**For Final Validation gate only:** After updating STATE.md, show:
> Assembling your delivery package now...

Then invoke `/curriculum:assemble` as a Skill (same auto-trigger pattern as validate.md uses for metaskills). Do not wait for user input before invoking.

After assemble completes, show the confirmation message:
> Your curriculum is marked as delivery-ready and your delivery package is assembled. Files are in `workspace/{project}/delivery/`.

**Option 2: I have concerns**

Ask the user to describe what needs changing:
> What would you like to change? Describe the specific issue and I'll revise.

Do NOT mark the gate as approved. Do NOT advance the pipeline. Once the user describes the concern, address it in the relevant stage output directory, then update the curriculum registry silently:

Load `.claude/reference/schemas/curriculum-registry-schema.md` for the exact JSON structure. If revisions changed content in a stage that has a registry section (outcomes → `outcome_wording`, assessments → `assessment_criteria`, modules → `time_allocations`), re-read the revised files and update the corresponding section in `workspace/{project}/curriculum-registry.json`. Set `last_updated` to current ISO datetime. Write the file as formatted JSON (2-space indent). Do this silently — no announcement to the user.

Then re-surface the gate for approval.

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
