# Architecture Patterns

**Domain:** Claude Code plugin with multi-stage pipeline and React dashboard
**Researched:** 2026-03-15
**Confidence:** HIGH — based on direct inspection of the Brand Compass reference implementation

---

## Recommended Architecture

The KNZ Curriculum Builder follows the same two-part architecture as the Brand Compass plugin: a Claude Code plugin (commands, agents, skills, hooks, reference files) that operates on a `workspace/` directory, and a Vite + React dashboard that reads from that same directory to show progress and deliverables. These two halves share a single communication channel: the filesystem.

```
knz-learner-builder/               ← Claude Code plugin root
├── plugin.json
├── CLAUDE.md                      ← Layer 1 doctrine: pipeline rules, state protocol
├── .claude/
│   ├── settings.json              ← Hook registration
│   ├── commands/
│   │   └── knz-builder/           ← One file per pipeline stage command
│   │       ├── init.md
│   │       ├── intake.md
│   │       ├── outcomes.md
│   │       ├── assessments.md
│   │       ├── modules.md
│   │       ├── sessions.md
│   │       ├── metaskills.md
│   │       ├── transfer.md
│   │       ├── marketing.md
│   │       └── validate.md
│   └── agents/                    ← Subagents for parallel/validation work
│       ├── module-generator.md
│       ├── session-generator.md
│       ├── validation-agent.md
│       ├── metaskill-validator.md
│       └── transfer-validator.md
├── reference/                     ← Layer 3 doctrine: loaded on demand
│   ├── doctrine.md
│   ├── session-templates.md
│   ├── metaskill-routines.md
│   ├── validation-rubric.md
│   └── schemas/                   ← Layer 2 doctrine: binding output constraints
│       ├── intake-schema.md
│       ├── outcome-schema.md
│       ├── assessment-schema.md
│       ├── module-schema.md
│       ├── session-schema.md
│       ├── metaskill-schema.md
│       └── transfer-schema.md
└── templates/
    └── project-scaffold/          ← Copied on init to create workspace/

workspace/                         ← Curriculum project (created by init command)
├── STATE.md                       ← Session bridge: stage, status, decisions
├── 00-project-brief.md
├── 01-outcomes/
├── 02-assessments/
├── 03-modules/
├── 04-metaskills/
├── 05-transfer/
├── 06-marketing/
└── validation/

dashboard/                         ← React app (Vite + React + TypeScript + Tailwind)
├── src/
│   ├── main.tsx
│   ├── lib/
│   │   ├── router.tsx             ← React Router routes
│   │   ├── state-loader.ts        ← Parses STATE.md into typed objects
│   │   └── content-loader.ts      ← Loads workspace/ files via import.meta.glob
│   └── components/
│       ├── AppLayout.tsx          ← Shell: fixed sidebar + main content area
│       ├── PipelineSidebar.tsx    ← Stage list with status dots
│       ├── OverviewPage.tsx       ← Dashboard home: progress + quick actions
│       ├── StagePage.tsx          ← Per-stage view: outputs + status
│       ├── DeliverablesPage.tsx   ← All generated files, browseable
│       ├── OutputViewer.tsx       ← Renders .md (react-markdown) and .html (iframe)
│       ├── ValidationReport.tsx   ← Schema + rubric report display
│       └── AgentOutputCard.tsx    ← Shows running/completed subagent status
└── vite.config.ts                 ← Custom middleware serves workspace/ at /workspace/
```

---

## Component Boundaries

