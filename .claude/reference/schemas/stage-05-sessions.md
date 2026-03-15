# Stage 05: Sessions Schema

**Stage:** 05 - Sessions
**Command:** `/knz-sessions`
**depends_on:** stage-04-modules
**output_dir:** `04-sessions/`
**output_files:** `[module-id]-[session-id]-session.md` (one per session)

> **Usage instruction:** Generate output matching this schema. All required fields must be present. Enum fields must use exact values listed. Stage 04 modules must be complete before generating Stage 05 outputs.

---

## The 8 TMA Arc Fields

These are the most critical fields in the entire system. They enforce pedagogical completeness by requiring all phases of the Teaching for Meaningful Application (TMA) arc in every session. All 8 are required — omitting any phase produces incomplete pedagogy.

**TMA Content Arc:** ACTIVATE > THEORY > CHECK > METHOD > PRACTICE > APPLICATION > REFLECT > TRANSFER

---

### 1. prior_knowledge_activation

**TMA Phase:** ACTIVATE

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | An activity that surfaces and connects to what learners already know before introducing new content |
| Constraints | Must be a specific activity, not "review previous session." Must connect to the specific content of THIS session. |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `activity_description` | string | yes | What learners do to activate prior knowledge |
| `duration_minutes` | integer | yes | Estimated time |
| `target_prior_knowledge` | string | yes | The specific knowledge or experience this activity is trying to surface |

---

### 2. learning_objectives

**TMA Phase:** THEORY (setup)

| Attribute | Value |
|-----------|-------|
| Type | array of strings |
| Required | yes |
| Description | `outcome_id` references from Stage 02 that this session addresses |
| Constraints | Must reference real `outcome_id` values. Session objectives should be `SO-*` level outcomes. |

---

### 3. content_chunks

**TMA Phase:** THEORY

| Attribute | Value |
|-----------|-------|
| Type | array of objects |
| Required | yes |
| Description | Distinct instructional segments, sized for cognitive load |
| Constraints | For novice audiences: 2–4 interacting concepts per chunk. For experienced audiences: up to 6–7. Each chunk is a coherent unit of instruction followed by a processing or application moment. |

**Content chunk sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `chunk_name` | string | yes | Name of this instructional segment |
| `key_concepts` | array of strings | yes | Core concepts or skills taught in this chunk (2–4 for novices) |
| `instructional_method` | string | yes | How content is delivered (e.g., "direct instruction with worked examples", "case-based presentation") |
| `duration_minutes` | integer | yes | Estimated time |

---

### 4. formative_check

**TMA Phase:** CHECK

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | A low-stakes check that learners have grasped key content before moving to practice |
| Constraints | Must occur after instruction (content_chunks) and before guided_practice. Must provide actionable feedback signal to both learner and facilitator. |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `check_activity` | string | yes | What learners do (e.g., "pair-share one takeaway", "exit ticket: write one question you still have") |
| `duration_minutes` | integer | yes | Estimated time |
| `feedback_mechanism` | string | yes | How results are used (e.g., "facilitator adjusts next segment based on confusion signals", "pairs self-score against model answer") |

---

### 5. guided_practice

**TMA Phase:** METHOD

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Structured practice with facilitator support and feedback — learners attempt the skill with scaffolding |
| Constraints | Must involve active learner production, not passive observation. Must include facilitator observation and feedback opportunity. |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `activity_description` | string | yes | What learners do during guided practice |
| `scaffolding_provided` | string | yes | What structures, cues, or supports are provided (e.g., "template with sentence starters", "worked example to reference") |
| `facilitator_role` | string | yes | What the facilitator does while learners practice |
| `duration_minutes` | integer | yes | Estimated time |

---

### 6. independent_practice

**TMA Phase:** PRACTICE

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Less-scaffolded practice where learners attempt the skill more independently |
| Constraints | Scaffold is reduced compared to guided_practice. Learners must produce something (written, verbal, demonstrated). |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `activity_description` | string | yes | What learners do during independent practice |
| `reduced_scaffold_note` | string | yes | What scaffolding is removed compared to guided_practice and why |
| `duration_minutes` | integer | yes | Estimated time |

