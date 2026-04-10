# Phase 15: Delivery Layer - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

A completed pipeline produces a polished delivery package — a `delivery/` folder with compiled facilitator and participant documents organized by session, HTML versions of marketing materials and facilitator guides, and a pre-delivery verifier that catches anything Phase 13 enforcement missed before the user marks the program as delivery-ready.

Slide outlines, validation reports, outcomes files, assessment files, and module structure files are NOT delivery artifacts — they stay in their stage directories.

</domain>

<decisions>
## Implementation Decisions

### Delivery package contents

- **Included in delivery/:** session facilitator guides, participant materials, transfer ecosystem doc, marketing materials
- **Excluded from delivery/:** validation reports (08-validation/), slide outlines, raw outcomes/assessments files (01, 02), module structure files (03-modules/)
- The content from outcomes and assessments shows up in facilitator guides anyway — no need to duplicate

### Delivery folder structure

- Organized **by session**: `delivery/session-1/`, `delivery/session-2/` etc.
- Facilitator guide + participant materials live together in each session folder
- Transfer plan and marketing materials go at the delivery root (not session-specific)

### HTML output scope

- **Marketing materials and facilitator guides** get HTML versions alongside their markdown
- Participant materials and transfer doc stay markdown-only
- **Same HTML wrapper style** for all files — no custom styling per content type (existing Georgia serif, 720px, print CSS is correct)

### Session subdirectory bug fix

- Fix in **generate-html.ts** (the dashboard file-watch plugin), not just the new script
- Recurse one level deeper when a stage dir contains subdirectories (handles `04-sessions/session-1/` pattern)
- The new `generate-html.js` script used by `assemble.md` shares the same fix — one fix, two paths covered

### Verifier behavior

- **Slip-through safety net:** catches NEEDS: markers, TMA labels as section headers, HTML comments that slipped past Phase 13 enforcement, plus missing required stage files
- Does NOT re-run full vocabulary audit — Phase 13 handles that at write time
- When an issue is found: **name the file + tell the user which command fixes it** (e.g., "session-2/facilitator-guide.md has unresolved content — run /curriculum:sessions to regenerate")
- Not a binary pass/fail — identifies specifically which files have issues and what's wrong

### Verify integration with approve

- `/curriculum:verify` **auto-runs inside `/curriculum:approve`** at the final gate — user cannot skip it
- Also works as a standalone command for manual pre-checks
- Sequence inside approve: **verify runs first (silently)**, then show package summary with any issues inline
- If verify finds blockers, the "mark as delivery-ready" option is disabled/replaced with "fix issues first"

### Assembler trigger and user experience

- **Primary path: approve triggers assemble** — when user approves the final gate, approve runs verify then assemble
- `/curriculum:assemble` also exists standalone for re-running the packaging step
- After approval and assembly: show a **plain-language file list** in the output (e.g., "Session 1: facilitator guide + participant materials", "Transfer plan", "Marketing materials") — not a count, not a full tree

### Claude's Discretion

- Exact check implementation for verify (grep patterns for NEEDS: markers, TMA labels, HTML comments)
- How to handle partial assembly (some stages complete, some not) — copy what's available, note what's missing
- File naming convention inside delivery/ subdirectories

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets

- `dashboard/vite-plugins/generate-html.ts`: Existing HTML generation logic with `wrapHtml()` and `generateHtmlForWorkspace()` — reuse the wrapper style; fix the recursion bug here
- `dashboard/vite-plugins/generate-html.test.ts`: Test file exists — extend tests when fixing the recursion bug
- `approve.md`: Final gate command — add verify + assemble trigger to the Final Validation gate branch (already has the package summary display logic)
- `validate.md`: Pattern for dispatching a task agent and showing plain-language results — follow the same pattern for verify

### Established Patterns

- New commands read `curriculum-voice.md` before generating (Phase 12 established this for all content-generating commands)
- Stage-completing commands end with warm handoff paragraph + context-clear nudge (Phase 13 established this)
- Task agent dispatch pattern: orchestrator command → Task agent → result files → plain-language summary (used in validate.md and sessions.md)

### Integration Points

- `approve.md`: Final Validation gate branch needs verify check inserted before showing summary + assemble call after approval
- `generate-html.ts`: Recursion fix needed in `generateHtmlForWorkspace()` — change flat `readdirSync(stagePath)` to also recurse into subdirectories
- New files: `.claude/plugins/curriculum/commands/assemble.md`, `.claude/plugins/curriculum/commands/verify.md`, `.claude/plugins/curriculum/scripts/generate-html.js`
- Workspace structure: `delivery/` already used as target by generate-html.ts — confirmed correct location

### Known Bug

- `generate-html.ts` line 50-51: `readdirSync(stagePath).filter(f => f.endsWith('.md'))` — misses session subdirectories under `04-sessions/`. Silent bug: no session HTML has ever been produced by batch process. Fix: check if entries in stagePath are directories; if so, recurse one level.

</code_context>

<specifics>
## Specific Ideas

No specific design references or "I want it like X" moments — decisions followed recommended options throughout. Standard patterns apply.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 15-delivery-layer*
*Context gathered: 2026-03-25*
