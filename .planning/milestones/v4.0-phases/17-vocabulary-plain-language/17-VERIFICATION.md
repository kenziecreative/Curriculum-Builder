---
phase: 17-vocabulary-plain-language
verified: 2026-03-27T02:00:00Z
status: passed
score: 11/11 must-haves verified
re_verification: false
---

# Phase 17: Vocabulary Plain Language Verification Report

**Phase Goal:** Every word visible to a user — in commands, reports, and outputs — is language an SME would use naturally, with no ID or technical vocabulary leaking through
**Verified:** 2026-03-27
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | curriculum-voice.md is the single canonical source for every prohibited term and its plain-language replacement | VERIFIED | File exists with 31 entries; grep confirms Kirkpatrick, parent_module_id, self_direction_level, primary_metaskill, bloom_level, Bloom's, and 25 more terms all present in alphabetized table |
| 2 | Every command file contains the same standardized Writing for Clarity block and the same standardized curriculum-voice.md reference instruction | VERIFIED | All 15 command files pass both grep checks; 7 newly added in Plan 01 confirmed; verify.md wording standardized from "user-facing output" to "user-facing content" |
| 3 | An SME reading any validation report sees plain descriptions, not bloom_level, kirkpatrick, TMA arc, DAG, or schema | VERIFIED | curriculum-evaluator.md has three-layer enforcement (voice ref + inline guardrail + WfC + post-write scan); all prohibited terms blocked by post-write verification before report is written |
| 4 | approve.md has three-layer vocabulary enforcement: curriculum-voice.md reference + inline guardrail + dedicated never-say list | VERIFIED | All three layers confirmed: line 15 voice ref, line 23 inline guardrail listing 11 terms, line 31 Never-say List table with 11 entries; "Kirkpatrick" appears only in the enforcement list, never in template brackets |
| 5 | No generation hint or template bracket in any command references Kirkpatrick, MO-2-3, FA-4, or any ID format | VERIFIED | grep confirms zero MO-[0-9] or FA-[0-9] hits in commands/; Kirkpatrick in transfer.md at lines 44 and 54 are both within enforcement sections (guardrail and never-say list), not generation hints |
| 6 | parent_module_id never appears as a visible label in session template — uses HTML comment instead | VERIFIED | session-generator.md line 182: `<!-- internal: parent_module_id=[M-N] -->` confirmed |
| 7 | Primary metaskill reads as Core thinking skill in module output template | VERIFIED | modules.md line 302: `- **Core thinking skill:** [primary_metaskill]` confirmed |
| 8 | marketing.md generation instructions do not use prohibited vocabulary terms as visible labels | VERIFIED | curriculum_traceability appears only at lines 42 and 48 (both inside enforcement sections); Bloom's has zero hits outside enforcement; source_link and thinking level used throughout generation hints |
| 9 | curriculum-evaluator.md has full three-layer enforcement: voice reference + Writing for Clarity + inline guardrail | VERIFIED | All three present; plus post-write scan referencing canonical table — this agent writes evaluation-report.md read directly by SMEs |
| 10 | knz-validator.md has vocabulary guardrails referencing the canonical list | VERIFIED | Vocabulary Guardrails section present with curriculum-voice.md reference |
| 11 | Every agent that writes files a user opens has a post-write vocabulary verification scan referencing the canonical never-say table | VERIFIED | curriculum-evaluator.md, curriculum-auditor.md, and session-generator.md all have Post-Write Verification sections referencing "Terms That Never Appear in Output" table in curriculum-voice.md |

**Score:** 11/11 truths verified

---

### Required Artifacts

