# Roadmap: KNZ Curriculum Builder

## Milestones

- ✅ **v1.0 — MVP** — Phases 1-7 (shipped 2026-03-22) — [archive](milestones/v1.0-ROADMAP.md)
- ✅ **v2.0 — Existing Curriculum Support** — Phases 8-10 (shipped 2026-03-24) — [archive](milestones/v2.0-ROADMAP.md)
- 🚧 **v3.0 — Output Quality** — Phases 11-15 (in progress)

---

## Phases

<details>
<summary>✅ v1.0 — MVP (Phases 1-7) — SHIPPED 2026-03-22</summary>

- [x] Phase 1: Schema and Foundation — completed 2026-03-15
- [x] Phase 2: Core Plugin Infrastructure — completed 2026-03-16
- [x] Phase 3: Backward Design Core — completed 2026-03-18
- [x] Phase 4: Dashboard MVP — completed 2026-03-19
- [x] Phase 5: Module and Session Generation — completed 2026-03-20
- [x] Phase 6: Validation Layer — completed 2026-03-21
- [x] Phase 7: Full Pipeline Completion — completed 2026-03-22

See [v1.0 archive](milestones/v1.0-ROADMAP.md) for full phase details.

</details>

<details>
<summary>✅ v2.0 — Existing Curriculum Support (Phases 8-10) — SHIPPED 2026-03-24</summary>

- [x] Phase 8: Audit Mode Intake (3/3 plans) — completed 2026-03-22
- [x] Phase 8.1: Plugin Namespace Migration (2/2 plans) — completed 2026-03-23
- [x] Phase 9: Stage Pre-population (3/3 plans) — completed 2026-03-24
- [x] Phase 10: Evaluation Mode (2/2 plans) — completed 2026-03-24

See [v2.0 archive](milestones/v2.0-ROADMAP.md) for full phase details.

</details>

---

### 🚧 v3.0 — Output Quality (In Progress)

**Milestone Goal:** Every generated output reads like a skilled colleague built it — results visible, machinery hidden, voice consistent across all commands.

## Phases

- [x] **Phase 11: Infrastructure** — Clone-and-run deployment, dashboard env var, release script (completed 2026-03-25)
- [x] **Phase 12: Voice System** — Curriculum voice file and cross-command enforcement baseline (completed 2026-03-25)
- [x] **Phase 13: Command Retrofit** — Presentation and quality improvements across all 12 commands (completed 2026-03-25)
- [x] **Phase 14: Audit Mode Enhancement** — Three-mode content handling and auditor agent extraction (completed 2026-03-25)
- [ ] **Phase 15: Delivery Layer** — Document assembler, HTML output, curriculum verifier

## Phase Details

### Phase 11: Infrastructure
**Goal**: The tool is clone-and-run — a new user can clone the repo, run one command, and have a working setup with the dashboard pointing to the right workspace
**Depends on**: Nothing (first v3.0 phase)
**Requirements**: INFR-01, INFR-02, INFR-03
**Key files affected**:
  - `README.md` — clone-and-run install instructions
  - `install.sh` — removed entirely (no deprecation comment; see Pitfall 5)
  - `.claude/settings.json` — workspace path updated for clone-and-run model
  - `dashboard/vite.config.ts` — WORKSPACE_DIR env var support
  - `.claude/plugins/curriculum/commands/init.md` — dashboard launch instruction in output
  - `scripts/release.sh` — new file
**Success Criteria** (what must be TRUE):
  1. A user who clones the repo fresh, opens Claude Code, and runs `/curriculum:init` sees their workspace appear inside the repo without any additional setup
  2. Running `WORKSPACE_DIR=/path/to/workspace npm run dev` from `dashboard/` starts the dashboard pointed at that workspace
  3. `/curriculum:init` completion output includes the literal `npm run dev` command the user should run, not a pointer to docs
  4. `scripts/release.sh` exists and syncs the dev repo to the public plugin release repo in one command
  5. No `install.sh` file exists in the repo root — the old model is gone, not deprecated
**Pitfall mitigations**:
  - Pitfall 5: All four artifacts (README, install.sh removal, settings.json, init.md) updated in a single coordinated commit — partial update creates contradictory state
  - Pitfall 11: Dashboard launch command appears in init output, not only in README
**Estimated complexity**: LOW-MEDIUM — isolated config/doc changes; must be atomic

