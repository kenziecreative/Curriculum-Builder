# Requirements: KNZ Curriculum Builder

**Defined:** 2026-03-26
**Core Value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip
**Quality Lens:** Minimum Lovable Products — when you're aware of the technology, it's not working well enough

## v4.0 Requirements

Requirements for SME-ready release. Each maps to roadmap phases.

### Vocabulary & Plain Language

- [x] **VOCAB-01**: All audit vocabulary leaks fixed — approve.md template labels, marketing.md generation instruction, transfer.md, curriculum-auditor.md column headers
- [x] **VOCAB-02**: Validation reports rewritten in plain language — no bloom_level, kirkpatrick, TMA arc, DAG, or schema field names visible to users
- [x] **VOCAB-03**: Writing for Clarity instruction added to all remaining commands (resume.md, evaluation-mode.md, verify.md, assemble.md, transfer.md)
- [x] **VOCAB-04**: Output review fixes — parent_module_id hidden as HTML comment, "Primary metaskill" replaced with "Core thinking skill", marketing traceability terms sanitized
- [x] **VOCAB-05**: approve.md gets Never-say list and inline guardrail — final gate summary has vocabulary enforcement matching other commands

### Stage Guidance

- [x] **GUIDE-01**: Every review gate includes plain-language evaluation guidance — what to look for, what questions to ask yourself before approving
- [x] **GUIDE-02**: Constraint enforcement results rewritten as plain-language explanations of what was checked and why it matters
- [x] **GUIDE-03**: Thinking-level (Bloom) progression translated into plain-language questions the SME can actually evaluate
- [x] **DEVL-03**: Stage numbering normalized — stage 1-9 vs directory 00-08 mismatch resolved or explicitly documented

### Integrity & Verification

- [x] **INTG-01**: Curriculum integrity agent created with named failure modes — vocabulary violations, outcome drift, generic content, broken cross-stage links, missing formative assessment, pre-work gaps, doctrine violations
- [x] **INTG-02**: Cross-stage integration check traces every outcome ID, assessment link, and module reference across all 8 stages before final approve gate
- [x] **INTG-03**: Goal-backward verification at session generation — verify sessions achieve module goals (exists/substantive/wired), not just that files were created
- [x] **INTG-04**: Anti-softening instructions encoded in validator, integrity agent, and any verification command — explicit refuse-to-bypass, no-downgrade-severity, no-rationalize-away-failures rules

### Pipeline Robustness

- [x] **PIPE-01**: Draft-then-audit pipeline for stages 4-6 — content writes to draft location first, separate audit promotes to final output
- [x] **PIPE-02**: Pre-execution input validation — each stage command verifies inputs are valid (not just predecessor status complete) before generating
- [x] **PIPE-03**: Canonical registry (curriculum-registry.json) — single source of truth for outcomes, assessments, time allocations, learner profile data; downstream stages check registry, not files
- [x] **PIPE-04**: Context breaks in auto-chain — insert explicit context-clear points between auto-chained stages so each gets a fresh window
- [x] **PIPE-05**: Sub-stage state tracking — STATE.md tracks module-level progress within session generation; context clears mid-stage don't lose completed work

### Deviation & Validation

- [x] **DEVL-01**: Structured deviation handling — define what generators can auto-fix vs. must escalate to user; 3-attempt limit on auto-fixes before escalation
- [ ] **DEVL-02**: Full validation coverage — stages 6-8 (metaskills, transfer, marketing) added to validation checks (T1-19 through T1-33)

### New Capabilities

- [ ] **FEAT-01**: `/curriculum:revise` command — post-delivery feedback loop with targeted re-entry at any stage and change propagation downstream
- [ ] **FEAT-02**: Research input support — audit mode intake recognizes structured research outputs as source material

## Future Requirements

None deferred — v4.0 captures everything noted.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Visual design of HTML output | Structural outlines only — visual polish is downstream of content quality |
| LMS integration / platform export | Output is platform-agnostic markdown + HTML |
| Automated learner assessment scoring | Facilitator handles this; tool builds curriculum, doesn't deliver it |
| Multi-language generation | English only |
| PDF export | Deferred from v3; requires @react-pdf/renderer React 19 compatibility resolution |
| Real-time facilitation support | Future capability beyond curriculum building |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VOCAB-01 | Phase 17 | Complete |
| VOCAB-02 | Phase 17 | Complete |
| VOCAB-03 | Phase 17 | Complete |
| VOCAB-04 | Phase 17 | Complete |
| VOCAB-05 | Phase 17 | Complete |
| GUIDE-01 | Phase 18 | Complete |
| GUIDE-02 | Phase 18 | Complete |
| GUIDE-03 | Phase 18 | Complete |
| DEVL-03 | Phase 18 | Complete |
| PIPE-03 | Phase 19 | Complete |
| PIPE-01 | Phase 19 | Complete |
| PIPE-02 | Phase 19 | Complete |
| PIPE-04 | Phase 19 | Complete |
| PIPE-05 | Phase 19 | Complete |
| INTG-01 | Phase 20 | Complete |
| INTG-02 | Phase 20 | Complete |
| INTG-03 | Phase 20 | Complete |
| INTG-04 | Phase 20 | Complete |
| DEVL-01 | Phase 21 | Complete |
| DEVL-02 | Phase 21 | Pending |
| FEAT-01 | Phase 22 | Pending |
| FEAT-02 | Phase 22 | Pending |

**Coverage:**
- v4.0 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 — traceability populated after roadmap creation*
