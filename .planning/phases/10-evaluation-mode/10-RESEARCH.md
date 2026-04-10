# Phase 10: Evaluation Mode — Research

**Researched:** 2026-03-23
**Domain:** Claude Code plugin command authoring — new command + agent that evaluates external curriculum documents against the three-tier validation schema
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Command entry point**
- New `/curriculum:evaluate` command — not a branch of `/curriculum:validate` or `/curriculum:intake`
- Lives within a workspace context — workspace is the natural home; a project context makes recommendations more specific
- Evaluation report writes to `workspace/{project}/source-material/evaluation-report.md` — keeps evaluation output clearly separate from `08-validation/` which represents validation of pipeline-generated output
- `/curriculum:evaluate` and `/curriculum:validate` are different commands with different inputs, different output paths, and different purposes — not interchangeable

**Input method**
- File paths as arguments is primary: `/curriculum:evaluate path/to/guide.md path/to/workbook.md`
- If no arguments given: auto-detect files in `workspace/{project}/source-material/`, list what's found, and ask user to select which to evaluate before proceeding
- Multiple documents are synthesized together before evaluation — same approach as audit mode intake: read all, synthesize across all, then evaluate the curriculum as a whole (not document by document)
- Progress announced per document as Claude reads it (one line per file, same pattern as audit mode)

**Check scope**
- Semantic extraction first, then checks: Claude reads documents and extracts what exists for each validated dimension, then applies Tier 1 checks semantically against what was extracted — not against schema-structured output files
- All three tiers run: Tier 1 semantic equivalents, Tier 2 quality rubric, Tier 3 human review checklist — same as post-pipeline validation
- Duration scaling still applies: skip Tier 2 for 90-min programs; run all 5 dimensions for half-day+
- Missing required elements are flagged as failures — same treatment as internal validation. External origin does not change the standard.

**Improvement recommendations**
- Specific recommendation per failure — grounded in the content of the evaluated documents (not generic guidance)
- Recommendations reference specific content from the source documents
- Report opens with a brief strengths section before the gap list — what the curriculum does well, then what needs to change

**Output format**
- Plain language convention: no tier jargon, no check IDs (T1-xx), no schema field names in user-facing output
- Failure identification + specific recommendation per failure (not failure-only like /curriculum:validate)
- Quality scores displayed as N/10 integers (same as Phase 6 convention)

### Claude's Discretion
- Exact format and length of the strengths section
- Whether recommendations appear inline with failures or in a separate recommendations block
- How to handle cases where document content is too thin to generate a specific recommendation (graceful fallback to general guidance)
- Whether Tier 3 human review items appear in the conversation or only in the written report file

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| EVAL-01 | User can run external curriculum through the validation rubrics without going through the full generation pipeline | Semantic extraction pattern (read unstructured docs, extract validated dimensions, apply checks) enables this without requiring pipeline-generated output files |
| EVAL-02 | Evaluation produces a scored report with specific improvement recommendations — field-level gaps, Tier 2 confidence scores, and Tier 3 human review items in the same format as post-generation validation | Reuse of stage-09-validation.md schema + new evaluation-report.md format with strengths section + per-failure recommendations enables full scored output |
</phase_requirements>

---

## Summary

Phase 10 adds a standalone evaluation command that accepts external curriculum documents and runs them through the same three-tier validation rubric used by the internal pipeline. The key architectural challenge is that the existing `knz-validator.md` reads structured schema output files from known directories; the evaluation mode must instead perform semantic extraction from unstructured source documents before applying equivalent checks.

The pattern is well-established in this codebase. Audit mode intake (Phase 8) already performs exactly this kind of semantic extraction — reading arbitrary source documents, extracting structured data, and assessing against schema requirements. Evaluation mode adapts this extraction pattern but feeds it into the three-tier validation rubric rather than into the intake schema. The two new files needed are a command orchestrator (`evaluation-mode.md`) and a dedicated agent (`curriculum-evaluator.md`).

The output format diverges from `schema-report.md` in one meaningful way: each failure includes a specific improvement recommendation grounded in the evaluated document's actual content. This is the defining feature of evaluation mode — it is an assessment tool that tells you what to fix and how, not just that something is missing.

**Primary recommendation:** Build `curriculum-evaluator.md` as a parallel agent to `knz-validator.md`, with semantic extraction as its input stage and the same three-tier check logic applied to extracted content rather than to structured files. The evaluation report file format is new (not identical to schema-report.md) but draws on the same vocabulary and tier structure.

