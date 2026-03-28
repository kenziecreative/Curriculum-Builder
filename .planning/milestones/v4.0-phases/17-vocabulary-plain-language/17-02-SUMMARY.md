---
phase: 17-vocabulary-plain-language
plan: "02"
subsystem: curriculum-commands
tags: [vocabulary, plain-language, templates, jargon-removal, enforcement]
dependency_graph:
  requires: [17-01]
  provides: [VOCAB-01, VOCAB-04, VOCAB-05]
  affects: [approve.md, transfer.md, assessments.md, modules.md, marketing.md, session-generator.md]
tech_stack:
  added: []
  patterns: [three-layer-vocabulary-enforcement, never-say-list, inline-guardrail, html-comment-for-internal-fields]
key_files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/transfer.md
    - .claude/plugins/curriculum/commands/assessments.md
    - .claude/plugins/curriculum/commands/modules.md
    - .claude/plugins/curriculum/commands/marketing.md
    - .claude/plugins/curriculum/agents/session-generator.md
decisions:
  - "Never-say table in approve.md includes 11 entries covering all prohibited terms that could appear in final gate summary"
  - "curriculum_traceability replaced with source_link in marketing.md generation instructions — schema field name survives in the actual schema file; the hint describes purpose without the prohibited term"
  - "MO-2-4 in modules.md transparency note replaced alongside the plan-targeted MO-2-3/FA-4 in assessments.md — same class of leak"
  - "FA-3 in assessments.md delivery format check also replaced — full-scan approach caught what targeted approach would have missed"
metrics:
  duration_minutes: 15
  completed_date: "2026-03-26"
  tasks_completed: 3
  files_modified: 6
---

# Phase 17 Plan 02: Vocabulary — Templates and Enforcement Summary

Three-layer vocabulary enforcement added to approve.md; Kirkpatrick, ID codes, and prohibited schema terms removed from every template bracket and generation hint across six command files.

## What Was Built

**approve.md** — Three-layer vocabulary enforcement:
1. Existing curriculum-voice.md reference (Layer 1, from Plan 01)
2. New Critical inline guardrail listing 11 prohibited terms (Layer 2)
3. New Never-say List section with table of prohibited terms and plain-language replacements (Layer 3)
4. Template fix: "plain-language Kirkpatrick level" replaced with "measurement approach, e.g., behavior change on the job"

**transfer.md** — Three fixes:
- Gate summary template: `[Plain-language Kirkpatrick level, e.g., "Behavior change"]` replaced with `[Measurement approach, e.g., "Behavior change on the job"]`
- Translation block: "Plain-language Kirkpatrick translations" renamed to "Measurement approach translations" with framework level labels removed
- File write section: "no Kirkpatrick level labels" replaced with "no measurement framework labels"

**assessments.md** — Two fixes:
- Transparency note example: `MO-2-3` and `FA-4` ID codes replaced with plain-language descriptions ("your third module outcome about data analysis", "the check-in activity for module 4")
- Delivery format check example: `FA-3` ID code replaced with "the module 2 check-in"

**modules.md** — Two fixes:
- Core thinking skill section template: `**Primary metaskill:**` replaced with `**Core thinking skill:**`
- Transparency note example: `MO-2-4` ID code replaced with "a missing outcome"

**marketing.md** — Four fixes:
- Traceability constraint instruction: `curriculum_traceability object` replaced with `source_link object showing where each claim comes from`
- Audience positioning instruction: `` `curriculum_traceability` pointing to stage-01 `` replaced with "source link pointing to the stage-01"
- Learning promises instruction: "Bloom's level" replaced with "thinking level"
- Duration scaling rules (lines 79 and 84): `curriculum_traceability` field references replaced with "source link (where each claim comes from)"

**session-generator.md** — One fix:
- Session template: `**parent_module_id:** [M-N]` converted to `<!-- internal: parent_module_id=[M-N] -->` — now consistent with the post-write verification rule already enforcing this conversion

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing coverage] Replaced additional MO-X-X code in modules.md transparency note**
- **Found during:** Task 2 full-scan verification
- **Issue:** modules.md line 213 used `MO-2-4` as an example in the transparency note — same class of jargon leak as the plan-targeted `MO-2-3`/`FA-4` in assessments.md
- **Fix:** Replaced `MO-2-4` with plain-language description "a missing outcome"
- **Files modified:** .claude/plugins/curriculum/commands/modules.md
- **Commit:** 0cdc416

**2. [Rule 2 - Missing coverage] Replaced FA-3 ID code in assessments.md delivery format check**
- **Found during:** Task 3 full-scan verification
- **Issue:** assessments.md line 134 used `FA-3` in an internal processing instruction example — consistent with the ID code removal goal
- **Fix:** Replaced `FA-3` with "the module 2 check-in"
- **Files modified:** .claude/plugins/curriculum/commands/assessments.md
- **Commit:** 0cdc416

**3. [Rule 2 - Missing coverage] Replaced curriculum_traceability in duration scaling rules in marketing.md**
- **Found during:** Task 3 verification scan
- **Issue:** Lines 79 and 84 in duration scaling still referenced `curriculum_traceability` — the plan identified lines 95 and 101, but the scan found two more instances
- **Fix:** Replaced with "source link (where each claim comes from)"
- **Files modified:** .claude/plugins/curriculum/commands/marketing.md
- **Commit:** 0cdc416

## Self-Check: PASSED

- FOUND: .claude/plugins/curriculum/commands/approve.md
- FOUND: .claude/plugins/curriculum/commands/transfer.md
- FOUND: .claude/plugins/curriculum/commands/assessments.md
- FOUND: .claude/plugins/curriculum/commands/modules.md
- FOUND: .claude/plugins/curriculum/commands/marketing.md
- FOUND: .claude/plugins/curriculum/agents/session-generator.md
- FOUND commit: ac52e51 (approve.md three-layer enforcement)
- FOUND commit: 5aae81c (template jargon in transfer, assessments, modules, session-generator)
- FOUND commit: 0cdc416 (marketing.md sanitization and remaining ID code fixes)