---

### 7. reflection_prompt

**TMA Phase:** REFLECT

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | A specific prompt that asks learners to examine what and how they learned |
| Constraints | Must be specific to THIS session's content — not a generic prompt. Prohibited: "What did you learn today?", "What went well?", "What were your takeaways?" Generic prompts produce generic reflection. Reflection prompts must name specific concepts, decisions, or moments from the session. |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt_text` | string | yes | The exact reflection question or prompt |
| `duration_minutes` | integer | yes | Estimated time |
| `reflection_type` | enum | yes | Category of reflection this prompt targets |

**reflection_type enum values:**

| Value | Description |
|-------|-------------|
| `metacognitive` | Reflects on thinking process, not just content |
| `conceptual` | Reflects on understanding of core concepts |
| `transfer-intent` | Reflects on plans for applying learning in real context |
| `belief-shift` | Reflects on changed assumptions or mental models |

---

### 8. transfer_connection

**TMA Phase:** TRANSFER

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | An explicit bridge from session content to real-work application |
| Constraints | Must reference the specific `transfer_context` from Stage 01 intake — not a generic "apply this to your work" prompt. The transfer connection must name the real situation learners will face and specify what to do differently. |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `application_scenario` | string | yes | The specific real-work situation from Stage 01 `transfer_context` where this learning applies |
| `action_prompt` | string | yes | What the learner commits to doing differently in that context (observable and specific) |
| `support_structure` | string | yes | What happens after the session to support follow-through (e.g., "manager conversation guide provided", "peer accountability pair formed", "2-week check-in scheduled") |
| `duration_minutes` | integer | yes | Estimated time |

---

## Session-Level Header Fields

In addition to the 8 TMA arc fields, each session requires:

### session_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Constraints | Format: `[module_id]-S-1`, `[module_id]-S-2` (e.g., `M-1-S-1`, `M-1-S-2`) |

---

### session_name

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | Descriptive name for this session |
| Constraints | Should signal the learning challenge or transformation, not just the topic |

---

### parent_module_id

| Attribute | Value |
|-----------|-------|
| Type | string |
| Required | yes |
| Description | The `module_id` from Stage 04 this session belongs to |

---

### session_template

| Attribute | Value |
|-----------|-------|
| Type | enum |
| Required | yes |
| Description | The instructional design framework structuring this session |

**Enum Values:**

| Value | Best For | When to Use |
|-------|----------|-------------|
| `gagne` | Knowledge transfer; declarative and procedural knowledge | Structured information delivery with clear skill progression |
| `5e_7e` | Inquiry and exploration; science and discovery domains | When learners benefit from investigating before receiving direct instruction |
| `merrill` | Problem-solving and performance improvement | When learning centers on solving a specific type of problem |
| `wippea` | Professional development; applied workplace skills | Coaching and PD contexts; real-world problem focus |
| `universal_tma_arc` | Default; works for most adult learning contexts | When in doubt; general-purpose; aligns with TMA arc directly |

**Template selection guidance:**
- Knowledge transfer scenario → `gagne`
- Inquiry or exploration focus → `5e_7e`
- Problem-solving center → `merrill`
- Professional development or coaching → `wippea`
- All other cases → `universal_tma_arc`

---

### total_duration_minutes

| Attribute | Value |
|-----------|-------|
| Type | integer |
| Required | yes |
| Description | Total planned session time including all activities |
| Constraints | Must equal sum of duration_minutes across all TMA arc fields and header activities |

---

## DCR Integration Fields

DCR (Deconstruct-Compare-Rebuild) is the cognitive framework for developing discrimination and pattern recognition. Required for programs where learners must distinguish between similar cases or develop judgment in context-dependent situations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `deconstruct_element` | string | conditional | An activity where learners take apart an example to identify its components |
| `compare_element` | string | conditional | An activity where learners examine two or more cases side-by-side to identify key differences |
| `rebuild_element` | string | conditional | An activity where learners construct or reconstruct a case using identified principles |
| `validate_element` | string | conditional | An activity where learners test their construction against criteria — required for wicked-domain curricula |

