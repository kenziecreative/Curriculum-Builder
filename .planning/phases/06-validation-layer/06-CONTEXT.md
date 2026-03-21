# Phase 6: Validation Layer - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a dedicated `/knz-validate` command and separate validation agent that evaluates a curriculum package (Stages 1-5 complete), produces a schema-report with field-level failure details, blocks pipeline completion when required fields are missing (Tier 1), scores qualitative dimensions with confidence scores (Tier 2), and surfaces actionable human review items (Tier 3). Also add a ValidationReport dashboard component to the React dashboard. Generation and validation are strictly separate agent calls.

</domain>

<decisions>
## Implementation Decisions

### Invocation model
- Runnable once Stage 5 is complete — does not require Stages 6-8 to exist
- Auto-triggered via Skill invocation at the end of `/knz-sessions` (after all files written, Stage 5 marked complete) — same pattern as discuss-phase auto-advancing to plan-phase
- Can also be run standalone at any time after Stage 5 is complete — supports iterative fix-and-recheck loop
- Each re-run overwrites previous `schema-report.md` and `human-review-checklist.md`

### User-facing output format
- Plain language summary first: headline status ("Your curriculum passed all required checks" or "Found 3 issues that need fixing"), then details below
- No inline coaching explaining what Tier 1/2/3 means — plain language framing makes it self-evident
- Conversation shows: pass/fail headline, count summary, then ONLY the failed checks inline
- Passing checks are in `schema-report.md` but not shown in conversation — keeps response actionable
- Report and stop — validation is read-only; user drives any fixes

### Failure behavior
- Run all checks before reporting — full pass in one invocation, not stop-on-first-failure
- No inline "how to fix" guidance — exact field locations and failure messages are sufficient
- No offer to regenerate failing sections — separation rule; validator never touches output files

### Scope in Phase 6
- Tier 1 checks T1-01 through T1-18 only (Stages 2-5 checks)
- T1-19 through T1-33 (Stage 6/7/8 checks) listed as "Not applicable — Stage N not yet generated" in report
- When Phase 7 generates those stages, the same validation agent picks them up automatically on next run
- Tier 2 rubric scoring follows duration scaling from schema: skip for 90-min programs, run all 5 dimensions for half-day+
- Tier 3 human review items: run applicable checks for what exists (transfer-specific checks skipped until Stage 7 exists)

### Data access
- Validation agent reads workspace stage directories directly: `01-intake/`, `02-outcomes/`, `03-assessments/`, `03-modules/`, `04-sessions/`
- Same paths generation commands write to — no intermediate manifest needed
- Read STATE.md to confirm which stages are complete before scoping the run

### Dashboard integration
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.claude/reference/schemas/stage-09-validation.md` — Complete validation schema: all 33 Tier 1 checks defined, Tier 2 dimensions with scoring guidance, Tier 3 required checks, failure reporting standard, duration scaling rules, output file specs
- `.claude/agents/session-generator.md` — Established separate-agent pattern; validation agent follows same structure (separate file, read-only access, invoked via Skill or Agent tool)
- `.claude/commands/knz-sessions.md` — Entry point for Skill invocation trigger; validation auto-fires from here after Stage 5 complete
- `knz-curriculum-dashboard/src/components/` — Existing: StatusBadge, StageRow, GateRow, PipelineStepper, FileExpander, DeliverableSection — ValidationReport is a new peer component
- `knz-curriculum-dashboard/src/lib/workspace-loader.ts` — STAGE_DIRS export maps stage numbers to directories; ValidationReport reads from `STAGE_DIRS[9]` = `08-validation/`

### Established Patterns
- Schema-in-prompt enforcement: validation agent must receive stage-09-validation.md schema as context
- Separate agent call rule (from schema): validation agent is a separate file, invoked as a new call — never inline with generation
- Silent STATE.md updates (INFR-10): never announce state changes
- Plain language output: no ID vocabulary, no tier jargon in conversation — "required checks" not "Tier 1 schema validation"
- AskUserQuestion gate pattern exists if needed (not used for validation output — read-only reporting)
- FileExpander component: caches content in local state, no refetch on re-expand — reuse for checklist display
- Dashboard auto-refresh polling: existing `useWorkspacePolling` hook picks up new files in `08-validation/` automatically

### Integration Points
- `workspace/{project-name}/08-validation/` — New output directory; validation agent writes `schema-report.md`, `rubric-report.md`, `human-review-checklist.md`
- `workspace/{project-name}/STATE.md` — Validation reads stage completion status; writes Stage 9 status after run
- `.claude/agents/knz-validator.md` — New validation agent file (read-only, separate from all generation agents)
- `.claude/commands/knz-validate.md` — New command file (orchestrates the validation agent call)
- `knz-curriculum-dashboard/src/components/ValidationReport.tsx` — New dashboard component
- `knz-curriculum-dashboard/src/App.tsx` — Wiring point: ValidationReport added alongside existing DeliverableSection

</code_context>

<specifics>
## Specific Ideas

- Auto-trigger from `/knz-sessions` via Skill invocation (same mechanism as GSD discuss→plan auto-advance chain) — preserves agent separation while removing manual step
- Plain language framing throughout: never say "Tier 1 validation" to user — say "required field checks" or "structural checks." Never say "confidence score" — say something like "quality rating" or just show the numeric score with a label
- The conversation output pattern: clean headline → failure list (if any) → next step. Not a wall of text.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-validation-layer*
*Context gathered: 2026-03-21*
