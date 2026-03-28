# Phase 18: Stage Guidance - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Give SMEs plain-language evaluation guidance at every review gate so they can assess curriculum quality without instructional design training. Normalize stage numbering so directories and pipeline stages match. This phase does NOT add new gates or change the pipeline structure — it improves what SMEs see at existing gates.

</domain>

<decisions>
## Implementation Decisions

### Review gate evaluation prompts
- Self-check questions (3-4 per gate) — not checklists, not narrative paragraphs
- Static questions per gate — same questions every time that gate is hit, regardless of content specifics
- Placement: after the content summary, before the approve/revise/restart decision options
- Questions should be things the SME asks themselves about the work: "Could a new hire follow these instructions on day one?" not instructions for the tool
- Each question targets one quality signal that matters most at that specific stage

### Constraint results translation
- "What + why" in one sentence: "Every learning objective has at least one way to prove the learner can actually do it — otherwise you're teaching things you can't measure"
- Passing checks shown as a count ("12 checks passed"), failures shown in detail with the what+why sentence
- Translation happens at the presentation layer (approve.md and verify.md translate when showing to users), not at generation time in validate.md
- The plain-language translation table stays in validate.md as the canonical source — no need for a shared reference file since validate.md is the only command that runs checks

### Thinking-level presentation
- No taxonomy visible to SMEs — no Bloom labels, no "thinking levels" label, no progression labels
- SMEs get self-check questions about whether the difficulty ramp feels right, not taxonomy labels
- Failures described as concrete observations: "All your assessments ask learners to recall or explain. None ask them to actually do the thing on the job."
- approve.md summary line "spanning [X] through [Y] thinking levels" replaced with natural phrasing like "building from foundational knowledge to hands-on application"
- Outcome text shown without any difficulty label — the action verb naturally signals difficulty, no explicit tag needed

### Stage numbering
- Rename workspace directories from 00-08 to 01-09 for new projects only — existing workspaces keep 00-08
- Commands auto-detect which numbering scheme exists (check for 00-project-brief/ vs 01-project-brief/) and use the right paths
- Stage numbers visible in progress/status output (STATE.md table, handoff messages) — not in generated content or file headers
- init.md creates 01-09 directories for new projects going forward

### Claude's Discretion
- Exact wording of the 3-4 self-check questions per gate — Claude writes these based on what matters most at each stage
- How auto-detection logic is implemented (helper function, inline check, etc.)
- Whether any validate.md translation table entries need rewording to match the "what + why" pattern
- How to phrase the natural-language replacement for "thinking levels" in approve.md summary

</decisions>

<specifics>
## Specific Ideas

- The self-check questions should feel like what a sharp colleague would ask you before you ship: "Does the final assessment match what you'd expect someone to actually do on the job?" — not a quality checklist
- Thinking-level failures should describe what the learner does, not the structural problem: "All your assessments ask learners to recall or explain" not "The program doesn't cover enough thinking levels"

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- validate.md: Already has a plain-language translation table (T1-01 through T1-18) — extend with "why it matters" clause
- curriculum-voice.md: Never-say table (31 entries) — all new guidance text must pass the same vocabulary rules
- approve.md: Existing summary template (lines 96-148) — add self-check questions block between summary and gate decision
- Writing for Clarity block: Standard format established in Phase 17 — guidance additions follow the same pattern

### Established Patterns
- Three-layer enforcement (voice ref + inline guardrail + never-say list) — new guidance text inherits existing enforcement
- AskUserQuestion gate pattern in approve.md and assessments.md — self-check questions slot in before this existing gate
- validate.md check-ID-to-plain-language translation — already proven pattern, extend with "why" clauses

### Integration Points
- approve.md: Two gates (post-assessment, final validation) each need self-check questions added
- assessments.md: Inline PIPE-05 gate needs self-check questions
- validate.md: Translation table needs "why it matters" extensions
- verify.md: Presentation of check results needs the same translation treatment
- init.md: Directory creation needs 01-09 numbering
- All 15 commands: Any hardcoded 00-08 directory paths need auto-detection wrapper

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 18-stage-guidance*
*Context gathered: 2026-03-27*
