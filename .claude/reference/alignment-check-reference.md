# Alignment Check Reference

This document defines the alignment check logic that every generation stage command loads before running its alignment check. Load this reference alongside `audit-trail-format.md` when implementing or reviewing draft audit logic.

---

## 1. Purpose and Scope

Alignment verification confirms that generated output faithfully uses source material — it does not distort findings, fabricate evidence backing, or silently ignore sources.

**When it runs:** After all other draft audit checks pass (vocabulary, registry, schema). Uses the same 3-attempt retry with cumulative constraints pattern as other check failures.

**What counts as source material:**
- Files in `workspace/{project}/source-material/` (SME-provided documents)
- `domain-research-findings.md` (the grounding document produced by Stage 1.5 domain research)

**When it is skipped:** If no source material files exist AND no grounding document exists, the alignment check is omitted for that stage. There is nothing to align against. The audit trail Alignment Check subsection is also omitted.

---

## 2. What Gets Checked

### Grounding-required areas

These output areas must be grounded in source material when source material exists. Agent-generated content in these areas is flagged as assumed content.

| Stage | Grounding-required areas |
|-------|--------------------------|
| Outcomes | Program outcomes, module outcomes, session outcomes, enduring understandings, essential questions |
| Assessments | Assessment criteria, performance indicators, rubric standards |
| Modules | Module descriptions, key concepts, prerequisite rationale |
| Sessions | Key concept explanations, pre-work content rationale |
| Metaskills | Thinking skill activation rationale, domain-specific examples |
| Transfer | Real-work application scenarios, success indicators |
| Marketing | Learning promises (traceability to outcome IDs), program description factual claims |

### Expected agent-generated areas (NOT checked)

These areas are structurally generated — no source alignment check is run:

- Session activities, discussion prompts, time blocks, facilitator guide logistics
- Slide outline structure
- Assessment format and structure (rubric layout, submission instructions)
- Marketing structural framework (PAS/DOS choice), headline formulas, VOC language adaptation

---

## 3. Distortion Detection Rules

Three distortion types block draft promotion. All three are equal in severity.

### Qualifier Stripping

**What it is:** Source text contains hedging language, but the output removes or replaces it with certainty language.

**Hedging language to watch for:** may, might, in some contexts, research suggests, tends to, often, can, sometimes, for many, in certain cases, evidence indicates, appears to

**Certainty language that indicates stripping:** always, never, all, every, studies prove, research confirms, will definitely, guarantees, definitively, clearly proves

**Detection rule:** If source text contains any hedging term and the corresponding output text uses a stronger or more absolute claim, flag as Qualifier Stripped.

**Example:**
- Source says: "Research suggests peer feedback tends to improve retention in cohort-based programs"
- Output says: "Peer feedback improves retention"
- FLAGGED: "suggests" and "tends to" stripped — output presents finding as established fact

**Severity:** BLOCKING — prevents draft promotion

---

### Range Narrowing

**What it is:** Source text provides a range (numerical or qualitative), but the output narrows it to a single value or endpoint.

**Detection rule:** If source text states a range using "to", a dash, "between/and", or comparative qualifiers (intermediate to advanced, shorter to longer, early to mid), and the output presents a single value, flag as Range Narrowed — regardless of whether the chosen value falls within the stated range. The SME decides whether to keep a specific value or preserve the range.

**Numerical example:**
- Source says: "Programs of 3–6 months show strongest completion rates"
- Output says: "A 4-month program shows strongest completion rates"
- FLAGGED: range "3–6 months" narrowed to single value "4 months"

**Qualitative example:**
- Source says: "Learners at intermediate to advanced skill levels benefit most"
- Output says: "Advanced learners benefit most"
- FLAGGED: range "intermediate to advanced" narrowed to "advanced"

**Severity:** BLOCKING — prevents draft promotion

---

### Over-Claiming Grounding

**What it is:** The audit trail's "Grounded In" section claims a source backs a content section, but the source file does not actually contain the claimed finding.

**Detection rule:** For each "Grounded In" entry in the stage's audit trail draft, verify that the referenced source file contains text that substantively matches the claimed quote or finding. Paraphrase matches are acceptable; fabricated citations are not.

