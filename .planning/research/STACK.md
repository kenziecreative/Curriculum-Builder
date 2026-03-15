# Technology Stack

**Project:** KNZ Curriculum Builder
**Researched:** 2026-03-15
**Confidence:** HIGH — stack is not speculative. The reference implementation (knz-brand-guidance) is a working production plugin using this exact stack. Versions verified directly from that project's package.json.

---

## Decision Context

This project has two distinct technical layers that must be considered separately:

**Layer 1 — Claude Code plugin** (skills, subagents, hooks, commands, reference files). No npm dependencies. Pure markdown + YAML frontmatter + Claude model behavior. The reference implementation and Phase 4 research validate this pattern thoroughly.

**Layer 2 — React dashboard** (Vite + React + TypeScript + Tailwind). A companion web app that reads the plugin's STATE.md and workspace files and renders them as a visual progress tracker and deliverable navigator. The reference implementation demonstrates the complete pattern.

The decision is not "what stack to use" — the reference implementation already made and validated all the primary choices. The decision is "what additions does the curriculum builder need beyond the reference implementation." The curriculum builder has substantially more output volume and adds PDF export as a new requirement.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | ^19.2.0 | UI component model | Matches reference implementation exactly. React 19 is current stable with concurrent features used in the reference implementation (Suspense-ready state loading). |
| TypeScript | ~5.9.3 | Type safety | Matches reference. TypeScript's structural type system maps cleanly onto the typed STATE.md parsing pattern the reference implementation uses (see `src/types/brand.ts`). Catches schema drift between markdown structure and UI expectations at compile time. |
| Vite | ^7.2.4 | Build tool + dev server | Matches reference. Critical feature: `import.meta.glob` is used to load workspace markdown files at build time — this is the architectural mechanism that lets the dashboard read STATE.md and curriculum outputs without a backend. Do not switch to any other build tool; this pattern is non-trivial to replicate. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | ^4.1.17 | Utility-first styling | Matches reference. Tailwind v4 uses the `@tailwindcss/vite` plugin (no PostCSS config required), which the reference uses. The v4 CSS-first config model (`@theme` in CSS) is significantly cleaner than v3's `tailwind.config.js` approach. |
| @tailwindcss/vite | ^4.1.17 | Tailwind v4 Vite integration | Required companion to Tailwind v4. Replaces the PostCSS plugin approach. |
| clsx | ^2.1.1 | Conditional class composition | Matches reference. Used in `cn()` utility. |
| tailwind-merge | ^3.4.0 | Tailwind class conflict resolution | Matches reference. Prevents style conflicts when composing components. |
| class-variance-authority | ^0.7.1 | Variant-driven component API | Matches reference. Used for button/badge variants. Keeps component APIs typed and consistent. |

### Routing

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-router-dom | ^7.9.6 | Client-side routing | Matches reference. The curriculum builder will need routes for: pipeline overview, per-stage views, deliverable navigator, individual document viewer. The reference implementation's flat route structure (`/`, `/phase/:phase`, `/output`, `/output/view/*`) is the correct model — the curriculum builder should use the same pattern adapted for nine pipeline stages. |

### UI Components

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @radix-ui/react-collapsible | ^1.1.12 | Accessible collapsible panels | Matches reference. Collapsible panels are useful for the curriculum builder's multi-stage deliverable list. Radix primitives are headless and accessible — they handle keyboard navigation and ARIA without styling constraints. |
| @radix-ui/react-slot | ^1.2.4 | Component composition primitive | Matches reference. Used by the Button component's `asChild` prop. |
| lucide-react | ^0.554.0 | Icon library | Matches reference. Tree-shakeable, TypeScript-native, consistent stroke-width style. |

