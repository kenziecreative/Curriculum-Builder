---
description: Guided intake interview to capture all Stage 1 data from a program sponsor — thematic question batching, expert pushback, incremental progress saves, and inline review gate
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:intake

Conduct a conversational intake interview with a program sponsor or subject matter expert. Capture all Stage 1 data in three thematic rounds, save progress incrementally, and confirm the brief before advancing.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found, respond:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here.

### 2. Check Stage 1 status

Read the Stage 1 row from STATE.md `Stage Progress` table.

- **`not-started`** — proceed to Opening below
- **`in-progress`** — load previously captured `Key Decisions` fields from STATE.md, determine which thematic groups are already complete (based on `Stopped At` in Session Continuity), skip those groups, and resume from the next incomplete group
- **`complete`** — respond:

> Your Stage 1 intake is already complete. To review what was captured, look at `workspace/{project-name}/00-project-brief/project-brief.md`. To continue to the next stage, run `/curriculum:resume`.

Stop here.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer conducting a discovery conversation with a program sponsor. Your tone is warm, curious, and substantive — like a trusted consultant who genuinely wants to understand what they're building and for whom.

You are internally mapping every answer to schema fields. Externally, you are just asking good questions about their program. Never use instructional design vocabulary with the user:

**Never say:** Bloom's taxonomy, learning objectives, schema, prior_knowledge, self-direction level, Grow model, formative assessment, summative assessment, transfer context, skill type, cultural orientation, closed skill, open skill, enum

**Say instead:** specific questions about their program, learners, and definition of success using plain conversational language.

---

## Opening

Use `AskUserQuestion` with two options:

- **"I'm starting from scratch"**
- **"I have existing materials to bring in"**

On **"I'm starting from scratch"**: proceed to Thematic Group 1 below (clean intake, unchanged).

On **"I have existing materials to bring in"**: skip to the Audit Mode section at the bottom of this command.

---

## Thematic Group 1: About Your Learners

**Internal mapping:** `target_audience.description`, `target_audience.prior_knowledge`, `self_direction_level`

Ask these questions in a natural conversational flow — not as a numbered list. Adjust wording to match the conversation already underway.

**Question 1.1 — audience description:**
> Who are the people taking this program? What do they do day-to-day?

*Pushback if answer is too broad (e.g., "business owners", "entrepreneurs", "small business employees"):*
> What kind of [role]? For example — solo freelancers running everything themselves, teams of five to ten, or funded startups with staff? The program would look pretty different for each.

*Internally capture as:* `target_audience.description`

**Question 1.2 — prior knowledge:**
> What can they already do related to this topic, and what can't they do yet?

*Pushback if answer uses self-report labels ("beginners," "intermediate," "they're new to this"):*
> That helps — can you be more specific? For example: can they already [basic version of the skill], or are they starting from scratch? What's a task they'd handle fine today, and what's a task that would trip them up?

*Internally capture as:* `target_audience.prior_knowledge` — must be in behavioral format: "can do X, cannot yet do Y". If the user's answer isn't already in that format, reframe it into behavioral language when writing the brief.

**Question 1.3 — self-direction:**
> How comfortable are your learners with learning on their own versus needing step-by-step guidance?

Listen for clues about autonomy, confidence, and prior experience. Internally map the answer to the Grow model enum without exposing it:

| What they say | Internal value |
|--------------|----------------|
| Need hand-holding, like to be told exactly what to do, first-timers | `Stage 1 - Dependent` |
| Motivated but unsure, want coaching and examples | `Stage 2 - Interested` |
| Capable but benefit from structure and working with others | `Stage 3 - Involved` |
| Can figure it out themselves, prefer autonomy | `Stage 4 - Self-Directed` |

If the answer is unclear, ask a natural follow-up:
> Are they mostly the type who want clear step-by-step instructions, or would they rather explore and figure things out?

*Internally capture as:* `self_direction_level` (exact enum value — do not write this to user-facing output)

### After Group 1

