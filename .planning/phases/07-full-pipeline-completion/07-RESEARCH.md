# Phase 7: Full Pipeline Completion - Research

**Researched:** 2026-03-22
**Domain:** Claude Code command authoring, PreToolUse hook implementation, curriculum generation (metaskills / transfer / marketing)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Command chaining and auto-advance**
- Auto-chain: validate → metaskills → transfer → marketing runs as one autonomous pipeline after `/knz-sessions` completes
- Chain fires ONLY when Tier 1 validation is clean (zero Tier 1 failures) — failures stop the chain with a clear "Fix these before continuing" message
- No review gates between Stages 6–8 — consistent with PIPE-07 (autonomous middle stages)
- Final `/knz-approve` gate presents a full pipeline summary before marking package delivery-ready
- Final gate summary format: program overview (intake), outcome count + Bloom distribution, assessment count, module/session count, metaskill activation coverage, transfer layer summary, marketing element count, validation status — one consolidated scannable view

**`/knz-metaskills` generation**
- Infer-and-review pattern — silent generation, output shown, AskUserQuestion gate, free-text flag → full regeneration, write on approval
- Carries forward all prior command patterns: silent STATE.md updates, plain language, no ID vocabulary

**`/knz-transfer` generation**
- Summary gate pattern (like `/knz-modules`): compact summary presented before writing files
- Key field to surface at gate: evaluation design — Kirkpatrick level and what's being measured
- Secondary summary elements: pre-program setup, in-program application count, post-program spaced retrieval schedule + peer accountability structure
- Gate options: approve / flag an issue / start over (consistent with Phase 3/5 pattern)
- Files written on approval (not before)
- Community of Practice: scale down for short programs but never omit — 90-min gets lightweight version using simplified continuation_design, not skipped

**`/knz-marketing` generation**
- Voice: genuinely compelling, write-to-enroll — the traceability constraint prevents puffery; within that constraint, persuasive framing is intentional
- Audience positioning: behavioral description translated into warm enrollment language in `content` field; schema language preserved in `curriculum_traceability` fields
- Traceability display at final gate: adjacent footnote style — clean marketing copy shown first, compact evidence note below each element ("→ Source: stage-02 OBJ-03 (Apply)")
- Infer-and-review pattern — no separate gate; final delivery gate covers review

**PreToolUse hook**
- Watches: Write and Edit tool calls where the file path contains `workspace/{project}/0N-*` stage directories
- Logic: intercept → parse stage number from path → check if preceding stage is marked complete in STATE.md → block if not
- Block message format: "Stage N ([Stage Name]) requires Stage N-1 to be complete. Stage N-1 is currently [status]. Run /knz-[command] to finish it first."
- Coverage: all nine stages uniformly — one hook, complete enforcement from Stage 1 through Stage 8

### Claude's Discretion
- Exact subagent implementation for any parallel generation within Stages 6–8 (if needed)
- Detailed formatting within metaskill activation output (how thinking routines are presented)
- How the chain communicates progress between stages during autonomous run (per-stage completion lines vs. single completion message)
- Whether /knz-metaskills, /knz-transfer, /knz-marketing run fully autonomously in sequence or user can see per-stage completion during the chain
- How PreToolUse hook reads STATE.md (shell script vs. node helper vs. inline parse)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PIPE-06 | Human review gate at final validation with full package summary before delivery-ready approval | `/knz-approve` extended with full pipeline summary from all stage outputs; infer-and-review pattern from prior commands |
| PIPE-07 | Pipeline stages 4-8 run autonomously without human intervention after assessment gate | Auto-chain from validate → metaskills → transfer → marketing; chain fires on Tier 1 clean; validated by existing chain pattern from `/knz-sessions` → `/knz-validate` |
| META-01 | All six metaskills mapped with activation activities — specific thinking routines, not labels | stage-06-metaskills.md schema enforces `activation_activity` must be a named routine; validation T1-19 through T1-24 check compliance |
| META-02 | Developability hierarchy respected: Exploring/Creating before Innovating/Adapting | stage-06-metaskills.md `sequence_position` field + ordering constraint + T1-21/T1-22 checks |
| META-03 | Each metaskill activation includes a transfer prompt connecting to real-work application | stage-06-metaskills.md `transfer_prompt` required field; must reference `transfer_context` from Stage 1 |
| TRNS-01 | Pre-program design: readiness assessment, manager briefing, baseline measurement | stage-07-transfer.md `pre_program` required fields; manager briefing conditional on contact_hours > 4 |
| TRNS-02 | In-program design: implementation intentions and real-work application exercises | stage-07-transfer.md `in_program` required fields; `real_work_application` must use "your [specific work artifact]" framing |
| TRNS-03 | Post-program design: spaced retrieval at 1/4/12 weeks, peer accountability, community continuation, evaluation design | stage-07-transfer.md `post_program` required fields; duration-scaled minimum intervals |
| TRNS-04 | Transfer elements attached to specific sessions and modules — not generic appendices | stage-07-transfer.md attachment rule; all `module_reference` and `session_reference` fields must exist in prior stage output |
| MKTG-01 | Program descriptions derived from curriculum substance — every claim traces to a specific curriculum element | stage-08-marketing.md `source_citation` and `curriculum_traceability` required on every record; T1-31/T1-32 enforce this |
| MKTG-02 | Learning promises reflect actual outcomes, not aspirational language | stage-08-marketing.md `learning_promise` constraint; `content` must use behavioral language matching Bloom's level of cited objectives |
| MKTG-03 | Audience positioning grounded in intake demographics and expertise data | stage-08-marketing.md `audience_positioning` constraint; must use behavioral description format from Stage 1 |
| MKTG-04 | Marketing-to-pedagogy ratio < 25% of total output | stage-08-marketing.md ratio rule; T1-33 enforces at validation; schema ceiling enforced structurally |
| INFR-07 | PreToolUse hook prevents accidental stage skipping | New `.claude/hooks/pre-tool-use.sh` + `settings.json` entry; reads workspace STATE.md; blocks Write/Edit to future-stage directories |
</phase_requirements>

