# Audit: Research Agent Enforcement Patterns

Patterns extracted from the Research Agent (`knz-research.md`) that could improve curriculum builder execution fidelity. Each pattern is analyzed for what it does, why it works, and how to adapt it for curriculum generation.

---

## Pattern 1: Drafts-Before-Outputs Gate (Audit-Before-Promote)

### What the Research Agent does
`/summarize-section` writes to `research/drafts/`. Only `/audit-claims` can move a file from `drafts/` to `outputs/`. The audit command has explicit "Non-Negotiable Rules" including: no bypassing (refuse if user asks to skip), no soft passes (don't downgrade severity to force a pass), and re-audit after fixes (full audit, not spot-check). Nothing in `outputs/` should exist without a corresponding audit report in `audits/`.

### Why it works
The model cannot accidentally produce a "final" output. The directory structure itself is the enforcement mechanism — there is no code path from generation to output that doesn't pass through the auditor. The audit agent is a separate agent invocation (not self-review), which means a different context evaluates the work. Refusing bypass requests removes the escape hatch that polite compliance would otherwise create.

### Curriculum adaptation
**Stages 4-6 (Modules, Sessions, Transfer)** — these are the stages where the model most often generates content that looks structurally complete but violates constraints (missing formative assessments, sessions without pre-work, transfer tasks that are generic rather than contextualized). Create a `stage-drafts/` directory in the curriculum workspace. Each stage command writes to `stage-drafts/`. A separate `/audit-stage` command (backed by a dedicated auditor agent) reads the schema for that stage, reads the draft output, and checks every required field against the schema. Only if audit passes does the file move to the final stage output location. This makes schema compliance a gate rather than a hope.

**Key detail to carry over:** The "no soft passes" rule. The curriculum auditor must not be allowed to say "close enough" on required fields. If the session schema requires a `formative_check` field and it's missing, that's a hard fail regardless of how good the rest of the session looks.

---

## Pattern 2: Pre-Check Gates on Commands

### What the Research Agent does
`/process-source` has a mandatory pre-check: read STATE.md, check "Sources since last cross-reference," and if the count is 5+, **stop and refuse to proceed** until `/cross-ref` is run. `/summarize-section` has two mandatory pre-checks: cross-reference must be current AND gaps must be assessed for this phase. If either fails, the command refuses to execute.

### Why it works
This is "enforcement at the point of action." The model doesn't need to remember the rule — the command itself checks the precondition and blocks. The check is structural (read a counter from a file), not judgment-based (decide if you've done enough cross-referencing). The command tells the user exactly what to run to unblock — there's no ambiguity about the fix.

### Curriculum adaptation
**Stage 5 (Sessions) should gate on Stage 4 (Modules) completion.** Before generating any session content, the `/sessions` command should read the modules output, verify all modules have approved outcomes and assessments linked, and refuse to proceed if the upstream stages are incomplete or unapproved. Currently the pipeline order is documented but not enforced — a user could theoretically run `/sessions` before `/modules` is finalized.

**Stage 6 (Metaskills) should gate on Stage 5 (Sessions) completion.** Metaskill mapping requires knowing the actual session activities. If sessions aren't finalized, metaskill mapping will be speculative.

**Stage 8 (Marketing) should gate on Stage 2 (Outcomes) and Stage 7 (Transfer).** Marketing copy that doesn't reference the actual outcomes and transfer ecosystem will drift into generic claims. A pre-check that reads the outcomes file and transfer ecosystem file — and refuses to proceed if they don't exist — prevents the "generate marketing from vibes" failure mode.

**Implementation:** Each stage command gets a `## Pre-checks (mandatory)` section at the top, modeled exactly on the Research Agent's pattern. Read the predecessor stage output file. If it doesn't exist or hasn't been approved, print the specific command the user needs to run and stop.

---

## Pattern 3: The Research Integrity Agent (Dedicated Watchdog)