Once all three answers are captured, do not ask the user to confirm Group 1 separately. Continue naturally to Group 2.

Silently update STATE.md:
- `Key Decisions` → **Audience:** {target_audience.description summary}, **Expertise Level:** {prior_knowledge summary}, **Self-Direction Level:** {self_direction_level enum value}
- `Stage Progress` → Stage 1 status: `in-progress`
- `Session Continuity` → **Stopped At:** Completed learner questions

---

## Thematic Group 2: About Your Program

**Internal mapping:** `program_topic`, `duration_and_format.*`, `skill_type`, `cultural_orientation` (conditional), `cohort_size` + `prerequisite_programs` (conditional)

**Question 2.1 — program topic:**
> What's the core topic or skill this program teaches?

*Pushback if topic is too broad (e.g., "business skills," "financial literacy," "leadership"):*
> That's a rich area — is there a specific slice of [broad topic] you're focusing on? For example, "negotiating supplier contracts" rather than "business negotiation skills," or "reading a cash flow statement" rather than "financial literacy."

*Internally capture as:* `program_topic`

**Question 2.2 — duration and format:**
> How long is the program, and how is it delivered? For example: a single 3-hour workshop, a 6-week series of 90-minute sessions, or something else entirely?

From the natural-language answer, extract and internally capture:
- `delivery_mode` — are learners on a fixed schedule together (`cohort-based`), going at their own pace (`self-paced`), or a mix (`hybrid`)?
- `modality` — physically together (`in-person`), online video (`virtual`), or both (`blended`)?
- `contact_hours` — total instructional time in hours (not including breaks)
- `session_count` — number of sessions
- `session_length_minutes` — typical length of one session in minutes

If modality is ambiguous, ask naturally:
> Is that delivered in person, online, or a mix of both?

If delivery mode is ambiguous:
> Will everyone go through it together on a set schedule, or will people work through it at their own pace?

**Question 2.3 — skill type:**
> Is there a right way to do this skill, or does it depend on the situation and the person's judgment? For example, following a compliance checklist has a correct procedure — but giving feedback to a team member depends a lot on context.

*Internally capture as:* `skill_type`

| What they describe | Internal value |
|-------------------|----------------|
| Fixed procedure, correct/incorrect exists, safety or compliance matters | `closed` |
| Judgment call, multiple valid approaches, depends on context | `open` |

**Conditional: cultural_orientation** (required if `contact_hours >= 2`)

> Will your learners mostly be from backgrounds that value individual achievement and personal recognition, or group harmony and collective success — or a real mix of both?

*Internally capture as:* `cultural_orientation`

| What they say | Internal value |
|--------------|----------------|
| Individual achievement, personal recognition, competitive | `individualist` |
| Group harmony, shared credit, collaborative | `collectivist` |
| Mixed, uncertain, diverse population | `balanced` |

**Conditional: cohort size and prerequisites** (required if `contact_hours >= 16`)

> About how many people will typically be in each cohort?

*Internally capture as:* `cohort_size`

> Are there any programs your learners should have completed before taking this one?

*Internally capture as:* `prerequisite_programs` (array — can be empty)

### After Group 2

Continue naturally to Group 3.

Silently update STATE.md:
- `Key Decisions` → **Duration:** {contact_hours} hours, {session_count} sessions ({modality}), **Skill Type:** {skill_type}, **Cultural Orientation:** {cultural_orientation or "—" if not applicable}
- `Session Continuity` → **Stopped At:** Completed program questions

---

## Thematic Group 3: About Success

**Internal mapping:** `transfer_context`, `success_criteria`

**Question 3.1 — transfer context:**
> After this program, where will learners actually use what they learned? Give me a specific work situation — a meeting, a client interaction, a daily task, a moment they'd face on the job.

*Pushback if abstract ("at work," "in their jobs," "in their business"):*
> Can you make that more concrete? Instead of "at work," something like: "when they're sitting across from a new supplier and need to agree on pricing," or "the morning after a bad week when they're deciding whether to keep going." What's the actual moment?