---

## Summary

Phase 7 completes the KNZ pipeline by authoring three generation commands (`/knz-metaskills`, `/knz-transfer`, `/knz-marketing`), wiring the autonomous chain that runs them after clean validation, extending `/knz-approve` with a final delivery gate, and implementing the PreToolUse hook that enforces stage sequencing at the file-write level. The schemas for all three stages already exist and are fully specified. The patterns for all three commands already exist in prior commands. The PreToolUse hook mechanism is natively supported by Claude Code and the JSON schema for intercepting Write/Edit tool calls is documented and verified.

**Primary recommendation:** Author all three generation commands following the established infer-and-review and summary-gate patterns exactly; wire the auto-chain by extending `/knz-validate`'s success path (mirroring how `/knz-sessions` already auto-triggers `/knz-validate`); implement the PreToolUse hook as a bash script added to `settings.json`; extend `/knz-approve` for the final gate.

The heaviest decision surface is in the chain wiring: how the three autonomous stages communicate progress to the user and how the PreToolUse hook reads STATE.md. Both are within Claude's discretion (per CONTEXT.md) and both have clear implementation options with known tradeoffs.

---

## Standard Stack

### Core
| Component | Version/Location | Purpose | Why Standard |
|-----------|-----------------|---------|--------------|
| Claude Code commands | `.claude/commands/*.md` | Slash commands users invoke | Established project pattern; all 8 prior commands use this location |
| Claude Code agents | `.claude/agents/*.md` | Subagent workers dispatched via Task tool | Phase 6 validated this pattern for separation rule |
| PreToolUse hook (bash) | `.claude/hooks/pre-tool-use.sh` | Intercept Write/Edit tool calls, block if stage prereq not met | PreToolUse is Claude Code's native hook type for tool interception; bash scripts match existing hook pattern |
| `settings.json` | `.claude/settings.json` | Hook registration | Existing file with PreToolUse entry already present (for Bash matcher); new Write/Edit entry added in same structure |

### Supporting
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| AskUserQuestion tool | Review gates within commands | Any binary/categorical decision or approval gate |
| Task tool | Dispatch generation or validation subagents | When generation should be isolated from orchestrator context |
| Skill invocation | Auto-chain between commands | When one command auto-advances to the next without user input |

### Schemas Already Built
| Schema | Location | Content |
|--------|----------|---------|
| stage-06-metaskills.md | `.claude/reference/schemas/stage-06-metaskills.md` | All metaskill fields, developability hierarchy, duration scaling, 10 Tier 1 checks |
| stage-07-transfer.md | `.claude/reference/schemas/stage-07-transfer.md` | Three-layer ecosystem, attachment rules, skill-type adaptive rules, duration scaling, 10 Tier 1 checks |
| stage-08-marketing.md | `.claire/reference/schemas/stage-08-marketing.md` | Traceability constraint, ratio rule, duration scaling, 8 Tier 1 checks |
| stage-09-validation.md | `.claude/reference/schemas/stage-09-validation.md` | T1-19 through T1-33 already defined and cover Stages 6–8; validator already emits "Not applicable" rows for these — will auto-pick up when stage files exist |

