---
phase: 04-dashboard-mvp
plan: "03"
subsystem: ui
tags: [typescript, react, vitest, testing-library, vite, polling, fetch]

# Dependency graph
requires:
  - phase: 04-dashboard-mvp
    provides: knz-curriculum-dashboard scaffold with Vite plugins, test fixtures, and stub test files from Plans 01 and 02

provides:
  - TypeScript interfaces: StageRecord, GateRecord, KnzPipelineState, ProjectIndex (src/types/pipeline.ts)
  - STATE.md parser: parseStageProgress, parseReviewGates, parseNextAction, loadStateFromUrl (src/lib/state-loader.ts)
  - Workspace file discovery: discoverActiveProject, listStageFiles, STAGE_DIRS (src/lib/workspace-loader.ts)
  - React polling hook: useWorkspacePoll with 3s interval and cleanup (src/lib/use-workspace-poll.ts)
  - 19 passing tests across 4 test files

affects:
  - 04-04 (UI components depend on these types and hooks directly)
  - Any future plan reading KnzPipelineState or importing from @/types/pipeline

# Tech tracking
tech-stack:
  added: ["@testing-library/react", "@testing-library/dom", "jsdom"]
  patterns:
    - "TDD: RED (failing) → GREEN (passing) → commit per task"
    - "vi.stubGlobal('fetch') for mocking browser fetch in vitest"
    - "// @vitest-environment jsdom file-level directive for React hook tests"
    - "act() + runAllTicks() for fake timer resolution with setInterval hooks"
    - "RUNTIME FETCH ONLY — no import.meta.glob in any dashboard data module"

key-files:
  created:
    - ../knz-curriculum-dashboard/src/types/pipeline.ts
    - ../knz-curriculum-dashboard/src/lib/state-loader.ts
    - ../knz-curriculum-dashboard/src/lib/workspace-loader.ts
    - ../knz-curriculum-dashboard/src/lib/use-workspace-poll.ts
  modified:
    - ../knz-curriculum-dashboard/src/lib/state-loader.test.ts
    - ../knz-curriculum-dashboard/src/lib/workspace-loader.test.ts
    - ../knz-curriculum-dashboard/src/lib/use-workspace-poll.test.ts
    - ../knz-curriculum-dashboard/package.json

key-decisions:
  - "act()+runAllTicks() replaces runAllTimersAsync() for setInterval hooks — runAllTimersAsync hits 10k timer limit and aborts"
  - "// @vitest-environment jsdom directive per-file keeps Node environment for non-React tests"
  - "STAGE_DIRS constant exported from workspace-loader.ts for UI components to map stage numbers to directories"

patterns-established:
  - "Pattern 1: Pipe-delimited table parsing — rows matched by /^\\|\\s*\\d+/ to skip headers and separators"
  - "Pattern 2: extractSection() helper extracts ## Heading content using regex lookahead on next ## or end of string"
  - "Pattern 3: Hook tests use act() wrapper to flush promises before asserting React state"

requirements-completed: [DASH-01, DASH-02, DASH-05]

# Metrics
duration: 12min
completed: 2026-03-20
---

# Phase 4 Plan 03: Data Layer Summary

**TypeScript interfaces, STATE.md pipe-table parser, workspace file discovery, and 3s React polling hook — 19 tests GREEN across 4 files**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-20T07:52:00Z
- **Completed:** 2026-03-20T08:04:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Defined TypeScript contracts (StageRecord, GateRecord, KnzPipelineState, ProjectIndex) that Plan 04 UI components import directly without exploration
- Wrote STATE.md parser using pipe-delimited table regex — correctly handles 9 stages, 3 gates, next action extraction, and null completed dates
- Built workspace discovery (discoverActiveProject, listStageFiles) and stage directory map (STAGE_DIRS) for UI consumption
- Implemented useWorkspacePoll React hook with setInterval polling every 3s and clearInterval cleanup on unmount
- Established test patterns for fetch mocking and React hook testing with fake timers

## Task Commits

Each task was committed atomically:

1. **Task 1: TypeScript interfaces and STATE.md parser with passing tests** - `517b417` (feat)
2. **Task 2: Workspace loader and polling hook with passing tests** - `d6eb021` (feat)

**Plan metadata:** (docs commit — see below)

_Note: TDD tasks have RED (fail) → GREEN (pass) flow per task_

## Files Created/Modified
- `src/types/pipeline.ts` - StageRecord, GateRecord, KnzPipelineState, ProjectIndex TypeScript interfaces
- `src/lib/state-loader.ts` - parseStageProgress, parseReviewGates, parseNextAction, loadStateFromUrl
- `src/lib/workspace-loader.ts` - discoverActiveProject, listStageFiles, STAGE_DIRS
- `src/lib/use-workspace-poll.ts` - React polling hook, 3s interval, clearInterval cleanup
- `src/lib/state-loader.test.ts` - 8 passing tests (pipe-table parsing, null handling, next action)
- `src/lib/workspace-loader.test.ts` - 4 passing tests (fetch mock, empty arrays)
- `src/lib/use-workspace-poll.test.ts` - 3 passing tests (mount, unmount, null project)
- `package.json` - Added @testing-library/react, @testing-library/dom, jsdom

## Decisions Made
- Used `act() + vi.runAllTicks() + Promise.resolve()` instead of `vi.runAllTimersAsync()` for hook tests — `runAllTimersAsync` with `setInterval` hits the 10k timer abort limit
- Added `// @vitest-environment jsdom` file-level directive instead of changing global vitest config — keeps Node environment for non-React tests (generate-html.test.ts, state-loader.test.ts)
- Exported `STAGE_DIRS` constant from workspace-loader.ts to give UI components a canonical stage-number-to-directory mapping without re-deriving it

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed infinite loop in hook test timer strategy**
- **Found during:** Task 2 (use-workspace-poll tests)
- **Issue:** Plan specified `vi.runAllTimersAsync()` which aborts after 10,000 timer iterations when a `setInterval` is running
- **Fix:** Replaced with `act(async () => { await vi.runAllTicks(); await Promise.resolve() })` pattern to flush the async poll without advancing the recurring interval
- **Files modified:** src/lib/use-workspace-poll.test.ts
- **Verification:** All 3 hook tests pass, no abort error
- **Committed in:** d6eb021 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug in test strategy)
**Impact on plan:** Test approach corrected to work with React 19 + vitest 3 fake timers. No scope creep. All 7 behavioral tests from plan pass.

## Issues Encountered
- `vi.runAllTimersAsync()` causes "Aborting after running 10000 timers, assuming infinite loop" with `setInterval` — resolved by switching to `act()+runAllTicks()` pattern

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Data layer complete — Plan 04-04 UI components can import directly from `@/types/pipeline`, `@/lib/state-loader`, `@/lib/workspace-loader`, and `@/lib/use-workspace-poll`
- All 19 tests passing; no blockers
- STAGE_DIRS constant available for stage-number-to-directory mapping in pipeline view

---
*Phase: 04-dashboard-mvp*
*Completed: 2026-03-20*

## Self-Check: PASSED

- FOUND: src/types/pipeline.ts
- FOUND: src/lib/state-loader.ts
- FOUND: src/lib/workspace-loader.ts
- FOUND: src/lib/use-workspace-poll.ts
- FOUND: .planning/phases/04-dashboard-mvp/04-03-SUMMARY.md
- FOUND: commit 517b417
- FOUND: commit d6eb021
