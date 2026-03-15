# Stage 08: Marketing Derivation Schema

**Stage:** 08 — Marketing Derivation
**Command:** `/marketing`
**depends_on:** stage-05-sessions, stage-06-metaskills, stage-07-transfer
**output_dir:** `07-marketing/`

> Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Every marketing claim must have a source_citation pointing to a specific curriculum element. No unsourced claims are allowed. Marketing output must not exceed 25% of total curriculum package output by word count.

---

## Required Fields

Each marketing element is a record with the following fields:

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `element_type` | enum | yes | The type of marketing element | See Enumerated Values |
| `content` | string | yes | The marketing text for this element | Must be derived from actual curriculum elements — not aspirational language |
| `source_citation` | string | yes | Reference to the specific curriculum element this claim derives from | Must point to a specific objective, assessment, session, or transfer element by ID or file+field — no generic references like "the program" |
| `claim_type` | enum | yes | The nature of the claim being made | See Enumerated Values |
| `audience_segment` | string | yes | Who this element is written for | Must be grounded in target_audience from stage-01 intake; describe the segment using the same behavioral language, not demographic labels |
| `curriculum_traceability` | object | yes | Explicit mapping from marketing claim to curriculum evidence | Required for every element |
| `curriculum_traceability.claim_text` | string | yes | The specific phrase in `content` that makes a claim | Must be a verbatim excerpt from `content` |
| `curriculum_traceability.supporting_element` | string | yes | The curriculum element that justifies this claim | Must reference a specific stage output (e.g., "stage-02 objective OBJ-03", "stage-07 evaluation_design") |
| `curriculum_traceability.strength` | enum | yes | How directly the evidence supports the claim | See Enumerated Values |

---

## Enumerated Values

### `element_type`
```
program_description
learning_promise
audience_positioning
testimonial_prompt
enrollment_cta
```

### `claim_type`
```
outcome-based
experience-based
credential-based
```

### `curriculum_traceability.strength`
```
direct
inferred
adjacent
```

Evidence strength definitions:
- `direct` — The curriculum element explicitly produces or tests the claimed outcome
- `inferred` — The claim is a reasonable inference from the curriculum element
- `adjacent` — The curriculum element is related but does not directly support the claim (requires human review)

---

## Constraint Rules

### Traceability constraint
Every `content` field must have a corresponding `source_citation` and `curriculum_traceability` record. A claim with no traceable curriculum source is a Tier 1 validation failure. There are no exceptions.

### Learning promises constraint
`element_type: learning_promise` records must:
- Reflect actual outcomes from stage-02 learning objectives (not aspirational language beyond what the curriculum actually develops)
- Use behavioral language matching the Bloom's level of the cited objectives
- Not promise outcomes that are only measured at Kirkpatrick Level 1 or 2 when the claim implies behavioral change

### Audience positioning constraint
`element_type: audience_positioning` records must:
- Be grounded in the `target_audience` and `prior_knowledge` fields from stage-01 intake
- Reference the audience's actual context, not demographic assumptions
- Use the behavioral description format ("participants who can X but cannot yet Y") rather than identity labels

### Marketing-to-pedagogy ratio rule
The total word count of all marketing output files must be less than 25% of the total word count of all curriculum content output files (stages 01–07 combined). This is a validation check that runs during stage-09 Tier 1 checks. The schema records this constraint so generation commands understand the boundary.

### Testimonial prompt constraint
`element_type: testimonial_prompt` records do not make direct claims — they provide prompts for future testimonials. These records must:
- Reference the `real_work_application` elements from stage-07 that participants would be drawing on
- Ask about observable behavioral change, not satisfaction
- `source_citation` must reference stage-07 `evaluation_design.what` or specific learning objectives

---

## Duration Scaling

**90-minute programs:**
- Required: `program_description` only (single element)
- Optional: `enrollment_cta`
- `learning_promise`, `audience_positioning`, `testimonial_prompt` are omitted — insufficient curriculum depth to justify

**Half-day to 2-day programs:**
- Required: `program_description`, `learning_promise`, `audience_positioning`
- Optional: `enrollment_cta`, `testimonial_prompt`
- All elements require `source_citation` and `curriculum_traceability`

**Multi-week and semester programs:**
- Full marketing package: all five element types
- Multiple records per `element_type` allowed for audience segmentation
- Marketing-to-pedagogy ratio rule strictly enforced

---

## Output Files

When this stage runs, the following file is created in `output_dir`:

- `marketing-package.md` — All marketing elements in the records format above

---

## Validation Rules

The following conditions must be true for stage completion (Tier 1 schema checks):

1. Every record has all required fields populated
2. Every `source_citation` references a specific curriculum element (not generic)
3. Every `curriculum_traceability.supporting_element` references an element that exists in stage output
4. No `learning_promise` element claims a behavioral outcome not supported by stage-02 objectives
5. No `audience_positioning` element uses identity-label framing instead of behavioral description
6. `curriculum_traceability.strength` is `direct` or `inferred` for all outcome-based claims (not `adjacent`)
7. Total marketing word count < 25% of total curriculum content word count (flagged as warning if approaching 20%, failure at 25%)
8. All `element_type` values required for the program's duration scaling tier are present

---

## Example Records

```yaml
element_type: program_description
content: "In this 90-minute session, entrepreneurs learn to apply a structured framework for analyzing market fit using their own current business data."
source_citation: "stage-02 objective OBJ-01: Apply market analysis framework to a given business scenario (Bloom: Apply)"
claim_type: outcome-based
audience_segment: "Early-stage entrepreneurs (pre-revenue to $500K) who have a product but have not validated market fit"
curriculum_traceability:
  claim_text: "apply a structured framework for analyzing market fit"
  supporting_element: "stage-02 objective OBJ-01; stage-05 session-01 guided_practice"
  strength: direct
```

```yaml
element_type: learning_promise
content: "By the end of this program, you will have a completed 90-day implementation plan for your business, developed during the program using your actual business context."
source_citation: "stage-07 in_program real_work_application session-03; stage-02 program_outcome PO-01"
claim_type: outcome-based
audience_segment: "Small business owners in the Hello Alice network at revenue stage $0–$250K"
curriculum_traceability:
  claim_text: "completed 90-day implementation plan for your business, developed during the program using your actual business context"
  supporting_element: "stage-07 real_work_application[session-03].application_description"
  strength: direct
```
