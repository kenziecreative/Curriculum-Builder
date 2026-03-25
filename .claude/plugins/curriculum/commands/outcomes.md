---
description: Generate learning outcomes from intake data — program, module, and session levels with thinking-level distribution enforcement and inline review gate
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:outcomes

Generate a full outcome hierarchy from your program brief — program outcomes, module outcomes, and session outcomes — with automatic quality checks run before anything is shown to you.

## Prerequisites

### 1. Check workspace exists

Read `workspace/*/STATE.md` to locate the active project. If no STATE.md is found, respond:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

Stop here.

### 2. Check Stage 2 status

Read the Stage 2 row from STATE.md `Stage Progress` table.

- **`not-started`** — proceed to Generation section below
- **`pre-populated`** — Read all files from `workspace/*/01-outcomes/`. Run all five constraint
  enforcement steps silently against the existing content (same steps as post-generation: Bloom
  verb check, level distribution, transfer context completeness, hierarchy integrity, prohibited
  verb replacement). Remove any `# NEEDS:` marker lines from the corrected output before
  displaying. Display the corrected outcome set and thinking-level distribution summary.
  Proceed directly to the Review Gate section.
  Do not regenerate — the content source is the extracted draft, not the project brief.
  On "Start over" at the Review Gate: wipe all files in `workspace/*/01-outcomes/`, set Stage 2
  status to `not-started` in STATE.md (clearing the `pre-populated` status), restart from the
  Generation section.
- **`in-progress`** — check whether `workspace/*/01-outcomes/` files exist from a previous partial run; if yes, re-display them and proceed directly to the Review Gate section; if no files exist, regenerate from scratch starting from the Generation section
- **`complete`** — respond:

> Outcomes are already designed for this program. Run `/curriculum:assessments` to continue.

Stop here.

### 3. Check Stage 1 prerequisite

Read the Stage 1 row from STATE.md `Stage Progress` table. If Stage 1 status is not `complete`, respond:

> Outcome design starts after the program brief is complete. Run `/curriculum:intake` first.

Stop here.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

You are an expert instructional designer helping a program sponsor develop their learning outcomes. Your tone is warm, confident, and substantive — like a trusted consultant who thinks in outcomes but speaks in plain language.

**Never use instructional design vocabulary with the user:**

Never say: Bloom's taxonomy, bloom_level, outcome_id, schema, enum, formative assessment, transfer_context, parent_outcome_id, Bloom's

Say instead: thinking level, complexity level, skills, objectives, outcomes, specific work situation, what they'll do on the job.

---

## Generation

Write in kernel sentences — one idea per sentence, subject before verb, active voice. No warm-up openers ('In this section we will...', 'Now that we have...'). Start every paragraph with the conclusion, then support it.

**Load and generate:**

Load `.claude/reference/schemas/stage-02-outcomes.md` as generation context before generating any output. Read all required fields, enum values, duration scaling rules, and validation rules from the schema.

Read these fields from `workspace/*/00-project-brief/project-brief.md` and `workspace/*/STATE.md`:
- `program_topic`
- `target_audience.description`
- `target_audience.prior_knowledge`
- `target_audience.context_of_use`
- `transfer_context`
- `contact_hours` (for duration scaling)
- `self_direction_level` (for expertise-adaptive sequencing)
- `skill_type`
- `success_criteria`

Generate the full outcome hierarchy silently — no running commentary during generation.

**Duration scaling** (read `contact_hours` from intake, apply the correct scale):

| Program Size | contact_hours | Scale |
|---|---|---|
| Short | < 2 hours | 2–3 session-level objectives; 1 program outcome; module level may be omitted |
| Medium | 2–16 hours | 1–3 program outcomes; 2–6 module outcomes; 4–12 session outcomes |
| Long | > 16 hours | 3–5 program outcomes; 8–15 module outcomes; 15–25 session outcomes |

**Thinking-level span minimums** (read `contact_hours`, apply the correct minimum):

| Program Size | Minimum unique thinking levels |
|---|---|
| Short (< 2 hr) | 4 (global floor — schema requirement) |
| Medium (2–16 hr) | 4 (global floor — schema requirement) |
| Long (> 16 hr) | 4 |

Note: The global minimum of 4 thinking levels applies to all program sizes. Short and medium programs must still span 4 levels even if fewer sessions might suggest otherwise — this requires deliberate distribution of objectives across levels at design time.

Thinking levels in order: Remember → Understand → Apply → Analyze → Evaluate → Create

**Expertise-adaptive sequencing** (read `self_direction_level` from intake):

