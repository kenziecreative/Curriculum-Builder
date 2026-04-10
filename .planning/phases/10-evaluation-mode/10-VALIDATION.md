---
phase: 10
slug: evaluation-mode
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Not applicable — Claude Code plugin |
| **Config file** | None |
| **Quick run command** | `/curriculum:evaluate` with a single test document |
| **Full suite command** | `/curriculum:evaluate` against real-world test candidate (workshop-outline-integrated.md + workshop-slides-outline.md) |
| **Estimated runtime** | ~2–5 minutes (agent execution time) |

---

## Sampling Rate

- **After every task commit:** Run `/curriculum:evaluate` with a minimal document; confirm command routes and agent dispatches
- **After every plan wave:** Run full evaluation against real-world test candidate; verify report format
- **Before `/gsd:verify-work`:** Full evaluation of real-world test candidate must produce a complete, specific evaluation-report.md
- **Max feedback latency:** N/A — manual verification

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 10-01-01 | 01 | 1 | EVAL-01 | manual | `/curriculum:evaluate path/to/doc.md` in workspace | ✅ post-author | ⬜ pending |
| 10-01-02 | 01 | 1 | EVAL-01 | manual | `/curriculum:evaluate` with no args in workspace with files | ✅ post-author | ⬜ pending |
| 10-01-03 | 01 | 1 | EVAL-01 | manual | Confirm evaluation-report.md excluded from auto-detect list when present | ✅ post-author | ⬜ pending |
| 10-02-01 | 02 | 2 | EVAL-02 | manual | Full evaluation report: strengths, failures with recommendations, quality scores | ✅ post-author | ⬜ pending |
| 10-02-02 | 02 | 2 | EVAL-02 | manual | 90-min document: confirm Tier 2 scores absent from output | ✅ post-author | ⬜ pending |
| 10-02-03 | 02 | 2 | EVAL-02 | manual | Confirm no check IDs (T1-xx) or schema field names in user-facing output | ✅ post-author | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no automated test infrastructure needed. All verification is manual slash command execution against real or synthetic curriculum documents.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `/curriculum:evaluate` accepts external files and runs validation without pipeline stages | EVAL-01 | Claude Code plugin behavior — no automated test runner | Run `/curriculum:evaluate workspace/accessible-development-with-ai/source-material/workshop-outline-integrated.md`; confirm evaluation-report.md written to source-material/; confirm no pipeline stage required |
| Auto-detect fallback lists source-material/ files, excludes evaluation-report.md | EVAL-01 | Requires live command execution to verify file listing | Run with no arguments in workspace where evaluation-report.md exists; confirm report excluded from candidate list |
| Evaluation report includes strengths section, failures with specific recommendations, and quality scores | EVAL-02 | Content quality requires human judgment | Review evaluation-report.md; confirm recommendations reference source document content, not generic guidance |
| Tier 2 scores appear as N/10 integers; tier jargon absent | EVAL-02 | Requires reading output for format compliance | Review conversation output and report file; search for "T1-", "Tier 2", "schema field", field name strings — none should appear |
| Duration scaling: 90-min programs skip Tier 2 | EVAL-02 | Requires running with duration-explicit document | Run against a document stating "90-minute session"; confirm no quality ratings section in output |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < N/A (manual)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
