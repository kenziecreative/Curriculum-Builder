---
phase: 7
slug: full-pipeline-completion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (plugin output inspection) |
| **Config file** | none — no automated test suite for Claude Code plugin skills |
| **Quick run command** | `cat .planning/STATE.md` (confirm stage gate status) |
| **Full suite command** | Run each command manually against test curriculum |
| **Estimated runtime** | ~5 minutes manual walkthrough |

---

## Sampling Rate

- **After every task commit:** Verify output file exists and matches schema
- **After every plan wave:** Run full manual walkthrough of affected commands
- **Before `/gsd:verify-work`:** All commands produce valid output against test curriculum
- **Max feedback latency:** Immediate — each task produces inspectable output

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | META-01, META-02, META-03 | manual | `ls .claude/skills/knz-metaskills.md` | ✅ / ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | TRNS-01, TRNS-02, TRNS-03, TRNS-04 | manual | `ls .claude/skills/knz-transfer.md` | ✅ / ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 1 | MKTG-01, MKTG-02, MKTG-03, MKTG-04 | manual | `ls .claude/skills/knz-marketing.md` | ✅ / ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 2 | INFR-07 | manual | `cat .claude/settings.json` (verify hook entry) | ✅ / ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 2 | PIPE-07 | manual | `ls .claude/skills/knz-approve.md` | ✅ / ❌ W0 | ⬜ pending |
| 07-02-03 | 02 | 2 | PIPE-06 | manual | Inspect chain wiring in `/knz-validate` | ✅ / ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No automated test framework needed — this is a Claude Code plugin with manual verification
- Existing infrastructure covers structural validation (file existence, schema fields)

*All phase behaviors require manual inspection of command output.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `/knz-metaskills` produces named thinking routines (not labels) | META-01 | Claude output inspection required | Run command, verify activities name specific routines like "Five Whys" not "encourage curiosity" |
| Developability hierarchy respected (Exploring/Creating before Innovating/Adapting) | META-02 | Schema ordering requires visual inspection | Check output order against metaskill tier definitions |
| Transfer elements attach to specific sessions, not generic appendix | TRNS-01, TRNS-02, TRNS-03 | Output structure must be inspected | Verify each transfer element references a session_id or module_id |
| Marketing claims trace to curriculum elements with citations | MKTG-01, MKTG-03 | Traceability requires content review | Confirm each claim has a `source_element` field populated |
| Marketing-to-pedagogy ratio < 25% | MKTG-04 | Word count ratio requires manual calculation | Count marketing words vs. total output words |
| PreToolUse hook blocks Stage 7 write when Stage 6 not complete | INFR-07 | Must test live hook execution | Attempt to write to 05-metaskills/ without Stage 6 complete in STATE.md |
| Final gate presents complete summary before approval | PIPE-07 | AskUserQuestion presentation requires visual check | Run `/knz-approve` on test curriculum, verify summary completeness |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 300s (manual inspection)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