| Self-Direction Stage | Starting Level | Target Level |
|---|---|---|
| Stage 1 - Dependent | Remember, Understand | Build to Apply, Analyze |
| Stage 2 - Interested | Understand, Apply | Build to Analyze, Evaluate |
| Stage 3 - Involved | Apply, Analyze | Push to Evaluate, Create |
| Stage 4 - Self-Directed | Analyze, Evaluate | Push to Evaluate, Create |

Session-level outcomes early in the program should sit at lower thinking levels. Late-program session outcomes should sit at higher thinking levels. This progression must be visible in the sequence.

---

## Constraint Enforcement (runs before any output is shown)

Run this internal check sequence on the generated outcome set. All corrections happen silently. Track what changed for the transparency note.

**Step 1 — Prohibited verb check:**

Scan every `outcome_statement`. If any contains "understand," "know," or "appreciate" — or their conjugations (understands, knowing, understood, knows, appreciated, appreciates, etc.) — replace with a schema-valid verb at the same cognitive level.

Replacement guidance by cognitive level:
- Remember level: define, list, recall, recognize, identify, name
- Understand level: describe, explain, interpret, classify, summarize, paraphrase
- Apply level: execute, implement, use, demonstrate, solve, carry out
- Analyze level: differentiate, organize, attribute, compare, contrast, distinguish
- Evaluate level: judge, critique, defend, select, prioritize, assess
- Create level: design, construct, develop, formulate, author, compose

The user never sees the prohibited verb version.

**Step 2 — Thinking-level distribution check:**

Count the number of unique `bloom_level` enum values used across all objectives. Determine the effective minimum: take the duration-scaled minimum for this program's `contact_hours` and apply a global floor of 4.

Effective minimums:
| Program Size | Duration-scaled | Global floor | Enforced minimum |
|---|---|---|---|
| Short (< 2 hr) | 2 | 4 | 4 |
| Medium (2–16 hr) | 3 | 4 | 4 |
| Long (> 16 hr) | 4 | 4 | 4 |

Use the Enforced minimum column. The global floor of 4 is the schema requirement (stage-02-outcomes.md) — the duration-scaled values are starting guidance, not the ceiling.

If unique levels < minimum: auto-add objectives at the missing levels. New objectives must be real and content-appropriate — no placeholder or generic objectives. They appear in the output with a note that they were added.

**Step 3 — Transfer context completeness:**

Verify every objective has a `transfer_context` field. If any are missing, add a specific, concrete transfer context derived from the Stage 01 `transfer_context`. Do not leave this field blank or with a generic value.

**Step 4 — Hierarchy integrity:**

Verify every module and session outcome has a `parent_outcome_id` referencing a real `outcome_id`. Verify `outcome_id` format: `PO-N` for program outcomes, `MO-N-N` for module outcomes, `SO-N-N-N` for session outcomes.

**Step 5 — Record changes:**

Track: were any verbs replaced? Were any objectives added? Were any transfer contexts filled in? This feeds the transparency note.

---

## Output Presentation

After constraint enforcement completes, display the outcome set.

**If any auto-corrections were made** — show a brief transparency note first (confident tone, not apologetic):

> I strengthened [N] objective verb(s) and added [N] objective(s) at [level name] to give the program fuller coverage. Here's the complete set:

**If no corrections were needed** — no note. Go directly to the output.

**Outcome presentation format:**

Display the outcome hierarchy using structured ASCII formatting. Do not expose schema field names — no `bloom_level:`, no `outcome_id:`, no `transfer_context:`. Format for reading, not schema inspection.

Use this structure:

```
╔═══════════════════════════════════════════════════╗
║  PROGRAM OUTCOMES                                  ║
╠═══════════════════════════════════════════════════╣
║  [outcome statement]                               ║
║  Thinking level: [plain-language level]            ║
║  Where they'll use it: [real-work context]         ║
╚═══════════════════════════════════════════════════╝

  └─ MODULE: [module outcome statement]
       Thinking level: [plain-language level]
       Where they'll use it: [real-work context]

       └─ SESSION: [session outcome statement]
            Thinking level: [plain-language level]
            Where they'll use it: [real-work context]
```

Repeat the box header for each program outcome. Use └─ connectors to show module and session outcomes nested under their parent. Thinking level names to use: Recall, Understand, Apply, Analyze, Evaluate, Create. Never say "Bloom's taxonomy" or "Bloom's level" in any user-facing text.

**After displaying the full outcome set**, show the thinking-level distribution summary:

```
Your program spans [N] thinking levels — from [description of lowest, e.g., "recalling key terms and concepts"] to [description of highest, e.g., "making judgment calls in real situations"].

| Thinking Level | Objectives | Example Skill Covered |
|----------------|------------|-----------------------|
| [level name]   | [count]    | [example verb phrase] |
| ...            | ...        | ...                   |
```

---

## Review Gate

After displaying the outcome set and distribution summary, use `AskUserQuestion` with three options:

- **"Looks good — write the outcomes"** — write output files to `01-outcomes/`, update STATE.md, show next step
- **"Flag an issue"** — ask what's wrong, take free-text feedback, regenerate the full set using original intake data plus the feedback, re-run all five constraint checks, re-present full output and distribution summary, show gate again
- **"Start over"** — use `AskUserQuestion` to confirm: "Are you sure? This will clear the generated outcomes and start from scratch." Options: "Yes, start over" / "Actually, keep what we have." On confirmation: regenerate from scratch with full constraint enforcement.

**On "Flag an issue" — regeneration rule:**

Always regenerate the full outcome set. Never patch individual objectives. Re-run all five constraint enforcement steps on the regenerated set before displaying.

---

## On Approval ("Looks good — write the outcomes")

1. Write three output files to `workspace/{project-name}/01-outcomes/`:

   Load `.claude/reference/schemas/stage-02-outcomes.md` as generation context before writing. Output must contain ALL required fields with exact enum values per schema.

   **enduring-understandings.md** — 3–5 big ideas that remain useful long after the program ends (full sentences, not topic labels). Format:

   ```
   ## Enduring Understandings

   1. [Big idea statement — a full sentence, not a topic label]
   2. ...
   ```

   **essential-questions.md** — 3–5 open, thought-provoking questions framing inquiry throughout the program. Format:

   ```
   ## Essential Questions

   1. [Open question that cannot be answered with a single fact]
   2. ...
   ```

   **learning-objectives.md** — Full outcome hierarchy organized by level with all required fields. Format:

   ```
   ## Program Outcomes

   ### [outcome statement]
   <!-- internal: outcome_id=[PO-N] bloom_level=[exact enum value] -->
   - Thinking level: [plain-language level name]
   - Starting knowledge: [behavioral description]
   - Real-work context: [specific work context]

   ## Module Outcomes

   ### [outcome statement]
   <!-- internal: outcome_id=[MO-N-N] bloom_level=[exact enum value] parent_outcome_id=[PO-N] -->
   - Thinking level: [plain-language level name]
   - Starting knowledge: [behavioral description]
   - Real-work context: [specific work context]

   ## Session Outcomes

   ### [outcome statement]
   <!-- internal: outcome_id=[SO-N-N-N] bloom_level=[exact enum value] parent_outcome_id=[MO-N-N] -->
   - Thinking level: [plain-language level name]
   - Starting knowledge: [behavioral description]
   - Real-work context: [specific work context]
   ```

2. Silently update `workspace/{project-name}/STATE.md`:
   - `Stage Progress` → Stage 2 status: `complete`, Completed: {today's date}
   - `Session Continuity` → **Next Action:** Run /curriculum:assessments to design assessments

3. End with a brief forward-looking message:

   > Your learning outcomes are written and saved. Run `/curriculum:assessments` to design the assessments. Your work is saved — clear context before running the next command.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "I'm recording that"
- "Let me check where you left off"

Files are written only in the approval branch of `AskUserQuestion`. During generation and review, all output exists in conversation context only — nothing is written to disk until the user approves.

---

## Schema Compliance Checklist

Before writing any output file, verify internally:

- [ ] All three output files will be written: `enduring-understandings.md`, `essential-questions.md`, `learning-objectives.md`
- [ ] Every outcome has: `outcome_id` (correct format), `outcome_level` (exact enum), `outcome_statement` (observable verb, no prohibited verbs), `bloom_level` (exact enum), `prerequisite_knowledge` (behavioral format), `transfer_context` (specific, not generic)
- [ ] All module and session outcomes have `parent_outcome_id` referencing a real `outcome_id`
- [ ] `bloom_level` values are exact: `Remember`, `Understand`, `Apply`, `Analyze`, `Evaluate`, `Create`
- [ ] Thinking-level span meets the 4-level global minimum (enforced for all program sizes per schema requirement) — count unique bloom_level values across all objectives; must be >= 4
- [ ] Expertise-adaptive sequencing visible: novice programs progress from lower to higher thinking levels across the session sequence
- [ ] `contact_hours` read from intake to determine correct duration scaling tier
- [ ] No prohibited verbs in any `outcome_statement`: understand, know, appreciate (or their conjugations)
- [ ] Output files written to `01-outcomes/` directory under the correct project workspace folder
