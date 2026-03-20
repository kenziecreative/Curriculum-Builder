# Phase 4: Dashboard MVP - Research

**Researched:** 2026-03-20
**Domain:** React 19 + Vite dashboard with runtime file polling, STATE.md parsing, markdown-to-HTML generation
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**File loading & auto-refresh**
- Runtime HTTP fetch (not build-time import.meta.glob) — dashboard fetches workspace files via Vite dev server middleware on a 3-second poll interval
- Brand Compass's `serveWorkspace()` Vite plugin already serves `workspace/` files at `/workspace/` URLs — reuse this pattern
- Full workspace reload on each poll cycle (no diff/ETag tracking — curriculum files are KB-range, simplicity wins)
- Auto-select the most recently modified project in `workspace/` (by STATE.md timestamp). No project selector UI — if multiple projects exist, most recent active project wins
- Empty state with setup prompt when no workspace project exists: "No curriculum project found. Run /knz-init in Claude Code to get started."

**Pipeline status display**
- Vertical stepper layout — stages listed top to bottom, each row shows all four fields:
  - Status badge: Done / In Progress / Not Started
  - File count: how many deliverable files that stage has generated
  - Last activity timestamp: when the stage was last updated
  - Next action prompt: for the current in-progress stage only (e.g., "Run /knz-modules to continue")
- Human review gates appear inline within the stage they follow — sub-line under the stage row (e.g., "Gate: Approved 2026-03-20" or "Gate: Pending approval")
- Pipeline stepper and deliverable list live on a single page — no separate routes needed. Clicking a stage in the stepper scrolls/highlights its files in the deliverables section below

**Deliverable navigation**
- Files grouped by pipeline stage (Stage 2: Outcome Design → learning-objectives.md, etc.)
- Stages with no generated files are hidden from the deliverables section — only stages with actual output appear
- Clicking a filename expands content inline below the filename (no navigation away from the page)
- Content rendering: HTML version when available in `delivery/` directory, markdown rendered via react-markdown as fallback
- react-markdown is already in the Brand Compass stack — reuse directly

**HTML output generation**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DASH-01 | React dashboard displays pipeline progress — stage completion status (done/in-progress/not started) | STATE.md Stage Progress table is the source; regex section extraction pattern from Brand Compass state-loader.ts is directly reusable |
| DASH-02 | Dashboard provides deliverable navigation for all generated output files | File listing via fetch against `/workspace/{project}/{NN}-{stage}/` URLs; inline expand pattern with react-markdown fallback |
| DASH-03 | Dashboard reads from workspace directory via filesystem — no API needed | Vite `serveWorkspace()` plugin pattern from Brand Compass serves workspace files at `/workspace/` URLs; runtime fetch replaces build-time import.meta.glob |
| DASH-04 | Formatted HTML output alongside markdown for delivery-ready documents | Vite `configureServer` plugin hook runs Node.js fs on startup to write HTML to `delivery/`; marked or unified ecosystem for MD→HTML conversion |
| DASH-05 | Dashboard auto-refreshes when workspace files change | `setInterval` at 3-second poll calls fetch on STATE.md and stage directories; React state updates trigger re-render |
</phase_requirements>

---

## Summary

Phase 4 builds a standalone React dashboard project (sibling directory to `knz-builder-src/`) that reads live workspace files and displays curriculum pipeline status. The architecture is a direct adaptation of the Brand Compass project (`knz-brand-guidance/`): same React 19 + Vite + TypeScript + Tailwind stack, same `serveWorkspace()` Vite middleware, same react-markdown rendering. The key departure from Brand Compass is replacing `import.meta.glob` (build-time) with runtime `fetch()` polling — this is what enables DASH-05 auto-refresh without browser reload during active generation.

The implementation has two independent workstreams: (1) the Vite startup plugin that converts markdown files to self-contained HTML in `delivery/` and (2) the React app that polls STATE.md + directory listings to display stage status and inline file content. Both workstreams are well-bounded by the locked decisions in CONTEXT.md, and the Brand Compass codebase provides verified working implementations of nearly every pattern needed.

