# Execution Fidelity Audit — Phases 12–16

**Auditor:** Claude Opus 4.6 (1M context)
**Date:** 2026-03-26
**Scope:** Every file touched by phases 12–16, checked against phase plans for substantive encoding vs. surface mention

**Note:** Gaps already fixed today (formatting inline rules, /clear directive, AskUserQuestion STOP, pre-population hook bypass, marketing display separation, copywriting doctrine) are excluded from this audit.

---

## Phase 12: Voice System

**Goal:** Create a shared voice reference file, wire all commands to it, and add inline guardrails to the 4 worst-offending commands.

### Properly Encoded
- `curriculum-voice.md` exists with all 4 sections, 53 lines, 15-term prohibition table with plain-language substitutes
- All 13 command files contain `curriculum-voice.md` reference line in Persona section
- 4 worst offenders (marketing, transfer, assessments, session-generator) have `Critical inline guardrail` lines with tight term lists
- sessions.md orchestrator has reference-only Persona (correct — orchestrator does not generate)
- session-generator.md agent has new Persona section with reference + guardrail
- Signature moves (results-first, learner-subject, named-handoff close) are well-specified with weak/strong examples

### Mentioned but Not Deeply Encoded
- None found. Phase 12 was well-scoped and well-executed.

### Missing
- None found. Phase 12 deliverables are complete.

---

## Phase 13: Command Retrofit

**Goal:** One-pass structural and vocabulary cleanup across all commands + session-generator: hidden enforcement steps, vocabulary replacement, warm handoffs, context-clear nudges, Writing for Clarity, plus format upgrades for marketing (prose), transfer (narrative), and session-generator (slide/facilitator formats).

### Properly Encoded
- Warm handoff closes present in all stage-completing commands
- Context-clear nudges correctly absent from auto-chained commands (metaskills, sessions) and present in others
- ASCII box formatting in outcomes.md Conversation Output
- Assessment alignment map replaced with plain-language summary in assessments.md
- NEEDS: marker check added to validate.md
- Dashboard reminders in validate.md, init.md, sessions.md
- Marketing output writes markdown prose, not YAML
- Transfer output writes narrative markdown with plain headings
- Session-generator slide-outline.md uses three-field prose blocks (On screen / Why it matters / Facilitator) with plain section headings
- Facilitator-guide.md uses Watch for / What it means / Your move diagnostic blocks
- session.md section headers use plain descriptive labels (no TMA arc vocabulary)
- Pre-write cleanup (HTML comment strip, working notes strip, NEEDS: marker check) explicit in session-generator.md write sequence
- Full objective text alongside IDs in session.md
- Traceability table separated from marketing prose copy in conversation display

### Mentioned but Not Deeply Encoded

**GAP 13-A: Writing for Clarity instruction missing from session-generator.md**
- File: `.claude/plugins/curriculum/agents/session-generator.md`
- The "kernel sentences, no warm-up openers, conclusion-first" instruction appears in 9 command files (init, intake, outcomes, assessments, modules, metaskills, validate, approve, sessions) but is completely absent from session-generator.md — the highest-volume content generator in the entire pipeline.
- The phase plan (13-04) required QUAL-09 and lists it as a completed requirement, but the instruction was never added to the agent file.
- Impact: HIGH. Session-generator produces facilitator guides, participant materials, slide outlines, and session plans. Without this instruction, all session content is vulnerable to warm-up openers and meandering prose.

**GAP 13-B: Writing for Clarity instruction missing from transfer.md**
- File: `.claude/plugins/curriculum/commands/transfer.md`
- No "kernel sentences" instruction anywhere in the file. The gate summary and file write sections both generate user-visible text without this constraint.
- Impact: MEDIUM. Transfer output is prose-format (per Phase 13 upgrade), making filler language more likely without the instruction.

