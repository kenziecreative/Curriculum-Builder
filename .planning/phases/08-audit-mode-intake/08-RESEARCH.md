# Phase 8: Audit Mode Intake - Research

**Researched:** 2026-03-22
**Domain:** Claude Code plugin authoring — document ingestion, multi-source synthesis, confidence extraction, conflict surfacing, gap reporting
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Document ingestion**
- File paths as ARGUMENTS is the primary method: `/knz-intake path/to/guide.md path/to/slides.md`
- Auto-detect fallback: if no ARGUMENTS given, Claude looks in `workspace/{project}/source-material/` and lists what it finds before reading — user confirms before synthesis begins
- `/knz-init` must scaffold `source-material/` directory so users have a natural drop location
- Any file format Claude can read is accepted — no artificial restriction to markdown/text
- Progress announced per document as Claude reads it (not silent, not verbose per-field — one line per file)

**Confidence display**
- After reading all documents, show an extraction table: `Field | Extracted | Confidence`
- Confidence levels: High / Medium / Low / None
- High requires explicit statement in the source material — no inference. If Claude had to deduce it, it's Medium at best
- High fields are accepted as-is without asking
- Medium, Low, and None fields trigger targeted follow-up questions
- For Medium/Low: show what was extracted and ask the user to confirm or correct it
- For None: ask a targeted question (same vocabulary quarantine as clean intake — no schema jargon)
- Follow-up questions happen after the confidence table is shown, not before

**Conflict resolution**
- "Conflict" means substantive contradiction on what the program IS — who the audience is, what the skill type is, what success looks like
- Format differences (slide count vs. stated time allocation, etc.) are NOT conflicts — Claude interprets and converts format to schema structure, that's not the user's call
- When a genuine substantive conflict is found: show named contradiction with both source excerpts, then ask the user to resolve
- If user says "both are partially true": accept the nuance, ask one synthesizing follow-up to get the canonical answer. Do not force a binary choice
- Conflicts are surfaced during the follow-up question phase (same pass as Medium/Low/None fields), not as a separate step

