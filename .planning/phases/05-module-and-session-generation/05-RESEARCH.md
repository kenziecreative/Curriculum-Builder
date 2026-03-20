# Phase 5: Module and Session Generation - Research

**Researched:** 2026-03-20
**Domain:** Claude Code plugin command authoring — markdown command files, subagent orchestration, schema-in-prompt enforcement, parallel generation via Task agents
**Confidence:** HIGH (all findings grounded in existing codebase patterns and schema files already present)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**`/knz-modules` generation UX:**
- Infer and review pattern — same as `/knz-outcomes` and `/knz-assessments`: command reads intake + outcomes + assessments, generates the full module structure silently, then presents for review. No structuring questions before generating.
- On approval: write all module spec files simultaneously (not progressively). Generate-first, write-on-approval matches established pattern.
- If user flags an issue: free-text description → full regeneration (not targeted patching). Consistent with `/knz-assessments` "flag an issue" behavior.
- Start over option uses destructive confirmation nested AskUserQuestion (established in Phase 3).

**Module review gate summary view:**
- Gate shows a compact summary table: module name | objectives covered | sessions planned | primary metaskill | belief being challenged.
- Sequence rationale in 1-2 sentences above the table.
- Belief-challenging encounter is the right field to surface at the gate (not social learning type).
- Social learning type visible in the written module-spec.md files but not in the gate summary.
- Gate options: approve / flag an issue / start over — consistent with Phase 3 pattern.
- After approval: brief confirmation line, STATE.md updated silently, Stage 4 marked complete, next step shown ("Next: /knz-sessions").

**Session generation trigger:**
- Separate command invocation — user runs `/knz-sessions` explicitly after `/knz-modules` completes. No auto-chaining.
- `/knz-sessions` generates all sessions for all modules in one invocation. No per-module triggering. Subagents handle each module's sessions in parallel.
- Progress visibility: per-module completion updates as subagents finish ("Module 1 sessions done — 2 remaining").
- No review gate at session completion — module structure was already approved. Write all session files automatically when subagents complete, then show a brief completion summary.
- Completion summary: list of all sessions generated per module, total session count, STATE.md updated, next step shown.

**Materials file layout:**
- Per-session directory structure: `04-sessions/M-1-S-1/` contains `session.md`, `facilitator-guide.md`, `participant-materials.md`, `slide-outline.md`.
- `session.md` is the full TMA arc spec (all 8 required fields + DCR elements + header fields).
- `facilitator-guide.md`, `participant-materials.md`, `slide-outline.md` are derived extractions formatted for actual use — not raw schema output.
- Module specs stay in `03-modules/` (sequence-rationale.md + per-module module-spec.md). Stage boundary maintained.

### Claude's Discretion

