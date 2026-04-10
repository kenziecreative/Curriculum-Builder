# Phase 15: Delivery Layer - Research

**Researched:** 2026-03-25
**Domain:** Curriculum package assembly, HTML generation (Node.js + marked + Vite plugin), pre-delivery verification
**Confidence:** HIGH

## Summary

Phase 15 is primarily a code wiring and integration phase, not a library discovery phase. All major decisions are locked. The planner is working within well-understood existing code: a Vite plugin that already generates HTML from markdown (`generate-html.ts`), a final-gate command (`approve.md`), and a validation orchestrator pattern (`validate.md`) that already demonstrates the task-agent dispatch approach used throughout the plugin.

The main implementation challenges are: (1) fixing a confirmed silent bug in `generate-html.ts` where `readdirSync(stagePath).filter(f => f.endsWith('.md'))` misses session subdirectories under `04-sessions/`; (2) wiring `handleHotUpdate` in the Vite plugin so HTML regenerates when pipeline commands write markdown; (3) writing two new commands (`assemble.md`, `verify.md`) that follow the existing orchestrator pattern; and (4) adding verify + assemble calls into `approve.md`'s Final Validation gate branch.

The key design constraint is that `delivery/` is scoped: it holds compiled facilitator + participant packages organized by session, plus transfer and marketing files at root — not a flat dump of all stage output. HTML generation applies only to marketing materials and facilitator guides.

**Primary recommendation:** Build in three layers: (1) fix the recursion bug and wire `handleHotUpdate` in `generate-html.ts`; (2) write `generate-html.js` standalone script that shares the same logic for use by `assemble.md`; (3) write `verify.md` and `assemble.md` commands; then wire both into `approve.md`.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Delivery package contents**
- Included in delivery/: session facilitator guides, participant materials, transfer ecosystem doc, marketing materials
- Excluded from delivery/: validation reports (08-validation/), slide outlines, raw outcomes/assessments files (01, 02), module structure files (03-modules/)
- The content from outcomes and assessments shows up in facilitator guides anyway — no need to duplicate

**Delivery folder structure**
- Organized by session: `delivery/session-1/`, `delivery/session-2/` etc.
- Facilitator guide + participant materials live together in each session folder
- Transfer plan and marketing materials go at the delivery root (not session-specific)

**HTML output scope**
- Marketing materials and facilitator guides get HTML versions alongside their markdown
- Participant materials and transfer doc stay markdown-only
- Same HTML wrapper style for all files — no custom styling per content type (existing Georgia serif, 720px, print CSS is correct)

**Session subdirectory bug fix**
- Fix in generate-html.ts (the dashboard file-watch plugin), not just the new script
- Recurse one level deeper when a stage dir contains subdirectories (handles `04-sessions/session-1/` pattern)
- The new `generate-html.js` script used by `assemble.md` shares the same fix — one fix, two paths covered

**Verifier behavior**
- Slip-through safety net: catches NEEDS: markers, TMA labels as section headers, HTML comments that slipped past Phase 13 enforcement, plus missing required stage files
- Does NOT re-run full vocabulary audit — Phase 13 handles that at write time
- When an issue is found: name the file + tell the user which command fixes it
- Not a binary pass/fail — identifies specifically which files have issues and what's wrong

**Verify integration with approve**
- `/curriculum:verify` auto-runs inside `/curriculum:approve` at the final gate — user cannot skip it
- Also works as a standalone command for manual pre-checks
- Sequence inside approve: verify runs first (silently), then show package summary with any issues inline
- If verify finds blockers, the "mark as delivery-ready" option is disabled/replaced with "fix issues first"

**Assembler trigger and user experience**
- Primary path: approve triggers assemble — when user approves the final gate, approve runs verify then assemble
- `/curriculum:assemble` also exists standalone for re-running the packaging step
- After approval and assembly: show a plain-language file list in the output — not a count, not a full tree

### Claude's Discretion
- Exact check implementation for verify (grep patterns for NEEDS: markers, TMA labels, HTML comments)
- How to handle partial assembly (some stages complete, some not) — copy what's available, note what's missing
- File naming convention inside delivery/ subdirectories

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DLVR-01 | Document assembler command compiles approved stage outputs into facilitator package, participant workbook, and program overview | `assemble.md` command + `generate-html.js` script; assembler follows validate.md Task-agent dispatch pattern; output is `delivery/` directory organized by session |
| DLVR-02 | Marketing package and facilitator guides generate polished HTML alongside markdown | `generate-html.ts` already has `wrapHtml()` — reuse style; standalone `generate-html.js` script called from `assemble.md` via Bash; `handleHotUpdate` wired in Vite plugin for auto-update |
| DLVR-03 | Curriculum verifier checks completeness before delivery: no NEEDS: markers, broken outcome ID references, missing required stage files, no HTML comments in output | `verify.md` new command; auto-runs in `approve.md` Final Validation gate before showing summary |
</phase_requirements>

