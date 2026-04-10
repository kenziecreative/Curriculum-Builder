---
phase: 13-command-retrofit
plan: 04
subsystem: curriculum-plugin
tags: [session-generator, facilitator-guide, slide-outline, output-format, pedagogy]

requires:
  - phase: 13-01
    provides: voice guardrails and prohibited-term baseline for session-generator.md

provides:
  - slide-outline.md three-field prose block format (On screen / Why it matters / Facilitator)
  - Watch for / What it means / Your move diagnostic structure in facilitator notes
  - TMA arc label suppression in session.md section headers
  - Full objective text alongside IDs in session.md
  - Pre-write cleanup sequence (HTML comment strip, working notes strip, NEEDS: marker check) for all four output files
  - session_template field removed from written session.md output

affects:
  - phase-14-audit
  - session-generator.md agent outputs

tech-stack:
  added: []
  patterns:
    - "Three-field slide blocks: On screen / Why it matters / Facilitator replace table-format outlines"
    - "Diagnostic facilitator notes: Watch for / What it means / Your move replace single-line stumbling point format"
    - "Plain descriptive section headers in session.md — never TMA arc vocabulary as headings"
    - "Pre-write cleanup as explicit steps in write sequence, not general guidelines"

key-files:
  created: []
  modified:
    - .claude/plugins/curriculum/agents/session-generator.md

key-decisions:
  - "Slide outline becomes production direction, not content inventory — three fields per slide give facilitator what to show, why it's there, and what to say"
  - "Diagnostic stumbling point blocks use observable behavior language — Watch for describes what facilitator can see/hear, not internal learner states"
  - "session_template field excluded from written session.md — internal generation context only, not facilitator-facing metadata"
  - "Pre-write cleanup made explicit in the write sequence to ensure strip instructions fire before every file write, not as general guidance that can be skipped"

patterns-established:
  - "Output format changes are encoded in agent generation templates, not schema — schema field definitions are unchanged"
  - "Never-write instructions reference prohibited terms by name in 'never use' framing — matches are acceptable in avoidance instructions, not in output templates"

requirements-completed: [QUAL-01, QUAL-02, QUAL-05, QUAL-06, QUAL-07, QUAL-08, QUAL-09]

duration: 2min
completed: 2026-03-25
---

# Phase 13 Plan 04: Session Generator Output Reform Summary

**session-generator.md fully reformed: slide outlines now produce three-field production direction blocks, facilitator notes use Watch for / What it means / Your move diagnostic structure, session.md section headers drop all TMA arc vocabulary, and a pre-write cleanup sequence strips HTML comments and blocks file writes containing unresolved NEEDS: markers**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T14:09:38Z
- **Completed:** 2026-03-25T14:11:39Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced slide-outline.md table format (Section | TMA Phase | Slides | Purpose) with three-field prose blocks that give facilitators production direction per slide
- Replaced numbered stumbling-point list with diagnostic blocks that describe observable behavior, interpret what it signals, and specify a facilitation move
- Removed all TMA arc labels (ACTIVATE, THEORY, CHECK, METHOD, PRACTICE, REFLECT, TRANSFER, DCR) from session.md section headers and replaced with plain descriptive labels
- Added instruction to include full objective text from learning-objectives.md alongside each ID in session.md
- Removed session_template field from session.md written output (internal generation context only)
- Added explicit pre-write cleanup sequence covering all four output files: strip HTML comments, strip working notes, block writes if NEEDS: markers remain

## Task Commits

1. **Task 1: Replace slide-outline.md template and strip facilitator-guide.md header fields** - `52c1ee5` (feat)
2. **Task 2: Upgrade facilitator notes, fix session.md headers, add pre-write cleanup** - `0649b3c` (feat)

## Files Created/Modified

- `.claude/plugins/curriculum/agents/session-generator.md` — Six format changes applied: new slide outline template, facilitator-guide header stripped of Template/TMA Phases fields, diagnostic stumbling point structure, plain section headers in session.md, full objective text instruction, pre-write cleanup sequence

## Decisions Made

- Slide outline becomes production direction, not content inventory — three fields per slide give facilitator what to show, why it's there, and what to say
- Diagnostic stumbling point blocks use observable behavior language — Watch for describes what facilitator can see/hear, not internal learner states
- session_template field excluded from written session.md — internal generation context only, not facilitator-facing metadata
- Pre-write cleanup made explicit in the write sequence to ensure strip instructions fire before every file write, not as general guidance that can be skipped

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- session-generator.md is the highest-volume output command in the pipeline — all six format changes applied in one pass
- Phase 13 command retrofit is complete across Plans 01-04
- Phase 14 audit can now validate output quality across all reformed commands

---
*Phase: 13-command-retrofit*
*Completed: 2026-03-25*