**GAP 13-C: Writing for Clarity instruction missing from resume.md**
- File: `.claude/plugins/curriculum/commands/resume.md`
- No "kernel sentences" instruction. Resume produces user-visible status output.
- Impact: LOW. Resume output is brief by nature, but the pattern should be consistent.

**GAP 13-D: Writing for Clarity instruction missing from evaluation-mode.md**
- File: `.claude/plugins/curriculum/commands/evaluation-mode.md`
- No "kernel sentences" instruction. Evaluation output includes strengths summary and failure descriptions.
- Impact: LOW-MEDIUM. Evaluation is standalone, but its output is user-facing.

**GAP 13-E: "Bloom's level" appears as a generation instruction in marketing.md**
- File: `.claude/plugins/curriculum/commands/marketing.md`, line 105
- Text: `"Use behavioral language matching the Bloom's level of the cited objectives."`
- This is a generation instruction, not user-facing output. But it uses the prohibited term "Bloom's level" in a context where the model is being told to think about Bloom's while generating copy. If the model leaks the term into copy, the generation instruction is the source.
- Should say: "Use behavioral language matching the thinking level of the cited objectives."
- Impact: MEDIUM. A model reading this instruction could echo "Bloom's level" into generated marketing copy.

**GAP 13-F: "Bloom span" and "Kirkpatrick" in approve.md Final Validation display template**
- File: `.claude/plugins/curriculum/commands/approve.md`, lines 79 and 96
- Line 79: `[Bloom span in plain language, e.g., "recall through create"]` — the instruction says "in plain language" and gives the correct example, but the label "Bloom span" appears in the template. A model executing this template could write "Bloom span" literally instead of following the example.
- Line 96: `Measuring: [plain-language Kirkpatrick level]` — same issue. The instruction says "plain-language" but uses "Kirkpatrick" as a label in the template text. The Never-say list in transfer.md prohibits "Kirkpatrick" but approve.md has no such guardrail.
- Impact: MEDIUM. These are template instructions, not output text. But a literal-minded model could echo them.

**GAP 13-G: "formative" and "summative" used as labels in approve.md display template**
- File: `.claude/plugins/curriculum/commands/approve.md`, line 82
- Text: `[formative count] during-program checks, [summative count] end-of-program assessments`
- The terms "formative" and "summative" appear as template variables, not as output text. The instruction does show the plain-language alternatives inline ("during-program checks", "end-of-program assessments"). However, the variable names `[formative count]` and `[summative count]` could leak if the model is not careful.
- Impact: LOW. The plain-language alternatives are right next to the variables.

### Missing

**GAP 13-H: approve.md has no Never-say list or inline guardrail**
- File: `.claude/plugins/curriculum/commands/approve.md`
- approve.md has a Persona section with a tone description but no Never-say vocabulary list and no Critical inline guardrail line. It generates the most comprehensive user-facing summary in the pipeline (the Final Validation package display), yet has zero vocabulary enforcement beyond the voice file reference.
- The Final Validation template uses "Bloom span", "Kirkpatrick", "formative count", "summative count" — all terms from the voice file prohibition list or command-level prohibition lists.
- Impact: MEDIUM-HIGH. approve.md is the final gate where the user sees the entire curriculum package summarized. Any ID vocabulary leak here is the last thing the user reads before delivery.

---

## Phase 14: Audit Mode Enhancement

**Goal:** Extract auditor logic from intake.md into curriculum-auditor.md agent, add content_quality dimension, wire mode routing into modules.md and sessions.md.

### Properly Encoded
- curriculum-auditor.md created with explicit Persona, inline guardrail, and detailed quality rubric per stage
- Two-dimension assessment (extraction_confidence + content_quality) clearly defined with separate rubrics
- Plain-language summary column requirement with prohibited term examples
- Completion Signal format with exact column names specified
- intake.md refactored as dispatcher — Task dispatch, results parsing, mode confirmation UX
- Mode confirmation table uses plain-language labels only ("Build from scratch" / "Fill in what's missing" / "Keep what you have and validate it")
- Internal mode names (gap-fill / enrich / hands-off) never shown to user
- modules.md three-path mode routing (hands-off / enrich / gap-fill) with diff gate
- sessions.md three-path mode routing with diff gate
- Graceful degradation: absent Mode Assignment falls through to gap-fill silently
- Diff table uses plain language with explicit field name substitutions (group_processing_prompt -> group reflection question, etc.)

