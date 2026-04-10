# Phase 1: Schema and Foundation - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the architectural load-bearing elements: nine pipeline stage schemas with enumerated field values, workspace directory scaffold template, project-level CLAUDE.md with pipeline rules and constraint hierarchy, and STATE.md template for session bridging. No commands, no agents, no dashboard — just the structural definitions that every subsequent phase builds on.

</domain>

<decisions>
## Implementation Decisions

### Schema format and location
- Markdown spec files (`.md`), one per pipeline stage
- Located in `.claude/reference/schemas/` — Claude Code auto-loads reference files as context
- Files named: `stage-01-intake.md` through `stage-09-validation.md`
- Field specifications drawn directly from research design brief (`12-tool-design-recommendations.md`)
- All enumerated values are explicit enums in the schema, not free-text strings

### Schema enforcement mechanism
- Schema-in-prompt: commands/agents include the relevant schema as generation context
- Prompt instructs: "Generate output matching this schema. All required fields must be present. Enum fields must use exact values."
- No runtime validation at write time in Phase 1
- Post-hoc validation by separate validation agent deferred to Phase 6

### Workspace directory structure
- Curriculum projects live in `workspace/` at plugin root (e.g., `workspace/my-training/`)
- Stage-numbered directories: `00-project-brief/`, `01-outcomes/`, `02-assessments/`, `03-modules/`, `04-sessions/`, `05-metaskills/`, `06-transfer/`, `07-marketing/`, `08-validation/`
- Separate `delivery/` directory for formatted HTML output (markdown is source of truth in stage dirs)
- Scaffold creates directories + `STATE.md` + `CLAUDE.md` only — no placeholder files, no template stubs
- Each command creates its output files when it runs

### STATE.md design
- Stage-level tracking: which stages are complete/in-progress/not-started, current stage, last activity date
- Key Decisions section captures 5-8 most impactful intake answers (duration, audience, expertise level, skill type, self-direction, transfer context, cultural orientation)
- Session Continuity section: last session date, stopped-at description, next action, resume command
- Explicit Review Gates table with status field (Approved/Pending/Not reached) and approval date
- Commands read STATE.md to know pipeline position; session-start hook surfaces continuity info on resume

### CLAUDE.md scope
- Static template — identical for every curriculum project, not customized per intake
- Intake-specific context lives in STATE.md Key Decisions section
- Pipeline rules + constraint hierarchy as primary content
- Constraint hierarchy stated: schema > template > checklist > directive > naming > framing
- Backward design sequence stated as a rule, not a suggestion
- Pedagogical principles in 2-3 sentences each (TMA, DCR, transfer, social learning) — the "why"
- Schema files have the field-level details — the "what"
- References plugin schemas in `.claude/reference/schemas/` (no copies in workspace)
- Explicit "Never" section with 5-8 hard prohibitions for commonly skipped elements (transfer_connection, generic reflection prompts, social learning without interdependence, schema-less generation, gate skipping, future-stage writes)
- Silent state updates rule included (INFR-10: never announce "updating STATE.md")
- Must stay under 300 lines per success criteria

### Claude's Discretion
- Exact schema file internal structure and formatting conventions
- How to organize long enum lists within schema files
- STATE.md section ordering and markdown formatting
- CLAUDE.md line-budget allocation across sections (within 300-line cap)
- Whether `04-sessions/` is a separate top-level dir or nested under `03-modules/` (research shows both patterns)

</decisions>

<specifics>
## Specific Ideas

- Brand Compass plugin (`knz-brand-guidance/`) as structural reference for plugin architecture — `.claude/` directory layout, reference files, agent patterns, workspace approach
- Research design brief (`12-tool-design-recommendations.md`) has detailed field specs per stage — use directly as schema source
- Stage 4 session's 8 required fields (prior_knowledge_activation, learning_objectives, content_chunks, formative_check, guided_practice, independent_practice, reflection_prompt, transfer_connection) plus social learning 4 sub-fields are the most complex schema
- "The tool handles the scaffold, the human handles the soul" — CLAUDE.md should embody this

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing source code — greenfield project. Only CLAUDE.md exists at project root.

### Established Patterns
- Brand Compass plugin demonstrates: `.claude/reference/` for schema-like files, `.claude/commands/` for pipeline commands, `.claude/agents/` for subagents, `workspace/` for project output
- Plugin already has `.claude/agents/security-scanner.md` and `.claude/agents/secrets-env-auditor.md` (knzinit scaffolding)
- Plugin already has `.claude/commands/sanity-check.md`

### Integration Points
- `.claude/reference/schemas/` — new directory for schema files (auto-loaded by Claude Code)
- `workspace/` — new directory for curriculum project output
- Plugin CLAUDE.md at root will need to reference the schema location for developer context

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-schema-and-foundation*
*Context gathered: 2026-03-15*
