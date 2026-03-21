# Phase 6: Validation Layer - Research

**Researched:** 2026-03-21
**Domain:** Claude Code agent architecture, Markdown report generation, React component integration
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Invocation model**
- Runnable once Stage 5 is complete — does not require Stages 6-8 to exist
- Auto-triggered via Skill invocation at the end of `/knz-sessions` (after all files written, Stage 5 marked complete) — same pattern as discuss-phase auto-advancing to plan-phase
- Can also be run standalone at any time after Stage 5 is complete — supports iterative fix-and-recheck loop
- Each re-run overwrites previous `schema-report.md` and `human-review-checklist.md`

**User-facing output format**
- Plain language summary first: headline status ("Your curriculum passed all required checks" or "Found 3 issues that need fixing"), then details below
- No inline coaching explaining what Tier 1/2/3 means — plain language framing makes it self-evident
- Conversation shows: pass/fail headline, count summary, then ONLY the failed checks inline
- Passing checks are in `schema-report.md` but not shown in conversation — keeps response actionable
- Report and stop — validation is read-only; user drives any fixes

**Failure behavior**
- Run all checks before reporting — full pass in one invocation, not stop-on-first-failure
- No inline "how to fix" guidance — exact field locations and failure messages are sufficient
- No offer to regenerate failing sections — separation rule; validator never touches output files

**Scope in Phase 6**
- Tier 1 checks T1-01 through T1-18 only (Stages 2-5 checks)
- T1-19 through T1-33 (Stage 6/7/8 checks) listed as "Not applicable — Stage N not yet generated" in report
- When Phase 7 generates those stages, the same validation agent picks them up automatically on next run
- Tier 2 rubric scoring follows duration scaling from schema: skip for 90-min programs, run all 5 dimensions for half-day+
- Tier 3 human review items: run applicable checks for what exists (transfer-specific checks skipped until Stage 7 exists)

**Data access**
- Validation agent reads workspace stage directories directly: `01-intake/`, `02-outcomes/`, `03-assessments/`, `03-modules/`, `04-sessions/`
- Same paths generation commands write to — no intermediate manifest needed
- Read STATE.md to confirm which stages are complete before scoping the run

**Dashboard integration**
- Phase 6 adds a ValidationReport component to the React dashboard (not deferred to Phase 7)
- Component lives as a separate panel below the pipeline stepper, visible when Stage 9 is selected — consistent with DeliverableSection pattern for other stages
- Shows: overall status (pass/fail), issue count summary, failed checks with exact locations, Tier 2 confidence scores per dimension
- Human review checklist items shown in the same panel (or a tab within it)
- Does not show passing checks — keeps dashboard scannable

### Claude's Discretion
- Exact visual design of ValidationReport component (badge colors, layout within panel)
- How Tier 2 scores are rendered (progress bar, numeric, color-coded)
- Whether human review items are a second tab or scroll-below in the same panel
- File watcher behavior for validation report files in the dashboard polling hook

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VALD-01 | Tier 1 automated schema validation checks all required fields are populated (> 95% completion rate) | Validation agent reads stage output files directly; checks T1-01 through T1-18 in Phase 6 scope. The agent file pattern from session-generator.md shows how to structure a read-only agent with explicit check enumeration. |
| VALD-02 | Tier 1 validation blocks completion if required fields are missing | The schema-report.md output includes overall status field. The `/knz-approve` command reads `08-validation/` before presenting the Final Validation gate — a failing schema-report prevents gate approval. |
| VALD-03 | Tier 2 rubric-based scoring produces confidence scores, not pass/fail, for qualitative dimensions | The stage-09-validation.md schema defines 5 dimensions with 0.0–1.0 scoring and evidence/recommendation fields. Duration scaling rules are fully specified. |
| VALD-04 | Tier 3 surfaces specific items for human review with actionable descriptions and locations | T3-01 through T3-09 are defined in the schema with location format including exact file + field path. Phase 6 runs only the non-transfer-specific checks (T3-06, T3-07, T3-08 applicable; T3-01 through T3-05 skipped until Stage 7 exists). |
| VALD-05 | Generation and validation use separate subagents — never generate and validate in a single call | The `.claude/agents/` pattern enforces this structurally — `knz-validator.md` as a separate agent file invoked via Task tool from `knz-validate.md` command. The schema's Separation Rule is the authority. |
| VALD-06 | Validation report identifies specific field-level failures with locations | The Failure Reporting Standard in stage-09-validation.md mandates stage + file + field + nature-of-failure format. The agent prompt must include schema context to enforce this format. |
</phase_requirements>

