---
phase: 11-infrastructure
plan: 01
subsystem: infra
tags: [git, bash, vite, deployment, dashboard]

# Dependency graph
requires: []
provides:
  - Clone-and-run deployment model (no install script)
  - workspace/.gitkeep for tracked empty workspace directory
  - WORKSPACE_DIR env var support in dashboard vite.config.ts
  - Dashboard launch command in /curriculum:init output (step 5b)
  - scripts/release.sh for VERSION-based git tag and push
affects: [12, 13, 14, 15]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SCRIPT_DIR portable path pattern for bash scripts (cd dirname BASH_SOURCE[0])"
    - "process.env.WORKSPACE_DIR with path.resolve fallback in vite config"

key-files:
  created:
    - workspace/.gitkeep
    - scripts/release.sh
  modified:
    - README.md
    - .gitignore
    - dashboard/vite.config.ts
    - .claude/plugins/curriculum/commands/init.md

key-decisions:
  - "install.sh deleted entirely — not deprecated, not stubbed, gone"
  - "WORKSPACE_DIR override pattern documented in README only, not surfaced in /curriculum:init output"
  - "workspace/.gitkeep tracked via workspace/* + !workspace/.gitkeep pattern in .gitignore"
  - ".planning/ added to .gitignore so planning artifacts stay out of the public repo"

patterns-established:
  - "Release automation: read VERSION file, check uncommitted changes, check tag exists, tag + push main + push tag"

requirements-completed: [INFR-01, INFR-02, INFR-03]

# Metrics
duration: 12min
completed: 2026-03-25
---

# Phase 11 Plan 01: Infrastructure Summary

**Clone-and-run deployment replacing install.sh: git remote remove origin then /curriculum:init, dashboard WORKSPACE_DIR override, and scripts/release.sh with VERSION-based tagging**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:12:00Z
- **Tasks:** 3
- **Files modified:** 6 (4 modified, 2 created, 1 deleted)

## Accomplishments

- Deleted scripts/install.sh and replaced the entire distribution model with clone-and-run
- Updated README Installation section: four required steps including `git remote remove origin` as a named required step, plus Dashboard section with `WORKSPACE_DIR` override
- Updated .gitignore: `workspace/*` + `!workspace/.gitkeep` to track empty directory while ignoring runtime content; `.planning/` added to keep planning artifacts out of public repo
- Added WORKSPACE_DIR env var support to dashboard/vite.config.ts with fallback to ../workspace
- Inserted step 5b in /curriculum:init showing `cd dashboard && npm run dev` before the step 6 confirmation
- Created scripts/release.sh with uncommitted-change check, duplicate-tag check, git tag, push main, push tag

## Task Commits

Each task was committed atomically:

1. **Task 1: Clone-and-run deployment model (INFR-01)** - `2016b65` (feat)
2. **Task 2: Dashboard WORKSPACE_DIR env var and init launch command (INFR-02)** - `0832331` (feat)
3. **Task 3: Release script (INFR-03)** - `73176c0` (feat)

## Files Created/Modified

- `README.md` - Rewrote Installation section to clone-and-run model; added Dashboard section; updated Starting a project section
- `.gitignore` - Changed `workspace/` to `workspace/*` + `!workspace/.gitkeep`; added `.planning/`
- `workspace/.gitkeep` - Empty tracked file to anchor workspace directory in git
- `dashboard/vite.config.ts` - WORKSPACE_DIR constant now reads process.env.WORKSPACE_DIR first, falls back to ../workspace
- `.claude/plugins/curriculum/commands/init.md` - Inserted step 5b before step 6 to output dashboard launch command
- `scripts/release.sh` - New release automation script (executable)
- `scripts/install.sh` - Deleted

## Decisions Made

- install.sh deleted entirely — no deprecation comment, no stub. The old distribution model is gone.
- WORKSPACE_DIR override pattern (`WORKSPACE_DIR=/path npm run dev`) documented in README Dashboard section only; not surfaced in `/curriculum:init` output per plan spec.
- `.planning/` gitignored so planning artifacts don't appear in the public repo that users clone.
- Release script checks for uncommitted changes and duplicate tags before tagging — exits with error rather than partial-state recovery.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 11 complete. All infrastructure prerequisites for the remaining phases are in place.
- Users can now clone the repo, run `git remote remove origin`, open Claude Code, and run `/curriculum:init` without any additional setup.
- Dashboard env var support enables pointing the dashboard at any workspace location.
- Release workflow is ready for use when shipping new versions.

---
*Phase: 11-infrastructure*
*Completed: 2026-03-25*
