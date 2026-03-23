# Stage 02: Outcomes Schema

**Stage:** 02 - Outcomes
**Command:** `/curriculum:outcomes`
**depends_on:** stage-01-intake
**output_dir:** `01-outcomes/`
**output_files:** `enduring-understandings.md`, `essential-questions.md`, `learning-objectives.md`

> **Usage instruction:** Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Stage 01 intake must be complete before generating Stage 02 outputs.

---

## Outcome Hierarchy

Outcomes operate at three levels. Each lower level inherits from and supports the level above.

```
program_outcomes
  └── module_outcomes  (one or more per program outcome)
        └── session_outcomes  (one or more per module outcome)
```

All levels use the same field specification. Level is declared in the `outcome_level` field.

---

## Required Fields (per outcome)

### outcome_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Unique identifier for cross-referencing from Stage 03 assessments |
| Constraints | Format: `PO-1`, `MO-1-1`, `SO-1-1-1` (P=program, M=module, S=session, followed by numeric index) |

---

### outcome_level

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Scope of this outcome |

**Enum Values:**
- `program` — Capstone competency for the full program
- `module` — Competency for a single module within the program
- `session` — Competency for a single session within a module

---

### outcome_statement

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The learning objective written as an observable behavioral statement |
| Constraints | Must begin with "Learners will be able to [Bloom's verb]...". Must be observable and assessable. Vague stems like "understand", "know", or "appreciate" are prohibited. |

---

### bloom_level

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | Bloom's Revised Taxonomy cognitive level for this outcome |

**Enum Values:**

| Value | Definition | Example Verbs |
|-------|------------|---------------|
| `Remember` | Recall facts and basic concepts | define, list, recall, recognize, identify, name |
| `Understand` | Explain ideas or concepts | describe, explain, interpret, classify, summarize, paraphrase |
| `Apply` | Use information in new situations | execute, implement, use, demonstrate, solve, carry out |
| `Analyze` | Draw connections among ideas | differentiate, organize, attribute, compare, contrast, distinguish |
| `Evaluate` | Justify a decision or course of action | judge, critique, defend, select, prioritize, assess |
| `Create` | Produce new or original work | design, construct, develop, formulate, author, compose |

---

### prerequisite_knowledge

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | What learners must already know or be able to do before this outcome can be achieved |
| Constraints | Behavioral format ("can do X" or "knows Y") — not self-report labels. May reference `prior_knowledge` from Stage 01 intake for program-level outcomes. |

---

### transfer_context

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The specific workplace or life situation where this learning must transfer |
| Constraints | Must be specific and concrete. Must connect to or extend the `transfer_context` from Stage 01. This field seeds `transfer_connection` in Stage 05 sessions. |

---

### parent_outcome_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | conditional |
| Constraints | Required for `module` and `session` level outcomes. References the `outcome_id` of the parent outcome this supports. Not applicable for `program` level outcomes. |

---

## Bloom's Distribution Rules

### Span Requirement
A complete program must span at least 4 of the 6 Bloom's taxonomy levels across all objectives.

### Expertise-Adaptive Sequencing

| Grow Stage (from Stage 01) | Starting Bloom Level | Target Bloom Level |
|---------------------------|---------------------|-------------------|
| `Stage 1 - Dependent` | Remember, Understand | Build to Apply, Analyze |
| `Stage 2 - Interested` | Understand, Apply | Build to Analyze, Evaluate |
| `Stage 3 - Involved` | Apply, Analyze | Push to Evaluate, Create |
| `Stage 4 - Self-Directed` | Analyze, Evaluate | Push to Evaluate, Create |

Session-level outcomes near the beginning of a novice program should have lower Bloom levels. Session-level outcomes near the end should have higher Bloom levels. This progression must be visible in the sequence of session outcome Bloom levels.

---

## Output File Specifications

### enduring-understandings.md
Big ideas that remain useful long after the program ends. Typically 3-5 per program. Format:
```
## Enduring Understandings

1. [Big idea statement — a full sentence, not a topic label]
2. ...
```

### essential-questions.md
Open, thought-provoking questions that frame inquiry throughout the program. Typically 3-5 per program. Format:
```
## Essential Questions

1. [Open question that cannot be answered with a single fact]
2. ...
```

### learning-objectives.md
All outcomes organized by level with full field specifications. Format:
```
## Program Outcomes

### [outcome_id]: [outcome_statement]
- bloom_level: [enum value]
- prerequisite_knowledge: [behavioral description]
- transfer_context: [specific context]

## Module Outcomes

### [outcome_id]: [outcome_statement]
- bloom_level: [enum value]
- parent_outcome_id: [program outcome id]
- prerequisite_knowledge: [behavioral description]
- transfer_context: [specific context]
```

---

## Duration Scaling

| Program Size | contact_hours | Stage 02 Behavior |
|-------------|---------------|-------------------|
| Short | < 2 hours | 2–3 session-level objectives total; 1 program outcome; module level may be omitted |
| Medium | 2–16 hours | 1–3 program outcomes; 2–6 module outcomes; 4–12 session outcomes |
| Long | > 16 hours | 3–5 program outcomes; 8–15 module outcomes; 15–25 session outcomes |

**Bloom span minimum by size:**
- Short: at least 2 Bloom levels
- Medium: at least 3 Bloom levels
- Long: at least 4 Bloom levels

---

## Validation Rules

1. `depends_on: stage-01-intake` — Stage 01 output must exist before Stage 02 begins
2. Every outcome has a unique `outcome_id` in the correct format
3. `bloom_level` uses exact enum values: `Remember`, `Understand`, `Apply`, `Analyze`, `Evaluate`, `Create`
4. `outcome_statement` uses observable Bloom's verbs — never "understand", "know", or "appreciate"
5. All module and session outcomes have a `parent_outcome_id` that references a real outcome
6. `transfer_context` is specific and concrete — connects to Stage 01 `transfer_context`
7. Program spans the minimum number of Bloom levels for its size (2/3/4 for short/medium/long)
8. Expertise-adaptive sequencing applied: novice programs start at lower Bloom levels and progress upward
9. Three output files are produced: enduring-understandings.md, essential-questions.md, learning-objectives.md