### Markdown Rendering

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-markdown | ^10.1.0 | Markdown to React rendering | Matches reference. Used in the OutputViewer component to render `.md` curriculum deliverables in the browser. `react-markdown` is the correct choice: it renders markdown as React elements (not dangerouslySetInnerHTML), supports plugins, and handles the full GFM spec needed for curriculum tables, checklists, and code blocks. |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown support | Matches reference. Required for tables (assessment maps, objective matrices), task lists (validation checklists), and strikethrough. Curriculum output uses all of these. |

### PDF Generation (NEW — not in reference)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @react-pdf/renderer | ^4.x | PDF generation from React | The curriculum builder outputs facilitator guides, participant handouts, and transfer ecosystem documents that need to be print/PDF-ready for delivery. `@react-pdf/renderer` generates PDFs directly in the browser from React components using a React-PDF-specific layout primitives — no puppeteer, no server, no headless browser. This is the correct choice for a self-contained client-side tool with no backend. **Confidence: MEDIUM** — version needs verification against current npm registry; confirm @react-pdf/renderer v4.x compatibility with React 19 before pinning. An alternative is browser `window.print()` with print-optimized CSS; evaluate this simpler approach first if PDF fidelity requirements are modest. |

### State Management

| Technology | None required | — | Why no state library |
|------------|---------|---------|-----|
| None | — | — | The reference implementation uses no state management library (no Zustand, no Redux, no Jotai). State is read from STATE.md at load time via `import.meta.glob` + a custom parser (`state-loader.ts`). The UI is a read-only dashboard — Claude writes STATE.md, the dashboard reads it. This is the correct architecture for this use case. Adding a state library would introduce unnecessary complexity. The only local state needed is UI state (mobile menu open/closed, current tab), which `useState` handles adequately. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-dialog | ^1.x | Modal dialogs | For human review gates and validation report modals — add when building review UI |
| @radix-ui/react-tabs | ^1.x | Tabbed navigation | For multi-deliverable views within a stage — add when building stage detail pages |
| @radix-ui/react-tooltip | ^1.x | Tooltips | For explaining schema field status indicators — add when needed |

---

## Plugin Component Stack (No npm dependencies)

The Claude Code plugin layer uses no npm packages. It is pure markdown files in a specific directory structure.

### Plugin File Structure

```
.claude/
  agents/           # Subagent definitions (markdown with YAML frontmatter)
  commands/         # Slash commands (markdown files = runnable workflows)
  skills/           # Reference context (loaded by agents on demand)
  hooks/            # Enforcement gates (JSON configuration)
CLAUDE.md           # Project constraints + operational rules (lean)
workspace/          # Per-project working directory
  STATE.md          # Current position, phase statuses, decisions
  01-intake/        # Stage 1 outputs
  02-outcomes/      # Stage 2 outputs
  03-assessments/   # Stage 3 outputs
  04-modules/       # Stage 4 outputs (parallel subagent generation)
  05-transfer/      # Stage 5 outputs
  06-marketing/     # Stage 6 outputs
  validation/       # Validation reports
  deliverables/     # Formatted output (HTML for iframe, MD for react-markdown)
```

### Agent Frontmatter Pattern

```yaml
---
name: module-generator
description: >
  Generates session-level content for a single module within constraints set
  by the outcome and assessment design stages.
model: sonnet
tools: Read, Write, Bash
---
```

- `model: haiku` for state reading, simple transforms
- `model: sonnet` for generation, analysis, validation
- `tools:` — declare only what the agent actually needs

### Hook Types (from Phase 4 research + reference pattern)

| Hook Type | Use Case | Enforcement Level |
|-----------|---------|-------------------|
| `PreToolUse` | Block writes to future-stage directories until prerequisites validated | Hard stop (exit code 2) |
| `PostToolUse` | Log completed writes to STATE.md | Notification only |
| `SessionStart` | Trigger state-reader agent to brief on current position | Notification only |

---

