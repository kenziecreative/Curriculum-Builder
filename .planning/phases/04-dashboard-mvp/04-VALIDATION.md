---
phase: 4
slug: dashboard-mvp
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (Wave 0 installs) |
| **Config file** | `vitest.config.ts` — Wave 0 creates |
| **Quick run command** | `npx vitest run --reporter=dot` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=dot`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 0 | DASH-01 | unit | `npx vitest run src/lib/state-loader.test.ts` | ❌ W0 | ⬜ pending |
| 4-01-02 | 01 | 0 | DASH-02 | unit | `npx vitest run src/lib/workspace-loader.test.ts` | ❌ W0 | ⬜ pending |
| 4-01-03 | 01 | 0 | DASH-05 | unit | `npx vitest run src/lib/use-workspace-poll.test.ts` | ❌ W0 | ⬜ pending |
| 4-01-04 | 01 | 0 | DASH-04 | unit | `npx vitest run vite-plugins/generate-html.test.ts` | ❌ W0 | ⬜ pending |
| 4-02-01 | 02 | 1 | DASH-03 | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseStageProgress"` | ❌ W0 | ⬜ pending |
| 4-02-02 | 02 | 1 | DASH-01 | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseReviewGates"` | ❌ W0 | ⬜ pending |
| 4-02-03 | 02 | 1 | DASH-01 | unit | `npx vitest run src/lib/state-loader.test.ts -t "parseNextAction"` | ❌ W0 | ⬜ pending |
| 4-03-01 | 03 | 1 | DASH-05 | unit | `npx vitest run src/lib/use-workspace-poll.test.ts -t "cleanup"` | ❌ W0 | ⬜ pending |
| 4-04-01 | 04 | 2 | DASH-04 | unit | `npx vitest run vite-plugins/generate-html.test.ts -t "html content"` | ❌ W0 | ⬜ pending |
| 4-05-01 | 05 | 2 | DASH-02 | unit | `npx vitest run src/lib/workspace-loader.test.ts` | ❌ W0 | ⬜ pending |
| 4-06-01 | 06 | 3 | DASH-03 | manual | n/a | manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — test framework config; install: `npm install -D vitest @vitest/ui`
- [ ] `src/lib/state-loader.test.ts` — stubs for DASH-01 parser functions (parseStageProgress, parseReviewGates, parseNextAction)
- [ ] `src/lib/workspace-loader.test.ts` — stubs for DASH-02 file discovery
- [ ] `src/lib/use-workspace-poll.test.ts` — stubs for DASH-05 polling behavior and cleanup
- [ ] `vite-plugins/generate-html.test.ts` — stubs for DASH-04 HTML output generation
- [ ] `src/test/fixtures/STATE.md` — copy of workspace/test-program/STATE.md for parser tests

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `serveWorkspace()` serves workspace files at `/workspace/` URLs | DASH-03 | Requires running Vite dev server + browser; no headless test environment for middleware | Start dev server, open browser, fetch `/workspace/{project}/STATE.md` — verify 200 response with correct content |
| Dashboard auto-refresh shows STATE.md changes without page reload | DASH-05 | Requires running dev server + browser observing DOM updates across polling cycles | Open dashboard, modify workspace STATE.md manually, verify stage status updates within 5 seconds without reload |
| Inline file expander renders HTML version when available | DASH-02 | Requires running Vite server + browser; iframe render verification is visual | Open dashboard, click a file with HTML in delivery/, verify iframe renders styled HTML (not raw text) |
| Dashboard shows empty state when no workspace project exists | DASH-03 | Requires dev server + browser; conditional UI path | Remove/rename workspace directory, reload dashboard, verify "No curriculum project found" empty state message appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
