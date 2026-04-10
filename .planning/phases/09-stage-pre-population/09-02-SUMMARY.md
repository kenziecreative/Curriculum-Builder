---
phase: 09-stage-pre-population
plan: "02"
subsystem: intake-pipeline
tags: [pre-population, audit-mode, hook, intake, stage-sequencing]
dependency_graph:
  requires: [09-01 (test fixtures and hook unit test)]
  provides: [intake.md pre-population write block, pre-tool-use.sh pre-populated status handling]
  affects: [.claude/plugins/curriculum/commands/intake.md, .claude/hooks/pre-tool-use.sh]
tech_stack:
  added: []
  patterns: [pre-populate-then-NEEDS-marker, simultaneous-file-write, forward-looking-deny-message]
key_files:
  created: []
  modified:
    - .claude/plugins/curriculum/commands/intake.md
    - .claude/hooks/pre-tool-use.sh
decisions:
  - Pre-population steps renumbered 5-8 (inserted new Step 5 + merged STATE.md update into Step 6)
  - STATE.md update for pre-populated stages merged with Stage 1 completion into single simultaneous write
  - Stages 6-8 explicitly excluded from pre-population (require generation, not extraction)
  - Stage 5 constrained to session-manifest.md structure only (no facilitator guide content)
metrics:
  duration: "~3 minutes"
  completed: "2026-03-23"
  tasks_completed: 2
  files_modified: 2
requirements:
  - INTK-12
---

# Phase 9 Plan 02: Pre-population Write Block + Hook Update Summary

**One-liner:** Pre-population write block added to intake.md Audit Mode Step 6 extracts Exists/Shallow stage content simultaneously with NEEDS: markers; hook extended to treat `pre-populated` as a forward-looking deny with "has a draft ready" message.

## What Was Built

### Task 1 — intake.md Pre-population Write Block

Added a new **Step 5** to Audit Mode Step 6 in `.claude/plugins/curriculum/commands/intake.md`, inserted between the gap report write (Step 4) and the STATE.md update (now Step 6).

The new step provides:

- **Edge case guard:** Skips entire step if `curriculum-gap-report.md` is absent (clean intake path)
- **Gap report parsing:** Reads Summary table to determine Exists/Shallow/Missing per stage
- **Schema-guided extraction:** Loads the relevant stage schema file (stage-02 through stage-05) before writing
- **Faithful write with NEEDS: markers:** Extracts content as-is; schema violations marked inline with `# NEEDS: [description] — /curriculum:[command] will fix this` rather than auto-corrected
- **Stage-specific output targets:** Stage 2 → `01-outcomes/` (3 files), Stage 3 → `02-assessments/assessment-plan.md`, Stage 4 → `03-modules/module-{N}.md`, Stage 5 → `04-sessions/session-manifest.md` (structure only)
- **Simultaneous write:** All pre-populated files written in one pass — no progressive announces
- **Anti-patterns block:** Explicit prohibition on auto-correcting during write, announcing individual files, writing facilitator guide content for sessions, treating pre-populated as approved

Step numbering updated throughout: existing Steps 5–6 became Steps 6–8, with Step 6 (STATE.md) merged to set both Stage 1 `complete` and pre-populated stage statuses simultaneously. Step 7 is the post-intake summary table. Step 8 is the updated forward-looking message referencing pre-populated drafts.

**Post-intake summary table format:**

| Stage | What was written | Issues found |
|-------|-----------------|--------------|
| 2: Learning Outcomes | [files] | [NEEDS: count or None] |
| 3: Assessment Design | [files] | [issues or None] |
| 4: Module Structure | [files] | [issues or None] |
| 5: Session Content | session-manifest.md (structure only) | [issues or None] |
| 6: Metaskill Mapping | — (Missing — will generate fresh) | — |

### Task 2 — pre-tool-use.sh pre-populated Status Handling

Two targeted changes to `.claude/hooks/pre-tool-use.sh`:

**Change 1 — grep regex extended:**
```bash
# Before
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|complete' | head -1)

# After
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|pre-populated|complete' | head -1)
```

**Change 2 — conditional deny message:**
```bash
if [ "$PREREQ_STATUS" = "pre-populated" ]; then
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be approved first. Stage $PREREQ_NUM has a draft ready — run $PREREQ_CMD to review and approve it."
else
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be complete. Stage $PREREQ_NUM is currently ${PREREQ_STATUS:-not-started}. Run $PREREQ_CMD to finish it first."
fi
```

The `complete` exit-0 pass-through, workspace path pattern, JSON output format, and STAGE_DIR case statement are all unchanged.

## Verification Results

- `grep -c 'pre-populated' intake.md` → **5** (minimum required: 3)
- `grep 'pre-populated' pre-tool-use.sh` → shows both the regex line and the conditional message block
- `bash tests/test_pre_tool_use_pre_populated.sh` → **PASS: hook blocks write with forward-looking message when prior stage is pre-populated**
- Non-workspace path test (`/tmp/test.md`) → exits 0 (allow) — unchanged behavior confirmed

## Decisions Made

- **Renumbering approach:** Inserted new Step 5, shifted existing Steps 5–6 to Steps 6 and 8, with the STATE.md update step merging pre-populated stage status into the single simultaneous write. This avoids two separate STATE.md write instructions.
- **Simultaneous STATE.md write:** Both Stage 1 `complete` and the pre-populated stage statuses are written in one pass to maintain the one-pass rule established in Phase 5.
- **Stages 6–8 excluded:** Metaskill Mapping, Transfer Ecosystem, and Marketing require generation from scratch — not extraction from source materials. Explicitly excluded to prevent false confidence from thin source-material signals.
- **Stage 5 manifest-only:** Session content pre-population is strictly `session-manifest.md` structure — no facilitator guide, no participant materials, no slide outlines.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- FOUND: .claude/plugins/curriculum/commands/intake.md (modified)
- FOUND: .claude/hooks/pre-tool-use.sh (modified)
- FOUND: commit f5de47c (Task 1)
- FOUND: commit 99dd919 (Task 2)
- FOUND: test passes — `bash tests/test_pre_tool_use_pre_populated.sh` outputs single PASS line
