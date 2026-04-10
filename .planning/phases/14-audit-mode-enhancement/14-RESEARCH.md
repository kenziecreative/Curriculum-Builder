# Phase 14: Audit Mode Enhancement - Research

**Researched:** 2026-03-25
**Domain:** Claude Code plugin refactoring — subagent extraction, multi-dimension content assessment, mode-aware downstream routing
**Confidence:** HIGH (all findings verified by direct code inspection)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Auditor agent trigger**
- `intake.md` spawns `curriculum-auditor.md` as a Task subagent — same pattern as `sessions.md` spawning `session-generator.md`
- Auditor runs in its own context; returns structured output to intake.md
- `curriculum-auditor.md` must have an explicit Completion Signal section specifying the exact return format before being wired to intake.md

**Auditor return storage**
- Auditor writes results to a file in `workspace/{project}/00-project-brief/` (name TBD — Claude's discretion)
- intake.md reads the file after the agent returns
- Downstream commands (modules.md, sessions.md) read the same file to determine mode

**Auditor return format**
- Markdown table per stage: `Stage | extraction_confidence | content_quality | summary`
- intake.md parses this table to determine: what follow-up questions to ask, what mode to assign per stage
- Completion Signal section in curriculum-auditor.md specifies this exact structure

**Isolation testing**
- Plan includes a checkpoint task: run `curriculum-auditor.md` against the reference test case (6-session AI agent workflows workshop — facilitator guide + slide deck) before wiring to intake.md
- Verify Completion Signal returns correct format
- Only wire to intake.md after the checkpoint passes

**content_quality levels**
- Determined by schema completeness, using the same rubric as the gap report
- **strong** = all required schema fields present and meet quality criteria
- **partial** = fields present but don't meet criteria (wrong Bloom's level, missing transfer_context, etc.)
- **absent** = no content found in source documents
- Mode selection uses `content_quality` exclusively — `extraction_confidence` drives follow-up question decisions, not mode assignment

**Three-mode routing**
- **gap-fill** (`content_quality: absent`) — generate fresh from the project brief
- **enrich** (`content_quality: partial`) — keep valid fields, generate only what's missing or violating; mark added fields NEW, changed fields UPDATED in the summary table
- **hands-off** (`content_quality: strong`) — load pre-populated file, run enforcement checks, surface any NEEDS: markers or violations, present gate without regenerating

**Commands that read mode**
- `modules.md` and `sessions.md` only — both already have `pre-populated` state branches; mode routing slots into those branches
- `outcomes.md` and `assessments.md` are out of scope for this phase

**Side-by-side diff trigger**
- Always show comparison when in enrich or hands-off mode (content_quality: partial or strong)
- Triggered in modules.md (and sessions.md if applicable) before writing any files

**Side-by-side diff format**
- Two-column table per module: `Module | From your materials | What will be added/changed`
- Each proposed change includes a one-line plain-language reason
- No schema field names, no ID references in the diff display
- After the diff: same gate pattern — approve / flag an issue / start over

**Mode confirmation UX**
- Surfaced after extraction table, before follow-up questions
- Displayed as a stage table with plain-language "What will happen" descriptions:
  - gap-fill → "Build from scratch"
  - enrich → "Fill in what's missing"
  - hands-off → "Keep what you have and validate it"
- Mode names (gap-fill / enrich / hands-off) never shown to user — plain language only
- Confirmation gate: "Looks good" / "Change what happens to a stage" / "Start over"
- "Change what happens to a stage" allows per-stage mode override before any processing begins

### Claude's Discretion

- File name for audit results file in 00-project-brief/
- Exact wording of the Completion Signal format in curriculum-auditor.md
- How to handle `pre-populated` state when audit-results.md is absent (e.g., user manually dropped in files without running audit mode)
- Ordering of follow-up questions within the confirmation pass

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| AUDIT-01 | Audit mode implements three content-handling modes — gap-fill (no source content), enrich (thin/incomplete), hands-off (strong existing content) — triggered by extraction confidence level | Mode routing logic documented; content_quality rubric defined; existing pre-populated branches in modules.md and sessions.md identified as integration points |
| AUDIT-02 | When audit mode produces a module structure that differs from source, it shows a side-by-side with reasoning before writing files | Diff trigger and two-column table format specified; gate pattern reuse confirmed from existing modules.md/sessions.md |
| AUDIT-03 | Curriculum auditor extracted into dedicated specialist agent — intake command delegates source material analysis to it | session-generator.md provides exact structural model; intake.md Audit Mode section (Steps 1–6) is the extraction source; Completion Signal pattern documented |
</phase_requirements>

