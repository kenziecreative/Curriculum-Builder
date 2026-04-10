# Audit: Execution Fidelity Patterns from the Research Agent

**Date:** 2026-03-26
**Auditor scope:** Compare enforcement patterns in the research-agent (`gold-master-projects/research-agent/knz-research.md`) against the curriculum builder's current architecture. Identify patterns that make output deterministic — not just instructed but verified, not just generated but checked.

**Key finding:** The research-agent achieves high execution fidelity through a small set of structural patterns that the curriculum builder partially uses but does not apply consistently. The patterns that matter most are: hard pre-checks that block forward motion, post-write self-verification, canonical registries that prevent drift, and mandatory intermediate artifacts that create audit trails. The curriculum builder has some of these (the pre-tool-use hook is excellent); others are missing or incomplete.

---

## Pattern 1: Hard Pre-Checks That Block the Current Operation

### What the research-agent does

Every command has a mandatory pre-check section that reads STATE.md and blocks execution if a prerequisite condition is not met. These are not suggestions — the command says "Do not proceed" and stops.

Examples:
- `/process-source` reads "Sources since last cross-reference" from STATE.md. If the count is 5 or higher, it refuses to process the source and tells the user what to run first.
- `/summarize-section` verifies that both `/cross-ref` and `/check-gaps` have run for the current phase before writing anything. If either pre-check fails, it stops and names which check failed.
- `/audit-claims` has non-negotiable rules: "If the user asks to skip the audit or move a failed draft to outputs manually, refuse."

### Why it works

Pre-checks catch the failure at the moment it would happen, not after the output is already written. The model cannot skip ahead because the command file literally says "stop here" before the generation logic begins. The pre-check is the first thing the command does, not an afterthought.

### How the curriculum builder compares

The curriculum builder has prerequisite checks in every command (e.g., sessions.md checks Stage 4 is complete before proceeding). The `pre-tool-use.sh` hook enforces stage sequencing at the filesystem level — this is stronger than the research-agent's pattern because it operates at the tool call layer, not just the instruction layer.

**Gap:** The curriculum builder's pre-checks are stage-level only. They verify "is the previous stage complete?" but not "was the quality gate within this stage passed?" For example, sessions.md checks that Stage 4 status is `complete` but does not verify that the module specs passed any quality check. The research-agent's pre-checks are more granular — they verify that specific intermediate artifacts exist and are current.

### Adaptation for curriculum builder

Add intra-stage pre-checks. Before session generation dispatches worker Tasks, verify:
- Every module spec in `03-modules/` has the required fields (not just that the directory exists)
- The outcome IDs referenced in module specs actually exist in `01-outcomes/learning-objectives.md`
- The assessment links in outcomes actually point to assessments that exist in `02-assessments/`

These are fast reads that catch upstream errors before they propagate into 40+ session files. The research-agent prevents "garbage in, garbage out" by checking inputs, not just checking that a stage status flag was set.

---

## Pattern 2: Post-Write Self-Verification

### What the research-agent does

The `/summarize-section` command runs the research-integrity agent on its own output before reporting completion. The integrity agent checks for fabricated data, range narrowing, qualifier stripping, internal inconsistency, cross-phase drift, unsourced claims, and confidence inflation. Issues must be fixed before the completion signal is sent.

The integrity agent is a separate agent with a different persona — "You are not here to be helpful or encouraging. You are here to be precise." This separation of concerns means the generator and the checker have different optimization targets.

### Why it works

The model that generated the content is not the same context that checks it. The integrity agent reads the written file and compares it against source artifacts independently. This prevents the generator from "believing its own output" — a common failure mode where the model treats what it just wrote as ground truth rather than checking it against source material.

The check happens before the completion signal, not as a separate manual step. The workflow is: generate → check → fix → signal complete. Not: generate → signal complete → maybe check later.

### How the curriculum builder compares

The session-generator agent has a post-write verification step (added after v3.0 output review found TMA/DCR vocabulary leaking into output). This checks for prohibited vocabulary only. The `curriculum-auditor.md` and `curriculum-evaluator.md` agents perform deeper semantic checks, but they run in separate commands (`/curriculum:validate`), not inline with generation.

**Gap:** Session generation writes 4 files per session (potentially 20+ files for a 5-module program), then a separate `validate` command checks them later. Between generation and validation, there is no automatic integrity check. The session-generator's post-write verification catches vocabulary violations but not:
- Reflection prompts that are generic (T1-17 catches this, but only at validation time)
- Transfer connections that don't reference the actual transfer_context from the project brief (T1-18, same problem)
- Outcome IDs that don't match the module's scope
- Duration totals that don't add up to the stated session length