- Exact subagent implementation pattern for spawning per-module workers (Task agents vs. Agent tool)
- How `/knz-sessions` distributes work: one subagent per module, or one per session
- Facilitator guide formatting within facilitator-guide.md (how timing cues are presented, etc.)
- Slide outline formatting within slide-outline.md
- Pre-work content in participant-materials.md when pre-work is "none"
- Error handling if a subagent fails mid-generation

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MODS-01 | Modules are decomposed from outcomes and assessments — not from topic lists | Generation prompt must read 01-outcomes/learning-objectives.md and 02-assessments/ as primary inputs; schema validation rules 3 and 5 enforce this |
| MODS-02 | Module sequencing respects prerequisite dependencies between objectives | stage-04-modules.md `prerequisite_modules` DAG constraint; sequence-rationale.md format enforces justification |
| MODS-03 | Session template is automatically selected per module based on intake data | Template selection logic from stage-05-sessions.md `session_template` enum; keyed on `skill_type`, `self_direction_level`, bloom level from intake |
| MODS-04 | Module count and session distribution scale with program duration | Duration scaling tables in both stage-04-modules.md and stage-05-sessions.md; keyed on `contact_hours` from intake |
| SESS-01 | Each session follows the TMA content arc (all 8 phases required) | stage-05-sessions.md defines all 8 required fields; constraint enforcement must flag any missing arc stage before files are written |
| SESS-02 | DCR analytical method applied within sessions with scaffolding for novice audiences | stage-05-sessions.md DCR Integration Fields; conditional on `skill_type == open` AND `bloom_level >= Analyze`; novice scaffolding rule (close comparisons first) |
| SESS-03 | Social learning layer required per module with all four sub-fields | stage-04-modules.md `social_learning` object; all 4 sub-fields required; `group_processing_prompt` must be content-specific |
| SESS-04 | Facilitator guides include timing cues, facilitation notes, common stumbling points, and transition guidance | `facilitator_notes` object in stage-05-sessions.md with 3 required sub-fields; extracted into `facilitator-guide.md` per session |
| SESS-05 | Participant-facing materials generated: pre-work, handouts, activity worksheets | `participant_materials` object in stage-05-sessions.md; extracted into `participant-materials.md` |
| SESS-06 | Presentation/slide framework outlines generated (structural, not visual design) | `slide_framework_outline` array in stage-05-sessions.md; extracted into `slide-outline.md` |
| SESS-07 | Parallel module generation via subagents | `/knz-sessions` spawns one Task subagent per module; each subagent generates all sessions for that module; main command waits and collects results |
| INFR-08 | Subagent orchestration for parallel module generation | Task tool pattern: main command describes work per module, spawns parallel Task calls, collects results when all complete |
| INFR-09 | Subagent chaining enables autonomous middle stages (4-8) without manual intervention | Stage 4 (modules) approved by user → Stage 5 (sessions) runs autonomously → no review gate; chain through STATE.md stage status checks |
</phase_requirements>

---

## Summary

Phase 5 builds two new command files — `.claude/commands/knz-modules.md` and `.claude/commands/knz-sessions.md` — plus a new subagent file in `.claude/agents/`. Everything is markdown authored for Claude to read and execute. No TypeScript, no compiled code. The patterns to follow are already present in the codebase: `knz-outcomes.md` and `knz-assessments.md` are the canonical templates for the infer-and-review pattern. The schemas are fully specified and already exist at `.claude/reference/schemas/stage-04-modules.md` and `stage-05-sessions.md`.

The primary technical challenge in this phase is the parallel session generation architecture (INFR-08/SESS-07). Claude Code's `Task` tool allows the main command to spawn parallel subagent invocations, each operating in their own context window, writing their own files. This prevents the main context from accumulating all session content across a multi-module program — the exact context collapse risk called out in the phase goal. The subagent file in `.claude/agents/` defines the session-generation worker that each Task invocation will run.

The secondary challenge is schema enforcement at generation time. Both commands must load the relevant schema as generation context (established pattern from knz-outcomes and knz-assessments), run internal constraint checks before surfacing output, and write files that satisfy all required fields. The session schema is the most complex in the pipeline: 8 required TMA arc fields, 3 facilitator_notes sub-fields, 3 participant_materials sub-fields, a slide_framework_outline array, and conditional DCR fields. The subagent generating sessions must receive the full stage-05-sessions.md schema to work from.

**Primary recommendation:** Author `knz-modules.md` exactly following the knz-assessments.md pattern (infer-and-review, AskUserQuestion gate, write on approval). Then author `knz-sessions.md` as an orchestrator that spawns parallel Task subagents — one per module — and collects results. Create a session-generator subagent file that receives module spec, outcomes, intake data, and the full schema as context.

---

## Standard Stack

