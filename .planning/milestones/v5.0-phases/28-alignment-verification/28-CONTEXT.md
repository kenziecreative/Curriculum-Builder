# Phase 28: Alignment Verification - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Post-generation checks that verify output actually uses source material faithfully and does not distort findings. Alignment verification integrates into the existing draft-then-audit pipeline as additional checks that run alongside vocabulary, registry, and other existing checks before draft promotion.

</domain>

<decisions>
## Implementation Decisions

### Check Timing & Integration
- Alignment verification is a new check in each stage's existing draft-then-audit pipeline — runs alongside other checks before promotion, same 3-attempt retry pattern
- Runs for every generation stage (outcomes through marketing) — all 7 stages get alignment checks
- Grounding doc counts as source material — alignment checks run even for from-scratch builds with only domain research output
- Alignment issues are never auto-fixable — if source material was ignored or distorted, the stage must re-generate. Consistent with the auto-fix boundary: only vocabulary, registry defaults, and outcome drift are auto-fixable

### Distortion Detection
- Flag hedging removal: when hedging language (may, might, in some cases, research suggests, tends to) is removed or strengthened to certainty language (always, never, studies prove, all learners)
- Flag all range narrowing: any time a range becomes a single value (source says "3-6 months", output says "4 months"), regardless of whether the chosen value is within range — SME decides whether to keep specific value or preserve range
- Ignored source material is a warning, not a block — surface "Read but Not Referenced" items in the alignment report but don't fail the check. Not every source file is relevant to every stage
- Marketing gets traceability checks (every claim links to an outcome ID) but NOT verbatim alignment checks — marketing's job is transformation. Distortion checks still apply: marketing can't claim outcomes the evidence doesn't support

### Report & Resolution
- Side-by-side comparison format: "Source says: [quote]" vs "Output says: [text]" with issue type (qualifier stripped, range narrowed, unsupported claim). Plain language, no jargon
- Re-generation includes targeted feedback: specific issues passed to the agent ("Source says X, your output said Y — preserve the qualifier"). Same cumulative constraint pattern as existing retries
- Escalation uses the same pattern as other check failures (plain language, draft in `_drafts/`, next steps) with the specific alignment issues that persisted across all 3 attempts so the SME knows exactly what to fix
- Alignment check results (pass or fail) recorded in the stage's audit trail section — completes the traceability chain

### Assumed Content Marking
- Assumed content flagged in audit trail only — no markers in curriculum output files. Alignment check surfaces this during draft audit; SME sees it in the check report, not the final document
- Alignment check verifies trail accuracy: confirms "Grounded In" claims are real (source actually says what trail claims) and "Agent-Generated" items genuinely don't appear in source material. Catches both over-claiming grounding and hiding assumptions
- Over-claiming grounding is the same severity as distortion — both block promotion. Falsely claiming evidence backing is an integrity issue
- Structural content (session activities, discussion prompts, time blocks) is expected to be agent-generated — only flag agent-generated content in areas that SHOULD be grounded: outcomes, key concepts, assessment criteria, marketing claims

### Claude's Discretion
- Exact matching strategy for comparing source quotes to output text
- How to structure the alignment check function within each stage command
- Trail section formatting details for alignment results

</decisions>

<specifics>
## Specific Ideas

- The existing "Read but Not Referenced" trail section (Phase 25) was designed to feed directly into alignment verification — use it as input
- Phase 26's outcome registry ID linkage is the mechanism for marketing traceability — alignment checks verify claims map to real outcome IDs
- The grounding doc's evidence labels (SUPPORTED, COMPLICATED, GAP) from Phase 27 can inform which findings matter most — but all labels warrant alignment checking

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `audit-trail-format.md` reference: Defines "Grounded In", "Agent-Generated", "Read but Not Referenced" sections — alignment verification reads these
- Draft-then-audit pipeline pattern: Already implemented in sessions, metaskills, transfer, marketing stages — alignment checks slot in alongside existing checks
- Curriculum voice reference and schemas: Define what output should look like — alignment checks verify source fidelity within these constraints

### Established Patterns
- `_drafts/` staging with 3-attempt retry and escalation — alignment follows this exactly
- Cumulative constraints on retry: each failed attempt adds specific instructions for the next attempt
- Auto-fix boundary: vocabulary, registry defaults, and outcome drift are auto-fixable; everything else requires re-generation. Alignment is in the "everything else" category
- Stage commands load source material via existing loading blocks — alignment check accesses the same loaded material

### Integration Points
- Each stage's SKILL.md draft audit section: alignment checks are added as new numbered checks alongside existing checks
- `audit-trail-format.md`: May need a new subsection for alignment check results (pass/fail + details)
- Stage re-generation prompts: alignment issues feed into the retry instruction format

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 28-alignment-verification*
*Context gathered: 2026-03-29*
