# Phase 10: Evaluation Mode - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

A user can run external curriculum documents through the validation rubrics without going through the full generation pipeline — producing a scored report with specific improvement recommendations. This is a standalone command within a workspace context. Evaluation does not require a prior pipeline run; it reads external source documents and evaluates them against the same schema the pipeline enforces.

</domain>

<decisions>
## Implementation Decisions

### Command entry point
- New `/curriculum:evaluate` command — not a branch of `/curriculum:validate` or `/curriculum:intake`
- Lives within a workspace context — workspace is the natural home; a project context makes recommendations more specific
- Evaluation report writes to a distinct location: `workspace/{project}/source-material/evaluation-report.md` — keeps evaluation output clearly separate from `08-validation/` which represents validation of pipeline-generated output
- `/curriculum:evaluate` and `/curriculum:validate` are different commands with different inputs, different output paths, and different purposes — not interchangeable

### Input method
- File paths as arguments is primary: `/curriculum:evaluate path/to/guide.md path/to/workbook.md`
- If no arguments given: auto-detect files in `workspace/{project}/source-material/`, list what's found, and ask user to select which to evaluate before proceeding
- Multiple documents are synthesized together before evaluation — same approach as audit mode intake: read all, synthesize across all, then evaluate the curriculum as a whole (not document by document)
- Progress announced per document as Claude reads it (one line per file, same pattern as audit mode)

### Check scope
- Semantic extraction first, then checks: Claude reads documents and extracts what exists for each validated dimension (outcomes, assessments, session structure, reflection prompts, transfer activities, social learning, etc.), then applies Tier 1 checks semantically against what was extracted — not against schema-structured output files
- All three tiers run: Tier 1 semantic equivalents, Tier 2 quality rubric, Tier 3 human review checklist — same as post-pipeline validation
- Duration scaling still applies: skip Tier 2 for 90-min programs; run all 5 dimensions for half-day+
- Missing required elements are flagged as failures — same treatment as internal validation. External origin does not change the standard. The rubric applies regardless of whether the curriculum was built with this tool.

### Improvement recommendations
- Specific recommendation per failure — not just "missing transfer activity" but a recommendation grounded in the content of the evaluated documents (e.g., "Your Session 3 exercise on pricing models is a strong candidate for a transfer activity — add a step where learners apply it to their own business scenario")
- Recommendations are grounded in what was read — they reference specific content from the source documents, not generic best practice guidance
- Report opens with a brief strengths section before the gap list — what the curriculum does well, then what needs to change. Honest and oriented.

### Output format
- Carries forward the plain language convention from Phase 6: no tier jargon, no check IDs (T1-xx), no schema field names in user-facing output
- Failure identification + specific recommendation per failure (not failure-only like /curriculum:validate)
- Quality scores displayed as N/10 integers (same as Phase 6 convention)

### Claude's Discretion
- Exact format and length of the strengths section
- Whether recommendations appear inline with failures or in a separate recommendations block
- How to handle cases where document content is too thin to generate a specific recommendation (graceful fallback to general guidance)
- Whether Tier 3 human review items appear in the conversation or only in the written report file

</decisions>

<specifics>
## Specific Ideas

- Real-world test candidate: 6-session × 90-min AI agent workflows workshop — existing facilitator guide + slide deck outline. Evaluation mode should produce a useful quality assessment of this material before the audit mode intake is run.
- The distinction between `/curriculum:evaluate` and `/curriculum:validate` matters and should be clear to users: evaluate = external documents, no pipeline required; validate = post-pipeline check of generated output.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `knz-validator.md` (now `.claude/plugins/curriculum/agents/knz-validator.md`): Existing validation agent — evaluation mode follows the same agent pattern (separate file, read-only, dispatched via Task tool). Evaluation will need its own agent file since it reads unstructured documents rather than schema-structured output files.
- `.claude/reference/schemas/stage-09-validation.md`: Full validation schema — all 33 Tier 1 checks, Tier 2 dimensions, Tier 3 items, duration scaling rules. Evaluation agent loads this same schema; semantic extraction replaces schema-file reads.
- `intake.md` Audit Mode: Document ingestion pattern (per-file progress announcement, synthesis before acting) is directly reusable for evaluation mode input handling.
- `source-material/` directory: Already scaffolded by `/curriculum:init` for Phase 8. Evaluation output and auto-detect fallback land here naturally.

### Established Patterns
- Silent STATE.md updates (INFR-10) — evaluation mode may or may not touch STATE.md (no pipeline stage to update), but the pattern applies to any state writes
- Vocabulary quarantine — no schema field names, check IDs, or tier jargon in user-facing output
- FAIL-rows-only display in conversation — passing checks not shown inline (same as /curriculum:validate)
- Per-document progress announcements (established in audit mode intake)
- Separate agent for validation work — orchestrator command dispatches a Task, does not run checks itself

### Integration Points
- `workspace/{project}/source-material/` — input (documents to evaluate) and output (evaluation-report.md)
- `.claude/reference/schemas/stage-09-validation.md` — loaded by the evaluation agent as schema context
- New files needed: `evaluation-mode.md` (command), `curriculum-evaluator.md` (agent)
- No `08-validation/` writes — evaluation output is strictly separate from pipeline validation output

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 10-evaluation-mode*
*Context gathered: 2026-03-23*
