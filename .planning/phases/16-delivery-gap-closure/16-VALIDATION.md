---
phase: 16
slug: delivery-gap-closure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 16 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (no automated test suite — Claude Code plugin) |
| **Config file** | none |
| **Quick run command** | Read the modified file and confirm the changed line is correct |
| **Full suite command** | End-to-end: run relevant curriculum command on a real workspace and inspect output |
| **Estimated runtime** | ~2 minutes per manual check |

---

## Sampling Rate

- **After every task commit:** Read the modified file and confirm the exact changed line is correct
- **After every plan wave:** Run the affected curriculum command on a real workspace
- **Before `/gsd:verify-work`:** All three changes verified in a single integration pass

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 16-01-01 | 01 | 1 | DLVR-02 | manual smoke | Read `generate-html.js` — confirm it reads from `delivery/session-*/` not `04-sessions/` | ❌ Wave 0 | ⬜ pending |
| 16-01-02 | 01 | 1 | DLVR-03 | manual smoke | Read `verify.md` — confirm Check A row references `sequence-rationale.md` not `module-structure.md` | ❌ Wave 0 | ⬜ pending |
| 16-01-03 | 01 | 1 | AUDIT-01 | manual smoke | Read `intake.md` — confirm Stage 3 pre-pop writes `assessment-map.md` not `assessment-plan.md` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No automated test framework required — all verification is file-read confirmation + live workspace smoke tests
- [ ] A test workspace with multiple sessions needed for DLVR-02 end-to-end verification

*All three tests require a live Claude Code session with a real workspace. No automated command can verify these because they depend on Claude's command execution behavior, not static file content. This is expected for a Claude Code plugin.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| HTML and markdown co-located in `delivery/session-N/` | DLVR-02 | Requires running `/curriculum:assemble` on a workspace with sessions, then inspecting the delivery/ directory structure | Run `/curriculum:assemble`, then `ls delivery/session-*/` — both `.md` and `.html` files should appear in the same session-N subdirectory |
| No false-positive Stage 4 warning from verify | DLVR-03 | Requires a workspace where modules.md has been run — verify.md must not report Stage 4 missing | Run `/curriculum:verify` on a complete workspace — no "Stage 4 not yet generated" warning should appear |
| modules.md finds assessment coverage in audit-mode pre-pop | AUDIT-01 | Requires running intake in audit mode, then running modules without assessments — modules.md must find assessment-map.md | Run `/curriculum:intake` in audit mode, then `/curriculum:modules` without running `/curriculum:assessments` — modules.md should find assessment data |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