The STATE.md format is now known exactly from the test-program workspace. The Stage Progress table uses explicit status enums (`not-started | in-progress | complete`) and Review Gates uses (`not-reached | pending | approved`) — both parseable with simple regex. The Next Action field in Session Continuity is the source for the "current stage" next-action prompt in the stepper.

**Primary recommendation:** Copy Brand Compass's `vite.config.ts` and `state-loader.ts` as the starting scaffold, then diverge at the fetch-vs-glob boundary. All three Brand Compass parsing functions (`extractSection`, `parsePhaseStatus`, `parseCheckpoints`) are directly applicable to the KNZ STATE.md format with minor adaptations.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.2.0 | UI rendering | Locked — matches Brand Compass |
| react-dom | 19.2.0 | DOM rendering | Pairs with react |
| vite | 7.2.x | Dev server + build | Locked — Brand Compass version |
| @vitejs/plugin-react | 5.1.x | Vite React transform | Standard Vite React setup |
| typescript | 5.9.x | Type safety | Locked — Brand Compass version |
| tailwindcss | 4.1.x | Styling | Locked — Brand Compass version |
| @tailwindcss/vite | 4.1.x | Tailwind Vite plugin | Tailwind 4 uses Vite plugin (not PostCSS) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-markdown | 10.1.0 | Render markdown as React | Fallback when HTML version not in delivery/ |
| remark-gfm | 4.0.1 | GitHub-flavored markdown tables/strikethrough | Always with react-markdown for curriculum content |
| lucide-react | 0.554.x | Icon set | Status badges, chevrons, file icons |
| marked | 15.x | MD→HTML conversion in Vite plugin | Node.js context (Vite configureServer); fast, no runtime deps |

### Markdown-to-HTML Conversion Library Choice
The Vite startup plugin runs in Node.js context (not the browser), so the conversion library only needs to work server-side. Two solid options:

| Library | Confidence | Notes |
|---------|------------|-------|
| **marked** | HIGH | Fast, zero deps, outputs HTML string directly — ideal for write-to-file use case |
| **unified + remark-parse + remark-html** | HIGH | More composable, better frontmatter handling via remark-frontmatter — heavier |

**Recommendation:** Use `marked` for the Vite plugin. It's a single package, the output is clean HTML string, and the project doesn't need a remark pipeline at this stage. Frontmatter can be stripped with a simple regex before passing to marked.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| setInterval polling | Vite HMR websocket / fs.watch over middleware | HMR websocket is browser→Vite only, not arbitrary file watch; fs.watch requires Node server endpoint — polling is simpler and sufficient for KB-range files at 3s |
| marked | unified/remark | remark more powerful but overkill for write-once HTML files; marked produces identical output for curriculum content |
| react-markdown | MDX | MDX requires compilation pipeline; react-markdown with remark-gfm handles all curriculum markdown patterns |

**Installation:**
```bash
npm create vite@latest knz-curriculum-dashboard -- --template react-ts
cd knz-curriculum-dashboard
npm install react-markdown remark-gfm lucide-react tailwindcss @tailwindcss/vite marked
npm install -D @types/node
```

---

## Architecture Patterns

