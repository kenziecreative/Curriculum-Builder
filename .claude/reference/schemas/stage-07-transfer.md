# Stage 07: Transfer Ecosystem Schema

**Stage:** 07 — Transfer Ecosystem
**Command:** `/transfer`
**depends_on:** stage-05-sessions, stage-06-metaskills
**output_dir:** `06-transfer/`

> Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. The transfer ecosystem is not optional — it is the mechanism that produces behavioral change. All three layers (pre/in/post-program) are required fields. Transfer elements must attach to specific sessions and modules, not generic appendices.

---

## Required Fields: Three-Layer Structure

The transfer ecosystem output is a single object with three required top-level keys: `pre_program`, `in_program`, and `post_program`. Each is an object with the sub-fields below.

---

### `pre_program` (required)

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `readiness_assessment` | object | yes | Instrument to gauge participant readiness before the program begins | Must produce actionable data that informs facilitator preparation |
| `readiness_assessment.format` | enum | yes | How the readiness assessment is delivered | See Enumerated Values |
| `readiness_assessment.questions` | array[string] | yes | The assessment questions or prompts | Minimum 3 questions; must assess prior_knowledge and transfer_context fit |
| `manager_briefing_template` | object | conditional | Template for briefing participant managers before program starts | Required for programs with contact_hours > 4; omit for programs ≤ 4 hours |
| `manager_briefing_template.purpose_summary` | string | conditional | 1–2 sentence explanation of program goals for the manager | Required when manager_briefing_template is present |
| `manager_briefing_template.participant_support_actions` | array[string] | conditional | Specific actions the manager should take to support the participant | Required when manager_briefing_template is present; at least 2 items |
| `manager_briefing_template.post_program_conversation_prompt` | string | conditional | Question the manager should ask the participant after the program | Required when manager_briefing_template is present |
| `baseline_measurement` | object | yes | Captures participant's starting point before instruction begins | Used to measure change at evaluation |
| `baseline_measurement.dimensions` | array[string] | yes | The dimensions being measured (knowledge, confidence, skill level, etc.) | Must align with program learning objectives from stage-02 |
| `baseline_measurement.method` | enum | yes | How baseline is captured | See Enumerated Values |
| `pre_work` | object | yes | Content or activity assigned before the program begins | Must be calibrated to the self_direction_level from stage-01 intake |
| `pre_work.content_type` | enum | yes | Type of pre-work activity | See Enumerated Values |
| `pre_work.estimated_duration_minutes` | integer | yes | Time investment required from participant | Must be proportional to program contact_hours (max 20% of contact hours) |
| `pre_work.self_direction_calibration` | enum | yes | How pre-work complexity aligns with participant self-direction level | Must match the self_direction_level from stage-01; see Enumerated Values |
| `pre_work.purpose` | string | yes | Why this pre-work is required and how it connects to program outcomes | Must reference specific outcomes from stage-02 |

---

### `in_program` (required)

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `implementation_intentions` | array[object] | yes | "When X, I will Y" commitments, one per module | Must have at least one per module (references module IDs from stage-04) |
| `implementation_intentions[].module_reference` | string | yes | Module this intention is tied to | Must reference a module from stage-04 output |
| `implementation_intentions[].when_condition` | string | yes | The situational trigger ("When X...") | Must be specific to participant's real-work context from stage-01 transfer_context |
| `implementation_intentions[].will_action` | string | yes | The committed action ("...I will Y") | Must reference a skill or behavior from the program learning objectives |
| `real_work_application` | array[object] | yes | Activities that use participants' actual work, not hypothetical scenarios | Must be grounded in participant context from stage-01 |
| `real_work_application[].session_reference` | string | yes | Session where this application occurs | Must reference a session from stage-05 output |
| `real_work_application[].application_description` | string | yes | What participants do with their real work in this activity | Must explicitly use "your [specific work artifact/situation]" framing, NOT hypothetical case studies |
| `real_work_application[].outcome_connection` | string | yes | Which learning objective this application reinforces | Must reference an objective from stage-02 |
| `error_management_practice` | object | conditional | Structured practice with intentional error introduction and correction | Required when stage-01 skill_type is "open"; omit for "closed" skill curricula |
| `error_management_practice.session_reference` | string | conditional | Session where error management practice occurs | Required when error_management_practice is present |
| `error_management_practice.error_type_introduced` | string | conditional | What kind of error is introduced for learning | Required when error_management_practice is present |
| `error_management_practice.correction_process` | string | conditional | How participants learn to detect and correct the error | Required when error_management_practice is present |