### What the Research Agent does
A separate agent (`research-integrity.md`) watches for seven specific failure modes: fabricated data, range narrowing, qualifier stripping, internal inconsistency, cross-phase drift, unsourced claims, and confidence inflation. It runs after every source note, draft, or synthesis. It is explicitly told: "You are not here to be helpful or encouraging. You are here to be precise. If something is wrong, say so directly. If something is fine, say nothing about it. Your silence is approval." Output is issues-only — no praise, no summaries, just problems.

### Why it works
The failure modes are named and defined with exact detection procedures. "Range narrowing" isn't a vague concern — it's "compare every range in the file against its source. If the source says 1-3x and the file says 2-3x, that's range narrowing." Each check type has a specific flag format: "RANGE NARROWED: Line [N] says [narrowed range], but [source note] says [original range]." The agent knows exactly what to look for, exactly how to report it, and has no instruction to be diplomatic about findings.

### Curriculum adaptation
**Create a `curriculum-integrity` agent** with named failure modes specific to curriculum generation:

1. **Outcome drift** — a session activity or assessment that doesn't trace back to an approved learning outcome. Check: every activity in sessions must reference an outcome from Stage 2. Flag: "OUTCOME DRIFT: Session [N] activity [X] does not map to any approved learning outcome."

2. **Missing formative assessment** — a session longer than 20 minutes without a formative check. The most commonly skipped element. Flag: "MISSING FORMATIVE: Session [N] has [X] minutes of content between formative checks [A] and [B]."

3. **Pre-work gap** — a session that requires prior knowledge but has no corresponding pre-work assignment. In the flipped classroom model, this is structural failure. Flag: "PRE-WORK GAP: Session [N] assumes knowledge of [X] but no pre-work covers this."

4. **Generic transfer** — a transfer task that uses placeholder language ("apply this to your context") instead of specific scenarios grounded in the learner profile. Flag: "GENERIC TRANSFER: Transfer task [N] uses non-specific language. The learner profile specifies [context] — transfer tasks must reference it."

5. **Assessment-outcome misalignment** — an assessment that tests at a different Bloom's level than the outcome it claims to measure. If the outcome says "analyze" but the assessment asks to "list," that's a mismatch. Flag: "BLOOM'S MISMATCH: Assessment [N] tests at [level] but outcome [X] requires [level]."

6. **Metaskill orphan** — a metaskill claimed in Stage 6 that has no corresponding session activity where it's actually practiced. Flag: "METASKILL ORPHAN: [metaskill] is mapped but no session activity practices it."

7. **Doctrine violation** — Theory-Method-Application sequence broken within a module (method before theory, application without method). Flag: "DOCTRINE VIOLATION: Module [N] has [description of violation]."

**The key design choice:** Each failure mode has a mechanical detection procedure, not a judgment call. The agent reads specific files and compares specific fields. This is what makes it enforceable rather than aspirational.

---

## Pattern 4: Canonical Figures Registry (Single Source of Truth for Cross-Phase Data)

### What the Research Agent does
`research/reference/canonical-figures.json` is a registry of every important number that gets cited across phases. Each entry has: id, value, unit, qualifier, source_phase, source_file, confidence, registered_when, and referenced_by. The rule: "When citing a number from a previous phase, check canonical-figures.json first. If registered, use the canonical value. If not registered and this is a cross-phase citation, register it before using it. Never copy numbers from STATE.md summaries or conversation memory."

### Why it works
Numbers drift during synthesis. A research project might find "15-25% adoption" in Phase 2, but by Phase 8 synthesis it becomes "roughly 20% adoption" through gradual rounding. The registry makes the authoritative value explicit and auditable. The integrity agent checks every cross-phase number against this registry. The rule about never copying from STATE.md or conversation memory eliminates the two most common drift sources — summaries that round, and conversation memory that degrades over long contexts.

### Curriculum adaptation
**Create a `curriculum-registry.json` for cross-stage data.** The curriculum pipeline has the same drift problem: outcomes defined in Stage 2 get paraphrased in Stage 4 modules, further simplified in Stage 5 sessions, and by Stage 8 marketing, the original precision is gone. The registry would track:

- **Learning outcomes** — the exact wording from Stage 2, so downstream stages reference the canonical version rather than paraphrasing
- **Assessment criteria** — the exact rubric language from Stage 3, so session facilitator guides reference the same standards
- **Time allocations** — total program hours, per-module hours, per-session hours. These get rounded and eventually don't add up.
- **Learner profile data** — the specific audience characteristics from Stage 1 intake that inform every downstream decision

Each entry: `id`, `value` (exact text or number), `source_stage`, `source_file`, `registered_when`, `referenced_by` (array of files that cite it).

**Stage commands would be required to check the registry before generating content that references upstream data.** The integrity agent would verify cross-stage citations match the registry.

---

## Pattern 5: Mandatory Cross-Reference at Intervals

### What the Research Agent does
`/cross-ref` is mandatory every 5-8 sources. STATE.md tracks a counter: "Sources since last cross-reference." The `/process-source` command checks this counter before processing and refuses to proceed at 5+. The cross-reference agent reads ALL notes and finds patterns: claims confirmed by multiple sources, contradictions, emerging themes, gaps where multiple sources reference something but provide no evidence.

### Why it works
Without forced cross-referencing, research becomes a linear accumulation of facts. Connections between sources only emerge when someone explicitly looks for them. The counter mechanism makes the review interval mechanical — it doesn't depend on the model judging "when it feels like enough."

### Curriculum adaptation
**Mandatory alignment check every N stages.** The curriculum pipeline has 9 stages. Without periodic cross-checks, later stages can diverge from earlier ones. Implement a `/cross-check` command that:

- After Stage 3 (Assessments): verify outcomes-to-assessments alignment. Every outcome has an assessment. Every assessment maps to an outcome. No orphans in either direction.
- After Stage 5 (Sessions): verify the full chain — outcomes → assessments → modules → sessions. Every thread is traceable end-to-end.
- After Stage 7 (Transfer): verify that the transfer ecosystem references actual session content, actual outcomes, and actual assessments. Not generic "apply what you learned" but specific callbacks.

**The counter pattern could work for modules.** If a program has 8+ modules, require a cross-check after every 3-4 modules are designed to catch drift before all modules are done and rework is expensive.

---

## Pattern 6: Phase Completion Requires All Four Checks

### What the Research Agent does
"A phase is not complete until: cross-reference is current, gaps are assessed, draft is written, and audit has passed. STATE.md should not mark a phase complete until all four are done." This is a checklist with no optional items. The state file is the enforcement surface — it's checked at the start of every new phase.

### Why it works
Prevents the "good enough, move on" failure mode. Without explicit completion criteria, phases get marked done when the main deliverable exists, even if supporting checks were skipped. By making STATE.md the checkpoint and new-phase-start the verification moment, the system catches incomplete phases at the worst possible time to skip them — right when you're about to build on top of them.

### Curriculum adaptation
**Stage completion checklist in the curriculum workspace STATE file.** Each stage is not complete until:

1. Output file exists and follows schema
2. Integrity agent has run with zero high-severity findings
3. Cross-stage alignment verified against predecessor stages
4. Human approval captured (for stages that require it)

The next stage's command checks STATE for predecessor completion before starting. This is the pre-check gate (Pattern 2) backed by a completion standard (this pattern).

**Specific to curriculum:** Stages 2, 4, and 6 are the ones most likely to be "completed" prematurely. Outcomes (Stage 2) get approved without checking Bloom's verb consistency. Modules (Stage 4) get approved without verifying assessment coverage. Metaskills (Stage 6) get approved without verifying they map to actual activities. Making the checklist explicit and machine-checked (via the integrity agent) closes these gaps.

---

## Pattern 7: Context Management with Explicit State Handoff

### What the Research Agent does
"Clear context between phases. Each phase should start with a fresh context window. STATE.md and your research files carry everything forward." Before clearing: update STATE.md with current position, completed work, and next action. After clearing: read STATE.md first before resuming. End-of-phase message explicitly says: "Phase [N] is complete and STATE.md is updated. I'd recommend clearing context before starting Phase [N+1]."

The key rule: "Write state BEFORE doing anything expensive in case of compaction."

### Why it works
Long contexts degrade model performance. The Research Agent treats context as disposable and state files as durable. This means every piece of information needed to continue work exists in files, not in conversation history. The "write state before expensive operations" rule protects against context window compaction destroying in-flight decisions.

