# Phase 27: Domain Research - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

A new pipeline stage between intake and outcomes that grounds from-scratch builds in verified evidence. When a from-scratch intake completes with no source materials, the SME provides hypotheses about their domain. The agent researches each hypothesis against evidence, tags findings, and presents them for SME review. Verified findings are saved as a grounding document that all downstream stages reference. When source materials already exist at intake, this stage is skipped entirely.

</domain>

<decisions>
## Implementation Decisions

### Hypothesis Gathering
- Dedicated question round after intake completes (not woven into intake, not a separate command) — a focused follow-up that triggers only when no source materials are present
- Both teaching-relevant beliefs ("beginners fail because they skip X") and broader domain claims ("the industry is moving toward Y") are valid hypothesis types — the agent should elicit both
- Soft target of 3-5 hypotheses with guardrails: push for at least 3, guide toward consolidation above 7, but don't hard-cap if the domain genuinely needs 6-7
- Plain language prompting — no "hypothesis" word. Frame as: "What do you believe about [domain] that should shape how people learn it? What do most people get wrong?"
- Hypotheses must be captured as testable claims, not opinions

### Research & Evidence Tagging
- Web search (Tavily MCP) per hypothesis — 2-4 sources per hypothesis, practical depth not literature review
- Evidence labels (SUPPORTED, COMPLICATED, CONTRADICTED, GAP) applied during research as evidence is found — not after all research is complete (per RSRCH-03)
- When a hypothesis is tagged CONTRADICTED: present the evidence to the SME and let them decide — "Here's what I found — the evidence suggests otherwise. Does this change your thinking, or do you have context the research missed?"

### SME Review Checkpoint
- Per-hypothesis summary presentation: each hypothesis shown with what the SME said, what was found, evidence label, key sources
- Three SME actions per finding: Confirm (accept as-is), Adjust (modify based on expertise), Add context (provide info the research missed)
- After reviewing all initial findings, ask if research sparked new questions — if yes, do a lighter research pass (1-2 sources) on new hypotheses
- Hard gate after review: SME must explicitly approve findings before generation proceeds — same pattern as intake and assessment approval gates
- Confirmation recorded in audit trail per Phase 25 infrastructure

### Grounding Document Output
- Saved in `workspace/{project}/source-material/` so downstream stages automatically pick it up via existing source material loading
- File organization is Claude's discretion — consolidated or per-hypothesis, whatever serves the content best. Don't force a single filename convention.
- Downstream stages treat verified findings as constraints: SUPPORTED/COMPLICATED findings are evidence to incorporate, CONTRADICTED findings (SME-confirmed) become common misconceptions to address, GAP findings are noted gaps
- Grounding document informs but does not auto-update the canonical registry — if research contradicted an intake decision, the SME already resolved that at the review checkpoint
- Standard audit trail section per audit-trail-format.md: what was read (SME hypotheses), what was used (verified findings), what was assumed (agent-generated summaries), SME confirmation

### Claude's Discretion
- Grounding document file organization (one consolidated file vs. per-hypothesis files)
- Exact question wording for hypothesis elicitation (consistent with intake voice)
- How to handle hypotheses that are so broadly accepted they don't need research (obvious truths)
- Internal data structures for tracking research state across hypotheses
- Whether to present findings in order researched or grouped by label type

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `intake/SKILL.md`: Already routes "starting from scratch" vs "existing materials" — hypothesis gathering inserts after the from-scratch path completes
- Source material loading block (identical across 7 stage commands): checks `workspace/{project}/source-material/` for files — grounding doc is picked up automatically
- `audit-trail-format.md`: Template for trail entries — domain research follows the same section format
- `curriculum-registry.json`: Learner profile data from intake already available for research context
- Tavily MCP tools (`tavily_search`, `tavily_research`): Available for web search per hypothesis

### Established Patterns
- Stage command pattern: prerequisites check → generation → quality checks → review gate — domain research follows this
- Draft-then-audit pipeline: research findings go through SME review checkpoint (analogous to draft review)
- Silent infrastructure writes: trail entries and state updates happen without user-facing messages
- Hard gates at intake and assessment design: domain research adds a third hard gate in the same pattern
- Vocabulary quarantine (v4.0): all user-facing output uses plain language, no ID jargon

### Integration Points
- `intake/SKILL.md` needs to chain to domain research for from-scratch builds (currently chains to "run /curriculum:outcomes")
- New skill command needed: `/curriculum:research` or embedded in intake flow
- `STATE.md` stage progress table: needs a row for domain research (between Stage 1 and Stage 2)
- Audit trail: domain research appends its section after intake's section
- RSRCH-06 skip logic: if `workspace/{project}/source-material/` has files at intake time, domain research is bypassed

</code_context>

<specifics>
## Specific Ideas

- The hypothesis gathering question round should feel like a natural extension of the intake conversation — "Before we design this, one more thing..." — not a jarring context switch
- Evidence labels should be visible to the SME in plain language: "Supported by evidence", "It's more complicated than that", "Evidence suggests otherwise", "Not enough evidence found"
- The per-hypothesis review (claim → evidence → label → SME response) is the core interaction — it should feel like a thinking partner presenting research findings, not a quiz

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 27-domain-research*
*Context gathered: 2026-03-29*