### Plugin Side (Claude Code)

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Commands (`commands/knz-builder/*.md`) | One command per pipeline stage. Guides conversation, calls agents, writes stage outputs, updates STATE.md. | workspace/ files (read + write); agents (spawn via Task tool); reference/ files (read on demand) |
| Agents (`agents/*.md`) | Subagents with fresh context windows. Module generators run in parallel; validation agents are read-only. | workspace/ files (read + write); reference/schemas/ (read) |
| Hooks (`settings.json`) | SessionStart: read STATE.md and restore context. PreToolUse: block writes to future-stage directories when prerequisites incomplete. | workspace/STATE.md (read); filesystem write operations (intercept) |
| Reference files (`reference/`) | Layer 2 (schemas) and Layer 3 (doctrine) of constraint encoding. Loaded by commands that need them. | Read-only. Loaded by commands and agents. |
| STATE.md | Session bridge. Tracks current stage, completed stages, running agents, key decisions. Written by commands; read by hooks, dashboard. | Written by commands; read by everything. |

### Dashboard Side (React)

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `state-loader.ts` | Parses STATE.md markdown into a typed `CurriculumState` object. Uses `import.meta.glob` for build-time loading. | workspace/STATE.md (read at build time) |
| `content-loader.ts` | Loads all markdown and HTML files from workspace/ subdirectories. Uses `import.meta.glob`. | workspace/**/*.{md,html} (read at build time) |
| `vite.config.ts` middleware | Serves workspace/ directory at `/workspace/` URL during development. Enables runtime fetch of markdown/HTML files. | workspace/ filesystem |
| `PipelineSidebar.tsx` | Renders all nine stages with status indicators (pending / in_progress / completed). Reads from parsed STATE.md. | `state-loader.ts` |
| `StagePage.tsx` | Shows per-stage description, outputs generated so far, and next action prompt. | `state-loader.ts`, `content-loader.ts` |
| `OutputViewer.tsx` | Renders markdown deliverables with `react-markdown` and HTML deliverables in sandboxed `<iframe>`. Fetches files at runtime via the Vite middleware. | `/workspace/` URL (runtime fetch) |
| `ValidationReport.tsx` | Displays schema-report.md and rubric-report.md. Schema failures shown as blocking; rubric findings shown with confidence scores for human review. | `content-loader.ts` |

---

## Data Flow

### Plugin to Dashboard (write-then-read, no API)

```
User runs command
  → Command reads STATE.md (current position)
  → Command conducts conversation / spawns subagents
  → Subagent reads reference/schemas/ + workspace/ prior stage outputs
  → Subagent writes stage output files to workspace/NN-stage/
  → Command updates STATE.md (marks stage complete, logs decisions)
  → Dashboard reloads (dev: HMR; prod: manual refresh)
  → state-loader.ts parses STATE.md → React state
  → content-loader.ts loads workspace/ files → deliverable list
  → Dashboard reflects new stage status and new files
```

### How STATE.md Works as a Session Bridge

STATE.md is the single shared object that both sides read. The plugin writes it; the dashboard reads it. Structure mirrors the Brand Compass pattern:

```markdown
## Current Position
Phase: [stage number]
Step: [step within stage]
Blocking on: [gate condition or nothing]

## Completed Stages
- [x] Stage 0: Project Init
- [x] Stage 1: Intake
- [ ] Stage 2: Outcome Design
...

## Running Agents
| Agent | Status | Triggered | Output |
|-------|--------|-----------|--------|
| module-generator (Module 3) | running | 2026-03-15 | — |

## Key Decisions
- 2026-03-15: Stage 1 — Audience is Grow Stage 2 for this domain
- 2026-03-15: Stage 1 — Skill type: open (leadership + communication)

## Session Log
- 2026-03-15: Intake complete. 8 required fields captured.
```

`state-loader.ts` parses this with regex section extraction — the same pattern used in Brand Compass's `state-loader.ts`, adapted for curriculum pipeline stages instead of brand phases.

### Workspace as Source of Truth

The `workspace/` directory is the curriculum project. All generated content lives there. The dashboard never writes to it — that is exclusively the plugin's domain. The dashboard is a read-only view:

```
workspace/STATE.md         → state-loader.ts → pipeline status, decisions, agents
workspace/00-project-brief.md → content-loader.ts → displayed in Stage 1 view
workspace/01-outcomes/*.md → content-loader.ts → displayed in Stage 2 view
workspace/validation/*.md  → content-loader.ts → ValidationReport component
```