### Curriculum adaptation
**Each stage command should end with an explicit context-clear recommendation and STATE update.** The curriculum pipeline is long enough that running all 9 stages in a single context window is impractical and degrades quality. Currently the pipeline stages don't enforce or even recommend clearing.

Stage commands should:
1. Update the curriculum workspace state file with: stage completed, key decisions, artifacts produced, next stage to run
2. End with: "Stage [N] is complete. Type /clear now. When you resume, run `/curriculum:resume` to pick up at Stage [N+1]."

The `/resume` command (which already exists) should read STATE first and verify predecessor completions before proceeding. This creates a clean handoff that doesn't depend on the model remembering what happened 50k tokens ago.

---

## Pattern 8: Source Processing Rules (No Shortcuts on Input Quality)

### What the Research Agent does
"Every URL that informs a finding must be processed as a source first. The workflow is: search finds it -> extract full content -> structure it into a research note -> reference the note in outputs. No shortcuts. Don't cite search snippets directly in outputs — they're discovery tools, not sources." Additionally, the `/process-source` command verifies the source is actually about the research subject before processing it, and verifies author attribution from explicit bylines only.

### Why it works
This prevents the "I found a snippet in search results and treated it as a fact" failure mode. By forcing full extraction and structured note-taking before citation, the model must engage with the full context of a source — not just the sentence that confirms its current direction. The subject-verification step prevents the agent from drifting to a different subject when sources are ambiguous.

### Curriculum adaptation
**Stage 1 (Intake) must fully process all input before any downstream generation begins.** The intake stage collects: SME expertise description, target audience, program constraints, desired outcomes. Currently, the model can proceed with partial or ambiguous intake data. Adapt the source processing pattern:

1. Every piece of input the SME provides must be captured in a structured intake note (not just acknowledged in conversation)
2. Ambiguous inputs must be clarified before proceeding — the "verify this is about the research subject" pattern becomes "verify this outcome is behavioral and measurable before accepting it"
3. The intake output file becomes the canonical reference for all downstream stages, analogous to how source notes are the canonical reference for research outputs

**Stage 5 (Sessions) should require reading the actual doctrine file before generating.** The Research Agent requires reading `source-standards.md` and `writing-standards.md` before writing anything. The session generator should be required to read `doctrine-how-i-teach-how-i-learn.md` before generating any session — not as a suggestion in CLAUDE.md, but as a mandatory step in the command that blocks if not completed. This prevents the "I know what flipped classroom means" confabulation where the model generates sessions based on its training data understanding rather than the specific doctrine.

---

## Summary: The Meta-Pattern

The Research Agent's enforcement patterns share a single architectural principle: **make compliance the path of least resistance and non-compliance structurally impossible.**

Every pattern follows the same shape:
1. **Name the failure mode explicitly** — not "be careful with numbers" but "RANGE NARROWED: Line [N] says [narrowed range], but [source note] says [original range]"
2. **Encode the check as a mechanical procedure** — read file A, compare field X to field Y, flag if different
3. **Gate the next action on the check passing** — the command refuses to proceed, not "recommends" running the check
4. **Use a separate agent for verification** — the generator doesn't self-review; a different agent with different instructions reviews the work
5. **Make state durable and conversation disposable** — everything needed to continue exists in files, not in context

The curriculum builder currently relies heavily on patterns 1 (schemas name what's required) but weakly on patterns 3-5 (gates, separate verification, durable state). The highest-impact adaptations would be:

1. **Pre-check gates on every stage command** (Pattern 2) — prevents out-of-order execution
2. **A curriculum-integrity agent with named failure modes** (Pattern 3) — catches the specific ways curriculum output degrades
3. **Draft-then-audit pipeline for stages 4-6** (Pattern 1) — makes schema compliance a gate, not an aspiration
4. **Canonical registry for cross-stage data** (Pattern 4) — prevents outcome drift across the pipeline
5. **Explicit context-clear protocol with STATE handoff** (Pattern 7) — prevents quality degradation in long sessions