## Build Toolchain

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| @vitejs/plugin-react | ^5.1.1 | React JSX transform | Matches reference. Uses Babel for JSX; required for Fast Refresh in dev. |
| typescript | ~5.9.3 | Type checking | Pinned to minor version (not `^`) as in reference — prevents unexpected type-check behavior changes mid-build. |
| eslint | ^9.17.0 | Linting | Matches reference. ESLint 9 uses flat config by default (no `.eslintrc`). |
| eslint-plugin-react-hooks | ^7.0.1 | Hooks linting rules | Matches reference. Catches exhaustive-deps violations and rules-of-hooks errors. |
| eslint-plugin-react-refresh | ^0.5.0 | Fast Refresh compatibility linting | Matches reference. |
| eslint-config-prettier | ^10.1.8 | Prevents ESLint/Prettier conflicts | Matches reference. |
| prettier | ^3.8.1 | Code formatting | Matches reference. |
| typescript-eslint | ^8.55.0 | TypeScript ESLint integration | Matches reference. |
| @types/react | ^19.2.5 | React type definitions | Matches reference. |
| @types/react-dom | ^19.2.3 | React DOM type definitions | Matches reference. |
| @types/node | ^24.10.1 | Node.js type definitions | Matches reference. Required for path/fs in vite.config.ts. |

---

## Key Vite Configuration Patterns

Two patterns from the reference implementation are architecturally critical and must be preserved in the curriculum builder:

**1. Workspace file serving middleware**

The reference's `serveWorkspace()` plugin serves `workspace/` files at `/workspace/` URLs during dev. The curriculum builder uses this same pattern to make STATE.md and deliverable markdown files fetchable by the React app without a backend.

```typescript
// From reference: vite.config.ts
function serveWorkspace(): Plugin {
  return {
    name: 'serve-workspace',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/workspace/')) return next()
        // ... serve file from disk
      })
    },
  }
}
```

**2. import.meta.glob for build-time file loading**

STATE.md is loaded at build time using Vite's glob import — this means the built dashboard can be opened without a running dev server (just open index.html). The curriculum builder should use the same pattern for STATE.md, but for deliverable files, `fetch()` at runtime (as the reference does in OutputViewer) is preferable since deliverables are generated progressively.

```typescript
// From reference: state-loader.ts
const stateFiles = import.meta.glob('/workspace/STATE.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
```

**3. Path alias**

`@` aliased to `./src` — matches reference. Use consistently throughout.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | React 19 + Vite | Next.js | No server needed. Next.js adds SSR/SSG complexity for what is a local file-reading dashboard. The workspace files are on disk, not fetched from an API. Vite SPA is the correct tool. |
| Framework | React 19 + Vite | Remix | Same reason as Next.js — routing is client-only, no server-side data loading needed. |
| Styling | Tailwind v4 | shadcn/ui full install | shadcn/ui is a component code-generator, not a library. The reference already implements the Radix + CVA + Tailwind pattern that shadcn/ui generates. Copy shadcn components directly (as the reference does) rather than using the CLI installer, which adds unnecessary setup overhead. |
| Styling | Tailwind v4 | CSS Modules | Tailwind's utility classes are faster to write for a project built by one person. CSS Modules are better when you have a large team or strict style encapsulation requirements. Neither applies here. |
| State | useState + STATE.md | Zustand | The dashboard is read-only. Claude writes; the dashboard reads. There is no client-side mutation pattern that would benefit from a state library. |
| State | useState + STATE.md | React Query / SWR | No server API to query. Files are loaded via Vite glob or fetch(). React Query would be overcomplicated. |
| Markdown | react-markdown | marked + dangerouslySetInnerHTML | React-markdown renders to React elements — no XSS risk, plays well with Tailwind's `prose` typography class. `marked` produces HTML strings that require `dangerouslySetInnerHTML`. |
| PDF | @react-pdf/renderer | Puppeteer / wkhtmltopdf | Both require a server or headless browser — incompatible with a local-only, no-backend architecture. `@react-pdf/renderer` works entirely in the browser. |
| PDF | @react-pdf/renderer | window.print() + print CSS | Simpler, no dependency. Evaluate this first — if Tailwind `@media print` styles are sufficient for facilitator guide formatting, skip @react-pdf/renderer entirely. Add it only if print CSS can't meet fidelity requirements. |
| Icons | lucide-react | heroicons | Lucide is tree-shakeable from the import. Both are fine; lucide is already in the reference. |
| Routing | react-router-dom v7 | TanStack Router | TanStack Router has better type safety for route params, but react-router v7 now has type-safe routes and the reference already uses it. No reason to switch. |

