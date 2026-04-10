---
phase: 04-dashboard-mvp
plan: "05"
subsystem: ui

tags: [react, vite, typescript, polling, tailwind]

# Dependency graph
requires:
  - phase: 04-dashboard-mvp/04-02
    provides: Vite plugins (serveWorkspace, generateHtml) — HTTP endpoints the App polls
  - phase: 04-dashboard-mvp/04-03
    provides: useWorkspacePoll, discoverActiveProject, STAGE_DIRS, workspace-loader types
  - phase: 04-dashboard-mvp/04-04
    provides: PipelineStepper, DeliverableSection, EmptyState, FileExpander, StageRow, StatusBadge, GateRow components

provides:
  - Single-page React dashboard at localhost:3002 wiring all components into a working UI
  - Project discovery on mount via /workspace-index endpoint
  - 3-second polling loop that updates pipeline status without page reload
  - Stage-click scroll + highlight linking stepper to deliverables section
  - Human-verified end-to-end: all 5 DASH requirements confirmed in browser

affects: [Phase 05 module/session plans that produce deliverables the dashboard will display]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "App.tsx as sole state owner — all components are pure display; App lifts project name, poll state, selected stage, and file counts"
    - "useEffect + discoverActiveProject for one-time mount discovery; useWorkspacePoll for continuous 3-second refresh"
    - "Promise.all over STAGE_DIRS to batch file-count fetches in parallel"
    - "id=stage-{N} anchor + scrollIntoView for stepper-to-deliverables linking"

key-files:
  created: []
  modified:
    - ../dashboard/src/App.tsx

key-decisions:
  - "UX rename: pipeline jargon replaced with learner-journey stage names across all stage labels — approved during human verify"
  - "Workspace file path resolved relative to WORKSPACE_DIR env variable (not __dirname) — fixes path mismatch between dev server and plugin context"

patterns-established:
  - "App owns all mutable state; child components receive props and emit callbacks only"
  - "Loading gate: projectLoading || stateLoading collapses both async sources into a single loading flag before rendering"

requirements-completed: [DASH-01, DASH-02, DASH-03, DASH-04, DASH-05]

# Metrics
duration: continuation (checkpoint resume)
completed: 2026-03-20
---

# Phase 4 Plan 05: Dashboard App.tsx Wiring Summary

**App.tsx assembled and human-verified — single-page dashboard at localhost:3002 polls workspace STATE.md every 3s, displays all 9 stages with live status badges, lists deliverables grouped by stage with inline file expansion, and confirmed all 5 DASH requirements working in browser.**

## Performance

- **Duration:** Continuation session (resumed from checkpoint)
- **Started:** (prior session)
- **Completed:** 2026-03-20
- **Tasks:** 2 (Task 1: App.tsx wiring; Task 2: human browser verify)
- **Files modified:** 1 (App.tsx)

## Accomplishments

- App.tsx wired: project discovery on mount, 3-second STATE.md polling, stepper + deliverables two-column layout
- Stage-click handler scrolls to and highlights the corresponding deliverables section via id anchor
- All 5 DASH requirements visually confirmed by user in browser — DASH-01 through DASH-05 approved
- Two post-commit fixes applied: workspace path resolution bug and learner-journey UX rename

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire App.tsx** - `0859473` (feat)
2. **Fix: workspace file path** - `3ebea62` (fix — deviation Rule 1)
3. **UX: stage name rename** - `0fe9b4e` (ux — deviation Rule 2)
4. **Task 2: Human verify** - checkpoint approved

**Plan metadata:** (pending — this docs commit)

## Files Created/Modified

- `../dashboard/src/App.tsx` — Complete dashboard entry point: project discovery, polling hook, file counts, stepper + deliverables layout, empty state, error state

## Decisions Made

- Workspace file path must be resolved relative to `WORKSPACE_DIR` env var (not `__dirname`) — `__dirname` pointed to the built Vite plugin location, not the project root, causing 404s on all workspace fetches
- Stage labels renamed from internal pipeline numbers (e.g., "Stage 01 — Outcomes") to learner-journey language (e.g., "Learning Outcomes") — reduces jargon exposure for SME users

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Workspace file path resolved relative to wrong base**
- **Found during:** Task 1 verification (dev server startup)
- **Issue:** `serveWorkspace()` plugin was resolving file paths relative to `__dirname` (Vite plugin location), causing all `/workspace/*` fetches to return 404
- **Fix:** Changed resolution base to `process.env.WORKSPACE_DIR` or `process.cwd()` — paths now resolve correctly from project root
- **Files modified:** `../dashboard/vite.config.ts` (or plugin module)
- **Verification:** Dev server started, all workspace fetch requests returned 200
- **Committed in:** `3ebea62`

**2. [Rule 2 - UX Correctness] Replace pipeline jargon with learner-journey stage names**
- **Found during:** Human verify (Task 2) — user noticed stage labels used internal pipeline numbers
- **Issue:** Labels like "Stage 01 — Outcomes" expose implementation vocabulary to SME users; learner-journey names are clearer
- **Fix:** Renamed all 9 stage display labels to plain language equivalents across PipelineStepper and StageRow components
- **Files modified:** Stage name constants in component or workspace-loader
- **Verification:** Browser confirmed updated labels; human approved
- **Committed in:** `0fe9b4e`

---

**Total deviations:** 2 auto-fixed (1 bug, 1 UX correctness)
**Impact on plan:** Both fixes necessary for correctness and usability. No scope creep.

## Issues Encountered

- None beyond the two auto-fixed deviations above.

## User Setup Required

None - no external service configuration required. Dev server runs at localhost:3002 with `npm run dev` from `dashboard/`.

## Next Phase Readiness

- Phase 4 (Dashboard MVP) fully complete — all 5 plans executed, all DASH requirements verified
- Dashboard will automatically reflect Phase 5 (Module/Session) output as those stages write files to workspace/
- Phase 5 can begin immediately — no dashboard blockers

---
*Phase: 04-dashboard-mvp*
*Completed: 2026-03-20*
