# Domain Pitfalls — v3.0 Retrofit

**Project:** KNZ Curriculum Builder v3.0
**Researched:** 2026-03-24
**Scope:** Pitfalls specific to retrofitting output quality constraints across existing commands, shared voice reference files, HTML generation, deployment model change, and agent extraction

---

## Critical Pitfalls

### Pitfall 1: The Voice File Nobody Reads

**Work area:** Shared `curriculum-voice.md` reference file

**What goes wrong:** `curriculum-voice.md` is written and committed. All 12 commands get a single instruction to read it. Three commands follow it. Nine don't — because a single-line instruction to read an optional file competes with 200+ lines of generation logic already in the command file. The guardrails are in the reference file. The output still leaks "schema" and "bloom_level."

**Why it happens:** Instructions to read a reference file are advisory in Claude Code commands. A voice file that lists rules competes with deeply embedded generation templates that already specify what output looks like.

**Prevention:**
- Inline the most critical guardrails directly into each command. The voice file is authoritative documentation; inline excerpts are the actual enforcement mechanism.
- Voice file structure: (1) prohibited terms with exact replacements, (2) tone descriptors per output context, (3) signature move examples. Keep under 150 lines.
- For commands where the problem was worst (marketing, transfer, metaskills, assessments), embed relevant voice prohibitions inline, not just a pointer.
- Test after adding the reference: run each command and check whether prohibited terms appear. If they do, inline is the fix.

**Detection:** Uneven improvement across commands after adding the voice file — some much better, some unchanged.

**Phase:** Voice file creation and worst-offending command retrofits happen in the same phase.

---

### Pitfall 2: Hiding Constraint Steps Without Hiding Constraint Vocabulary

**Work area:** Retrofitting all commands to hide enforcement steps

**What goes wrong:** The numbered enforcement steps disappear. But the output still contains schema field names: "I updated the `bloom_level` distribution," "your `transfer_context` field needed a real-world scenario." Steps gone; vocabulary remains.

**Why it happens:** Output presentation and output vocabulary are separate problems. The transparency notes that replace the steps are written using the same field names the steps used.

**Prevention:**
- Treat each transparency note as user-facing copy, not a technical summary.
- For every command receiving the retrofit, rewrite the transparency note template in the same pass as hiding steps.
- Test by reading the transparency note aloud as if you are the SME. If any word requires ID or developer knowledge, rewrite it.
- Search output for prohibited terms after each command retrofit: schema, bloom, linkage, enum, NEEDS:, MO-, SO-, PO-, stage-0, metaskill (as field name), DCR, TMA, WIPPEA.

**Detection:** After retrofitting a command, any hit from the prohibited terms search means vocabulary leaked through the structural fix.

**Phase:** Both structural and vocabulary fixes happen in one pass per command.

---

### Pitfall 3: Audit Mode Three-Mode Logic Repurposes the Confidence Scale

**Work area:** Three-mode content handling in audit mode

**What goes wrong:** Medium extraction confidence now triggers rewrite of content the user wanted preserved. The confidence level scale was calibrated for "does this field have a value?" — not "is this content strong enough to leave alone?"

**Why it happens:** Extraction confidence (High/Medium/Low/None) and content quality (strong/partial/absent) are different questions. Repurposing the existing scale for content quality triggers destructive rewrites.

**Prevention:**
- Add a second dimension: `content_quality` (strong/partial/absent) distinct from `extraction_confidence`.
- Mode selection uses `content_quality`, not extraction confidence.
- hands-off is the most conservative mode — default to it when in doubt.
- Show mode assignment to user before processing: "I'll add the missing transfer design and leave the session structure intact — does that match what you wanted?"

**Detection:** Test with strong existing content (like AccessU workshop materials). If audit mode proposes to rewrite any complete, well-formed section, mode detection is wrong.

**Phase:** Three-mode logic requires its own design pass before implementation. Do not add it inline as a condition without a clear spec.

---

### Pitfall 4: HTML Generation Only Runs at Dashboard Startup

**Work area:** HTML output generation

**What goes wrong:** `generateHtml()` Vite plugin runs once at dev server startup. New files written by the pipeline never appear in HTML without restarting the server. The "copy-paste ready HTML" goal is defeated.

**Why it happens:** This is the existing behavior in `vite-plugins/generate-html.ts` — called once at startup, no file watch wired to it.

**Prevention:**
- Wire HTML generation to file-write events via Vite's `handleHotUpdate` API (fires on file changes).
- Or: assembler command calls an explicit regeneration endpoint.
- Test: write a markdown file to the workspace while dashboard is running. Check whether its HTML updates without restarting the server.

**Detection:** Run intake → sessions → assembler → open HTML. If the HTML is empty or stale, the wiring is not in place.

