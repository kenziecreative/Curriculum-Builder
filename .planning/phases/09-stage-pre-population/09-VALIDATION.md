---
phase: 9
slug: stage-pre-population
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Claude Code plugin (markdown command files + bash hook); behavior is specified in natural language and verified by running the plugin end-to-end |
| **Config file** | none |
| **Quick run command** | `grep -r 'pre-populated' workspace/test-program/STATE.md` (spot check state) |
| **Full suite command** | Manual: full audit mode flow from intake through `/curriculum:outcomes` with pre-populated draft |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Run `grep -r 'pre-populated' workspace/test-program/STATE.md`
- **After every plan wave:** Full manual audit mode flow with test materials
- **Before `/gsd:verify-work`:** Full audit mode flow green + hook unit test green
- **Max feedback latency:** ~5 minutes (manual gate)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 9-01-01 | 01 | 1 | INTK-12 | unit (bash) | `echo '{"tool_name":"Write","tool_input":{"file_path":"workspace/test/01-outcomes/x.md"}}' \| bash .claude/hooks/pre-tool-use.sh` | ✅ hook exists | ⬜ pending |
| 9-01-02 | 01 | 1 | INTK-12 | smoke | `grep 'pre-populated' workspace/test-program/STATE.md` | ❌ W0: test STATE.md with pre-populated rows needed | ⬜ pending |
| 9-02-01 | 02 | 2 | INTK-12 | smoke | Manual: run `/curriculum:outcomes` after pre-population | N/A | ⬜ pending |
| 9-02-02 | 02 | 2 | INTK-12 | smoke | Manual: choose "Start over" at enforcement gate | N/A | ⬜ pending |
| 9-02-03 | 02 | 2 | INTK-12 | smoke | `grep 'NEEDS:' workspace/*/01-outcomes/*.md` after approval | N/A | ⬜ pending |
| 9-03-01 | 03 | 2 | INTK-12 | smoke | Manual: run full audit mode intake with test source materials | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `workspace/test-program/STATE.md` — add `pre-populated` status rows for hook unit test (Stage 2 or 3 set to `pre-populated`, Stage 1 set to `complete`)
- [ ] `workspace/test-program/source-material/` — confirm test source materials exist for manual smoke tests
- [ ] `tests/test_pre_tool_use_pre_populated.sh` — hook unit test script: feeds constructed JSON payload to `pre-tool-use.sh` with a STATE.md showing `pre-populated`, verifies the deny response contains forward-looking message

*Hook file itself exists at `.claude/hooks/pre-tool-use.sh`.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Pre-populated files written to stage dirs after intake approval | INTK-12 | Plugin behavior — Claude executes the command; file writes are Claude's output, not a script | Run `/curriculum:intake` in audit mode with test source materials; verify stage files appear in `workspace/test-program/01-outcomes/` etc. |
| Downstream command `pre-populated` branch displays draft and runs enforcement | INTK-12 | Requires Claude to interpret the command and follow the branch | After pre-population, run `/curriculum:outcomes`; verify it displays corrected content (not blank generation) and offers three-option gate |
| "Start over" from pre-populated branch wipes files and resets status | INTK-12 | Requires user interaction at gate | At enforcement gate, choose "Start over"; verify stage dir is cleared and STATE.md shows `not-started` |
| NEEDS: markers absent from approved output files | INTK-12 | Requires full approval flow | Run `/curriculum:outcomes` to approval; `grep 'NEEDS:' workspace/*/01-outcomes/*.md` returns empty |
| Post-intake summary table shows correct stage / what was written / issues | INTK-12 | Visual output — no grep equivalent | After intake approval, verify table appears with correct row per pre-populated stage |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes (manual)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
