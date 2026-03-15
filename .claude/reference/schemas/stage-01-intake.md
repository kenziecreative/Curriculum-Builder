# Stage 01: Intake Schema

**Stage:** 01 - Intake
**Command:** `/knz-intake`
**depends_on:** none (first stage)
**output_dir:** `00-project-brief/`
**output_files:** `project-brief.md`

> **Usage instruction:** Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed.

---

## Required Fields

### program_topic

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The subject matter or skill domain this curriculum addresses |
| Constraints | Must be specific enough to constrain scope (not "business skills" — use "negotiating supplier contracts for small business owners") |

---

### target_audience

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Behavioral description of the learner population |

**Sub-fields:**

| Sub-field | Type | Required | Constraints |
|-----------|------|----------|-------------|
| `description` | string | yes | Plain-language description of who attends |
| `prior_knowledge` | string | yes | Must use behavioral format: "can do X, cannot yet do Y" — not self-report labels like "beginners" or "intermediate" |
| `context_of_use` | string | yes | Where and how learners will apply what they learn |

---

### transfer_context

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The specific real-work situation where learning transfer must occur |
| Constraints | Must name a concrete workplace or life context, not an abstract domain. This field seeds `transfer_connection` in Stage 5. |

---

### success_criteria

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | How the program sponsor will know the training produced behavioral change |
| Constraints | Observable and measurable; avoids "participants will understand/appreciate" — use "participants will demonstrate/complete/produce" |

---

### duration_and_format

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Program delivery parameters |

**Sub-fields:**

| Sub-field | Type | Required | Enum Values |
|-----------|------|----------|-------------|
| `delivery_mode` | enum | yes | `cohort-based`, `self-paced`, `hybrid` |
| `modality` | enum | yes | `in-person`, `virtual`, `blended` |
| `contact_hours` | number | yes | Total instructional hours (not including breaks) |
| `session_count` | integer | yes | Number of sessions in the program |
| `session_length_minutes` | integer | yes | Typical session length in minutes |

---

### self_direction_level

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Learner self-direction readiness per Grow's Self-Directed Learning Model |
| Constraints | Determines scaffolding density in subsequent stages. Novice audiences get closer structure; experienced audiences get more autonomy. |

**Enum Values:**

| Value | Description |
|-------|-------------|
| `Stage 1 - Dependent` | Learners need high structure, direct instruction, authority-driven |
| `Stage 2 - Interested` | Learners motivated but lack confidence, need coaching and guidance |
| `Stage 3 - Involved` | Learners able and willing, benefit from facilitation and peer work |
| `Stage 4 - Self-Directed` | Learners capable of independent study, thrive with delegation |

---

### skill_type

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Whether the skill has a single correct procedure or depends on context and judgment |

**Enum Values:**

| Value | Description | Assessment Implication |
|-------|-------------|----------------------|
| `closed` | Fixed procedure; correct/incorrect answers exist (e.g., operating equipment, following a legal compliance checklist) | Requires procedural assessments in Stage 3 |
| `open` | Context-dependent judgment; multiple valid approaches (e.g., giving feedback, negotiating, leading a team) | Requires performance-based assessments in Stage 3 |

---

### cultural_orientation

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | conditional |
| Constraints | Required for programs 2 hours or longer. Skip for programs under 2 hours. |
| Description | Dominant cultural value orientation of the learner population — shapes social learning design |

**Enum Values:**

| Value | Description | Social Learning Implication |
|-------|-------------|----------------------------|
| `individualist` | Learners expect personal achievement recognition, individual grades, solo work | Cooperative structures must be introduced gradually with explicit rationale |
| `collectivist` | Learners value group harmony, shared achievement, collaborative accountability | Competitive structures may create discomfort; group-first framing preferred |
| `balanced` | Mixed or uncertain; design for both | Use mixed approaches; build in both individual and group recognition moments |

---

## Extended Fields (Long Programs Only)

Required for programs with `contact_hours >= 16` (multi-day or multi-week):

| Field | Type | Description |
|-------|------|-------------|
| `cohort_size` | integer | Expected number of participants |
| `prerequisite_programs` | array of strings | Names or IDs of programs learners should have completed first |

---

## Enumerated Values Reference

### delivery_mode
- `cohort-based` — Learners progress together on a fixed schedule
- `self-paced` — Learners progress individually at their own pace
- `hybrid` — Mix of cohort milestones and self-paced work

### modality
- `in-person` — Physically co-located facilitation
- `virtual` — Synchronous online delivery (video conferencing)
- `blended` — Combination of in-person and virtual sessions

### self_direction_level
- `Stage 1 - Dependent`
- `Stage 2 - Interested`
- `Stage 3 - Involved`
- `Stage 4 - Self-Directed`

### skill_type
- `closed`
- `open`

### cultural_orientation
- `individualist`
- `collectivist`
- `balanced`

---

## Duration Scaling

| Program Size | contact_hours | Stage 01 Behavior |
|-------------|---------------|-------------------|
| Short | < 2 hours | All required fields except `cultural_orientation`; skip extended fields |
| Medium | 2–16 hours | All required fields including `cultural_orientation`; skip extended fields |
| Long | > 16 hours | All required fields + extended fields (`cohort_size`, `prerequisite_programs`) |

---

## Validation Rules

1. All required fields are populated before Stage 02 begins
2. `prior_knowledge` uses behavioral format ("can do X, cannot yet do Y"), not labels ("beginners", "intermediate", "advanced")
3. `success_criteria` uses observable verbs (demonstrate, complete, produce) — not "understand" or "appreciate"
4. `delivery_mode`, `modality`, `skill_type`, `self_direction_level` use exact enum values from this schema
5. `cultural_orientation` is present when `contact_hours >= 2`
6. `transfer_context` names a specific real-work context, not an abstract domain
7. Extended fields are present when `contact_hours >= 16`