**Phase:** HTML output is not done when `generate-html.ts` produces files at startup. Done when new pipeline-written files appear in HTML without server restart.

---

### Pitfall 5: Clone-and-Run Deployment Creates Contradictory State

**Work area:** Deployment model change

**What goes wrong:** The deployment model changes. Old global install still works. New clone-and-run requires different invocation. Users who follow old setup find a working-ish setup that doesn't match the intended model. Dashboard still shows empty state.

**Why it happens:** Deployment model change requires updating documentation, install tooling, and plugin activation path simultaneously. Any one out of sync creates a confusing middle state.

**Prevention:**
- Coordinated update of four artifacts in one commit: `install.sh` (remove or replace), `README.md`, `.claude/settings.json`, `/curriculum:init` workspace creation path.
- If removing `install.sh`: remove it entirely. Don't leave it with a deprecation comment.
- Verification: clone fresh, open Claude Code, run `/curriculum:init`, verify workspace appears inside the repo, verify dashboard finds it.

**Detection:** If `install.sh` and clone-and-run instructions coexist, the deployment model is ambiguous.

**Phase:** Deployment model change is a prerequisite. Done first, verified, then dashboard env var work builds on stable foundation.

---

### Pitfall 6: Curriculum Auditor Agent Interface Not Designed Before Extraction

**Work area:** Extracting audit mode logic into dedicated agent

**What goes wrong:** The agent is written and the intake command is updated independently. The interface between agent output and intake command was never specified. The agent returns a well-structured analysis; intake doesn't know what to do with it and falls back to asking all intake questions. Audit mode advantage disappears.

**Why it happens:** Agent extraction requires designing the interface (what the agent returns, in what format) before writing either the agent or the updated orchestrator.

**Prevention:**
- Design the output format first: per-field result with `{value, extraction_confidence, content_quality}`. This is the contract.
- Write the contract as a "Completion Signal" section in `curriculum-auditor.md` — same pattern as `session-generator.md`.
- Test the agent in isolation before wiring to intake. Spawn it against a sample document set and verify it returns the contract format.

**Detection:** If `curriculum-auditor.md` does not have an explicit Completion Signal section specifying the return structure, the interface is not designed. Do not wire to intake until it exists.

**Phase:** Two sequential steps: (1) design and test agent in isolation; (2) update intake to consume agent output.

---

### Pitfall 7: Curriculum Verifier Flags Issues It Cannot Prevent

**Work area:** Curriculum verifier command

**What goes wrong:** The verifier runs and correctly identifies NEEDS: markers, TMA labels, HTML comments. But these were created by existing pipeline commands. Without upstream command fixes, the verifier produces a report that cannot be acted on. It becomes a manual review checklist rather than a quality gate.

**Prevention:**
- Each verifier check must be paired with a command fix that prevents the issue.
- For v3.0, only add checks that correspond to v3.0 command fixes: NEEDS: markers (fixed in command retrofits), HTML comments (fixed in session-generator), TMA labels (fixed in session-generator).
- Checks requiring new features (cross-document ID validation, assessment-outcome link checking) → deferred to future milestone.

**Detection:** For each verifier check: "is there a corresponding command update in v3.0 that prevents this issue?" If no, the check will produce unactionable findings.

**Phase:** Verifier implementation comes after the command retrofits it validates.

---

## Moderate Pitfalls

### Pitfall 8: YAML Output Reappears After Marketing/Transfer Rewrites

**Work area:** Plain language replacement in marketing and transfer commands

**What goes wrong:** The marketing command is updated to produce clean markdown. But `stage-08-marketing.md` schema still specifies YAML output format. The schema wins because it is loaded as generation context with instruction to output all required fields. YAML returns.

**Prevention:**
- Update both the command file AND its paired schema file when changing output format.
- Schema must specify: "Output format: human-readable markdown. Field names do not appear as labels. Traceability data appears in a separate audit section at bottom."
- After updating, check the written file (not conversation output) for YAML syntax.

**Detection:** After any marketing or transfer update, open the written markdown file directly. If it contains `element_type:`, `curriculum_traceability:`, or `claim_type:` as visible labels, the schema is still producing YAML.

---

### Pitfall 9: Voice File Conflicts With Existing Command Persona Sections

**Work area:** Shared `curriculum-voice.md` reference

**What goes wrong:** Voice file says "colleague reporting back" tone; `intake.md` persona says "trusted consultant tone." Not contradictory but not harmonized. When both load, the command produces an averaged tone that matches neither.

**Prevention:**
- Audit every existing Persona section across all 12 commands before writing the voice file.
- Voice file sets the cross-command baseline. Each command's Persona section adds only context-specific differences.
- Persona audit is a prerequisite to voice file creation.