**Plans**: 1 plan

Plans:
- [ ] 11-01-PLAN.md — Convert to clone-and-run model: delete install.sh, update README, add WORKSPACE_DIR env var, add dashboard launch to init output, create release.sh

---

### Phase 12: Voice System
**Goal**: A shared voice reference file exists that defines what all generated content sounds like — prohibited terms, plain-language substitutions, tone per output type — and the worst-offending commands have critical guardrails inlined, not just pointed at the file
**Depends on**: Phase 11
**Requirements**: VOICE-01, VOICE-02
**Key files affected**:
  - `.claude/reference/curriculum-voice.md` — new file (under 150 lines)
  - `.claude/plugins/curriculum/commands/marketing.md` — worst offender; inline guardrails
  - `.claude/plugins/curriculum/commands/transfer.md` — YAML output; inline guardrails
  - `.claude/plugins/curriculum/commands/sessions.md` — TMA labels; inline guardrails
  - `.claude/plugins/curriculum/commands/assessments.md` — alignment map vocabulary
  - All 12 commands — voice file reference added to Persona section
**Success Criteria** (what must be TRUE):
  1. `curriculum-voice.md` exists at `.claude/reference/` with: prohibited terms list with exact plain-language replacements, tone descriptors per output context (outcomes, sessions, marketing, transfer), and signature move examples
  2. Every command that generates user-facing content has an explicit instruction to read `curriculum-voice.md` before generating
  3. The four worst-offending commands (marketing, transfer, sessions, assessments) have the most critical prohibited terms inlined directly — not only as a pointer to the reference file
  4. Reading the Persona sections of all 12 commands in sequence shows a consistent baseline tone, with each command adding only context-specific differences
**Pitfall mitigations**:
  - Pitfall 1: Voice file stays under 150 lines; critical guardrails inlined in worst-offending commands; reference file is documentation, inline is enforcement
  - Pitfall 9: Persona audit of all 12 commands completed BEFORE writing the voice file — contradictions between existing personas and the new baseline resolved before the file is authored
**Estimated complexity**: LOW to write; MEDIUM to enforce; persona audit is the most time-intensive step

**Plans**: 2 plans

Plans:
- [x] 12-01-PLAN.md — Create curriculum-voice.md: baseline voice, marketing register, universal prohibition table, signature moves (completed 2026-03-25)
- [ ] 12-02-PLAN.md — Wire all 13 commands with voice file reference; add inline guardrails to 4 worst-offending files

---

### Phase 13: Command Retrofit
**Goal**: Every command output reads as a clean result — no constraint enforcement steps visible, no insider vocabulary, warm handoffs between stages, and content that meets quality standards (production-direction slide outlines, diagnostic facilitator notes, PAS/DOS marketing prose, plain transfer narrative)
**Depends on**: Phase 12 (voice file must exist before any command references it)
**Requirements**: PRES-01, PRES-02, PRES-03, PRES-04, PRES-05, PRES-06, PRES-07, PRES-08, QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07, QUAL-08, QUAL-09
**Key files affected**:
  - All 12 commands: `init.md`, `intake.md`, `outcomes.md`, `assessments.md`, `modules.md`, `sessions.md`, `metaskills.md`, `transfer.md`, `marketing.md`, `validate.md`, `approve.md` + evaluate.md
  - `.claude/plugins/curriculum/agents/session-generator.md` — TMA labels, slide outline format, facilitator diagnostic notes
  - `stage-08-marketing.md` schema — output format changed to markdown prose (Pitfall 8: schema updated in same pass as command)
  - `stage-07-transfer.md` schema — YAML output format removed
**Success Criteria** (what must be TRUE):
  1. Running any command produces output containing zero prohibited terms (schema, linkage, bloom_level, TMA, DCR trigger, WIPPEA, outcome IDs in conversation, YAML field names as visible labels) — verifiable by search
  2. Every stage-completing command ends with a two-sentence synthesizing handoff naming what was built and what command comes next
  3. Every stage-completing command includes a plain-language context-clear nudge
  4. Slide outlines in generated sessions describe what goes on the slide, why it matters pedagogically, and what the facilitator should do — not a content inventory
  5. Facilitator notes include: what to observe, what it signals about learner state, what facilitation move to make
  6. Marketing output is copy-paste-ready PAS/DOS prose with VOC language — traceability data appears only in a separate audit section at the bottom
  7. Transfer ecosystem output reads as a narrative document with plain headings — no YAML structure visible
  8. NEEDS: markers do not appear in any file marked complete — validate command checks for unconverted markers
  9. TMA phase labels (ACTIVATE, THEORY, METHOD, APPLICATION, etc.) do not appear as visible labels in any facilitator guide, participant materials file, or slide outline
  10. HTML calculation comments and working notes are stripped from all session output files before writing
