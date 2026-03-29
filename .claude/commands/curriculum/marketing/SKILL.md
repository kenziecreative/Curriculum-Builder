---
name: marketing
description: Generate program marketing materials from curriculum substance — every claim traces to a specific curriculum element, copy is written to make people want to enroll
disable-model-invocation: true
---

# /curriculum:marketing

Generate enrollment-ready marketing copy for your program — every claim grounded in what the curriculum actually teaches, every promise traceable to a specific learning objective, assessment, or transfer activity.

## Prerequisites

### 1. Check workspace exists

List subdirectories under `workspace/`. Find the one that contains a `STATE.md` file — that is the active project. Use its directory name as `{project}` for all subsequent paths. If no project is found:

> It looks like you haven't set up a project workspace yet. Run `/curriculum:init` first to get started.

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

### 2. Check Stage 7 prerequisite

Read Stage 7 status from the workspace STATE.md. If Stage 7 status is not `complete`:

> Marketing materials are generated after the transfer design is finalized. Run `/curriculum:transfer` first.

Stop here.

### 3. Input Validation

Read `workspace/{project}/curriculum-registry.json`. If the file does not exist, stop and report:

> No curriculum registry found. This usually means the intake stage needs to be re-run with the updated pipeline.

Verify the following fields exist and are non-empty:
- `learner_profile.data.target_audience`
- `learner_profile.data.transfer_context`
- `outcome_wording.program_outcomes` (at least one entry)
- `assessment_criteria` (at least one entry)

If any field is missing or empty, stop and report:

> Cannot start Marketing — {specific field description} is missing from the registry. Run `/curriculum:transfer` to generate it.

Do not proceed to generation.

### 4. Check Stage 8 status

Read Stage 8 status from the workspace STATE.md:

- **`not-started`** — proceed to Generation section
- **`complete`** — respond:
  > Marketing materials are ready. Run `/curriculum:approve` to review your complete package.
  Stop here.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing content.

**Critical inline guardrail: Never use in marketing copy: schema, curriculum_traceability, bloom_level, learning_objective_id, element_type.**

You are an expert instructional designer writing enrollment marketing — your voice is warm, compelling, and write-to-enroll. The traceability requirement is the floor: every claim must be grounded in the curriculum. Within that floor, the copy must make a real person want to register. Dry curriculum summaries and neutral factual descriptions are not acceptable. Copy should answer the question: "Why should I show up?"

**Never expose technical fields to the user in marketing output:**

Never use in copy or display: curriculum_traceability, source_citation, schema, enum, bloom_level, learning_objective_id, element_type, claim_type

These fields exist in the file — they never appear in the conversation display.

---

## Generation (silent)

### Source Material

Before generating, check `workspace/source-material/` for any files. If files exist, read them. These represent prior work the user has brought into the project — research, outlines, existing curriculum, or domain context. Generated content should build from and align with this material. The pipeline structures the user's knowledge; it does not replace it.

