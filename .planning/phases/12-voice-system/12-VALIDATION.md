---
phase: 12
slug: voice-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual inspection — no automated test framework applicable (markdown file authoring) |
| **Config file** | none |
| **Quick run command** | `wc -l .claude/reference/curriculum-voice.md` (line count check) |
| **Full suite command** | `grep -l "curriculum-voice.md" .claude/plugins/curriculum/commands/*.md` (wiring check) |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick line count check on voice file
- **After every plan wave:** Run full wiring grep across all command files
- **Before `/gsd:verify-work`:** Manual review of Persona sections in worst-4 commands
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | VOICE-01 | file-exists | `test -f .claude/reference/curriculum-voice.md && echo EXISTS` | ❌ W0 | ⬜ pending |
| 12-01-02 | 01 | 1 | VOICE-01 | line-count | `wc -l .claude/reference/curriculum-voice.md` | ❌ W0 | ⬜ pending |
| 12-02-01 | 02 | 2 | VOICE-02 | wiring-count | `grep -l "curriculum-voice.md" .claude/plugins/curriculum/commands/*.md \| wc -l` | ✅ | ⬜ pending |
| 12-02-02 | 02 | 2 | VOICE-02 | inline-check | `grep -c "Never.*say\|Prohibited\|Do not" .claude/plugins/curriculum/commands/marketing.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.claude/reference/curriculum-voice.md` — create empty file with frontmatter stub (required for subsequent commands to reference)

*All other verification commands reference existing files that will be created as part of plan execution.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Persona sections show consistent baseline tone across all 13 commands | VOICE-02 | Tone consistency requires human judgment | Read Persona sections of all 13 command files in sequence; verify all share "confident colleague" baseline with only marketing differing |
| Inline guardrails in 4 worst-offending commands are tight (3-5 terms only) | VOICE-02 | "Tight" is a judgment call | Check marketing.md, transfer.md, session-generator.md, assessments.md — each should have a bolded inline list of 3-5 terms inside Persona, not a paragraph |
| Voice file reads as reference documentation, not as a command | VOICE-01 | Quality judgment | Read curriculum-voice.md — should feel like a style guide, not a set of directives |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
