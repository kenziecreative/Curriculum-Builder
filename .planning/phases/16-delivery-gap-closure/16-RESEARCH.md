# Phase 16: Delivery Gap Closure - Research

**Researched:** 2026-03-25
**Domain:** Cross-phase wiring fixes — Node.js script path logic, command file check logic, filename alignment
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DLVR-02 | Marketing package and facilitator guides generate polished HTML alongside markdown | Fix generate-html.js to write HTML into the same `delivery/session-N/` paths that assemble.md creates, instead of using original `04-sessions/M-N-S-N/` directory names |
| DLVR-03 | Curriculum verifier checks completeness before delivery — including Stage 4 presence check | Fix verify.md Check A to look for files that modules.md actually writes (`sequence-rationale.md` or `M-*/module-spec.md`) instead of `module-structure.md` which never exists |
| AUDIT-01 | Audit mode implements three content-handling modes — gap-fill, enrich, hands-off | Fix intake.md Stage 3 pre-population to write `assessment-map.md` (the file modules.md reads) instead of `assessment-plan.md` (a file no downstream command consumes) |
</phase_requirements>

---

## Summary

Phase 16 is pure gap closure. All three bugs were discovered by the v3.0 milestone audit and are fully documented — the audit contains both the diagnosis and the recommended fix for each. No new logic is required; no new files are created.

The three bugs are independent. Each touches exactly one file and zero shared state. The largest single change (DLVR-02 in generate-html.js) requires rethinking where the script reads session directories from — instead of reading from the source `04-sessions/` directory, it must read from `delivery/session-N/` after assemble.md has already copied files there. The other two are one-line replacements.

There is no design work required for this phase. The correct values are already known from reading the files. The research task is to document exactly which lines change and confirm no side effects.

**Primary recommendation:** Fix DLVR-02 first (generate-html.js) since it is the most structurally interesting change, then DLVR-03 (verify.md, one line), then AUDIT-01 (intake.md, one word in a filename). All three can go in one commit.

---

## Bug Analysis

### Bug 1: DLVR-02 — HTML and markdown in different delivery/ directories

**File:** `.claude/plugins/curriculum/scripts/generate-html.js`

**Root cause:** The script reads session directories from the source stage directory (`04-sessions/`) and writes HTML into `delivery/{original-session-id}/`. But `assemble.md` copies markdown files into `delivery/session-N/` using sequential numbering. The original session IDs (e.g., `M-1-S-1`) do not match the delivery names (e.g., `session-1`), so HTML and markdown for the same session are in different subdirectories.

**Current behavior (lines 43–62 of generate-html.js):**
```javascript
const sessionsStageDir = path.join(projectDir, '04-sessions')
// ...
const sessionDirs = fs.readdirSync(sessionsStageDir, { withFileTypes: true })
  .filter(d => d.isDirectory())

for (const sessionDir of sessionDirs) {
  const sessionPath = path.join(sessionsStageDir, sessionDir.name)
  const guideFile = path.join(sessionPath, 'facilitator-guide.md')
  // ...
  const subDeliveryDir = path.join(deliveryDir, sessionDir.name)  // ← uses M-1-S-1 as name
  fs.writeFileSync(path.join(subDeliveryDir, 'facilitator-guide.html'), ...)
}
```

**What assemble.md does:**
- Lists subdirs under `04-sessions/`, sorts alphabetically
- Creates `delivery/session-1/`, `delivery/session-2/`, etc. (sequential)
- Copies `facilitator-guide.md` into `delivery/session-N/`

**The fix — two valid approaches:**

Option A (simpler, preferred): Change generate-html.js to read from `delivery/session-N/` directories instead of `04-sessions/`. After assemble.md runs, the markdown is already in `delivery/session-N/`. The script just walks `delivery/session-*/` directories looking for `facilitator-guide.md` and writes `facilitator-guide.html` alongside it.