Load `.claude/reference/schemas/stage-08-marketing.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

Load `.claude/reference/audit-trail-format.md` for the canonical audit trail format. This must be available before the trail write step after successful draft promotion.

**Load `.claude/reference/copywriting-doctrine.md` before writing any copy.** This file contains the structural frameworks (PAS, DOS, PCPO, FAB), headline formulas, the "You Rule," Writing for Clarity principles (sticky not smooth, kernel sentences, precise language), VOC approach, and the Seven Sweeps post-generation quality check. Every rule in that file applies to the marketing output. Do not summarize or skip it — read it in full.

Read from `workspace/{project}/curriculum-registry.json` field `learner_profile.data`: `target_audience` (for audience description), `transfer_context`, `contact_hours` (for program duration). Read program name from `curriculum-registry.json` field `meta.project_name`. Do not read these fields from project-brief.md.

Read all prior stage outputs:
- `workspace/{project}/01-outcomes/learning-objectives.md`: program-level and module-level objectives (source for learning promises)
- `workspace/{project}/02-assessments/assessment-map.md`: objective-assessment alignment table (source for outcome evidence and performance task descriptions)
- `workspace/{project}/03-modules/`: module topics (source for program description content areas)
- `workspace/{project}/06-transfer/transfer-ecosystem.md`: real-work application elements (source for learning promise grounding)

Generate the full marketing package silently. Apply all constraints below before writing.

---

## Generation Constraints (applied silently before writing)

**Duration scaling — apply element-count ceilings before generating:**

- `contact_hours` < 2 (or program_duration = "90-min"):
  - Required: `program_description` (1 record)
  - Optional: `enrollment_cta` (1 record)
  - Omit: `learning_promise`, `audience_positioning`, `testimonial_prompt` — insufficient curriculum depth to justify
  - All elements still require `source_citation` and a source link (where each claim comes from)

- `contact_hours` 2–16 (half-day to 2-day programs):
  - Required: `program_description`, `learning_promise` (minimum 2 records), `audience_positioning` (minimum 1 record)
  - Optional: `enrollment_cta`, `testimonial_prompt`
  - All elements require `source_citation` and a source link (where each claim comes from)

- `contact_hours` > 16 (multi-week or semester programs):
  - Full package: all five element types
  - Multiple records per element type allowed for audience segmentation
  - Marketing-to-pedagogy ratio rule strictly applied

**Traceability constraint:**

Every element in the marketing package must have:
- A populated `source_citation` field referencing a specific stage output (e.g., "stage-02 OBJ-03 (Apply)", "stage-07 real_work_application session-01")
- A `source_link` object showing where each claim comes from: `claim_text` (verbatim excerpt from `content`), `supporting_element` (specific stage reference), and `strength` (direct/inferred/adjacent)

If any element cannot be grounded in a specific curriculum source: do not include that element. No unsourced claims.

**Audience positioning:**

Translate the behavioral audience description from Stage 1 ("participants who can X but cannot yet Y") into warm enrollment language. The behavioral description is the schema source; the copy reads human. Example: "can X, cannot yet Y" → "You know how to [X], but you're ready to level up to [Y]." Keep the source link pointing to the stage-01 audience field.

**Learning promises:**

Use behavioral language matching the thinking level of the cited objectives. Apply higher-order verbs where the objectives support them: Create, Evaluate, Analyze, Apply. Write as what the learner will be able to DO, not what they will KNOW. "You will understand X" is not acceptable. "You will be able to X" is the floor; "You'll walk away with X built" is preferred where accurate.

**Marketing ratio rule:**

The total word count of all marketing elements must be less than 25% of total curriculum output word count (stages 01–07 combined). If the draft exceeds this ceiling: trim learning promises first, keeping the most specific and traceable elements; then trim audience positioning records. Keep program description and any elements with `strength: direct` traceability intact.

---

## File Write (immediately after generation — no mid-pipeline gate)

Create `workspace/{project}/07-marketing/_drafts/` if it does not exist. Write `workspace/{project}/07-marketing/_drafts/marketing-package.md` as markdown prose. All sections written simultaneously.

**Writing rules — from copywriting-doctrine.md (already loaded above). Apply all of these:**

1. **Choose a structural framework** for the Program Description: PAS (pain → agitate → solve) or DOS (desire → obstacle → solve). The entire description must follow one framework — not switch between them.
2. **Apply the "You Rule"** — every sentence addresses the reader directly. "You'll build..." not "Participants will learn..." Not every sentence must literally start with "you," but the reader must be the subject of every benefit.
3. **Write sticky, not smooth** — the copy must grab attention, not slide past. If a sentence could be skimmed without stopping, rewrite it.
4. **Use kernel sentences** — "Blank is Blank." Direct, simple structures. No complex compound sentences when a kernel sentence would land harder.
5. **Precise language** — numbers beat adjectives. "five-question framework" not "comprehensive framework." "one day" not "a short program."
6. **VOC language** — use the words learners would actually say. "I keep rebuilding my prompts" not "practitioners experience workflow discontinuity."
7. **Cut all fluff** — no warm-up sentences, no "In today's rapidly evolving landscape," no "It's worth noting that," no unnecessary modifiers.
8. **Use headline formulas** for The Promise line — try "Who Else Wants [outcome]?", "[Hard thing] in [timeframe]", or "[Outcome] for [specific person] who [situation]." Pick the strongest.
9. **After drafting, run the Seven Sweeps** silently: Clarity → Voice & Tone → "So What?" → "Prove It" → Specificity → Heightened Emotion → Zero Risk. Fix issues found in each sweep before writing the file.
10. **No source references in copy.** Traceability lives in the file's traceability table only — never inline with prose.

**File structure:**

```
# [Program Name] — Marketing Package

