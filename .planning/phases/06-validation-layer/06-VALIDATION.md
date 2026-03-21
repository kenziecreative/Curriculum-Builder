---
phase: 6
slug: validation-layer
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-21
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — Claude Code plugin (markdown/YAML files, no runtime test framework) |
| **Config file** | none |
| **Quick run command** | `node -e "require('./src/plugin-validator.cjs')"` (structural check) |
| **Full suite command** | Manual: `/knz-validate` on test-program workspace |
| **Estimated runtime** | ~30 seconds (manual validation run) |

---

## Sampling Rate

- **After every task commit:** Confirm file exists at expected path and has required frontmatter/sections
- **After every plan wave:** Run `/knz-validate` on `workspace/test-program/` manually
- **Before `/gsd:verify-work`:** Full manual validation run must produce schema-report with no false positives
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 1 | VALD-01 | structural | `ls .claude/agents/knz-validator.md && echo 'file exists'` | ✅ W0 | ⬜ pending |
| 6-01-02 | 01 | 1 | VALD-02 | structural | `ls .claude/commands/knz-validate.md && ls .claude/commands/knz-sessions.md && echo 'files exist'` | ✅ W0 | ⬜ pending |
| 6-01-03 | 01 | 2 | VALD-03 | manual | Run `/knz-validate` on test-program with missing field | — | ⬜ pending |
| 6-01-04 | 01 | 2 | VALD-04 | manual | Run `/knz-validate` and confirm Tier 2 confidence scores appear | — | ⬜ pending |
| 6-02-01 | 02 | 1 | VALD-05 | structural | `ls src/components/ValidationReport.tsx` | ✅ W0 | ⬜ pending |
| 6-02-02 | 02 | 2 | VALD-06 | manual | Check dashboard renders ValidationReport with human-review items | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.claude/agents/knz-validator.md` — validator agent stub (VALD-01)
- [ ] `.claude/commands/knz-validate.md` — validate command stub (VALD-02)
- [ ] `src/components/ValidationReport.tsx` — dashboard component stub (VALD-05)

*Note: This phase creates new files; Wave 0 stubs must exist before Wave 1+ tasks fill them.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Schema-report names exact field + stage + location | VALD-02 | Output is a markdown file — must be human-read | Run `/knz-validate` on test-program with one intentionally missing `bloom_level` field; confirm report identifies exact session file and field path |
| Tier 1 blocks stage completion | VALD-03 | STATE.md gate logic — no automated runner | Run `/knz-validate`; confirm STATE.md shows `final_validation: blocked` when required field absent |
| Tier 2 confidence scores (not pass/fail) | VALD-04 | Rubric scoring is LLM judgment — not deterministic | Run `/knz-validate` on test-program with thin transfer prompts; confirm report shows numeric score (0.0–1.0) not "pass/fail" |
| ValidationReport human-review items | VALD-06 | Dashboard is browser UI | Open dashboard; confirm ValidationReport renders with specific item descriptions, not generic messages |
| Auto-trigger from /knz-sessions | VALD-05 | End-to-end flow | Run `/knz-sessions` to completion; confirm `/knz-validate` fires automatically after session generation |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