---

## Standard Stack

### Core
| Asset | Version/Location | Purpose | Why Standard |
|-------|-----------------|---------|--------------|
| `.claude/plugins/curriculum/commands/evaluation-mode.md` | New file | Orchestrator — argument parsing, workspace detection, agent dispatch, conversation output | Matches established command pattern across all 12 existing commands |
| `.claude/plugins/curriculum/agents/curriculum-evaluator.md` | New file | Evaluation worker — document synthesis, semantic extraction, three-tier checks, report writing | Matches `knz-validator.md` agent pattern: separate file, dispatched via Task, read-only on source docs |
| `.claude/reference/schemas/stage-09-validation.md` | Existing | Schema defining all Tier 1 checks, Tier 2 dimensions, Tier 3 items, duration scaling rules | Single source of truth — evaluator loads this same file; semantic extraction replaces schema-file reads |
| `curriculum:interactive-design` skill | Existing | Output formatting conventions (headings, tables, status indicators) | All commands reference this skill for consistent UX |

### Supporting
| Asset | Purpose | When to Use |
|-------|---------|-------------|
| Audit mode ingestion pattern (intake.md, Step 1) | Per-file progress announcements during document reading | Whenever reading multiple files; already familiar UX to users who have run audit mode |
| `workspace/{project}/source-material/` | Input location (auto-detect fallback) and output location (evaluation-report.md) | Already scaffolded by `/curriculum:init` for every project |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| New `curriculum-evaluator.md` agent | Extend `knz-validator.md` with an evaluation mode branch | Extension would conflate two distinct input models (structured files vs. unstructured docs). Separate file enforces the same separation rule applied between validate.md and knz-validator.md. |
| Evaluation report in `08-validation/` | Evaluation report in `source-material/` | CONTEXT.md locks the output path. `08-validation/` is strictly for pipeline-generated validation output. |
| Inline checks in the command | Task-dispatched agent | Violates the project's separation rule: validation must never occur in the same agent call as content work. Evaluating external docs is content work by a different input model — same rule applies. |

---

## Architecture Patterns

### Recommended File Structure

Two new files only:

```
.claude/plugins/curriculum/
├── commands/
│   ├── evaluation-mode.md       # New — orchestrator
│   └── [11 existing commands]
└── agents/
    ├── curriculum-evaluator.md  # New — evaluation worker
    └── [2 existing agents]
```

Output location (existing, scaffolded by init):
```
workspace/{project}/
└── source-material/
    ├── [input documents]
    └── evaluation-report.md     # New — written by curriculum-evaluator
```

### Pattern 1: Command Orchestrator Structure

All 12 existing commands follow this structure. `evaluation-mode.md` must match it exactly.

**What:** The command does no content work. It handles routing, argument parsing, workspace detection, agent dispatch (via Task), file verification, conversation output, and any state updates.

**Structure:**
```
1. Workspace detection — read workspace/*/STATE.md; fail gracefully if none
2. Input resolution — parse $ARGUMENTS or auto-detect from source-material/
3. Document ingestion — announce each file as it's read (audit mode pattern)
4. Agent dispatch — spawn ONE Task with schema context + workspace path + documents
5. File verification — confirm evaluation-report.md was written
6. Conversation output — strengths, failures with recommendations, quality scores
7. State update (if applicable) — silent, per INFR-10
```

**When to use:** Every new command that does substantial work. The command is always the thin shell; the agent does the work.

### Pattern 2: Semantic Extraction Agent

This is the novel pattern for Phase 10. `curriculum-evaluator.md` must adapt the `knz-validator.md` structure to work on unstructured input.

**What:** Before running any checks, the agent reads all source documents and builds an internal representation of what exists for each validated dimension. This extraction step replaces the structured file reads in `knz-validator.md`.

**Extraction dimensions (parallel to Tier 1 check domains):**
- Learning outcomes / objectives — what, at what cognitive level, for which audience
- Assessment types — formative, summative, performance-based; which outcomes they're linked to
- Module structure — groupings, social learning elements, belief-challenging encounters
- Session structure — TMA arc elements (prior activation, content chunks, formative check, guided practice, independent practice, reflection, transfer connection)
- Transfer design — pre/in/post program elements (Stage 7 checks are in scope for external curriculum)
- Metaskill activation — if present (Stage 6 checks applicable for full programs)