---

## Architecture Patterns

### Auto-Chain Extension Pattern

The validate → metaskills → transfer → marketing chain extends the existing sessions → validate auto-trigger:

```
/knz-sessions Completion Summary
  → Auto-Trigger Validation (already exists in knz-sessions.md)
    → /knz-validate (runs via Skill invocation)
      → If tier_1_failures == 0:
          → Auto-Trigger Metaskills (NEW — added to knz-validate.md success path)
            → /knz-metaskills (runs via Skill invocation)
              → AskUserQuestion gate (infer-and-review)
              → On approval: write 05-metaskills/
              → Auto-trigger /knz-transfer
                → /knz-transfer (runs via Skill invocation)
                  → AskUserQuestion gate (summary-gate pattern)
                  → On approval: write 06-transfer/
                  → Auto-trigger /knz-marketing
                    → /knz-marketing (runs via Skill invocation)
                      → Generate silently
                      → Write 07-marketing/
                      → Show: "Run /knz-approve to review your complete package"
      → If tier_1_failures > 0:
          → Show "Fix these before continuing" — chain stops
```

The key wiring point is `/knz-validate`: a new "Auto-Trigger Metaskills" section is added after the Tier 1 clean path (mirroring the Auto-Trigger Validation section added to `/knz-sessions` in Phase 6).

### Infer-and-Review Pattern (from Phase 3, 5)

Used by `/knz-metaskills` and `/knz-marketing`:

```
1. Read prior stage outputs (silently)
2. Load schema as generation context
3. Run constraint enforcement (silent)
4. Display output (no preamble, no generation commentary)
5. AskUserQuestion with three options:
   - "Approve" → write files, advance stage status, auto-trigger next command
   - "Flag an issue" → free-text input → full regeneration with constraint steps re-run → re-display
   - "Start over" → destructive confirmation gate → reset to not-started, regenerate
6. Write files ONLY on approval
7. Silent STATE.md update on approval
```

### Summary-Gate Pattern (from Phase 5 /knz-modules)

Used by `/knz-transfer`:

```
1. Read prior stage outputs (silently)
2. Load schema, apply duration scaling
3. Generate full transfer ecosystem (silent)
4. Compile compact gate summary:
   - Pre-program: readiness assessment format, baseline measurement method
   - In-program: implementation intention count, real-work application count
   - Post-program: spaced retrieval schedule, peer accountability structure type
   - KEY FIELD: evaluation design — Kirkpatrick level and what's being measured
5. AskUserQuestion (approve / flag / start over)
6. Write transfer-ecosystem.md on approval
7. Silent STATE.md update
8. Auto-trigger /knz-marketing
```

### PreToolUse Hook Pattern

The hook is a bash script that reads Write/Edit tool input from stdin as JSON and outputs a permission decision:

```bash
#!/bin/bash
# .claude/hooks/pre-tool-use.sh

INPUT=$(cat)
TOOL=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))")
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))")

# Only check writes to workspace stage directories
if [[ "$FILE_PATH" =~ workspace/[^/]+/0([0-9])-[^/]+ ]]; then
  STAGE_NUM="${BASH_REMATCH[1]}"
  # ... read STATE.md, check preceding stage ...
  # On block, output deny JSON and exit 0
fi
exit 0
```

Registration in `settings.json`:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use.sh\"",
          "timeout": 10
        }]
      }
    ]
  }
}
```

**How blocking works:** The hook outputs a JSON object with `hookSpecificOutput.permissionDecision: "deny"` and a `permissionDecisionReason` that becomes the message Claude receives. Exit 0 with no output = allow. Exit 2 = blocking error (stderr fed to Claude).

### Final Gate Pattern (/knz-approve extension)

The Final Validation gate already exists in `/knz-approve` but currently shows a minimal summary. Phase 7 extends it to show a complete pipeline summary before the AskUserQuestion gate:

```
Program overview (from 00-project-brief)
  Outcome count + Bloom distribution (from 01-outcomes)
  Assessment count (from 02-assessments)
  Module count + session count (from 03-modules, 04-sessions)
  Metaskill activation coverage (from 05-metaskills)
  Transfer layer summary (from 06-transfer)
  Marketing element count (from 07-marketing)
  Validation status (from 08-validation)

