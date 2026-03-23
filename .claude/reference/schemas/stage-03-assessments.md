# Stage 03: Assessments Schema

**Stage:** 03 - Assessments
**Command:** `/curriculum:assessments`
**depends_on:** stage-02-outcomes
**output_dir:** `02-assessments/`
**output_files:** `assessment-map.md`, `formative-assessments.md`, `summative-assessments.md`

> **Usage instruction:** Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Stage 02 outcomes must be complete before generating Stage 03 outputs.

---

## Required Fields (per assessment)

### assessment_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Unique identifier for cross-referencing in assessment map |
| Constraints | Format: `FA-1`, `FA-2` for formative; `SA-1`, `SA-2` for summative |

---

### assessment_name

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Short descriptive name for this assessment |
| Constraints | Descriptive of the activity (e.g., "Supplier Negotiation Role-Play" not "Assessment 1") |

---

### paired_objective

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The `outcome_id` from Stage 02 that this assessment directly measures |
| Constraints | Must reference a real `outcome_id` from Stage 02 `learning-objectives.md`. One assessment may pair with one objective; one objective may have multiple assessments. |

---

### assessment_type

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Whether this assessment monitors progress (formative) or evaluates achievement (summative) |

**Enum Values:**

| Value | Purpose | Timing |
|-------|---------|--------|
| `formative` | Monitor learning progress; provide feedback; adjust instruction | During learning |
| `summative` | Evaluate achievement of program or module outcomes | At end of module or program |

---

### bloom_level

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Bloom's taxonomy level this assessment measures |
| Constraints | Must be greater than or equal to the `bloom_level` of `paired_objective`. Assessment cannot measure at a lower cognitive level than the objective it assesses. |

**Enum Values (same as Stage 02):**
- `Remember`
- `Understand`
- `Apply`
- `Analyze`
- `Evaluate`
- `Create`

---

### format

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | The method used to assess learning |

**Enum Values:**

| Value | Best For |
|-------|----------|
| `performance-based` | Open skills; judging, creating, adapting in context |
| `procedural` | Closed skills; verifying correct execution of a fixed process |
| `reflective` | Metacognitive outcomes; checking for self-awareness and transfer intent |
| `portfolio` | Long programs; cumulative evidence of growth over time |
| `case-analysis` | Analyze-level outcomes; working through complex scenarios |
| `simulation` | Open skills in safe environments; Apply through Create levels |
| `demonstration` | Closed skills; showing correct procedure with evaluator present |
| `written` | Knowledge and comprehension outcomes; lower-stakes documentation |
| `oral` | Communication outcomes or when written products are impractical |
| `peer-review` | Evaluate-level outcomes; collaborative feedback |

---

### instructions_for_learner

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Clear description of what the learner does to complete this assessment |
| Constraints | Must be specific enough for a facilitator to assign without further explanation |

---

### success_criteria_for_assessment

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Observable behaviors or outputs that indicate successful completion |
| Constraints | Must be observable and evaluable. Avoids "demonstrates understanding" — uses "correctly identifies", "produces a plan that includes", "role-plays using technique X" |

---

### module_placement

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Which module or session this assessment occurs in |
| Constraints | References module or session identifier. For short programs, may reference session name. |

---

## Delivery Format Constraints

Based on `modality` from Stage 01 intake, certain assessment formats are impractical or excluded:

| modality | Excluded formats | Notes |
|----------|-----------------|-------|
| `virtual` | `oral`, `demonstration` | Oral assessments require synchronous verbal exchange not practical in async/online delivery; demonstrations require an evaluator physically present |
| `in-person` | *(none)* | All formats available |
| `blended` | *(none)* | All formats available; `oral` and `demonstration` must be placed in in-person sessions |

**When a format would be excluded:** auto-substitute the closest practical equivalent and record the substitution in the transparency note.

Substitution map for `virtual`:
- `oral` → `written` (for knowledge/comprehension outcomes) or `performance-based` (for Apply and above)
- `demonstration` → `simulation` (for open skills) or `procedural` written submission (for closed skills)

---

## Skill-Type Constraints

Based on `skill_type` from Stage 01 intake:

| skill_type | Required Assessment Format |
|------------|---------------------------|
| `closed` | At least one `procedural` or `demonstration` assessment per major objective |
| `open` | At least one `performance-based` or `simulation` assessment per major objective |

Both `closed` and `open` programs may include any assessment format in addition to the required formats.

---

## Formative and Summative Requirements

### Formative Requirements
- At least one `formative` assessment per module
- Formative assessments must provide actionable feedback — not just "correct/incorrect"
- For short programs (< 2 hours): formative checks only; summative assessments are optional

### Summative Requirements
- At least one `summative` assessment at the program level
- For long programs (> 16 hours): a formal summative assessment at the end of each major phase or unit
- For short programs (< 2 hours): summative assessments are optional

---

## Output File Specifications

### assessment-map.md
A table linking every Stage 02 objective to its assessment(s). Format:
```
## Assessment Alignment Map

| Outcome ID | Outcome (abbreviated) | Assessment ID | Assessment Name | Type | Bloom Match |
|------------|----------------------|---------------|-----------------|------|-------------|
| PO-1       | ...                  | SA-1          | ...             | summative | Evaluate >= Evaluate |
| MO-1-1     | ...                  | FA-1          | ...             | formative | Apply >= Apply |
```

### formative-assessments.md
Full specification for each formative assessment. Format:
```
## [assessment_id]: [assessment_name]
- **paired_objective:** [outcome_id]
- **bloom_level:** [enum value]
- **format:** [enum value]
- **module_placement:** [module/session identifier]
- **instructions_for_learner:** [description]
- **success_criteria:** [observable behaviors]
```

### summative-assessments.md
Full specification for each summative assessment. Same format as formative-assessments.md.

---

## Duration Scaling

| Program Size | contact_hours | Stage 03 Behavior |
|-------------|---------------|-------------------|
| Short | < 2 hours | Formative checks only (2–4 formative); summative optional |
| Medium | 2–16 hours | 3–6 formative; 1–3 summative; full assessment-map required |
| Long | > 16 hours | Full assessment matrix; summative at each major phase; portfolio or cumulative assessment recommended |

---

## Validation Rules

1. `depends_on: stage-02-outcomes` — Stage 02 output must exist before Stage 03 begins
2. Every assessment has a unique `assessment_id` in the correct format
3. Every `paired_objective` references a real `outcome_id` from Stage 02
4. `bloom_level` of assessment is greater than or equal to `bloom_level` of `paired_objective`
5. `assessment_type` uses exact enum values: `formative`, `summative`
6. `format` uses exact enum values from the format enum list
7. `skill_type` from Stage 01 is honored: `open` skills have at least one performance-based or simulation assessment; `closed` skills have at least one procedural or demonstration assessment
8. At least one `formative` assessment exists per module
9. At least one `summative` assessment exists at program level (except for programs < 2 hours)
10. Three output files are produced: assessment-map.md, formative-assessments.md, summative-assessments.md
11. `success_criteria_for_assessment` uses observable verbs — never "understands" or "appreciates"