**Check application logic:**
```
For each Tier 1 check:
  - Identify the semantic equivalent (not the field path, but the pedagogical requirement)
  - Assess whether the extracted content satisfies the requirement
  - If satisfied: PASS
  - If absent or failing: FAIL with:
    (a) what's missing (plain language, no check IDs)
    (b) specific recommendation grounded in evaluated document content
```

### Pattern 3: Evaluation Report Format

The `evaluation-report.md` output is new — not identical to `schema-report.md`. It uses the same tier structure but adds recommendations per failure and opens with a strengths section.

**Structure:**
```markdown
# Evaluation Report

**Curriculum:** {title or filename(s)}
**Evaluated:** {date}
**Program duration:** {inferred from documents or stated}

## What This Curriculum Does Well

{Strengths section — what exists and meets the standard. Honest and specific.}

## Issues to Address

### Missing Required Elements

{Per-failure section, each including:}
- Plain-language description of what's missing
- Specific recommendation referencing content from the evaluated documents

### Quality Ratings (if not 90-min)

- Transfer realism: N/10{optional note if score < 5}
- Social learning: N/10
- Cognitive load: N/10
- Scaffolding: N/10
- Belief-challenging: N/10

## Human Review Items

{Tier 3 items — whether inline or in report only is Claude's discretion}
```

### Pattern 4: Duration Inference

The evaluator must infer program duration from documents when not stated explicitly. This drives Tier 2 scaling (the same rule `knz-validator.md` applies).

**Inference cascade:**
1. Explicit statement in document ("This is a 6-session, 90-minute workshop") — HIGH confidence
2. Session count × session length from document structure — MEDIUM confidence
3. Total content volume heuristic (rough word count, activity count) — LOW confidence, flag as assumed
4. Unable to determine — ask via orchestrator before dispatching agent, or default to half-day and note the assumption

**Key rule from CONTEXT.md:** Duration scaling applies exactly as in pipeline validation. `90-min` programs skip Tier 2. `half-day+` programs run all 5 dimensions.

### Anti-Patterns to Avoid

- **Checking field paths instead of semantic equivalents:** The evaluator must ask "does this curriculum have a formative check in each session?" not "does `formative_check` field exist?" Source documents never have schema field names.
- **Document-by-document evaluation:** All documents are synthesized first, then evaluation runs on the whole curriculum. Never evaluate guide.md separately from slides.md.
- **Writing to `08-validation/`:** Evaluation output is strictly `source-material/evaluation-report.md`. The `08-validation/` path is reserved for pipeline-generated validation output.
- **Generic recommendations:** "Add more transfer design" is not acceptable. "Your Session 3 exercise on pricing models is a strong candidate for a transfer activity — add a step where learners apply it to their own business scenario" is the standard.
- **Exposing tier jargon:** Never write "T1-16", "Tier 2", "schema field", or `transfer_connection` in user-facing output. Plain language throughout.
- **Reporting PASS rows:** Same convention as validate.md — only failures shown in conversation. Passing checks are silent.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Validation check definitions | Custom check logic in the evaluator | Load `stage-09-validation.md` as agent context | Schema is the single source of truth; custom logic diverges silently |
| Check ID to plain-language mapping | Duplicate translation table | Reference the translation table in `validate.md` or reproduce it in `curriculum-evaluator.md` | validate.md already has the canonical mapping for T1-01 through T1-18; the evaluator needs the same mapping for user-facing output |
| Output formatting rules | Ad hoc formatting decisions | Reference `curriculum:interactive-design` skill | Every command uses this skill; diverging creates inconsistency |
| Progress announcement UX | Bespoke loading messages | Audit mode pattern: "Reading [filename]..." per file | Already established and familiar to users |
| Workspace detection | Custom project-finding logic | Same glob pattern as all other commands: `workspace/*/STATE.md` | Consistent workspace detection is load-bearing for multi-project support |

**Key insight:** The evaluation agent should be thought of as `knz-validator.md` with a semantic extraction preprocessing step. The check logic, output vocabulary, and tier structure are inherited — only the input model changes.

---

## Common Pitfalls

### Pitfall 1: Treating Missing Fields as Failures Too Eagerly

**What goes wrong:** The evaluator flags a Tier 1 failure for every schema field not explicitly named in the source document. External curriculum never uses the pipeline's field names.

**Why it happens:** Semantic equivalence is harder than field presence checks. An evaluator that looks for literal field names will produce 100% failure rates on any real-world curriculum document.

