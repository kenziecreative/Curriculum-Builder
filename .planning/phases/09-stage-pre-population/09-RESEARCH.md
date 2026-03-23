# Phase 9: Stage Pre-population - Research

**Researched:** 2026-03-23
**Domain:** Claude Code plugin behavior — state machine extension, file-write patterns, command branching
**Confidence:** HIGH

## Summary

Phase 9 adds a single capability to an already-running plugin: after audit mode intake is approved, automatically write draft stage files from the extracted content rather than leaving downstream commands to start from blank slates. This is pure extension work — no new commands, no new schemas, no new infrastructure. Every pattern needed already exists in the codebase.

The critical insight is that pre-population is a state machine extension, not a feature addition. The system already has `not-started`, `in-progress`, and `complete` as STATE.md status values. Adding `pre-populated` as a fourth value between `not-started` and `in-progress` is the central mechanism — every other behavior (hook enforcement, downstream branching, user messaging) follows from detecting that status value correctly.

The second critical insight is that downstream commands (`/curriculum:outcomes`, `/curriculum:assessments`, `/curriculum:modules`, `/curriculum:sessions`) already have a three-branch Prerequisites section pattern (`not-started` / `in-progress` / `complete`). Phase 9 adds a fourth branch (`pre-populated`) to each. That branch follows the same "display content, run enforcement silently, show gate" pattern already established in Phase 3.

**Primary recommendation:** Implement in three focused areas: (1) add the pre-population write block to `intake.md` Step 6, (2) add `pre-populated` branch to each of the four downstream command Prerequisites sections, (3) update `pre-tool-use.sh` to treat `pre-populated` as `in-progress` for prerequisite checking.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Trigger and timing**
- Pre-population runs automatically inside `/curriculum:intake`, immediately after the user approves the intake gate — no separate command
- Eligible stages: both **Exists** and **Shallow** entries from the gap report; **Missing** stages are skipped entirely
- All eligible stages write simultaneously in one pass at the end of intake — not one-at-a-time as user runs each downstream command
- After pre-population, show a summary table: `Stage | What was written | Issues found` (Bloom violations, missing fields flagged with count). Then: "Run `/curriculum:outcomes` to review and enforce schema."
- Sessions pre-population is **structure only**: session list, topic-to-outcome mapping, session template placeholder, pre-work if found in source materials. No attempt to write full facilitator guides, participant materials, or slide outlines — those are generation work.

**Downstream detection**
- Pre-populated stages get status `pre-populated` in STATE.md — new enum value (distinct from `not-started`, `in-progress`, `complete`)
- When a downstream command detects `pre-populated` status: display the draft, run all enforcement steps silently (Bloom correction, verb replacement, etc.) against the existing content, show corrected version, then gate: "Looks good / Flag an issue / Start over"
- If user chooses "Start over" from a pre-populated draft: wipe the stage files, status → `not-started`, command restarts generation from project brief
- Pre-hook (`pre-tool-use.sh`) treats `pre-populated` the same as `in-progress` — prior stage must reach `complete` before next stage unlocks. Pre-populated ≠ approved.
- Pre-hook message when prior stage is `pre-populated`: "Stage N has a draft ready — run `/curriculum:[command]` to review and approve it first." (forward-looking, not blocking-error tone)

**Schema enforcement mode**
- Pre-population writes extracted content faithfully. Where it fails schema, add inline markers in the file: `# NEEDS: [specific violation] — /curriculum:[command] will fix this`
- Violations are also surfaced in the post-intake summary table ("Issues found" column), so user knows what enforcement will address before they get to each stage
- Full silent auto-correction happens inside the downstream command's enforcement pass, not during pre-population write (write first with markers, enforce when user runs the command)

**Partial coverage handling**
- Stages marked **Missing** in the gap report: no pre-populated files written, STATE.md status stays `not-started`, downstream commands run their normal generation flow — zero special handling
- The gap report (from Phase 8) is the signal for what to pre-populate vs. generate — Phase 9 reads it, doesn't recreate it

