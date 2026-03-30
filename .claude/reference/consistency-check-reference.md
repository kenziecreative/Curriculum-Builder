# Consistency Check Reference

This document defines the consistency check logic that stage commands load before running cross-stage checks. Load this reference alongside `audit-trail-format.md` and `alignment-check-reference.md` when implementing or reviewing draft audit logic.

---

## 1. Purpose and Scope

Consistency verification confirms that output across pipeline stages does not contradict itself — time allocations match, prerequisites are honored, and marketing claims trace to measured outcomes.

**When it runs:** After the alignment check passes (or after the alignment check is skipped when no source material exists). It is the final check in the draft audit sequence. Uses the same 3-attempt retry with cumulative constraints pattern.

**What it checks against:** `curriculum-registry.json` is the canonical source for all consistency comparisons. Stage files are checked against registry data, and against each other where cross-stage relationships exist.

**When it is skipped:** Each per-stage check is skipped if the upstream stage it checks against has not been generated yet. The check is also skipped for stages with no per-stage consistency rules (see Section 2). The final gate sweep runs all checks regardless.

---

## 2. Per-Stage Consistency Checks

Only stages with cross-stage dependencies get per-stage consistency checks. Stages 2, 3, 4, 6, and 7 do not get per-stage consistency checks — their cross-stage relationships are fully covered by the final gate sweep and by existing registry consistency checks. Do not add consistency check logic to those stage commands.

| Stage | Checks that run |
|-------|-----------------|
| Stage 5: Sessions | Time math vs module specs, prerequisite ordering, outcome ID coverage |
| Stage 8: Marketing | Claim-to-assessment chain (claim → outcome ID → assessment exists) |
| Final Gate (approve) | Full sweep: all per-stage checks + outcome ID bidirectional trace + assessment link trace + module reference trace + registry-file drift |

---

## 3. Session-to-Module Consistency (XSTAGE-01)

These three checks run after Stage 5 (Sessions) completes, as part of that stage's draft audit. Skip each check if the Stage 4 (Modules) directory does not exist — mark as pending, not failed.

### 3a. Time Math

For each module, sum the session durations from all session files in that module's session directory. Compare against the module spec's allocated hours from `curriculum-registry.json` under `time_allocations.modules[].hours`.

On mismatch:

- **Severity:** BLOCKING
- **Report format:** Table showing each mismatched module

| Module | Module Spec Hours | Session Total Hours | Difference |
|--------|------------------|---------------------|------------|
| {Module Name} | {from registry} | {summed from session files} | {+ or – N hours} |

- **Fix paths:** Always show both options — the SME picks the direction:
  1. Run `/curriculum:modules` to update the module spec to match the session total
  2. Run `/curriculum:sessions` to regenerate sessions within the module's allocated budget

The tool does not decide which direction is correct. Present both options and let the SME choose.

---

### 3b. Prerequisite Ordering

For each session, check if it references outcomes from a module that comes later in the prerequisite chain.

**How to check:** Read `prerequisite_modules` from each module spec. If Session X in Module A references an outcome ID that belongs to Module B (as identified in the registry), and Module A does not list Module B as a prerequisite, flag as a prerequisite ordering violation.

This checks ordering violations only — not implicit knowledge gaps or conceptual dependencies not encoded in the registry.

- **Severity:** BLOCKING
- **Report format:**

| Session | References Outcome | Outcome Belongs To | Why It's a Problem |
|---------|-------------------|-------------------|-------------------|
| {session file path} | {outcome ID} | {Module N} | {Module containing session} does not list {Module N} as a prerequisite |

---

### 3c. Outcome ID Coverage

For each module, verify that every outcome ID listed in the module spec appears in at least one session within that module. An outcome assigned to a module but never taught in any session is a coverage gap.

- **Severity:** BLOCKING
- **Report format:** List of uncovered outcomes with their module assignment

This is the per-stage version of the approve gate's orphaned outcome check, scoped to the sessions-to-modules relationship within each module boundary.

---

## 4. Marketing Claim Tracing (XSTAGE-02)