---

### `post_program` (required)

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `spaced_retrieval_schedule` | array[enum] | yes | Timing intervals for follow-up retrieval practice | Must use values from Enumerated Values; order must be ascending (short to long) |
| `spaced_retrieval_prompts` | array[object] | yes | The actual prompts delivered at each interval | One prompt object per interval in spaced_retrieval_schedule |
| `spaced_retrieval_prompts[].interval` | enum | yes | Which interval this prompt is for | Must match a value in spaced_retrieval_schedule |
| `spaced_retrieval_prompts[].prompt_text` | string | yes | The retrieval practice prompt | Must require recall or application, not recognition; must not be answerable without having done the program |
| `peer_accountability_structure` | object | yes | How participants hold each other accountable post-program | Required for all program lengths |
| `peer_accountability_structure.structure_type` | enum | yes | The accountability format | See Enumerated Values |
| `peer_accountability_structure.check_in_frequency` | enum | yes | How often peer check-ins occur | See Enumerated Values |
| `peer_accountability_structure.conversation_guide` | array[string] | yes | Questions or prompts to structure peer check-ins | Minimum 3 prompts |
| `manager_checkin_prompts` | array[string] | conditional | Questions managers use to follow up with participants | Required for programs with contact_hours > 4; omit for programs ≤ 4 hours |
| `community_continuation_design` | object | yes | Plan for seeding and sustaining a community of practice after the program | Required for all program lengths |
| `community_continuation_design.cop_seeding_activity` | string | yes | The activity that initiates the community during the program itself | Must occur during in-program delivery, not only after |
| `community_continuation_design.continuation_platform` | string | yes | Where the ongoing community lives post-program | Must be specified (e.g., "Slack channel", "monthly virtual meetup", "LinkedIn group") — not "TBD" |
| `community_continuation_design.first_90_days_plan` | array[object] | yes | Structured first 90 days of community activity | Minimum 3 activities with dates/cadence |
| `community_continuation_design.first_90_days_plan[].week` | string | yes | When this activity occurs | Expressed as week range (e.g., "Week 1", "Weeks 2-4", "Month 2-3") |
| `community_continuation_design.first_90_days_plan[].activity` | string | yes | What the community does | Must be specific and actionable |
| `evaluation_design` | object | yes | How program effectiveness will be evaluated | Required for all program lengths |
| `evaluation_design.what` | string | yes | What is being measured | Must align with learning objectives and success_criteria from stage-01 |
| `evaluation_design.when` | string | yes | When evaluation data is collected | Must specify timing relative to program completion |
| `evaluation_design.by_whom` | string | yes | Who collects and analyzes evaluation data | Must be specific (not "someone" or "TBD") |
| `evaluation_design.kirkpatrick_level` | enum | yes | The Kirkpatrick level this evaluation captures | See Enumerated Values |
| `evaluation_design.minimum_level_justification` | string | conditional | Explanation if evaluation is below Level 3 | Required when kirkpatrick_level is "Level 1 - Reaction" or "Level 2 - Learning" AND program claims behavior change outcomes |

---

## Enumerated Values

### `readiness_assessment.format`
```
survey
interview
self-assessment
portfolio-review
skills-demonstration
```

### `baseline_measurement.method`
```
pre-survey
skills-demonstration
knowledge-check
confidence-rating
behavioral-indicator
```

### `pre_work.content_type`
```
reading
video
reflection-prompt
case-study-review
self-assessment
practice-activity
```

### `pre_work.self_direction_calibration`
```
Stage 1 - Directed (structured tasks with clear steps)
Stage 2 - Guided (tasks with scaffolding and options)
Stage 3 - Facilitated (tasks with a prompt, no structure provided)
Stage 4 - Self-Directed (open invitation to engage however is most useful)
```

### `spaced_retrieval_schedule` intervals
```
1_week
1_month
3_months
```

