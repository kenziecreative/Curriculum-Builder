# Technology Stack — v3.0

**Project:** KNZ Curriculum Builder v3.0
**Researched:** 2026-03-24
**Confidence:** HIGH — all findings from direct code inspection and official Claude Code plugin docs

---

## Key Finding: No new npm packages required

Everything needed for v3.0 is already present or is a minor version bump. The stack additions are small and self-contained.

---

## New Additions for v3.0

### HTML Generation

**Approach:** `marked.parse()` called from a Node.js script in `.claude/plugins/curriculum/scripts/`

- Claude invokes the script via Bash tool call from within command instructions
- Self-contained HTML with inline CSS — no new server, no build step
- One version bump: `marked ^15.0.0` → `^17.0.5` in `dashboard/package.json`
  - Breaking changes in v17 affect custom list token renderers only
  - Dashboard uses `marked.parse()` with no custom renderers — upgrade risk: LOW

**Why not a new dependency:** The existing dashboard already uses `marked`. The plugin commands already use Bash tool calls. The script pattern is already established in the codebase.

### Document Assembly

**Approach:** New `assemble.md` command file — pure Claude instruction

- Claude reads stage files and writes combined deliverables using existing Read/Write tools
- No external library needed
- Output: facilitator package (session.md + facilitator-guide.md + participant-materials.md per session), transfer summary, marketing materials
- Exclude: slide outlines, validation reports (too structural for delivery package)

### Curriculum Voice Reference

**Approach:** Plain markdown at `.claude/reference/curriculum-voice.md`

- Same pattern as existing `doctrine-how-i-teach-how-i-learn.md` — already proven in this project
- Referenced by explicit read instruction in commands that generate learner-facing text
- Keep under 150 lines to make it worth loading in every context

---

## What NOT to Add

| Temptation | Why to avoid |
|---|---|
| PDF generation library | Markdown + HTML is the output format. PDF adds a build dependency with zero benefit over HTML |
| Dedicated markdown-to-HTML npm package | `marked` is already present — no new dependency needed |
| Separate HTML build process | Commands write HTML inline on completion. No separate build step |
| Template engine (Handlebars, Mustache) | Claude generates HTML directly with inline CSS. Templates add complexity without benefit |

---

## File Changes Summary

| Change | File | Type |
|--------|------|------|
| New script for HTML generation | `.claude/plugins/curriculum/scripts/generate-html.js` | New file |
| New command | `.claude/plugins/curriculum/commands/assemble.md` | New file |
| New voice reference | `.claude/reference/curriculum-voice.md` | New file |
| Version bump | `dashboard/package.json` | Minor change |
| Wire file-watch to HTML regen | `dashboard/vite-plugins/generate-html.ts` | Modify |

---

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| marked v17 API | HIGH | Official docs + GitHub releases verified 2026-03-24 |
| Plugin scripts pattern | HIGH | Official Claude Code plugin reference docs verified 2026-03-24 |
| Reference file pattern | HIGH | Verified in existing project (schemas, doctrine file already working) |
| Document assembly via instruction | HIGH | Pattern already used throughout pipeline |
| marked v15→v17 upgrade risk | MEDIUM | Breaking changes isolated to custom renderers not used by dashboard |
