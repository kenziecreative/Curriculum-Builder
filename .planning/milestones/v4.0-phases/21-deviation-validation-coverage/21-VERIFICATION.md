---
phase: 21-deviation-validation-coverage
verified: 2026-03-27T23:55:00Z
status: passed
score: 8/8 must-haves verified
re_verification: false
---

# Phase 21: Deviation Validation Coverage Verification Report

**Phase Goal:** Add deviation handling (3-attempt retry with cumulative constraint injection) to all content stages, and expand validator to cover T1-19 through T1-33 for end-to-end validation coverage.
**Verified:** 2026-03-27T23:55:00Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1  | When a draft audit check fails, the generator retries up to 3 times with cumulative constraint injection before stopping | VERIFIED | All 5 command files implement retry with cumulative constraints. modules.md line 422: "Retry with Cumulative Constraints". sessions.md line 306. metaskills.md line 288. transfer.md line 348: "Retry constraint injection: Each retry must add cumulative constraints." marketing.md line 271: same. |
| 2  | After 3 failed attempts, the stage stops and shows the user all failure reports with problem + location + suggestion format | VERIFIED | modules.md line 442: "Escalation (after 3 failed attempts)" with "What still needs attention" block. sessions.md line 328. metaskills.md line 308. transfer.md line 354-359: plain-language escalation with problem/location/suggestion. marketing.md line 277-284: same. |
| 3  | Auto-fix is limited to vocabulary substitution, registry default fills, and outcome drift correction — no content-level auto-fixes | VERIFIED | modules.md line 418: "Auto-fix boundary — these three categories only." metaskills.md line 284. sessions.md line 302. transfer.md line 341-344 (vocabulary, registry defaults, outcome drift). marketing.md line 266-268 (vocabulary only — correct for marketing stage). |
| 4  | Escalation messages show both what was auto-fixed and what still needs attention | VERIFIED | modules.md line 451: "What was auto-fixed" + line 453: "What still needs attention". sessions.md and metaskills.md follow same pattern. transfer.md and marketing.md escalation uses equivalent plain-language format describing both auto-fix results and remaining failures (structurally equivalent, different labels). |
| 5  | Transfer (stage 7) writes to _drafts/ first and runs audit checks before promoting to deliverable directory | VERIFIED | transfer.md line 229: writes to `workspace/{project}/06-transfer/_drafts/transfer-ecosystem.md`. Line 271: "Run these 10 checks against the file in _drafts/". Line 338: promotion only after all 10 pass. |
| 6  | Marketing (stage 8) writes to _drafts/ first and runs audit checks before promoting to deliverable directory | VERIFIED | marketing.md line 153: writes to `workspace/{project}/07-marketing/_drafts/marketing-package.md`. Line 211: "Run these 7 checks against the file in _drafts/". Line 263: promotion only after all 7 pass. Line 353: STATE.md update conditional on promotion. |
| 7  | The validator runs T1-19 through T1-33 against actual stage output instead of writing "Not applicable" | VERIFIED | knz-validator.md line 59: "Run T1-01 through T1-33 (all stages)." Lines 134-186: full Check Implementations section for stages 6-8 with T1-19 through T1-33 all present with named failure messages. |
| 8  | A curriculum that passes validation has been checked end-to-end through all 8 stages | VERIFIED | knz-validator.md Stage Reading now reads 7 stage directories (lines 119-129). Rule 4 updated to T3-01 through T3-09 (line 68). Completion signal references 33-check total (line 398). Graceful degradation preserved for stages not yet generated. |