**Example:**
- Trail says: `Grounded In — Module 2 key concepts: research-summary.pdf — "Adult learners retain 40% more with spaced repetition"`
- Source file contains no such statistic
- FLAGGED: trail claims source backing that does not exist

**Why this matters:** Falsely claiming evidence backing is an integrity issue — as serious as distorting a real finding. Both undermine the traceability the alignment check is designed to provide.

**Severity:** BLOCKING — prevents draft promotion

---

## 4. Assumed Content Detection

After checking grounding-required areas, any content in those areas with no source material backing is flagged as assumed content.

**How to flag:** List in the alignment report and the audit trail Alignment Check subsection. Do not add markers to curriculum output files.

**Severity:** WARNING — not a blocking issue on its own. Surfaces so the SME can see what came from evidence versus agent knowledge. The SME may approve assumed content; it is their call.

**Scope:** Only flag assumed content in grounding-required areas. Structural content (activities, prompts, time blocks) is expected to be agent-generated — do not flag it.

---

## 5. Marketing Exception

Marketing does not get verbatim alignment checks. Marketing's job is transformation — language is adapted, not quoted. Apply these checks instead:

**Traceability check (required):**
Every learning promise in the marketing output must link to an outcome ID that exists in `curriculum-registry.json` under `outcome_wording`. If a promise references an outcome that is not in the registry, flag as an unsupported claim.

**Distortion checks (still apply):**
Marketing cannot claim outcomes the evidence does not support. Qualifier stripping and range narrowing rules apply to any factual claim about the program (duration, audience fit, expected results).

**Over-claiming check (still applies):**
If the audit trail lists a marketing claim as "Grounded In" a source, verify the source actually supports that claim.

---

## 6. Alignment Report Format

This report is displayed in the conversation during draft audit. It is not written to any output file — alignment issues go to the audit trail only.

```
### Alignment Check Results

**Status:** PASS / FAIL ({N} issues found)

{For each blocking issue:}
**Issue {N}: {type — Qualifier Stripped / Range Narrowed / Over-Claimed Grounding / Unsupported Claim}**
- Source says: "{verbatim quote from source material}"
- Output says: "{verbatim text from generated draft}"
- Location: {file path and section name}
- Severity: Blocking

{If assumed content found:}
**Assumed Content (no source backing found):**
- {section name}: {brief description of what was generated without source backing}

{If "Read but Not Referenced" items exist:}
**Read but Not Referenced:**
- {source file}: loaded but not incorporated into this stage's output
```

Plain language throughout. No internal codes or check IDs. The report is read by the stage agent and by the SME if escalation occurs — write it to be understood by someone without instructional design vocabulary.

---

## 7. Retry Constraint Format

When the alignment check fails and triggers a retry, inject the specific issues as constraints in the regeneration prompt. Same cumulative constraint pattern as other checks — each failed attempt adds its issues to the running list.

```
The previous draft had these alignment issues that must be corrected:

- {Issue type}: Source says "{source quote}", but your output said "{output text}". {Specific instruction: Preserve the qualifier / Preserve the range / Do not claim this as grounded / Remove unsupported claim.}
- {Repeat for each issue}

Regenerate with these specific corrections. All other content can remain the same.
```

**Key rule:** Each instruction tells the agent exactly what to preserve or remove — not just that an issue exists. Vague instructions ("be more careful about sources") are not sufficient.

---

## 8. Integration Pattern

**Sequence:** Alignment check runs after all other draft audit checks pass (vocabulary, registry, schema). If earlier checks fail, fix those first — do not run alignment on a draft that has not cleared the preceding checks.

**Retry behavior:** Same 3-attempt retry with cumulative constraints as other check failures. Issues from attempt 1 carry into attempt 2; issues from attempts 1 and 2 carry into attempt 3.

**Auto-fix rule:** Alignment issues are never auto-fixable. If source material was ignored or distorted, the stage must re-generate. This is consistent with the existing auto-fix boundary (only vocabulary, registry defaults, and outcome drift are auto-fixable).

**Escalation:** If all 3 attempts fail, escalate using the same pattern as other check failures — plain language, draft stays in `_drafts/`, specific alignment issues listed so the SME knows exactly what to fix manually.

**Trail write:** The Alignment Check subsection in the audit trail is written only after the check passes. If the check never passes and the stage escalates, the subsection is not written.