### Adaptation for curriculum builder

Add a lightweight inline integrity check to the session-generator agent, modeled on the research-integrity agent pattern. After writing each session's 4 files, the generator should read them back and verify:

1. Every `outcome_id` referenced exists in learning-objectives.md and belongs to this module
2. The `reflection_prompt.prompt_text` names a specific concept from this session (not a generic stem)
3. The `transfer_connection.application_scenario` references language from the project brief's `transfer_context`
4. The sum of `duration_minutes` across all components equals `total_duration_minutes`
5. No prohibited vocabulary (already implemented)

This is not a replacement for `/curriculum:validate` — it is a first-pass filter that catches the most common generation failures at write time, before they multiply across 20 files and require a full validation rerun.

---

## Pattern 3: Canonical Registry to Prevent Cross-Phase Drift

### What the research-agent does

`canonical-figures.json` is a single-source-of-truth registry for numbers that get cited across phases. When a number first crosses a phase boundary, it gets registered with: id, value, unit, qualifier, source_phase, source_file, confidence, registered_when, referenced_by. Every subsequent citation must match the canonical value exactly. The integrity agent enforces this.

The key insight: STATE.md summaries are explicitly not trusted for specific values. "Never copy numbers from STATE.md summaries or conversation memory — always verify against the canonical file or original phase output."

### Why it works

Numbers drift. A "1-3x improvement" becomes "2-3x" becomes "2x" as it moves through synthesis stages. The canonical registry makes drift mechanically detectable — the integrity agent reads the registry and compares, which is a deterministic check, not a judgment call.

### How the curriculum builder compares

The curriculum builder has no equivalent registry. Outcome IDs (SO-*), module IDs (M-N), and session IDs (M-N-S-N) are generated at each stage and referenced downstream, but there is no canonical file that tracks these cross-stage references. The traceability depends on each downstream command reading the upstream files correctly.

**Gap:** When sessions reference outcome IDs, there is no mechanical check that the IDs are valid until validation runs (T1-02, T1-06). When marketing references curriculum elements, there is no check until T1-32. The cross-stage links are generated but not registered, so drift is detected late.

### Adaptation for curriculum builder

Create a `curriculum-registry.json` (or equivalent markdown file) in the workspace that tracks:

```
{
  "outcomes": [{"id": "SO-1", "text": "...", "bloom_level": "Apply", "source": "01-outcomes/learning-objectives.md"}],
  "assessments": [{"id": "...", "paired_outcome": "SO-1", "source": "02-assessments/..."}],
  "modules": [{"id": "M-1", "outcomes": ["SO-1", "SO-2"], "source": "03-modules/M-1/module-spec.md"}]
}
```

Write the registry at each stage completion. Downstream stages read from the registry instead of re-parsing upstream files. The validation agent checks the registry against actual files to detect any inconsistency.

This is a significant structural change. A lighter-weight alternative: add a cross-reference check to the session-generator's post-write verification that reads `01-outcomes/learning-objectives.md` and verifies every referenced outcome ID exists. This costs one file read per module but catches the most common drift category.

---

## Pattern 4: Mandatory Intermediate Artifacts (drafts/ vs. outputs/)

### What the research-agent does

Research output goes through an enforced two-stage lifecycle:
1. `/summarize-section` writes to `research/drafts/`
2. `/audit-claims` checks the draft against source notes
3. Only `/audit-claims` can promote a file from `drafts/` to `outputs/`

Nothing reaches `outputs/` without passing audit. This is stated as a non-negotiable rule with explicit refusal instructions: "If the user asks to skip the audit or move a failed draft to outputs manually, refuse."

### Why it works

The two-directory pattern makes the quality gate visible in the filesystem. A file in `drafts/` has not been checked. A file in `outputs/` has passed. There is no ambiguous middle state. The audit is a mandatory transformation step, not an optional review.

The research-agent also requires full re-audit after fixes: "When a draft is fixed after a failed audit, run the full audit again — do not spot-check only the previously flagged issues. Fixes can introduce new problems."

### How the curriculum builder compares

The curriculum builder writes session files directly to their final location (`04-sessions/M-N-S-N/`). There is no draft/final distinction at the file level. The validation command (`/curriculum:validate`) runs checks after all sessions are written, but it does not move files between directories — it writes reports to `08-validation/` and reports pass/fail.