### Recommended Project Structure
```
knz-curriculum-dashboard/
├── src/
│   ├── components/
│   │   ├── PipelineStepper.tsx    # Vertical stage list with status badges
│   │   ├── StageRow.tsx           # Single stage row (status + file count + timestamp + next action)
│   │   ├── GateRow.tsx            # Inline gate sub-row below a stage row
│   │   ├── DeliverableSection.tsx # Files grouped by stage, expandable inline
│   │   ├── FileExpander.tsx       # Inline expand: iframe for HTML, react-markdown for .md
│   │   ├── StatusBadge.tsx        # Done / In Progress / Not Started badge
│   │   └── EmptyState.tsx         # No workspace project prompt
│   ├── lib/
│   │   ├── state-loader.ts        # Fetches and parses STATE.md → KnzPipelineState
│   │   ├── workspace-loader.ts    # Discovers project dirs, lists stage files via fetch
│   │   └── use-workspace-poll.ts  # React hook: setInterval fetch loop → state
│   ├── types/
│   │   └── pipeline.ts            # KnzPipelineState, StageStatus, GateStatus types
│   ├── App.tsx                    # Single-page layout: stepper + deliverables
│   ├── main.tsx                   # Vite entry point
│   └── index.css                  # Tailwind base
├── vite.config.ts                 # serveWorkspace() + generateHtml() plugins
├── package.json
└── tsconfig.json
```

### Pattern 1: Runtime Fetch Polling (replaces import.meta.glob)
**What:** Custom React hook uses `setInterval` to re-fetch STATE.md every 3 seconds, parse it, and update component state.
**When to use:** Any data that must reflect filesystem changes without browser reload.

```typescript
// src/lib/use-workspace-poll.ts
// Pattern: fetch → parse → setState, repeat on interval
import { useState, useEffect, useCallback } from 'react'
import { loadStateFromUrl } from './state-loader'
import type { KnzPipelineState } from '@/types/pipeline'

export function useWorkspacePoll(projectPath: string | null, intervalMs = 3000) {
  const [state, setState] = useState<KnzPipelineState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const poll = useCallback(async () => {
    if (!projectPath) return
    try {
      const result = await loadStateFromUrl(`/workspace/${projectPath}/STATE.md`)
      setState(result)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }, [projectPath])

  useEffect(() => {
    poll()
    const id = setInterval(poll, intervalMs)
    return () => clearInterval(id)
  }, [poll, intervalMs])

  return { state, loading, error }
}
```

### Pattern 2: serveWorkspace() Vite Plugin (copy from Brand Compass)
**What:** Vite middleware plugin that maps `/workspace/` URL prefix to the filesystem `workspace/` directory.
**When to use:** Any Vite dev server that needs to serve local files outside the `src/` tree.

```typescript
// vite.config.ts — verified pattern from knz-brand-guidance/vite.config.ts
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function serveWorkspace(): Plugin {
  return {
    name: 'serve-workspace',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/workspace/') || req.url.includes('?')) return next()
        const filePath = path.resolve(__dirname, req.url.slice(1))
        if (!fs.existsSync(filePath)) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        const ext = path.extname(filePath)
        const mime: Record<string, string> = {
          '.html': 'text/html',
          '.md': 'text/plain; charset=utf-8',
          '.json': 'application/json',
        }
        res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    },
  }
}
```

### Pattern 3: STATE.md Parser (adapted from Brand Compass)
**What:** Regex-based section extraction from markdown. The KNZ STATE.md format is known exactly (see Code Examples section).
**When to use:** Any time dashboard needs pipeline stage status, gate status, or next action.

The Brand Compass `extractSection()` utility is directly reusable. The key difference: KNZ STATE.md uses a pipe-delimited Stage Progress table (not a checkbox list), so `parsePhaseStatus()` needs to be rewritten to parse the table format.

### Pattern 4: HTML Generation at Dev Server Start
**What:** Vite plugin using `configureServer` hook to write HTML files to `delivery/` on startup.
**When to use:** Any time static output files should be pre-generated before the browser loads.