**Detection:** Read Persona sections of intake.md, assessments.md, marketing.md, and sessions.md in sequence. If tone descriptors are inconsistent and none reference the voice file, the audit has not been done.

---

### Pitfall 10: HTML Inherits Source Content Problems

**Work area:** Document assembler + HTML output

**What goes wrong:** HTML generation converts markdown faithfully — including TMA labels, HTML comments, and outcome IDs that were supposed to be fixed in QUAL phase.

**Prevention:**
- Command quality fixes (QUAL) precede HTML assembly. Order is not optional.
- Add sanitization pass to `generate-html.ts`: strip HTML comment patterns, detect TMA phase labels as section headers. Safety net, not substitute for upstream fixes.
- End-to-end test: open the HTML file as if you are a facilitator receiving it. If it contains "ACTIVATE:", "THEORY:", or outcome IDs, source content issues are bleeding through.

**Phase:** HTML assembly comes after command retrofits. Building HTML before source is clean produces a false green.

---

### Pitfall 11: Dashboard WORKSPACE_DIR Documented Where Users Won't Look

**Work area:** Dashboard env var + deployment model

**What goes wrong:** `WORKSPACE_DIR` is documented in README. Users who have trouble debug by looking at the dashboard itself, init output, or workspace CLAUDE.md — none of which mention it. Dashboard shows empty state. Users don't find the fix.

**Prevention:**
- `/curriculum:init` completion output must include the literal dashboard launch command.
- Under clone-and-run: `cd dashboard && npm run dev` — include this in init output.
- Dashboard empty state should display a diagnostic message, not a blank screen.

**Detection:** Close dashboard, run init fresh, follow only init output instructions. If that results in a dashboard showing the new project, instructions are in the right place.

---

### Pitfall 12: Box-Drawing Characters Break in Rendered Contexts

**Work area:** Structured ASCII output formatting

**What goes wrong:** Box-drawing characters (`╔`, `║`, `╚`, `├─`, `└─`) look correct in Claude Code conversation. In the React dashboard markdown renderer, alignment breaks.

**Prevention:**
- Test any new output format in three contexts: Claude Code conversation, React dashboard, plain text editor.
- For content converted to HTML, prefer portable markdown formats: headers, tables, blockquotes, bullet lists.
- Conversation output and file output can differ: conversation uses box-drawing; written files use standard markdown.

**Detection:** After implementing new formatting, render in the dashboard. If box-drawing appears misaligned or garbled, the format does not survive rendering.

---

### Pitfall 13: Transparency Notes Become the New Step Labels

**Work area:** Hiding constraint enforcement steps

**What goes wrong:** The numbered steps are removed. The transparency note compensates with too much detail: "I adjusted 3 outcomes (Steps 1, 3, and 5 of my internal checks), rewrote 2 verbs flagged in the prohibited verb check..." The transparency note has become the new step log.

**Prevention:**
- Maximum transparency note: two sentences.
- Test: "does the user need to do anything because of this?" If no — cut to one sentence or eliminate.
- If a transparency note exceeds 40 words, it is too detailed.
- If it uses any vocabulary from the prohibited terms table, it has not been converted.

---

## Phase-Specific Warnings

| Phase Topic | Pitfall | Mitigation |
|-------------|---------|------------|
| Voice file creation | File nobody reads (1) | Inline critical guardrails in each command; audit Persona sections first |
| Command retrofits | Hiding steps without hiding vocabulary (2) | Prohibited term search after each retrofit; vocabulary and structure fixed in same pass |
| Command retrofits | Transparency notes become new step labels (13) | Two-sentence ceiling; no prohibited vocabulary |
| YAML-to-markdown rewrite | Schema pulls format back to YAML (8) | Schema updated in same commit; test the written file |
| Voice file + existing personas | Conflict between voice file and command personas (9) | Audit all 12 Persona sections before writing the voice file |
| Audit mode three-mode | Confidence scale repurposed for content quality (3) | Add separate content_quality dimension; show mode to user before processing |
| HTML generation | Runs once at startup, not on file write (4) | Wire file watch or explicit trigger; test full flow |
| HTML generation | HTML inherits source problems (10) | Command retrofits before HTML assembly |
| HTML formatting | Box-drawing breaks in rendered contexts (12) | Test all new formats in dashboard before finalizing |
| Deployment model change | Old and new coexist (5) | Coordinated update of all 4 artifacts; remove install.sh entirely |
| Dashboard env var | Fix documented in README, not init output (11) | Init includes literal launch command; empty dashboard shows diagnostic |
| Agent extraction | Interface not designed before extraction (6) | Completion Signal format defined before writing either file |
| Curriculum verifier | Flags issues it cannot prevent (7) | Each check paired with a command fix; uncovered checks deferred |
