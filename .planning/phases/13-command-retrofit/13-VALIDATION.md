---
phase: 13
slug: command-retrofit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual search + grep verification |
| **Config file** | none — all validation is file-content search |
| **Quick run command** | `grep -r "schema\|linkage\|bloom_level\|TMA\|DCR trigger\|WIPPEA" .claude/plugins/curriculum/commands/ .claude/plugins/curriculum/agents/` |
| **Full suite command** | Same grep extended to schemas and output files |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick grep for prohibited terms in modified files
- **After every plan wave:** Run full grep across all command files + agents
- **Before `/gsd:verify-work`:** Full suite must return zero matches on prohibited terms
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 13-01-xx | 01 | 1 | PRES-01, PRES-02 | grep | `grep -l "schema\|YAML\|bloom_level" .claude/plugins/curriculum/commands/*.md` | ✅ | ⬜ pending |
| 13-01-xx | 01 | 1 | PRES-03, PRES-04 | grep + visual | `grep -l "warm handoff\|context.clear" .claude/plugins/curriculum/commands/*.md` | ✅ | ⬜ pending |
| 13-02-xx | 02 | 2 | QUAL-06 | grep | `grep "YAML\|schema-compliant YAML" .claude/plugins/curriculum/commands/marketing.md` | ✅ | ⬜ pending |
| 13-03-xx | 03 | 2 | QUAL-07 | grep | `grep "YAML\|schema-compliant YAML" .claude/plugins/curriculum/commands/transfer.md` | ✅ | ⬜ pending |
| 13-04-xx | 04 | 3 | QUAL-01, QUAL-02 | manual | Review session-generator output for slide format and facilitator note format | ✅ | ⬜ pending |
| 13-04-xx | 04 | 3 | QUAL-03, QUAL-04 | grep | `grep -l "TMA\|ACTIVATE:\|THEORY:\|METHOD:\|APPLICATION:" .claude/plugins/curriculum/agents/session-generator.md` | ✅ | ⬜ pending |
| 13-04-xx | 04 | 3 | QUAL-08 | grep | `grep "NEEDS:" .claude/plugins/curriculum/agents/session-generator.md` | ✅ | ⬜ pending |
| 13-04-xx | 04 | 3 | QUAL-09 | grep | `grep "<!-- \|-->" .claude/plugins/curriculum/agents/session-generator.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed — validation is grep-based search against command files.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Warm handoffs read naturally as two-sentence synthesizing statements | PRES-03 | Requires content judgment, not pattern matching | Read final sentence(s) of each stage-completing command; verify they name what was built AND what command comes next |
| Context-clear nudge is plain language (not instructional jargon) | PRES-04 | Requires readability judgment | Read nudge in each completed command; verify it reads naturally to a non-ID audience |
| Slide outline describes pedagogical intent, not content inventory | QUAL-01 | Requires pedagogical judgment | Review sample slide-outline.md output from session-generator; verify "Why it matters" fields contain pedagogical rationale |
| Facilitator notes are diagnostic, not procedural | QUAL-02 | Requires facilitation expertise judgment | Review sample facilitator-guide.md; verify Watch for/What it means/Your move structure is present and meaningful |
| Marketing prose is copy-paste-ready (PAS/DOS) | QUAL-06 | Requires copywriting judgment | Review sample marketing-package.md output; verify prose is audience-facing, not traceability-first |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