```typescript
// vite.config.ts — generateHtml plugin
import { marked } from 'marked'

function generateHtml(): Plugin {
  return {
    name: 'generate-html',
    async configureServer() {
      const workspaceDir = path.resolve(__dirname, '../knz-builder-src/workspace')
      if (!fs.existsSync(workspaceDir)) return

      const projects = fs.readdirSync(workspaceDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)

      for (const project of projects) {
        const deliveryDir = path.join(workspaceDir, project, 'delivery')
        fs.mkdirSync(deliveryDir, { recursive: true })

        // Walk all stage directories for .md files
        const stageDirs = fs.readdirSync(path.join(workspaceDir, project), { withFileTypes: true })
          .filter(d => d.isDirectory() && /^\d{2}-/.test(d.name))

        for (const stageDir of stageDirs) {
          const stagePath = path.join(workspaceDir, project, stageDir.name)
          const mdFiles = fs.readdirSync(stagePath).filter(f => f.endsWith('.md'))
          for (const mdFile of mdFiles) {
            const raw = fs.readFileSync(path.join(stagePath, mdFile), 'utf-8')
            // Strip YAML frontmatter if present
            const content = raw.replace(/^---[\s\S]*?---\n/, '')
            const html = await marked(content)
            const outputName = mdFile.replace('.md', '.html')
            fs.writeFileSync(
              path.join(deliveryDir, outputName),
              wrapHtml(path.basename(mdFile, '.md'), html)
            )
          }
        }
      }
    },
  }
}
```

### Pattern 5: Project Discovery via Fetch Directory Listing
**What:** Dashboard needs to find the most recently modified project in `workspace/`. Since Vite's `serveWorkspace()` serves individual files but not directory listings, the workspace path must be resolved differently.

**Solution:** The `serveWorkspace()` plugin can be extended to handle a special `GET /workspace-index` endpoint that returns a JSON list of project directories. This avoids building a directory-browsing server.

```typescript
// Extension to serveWorkspace() to handle /workspace-index
if (req.url === '/workspace-index') {
  const workspaceDir = path.resolve(__dirname, '../knz-builder-src/workspace')
  const projects = fs.readdirSync(workspaceDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const statePath = path.join(workspaceDir, d.name, 'STATE.md')
      const mtime = fs.existsSync(statePath)
        ? fs.statSync(statePath).mtime.toISOString()
        : null
      return { name: d.name, stateMtime: mtime }
    })
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(projects))
  return
}
```

The dashboard fetches `/workspace-index`, sorts by `stateMtime` descending, and uses the first result as the active project.

### Pattern 6: Stage File Count via Fetch Directory Listing
**What:** Each stage row shows how many deliverable files that stage has generated (e.g., "3 files").

**Solution:** Extend `serveWorkspace()` with a `/workspace-files/{project}/{stage}` endpoint that returns a JSON array of filenames in that stage directory. The dashboard polls this alongside STATE.md.

### Anti-Patterns to Avoid

- **import.meta.glob for workspace files:** Build-time only — won't reflect file changes during active generation. This is the key Brand Compass pattern NOT to copy.
- **fs.watch in the frontend:** Vite HMR websocket is for JS/CSS modules only, not arbitrary workspace files. Don't attempt to hook into HMR for STATE.md polling.
- **Separate route per deliverable:** CONTEXT.md locked "no navigation away from the page" — all content expands inline. No `<Routes>` needed for file viewing.
- **Re-generating HTML on every poll:** HTML generation is a startup operation only. The poll cycle reads STATE.md and file lists — it does not re-run HTML conversion.
- **Tailwind 3 PostCSS config:** Tailwind 4 uses the Vite plugin (`@tailwindcss/vite`), not `tailwind.config.js` + PostCSS. Don't scaffold with the old config format.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown rendering | Custom HTML parser | react-markdown + remark-gfm | Tables, strikethrough, code fences have edge cases; already in Brand Compass stack |
| Markdown → HTML string | String concatenation | marked | Handles all CommonMark syntax, escaping, nested structures |
| Icon set | SVG inline | lucide-react | Already in Brand Compass stack; tree-shakeable |
| YAML frontmatter strip | Complex parser | `/^---[\s\S]*?---\n/` regex | Frontmatter is always at file start; single regex is sufficient |
| Workspace file serving | Express server | Vite `configureServer` middleware | Already the Brand Compass pattern; no extra process |

