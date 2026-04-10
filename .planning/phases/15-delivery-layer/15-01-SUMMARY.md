---
phase: 15-delivery-layer
plan: 01
subsystem: infra
tags: [vite, markdown, html, node, vitest]

# Dependency graph
requires:
  - phase: 11-infrastructure
    provides: Dashboard Vite dev server with workspace serving and generate-html plugin skeleton
provides:
  - Fixed generateHtmlForWorkspace with session subdirectory recursion (withFileTypes)
  - handleHotUpdate hook wiring — workspace .md writes auto-trigger HTML regen without server restart
  - generate-html.js standalone CJS script scoped to facilitator guides + marketing files
  - Test coverage for 04-sessions/{session}/facilitator-guide.md -> delivery/{session}/facilitator-guide.html path
affects: [15-delivery-layer/15-02, assemble.md]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "withFileTypes recursion: readdirSync with withFileTypes to distinguish files from subdirectories in stage dirs"
    - "Scoped standalone script: generate-html.js duplicates wrapHtml inline to stay self-contained for Bash invocation"
    - "handleHotUpdate gate: startsWith(WORKSPACE_DIR) not includes() to prevent false matches on path substrings"

key-files:
  created:
    - .claude/plugins/curriculum/scripts/generate-html.js
  modified:
    - dashboard/vite-plugins/generate-html.ts
    - dashboard/vite-plugins/generate-html.test.ts
    - dashboard/vite.config.ts

key-decisions:
  - "generate-html.js duplicates wrapHtml() inline rather than importing from generate-html.ts — keeps script self-contained for Bash invocation without build step"
  - "Scoped HTML generation: standalone script only produces facilitator-guide.html and marketing HTML — not all stage files — so delivery/ stays lean for the assembly package"
  - "handleHotUpdate uses startsWith(WORKSPACE_DIR) not includes() to avoid false matches on path substrings"

patterns-established:
  - "withFileTypes recursion: use readdirSync with { withFileTypes: true } and branch isFile vs isDirectory for stage dirs that may contain session subdirs"

requirements-completed: [DLVR-02]

# Metrics
duration: 2min
completed: 2026-03-25
---

# Phase 15 Plan 01: HTML Generator Subdirectory Recursion + Standalone Script Summary

**Fixed silent session HTML generation bug via withFileTypes recursion, wired handleHotUpdate auto-rebuild, and created scoped standalone generate-html.js for assembly-time delivery packaging**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T20:21:19Z
- **Completed:** 2026-03-25T20:23:05Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Session subdirectory files (04-sessions/session-1/facilitator-guide.md) now produce HTML at delivery/session-1/facilitator-guide.html — the silent skip bug is fixed
- Workspace markdown writes auto-trigger HTML regen via handleHotUpdate without dev server restart
- Standalone generate-html.js script created — called by assemble.md via Bash, scoped to facilitator guides + marketing files only, exits 0/1 cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Add failing session subdirectory test** - `3a4fe57` (test)
2. **Task 1 GREEN: Fix recursion bug in generateHtmlForWorkspace** - `8878573` (feat)
3. **Task 2: Wire handleHotUpdate + create generate-html.js** - `0470fa4` (feat)

_Note: TDD task had RED + GREEN commits per TDD protocol_

## Files Created/Modified

- `dashboard/vite-plugins/generate-html.ts` - Fixed generateHtmlForWorkspace: flat .md files + subdirectory recursion with withFileTypes
- `dashboard/vite-plugins/generate-html.test.ts` - Added session subdirectory test (delivery/session-1/facilitator-guide.html)
- `dashboard/vite.config.ts` - Added handleHotUpdate to generateHtml() plugin
- `.claude/plugins/curriculum/scripts/generate-html.js` - Self-contained CJS script for assembly-time HTML generation

## Decisions Made

- `generate-html.js` duplicates `wrapHtml()` inline (same CSS) rather than importing from the TypeScript source — keeps the script runnable via Bash without a build step
- Standalone script scope is deliberately narrow (facilitator guides + marketing only) so the delivery package contains only facilitator-facing and marketing-facing HTML, not internal working docs
- `handleHotUpdate` uses `startsWith(WORKSPACE_DIR)` not `includes()` to avoid false positives on path substrings

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- generate-html.ts and generate-html.js are ready for Plan 02 (assemble.md) to depend on
- assemble.md can call: `node .claude/plugins/curriculum/scripts/generate-html.js {workspacePath} {projectName}`
- Output paths mirror the delivery/ structure Plan 02 will establish

---
*Phase: 15-delivery-layer*
*Completed: 2026-03-25*