**Pitfall mitigations**:
  - Pitfall 2: Each command receives one pass covering both structural hiding (steps removed) and vocabulary replacement — not two separate passes; prohibited term search run after each command
  - Pitfall 8: Schema files updated in the same commit as corresponding command output format changes — written files checked directly for YAML syntax after update
  - Pitfall 12: ASCII box-drawing formatting tested in dashboard renderer before finalizing; conversation output and written file output can differ
  - Pitfall 13: Transparency notes capped at two sentences; no prohibited vocabulary; test: "does the user need to act on this?" — if no, cut or eliminate
**Estimated complexity**: MEDIUM-HIGH — breadth (12 commands + session-generator agent) not depth; highest-impact target is session-generator because it produces the most content volume

**Plans**: 4 plans

Plans:
- [ ] 13-01-PLAN.md — Retrofit 10 commands: structural hiding, vocabulary replacement, warm handoffs, context-clear nudge, ASCII formatting for outcomes, plain-language gate summary for assessments
- [ ] 13-02-PLAN.md — Upgrade marketing.md: YAML → prose write instruction, PAS/DOS generation guidance; update stage-08-marketing.md write note
- [ ] 13-03-PLAN.md — Upgrade transfer.md: YAML → narrative prose write instruction, plain headings; update stage-07-transfer.md write note
- [ ] 13-04-PLAN.md — Retrofit session-generator.md: slide outline template replacement, facilitator note diagnostic structure, TMA label suppression, HTML comment stripping, NEEDS: marker enforcement

---

### Phase 14: Audit Mode Enhancement
**Goal**: Audit mode handles existing content intelligently — strong content is left alone, thin content is enriched, missing content is generated from scratch — with the source analysis delegated to a dedicated auditor agent that uses a well-specified interface
**Depends on**: Phase 13 (command retrofits complete before adding audit mode complexity)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03
**Key files affected**:
  - `.claude/plugins/curriculum/agents/curriculum-auditor.md` — new file; must include explicit Completion Signal section before wiring
  - `.claude/plugins/curriculum/commands/intake.md` — audit path refactored to spawn auditor agent; three-mode routing added
  - `.claude/plugins/curriculum/commands/modules.md` — reads mode per stage before generating
  - `.claude/plugins/curriculum/commands/sessions.md` — reads mode per stage before generating
**Success Criteria** (what must be TRUE):
  1. `curriculum-auditor.md` has an explicit Completion Signal section specifying the per-field return structure: `{value, extraction_confidence, content_quality}` — agent tested in isolation before being wired to intake
  2. When audit mode runs against a document with strong existing session structure, the output proposes to validate and flag missing fields only — it does not propose to rewrite complete, well-formed sections
  3. When audit mode produces a module structure that differs from the source document, it shows a side-by-side comparison with reasoning before writing any files
  4. Mode assignment (gap-fill / enrich / hands-off) is surfaced to the user before processing begins, with a confirmation step
  5. `extraction_confidence` (was source content found?) and `content_quality` (is existing content strong enough to leave alone?) are distinct dimensions — mode selection uses `content_quality`, not extraction confidence
**Pitfall mitigations**:
  - Pitfall 3: `content_quality` (strong/partial/absent) added as a second dimension separate from `extraction_confidence` (High/Medium/Low/None) — mode selection uses `content_quality` exclusively; hands-off is the default when in doubt
  - Pitfall 6: Completion Signal format defined and agent tested in isolation BEFORE wiring to intake.md — do not wire until agent returns the specified contract format reliably
**Estimated complexity**: HIGH — three-mode logic requires design pass before implementation; auditor agent interface must be contracted before writing either file; audit path in intake.md touches the most complex branching in the codebase

**Plans**: 3 plans

