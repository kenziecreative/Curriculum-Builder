# Phase 25: Audit Trail Infrastructure - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Every generation stage leaves a traceable record of what it read, what it used, and what it assumed — so any claim in the final curriculum can be traced back to its source. This is infrastructure that downstream phases (26-29) write to.

</domain>

<decisions>
## Implementation Decisions

### Trail Storage Format
- Single `audit-trail.md` file per project, living in `workspace/{project}/`
- Each stage appends its section after draft generation, before draft-then-audit checks run
- Intake initializes the trail file with a header listing source materials loaded and key intake decisions
- On re-generation, the stage's trail section is replaced (not appended) — trail reflects current state, not full history
- Trail is an internal build artifact — not included in the HTML delivery package

### Grounding Attribution
- Per-section granularity: each major output section (e.g., "Module 2 outcomes", "Session 3 pre-work") lists which source files and which specific claims it drew from
- Quoted claims from source material appear under "Grounded in" with file reference and the relevant quote
- Content generated from the agent's own knowledge listed under "Agent-generated" as a bullet list of what was created
- Sources that were loaded but not referenced by a stage listed under "Read but not referenced" — surfaces ignored evidence for Phase 28 alignment verification
- When no source materials exist (from-scratch build): header note "No source materials available — all content is agent-generated" with simplified format listing what was generated

### SME Confirmation Capture
- SME confirmations recorded in the audit trail under the relevant stage's section
- All three existing human gates capture confirmations: intake, assessment design, and final validation
- Modifications recorded with before/after values and SME's reason if stated; no reason forced if not given
- `/curriculum:revise` (post-delivery) also appends revision entries to the trail — documenting what changed, the feedback that triggered it, and affected stages

### Claude's Discretion
- Exact markdown formatting and heading levels within trail sections
- How the summary section's grounding percentage is calculated (rough estimate is fine)
- Whether to use horizontal rules or spacing between stage sections
- Internal data structures used to track attribution during generation

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `curriculum-registry.json` schema: established pattern for cross-stage data storage — trail follows the same "single source" principle
- Draft-then-audit pipeline in 6 stage commands: trail write slots naturally between draft generation and audit checks
- Source material loading block (identical across 7 commands): "check workspace/source-material/ for any files" — this is the entry point where trail recording begins

### Established Patterns
- Registry-wins-over-files: trail should follow the same authoritative-source principle
- Stage commands silently write to registry on completion — trail writes follow the same silent-append pattern
- Vocabulary quarantine (v4.0): team decided trail terms ("agent-generated", "grounded in") are acceptable as-is — no translation needed

### Integration Points
- Every generation stage command (outcomes, assessments, modules, sessions, metaskills, transfer, marketing) needs trail-writing logic added
- `intake/SKILL.md` needs trail initialization logic
- `approve/SKILL.md` (final validation gate) needs checkpoint confirmation capture
- `revise/SKILL.md` needs revision trail entry appended
- Assessment design approval gate needs checkpoint confirmation capture

</code_context>

<specifics>
## Specific Ideas

- Trail follows pipeline order chronologically — an SME reads top-to-bottom and sees the full build story
- Summary block at top for quick scanning: stages completed, source materials used, grounding percentage, SME checkpoints count, modifications count, revisions count
- The preview mockups shown during discussion represent the intended look and feel — chronological sections with consistent internal structure per stage

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 25-audit-trail-infrastructure*
*Context gathered: 2026-03-29*