The review gates in the curriculum builder (Post-Assessment, Final Validation) are STATE.md flags, not filesystem transitions. A stage can be marked `complete` in STATE.md even if the validation reports contain failures, if the state update logic has a bug.

**Gap:** The curriculum builder has no filesystem-level enforcement of "this output has been checked." The `pre-tool-use.sh` hook prevents writing to a stage directory before the prerequisite stage is complete, but it does not prevent marking a stage complete before its quality checks pass. The state flag is the only gate, and state flags can be set by any command that writes to STATE.md.

### Adaptation for curriculum builder

This is a heavy pattern to adopt fully (separating drafts/ from finals/ for session files would require reworking the file structure). A lighter adaptation:

1. **Validation-before-state-advance:** The validate command already blocks Stage 9 completion on tier_1_failures > 0. Extend this pattern: the `pre-tool-use.sh` hook could check not just that a stage status is `complete` but that the validation report for that stage exists and shows zero high-severity failures.

2. **Validation lock file:** After `/curriculum:validate` passes with zero tier-1 failures, write a `.validated` marker file to `08-validation/`. The `approve` command checks for this marker. If any session file is modified after the marker is written (detectable by timestamp comparison), the marker is invalidated and validation must rerun. This is the filesystem-level equivalent of the drafts/outputs boundary.

---

## Pattern 5: Explicit Refusal Instructions

### What the research-agent does

Several commands contain explicit "refuse to do this" instructions:
- `/audit-claims`: "No bypassing. If the user asks to skip the audit or move a failed draft to outputs manually, refuse."
- `/audit-claims`: "No soft passes. Do not downgrade a high-severity issue to moderate to make the draft pass."
- `/process-source`: "Do not process a mismatched source" (wrong subject).
- Subject Identity Rules: "If the topic is ambiguous, stop and ask — do not guess."

### Why it works

The model's default behavior is to be helpful — which means it tends to find ways to do what the user asks, even when the instructions say not to. Explicit refusal instructions with a stated reason ("the audit gate exists to protect research quality") give the model both the directive and the justification, making compliance more likely.

The "No soft passes" instruction is particularly important — it anticipates a specific failure mode where the model downgrades severity to make things pass, which is exactly the kind of "helpful" behavior that undermines quality gates.

### How the curriculum builder compares

The curriculum builder has some refusal patterns:
- The `pre-tool-use.sh` hook programmatically blocks writes (strongest form — the model cannot override a shell hook)
- Session-generator: "Do not ask questions or pause for input"
- Validator: "You do NOT modify any stage output files under any circumstances. You do NOT generate content. You do NOT offer to fix failures."

**Gap:** The curriculum builder's refusal instructions focus on role boundaries (don't modify, don't generate, don't offer to fix) but do not address the "soft pass" failure mode. There is no instruction that says "Do not mark a quality check as passing when it does not pass" or "Do not weaken a failure to make the output look better." The validation agent could downgrade a T1-17 (generic reflection) finding by rationalizing that the prompt is "specific enough" when it is not.

### Adaptation for curriculum builder

Add anti-softening instructions to the validator agent:

- "If a reflection prompt could be copied verbatim to any other session in this program and still make sense, it fails T1-17. Do not rationalize borderline cases as passes."
- "If a transfer connection uses generic language ('apply this to your work') rather than naming the specific transfer context from the project brief, it fails T1-18. The project brief's transfer_context is the standard, not your judgment of what 'close enough' means."
- "Do not reduce the severity of a finding to make the overall result look better. Every T1 check is binary: PASS or FAIL. There is no 'warning' or 'minor' category for Tier 1."

---

## Pattern 6: Context Management Between Phases

### What the research-agent does

The research-agent has explicit context management:
- "Clear context between phases. Each phase should start with a fresh context window."
- "STATE.md and your research files carry everything forward — nothing critical lives in conversation history."
- "At the end of every phase, remind the user: 'Phase [N] is complete and STATE.md is updated. I'd recommend clearing context before starting Phase [N+1].'"

STATE.md is the sole source of truth for position. The session-start behavior reads STATE.md first and orients from there.

### Why it works

Long conversations accumulate noise. The model starts paying attention to its own earlier outputs (which may contain errors) rather than the source files. Fresh context per phase means each phase starts from artifacts, not from a growing conversation that dilutes attention.

### How the curriculum builder compares

