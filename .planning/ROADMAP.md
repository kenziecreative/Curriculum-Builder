# Roadmap: KNZ Curriculum Builder

## Milestones

- ✅ **v1.0 — MVP** — Phases 1-7 (shipped 2026-03-22) — [archive](milestones/v1.0-ROADMAP.md)
- ✅ **v2.0 — Existing Curriculum Support** — Phases 8-10 (shipped 2026-03-24) — [archive](milestones/v2.0-ROADMAP.md)
- ✅ **v3.0 — Output Quality** — Phases 11-16 (shipped 2026-03-25) — [archive](milestones/v3.0-ROADMAP.md)
- 🚧 **v4.0 — SME-Ready** — Phases 17-22 (in progress)

---

## Phases

<details>
<summary>✅ v1.0 — MVP (Phases 1-7) — SHIPPED 2026-03-22</summary>

- [x] Phase 1: Schema and Foundation — completed 2026-03-15
- [x] Phase 2: Core Plugin Infrastructure — completed 2026-03-16
- [x] Phase 3: Backward Design Core — completed 2026-03-18
- [x] Phase 4: Dashboard MVP — completed 2026-03-19
- [x] Phase 5: Module and Session Generation — completed 2026-03-20
- [x] Phase 6: Validation Layer — completed 2026-03-21
- [x] Phase 7: Full Pipeline Completion — completed 2026-03-22

