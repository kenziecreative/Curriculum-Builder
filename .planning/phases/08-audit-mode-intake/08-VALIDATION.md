---
phase: 8
slug: audit-mode-intake
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — commands are prose files, not executable code |
| **Config file** | N/A |
| **Quick run command** | Manual: read authored section, check vocabulary quarantine and anti-patterns |
| **Full suite command** | Manual walkthrough with test documents in a test workspace |
| **Estimated runtime** | ~10 minutes per wave (manual review) |

---

## Sampling Rate

- **After every task commit:** Author reads the authored section and checks for vocabulary quarantine violations and anti-patterns listed in RESEARCH.md
- **After every plan wave:** Full manual walkthrough with test documents (use the canonical scenario: AI agent workflows workshop with facilitator guide + slide deck)
- **Before `/gsd:verify-work`:** All 5 success criteria manually verified

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 8-01-01 | 01 | 1 | INTK-07 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-01-02 | 01 | 1 | INTK-08 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-01-03 | 01 | 1 | INTK-09 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-01-04 | 01 | 1 | INTK-10 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-01-05 | 01 | 1 | INTK-11 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-02-01 | 02 | 2 | INTK-07 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |
| 8-03-01 | 03 | 2 | INTK-11 | manual | N/A — prose command | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no automated test infrastructure needed. Command files are verified manually. This is consistent with all prior phases in this project.

*Existing infrastructure covers all phase requirements (there is no test harness for prose command files).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Opening routing question routes correctly — clean path unchanged, audit mode activated | INTK-07 | Prose command; requires live Claude session | Run `/knz-intake` with no args; confirm routing question appears; select "starting fresh" and verify clean intake is unchanged |
| Multiple documents accepted; synthesis before questions | INTK-08 | Prose command; requires live Claude session | Run `/knz-intake path/to/guide.md path/to/slides.md`; verify progress announced per file and no questions asked until extraction table shown |
| Confidence table shown before any follow-up questions | INTK-09 | Prose command; requires live Claude session | Verify extraction table appears with confidence levels before any question; check High fields are not re-asked |
| Conflicts surfaced as named contradictions | INTK-10 | Prose command; requires live Claude session | Use test documents with audience contradiction; verify conflict shown with source attribution and resolution prompt |
| curriculum-gap-report.md written; organized by stage; Shallow by schema-field-completeness | INTK-11 | Prose command; requires live Claude session | Verify file written to `workspace/{project}/00-project-brief/`; check 7 pipeline stages represented; verify Shallow entries cite specific missing schema fields (not quality judgment) |

**Canonical test scenario (use this for all wave-level verification):**
- Document A: Facilitator guide for an AI agent workflows workshop targeting developers with Python experience
- Document B: Slide deck outline with audience: "comfortable with LLM APIs, want deeper agent orchestration"
- Expected conflict: Audience starting point contradiction
- Expected gap report: Stage 2–8 mostly Missing or Shallow

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15 minutes (manual review)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