### Core
| Component | Location | Purpose | Why Standard |
|-----------|----------|---------|--------------|
| Command markdown files | `.claude/commands/knz-modules.md`, `knz-sessions.md` | Claude reads and executes these as slash commands | Established pattern; all existing pipeline stages use this approach |
| Schema reference files | `.claude/reference/schemas/stage-04-modules.md`, `stage-05-sessions.md` | Schema-in-prompt enforcement — loaded before generation | Already exists and complete; must be loaded as generation context |
| Subagent markdown file | `.claude/agents/session-generator.md` (new) | Session-generation worker; receives module context, generates sessions | Task tool requires a describable agent; agent file captures the worker contract |
| AskUserQuestion tool | Built-in Claude Code tool | All categorical decisions and gates | INFR-06 requirement; used in knz-outcomes and knz-assessments |
| Task tool | Built-in Claude Code tool | Spawn parallel subagents | Mechanism for INFR-08/SESS-07 parallel generation |
| workspace STATE.md | Per-project file | Stage status checks and writes | INFR-01; all commands read/write this |

### Supporting
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| Doctrine file | `.claude/reference/doctrine-how-i-teach-how-i-learn.md` | Session-generator subagent should load this to correctly apply TMA/DCR/metaskill doctrine |
| Existing outcomes files | `workspace/*/01-outcomes/learning-objectives.md` | Input to module generation; provides all outcome_ids and bloom levels |
| Existing assessment files | `workspace/*/02-assessments/` (all 3 files) | Input to module generation; confirms coverage and identifies gaps to structure |
| Project brief | `workspace/*/00-project-brief/project-brief.md` | Source of `contact_hours`, `skill_type`, `self_direction_level`, `modality`, `transfer_context` |

### No Alternatives Needed

This phase does not introduce new external libraries. Everything builds on existing plugin infrastructure.

---

## Architecture Patterns

### Recommended File Structure (what this phase creates)

```
.claude/
├── commands/
│   ├── knz-modules.md          # NEW — Module generation command
│   └── knz-sessions.md         # NEW — Session generation orchestrator
└── agents/
    └── session-generator.md    # NEW — Per-module session generation worker

workspace/{project-name}/
├── 03-modules/                 # Created by /knz-modules on approval
│   ├── sequence-rationale.md
│   ├── M-1/
│   │   └── module-spec.md
│   └── M-2/
│       └── module-spec.md
└── 04-sessions/                # Created by /knz-sessions on completion
    ├── M-1-S-1/
    │   ├── session.md
    │   ├── facilitator-guide.md
    │   ├── participant-materials.md
    │   └── slide-outline.md
    └── M-2-S-1/
        ├── session.md
        ├── facilitator-guide.md
        ├── participant-materials.md
        └── slide-outline.md
```

### Pattern 1: Infer-and-Review (knz-modules.md)

**What:** Command reads all upstream files, generates silently, shows compact review view, gates with AskUserQuestion. Identical behavioral contract to knz-outcomes.md and knz-assessments.md.

**When to use:** Any generation stage that needs human confirmation before writing files. This is the standard for /knz-modules because module structure is the sequencing scaffold everything else depends on.

**Key sections (mirroring knz-assessments.md structure):**

```
1. Prerequisites (check workspace, check Stage 3 complete, check Stage 4 status)
2. Persona (expert instructional designer voice, no ID vocabulary)
3. Generation (load schema, read upstream files, generate silently)
4. Constraint Enforcement (runs before any output shown)
5. Output Presentation (gate summary table, sequence rationale)
6. Review Gate (AskUserQuestion: approve / flag an issue / start over)
7. On Approval (write 03-modules/ files, update STATE.md, forward message)
8. State Management Rules (silent, never announce)
9. Schema Compliance Checklist
```

**Example constraint enforcement sequence for /knz-modules:**

```
Step 1 — DAG validation: verify prerequisite_modules forms no circular dependency
Step 2 — Learning objectives coverage: every MO-* outcome_id must appear in at least one module
Step 3 — Social learning completeness: all 4 sub-fields present in every module
Step 4 — Thinking routine specificity: metaskill_activation_activity is a named routine, not a generic label
Step 5 — Belief encounter specificity: belief_challenging_encounter names a specific belief being challenged
Step 6 — Record changes
```

### Pattern 2: Orchestrator-with-Subagents (knz-sessions.md)

**What:** Main command reads module specs, spawns one Task subagent per module in parallel, displays per-module progress updates as each completes, writes all files automatically (no review gate), shows completion summary.