**Score:** 8/8 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.claude/plugins/curriculum/commands/modules.md` | 3-attempt retry with escalation in draft audit | VERIFIED | Contains "Attempt tracking" (line 426), "Escalation" section (line 442), auto-fix boundary (line 418), structural short-circuit (line 420). |
| `.claude/plugins/curriculum/commands/sessions.md` | 3-attempt retry with escalation in draft audit | VERIFIED | Contains "Attempt tracking" (line 310) scoped per-module, "Escalation" (line 328), auto-fix boundary (line 302), structural short-circuit (line 304). |
| `.claude/plugins/curriculum/commands/metaskills.md` | 3-attempt retry with escalation in draft audit | VERIFIED | Contains "Attempt tracking" (line 292), "Escalation" (line 308), auto-fix boundary (line 284), structural short-circuit (line 286). |
| `.claude/plugins/curriculum/commands/transfer.md` | Draft-then-audit pipeline with stage-specific checks and retry | VERIFIED | Contains `_drafts/` write target (line 229), 10 audit checks including Check 10 (line 315), cumulative constraint injection (line 348), escalation after 3 attempts (line 352), structural short-circuit (line 361). |
| `.claude/plugins/curriculum/commands/marketing.md` | Draft-then-audit pipeline with stage-specific checks and retry | VERIFIED | Contains `_drafts/` write target (line 153), 7 audit checks including Check 7 (line 240), cumulative constraint injection (line 271), escalation after 3 attempts (line 277), structural short-circuit (line 286). |
| `.claude/plugins/curriculum/agents/knz-validator.md` | Full T1-01 through T1-33 validation coverage | VERIFIED | Contains "T1-19" check implementation (line 140), Rule 2 updated to "T1-01 through T1-33 (all stages)" (line 59), stages 5-7 reading added (lines 124-129). |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `modules.md` | `curriculum-voice.md` | vocabulary auto-fix references canonical substitution table | WIRED | Line 412: "substitute with the plain-language replacement from curriculum-voice.md". Line 459: "escalation message must follow curriculum-voice.md". |
| `sessions.md` | `curriculum-voice.md` | vocabulary auto-fix references canonical substitution table | WIRED | Line 296: "substitute with the plain-language replacement from curriculum-voice.md". Line 345: escalation message must follow curriculum-voice.md. |
| `transfer.md` | `curriculum-voice.md` | vocabulary check in draft audit | WIRED | Line 285: "Read .claude/reference/curriculum-voice.md. Scan the draft for any term in the never-say table." |
| `marketing.md` | `curriculum-voice.md` | vocabulary check in draft audit | WIRED | Line 225: "Read .claude/reference/curriculum-voice.md. Scan the draft for any term in the never-say table." |
| `transfer.md` | `curriculum-registry.json` | registry consistency check in draft audit | WIRED | Line 277: "Read curriculum-registry.json. Verify module references..." |
| `knz-validator.md` | `stage-09-validation.md` | check definitions for T1-19 through T1-33 | WIRED | Line 39: schema loaded as first context item. Line 51: "Every check, enum, and failure message format comes from stage-09-validation.md." |
| `knz-validator.md` | workspace stages 6-8 | stage reading for metaskills, transfer, marketing files | WIRED | Lines 124-129: reads metaskill-map.md, transfer-ecosystem.md, marketing-package.md with directory scheme detection for both legacy and new workspaces. |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DEVL-01 | 21-01 | Structured deviation handling — auto-fix categories, 3-attempt limit, escalation | SATISFIED | modules.md, sessions.md, metaskills.md all implement 3-attempt retry with cumulative constraint injection, auto-fix boundary (3 categories), structural short-circuit, plain-language escalation. |
| DEVL-02 | 21-02, 21-03 | Full validation coverage — stages 6-8 added to T1-19 through T1-33 | SATISFIED | transfer.md and marketing.md have draft-then-audit pipelines. knz-validator.md Rule 2 covers T1-01 through T1-33. Check implementations for all 15 new checks (T1-19 through T1-33) present with named failure messages. |

No orphaned requirements — REQUIREMENTS.md shows DEVL-01 and DEVL-02 mapped to Phase 21 and both marked Complete.

---

### Anti-Patterns Found

No anti-patterns detected in the five modified files. Verification searched for:
- TODO/FIXME/placeholder comments — none found
- Empty implementations (return null, stub bodies) — not applicable to markdown command files
- Softening qualifiers in check enforcement — none found; Verification Integrity blocks in transfer.md (line 331) and marketing.md (line 256) explicitly prohibit them

---

### Human Verification Required

None. All structural checks can be verified programmatically. The command files are instruction documents, not executable code — their correctness is assessed by the presence and completeness of required directives, which grep confirms.

---

### Verification Notes

**Transfer and marketing escalation format:** The plan-02 truth "Both stages use the same 3-attempt retry pattern as stages 4-6" is functionally satisfied. Transfer.md and marketing.md implement all behavioral components: auto-fix pass, cumulative constraint injection, 3-attempt limit, content vs. structural failure distinction, and plain-language escalation. The section headings differ from modules/sessions/metaskills (no "### Escalation" header, no "Attempt tracking:" label) but this is a presentation difference, not a functional gap. The plan-02 must_haves do not require heading names — only the behavior.

**Validator graceful degradation:** The validator correctly uses "Not applicable — Stage N not yet generated" for missing stages, but falls back to "STAGE NOT FOUND" with FAIL status for stages 1-4 (lines 119-122 vs 124-129). This intentional asymmetry is correct: stages 1-4 are always expected when the validator runs; stages 5-7 may legitimately be absent for partial pipelines.

---

_Verified: 2026-03-27T23:55:00Z_
_Verifier: Claude (gsd-verifier)_