This check runs after Stage 8 (Marketing) completes, as part of that stage's draft audit. Skip if Stage 2 (Outcomes) or Stage 3 (Assessments) have not been generated — mark as pending.

Phase 28 alignment checks enforce that every marketing claim links to an outcome ID in the registry. This check verifies the next link in the chain: the linked outcome ID must have at least one assessment in `curriculum-registry.json` under `assessment_criteria.assessments[].linked_outcomes`.

**Strictness:** This is structural verification — outcome ID linkage, not semantic matching. Marketing is permitted to use emotional and aspirational language. The check does not compare marketing wording against source material (that is the alignment check's job). It verifies only that the structural chain is intact: claim → outcome ID → assessment.

If a marketing claim links to an outcome that has no assessment:

- **Severity:** BLOCKING
- **Report format:** One row per broken claim

| Marketing Claim | Linked Outcome ID | Problem |
|----------------|------------------|---------|
| "{claim text}" | {outcome ID} | No assessment measures this outcome |

Full message: "Marketing promises '{claim text}' via outcome {ID}, but no assessment measures that outcome."

---

## 5. Final Gate Sweep

The approve gate runs a comprehensive sweep that includes all per-stage checks plus the existing cross-stage integration logic. This replaces the inline Cross-Stage Integration Check in `approve/SKILL.md` lines 123–159. The approve gate loads this reference instead of maintaining its own inline logic.

The sweep runs whether or not per-stage checks passed — it re-runs all checks against the current state of all files.

### 5a. Per-stage checks (re-run)

Run all checks from Sections 3 and 4 against the full set of generated stages.

### 5b. Outcome ID bidirectional trace

- **Forward:** For every outcome ID in the registry (`outcome_wording.program_outcomes` and `outcome_wording.module_outcomes`), verify it appears in at least one assessment's `linked_outcomes` (Stage 3), at least one module's `learning_objectives` (Stage 4), and at least one session's content (Stage 5). An outcome that exists in the registry but is never assessed, never taught in a session, or never assigned to a module is an orphaned outcome — BLOCKING.
- **Backward:** For every outcome ID referenced in assessments, modules, or sessions, verify it exists in the registry's `outcome_wording`. An ID in a downstream stage that is not in the registry is a broken reference — BLOCKING.
- For stages not yet generated: mark as "Pending — Stage N not yet generated" — not a failure.

### 5c. Assessment link bidirectional trace

- **Forward:** For every assessment in `assessment_criteria.assessments`, verify its `linked_outcomes` references real outcome IDs in the registry.
- **Backward:** For every outcome ID in the registry, verify at least one assessment links to it. An outcome with no assessment is an uncovered outcome — BLOCKING.
- For stages not yet generated: mark as pending.

### 5d. Module reference trace

- **Forward:** For every module in `time_allocations.modules`, verify it has a corresponding module spec directory (Stage 4) and session directories (Stage 5). A module in the registry with no files is a phantom module — BLOCKING.
- **Backward:** For every module directory that exists on disk, verify it has a corresponding entry in the registry. A directory with no registry entry is an unregistered module — BLOCKING.
- Verify `prerequisite_modules` in module specs point to real module IDs. A prerequisite that references a non-existent module is a broken dependency — BLOCKING.
- For stages not yet generated: mark as pending.

### 5e. Registry-file drift detection

After all traces, compare registry data against actual stage files for content discrepancies (e.g., outcome statement in registry differs from outcome statement in `01-outcomes/` files). Report drift as a WARNING — not blocking. The registry is authoritative per the Phase 19 "registry wins" principle. The SME decides whether the stage file wording matters.

### Result classification

| Finding | Severity |
|---------|----------|
| Broken references (ID in one stage but not another where it should be) | BLOCKING |
| Orphaned outcomes (defined but never used downstream) | BLOCKING |
| Phantom or unregistered modules | BLOCKING |
| Registry-file drift | WARNING |
| Pending (stage not yet generated) | INFORMATIONAL — not a failure |

---

## 6. Contradiction Report Format (XSTAGE-04)

This report is displayed in the conversation during the draft audit. It is not written to any output file — consistency issues go to the audit trail only.

Reports are grouped by contradiction type to make batch-fixing easier.

```
### Consistency Check Results

**Status:** PASS / FAIL ({N} issues found)

{For each contradiction type that has issues:}

**{Type}: {e.g., Time Mismatch / Prerequisite Violation / Uncovered Outcome / Unverifiable Marketing Claim}**

| Source | Says | File |
|--------|------|------|
| {canonical source, e.g., "Module 2 spec"} | {value from source, e.g., "6 hours"} | {file path} |
| {conflicting source, e.g., "Sessions total"} | {conflicting value, e.g., "8 hours"} | {file path(s)} |

{Fix guidance for this type}
```

Plain language throughout. No internal codes or check IDs. Written to be understood by someone without instructional design vocabulary — both the stage agent and the SME read this if escalation occurs.

**Time Mismatch fix guidance:** "Module {N} spec allocates {Y} hours but session files total {X} hours. Run `/curriculum:modules` to update the module spec to match, or run `/curriculum:sessions` to regenerate sessions within {Y} hours."

**Prerequisite Violation fix guidance:** "Session {path} references outcome {ID} from {Module M2}, but {Module M1} does not list {M2} as a prerequisite. Restructure the session to not depend on that outcome, or update the module structure to add the prerequisite."

**Uncovered Outcome fix guidance:** "Outcome {ID} is assigned to {Module N} but no session in that module teaches it. Regenerate sessions with explicit coverage for this outcome."

**Unverifiable Marketing Claim fix guidance:** "The claim '{text}' links to outcome {ID} via your registry, but no assessment measures that outcome. Add an assessment for outcome {ID} (run `/curriculum:assessments`) or remove the claim."

---

## 7. Retry Constraint Format

Same cumulative constraints pattern as `alignment-check-reference.md` Section 7. Each failed attempt adds its issues to the running list. Issues from attempt 1 carry into attempt 2; issues from attempts 1 and 2 carry into attempt 3.

```
The previous draft had these consistency issues that must be corrected:

- {Issue type}: {specific instruction}
- {Repeat for each issue}

Regenerate with these specific corrections. All other content can remain the same.
```

**Per-issue instruction format:**

- **Time mismatch:** "Total session time for Module {N} is {X} hours but module spec allocates {Y} hours. Adjust session durations to fit within {Y} hours."
- **Prerequisite violation:** "Session {S} references outcome {ID} from Module {M2}, but Module {M1} does not list {M2} as a prerequisite. Either remove the reference or restructure the session to not depend on that outcome."
- **Coverage gap:** "Outcome {ID} is assigned to Module {N} but no session teaches it. Add coverage for this outcome in at least one session."
- **Unverifiable claim:** "Marketing claim '{text}' links to outcome {ID}, but no assessment measures that outcome. Remove the claim or ensure an assessment for outcome {ID} exists before regenerating marketing."

**Key rule:** Each instruction tells the agent exactly what to preserve or remove — not just that an issue exists. Vague instructions ("be more careful about consistency") are not sufficient.

---

## 8. Integration Pattern

**Sequence:** Consistency check runs after the alignment check (or after the check that would precede alignment, if alignment is skipped). It is the final check in the draft audit sequence for stages that have per-stage consistency rules.

**Retry behavior:** Same 3-attempt retry with cumulative constraints as alignment check failures. Issues from earlier attempts accumulate.

**Auto-fix rule:** Consistency issues are never auto-fixable. They require re-generation of the current stage (and in some cases an upstream stage). This is consistent with the existing auto-fix boundary — only vocabulary, registry defaults, and outcome drift are auto-fixable.

**Escalation:** Same pattern as alignment — plain language, draft stays in `_drafts/`, specific issues listed so the SME knows exactly what to fix manually.

**Trail write:** The Consistency Check subsection in the audit trail is written only after the check passes. If the check is skipped (upstream stages absent), the subsection is omitted. If the check never passes and the stage escalates, the subsection is not written.

**Parallel structure with alignment:** This document follows the same integration pattern as `alignment-check-reference.md`. Stage commands that load alignment-check-reference.md for alignment checks load this document for consistency checks using the same mechanism.