## Summary

Phase 6 builds two discrete deliverables: (1) a `/knz-validate` command + `knz-validator.md` agent that reads completed stage output, runs three tiers of checks, and writes three report files; and (2) a `ValidationReport.tsx` React component that surfaces validation results in the dashboard. The domain is not a new technology — it is entirely within the established plugin architecture. The validation schema is fully pre-defined in `.claude/reference/schemas/stage-09-validation.md` with all 33 Tier 1 checks, 5 Tier 2 dimensions, and 9 Tier 3 items already specified.

The critical architectural constraint is agent separation: generation and validation must never occur in the same agent call. This is already a structural pattern in the codebase — session-generator.md is invoked as a separate Task subagent from knz-sessions.md. The knz-validator agent follows the same separation: a dedicated agent file with read-only access, invoked from the knz-validate command. The `/knz-sessions` command already ends with a "Next: `/knz-validate`" message — the auto-trigger adds a Skill invocation step after that message.

For the dashboard, the ValidationReport component is a new peer to DeliverableSection. It renders structured data parsed from the `08-validation/` report files. The existing `useWorkspacePoll` hook and `listStageFiles` function already cover the `08-validation/` directory (it is entry 9 in STAGE_DIRS). The component needs to fetch and parse markdown report files, then render structured views — not raw markdown. This requires a lightweight markdown-to-data parsing step, not full markdown rendering.

**Primary recommendation:** Build the validator agent as a strict instruction file that receives the complete validation schema as prompt context. The schema's check definitions, failure reporting format, and duration scaling rules are the authoritative specification — the agent must load `stage-09-validation.md` as context before running any checks.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Claude Code agent files (`.claude/agents/*.md`) | Current | Validation agent definition | Established pattern in this codebase — session-generator.md is the reference implementation |
| Claude Code command files (`.claude/commands/*.md`) | Current | `/knz-validate` entry point | Every pipeline stage has a corresponding command file — this follows that pattern |
| React + TypeScript | 19.x / current | ValidationReport component | Already used in dashboard; no new technology needed |
| Tailwind CSS | 4.x | Component styling | Already in dashboard; StatusBadge and other components use Tailwind utility classes |
| Vitest | 3.x | Component and utility tests | Already configured in `vitest.config.ts`; existing test pattern uses `vi.stubGlobal('fetch', ...)` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | 0.554.x | Icons in ValidationReport | Already in dashboard — ChevronDown, FileText, etc. used in FileExpander |
| `react-markdown` + `remark-gfm` | 10.x / 4.x | Render markdown fields in validation report | Available if report content needs markdown rendering; prefer structured parsing for check data |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Separate agent file | Inline validation in /knz-sessions | Inline violates separation rule from schema and VALD-05 — not acceptable |
| Parsing report files in frontend | Storing validation data as JSON | JSON would require a new output format not defined in the schema; markdown is the specified format |
| Full markdown render of schema-report | Structured parse + custom render | Custom render enables scannable UI (no passing checks, color-coded scores); raw markdown would show everything |

**Installation:** No new packages required — all dependencies already present.

## Architecture Patterns

### Recommended Project Structure

New files to create:
```
.claude/
├── agents/
│   └── knz-validator.md          # Read-only validation agent (new)
└── commands/
    └── knz-validate.md           # Orchestrator command (new)

knz-curriculum-dashboard/src/
└── components/
    └── ValidationReport.tsx      # Dashboard component (new)
```

Existing files to modify:
```
.claude/commands/knz-sessions.md  # Add auto-trigger of /knz-validate at end
knz-curriculum-dashboard/src/App.tsx  # Wire ValidationReport below DeliverableSection
```