[AskUserQuestion: Approve / I have concerns / Start this stage over]
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Stage sequencing enforcement | Custom command-level prerequisite checks in each new command | PreToolUse hook at the file-write level | Hook enforcement is universal and cannot be bypassed by skipping command-level checks; commands can still have friendly error messages but hook is the actual gate |
| Marketing traceability validation | Inline logic in `/knz-marketing` | T1-31, T1-32, T1-33 checks in the existing validator | Validator already defines these checks; generation command writes to schema, validator catches violations on next run |
| Metaskill developability ordering | Custom sort logic in `/knz-metaskills` | `sequence_position` field + schema constraint enforcement step before display | Schema already encodes the rule; enforcement step mirrors how Phase 5 enforced Bloom elevation silently |
| Transfer attachment validation | Inline checks in `/knz-transfer` | T1-25 through T1-30 in existing validator | Same pattern: generate to schema, validator catches violations |
| Chain progress tracking | A separate orchestration state file | Silent STATE.md stage status updates (existing pattern) | Stage status already tracks completion; each auto-triggered command reads the same STATE.md |

---

## Common Pitfalls

### Pitfall 1: Chain Wiring Location

**What goes wrong:** The auto-chain is wired into `/knz-sessions` instead of `/knz-validate`.
**Why it happens:** Sessions already auto-triggers validate — it feels natural to extend that chain there.
**How to avoid:** The chain fires ONLY when Tier 1 is clean. That decision point lives in `/knz-validate`'s Conversation Output section (the `tier_1_failures == 0` path). Add the auto-trigger there, not in `/knz-sessions`.
**Warning signs:** If the auto-metaskills trigger is placed in knz-sessions.md, it would fire even when validation fails.

### Pitfall 2: PreToolUse Hook — STATE.md Path Resolution

**What goes wrong:** The hook reads a hardcoded STATE.md path and fails when the workspace project name varies.
**Why it happens:** Workspace directory is `workspace/{project-name}/STATE.md` where project-name is user-defined.
**How to avoid:** The hook must glob for `workspace/*/STATE.md` from the project root (using `$CLAUDE_PROJECT_DIR`), matching the same pattern used by all commands. Alternatively, parse the project path from the intercepted file path itself.
**Warning signs:** Hook always allows (or always blocks) regardless of stage status.

### Pitfall 3: PreToolUse Hook — Stage Number Parsing

**What goes wrong:** The regex parsing the stage number from the file path fails to distinguish `05-metaskills` (Stage 6 logical / directory 05) from Stage 5.
**Why it happens:** Directory names use output stage numbers (05-metaskills is the output directory for Stage 6 of the pipeline), not pipeline stage numbers.
**How to avoid:** Map directory name to pipeline stage explicitly. The workspace STATE.md Stage Progress table uses pipeline stage numbers (1–9); the output directories use a different numbering. The hook must map `05-metaskills/` → Stage 6, `06-transfer/` → Stage 7, `07-marketing/` → Stage 8. Define the mapping explicitly in the hook script.
**Warning signs:** Hook allows writes to `05-metaskills/` when Stage 5 (Session Content) is not complete — which is the wrong check. Stage 6 (Metaskill Mapping) requires Stage 5 complete, and `05-metaskills/` is Stage 6's output directory.

**Directory-to-stage mapping:**
```
00-project-brief/  → Stage 1 (prereq: none)
01-outcomes/       → Stage 2 (prereq: Stage 1)
02-assessments/    → Stage 3 (prereq: Stage 2)
03-modules/        → Stage 4 (prereq: Stage 3)
04-sessions/       → Stage 5 (prereq: Stage 4)
05-metaskills/     → Stage 6 (prereq: Stage 5)
06-transfer/       → Stage 7 (prereq: Stage 6)
07-marketing/      → Stage 8 (prereq: Stage 7)
08-validation/     → Stage 9 (prereq: Stage 5 minimum; runs anytime after)
```

Note: Validation (Stage 9, `08-validation/`) is special — it can run after Stage 5 and re-runs throughout. The hook should NOT block writes to `08-validation/` based on sequencing logic.

### Pitfall 4: Metaskill Duration Scaling for 90-Minute Programs

**What goes wrong:** `/knz-metaskills` generates all six metaskills for a 90-minute program, violating the duration scaling rule.
**Why it happens:** Default generation targets full coverage; short-program exception is easy to miss.
**How to avoid:** Read `contact_hours` from `00-project-brief/project-brief.md` before generation. The schema is explicit: 90-min programs activate 2–3 metaskills max and are not required to cover all six. Apply duration scaling as a constraint enforcement step before display.
**Warning signs:** A 90-minute program generates 6 metaskill activation records.