**How to avoid:** For each Tier 1 check, articulate the pedagogical requirement in plain language first (e.g., T1-17 = "Is the reflection question specific to this session's content, or could it apply to any session?"). Then assess that requirement semantically against what's in the documents.

**Warning signs:** An evaluation report where every check fails, even for clearly well-designed curriculum.

---

### Pitfall 2: Program Duration Assumed Wrong, Breaking Tier 2 Scaling

**What goes wrong:** The evaluator assumes a program is 90-min (or shorter than it is) and skips Tier 2, or vice versa.

**Why it happens:** Source documents often state session count without total duration, or state duration ambiguously ("a half-day event" without defining half-day).

**How to avoid:** Build explicit duration inference logic into the evaluator with a confidence level. When LOW confidence, surface the assumption in the report: "I estimated this as a half-day program based on [evidence]; if that's wrong, the quality ratings may not apply."

**Warning signs:** Tier 2 scores skipped on a multi-session program, or Tier 2 running on what's actually a single 90-minute module.

---

### Pitfall 3: Recommendation Quality Degrades Without Thin-Content Fallback

**What goes wrong:** The evaluator can only generate specific recommendations when the source documents have enough content to reference. When documents are sparse, it either hallucinates specifics or produces generic guidance.

**Why it happens:** The design calls for recommendations "grounded in the content of the evaluated documents." When documents are thin, there's nothing to ground in.

**How to avoid:** CONTEXT.md explicitly grants discretion here: "graceful fallback to general guidance" when content is too thin. The agent should detect thin content per section and flag it: "This session has limited content in the source documents — the general recommendation is [guidance]; once session content is developed, re-evaluate."

**Warning signs:** Recommendations that could apply to any curriculum regardless of the evaluated content.

---

### Pitfall 4: Output Path Collision with Pipeline Validation

**What goes wrong:** The evaluator writes to `08-validation/` instead of `source-material/`, overwriting or confusing pipeline validation output.

**Why it happens:** The agent pattern from `knz-validator.md` uses `08-validation/` as its write directory. An evaluator adapted from that agent inherits the path if not overridden.

**How to avoid:** Write rule must be explicit and enforced in `curriculum-evaluator.md`: write ONLY to `{workspace_path}source-material/evaluation-report.md`. Never write to `08-validation/`. The CONTEXT.md decision is locked.

**Warning signs:** Missing or overwritten schema-report.md after running evaluate.

---

### Pitfall 5: Argument Parsing Collision with auto-detect Fallback

**What goes wrong:** When no arguments are provided, the command auto-detects files in `source-material/` — but the evaluation-report.md from a previous run is also in `source-material/`. The evaluator then evaluates its own previous output.

**Why it happens:** Auto-detect reads all files in the directory; evaluation-report.md looks like a curriculum document.

**How to avoid:** Auto-detect must explicitly filter out `evaluation-report.md` from the candidate file list. The list presented to the user before proceeding should never include prior evaluation reports.

**Warning signs:** An evaluation report that references "the previous evaluation report" as curriculum content.

---

## Code Examples

### Example 1: Command Argument Parsing (input resolution)

Pattern from `intake.md` Audit Mode Step 1, adapted for evaluate:

```markdown
### Step 1: Document Ingestion

**If ARGUMENTS were provided** (e.g., `/curriculum:evaluate path/to/guide.md path/to/workbook.md`):

Read each file at the provided paths. As each file is read, announce exactly one line:
> Reading [filename]...

Do not wait until all files are read. Do not describe what you find during reading.

**If no ARGUMENTS were provided:**

Check `workspace/{project}/source-material/` for any files. Exclude `evaluation-report.md` from this list.

If files are found, list them and ask:
> I found these files in your source-material folder:
> - [filename 1]
> - [filename 2]
>
> Should I evaluate these?

Use `AskUserQuestion`:
- **"Yes, evaluate these files"**
- **"Let me add more files first"**

If source-material/ is empty (or contains only evaluation-report.md):
> I didn't find any curriculum documents to evaluate. You can either:
> - Drop files into `workspace/{project}/source-material/` and re-run `/curriculum:evaluate`
> - Run `/curriculum:evaluate` with file paths directly: `/curriculum:evaluate path/to/guide.md`

Stop here. Do not proceed.
```

---

### Example 2: Agent Dispatch with Document Context