Output location (already in STAGE_DIRS as entry 9):
```
workspace/{project-name}/
└── 08-validation/
    ├── schema-report.md          # Tier 1 + Tier 2 results
    ├── rubric-report.md          # Tier 2 confidence scores with evidence
    └── human-review-checklist.md # Tier 3 checklist items
```

### Pattern 1: Validation Agent Structure (read-only agent)

**What:** A `.claude/agents/` file that defines a single-purpose read-only agent. The agent receives the validation schema as context, reads workspace stage files, runs all applicable checks, and writes three report files. It never modifies stage output.

**When to use:** Anytime validation must be structurally separated from generation. The agent file is invoked via Task tool from the command — same mechanism as session-generator.md.

**Reference implementation:** `.claude/agents/session-generator.md` — note the structure: frontmatter description, persona/role definition at top, explicit context-received block, rules section, output file specifications, completion signal format, error handling.

Key structural elements to replicate in `knz-validator.md`:
```markdown
---
description: Curriculum validation worker — reads completed stage output, runs Tier 1/2/3 checks, writes reports
---

# KNZ Validator — Curriculum Quality Checker

You are a validation agent. You read completed curriculum output and check it against the validation schema. You write 3 report files. You do not modify any stage output files under any circumstances.

## Context Received
[schema, workspace paths, STATE.md content, program duration]

## Validation Rules
[load stage-09-validation.md schema as context before running any checks]
[run all applicable checks before reporting — never stop on first failure]
[...]

## Output Files
[schema-report.md, rubric-report.md, human-review-checklist.md with exact formats]

## Completion Signal
[structured return to orchestrator]
```

### Pattern 2: Command Orchestrator Structure

**What:** The `/knz-validate` command reads STATE.md to determine which stages are complete, dispatches the validation agent via Task tool, waits for completion, then presents plain-language results in the conversation.

**When to use:** Every pipeline command follows this pattern — prerequisites check, dispatch work, present results, update STATE.md silently.

The command is the only place that shows results to the user. The agent writes files silently and returns a completion signal. The command translates the completion signal into plain language.

```markdown
# /knz-validate

## Prerequisites
1. Read workspace STATE.md — if Stage 5 not complete, show forward-looking message
2. [check pattern mirrors knz-sessions.md prerequisites block]

## Dispatch
Spawn one Task with knz-validator.md as the agent specification.
Pass: all stage file paths, STATE.md content, schema file content, program duration.

## Conversation Output
[headline status]
[failure list — only if failures exist]
[Tier 2 scores — only for qualifying programs]
[next step pointer]

## State Update (silent)
- Stage 9 status: complete (or in-progress if failures exist)
- Update Final Validation gate status: pending (awaiting human approval via /knz-approve)
```

### Pattern 3: ValidationReport React Component

**What:** A React functional component that fetches `schema-report.md` and `human-review-checklist.md` from `08-validation/`, parses the structured content, and renders a scannable panel.

**When to use:** Rendered in App.tsx alongside DeliverableSection, visible when selectedStage === 9.

The component follows the same fetch-on-first-render pattern as FileExpander (content !== null guard, no refetch on re-expand). However, it renders structured UI rather than raw markdown, requiring a minimal parse step.

```typescript
// Fetch pattern (mirrors FileExpander)
useEffect(() => {
  if (content !== null) return  // cached — no refetch
  fetch(`/workspace/${projectName}/08-validation/schema-report.md`)
    .then(r => r.text())
    .then(text => setContent(text))
}, [projectName, content])

// Parse pattern: scan markdown tables for check data
// Tier 1: look for rows with "FAIL" status
// Tier 2: look for score rows with float values
// Tier 3: parse checklist items from human-review-checklist.md
```

The component DOES NOT use react-markdown for report rendering — it parses the report structure to extract failure rows, scores, and checklist items, then renders them as custom UI elements. This enables the "no passing checks" filter and color-coded score rendering.

### Anti-Patterns to Avoid

