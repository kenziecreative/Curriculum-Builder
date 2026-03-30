# Audit Trail Format Reference

This document defines the canonical format for `audit-trail.md` files. Every generation stage loads this reference before writing its trail section.

---

## File Location and Lifecycle

- Trail lives at `workspace/{project}/audit-trail.md`
- Intake initializes the file; each subsequent stage appends its section
- On re-generation, the stage's existing section is replaced, not appended — the trail reflects current state, not full history
- Trail is an internal build artifact — not included in the HTML delivery package

---

## Top-Level Summary Block

Written by intake. Each stage updates the counters after completing its trail section.

```
# Audit Trail: {program_name}
Generated: {ISO timestamp}

## Build Summary
- **Stages completed:** {list — e.g., Stage 1: Intake, Stage 2: Outcomes}
- **Source materials:** {count} files loaded
- **Grounding:** {percentage}% of content sections grounded in source material
- **Alignment checks:** {count} passed, {count} issues resolved
- **Consistency checks:** {count} passed, {count} issues resolved
- **SME checkpoints:** {count} confirmations recorded
- **Modifications:** {count} changes at review gates
- **Revisions:** {count} post-delivery revisions
```

Grounding percentage = (grounded sections / total sections) × 100, rounded to nearest whole number. This is a rough estimate — exact tracking is not required.

---

## Stage Section Template

Each generation stage writes one section using this template. Stages appear in pipeline order (intake first, marketing last). Use `---` horizontal rules between stage sections.

```
---

## Stage {N}: {Stage Name}
Generated: {ISO timestamp}

### Grounded In
{For each major output section (e.g., "Module 2 outcomes", "Session 3 pre-work"):}
- **{section name}**: {source filename} — "{relevant quote or finding that directly shaped this section}"

### Agent-Generated
- {bullet list of content created from the agent's own knowledge, not from source material}
- {e.g., "Self-direction level assessment: classified as Stage 2 - Interested based on conversation"}
- {e.g., "Transfer context synthesis: derived from audience description and stated transfer context"}

### Read but Not Referenced
- {source files that were loaded but not used by this stage — surfaces ignored evidence for alignment verification}
- {If all loaded files were referenced, write: All loaded files were referenced above.}
- {If no source files were loaded, omit this subsection entirely.}

### Alignment Check
{Present for all generation stages (2–8) when source material exists. Omit when no source material AND no grounding document exists. Written after the alignment check passes — if the check never passes and the stage escalates, this subsection is not written.}
- **Result:** {PASS or FAIL}
- **Issues found:** {count, or 0}
- **Distortions detected:** {list each: type, source quote, output text — or None}
- **Assumed content:** {list areas where grounding-required output was not backed by source material — or None}
- **Attempts:** {1, 2, or 3 — how many generation attempts before passing}

### Consistency Check
{Present for Stage 5 (Sessions) and Stage 8 (Marketing) when upstream stages exist. Omit for stages without per-stage consistency checks (Stages 2, 3, 4, 6, 7). Written after the consistency check passes — if the check never passes and the stage escalates, this subsection is not written.}
- **Result:** {PASS or FAIL}
- **Checks run:** {list, e.g., "Time math, Prerequisite ordering, Outcome coverage" for Stage 5; "Claim-to-assessment chain" for Stage 8}
- **Issues found:** {count, or 0}
- **Contradictions:** {list each: type, source value, output value, files — or None}
- **Attempts:** {1, 2, or 3}

### SME Confirmation
{Only present if this stage has a human review gate}
- **Confirmed:** {ISO timestamp}
- **Decision:** {what was confirmed — e.g., "Approved project brief as presented"}
- **Modifications:** {if any — before/after values and SME's reason if stated. If no modifications: None.}
```

---

## No-Source-Material Variant

When no source materials exist (from-scratch build), the header includes this note directly after the Build Summary:

```
> No source materials available — all content is agent-generated.
```

Stage sections use a simplified format — omit `Grounded In` and `Read but Not Referenced` subsections entirely. Only `Agent-Generated` and `SME Confirmation` (where applicable) are written.

---

## Revision Entry Template

Used by `/curriculum:revise` after post-delivery feedback. Revision entries are appended after all stage sections, in chronological order.

```
---

## Revision: {ISO date}
- **Feedback:** {what the SME observed or requested — use their words where possible}
- **Changes:** {what was changed — specific, not vague ("Rewrote Module 3 outcomes to use observable verbs" not "Updated outcomes")}
- **Affected stages:** {which stages were updated — e.g., Stage 2: Outcomes, Stage 4: Modules}
```

---

## Format Rules

- Chronological order — stages appear in pipeline order (Stage 1: Intake first, Stage 8: Marketing last)
- Each stage section is self-contained — readable without context from other sections
- Use `---` horizontal rules between stage sections
- ISO timestamps use the format `YYYY-MM-DDTHH:MM:SSZ`
- Grounding percentage in the Build Summary is a rough estimate — exact per-section math is not required
- Trail terms ("Grounded In", "Agent-Generated", "Read but Not Referenced") are internal vocabulary — acceptable to use as-is in the trail file since it is not user-facing content delivered to learners
- Alignment Check subsection appears after "Read but Not Referenced" and before "SME Confirmation" in each stage section
- Alignment Check subsection is only written when the alignment check actually runs (source material present) and only after it passes
- Consistency Check subsection appears after Alignment Check and before SME Confirmation in each stage section
- Consistency Check subsection is only written when the consistency check actually runs (upstream stages present) and only after it passes

---

## Stage Section Index

| Stage | Name | Has SME Gate |
|-------|------|--------------|
| 1 | Intake | Yes — brief confirmation |
| 2 | Outcomes | No |
| 3 | Assessments | Yes — assessment design approval |
| 4 | Modules | No |
| 5 | Sessions | No |
| 6 | Metaskills | No |
| 7 | Transfer | No |
| 8 | Marketing | No |
| 9 | Validation | Yes — final delivery approval |

Stages 26-29 (Phases 26-29 of v5.0 build): each phase appends trail-writing logic to its respective stage command.