Pattern from `validate.md` Dispatch section, adapted for evaluate:

```markdown
## Dispatch

Spawn ONE Task with the following:

**Context provided to the Task:**
- Full content of `.claude/reference/schemas/stage-09-validation.md`
- Full content of all ingested source documents
- `workspace_path`: `workspace/{project}/`
- `program_duration`: inferred from source documents (or "unknown" — agent will infer)
- `document_names`: list of evaluated filenames

**Instructions:**
> You are the curriculum evaluation agent. Follow curriculum-evaluator.md exactly. All source documents are in your context. Extract what exists for each validated dimension, then apply Tier 1 checks semantically. Run Tier 2 rubric scoring per duration scaling rules. Run applicable Tier 3 checks. Write evaluation-report.md to {workspace_path}source-material/. Return a completion signal with tier_1_failures count, tier_2_scores (or "skipped"), and tier_3_items count.
```

---

### Example 3: Failure + Recommendation Format (plain language)

This is the defining output format for Phase 10. No check IDs, no field names, grounded in evaluated content:

```markdown
## Issues to Address

**The reflection questions could be more session-specific.**
Your Session 3 reflection ("What did you take away today?") could apply to any session in the program. To make it specific, tie it to the pricing models content: "Think about a supplier negotiation you've handled recently — where would the tiered pricing approach we discussed have changed your outcome?"

**Session 4 is missing a practice activity before the final exercise.**
The session moves directly from the concept explanation into the capstone scenario. Adding a guided practice step — even a short worked example with the cash flow data from the facilitator guide — would help learners before they work independently.
```

---

### Example 4: Strengths Section Format

```markdown
## What This Curriculum Does Well

Your materials show a clear through-line from the workshop's core topic to the final assessment scenario — the pricing negotiation framing is consistent across all six sessions and shows up in both the module exercises and the final role-play.

The social learning structures are specific. Session 2's pair exercise has a clear interdependence structure (one partner plays buyer, one plays seller), and the debrief prompt is linked to what the pairs actually do.

Two of the six sessions have strong transfer connections that name a specific real-work moment — the "your next supplier call" framing in Session 5 is exactly the right level of specificity.
```

---

### Example 5: Agent Rule — Write Restriction (critical)