## The Promise
[One sentence. The transformation this program delivers. Format: "In [duration], you'll go from [specific current struggle] to [specific new capability]." Draw from the transfer design's post-program outcomes and the highest-order learning objectives. This is the hook — write it to make someone stop scrolling.]

## Program Description
[2-3 prose paragraphs. Benefits-first. PAS or DOS structure. VOC language. No curriculum field names.]

## What Changes
[From/To pairs — one per major transformation this program produces. Each pair names a specific before state (what the learner is stuck with now) and after state (what they walk away able to do). Draw from learning objectives and transfer design real-work application elements. Format:

- **From:** [specific current struggle or limitation] → **To:** [specific new capability or outcome]

3–5 pairs for multi-week programs. 2–3 for shorter programs. Each pair must be traceable to a specific objective or transfer activity.]

## Learning Promises
[Bulleted list. Each item is a learner-facing benefit statement — full outcome text rewritten as what the learner gains. Not outcome IDs. Not "you will understand." "You'll be able to..." is the floor; "You'll walk away with X built" is preferred where accurate.]

## Audience Fit
[1-2 prose paragraphs. Who this program is for, what they'll be able to do, why it matters to them. Warm enrollment language. No identity labels — behavioral description only.]

---

## Source Traceability

| Claim | Source | Strength |
|-------|--------|----------|
| [verbatim phrase from prose above] | [stage/field reference] | [High/Medium/Low] |
```

The traceability table appears after the horizontal rule separator — never inline with the prose sections.

Omit sections that are not generated for the program's duration tier (e.g., omit Audience Fit and What Changes for 90-minute programs; omit What Changes for programs under 4 contact hours).

Do not wait for user review before writing. The final review gate is `/curriculum:approve` — that command covers the complete package including marketing materials.

---

### Draft Audit

Run these 7 checks against the file in `workspace/{project}/07-marketing/_drafts/`. All 7 must pass before promotion.

**Check 1: File Completeness**
Verify `marketing-package.md` exists in `_drafts/` with non-zero content containing required sections for this program's duration tier (at minimum: The Promise, Program Description, Source Traceability).

**Check 2: Registry Consistency**
Read `curriculum-registry.json`. Verify:
- Learning promises reference outcomes that exist in registry `outcome_wording.program_outcomes`
- Audience description aligns with registry `learner_profile.data.target_audience`
- Program duration references match registry `learner_profile.data.contact_hours`

This is a blocking failure.

**Check 3: Vocabulary Scan**
Read `.claude/reference/curriculum-voice.md`. Scan the draft for any term in the never-say table, plus the marketing-specific prohibited terms: schema, curriculum_traceability, bloom_level, learning_objective_id, element_type, claim_type. Auto-fixable for never-say substitutions. Marketing-specific terms should not appear in prose at all (they are file metadata only).

**Check 4: Schema Compliance**
Load `.claude/reference/schemas/stage-08-marketing.md`. Verify all required elements for this duration tier are present. Verify source_citation and source_link fields are populated for every claim.

**Check 5: Source Citation Completeness (T1-31)**
Verify every marketing claim in the prose sections has a corresponding entry in the Source Traceability table with a populated source reference. Claims without sources are not acceptable — every promise must trace to a curriculum element.

This is a blocking failure — requires regeneration.

**Check 6: Source Element Existence (T1-32)**
For each entry in the Source Traceability table, verify the referenced stage output actually exists. A source_citation of "stage-02 OBJ-03" must correspond to an actual objective in 01-outcomes/learning-objectives.md. A reference to "stage-07 real_work_application session-01" must correspond to content in 06-transfer/transfer-ecosystem.md.

This is a blocking failure — requires regeneration.

**Check 7: Marketing Ratio (T1-33)**
Count the total word count of the marketing package prose (excluding the traceability table). Count the total word count of all curriculum output files in stages 01-07. Verify marketing word count is less than 25% of curriculum word count.

This is a blocking failure — trim learning promises first (keeping most traceable), then audience positioning. Keep program description and direct-strength traceability claims.

### Verification Integrity

A check either passes its defined criteria or it fails. No middle ground.

**Rules:**
1. Do not rationalize a passing result. If a check's defined criteria are not met, the check fails — regardless of how close the result is.
2. Do not downgrade severity. If the check definition says "blocking," it blocks. You do not have the authority to change a blocking failure to a warning.
3. Do not invent passing conditions. If the criteria say "every claim must have a source," then one unsourced claim is a failure, not "substantially complete."
4. Do not soften failure descriptions. Report exactly what failed and why. Do not add qualifiers that minimize the problem.
5. Do not bypass checks. Every defined check runs. A check that was skipped is treated as a failure, not an omission.

**Prohibited qualifiers — never use these when reporting check results:**
approximately, mostly, essentially, close enough, acceptable, nearly, substantially, reasonably, adequate, sufficient, largely, broadly, generally, for the most part, in most cases, with minor exceptions

**If you find yourself wanting to write "mostly passes" or "essentially meets the criteria," the check failed.**

**Audit Result:**

If all 7 checks pass: promote `marketing-package.md` from `workspace/{project}/07-marketing/_drafts/` to `workspace/{project}/07-marketing/marketing-package.md` (move, not copy). Delete the `_drafts/` directory after successful promotion. Then proceed to the Conversation Display section below.

If any check fails:
1. Attempt auto-fix for simple failures:
   - Vocabulary violations (Check 3): substitute with the plain-language replacement from curriculum-voice.md. Remove any marketing-specific prohibited terms from prose (they are metadata only).
2. Re-run the failing check(s) after auto-fix.
3. If content checks (Checks 5–7) still fail after auto-fix: regenerate the marketing package. Re-run all 7 checks on the new draft. Track this as attempt 2.

   **Retry constraint injection:** Each retry must add cumulative constraints to the regeneration prompt:
   - Attempt 2: inject the specific failing check criteria as explicit generation constraints
   - Attempt 3: inject both the attempt-2 constraints plus the verbatim failure reason from attempt 2

   **Marketing Ratio (Check 7) auto-fix on retry:** When ratio exceeds 25%, the retry instruction must specify trimming targets: "Trim learning promises to the N most traceable. Remove audience positioning section if ratio still exceeds threshold."

4. After 3 failed attempts, stop and escalate. Do not promote. Do not mark the stage complete. Present the escalation in plain language:

   > I wasn't able to produce marketing copy that passes all checks after three tries. Here's what kept failing:
   > - [Plain-language description of the specific problem — what was missing or wrong, not the check ID]
   > - [Where in the file the problem appeared]
   > - [What to try: specific suggestion for how to provide different input or adjust the program design]
   >
   > Run `/curriculum:marketing` again to retry.

5. Structural failures (Checks 1, 2, 4) stop immediately — no retry. Report the specific failure and stop.

---

## Conversation Display (after successful promotion)

**Formatting rules — apply exactly, no substitutions:**
- Use `##` headings to open major sections (e.g., `## Your Marketing Copy`)
- Use `###` for subsection labels
- Bold (`**text**`) for key labels — 1-2 per section max
- No walls of prose without a heading every 6-8 lines

**Show the marketing copy clean — exactly as a reader would see it.** No source references, no traceability footnotes, no `→ Source:` lines inline with the copy. The copy must read as real marketing material that could be sent to a prospective learner right now.

Display format:

```
## Your Marketing Copy

### The Promise
[One-sentence transformation statement — the hook]

### Program Description
[2-3 prose paragraphs. Compelling. Benefits-first. Written to enroll.]

### What Changes
- **From:** [current struggle] → **To:** [new capability]
- **From:** [current struggle] → **To:** [new capability]
[Continue for all From/To pairs]

### What You'll Be Able to Do
- [Learning promise 1 — written to make someone want this]
- [Learning promise 2]
[Continue for all learning promises]

### Who This Is For
[1-2 prose paragraphs. Warm enrollment language.]
```

Include only the element types generated for this program's duration tier. Omit sections with no records.

**After the clean copy, show the traceability audit separately:**

```
---

### Source Traceability

Every claim above traces to something the curriculum actually delivers:

| Claim | Grounded In | Strength |
|-------|-------------|----------|
| [verbatim phrase from the copy] | [plain-language source — e.g., "the delegation tier exercise in Session 2"] | High / Medium / Low |
```

The traceability table is a review tool for the designer — it is not part of the marketing copy. Keep them visually separated.

Then show:

```
Type `/clear` now, then run `/curriculum:approve` to review your complete curriculum package and mark it delivery-ready.
```

---

## Audit Trail Update (silent, after successful promotion)

Read `workspace/{project}/audit-trail.md`. If Stage 8's section already exists (re-generation), replace it. Otherwise append.

Write the Stage 8 section following the format in `.claude/reference/audit-trail-format.md`:

**Grounded In:** For each marketing copy section produced, list:
- **The Promise**: which stage output (learning objectives, transfer design) grounded the transformation statement
- **Program Description**: which source material file and specific claim or domain context shaped the program description content
- **What Changes (From/To pairs)**: which learning objectives and transfer activities grounded each pair
- **Learning Promises**: which specific program outcomes grounded each learning promise
- **Audience Fit**: which stage-01 audience description grounded the audience positioning

**Agent-Generated:** List content produced from the agent's own knowledge — e.g., "PAS/DOS structural framework selection", "Headline formula selection and application", "VOC language adaptation", "Marketing word count ratio compliance trimming".

**Read but Not Referenced:** List any source material files that were loaded but not incorporated into marketing copy. If all loaded files were referenced, write: All loaded files were referenced above. If no source files were loaded, omit this subsection.

Update the Build Summary block at the top of the trail:
- Add "Stage 8: Marketing" to the Stages completed list
- Recalculate grounding percentage

Do this silently — no announcement to the user.

---

## State Update (silent, after successful promotion)

Update `workspace/{project}/STATE.md` only after the draft audit passes and the file is promoted from `_drafts/` to the deliverable directory:
- Stage 8 status: `complete`, Completed: {today's date}
- Session Continuity → Next Action: `Run /curriculum:approve to review complete package and mark delivery-ready`

Do not announce this update. Do not update STATE.md if promotion did not occur.

---

## Important: No Auto-Trigger

This command ends after the traceability display and the "Run /curriculum:approve" prompt. There is no auto-trigger from /curriculum:marketing. The user must explicitly run `/curriculum:approve` — that is the final review gate and requires intentional user action to mark the curriculum delivery-ready.

---

## State Management Rules

All STATE.md reads and writes are silent. Never say:
- "Updating STATE.md"
- "Saving progress"
- "Writing to disk"
- "I'm recording that"
- "Logging this"
