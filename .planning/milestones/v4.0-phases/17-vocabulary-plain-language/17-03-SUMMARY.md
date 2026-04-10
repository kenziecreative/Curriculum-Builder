---
phase: 17-vocabulary-plain-language
plan: "03"
subsystem: agents
tags: [vocabulary, plain-language, curriculum-voice, post-write-verification]

# Dependency graph
requires:
  - phase: 17-vocabulary-plain-language/17-01
    provides: canonical curriculum-voice.md with "Terms That Never Appear in Output" table
provides:
  - All four curriculum agents reference curriculum-voice.md for vocabulary enforcement
  - curriculum-evaluator.md has full three-layer enforcement (voice reference + Writing for Clarity + post-write scan)
  - knz-validator.md has defense-in-depth vocabulary guardrails
  - curriculum-auditor.md has updated canonical guardrail + post-write scan
  - session-generator.md post-write scan references canonical table
affects: [any future agent additions to .claude/plugins/curriculum/agents/]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Post-write verification scan references canonical curriculum-voice.md table rather than hardcoding per-agent term lists"
    - "Three-layer enforcement for agents writing directly SME-read files: voice reference + inline guardrail + Writing for Clarity + post-write scan"
    - "Defense-in-depth guardrails for agents whose output is translated before user sees it"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/agents/curriculum-evaluator.md
    - .claude/plugins/curriculum/agents/knz-validator.md
    - .claude/plugins/curriculum/agents/curriculum-auditor.md
    - .claude/plugins/curriculum/agents/session-generator.md

key-decisions:
  - "Three-layer treatment for curriculum-evaluator.md — writes evaluation-report.md read directly by SMEs, highest user exposure"
  - "Light guardrail for knz-validator.md — output is always translated by orchestrator before user sees it; canonical reference is defense in depth for edge cases"
  - "Post-write scans reference curriculum-voice.md canonical table rather than hardcoding — one list to maintain, not four"

patterns-established:
  - "All agents that write files users open must have a post-write scan referencing curriculum-voice.md"
  - "Agents with translated output (orchestrator layer between agent and user) get lighter vocabulary enforcement"

requirements-completed: [VOCAB-01, VOCAB-02]

# Metrics
duration: 4min
completed: 2026-03-27
---

# Phase 17 Plan 03: Vocabulary Agent Enforcement Summary

**Four curriculum agents canonicalized to reference curriculum-voice.md — curriculum-evaluator.md gets full three-layer enforcement, the other three get enforcement proportional to their user exposure**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-27T01:25:00Z
- **Completed:** 2026-03-27T01:29:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- curriculum-evaluator.md now has Persona section (voice reference + inline guardrail), Writing for Clarity block, and Post-Write Verification scan — the full treatment for an agent writing SME-facing files
- knz-validator.md has Vocabulary Guardrails section distinguishing when schema field names are acceptable vs. when they must be plain language
- curriculum-auditor.md inline guardrail now references the canonical curriculum-voice.md table (not just listing specific examples), plus a post-write scan
- session-generator.md post-write scan now references the canonical list as the primary source with existing specific examples kept as additive guidance

## Task Commits

1. **Task 1: Add full vocabulary enforcement to curriculum-evaluator.md** - `d264464` (feat)
2. **Task 2: Add vocabulary guardrails to knz-validator, curriculum-auditor, session-generator** - `fd04df4` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/agents/curriculum-evaluator.md` — Persona section, Writing for Clarity block, Post-Write Verification scan added
- `.claude/plugins/curriculum/agents/knz-validator.md` — Vocabulary Guardrails section added
- `.claude/plugins/curriculum/agents/curriculum-auditor.md` — Inline guardrail updated to reference canonical list; Post-Write Verification scan added
- `.claude/plugins/curriculum/agents/session-generator.md` — Prohibited vocabulary scan updated to reference canonical curriculum-voice.md table

## Decisions Made

- Full three-layer enforcement for curriculum-evaluator.md because it writes evaluation-report.md that SMEs read directly — same treatment as approve.md
- Light guardrail for knz-validator.md because its output is always translated by the orchestrator before any user sees it — canonical reference provides defense in depth without redundant enforcement
- Kept session-generator.md specific term list intact as additive guidance — agent-specific examples help the agent recognize the most common violations; canonical reference is additive

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- All four agents now reference the canonical vocabulary enforcement source
- If a new prohibited term is added to curriculum-voice.md, all agent post-write scans automatically include it
- Phase 17 vocabulary work is complete — ready for Phase 18 (guidance updates)

---
*Phase: 17-vocabulary-plain-language*
*Completed: 2026-03-27*