- **Inline validation in generation commands:** The validator must be a separate file invoked via Task — never add validation logic to knz-sessions.md or any generation command.
- **Stop-on-first-failure:** All checks run before reporting. Stopping early means the user has to run validate multiple times to discover all issues.
- **Generic failure messages:** Every Tier 1 failure must include stage + file + field + nature. "Some fields are missing" is not acceptable. The agent prompt must enforce the Failure Reporting Standard from the schema.
- **Modifying stage output:** The validator writes only to `08-validation/`. Any write to `01-outcomes/`, `02-assessments/`, `03-assessments/`, `03-modules/`, or `04-sessions/` is a violation.
- **Showing passing checks in conversation:** Passing checks go in `schema-report.md` only. Conversation output shows only failures. This is a user experience decision locked in CONTEXT.md.
- **Offering to fix failures:** The validator reports and stops. It must not offer to regenerate, patch, or correct any field. User drives fixes.
- **ValidationReport showing all checks:** Dashboard component shows only failures + scores. Passing checks are not rendered in the UI.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Validation check definitions | Custom check logic invented by the agent | Load `stage-09-validation.md` schema as prompt context | All 33 checks, all Tier 2 dimensions, all Tier 3 items are already precisely defined — the schema is the spec |
| Tier 2 scoring criteria | Agent inventing scoring rubrics | Load scoring guidance from stage-09-validation.md | Scoring bands (0.0–0.3 low, 0.4–0.6 moderate, 0.7–0.9 high) and per-dimension guidance are pre-specified |
| Agent invocation mechanism | Custom subprocess or API call | Claude Code Task tool (same as session-generator pattern) | Task tool is the established subagent invocation mechanism in this codebase |
| Dashboard file polling | Custom file watching logic | Existing `useWorkspacePoll` hook + `listStageFiles` | `08-validation/` is already entry 9 in STAGE_DIRS — new files there appear automatically in the polling cycle |
| Duration scaling logic | Re-implementing scaling in the agent | Schema's Duration Scaling section as prompt context | 90-min / half-day / multi-week rules are pre-specified — agent receives them as part of schema context |

**Key insight:** The entire validation specification already exists. This phase is an authoring and wiring problem, not a design problem. The agent author's job is to correctly encode the schema into agent instructions, not to invent validation logic.

## Common Pitfalls

### Pitfall 1: Agent Writes Stage Output Files

**What goes wrong:** The validation agent, in the process of describing what it found, accidentally uses a write tool on a stage output file — perhaps to "annotate" it or add a comment.

**Why it happens:** Agents following general helpful patterns may attempt to improve files they reference. The agent instructions must explicitly prohibit any writes outside `08-validation/`.

**How to avoid:** Include an explicit prohibition in the agent file: "You do not modify any file in any directory other than `08-validation/`. If you find a failure, you report it — you do not fix it."

**Warning signs:** Agent completion signal mentions files outside `08-validation/`.

### Pitfall 2: T1-07 Bloom Level Comparison Fails on Enum Ordering

**What goes wrong:** T1-07 requires `assessment.bloom_level >= objective.bloom_level`. The agent must know the ordering of the Bloom enum to compare levels. If the agent treats levels as strings, "Apply >= Understand" fails lexicographically.

**Why it happens:** Bloom's levels are stored as strings in stage output (e.g., "Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"). String comparison does not reflect the hierarchy.

**How to avoid:** The validation agent instructions must define the explicit ordering: Remember(1) < Understand(2) < Apply(3) < Analyze(4) < Evaluate(5) < Create(6). The check must map each level to its numeric equivalent before comparing.

**Warning signs:** T1-07 passes for assessments where the assessment Bloom level is clearly lower than the objective.

### Pitfall 3: T1-15 DAG Check Produces False Positives

**What goes wrong:** T1-15 checks that `module.prerequisite_modules` forms a valid DAG (no circular dependencies). The check is straightforward for well-formed data, but fails incorrectly if a module has no prerequisites (empty array) — some implementations incorrectly flag modules with no prerequisites.

**Why it happens:** A module with no prerequisites is valid and should pass. Only cycles are failures.

**How to avoid:** The T1-15 check should be: if any module's prerequisite_modules list is non-empty, trace the dependency chain for cycles. An empty prerequisites list is always valid.

### Pitfall 4: T1-17 Reflection Prompt Generic Pattern Matching Too Narrow

**What goes wrong:** T1-17 checks that `reflection_prompt` is not a generic phrase. The schema defines three prohibited patterns. An agent that only checks for exact matches of those three phrases will miss semantically identical prompts ("What were your main learnings?" passes a string-match check but is functionally the same as the prohibited "What were your takeaways?").