**Gap report**
- Separate file: `workspace/{project}/00-project-brief/curriculum-gap-report.md`
- `project-brief.md` stays clean as the schema-valid intake output; gap report is human-facing
- Organized by pipeline stage (Stage 2: Outcomes, Stage 3: Assessments, Stage 4: Modules, Stage 5: Sessions, Stage 6: Metaskills, Stage 7: Transfer Ecosystem, Stage 8: Marketing)
- Three states per stage section: Exists (what was found), Shallow (found but doesn't meet schema requirements), Shallow is defined by schema-field completeness, not subjective depth judgment, Missing (nothing found)
- Dashboard should surface both files from 00-project-brief/

**Gate and confirmation**
- Same gate pattern as clean intake: brief summary + AskUserQuestion with "Looks good" / "Edit something" / "Start over"
- Shown after both project-brief.md and curriculum-gap-report.md are ready to write
- No separate audit-specific gate — consistent UX regardless of path taken

### Claude's Discretion
- Exact wording of per-document progress announcements
- How many follow-up questions to ask when multiple fields need input (batch or sequential)
- Whether conflicts and gap questions are interleaved or grouped
- Ordering of follow-up questions when multiple fields need input

### Deferred Ideas (OUT OF SCOPE)
- Stage pre-population from existing content (outcomes, assessments, module structure, sessions pre-filled from source documents) — Phase 9
- Evaluation mode: run external curriculum through validation rubrics without the full pipeline — Phase 10
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INTK-07 | `/knz-intake` opens by asking whether the user is starting fresh or bringing in existing materials — determines the intake path, not a separate command | Opening branch question pattern documented below; knz-intake.md is the insertion point |
| INTK-08 | Audit mode accepts multiple source documents simultaneously and synthesizes across all of them before asking any questions | Multi-document read sequence and synthesis-before-questions ordering documented below |
| INTK-09 | Audit mode extracts intake schema fields from source documents and shows confidence level per field before asking any follow-up questions | Extraction table pattern and confidence rubric documented below; stage-01-intake.md schema is the extraction target |
| INTK-10 | Audit mode surfaces conflicts between source documents as named contradictions requiring resolution | Conflict detection definition and surface pattern documented below |
| INTK-11 | Audit mode produces a curriculum gap report alongside standard project-brief.md — identifying what exists, what's shallow, what's missing relative to full pipeline schema | Gap report structure and schema-field-completeness definition documented below; all 7 pipeline stage schemas reviewed |
</phase_requirements>

---

## Summary

Phase 8 adds an audit mode branch to the existing `/knz-intake` command. The branch is triggered by a single routing question at the command's opening — preserving the clean intake path unchanged. When audit mode is selected, the command reads all provided source documents, synthesizes across them into a single extraction table with confidence levels, surfaces genuine conflicts for resolution, asks targeted follow-up questions only for non-High fields, then produces both `project-brief.md` (schema-valid, same format as clean intake) and `curriculum-gap-report.md` (human-facing, pipeline-stage-organized).

The implementation is almost entirely a new command flow authored in prose — no new libraries, no new infrastructure, no schema changes. The only structural changes are: (1) a routing question inserted at `knz-intake.md` opening, (2) a new `source-material/` directory added to `knz-init.md`'s scaffold step, and (3) a new section in the dashboard that surfaces `curriculum-gap-report.md` when present.

The primary technical risks are confidence calibration (defining exactly when "explicit statement" vs. "deduction" applies) and gap report accuracy (the planner must know what each pipeline stage's schema requires so Claude can correctly assess Exists/Shallow/Missing). Both are addressed by reading the stage schemas directly rather than relying on heuristics.

**Primary recommendation:** Author audit mode as a self-contained section appended to `knz-intake.md`, immediately after the existing Prerequisites block, branching at the Opening step. The new section follows the same prose-command style as all existing commands. No new agent file is needed.

---

## Standard Stack

### Core

| Asset | Type | Purpose | Why Standard |
|-------|------|---------|--------------|
| `knz-intake.md` | Existing command | Insertion point — audit mode branches here | Audit mode is a branch, not a separate command (INTK-07) |
| `stage-01-intake.md` (reference schema) | Schema file | Extraction target — all 11 fields Claude must extract | Identical schema as clean intake; audit mode must produce the same schema-valid brief |
| `knz-init.md` | Existing command | Must gain `source-material/` scaffold step | Decision: `/knz-init` scaffolds this directory |
| `AskUserQuestion` | Claude Code built-in | Routing question, conflict resolution, confirmation gate | Established pattern across all pipeline commands |

### Supporting

| Asset | Type | Purpose | When to Use |
|-------|------|---------|-------------|
| `stage-02-outcomes.md` through `stage-08-marketing.md` | Schema files | Gap report reference — what each pipeline stage requires | Read when authoring the gap report logic; Claude must check these to assess Shallow vs. Missing |
| `workspace/{project}/00-project-brief/` | Output directory | Destination for both output files | Exists from knz-init scaffold |
| Dashboard `00-project-brief/` section | Dashboard component | Must surface `curriculum-gap-report.md` when present | Triggered only when audit mode was used |

### No New Dependencies

Audit mode requires no new npm packages, no new agent files, no schema changes. All output targets and infrastructure already exist.

---

## Architecture Patterns

### Recommended Command Structure

The audit mode branch inserts into `knz-intake.md` at this location:

```
knz-intake.md
├── Prerequisites (unchanged)
│   ├── 1. Check workspace exists
│   └── 2. Check Stage 1 status
├── Opening (MODIFIED — routing question inserted here)
│   ├── "Starting fresh?" → existing clean intake flow (unchanged)
│   └── "Have existing materials?" → AUDIT MODE (new section below)
├── [EXISTING CLEAN INTAKE — unchanged]
│   ├── Thematic Group 1: About Your Learners
│   ├── Thematic Group 2: About Your Program
│   ├── Thematic Group 3: About Success
│   └── Confirmation and Gate
└── [AUDIT MODE — new section]
    ├── Step 1: Document ingestion
    ├── Step 2: Synthesis and extraction
    ├── Step 3: Confidence table display
    ├── Step 4: Follow-up questions (Medium/Low/None + conflicts)
    ├── Step 5: Confirmation gate (same AskUserQuestion pattern)
    └── Step 6: Write project-brief.md + curriculum-gap-report.md
```

### Pattern 1: Routing Question at Opening

The existing Opening section delivers a framing paragraph before the clean intake begins. The routing question is inserted before that framing — it is the very first user-facing output of the command.

```markdown
## Opening

Use AskUserQuestion with two options:

- **"I'm starting from scratch"**
- **"I have existing materials to bring in"**

On "I'm starting from scratch": proceed to the existing clean intake flow (Thematic Group 1, unchanged).

On "I have existing materials to bring in": proceed to the Audit Mode section.
```

This change is a two-line addition to the existing Opening section. The rest of clean intake is untouched.

### Pattern 2: Document Ingestion — Arguments First, Auto-detect Fallback

```markdown
## Audit Mode — Step 1: Document Ingestion

### If ARGUMENTS were provided with the command:
Read each file at the provided paths. As each file is read, announce one line:
> Reading [filename]...

Do not wait until all files are read to announce progress — announce as each is processed.

### If no ARGUMENTS were provided:
Check `workspace/{project}/source-material/` for any files.

If files are found, list them:
> I found these files in your source-material folder:
> - [filename 1]
> - [filename 2]
>
> Should I read these? (Or add files to source-material/ first and re-run.)

Use AskUserQuestion: **"Yes, read these files"** / **"Let me add more files first"**

On "Yes": read all listed files, announcing each as above.
On "Let me add more files first": stop here.

If no files are found in source-material/:
> I didn't find any files in workspace/{project}/source-material/. You can either:
> - Drop files there and re-run /knz-intake
> - Run /knz-intake with file paths directly: /knz-intake path/to/guide.md path/to/slides.md
```

### Pattern 3: Synthesis and Extraction Table

After all documents are read, Claude synthesizes internally before displaying anything. The user never sees intermediate extraction state — they see only the completed table.

The extraction table maps directly to the stage-01-intake.md schema fields:

```markdown
## Audit Mode — Step 2: Extraction Table

After reading all documents, display:

**What I found in your materials:**

| Field | What the documents say | Confidence |
|-------|------------------------|------------|
| Program topic | [extracted value or "—"] | High / Medium / Low / None |
| Who it's for | [extracted value or "—"] | High / Medium / Low / None |
| Current skill level | [extracted value or "—"] | High / Medium / Low / None |
| Format and length | [extracted value or "—"] | High / Medium / Low / None |
| Delivery mode | [extracted value or "—"] | High / Medium / Low / None |
| Skill type | [extracted value or "—"] | High / Medium / Low / None |
| Cultural context | [extracted value or "—"] | High / Medium / Low / None |
| Where they'll use it | [extracted value or "—"] | High / Medium / Low / None |
| What success looks like | [extracted value or "—"] | High / Medium / Low / None |

[Conditionals: self-direction level shown when inferable; cohort size shown for long programs]

**High confidence** = explicitly stated in source material (no inference required)
**Medium confidence** = present but requires interpretation or conversion
**Low confidence** = only partially covered or implied
**None** = not mentioned
```

Plain-language field labels (not schema field names) must be used — consistent with vocabulary quarantine rule.

### Pattern 4: Confidence Rubric

This is the most precision-sensitive part of the implementation. The rubric must be concrete enough that Claude applies it consistently:

| Confidence | Criterion | Example |
|------------|-----------|---------|
| **High** | Field value is stated explicitly; no inference or conversion required | "This is a 6-session, 90-minute workshop" → `session_count: 6`, `session_length_minutes: 90` |
| **Medium** | Field is addressable from document but requires interpretation, behavioral reformatting, or conversion | "Participants are beginners" → must be converted to behavioral format ("can do X, cannot yet do Y") |
| **Low** | Field is partially implied across documents with conflicting signals or thin evidence | Two documents imply different audiences without explicit statement |
| **None** | No relevant information found in any document | Transfer ecosystem, reflection structure, social learning design absent entirely |

**Critical rule:** Format conversion (slide count → session length estimate) is Claude's job, not a conflict or a gap. When Claude can derive a schema value from document structure, that is Medium confidence extraction, not a missing field.

### Pattern 5: Follow-up Questions (Medium/Low/None + Conflicts)

All follow-up interactions happen in a single pass after the confidence table. Ordering is Claude's discretion (see User Constraints). The follow-up rules:

**For High fields:** Accept as-is. Never ask about them.

**For Medium fields:** Show what was extracted and ask for confirmation or correction.
```
I found this for [plain-language field name]: "[extracted value]"

Does that capture it accurately, or would you like to adjust it?
```

**For Low fields:** Show what was found (if anything) and ask for clarification.
```
Your materials touch on [plain-language field name] but I couldn't pin down a clear answer. [What was found, briefly.] What's the clearest way to put this?
```

**For None fields:** Ask a targeted question using clean-intake vocabulary quarantine — same language as the clean intake questions for that field, without the full thematic framing.

**For conflicts:** Show named contradiction with source attribution.
```
I noticed a conflict between your two documents on [topic]:

- [Document A title] says: "[excerpt]"
- [Document B title] says: "[excerpt]"

Which is the accurate picture — or are both partially true?
```
If user says "both are partially true": accept the nuance, ask one synthesizing question to get the canonical answer.

**Vocabulary quarantine applies to all follow-up questions:** No schema field names, no instructional design terms, no enum values exposed.

### Pattern 6: Gap Report Structure

The gap report is organized by pipeline stage, not by schema field. It is human-facing — the SME reads it to understand what work remains before the pipeline can run.

```markdown
# Curriculum Gap Report

**Project:** {project-name}
**Generated:** {date}
**Source documents reviewed:** {list}

---

## How to Read This Report

This report compares your existing materials against what the full curriculum pipeline needs to build a complete, ready-to-deliver program. For each stage:
- **Exists** = your materials have this; the pipeline will build from it
- **Shallow** = something is here, but it doesn't yet meet the structural requirements; the pipeline will need to fill it out
- **Missing** = nothing found; the pipeline will build this from scratch

---

## Stage 2: Learning Outcomes

### Exists
[What outcome-level content was found in source documents]

### Shallow
[Outcomes found but gaps in coverage — e.g., outcomes don't span required Bloom's levels, or session-level outcomes absent, or behavioral verbs missing]

### Missing
[What stage-02 schema requires that was not found at all]

---

## Stage 3: Assessment Design

### Exists
### Shallow
### Missing

---

## Stage 4: Module Structure

### Exists
### Shallow
### Missing

---

## Stage 5: Session Content

### Exists
### Shallow
### Missing

---

## Stage 6: Metaskill Mapping

### Exists
### Shallow
### Missing

---

## Stage 7: Transfer Ecosystem

### Exists
### Shallow
### Missing

---

## Stage 8: Marketing

### Exists
### Shallow
### Missing

---

## Summary

| Stage | Status |
|-------|--------|
| 2: Learning Outcomes | Shallow / Missing |
| 3: Assessment Design | Missing |
| 4: Module Structure | Exists |
| 5: Session Content | Shallow |
| 6: Metaskill Mapping | Missing |
| 7: Transfer Ecosystem | Missing |
| 8: Marketing | Missing |

**Next step:** Run `/knz-outcomes` to continue — the pipeline will use your existing materials where they meet requirements and generate what's missing.
```

### Pattern 7: Confirmation Gate (Identical to Clean Intake)

```markdown
## Audit Mode — Step 5: Confirmation Gate

Present summary using the same "Your Program at a Glance" format as clean intake (plain language, no schema field names).

Then add:

**Your curriculum gap report is ready.** [Summary: X stages have content to build from; Y stages will be built from scratch.]

Use AskUserQuestion:
- **"Looks good — let's keep going"**
- **"I want to edit something"**
- **"Start over from scratch"**
```

On approval: write both files, update STATE.md (Stage 1 complete, same rules as clean intake), deliver forward-looking message.

### Pattern 8: knz-init Scaffold Update

The only change to `knz-init.md` is adding `source-material/` to the directory list in Step 3:

```
workspace/{project-name}/
  00-project-brief/
  01-outcomes/
  02-assessments/
  03-modules/
  04-sessions/
  05-metaskills/
  06-transfer/
  07-marketing/
  08-validation/
  source-material/       ← ADD THIS
  delivery/
```

No other change to knz-init.md.

### Anti-Patterns to Avoid

- **Asking questions before showing the table:** The confidence table must appear before any follow-up questions. If Claude starts asking questions during reading, it breaks the synthesis-first contract (INTK-09).
- **Marking format conversions as conflicts:** Slide count vs. stated session length is not a conflict — Claude converts format to schema structure silently (CONTEXT.md decision).
- **Showing schema field names in the extraction table:** `program_topic`, `self_direction_level`, etc. must never appear in user-facing output. Use plain language throughout.
- **Running full clean-intake interview after audit:** If audit mode extracts High confidence on a field, that field is accepted — no re-asking. The follow-up questions cover only genuine gaps.
- **Producing a gap report before the project-brief is confirmed:** Both files are written simultaneously on confirmation gate approval, not before.
- **Calling out STATE.md operations:** Silent state management rule applies to audit mode.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Routing clean vs. audit intake | A separate `/knz-audit` command | A branch question inside existing `/knz-intake` | INTK-07 is explicit: unified command, branch at opening. Separate command splits user mental model |
| Confidence calibration | Custom confidence algorithm | Concrete prose rubric with examples in the command file | The rubric IS the implementation — Claude applies it at runtime, not a scoring system |
| Gap report schema knowledge | Hardcoded field lists in the command | References to stage schemas in `.claude/reference/schemas/` | Schemas are already authored and maintained; referencing them keeps gap assessment current |
| Vocabulary quarantine enforcement | A separate filter step | Inline enforcement — same approach as clean intake | The pattern is established and working; reuse, don't reinvent |
| Conflict detection logic | A diff algorithm | Plain prose definition: substantive contradiction on what the program IS | Claude can identify this from prose; over-engineering produces false positives on format differences |

---

## Common Pitfalls

### Pitfall 1: Confidence Level Inflation
**What goes wrong:** Claude marks fields as High when it had to infer or convert the value. The user trusts High-confidence fields as accurate, but they contain silent errors.
**Why it happens:** The distinction between "stated" and "derivable" is subtle. "6 slides per session" → 90-minute session requires inference about slide pace.
**How to avoid:** The rubric must be specific: High requires the schema value to be directly readable from source text without Claude supplying logic. Any inference → Medium at most.
**Warning signs:** Gap report shows many "Exists" entries but project-brief has values that don't appear verbatim in source documents.

### Pitfall 2: Conflict False Positives on Format Differences
**What goes wrong:** Claude flags "slide deck has 24 slides but guide says 90 minutes" as a conflict and asks the user to resolve it.
**Why it happens:** Format differences look like contradictions if the definition of "conflict" is not precise.
**How to avoid:** The command must state the conflict definition explicitly: substantive contradiction on audience, skill type, or success definition — not format differences. Format conversion is Claude's job.
**Warning signs:** User getting multiple "conflict" prompts that feel like housekeeping rather than real decisions.

### Pitfall 3: Follow-up Questions Before Confidence Table
**What goes wrong:** Claude reads one document, sees a gap, asks about it, reads the next document, asks another — turning audit mode into an interleaved interview.
**Why it happens:** Default Claude behavior is to ask questions as gaps are discovered.
**How to avoid:** The command must explicitly state: read all documents first, synthesize, display table, then ask. This ordering is the contract.
**Warning signs:** User sees questions interspersed with progress announcements.

### Pitfall 4: Gap Report Shallow Assessment Is Subjective
**What goes wrong:** Claude marks outcomes as "Shallow" based on quality judgment rather than schema compliance. Two sessions produce different assessments for the same content.
**Why it happens:** "Shallow" is easy to confuse with "not as good as I'd make it."
**How to avoid:** "Shallow" must be defined by schema-field-completeness only. For outcomes: exists but doesn't span required Bloom's levels = Shallow. Exists, spans levels, uses observable verbs = Exists (even if Claude would write them differently).
**Warning signs:** Gap report using subjective language like "limited" or "underdeveloped" rather than naming the specific missing schema field.

### Pitfall 5: Vocabulary Quarantine Breaks in Follow-up Questions
**What goes wrong:** Claude asks "What is the Bloom's level of these outcomes?" or "Is this a closed or open skill?" during the None-field follow-up questions.
**Why it happens:** The clean-intake vocabulary quarantine is well-established for the clean path, but the audit follow-up questions are new and may not inherit the constraint implicitly.
**How to avoid:** The audit mode section must state the vocabulary quarantine explicitly, not just reference the clean intake. Include prohibited terms list inline.
**Warning signs:** User asks "What's a Bloom's level?"

### Pitfall 6: STATE.md Audit-Specific State Needed
**What goes wrong:** Planning assumes audit mode needs its own STATE.md fields or a new audit_mode boolean. This adds schema complexity and breaks clean intake resume logic.
**How to avoid:** Audit mode produces the same completion state as clean intake. Stage 1 status goes to `complete` on confirmation gate, exactly as in clean intake. No new STATE.md fields are needed.
**Evidence:** CONTEXT.md is explicit: "Stage 1 status rules carry forward unchanged — audit mode produces the same completion state as clean intake."

---

## Schema Reference for Gap Report

The gap report assessment requires Claude to know what each pipeline stage needs. Summary of schema-field-completeness thresholds by stage:

### Stage 2: Outcomes — Shallow if:
- Outcomes exist but don't span required minimum Bloom's levels (4 for long programs, 3 for medium, 2 for short)
- Outcomes exist but use prohibited verbs ("understand", "know", "appreciate")
- Module-level or session-level outcomes missing when program length requires them
- `transfer_context` missing per outcome (required field)
- No enduring understandings or essential questions authored

### Stage 3: Assessments — Shallow if:
- Assessments exist but lack `paired_objective` linkage to outcomes
- Formative assessments missing (existing materials often have only summative)
- Assessment does not match `skill_type` (e.g., procedural quiz for an `open` skill)

### Stage 4: Modules — Shallow if:
- Module structure exists but lacks DCR trigger consideration (required when skill_type=open and bloom>=Analyze)
- Module groupings exist but aren't named with `module_name` format
- Group processing prompt absent or generic

### Stage 5: Sessions — Shallow if:
- Session content exists but not organized by session_template (gagne/5e_7e/merrill/wippea/universal_tma_arc)
- Pre-work exists but not tagged to specific sessions
- No reflection prompts per session
- Theory content exists but application activities absent (flipped classroom violation)

### Stage 6: Metaskills — Shallow if:
- Thinking routines mentioned but not named specifically (generic "discussion" or "reflection")
- Metaskills referenced but not mapped to specific sessions
- Developability hierarchy sequence not respected (Innovating/Adapting before Exploring/Creating)

### Stage 7: Transfer Ecosystem — Shallow if:
- Pre-program readiness assessment absent or lacks minimum 3 questions
- Implementation intentions absent or not tied to specific modules
- Post-program follow-through plan absent
- Manager briefing absent when contact_hours > 4

### Stage 8: Marketing — Almost always Missing for existing curriculum
- Structured marketing derivation with `curriculum_traceability.strength` is rarely in source documents
- Treat as Missing unless source documents contain explicit audience-facing promotional copy

---

## Integration Points

### knz-init.md Change (Required)
Add `source-material/` to the scaffold directory list in Step 3. No other change. Confirm that `templates/project-scaffold/.gitkeep-dirs` should also be updated so the scaffold template is authoritative.

### knz-intake.md Change (Main Work)
Insert routing question at Opening. Add audit mode section at end of file. Existing clean intake content is untouched.

### Dashboard Change (Scoped)
When `00-project-brief/` is shown in the dashboard, check for `curriculum-gap-report.md` and surface it alongside `project-brief.md` if present. The CONTEXT.md notes this is needed but defers the specifics to planning — it is in scope for this phase.

### STATE.md (No Changes)
Audit mode does not require new STATE.md fields. Stage 1 completion is identical to clean intake.

---

## Code Examples

### Extraction Table (User-Facing Display)

```markdown
**What I found in your materials:**

| Field | What the documents say | Confidence |
|-------|------------------------|------------|
| Program topic | AI agent workflows for developer teams | High |
| Who it's for | Software developers with some Python experience | High |
| Current skill level | Can write basic scripts; haven't built or deployed an agent | Medium |
| Program format | 6 sessions × 90 minutes, cohort-based | High |
| Where it's delivered | Online (virtual) | Medium |
| Skill type | Open — depends on architectural judgment | Medium |
| Cultural context | — | None |
| Where they'll use it | Building and deploying production agents at work | Low |
| What success looks like | — | None |

High confidence fields are accepted as-is. I'll ask about the others.
```

### Conflict Display

```markdown
I noticed a conflict between your documents on who this program is for:

- **Facilitator Guide** says: "This workshop is designed for developers who are new to AI tooling and want to understand the basics."
- **Slide Deck Outline** says: "Participants should already be comfortable with LLM APIs and want to go deeper on agent orchestration."

Which is the accurate starting point — or are both partially true?
```

### Gap Report Summary Table

```markdown
## Summary

| Stage | Status |
|-------|--------|
| 2: Learning Outcomes | Shallow — outcomes exist but don't span 4 Bloom's levels; session-level outcomes absent |
| 3: Assessment Design | Missing |
| 4: Module Structure | Exists |
| 5: Session Content | Shallow — session structure present; pre-work, reflection prompts, transfer connection absent |
| 6: Metaskill Mapping | Missing |
| 7: Transfer Ecosystem | Missing |
| 8: Marketing | Missing |

**4 of 7 stages need to be built from scratch.** The pipeline will use your existing module structure and session design where it meets requirements, and generate the rest.
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected for command-file testing — commands are prose, not executable code |
| Config file | N/A |
| Quick run command | Manual: run `/knz-intake` with test documents in a test workspace |
| Full suite command | Manual verification walkthrough per success criteria |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INTK-07 | Opening routing question appears; clean intake path unchanged | manual | N/A — prose command | ❌ Wave 0 |
| INTK-08 | Multiple files read; synthesis before questions | manual | N/A — prose command | ❌ Wave 0 |
| INTK-09 | Extraction table shown before any follow-up questions | manual | N/A — prose command | ❌ Wave 0 |
| INTK-10 | Conflicts surfaced as named contradictions | manual | N/A — prose command | ❌ Wave 0 |
| INTK-11 | curriculum-gap-report.md written; organized by stage; Shallow defined by schema fields | manual | N/A — prose command | ❌ Wave 0 |

**Note:** All five requirements are behavioral — they require a live Claude session to test. There is no automated test harness for prose command files in this project. Verification follows the same manual walkthrough pattern used in Phases 5, 6, and 7. The real-world test case from CONTEXT.md (AI agent workflows workshop, facilitator guide + slide deck) is the canonical verification scenario.

### Sampling Rate

- **Per task commit:** Author reads the authored section and checks for vocabulary quarantine violations and anti-patterns
- **Per wave merge:** Full manual walkthrough with test documents
- **Phase gate:** Success criteria 1-5 each manually verified before `/gsd:verify-work`

### Wave 0 Gaps

None — no test infrastructure needed. Command files are verified manually. This is consistent with all prior phases.

---

## Open Questions

1. **Dashboard surfacing of curriculum-gap-report.md**
   - What we know: CONTEXT.md says dashboard should surface both files from 00-project-brief/; the dashboard component for this directory exists from Phase 4
   - What's unclear: Whether this requires a code change to the dashboard's workspace-loader or can be handled by the existing FileExpander component that already renders any file in a directory
   - Recommendation: Planner should scope a task to check the dashboard's 00-project-brief/ rendering and determine if curriculum-gap-report.md surfaces automatically or needs explicit handling

2. **templates/project-scaffold/.gitkeep-dirs update**
   - What we know: knz-init.md reads from `templates/project-scaffold/.gitkeep-dirs` to know which directories to create; `source-material/` must be added
   - What's unclear: Whether this file is the authoritative source or whether knz-init.md hardcodes the list
   - Recommendation: Planner should include a task to update both `knz-init.md` and `templates/project-scaffold/.gitkeep-dirs` for `source-material/`

3. **Batch vs. sequential follow-up questions**
   - What we know: This is Claude's discretion per CONTEXT.md
   - What's unclear: Whether guidance should be prescribed in the command or left entirely to Claude's runtime judgment
   - Recommendation: Leave as Claude's discretion; document the tradeoff in the command (batch = less interruption but harder to track; sequential = clearer but more turns) so the executing Claude makes an informed choice

---

## Sources

### Primary (HIGH confidence)
- `knz-intake.md` — full command structure, existing patterns, gate mechanism, vocabulary quarantine rules
- `stage-01-intake.md` (reference schema) — all required fields, enum values, validation rules, duration scaling
- `stage-02-outcomes.md` through `stage-08-marketing.md` — schema-field-completeness thresholds per pipeline stage (used for gap report Shallow/Missing definitions)
- `08-CONTEXT.md` — all locked decisions, constraints, and integration points
- `knz-init.md` — scaffold structure, directory list to update
- `workspace/test-program/STATE.md` — real project state, confirms Stage 1 completion fields

### Secondary (MEDIUM confidence)
- `project_v2_audit_mode.md` (auto-memory) — design rationale, real-world test case (AI agent workflows workshop)
- `.planning/REQUIREMENTS.md` — INTK-07 through INTK-11 definitions

### Tertiary (LOW confidence)
- None — all findings grounded in project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all assets are existing project files, no new dependencies
- Architecture: HIGH — patterns established by CONTEXT.md decisions; no inference required
- Pitfalls: HIGH — derived from CONTEXT.md explicit anti-patterns and project history in STATE.md
- Gap report schema thresholds: MEDIUM — summarized from stage schemas; planner should confirm against actual schema files before authoring gap report logic

**Research date:** 2026-03-22
**Valid until:** Stable — no external dependencies. Valid until stage schemas change or Phase 9 (pre-population) scope bleeds in.