**When to use:** SESS-07 / INFR-08 — multi-module programs where sequential generation would accumulate session content in the main context window and risk collapse.

**Orchestrator command structure:**

```
1. Prerequisites (check workspace, check Stage 4 complete)
2. Read all module specs from 03-modules/
3. For each module: spawn a Task subagent with module-specific context
4. Display progress updates as subagents complete
5. On all complete: show completion summary, update STATE.md
```

**Task invocation contract (what each Task receives):**
- The session-generator agent file description
- The specific module-spec.md content
- The full intake data (contact_hours, skill_type, self_direction_level, transfer_context, modality)
- The full learning-objectives.md (for outcome_id cross-referencing)
- The full stage-05-sessions.md schema as generation context
- The output directory path for this module's sessions

**Example orchestrator dispatch:**

```
For module M-1: spawn Task with [module-spec, intake, outcomes, schema, output path M-1]
For module M-2: spawn Task with [module-spec, intake, outcomes, schema, output path M-2]
(spawned in parallel — do not await M-1 before dispatching M-2)
As each completes: "Module 1 sessions written — 1 remaining"
```

### Pattern 3: Session Generator Subagent (session-generator.md)

**What:** A focused agent file describing the session content generation worker. Receives context from the orchestrator, generates all sessions for one module, writes four files per session.

**What the subagent must do:**
1. Load stage-05-sessions.md schema as generation context
2. Determine session_template for each session based on intake data
3. Generate all 8 TMA arc fields for every session (no exceptions)
4. Apply DCR fields when `skill_type == open` AND session bloom level >= Analyze
5. Apply DCR novice scaffolding when `self_direction_level` is Stage 1-2
6. Generate facilitator_notes, participant_materials, slide_framework_outline for every session
7. Write session.md (full schema), facilitator-guide.md (extraction), participant-materials.md (extraction), slide-outline.md (extraction) to correct path

**Derived file extraction rules:**
- `facilitator-guide.md` = `facilitator_notes` fields reformatted with timing cues as a table (TIME | ACTIVITY | FACILITATOR ACTION), common stumbling points as a numbered list, transition notes inline
- `participant-materials.md` = `pre_work` section + handouts list + activity worksheets. If `pre_work == "none"`, section header still appears with "No pre-work required for this session."
- `slide-outline.md` = `slide_framework_outline` array reformatted as a section-per-entry table: SECTION | TMA PHASE | SLIDES | PURPOSE

### Pattern 4: Session Template Selection Logic

**What:** Auto-select the `session_template` enum value per session based on intake signals. This is the mechanism for MODS-03.

**Selection algorithm (precedence order):**

| Condition | Template |
|-----------|----------|
| `skill_type == closed` AND bloom <= Apply | `gagne` |
| `skill_type == open` AND session is exploration-first | `5e_7e` |
| `skill_type == open` AND bloom >= Analyze AND problem-centered | `merrill` |
| Delivery context is professional development / coaching | `wippea` |
| All other cases | `universal_tma_arc` |

**Key signal:** `self_direction_level` from intake is the primary audience expertise signal. Stage 1-2 (dependent/interested) → prefer `gagne` or `universal_tma_arc` for structural clarity. Stage 3-4 (involved/self-directed) → `merrill` or `5e_7e` appropriate.

### Anti-Patterns to Avoid