**Why it happens:** Agents check exact strings rather than applying the semantic principle.

**How to avoid:** The agent instructions must frame T1-17 as a semantic check: does the prompt name a specific concept, decision, or moment from this session's content? Could this prompt be copied verbatim to any other session in the program? If yes to the second question, it fails. The three prohibited patterns are examples, not an exhaustive list.

### Pitfall 5: ValidationReport Parses Empty 08-validation Directory

**What goes wrong:** The dashboard loads and ValidationReport tries to fetch `schema-report.md` before validation has been run. The fetch returns 404. The component renders an error state instead of a graceful "not yet run" message.

**Why it happens:** Standard fetch patterns don't distinguish between "file missing because not yet generated" and "file missing due to error."

**How to avoid:** The component should handle 404 as a valid "not yet run" state and render a neutral message: "Validation not yet run — complete Stage 5 and run /knz-validate." This is not an error.

### Pitfall 6: Auto-Trigger Fires Before File Verification in /knz-sessions

**What goes wrong:** The auto-trigger for validation runs before `/knz-sessions` has confirmed all session files exist, resulting in validation running against incomplete output.

**Why it happens:** Adding the auto-trigger in the wrong place in the /knz-sessions flow — before the File Verification section.

**How to avoid:** The auto-trigger must be added AFTER the Completion Summary block in `/knz-sessions`, only when the file verification succeeds. The existing verification gate ("If all files are verified → Proceed to Completion Summary") is the correct insertion point — trigger fires only on the success path.

### Pitfall 7: Stage 9 Status Set Before All Report Files Written

**What goes wrong:** The command marks Stage 9 `complete` before confirming the three report files (`schema-report.md`, `rubric-report.md`, `human-review-checklist.md`) exist in `08-validation/`.

**Why it happens:** The command trusts the agent's completion signal without verifying files on disk, mirroring the pattern in `/knz-sessions` File Verification section.

**How to avoid:** The command should verify the three report files exist after the Task completes before updating STATE.md Stage 9 status. Follow the exact verification pattern from `/knz-sessions`.

## Code Examples

### Failure Report Format (Tier 1)

Verified from stage-09-validation.md Failure Reporting Standard:

```markdown
## Tier 1 Validation Results

| Check ID | Field | Stage | File | Status | Message |
|----------|-------|-------|------|--------|---------|
| T1-16 | transfer_connection | stage-05 | 04-sessions/M-1-S-2/session.md | FAIL | MISSING — field not present |
| T1-17 | reflection_prompt | stage-05 | 04-sessions/M-1-S-1/session.md | FAIL | GENERIC PHRASE — "What were your takeaways?" matches prohibited pattern |
| T1-01 | bloom_level | stage-02 | 01-outcomes/learning-objectives.md | PASS | Valid enum value: Apply |
```

### Tier 2 Rubric Report Format

Verified from stage-09-validation.md Tier 2 schema:

```markdown
## Tier 2 Rubric Scores

| Dimension | Score | Evidence | Recommendation |
|-----------|-------|----------|----------------|
| transfer_realism | 0.72 | Transfer connections reference specific cash flow statement context from intake in 3 of 4 sessions | Session M-2-S-1 transfer connection is more generic — strengthen with specific decision scenario |
| social_learning_quality | 0.45 | Interdependence structures present but two modules use "peer discussion" without specifying accountability | Modules 2 and 3 need specific accountability mechanisms — e.g., named partner check-in by date |
```

### Human Review Checklist Format

Verified from stage-09-validation.md Tier 3 schema:

```markdown
## Human Review Checklist

- [ ] T3-06 — Module 2 belief_challenging_encounter: does it genuinely surface a common misconception for service-business owners about cash vs. profit? | Location: 03-modules/M-2/module-spec.md > belief_challenging_encounter | Review type: content_accuracy
  Does the encounter description name a specific belief that is commonly held and demonstrably wrong for this audience? Or is it a general "challenging scenario"?
```

### Conversation Output Pattern (plain language)

The conversation response from `/knz-validate`:

```
Validation complete.

Found 2 issues that need fixing before your curriculum is delivery-ready.

**Missing fields:**
- Session M-1-S-2: the transfer connection field is empty. Location: 04-sessions/M-1-S-2/session.md
- Session M-2-S-1: the reflection prompt is too generic — it could apply to any session. Location: 04-sessions/M-2-S-1/session.md

**Quality ratings:**
- Transfer realism: 7/10
- Social learning: 5/10 — two modules need stronger accountability structures
- Cognitive load: 8/10
- Scaffolding: 8/10
- Belief-challenging: 7/10

Fix the missing fields, then run /knz-validate again to recheck.
```

### ValidationReport Component Shell

Inferred from existing DeliverableSection.tsx and FileExpander.tsx patterns (HIGH confidence for structure, MEDIUM for exact implementation):

```typescript
// ValidationReport.tsx — structural sketch
import { useState, useEffect } from 'react'

interface ValidationReportProps {
  projectName: string
  isVisible: boolean  // true when selectedStage === 9 in App.tsx
}

export function ValidationReport({ projectName, isVisible }: ValidationReportProps) {
  const [schemaReport, setSchemaReport] = useState<string | null>(null)
  const [checklistReport, setChecklistReport] = useState<string | null>(null)
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!isVisible || fetched) return
    setFetched(true)
    // Fetch schema-report.md
    fetch(`/workspace/${projectName}/08-validation/schema-report.md`)
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setSchemaReport(text))
      .catch(() => setSchemaReport('not-found'))
    // Fetch human-review-checklist.md
    fetch(`/workspace/${projectName}/08-validation/human-review-checklist.md`)
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setChecklistReport(text))
      .catch(() => setChecklistReport('not-found'))
  }, [isVisible, projectName, fetched])

  if (!isVisible) return null
  if (schemaReport === null) return <div className="text-sm text-gray-400 p-4">Loading validation results...</div>
  if (schemaReport === 'not-found') return (
    <div className="text-sm text-gray-400 p-4">
      Validation not yet run. Complete Stage 5, then run /knz-validate.
    </div>
  )

  // Parse and render failures, scores, checklist items
  // ...
}
```

### App.tsx Integration Point

