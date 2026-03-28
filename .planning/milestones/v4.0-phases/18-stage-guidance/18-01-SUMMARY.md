---
phase: 18-stage-guidance
plan: "01"
subsystem: review-gates
tags: [sme-guidance, self-check, plain-language, approve, assessments]
dependency_graph:
  requires: []
  provides: [self-check questions at all three review gates, natural thinking-level language in approve.md]
  affects: [approve.md, assessments.md]
tech_stack:
  added: []
  patterns: [self-check block before AskUserQuestion, blockquote display for user-facing self-check content]
key_files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/approve.md
    - .claude/plugins/curriculum/commands/assessments.md
decisions:
  - "Self-check questions use concrete job-readiness language, not evaluation criteria — questions ask what an SME would naturally ask a colleague, not what an ID professional would check"
  - "Post-assessment gate questions focus on individual assessments; final validation gate questions focus on the whole package — distinct question sets for distinct review scopes"
  - "assessments.md self-check displays as a blockquote (> prefix) so it renders as conversation output, not command file structure"
  - "Bloom span replaced with 'building from X to Y' instruction pattern — agent fills in natural descriptions of learner activity, never taxonomy labels"
metrics:
  duration: 98s
  completed: 2026-03-27
  tasks_completed: 2
  files_modified: 2
---

# Phase 18 Plan 01: SME Self-Check Questions Summary

**One-liner:** Static self-check questions added to all three review gates and Bloom taxonomy labels replaced with natural activity descriptions so SMEs can evaluate curriculum quality without instructional design training.

## What Was Built

Two command files updated to give SMEs a sharp-colleague evaluation framework at every review gate.

**approve.md — three changes:**

1. Post-Assessment gate self-check block: four questions between the assessment summary and the gate decision, covering job-task alignment, full-skill coverage, and formative pacing.

2. Final Validation gate self-check block: four questions between the complete package summary and the gate decision, covering facilitator handoff readiness, marketing-to-assessment alignment, participant experience, and promise coverage.

3. Bloom span label replaced: `spanning [Bloom span in plain language, e.g., "recall through create"] thinking levels` is now `building from [natural description of lowest thinking level activities] to [natural description of highest thinking level activities]` with an embedded instruction block showing examples of the correct pattern.

**assessments.md — one change:**

PIPE-05 gate self-check block: four questions displayed as a blockquote between the STATE.md update instruction and the AskUserQuestion call. Questions cover day-one usability, unsupervised-work readiness, missing critical skills, and early problem detection.

## Success Criteria Verification

- All three review gates have 3-4 self-check questions: Yes (Post-Assessment in approve.md: 4 questions; Final Validation in approve.md: 4 questions; PIPE-05 in assessments.md: 4 questions)
- Questions positioned after content summary and before decision options: Yes
- No Bloom taxonomy labels in approve.md user-visible output: Yes (Bloom references exist only in the Never-say table, which is enforcement instruction, not user output)
- Thinking-level span uses natural activity descriptions: Yes ("building from X to Y" pattern with examples)
- All new text passes curriculum-voice.md vocabulary rules: Yes (verified against never-say list — no prohibited terms in added content)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- `.claude/plugins/curriculum/commands/approve.md` — FOUND (modified, 2 self-check blocks + Bloom label fix)
- `.claude/plugins/curriculum/commands/assessments.md` — FOUND (modified, 1 self-check block)
- Commit `59ebda0` — approve.md Task 1
- Commit `7e607e3` — assessments.md Task 2

## Self-Check: PASSED
