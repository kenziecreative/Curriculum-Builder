# Audit: Execution Fidelity Patterns from GSD Workflow Tool

**Date:** 2026-03-26
**Source:** GSD agents (executor, verifier, plan-checker, integration-checker, nyquist-auditor) and commands (execute-phase, plan-phase, validate-phase, verify-work, audit-milestone)
**Purpose:** Identify enforcement mechanisms that could improve the curriculum builder's runtime compliance — the gap between "instructions exist in command files" and "the model actually follows them during execution."

**Relationship to prior audit:** The research-agent audit (AUDIT-gsd-patterns.md) focused on content integrity patterns (registry, self-verification, refusal instructions). This audit focuses on execution architecture — how GSD structurally prevents the model from drifting during multi-step workflows.

---

## Pattern 1: Goal-Backward Verification (Verifier Agent)

### What GSD does

The verifier does not check whether tasks were completed. It starts from the phase goal and works backward through three levels:

1. **Observable truths** — What must be TRUE for the goal to be achieved?
2. **Required artifacts** — What must EXIST for those truths to hold? (checked at three sub-levels: exists, substantive, wired)
3. **Key links** — What must be CONNECTED for those artifacts to function?

The critical mindset instruction: "Do NOT trust SUMMARY.md claims. SUMMARYs document what Claude SAID it did. You verify what ACTUALLY exists in the code. These often differ."

The verifier has explicit stub detection patterns — it knows what a placeholder component looks like (`return <div>Component</div>`), what an empty API handler looks like (`return Response.json([])`), and what fake wiring looks like (a fetch call with no await or response handling).

### Why it works

This prevents the most common execution failure: tasks get marked "done" because something was created, but what was created does not actually achieve the goal. A file exists but it is a stub. An API route exists but nothing calls it. A component renders but displays static placeholder text.

The three-level check (exists / substantive / wired) catches failures at increasing depth. Most systems only check level 1 (exists). GSD's level 2 (substantive — is the file more than a placeholder?) and level 3 (wired — is the file imported and used?) catch the failures that actually matter.

### How to adapt it

**Stage 4 (Sessions) and Stage 5 (Session Generation):** After the session-generator writes files, the current post-write check verifies vocabulary compliance only. A goal-backward check would start from the observable truth ("a facilitator could run this session without additional preparation") and work backward:

- **Truth level:** Does the session cover all outcomes assigned to this module? Does the duration add up? Does the reflection prompt reference specific session content?
- **Artifact level:** Does every written file contain substantive content, not just schema structure with placeholder values? (Check for empty `prompt_text` fields, generic `application_scenario` text, slide outlines with only titles and no facilitator notes.)
- **Wiring level:** Do the outcome IDs in the session match the outcomes assigned to this module in the module spec? Does the assessment referenced in the session exist in `02-assessments/`?

**Stage 8 (Validation):** The validator already checks many of these things — but it runs as a separate step, potentially in a different context window. The goal-backward check at write time catches failures before they multiply across 20+ files.

**Key principle to adopt:** "Task completion does not equal goal achievement." This exact framing should appear in the session-generator agent instructions.

---

## Pattern 2: Pre-Execution Plan Verification (Plan-Checker Agent)

### What GSD does

Before any plan executes, the plan-checker verifies it across 8 dimensions:

1. **Requirement coverage** — Every requirement has tasks addressing it
2. **Task completeness** — Every task has Files + Action + Verify + Done
3. **Dependency correctness** — No cycles, valid references, consistent wave assignments
4. **Key links planned** — Artifacts are wired together, not just created in isolation
5. **Scope sanity** — Tasks per plan within context budget (2-3 tasks target, 5+ is a blocker)
6. **Verification derivation** — Must-haves are user-observable, not implementation-focused
7. **Context compliance** — Plans honor locked user decisions, exclude deferred ideas
8. **Nyquist compliance** — Every task has automated verification

The plan-checker runs in a loop with the planner: checker finds issues, planner revises, checker re-checks, up to 3 iterations. Plans do not proceed to execution until the checker passes them.

