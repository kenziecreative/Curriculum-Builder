# Requirements: KNZ Curriculum Builder

**Defined:** 2026-03-24
**Core Value:** Every curriculum package produces genuine behavioral change through structurally enforced pedagogy that no user can accidentally skip

## v3.0 Requirements

Requirements for the v3.0 Output Quality milestone.

### Output Presentation

- [ ] **PRES-01**: All command output hides constraint enforcement steps — user sees result and brief plain-language callout only
- [ ] **PRES-02**: All insider terms replaced with plain language across every command (schema, linkage, verb violations, DCR trigger, TMA arc, Bloom's labels, outcome IDs in conversation, YAML field names)
- [ ] **PRES-03**: `/curriculum:outcomes` output uses structured ASCII formatting (box header, section dividers, tree hierarchy per backlog spec)
- [ ] **PRES-04**: `/curriculum:assessments` output replaces alignment map with human-readable summary (count + what learners do + what it covers)
- [ ] **PRES-05**: `/curriculum:modules` output removes all numbered constraint enforcement steps; keeps module table + sequence rationale paragraph
- [ ] **PRES-06**: All stage-completing commands end with warm synthesizing handoff paragraph naming what was built and next command
- [ ] **PRES-07**: All stage-completing commands include context-clear nudge ("your work is saved — clear context before the next step")
- [ ] **PRES-08**: `/curriculum:init` introduces the dashboard with launch instructions; `/curriculum:sessions` and `/curriculum:validate` remind user dashboard has updated

### Output Quality

- [ ] **QUAL-01**: Slide outlines written as production direction (what goes on the slide + intent + facilitator rationale), not content inventory — modeled on source format
- [ ] **QUAL-02**: Facilitator notes include diagnostic direction: what to observe, what it signals, what move to make — not just stage directions
- [ ] **QUAL-03**: Marketing files are copy-paste-ready prose (PAS/DOS structure, VOC language, benefits-first) — traceability data in separate section at bottom, never wrapped around paragraphs
- [ ] **QUAL-04**: Transfer ecosystem file is readable narrative with plain headings — no YAML structure in output
- [ ] **QUAL-05**: Session content shows full objective text everywhere IDs appear in conversation output
- [ ] **QUAL-06**: NEEDS: markers fully resolved before any file is marked complete — validation stage checks for unconverted markers
- [ ] **QUAL-07**: TMA phase labels (ACTIVATE, THEORY, METHOD, etc.) never appear as visible labels in facilitator guides, participant materials, or slide outlines
- [ ] **QUAL-08**: HTML calculation comments and working notes stripped from all session output files before writing
- [ ] **QUAL-09**: Writing for Clarity principles applied across all generated content (kernel sentences, precise language, no warm-up copy)

### Voice

- [x] **VOICE-01**: `curriculum-voice.md` created as shared reference — tone per output type, guardrails (terms that never appear), plain-language substitutions, signature moves
- [ ] **VOICE-02**: Every command that generates user-facing content references `curriculum-voice.md` before generating

### Audit Mode

- [ ] **AUDIT-01**: Audit mode implements three content-handling modes — gap-fill (no source content), enrich (thin/incomplete), hands-off (strong existing content) — triggered by extraction confidence level
- [ ] **AUDIT-02**: When audit mode produces a module structure that differs from source, it shows a side-by-side with reasoning before writing files
- [ ] **AUDIT-03**: Curriculum auditor extracted into dedicated specialist agent — intake command delegates source material analysis to it

### Infrastructure

- [x] **INFR-01**: Deployment model changed to clone-and-run — README, install.sh, CLAUDE.md updated; workspace always inside cloned repo
- [x] **INFR-02**: Dashboard accepts `WORKSPACE_DIR` env var; `/curriculum:init` tells user exact launch command for their workspace
- [x] **INFR-03**: `scripts/release.sh` automates sync from dev repo to public plugin release repo

### Delivery

- [ ] **DLVR-01**: Document assembler command or final stage in `/curriculum:approve` compiles all approved stage outputs into facilitator package, participant workbook, and program overview document
- [ ] **DLVR-02**: Marketing package and facilitator guides generate polished HTML alongside markdown
- [ ] **DLVR-03**: Curriculum verifier checks completeness before delivery: no NEEDS: markers, broken outcome ID references, missing required stage files, no HTML comments in output

## Future Requirements

### Deferred from v3.0

- Generate 2-3 structural alternatives for module sequence and objective framing — deferred; v3.0 focuses on quality of single output
- Checkpoint language upgrade (holistic gate questions) — deferred; transactional gates functional
- Real-time facilitation support — out of scope per PROJECT.md
- LMS integration — out of scope per PROJECT.md

## Out of Scope

| Feature | Reason |
|---------|--------|
| Generate structural options (multiple module sequences) | v3.0 focuses on quality of single output; options add interaction complexity |
| Checkpoint language upgrade | Transactional gates work; holistic language is polish, not fix |
| Video/multimedia content | Document-based output only |
| LMS/platform integration | Platform-agnostic by design |
| Real-time facilitation support | Future capability |
| Multi-language generation | English only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PRES-01 | Phase 13 | Pending |
| PRES-02 | Phase 13 | Pending |
| PRES-03 | Phase 13 | Pending |
| PRES-04 | Phase 13 | Pending |
| PRES-05 | Phase 13 | Pending |
| PRES-06 | Phase 13 | Pending |
| PRES-07 | Phase 13 | Pending |
| PRES-08 | Phase 13 | Pending |
| QUAL-01 | Phase 13 | Pending |
| QUAL-02 | Phase 13 | Pending |
| QUAL-03 | Phase 13 | Pending |
| QUAL-04 | Phase 13 | Pending |
| QUAL-05 | Phase 13 | Pending |
| QUAL-06 | Phase 13 | Pending |
| QUAL-07 | Phase 13 | Pending |
| QUAL-08 | Phase 13 | Pending |
| QUAL-09 | Phase 13 | Pending |
| VOICE-01 | Phase 12 | Complete |
| VOICE-02 | Phase 12 | Pending |
| AUDIT-01 | Phase 14 | Pending |
| AUDIT-02 | Phase 14 | Pending |
| AUDIT-03 | Phase 14 | Pending |
| INFR-01 | Phase 11 | Complete |
| INFR-02 | Phase 11 | Complete |
| INFR-03 | Phase 11 | Complete |
| DLVR-01 | Phase 15 | Pending |
| DLVR-02 | Phase 15 | Pending |
| DLVR-03 | Phase 15 | Pending |

**Coverage:**
- v3.0 requirements: 28 total
- Mapped to phases: 28/28 ✓
- Unmapped: 0

---
*Requirements defined: 2026-03-24*
*Last updated: 2026-03-24 after roadmap creation*
