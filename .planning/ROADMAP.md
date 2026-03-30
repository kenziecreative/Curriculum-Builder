# Roadmap: KNZ Curriculum Builder

## Milestones

- v1.0 MVP (Phases 1-7) -- shipped 2026-03-22
- v2.0 Existing Curriculum Support (Phases 8-10) -- shipped 2026-03-24
- v3.0 Output Quality (Phases 11-16) -- shipped 2026-03-25
- v4.0 SME-Ready (Phases 17-24) -- shipped 2026-03-28
- v5.0 Generation Integrity (Phases 25-29) -- in progress

## Phases

<details>
<summary>v1.0 MVP (Phases 1-7) -- SHIPPED 2026-03-22</summary>

- [x] Phase 1: Schema and Foundation -- completed 2026-03-15
- [x] Phase 2: Core Plugin Infrastructure -- completed 2026-03-16
- [x] Phase 3: Backward Design Core -- completed 2026-03-18
- [x] Phase 4: Dashboard MVP -- completed 2026-03-19
- [x] Phase 5: Module and Session Generation -- completed 2026-03-20
- [x] Phase 6: Validation Layer -- completed 2026-03-21
- [x] Phase 7: Full Pipeline Completion -- completed 2026-03-22

See [v1.0 archive](milestones/v1.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>v2.0 Existing Curriculum Support (Phases 8-10) -- SHIPPED 2026-03-24</summary>

- [x] Phase 8: Audit Mode Intake (3/3 plans) -- completed 2026-03-22
- [x] Phase 8.1: Plugin Namespace Migration (2/2 plans) -- completed 2026-03-23
- [x] Phase 9: Stage Pre-population (3/3 plans) -- completed 2026-03-24
- [x] Phase 10: Evaluation Mode (2/2 plans) -- completed 2026-03-24

See [v2.0 archive](milestones/v2.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>v3.0 Output Quality (Phases 11-16) -- SHIPPED 2026-03-25</summary>

- [x] Phase 11: Infrastructure (1/1 plans) -- completed 2026-03-25
- [x] Phase 12: Voice System (2/2 plans) -- completed 2026-03-25
- [x] Phase 13: Command Retrofit (5/5 plans) -- completed 2026-03-25
- [x] Phase 14: Audit Mode Enhancement (3/3 plans) -- completed 2026-03-25
- [x] Phase 15: Delivery Layer (3/3 plans) -- completed 2026-03-25
- [x] Phase 16: Delivery Gap Closure (1/1 plan) -- completed 2026-03-25

See [v3.0 archive](milestones/v3.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>v4.0 SME-Ready (Phases 17-24) -- SHIPPED 2026-03-28</summary>

- [x] Phase 17: Vocabulary & Plain Language (3/3 plans) -- completed 2026-03-27
- [x] Phase 18: Stage Guidance (4/4 plans) -- completed 2026-03-27
- [x] Phase 19: Pipeline Infrastructure (3/3 plans) -- completed 2026-03-27
- [x] Phase 20: Integrity & Verification (3/3 plans) -- completed 2026-03-27
- [x] Phase 21: Deviation & Validation Coverage (3/3 plans) -- completed 2026-03-28
- [x] Phase 22: New Capabilities (2/2 plans) -- completed 2026-03-28
- [x] Phase 23: Pipeline Recovery Fixes (1/1 plan) -- completed 2026-03-28
- [x] Phase 24: Validation Coverage Alignment (1/1 plan) -- completed 2026-03-28

See [v4.0 archive](milestones/v4.0-ROADMAP.md) for full phase details.

</details>

---

### v5.0 Generation Integrity (In Progress)

**Milestone Goal:** Ensure the pipeline's output is grounded in verified domain knowledge and that generated content can be traced back to its evidence base.

- [x] **Phase 25: Audit Trail Infrastructure** - Recording and tracing what the pipeline reads, uses, and assumes during generation -- completed 2026-03-29
- [x] **Phase 26: Canonical Outcome Registry** - Single source of truth for learning outcomes and intake decisions that all stages reference -- completed 2026-03-29
- [x] **Phase 27: Domain Research** - New pipeline stage between intake and outcomes that grounds from-scratch builds in verified evidence (completed 2026-03-29)
- [ ] **Phase 28: Alignment Verification** - Post-generation checks that output actually uses source material and does not distort findings
- [ ] **Phase 29: Cross-Stage Consistency** - Automated contradiction detection across pipeline stages before approve gates

## Phase Details

### Phase 25: Audit Trail Infrastructure
**Goal**: Every generation stage leaves a traceable record of what it read, what it used, and what it assumed -- so any claim in the final curriculum can be traced back to its source
**Depends on**: Nothing (v5.0 foundation -- other phases write to this infrastructure)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03, AUDIT-04, AUDIT-05
**Success Criteria** (what must be TRUE):
  1. After running any generation stage, the user can see which source material files were read before that stage generated output
  2. After running any generation stage, the user can see which specific claims or findings from source material were incorporated into the output
  3. Content generated from the agent's own knowledge (not from source material) is visibly marked as "agent-generated" in the trail
  4. When the SME confirms something at a checkpoint, the confirmation is recorded with a timestamp and what was confirmed
  5. An SME who did not participate in the build can read the audit trail and trace any curriculum claim back to its evidence source
**Plans**: 2 plans

Plans:
- [x] 25-01-PLAN.md -- Trail format reference document and intake initialization -- completed 2026-03-29
- [x] 25-02-PLAN.md -- Trail-writing across all generation stages, gate confirmations, and revision entries -- completed 2026-03-29

### Phase 26: Canonical Outcome Registry
**Goal**: Learning outcomes and key intake decisions live in one authoritative place that all downstream stages reference -- preventing the drift that happens when stages paraphrase or reinterpret outcomes independently
**Depends on**: Phase 25 (audit trail records registry interactions)
**Requirements**: CANON-01, CANON-02, CANON-03, CANON-04
**Success Criteria** (what must be TRUE):
  1. After Stage 2 (outcomes) completes, all learning outcomes are registered in a canonical outcomes registry
  2. Every module spec, session, assessment, and marketing claim that references a learning outcome uses the exact canonical wording -- not a paraphrased version
  3. When a downstream stage needs to change an outcome, the canonical registry is updated first and the change propagates from there -- not from an individual file edit
  4. Key intake decisions (audience, duration, skill type, transfer context) are stored in the canonical registry and available to all stages
**Plans**: 2 plans

Plans:
- [x] 26-01-PLAN.md -- Registry as canonical data source for learner profile and outcome wording across all downstream stages -- completed 2026-03-29
- [x] 26-02-PLAN.md -- Stale upstream detection and change propagation via /curriculum:revise -- completed 2026-03-29

### Phase 27: Domain Research
**Goal**: From-scratch curriculum builds are grounded in verified evidence before generation begins -- the SME's hypotheses are tested against real sources and confirmed before the pipeline uses them
**Depends on**: Phase 25 (research findings recorded in audit trail), Phase 26 (verified findings inform canonical outcomes)
**Requirements**: RSRCH-01, RSRCH-02, RSRCH-03, RSRCH-04, RSRCH-05, RSRCH-06
**Success Criteria** (what must be TRUE):
  1. When intake completes with no source materials, the user is asked for hypotheses about their domain that should shape how the curriculum is taught
  2. Each hypothesis is researched against evidence and tagged with a clear label (SUPPORTED, COMPLICATED, CONTRADICTED, GAP) -- the user can see what the evidence says
  3. The user reviews all findings at a checkpoint before generation proceeds and can confirm, adjust, or add context
  4. Verified findings are saved as a grounding document in workspace/source-material/ that all downstream stages can reference
  5. When source materials already exist at intake, the domain research step is skipped -- existing materials serve as the grounding base
**Plans**: 2 plans

Plans:
- [x] 27-01-PLAN.md -- Domain research SKILL.md command with hypothesis gathering, web research, evidence tagging, SME review, and grounding document output
- [x] 27-02-PLAN.md -- Pipeline integration: intake chaining to research for from-scratch builds, resume routing, skip logic for existing source materials

### Phase 28: Alignment Verification
**Goal**: Generated content is checked against source material after every stage -- so the pipeline cannot silently ignore, distort, or strip nuance from the evidence it was given
**Depends on**: Phase 25 (alignment issues logged to audit trail), Phase 26 (canonical outcomes are the reference for alignment), Phase 27 (domain research produces grounding documents that alignment checks against)
**Requirements**: ALIGN-01, ALIGN-02, ALIGN-03, ALIGN-04, ALIGN-05, ALIGN-06
**Success Criteria** (what must be TRUE):
  1. After each generation stage (outcomes through marketing), the user can see a report showing which source material findings were referenced in the output
  2. Content generated without source material grounding is flagged with a visible "assumed" marker -- the user knows what came from evidence and what did not
  3. When source material says "in some contexts" but the output says "always," the qualifier stripping is detected and reported
  4. When source material gives a range but the output narrows it to a single value, the range narrowing is detected and reported
  5. Alignment issues block draft promotion to final -- the same hard-gate pattern as other quality checks
**Plans**: 2 plans

Plans:
- [ ] 28-01-PLAN.md -- Alignment check reference document and audit trail format update for alignment results
- [ ] 28-02-PLAN.md -- Alignment checks wired into all 7 generation stage commands with marketing traceability variant

### Phase 29: Cross-Stage Consistency
**Goal**: Automated checks catch contradictions between pipeline stages before the user approves -- so sessions match module specs, marketing matches outcomes, and nothing slips through the cracks
**Depends on**: Phase 26 (canonical registry is the reference standard for consistency), Phase 25 (consistency results logged to audit trail)
**Requirements**: XSTAGE-01, XSTAGE-02, XSTAGE-03, XSTAGE-04
**Success Criteria** (what must be TRUE):
  1. After sessions are generated, the user can see a check confirming that session content aligns with module specs (outcomes referenced, time allocations correct, prerequisite chains honored)
  2. After marketing is generated, the user can see a check confirming that every marketing claim traces to a specific outcome or assessment
  3. Cross-stage consistency checks run automatically before the approve gate -- the user does not have to remember to run them
  4. When a contradiction is found, the user sees both conflicting values shown side by side with file references -- not just a generic "inconsistency detected" message
**Plans**: TBD

Plans:
- [ ] 29-01: TBD
- [ ] 29-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 25 -> 26 -> 27 -> 28 -> 29

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1-7 (archived) | v1.0 | 19/19 | Complete | 2026-03-22 |
| 8-10 (archived) | v2.0 | 10/10 | Complete | 2026-03-24 |
| 11-16 (archived) | v3.0 | 15/15 | Complete | 2026-03-25 |
| 17-24 (archived) | v4.0 | 20/20 | Complete | 2026-03-28 |
| 25. Audit Trail Infrastructure | v5.0 | 2/2 | Complete | 2026-03-29 |
| 26. Canonical Outcome Registry | v5.0 | 2/2 | Complete | 2026-03-29 |
| 27. Domain Research | v5.0 | 2/2 | Complete | 2026-03-29 |
| 28. Alignment Verification | 1/2 | In Progress|  | - |
| 29. Cross-Stage Consistency | v5.0 | 0/0 | Not started | - |