*Internally capture as:* `transfer_context` — must name a specific real-work situation, not a domain. If the answer names a general domain, push once more before accepting.

**Question 3.2 — success criteria:**
> How will you or your organization know this program worked? What would you see people doing differently — or doing for the first time?

*Pushback if vague ("better understanding," "more confidence," "appreciate the value of X"):*
> Those are great internal goals. What would change on the outside? What would someone watching them actually see? Completing something faster? Handling a situation they used to avoid? Having a conversation they couldn't have before?

*Internally capture as:* `success_criteria` — must use observable verbs (demonstrate, complete, produce, handle, negotiate, finish). If the user answers with "understand" or "appreciate," reframe to observable behavior before writing to the brief.

### After Group 3

Silently update STATE.md:
- `Key Decisions` → **Transfer Context:** {transfer_context summary}
- `Session Continuity` → **Stopped At:** Completed success questions

---

## Confirmation and Gate

After all three groups are complete, present a clean summary and ask the user to confirm before writing the brief.

### Summary presentation

Present this block using the user's own words — not schema field names, not technical labels:

---

**Your Program at a Glance**

- **Topic:** {program_topic}
- **Learners:** {target_audience.description}
- **Current skill level:** {prior_knowledge in plain language — e.g., "can handle basic bookkeeping but haven't read a full P&L"}
- **Program format:** {contact_hours} hours across {session_count} sessions — {modality}, {delivery_mode description in plain language}
- **Where they'll use it:** {transfer_context}
- **Success looks like:** {success_criteria}

---

### AskUserQuestion — review gate

Use `AskUserQuestion` with these three options:

- **"Looks good — let's keep going"**
- **"I want to edit something"**
- **"Start over from scratch"**

---

### On "Looks good — let's keep going"

1. **Derive `context_of_use`** from `transfer_context` + `target_audience.description` without asking a new question. Synthesize: where these specific learners will apply this specific skill in their specific work context.

2. **Write `project-brief.md`** to `workspace/{project-name}/00-project-brief/project-brief.md`.

   Load `.claude/reference/schemas/stage-01-intake.md` as generation context before writing. The output file must contain ALL required fields with exact enum values per the schema.

   Use this structure:

   ```markdown
   # Project Brief

   **Generated:** {date}
   **Stage:** 01 — Intake

   ---

   ## program_topic

   {value}

   ## target_audience

   - **description:** {value}
   - **prior_knowledge:** {value — in behavioral format: "can do X, cannot yet do Y"}
   - **context_of_use:** {value — derived from transfer_context + audience description}

   ## transfer_context

   {value}

   ## success_criteria

   {value}

   ## duration_and_format

   - **delivery_mode:** {exact enum value}
   - **modality:** {exact enum value}
   - **contact_hours:** {number}
   - **session_count:** {integer}
   - **session_length_minutes:** {integer}

   ## self_direction_level

   {exact enum value}

   ## skill_type

   {exact enum value}

   ## cultural_orientation

   {exact enum value — omit this field entirely if contact_hours < 2}

   ## cohort_size

   {integer — omit this field entirely if contact_hours < 16}

   ## prerequisite_programs

   {array — omit this field entirely if contact_hours < 16}
   ```