```typescript
// Add to App.tsx imports
import { ValidationReport } from '@/components/ValidationReport'

// Add below DeliverableSection in the right column
<ValidationReport
  projectName={projectName}
  isVisible={selectedStage === 9}
/>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Inline validation (generate + validate together) | Strict agent separation (separate file, separate call) | Established in this project from Phase 1 schema design | Validator cannot pass its own errors; separation is structurally enforced by the agent file boundary |
| Generic error messages | Field-level failure reporting with stage + file + field | Phase 1 schema definition | Users know exactly what to fix without hunting through output files |
| Pass/fail for qualitative dimensions | Confidence scores (0.0–1.0) with evidence | Phase 1 schema design decision (see STATE.md accumulated context) | Human judgment invited for qualitative dimensions; blocking reserved for structural gaps only |

## Open Questions

1. **How does the auto-trigger from /knz-sessions invoke the validation agent?**
   - What we know: Session-generator uses Task tool invocation. The schema says separate agent call.
   - What's unclear: Whether the auto-trigger should invoke the `knz-validate` command (which has its own STATE.md logic) or directly invoke the `knz-validator` agent.
   - Recommendation: Invoke the `/knz-validate` command via Skill invocation — same pattern as `/knz-sessions` calling the session-generator agent. This keeps the STATE.md update logic in one place and avoids duplicating prerequisite checks.

2. **How should ValidationReport handle re-runs (overwritten report files)?**
   - What we know: Each re-run overwrites previous reports. The `fetched` guard in the component prevents refetch.
   - What's unclear: Whether the polling hook should force a re-fetch of validation data when `08-validation/` files are updated.
   - Recommendation: The `fetched` guard should be reset when `projectName` changes, but not on every poll cycle. If the user wants to see updated validation results, they refresh the dashboard. This matches existing FileExpander behavior (content cached in local state, no refetch on re-expand).

3. **Does the Final Validation gate (PIPE-06) get set to `pending` or left for /knz-approve?**
   - What we know: `/knz-approve` handles the Final Validation gate. The gate currently has status `not-reached`.
   - What's unclear: Whether `/knz-validate` should set the gate to `pending` (triggering `/knz-approve` next) or leave gate management entirely to the user running `/knz-approve`.
   - Recommendation: `/knz-validate` sets the Final Validation gate to `pending` after writing reports — this mirrors the post-assessment gate pattern where the gate becomes pending after the stage completes. Then the user runs `/knz-approve` to review and approve.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | `knz-curriculum-dashboard/vitest.config.ts` |
| Quick run command | `cd knz-curriculum-dashboard && npm test` |
| Full suite command | `cd knz-curriculum-dashboard && npm test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VALD-01 | Tier 1 checks enumerate all required fields | unit (agent file) | Manual — agent file is markdown, not executable | N/A (markdown agent) |
| VALD-02 | Report blocks completion when required fields missing | unit (command behavior) | Manual — command files are markdown | N/A (markdown command) |
| VALD-03 | Tier 2 produces 0.0–1.0 scores per dimension | unit (agent file) | Manual — agent file is markdown | N/A (markdown agent) |
| VALD-04 | Tier 3 items include location + actionable description | unit (agent file) | Manual — agent file is markdown | N/A (markdown agent) |
| VALD-05 | Validation agent is invoked as separate Task | integration (knz-validate.md structure) | Manual — command files are markdown | N/A (markdown command) |
| VALD-06 | Failure messages include stage + file + field | unit (agent file) | Manual — agent file is markdown | N/A (markdown agent) |
| ValidationReport render | Component renders "not yet run" on 404 | unit | `cd knz-curriculum-dashboard && npm test -- ValidationReport` | ❌ Wave 0 |
| ValidationReport render | Component shows only failures (not passing checks) | unit | `cd knz-curriculum-dashboard && npm test -- ValidationReport` | ❌ Wave 0 |
| ValidationReport render | Component renders neutral state when no files | unit | `cd knz-curriculum-dashboard && npm test -- ValidationReport` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `cd knz-curriculum-dashboard && npm test`
- **Per wave merge:** `cd knz-curriculum-dashboard && npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `knz-curriculum-dashboard/src/components/ValidationReport.test.tsx` — covers VALD-05 (component isolation), null state, 404 state, failure-only render

*(Note: agent and command files are markdown and not executable — their correctness is validated by human review of the spec against the schema, not automated tests. Only the React component and any utility functions have automated test coverage.)*

## Sources

### Primary (HIGH confidence)
- `.claude/reference/schemas/stage-09-validation.md` — Complete Tier 1/2/3 check definitions, failure reporting standard, duration scaling rules, output file specifications
- `.claude/agents/session-generator.md` — Reference implementation for separate agent pattern
- `.claude/commands/knz-sessions.md` — Auto-trigger insertion point; established command structure
- `knz-curriculum-dashboard/src/components/DeliverableSection.tsx` — Peer component pattern for ValidationReport
- `knz-curriculum-dashboard/src/components/FileExpander.tsx` — Fetch-on-demand + caching pattern
- `knz-curriculum-dashboard/src/lib/workspace-loader.ts` — STAGE_DIRS already includes `08-validation/` as entry 9
- `knz-curriculum-dashboard/src/types/pipeline.ts` — Existing type contracts; no new types needed for validation

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` accumulated context — Tier 2 confidence score decision (0.0–1.0) recorded as Phase 1 decision
- `.planning/REQUIREMENTS.md` — VALD-01 through VALD-06 definitions and traceability
- `knz-curriculum-dashboard/vitest.config.ts` + `workspace-loader.test.ts` — Test infrastructure pattern for new component tests

### Tertiary (LOW confidence)
- None — all findings are from primary project source files

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all technology is already in use; no new libraries needed
- Architecture: HIGH — agent file pattern is directly replicable from session-generator.md; React component pattern is directly replicable from DeliverableSection/FileExpander; validation spec is complete in the schema
- Pitfalls: HIGH — pitfalls are derived from reading the actual schema constraints and existing code patterns, not generic warnings

**Research date:** 2026-03-21
**Valid until:** This research is valid until the codebase changes significantly. The schema file (stage-09-validation.md) is the authoritative spec — if it changes, re-read it before executing.