---

## Summary

Phase 14 is a surgical refactoring of audit mode, not a feature build from scratch. The full extraction and confidence-assessment logic (Steps 1–6 of intake.md's Audit Mode section, approximately 350 lines) already exists and works. The phase moves this logic into a dedicated subagent file, adds a second assessment dimension (`content_quality` alongside existing `extraction_confidence`), and wires the resulting per-stage assessment into mode-aware routing in modules.md and sessions.md.

The `session-generator.md` agent is the direct structural model for `curriculum-auditor.md`. It demonstrates the exact pattern: Context Received section, generation instructions, and a Completion Signal with a contractual return format. Intake already uses this pattern on the send side (spawning Tasks with context blocks); the auditor uses it on the receive side. The critical constraint is that the Completion Signal must be authored and verified in isolation before intake.md is wired to read from it.

The downstream integration is also lower-risk than it appears: both `modules.md` and `sessions.md` already have `pre-populated` state branches that handle the case where content exists but hasn't been approved. Mode routing (gap-fill / enrich / hands-off) slots directly into these branches as sub-cases of the existing `pre-populated` path. The side-by-side diff is the only net-new UI element, and it follows the established two-column table format from the interactive-design skill.

**Primary recommendation:** Build in three discrete units — (1) create and validate curriculum-auditor.md in isolation; (2) wire intake.md to spawn it and read audit-results.md; (3) extend modules.md and sessions.md pre-populated branches with mode-aware routing and the diff display.

---

## Standard Stack

### Core (Claude Code plugin pattern)

| Component | Version/Format | Purpose | Why Standard |
|-----------|---------------|---------|--------------|
| Task subagent | Claude Code built-in | Spawn isolated agent with its own context window | Established pattern — sessions.md → session-generator.md |
| Markdown agent file | `.claude/plugins/curriculum/agents/` | Specifies agent objective, instructions, Completion Signal | All curriculum agents live here |
| AskUserQuestion | Claude Code built-in | Per-stage mode override gate, diff confirmation | Used across all existing commands |
| Markdown file I/O | Read/Write tool calls | Auditor writes audit-results.md; downstream commands read it | All state persistence in this plugin uses file-based state |

### Supporting

| Component | Format | Purpose | When to Use |
|-----------|--------|---------|-------------|
| curriculum-voice.md | Reference read | Vocabulary quarantine enforcement | Any user-facing output from auditor or mode confirmation |
| interactive-design skill | SKILL.md | Two-column diff table format, AskUserQuestion design | Stage table, diff display, gate options |
| STATE.md | Workspace file | Mode assignment per stage storage | Downstream commands need mode without re-parsing audit-results.md |
| stage-02 through stage-05 schemas | Reference schemas | content_quality rubric — what "strong" means per stage | auditor's schema completeness check |

### No New Dependencies

This phase introduces zero new libraries, tools, or external dependencies. Every mechanism it needs already exists in the plugin or in Claude Code itself.

---

## Architecture Patterns

### Recommended File Layout (new file)

```
.claude/plugins/curriculum/agents/
├── session-generator.md      # Existing — model to follow
└── curriculum-auditor.md     # New — created in Wave 1
```

```
workspace/{project}/00-project-brief/
├── project-brief.md          # Existing
├── curriculum-gap-report.md  # Existing (audit mode)
└── audit-results.md          # New — auditor writes this
```

### Pattern 1: Task Subagent with Completion Signal

`sessions.md` spawns `session-generator.md` this way. `intake.md` will spawn `curriculum-auditor.md` the same way. The Completion Signal is the contract — it specifies the exact markdown table the caller reads.

Completion Signal format for `curriculum-auditor.md`:

```markdown
## Completion Signal

After writing audit-results.md, return the following exactly:

```
Audit complete: {project-name}
Stages assessed: 7 (Stages 2–8)
Results written to: workspace/{project}/00-project-brief/audit-results.md

Stage summary:
| Stage | extraction_confidence | content_quality | summary |
|-------|----------------------|----------------|---------|
| 2: Learning Outcomes | High | partial | Outcomes present; behavioral format missing |
| 3: Assessment Design | Medium | absent | No assessments found |
| 4: Module Structure | High | strong | All required fields present |
| 5: Session Content | High | partial | Session structure present; pre-work absent |
| 6: Metaskill Mapping | None | absent | Not referenced in source materials |
| 7: Transfer Ecosystem | Low | absent | No transfer design found |
| 8: Marketing | None | absent | No promotional copy found |
```
```

**Why this exact format:** `intake.md` parses the stage table to drive both the mode confirmation display and follow-up question decisions. The column names must match exactly.

### Pattern 2: Mode-Aware Pre-Populated Branch (modules.md)

The existing `pre-populated` branch in `modules.md` (lines 36–44) currently has one behavior: load files, run enforcement, display gate. The new pattern adds mode routing as sub-cases:

```
pre-populated branch:
  → read audit-results.md (if present)
  → look up Stage 4 content_quality
  → if strong → hands-off path (run enforcement, show diff, gate)
  → if partial → enrich path (load files, generate only what's missing, show diff, gate)
  → if absent or audit-results.md not present → gap-fill path (existing generation behavior)
```

The gap-fill path IS the existing generation behavior — no code changes needed for that branch. Only hands-off and enrich add new behavior.

### Pattern 3: Graceful Degradation — Absent audit-results.md

When modules.md or sessions.md reads `pre-populated` but finds no `audit-results.md` (user manually dropped files without running audit mode), the correct fallback is gap-fill behavior. This is the safest default: generates from project brief, does not assume the pre-populated content is valid.

Document this rule explicitly in both commands so it's unambiguous.

### Pattern 4: Per-Stage Mode Override

The mode confirmation display shows a stage table before follow-up questions. The "Change what happens to a stage" option must collect: which stage, and what mode. Since only three modes exist, a simple AskUserQuestion with the stage as context works. After override, re-display the updated stage table before proceeding.

### Anti-Patterns to Avoid

- **Parsing audit-results.md in multiple places:** STATE.md should store the parsed mode assignment so modules.md and sessions.md read a key-value, not re-parse the table. Avoids drift if the table format ever changes.
- **Combining Completion Signal verification with integration:** The isolation checkpoint must pass before wiring. Running integration first and debugging via the full intake flow is much harder than testing the auditor alone.
- **Showing mode names to users:** gap-fill / enrich / hands-off are internal routing values. The user sees "Build from scratch" / "Fill in what's missing" / "Keep what you have and validate it."
- **Exposing schema field names in the diff:** The two-column diff shows "From your materials" / "What will be added/changed" in plain language — no field names, no ID references.
- **Auto-correcting during enrich without showing the diff first:** The diff must be shown and approved before any file writes occur. This is the same gate-before-write discipline used everywhere in the plugin.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Agent isolation | Custom context-passing mechanism | Task subagent (Claude Code built-in) | Session-generator already proved this works; Task gives clean context boundary |
| Persistent mode storage | Custom state format | STATE.md key-value entry | All plugin state lives in STATE.md; consistency is the point |
| Diff display | Custom diff algorithm | Two-column markdown table | Plugin already uses markdown tables for all comparative displays; no logic needed |
| Content quality assessment | New rubric | Existing gap report rubric (Exists/Shallow/Missing → strong/partial/absent) | Gap report already defines these thresholds per stage; auditor applies the same logic |
| Vocabulary quarantine | New term filter | curriculum-voice.md reference + existing Never-say lists | Already enforced in every command; auditor references the same voice file |

**Key insight:** Every mechanism this phase needs already exists somewhere in the plugin. The work is extraction, wiring, and extension — not invention.

---

## Common Pitfalls

### Pitfall 1: Completion Signal format drift

**What goes wrong:** curriculum-auditor.md Completion Signal specifies one table format; intake.md parses a slightly different format. The integration appears to work in testing but silently misreads confidence levels.

**Why it happens:** Completion Signal is authored separately from the parsing logic in intake.md. Small discrepancies (column name casing, column order, confidence level labels) go unnoticed until a real document is tested.

**How to avoid:** Specify the Completion Signal format as a verbatim example in RESEARCH.md (done above). Use that exact example in both curriculum-auditor.md AND in the intake.md parsing instruction. The isolation checkpoint will catch mismatches before wiring.

**Warning signs:** Auditor returns the signal but intake.md assigns wrong modes; all stages land in the same mode regardless of content.

### Pitfall 2: extraction_confidence vs. content_quality conflation

**What goes wrong:** The two dimensions get used interchangeably, or mode assignment accidentally reads extraction_confidence instead of content_quality.

**Why it happens:** The existing gap report only has one dimension (Exists/Shallow/Missing). Adding a second dimension requires explicit discipline to keep them separate in the auditor's assessment logic AND in intake.md's parsing.

**How to avoid:** The auditor must assess both dimensions independently for each stage. The mode selection rule is explicit and simple: content_quality drives mode assignment; extraction_confidence drives follow-up question decisions. Write these as two separate rules, not one combined rule.

**Warning signs:** A stage with High extraction_confidence gets assigned "Build from scratch" mode (means content_quality was misread); a stage with Low extraction_confidence gets hands-off mode (means dimensions were swapped).

### Pitfall 3: mode confirmation gate appearing after follow-up questions

**What goes wrong:** Follow-up questions are asked before the user sees the mode confirmation table. User answers questions and then is told some stages will be built from scratch — at which point they can't go back.

**Why it happens:** The existing audit mode flow is linear: extraction table → follow-up questions → confirmation gate. The mode confirmation is a new step that must be inserted between the extraction table and follow-up questions, which disrupts the existing linear flow.

**How to avoid:** The mode confirmation display and gate must appear immediately after the extraction table (Step 2) and before Step 4 (follow-up questions). The per-stage mode override happens at this gate — only after it passes does intake proceed to follow-up questions.

**Warning signs:** User expresses confusion about why they're being asked questions for stages they don't have content for; user wants to change modes after follow-up questions have already been asked.

### Pitfall 4: diff display showing schema field names

**What goes wrong:** The two-column diff shows internal field names like `group_processing_prompt`, `bloom_level`, or `transfer_context` as column headers or row labels.

**Why it happens:** The enrich logic compares pre-populated content against schema requirements. The natural way to describe what's being added is to name the schema field. Vocabulary quarantine requires translation to plain language before any user-facing display.

**How to avoid:** Apply the same plain-language substitution table from curriculum-voice.md to every row in the diff. "group_processing_prompt" → "group reflection question"; "transfer_context" → "where they'll use it"; "bloom_level" → "thinking level." Write these substitutions into the diff generation instruction explicitly.

**Warning signs:** Any cell in the diff table contains an underscore character or instructional design term.

### Pitfall 5: modules.md pre-populated branch breaking for non-audit users

**What goes wrong:** Extending the pre-populated branch with mode routing breaks the experience for users who entered the pre-populated state through clean intake (pre-populated from gap report, not from audit mode).

**Why it happens:** Both audit mode and the gap report pre-population write `pre-populated` to STATE.md. The new mode routing reads audit-results.md — which doesn't exist for clean intake users. If the absence of audit-results.md causes an error or wrong mode, clean intake users are affected.

**How to avoid:** The absent audit-results.md fallback MUST be gap-fill (existing generation behavior). When audit-results.md is absent, modules.md behaves exactly as it does today. Only when audit-results.md is present does mode routing engage.

**Warning signs:** Clean intake users (no existing materials) encounter a diff display or are told their content is being "validated" when they never provided source materials.

---

## Code Examples

Verified patterns from direct code inspection:

### Task Subagent Dispatch (from sessions.md)

```markdown
For EACH module in the module list, spawn a Task subagent simultaneously. Do NOT await one Task
before dispatching the next. Dispatch all Tasks at the same time.

Each Task receives:

**Description of work:**
> Generate all sessions for module [module_name] per the session-generator agent specification
> at .claude/plugins/curriculum/agents/session-generator.md

**Context provided to the Task:**
- The full content of `03-modules/M-N/module-spec.md` for this module
- The full content of `01-outcomes/learning-objectives.md`
- The full content of `00-project-brief/project-brief.md`
- The full content of `.claude/reference/schemas/stage-05-sessions.md`
- Output directory: `workspace/{project-name}/04-sessions/`
```

For curriculum-auditor.md, intake.md dispatches a single Task (not parallel) because there is only one audit to run.

### Completion Signal Pattern (from session-generator.md)

```markdown
## Completion Signal

After writing all 4 files for all sessions in this module, return the following to the orchestrator:

```
Module complete: [module_id] — [module_name]
Sessions written: [N]
Session directories created:
- [output_dir]M-N-S-1/
- [output_dir]M-N-S-2/
Files per session: session.md, facilitator-guide.md, participant-materials.md, slide-outline.md
```
```

curriculum-auditor.md uses the same pattern — structured text block with a header line followed by the data table.

### Existing pre-populated Branch (from modules.md lines 36–44)

```markdown
- **`pre-populated`** — Read all files from `workspace/*/03-modules/`. Run all module structure
  enforcement checks silently against the existing content (named group processing prompts, DCR
  trigger check when skill_type=open and bloom>=Analyze, sequence coherence). Remove any `# NEEDS:`
  marker lines from the corrected output before displaying. Display the corrected module structure
  summary and gate table. Proceed directly to the Module Structure Gate section.
  Do not regenerate — the content source is the extracted draft, not the project brief.
  On "Start over" at the Module Structure Gate: wipe all files in `workspace/*/03-modules/`, set
  Stage 4 status to `not-started` in STATE.md (clearing the `pre-populated` status), restart from
  the Generation section.
```

This is the exact block that gains mode-aware sub-branching in Phase 14.

### AskUserQuestion — Mode Confirmation Gate

The mode confirmation gate uses a three-option pattern consistent with all other gates in the plugin:

```
"Looks good" → proceed to follow-up questions
"Change what happens to a stage" → ask which stage, show updated table, re-present gate
"Start over" → destructive confirmation, reset to Opening
```

The per-stage override must use a sequential AskUserQuestion pair: first "Which stage?" then "What should happen?" — not a combined prompt.

### Side-by-Side Diff Table Format

Per interactive-design skill — two-column table, plain language, no schema terms:

```markdown
| Module | From your materials | What will be added/changed |
|--------|---------------------|---------------------------|
| [module_name] | [what exists, plain language] | [what will change + one-line reason] |
```

Row count = one row per module. Each change gets a plain-language reason inline (not a separate column).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-----------------|--------------|--------|
| Single extraction dimension (extraction_confidence) | Two dimensions: extraction_confidence + content_quality | Phase 14 | Mode assignment separated from field-confidence assessment |
| Monolithic audit mode block in intake.md (~350 lines) | Dedicated curriculum-auditor.md specialist agent | Phase 14 | intake.md becomes a dispatcher; auditor is independently testable |
| Single pre-populated behavior in modules.md / sessions.md | Three modes: gap-fill / enrich / hands-off | Phase 14 | Downstream commands respect source content quality instead of always regenerating |
| No diff before file writes in pre-populated path | Side-by-side diff with gate before any writes | Phase 14 | User approves changes to their materials before they happen |

**Deprecated/outdated after this phase:**
- The inline audit mode logic in intake.md Steps 1–6 moves to curriculum-auditor.md. After extraction, the Steps 1–6 block in intake.md becomes a dispatch call + file read.
- The single-behavior `pre-populated` branch description in modules.md and sessions.md is replaced by the mode-routing description.

---

## Open Questions

1. **File name for audit-results.md**
   - What we know: Claude's discretion; must land in `workspace/{project}/00-project-brief/`
   - What's unclear: Whether it should be named to signal its role clearly (e.g., `audit-results.md` vs. `stage-assessment.md`)
   - Recommendation: `audit-results.md` — short, descriptive, parallel to `curriculum-gap-report.md` in the same directory

2. **STATE.md mode storage format**
   - What we know: downstream commands (modules.md, sessions.md) need mode per stage; reading the full audit-results.md table adds parsing complexity
   - What's unclear: exact key format for per-stage mode storage
   - Recommendation: Add a `Mode Assignment` table to STATE.md during intake's post-audit state write — columns: `Stage | Mode | Source`. Downstream commands read one row, not the full audit file.

3. **Per-stage mode override scope**
   - What we know: override is allowed before any processing begins (at the mode confirmation gate)
   - What's unclear: whether overrides persist to STATE.md or are session-only
   - Recommendation: Write overrides to STATE.md in the same Mode Assignment table — this makes the override durable if the session is interrupted

4. **enrich mode write discipline**
   - What we know: "keep valid fields, generate only what's missing or violating; mark added fields NEW, changed fields UPDATED"
   - What's unclear: where NEW/UPDATED markers appear — in the file itself, or only in the summary table shown to the user
   - Recommendation: Summary table only. The written file should be clean output, not annotated with audit markers. Markers in files create debt that must be stripped before delivery.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual smoke testing (no automated test framework in this plugin) |
| Config file | None — plugin is markdown-based instruction files |
| Quick run command | Run `/curriculum:intake` with test fixture files in source-material/ |
| Full suite command | Run audit mode end-to-end against reference test case; verify audit-results.md, mode confirmation display, modules.md diff behavior |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDIT-03 | curriculum-auditor.md returns correct Completion Signal format | smoke | Manual — run Task with test fixture, inspect audit-results.md | ❌ Wave 0 (new agent file) |
| AUDIT-01 | Three modes display correctly in mode confirmation table | smoke | Manual — run intake with partial-content fixture; verify table shows correct "What will happen" per stage | ❌ Wave 0 (new behavior) |
| AUDIT-01 | modules.md hands-off path runs enforcement without regenerating | smoke | Manual — pre-populate Stage 4 with strong content; run /curriculum:modules; verify diff shows only violations | ❌ Wave 0 (new branch) |
| AUDIT-02 | Side-by-side diff appears before any file writes | smoke | Manual — use partial-content fixture; confirm diff gate appears before 03-modules/ files are written | ❌ Wave 0 (new behavior) |
| AUDIT-01 | gap-fill path triggers for stages with absent content | smoke | Manual — use fixture with Stages 6–8 absent; verify those stages get fresh generation | Partial (existing behavior) |

### Sampling Rate

- **Per task commit:** Manually run the affected command with the reference test case
- **Per wave merge:** Full audit mode path — intake through modules — against reference test case
- **Phase gate:** All three modes triggered at least once; side-by-side diff verified; Completion Signal format verified in isolation before wiring

### Wave 0 Gaps

- [ ] `workspace/test-program/source-material/` — test fixture files for the reference test case (6-session AI agent workflows workshop: facilitator guide + slide deck outline). Must be present before Wave 1 isolation test.
- [ ] `curriculum-auditor.md` — new agent file; all other items depend on this
- [ ] `audit-results.md` — written by the auditor, verified to exist and parse correctly before wiring intake.md

---

## Sources

### Primary (HIGH confidence)

- Direct inspection: `.claude/plugins/curriculum/agents/session-generator.md` — Task subagent pattern, Completion Signal structure
- Direct inspection: `.claude/plugins/curriculum/commands/intake.md` — full Audit Mode section (Steps 1–6); existing extraction logic; gap report rubric; confidence rubric
- Direct inspection: `.claude/plugins/curriculum/commands/modules.md` — existing pre-populated branch (lines 36–44); gate pattern; constraint enforcement structure
- Direct inspection: `.claude/plugins/curriculum/commands/sessions.md` — existing pre-populated branch; Task dispatch pattern; verification logic
- Direct inspection: `.claude/plugins/curriculum/skills/interactive-design/SKILL.md` — two-column table format; AskUserQuestion design rules
- Direct inspection: `.claude/reference/curriculum-voice.md` — vocabulary quarantine terms; plain-language substitutions
- Direct inspection: `.planning/phases/14-audit-mode-enhancement/14-CONTEXT.md` — all locked decisions, format specifications, integration points

### Secondary (MEDIUM confidence)

- Inference from existing STATE.md structure (test-program workspace) — confirms per-stage status tracking pattern; Mode Assignment table format is an extension of this pattern

### Tertiary (LOW confidence)

- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified by direct code inspection; no new dependencies
- Architecture patterns: HIGH — all patterns extracted from existing working code; mode routing is extension of documented pre-populated branches
- Pitfalls: HIGH — identified from explicit design decisions in CONTEXT.md and code structure analysis
- Open questions: MEDIUM — recommendations are well-reasoned but require human decision on Claude's Discretion items

**Research date:** 2026-03-25
**Valid until:** This plugin uses no external libraries; findings are stable until the plugin architecture changes. No expiry.
