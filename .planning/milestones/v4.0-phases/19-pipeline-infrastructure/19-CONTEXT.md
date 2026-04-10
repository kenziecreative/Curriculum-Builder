# Phase 19: Pipeline Infrastructure - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Make generation reliable — data stays consistent across stages, content is audited before it reaches deliverables, context windows are managed so nothing generates in a degraded state, and sub-stage progress survives interruptions. This phase builds infrastructure for the pipeline; it does NOT add new user-facing stages, change the pipeline order, or modify what each stage generates.

</domain>

<decisions>
## Implementation Decisions

### Canonical registry (PIPE-03)
- Incremental build — each stage writes its section to curriculum-registry.json when it completes
- Registry is the source of truth — if a stage file diverges from registry data, the registry version wins; drift is flagged but not blocking
- Both fresh and audit mode workspaces get a registry — audit mode builds it incrementally after each stage's content is finalized (post-approve for gated stages, post-generation for auto stages)
- Location: workspace/{project}/curriculum-registry.json (workspace root, alongside STATE.md)
- Tracks four data categories: outcome wording + IDs, assessment criteria, learner profile, time allocations
- Human-readable formatted JSON — an SME opening the file can understand what they're looking at
- Per-section timestamps (last_updated) so downstream stages can detect if they were generated against stale data
- Auto-updates at approve gates — when approve.md processes revisions, it updates the registry entry for that stage

### Draft-then-audit flow (PIPE-01)
- Stages 4-6 only (modules, sessions, metaskills) — the content-heavy auto-generated stages
- Drafts live in _drafts subdirectory within the stage directory: workspace/{project}/04-sessions/_drafts/
- Promotion moves files from _drafts up to the stage directory
- Four audit checks before promotion: file completeness, registry consistency, vocabulary scan, schema compliance
- Auto-fix then re-audit on failures — simple fixes (vocabulary substitution, missing field fill-in) get auto-corrected, re-audit runs, if still failing after fixes then stop and report
- Audit results visibility: Claude's discretion on whether to show brief pass summary or stay silent on success

### Pre-execution input validation (PIPE-02)
- Each stage command verifies its inputs are valid before generating — not just that the predecessor status is complete, but that the actual data it needs exists and is well-formed
- A missing field or broken reference stops generation with a specific message naming what's wrong

### Context breaks in auto-chain (PIPE-04)
- Auto-chain with context breaks at every stage transition (4→5, 5→6, 6→7, 7→8)
- Each stage starts with a fresh context window — no conversation context carries over
- Next stage reads curriculum-registry.json and workspace STATE.md to know what exists and what to do next
- Registry + STATE.md are the only handoff mechanism — no summary notes or conversation state

### Sub-stage state tracking (PIPE-05)
- Module-level granularity — STATE.md tracks each module: not-started, in-progress, complete
- STATE.md updated after each module completes (not batched at the end) — if context clears mid-generation, STATE.md reflects exactly what's done
- Sessions only — other stages are single-pass and fast enough that interruption is rare
- Inline table format within the Stage 5 section of STATE.md

### Claude's Discretion
- Audit results presentation: silent pass vs. brief summary on success — pick what gives SMEs the right transparency level
- Pre-execution validation: exact checks per stage (what constitutes "valid input" for each)
- Context break mechanism: how the auto-chain technically achieves the fresh context (Skill tool invocation, /clear insertion, or other approach)
- Registry JSON schema: exact field structure within the four data categories
- Draft _drafts cleanup: whether to delete _drafts after successful promotion or keep as backup

</decisions>

<specifics>
## Specific Ideas

- User initially questioned the value of auto-chaining — the key selling point is that context breaks prevent generation quality degradation, especially after sessions (Stage 5) fills the window. The chain automates what users already do manually ("Type /clear now, then run X")
- "Registry wins" on drift reflects a philosophy that the centralized source should be authoritative — manual edits to stage files without updating the registry are user error, not a system state to accommodate
- All four audit checks (completeness, registry consistency, vocabulary, schema) must pass before promotion — this is defense in depth, not pick-your-favorite

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- sessions.md: Already has resume logic that checks existing session directories — extend with STATE.md module-level tracking
- session-generator.md: Post-write vocabulary scan pattern (lines 400-415) — reuse for draft audit vocabulary check
- curriculum-voice.md: Never-say table (31 entries) — vocabulary audit references this canonical list
- Every stage command: Already has prerequisite checking pattern (check predecessor status in workspace STATE.md) — extend with input validation

### Established Patterns
- Stage prerequisite pattern: `Check Stage N prerequisite` section at top of each command — PIPE-02 extends this to check data quality, not just status
- "Type `/clear` now" handoff pattern in every command — PIPE-04 automates this
- Workspace STATE.md stage status tracking: `not-started`, `pre-populated`, `in-progress`, `complete` — PIPE-05 adds module-level detail within `in-progress`
- Directory scheme auto-detection (Phase 18): `_drafts` subdirectories must work with both 00-08 and 01-09 schemes

### Integration Points
- curriculum-registry.json: Every stage command (outcomes through marketing) needs write access on completion; every downstream command needs read access on start
- approve.md: Two approve gates need registry auto-update logic added
- sessions.md: Orchestrator needs STATE.md write after each module-complete signal from subagents
- Auto-chain mechanism: Stage completion → context break → next stage invocation needs to be wired into command handoff sections
- _drafts directories: modules.md, sessions.md, metaskills.md all need draft-write + audit-promote flow added

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 19-pipeline-infrastructure*
*Context gathered: 2026-03-27*
