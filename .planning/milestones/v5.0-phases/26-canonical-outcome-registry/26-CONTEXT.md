# Phase 26: Canonical Outcome Registry - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Learning outcomes and key intake decisions live in one authoritative place that all downstream stages reference — preventing the drift that happens when stages paraphrase or reinterpret outcomes independently. The registry structure already exists (v4.0); this phase makes it truly canonical by adding enforcement, change propagation, and intake decision canonicalization.

</domain>

<decisions>
## Implementation Decisions

### Enforcement Mechanism
- Enforcement happens during generation, not after — stages pull exact wording from registry and inject it into output, so drift can't happen because the source wording is never retyped
- Current output format preserved: outcome ID in HTML comment (`<!-- internal: outcome_id=PO-1 -->`), full statement in prose — the change is that stages READ the statement from registry before writing it
- Marketing and other stages that derive emotional/conversion copy from outcomes maintain traceability via outcome ID linkage but are NOT required to use verbatim wording — canonical enforcement must not kill copy that converts
- Audit trail records derivations: when marketing derives emotional wording from a canonical outcome, the trail entry shows which outcome it derived from

### Change Propagation
- Downstream files flagged as stale via registry timestamps (existing `last_updated` per section) — no silent auto-rewrite
- `/curriculum:revise` handles outcome changes both mid-pipeline and post-delivery — one command, two contexts. Extend it to flag downstream stages as stale when used before delivery
- Stale detection happens when a stage command runs and finds upstream registry data is newer than its own last_updated

### Registry Scope — Intake Decisions
- Downstream stages must read learner profile data (audience, duration, skill type, transfer context, etc.) from the registry's `learner_profile` section — not from `project-brief.md` directly
- `project-brief.md` remains as the human-readable narrative but is not an input source for generation stages — registry is the only structured data source
- No new fields added to learner_profile — existing fields (target_audience, expertise_level, self_direction_level, skill_type, cultural_orientation, transfer_context, contact_hours, modality, success_criteria) are sufficient
- Program name/description canonicalization deferred — low-risk compared to outcome drift

### Outcome Reference Format
- Keep current pattern: outcome ID in HTML comment, full statement in prose
- No Bloom's level in inline references — registry has it, downstream stages that need it (Phase 29) read from registry
- No structured lookup markers / template variables — output files remain complete readable markdown

### Claude's Discretion
- Strictness level per stage: how rigidly each stage must match canonical wording vs. being allowed to contextualize
- Enforcement tiering: whether structural stages (outcomes, assessments, modules) get stricter enforcement than content stages (sessions, metaskills, transfer, marketing)
- Hierarchy validation: whether to verify parent-child outcome links (PO → MO → SO) at registry write time
- Stale warning behavior: whether to block or warn-and-continue when stale upstream data is detected, per stage

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `curriculum-registry.json` with full schema: `outcome_wording`, `learner_profile`, `assessment_criteria`, `time_allocations` sections already exist
- `curriculum-registry-schema.md`: complete JSON structure reference
- `/curriculum:revise` command: already updates registry first and propagates changes — needs extension for mid-pipeline use
- `<!-- internal: outcome_id=... -->` comment pattern: established across all stage outputs
- Per-section `last_updated` timestamps: already in registry, ready for stale detection

### Established Patterns
- Registry-wins-over-files principle (v4.0): registry is authoritative, stage file edits don't propagate
- Silent registry writes: stages write to registry on completion without user-facing messages
- Draft-then-audit pipeline: enforcement logic slots naturally into the draft generation phase
- Audit trail writes (Phase 25): trail records registry interactions — derivation tracking extends this

### Integration Points
- 15 stage commands reference `project-brief.md` — need to switch to registry for structured data
- 12 stage commands reference `curriculum-registry` — already read it for validation, need to also use it as the source for outcome wording during generation
- `outcomes/SKILL.md` already writes `outcome_wording` to registry — this is the canonical registration point (CANON-01 already satisfied)
- `intake/SKILL.md` already writes `learner_profile` to registry — canonical intake data is already there
- `/curriculum:revise` needs stale-flagging logic for mid-pipeline use

</code_context>

<specifics>
## Specific Ideas

- Marketing shifts from facts to emotion — canonical enforcement must preserve marketing's ability to write copy that converts while maintaining traceability back to the evidence chain
- The enforcement pattern is: "read from registry, write to file" not "write to file, check against registry" — prevention over detection
- Phase 28 (Alignment Verification) will use the derivation trail entries to verify marketing claims trace back to canonical outcomes

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 26-canonical-outcome-registry*
*Context gathered: 2026-03-29*
