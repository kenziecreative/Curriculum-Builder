---
phase: 5
slug: module-and-session-generation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual behavioral verification (no automated test framework for markdown command files) |
| **Config file** | none |
| **Quick run command** | Run `/knz-modules` on test-program workspace and inspect output structure |
| **Full suite command** | Full pipeline run: `/knz-modules` → approve → `/knz-sessions` → verify all file counts |
| **Estimated runtime** | ~5-10 minutes (LLM generation time per run) |

---

## Sampling Rate

- **After every task commit:** Spot-check one output file for correct schema fields
- **After every plan wave:** Full run on test-program workspace; verify complete file tree in 03-modules/ and 04-sessions/
- **Before `/gsd:verify-work`:** All 6 success criteria confirmed against test-program output

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 1 | MODS-01, MODS-02, MODS-03, MODS-04, SESS-03 | manual | Run `/knz-modules` on test-program; inspect 03-modules/ for required structure | ❌ manual only | ⬜ pending |
| 5-01-02 | 01 | 1 | MODS-01, MODS-02 | manual | Confirm sequence-rationale.md present; verify prerequisite_modules DAG | ❌ manual only | ⬜ pending |
| 5-02-01 | 02 | 2 | SESS-01, SESS-02, SESS-04, SESS-05, SESS-06 | manual | Run `/knz-sessions` on test-program; inspect all 4 files per session | ❌ manual only | ⬜ pending |
| 5-02-02 | 02 | 2 | SESS-07, INFR-08 | manual | Observe `/knz-sessions` dispatching parallel Tasks; confirm timing overlap | ❌ manual only | ⬜ pending |
| 5-02-03 | 02 | 2 | INFR-09 | manual | Approve module structure; watch `/knz-sessions` run to completion with no prompts | ❌ manual only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no automated test infrastructure needed. This phase produces markdown command files. Verification is behavioral (run the commands, inspect the outputs).

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Two programs with identical topics but different Bloom's distributions produce different module sequences | MODS-01 | LLM generation — output is content, not code | Run `/knz-modules` on test-program at Apply level vs. Evaluate level; compare module_objectives coverage |
| Module count scales with contact_hours | MODS-04 | Dynamic LLM output | Verify test-program (9 hours) produces 2-3 modules per duration scaling table |
| Session template auto-selected per module from intake signals | MODS-03 | Enum selection logic is in prompt, not code | Inspect session.md files for session_template field; cross-reference with intake `skill_type` and `self_direction_level` |
| All 8 TMA arc fields present in every session.md | SESS-01 | Schema enforcement is in-prompt | Inspect session.md for ACTIVATE, CONNECT, LEARN, EXPLORE, APPLY, REFLECT, TRANSFER, CLOSE fields |
| DCR fields present when skill_type==open AND bloom>=Analyze | SESS-02 | Conditional generation | Test-program is open skill; verify DCR section present in Analyze+ sessions |
| social_learning has all 4 sub-fields in every module-spec.md | SESS-03 | Schema enforcement is in-prompt | Inspect 03-modules/*/module-spec.md for activity_type, interdependence_structure, accountability_mechanism, group_processing_prompt |
| facilitator-guide.md present with timing table, stumbling points, transitions | SESS-04 | File generation | Inspect 04-sessions/*/facilitator-guide.md for all three required sections |
| participant-materials.md present with pre_work, handouts, worksheets | SESS-05 | File generation | Inspect 04-sessions/*/participant-materials.md; even "none" pre-work should have section header |
| slide-outline.md present per session | SESS-06 | File generation | Inspect 04-sessions/*/slide-outline.md for SECTION/TMA PHASE/SLIDES/PURPOSE structure |
| /knz-sessions spawns Tasks per module in parallel | SESS-07, INFR-08 | Runtime behavior | Observe orchestrator dispatching multiple Task invocations; all modules report within similar time window |
| /knz-sessions runs without manual intervention after module approval | INFR-09 | Autonomous chain behavior | Approve module structure then observe /knz-sessions complete without AskUserQuestion prompts |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or manual verification instructions
- [ ] Sampling continuity: no 3 consecutive tasks without a verification checkpoint
- [ ] Wave 0 covers all MISSING references (none — no automated tests)
- [ ] No watch-mode flags
- [ ] Feedback latency < 600s (manual runs on test-program)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
