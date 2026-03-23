# Stage 04: Modules Schema

**Stage:** 04 - Modules
**Command:** `/curriculum:modules`
**depends_on:** stage-01-intake, stage-02-outcomes, stage-03-assessments
**output_dir:** `03-modules/`
**output_files:** `sequence-rationale.md`, `[module-id]/module-spec.md` (one per module)

> **Usage instruction:** Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Stages 01, 02, and 03 must be complete before generating Stage 04 outputs.

---

## Required Fields (per module)

### module_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Unique identifier for sequencing and cross-referencing |
| Constraints | Format: `M-1`, `M-2`, `M-3` etc. |

---

### module_name

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Descriptive name that signals the module's focus to learners |
| Constraints | Avoid generic labels ("Module 1", "Introduction"). Use a name that conveys the learning challenge or transformation. |

---

### learning_objectives

| Attribute | Value |
|-----------|-------|
| Type | array of strings |
| Required | yes |
| Description | `outcome_id` references from Stage 02 that this module addresses |
| Constraints | Must reference real `outcome_id` values from Stage 02. Each module must address at least one module-level outcome (`MO-*`). |

---

### prerequisite_modules

| Attribute | Value |
|-----------|-------|
| Type | array of strings |
| Required | yes |
| Description | `module_id` values that must be completed before this module |
| Constraints | Can be empty array `[]` for the first module. Must form a valid directed acyclic graph (no circular dependencies). |

---

### content_chunks

| Attribute | Value |
|-----------|-------|
| Type | array of objects |
| Required | yes |
| Description | The distinct learning segments within this module, sized for cognitive load |
| Constraints | For novice audiences (Grow Stage 1-2): 2–4 interacting elements per chunk maximum. For experienced audiences (Grow Stage 3-4): up to 6–7 elements acceptable. Each chunk must have a name and estimated duration in minutes. |

**Content chunk sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `chunk_name` | string | yes | Name of this content segment |
| `duration_minutes` | integer | yes | Estimated teaching/learning time |
| `cognitive_load_note` | string | yes | Why this chunk is sized as it is (e.g., "novice audience, limit to 3 core concepts before practice break") |

---

### social_learning

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Cooperative or collaborative learning design for this module. Social learning is not optional — it is a structural requirement in every module. |

**Sub-fields (all 4 required):**

| Sub-field | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `activity_type` | enum | yes | Grouping structure for the social learning activity | Must use exact enum values |
| `interdependence_structure` | string | yes | How individual success depends on group success (positive interdependence) | Must describe the mechanism, not just name it. E.g., "Each pair has one scenario card and one role card — neither can complete the task alone." |
| `accountability_mechanism` | string | yes | How individual accountability is ensured within the group activity | E.g., "Each member submits their own written reflection after the group discussion." |
| `group_processing_prompt` | string | yes | A specific prompt for the group to debrief their collaboration | Must be specific to the activity. Prohibited: generic prompts like "What went well?" Must connect to the learning content. |

**activity_type enum values:**

| Value | Description |
|-------|-------------|
| `individual` | Solitary work that feeds into or follows group work |
| `paired` | Two-person collaboration |
| `small-group` | Groups of 3–6 participants |
| `full-cohort` | All participants together; facilitated whole-group activity |

---

### primary_metaskill

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | The primary meta-level thinking capacity this module develops |

**Enum Values:**

| Value | Description |
|-------|-------------|
| `Exploring` | Curiosity-driven inquiry; gathering and questioning information |
| `Creating` | Generating novel ideas, solutions, or artifacts |
| `Innovating` | Applying creative solutions to real problems in context |
| `Adapting` | Flexibly adjusting approach as context changes |
| `Imagining` | Envisioning possibilities beyond current constraints |
| `Communicating` | Expressing ideas clearly and persuasively for an audience |

Note: A 7th metaskill is under active consideration. Use these 6 values until a decision is recorded in STATE.md.

---

### metaskill_activation_activity

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | A specific thinking routine name that activates the primary metaskill in this module |
| Constraints | Must name a specific thinking routine (e.g., "See-Think-Wonder", "Claim-Support-Question", "Connect-Extend-Challenge", "I Used to Think / Now I Think"). Generic labels like "discussion" or "reflection" are not acceptable. |

---

### belief_challenging_encounter

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | A specific moment, case, or activity that surfaces and challenges a common misconception or limiting belief held by learners in this domain |
| Constraints | At least one per module. Must be specific to the subject matter — not a generic "challenge your assumptions" prompt. Must identify what belief is being challenged and how. |

---

### modality_switches

| Attribute | Value |
|-----------|-------|
| Type | array of strings |
| Required | yes |
| Description | Activity type transitions planned for this module to maintain engagement and accommodate diverse learning styles |
| Constraints | At least one activity type switch per session within this module. E.g., ["lecture -> paired discussion", "group activity -> individual reflection"]. Generic labels are acceptable here. |

---

## Module Sequencing Constraint

`prerequisite_modules` must form a valid directed acyclic graph (DAG) across the full set of modules:
- No circular dependencies
- The first module (no prerequisites) should introduce foundational concepts
- Sequence must reflect the backward design chain: later modules build on earlier module outcomes
- The sequence must be justified in `sequence-rationale.md`

---

## Output File Specifications

### sequence-rationale.md
Explanation of module order. Format:
```
## Module Sequence Rationale

### Overall Sequence
[1-2 paragraphs explaining why modules are ordered this way, grounded in backward design]

### Module Dependencies
| Module | Requires | Rationale |
|--------|----------|-----------|
| M-1    | none     | ...       |
| M-2    | M-1      | ...       |
```

### [module-id]/module-spec.md (one per module)
Full specification for a single module. All required fields present.

---

## Duration Scaling

| Program Size | contact_hours | Stage 04 Behavior |
|-------------|---------------|-------------------|
| Short | < 2 hours | 1 module; prerequisite_modules is empty; all fields still required |
| Medium | 2–16 hours | 2–3 modules; sequence-rationale required |
| Long | > 16 hours | 8–15 modules; full sequence DAG; belief_challenging_encounter in each module |

---

## Validation Rules

1. `depends_on: stage-01-intake, stage-02-outcomes, stage-03-assessments` — All three prior stages must be complete
2. Every module has a unique `module_id` in correct format
3. Every `learning_objectives` entry references a real `outcome_id` from Stage 02
4. `prerequisite_modules` forms a valid DAG (no circular dependencies)
5. `social_learning` has all 4 sub-fields: `activity_type`, `interdependence_structure`, `accountability_mechanism`, `group_processing_prompt`
6. `activity_type` uses exact enum values: `individual`, `paired`, `small-group`, `full-cohort`
7. `primary_metaskill` uses exact enum values from the 6-value list
8. `metaskill_activation_activity` names a specific thinking routine, not a generic activity type
9. `belief_challenging_encounter` is specific to subject matter — names the belief being challenged
10. `modality_switches` has at least one switch entry per session in this module
11. `group_processing_prompt` is specific to the activity content, not a generic debrief question
12. Content chunk sizing respects cognitive load guidance for the audience's `self_direction_level`