### Mentioned but Not Deeply Encoded

**GAP 14-A: curriculum-auditor.md uses "extraction_confidence" and "content_quality" as visible column headers in audit-results.md**
- File: `.claude/plugins/curriculum/agents/curriculum-auditor.md`, lines 103-111
- The audit-results.md file written by the auditor uses `extraction_confidence` and `content_quality` as column headers in a markdown table. These are schema field names — not plain language.
- The inline guardrail (line 15) says "Never expose schema field names" but the output format template immediately contradicts this by using schema field names as column headers.
- The Completion Signal (lines 120-139) repeats these field names.
- Impact: LOW for end users (audit-results.md is an intermediate file read by intake.md, not displayed directly), but it contradicts the agent's own guardrail. If a model surfaces this table to the user during audit mode confirmation, the field names would leak.

**GAP 14-B: curriculum-auditor.md quality rubric uses ID vocabulary in internal descriptions**
- File: `.claude/plugins/curriculum/agents/curriculum-auditor.md`, lines 61, 76-88
- content_quality level descriptions use terms like "behavioral outcome format", "correct Bloom's level", "rubrics" which are appropriate for the agent's internal assessment logic.
- However, Stage 2 rubric (line 76) says: `"strong" requires behavioral verb format (learners will be able to...), observable outcomes, and coverage of multiple complexity levels.`
- The concern: if the agent echoes rubric language into the summary column, terms like "behavioral verb format" and "complexity levels" could appear. The agent guardrail prohibits this, but the rubric descriptions are the closest source text.
- Impact: LOW. The guardrail is explicit about the summary column, and examples of correct tone are provided.

### Missing
- None. Phase 14 is well-encoded.

---

## Phase 15: Delivery Layer

**Goal:** Create assemble.md, verify.md, generate-html.js, fix generate-html.ts recursion bug, wire verify into approve.md Final Validation gate.

### Properly Encoded
- generate-html.ts recursion bug fixed (withFileTypes)
- generate-html.js standalone script created for session facilitator-guide + marketing HTML
- assemble.md created with session-organized delivery/ structure, plain-language file list output, partial assembly support
- verify.md created as slip-through safety net: NEEDS: markers, TMA labels, HTML comments, missing required files
- verify.md uses plain-language issue descriptions with fix commands (no check IDs, no pattern syntax)
- approve.md Final Validation gate runs verify silently, integrates results into package summary
- approve.md triggers assemble as Skill after approval
- Verify is read-only (no STATE.md write)
- verify.md and assemble.md both have Persona sections with voice file reference and tone descriptions

### Mentioned but Not Deeply Encoded

**GAP 15-A: verify.md has no Writing for Clarity instruction**
- File: `.claude/plugins/curriculum/commands/verify.md`
- No "kernel sentences" instruction. Verify produces user-visible issue descriptions.
- Impact: LOW. Verify output is structured and brief by design.

**GAP 15-B: assemble.md has no Writing for Clarity instruction**
- File: `.claude/plugins/curriculum/commands/assemble.md`
- No "kernel sentences" instruction. Assemble produces the plain-language file list.
- Impact: LOW. Assemble output is structured, not prose.

### Missing
- None. Phase 15 deliverables are complete.

---

## Phase 16: Delivery Gap Closure

**Goal:** Fix three cross-phase wiring mismatches: generate-html.js reads from wrong directory, verify.md checks wrong filename, intake.md writes wrong filename.