### Pitfall 5: Transfer Community of Practice — Never Omit

**What goes wrong:** `/knz-transfer` omits `community_continuation_design` for short programs.
**Why it happens:** The simplified `continuation_design` for short programs looks like an optional appendix in the schema.
**How to avoid:** The CONTEXT.md is explicit: CoP is never omitted. Even a 90-min program closes with a connection moment, join link, or follow-up check-in. The simplified structure uses `community_continuation_design` with scaled-down `first_90_days_plan` (3 activities minimum per schema), not absence of the field.

### Pitfall 6: Marketing Copy Tone vs. Traceability

**What goes wrong:** Marketing output reads like a curriculum summary instead of enrollment copy.
**Why it happens:** The traceability requirement pulls toward dry, precise language; generation defaults to safe neutral tone.
**How to avoid:** The CONTEXT.md is explicit about this: "write-to-enroll" tone is intentional, not aspirational. The `content` field should read like real program marketing; `curriculum_traceability` fields carry the evidence. These are separate fields for a reason — enforce both, not just one.

### Pitfall 7: /knz-approve Final Gate — Missing Stage Reads

**What goes wrong:** The final gate summary is incomplete because some stage output directories don't exist yet (if pipeline was partially run).
**Why it happens:** `/knz-approve` tries to read all stage directories but a stage hasn't been completed yet.
**How to avoid:** Read each stage directory only if the corresponding stage status is `complete` in STATE.md. Show "not yet generated" for any stage that hasn't completed. The gate should still work even if only Stages 1–5 are complete (though it won't mark delivery-ready without all stages).

### Pitfall 8: PreToolUse Hook — settings.json Merge

**What goes wrong:** The new Write|Edit PreToolUse entry overwrites the existing Bash PreToolUse entry when settings.json is updated.
**Why it happens:** The PreToolUse key already exists with a Bash matcher; adding a new entry replaces the array instead of appending.
**How to avoid:** The `hooks.PreToolUse` value is an array. Phase 7 must ADD a second object to that array (with `matcher: "Write|Edit"`), not replace the existing object. The final array has two entries: one for Bash (secrets check) and one for Write|Edit (stage sequencing).

---

## Code Examples

### PreToolUse Hook — Full Pattern

```bash
#!/bin/bash
# Source: Claude Code hooks reference (https://code.claude.com/docs/en/hooks)
# Receives Write/Edit tool input as JSON on stdin
# Outputs deny JSON to block, or exits 0 to allow

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))" 2>/dev/null)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

# Only check writes into workspace stage directories
# Pattern: workspace/{project-name}/NN-dirname/
if [[ ! "$FILE_PATH" =~ workspace/([^/]+)/(0[0-9]-[^/]+)/ ]]; then
  exit 0
fi

PROJECT_NAME="${BASH_REMATCH[1]}"
STAGE_DIR="${BASH_REMATCH[2]}"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
STATE_FILE="$PROJECT_DIR/workspace/$PROJECT_NAME/STATE.md"

# Map directory prefix to: target_stage_num, prereq_stage_num, stage_name, prereq_command
case "$STAGE_DIR" in
  01-*)  PREREQ_NUM=0;  PREREQ_NAME="none"; STAGE_NUM=1; STAGE_NAME="Intake"; PREREQ_CMD="" ;;
  02-*)  PREREQ_NUM=1;  PREREQ_NAME="Intake"; STAGE_NUM=2; STAGE_NAME="Outcome Design"; PREREQ_CMD="/knz-intake" ;;
  03-*)  PREREQ_NUM=2;  PREREQ_NAME="Outcome Design"; STAGE_NUM=3; STAGE_NAME="Assessment Design"; PREREQ_CMD="/knz-outcomes" ;;
  04-*)  PREREQ_NUM=3;  PREREQ_NAME="Assessment Design"; STAGE_NUM=4; STAGE_NAME="Module Structure"; PREREQ_CMD="/knz-assessments" ;;
  05-*)  PREREQ_NUM=4;  PREREQ_NAME="Module Structure"; STAGE_NUM=5; STAGE_NAME="Session Content"; PREREQ_CMD="/knz-modules" ;;
  06-*)  PREREQ_NUM=5;  PREREQ_NAME="Session Content"; STAGE_NUM=6; STAGE_NAME="Metaskill Mapping"; PREREQ_CMD="/knz-sessions" ;;
  07-*)  PREREQ_NUM=6;  PREREQ_NAME="Metaskill Mapping"; STAGE_NUM=7; STAGE_NAME="Transfer Ecosystem"; PREREQ_CMD="/knz-metaskills" ;;
  08-*)  exit 0 ;;  # Validation — allow writes anytime
  *)     exit 0 ;;  # Unknown directory — allow
esac

[ "$PREREQ_NUM" -eq 0 ] && exit 0

# Read preceding stage status from STATE.md
if [ ! -f "$STATE_FILE" ]; then
  exit 0  # No STATE.md — allow (workspace not initialized)
fi

# Parse stage status: look for the prereq stage row
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|complete' | head -1)

if [ "$PREREQ_STATUS" = "complete" ]; then
  exit 0  # Prereq complete — allow
fi

# Block with actionable message
REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be complete. Stage $PREREQ_NUM is currently ${PREREQ_STATUS:-not-started}. Run $PREREQ_CMD to finish it first."

python3 -c "
import json, sys
print(json.dumps({
  'hookSpecificOutput': {
    'hookEventName': 'PreToolUse',
    'permissionDecision': 'deny',
    'permissionDecisionReason': sys.argv[1]
  }
}))" "$REASON"
exit 0
```