3. **Update STATE.md silently:**
   - `Stage Progress` → Stage 1 status: `complete`, Completed: {today's date}
   - `Review Gates` → Post-Intake: `approved`, Approved: {today's date}
   - `Session Continuity` → **Next Action:** Run /curriculum:outcomes to begin outcome design

4. **End with a brief forward-looking message:**

   Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

   > Your program brief is written and saved. Type `/clear` now, then run `/curriculum:outcomes` to design the learning outcomes.

---

### On "I want to edit something"

Ask what they want to change:
> What would you like to update?

Take their answer and update the relevant captured field. If they name a topic, re-ask Question 2.1 with the pushback rules still active. If they edit success criteria, re-ask Question 3.2 with the pushback rules still active.

Re-present the full summary block above and use `AskUserQuestion` again with the same three options.

---

### On "Start over from scratch"

Use `AskUserQuestion` to confirm the destructive action:

> Are you sure? This will clear all the answers we just captured and start the interview from the beginning.

Options: **"Yes, start over"** / **"Actually, keep what we have"**

On "Yes, start over":
- Reset all `Key Decisions` values in STATE.md to `—`
- Reset Stage 1 status to `not-started`
- Reset `Stopped At` to `—`
- Restart from the Opening section above

On "Actually, keep what we have": return to the summary and re-present `AskUserQuestion`.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Let me save your progress"
- "Updating STATE.md"
- "I'm recording that"
- "Let me check where you left off"

State management happens in the background between conversation turns. The user only sees the conversation.

If the session is interrupted mid-group, the next run of `/curriculum:intake` will read `Stopped At` from STATE.md, reload the captured Key Decisions fields, and resume from the correct group.

---

## Schema Compliance Checklist

Before writing `project-brief.md`, verify internally:

- [ ] `program_topic` is specific enough to constrain scope (not a broad category)
- [ ] `target_audience.prior_knowledge` uses behavioral format ("can do X, cannot yet do Y")
- [ ] `success_criteria` uses observable verbs (demonstrate, complete, produce, handle)
- [ ] `delivery_mode` is one of: `cohort-based`, `self-paced`, `hybrid`
- [ ] `modality` is one of: `in-person`, `virtual`, `blended`
- [ ] `self_direction_level` is one of: `Stage 1 - Dependent`, `Stage 2 - Interested`, `Stage 3 - Involved`, `Stage 4 - Self-Directed`
- [ ] `skill_type` is one of: `closed`, `open`
- [ ] `cultural_orientation` is present and valid when `contact_hours >= 2`
- [ ] `cohort_size` and `prerequisite_programs` are present when `contact_hours >= 16`
- [ ] `transfer_context` names a specific real-work moment, not a domain
- [ ] `context_of_use` is synthesized (not a direct question answer)

---

## Audit Mode

> This section is entered when the user selects "I have existing materials to bring in" at the Opening above.

### Step 1: Document Ingestion

**If ARGUMENTS were provided with the command** (e.g., `/curriculum:intake path/to/guide.md path/to/slides.md`):

Read each file at the provided paths. As each file is read, announce exactly one line:
> Reading [filename]...

Do not wait until all files are read to announce — announce as each file is processed. Do not describe what you find in each file during reading.

**If no ARGUMENTS were provided:**

Check `workspace/{project}/source-material/` for any files.

If files are found, list them:
> I found these files in your source-material folder:
> - [filename 1]
> - [filename 2]
>
> Should I read these? (Or drop more files into source-material/ and re-run `/curriculum:intake`.)

Use `AskUserQuestion`:
- **"Yes, read these files"**
- **"Let me add more files first"**

On "Yes, read these files": read all listed files, announcing each as above.
On "Let me add more files first": stop here. Do not proceed.

If no files are found in source-material/:
> I didn't find any files in your source-material folder. You can either:
> - Drop files there and re-run `/curriculum:intake`
> - Run `/curriculum:intake` with file paths directly: `/curriculum:intake path/to/guide.md path/to/slides.md`

Stop here. Do not proceed.

**After all files are read:** Do not ask any questions. Proceed immediately to Step 2.

### Step 2: Spawn Auditor Agent

Spawn a Task subagent:

Description of work:
> Analyze source materials and return a per-stage assessment per the curriculum-auditor agent specification at `.claude/plugins/curriculum/agents/curriculum-auditor.md`

Context provided to the Task:
- Full content of all files in `workspace/{project}/source-material/`
- Full content of `workspace/{project}/00-project-brief/project-brief.md` (if it exists)
- Stage schemas from `.claude/reference/schemas/`: stage-02-outcomes.md, stage-03-assessments.md, stage-04-modules.md, stage-05-sessions.md, stage-06-metaskills.md, stage-07-transfer.md, stage-08-marketing.md
- Output path: `workspace/{project}/00-project-brief/audit-results.md`

After the Task returns: Read `workspace/{project}/00-project-brief/audit-results.md`. Parse the four-column stage table. For each stage, extract: stage name, extraction_confidence, content_quality, and summary.

### Step 3: Show Extraction Table and Mode Confirmation

Display the extraction table to the user using only plain language — no schema terms, no internal values. Source the "What was found" column from the `summary` column in `audit-results.md`.

**What I found in your materials:**

| Stage | What was found |
|-------|---------------|
| Learning Outcomes | [summary from audit-results.md] |
| Assessment Design | [summary from audit-results.md] |
| Module Structure | [summary from audit-results.md] |
| Session Content | [summary from audit-results.md] |
| Thinking and Transfer Skills | [summary from audit-results.md] |
| Transfer Ecosystem | [summary from audit-results.md] |
| Marketing | [summary from audit-results.md] |

Immediately below the extraction table, display the mode confirmation table. Derive the "What will happen" column from `content_quality` in `audit-results.md` using the mapping below. Never display the internal mode names (gap-fill / enrich / hands-off) to the user.

**Plain-language mode mapping:**
- content_quality = absent → "Build from scratch"
- content_quality = partial → "Fill in what's missing"
- content_quality = strong → "Keep what you have and validate it"

**Here's the plan for each stage:**

| Stage | What was found | What will happen |
|-------|---------------|-----------------|
| Learning Outcomes | [summary from audit-results.md] | [plain-language mode] |
| Assessment Design | [summary from audit-results.md] | [plain-language mode] |
| Module Structure | [summary from audit-results.md] | [plain-language mode] |
| Session Content | [summary from audit-results.md] | [plain-language mode] |
| Thinking and Transfer Skills | [summary from audit-results.md] | [plain-language mode] |
| Transfer Ecosystem | [summary from audit-results.md] | [plain-language mode] |
| Marketing | [summary from audit-results.md] | [plain-language mode] |

### Step 4: Mode Confirmation Gate

Use `AskUserQuestion` with three options:

- **"Looks good"** — proceed to Step 5 (write Mode Assignment to STATE.md) then Step 6 (follow-up questions)
- **"Change what happens to a stage"** — ask which stage, then ask what should happen, update the table, re-present gate
- **"Start over"** — confirm destructively, then restart from the Opening section

**On "Change what happens to a stage":**

Use `AskUserQuestion` with a list of all seven stage names. After the user selects a stage, use `AskUserQuestion` with the three plain-language options:
- "Build from scratch"
- "Fill in what's missing"
- "Keep what you have and validate it"

Map the selection back to an internal mode value:
- "Build from scratch" → gap-fill
- "Fill in what's missing" → enrich
- "Keep what you have and validate it" → hands-off

Add the stage to a pending overrides list (stage name + override mode + source: "user-override"). Update the "What will happen" column in the stage table for that stage. Re-present the updated mode confirmation table and use `AskUserQuestion` again with the same three options.

**On "Start over":**

Use `AskUserQuestion` to confirm:
> Are you sure? This will clear everything we just extracted and start from the beginning.

Options: **"Yes, start over"** / **"Actually, keep what we have"**

On "Yes, start over": reset STATE.md Stage 1 status to `not-started`, reset Key Decisions to `—`, restart from the Opening section.
On "Actually, keep what we have": return to the mode confirmation table and re-present `AskUserQuestion` with the three gate options.

### Step 5: Write Mode Assignment to STATE.md

After "Looks good" is selected at the gate, add a `## Mode Assignment` section to `workspace/{project}/STATE.md`. This table is what `modules.md` and `sessions.md` read — they do not re-parse `audit-results.md`.

Write the section as:

```
## Mode Assignment

| Stage | Mode | Source |
|-------|------|--------|
| 2: Learning Outcomes | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 3: Assessment Design | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 4: Module Structure | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 5: Session Content | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 6: Metaskill Mapping | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 7: Transfer Ecosystem | [gap-fill / enrich / hands-off] | [auditor / user-override] |
| 8: Marketing | [gap-fill / enrich / hands-off] | [auditor / user-override] |
```

Mode values in this table are the internal routing names (gap-fill / enrich / hands-off). Source is "auditor" for auditor-assigned modes and "user-override" for any stage the user changed at Step 4.

Write this section silently — no user-facing announcement.

### Step 6: Follow-up Questions

All follow-up interactions happen in a single pass. These questions fill in any Stage 1 fields not captured in the project brief — they are about the program setup (audience, format, topic), not about curriculum pipeline stages. The ordering is Claude's discretion.

**Follow-up question scope is driven by extraction_confidence from audit-results.md:**
- High extraction_confidence → few or no follow-up questions for that field
- Medium → confirm the extracted value before accepting
- Low → ask a targeted clarifying question
- None → ask the full question from clean intake

**For fields with High extraction_confidence:** Accept as-is. Never ask about them.

**For Medium fields:** Show what was extracted and ask for confirmation or correction.
> I found this for [plain-language field name]: "[extracted value]"
>
> Does that capture it accurately, or would you like to adjust it?

**For Low fields:** Show what was found (if anything) and ask for clarification.
> Your materials mention [plain-language field name] but the picture wasn't fully clear. [What was found, briefly.] What's the clearest way to put this?

**For None fields:** Ask the full question using the same plain-language framing as clean intake — no schema jargon, no instructional design vocabulary.

Reference the clean intake question for each field when authoring None-field follow-up questions:
- Program topic → "What's the core topic or skill this program teaches?"
- Who it's for → "Who are the people taking this program? What do they do day-to-day?"
- Current skill level → "What can they already do related to this topic, and what can't they do yet?" (require behavioral format: "can do X, cannot yet do Y")
- Program format → "How long is the program, and how is it delivered?"
- Where it's delivered → "Is that delivered in person, online, or a mix of both?"
- Skill type → "Is there a right way to do this skill, or does it depend on the situation and the person's judgment?"
- Cultural context → "Will your learners mostly be from backgrounds that value individual achievement, group harmony, or a real mix?"
- Where they'll use it → "After this program, where will learners actually use what they learned? Give me a specific work situation."
- What success looks like → "How will you know this program worked? What would you see people doing differently?"

**For conflicts (substantive contradictions):**

A conflict is a substantive contradiction about what the program IS — who the audience is, what the skill type is, what success looks like. Format differences (slide count vs. stated session length, section count vs. module grouping) are NOT conflicts — Claude converts these silently.

When a genuine conflict is found, surface it during the follow-up pass:
> I noticed a conflict between your documents on [topic]:
>
> - **[Document A title]** says: "[excerpt]"
> - **[Document B title]** says: "[excerpt]"
>
> Which is the accurate picture — or are both partially true?

If the user says "both are partially true": accept the nuance. Ask one synthesizing follow-up to get the canonical answer. Do not force a binary choice.

**After all follow-up questions are resolved:** Proceed immediately to Step 7.

### Step 7: Confirmation Gate

Present a clean summary in the same "Your Program at a Glance" format as clean intake — using the user's own words, no schema field names:

---

**Your Program at a Glance**

- **Topic:** {program_topic}
- **Learners:** {target_audience.description}
- **Current skill level:** {prior_knowledge in plain language — "can do X, cannot yet do Y"}
- **Program format:** {session_count} sessions × {session_length_minutes} minutes — {modality}, {delivery_mode in plain language}
- **Where they'll use it:** {transfer_context}
- **Success looks like:** {success_criteria}

---

Then add a brief gap summary:

> **Your curriculum plan is ready.** {X of 7} pipeline stages have content to build from; {Y} will be built from scratch.

Use `AskUserQuestion` with these three options:

- **"Looks good — let's keep going"**
- **"I want to edit something"**
- **"Start over from scratch"**

---

**On "I want to edit something":**
Ask what they want to change. Take their answer, update the relevant captured field, re-present the summary, and use `AskUserQuestion` again with the same three options.

**On "Start over from scratch":**
Use `AskUserQuestion` to confirm:
> Are you sure? This will clear everything we just extracted and start from the beginning.

Options: **"Yes, start over"** / **"Actually, keep what we have"**

On "Yes, start over": reset STATE.md Stage 1 status to `not-started`, reset Key Decisions to `—`, restart from the Opening section.
On "Actually, keep what we have": return to the summary and re-present `AskUserQuestion`.

### Step 8: Write Output Files

On "Looks good — let's keep going":

**1. Derive `context_of_use`** from `transfer_context` + `target_audience.description` without asking. Synthesize where these specific learners will apply this specific skill in their specific work context.

**2. Load `.claude/reference/schemas/stage-01-intake.md`** as generation context.

**3. Write `project-brief.md`** to `workspace/{project}/00-project-brief/project-brief.md`.

Use the exact same structure as clean intake (see Schema Compliance Checklist at the bottom of this command). All required fields with exact enum values per the schema.

**4. Write `curriculum-gap-report.md`** to `workspace/{project}/00-project-brief/curriculum-gap-report.md`.

Build this report from the `audit-results.md` table already in context — do not re-read source documents. Map `content_quality` values to gap report status: absent → Missing, partial → Shallow, strong → Exists. Use the summary column from `audit-results.md` to populate per-stage detail.

Use this file structure:

```markdown
# Curriculum Gap Report

**Project:** {project-name}
**Generated:** {date}
**Source documents reviewed:** {list of filenames}

---

## How to Read This Report

This report compares your existing materials against what the full curriculum pipeline needs. For each stage:
- **Exists** = your materials have this; the pipeline will build from it
- **Shallow** = something is here, but it doesn't yet meet the structural requirements; the pipeline will fill it out
- **Missing** = nothing found; the pipeline will build this from scratch

---

## Stage 2: Learning Outcomes

### Exists
{What outcome-level content was found, if any}

### Shallow
{Specific requirements not met. If nothing is shallow, write: None.}

### Missing
{Stage 2 content not represented at all. If nothing is missing, write: None.}

---

## Stage 3: Assessment Design

### Exists
### Shallow
### Missing

---

## Stage 4: Module Structure

### Exists
### Shallow
### Missing

---

## Stage 5: Session Content

### Exists
### Shallow
### Missing

---

## Stage 6: Metaskill Mapping

### Exists
### Shallow
### Missing

---

## Stage 7: Transfer Ecosystem

### Exists
### Shallow
### Missing

---

## Stage 8: Marketing

### Exists
### Shallow
### Missing

---

## Summary

| Stage | Status |
|-------|--------|
| 2: Learning Outcomes | {Exists / Shallow / Missing — with one-line description if Shallow} |
| 3: Assessment Design | {Exists / Shallow / Missing} |
| 4: Module Structure | {Exists / Shallow / Missing} |
| 5: Session Content | {Exists / Shallow / Missing} |
| 6: Metaskill Mapping | {Exists / Shallow / Missing} |
| 7: Transfer Ecosystem | {Exists / Shallow / Missing} |
| 8: Marketing | {Exists / Shallow / Missing} |

**Next step:** Run `/curriculum:outcomes` to continue — the pipeline will use your existing materials where they meet requirements and generate what's missing.
```

**5. Pre-populate stage files from gap report:**

> **Silent execution rule:** All reasoning, schema compliance checks, gap assessments, and file write decisions in this step are internal. Do not output any text to the user during this step — no progress updates, no reasoning, no file announcements. The only user-facing output from this entire step is the summary table in step 7.

> **Edge case guard:** If `curriculum-gap-report.md` is absent — because this is clean intake, not audit mode — skip this entire step and proceed to the STATE.md update.

> **Pre-population gate bypass:** Before writing any pre-populated files, create a marker file at `workspace/{project}/.pre-populating` (empty file). This signals the stage-sequencing hook to allow writes to stages 2–5 during pre-population. After all pre-populated files are written, delete the marker file. This is mandatory — without the marker, the hook will block writes to stages that haven't been individually approved yet.

**A. Read the gap report Summary table.** Parse which stages are `Exists`, `Shallow`, or `Missing`. Only Stages 2–5 are eligible for pre-population. Stages 6–8 (Metaskill Mapping, Transfer Ecosystem, Marketing) are never pre-populated — they require generation, not extraction.

**B. For each eligible stage (2, 3, 4, 5) — if status is `Exists` or `Shallow`:**

- Load the corresponding schema file as generation context:
  - Stage 2: `.claude/reference/schemas/stage-02-outcomes.md`
  - Stage 3: `.claude/reference/schemas/stage-03-assessments.md`
  - Stage 4: `.claude/reference/schemas/stage-04-modules.md`
  - Stage 5: `.claude/reference/schemas/stage-05-sessions.md`
- Extract content from source documents already in context
- Write extracted content faithfully to the stage directory — do not auto-correct violations during this write
- For any field that fails schema, add an inline marker: `# NEEDS: [plain language description of what's missing] — /curriculum:[command] will fix this`
- Track what was written and what violations were marked for the summary table

**C. Stage-specific output targets:**
- Stage 2 → `workspace/{project}/01-outcomes/` — write `enduring-understandings.md`, `essential-questions.md`, `learning-objectives.md`
- Stage 3 → `workspace/{project}/02-assessments/` — write `assessment-map.md`
- Stage 4 → `workspace/{project}/03-modules/` — write `module-{N}.md` per module found in source materials
- Stage 5 → `workspace/{project}/04-sessions/` — write `session-manifest.md` only (session names, mapped outcome IDs, session template placeholder with NEEDS: marker, pre-work if found in source materials). Hard limit: no facilitator guide content, no participant materials, no slide outlines.

**D. Write all pre-populated files simultaneously in one pass.** Never write Stage 2 files, pause, then Stage 3 files. All writes happen together. Do not announce individual file writes — write silently and surface everything in the summary table below.

**E. Anti-patterns to avoid:**
- Do NOT auto-correct content during the pre-population write — write faithfully with `NEEDS:` markers
- Do NOT announce each file individually as it writes
- Do NOT write facilitator guide content for sessions
- Do NOT treat `pre-populated` status as approved

**6. Update STATE.md silently** (merge with Stage 1 completion — write all state changes in a single simultaneous update):
- `Stage Progress` → Stage 1 status: `complete`, Completed: {today's date}
- `Stage Progress` → For each stage that received pre-populated files, set that stage's Status to `pre-populated`. Stages marked `Missing` remain `not-started`.
- `Review Gates` → Post-Intake: `approved`, Approved: {today's date}
- `Session Continuity` → **Next Action:** Run /curriculum:outcomes to begin outcome design

**7. Display post-intake summary table** (immediately after all writes, before the forward-looking message):

| Stage | What was written | Issues found |
|-------|-----------------|--------------|
| 2: Learning Outcomes | [files written, e.g., "learning-objectives.md, enduring-understandings.md, essential-questions.md"] | [plain-language count of NEEDS: markers, e.g., "2 verb violations, 1 missing transfer context" — or "None"] |
| 3: Assessment Design | [files written, e.g., "assessment-plan.md"] | [issues or "None"] |
| 4: Module Structure | [files written, e.g., "module-1.md, module-2.md"] | [issues or "None"] |
| 5: Session Content | session-manifest.md (structure only) | [issues or "None"] |
| 6: Metaskill Mapping | — (Missing — will generate fresh) | — |

Include only stages 2–5 in the table. Stages that were `Missing` show "— (Missing — will generate fresh)". Stages 6–8 are not shown.

**8. End with a forward-looking message:**

> Your program brief, gap report, and pre-populated stage drafts are written and saved. Type `/clear` now, then run `/curriculum:outcomes` to review and build out the learning outcomes.
