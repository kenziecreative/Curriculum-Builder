# Phase 17: Vocabulary & Plain Language - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove all remaining instructional design jargon from every command, agent, and output visible to users. When an SME reads anything this tool produces — validation reports, audit summaries, approval gates, transparency notes, questions — they should never encounter a term that requires specialized training to understand.

</domain>

<decisions>
## Implementation Decisions

### Never-say list architecture
- Claude's discretion on whether to use a single canonical list or a layered approach (canonical + domain-specific additions per command)
- All terms currently banned locally by individual commands but missing from curriculum-voice.md's table must be added to the canonical table: kirkpatrick, parent_module_id, self_direction_level, primary_metaskill
- approve.md gets full three-layer enforcement: curriculum-voice.md reference + inline guardrail + dedicated never-say list — it's the highest-stakes user-facing output

### Writing for Clarity enforcement
- Every command gets Writing for Clarity — no exceptions, regardless of output volume
- Standard block format across all commands — one consistent format, same wording, easy to audit
- Applies to questions too, not just generated content — intake questions are part of the user experience
- curriculum-voice.md reference instruction also standardized — same format, same placement in every command
- Commands currently missing WfC: resume.md, verify.md, assemble.md, evaluation-mode.md, intake.md, approve.md

### Template jargon cleanup
- Rewrite bracketed generation hints in plain language — instead of '[Kirkpatrick level]' use '[measurement approach, e.g., behavior change on the job]'. Claude still knows what to generate; the user never sees jargon even if the bracket renders
- No outcome/assessment IDs in user-facing output — always use plain descriptions (e.g., 'your third module outcome about data analysis' not 'MO-2-3')
- Transparency notes use natural language to describe changes, not ID codes
- Known instances to fix: approve.md line 97 (Kirkpatrick), transfer.md line 154 (Kirkpatrick), assessments.md line 162 (MO-2-3, FA-4)

### Agent vocabulary guardrails
- curriculum-evaluator.md gets full treatment: curriculum-voice.md reference + Writing for Clarity + never-say list — its evaluation-report.md is read directly by SMEs
- knz-validator.md gets vocabulary guardrails (defense in depth) — even though orchestrator translates, no jargon should leak through edge cases
- Any agent that writes files a user opens gets post-write vocabulary verification scan (like session-generator.md already has)
- Post-write scan lists reference the canonical never-say table in curriculum-voice.md rather than hardcoding per-agent — one list to maintain

### Claude's Discretion
- Never-say list architecture (single source vs. layered) — pick whichever produces cleanest enforcement with least maintenance
- Exact wording of the standard Writing for Clarity block
- Exact wording of the standard curriculum-voice.md reference instruction
- Whether knz-validator.md needs full treatment or lighter enforcement given its output is always translated

</decisions>

<specifics>
## Specific Ideas

- "Shouldn't all content be clear and have clarity? Questions are part of the experience as well." — Writing for Clarity applies to everything the user reads, including intake questions
- The three-layer enforcement model (reference file for voice/tone, inline guardrail for enforcement, never-say list for substitution safety net) was explicitly chosen for approve.md as the highest-stakes output

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- curriculum-voice.md: Existing "Terms That Never Appear in Output" table — expand with missing terms
- session-generator.md: Post-write vocabulary verification scan (lines 400-415) — pattern to replicate in other agents
- 8 commands already have inline guardrails from v3.0 Phase 13 — use as template for standard block format

### Established Patterns
- Inline guardrail pattern: `<guardrail>Never use in output: [terms]</guardrail>` — used in marketing.md, transfer.md, assessments.md, etc.
- Voice reference pattern: `Read .claude/reference/curriculum-voice.md before generating any user-facing content.` — present in most commands but varies in placement/wording
- Post-write scan pattern: session-generator checks generated files for prohibited terms and rewrites if found

### Integration Points
- curriculum-voice.md is the shared reference — changes here cascade to all commands that reference it
- curriculum-evaluator.md is invoked by evaluation-mode.md — both need aligned enforcement
- knz-validator.md writes to 08-validation/ which validate.md and approve.md read — chain of vocabulary responsibility
- session-generator.md already has the post-write scan — new agents follow this pattern

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 17-vocabulary-plain-language*
*Context gathered: 2026-03-26*
