---
phase: 13-command-retrofit
plan: 02
subsystem: curriculum-plugin
tags: [marketing, copywriting, PAS, DOS, VOC, prose-output]

requires:
  - phase: 12-voice-system
    provides: curriculum-voice.md reference file and per-command inline guardrails
provides:
  - marketing.md write instruction producing markdown prose file (not YAML)
  - Four-section prose format: Program Description, Learning Promises, Audience Fit, Source Traceability
  - PAS/DOS/VOC generation frameworks in marketing command
  - stage-08-marketing.md Write Format section clarifying field definitions are generation-only, not output keys
affects: [stage-08-marketing, marketing-package output, curriculum:approve, stage-09-validation]

tech-stack:
  added: []
  patterns:
    - "Prose-first output: marketing artifacts written as copy-paste-ready markdown, not schema-structured YAML"
    - "Separation of concerns: schema defines constraints, command defines output format"
    - "Traceability-at-bottom: audit table always after separator, never inline with copy"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/marketing.md
    - .claude/reference/schemas/stage-08-marketing.md

key-decisions:
  - "Traceability table uses Claim|Source|Strength columns (High/Medium/Low strength vs direct/inferred/adjacent in schema) — display format simplified for SME readability"
  - "PAS/DOS/VOC added as generation-section frameworks, not Persona vocabulary rules — Persona already has strong inline guardrails from Phase 12"
  - "Schema field definitions stay intact — only the write instruction and write note change; schema is generation context, not output structure"

patterns-established:
  - "Write instruction pattern: markdown prose file structure with explicit section headers and example placeholder text"
  - "Duration-tier omission rule: explicitly call out which sections to omit for shorter programs (e.g., Audience Fit for 90-min)"

requirements-completed: [QUAL-03, QUAL-09]

duration: 1min
completed: 2026-03-25
---

# Phase 13 Plan 02: Marketing Prose Output Summary

**marketing.md write instruction upgraded from YAML records to four-section markdown prose with PAS/DOS/VOC copywriting frameworks and bottom-only traceability table**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-25T14:04:15Z
- **Completed:** 2026-03-25T14:05:14Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Replaced YAML write instruction in marketing.md with markdown prose file structure (four sections: Program Description, Learning Promises, Audience Fit, Source Traceability)
- Added PAS/DOS/VOC writing framework instructions to the generation section — structural copywriting guidance without touching the Persona
- Traceability table positioned after horizontal rule separator, explicitly called out as never inline with prose
- Added Write Format section to stage-08-marketing.md schema clarifying field definitions are generation constraints, not YAML keys in the output file

## Task Commits

Each task was committed atomically:

1. **Task 1: Update marketing.md write instruction and add PAS/DOS/VOC generation guidance** - `adbe046` (feat)
2. **Task 2: Update stage-08-marketing.md write note to match prose format** - `f783bd2` (feat)

## Files Created/Modified
- `.claude/plugins/curriculum/commands/marketing.md` — Write instruction replaced with markdown prose format; PAS/DOS/VOC frameworks added to generation section
- `.claude/reference/schemas/stage-08-marketing.md` — Output Files entry updated; Write Format section added

## Decisions Made
- Traceability table strength column uses High/Medium/Low (not direct/inferred/adjacent from schema) — the schema enum is for internal generation tracking; the display table is for SME readability, consistent with plain-language principle
- PAS/DOS/VOC placed in generation section (not Persona) — Persona already has strong Phase 12 guardrails; writing frameworks are structural, not voice
- Schema field definitions left intact — they define generation constraints correctly; only the write note changes to clarify the output file format

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Schema file path mismatch**
- **Found during:** Task 2
- **Issue:** Plan referenced `.claude/schemas/stage-08-marketing.md` but file lives at `.claude/reference/schemas/stage-08-marketing.md` (matching the load path already in marketing.md line 60)
- **Fix:** Used correct path `.claude/reference/schemas/stage-08-marketing.md` — no file content change needed, path correction only
- **Files modified:** None (path correction in execution, not file)
- **Verification:** File read successfully at correct path
- **Committed in:** f783bd2 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (path resolution)
**Impact on plan:** No scope change. Path was already consistent in the codebase; plan had a typo.

## Issues Encountered
None beyond the schema path mismatch above.

## Next Phase Readiness
- marketing.md now produces copy-paste-ready prose output — no SME translation step required
- stage-08-marketing.md schema is unchanged structurally; generation constraints remain valid
- Phase 13 complete — both 13-01 (command retrofit) and 13-02 (marketing prose) done

---
*Phase: 13-command-retrofit*
*Completed: 2026-03-25*