```markdown
### Rule — Write Restriction

Write ONLY to `{workspace_path}source-material/evaluation-report.md`.

Never write to:
- `{workspace_path}08-validation/`
- Any stage directory (01-outcomes/ through 08-validation/)
- Any path outside `{workspace_path}source-material/`

Overwrite any existing `evaluation-report.md` on each run.
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Validation reads structured stage files by known path | Evaluation performs semantic extraction from unstructured docs before applying equivalent checks | Enables evaluation of any curriculum, not just pipeline-generated output |
| Validation reports failures only (no recommendations) | Evaluation reports failures with specific, content-grounded recommendations | Evaluation mode is actionable; validate mode is diagnostic |
| Validate output → `08-validation/` | Evaluate output → `source-material/evaluation-report.md` | Clear separation between internal QA and external document assessment |

**No deprecated patterns:** Phase 10 creates new files following existing patterns. No existing files are modified.

---

## Open Questions

1. **State management for evaluation mode**
   - What we know: CONTEXT.md notes that evaluation mode may or may not touch STATE.md since there is no pipeline stage to update
   - What's unclear: Should evaluation run count, last evaluation date, or similar metadata be written to STATE.md?
   - Recommendation: Do not write to STATE.md. Evaluation is not a pipeline stage. The report file is its own artifact. If the user wants to track evaluation history, they can look at evaluation-report.md timestamps.

2. **Workspace requirement when user provides file paths directly**
   - What we know: The command lives within a workspace context per CONTEXT.md decision
   - What's unclear: If a user runs `/curriculum:evaluate /absolute/path/to/guide.md` with no active workspace, should the command fail or proceed without writing to a workspace?
   - Recommendation: Require a workspace for output (evaluation-report.md must go somewhere). If no workspace found, prompt user to run `/curriculum:init` first or specify an output path. This matches the pattern of all other commands.

3. **Tier 3 placement — conversation vs. report-only**
   - What we know: CONTEXT.md grants discretion here
   - What's unclear: Showing Tier 3 items in conversation may be too much output for already-long evaluation reports
   - Recommendation: Tier 3 items appear in evaluation-report.md only. Conversation output notes their count: "3 items require human judgment — see evaluation-report.md for the full checklist."

---

## Validation Architecture

`nyquist_validation` is `true` in `.planning/config.json` — this section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Not applicable |
| Config file | None |
| Quick run command | Manual execution of `/curriculum:evaluate` in Claude Code |
| Full suite command | Manual execution of `/curriculum:evaluate` against the real-world test candidate (6-session × 90-min AI agent workflows workshop) |

**Note:** This project is a Claude Code plugin. There is no automated test runner for command behavior — tests are human-executed slash commands that verify output format, routing logic, and file writes. The dashboard (`dashboard/`) uses vitest but that covers a separate React codebase.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Verification Method | Infrastructure |
|--------|----------|-----------|---------------------|----------------|
| EVAL-01 | `/curriculum:evaluate` accepts external files and runs validation without pipeline stages | manual | Run command with real-world workshop files; confirm evaluation-report.md written to source-material/; confirm no pipeline stage required | No test file — manual verification |
| EVAL-01 | Auto-detect fallback lists source-material/ files, excludes evaluation-report.md from candidate list | manual | Run with no arguments in a workspace with evaluation-report.md present; confirm report is excluded from list | No test file — manual verification |
| EVAL-02 | Evaluation report includes strengths section, failures with specific recommendations, and quality scores | manual | Review evaluation-report.md for format compliance; confirm recommendations reference source document content | No test file — manual verification |
| EVAL-02 | Tier 2 scores appear as N/10 integers; tier jargon absent from user-facing output | manual | Review conversation output and report file for check IDs or schema field names | No test file — manual verification |
| EVAL-02 | Duration scaling applies: 90-min programs skip Tier 2 | manual | Run against a document that explicitly states "90-minute session"; confirm no quality ratings in output | No test file — manual verification |

### Sampling Rate

- **Per task:** Run `/curriculum:evaluate` against one source document after authoring each new file; confirm command routes correctly and agent dispatches
- **Per wave merge:** Run against the real-world test candidate (workshop outline + slides); verify full report format
- **Phase gate:** Full evaluation of real-world test candidate produces a useful, specific quality assessment before `/curriculum:verify-work`

### Wave 0 Gaps

None — no automated test infrastructure needed. All verification is manual slash command execution against real or synthetic curriculum documents. The real-world test candidate (6-session × 90-min AI agent workflows workshop — `workspace/accessible-development-with-ai/source-material/workshop-outline-integrated.md` and `workshop-slides-outline.md`) is already present and can be used for end-to-end verification.

---

## Sources

### Primary (HIGH confidence)

- **Codebase — `.claude/plugins/curriculum/agents/knz-validator.md`** — Full validation agent spec; architectural model for `curriculum-evaluator.md`
- **Codebase — `.claude/reference/schemas/stage-09-validation.md`** — Complete three-tier validation schema with all 33 Tier 1 checks, 5 Tier 2 dimensions, 9 Tier 3 items, and duration scaling rules
- **Codebase — `.claude/plugins/curriculum/commands/validate.md`** — Orchestrator command pattern; plain-language translation table; conversation output conventions
- **Codebase — `.claude/plugins/curriculum/commands/intake.md`** (Audit Mode section) — Document ingestion pattern, per-file progress announcements, synthesis-before-acting approach, auto-detect with AskUserQuestion confirmation
- **Codebase — `.claude/plugins/curriculum/skills/interactive-design/SKILL.md`** — Output formatting conventions (headings, tables, status indicators) that all commands follow
- **Codebase — `.planning/phases/10-evaluation-mode/10-CONTEXT.md`** — All implementation decisions; these are locked constraints

### Secondary (MEDIUM confidence)

- **Codebase — `.planning/STATE.md` decisions log** — Pattern decisions from Phases 6, 7, 8, 9 that inform conventions for Phase 10 (vocabulary quarantine, FAIL-rows-only display, separate agent rule, silent STATE.md updates)

### Tertiary (LOW confidence)

None — all findings come from direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — both files' structures are directly derivable from existing patterns in the codebase; no external dependencies
- Architecture patterns: HIGH — semantic extraction adapted from audit mode intake is well-defined; evaluation report format specified in CONTEXT.md
- Pitfalls: HIGH — all five pitfalls are grounded in specific design decisions visible in the codebase; not speculative

**Research date:** 2026-03-23
**Valid until:** No expiry — research is based on stable internal codebase artifacts, not external dependencies or library versions