**Key insight:** The Brand Compass project solves every infrastructure problem this phase needs. The only net-new engineering is (1) the polling hook, (2) the HTML generation plugin, and (3) the STATE.md parser adapted for KNZ's table-format STATE.md.

---

## Common Pitfalls

### Pitfall 1: Workspace Path Relative to Dashboard Project Root
**What goes wrong:** `path.resolve(__dirname, 'workspace/')` points to the dashboard's own directory, not `knz-builder-src/workspace/`.
**Why it happens:** The dashboard is a sibling project to `knz-builder-src/`, not a child of it.
**How to avoid:** Use `path.resolve(__dirname, '../knz-builder-src/workspace')` in Vite plugin code. Verify this path in the first integration test.
**Warning signs:** 404s on all `/workspace/` fetches; `fs.existsSync` returning false on workspace dir.

### Pitfall 2: import.meta.glob vs Runtime Fetch Confusion
**What goes wrong:** Scaffolding the data layer with `import.meta.glob` (as Brand Compass does), which causes polling to always return the build-time snapshot.
**Why it happens:** Brand Compass uses `import.meta.glob` everywhere for content — it's the natural pattern to copy.
**How to avoid:** The data-loading module must use `fetch()` not `import.meta.glob`. A comment in the module header reinforces this: `// RUNTIME FETCH ONLY — do not use import.meta.glob; see CONTEXT.md`.
**Warning signs:** STATE.md changes during generation don't appear in dashboard until page reload.

### Pitfall 3: STATE.md Parser Assumes Checkbox Format
**What goes wrong:** Copying Brand Compass's `parsePhaseStatus()` verbatim, which looks for `[ x ] Phase N` checkbox lines that don't exist in KNZ STATE.md.
**Why it happens:** Brand Compass's STATE.md uses checkboxes; KNZ STATE.md uses a pipe-delimited table with status enum values.
**How to avoid:** Write a new `parseStageProgress()` that parses the table format. The KNZ format is:
  ```
  | 2 | Outcome Design | complete | 2026-03-20 |
  ```
  Regex: `/^\|\s*(\d+)\s*\|[^|]+\|\s*(not-started|in-progress|complete)\s*\|\s*([^\|]+)\|/m`
**Warning signs:** All stages show "Not Started" regardless of actual STATE.md content.

### Pitfall 4: HTML iframe CSP Blocks Self-Contained Files
**What goes wrong:** Browser Content Security Policy blocks the `<iframe>` rendering of self-contained HTML files because Vite dev server sets restrictive CSP headers.
**Why it happens:** Vite 5+ sets default CSP headers. The Brand Compass OutputViewer uses `sandbox="allow-scripts allow-same-origin"` on iframes — this is the correct pattern.
**How to avoid:** Use `sandbox="allow-scripts allow-same-origin"` on all iframes. Since HTML output files are self-contained (no external scripts), this sandbox level is sufficient.
**Warning signs:** Blank iframe; browser console shows CSP violation.

### Pitfall 5: Polling Leaks on Component Unmount
**What goes wrong:** `setInterval` continues polling after the component unmounts, causing React state updates on unmounted components and memory leaks.
**Why it happens:** Forgetting the `clearInterval` cleanup in `useEffect`.
**How to avoid:** Always return `() => clearInterval(id)` from the `useEffect`. The code example in Pattern 1 above includes this.
**Warning signs:** React console warning "Can't perform a React state update on an unmounted component."

### Pitfall 6: Tailwind 4 Config Format
**What goes wrong:** Scaffolding with `tailwind.config.js` + `postcss.config.js` (Tailwind 3 pattern) when the stack uses Tailwind 4.
**Why it happens:** `npm create vite` templates may still reference Tailwind 3 setup docs.
**How to avoid:** Tailwind 4 uses the Vite plugin only — `import tailwindcss from '@tailwindcss/vite'` in `vite.config.ts` and `@import "tailwindcss"` in CSS. No `tailwind.config.js` needed.
**Warning signs:** Tailwind classes not applying; build errors about unknown config format.