Plans:
- [x] 14-01-PLAN.md — Create curriculum-auditor.md agent with Completion Signal contract; isolation test before wiring (completed 2026-03-25)
- [x] 14-02-PLAN.md — Refactor intake.md audit section: Task dispatch, mode confirmation UX, STATE.md Mode Assignment write (completed 2026-03-25)
- [ ] 14-03-PLAN.md — Extend modules.md and sessions.md pre-populated branches with mode-aware routing and diff gate

---

### Phase 15: Delivery Layer
**Goal**: A completed pipeline produces a polished delivery package — compiled facilitator and participant documents, HTML versions of marketing and facilitator guides, and a pre-delivery check that confirms no content quality issues survived to the final output
**Depends on**: Phase 13 (clean source content required before HTML generation; Pitfall 10)
**Requirements**: DLVR-01, DLVR-02, DLVR-03
**Key files affected**:
  - `.claude/plugins/curriculum/commands/assemble.md` — new command; compiles delivery-critical stage files
  - `.claude/plugins/curriculum/commands/verify.md` — new command; pre-delivery completeness check
  - `.claude/plugins/curriculum/scripts/generate-html.js` — new script; called via Bash tool from commands
  - `dashboard/vite-plugins/generate-html.ts` — wire file-watch trigger via `handleHotUpdate`; fix session subdirectory recursion bug
  - `dashboard/package.json` — marked version bump to ^17.0.5
  - `.claude/plugins/curriculum/commands/approve.md` — assembler trigger added to final gate
**Success Criteria** (what must be TRUE):
  1. Running `/curriculum:assemble` (or the assemble step in `/curriculum:approve`) produces a `delivery/` directory containing: one facilitator package per session (session.md + facilitator-guide.md + participant-materials.md), transfer summary, and marketing materials — slide outlines and validation reports are excluded
  2. Marketing package and facilitator guides have HTML versions alongside their markdown files — HTML uses inline CSS and requires no external stylesheet
  3. HTML files update when pipeline commands write new markdown — no server restart required (file-watch wired via `handleHotUpdate`)
  4. Running `/curriculum:verify` on a complete workspace returns a clean result when no NEEDS: markers, no TMA phase labels as section headers, no HTML comments, and all required stage files are present
  5. Running `/curriculum:verify` on an incomplete workspace identifies specifically which files have issues and which required stage files are missing — not a binary pass/fail
**Pitfall mitigations**:
  - Pitfall 4: HTML generation wired to file-write events via `handleHotUpdate` — tested by writing a markdown file to workspace while dashboard is running and confirming HTML updates without restart
  - Pitfall 7: Each verifier check corresponds to a command fix already completed in Phase 13 — checks for cross-document ID validation and assessment-outcome link checking deferred to future milestone
  - Pitfall 10: Phase 15 begins only after Phase 13 command retrofits are complete — HTML is generated from clean source, not used as a substitute for fixing source content
  - Architecture note: Fix session subdirectory recursion bug in `generate-html.ts` (no session HTML has ever been produced by batch process — silent bug confirmed in research)
**Estimated complexity**: MEDIUM — HTML generation technically simple; real complexity is scope definition for assembler and wiring file-watch; session subdirectory bug fix is a known, bounded change

**Plans**: 3 plans

Plans:
- [ ] 15-01-PLAN.md — Fix generate-html.ts recursion bug, add handleHotUpdate, create standalone generate-html.js script
- [ ] 15-02-PLAN.md — Write assemble.md: delivery package assembly with session-scoped structure
- [ ] 15-03-PLAN.md — Write verify.md + wire verify and assemble into approve.md Final Validation gate

---

## Progress

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1–7 (archived) | v1.0 | 19/19 | Complete | 2026-03-22 |
| 8. Audit Mode Intake | v2.0 | 3/3 | Complete | 2026-03-22 |
| 8.1. Plugin Namespace Migration | v2.0 | 2/2 | Complete | 2026-03-23 |
| 9. Stage Pre-population | v2.0 | 3/3 | Complete | 2026-03-24 |
| 10. Evaluation Mode | v2.0 | 2/2 | Complete | 2026-03-24 |
| 11. Infrastructure | v3.0 | 1/1 | Complete | 2026-03-25 |
| 12. Voice System | v3.0 | 2/2 | Complete | 2026-03-25 |
| 13. Command Retrofit | 5/5 | Complete    | 2026-03-25 | - |
| 14. Audit Mode Enhancement | 3/3 | Complete    | 2026-03-25 | - |
| 15. Delivery Layer | v3.0 | 3 plans | Not started | - |