- **Generating session content in the main /knz-sessions context:** The entire point of subagents is context isolation. The main command must not expand to hold full session content for more than the current module being reported. Each module's sessions must live entirely in a worker context.
- **Progressive file writing in /knz-modules:** The knz-outcomes pattern writes all files simultaneously on approval. Do not write module files one at a time as they generate — generate all, gate, write all.
- **Generic group_processing_prompts in social_learning:** The schema explicitly prohibits "What went well?" and similar generic prompts. Constraint enforcement must check that prompts name the specific content of the activity.
- **Skipping DCR when conditions are met:** DCR is not optional when `skill_type == open` AND bloom >= Analyze. Subagent must check these conditions and include DCR fields — not a best-effort add.
- **Using ID vocabulary in user-facing output:** Maintain persona. "module" not "M-1", "session" not "session_id", "complexity level" not "Bloom's level". Gate summary table uses learner-facing language.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema field validation | Custom field-checking logic per command | Schema-in-prompt: load schema file before generating, run internal checklist | Already proven to work in knz-outcomes and knz-assessments. Duplicating validation logic per command creates drift |
| Parallel execution | Sequential session generation loop in the main command | Task tool spawning per-module workers | Task tool is the Claude Code mechanism for parallel subagents; context isolation is the point |
| Prerequisite module ordering | Custom topological sort algorithm | LLM judgment over `prerequisite_modules` DAG (constraint enforcement verifies no cycles) | Claude can correctly sequence modules from outcomes/assessments context; cycle check catches errors |
| Session template selection | Complex scoring/weighting algorithm | Precedence-ordered lookup table in subagent instructions | The 5-template enum has clear use-case guidance in the schema; simple precedence logic is sufficient and auditable |
| Progress tracking UI | Complex status tracking | Per-module completion lines printed as each Task returns | User just needs "Module N done — X remaining" — not a live spinner or dashboard update |

---

## Common Pitfalls

### Pitfall 1: Social Learning Specificity Failure

**What goes wrong:** The `group_processing_prompt` in social_learning is generated as a generic debrief question ("What went well?") instead of a content-specific prompt.

**Why it happens:** LLM defaults to generic facilitation language. The schema constraint is easy to overlook when generating many modules at once.

**How to avoid:** Constraint enforcement Step 4 in /knz-modules must explicitly check the group_processing_prompt against a pattern: does it name a specific concept from the module content? If not, regenerate that field. This check must run before output is displayed.

**Warning signs:** Prompts that could apply to any module in any program ("How did your group work together?" "What would you do differently?")

### Pitfall 2: Reflection Prompt Genericness

**What goes wrong:** The session schema prohibits "What did you learn today?", "What went well?", "What were your takeaways?" — but subagents often default to exactly these.

**Why it happens:** These are the most common reflection patterns in training data. The prohibition must be stated explicitly in the subagent's instructions with examples of what specific looks like.

**How to avoid:** Session generator subagent must include the exact prohibited stems and replacement guidance. Example format: "Prompt must name the specific skill/decision/moment from this session. Bad: 'What would you do differently?' Good: 'Looking at the cash flow scenario we worked through — what signal did you almost miss, and what would that have cost you?'"

**Warning signs:** A reflection prompt that could be copied verbatim into any other session in the program.

### Pitfall 3: DCR Conditional Omission

**What goes wrong:** Sessions that meet the DCR trigger conditions (`skill_type == open` AND bloom >= Analyze) are generated without DCR fields because the subagent doesn't check conditions.

**Why it happens:** DCR is an advanced schema section; subagents generating sessions may focus on the 8 required TMA fields and skip conditional sections.

**How to avoid:** Subagent instructions must include an explicit DCR trigger check as a numbered step: "Before generating each session, check: is skill_type == open? Is the session's primary bloom_level Analyze or above? If both true, DCR fields are required — not optional."

**Warning signs:** Sessions with Analyze/Evaluate/Create bloom levels for open skill programs that have no DCR elements.

### Pitfall 4: Context Accumulation in the Main Orchestrator

**What goes wrong:** The /knz-sessions command generates session content for all modules sequentially in its own context rather than delegating to workers, defeating the purpose of INFR-08.

**Why it happens:** Sequential generation is the default behavior pattern. Parallel Task invocation requires explicit architectural intent in the command.

**How to avoid:** /knz-sessions command must explicitly state the subagent dispatch pattern: "Do not generate session content in this context. For each module, spawn a Task with [context]. Wait for all Tasks to complete. Report progress as each returns."

**Warning signs:** If the completion time for a 4-module program is roughly 4x a 1-module program — that's sequential, not parallel.