### `peer_accountability_structure.structure_type`
```
accountability-partner
triad
cohort-check-in
peer-coaching-dyad
```

### `peer_accountability_structure.check_in_frequency`
```
weekly
biweekly
monthly
```

### `evaluation_design.kirkpatrick_level`
```
Level 1 - Reaction
Level 2 - Learning
Level 3 - Behavior
Level 4 - Results
```

---

## Skill-Type Adaptive Rules

**Open-skill curricula** (stage-01 skill_type = "open"):
- `error_management_practice` is required in `in_program`
- Transfer scaffold density should be higher: at least 3 `real_work_application` records
- `evaluation_design.kirkpatrick_level` must be `Level 3 - Behavior` or `Level 4 - Results`

**Closed-skill curricula** (stage-01 skill_type = "closed"):
- `error_management_practice` may be omitted
- Procedural transfer (correct application in new contexts) is sufficient
- Level 2 evaluation is acceptable if behavior change claims are not made

**Warning trigger:** Flag the following combination for human review (Tier 3 validation item):
- `program contact_hours ≤ 4` AND `skill_type = "open"` AND `spaced_retrieval_schedule` has fewer than 2 intervals AND `peer_accountability_structure` is absent or minimal. This combination indicates compressed format + open skill + minimal transfer support — insufficient for claimed behavior change outcomes.

---

## Attachment Rule

Transfer elements must be attached to specific program elements — not generic appendices. Specifically:
- Every `implementation_intention` must have a `module_reference`
- Every `real_work_application` must have a `session_reference`
- Every `spaced_retrieval_prompt` must have a matching `interval` in the schedule
- `cop_seeding_activity` must occur during in-program delivery

Generic statements like "provide a follow-up activity" or "encourage continued practice" are not acceptable field values. All entries must be specific, contextualized, and traceable to program content.

---

## Duration Scaling

**90-minute programs (lightweight transfer):**
- `pre_program`: `readiness_assessment` + `pre_work` required; `manager_briefing_template` omitted
- `in_program`: `implementation_intentions` required; `real_work_application` minimum 1 record; `error_management_practice` omitted (insufficient time)
- `post_program`: `spaced_retrieval_schedule` with `1_week` only; `peer_accountability_structure` simplified (pair check-in); `manager_checkin_prompts` omitted; `community_continuation_design` simplified; `evaluation_design` at Level 1 or 2 acceptable

**Half-day to 2-day programs:**
- All fields required as specified
- `spaced_retrieval_schedule` minimum: `1_week` and `1_month`
- `evaluation_design.kirkpatrick_level` minimum: `Level 2 - Learning`

**Multi-week and semester programs:**
- Full ecosystem required with no omissions
- `spaced_retrieval_schedule` minimum: all three intervals (`1_week`, `1_month`, `3_months`)
- `evaluation_design.kirkpatrick_level` minimum: `Level 3 - Behavior`
- `manager_briefing_template` and `manager_checkin_prompts` required
- `community_continuation_design.first_90_days_plan` must have at least 5 entries

---

## Minimum Evaluation Level Rule

Any program that claims "participants will be able to [behavioral outcome]" in its learning objectives MUST have `evaluation_design.kirkpatrick_level` set to `Level 3 - Behavior` or `Level 4 - Results`. If the kirkpatrick_level is below Level 3, the `minimum_level_justification` field is required, and the validation report will flag this as a Tier 3 human review item.

---

## Validation Rules

The following conditions must be true for stage completion (Tier 1 schema checks):

1. All three layers (`pre_program`, `in_program`, `post_program`) are present and populated
2. `implementation_intentions` has at least one record per module from stage-04
3. Every `implementation_intentions[].module_reference` exists in stage-04 output
4. Every `real_work_application[].session_reference` exists in stage-05 output
5. `error_management_practice` is present when stage-01 `skill_type` is "open"
6. `spaced_retrieval_prompts` has one record per interval in `spaced_retrieval_schedule`
7. `community_continuation_design.continuation_platform` is not "TBD" or empty
8. `evaluation_design.kirkpatrick_level` meets minimum level for program type
9. `manager_briefing_template` and `manager_checkin_prompts` are present for programs with contact_hours > 4
10. `baseline_measurement.dimensions` align with stage-02 learning objectives
