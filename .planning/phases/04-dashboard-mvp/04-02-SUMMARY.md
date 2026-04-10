---
phase: 04-dashboard-mvp
plan: "02"
subsystem: infra
tags: [vite, typescript, marked, vitest, node, filesystem]

# Dependency graph
requires:
  - phase: 04-dashboard-mvp/04-01
    provides: dashboard project scaffold with React/Vite/Tailwind and vitest wired
provides:
  - serveWorkspace() Vite plugin serving /workspace/* files, /workspace-index JSON, /workspace-files/{project}/{stage} JSON
  - generateHtml() Vite plugin generating delivery/ HTML on dev server startup
  - generateHtmlForWorkspace() standalone testable module in vite-plugins/generate-html.ts
  - wrapHtml() function producing self-contained HTML with embedded CSS
affects:
  - 04-03
  - 04-04
  - 04-05

# Tech tracking
tech-stack:
  added: [marked (already installed, now used)]
  patterns:
    - Vite plugin as thin wrapper calling extracted Node.js module (testability pattern)
    - Path security validation before filesystem access in middleware
    - Frontmatter stripping with regex before markdown-to-HTML conversion

key-files:
  created:
    - ../dashboard/vite-plugins/generate-html.ts
  modified:
    - ../dashboard/vite.config.ts
    - ../dashboard/vite-plugins/generate-html.test.ts
    - ../dashboard/tsconfig.node.json

key-decisions:
  - "Vite plugin logic extracted to standalone Node.js module (generate-html.ts) so it can be unit-tested without a running Vite server"
  - "Path security check added: resolved file paths validated against WORKSPACE_DIR before serving — prevents directory traversal"
  - "workspace-index sorts projects by STATE.md mtime descending — most recently active projects surface first"

patterns-established:
  - "Plugin extraction pattern: Vite plugins are thin wrappers; business logic lives in separate testable modules"
  - "Security pattern: all filesystem middleware validates resolved path against allowed root before responding"

requirements-completed: [DASH-03, DASH-04]

# Metrics
duration: 2min
completed: 2026-03-20
---

# Phase 4 Plan 02: Vite Server Infrastructure Summary

**Vite dev server plugins serving workspace files at /workspace/* URLs with JSON directory endpoints and auto-generating delivery/ HTML on startup using marked**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-20T12:47:48Z
- **Completed:** 2026-03-20T12:49:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `vite-plugins/generate-html.ts` as a standalone testable Node.js module with `wrapHtml()` and `generateHtmlForWorkspace()`
- Replaced empty test stubs with 4 real passing tests covering delivery/ creation, heading rendering, frontmatter stripping, and DOCTYPE output
- Replaced `vite.config.ts` stub with full implementation: `serveWorkspace()` (3 endpoint handlers) + `generateHtml()` (startup plugin)
- All 16 vitest tests pass; TypeScript compiles without errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract generateHtml logic to testable module and write passing tests** - `a9bb413` (feat)
2. **Task 2: Build vite.config.ts with serveWorkspace + JSON endpoints + generateHtml plugin** - `e040b69` (feat)

**Plan metadata:** `654f1e5` (docs: complete plan)

## Files Created/Modified

- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/dashboard/vite-plugins/generate-html.ts` - Standalone HTML generation module: wrapHtml() and generateHtmlForWorkspace()
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/dashboard/vite-plugins/generate-html.test.ts` - 4 real vitest tests with tmp dir fixture
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/dashboard/vite.config.ts` - Full implementation with serveWorkspace() and generateHtml() plugins
- `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/dashboard/tsconfig.node.json` - Added composite + emitDeclarationOnly (pre-existing config error fixed)

## Decisions Made

- Extracted Vite plugin logic to a standalone module so it can be unit-tested without a running Vite server — the Vite plugin wrappers are thin shell functions
- Added path security validation (resolved path must start with WORKSPACE_DIR) — not in the plan spec but required for correct security posture
- `workspace-index` sorts projects by `STATE.md` mtime descending so most recently active projects surface first in the dashboard

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed pre-existing tsconfig.node.json project references error**
- **Found during:** Task 2 (TypeScript type check verification)
- **Issue:** `tsconfig.node.json` lacked `"composite": true` required by TypeScript project references; `tsc --noEmit` exited with TS6306/TS6310 errors
- **Fix:** Added `"composite": true` and `"emitDeclarationOnly": true`, changed `"noEmit"` to `false`
- **Files modified:** `tsconfig.node.json`
- **Verification:** `tsc --noEmit` exits 0 with no errors; vitest suite still passes 16/16
- **Committed in:** `e040b69` (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added path security check to serveWorkspace() middleware**
- **Found during:** Task 2 (implementation review)
- **Issue:** The reference Brand Compass plugin served any /workspace/* file without validating that the resolved path stayed within WORKSPACE_DIR — a directory traversal vector
- **Fix:** Added `if (!filePath.startsWith(WORKSPACE_DIR))` guard returning 403 before any filesystem access
- **Files modified:** `vite.config.ts`
- **Verification:** Logic verified inline; path traversal attempts would be blocked at 403
- **Committed in:** `e040b69` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug/pre-existing config error, 1 missing security check)
**Impact on plan:** Both fixes necessary for correctness and security. No scope creep.

## Issues Encountered

None beyond the auto-fixed issues above.

## Next Phase Readiness

- Vite dev server infrastructure complete — React app can now fetch /workspace-index and /workspace-files/* for directory listings and /workspace/* for individual file content
- `delivery/` HTML files will be generated on every dev server startup from workspace stage directories
- Ready for Plan 04-03: React app data layer (fetch hooks, workspace state management)

---
*Phase: 04-dashboard-mvp*
*Completed: 2026-03-20*