### Why it works

This catches plan-level failures before they consume execution context. A plan with 5 tasks and 12 files will degrade in quality during execution — the plan-checker catches this before the executor starts. A plan that creates components in isolation without wiring tasks will produce orphaned code — the checker catches this from the key_links dimension.

The revision loop is critical: it is not just a gate that stops bad plans, it is a feedback mechanism that fixes them. The planner gets specific structured issues with `fix_hint` fields, not vague "try again" instructions.

### How to adapt it

**Curriculum pipeline equivalent: Schema validation before generation.** Before sessions.md dispatches session-generator Tasks, validate the inputs:

- **Module spec completeness** — Every module spec has all required fields populated with substantive content (not "TBD" or empty strings)
- **Outcome coverage** — Every outcome assigned to this module has a corresponding assessment in `02-assessments/`
- **Scope check** — Module outcome count is within the range that a single session can meaningfully address (flag modules with 8+ outcomes for splitting)
- **Cross-reference integrity** — Every outcome ID in the module spec exists in `01-outcomes/learning-objectives.md`

This is the "intra-stage pre-check" pattern identified in the research-agent audit, but GSD's plan-checker shows a more complete implementation: structured issue format, specific fix hints, iterative revision loop, severity-based blocking.

**Specific adaptation for the intake command:** The audit mode intake (INTK-07 through INTK-12) makes mode assignment decisions based on content_quality scores. Before proceeding to generation, verify that the mode assignments are consistent with the actual source material quality — a plan-checker pattern applied to intake output.

---

## Pattern 3: Executor Self-Check After Completion

### What GSD does

The executor has an explicit `<self_check>` section that runs after writing SUMMARY.md:

1. Check that every file listed in the summary actually exists on disk
2. Check that every commit hash listed in the summary exists in git history
3. Append a `## Self-Check: PASSED` or `## Self-Check: FAILED` section to the summary
4. **Do NOT proceed to state updates if self-check fails**

This is separate from and earlier than the verifier — the executor checks its own claims before reporting them as done.

### Why it works

The model often writes summaries that describe intended work rather than actual work. A file path might be wrong. A commit might have failed silently. The self-check forces the executor to verify its own claims against the filesystem and git, using deterministic checks (file existence, git log grep) rather than relying on memory of what it did.

The "do not proceed if failed" instruction is the enforcement mechanism. Without it, the self-check would be informational — the model would note the failure and continue anyway. By blocking state updates on self-check failure, the pattern creates a hard gate.

### How to adapt it

**Session-generator agent:** After writing the 4 files for a session, verify:

1. All 4 files exist at the expected paths
2. Each file is non-empty and contains expected structural markers (the slide outline has `## Slide` sections, the facilitator guide has `## Duration` or equivalent)
3. The outcome IDs referenced in the session files exist in the source module spec (read the module spec and cross-check)

**Append a self-check result to the completion signal.** The orchestrator (sessions.md) should check this field before marking the module as complete. If self-check fails, the session-generator reports failure to the orchestrator instead of silently continuing.

**State management pattern:** The GSD executor updates STATE.md only after self-check passes. Apply this to the curriculum builder: the stage status in STATE.md should only transition to `complete` after a verification check confirms the outputs exist and pass minimum integrity checks. Currently, stage completion is set by the command that runs the stage — adding a post-stage self-check before the state transition would catch cases where generation appeared to succeed but produced incomplete output.

---

## Pattern 4: Atomic Commits Per Task with Deviation Tracking

### What GSD does

Every task gets its own commit immediately after completion. The commit protocol:

1. `git status --short` to see what changed
2. Stage files individually (never `git add .` or `git add -A`)
3. Commit with typed prefix (`feat`, `fix`, `test`, `refactor`, `chore`) and phase/plan scope
4. Record the commit hash for the summary