### Pitfall 5: Module Gate Summary Exposes Schema Fields

**What goes wrong:** The review gate table shows `M-1`, `bloom_level: Analyze`, `metaskill_activation_activity: See-Think-Wonder` — exposing schema field names and IDs to the user.

**Why it happens:** Command text references schema field names in the display format without translating to user-facing language.

**How to avoid:** Gate summary table columns are: module name (not module_id) | objectives covered (count, not IDs) | sessions planned (count) | primary metaskill (plain name) | what this module challenges (paraphrase of belief_challenging_encounter). Gate table format must be specified in the command with plain-language column headers.

**Warning signs:** Any column header in the gate table that matches a schema field name.

### Pitfall 6: Subagent Failure Leaves Partial State

**What goes wrong:** One subagent fails mid-generation, leaving some modules with session files and others without. STATE.md is updated to Stage 5 complete, but sessions are missing.

**Why it happens:** Orchestrator marks completion before verifying all workers succeeded.

**How to avoid:** Orchestrator must verify file count after all Tasks complete. For each module, verify the expected files exist (session.md, facilitator-guide.md, participant-materials.md, slide-outline.md × expected session count). If any are missing, report which module failed rather than marking Stage 5 complete.

---

## Code Examples

### /knz-modules Prerequisites Section (derived from knz-assessments.md pattern)

```markdown
## Prerequisites

### 1. Check workspace exists
Read `workspace/*/STATE.md` to locate the active project. If no STATE.md is found, respond:
> It looks like you haven't set up a project workspace yet. Run `/knz-init` first to get started.
Stop here.

### 2. Check Stage 3 prerequisite
Read the Stage 3 row from STATE.md `Stage Progress` table. If Stage 3 status is not `complete`, respond:
> Module structure starts after assessments are finalized and approved. Run `/knz-assessments` first.
Stop here.

### 3. Check Stage 4 status
- `not-started` — proceed to Generation section
- `in-progress` — check whether `workspace/*/03-modules/` files exist; if yes, re-display gate summary and proceed to Review Gate; if no files, regenerate from scratch
- `complete` — respond: "Module structure is complete. Run `/knz-sessions` to generate session content."
  Stop here.
```

### /knz-sessions Subagent Dispatch Pattern

```markdown
## Session Generation

Read all module specs from `workspace/{project-name}/03-modules/`. Count modules.

For each module M-N:
  Spawn a Task subagent with the following context:
  - The full content of `03-modules/M-N/module-spec.md`
  - The full content of `01-outcomes/learning-objectives.md`
  - The full content of `00-project-brief/project-brief.md`
  - The full content of `.claude/reference/schemas/stage-05-sessions.md`
  - Output target: `04-sessions/M-N-S-*/`
  - Task: Generate all sessions for this module per the schema

Do not await each Task before spawning the next. Dispatch all Tasks simultaneously.

As each Task completes and returns, print:
> Module [module_name] sessions written — [N] remaining.

When all Tasks complete:
  Verify expected files exist for every session
  If any missing: [error handling — see Error Handling section]
  If all present: show completion summary, update STATE.md
```

### Module Gate Summary Table Format

```markdown
## Your Module Structure

[1-2 sentence sequence rationale in plain language]

| Module | Objectives Covered | Sessions Planned | Primary Metaskill | What This Module Challenges |
|--------|--------------------|------------------|-------------------|-----------------------------|
| [module_name] | [N objectives] | [N sessions] | [metaskill name] | [paraphrase of belief_challenging_encounter] |

Does this structure look right for your program?
```

### Social Learning Constraint Check (inline enforcement logic)

```markdown
**Step 3 — Social learning completeness check:**

For each module, verify social_learning has all 4 sub-fields:
- activity_type (exact enum value: individual | paired | small-group | full-cohort)
- interdependence_structure (describes the mechanism, not just names it)
- accountability_mechanism (specific to individual within group)
- group_processing_prompt (must name a specific concept from this module's content — does NOT use "What went well?", "What would you do differently?", "How did your group work together?")

If group_processing_prompt is generic: regenerate it with explicit instruction to name the [module topic] concept from the activity.
```