---

## Code Examples

### STATE.md Format (KNZ — verified from workspace/test-program/STATE.md)
```markdown
## Stage Progress
| Stage | Name | Status | Completed |
|-------|------|--------|-----------|
| 1 | Intake | complete | 2026-03-19 |
| 4 | Module Structure | not-started | - |

## Review Gates
| Gate | After Stage | Status | Approved |
|------|-------------|--------|----------|
| Post-Intake | 1 | approved | 2026-03-19 |
| Final Validation | 9 | not-reached | - |

## Session Continuity
- **Next Action:** Run /knz-modules to build module structure
```

### STATE.md Parser for KNZ Format
```typescript
// Source: adapted from knz-brand-guidance/src/lib/state-loader.ts
// Key change: table parsing instead of checkbox parsing

function extractSection(md: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)
  return md.match(pattern)?.[1]?.trim() ?? ''
}

export interface StageRecord {
  number: number
  name: string
  status: 'not-started' | 'in-progress' | 'complete'
  completed: string | null  // ISO date string or null
}

export function parseStageProgress(md: string): StageRecord[] {
  const section = extractSection(md, 'Stage Progress')
  const rows = section.split('\n').filter(l => /^\|\s*\d+/.test(l))
  return rows.map(row => {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean)
    return {
      number: parseInt(cells[0], 10),
      name: cells[1],
      status: cells[2] as StageRecord['status'],
      completed: cells[3] === '-' ? null : cells[3],
    }
  })
}

export interface GateRecord {
  name: string
  afterStage: number
  status: 'not-reached' | 'pending' | 'approved'
  approved: string | null
}

export function parseReviewGates(md: string): GateRecord[] {
  const section = extractSection(md, 'Review Gates')
  const rows = section.split('\n').filter(l => /^\|[^-]/.test(l) && !/Gate.*After/.test(l))
  return rows.map(row => {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean)
    return {
      name: cells[0],
      afterStage: parseInt(cells[1], 10),
      status: cells[2] as GateRecord['status'],
      approved: cells[3] === '-' ? null : cells[3],
    }
  })
}

export function parseNextAction(md: string): string | null {
  const match = md.match(/\*\*Next Action:\*\*\s*(.+)/)
  return match?.[1]?.trim() ?? null
}
```

### Inline File Expander (HTML preferred, markdown fallback)
```typescript
// Source: adapted from knz-brand-guidance/src/components/OutputViewer.tsx
import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface FileExpanderProps {
  filename: string      // e.g. "learning-objectives.md"
  stagePath: string     // e.g. "test-program/01-outcomes"
  projectName: string   // e.g. "test-program"
}

export function FileExpander({ filename, stagePath, projectName }: FileExpanderProps) {
  const [content, setContent] = useState<string | null>(null)
  const baseName = filename.replace('.md', '')
  const htmlUrl = `/workspace/${projectName}/delivery/${baseName}.html`
  const mdUrl = `/workspace/${stagePath}/${filename}`

  useEffect(() => {
    // Try HTML first; fall back to markdown
    fetch(htmlUrl, { method: 'HEAD' })
      .then(r => r.ok ? htmlUrl : null)
      .then(url => url ?? mdUrl)
      .then(url => fetch(url).then(r => r.text()))
      .then(setContent)
  }, [htmlUrl, mdUrl])

  if (!content) return <div className="text-sm text-muted-foreground p-3">Loading...</div>

  const isHtml = content.trimStart().startsWith('<!DOCTYPE') || content.trimStart().startsWith('<html')

  return isHtml ? (
    <iframe
      srcDoc={content}
      title={filename}
      className="w-full min-h-96 rounded border border-border bg-white"
      sandbox="allow-scripts allow-same-origin"
    />
  ) : (
    <div className="prose max-w-none p-4 rounded border border-border bg-card">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
```

