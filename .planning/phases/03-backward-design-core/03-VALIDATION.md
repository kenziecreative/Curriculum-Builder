---
phase: 3
slug: backward-design-core
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Claude Code plugin (markdown command files, no executable runtime) |
| **Config file** | N/A |
| **Quick run command** | Manual: run `/knz-outcomes` against a test workspace project |
| **Full suite command** | Manual: full pipeline smoke test from `/knz-init` through Stage 3 gate approval |
| **Estimated runtime** | ~10 minutes (manual inspection) |

---

## Sampling Rate

- **After every task commit:** Manual inspection of generated output files
- **After every plan wave:** Full pipeline smoke test from `/knz-init` through Stage 3 approval
- **Before `/gsd:verify-work`:** Full pipeline smoke test green
- **Max feedback latency:** ~10 minutes (manual)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-xx-01 | TBD | 1 | OUTC-01, OUTC-02 | manual | Run `/knz-outcomes`, inspect `01-outcomes/learning-objectives.md` — every objective has `bloom_level` field with valid enum and hierarchy present | ❌ Wave 0 | ⬜ pending |
| 03-xx-02 | TBD | 1 | OUTC-03 | manual | Inspect `learning-objectives.md` — no objective missing `transfer_context` field | ❌ Wave 0 | ⬜ pending |
| 03-xx-03 | TBD | 1 | OUTC-04 | manual | Inspect distribution summary table — count unique Bloom's levels (≥4 required) | ❌ Wave 0 | ⬜ pending |
| 03-xx-04 | TBD | 2 | ASMT-01, ASMT-02 | manual | Inspect `02-assessments/assessment-map.md` — every outcome_id present, all Bloom Match rows show >= | ❌ Wave 0 | ⬜ pending |
| 03-xx-05 | TBD | 2 | ASMT-03, ASMT-04 | manual | Inspect `formative-assessments.md` and `summative-assessments.md` — formatives per module, all entries have `success_criteria` | ❌ Wave 0 | ⬜ pending |
| 03-xx-06 | TBD | 2 | PIPE-05 | manual | Run `/knz-assessments`, verify AskUserQuestion gate appears, verify Stage 4 blocked without explicit approval | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Create test workspace project via `/knz-init` for manual verification runs
- [ ] Confirm Stage 2 (`knz-intake`) complete in test workspace before running outcomes/assessments commands

*Manual-only verification: no automated stubs needed — all validation is observational against generated output files.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Objectives tagged with Bloom's level | OUTC-01 | Markdown command files have no runtime to instrument | Run `/knz-outcomes`, inspect `01-outcomes/learning-objectives.md` — every objective has `bloom_level` with valid enum value |
| Outcome hierarchy: program → module → session | OUTC-02 | Observational — inspect generated file structure | Inspect `learning-objectives.md` — all three levels present, IDs in correct format (P-01, M-01, S-01) |
| Transfer spec on every objective | OUTC-03 | Observational — inspect generated fields | Inspect `learning-objectives.md` — no objective missing `transfer_context` field |
| Bloom's distribution spans ≥4 levels | OUTC-04 | Count requires inspection of distribution summary | Inspect distribution table in conversation output — count unique levels, duration-based minimum applies |
| 100% objective-assessment coverage | ASMT-01 | Observational — inspect alignment map | Inspect `02-assessments/assessment-map.md` — every outcome_id appears in at least one row |
| Assessment Bloom ≥ objective Bloom | ASMT-02 | Observational — inspect Bloom Match column | Inspect `assessment-map.md` Bloom Match column — all rows show >= (e.g., "Apply >= Apply"), none show < |
| Formative assessments present per module | ASMT-03 | Observational — inspect generated file | Inspect `formative-assessments.md` — at least one formative per module |
| Rubric criteria generated | ASMT-04 | Observational — inspect success_criteria fields | Inspect both formative and summative assessment files — every entry has `success_criteria` field |
| Assessment gate pauses pipeline | PIPE-05 | Interactive behavior — requires live run | Run `/knz-assessments`, verify AskUserQuestion appears and Stage 4 cannot advance without explicit approval |

---

## Validation Sign-Off

- [ ] All tasks have manual verification instructions mapped to requirement IDs
- [ ] Wave 0 test workspace setup documented
- [ ] No watch-mode flags (N/A — manual-only)
- [ ] Full pipeline smoke test passes before verify-work
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