### Claude's Discretion
- Exact inline marker format in pre-populated files (as long as it's human-readable and references the fixing command)
- Whether to batch or sequence violation checks during the pre-population write pass
- How to handle edge cases where gap report is absent (e.g., user ran clean intake then tries to trigger pre-population somehow)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INTK-12 | Audit mode pre-populates stage files (outcomes, assessments, module structure, session content) to the extent source materials cover them, so the pipeline starts from what exists rather than generating from scratch — downstream commands treat pre-populated files as drafts to enforce schema compliance against, not blank slates to fill | Satisfied by: pre-population write block in intake.md Step 6; `pre-populated` STATUS enum; enforcement-mode branch in each downstream command Prerequisites section; pre-tool-use.sh update |

</phase_requirements>

## Standard Stack

This phase operates entirely within the existing plugin — no new libraries, frameworks, or dependencies.

### Core (already present)
| Component | Location | Purpose |
|-----------|----------|---------|
| `intake.md` | `.claude/plugins/curriculum/commands/intake.md` | Host for the pre-population write block (added to Step 6) |
| `outcomes.md` | `.claude/plugins/curriculum/commands/outcomes.md` | Downstream command: needs `pre-populated` branch added to Prerequisites |
| `assessments.md` | `.claude/plugins/curriculum/commands/assessments.md` | Downstream command: needs `pre-populated` branch added to Prerequisites |
| `modules.md` | `.claude/plugins/curriculum/commands/modules.md` | Downstream command: needs `pre-populated` branch added to Prerequisites |
| `sessions.md` | `.claude/plugins/curriculum/commands/sessions.md` | Downstream command: needs `pre-populated` branch added to Prerequisites |
| `pre-tool-use.sh` | `.claude/hooks/pre-tool-use.sh` | Bash hook: needs `pre-populated` treated as `in-progress` in grep parse |
| `curriculum-gap-report.md` | `workspace/{project}/00-project-brief/` | Input signal: which stages are Exists/Shallow/Missing |
| Stage schemas `stage-02` through `stage-05` | `.claude/reference/schemas/` | Define required fields — used to identify what to extract and what to flag as NEEDS: |
| `workspace/{project}/STATE.md` | per-project | Receives `pre-populated` status values; comment line needs enum updated |

### No new dependencies required
Pre-population writes to existing workspace directory structure using existing file format conventions. No new schemas, no new directories, no new commands.

## Architecture Patterns

### Recommended File Organization

No structural changes. Pre-populated files land in the same stage directories as generated files:

```
workspace/{project}/
├── 00-project-brief/
│   ├── project-brief.md           (written by intake — already exists)
│   └── curriculum-gap-report.md   (written by intake — already exists, Phase 9 reads it)
├── 01-outcomes/                   (pre-populated if Stage 2 is Exists or Shallow)
│   ├── enduring-understandings.md
│   ├── essential-questions.md
│   └── learning-objectives.md
├── 02-assessments/                (pre-populated if Stage 3 is Exists or Shallow)
│   └── assessment-plan.md
├── 03-modules/                    (pre-populated if Stage 4 is Exists or Shallow)
│   └── module-*.md
└── 04-sessions/                   (pre-populated if Stage 5 is Exists or Shallow)
    └── session-manifest.md        (structure only — no facilitator guides)
```

### Pattern 1: State Machine Extension

**What:** `pre-populated` is a new STATUS enum value in workspace STATE.md Stage Progress table, inserted between `not-started` and `in-progress`.

**When to use:** Set when pre-population writes files to a stage directory. Cleared to `not-started` on "Start over" from enforcement gate. Advances to `in-progress` when downstream command opens the enforcement pass.

**State transition map:**
```
not-started → pre-populated   (intake pre-population writes files)
pre-populated → in-progress   (downstream command opens enforcement pass)
pre-populated → not-started   (user chooses "Start over" — files wiped)
in-progress → complete        (user approves at enforcement gate — unchanged)
```

**STATE.md comment line to update:**
```markdown
<!-- Stage status enums: not-started | in-progress | pre-populated | complete -->
```

### Pattern 2: Pre-population Write Block in intake.md Step 6

**What:** After the confirmation gate approval ("Looks good — let's keep going"), before the existing project-brief.md write, add a pre-population block.

**Position in intake.md:** After the existing Step 6 file writes (project-brief.md and curriculum-gap-report.md), still within the same simultaneous write pass.

**Logic flow:**
```
1. Read curriculum-gap-report.md (just written — already in context)
2. For each stage in gap report:
   - If Exists or Shallow: generate pre-populated content, add NEEDS: markers for violations
   - If Missing: skip entirely
3. Write all pre-populated files simultaneously (follow one-pass rule from Phase 5)
4. Update STATE.md: set pre-populated stages to status `pre-populated`
5. Display post-intake summary table
6. Show forward-looking message: "Run /curriculum:outcomes to review and enforce schema."
```

**Sessions pre-population constraint:** Write a session manifest only — session names, which outcomes map to each session, template placeholder, pre-work if present. Never write facilitator guides, participant materials, or slide outlines.

### Pattern 3: Downstream Command Enforcement Branch

**What:** Each downstream command's Prerequisites section already has a three-branch `Stage N status` check. Add `pre-populated` as a fourth branch.

**Current pattern (outcomes.md example):**
```markdown
- **`not-started`** — proceed to Generation section below
- **`in-progress`** — check whether files exist...
- **`complete`** — respond: "Outcomes are already designed..."
```

**New pattern (add this branch):**
```markdown
- **`pre-populated`** — Read the pre-populated files from `workspace/*/01-outcomes/`.
  Run all constraint enforcement steps silently against the existing content.
  Display the corrected version. Proceed to the Review Gate section.
  Do not regenerate — the content source is the extracted draft, not the project brief.
```

**Enforcement behavior in pre-populated branch:** Run the same constraint enforcement steps that already run after generation (Bloom verb check, level distribution, transfer context completeness, hierarchy integrity). The output user sees is always the corrected version — never the raw pre-populated draft.

**"Start over" in pre-populated branch:**
```
- Wipe all files in the stage directory
- Set STATE.md Stage N status to `not-started`
- Restart the command from the Generation section (generate fresh from project brief)
```

**"Flag an issue" in pre-populated branch:**
- Same behavior as after generation: take feedback, re-run generation from project brief plus feedback, re-run all enforcement, re-display.
- Pre-populated content is the starting point for review, not a sacred source — user can always regenerate.

### Pattern 4: Pre-tool-use Hook Extension

**What:** `pre-tool-use.sh` currently greps STATE.md for `not-started|in-progress|complete`. It must also match `pre-populated` and treat it as blocking (same as `in-progress`).

**Current grep pattern:**
```bash
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|complete' | head -1)

if [ "$PREREQ_STATUS" = "complete" ]; then
  exit 0
fi
```

**Required change:** The grep regex must include `pre-populated`. The `complete`-only pass-through stays identical. Any other status (including `pre-populated`) hits the block path.

**Updated grep line:**
```bash
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|pre-populated|complete' | head -1)
```

The block REASON string also needs a `pre-populated`-specific message:
```bash
if [ "$PREREQ_STATUS" = "pre-populated" ]; then
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be approved first. Stage $PREREQ_NUM has a draft ready — run $PREREQ_CMD to review and approve it."
else
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be complete. Stage $PREREQ_NUM is currently ${PREREQ_STATUS:-not-started}. Run $PREREQ_CMD to finish it first."
fi
```

### Pattern 5: Post-intake Summary Table

**What:** After all pre-populated files are written, display a summary table before the forward-looking message.

**Format (mirrors gap report — same stages, adds two columns):**
```
| Stage | What was written | Issues found |
|-------|-----------------|--------------|
| 2: Learning Outcomes | learning-objectives.md, enduring-understandings.md, essential-questions.md | 2 verb violations, 1 missing transfer context |
| 3: Assessment Design | assessment-plan.md | Formative assessments absent |
| 4: Module Structure | 3 module files | None |
| 5: Session Content | session-manifest.md (structure only) | None |
| 6: Metaskill Mapping | — (Missing — will generate fresh) | — |
```

**Issues found column:** Count violations detected during pre-population (violations that got NEEDS: markers). Use plain language — not schema enum names.

### Anti-Patterns to Avoid

- **Writing partial pre-population progressively:** All eligible stage files must write simultaneously in one pass. Never write Stage 2 then pause for user confirmation before Stage 3. (Established rule from Phase 5.)
- **Silent auto-correcting during pre-population write:** Write extracted content faithfully with NEEDS: markers. Auto-correction happens when the downstream command runs, not during pre-population. User sees corrected version only when they run the downstream command.
- **Treating pre-populated as approved:** `pre-populated` does NOT unlock the next stage. The hook must block advancement until the user runs the downstream command and approves.
- **Generating session facilitator guides during pre-population:** Sessions pre-population is structure only (manifest). Full generation is reserved for `/curriculum:sessions`.
- **Re-reading gap report during downstream command run:** The gap report was written by intake. Downstream commands should not re-derive gap status — they read STATE.md stage status (`pre-populated`) as the signal.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Detecting which stages to pre-populate | Custom re-analysis of source documents | Read `curriculum-gap-report.md` (already written by intake Step 6) — Phase 9 reads it, doesn't recreate it |
| Schema violation detection during write | New validation pass | NEEDS: inline markers during write + enforce silently in downstream command's existing constraint enforcement steps |
| New enforcement gate for pre-populated content | New gate UX | Reuse the existing three-option AskUserQuestion gate pattern (Looks good / Flag an issue / Start over) already in every downstream command |
| New stage directory structure for pre-populated files | New `pre-populated/` subdirectory | Write directly to existing stage directories — same location as generated files |

## Common Pitfalls

### Pitfall 1: Hook grep pattern misses `pre-populated`

**What goes wrong:** The grep regex in `pre-tool-use.sh` matches `not-started|in-progress|complete` only. If `pre-populated` isn't in the pattern, grep returns empty string. Empty string falls through to the block path with a confusing "currently not-started" message.

**Why it happens:** The regex was written before `pre-populated` existed as a status value. Easy to miss that grep returns empty rather than the literal string.

**How to avoid:** Update grep regex in the same plan that adds `pre-populated` writes. Verify with a test STATE.md row that contains `pre-populated`.

**Warning signs:** Hook blocks writes to a stage that shows `pre-populated` in STATE.md with message "currently not-started."

### Pitfall 2: Downstream command in-progress branch obscures pre-populated files

**What goes wrong:** `in-progress` branch in outcomes.md checks `if 01-outcomes/ files exist`. Pre-populated files exist there, so the command might drop into `in-progress` rather than `pre-populated` if the status check is done in the wrong order.

**Why it happens:** File existence check and status check are two separate signals. If the command checks files before checking STATE.md status, it can misroute.

**How to avoid:** Always check STATE.md status first, then check file existence within each branch. The `pre-populated` branch takes precedence over the `in-progress` file-existence check.

### Pitfall 3: Sessions pre-population writes too much

**What goes wrong:** Pre-population for Stage 5 writes full session content (facilitator guides, participant materials) from source documents, creating a massive write pass that exceeds what enforcement can meaningfully correct.

**Why it happens:** Source materials (facilitator guides, slide decks) contain session-level content — tempting to write it all.

**How to avoid:** Enforce structure-only constraint in the pre-population write block: session names, outcome mapping, template placeholder, pre-work if present. Hard limit — no facilitator guide content.

### Pitfall 4: NEEDS: markers persist after enforcement pass

**What goes wrong:** User runs `/curriculum:outcomes`, enforcement auto-corrects violations, but NEEDS: markers remain in the written output files.

**Why it happens:** Enforcement replaces field values but doesn't strip the marker comments.

**How to avoid:** Downstream command enforcement pass must scan for and remove all `# NEEDS:` lines before writing the corrected output files. Add this as an explicit enforcement step in the `pre-populated` branch.

### Pitfall 5: Gap report absent edge case

**What goes wrong:** Clean intake path completes, no gap report exists, but somehow pre-population is triggered (e.g., a future refactor or edge case).

**Why it happens:** Pre-population reads gap report as input. If it doesn't exist, behavior is undefined.

**How to avoid:** At the start of the pre-population block in intake.md, check if gap report exists. If not present (because this is clean intake, not audit mode), skip pre-population entirely and exit the block. This is Claude's discretion per CONTEXT.md — check for gap report absence before writing anything.

## Code Examples

### Inline NEEDS: marker format

```markdown
### PO-1: Identify monthly cash shortfall from a cash flow statement
- bloom_level: Analyze
- prerequisite_knowledge: Can read basic financial statements; cannot yet interpret timing gaps
- transfer_context: # NEEDS: transfer_context absent in source materials — /curriculum:outcomes will fill this
```

The marker format follows the pattern: `# NEEDS: [description of what's missing] — /curriculum:[command] will fix this`

### STATE.md Stage Progress table with new enum

```markdown
## Stage Progress
| Stage | Name | Status | Completed |
|-------|------|--------|-----------|
| 1 | Intake | complete | 2026-03-23 |
| 2 | Outcome Design | pre-populated | - |
| 3 | Assessment Design | pre-populated | - |
| 4 | Module Structure | not-started | - |
| 5 | Session Content | pre-populated | - |
| 6 | Metaskill Mapping | not-started | - |
| 7 | Transfer Ecosystem | not-started | - |
| 8 | Marketing Derivation | not-started | - |
| 9 | Validation | not-started | - |

<!-- Stage status enums: not-started | in-progress | pre-populated | complete -->
```

### Pre-tool-use.sh updated status handling

```bash
PREREQ_STATUS=$(grep -A1 "| $PREREQ_NUM " "$STATE_FILE" | grep -oE 'not-started|in-progress|pre-populated|complete' | head -1)

if [ "$PREREQ_STATUS" = "complete" ]; then
  exit 0
fi

# Build message based on status
if [ "$PREREQ_STATUS" = "pre-populated" ]; then
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be approved first. Stage $PREREQ_NUM has a draft ready — run $PREREQ_CMD to review and approve it."
else
  REASON="Stage $STAGE_NUM ($STAGE_NAME) requires Stage $PREREQ_NUM ($PREREQ_NAME) to be complete. Stage $PREREQ_NUM is currently ${PREREQ_STATUS:-not-started}. Run $PREREQ_CMD to finish it first."
fi
```

### Downstream command pre-populated branch (outcomes.md example)

```markdown
### 2. Check Stage 2 status

Read the Stage 2 row from STATE.md `Stage Progress` table.

- **`not-started`** — proceed to Generation section below
- **`pre-populated`** — Read all files from `workspace/*/01-outcomes/`. Run all five
  constraint enforcement steps silently against the existing content (same steps as post-generation).
  Remove any `# NEEDS:` marker lines from the corrected output. Display the corrected outcome set
  and thinking-level distribution summary. Proceed directly to the Review Gate section.
  Do not regenerate — the content source is the extracted draft, not the project brief.
- **`in-progress`** — check whether `workspace/*/01-outcomes/` files exist from a previous
  partial run; if yes, re-display them and proceed directly to the Review Gate section;
  if no files exist, regenerate from scratch starting from the Generation section
- **`complete`** — respond: "Outcomes are already designed for this program. Run
  `/curriculum:assessments` to continue."
```

### Session manifest format (structure only)

```markdown
# Session Manifest

**Generated:** {date}
**Stage:** Pre-populated from source materials (structure only)
**Status:** Draft — run /curriculum:sessions to review and enforce schema

---

## Session 1: {session name from source}

- **Mapped outcomes:** SO-1-1-1, SO-1-1-2
- **Session template:** # NEEDS: session_template not determinable from source — /curriculum:sessions will assign
- **Pre-work:** {if found in source materials, otherwise "None identified in source materials"}
- **Estimated duration:** {if stated in source}

---

## Session 2: {session name}
...
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Three-value status enum (not-started / in-progress / complete) | Four-value enum adding `pre-populated` | Phase 9 | hook must match new value; all downstream commands need new branch |
| intake.md Step 6 writes project-brief.md + gap report only | intake.md Step 6 writes project-brief.md + gap report + pre-populated stage files | Phase 9 | audit mode intake becomes a richer kickoff — downstream commands start from drafts |
| Downstream commands always generate from scratch | Downstream commands detect `pre-populated` and enter enforcement-only mode | Phase 9 | INTK-12: pipeline starts from what exists |

## Open Questions

1. **Sessions pre-population file name**
   - What we know: Stage 5 directory is `04-sessions/`, and the sessions command dispatches subagents that write individual session files
   - What's unclear: Should the manifest be written as `session-manifest.md` (a new file type) or structured to look like the partial session files the subagent would write?
   - Recommendation: Write `session-manifest.md` as a new summary file. The downstream `/curriculum:sessions` command reads it for context when dispatching Tasks, then replaces it with full session files on approval. This avoids confusion with the session subagent's output format.

2. **Pre-population write count announcement**
   - What we know: Phase 8 established "announce progress per file during reading" pattern; Phase 5 established "write all files simultaneously" rule
   - What's unclear: Should pre-population announce each file as it writes (per Phase 8 pattern) or write silently and surface results in the summary table?
   - Recommendation: Write silently, surface everything in the post-intake summary table. The simultaneous-write rule (Phase 5) makes per-file announcements awkward since all writes happen in one pass. The summary table provides complete transparency after the fact.

3. **What to write when stage is Shallow but most fields are missing**
   - What we know: Shallow means content exists but fails specific schema requirements — could be 1 field missing or 5 fields missing
   - What's unclear: At what point does a "Shallow" stage produce so little usable content that pre-populating it creates more confusion than starting fresh?
   - Recommendation: Write whatever is present, mark everything missing with NEEDS: markers. The downstream enforcement pass either fills gaps or the user chooses "Start over." Never make this decision during pre-population — write the draft and let the user decide.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — this is a Claude Code plugin (markdown command files + bash hook); behavior is specified in natural language and verified by running the plugin end-to-end |
| Config file | none |
| Quick run command | Manual: run `/curriculum:intake` with test source materials in audit mode |
| Full suite command | Manual: full audit mode flow from intake through `/curriculum:outcomes` with pre-populated draft |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INTK-12 | Pre-populated files written to stage dirs after intake approval | smoke | None — plugin behavior; manual verification | N/A |
| INTK-12 | STATE.md shows `pre-populated` for written stages | smoke | `grep 'pre-populated' workspace/*/STATE.md` | ❌ Wave 0: stage dirs and STATE.md must exist |
| INTK-12 | Hook blocks advancement when prior stage is `pre-populated` | unit (bash) | `echo '{"tool_name":"Write","tool_input":{"file_path":"workspace/test/01-outcomes/x.md"}}' \| bash .claude/hooks/pre-tool-use.sh` | ✅ hook exists |
| INTK-12 | Downstream command `pre-populated` branch displays draft and runs enforcement | smoke | Manual: run `/curriculum:outcomes` after pre-population | N/A |
| INTK-12 | "Start over" from pre-populated branch wipes files and resets status | smoke | Manual: choose Start over at enforcement gate | N/A |
| INTK-12 | NEEDS: markers absent from approved output files | smoke | `grep 'NEEDS:' workspace/*/01-outcomes/*.md` after approval | N/A |

### Sampling Rate
- **Per task commit:** `grep -r 'pre-populated' workspace/test-program/STATE.md` (spot check state)
- **Per wave merge:** Full manual audit mode flow with test materials
- **Phase gate:** Full audit mode flow green + hook unit test green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Test STATE.md with `pre-populated` status rows — needed for hook unit test
- [ ] Test source materials in `workspace/test-program/source-material/` — needed for manual smoke tests
- [ ] Hook unit test wrapper — a script that feeds a constructed JSON payload to pre-tool-use.sh with a STATE.md showing `pre-populated`, verifies the deny response

*(The hook file itself exists; the test fixture STATE.md and test invocation script do not.)*

## Sources

### Primary (HIGH confidence)
- Direct code read: `.claude/plugins/curriculum/commands/intake.md` — full audit mode section including Step 6 file writes and gap report format
- Direct code read: `.claude/plugins/curriculum/commands/outcomes.md` — complete Prerequisites section pattern and constraint enforcement steps
- Direct code read: `.claude/plugins/curriculum/commands/assessments.md` — Prerequisites section pattern
- Direct code read: `.claude/plugins/curriculum/commands/modules.md` — Prerequisites section pattern
- Direct code read: `.claude/hooks/pre-tool-use.sh` — full hook implementation including grep pattern and block message logic
- Direct code read: `workspace/test-program/STATE.md` — live STATE.md showing exact table format and comment line with enum values
- Direct read: `.planning/phases/09-stage-pre-population/09-CONTEXT.md` — all locked decisions for this phase

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` accumulated decisions — established patterns (one-pass writes, forward-looking messages, silent enforcement before display)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all files directly read; no external dependencies
- Architecture patterns: HIGH — all patterns derived from existing code that already runs in production
- Pitfalls: HIGH — derived from specific implementation details in the hook and command files, not from speculation
- Validation: MEDIUM — plugin behavior cannot be fully automated; manual verification is the primary gate

**Research date:** 2026-03-23
**Valid until:** 60 days — stable markdown plugin; no dependency versioning concerns