### Workspace Index Endpoint Extension
```typescript
// Extension to serveWorkspace() for project discovery
// Handles GET /workspace-index → JSON array of { name, stateMtime }
if (req.url === '/workspace-index') {
  const workspaceDir = path.resolve(__dirname, '../knz-builder-src/workspace')
  if (!fs.existsSync(workspaceDir)) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([]))
    return
  }
  const entries = fs.readdirSync(workspaceDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const statePath = path.join(workspaceDir, d.name, 'STATE.md')
      return {
        name: d.name,
        stateMtime: fs.existsSync(statePath)
          ? fs.statSync(statePath).mtime.toISOString()
          : null,
      }
    })
    .sort((a, b) => (b.stateMtime ?? '').localeCompare(a.stateMtime ?? ''))
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(entries))
  return
}
```

### Stage File List Endpoint Extension
```typescript
// Handles GET /workspace-files/{project}/{stage} → JSON array of filenames
const filesMatch = req.url?.match(/^\/workspace-files\/([^/]+)\/([^/]+)$/)
if (filesMatch) {
  const [, project, stage] = filesMatch
  const stageDir = path.resolve(__dirname, '../knz-builder-src/workspace', project, stage)
  if (!fs.existsSync(stageDir)) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([]))
    return
  }
  const files = fs.readdirSync(stageDir).filter(f => f.endsWith('.md'))
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(files))
  return
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind PostCSS config (`tailwind.config.js`) | Vite plugin (`@tailwindcss/vite`) | Tailwind 4.0 (2025) | No `tailwind.config.js` needed; `@import "tailwindcss"` in CSS |
| react-router v6 `<Routes>` | react-router v7 `createBrowserRouter` / `<Routes>` both valid | v7.0 (2024) | V7 adds framework mode; for SPA, `<Routes>` still works fine |
| `marked` v4 callback API | `marked` v15 fully async | marked 5.0 (2023) | Use `await marked(content)` — synchronous `.parse()` still works but deprecated |

**Deprecated/outdated:**
- `import.meta.glob` for runtime-changing workspace files: works at build time, not for live polling. Confirmed mismatch with DASH-05.
- `react-router` v5 `<Switch>` component: replaced by `<Routes>` in v6+. Brand Compass uses v7 correctly.

---

## Open Questions

1. **Workspace symlink vs relative path**
   - What we know: The dashboard project will live at a sibling path to `knz-builder-src/`; the exact directory name is not yet decided.
   - What's unclear: Whether the workspace path should be hardcoded as `../knz-builder-src/workspace` or made configurable (e.g., `.env` or a config field in `vite.config.ts`).
   - Recommendation: Hardcode for MVP (`../knz-builder-src/workspace`); add a `WORKSPACE_PATH` env var override if needed.

2. **Stage directory ordering in deliverables section**
   - What we know: Stage dirs are named `NN-{stage-name}` (e.g., `01-outcomes`, `02-assessments`) — alphabetical sort matches numeric order.
   - What's unclear: Whether future stages will always use two-digit zero-padded numbers consistently (e.g., `09-validation` vs `9-validation`).
   - Recommendation: Confirm Phase 1 convention; sort by the numeric prefix, not alphabetically, to be safe.

3. **react-markdown prose styles in Tailwind 4**
   - What we know: `prose` classes come from `@tailwindcss/typography` plugin. Brand Compass does not appear to use this plugin — it uses custom component styling.
   - What's unclear: Whether `@tailwindcss/typography` works with Tailwind 4.x without modification.
   - Recommendation: Use a `<div className="prose ...">` wrapper only if the typography plugin is confirmed compatible. If not, apply typography styles directly in the FileExpander component using Tailwind utility classes.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — Wave 0 must install Vitest |
| Config file | `vitest.config.ts` — Wave 0 creates |
| Quick run command | `npx vitest run --reporter=dot` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-01 | `parseStageProgress()` returns correct status from real STATE.md | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseStageProgress"` | Wave 0 |
| DASH-01 | `parseReviewGates()` returns gate status and approved date | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseReviewGates"` | Wave 0 |
| DASH-01 | `parseNextAction()` returns the next action string | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseNextAction"` | Wave 0 |
| DASH-02 | Workspace-files endpoint returns correct filenames for a stage dir | unit | `npx vitest run src/lib/workspace-loader.test.ts` | Wave 0 |
| DASH-03 | `serveWorkspace()` serves a file at correct URL — requires dev server | smoke/manual | n/a — browser integration only | manual |
| DASH-04 | HTML generation writes files to `delivery/` on startup | unit | `npx vitest run vite-plugins/generate-html.test.ts` | Wave 0 |
| DASH-04 | Generated HTML is valid and contains heading from source .md | unit | `npx vitest run vite-plugins/generate-html.test.ts -t "html content"` | Wave 0 |
| DASH-05 | Polling hook calls fetch at 3s intervals and updates state | unit | `npx vitest run src/lib/use-workspace-poll.test.ts` | Wave 0 |
| DASH-05 | Polling hook clears interval on unmount | unit | `npx vitest run src/lib/use-workspace-poll.test.ts -t "cleanup"` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=dot`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.ts` — test framework config; install: `npm install -D vitest @vitest/ui`
- [ ] `src/lib/state-loader.test.ts` — covers DASH-01 parser functions
- [ ] `src/lib/workspace-loader.test.ts` — covers DASH-02 file discovery
- [ ] `src/lib/use-workspace-poll.test.ts` — covers DASH-05 polling behavior
- [ ] `vite-plugins/generate-html.test.ts` — covers DASH-04 HTML output generation
- [ ] `src/test/fixtures/STATE.md` — copy of workspace/test-program/STATE.md for parser tests

