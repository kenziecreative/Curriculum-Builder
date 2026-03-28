---
phase: 18-stage-guidance
plan: "03"
subsystem: plugin-commands
tags: [curriculum-plugin, directory-numbering, backward-compatibility, auto-detection]

requires:
  - phase: 18-01
    provides: stage gate guidance patterns established in commands
  - phase: 18-02
    provides: validate.md failure message format and self-check language

provides:
  - New projects get 01-09 directory numbering matching stage numbers 1-9
  - All 14 commands auto-detect 00-08 (legacy) vs 01-09 (new) workspace scheme
  - Scaffold template documents new numbering with migration note

affects:
  - any new /curriculum:init usage (creates 01-09 directories)
  - all command files (auto-detection is additive, existing behavior preserved)

tech-stack:
  added: []
  patterns:
    - "Auto-detection pattern: check 00-project-brief vs 01-project-brief to route all subsequent directory references"
    - "Additive-only change: detection block inserted, no existing references rewritten"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/init.md
    - templates/project-scaffold/.gitkeep-dirs
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/assemble.md
    - .claude/plugins/curriculum/commands/assessments.md
    - .claude/plugins/curriculum/commands/evaluation-mode.md
    - .claude/plugins/curriculum/commands/intake.md
    - .claude/plugins/curriculum/commands/marketing.md
    - .claude/plugins/curriculum/commands/metaskills.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/outcomes.md
    - .claude/plugins/curriculum/commands/resume.md
    - .claude/plugins/curriculum/commands/sessions.md
    - .claude/plugins/curriculum/commands/transfer.md
    - .claude/plugins/curriculum/commands/validate.md
    - .claude/plugins/curriculum/commands/verify.md

key-decisions:
  - "Auto-detection is additive: existing directory references (e.g., 02-assessments/) remain unchanged as the default (legacy) pattern — the detection block tells Claude which mapping to use"
  - "Detection pivot: checking for 00-project-brief vs 01-project-brief is the canonical signal for which scheme a workspace uses"

patterns-established:
  - "Directory scheme detection block: inserted after workspace/{project} is identified, before any stage directory is referenced"

requirements-completed: [DEVL-03]

duration: 4min
completed: 2026-03-27
---

# Phase 18 Plan 03: Stage Numbering Normalization Summary

**01-09 directory numbering for new projects with backward-compatible auto-detection across all 15 commands**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-27T02:37:44Z
- **Completed:** 2026-03-27T02:41:30Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments

- init.md updated to create 01-09 directories for new projects, eliminating the "Stage 1 but directory 00" mismatch SMEs would see
- All 14 command files updated with identical auto-detection block — one check resolves which scheme a workspace uses, then a mapping table covers all 9 stages
- Scaffold template .gitkeep-dirs updated with new numbering and a note explaining the dual-scheme situation
- STATE.md template confirmed unchanged — already uses Stage 1-9 numbers, no mismatch

## Task Commits

1. **Task 1: Update init.md and scaffold template for 01-09 directory numbering** - `b881543` (feat)
2. **Task 2: Add auto-detection to all commands for 00-08 vs 01-09 directory paths** - `7987ff5` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/commands/init.md` — directory list changed from 00-08 to 01-09
- `templates/project-scaffold/.gitkeep-dirs` — table and directory listing updated to 01-09, notes added about legacy scheme
- `.claude/plugins/curriculum/commands/approve.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/assemble.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/assessments.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/evaluation-mode.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/intake.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/marketing.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/metaskills.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/modules.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/outcomes.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/resume.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/sessions.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/transfer.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/validate.md` — Directory scheme detection block added
- `.claude/plugins/curriculum/commands/verify.md` — Directory scheme detection block added

## Decisions Made

- Auto-detection is additive: the detection block tells Claude which scheme to use, but existing directory references (e.g., `02-assessments/`) in each command remain unchanged and serve as the default (legacy) mapping target. This avoids a large mechanical rewrite of every path in every file.
- The canonical detection signal is presence of `00-project-brief/` vs `01-project-brief/` — any workspace either has one or the other, so this is unambiguous.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Self-Check: PASSED

Files verified:
- `.claude/plugins/curriculum/commands/init.md` — contains "01-project-brief"
- `templates/project-scaffold/.gitkeep-dirs` — contains "01-project-brief" (2 occurrences)
- All 14 command files — confirmed "Directory scheme detection" present in each
- `templates/project-scaffold/STATE.md` — confirmed uses Stage 1-9 numbering, unchanged

Commits verified:
- b881543 — Task 1 commit present
- 7987ff5 — Task 2 commit present

## Next Phase Readiness

Phase 18 plan 03 completes the stage numbering normalization (DEVL-03). New projects will no longer have a numbering gap between the STATE.md stage table (1-9) and the workspace directories (previously 00-08). Existing workspaces continue working without modification.

---
*Phase: 18-stage-guidance*
*Completed: 2026-03-27*