Option B: Pass a mapping from original session IDs to session-N names. More complex, not needed.

**Option A implementation sketch:**
```javascript
// Replace the 04-sessions block with:
const sessionDirs = fs.readdirSync(deliveryDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name.match(/^session-\d+$/))
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

for (const sessionDir of sessionDirs) {
  const sessionDeliveryPath = path.join(deliveryDir, sessionDir.name)
  const guideFile = path.join(sessionDeliveryPath, 'facilitator-guide.md')

  if (!fs.existsSync(guideFile)) continue

  const raw = fs.readFileSync(guideFile, 'utf-8')
  const content = raw.replace(/^---[\s\S]*?---\n/, '')
  const html = await marked(content)
  fs.writeFileSync(path.join(sessionDeliveryPath, 'facilitator-guide.html'), wrapHtml('Facilitator Guide', html))
}
```

**Side effects to check:** The `generate-html.ts` dashboard watcher is a separate file — it is NOT the same as `generate-html.js`. The standalone script does not affect the dashboard watcher. The fix is fully contained to `generate-html.js`.

**Dependency order:** generate-html.js is called AFTER assemble.md copies files (Step 4 in assemble.md). So `delivery/session-N/` directories with markdown files will already exist when the script runs. Option A is safe.

---

### Bug 2: DLVR-03 — verify.md Check A false-positive for Stage 4

**File:** `.claude/plugins/curriculum/commands/verify.md`

**Root cause:** verify.md Check A looks for `03-modules/module-structure.md`. This filename was never written by modules.md — it is a vestigial reference to an older naming convention. modules.md actually writes:
- `03-modules/sequence-rationale.md`
- `03-modules/M-1/module-spec.md`, `03-modules/M-2/module-spec.md`, etc.

**Current table row (verify.md, line 50):**
```
| `workspace/{project}/03-modules/module-structure.md` | Not yet generated | `/curriculum:modules` |
```

**The fix:** Replace this one table row. The audit recommends checking for `sequence-rationale.md` OR any `M-*/module-spec.md`. Using `sequence-rationale.md` is the cleaner single-file check:

```
| `workspace/{project}/03-modules/sequence-rationale.md` | Not yet generated | `/curriculum:modules` |
```

Alternatively, the row could check for `M-*/module-spec.md` (at least one file in any M-* subdirectory), which is also accurate. `sequence-rationale.md` is slightly preferable because it is always a single predictable path and is written at the same time as the module specs.

**Confirmation from modules.md:** The "Approve and continue" branch (lines 252–276) explicitly writes `sequence-rationale.md` and `M-N/module-spec.md` to `03-modules/`. The file `module-structure.md` never appears anywhere in modules.md.

**Side effects:** None. This is a single-cell change in a markdown table inside a command file. The check logic reads the path and does a file existence check — changing the filename changes what is checked.

---

### Bug 3: AUDIT-01 — intake.md pre-population writes wrong filename

**File:** `.claude/plugins/curriculum/commands/intake.md`

**Root cause:** During audit-mode pre-population (Step 5C of intake.md), Stage 3 is handled by writing `assessment-plan.md`. But `modules.md` reads from `assessment-map.md` (which is what `/curriculum:assessments` writes when it runs normally). The pre-populated file `assessment-plan.md` is never read by any downstream command.

**Current text (intake.md, line 753):**
```
- Stage 3 → `workspace/{project}/02-assessments/` — write `assessment-plan.md`
```