Deviations from the plan are tracked with explicit rules:
- **Rule 1-3 (auto-fix):** Bugs, missing critical functionality, blocking issues — fix inline, no permission needed, but track as deviation
- **Rule 4 (ask):** Architectural changes — STOP, return checkpoint, require user decision
- **Scope boundary:** Only fix issues caused by the current task. Pre-existing issues go to `deferred-items.md`
- **Fix attempt limit:** After 3 auto-fix attempts on a single task, STOP fixing, document remaining issues, continue to next task

### Why it works

Per-task commits create an audit trail. If something breaks, you can identify which task introduced the problem. The deviation rules prevent two failure modes: (a) the executor silently ignoring problems it discovers, and (b) the executor going down a rabbit hole trying to fix every problem it finds.

The fix attempt limit is particularly important — without it, the executor can spend its entire context budget on a single blocking issue, leaving no capacity for remaining tasks.

### How to adapt it

**Curriculum builder does not produce code, so git commits are not directly applicable.** But the deviation tracking and fix attempt limit patterns are highly relevant.

**Deviation tracking for session generation:** When the session-generator encounters a problem (an outcome that does not fit a session's duration, an assessment that cannot be naturally embedded, a module with too many outcomes for a single session), it should:
- Document the deviation in its completion signal
- Distinguish between auto-resolved deviations (rebalanced duration) and blocking deviations (cannot fit outcomes — module needs splitting)
- The orchestrator (sessions.md) should aggregate deviations and surface blocking ones to the user

**Fix attempt limit for validation:** When `/curriculum:validate` finds failures, the current pattern is to report them and let the user decide. But if a future auto-fix pattern is added (where the validator suggests and applies corrections), the GSD fix attempt limit pattern should be adopted: try to fix a validation failure up to 3 times, then escalate to the user with the specific failure and attempted fixes.

**Analysis paralysis guard:** GSD has an explicit guard: "If you make 5+ consecutive Read/Grep/Glob calls without any Edit/Write/Bash action, STOP." This would benefit the curriculum builder's research-intensive stages (intake, outcomes) where the model can spiral into re-reading source material without producing output.

---

## Pattern 5: State Survives Context Clears

### What GSD does

STATE.md is the sole source of truth for execution position. It tracks:
- Current phase and plan
- Progress metrics (total plans, completed, percentage)
- Accumulated decisions (logged as they happen)
- Performance metrics (duration, task count, file count per plan)
- Blockers and concerns
- Session continuity (last session timestamp, stopped-at position, resume file)

After every plan completion, the executor updates STATE.md with position, decisions, metrics, and session info — using tooling (`gsd-tools.cjs`) that handles edge cases like last-plan detection and progress recalculation.

The commands reference `@` files for context (PLAN.md, SUMMARY.md, VERIFICATION.md) so a fresh context window has access to the same information without conversation history.

SUMMARY.md files capture per-plan results: what was done, deviations, decisions, metrics, key files, dependencies. These are the handoff artifacts between context windows.

### Why it works

Context clears are structurally necessary (GSD explicitly recommends them between phases). Without robust state persistence, each context window starts from scratch and the model has to reconstruct position by reading files — which it may do incorrectly or incompletely.

The combination of STATE.md (position + decisions + blockers) and SUMMARY.md (per-plan results + deviations) means that any context window can reconstruct the full execution history without conversation memory.

### How to adapt it

**The curriculum builder already has STATE.md and the session-start hook reads it.** The gap is in granularity and accumulated decisions.

**Specific improvements:**

1. **Per-stage decisions in STATE.md:** When the model makes a judgment call during generation (e.g., splitting a module's outcomes across sessions differently than the module spec suggested, choosing a specific assessment format over another), log it in STATE.md. Currently, these decisions live only in conversation history and are lost on context clear.

2. **Resume position at sub-stage granularity:** STATE.md tracks which stage is current, but not which module or session within that stage. If session generation is interrupted after completing 3 of 5 modules, the resume state should indicate "Module 3 of 5 complete" so the next context window does not regenerate modules 1-3.

3. **Completion summaries per stage:** GSD writes SUMMARY.md after every plan. The curriculum builder should write a brief stage summary after each stage completes — what was generated, how many files, any deviations from the intake brief, any judgment calls. This becomes the handoff artifact for the next stage.

---

## Pattern 6: Integration Checking Across Phases

### What GSD does

The integration-checker verifies cross-phase connections at three levels:

1. **Export/Import map** — Phase 1 exports `getCurrentUser`, Phase 3 imports and calls it? Not just imported but actually used?
2. **API coverage** — Every API route has at least one consumer. Routes with no callers are flagged as orphaned.
3. **E2E flow tracing** — Full path traces: Form -> API -> DB -> Response -> Display. Break at any point = broken flow.

The integration-checker's core principle: "Individual phases can pass while the system fails." Existence is phase-level. Connection is integration-level.

The Requirements Integration Map ties every finding back to specific requirement IDs, and flags requirements with no cross-phase wiring.

### Why it works

Each stage of a pipeline can be internally correct but disconnected from the stages around it. The curriculum builder's stages produce outputs consumed by downstream stages — outcomes feed assessments, assessments feed modules, modules feed sessions, sessions feed transfer design. If any link breaks (a session references an outcome that was removed during module scoping), the final product fails even though each stage passed its own checks.

### How to adapt it

**Cross-stage wiring checks for the curriculum pipeline:**

| From Stage | To Stage | What to Check |
|-----------|----------|---------------|
| Outcomes (1) | Assessments (2) | Every outcome has at least one assessment. Every assessment references a valid outcome. |
| Assessments (2) | Modules (3) | Module specs reference assessments that exist. Assessment coverage is complete (no orphaned assessments). |
| Modules (3) | Sessions (4/5) | Session outcome lists match module spec assignments. No outcomes dropped or added silently. |
| Sessions (4/5) | Transfer (6) | Transfer activities reference actual session content, not generic templates. |
| Sessions (4/5) | Metaskills (7) | Metaskill connections reference actual activities from sessions, not theoretical ones. |
| All stages | Marketing (8) | Marketing claims are traceable to curriculum elements that actually exist in the generated output. |

**Implementation approach:** A lightweight integration check that runs before the `approve` gate (or as part of `/curriculum:validate`) and traces the cross-stage links. Not a full re-verification of every file — just a wiring check that confirms the IDs and references connect.

The existing validation (T1-02 through T1-18) covers some of this, but it runs per-file rather than tracing full paths. A path-based check would catch the case where every individual file passes its own checks but the chain of references is broken.

---

## Pattern 7: Structured Deviation Handling with Scope Boundaries

### What GSD does

The executor has a four-rule deviation system with explicit priority:

1. **Rule 4 (architectural changes):** STOP, ask user — triggers on new DB tables, framework changes, breaking API changes
2. **Rules 1-3 (auto-fix):** Fix bugs, add missing critical functionality, fix blocking issues — no permission needed
3. **Scope boundary:** "Only auto-fix issues DIRECTLY caused by the current task's changes. Pre-existing warnings, linting errors, or failures in unrelated files are out of scope."
4. **Deferred items log:** Out-of-scope discoveries go to `deferred-items.md`, not into the current task

The scope boundary is the critical piece. Without it, the executor would fix everything it finds, consuming context budget on pre-existing issues while neglecting its actual plan.

### Why it works

Deviation handling addresses the tension between "be thorough" and "stay on task." The model's natural tendency is to fix everything it sees, which leads to context exhaustion on tangential issues. The explicit scope boundary — only fix issues caused by the current task — gives the model a decision rule that it can apply without judgment.

The deferred items log prevents the other failure mode: silently ignoring problems. Every discovered issue gets documented somewhere, even if it is not fixed now.

### How to adapt it

**During session generation:** When the session-generator encounters inconsistencies in upstream artifacts (an outcome that seems misleveled, an assessment that does not match its paired outcome), it currently has two options: fix it silently (wrong — changes upstream artifacts) or ignore it (wrong — produces inconsistent sessions).

The GSD deviation model provides a third option: **document and continue.** The session-generator should:
- Generate the session based on the inputs as given
- Log the inconsistency in its completion signal (equivalent to `deferred-items.md`)
- The orchestrator aggregates these and surfaces them after generation completes

This prevents the session-generator from going down a rabbit hole trying to resolve upstream issues, while ensuring the issues are captured for the user to address.

**During intake (audit mode):** When evaluating source material, the curriculum-auditor may find content that is technically present but pedagogically misaligned (e.g., a training module that teaches theory but claims to teach application). The deviation model should distinguish between:
- **Content that is missing** (straightforward gap — flag and proceed)
- **Content that exists but is misaligned** (judgment call — document with reasoning, do not silently downgrade)
- **Structural problems in the source** (scope boundary — log for user, do not try to fix the source material)

---

## Pattern 8: Nyquist Validation (Automated Verification at Every Task)

### What GSD does

Every task must have an `<automated>` verification command. The plan-checker enforces this (Dimension 8), and the nyquist-auditor fills gaps retroactively by generating behavioral tests.

The "Nyquist Rule" from the planner: "Every `<verify>` must include an `<automated>` command. If no test exists yet, set `<automated>MISSING</automated>` and create a Wave 0 task that generates the test scaffold."

The sampling continuity check ensures no window of 3 consecutive implementation tasks goes without automated verification.

### Why it works

Manual verification ("looks right") degrades as context fills. The model becomes less attentive to details as it approaches context limits. Automated verification (run a command, check the output) is context-independent — it produces the same result whether the model is at 10% or 90% context usage.

The Nyquist metaphor is from signal processing: you need to sample at twice the frequency of the signal to reconstruct it. In execution terms: you need to verify at least every other task to maintain confidence in the overall result.

### How to adapt it

**The curriculum builder does not produce code, so automated test commands do not directly apply.** But the principle — "verification that does not degrade with context" — is transferable.

**Automated checks for curriculum output:**

1. **Schema compliance** — After writing a session file, run a structural check: does the YAML/markdown have all required fields? Are required fields non-empty? This can be a simple script or a schema validator.
2. **Cross-reference check** — After writing a session, verify that referenced IDs exist in upstream files. This is a deterministic file read + string match, not a judgment call.
3. **Duration arithmetic** — After writing session components, verify that component durations sum to the stated total. Pure arithmetic.
4. **Vocabulary scan** — Already implemented (post-write vocabulary check). Extend to cover more patterns: schema field names, instructional design jargon, internal identifiers.

These are not unit tests, but they serve the same function: verification that produces a deterministic result regardless of context saturation. The session-generator's post-write check should run all four, not just the vocabulary scan.

---

## Summary: Priority Adaptations for Curriculum Builder

Ordered by expected impact on the "instructions exist but aren't followed at runtime" problem:

| # | Pattern | GSD Mechanism | Curriculum Adaptation | Effort | Impact |
|---|---------|---------------|----------------------|--------|--------|
| 1 | Goal-backward verification | Verifier checks goals, not tasks; 3-level artifact check (exists/substantive/wired) | Session-generator checks that sessions achieve module goals, not just that files were created. Add substantive content checks (not just file existence). | Medium | High |
| 2 | Pre-execution validation loop | Plan-checker verifies 8 dimensions before execution; iterates with planner up to 3x | Validate module spec completeness and cross-reference integrity before dispatching session-generator Tasks. Block generation on invalid inputs. | Medium | High |
| 3 | Executor self-check | File existence + commit hash verification before state update; blocks progress on failure | Session-generator verifies its own output files exist and contain expected structure before reporting success. Stage status only advances after self-check passes. | Low | High |
| 4 | Scope boundary + deferred items | Only fix issues caused by current task; log everything else to deferred-items.md | Session-generator documents upstream inconsistencies in completion signal instead of silently ignoring or attempting to fix. Orchestrator aggregates and surfaces. | Low | Medium |
| 5 | State at sub-stage granularity | STATE.md tracks exact plan position; SUMMARY.md per plan; resume from precise point | Track which modules/sessions are complete within a stage. Write per-stage summaries. Enable resume after context clear without regenerating completed work. | Medium | Medium |
| 6 | Cross-stage integration check | Integration-checker traces full paths: export -> import -> use; flags orphaned and unwired artifacts | Add a wiring check that traces ID references across all stages before the approve gate. Catch chains that break even when individual files pass. | Medium | Medium |
| 7 | Automated verification at every task | Nyquist rule: every task has an automated verify command; no 3-task gap without verification | Add deterministic checks after every session write: schema compliance, cross-reference validity, duration arithmetic, vocabulary scan. | Low | Medium |
| 8 | Structured deviation handling | 4-rule hierarchy with scope boundary, fix attempt limit (3), deferred items log | Define deviation rules for session generation: what the generator can auto-resolve vs. what it must escalate. Add fix attempt limit for validation auto-correction. | Low | Low-Medium |

---

## Key Architectural Insight

The GSD system achieves execution fidelity through **separation of concerns across agents with different optimization targets:**

- The **planner** optimizes for completeness and specificity
- The **plan-checker** optimizes for finding gaps (adversarial to the planner)
- The **executor** optimizes for task completion
- The **verifier** optimizes for goal achievement (adversarial to the executor)
- The **integration-checker** optimizes for cross-phase connections (adversarial to phase-level thinking)

Each agent has a different persona and different success criteria. The planner and plan-checker iterate. The executor and verifier iterate (via gap closure plans). No agent trusts another agent's claims — the verifier explicitly distrusts SUMMARY.md, and the plan-checker explicitly distrusts task names.

**The curriculum builder partially implements this pattern** — the session-generator and validator have different roles, and the validator does not trust the generator's claims. But the iteration loop is manual (user runs validate, reads report, decides what to do). GSD's loop is automated: verify -> create gap closure plans -> execute -> re-verify, with up to 3 iterations before escalating to human.

The highest-leverage adaptation would be to close this loop: when validation finds failures, automatically generate targeted fix instructions for the session-generator and re-run generation for the affected sessions only, then re-validate. This is the plan-checker/planner revision loop applied to content generation.

---

## Files Referenced

**GSD (source of patterns):**
- `~/.claude/agents/gsd-executor.md` — execution flow, deviation rules, self-check, state updates
- `~/.claude/agents/gsd-verifier.md` — goal-backward verification, 3-level artifact checks, stub detection
- `~/.claude/agents/gsd-planner.md` — task anatomy, scope estimation, dependency graphs
- `~/.claude/agents/gsd-plan-checker.md` — 8-dimension pre-execution validation, revision loop
- `~/.claude/agents/gsd-integration-checker.md` — cross-phase wiring, E2E flow tracing
- `~/.claude/agents/gsd-nyquist-auditor.md` — automated verification gap filling
- `~/.claude/commands/gsd/execute-phase.md` — wave-based parallel execution orchestrator
- `~/.claude/commands/gsd/plan-phase.md` — research -> plan -> verify -> done flow
- `~/.claude/commands/gsd/validate-phase.md` — retroactive Nyquist validation
- `~/.claude/commands/gsd/verify-work.md` — conversational UAT with auto-diagnosis
- `~/.claude/commands/gsd/audit-milestone.md` — cross-phase integration audit

**Curriculum builder (adaptation targets):**
- `.claude/plugins/curriculum/agents/session-generator.md` — primary target for patterns 1, 3, 4, 7
- `.claude/plugins/curriculum/commands/sessions.md` — target for patterns 2, 5
- `.claude/plugins/curriculum/commands/validate.md` — target for patterns 6, 8
- `.claude/plugins/curriculum/commands/approve.md` — target for pattern 6 (integration check before gate)
- `.claude/plugins/curriculum/commands/intake.md` — target for pattern 4 (deviation handling in audit mode)
- `.planning/STATE.md` — target for pattern 5 (sub-stage granularity)
