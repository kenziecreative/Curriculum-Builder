---
phase: 15
slug: delivery-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x |
| **Config file** | `dashboard/vitest.config.ts` |
| **Quick run command** | `cd dashboard && npm test` |
| **Full suite command** | `cd dashboard && npm test` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd dashboard && npm test`
- **After every plan wave:** Run `cd dashboard && npm test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 15-01-01 | 01 | 0 | DLVR-02 | unit | `cd dashboard && npm test` | ❌ W0 — add session subdirectory test case to `generate-html.test.ts` | ⬜ pending |
| 15-01-02 | 01 | 1 | DLVR-02 | unit | `cd dashboard && npm test` | ✅ existing tests cover `wrapHtml()` and frontmatter stripping | ⬜ pending |
| 15-01-03 | 01 | 1 | DLVR-02 | manual | n/a | n/a — dashboard HMR smoke test | ⬜ pending |
| 15-02-01 | 02 | 2 | DLVR-01 | manual | n/a | n/a — command behavior | ⬜ pending |
| 15-02-02 | 02 | 2 | DLVR-03 | manual | n/a | n/a — command behavior | ⬜ pending |
| 15-02-03 | 02 | 3 | DLVR-01, DLVR-03 | manual | n/a | n/a — approve.md integration | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `dashboard/vite-plugins/generate-html.test.ts` — add test case: session subdirectory (e.g., `04-sessions/session-1/facilitator-guide.md`) produces HTML in `delivery/session-1/facilitator-guide.html` after recursion fix

*No new test files or framework config needed — Vitest already configured and running.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Assembler produces correct delivery/ structure | DLVR-01 | Claude Code command behavior — no automated test path | Run `/curriculum:assemble` in a complete workspace; check that `delivery/session-N/` dirs contain facilitator + participant files, transfer + marketing at root, no slide outlines or validation reports |
| Verifier catches NEEDS: markers | DLVR-03 | Claude Code command behavior | Introduce a `NEEDS: fix this` in a session file; run `/curriculum:verify`; confirm it names the file and the marker |
| Verifier catches TMA section headers | DLVR-03 | Claude Code command behavior | Add `## Theory` as a section header in a session file; run `/curriculum:verify`; confirm it flags the file |
| Verifier catches HTML comments | DLVR-03 | Claude Code command behavior | Add `<!-- todo -->` in a session file; run `/curriculum:verify`; confirm it flags the file |
| HTML updates on file write (no restart) | DLVR-02 | HMR behavior — requires live dashboard | Start dashboard, write a markdown file to workspace, confirm HTML alongside it updates within ~2s without restarting |
| approve.md triggers verify + assemble at final gate | DLVR-01, DLVR-03 | Command integration | Run `/curriculum:approve` through to Final Validation gate; confirm verify runs first, then assemble on pass |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