**What modules.md reads (modules.md, line 125):**
```
Read from `workspace/*/02-assessments/assessment-map.md`: assessment coverage to confirm what each module must set up learners to demonstrate.
```

**The fix:** Change `assessment-plan.md` to `assessment-map.md` in the Stage 3 output target line.

```
- Stage 3 → `workspace/{project}/02-assessments/` — write `assessment-map.md`
```

**Schema alignment check:** The correct source-of-truth for what assessments.md writes is stage-03-assessments.md schema and assessments.md command. The audit confirms that `assessments.md` writes `assessment-map.md` (the file modules.md reads). Renaming the pre-populated file to `assessment-map.md` makes the pre-populated path match the consumer's expected path.

**Who is affected:** Only audit-mode users who run `/curriculum:modules` without first running `/curriculum:assessments`. The fix makes modules.md find a populated `assessment-map.md` instead of an empty miss, giving it assessment coverage for the module design. Standard pipeline users are unaffected (they run assessments.md, which writes assessment-map.md correctly).

**Side effects:** The summary table in Step 7 of intake.md shows "assessment-plan.md" in the "What was written" column for Stage 3. This display text should also be updated to match. The text is at line 776:
```
| 3: Assessment Design | [files written, e.g., "assessment-plan.md"] | [issues or "None"] |
```
This is example text, not a hardcoded value — Claude generates the actual filename at runtime from what was written. Since the write is now `assessment-map.md`, the generated output will naturally show `assessment-map.md`. No change needed to that example text unless it is treated as a template literal. It is not — it is a guide for what Claude should show. Safe to leave as-is, but updating it to `assessment-map.md` in the example clarifies intent.

---

## Exact Change Map

### Change 1: generate-html.js

**Section:** The `04-sessions` facilitator-guide generation block (lines 42–62)
**Change type:** Replace session-directory reading approach — read from `delivery/session-N/` instead of `04-sessions/`
**New logic:** Walk `delivery/session-*/` directories (numeric sort), look for `facilitator-guide.md`, write `facilitator-guide.html` alongside it

### Change 2: verify.md

**Location:** Check A table, Stage 4 row (line 50)
**Change type:** One-cell replacement in a markdown table
**From:** `workspace/{project}/03-modules/module-structure.md`
**To:** `workspace/{project}/03-modules/sequence-rationale.md`

### Change 3: intake.md

**Location:** Audit Mode Step 5C stage-specific output targets (line 753)
**Change type:** One-word filename change
**From:** `write assessment-plan.md`
**To:** `write assessment-map.md`

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Session directory name mapping | Custom mapping table or argument passing to generate-html.js | Read from `delivery/` directly after assembly | assemble.md already creates `session-N/` directories with markdown; script just needs to read from there |
| Stage 4 presence detection | Complex glob or recursive search | Single file path check against `sequence-rationale.md` | modules.md always writes this file; it is the authoritative Stage 4 presence signal |

---

## Common Pitfalls

### Pitfall 1: Fixing generate-html.js to still read from 04-sessions/

**What goes wrong:** If the fix passes a mapping from `M-N-S-N` to `session-N` as an argument, the mapping must be computed by assemble.md and passed to the script. This adds argument parsing complexity and a new interface contract between two files.

**Why it happens:** The original architecture had generate-html.js as a standalone batch processor reading source files.

**How to avoid:** Read from `delivery/` after assembly. The markdown files are already there. No mapping needed.

**Warning signs:** Any solution that requires modifying assemble.md's Bash call to generate-html.js (changing the argument signature) is the wrong path.

### Pitfall 2: Checking for M-* subdirectory presence in verify.md instead of sequence-rationale.md

**What goes wrong:** `workspace/{project}/03-modules/` (at least one subdirectory containing `module-spec.md`) is harder to express as a simple path check — it requires a glob, not a file existence check. The current Check A table uses file paths, not glob patterns.

**How to avoid:** Use `sequence-rationale.md` as the Stage 4 presence indicator. It is a single file, always at a predictable path, always written in the same approval branch as the module specs.

### Pitfall 3: Changing both the write path and the read path for AUDIT-01

**What goes wrong:** modules.md already reads `assessment-map.md` — that is correct and does not need to change. Only intake.md's write target needs to change. Changing modules.md would break the normal (non-audit) pipeline.

**How to avoid:** Make exactly one change: the filename in intake.md's Stage 3 write target.

---

## Architecture Patterns

### Pattern 1: assemble-then-generate

**What:** assemble.md copies markdown files into `delivery/session-N/` first. generate-html.js runs after. The script's input is the delivery directory, not the source stage directory.

**When to use:** Any time HTML generation needs to match the delivery package structure rather than the source structure. Reading from `delivery/` after assembly means the script always operates on the same files the user will receive.

**Confirmed in assemble.md (Step 4):** The script is called after "all file copies are complete." The `delivery/session-N/` directories with their markdown files exist at the time the script runs.

### Pattern 2: Single-file presence indicators for stage checks

**What:** Each stage is considered present/absent by checking a single well-known file that is always written in the stage's approval branch. verify.md uses these as "canary" files.

**Confirmed pattern from verify.md Check A:**
- Stage 2: `01-outcomes/learning-objectives.md` — matches what outcomes.md writes
- Stage 4 (current, broken): `03-modules/module-structure.md` — does NOT match modules.md output
- Stage 4 (fixed): `03-modules/sequence-rationale.md` — matches modules.md "Approve and continue" branch

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated test suite) |
| Config file | none |
| Quick run command | Read the three modified files and confirm the exact changed lines are correct |
| Full suite command | End-to-end: run `/curriculum:assemble` on a real workspace, then check `delivery/` structure |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DLVR-02 | HTML and markdown co-located in `delivery/session-N/` | manual smoke | `/curriculum:assemble` on real workspace, inspect `delivery/` | ❌ Wave 0 |
| DLVR-03 | No false-positive Stage 4 warning from verify | manual smoke | `/curriculum:verify` on complete workspace | ❌ Wave 0 |
| AUDIT-01 | modules.md finds assessment coverage in audit-mode pre-pop | manual smoke | audit-mode intake then `/curriculum:modules` without assessments | ❌ Wave 0 |

All three tests require a live Claude Code session with a real workspace. No automated command can verify these because they depend on Claude's command execution behavior, not static file content.

### Sampling Rate

- **Per task commit:** Read the modified file and confirm the changed line is correct
- **Per wave merge:** End-to-end smoke test (human, live workspace)
- **Phase gate:** All three changes verified in a single integration pass before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No automated tests exist — all verification is manual smoke testing against a live workspace
- [ ] A test workspace with multiple sessions would be needed to verify DLVR-02 end-to-end

*(This is expected for a Claude Code plugin — the "tests" are interactive pipeline runs.)*

---

## Sources

### Primary (HIGH confidence)

- `generate-html.js` (lines 1–109) — Current HTML output path logic confirmed by direct read
- `verify.md` (lines 44–54) — Check A table confirmed: looks for `module-structure.md` at line 50
- `intake.md` (lines 750–754) — Stage 3 pre-population target confirmed: writes `assessment-plan.md`
- `assemble.md` (lines 55–68, 87–99) — Session naming convention (`session-N`) and generate-html.js invocation confirmed
- `modules.md` (lines 124–127, 252–276) — Reads `assessment-map.md`; writes `sequence-rationale.md` and `M-N/module-spec.md`
- `v3.0-MILESTONE-AUDIT.md` — All three mismatches documented with exact diagnosis and recommended fix

### Secondary (MEDIUM confidence)

- ROADMAP.md Phase 16 section — Confirms fix targets and naming conventions
- REQUIREMENTS.md — Confirms DLVR-02, DLVR-03, AUDIT-01 are the three open requirements

---

## Metadata

**Confidence breakdown:**
- Bug diagnosis: HIGH — all three bugs confirmed by reading the actual source files; audit findings match what the files show
- Fix approach: HIGH — audit document recommends specific fixes; code structure confirms feasibility
- Side effects: HIGH — each change is isolated to one file with no shared state; generate-html.js and generate-html.ts are separate files

**Research date:** 2026-03-25
**Valid until:** Indefinite — these are static file changes with no external dependencies