### Session Template Selection (for session-generator subagent)

```markdown
**Select session_template for each session:**

Read from intake:
- skill_type (open / closed)
- self_direction_level (Stage 1-4)
- session's primary bloom_level

Apply in order:
1. If skill_type == closed AND bloom_level in [Remember, Understand, Apply]: use `gagne`
2. If session is structured around a problem to solve AND bloom_level >= Apply: use `merrill`
3. If session opens with learner investigation before direct instruction: use `5e_7e`
4. If program context is professional development / coaching: use `wippea`
5. Default: use `universal_tma_arc`

Note: For Stage 1-2 learners (dependent/interested), prefer gagne or universal_tma_arc for structural clarity. Avoid 5e_7e for novices — inquiry-first requires sufficient prior knowledge to inquire productively.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sequential module generation (all content in main context) | Parallel Task subagents per module | Phase 5 design | Prevents context collapse on multi-module programs; each module's session content lives in an isolated worker context |
| Single output file per stage | Per-session directories with 4 derived files | Phase 5 design | Separates raw schema (session.md) from formatted delivery files; facilitator sees facilitator-guide.md, not raw schema output |
| Review gate on every stage | Gate at module structure, auto-write on session completion | Phase 5 design | Module structure reviewed because it determines everything downstream; sessions auto-write because module was already approved |

---

## Open Questions

1. **One subagent per module vs. one per session**
   - What we know: CONTEXT.md marks this as Claude's Discretion
   - What's unclear: At scale (10+ module program), one-per-session could spawn 20-30 parallel Tasks; Claude Code Task limits are not publicly documented
   - Recommendation: Default to one subagent per module. Each module worker generates all its sessions sequentially within its own context. This keeps Task count equal to module count and is simpler to error-handle. Revisit if large programs show slow generation.

2. **Error handling when a subagent fails**
   - What we know: CONTEXT.md marks this as Claude's Discretion
   - What's unclear: Claude Code Task failures surface differently depending on the failure mode (context exceeded, generation error, file write error)
   - Recommendation: Orchestrator verifies file existence after all Tasks complete. Report missing files by module name ("Sessions for 'Cash Flow Fundamentals' could not be written — try running /knz-sessions again"). Do not mark Stage 5 complete until all files verified.

3. **Pre-work in participant-materials.md when pre_work == "none"**
   - What we know: CONTEXT.md marks this as Claude's Discretion
   - What's unclear: Whether an empty section reads as confusing vs. clear
   - Recommendation: Include the section header with "No pre-work required for this session." Absence of the section entirely would be more confusing in a template-structured document.

---

## Validation Architecture

nyquist_validation is enabled in `.planning/config.json`. Phase 5 produces markdown command files and agent files — no compiled code and no test framework applies to them directly. The validation approach for this phase is manual behavioral verification against defined success criteria.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual behavioral verification (no automated test framework for markdown command files) |
| Config file | none |
| Quick run command | Run `/knz-modules` on test-program workspace and verify output structure |
| Full suite command | Full pipeline run: `/knz-modules` → review → `/knz-sessions` → verify all file counts |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MODS-01 | Running /knz-modules on two programs with identical topics but different Bloom's distributions produces different module sequences | manual | run /knz-modules on test-program with outcomes at Apply vs. Evaluate and compare | ❌ manual only |
| MODS-02 | Module sequencing respects DAG dependencies | manual | inspect 03-modules/ for valid prerequisite_modules ordering | ❌ manual only |
| MODS-03 | Session template auto-selected per module from intake data | manual | inspect session.md files for session_template field matching intake signals | ❌ manual only |
| MODS-04 | Module count scales with contact_hours | manual | verify test-program (9 hours, medium) produces 2-3 modules | ❌ manual only |
| SESS-01 | All 8 TMA arc fields present in every session.md | manual | inspect session.md for all 8 required fields | ❌ manual only |
| SESS-02 | DCR fields present when conditions met | manual | test-program is open skill; verify DCR present in Analyze+ sessions | ❌ manual only |
| SESS-03 | social_learning has all 4 sub-fields in every module-spec.md | manual | inspect 03-modules/*/module-spec.md | ❌ manual only |
| SESS-04 | facilitator-guide.md present with timing, stumbling points, transitions | manual | inspect 04-sessions/*/facilitator-guide.md | ❌ manual only |
| SESS-05 | participant-materials.md present with pre_work, handouts, worksheets | manual | inspect 04-sessions/*/participant-materials.md | ❌ manual only |
| SESS-06 | slide-outline.md present per session | manual | inspect 04-sessions/*/slide-outline.md | ❌ manual only |
| SESS-07 | Sessions generate in parallel (not sequentially) | manual | observe timing on multi-module programs; all modules report complete within similar time window | ❌ manual only |
| INFR-08 | Task subagents spawned per module | manual | observe /knz-sessions orchestrator dispatching multiple Tasks | ❌ manual only |
| INFR-09 | /knz-sessions runs without manual intervention after /knz-modules approval | manual | approve module structure then watch /knz-sessions run to completion without prompts | ❌ manual only |

### Sampling Rate

- **Per task commit:** Spot-check one output file for correct schema fields
- **Per wave merge:** Full run on test-program workspace; verify complete file tree in 03-modules/ and 04-sessions/
- **Phase gate:** All 6 success criteria confirmed against test-program output before `/gsd:verify-work`

### Wave 0 Gaps

None — no automated test infrastructure needed. This phase produces markdown command files. Verification is behavioral (run the commands, inspect the outputs).

---

## Sources

### Primary (HIGH confidence)

- `.claude/reference/schemas/stage-04-modules.md` — All Stage 4 required fields, enum values, validation rules, duration scaling, DAG constraint
- `.claude/reference/schemas/stage-05-sessions.md` — All Stage 5 required fields including 8 TMA arc phases, DCR conditions, facilitator_notes, participant_materials, slide_framework_outline, session_template enum, duration scaling
- `.claude/commands/knz-outcomes.md` — Canonical infer-and-review pattern: silent generation, constraint enforcement, display, AskUserQuestion gate, write-on-approval
- `.claude/commands/knz-assessments.md` — Canonical pattern with PIPE-05 gate, alignment map format, destructive confirmation, constraint enforcement steps
- `.claude/reference/doctrine-how-i-teach-how-i-learn.md` — TMA/DCR doctrine; authoritative source for why each arc phase exists
- `.planning/phases/05-module-and-session-generation/05-CONTEXT.md` — All locked decisions, discretion areas, file layout specification

### Secondary (MEDIUM confidence)

- `workspace/test-program/STATE.md` — Confirms Stage 3 complete (Post-Assessment approved 2026-03-20); test-program is a 9-hour, open-skill, Stage 2 self-direction, virtual, small business financial literacy program — the exact input /knz-modules will receive in first real run
- `.planning/STATE.md` — Confirms phases 1-4 complete; phase 5 architecture decisions

### Tertiary (LOW confidence)

None — all findings derived from authoritative in-codebase sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All components are existing codebase elements; no new external dependencies
- Architecture patterns: HIGH — Directly derived from existing command patterns in knz-outcomes.md and knz-assessments.md; subagent pattern follows Claude Code Task tool mechanics
- Pitfalls: HIGH — Derived from explicit schema constraints and anti-pattern statements in stage-04-modules.md and stage-05-sessions.md; also pattern-matched from existing constraint enforcement in knz-assessments.md
- Session template selection: HIGH — Logic directly from stage-05-sessions.md template selection guidance table
- DCR conditions: HIGH — Conditions stated explicitly in schema as `skill_type == open AND bloom_level >= Analyze`

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (stable — this research is based entirely on the existing codebase which changes only through planned development)
