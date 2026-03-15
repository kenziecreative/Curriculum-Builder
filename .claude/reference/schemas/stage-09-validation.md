# Stage 09: Validation Schema

**Stage:** 09 — Validation
**Command:** `/validate`
**depends_on:** stage-01-intake, stage-02-outcomes, stage-03-assessments, stage-04-modules, stage-05-sessions, stage-06-metaskills, stage-07-transfer, stage-08-marketing
**output_dir:** `08-validation/`

> This stage runs in a SEPARATE agent call from any generation stage. Generation and validation must NEVER occur in the same agent call. The validation agent reads completed stage output and produces reports only — it does not modify any stage output files.

---

## Output Files

- `schema-report.md` — Tier 1 and Tier 2 results
- `rubric-report.md` — Tier 2 confidence scores with evidence
- `human-review-checklist.md` — Tier 3 items for human reviewer

---

## Three-Tier Validation Structure

Validation is organized into three tiers: `tier_1` (automated schema checks), `tier_2` (rubric-based scoring), and `tier_3` (human review items).

### Tier 1 — Automated Schema Checks

**Purpose:** Verify required fields are present and populated, enums use valid values, and cross-stage linking is intact.

**Output format:** Pass/Fail/Warning per check. Tier 1 checks are blocking gates — a curriculum package with Tier 1 failures is not considered complete.

**Completion threshold:** > 95% of required fields must be populated and valid to pass Tier 1.

Each Tier 1 check record has the following fields:

| Field | Type | Description |
|---|---|---|
| `check_id` | string | Unique identifier for this check (e.g., "T1-01") |
| `field_name` | string | The specific field being checked |
| `stage` | string | Which pipeline stage this field belongs to (e.g., "stage-02") |
| `file` | string | The specific output file where this field should appear |
| `expected_type` | string | The expected data type or enum constraint |
| `actual_value` | string | What was found (or "MISSING" if not present) |
| `status` | enum | See Enumerated Values |
| `failure_message` | string | Specific description of the failure — must include stage, file, and field location. Required when status is "fail" |

#### Tier 1 Required Checks

The following checks must run as part of every Tier 1 validation:

**Stage 02 checks:**
- T1-01: Every objective has `bloom_level` field populated with a valid enum value
- T1-02: Every objective has a `paired_assessment` reference pointing to stage-03 output
- T1-03: Every objective has a `transfer_context` field
- T1-04: Every objective has a `prerequisite_knowledge` field
- T1-05: Program spans at least 4 Bloom's taxonomy levels (aggregate across all objectives)

**Stage 03 checks:**
- T1-06: Every assessment has `paired_objective` referencing a stage-02 objective by ID
- T1-07: Assessment `bloom_level` is >= paired objective `bloom_level`
- T1-08: At least one formative assessment per module
- T1-09: At least one summative assessment at program level (for programs > 2 hours)
- T1-10: Open-skill curricula have at least one performance-based assessment

**Stage 04 checks:**
- T1-11: Every module has `social_learning` object with all 4 sub-fields
- T1-12: `social_learning.activity_type` is a valid enum value
- T1-13: `social_learning.interdependence_structure` is populated (not generic)
- T1-14: Every module has `belief_challenging_encounter` field
- T1-15: Module `prerequisite_modules` form a valid DAG (no circular dependencies)

**Stage 05 checks:**
- T1-16: Every session has all 8 TMA arc fields: `prior_knowledge_activation`, `learning_objectives`, `content_chunks`, `formative_check`, `guided_practice`, `independent_practice`, `reflection_prompt`, `transfer_connection`
- T1-17: `reflection_prompt` is not a generic phrase (must not match patterns: "what did you learn?", "what was your takeaway?", "any questions?")
- T1-18: `transfer_connection` references real-work context from stage-01 `transfer_context`

**Stage 06 checks:**
- T1-19: Every metaskill mapping has `activation_activity` with a named thinking routine (not a generic descriptor)
- T1-20: All six metaskills activated across program (relaxed for programs < 2 hours)
- T1-21: Developability hierarchy satisfied: first `Innovating` activation has higher `sequence_position` than at least one `Exploring` AND one `Creating` activation
- T1-22: Same hierarchy check for `Adapting`
- T1-23: No single metaskill accounts for > 30% of total activations (for programs > 2 hours)
- T1-24: `evidence_gap_acknowledgment` is `true` for any `Imagining` metaskill record

**Stage 07 checks:**
- T1-25: All three transfer layers present (`pre_program`, `in_program`, `post_program`)
- T1-26: `implementation_intentions` has at least one record per module
- T1-27: `error_management_practice` present when stage-01 `skill_type` is "open"
- T1-28: `spaced_retrieval_prompts` count matches `spaced_retrieval_schedule` interval count
- T1-29: `evaluation_design.kirkpatrick_level` meets minimum for program type and claims made
- T1-30: `community_continuation_design.continuation_platform` is not empty or "TBD"

**Stage 08 checks:**
- T1-31: Every marketing element has `source_citation` referencing a specific curriculum element
- T1-32: Every marketing element has `curriculum_traceability.supporting_element` that exists in stage output
- T1-33: Marketing word count < 25% of total curriculum content word count

---

### Tier 2 — Rubric-Based Scoring

**Purpose:** Assess qualitative dimensions of curriculum quality using confidence scores. These are NOT blocking gates — they inform human review, not pass/fail.

**Output format:** Confidence scores (0.0–1.0) per dimension with evidence and recommendation.

Each Tier 2 record has the following fields:

