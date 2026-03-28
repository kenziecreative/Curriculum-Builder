---
phase: 18-stage-guidance
plan: "02"
subsystem: validation-output
tags: [validate, verify, plain-language, sme-facing, what-why]
dependency_graph:
  requires: []
  provides: [GUIDE-02]
  affects: [validate.md, verify.md]
tech_stack:
  added: []
  patterns: [what+why em-dash pattern for constraint failure messages]
key_files:
  modified:
    - .claude/plugins/curriculum/commands/validate.md
    - .claude/plugins/curriculum/commands/verify.md
decisions:
  - "Em-dash separator chosen over comma or semicolon for combining what+why in failure lines — reads as one idea with two parts rather than two separate statements"
  - "Check A descriptions use stage-name prefix ('outcomes content not yet generated') for clarity about which stage is missing"
  - "T1-08 translated to 'check-in assessment' instead of 'formative assessment' — matches curriculum-voice.md never-say table"
metrics:
  duration_minutes: 8
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_modified: 2
---

# Phase 18 Plan 02: What + Why Constraint Explanations Summary

**One-liner:** Constraint check messages now combine what failed with why it matters in one sentence — every T1 check and every verify issue tells SMEs the practical consequence, not just the finding.

## What Was Built

Both validation commands extended to carry "why it matters" alongside every check finding.

**validate.md:** Translation table restructured from 2 columns (Check ID, Plain language) to 3 columns (Check ID, What was checked, Why it matters). Failure presentation instruction updated to combine both columns with an em dash: `{what was checked} — {why it matters}`. All 18 T1 checks have a populated "why" clause.

**verify.md:** Check A missing-file descriptions updated for all 6 stages — each now explains the practical consequence of the missing content. Check B descriptions (B1, B2, B3) updated to explain why each issue would cause problems for facilitators or learners rather than just naming the issue.

## Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Extend validate.md translation table with why-it-matters clauses | 573f49e | .claude/plugins/curriculum/commands/validate.md |
| 2 | Add significance explanations to verify.md check descriptions | 4d60d08 | .claude/plugins/curriculum/commands/verify.md |

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

- Em-dash separator for combining what+why in failure lines
- Check A descriptions use stage-name prefix for clarity
- T1-08 uses "check-in assessment" to match curriculum-voice.md never-say table

## Self-Check: PASSED

- .claude/plugins/curriculum/commands/validate.md — found, updated
- .claude/plugins/curriculum/commands/verify.md — found, updated
- git log confirms 573f49e and 4d60d08 both exist