### Two Workspace Access Patterns

**Build-time (import.meta.glob):** STATE.md and all markdown content files are loaded at Vite build time using `import.meta.glob`. These are baked into the bundle. This works for files that exist when dev server starts.

**Runtime (fetch via Vite middleware):** HTML files and large markdown files are fetched at runtime through the custom `serveWorkspace()` Vite plugin, which serves the `workspace/` directory at `/workspace/` URLs. The `OutputViewer` uses this for iframe-rendered HTML and on-demand markdown loading.

In practice: dev server handles both. The Vite middleware serves `workspace/` for runtime fetches; `import.meta.glob` covers STATE.md and the content index.

---

## Patterns to Follow

### Pattern 1: Command as Orchestrator, Agents as Workers

Commands (the slash command files) stay clean — they manage conversation and state transitions, and spawn agents for heavy work. Agents handle content generation and validation with fresh context windows.

**What commands do:**
- Read STATE.md at start, check prerequisites
- Conduct conversational intake or present synthesized outputs
- Spawn subagents via the Task tool for module generation and validation
- Update STATE.md at stage transitions
- Tell the user what to run next

**What agents do:**
- Receive stage outputs from prior stages as context
- Load relevant reference files (schemas, templates, rubric)
- Generate or validate content against schema requirements
- Write output files to the workspace directory
- Return completion status to the orchestrating command

This division solves the context exhaustion problem. A 12-module curriculum with full session designs and transfer ecosystem could exceed 100k tokens. The main session stays clean as orchestrator; each module-generator agent has a fresh context window.

### Pattern 2: Three-Layer Doctrine Encoding

Doctrine is not in one place. It is distributed at the constraint level where each element is most effective:

```
Layer 1 → CLAUDE.md
  Pipeline order rule, backward design principle, state management protocol,
  TMA integration rule, social learning requirement, schema-over-instruction rule.
  Lean. No full doctrine text.

Layer 2 → reference/schemas/
  Required output fields per stage. This is the binding constraint mechanism.
  Missing required fields = hard failure. Pipeline does not advance.
  Example: module-schema.md requires social_learning_layer with 4 sub-fields.
  The AI cannot produce a module without social learning — not because it is
  instructed to include it, but because the schema requires it.

Layer 3 → reference/doctrine.md, session-templates.md, metaskill-routines.md, validation-rubric.md
  Full doctrine text, template libraries, thinking routine vocabulary, enumerable
  validation checklist. Loaded on demand by the stage commands that need them.
  The session generation command loads session-templates.md; the metaskill command
  loads metaskill-routines.md.
```

### Pattern 3: Stage Gate via STATE.md + Hook

The `SessionStart` hook reads STATE.md to restore context. A `PreToolUse` hook (to be implemented) blocks filesystem writes to stage N+2 directories when stage N is not complete. This prevents accidental pipeline skipping without requiring code-level enforcement. The Brand Compass reference uses `SessionStart` for context restoration; the curriculum builder needs the additional `PreToolUse` gate given the strict backward-design dependency chain.

### Pattern 4: Parallel Module Generation After Sequential Sequencing

Module structure and sequencing must be generated sequentially — each module's prerequisite assumptions constrain the next module's starting point. But once the `sequence-rationale.md` and all `module-overview.md` files exist, session content can be generated in parallel. Each module-generator agent receives: full intake brief, full outcomes, full assessments, module overview for its assigned module, and position in the sequence. This parallelism is the primary mechanism for keeping session time bounded for large programs.

### Pattern 5: Separate Generation from Validation

The model that generates session content and the model that validates it against the rubric must be in different Task calls. A single model asked to generate-and-validate often validates away structural problems rather than fixing them. The `validation-agent.md` runs after generation completes, reads all output files, and produces a structured schema-report.md with specific field-level failures.