| Field | Type | Description |
|---|---|---|
| `dimension_name` | enum | The quality dimension being scored |
| `score` | float | Confidence score 0.0–1.0 (not pass/fail) |
| `evidence` | string | Specific examples from curriculum output that informed this score |
| `recommendation` | string | What a human reviewer should look for or strengthen |

#### Tier 2 Dimensions

| Dimension | `dimension_name` value | What is being scored |
|---|---|---|
| Cognitive Load Appropriateness | `cognitive_load_appropriateness` | Are content chunks sized for the audience's expertise level? Does the curriculum avoid overloading novice learners? |
| Scaffolding Coherence | `scaffolding_coherence` | Does the difficulty progression across modules make sense? Are prerequisite concepts taught before they are needed? |
| Transfer Realism | `transfer_realism` | How likely is it that participants will actually apply this learning in their real work? Are transfer elements specific and contextualized? |
| Social Learning Quality | `social_learning_quality` | Does social learning involve genuine interdependence? Are accountability structures specific and likely to function? |
| Belief-Challenging Quality | `belief_challenging_quality` | Do belief-challenging encounters actually surface and test assumptions? Or are they superficial "think about this" prompts? |

**Scoring guidance:**
- `0.0–0.3` → Low confidence; significant concern; flag for human review
- `0.4–0.6` → Moderate confidence; notable gaps but functional
- `0.7–0.9` → High confidence; minor refinements possible
- `1.0` → Exceptionally strong evidence across all dimensions

---

### Tier 3 — Human Review Items

**Purpose:** Flag items that require human judgment — content accuracy, contextual fit, feasibility, and quality decisions that automated checks cannot make.

**Output format:** Actionable checklist items with exact location, review type, and what specifically to evaluate.

Each Tier 3 record has the following fields:

| Field | Type | Description |
|---|---|---|
| `item_id` | string | Unique identifier (e.g., "T3-01") |
| `item_description` | string | What the reviewer needs to evaluate |
| `location` | string | Exact file and field where this item appears (e.g., "stage-07/06-transfer/transfer-ecosystem.md > post_program.community_continuation_design.first_90_days_plan") |
| `review_type` | enum | The category of review needed |
| `actionable_description` | string | What specifically to evaluate — must be answerable by reading the cited field |

#### `review_type` Enumerated Values
```
content_accuracy
contextual_fit
feasibility
quality
```

#### Required Tier 3 Checks

The following items must always be generated as Tier 3 review items when applicable:

**Transfer-specific checks:**
- T3-01: Pre-program readiness assessment — is the complexity appropriate for the audience's self-direction level?
- T3-02: Manager briefing template (if present) — does it accurately describe the program goals without overpromising?
- T3-03: Post-program follow-up — is the frequency and format of spaced retrieval feasible for this audience?
- T3-04: CoP design — is the community platform and seeding activity appropriate for this specific audience and context?
- T3-05: Evaluation design — is the evaluation method feasible given the program context and who is responsible?

**Content accuracy items:**
- T3-06: Every module's `belief_challenging_encounter` — does it genuinely surface a common misconception for this specific audience?
- T3-07: Every `real_work_application` — does the activity description make sense for the stated audience's actual work context?
- T3-08: Marketing `learning_promise` elements — are the behavioral outcomes achievable within the program's contact hours?

**Contextual fit items (when `curriculum_traceability.strength` is "adjacent"):**
- T3-09: Flag any marketing claim where `strength: adjacent` — the traceability is indirect and requires human confirmation

---

## Separation Rule

**Generation and validation must NEVER occur in the same agent call.**

Specifically:
- The `/validate` command must be run as a separate invocation from any of the stage generation commands
- The validation agent must not make changes to stage output files
- If the validation agent finds failures, it reports them with exact locations — the human or a separate generation agent corrects them

Violating this rule degrades validation integrity: a generation agent that validates its own output cannot reliably flag its own errors.

---

## Failure Reporting Standard

Tier 1 failures must include:
- Exact stage (e.g., "stage-05")
- Exact file (e.g., "04-sessions/module-02-session-01.md")
- Exact field (e.g., "`transfer_connection`")
- Nature of failure (e.g., "MISSING — field not present" or "INVALID VALUE — 'Level 5' is not a valid Bloom's enum value")

Generic failure messages are not acceptable. Example of non-acceptable: "Some fields are missing in the sessions." Example of acceptable: "T1-16 FAIL — stage-05, 04-sessions/module-02-session-01.md, `transfer_connection`: MISSING — field not present."

---

## Duration Scaling

**90-minute programs:**
- Tier 1: Run all applicable Tier 1 checks (omit checks for fields that are scaled out for short programs)
- Tier 2: Skip (insufficient depth to score qualitative dimensions meaningfully)
- Tier 3: Skip standard items; only flag if marketing claims are out of proportion to curriculum depth

**Half-day to 2-day programs:**
- Tier 1: Full run
- Tier 2: Run all five dimensions
- Tier 3: Transfer-specific checks only

**Multi-week and semester programs:**
- All three tiers run
- All Tier 3 required checks are generated
- Tier 2 scores inform final review before delivery

---

## Validation Report Structure

The `schema-report.md` file contains:
1. Summary table: total checks, pass count, fail count, warning count, overall status (pass/fail)
2. Tier 1 results: all check records in tabular format
3. Tier 2 results: all dimension scores with evidence and recommendations

The `human-review-checklist.md` file contains:
1. All Tier 3 items as a markdown checklist
2. Each item includes: `[ ] T3-XX — [item_description] | Location: [location] | Review type: [review_type]`
3. Actionable description below each item