---

## Installation

```bash
# Copy package.json from reference implementation as starting point, then add:
npm install @react-pdf/renderer  # Only if print CSS is insufficient for PDF fidelity

# Core (already in reference — copy exact versions)
npm install react@^19.2.0 react-dom@^19.2.0
npm install react-router-dom@^7.9.6
npm install react-markdown@^10.1.0 remark-gfm@^4.0.1
npm install tailwindcss@^4.1.17 @tailwindcss/vite@^4.1.17
npm install @radix-ui/react-collapsible@^1.1.12 @radix-ui/react-slot@^1.2.4
npm install lucide-react@^0.554.0
npm install class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^3.4.0

# Dev (already in reference — copy exact versions)
npm install -D vite@^7.2.4 @vitejs/plugin-react@^5.1.1
npm install -D typescript@~5.9.3 @types/react@^19.2.5 @types/react-dom@^19.2.3 @types/node@^24.10.1
npm install -D eslint@^9.17.0 typescript-eslint@^8.55.0
npm install -D eslint-plugin-react-hooks@^7.0.1 eslint-plugin-react-refresh@^0.5.0
npm install -D eslint-config-prettier@^10.1.8 prettier@^3.8.1
```

**Recommended starting point:** Copy the reference implementation's `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `eslint.config.js`, `.prettierrc`, and `src/lib/utils.ts` directly. Adapt, don't rebuild from scratch.

---

## Confidence Assessment

| Component | Confidence | Basis |
|-----------|------------|-------|
| React 19 + Vite 7 + TypeScript 5.9 | HIGH | Direct verification from reference package.json |
| Tailwind v4 + @tailwindcss/vite | HIGH | Direct verification from reference package.json and vite.config.ts |
| react-markdown + remark-gfm | HIGH | Direct verification from reference; OutputViewer.tsx shows production usage pattern |
| react-router-dom v7 | HIGH | Direct verification from reference router.tsx |
| Radix UI primitives | HIGH | Direct verification from reference package.json |
| No state management library | HIGH | Verified in reference implementation — clean architecture for read-only dashboard |
| import.meta.glob + workspace middleware | HIGH | Verified in reference vite.config.ts and state-loader.ts |
| @react-pdf/renderer | MEDIUM | Training data; React 19 compatibility not verified. Must confirm before adding to dependencies. |
| Plugin structure (agents, hooks, commands) | HIGH | Phase 4 research output + reference implementation structure both validate this pattern |

---

## Sources

- Reference implementation `package.json`: `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/package.json` (direct read, 2026-03-15)
- Reference implementation `vite.config.ts`: `/Users/kelseyruger/Projects/a-emporium-working/knz-brand-guidance/vite.config.ts` (direct read, 2026-03-15)
- Reference implementation `src/lib/state-loader.ts`: pattern for STATE.md parsing (direct read, 2026-03-15)
- Reference implementation `src/components/OutputViewer.tsx`: markdown rendering pattern (direct read, 2026-03-15)
- Reference implementation `src/lib/router.tsx`: routing structure (direct read, 2026-03-15)
- Phase 4 research output: `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/research/outputs/04-claude-code-platform-assessment.md` (direct read, 2026-03-15)
- Tool design recommendations: `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/research/outputs/12-tool-design-recommendations.md` (direct read, 2026-03-15)
- PROJECT.md: `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-src/.planning/PROJECT.md` (direct read, 2026-03-15)
