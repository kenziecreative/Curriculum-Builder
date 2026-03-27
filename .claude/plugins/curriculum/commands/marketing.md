---
description: Generate program marketing materials from curriculum substance — every claim traces to a specific curriculum element, copy is written to make people want to enroll
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

### 3. Check Stage 8 status

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

Load `.claude/reference/schemas/stage-08-marketing.md` as generation context before generating. Read all required fields, enum values, duration scaling, and validation rules from the schema.

**Load `.claude/reference/copywriting-doctrine.md` before writing any copy.** This file contains the structural frameworks (PAS, DOS, PCPO, FAB), headline formulas, the "You Rule," Writing for Clarity principles (sticky not smooth, kernel sentences, precise language), VOC approach, and the Seven Sweeps post-generation quality check. Every rule in that file applies to the marketing output. Do not summarize or skip it — read it in full.

Read all prior stage outputs:
- `workspace/{project}/00-project-brief/project-brief.md`: audience description, `transfer_context`, program duration, program name
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

Write `workspace/{project}/07-marketing/marketing-package.md` as markdown prose. All sections written simultaneously.

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

## Conversation Display (after file write)

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

## State Update (silent, after file write)

Update `workspace/{project}/STATE.md`:
- Stage 8 status: `complete`, Completed: {today's date}
- Session Continuity → Next Action: `Run /curriculum:approve to review complete package and mark delivery-ready`

Do not announce this update.

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
