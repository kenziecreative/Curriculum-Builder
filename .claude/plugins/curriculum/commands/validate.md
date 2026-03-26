---
description: Run three-tier validation on a completed curriculum package — dispatches validation agent, presents plain-language results, updates validation gate status
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

### 2. Check Stage 5 prerequisite

Read Stage 5 status from the workspace STATE.md. If Stage 5 status is not `complete`:

> Validation runs after session content is generated. Run `/curriculum:sessions` first to generate all sessions.

Stop here. Do not proceed.

### 3. Read project brief for program duration

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
> You are the validation agent. Follow knz-validator.md exactly. Read stage output from 01-outcomes/, 02-assessments/, 03-modules/, 04-sessions/. Run all applicable Tier 1 checks (T1-01 through T1-18), Tier 2 rubric scoring (per duration scaling rules — skip all dimensions for 90-min programs), and applicable Tier 3 checks (T3-06, T3-07 only — T3-01 through T3-05 and T3-08 through T3-09 are not yet applicable). Write all 3 report files to 08-validation/. Return a completion signal with tier_1_failures count, tier_2_scores (or "skipped"), and tier_3_items count.

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
Run `/curriculum:approve` to review the human checklist and mark your curriculum delivery-ready.

Your work is saved — clear context before running the next command.
```

**If tier_1_failures > 0:**

```
Found {N} issue{s} that need fixing before your curriculum is delivery-ready.
```

(Use "issue" for N=1, "issues" for N>1.)

Then show missing fields section:

```
**Missing or invalid fields:**
- {plain-language description of what's wrong}. Location: {stage file path}
- {plain-language description of what's wrong}. Location: {stage file path}
[one line per FAIL row]
```

Translate check IDs to plain language. Never show "T1-16" or "T1-07" to the user. Use these translations:

| Check ID | Plain language |
|----------|---------------|
| T1-01 | the thinking level field is empty or invalid |
| T1-02 | the objective is missing its assessment link |
| T1-03 | the real-world application context is missing |
| T1-04 | the prerequisite knowledge field is missing |
| T1-05 | the program doesn't cover enough thinking levels |
| T1-06 | an assessment is missing its objective link |
| T1-07 | the assessment thinking level is lower than the objective it covers |
| T1-08 | a module is missing a formative (in-progress) check |
| T1-09 | the program is missing a summative (final) assessment |
| T1-10 | an open-skill program needs at least one performance-based assessment |
| T1-11 | a module is missing its group activity structure |
| T1-12 | the group activity type is not a recognized value |
| T1-13 | the group interdependence description is missing or too generic |
| T1-14 | a module is missing its belief-challenging encounter |
| T1-15 | the module sequence has a circular dependency |
| T1-16 | a session is missing one or more required content sections |
| T1-17 | the reflection question is too generic — it could apply to any session |
| T1-18 | the transfer activity doesn't connect to the real-work context from your project brief |

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
- Session Continuity → Next Action: `Run /curriculum:approve to review human checklist and approve final package`

**If file verification passed AND tier_1_failures > 0:**
- Stage 9 status: `in-progress`
- Session Continuity → Next Action: `Fix missing fields listed above, then run /curriculum:validate to recheck`

**In all cases where file verification passed:**
- Final Validation gate status: `pending`

Write the updated STATE.md. Do not announce the write.

---

## Auto-Trigger Metaskills

This section runs ONLY when `tier_1_failures == 0` (same condition as the all-pass state update path above).

Do NOT trigger when `tier_1_failures > 0`. The chain stops at the failure message. User must fix and rerun.

After the state update completes (Stage 9 set to complete, Session Continuity updated), show:

> All required checks passed — mapping thinking skills now.

Then invoke `/curriculum:metaskills` as a Skill.

Do not wait for user input before invoking. This is the same auto-advance pattern used between `/curriculum:sessions` and `/curriculum:validate`.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"