### settings.json PreToolUse Array (Write|Edit Added)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-commit-secrets.sh\"",
          "timeout": 10
        }]
      },
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use.sh\"",
          "timeout": 10
        }]
      }
    ]
  }
}
```

### Auto-Chain Trigger in /knz-validate (New Section)

```markdown
## Auto-Trigger Metaskills

After writing all STATE.md updates (when tier_1_failures == 0 path), automatically invoke:

> All required checks passed — generating metaskill activation routines now.

Invoke `/knz-metaskills` as a Skill.

Do not wait for user input. This is the same auto-advance pattern used between /knz-sessions and /knz-validate.

**Do NOT trigger when tier_1_failures > 0.** The chain stops with the failure message. User must fix and rerun.
```

### /knz-metaskills Constraint Enforcement Steps

```
Step 1 — Duration scaling:
  Read contact_hours from 00-project-brief. Apply metaskill count ceiling:
  - < 2 hours: max 3 activations; require at least 1 high-evidence metaskill; all-six rule waived
  - 2–16 hours: 4–5 metaskills
  - > 16 hours: all six required

Step 2 — Developability hierarchy:
  Verify sequence_position of first Innovating > at least one Exploring AND one Creating
  Verify sequence_position of first Adapting > at least one Exploring AND one Creating
  If violated: reorder sequence_positions to satisfy constraint; record change

Step 3 — Thinking routine specificity:
  For each activation_activity: is it a named thinking routine?
  Prohibited patterns: "encourage", "discussion", "reflection", "brainstorm", "debrief", "explore"
  Acceptable: "See-Think-Wonder", "Claim-Support-Question", "Pre-mortem", "I Used to Think / Now I Think", etc.
  If generic: regenerate with specific named routine; record change

Step 4 — Transfer prompt grounding:
  For each transfer_prompt: does it reference the transfer_context from Stage 1?
  Must name a specific real-work situation, not generic encouragement
  If generic: regenerate; record change

Step 5 — Imagining conditional fields:
  For any record with metaskill_name: Imagining
  evidence_gap_acknowledgment must be true
  imagining_adjacent_practice must be one of: scenario planning, futures thinking, mental simulation
  If absent: add with correct values
```

### /knz-transfer Gate Summary Format

```
## Your Transfer Design

**Before the program:**
- Readiness check: [format] — [question count] questions focused on [topic]
- Baseline: [method] capturing [dimensions]
[Manager briefing: included / not included for this program length]

**During the program:**
- [N] implementation intentions (one per module)
- [N] real-work application activities across [session references]
[Error management practice: included (open-skill requirement) / not applicable]

**After the program:**
- Spaced follow-up: [interval list] (e.g., 1 week, 1 month, 3 months)
- Peer accountability: [structure_type], [frequency]
- Community: [continuation_platform]