### Pattern 6: AskUserQuestion for Gates, STATE.md for Continuity

User review gates (after intake, after assessment design, at final validation) use `AskUserQuestion` with defined options. The user's decision is recorded in STATE.md as a key decision with timestamp. This is how a session break between stage groups preserves context — the next session reads STATE.md and knows exactly where the human left off.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Monolithic Context

**What it is:** Putting all generation work in the main session without subagents.
**Why bad:** A full curriculum (intake + outcomes + assessments + 8-12 modules with session designs + metaskill maps + transfer ecosystem + marketing) exceeds 100k tokens. The main session loses fidelity as context fills.
**Instead:** Main session = orchestrator. Every heavy generation call (module content, session designs) spawns a subagent with a fresh context window. Each subagent receives only what it needs: the relevant schema, the relevant reference files, and the specific upstream outputs it depends on.

### Anti-Pattern 2: Instruction Without Schema

**What it is:** Using inline instructions ("always include a formative assessment") instead of schema-enforced required fields.
**Why bad:** Instructions are advisory. The AI treats them as suggestions when generating fluently. Social learning layers, reflection prompts, and transfer connections are the elements most commonly omitted — which is precisely why they need the strictest structural enforcement, not looser instruction.
**Instead:** Every non-negotiable pedagogical element is a required field in the stage schema. Missing field = hard failure. The pipeline does not advance until the field is populated.

### Anti-Pattern 3: Dashboard Writing to Workspace

**What it is:** Allowing the React dashboard to write files to the workspace directory.
**Why bad:** The plugin and dashboard would need a conflict resolution strategy. The plugin's commands are the authoritative writer; the dashboard is a read-only view. Mixed writes create state management complexity with no benefit — the user is always in Claude Code when generating content.
**Instead:** Dashboard is read-only. All writes go through plugin commands and agents.

### Anti-Pattern 4: Marketing Before Curriculum

**What it is:** Generating program descriptions, outcomes, or audience positioning before the full curriculum exists.
**Why bad:** This is the documented root cause of the existing template's 60-65% marketing / 20-25% pedagogy ratio. When marketing language is generated early, it primes subsequent curriculum generation toward what sounds good rather than what educates effectively.
**Instead:** Marketing derivation is Stage 8 — the last content generation stage before validation. Every marketing claim must trace to a specific curriculum element. The marketing stage command reads all prior stage outputs as its inputs.

### Anti-Pattern 5: Open-Ended Validation Prompts

**What it is:** Asking the validation agent to "review this curriculum and suggest improvements."
**Why bad:** Open-ended quality prompts produce worse output than enumerable checklists. The model validates away problems by softening language rather than flagging structural gaps.
**Instead:** Validation runs against the specific enumerable checklist in `reference/validation-rubric.md`. Each check produces a pass, fail, or flag-for-review result with specific field reference. Schema failures are hard blocks; rubric findings surface for human decision.

---

## Scalability Considerations

| Concern | 90-min Program | Multi-day Program | Full Semester |
|---------|---------------|------------------|---------------|
| Module count | 1-2 modules | 4-6 modules | 12-16 modules |
| Context management | Single session feasible | Subagents needed for modules | Subagents essential; validation must chunk |
| State complexity | Simple STATE.md | STATE.md with agent log | STATE.md + per-module status tracking |
| Dashboard complexity | Same dashboard, fewer entries | Same dashboard | Same dashboard; output navigation becomes critical |
| Generation time | < 15 min | 30-60 min (parallel) | 2-4 hours (parallel, multi-session) |

Architecture handles all durations without modification. The init command creates the same scaffold; the module generation stage launches as many module-generator agents as the module count requires. The dashboard reflects whatever is in `workspace/` regardless of volume.

---

## Suggested Build Order

Build order follows both dependency direction and risk surface — the components with the highest architectural risk are validated early.