---

## Sources

### Primary (HIGH confidence)
- **knz-brand-guidance/vite.config.ts** — verified `serveWorkspace()` implementation, Tailwind 4 Vite plugin config, port configuration
- **knz-brand-guidance/src/lib/state-loader.ts** — verified `extractSection()` regex pattern, `parsePhaseStatus()` structure, `parseCheckpoints()` pattern
- **knz-brand-guidance/src/components/OutputViewer.tsx** — verified iframe + react-markdown render pattern, `sandbox` attribute, HEAD check for file existence
- **knz-brand-guidance/src/components/StepIndicator.tsx** — verified vertical stepper DOM structure with connector lines
- **knz-brand-guidance/package.json** — verified exact dependency versions: react 19.2, vite 7.2.4, react-markdown 10.1, remark-gfm 4.0.1, lucide-react 0.554, tailwindcss 4.1, typescript 5.9.3
- **workspace/test-program/STATE.md** — verified exact KNZ STATE.md format: table-based Stage Progress, table-based Review Gates, Session Continuity with Next Action field
- **.planning/phases/04-dashboard-mvp/04-CONTEXT.md** — all locked decisions and discretion areas

### Secondary (MEDIUM confidence)
- marked library — well-established, zero-dependency MD→HTML; version 15.x is current as of research date; async API confirmed from official README
- Tailwind 4 Vite plugin pattern — confirmed from `@tailwindcss/vite` package in Brand Compass package.json

### Tertiary (LOW confidence)
- `@tailwindcss/typography` compatibility with Tailwind 4 — not verified; flagged in Open Questions

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — exact versions from Brand Compass package.json, which is the reference implementation
- Architecture: HIGH — patterns verified from working Brand Compass codebase; STATE.md format verified from real workspace file
- Pitfalls: HIGH (Pitfalls 1-3 verified from code inspection), MEDIUM (Pitfalls 4-6 from known Vite/React patterns)

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable stack; Tailwind 4 / react-router 7 are current releases)
