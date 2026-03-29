# Requirements: KNZ Curriculum Builder

**Defined:** 2026-03-29
**Core Value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip

## v5.0 Requirements

Requirements for Generation Integrity milestone. Each maps to roadmap phases.

### Domain Research

- [x] **RSRCH-01**: After intake completes with no source materials, agent asks the SME for hypotheses about the domain that should shape how the curriculum is taught
- [x] **RSRCH-02**: Agent researches each SME hypothesis against evidence using web search and available sources
- [x] **RSRCH-03**: Each finding is tagged with an evidence label (SUPPORTED, COMPLICATED, CONTRADICTED, GAP) at research time, not during synthesis
- [x] **RSRCH-04**: Agent presents findings at a checkpoint for SME review before generation proceeds -- SME can confirm, adjust, or add context
- [x] **RSRCH-05**: Verified findings are saved as a grounding document in workspace/source-material/ that all downstream stages reference
- [x] **RSRCH-06**: If source materials already exist at intake, domain research step is skipped -- source materials serve as the grounding base

### Alignment Verification

- [ ] **ALIGN-01**: After each generation stage (outcomes through marketing), an alignment check verifies output references source material findings
- [ ] **ALIGN-02**: Content generated without source material grounding is flagged as "assumed" with a specific marker
- [ ] **ALIGN-03**: Qualifier stripping is detected -- when source says "in some contexts" but output says "always"
- [ ] **ALIGN-04**: Range narrowing is detected -- when source gives a range but output narrows it
- [ ] **ALIGN-05**: Alignment check runs automatically as part of the draft-then-audit pipeline, before content advances from draft to final
- [ ] **ALIGN-06**: Alignment issues block draft promotion until resolved -- same hard-gate pattern as the research agent

### Canonical Registry

- [x] **CANON-01**: Learning outcomes are registered in a canonical outcomes registry after Stage 2 completes
- [x] **CANON-02**: Every module spec, session, assessment, and marketing claim that references a learning outcome uses the canonical version -- not a paraphrased copy
- [x] **CANON-03**: If a downstream stage needs to modify an outcome, the canonical registry is updated first -- not the individual file
- [x] **CANON-04**: Key decisions from intake (audience, duration, skill type, transfer context) are part of the canonical registry and referenced by all stages

### Audit Trail

- [x] **AUDIT-01**: Each generation stage records which source material files were read before generating
- [x] **AUDIT-02**: Each generation stage records which specific findings or claims from source material were used in the output
- [x] **AUDIT-03**: Content that was generated from the agent's own knowledge (not source material) is marked as "agent-generated" in the audit trail
- [x] **AUDIT-04**: SME confirmations at checkpoints are recorded with timestamp and what was confirmed
- [x] **AUDIT-05**: Audit trail is readable as a standalone document -- an SME can trace any claim in the final curriculum back to its evidence source

### Cross-Stage Consistency

- [ ] **XSTAGE-01**: After sessions are generated, automated check verifies session content aligns with module specs (outcomes referenced, time allocations, prerequisite chains)
- [ ] **XSTAGE-02**: After marketing is generated, automated check verifies every claim traces to a specific outcome or assessment
- [ ] **XSTAGE-03**: Cross-stage consistency check runs automatically before the approve gate
- [ ] **XSTAGE-04**: Specific contradictions are surfaced with file references and the conflicting values shown side by side

## v6.0 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Longitudinal Integrity

- **LONG-01**: Track outcome achievement data across multiple program cohorts
- **LONG-02**: Rubric calibration based on delivery feedback
- **LONG-03**: Automatic detection of content that consistently produces low transfer scores

### Advanced Research

- **ADVR-01**: Multi-source triangulation with confidence scoring per claim
- **ADVR-02**: Automatic gap detection in source material coverage
- **ADVR-03**: Research update notifications when source material becomes outdated

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time facilitation monitoring | Requires delivery platform integration -- this tool builds curriculum, doesn't deliver it |
| Automated plagiarism detection | Source material is provided by the user -- they own the IP |
| Citation formatting (APA/MLA) | Output is internal curriculum, not academic publication |
| Source material quality scoring | The SME decides what's credible -- the tool doesn't second-guess their sources |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUDIT-01 | Phase 25 | Complete |
| AUDIT-02 | Phase 25 | Complete |
| AUDIT-03 | Phase 25 | Complete |
| AUDIT-04 | Phase 25 | Complete |
| AUDIT-05 | Phase 25 | Complete |
| CANON-01 | Phase 26 | Complete |
| CANON-02 | Phase 26 | Complete |
| CANON-03 | Phase 26 | Complete |
| CANON-04 | Phase 26 | Complete |
| RSRCH-01 | Phase 27 | Complete |
| RSRCH-02 | Phase 27 | Complete |
| RSRCH-03 | Phase 27 | Complete |
| RSRCH-04 | Phase 27 | Complete |
| RSRCH-05 | Phase 27 | Complete |
| RSRCH-06 | Phase 27 | Complete |
| ALIGN-01 | Phase 28 | Pending |
| ALIGN-02 | Phase 28 | Pending |
| ALIGN-03 | Phase 28 | Pending |
| ALIGN-04 | Phase 28 | Pending |
| ALIGN-05 | Phase 28 | Pending |
| ALIGN-06 | Phase 28 | Pending |
| XSTAGE-01 | Phase 29 | Pending |
| XSTAGE-02 | Phase 29 | Pending |
| XSTAGE-03 | Phase 29 | Pending |
| XSTAGE-04 | Phase 29 | Pending |

**Coverage:**
- v5.0 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap creation*