### Properly Encoded
- generate-html.js reads from `delivery/session-N/` (not `04-sessions/`) — HTML co-located with markdown after assembly
- verify.md Check A Stage 4 row checks `sequence-rationale.md` (the file modules.md actually writes)
- intake.md audit pre-population writes `assessment-map.md` (the file modules.md actually reads)

### Mentioned but Not Deeply Encoded
- None. Phase 16 was targeted bug fixes — all three were correctly applied.

### Missing
- None.

---

## Cross-Phase Gaps Summary

### HIGH Priority

| ID | Gap | File | Impact |
|----|-----|------|--------|
| 13-A | Writing for Clarity instruction missing from session-generator.md | `.claude/plugins/curriculum/agents/session-generator.md` | Highest-volume content generator has no kernel-sentence or no-filler constraint |

### MEDIUM Priority

| ID | Gap | File | Impact |
|----|-----|------|--------|
| 13-B | Writing for Clarity instruction missing from transfer.md | `.claude/plugins/curriculum/commands/transfer.md` | Prose-format output vulnerable to filler without the constraint |
| 13-E | "Bloom's level" in marketing.md generation instruction | `.claude/plugins/curriculum/commands/marketing.md:105` | Model could echo prohibited term into marketing copy |
| 13-F | "Bloom span" and "Kirkpatrick" in approve.md template | `.claude/plugins/curriculum/commands/approve.md:79,96` | Template labels could leak prohibited terms in final package summary |
| 13-H | approve.md has no Never-say list or inline guardrail | `.claude/plugins/curriculum/commands/approve.md` | Final gate summary has zero vocabulary enforcement beyond voice file |

### LOW Priority

| ID | Gap | File | Impact |
|----|-----|------|--------|
| 13-C | Writing for Clarity missing from resume.md | `.claude/plugins/curriculum/commands/resume.md` | Resume is brief but pattern should be consistent |
| 13-D | Writing for Clarity missing from evaluation-mode.md | `.claude/plugins/curriculum/commands/evaluation-mode.md` | Evaluation output is user-facing |
| 13-G | "formative"/"summative" as template variables in approve.md | `.claude/plugins/curriculum/commands/approve.md:82` | Plain-language alternatives are inline; low leak risk |
| 14-A | Schema field names as column headers in audit-results.md | `.claude/plugins/curriculum/agents/curriculum-auditor.md:103-111` | Intermediate file, not directly user-facing |
| 14-B | ID vocabulary in auditor quality rubric descriptions | `.claude/plugins/curriculum/agents/curriculum-auditor.md:61,76-88` | Internal assessment logic; guardrail covers summary column |
| 15-A | Writing for Clarity missing from verify.md | `.claude/plugins/curriculum/commands/verify.md` | Structured output, low prose risk |
| 15-B | Writing for Clarity missing from assemble.md | `.claude/plugins/curriculum/commands/assemble.md` | Structured output, low prose risk |

---

## Recommended Fix Order

1. **13-A** — Add Writing for Clarity instruction to session-generator.md (before Generation Rules section). This is the single highest-impact gap.
2. **13-H + 13-F** — Add a Never-say list to approve.md Persona section and rewrite the Final Validation template to remove "Bloom span", "Kirkpatrick", "formative count", "summative count" labels.
3. **13-E** — Replace "Bloom's level" with "thinking level" in marketing.md line 105.
4. **13-B** — Add Writing for Clarity instruction to transfer.md (before Gate Summary section).
5. **13-C, 13-D, 15-A, 15-B** — Add Writing for Clarity instruction to resume.md, evaluation-mode.md, verify.md, assemble.md (batch — low risk, consistency fix).
6. **14-A** — Consider renaming audit-results.md column headers to plain language, or accept as-is given it is an intermediate file parsed by intake.md.

---

*Audit completed: 2026-03-26*
*Auditor: Claude Opus 4.6 (1M context)*
