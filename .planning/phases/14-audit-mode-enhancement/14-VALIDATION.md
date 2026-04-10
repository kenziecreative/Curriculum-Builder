---
phase: 14
slug: audit-mode-enhancement
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual smoke testing (markdown-based plugin — no automated test framework) |
| **Config file** | None |
| **Quick run command** | Run `/curriculum:intake` with test fixture files in `workspace/test-program/source-material/` |
| **Full suite command** | Run full audit mode path — intake → modules — against reference test case; verify audit-results.md, mode confirmation display, modules.md diff behavior |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Manually run the affected command with the reference test case
- **After every plan wave:** Full audit mode path — intake through modules — against reference test case
- **Before `/gsd:verify-work`:** All three modes triggered at least once; side-by-side diff verified; Completion Signal format verified in isolation before wiring
- **Max feedback latency:** 5 minutes

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 14-auditor-create | 01 | 1 | AUDIT-03 | smoke | Manual — run Task with test fixture, inspect audit-results.md | ❌ W0 | ⬜ pending |
| 14-auditor-isolation | 01 | 1 | AUDIT-03 | smoke | Manual — run auditor in isolation against reference test case; verify Completion Signal format | ❌ W0 | ⬜ pending |
| 14-intake-dispatcher | 01 | 2 | AUDIT-01 | smoke | Manual — run intake with partial-content fixture; verify mode confirmation table | ❌ W0 | ⬜ pending |
| 14-mode-confirmation | 01 | 2 | AUDIT-01 | smoke | Manual — verify plain-language mode names appear; no internal mode names shown to user | ❌ W0 | ⬜ pending |
| 14-modules-handoff | 02 | 2 | AUDIT-02 | smoke | Manual — pre-populate Stage 4 with strong content; run /curriculum:modules; verify diff shows only violations | ❌ W0 | ⬜ pending |
| 14-modules-enrich | 02 | 2 | AUDIT-02 | smoke | Manual — use partial-content fixture; confirm diff gate appears before 03-modules/ files are written | ❌ W0 | ⬜ pending |
| 14-modules-gapfill | 02 | 2 | AUDIT-01 | smoke | Manual — use fixture with Stages 6–8 absent; verify those stages get fresh generation | Partial | ⬜ pending |
| 14-sessions-mode | 03 | 3 | AUDIT-01 | smoke | Manual — run sessions in audit mode; verify mode routing applies per stage | ❌ W0 | ⬜ pending |
| 14-degradation | 02 | 2 | AUDIT-01 | smoke | Manual — remove audit-results.md; verify gap-fill fallback triggers | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `workspace/test-program/source-material/` — test fixture files for the reference test case (6-session AI agent workflows workshop: facilitator guide + slide deck outline)
- [ ] `curriculum-auditor.md` — new agent file; all other items depend on this
- [ ] `audit-results.md` — written by the auditor, verified to exist and parse correctly before wiring intake.md

*All three must exist before Wave 1 isolation test can run.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Completion Signal format matches contract | AUDIT-03 | Plugin is markdown instruction files — no automated assertion layer | Run auditor as isolated Task against reference test case; inspect audit-results.md — verify all four columns present: Stage, extraction_confidence, content_quality, summary |
| Mode confirmation display shows plain language | AUDIT-01 | UI output requires human judgment | Run intake with partial-content fixture; verify "Build from scratch" / "Fill in what's missing" / "Keep what you have and validate it" appear; verify gap-fill/enrich/hands-off never shown |
| Side-by-side diff appears before any file writes | AUDIT-02 | File-write sequencing requires human observation | Use partial-content fixture; observe diff gate appears; confirm no files in 03-modules/ until gate is approved |
| extraction_confidence and content_quality are distinct | AUDIT-03 | Dimensional separation is a content quality judgment | Run auditor against high-confidence/low-quality fixture (content found but schema-noncompliant); verify extraction_confidence=High and content_quality=partial coexist |
| Per-stage mode override works | AUDIT-01 | Interactive flow requires human interaction | At mode confirmation gate, select "Change what happens to a stage"; verify updated table re-displays; verify override persists to STATE.md |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