The curriculum builder has a `session-start.md` hook that reads STATE.md and surfaces context. Commands like `sessions.md` read upstream files rather than relying on conversation history. The `pre-compact-check.sh` hook warns if STATE.md was not updated before context compression.

**Gap:** The curriculum builder does not explicitly recommend context clearing between stages. The auto-chain pattern (sessions → validate → metaskills) runs multiple stages in a single context window, which means the model's context is saturated by the time it reaches metaskill mapping. The marketing command does include a context-clear nudge, but the auto-chained stages do not.

### Adaptation for curriculum builder

The auto-chain is a design tradeoff (user convenience vs. context quality). Rather than breaking the chain, add a context quality check: before the auto-triggered command begins, verify that the required source files are read fresh from disk rather than relied on from conversation history. The validate command already does this (it dispatches a Task agent with a fresh context). Extend this pattern: metaskills should also dispatch via Task, ensuring it gets a clean read of the session files rather than relying on the saturated orchestrator context.

---

## Pattern 7: Completion Signals as Contracts

### What the research-agent does

The integrity agent, the plan generator, and the audit process all return structured completion signals with specific fields. The curriculum-auditor has the most rigorous version: "Do not summarize, paraphrase, or add prose. Return only the block below — no introductory sentence, no paragraph summary, no reformatted table."

### Why it works

When a subagent returns a free-form response, the orchestrator must parse natural language to determine status. Structured completion signals make the orchestrator's job deterministic: check the `tier_1_failures` field, not "did the agent say everything was fine?"

### How the curriculum builder compares

The curriculum builder uses this pattern extensively. The session-generator returns a structured completion signal. The validator returns `tier_1_failures` and `tier_2_scores`. The curriculum-auditor returns a table with exact column names.

**No significant gap.** The curriculum builder adopted this pattern well. The one risk: the completion signal from the curriculum-auditor had to be tightened after a first run produced wrong column names ("Verbatim Completion Signal required" decision in STATE.md). This suggests the pattern works but requires exact specification — which the builder now has.

---

## Summary: Priority Adaptations

Ordered by expected impact on execution fidelity:

| Priority | Pattern | Current State | Effort | Impact |
|----------|---------|---------------|--------|--------|
| 1 | Post-write self-verification (deeper than vocabulary) | Vocabulary check only | Medium | High — catches generation failures at write time instead of at validation |
| 2 | Anti-softening instructions for validator | Not present | Low | High — prevents the most common way quality gates get bypassed |
| 3 | Intra-stage pre-checks (verify inputs, not just stage flags) | Stage-level only | Medium | Medium — catches upstream errors before they multiply |
| 4 | Canonical registry for cross-stage references | Not present | High | Medium — prevents ID drift but current traceability mostly works |
| 5 | Context quality for auto-chained stages | Task dispatch for validate only | Low | Medium — metaskills and transfer would benefit from fresh context |
| 6 | Filesystem-level validation markers | Not present | Medium | Low-medium — adds defense-in-depth to state flag system |

---

## Files Referenced

**Research-agent (source of patterns):**
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/research-agent/knz-research.md` — full scaffold command including all enforcement rules, agent definitions, and command templates

**Curriculum builder (audit targets):**
- `.claude/hooks/pre-tool-use.sh` — stage sequencing enforcement (strongest existing pattern)
- `.claude/hooks/pre-compact-check.sh` — STATE.md update reminder before compaction
- `.claude/hooks/milestone-check.sh` — STATE.md update reminder after milestone commits
- `.claude/hooks/session-start.md` — session context restoration
- `.claude/plugins/curriculum/agents/session-generator.md` — per-module worker with post-write vocabulary check
- `.claude/plugins/curriculum/agents/knz-validator.md` — three-tier validation worker
- `.claude/plugins/curriculum/agents/curriculum-auditor.md` — source material assessment worker
- `.claude/plugins/curriculum/agents/curriculum-evaluator.md` — external curriculum evaluation worker
- `.claude/plugins/curriculum/commands/sessions.md` — session generation orchestrator
- `.claude/plugins/curriculum/commands/validate.md` — validation orchestrator
- `.claude/plugins/curriculum/commands/verify.md` — delivery readiness checker
- `.claude/plugins/curriculum/commands/approve.md` — review gate handler
- `.claude/plugins/curriculum/commands/intake.md` — intake interview orchestrator
- `.claude/plugins/curriculum/commands/outcomes.md` — outcome generation with inline constraint enforcement