| Artifact | Provided | Status | Details |
|----------|----------|--------|---------|
| `.claude/reference/curriculum-voice.md` | Canonical never-say table with all prohibited terms | VERIFIED | 31 entries, alphabetized; confirmed Kirkpatrick, parent_module_id, self_direction_level, primary_metaskill, bloom_level present |
| `.claude/plugins/curriculum/commands/resume.md` | Writing for Clarity block | VERIFIED | Present after Persona section |
| `.claude/plugins/curriculum/commands/verify.md` | Writing for Clarity block | VERIFIED | Present; voice ref wording fixed to "user-facing content" |
| `.claude/plugins/curriculum/commands/assemble.md` | Writing for Clarity block | VERIFIED | Present after Persona section |
| `.claude/plugins/curriculum/commands/evaluation-mode.md` | Writing for Clarity block | VERIFIED | Present after Persona section |
| `.claude/plugins/curriculum/commands/intake.md` | Writing for Clarity block | VERIFIED | Present; existing never-say list kept intact |
| `.claude/plugins/curriculum/commands/approve.md` | Three-layer vocabulary enforcement | VERIFIED | Voice ref + inline guardrail + Never-say list all present; Kirkpatrick only in enforcement lines |
| `.claude/plugins/curriculum/commands/transfer.md` | Kirkpatrick references replaced with plain-language measurement descriptions | VERIFIED | "Measurement approach translations" block present; "Behavior change on the job" pattern confirmed |
| `.claude/plugins/curriculum/commands/assessments.md` | ID codes removed from transparency note example | VERIFIED | Zero MO-[0-9] or FA-[0-9] hits confirmed by grep |
| `.claude/plugins/curriculum/commands/modules.md` | Primary metaskill label replaced with Core thinking skill | VERIFIED | Line 302 confirmed |
| `.claude/plugins/curriculum/commands/marketing.md` | Generation instructions sanitized of prohibited vocabulary | VERIFIED | source_link replaces curriculum_traceability; "thinking level" replaces Bloom's; both confirmed in generation instructions |
| `.claude/plugins/curriculum/agents/session-generator.md` | session.md template with parent_module_id as HTML comment + canonical post-write scan | VERIFIED | Line 182 HTML comment confirmed; "Terms That Never Appear" canonical reference present |
| `.claude/plugins/curriculum/agents/curriculum-evaluator.md` | Full vocabulary enforcement for evaluation reports | VERIFIED | Persona section, inline guardrail, Writing for Clarity, and Post-Write Verification scan all present |
| `.claude/plugins/curriculum/agents/knz-validator.md` | Vocabulary guardrails for validation output | VERIFIED | Vocabulary Guardrails section with curriculum-voice.md reference present |
| `.claude/plugins/curriculum/agents/curriculum-auditor.md` | Updated canonical guardrail + post-write scan | VERIFIED | Inline guardrail references canonical table; Post-Write Verification section present |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| All 15 command files | `.claude/reference/curriculum-voice.md` | Standard voice reference instruction | WIRED | grep confirms all 15 commands have curriculum-voice.md reference; zero commands without it |
| `.claude/plugins/curriculum/commands/approve.md` | `.claude/reference/curriculum-voice.md` | Never-say list references canonical table | WIRED | Three layers confirmed; never-say table instructs use of "plain-language replacement from curriculum-voice.md" |
| `.claude/plugins/curriculum/agents/curriculum-evaluator.md` | `.claude/reference/curriculum-voice.md` | Voice reference + post-write scan | WIRED | Both references confirmed in file |
| `.claude/plugins/curriculum/agents/session-generator.md` | `.claude/reference/curriculum-voice.md` | Post-write scan references canonical list | WIRED | "Terms That Never Appear in Output" table reference confirmed at post-write scan |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| VOCAB-01 | 17-02, 17-03 | All audit vocabulary leaks fixed — approve.md template labels, marketing.md generation instruction, transfer.md, curriculum-auditor.md column headers | SATISFIED | approve.md three-layer enforcement verified; marketing.md source_link and thinking level confirmed; curriculum-auditor.md canonical guardrail verified |
| VOCAB-02 | 17-01, 17-03 | Validation reports rewritten in plain language — no bloom_level, kirkpatrick, TMA arc, DAG, or schema field names visible to users | SATISFIED | curriculum-evaluator.md and curriculum-auditor.md both have post-write scans that catch and replace all these terms before report write |
| VOCAB-03 | 17-01 | Writing for Clarity instruction added to all remaining commands (resume.md, evaluation-mode.md, verify.md, assemble.md, transfer.md) | SATISFIED | All 7 target commands confirmed with Writing for Clarity block; all 15 commands have voice reference |
| VOCAB-04 | 17-02 | Output review fixes — parent_module_id hidden as HTML comment, "Primary metaskill" replaced with "Core thinking skill", marketing traceability terms sanitized | SATISFIED | session-generator.md line 182 HTML comment confirmed; modules.md line 302 "Core thinking skill" confirmed; marketing.md curriculum_traceability replaced with source_link |
| VOCAB-05 | 17-02 | approve.md gets Never-say list and inline guardrail — final gate summary has vocabulary enforcement matching other commands | SATISFIED | Never-say List section and Critical inline guardrail both present; Kirkpatrick appears only in enforcement context |

No orphaned requirements found. All five VOCAB requirements claimed in plan frontmatter map to verified implementation.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `.claude/plugins/curriculum/commands/intake.md` | 764 | Word "placeholder" in description of session-manifest.md structural content | Info | Not a code placeholder; describes a legitimate concept in the curriculum scaffold. No impact on goal. |

No blocking or warning-level anti-patterns found.

---

### Human Verification Required

None. All must-haves verified programmatically.

The vocabulary enforcement is structural (grepping for terms in file content) and does not require running the plugin. The only items that would need human judgment are edge-case scenarios (e.g., a novel SME-confusing term not yet in the canonical table) — these are ongoing maintenance concerns, not verification gaps for this phase.

---

### Commit Verification

All 7 commits documented in summaries confirmed present in git history:

- `c6b38b3` — feat(17-01): expand curriculum-voice.md canonical never-say table
- `ec2ff9a` — feat(17-01): add standardized Writing for Clarity block to 7 command files
- `ac52e51` — feat(17-02): add three-layer vocabulary enforcement to approve.md
- `5aae81c` — feat(17-02): fix template jargon in transfer, assessments, modules, session-generator
- `0cdc416` — feat(17-02): sanitize marketing.md generation instructions and remaining ID code leaks
- `d264464` — feat(17-03): add full vocabulary enforcement to curriculum-evaluator.md
- `fd04df4` — feat(17-03): add vocabulary guardrails to knz-validator, curriculum-auditor, session-generator

---

### Summary

Phase 17 achieved its goal. Every layer of the vocabulary enforcement architecture is in place and verified against the actual files:

- The canonical table in curriculum-voice.md is the single source of truth with 31 entries covering all previously scattered per-file lists.
- All 15 command files reference that table. All 7 newly protected commands have the Writing for Clarity block.
- Template jargon leaks (Kirkpatrick, MO-X-X ID codes, FA-X codes, Primary metaskill, parent_module_id, curriculum_traceability, Bloom's) have been removed from every generation hint and template bracket.
- The three highest-stakes files (approve.md and curriculum-evaluator.md) have three-layer enforcement. Agents that write SME-facing files have post-write scans that reference the canonical table.
- No prohibited vocabulary appears in generation output paths. What remains in enforcement sections (guardrails, never-say lists) is intentional — those are the enforcement instructions themselves.

---

_Verified: 2026-03-27_
_Verifier: Claude (gsd-verifier)_