```
Phase 1: Filesystem Foundation
  workspace/ directory template (project-scaffold/)
  STATE.md template and structure
  state-loader.ts (dashboard reads STATE.md)
  → Validates: the session bridge pattern works before anything depends on it

Phase 2: Plugin Shell + First Command
  CLAUDE.md (Layer 1 doctrine)
  settings.json (SessionStart hook only — context restoration)
  commands/knz-builder/init.md (Stage 0: scaffolds workspace/)
  commands/knz-builder/intake.md (Stage 1: conversational interview)
  reference/schemas/intake-schema.md
  → Validates: command → STATE.md → dashboard loop; conversational intake pattern

Phase 3: Backward Design Core
  reference/schemas/outcome-schema.md
  reference/schemas/assessment-schema.md
  commands/knz-builder/outcomes.md (Stage 2)
  commands/knz-builder/assessments.md (Stage 3)
  → Validates: schema-enforced output fields; backward design generation sequence

Phase 4: Dashboard MVP
  AppLayout.tsx, PipelineSidebar.tsx, OverviewPage.tsx
  content-loader.ts (loads workspace/ files)
  StagePage.tsx (per-stage view)
  vite.config.ts serveWorkspace() middleware
  → Validates: full loop — plugin writes, dashboard reads, user sees progress

Phase 5: Module Generation + Parallel Subagents
  reference/session-templates.md, reference/schemas/module-schema.md, session-schema.md
  agents/module-generator.md
  agents/session-generator.md
  commands/knz-builder/modules.md (Stage 4 + parallel spawning)
  → Validates: subagent pattern; parallel generation; context management at scale

Phase 6: Validation Layer
  reference/validation-rubric.md
  agents/validation-agent.md
  commands/knz-builder/validate.md (Stage 5/MVP)
  dashboard: ValidationReport.tsx
  → Validates: separate-generation-from-validation pattern; schema fail → hard block

Phase 7: Full Pipeline Completion
  reference/schemas/metaskill-schema.md, transfer-schema.md
  reference/metaskill-routines.md, doctrine.md
  agents/metaskill-validator.md, transfer-validator.md
  commands/knz-builder/metaskills.md, transfer.md, marketing.md
  settings.json: add PreToolUse hook for stage gate enforcement
  → Completes: all nine stages; three-layer doctrine encoding; full validation

Phase 8: Dashboard Deliverable Navigation
  DeliverablesPage.tsx
  OutputViewer.tsx (react-markdown + iframe rendering)
  → Completes: user can browse and read all generated deliverables from dashboard
```

---

## Sources

- Brand Compass reference implementation (direct inspection): `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/`
  - `src/lib/state-loader.ts` — STATE.md parsing pattern (HIGH confidence)
  - `src/lib/content-loader.ts` — import.meta.glob workspace loading (HIGH confidence)
  - `src/lib/router.tsx` — React Router structure (HIGH confidence)
  - `src/components/AppLayout.tsx`, `PhaseSidebar.tsx`, `OutputViewer.tsx` — dashboard component structure (HIGH confidence)
  - `.claude/commands/brand-compass/start.md`, `phase-1-origin.md` — command pattern with STATE.md gate checks (HIGH confidence)
  - `.claude/agents/research-analyst.md`, `brand-verifier.md` — subagent pattern with frontmatter (HIGH confidence)
  - `vite.config.ts` — serveWorkspace() middleware pattern for runtime file serving (HIGH confidence)
  - `.claude/settings.json` — hook registration pattern (HIGH confidence)
- Research output: `knz-builder-research/research/outputs/10-tool-architecture-proposal.md` — nine-stage pipeline architecture, three-layer doctrine encoding, validation tiers (HIGH confidence — synthesized from 11-phase research)
- Research output: `knz-builder-research/research/outputs/12-tool-design-recommendations.md` — MVP build order, schema requirements per stage, anti-pattern rationale (HIGH confidence)
- PROJECT.md — confirmed requirements and key decisions (HIGH confidence)
