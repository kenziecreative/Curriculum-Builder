---
name: validate
description: Run three-tier validation on a completed curriculum package — dispatches validation agent, presents plain-language results, updates validation gate status
disable-model-invocation: true
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:validate — Curriculum Validation Orchestrator

You are the validation orchestrator. You check prerequisites, dispatch the validation agent as a Task, verify the output files were written, show a plain-language summary to the user, and silently update STATE.md. You do NOT run validation checks yourself — all checking happens in the validation worker.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are a skilled colleague reporting what a quality check found. Your tone is confident and direct — state what passed, what needs fixing, and what to do next. Lead with the result, not the process that produced it.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here. Do not proceed.

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

### 2. Check Stage 5 prerequisite

Read Stage 5 status from the workspace STATE.md. If Stage 5 status is not `complete`:

> Validation runs after session content is generated. Run `/curriculum:sessions` first to generate all sessions.

Stop here. Do not proceed.

### 3. Input Validation

Verify that `workspace/{project}/curriculum-registry.json` exists. If the file does not exist, stop and report:

> No curriculum registry found. This usually means the intake stage needs to be re-run with the updated pipeline.

Do not proceed to generation.

### 4. Read project brief for program duration

Read `workspace/{project}/00-project-brief/project-brief.md`. Extract the `program_duration` field (e.g., `"90-min"`, `"half-day"`, `"2-day"`, `"multi-week"`). This value controls Tier 2 scaling in the validation agent.

---

## Dispatch

Spawn ONE Task with the following:

**Description:**
> Run curriculum validation per the knz-validator.md agent specification

**Context provided to the Task:**
- Full content of `.claude/reference/schemas/stage-09-validation.md`
- Full content of `workspace/{project}/STATE.md`
- Full content of `workspace/{project}/00-project-brief/project-brief.md`
- `workspace_path`: `workspace/{project}/`
- `program_duration`: extracted value from project-brief.md

**Instructions:**
> You are the validation agent. Follow knz-validator.md exactly. Read stage output from 01-outcomes/, 02-assessments/, 03-modules/, 04-sessions/, {metaskills-dir}/, {transfer-dir}/, {marketing-dir}/. Run all applicable Tier 1 checks (T1-01 through T1-33), Tier 2 rubric scoring (per duration scaling rules — skip all dimensions for 90-min programs), and all applicable Tier 3 checks (T3-01 through T3-09 — for any stage not yet generated, mark those checks as not applicable). Write all 3 report files to 08-validation/. Return a completion signal with tier_1_failures count, tier_2_scores (or "skipped"), and tier_3_items count.

Do not dispatch a second Task. Do not run validation logic in this orchestrator command.

---

## File Verification

After the Task returns its completion signal, verify the required report files exist:

Check:
- `workspace/{project}/08-validation/schema-report.md` — always required
- `workspace/{project}/08-validation/rubric-report.md` — required UNLESS program_duration is `"90-min"`
- `workspace/{project}/08-validation/human-review-checklist.md` — always required

**If any required file is missing:**

> Validation didn't complete fully — some report files are missing. Run `/curriculum:validate` again to retry.

Do NOT update Stage 9 status. Do NOT show a results summary. Stop here.

**If all required files are verified:**

Proceed to Conversation Output.

---

## Conversation Output

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

Parse the completion signal returned by the Task to get:
- `tier_1_failures` count
- `tier_2_scores` (object or "skipped" string)

Also read the Tier 1 FAIL rows from `workspace/{project}/08-validation/schema-report.md` to build the failure descriptions.

**NEEDS: marker check** — Before reporting results, scan all session files in `workspace/{project}/04-sessions/` for any lines beginning with `# NEEDS:`. If any are found, count them by file and surface them as unfinished content:

> {N} session file(s) have unfinished content markers. These need to be resolved before your curriculum is delivery-ready.
> - {filename}: {count} marker(s)

If no NEEDS: markers are found, skip this block entirely.

Show the user ONLY the following — nothing else:

**If tier_1_failures == 0 (and no NEEDS: markers):**

```
Your curriculum passed all required checks.
```

Then show quality ratings (if Tier 2 ran — not for 90-min programs):

```
**Quality ratings:**
- Transfer realism: {score × 10}/10{optional note if score < 0.5: " — review recommended"}
- Social learning: {score × 10}/10
- Cognitive load: {score × 10}/10
- Scaffolding: {score × 10}/10
- Belief-challenging: {score × 10}/10
```

Your dashboard has been updated with the validation results.

Then show next step:

```
Type `/clear` now, then run `/curriculum:metaskills` to map thinking skills.
```

**If tier_1_failures > 0:**

```
Found {N} issue{s} that need fixing before your curriculum is delivery-ready.
```

(Use "issue" for N=1, "issues" for N>1.)

Then show missing fields section:

```
**Missing or invalid fields:**
- {what was checked} — {why it matters}. Location: {stage file path}
- {what was checked} — {why it matters}. Location: {stage file path}
[one line per FAIL row]
```

Translate check IDs using both columns — combine the "what" and "why" with an em dash. Never show "T1-16" or "T1-07" to the user. Use these translations:

| Check ID | What was checked | Why it matters |
|----------|-----------------|----------------|
| T1-01 | the thinking level field is empty or invalid | without this, the tool can't verify your assessments match the difficulty of what you're teaching |
| T1-02 | an objective is missing its assessment link | you're teaching something with no way to prove the learner can actually do it |
| T1-03 | the real-world application context is missing | learners won't see how this connects to their actual work |
| T1-04 | the prerequisite knowledge field is missing | facilitators won't know what learners need before starting |
| T1-05 | the program doesn't cover enough thinking levels | all your objectives ask learners to do the same kind of thinking — the program needs variety from understanding to application |
| T1-06 | an assessment is missing its objective link | you have an assessment that doesn't prove any specific learning objective |
| T1-07 | the assessment is easier than the objective it covers | you're testing at a lower difficulty than what you're teaching — learners could pass without actually meeting the objective |
| T1-08 | a module is missing a check-in assessment | learners won't find out they're lost until the final assessment — too late to course-correct |
| T1-09 | the program is missing a final assessment | there's no way to prove learners achieved the program's goals |
| T1-10 | an open-skill program needs at least one performance-based assessment | you can't assess a hands-on skill with a written test alone |
| T1-11 | a module is missing its group activity structure | learners practice solo but never with others — collaborative skills need collaborative practice |
| T1-12 | the group activity type is not a recognized value | the group activity format doesn't match known effective structures |
| T1-13 | the group interdependence description is missing or too generic | the group activity doesn't require real collaboration — participants could complete it alone |
| T1-14 | a module is missing its belief-challenging encounter | learners never have their assumptions tested — they leave with the same mental models they arrived with |
| T1-15 | the module sequence has a circular dependency | modules reference each other in a loop — the sequence can't be taught in order |
| T1-16 | a session is missing one or more required content sections | the session plan is incomplete — a facilitator couldn't deliver it as written |
| T1-17 | the reflection question is too generic | the reflection prompt could apply to any session — it doesn't ask about anything specific from this one |
| T1-18 | the transfer activity doesn't connect to the real-work context | the practice activity is abstract — learners won't see how to use this on the job |
| T1-19 | a thinking skill activity uses a generic label instead of a named routine | "discussion" or "reflection" doesn't tell facilitators what to actually do — a named routine gives them a concrete protocol to follow |
| T1-20 | the program doesn't activate all six thinking skills | learners develop lopsided capabilities — some ways of thinking never get practiced |
| T1-21 | the Innovating skill is introduced before foundational skills | learners are asked to innovate before they've learned to explore and create — the difficulty sequence is out of order |
| T1-22 | the Adapting skill is introduced before foundational skills | learners are asked to adapt before building the underlying skills — the difficulty sequence is out of order |
| T1-23 | one thinking skill dominates the program | more than 30% of all skill activations focus on one area — learners don't get balanced practice across thinking skills |
| T1-24 | the Imagining skill is missing its evidence gap note | Imagining has limited empirical support compared to other skills — without acknowledging this, facilitators may over-claim its benefits |
| T1-25 | the transfer design is missing one or more phases | a complete transfer plan needs before, during, and after components — without all three, learning doesn't stick |
| T1-26 | a module has no follow-through commitment in the transfer plan | learners finish the module with no specific plan to apply what they learned — good intentions without structure fade fast |
| T1-27 | an open-skill program is missing error practice | hands-on skills require practice that includes making and correcting mistakes — you can't learn by watching alone |
| T1-28 | the follow-up schedule doesn't match the program length | shorter programs need fewer touchpoints, longer programs need more — the spacing is off for this program's duration |
| T1-29 | the evaluation approach is below the minimum for this program type | the program claims certain outcomes but measures at a level that can't verify those claims |
| T1-30 | the community continuation section is a placeholder | "TBD" or empty community plans mean learners have no ongoing support after the program ends |
| T1-31 | a marketing claim has no source in the curriculum | the marketing copy makes a promise that isn't backed by any specific curriculum element |
| T1-32 | a marketing source reference points to something that doesn't exist | the marketing copy cites a curriculum element that can't be found — the reference is broken |
| T1-33 | the marketing copy is too long relative to the curriculum | marketing text exceeds 25% of the curriculum content — the packaging outweighs the product |

Show quality ratings after the missing fields section only if Tier 2 ran (not for 90-min programs). Use the same format as the all-pass case.

Then show next step:

```
Fix the missing fields, then run `/curriculum:validate` again to recheck.
```

**Do NOT show:**
- Passing check results
- Tier 3 items inline (those are in human-review-checklist.md)
- Check IDs (T1-xx format)
- Score decimal values (convert to x/10 format)
- Any offer to fix the failures
- Any explanation of the validation methodology

---

## State Update

These updates are silent. Never announce them.

Read `workspace/{project}/STATE.md`. Update the following fields:

**If file verification passed AND tier_1_failures == 0:**
- Stage 9 status: `complete`
- Session Continuity → Next Action: `Run /curriculum:metaskills to map thinking skills`

**If file verification passed AND tier_1_failures > 0:**
- Stage 9 status: `in-progress`
- Session Continuity → Next Action: `Fix missing fields listed above, then run /curriculum:validate to recheck`

**In all cases where file verification passed:**
- Final Validation gate status: `pending`

Write the updated STATE.md. Do not announce the write.

---

## Next Stage Handoff

This section runs ONLY when `tier_1_failures == 0`.

Do NOT trigger when `tier_1_failures > 0`. The chain stops at the failure message.

> Validation passed. Type `/clear` now, then run `/curriculum:metaskills` to map thinking skills.

Do not invoke metaskills automatically. The user must clear context first.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"