See [v1.0 archive](milestones/v1.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>✅ v2.0 — Existing Curriculum Support (Phases 8-10) — SHIPPED 2026-03-24</summary>

- [x] Phase 8: Audit Mode Intake (3/3 plans) — completed 2026-03-22
- [x] Phase 8.1: Plugin Namespace Migration (2/2 plans) — completed 2026-03-23
- [x] Phase 9: Stage Pre-population (3/3 plans) — completed 2026-03-24
- [x] Phase 10: Evaluation Mode (2/2 plans) — completed 2026-03-24

See [v2.0 archive](milestones/v2.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>✅ v3.0 — Output Quality (Phases 11-16) — SHIPPED 2026-03-25</summary>

- [x] Phase 11: Infrastructure (1/1 plans) — completed 2026-03-25
- [x] Phase 12: Voice System (2/2 plans) — completed 2026-03-25
- [x] Phase 13: Command Retrofit (5/5 plans) — completed 2026-03-25
- [x] Phase 14: Audit Mode Enhancement (3/3 plans) — completed 2026-03-25
- [x] Phase 15: Delivery Layer (3/3 plans) — completed 2026-03-25
- [x] Phase 16: Delivery Gap Closure (1/1 plan) — completed 2026-03-25

See [v3.0 archive](milestones/v3.0-ROADMAP.md) for full phase details.

</details>

---

### 🚧 v4.0 — SME-Ready (Phases 17-22)

**Milestone Goal:** Make the tool invisible to SMEs — every interaction feels like working with a sharp colleague, not being processed through an academic system.

- [x] **Phase 17: Vocabulary & Plain Language** - Remove all remaining ID jargon from every command and output visible to users (completed 2026-03-27)
- [x] **Phase 18: Stage Guidance** - Give SMEs plain-language guidance at every review gate so they can evaluate with confidence (completed 2026-03-27)
- [x] **Phase 19: Pipeline Infrastructure** - Canonical registry, draft pipeline, context breaks, and sub-stage tracking to make generation reliable (completed 2026-03-27)
- [ ] **Phase 20: Integrity & Verification** - Curriculum integrity agent, cross-stage check, goal-backward verification, and anti-softening enforcement
- [ ] **Phase 21: Deviation & Validation Coverage** - Structured deviation handling and full validation coverage through stage 8
- [ ] **Phase 22: New Capabilities** - Revise command for post-delivery feedback loops and research input support for audit mode

---

## Phase Details

### Phase 17: Vocabulary & Plain Language
**Goal**: Every word visible to a user — in commands, reports, and outputs — is language an SME would use naturally, with no ID or technical vocabulary leaking through
**Depends on**: Phase 16 (v3.0 complete)
**Requirements**: VOCAB-01, VOCAB-02, VOCAB-03, VOCAB-04, VOCAB-05
**Success Criteria** (what must be TRUE):
  1. An SME can read any command output — including validation reports and audit summaries — without encountering terms like bloom_level, TMA arc, DAG, kirkpatrick, schema, or formative/summative as visible labels
  2. approve.md final gate summary uses the same plain-language vocabulary as other commands — including a Never-say list that blocks insider terms from the highest-stakes user-facing output
  3. parent_module_id never appears as a visible label in session files; "Primary metaskill" reads as "Core thinking skill"; marketing traceability section uses plain descriptions
  4. Writing for Clarity instruction is present in every command that generates user-facing content — no command escapes the enforcement mechanism
  5. Running the full pipeline produces zero vocabulary violations in any file a user opens directly
**Plans**: 3 plans
Plans:
- [x] 17-01-PLAN.md — Canonical vocabulary source of truth + Writing for Clarity standardization
- [x] 17-02-PLAN.md — Template jargon cleanup + approve.md three-layer enforcement
- [x] 17-03-PLAN.md — Agent vocabulary guardrails + post-write scan canonicalization

### Phase 18: Stage Guidance
**Goal**: SMEs at every review gate know exactly what to look for, what questions to ask themselves, and how to evaluate what they're reading — without needing instructional design training
**Depends on**: Phase 17
**Requirements**: GUIDE-01, GUIDE-02, GUIDE-03, DEVL-03
**Success Criteria** (what must be TRUE):
  1. Every review gate (intake, assessment, final approval) shows plain-language evaluation guidance — not instructions for the tool, but questions the user asks themselves before deciding
  2. Constraint enforcement results read as plain explanations of what was checked and why it matters — an SME understands "Every learning objective has at least one way to prove the learner can actually do it" without knowing what Bloom alignment means
  3. Thinking-level progression is translated into concrete questions an SME can evaluate: "Does this feel like the right ramp for how you'd actually train someone on this skill?" rather than any reference to cognitive taxonomy
  4. Stage numbering is consistent — users reading pipeline output and workspace directories see the same numbering system with no unexplained mismatch
**Plans**: 4 plans
Plans:
- [x] 18-01-PLAN.md — Self-check questions at review gates + natural thinking-level language
- [x] 18-02-PLAN.md — Constraint results what+why translation
- [x] 18-03-PLAN.md — Stage numbering normalization (01-09 for new projects + auto-detection)
- [x] 18-04-PLAN.md — Gap closure: intake review gate self-check questions

### Phase 19: Pipeline Infrastructure
**Goal**: Generation is reliable — data stays consistent across stages, content is audited before it reaches deliverables, context windows are managed so nothing generates in a degraded state
**Depends on**: Phase 17
**Requirements**: PIPE-01, PIPE-02, PIPE-03, PIPE-04, PIPE-05
**Success Criteria** (what must be TRUE):
  1. curriculum-registry.json exists and downstream stages read outcome wording, assessment criteria, and learner profile data from the registry rather than re-reading earlier stage files — cross-stage drift is structurally impossible
  2. Stages 4-6 write to a draft location first; content only reaches the deliverable directory after a separate audit step passes — no unreviewed content ships directly
  3. Each stage command verifies its inputs are valid before generating — a missing field or broken reference stops generation with a specific message, not a malformed output
  4. Auto-chained stages (sessions through marketing) each start with a fresh context window rather than inheriting a saturated context from previous stages
  5. STATE.md tracks module-level progress within session generation — a context clear mid-stage does not lose completed module work
**Plans**: 3 plans
Plans:
- [x] 19-01-PLAN.md — Canonical registry schema + registry write hooks for all stage commands
- [x] 19-02-PLAN.md — Pre-execution input validation + draft-then-audit pipeline for stages 4-6
- [x] 19-03-PLAN.md — Context breaks in auto-chain + module-level sub-stage tracking

### Phase 20: Integrity & Verification
**Goal**: The tool catches its own failures — vocabulary violations, outcome drift, broken links, and generic content are flagged before the user sees the output, not after
**Depends on**: Phase 19
**Requirements**: INTG-01, INTG-02, INTG-03, INTG-04
**Success Criteria** (what must be TRUE):
  1. A curriculum integrity agent runs after every content generation stage and blocks completion when it finds vocabulary violations, outcome drift, generic content, or broken cross-stage links — failures are named specifically, not summarized vaguely
  2. Before the final approval gate, a cross-stage integration check traces every outcome ID, assessment link, and module reference across all 8 stages — broken links and orphaned references are caught before the package ships
  3. Session generation verifies that each session actually achieves the module goal it claims — "exists/substantive/wired" check, not just "file was created"
  4. The integrity agent, validator, and any verification command explicitly refuse to bypass failures, downgrade severity, or rationalize away problems — soft-passing a check it should fail is treated as a failure mode, not a judgment call
**Plans**: 3 plans
Plans:
- [ ] 20-01-PLAN.md — Anti-softening enforcement (Verification Integrity sections in all 7 checking files)
- [ ] 20-02-PLAN.md — Expanded integrity checks + goal-backward session verification in draft-audit
- [ ] 20-03-PLAN.md — Cross-stage integration check at final approval gate

### Phase 21: Deviation & Validation Coverage
**Goal**: The tool handles problems cleanly — small fixable issues are resolved automatically, real problems escalate to the user, and validation covers the full pipeline not just the first half
**Depends on**: Phase 20
**Requirements**: DEVL-01, DEVL-02
**Success Criteria** (what must be TRUE):
  1. Generators have a defined, documented list of what they can auto-fix (vocabulary substitution, format correction) versus what requires user escalation (content changes, missing sections, ambiguous intent) — no silent auto-fix of content decisions
  2. Auto-fix attempts stop at 3 and escalate with a specific description of the problem — the user is never left with a broken output that the tool tried to hide
  3. Validation checks cover stages 6-8 (metaskills, transfer, marketing) — a curriculum that passes validation has actually been checked end-to-end, not just through the generation midpoint
**Plans**: TBD
Plans:
- TBD

### Phase 22: New Capabilities
**Goal**: SMEs can act on what they learned from delivery — bringing a curriculum back for refinement — and structured research feeds directly into intake without manual repackaging
**Depends on**: Phase 21
**Requirements**: FEAT-01, FEAT-02
**Success Criteria** (what must be TRUE):
  1. `/curriculum:revise` exists and lets a user re-enter the pipeline at any stage with post-delivery feedback — changes propagate downstream using existing traceability links, not a full regeneration
  2. Audit mode intake accepts structured research outputs (skill decompositions, misconception inventories, practitioner workflow maps) as recognized source material — the user does not need to reformat research before bringing it into the tool
  3. Revise command is clearly distinct from in-process flagging — it is explicitly for after the curriculum has been delivered and lived with, not mid-build corrections
**Plans**: TBD
Plans:
- TBD

---

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1-7 (archived) | v1.0 | 19/19 | Complete | 2026-03-22 |
| 8. Audit Mode Intake | v2.0 | 3/3 | Complete | 2026-03-22 |
| 8.1. Plugin Namespace Migration | v2.0 | 2/2 | Complete | 2026-03-23 |
| 9. Stage Pre-population | v2.0 | 3/3 | Complete | 2026-03-24 |
| 10. Evaluation Mode | v2.0 | 2/2 | Complete | 2026-03-24 |
| 11. Infrastructure | v3.0 | 1/1 | Complete | 2026-03-25 |
| 12. Voice System | v3.0 | 2/2 | Complete | 2026-03-25 |
| 13. Command Retrofit | v3.0 | 5/5 | Complete | 2026-03-25 |
| 14. Audit Mode Enhancement | v3.0 | 3/3 | Complete | 2026-03-25 |
| 15. Delivery Layer | v3.0 | 3/3 | Complete | 2026-03-25 |
| 16. Delivery Gap Closure | v3.0 | 1/1 | Complete | 2026-03-25 |
| 17. Vocabulary & Plain Language | v4.0 | 3/3 | Complete | 2026-03-27 |
| 18. Stage Guidance | v4.0 | 4/4 | Complete | 2026-03-27 |
| 19. Pipeline Infrastructure | v4.0 | 3/3 | Complete | 2026-03-27 |
| 20. Integrity & Verification | v4.0 | 0/3 | Not started | - |
| 21. Deviation & Validation Coverage | v4.0 | 0/TBD | Not started | - |
| 22. New Capabilities | v4.0 | 0/TBD | Not started | - |
