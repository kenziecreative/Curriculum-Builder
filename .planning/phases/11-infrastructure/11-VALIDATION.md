---
phase: 11
slug: infrastructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — no automated test framework in this project |
| **Config file** | none |
| **Quick run command** | manual inspection (see Per-Task Map) |
| **Full suite command** | manual success criteria checklist |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Visual inspection of changed files matches spec
- **After every plan wave:** Run manual success criteria checklist
- **Before `/gsd:verify-work`:** All 5 success criteria must be TRUE
- **Max feedback latency:** Immediate (visual inspection per task)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 11-01-01 | 01 | 1 | INFR-01 | manual | `ls scripts/install.sh` → should fail | ❌ W0 | ⬜ pending |
| 11-01-02 | 01 | 1 | INFR-01 | manual | `grep 'workspace/\*' .gitignore` → should match | ❌ W0 | ⬜ pending |
| 11-01-03 | 01 | 1 | INFR-01 | manual | `grep '\.planning/' .gitignore` → should match | ❌ W0 | ⬜ pending |
| 11-01-04 | 01 | 1 | INFR-01 | manual | `cat workspace/.gitkeep` → file exists | ❌ W0 | ⬜ pending |
| 11-02-01 | 01 | 1 | INFR-02 | manual | `grep 'WORKSPACE_DIR' dashboard/vite.config.ts` → env var pattern present | ❌ W0 | ⬜ pending |
| 11-02-02 | 01 | 1 | INFR-02 | manual | `grep 'npm run dev' .claude/plugins/curriculum/commands/init.md` → command present | ❌ W0 | ⬜ pending |
| 11-03-01 | 01 | 1 | INFR-03 | manual | `ls scripts/release.sh` → file exists | ❌ W0 | ⬜ pending |
| 11-03-02 | 01 | 1 | INFR-03 | manual | `head -1 scripts/release.sh` → `#!/bin/bash` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test framework installation needed. All phase verifications are manual inspection commands or observable file-system checks. The commands in the task map above run inline during execution, not via a test runner.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Clone fresh repo → `/curriculum:init` → workspace appears | INFR-01 | Requires actual clone + Claude Code session | Clone to temp dir, open in Claude Code, run `/curriculum:init`, confirm `workspace/{project-name}/` created |
| `WORKSPACE_DIR=/path npm run dev` starts dashboard at that path | INFR-02 | Requires browser check | `WORKSPACE_DIR=/tmp/test-ws npm run dev` from `dashboard/`; open browser; confirm dashboard shows test-ws content |
| `/curriculum:init` output contains literal `npm run dev` | INFR-02 | Requires actual Claude Code run | Run `/curriculum:init`; confirm output text includes `cd dashboard && npm run dev` before intake chain |
| `release.sh` executes without error (dry run) | INFR-03 | Requires git remote configured | Review script logic manually; confirm VERSION file is read and tag command is correct |
| No `install.sh` in repo root | INFR-01 | File deletion check | `ls scripts/install.sh` → "No such file or directory" |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