**DCR required when:** `skill_type == open` AND (`bloom_level >= Analyze` in session objectives)

**DCR scaffolding rule for novices (Grow Stage 1-2):**
- Start with close comparisons (cases that differ on one or two dimensions)
- Provide explicit structural cues that highlight what to look for
- Pair cases explicitly — learners should not choose their own comparisons until Stage 3-4 readiness
- Move to distant comparisons only after close comparison fluency is demonstrated

---

## Facilitator and Participant Material Fields

### facilitator_notes

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Behind-the-scenes guidance for the facilitator |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `timing_cues` | array of strings | yes | Key timing transitions and warnings (e.g., "If discussion runs long here, compress independent_practice not transfer_connection") |
| `common_stumbling_points` | array of strings | yes | Predictable places where learners get confused or stuck, with facilitator response guidance |
| `transition_notes` | array of strings | yes | How to move between TMA arc phases smoothly |

---

### participant_materials

| Attribute | Value |
|-----------|-------|
| Type | object |
| Required | yes |
| Description | Materials learners need for this session |

**Sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `pre_work` | string | yes | What participants do or read before the session. Use "none" if not applicable. |
| `handouts` | array of strings | yes | List of handout names/descriptions. Empty array if none. |
| `activity_worksheets` | array of strings | yes | Structured worksheets needed for activities. Empty array if none. |

---

### slide_framework_outline

| Attribute | Value |
|-----------|-------|
| Type | array of objects |
| Required | yes |
| Description | Structural slide sequence — what each slide or slide set covers, not visual design |
| Constraints | Structural only. No color, font, or layout specifications. Each entry is a slide section with a functional purpose. |

**Slide outline sub-fields:**

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `section_name` | string | yes | Name or heading for this slide section |
| `tma_phase` | string | yes | Which TMA arc phase this slide section supports |
| `estimated_slides` | integer | yes | Approximate number of slides |
| `content_notes` | string | yes | What this section must communicate or accomplish |

---

## Duration Scaling

| Program Size | contact_hours | Stage 05 Behavior |
|-------------|---------------|-------------------|
| Short | < 2 hours | 1–2 sessions; each session under 90 min; all 8 TMA arc fields required; DCR conditional on skill type |
| Medium | 2–16 hours | Multiple sessions per module; each session 60–90 min; full schema for each session |
| Long | > 16 hours | Multiple sessions per module; 60–90 min each; full schema; cumulative transfer portfolio tracking recommended |

---

## Validation Rules

1. `depends_on: stage-04-modules` — Stage 04 must be complete before Stage 05 begins
2. Every session has a unique `session_id` in correct format
3. All 8 TMA arc fields are present: `prior_knowledge_activation`, `learning_objectives`, `content_chunks`, `formative_check`, `guided_practice`, `independent_practice`, `reflection_prompt`, `transfer_connection`
4. `reflection_prompt.prompt_text` does not use prohibited generic stems ("What did you learn?", "What went well?", "What were your takeaways?")
5. `transfer_connection.application_scenario` references the specific `transfer_context` from Stage 01
6. `session_template` uses exact enum values
7. `reflection_type` uses exact enum values: `metacognitive`, `conceptual`, `transfer-intent`, `belief-shift`
8. DCR fields are present when `skill_type == open` AND session bloom level is Analyze or above
9. DCR scaffolding applies close-before-distant comparison for novice audiences (Grow Stage 1-2)
10. `facilitator_notes` has all 3 sub-fields: `timing_cues`, `common_stumbling_points`, `transition_notes`
11. `total_duration_minutes` equals sum of component durations
12. `prior_knowledge_activation.target_prior_knowledge` names specific knowledge, not "prior learning"
13. `transfer_connection.support_structure` names a specific post-session mechanism, not "practice on the job"