---

## Standard Stack

### Core (already installed — no new dependencies required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `marked` | `^15.0.0` | Markdown → HTML conversion | Already in `package.json`; used in `generate-html.ts`; `await marked(content)` works — returns string synchronously by default, Promise only when async extensions are loaded |
| `fs` (Node built-in) | Node built-in | File reads/writes/directory traversal | Used throughout `generate-html.ts`; available in Vite plugin context and standalone scripts |
| `path` (Node built-in) | Node built-in | Path joining and basename extraction | Used throughout `generate-html.ts` |
| Vite plugin API | Vite `^7.2.0` | `handleHotUpdate` hook for file-watch trigger | Already in `vite.config.ts` plugin array; `generateHtml()` plugin already registered |

**Confidence:** HIGH — all verified against existing `package.json` and `generate-html.ts`.

### No New Dependencies

Phase 15 adds zero new npm packages. Everything needed is already installed.

---

## Architecture Patterns

### Pattern 1: Existing Task-Agent Dispatch (follow validate.md)

**What:** Orchestrator command does: (1) check prerequisites, (2) spawn ONE Task agent, (3) verify output files, (4) show plain-language results, (5) silently update STATE.md.

**When to use:** For `verify.md` — the verifier checks multiple files and folders; complex logic belongs in a spawned task agent, not the orchestrator command.

**Key structural elements from `validate.md`:**
- Command reads `curriculum-voice.md` before any user-facing output
- Dispatches a single Task — never two
- After Task returns, verifies output files exist before summarizing
- Reports results in plain language with no check IDs or field names
- STATE.md updates are silent

**`assemble.md`** follows a simpler variant: no agent needed for file assembly — the command itself (or a Bash tool call to `generate-html.js`) handles copying.

### Pattern 2: handleHotUpdate in Vite Plugin

**What:** `handleHotUpdate` receives `{ file, timestamp, modules, server }`. When a watched markdown file changes, the hook runs `generateHtmlForWorkspace()` for the affected workspace. Return `[]` from the hook to suppress normal HMR (the HTML files are not Vite-tracked modules).

**Current `generateHtml()` plugin (vite.config.ts):**
```typescript
// Source: dashboard/vite.config.ts lines 93-102
function generateHtml(): Plugin {
  return {
    name: 'generate-html',
    async configureServer() {
      await generateHtmlForWorkspace(WORKSPACE_DIR)
    },
    // handleHotUpdate MISSING — this is the gap to fill
  }
}
```

**What to add:**
```typescript
// Source pattern: vite.dev/changes/hotupdate-hook
async handleHotUpdate({ file }) {
  if (file.endsWith('.md') && file.includes(WORKSPACE_DIR)) {
    await generateHtmlForWorkspace(WORKSPACE_DIR)
    return []
  }
}
```