**How you'll measure success:**
- [Kirkpatrick level]: [what's being measured] — measured [when] by [by_whom]

Does this transfer design match what you need for this program?
```

### /knz-marketing Traceability Display at Final Gate

```
[Program description content — compelling enrollment copy]
→ Source: stage-02 OBJ-01 (Apply); stage-05 session-01 guided_practice

[Learning promise content — behavioral outcome statement]
→ Source: stage-02 PO-01; stage-07 real_work_application[session-03]

[Audience positioning content — warm behavioral description]
→ Source: stage-01 target_audience; stage-01 prior_knowledge
```

### /knz-approve Final Gate Summary Format

```
## Your Complete Curriculum Package

**[Program Name]** — [Duration] program for [Audience description]

**What participants learn:**
[Outcome count] learning objectives spanning [Bloom span] thinking levels

**How you'll know they learned it:**
[Assessment count] assessments — [formative count] during-program, [summative count] end-of-program

**Program structure:**
[Module count] modules, [Session count] sessions

**Thinking skills activated:**
[List of metaskills with activation activity names — e.g., "Exploring: See-Think-Wonder"]

**Transfer support:**
Pre-program: [readiness check format]
In-program: [application count] real-work applications
Post-program: Spaced follow-up at [intervals], [accountability structure type]
Evaluation: [Kirkpatrick level] — [what's measured]

**Marketing materials:**
[Element count] elements — [element_type list]

**Validation:**
[Pass / N issues pending] — [tier_2 summary if applicable]

---
This is your complete curriculum package. Is it ready to deliver?
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| T1-19 through T1-33 all marked "Not applicable" | These checks become live when stages exist | Phase 7 (this phase) | Validator auto-picks up new stage output with no code changes |
| knz-validate ends with "Run /knz-approve" prompt | knz-validate auto-triggers metaskills on Tier 1 clean | Phase 7 (this phase) | Pipeline becomes fully autonomous from sessions → delivery gate |
| /knz-approve handles Post-Assessment and Final Validation only | /knz-approve Final Validation gate extended with full pipeline summary | Phase 7 (this phase) | Final gate becomes a "this is what you built" review, not a checkbox |

---

## Open Questions

1. **How does the hook handle partial STATE.md (project not yet initialized)?**
   - What we know: The hook runs before any file write, including during `/knz-init`. An uninitialized project has no `workspace/*/STATE.md`.
   - What's unclear: If the hook can't find STATE.md, it should allow writes (graceful absence). The current pattern `[ ! -f "$STATE_FILE" ] && exit 0` handles this.
   - Recommendation: Exit 0 (allow) if STATE.md not found. Commands already check prerequisites conversationally; the hook is a safety net, not the primary gate.

2. **Chain progress visibility during autonomous run**
   - What we know: CONTEXT.md leaves this to Claude's discretion. Each auto-triggered command starts with its own generation step.
   - What's unclear: Whether to show per-stage progress lines or a single "pipeline running" message.
   - Recommendation: Show one line per stage completion as it finishes (e.g., "Metaskill mapping done — generating transfer design now."). This matches the per-module progress pattern in `/knz-sessions`.

3. **Does the marketing command write files immediately (no review gate) or hold for the final gate?**
   - What we know: CONTEXT.md says `/knz-marketing` uses infer-and-review with "no separate gate (final delivery gate covers review)." This implies marketing files ARE written after generation without a mid-pipeline AskUserQuestion.
   - What's unclear: Whether "no separate gate" means write immediately and show at final gate, or hold in conversation until `/knz-approve` is run.
   - Recommendation: Write `07-marketing/marketing-package.md` immediately after generation (same as metaskills writing `05-metaskills/metaskill-map.md` immediately), then show the traceability summary before saying "Run /knz-approve to review your complete package." The final gate is where approval happens.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Not applicable — this project has no automated test suite; all verification is human inspection of generated command/hook files |
| Config file | none |
| Quick run command | Manual: verify hook blocks a write to `06-transfer/` when Stage 6 is not complete in test-program STATE.md |
| Full suite command | Manual: run `/knz-sessions` on test-program and verify full chain executes through marketing |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PIPE-06 | `/knz-approve` shows full pipeline summary and requires approval before delivery-ready | manual | inspect `/knz-approve` final gate section | ❌ Wave 0 (file to be created) |
| PIPE-07 | Chain from validate → metaskills → transfer → marketing runs autonomously on Tier 1 clean | manual | run `/knz-sessions` on test workspace with Stage 1-4 complete | existing test-program |
| META-01 | `/knz-metaskills` produces named thinking routines (not labels) | manual | inspect output; verify activation_activity contains named routine | ❌ Wave 0 |
| META-02 | Developability hierarchy: Exploring/Creating before Innovating/Adapting in sequence | manual | inspect metaskill-map.md sequence_position values | ❌ Wave 0 |
| META-03 | Each metaskill has transfer_prompt referencing real-work context | manual | inspect transfer_prompt fields; verify transfer_context reference | ❌ Wave 0 |
| TRNS-01 | Pre-program layer present with readiness assessment and baseline measurement | manual | inspect transfer-ecosystem.md pre_program section | ❌ Wave 0 |
| TRNS-02 | In-program has implementation intentions and real-work applications | manual | inspect transfer-ecosystem.md in_program section | ❌ Wave 0 |
| TRNS-03 | Post-program has spaced retrieval, peer accountability, CoP, evaluation design | manual | inspect transfer-ecosystem.md post_program section | ❌ Wave 0 |
| TRNS-04 | Transfer elements have module_reference/session_reference (not generic) | manual | verify each implementation_intention.module_reference exists in 03-modules | ❌ Wave 0 |
| MKTG-01 | Every marketing claim has source_citation | manual | inspect marketing-package.md; verify no empty source_citation fields | ❌ Wave 0 |
| MKTG-02 | Learning promises use behavioral language matching objectives | manual | compare learning_promise content against stage-02 Bloom levels | ❌ Wave 0 |
| MKTG-03 | Audience positioning uses behavioral description format | manual | inspect audience_segment fields; verify "can X, cannot yet Y" framing | ❌ Wave 0 |
| MKTG-04 | Marketing < 25% of total output word count | manual | word count check after full pipeline run | ❌ Wave 0 |
| INFR-07 | PreToolUse hook blocks write to 06-transfer/ when Stage 6 not complete | manual | attempt write to workspace/test-program/06-transfer/ with Stage 6 not-started | ❌ Wave 0 (hook file + settings.json entry) |

### Sampling Rate
- **Per task commit:** Inspect the file(s) authored in that task for structural completeness and pattern alignment
- **Per wave merge:** Human test of the full chain against test-program workspace
- **Phase gate:** Full chain run from `/knz-sessions` (with test-program at Stage 1-4 complete) through `/knz-approve` before marking Phase 7 complete

### Wave 0 Gaps
- [ ] `.claude/commands/knz-metaskills.md` — covers META-01, META-02, META-03; new file
- [ ] `.claude/commands/knz-transfer.md` — covers TRNS-01, TRNS-02, TRNS-03, TRNS-04; new file
- [ ] `.claude/commands/knz-marketing.md` — covers MKTG-01, MKTG-02, MKTG-03, MKTG-04; new file
- [ ] `.claude/hooks/pre-tool-use.sh` — covers INFR-07; new file
- [ ] `.claude/settings.json` — Write|Edit PreToolUse entry added to existing array (Bash entry preserved)
- [ ] `.claude/commands/knz-validate.md` — Auto-Trigger Metaskills section added to Tier 1 clean path
- [ ] `.claude/commands/knz-approve.md` — Final Validation gate extended with full pipeline summary

---

## Sources

### Primary (HIGH confidence)
- Official Claude Code hooks documentation (`https://code.claude.com/docs/en/hooks`) — PreToolUse JSON schema, permissionDecision values, exit codes
- `.claude/reference/schemas/stage-06-metaskills.md` — All metaskill fields, ordering constraints, duration scaling, validation rules
- `.claude/reference/schemas/stage-07-transfer.md` — Three-layer ecosystem fields, attachment rules, duration scaling, validation rules
- `.claude/reference/schemas/stage-08-marketing.md` — Traceability constraint, ratio rule, duration scaling, validation rules
- `.claude/reference/schemas/stage-09-validation.md` — T1-19 through T1-33, T3-01 through T3-09 definitions

### Secondary (MEDIUM confidence)
- `.claude/commands/knz-sessions.md` — Auto-Trigger Validation pattern (template for auto-trigger in knz-validate)
- `.claude/commands/knz-validate.md` — Chain handoff point; success/failure paths documented
- `.claude/commands/knz-modules.md` — Summary-gate pattern (template for /knz-transfer gate)
- `.claude/settings.json` — Existing PreToolUse hooks array structure; Write|Edit matcher adds to this array

### Tertiary (LOW confidence)
- None — all findings verified against official docs or existing project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all components already in use in this project; no new technology introduced
- Architecture patterns: HIGH — all three patterns (infer-and-review, summary-gate, PreToolUse hook) verified against existing code and official docs
- Pitfalls: HIGH — directory-to-stage mapping mismatch and chain wiring location are verified against actual file structure; others inferred from established project patterns

**Research date:** 2026-03-22
**Valid until:** 2026-06-22 (stable domain — Claude Code hooks API and project file patterns unlikely to change within 90 days)
