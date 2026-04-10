# Phase 29: Cross-Stage Consistency - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Automated contradiction detection across pipeline stages before approve gates — so sessions match module specs, marketing matches outcomes, and nothing slips through the cracks. This phase consolidates the existing cross-stage integration check from approve/SKILL.md into a shared reference document and extends it with new per-stage checks that run during each stage's draft audit.

</domain>

<decisions>
## Implementation Decisions

### Check Timing & Integration
- Consistency checks run after each stage completes — as part of that stage's draft audit, alongside existing checks (vocabulary, registry, alignment)
- Consistency failures block draft promotion — same 3-attempt retry pattern as alignment checks. Not auto-fixable; stage must re-generate
- Final gate also runs a full cross-stage sweep that catches anything per-stage checks couldn't see (e.g., content that drifted after a downstream stage was regenerated)
- Consolidate: move approve gate's existing integration check logic into a shared reference doc (consistency-check-reference.md). Both per-stage checks and the final gate sweep reference the same document. Single source of truth

### Session-to-Module Verification (XSTAGE-01)
- Time math: verify total session hours per module match the module spec's allocated hours. On mismatch, show both values and two fix paths — "Run `/curriculum:modules` to update the module spec" or "Run `/curriculum:sessions` to regenerate sessions within the budget." SME picks the direction
- Prerequisite ordering: flag when a session references outcomes from a module that comes later in the prerequisite chain. Ordering violations only — not implicit knowledge gap detection
- Outcome ID linkage already covered by existing approve gate checks (carried forward into the consolidated reference)

### Marketing Claim Tracing (XSTAGE-02)
- Every marketing claim must link to an outcome ID (Phase 28 enforces this). Phase 29 then verifies that the linked outcome has at least one assessment — the promise-to-proof chain: claim → outcome ID → assessment
- Strictness is outcome ID linkage, not semantic matching. Marketing can use emotional/aspirational language; the check verifies the structural chain, not wording similarity
- If a marketing claim links to an outcome that has no assessment, it blocks — unverifiable claim. "Marketing promises '{claim}' via outcome {ID}, but no assessment measures that outcome"
- Marketing consistency check runs as part of marketing's draft audit (per-stage timing), not just at the final gate

### Contradiction Reporting (XSTAGE-04)
- Table format for side-by-side contradictions: | Source | Says | File | — clear, scannable, works for all contradiction types
- Reports grouped by contradiction type (time mismatches, prerequisite violations, marketing gaps, etc.) — makes batch-fixing easier
- Consistency results recorded in the stage's audit trail section (pass/fail + details), same pattern as alignment checks. Completes the traceability chain

### Reference Document Structure
- Per-stage table in consistency-check-reference.md: "When sessions complete, check X, Y, Z against modules." "When marketing completes, check A, B against outcomes." Each stage command loads only its relevant checks
- Follows the same pattern as alignment-check-reference.md

### Claude's Discretion
- Exact check ordering within each stage's draft audit (consistency before or after alignment)
- How to structure the consistency check function within each stage command
- Trail section formatting details for consistency results
- How the final gate sweep is structured relative to the per-stage checks (full re-run vs. delta check)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `approve/SKILL.md` Cross-Stage Integration Check: existing logic for outcome ID tracing, assessment links, module references — to be consolidated into the shared reference doc
- `alignment-check-reference.md`: established pattern for a shared check reference document loaded by multiple stage commands
- `audit-trail-format.md`: defines trail section structure — consistency results follow the same subsection pattern as alignment results
- `curriculum-registry.json`: canonical source for outcome IDs, assessment criteria, time allocations, module structure — consistency checks read from this
- Draft-then-audit pipeline: 3-attempt retry with cumulative constraints — consistency checks slot into this pattern

### Established Patterns
- Per-stage draft audit with numbered checks (vocabulary, registry, schema, alignment) — consistency becomes the next check in the sequence
- Blocking vs warning classification with plain-language descriptions (approve gate pattern)
- Auto-fix boundary: vocabulary, registry defaults, and outcome drift are auto-fixable; alignment and consistency are not — re-generation required
- Silent trail writes after successful promotion

### Integration Points
- 7 generation stage commands need consistency check logic added (same integration pattern as Phase 28 alignment)
- `approve/SKILL.md` Final Validation gate: replace inline integration check with reference to consolidated consistency-check-reference.md
- `audit-trail-format.md`: may need a new subsection for consistency check results
- Stage re-generation prompts: consistency issues feed into the retry instruction format (same as alignment)

</code_context>

<specifics>
## Specific Ideas

- The consolidation of approve gate's existing checks into a reference doc means Phase 29 is partly a refactor (move existing logic) and partly new work (add time math, prerequisites, marketing-to-assessment chain)
- The per-stage table approach in the reference doc mirrors how the alignment check reference doc is structured — stage commands load it and find their specific checks
- Time mismatch resolution gives the SME two actionable paths (adjust module spec OR regenerate sessions) rather than prescribing a direction — the tool handles the scaffold, the human handles the soul

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 29-cross-stage-consistency*
*Context gathered: 2026-03-29*
