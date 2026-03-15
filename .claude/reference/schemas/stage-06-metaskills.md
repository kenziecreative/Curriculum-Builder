# Stage 06: Metaskill Mapping Schema

**Stage:** 06 — Metaskills
**Command:** `/metaskills`
**depends_on:** stage-04-modules, stage-05-sessions
**output_dir:** `05-metaskills/`

> Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Developability hierarchy ordering is an ordering constraint — Exploring and Creating must be activated before Innovating and Adapting in the program sequence. This is not a suggestion.

---

## Required Fields

Each metaskill mapping is a record with the following fields:

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `metaskill_name` | enum | yes | The metaskill being activated | See Enumerated Values |
| `activation_activity` | string | yes | A specific named thinking routine — e.g., "Think-Pair-Share", "See-Think-Wonder", "Claim-Support-Question" | Must be a specific named thinking routine, NOT a generic label like "encourage creativity" or "discuss" |
| `transfer_prompt` | string | yes | How this metaskill connects to real-work application for the participant | Must reference the transfer_context from Stage 1 intake |
| `target_sessions` | array[string] | yes | Session IDs or references where this metaskill is activated | Must reference sessions defined in stage-05 output |
| `evidence_level` | enum | yes | Strength of research evidence for this metaskill's developability | See Enumerated Values |
| `evidence_gap_acknowledgment` | boolean | conditional | Whether the evidence gap for this metaskill has been explicitly acknowledged | Required = true when metaskill_name is "Imagining"; omit or set false for all other metaskills |
| `imagining_adjacent_practice` | string | conditional | The evidence-based adjacent practice used to activate Imagining | Required when metaskill_name is "Imagining"; must be one of: scenario planning, futures thinking, mental simulation |
| `module_reference` | string | yes | The module ID this activation is situated within | Must reference a module defined in stage-04 output |
| `sequence_position` | integer | yes | The ordinal position of this activation in the full program sequence | Used to enforce developability hierarchy |

---

## Enumerated Values

### `metaskill_name`
```
Exploring
Creating
Innovating
Adapting
Imagining
Communicating
```

### `evidence_level`
```
high
moderate
emerging
```

Evidence level by metaskill:
- `Exploring` → `high`
- `Creating` → `high`
- `Innovating` → `moderate`
- `Adapting` → `moderate`
- `Imagining` → `emerging`
- `Communicating` → `high`

---

## Coverage and Distribution Rules

**Coverage rule:** All six metaskills must be activated across the full program. Not all in every module — distributed across the program arc.

**Distribution rule:** No single metaskill may account for more than 30% of total activations. If a program has 10 activation records, no single metaskill may appear more than 3 times.

**Developability hierarchy (ordering constraint):** `Exploring` and `Creating` (high evidence) MUST be activated before `Innovating` and `Adapting` in the program sequence. Specifically:
- The first activation of `Innovating` must have a higher `sequence_position` than at least one activation of `Exploring` and at least one activation of `Creating`.
- The first activation of `Adapting` must have a higher `sequence_position` than at least one activation of `Exploring` and at least one activation of `Creating`.
- Violation of this ordering is a Tier 1 validation failure.

**Imagining framing rule:** `Imagining` must be activated through an adjacent evidence-based practice: scenario planning, futures thinking, or mental simulation. The schema field `imagining_adjacent_practice` must specify which one. The `evidence_gap_acknowledgment` field must be `true` to confirm the facilitator understands this metaskill has emerging (not robust) evidence.

---

## Duration Scaling

**90-minute programs:**
- Activate 2–3 metaskills maximum
- Required: at least one `high` evidence metaskill (`Exploring`, `Creating`, or `Communicating`)
- `Imagining` is optional and not recommended for very short formats due to activation complexity
- Coverage rule is relaxed: not all six required for programs under 2 hours

**Half-day to 2-day programs:**
- Activate 4–5 metaskills
- All six may be included; `Imagining` requires adjacent practice if included
- Distribution rule (≤30%) applies

**Multi-week and semester programs:**
- All six metaskills required
- Full distribution rule (≤30%) enforced
- Developability hierarchy strictly enforced across module sequence

---

## Validation Rules

The following conditions must be true for stage completion (Tier 1 schema checks):

1. Every metaskill mapping record has all required fields populated
2. `activation_activity` contains a named thinking routine — not a generic descriptor
3. `evidence_level` matches the prescribed level for the given `metaskill_name`
4. `evidence_gap_acknowledgment` is `true` for any record with `metaskill_name: Imagining`
5. `imagining_adjacent_practice` is present and valid for any record with `metaskill_name: Imagining`
6. Developability hierarchy is satisfied: sequence_position of first `Innovating` > sequence_position of at least one `Exploring` activation AND at least one `Creating` activation
7. Same hierarchy check for `Adapting`
8. No single metaskill_name accounts for more than 30% of total records (for programs > 2 hours)
9. All `target_sessions` values reference sessions that exist in stage-05 output
10. All `module_reference` values reference modules that exist in stage-04 output

---

## Example Record

```yaml
metaskill_name: Exploring
activation_activity: "See-Think-Wonder"
transfer_prompt: "Where in your current role are you encountering a situation you don't fully understand yet? What would 'seeing more' reveal?"
target_sessions:
  - "module-01-session-01"
module_reference: "module-01"
sequence_position: 1
evidence_level: high
evidence_gap_acknowledgment: false
```

```yaml
metaskill_name: Imagining
activation_activity: "Pre-mortem scenario planning — imagine the project failed; what caused it?"
transfer_prompt: "What future state are you trying to build toward in your business? Describe it as if it already exists."
target_sessions:
  - "module-03-session-02"
module_reference: "module-03"
sequence_position: 8
evidence_level: emerging
evidence_gap_acknowledgment: true
imagining_adjacent_practice: "scenario planning"
```
