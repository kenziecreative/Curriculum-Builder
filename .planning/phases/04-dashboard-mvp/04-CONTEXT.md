# Phase 4: Dashboard MVP - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a React dashboard that reads workspace files at runtime, displays accurate pipeline stage status for the current curriculum project, and lets a user navigate to and read any generated output file. HTML formatted output is also generated from markdown source at startup. No editing in the dashboard — it is a viewer and status tracker only.

</domain>

<decisions>
## Implementation Decisions

### File loading & auto-refresh
- Runtime HTTP fetch (not build-time import.meta.glob) — dashboard fetches workspace files via Vite dev server middleware on a 3-second poll interval
- Brand Compass's `serveWorkspace()` Vite plugin already serves `workspace/` files at `/workspace/` URLs — reuse this pattern
- Full workspace reload on each poll cycle (no diff/ETag tracking — curriculum files are KB-range, simplicity wins)
- Auto-select the most recently modified project in `workspace/` (by STATE.md timestamp). No project selector UI — if multiple projects exist, most recent active project wins
- Empty state with setup prompt when no workspace project exists: "No curriculum project found. Run /knz-init in Claude Code to get started."

### Pipeline status display
- Vertical stepper layout — stages listed top to bottom, each row shows all four fields:
  - Status badge: Done / In Progress / Not Started
  - File count: how many deliverable files that stage has generated
  - Last activity timestamp: when the stage was last updated
  - Next action prompt: for the current in-progress stage only (e.g., "Run /knz-modules to continue")
- Human review gates appear inline within the stage they follow — sub-line under the stage row (e.g., "Gate: Approved 2026-03-20" or "Gate: Pending approval")
- Pipeline stepper and deliverable list live on a single page — no separate routes needed. Clicking a stage in the stepper scrolls/highlights its files in the deliverables section below

### Deliverable navigation
- Files grouped by pipeline stage (Stage 2: Outcome Design → learning-objectives.md, etc.)
- Stages with no generated files are hidden from the deliverables section — only stages with actual output appear
- Clicking a filename expands content inline below the filename (no navigation away from the page)
- Content rendering: HTML version when available in `delivery/` directory, markdown rendered via react-markdown as fallback
- react-markdown is already in the Brand Compass stack — reuse directly

### HTML output generation
- A Vite startup script (Node plugin or configureServer hook) reads all markdown files in the workspace project directories and writes HTML counterparts to `workspace/{project}/delivery/` when the dev server starts
- Regenerates all files on every startup — no change-tracking, always accurate
- HTML styling: minimal semantic HTML with embedded CSS (self-contained, no external dependencies, looks good in browser and when printed)
- HTML files live in `delivery/` directory separate from stage source directories — matches Phase 1 decision: "Separate delivery/ directory for formatted HTML output (markdown is source of truth in stage dirs)"

### Claude's Discretion
- Exact CSS style for embedded HTML output (typography, spacing, heading hierarchy)
- How to handle markdown files with YAML frontmatter in HTML conversion (strip or render as metadata block)
- Visual design of the status badge colors and stepper row layout
- How the inline expand animation works (accordion vs instant reveal)
- Exact polling implementation (setInterval vs custom hook)

</decisions>

<specifics>
## Specific Ideas

- Brand Compass (`knz-brand-guidance/`) is the direct reference implementation — same stack (React 19 + Vite + TypeScript + Tailwind), same Vite workspace-serving middleware, same react-markdown + react-router-dom. The dashboard is a sibling project that follows the same architectural pattern.
- The key departure from Brand Compass: runtime fetch polling instead of build-time import.meta.glob. This is what enables DASH-05 (auto-refresh during active generation) — the tradeoff for Brand Compass's simpler loading was that "auto-refresh" meant a browser reload.
- The STATE.md flag from Phase 3 notes @react-pdf/renderer React 19 compat is unverified — but we're using minimal embedded CSS HTML (not PDF), so this is a non-issue for Phase 4.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `knz-brand-guidance/vite.config.ts` — `serveWorkspace()` plugin serves `workspace/` files at `/workspace/` URLs during dev. Copy and adapt for the curriculum dashboard.
- `knz-brand-guidance/src/lib/state-loader.ts` — STATE.md parser with `parsePhaseStatus()`, `parseCheckpoints()`, `parseKeyDecisions()` etc. The KNZ STATE.md format is different but the parsing pattern (regex section extraction) is directly reusable.
- `knz-brand-guidance/package.json` — Exact dependency versions: react 19.2, react-router-dom 7.9, react-markdown 10.1, lucide-react 0.554, tailwindcss 4.1, typescript 5.9. Use same versions.
- `knz-brand-guidance/src/main.tsx` — Standard Vite React entry point pattern to copy.
- `knz-brand-guidance/src/components/AppLayout.tsx`, `PhaseSidebar.tsx` — Reference for layout pattern (sidebar + main content area). Even though this dashboard uses a single-page layout, the layout shell structure is useful reference.

### Established Patterns
- Schema-in-prompt enforcement from prior phases defines what STATE.md looks like — stage status uses explicit enums: `not-started | in-progress | complete`; gate status: `not-reached | pending | approved`
- Workspace directory structure from Phase 1: `00-project-brief/`, `01-outcomes/`, `02-assessments/`, `03-modules/`, `04-sessions/`, `05-metaskills/`, `06-transfer/`, `07-marketing/`, `08-validation/` + `delivery/`
- STATE.md Stage Tracking section has the status fields; Session Continuity has last activity; Review Gates table has gate status and approval dates

### Integration Points
- `workspace/{project-name}/STATE.md` — Primary data source for pipeline status, stage statuses, gate approvals, timestamps
- `workspace/{project-name}/{NN}-{stage}/` — Source markdown files, one directory per pipeline stage
- `workspace/{project-name}/delivery/` — HTML output files generated at startup (new directory this phase creates)
- Dashboard lives as a separate project directory alongside the plugin (sibling to `knz-builder-src/`) — same pattern as Brand Compass sitting alongside brand guidance workspace

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-dashboard-mvp*
*Context gathered: 2026-03-20*