**Confidence:** HIGH — verified against [Vite docs: HMR hotUpdate Plugin Hook](https://vite.dev/changes/hotupdate-hook) and the existing plugin structure in `vite.config.ts`.

### Pattern 3: Recursion Fix in generateHtmlForWorkspace

**Bug location:** `generate-html.ts` line 51:
```typescript
// CURRENT (broken) — misses session-1/, session-2/ subdirs
const mdFiles = fs.readdirSync(stagePath).filter(f => f.endsWith('.md'))
```

**Fix approach:** Use `withFileTypes: true`; if an entry is a directory, recurse one level.
```typescript
// PATTERN (not the exact fix — implementation detail for planner)
const entries = fs.readdirSync(stagePath, { withFileTypes: true })
// For each entry: if isDirectory(), read its .md files too
// If isFile() and endsWith('.md'), include directly
```

**Applies to:** Both `generate-html.ts` (dashboard file-watch) and `generate-html.js` (standalone script). Same fix, two files.

**Confidence:** HIGH — bug is confirmed in code at line 51; fix logic is standard `fs.Dirent` usage.

### Pattern 4: Delivery Directory Structure

```
delivery/
├── session-1/
│   ├── facilitator-guide.md
│   ├── facilitator-guide.html   ← HTML version
│   └── participant-materials.md
├── session-2/
│   ├── facilitator-guide.md
│   ├── facilitator-guide.html
│   └── participant-materials.md
├── transfer-plan.md             ← markdown only
├── [marketing-file].md          ← e.g., program-description.md
└── [marketing-file].html        ← HTML alongside
```

Source files pulled from:
- `04-sessions/session-N/facilitator-guide.md` → `delivery/session-N/facilitator-guide.md`
- `04-sessions/session-N/participant-materials.md` → `delivery/session-N/participant-materials.md`
- `06-transfer/transfer-plan.md` → `delivery/transfer-plan.md`
- `07-marketing/*.md` → `delivery/*.md` (+ HTML versions)

**Confidence:** HIGH — directly from locked decisions in CONTEXT.md.

### Pattern 5: Verify Check Logic

Three categories of checks, each with a file-specific error message:

| Check | Pattern | Fix command to cite |
|-------|---------|---------------------|
| NEEDS: markers | Lines starting with `# NEEDS:` or `NEEDS:` at line start | `/curriculum:sessions` or relevant stage command |
| TMA phase labels as headers | `^#+ (ACTIVATE|THEORY|METHOD|APPLICATION|BRIDGE|TRANSFER)` | `/curriculum:sessions` |
| HTML comments | `<!--` in output files | `/curriculum:sessions` |
| Missing required files | Check existence of each required stage file | Appropriate stage command |

**Required stage files to check for (minimum):**
- `01-outcomes/learning-objectives.md`
- `02-assessments/` (at least one file)
- `03-modules/module-structure.md`
- `04-sessions/` (at least one session subdirectory with facilitator-guide.md)
- `06-transfer/` (at least one file)
- `07-marketing/` (at least one file)

**Confidence:** MEDIUM — check patterns derived from Phase 13 implementation decisions and QUAL-06/QUAL-07/QUAL-08 requirements. Exact pattern strings are at planner/implementer discretion per CONTEXT.md.

### Anti-Patterns to Avoid

- **Flat delivery dump:** Don't copy all stage files into a single `delivery/` root — the locked decision requires session-by-session subdirectory organization.
- **Binary pass/fail verify:** The verifier MUST name the specific file and which command fixes it. A boolean result is not acceptable.
- **HTML generation as file conversion for all files:** Only marketing materials and facilitator guides get HTML. Participant materials and transfer doc are markdown-only.
- **Verify re-running vocabulary audit:** Phase 13 handles vocabulary at write time. Verify is a slip-through safety net only — don't make it a full audit.
- **Blocking approval when verify finds non-blockers:** Only content issues (NEEDS: markers, TMA headers, HTML comments) and missing required files should block approval. Soft quality warnings should be informational only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown → HTML | Custom parser | `marked` (already installed) | Already in use in `generate-html.ts`; handles GFM, tables, blockquotes |
| HTML wrapper/style | Custom template | `wrapHtml()` in `generate-html.ts` | Already built and tested; Georgia serif, 720px, print CSS |
| File-watch trigger | Custom chokidar watcher | Vite's `handleHotUpdate` | Already in Vite plugin lifecycle; no additional watcher needed |
| NEEDS: detection | Complex parser | `grep`-style line scan via `readFileSync` | Simple string matching is correct; no AST needed |

---

## Common Pitfalls

### Pitfall 1: generate-html.ts vs generate-html.js — two files, same fix

**What goes wrong:** Developer fixes the recursion bug in `generate-html.ts` but not in the new `generate-html.js` standalone script. Session HTML works in the dashboard but not in assembled delivery packages.

**Why it happens:** The two files serve different invocation contexts (Vite plugin vs. Bash tool call from command), easy to treat as independent.

**How to avoid:** The plan should explicitly task fixing the recursion in both files, and note the fix should be identical logic.

**Warning signs:** Tests pass for the Vite plugin path but session HTML is missing from `delivery/` after `assemble`.

### Pitfall 2: handleHotUpdate fires on ALL file changes, not just workspace markdown

**What goes wrong:** `generateHtmlForWorkspace()` runs on every file-system event — CSS changes, config changes, etc. — causing unnecessary disk writes.

**How to avoid:** The hook must gate on `file.endsWith('.md') && file.includes(WORKSPACE_DIR)` before calling `generateHtmlForWorkspace()`. Return `[]` to suppress normal HMR for markdown files in workspace.

**Warning signs:** Console logs show HTML generation running during unrelated hot reloads.

### Pitfall 3: Verify runs AFTER the approve summary is built

**What goes wrong:** `approve.md` shows the "Your Complete Curriculum Package" summary, then runs verify, then conditionally blocks approval. User sees the full summary but then gets a blocker — confusing sequence.

**How to avoid:** Per locked decision: verify runs first (silently), then shows package summary with any issues inline. If blockers exist, the approve option is disabled. The plan should order: (1) run verify silently, (2) collect blocker list, (3) build and show summary with blockers inline, (4) conditionally show or disable the approval option.

**Warning signs:** Test walkthrough where approval option appears before verify results are incorporated.

### Pitfall 4: Assembly copies source files, not delivery-scoped files

**What goes wrong:** Assembler grabs `session.md` (the session generation artifact) instead of `facilitator-guide.md` and `participant-materials.md`. Wrong files in delivery/.

**Why it happens:** `04-sessions/session-1/` may contain multiple files; the assembler must select specific named files.

**How to avoid:** Assemble logic must be explicit about which files to copy: `facilitator-guide.md`, `participant-materials.md`. Not `session.md`, not `slide-outline.md`.

### Pitfall 5: Partial assembly silently drops missing content

**What goes wrong:** Some stages are not yet complete; assembler copies only what exists and produces a delivery/ that looks complete but is missing transfer or marketing files. User marks as delivery-ready without realizing.

**How to avoid:** When a stage file is missing during assembly, the assembler should note it in the output (e.g., "Transfer plan not yet generated — run /curriculum:transfer"). Matches the "copy what's available, note what's missing" discretion in CONTEXT.md.

### Pitfall 6: Test coverage for the recursion bug fix

**What goes wrong:** The existing test suite covers `01-outcomes/` (flat files) but has no test for `04-sessions/session-1/` (subdirectory) pattern. The bug fix passes tests but was never validated against the actual use case.

**How to avoid:** The plan must include extending `generate-html.test.ts` with a test that writes a session subdirectory structure and confirms the resulting HTML appears in `delivery/`.

---

## Code Examples

### handleHotUpdate wire-up pattern

```typescript
// Source: vite.dev/changes/hotupdate-hook + existing generate-html.ts pattern
function generateHtml(): Plugin {
  return {
    name: 'generate-html',
    async configureServer() {
      await generateHtmlForWorkspace(WORKSPACE_DIR)
    },
    async handleHotUpdate({ file }) {
      if (file.endsWith('.md') && file.startsWith(WORKSPACE_DIR)) {
        await generateHtmlForWorkspace(WORKSPACE_DIR)
        return []  // suppress normal HMR for workspace .md files
      }
    },
  }
}
```

### Recursion fix pattern for generateHtmlForWorkspace

```typescript
// Source: existing generate-html.ts lines 49-62, fixed
for (const stageDir of stageDirs) {
  const stagePath = path.join(projectDir, stageDir.name)
  const entries = fs.readdirSync(stagePath, { withFileTypes: true })

  // Collect md files from stage root AND one level of subdirectories
  const mdFilePaths: string[] = []
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      mdFilePaths.push(path.join(stagePath, entry.name))
    } else if (entry.isDirectory()) {
      const subEntries = fs.readdirSync(path.join(stagePath, entry.name))
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(stagePath, entry.name, f))
      mdFilePaths.push(...subEntries)
    }
  }
  // ... generate HTML for each mdFilePath
}
```

### Verify check pattern (grep-style)

```typescript
// Source: pattern derived from Phase 13 decisions (QUAL-06, QUAL-07, QUAL-08)
// Checks to run per file:
const NEEDS_MARKER = /^NEEDS:/m
const TMA_HEADER = /^#{1,6}\s+(ACTIVATE|THEORY|METHOD|APPLICATION|BRIDGE|TRANSFER)\s*$/m
const HTML_COMMENT = /<!--/

// Per-file result shape:
interface FileIssue {
  file: string       // relative path
  issues: string[]   // plain-language descriptions
  fixCommand: string // e.g., "/curriculum:sessions"
}
```

### Verify output format (plain language)

```
Your curriculum is ready to deliver — no issues found.

--- or ---

3 files need attention before delivery:

session-2/facilitator-guide.md — has unresolved content markers
  Run /curriculum:sessions to regenerate this session.

session-3/facilitator-guide.md — contains formatting labels that should not appear in facilitator guides
  Run /curriculum:sessions to regenerate this session.

07-marketing/program-description.md — missing (not yet generated)
  Run /curriculum:marketing to generate marketing materials.
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `handleHotUpdate` (Vite <6) | `hotUpdate` (Vite 6+) — environment-aware, handles create/delete events | `handleHotUpdate` still works in Vite 7 (no deprecation warning yet); use it for now; note `hotUpdate` is the future migration path |
| Flat HTML dump in `delivery/` (current `generate-html.ts`) | Session-scoped subdirectories + selective HTML generation | Phase 15 changes the destination structure and adds content-type filtering |

**Deprecated/outdated:**
- The current `generateHtmlForWorkspace()` generates HTML for ALL stage files into a flat `delivery/` root. Phase 15 changes this: HTML is generated only for marketing + facilitator guides, and delivery/ is organized by session. The function will need a scope parameter or separate function for the assemble path.

---

## Open Questions

1. **Does `generate-html.ts` need to change its batch behavior, or only the new `generate-html.js` script handles the scoped delivery structure?**
   - What we know: The existing `generate-html.ts` generates HTML for all stages into a flat `delivery/` root. The new delivery structure is session-scoped with only marketing + facilitator guides getting HTML.
   - What's unclear: Whether to retrofit the existing batch function or keep it as-is (dashboard display) and have the new script handle the scoped delivery separately.
   - Recommendation: Keep `generate-html.ts` as the dashboard display generator (fix recursion bug); write `generate-html.js` as the delivery-scoped assembler with filtering. Separate concerns: dashboard reads = all files; delivery = curated subset.

2. **What are the exact file names written by `sessions.md` into session subdirectories?**
   - What we know: Sessions produce at minimum `facilitator-guide.md`, `participant-materials.md`, and `session.md` (raw content) per CONTEXT.md and Phase 13 decisions.
   - What's unclear: Whether `slide-outline.md` is written as a separate file or embedded in session.md.
   - Recommendation: Read `sessions.md` command to confirm exact file names before writing assemble logic. (The plan should include this as a prerequisite read for the implementation task.)

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | `dashboard/vitest.config.ts` |
| Quick run command | `cd dashboard && npm test` |
| Full suite command | `cd dashboard && npm test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DLVR-02 | HTML generated for session subdirectory (recursion fix) | unit | `cd dashboard && npm test` (vitest runs `vite-plugins/**/*.test.ts`) | ❌ Wave 0 — new test case needed in `generate-html.test.ts` |
| DLVR-02 | `wrapHtml()` produces correct structure | unit | `cd dashboard && npm test` | ✅ exists in `generate-html.test.ts` |
| DLVR-02 | YAML frontmatter stripped from HTML output | unit | `cd dashboard && npm test` | ✅ exists in `generate-html.test.ts` |
| DLVR-01 | Assembler produces correct delivery/ structure | manual smoke | n/a — command behavior | ❌ manual-only (command output) |
| DLVR-03 | Verifier catches NEEDS: markers | manual smoke | n/a — command behavior | ❌ manual-only (command output) |
| DLVR-03 | Verifier catches TMA headers | manual smoke | n/a — command behavior | ❌ manual-only (command output) |

**Note on DLVR-01 and DLVR-03:** These requirements are satisfied by Claude Code command files (`.md` agent instructions), not by Node.js code. There is no automated test path for command behavior — validation is by running the commands in a real workspace session.

### Sampling Rate

- **Per task commit:** `cd dashboard && npm test`
- **Per wave merge:** `cd dashboard && npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `dashboard/vite-plugins/generate-html.test.ts` — add test case: session subdirectory (e.g., `04-sessions/session-1/facilitator-guide.md`) produces HTML in `delivery/session-1/facilitator-guide.html` after recursion fix

*(No new test files or framework config needed — Vitest already configured and running.)*

---

## Sources

### Primary (HIGH confidence)
- Existing codebase: `dashboard/vite-plugins/generate-html.ts` — bug location confirmed at line 51
- Existing codebase: `dashboard/vite.config.ts` — current `generateHtml()` plugin structure; `handleHotUpdate` gap confirmed
- Existing codebase: `dashboard/package.json` — marked `^15.0.0`, Vite `^7.2.0`, Vitest `^3.0.0` confirmed
- Existing codebase: `.claude/plugins/curriculum/commands/validate.md` — Task-agent dispatch pattern to follow
- Existing codebase: `.claude/plugins/curriculum/commands/approve.md` — integration point for verify + assemble
- [Vite Docs: HMR hotUpdate Plugin Hook](https://vite.dev/changes/hotupdate-hook) — `handleHotUpdate` context shape, return `[]` pattern

### Secondary (MEDIUM confidence)
- [Vite Plugin API](https://vite.dev/guide/api-plugin) — plugin hook lifecycle; `configureServer` + `handleHotUpdate` relationship

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all verified against existing package.json and codebase
- Architecture: HIGH — bug location confirmed in code; handleHotUpdate pattern verified against official Vite docs; command patterns verified against existing validate.md and approve.md
- Pitfalls: HIGH — pitfalls derived directly from confirmed code bugs, locked design decisions, and existing command patterns

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable — no fast-moving libraries; Vite 7 + marked 15 are locked in package.json)
