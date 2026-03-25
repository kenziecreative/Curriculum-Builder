# Integration Architecture — v3.0

**Project:** KNZ Curriculum Builder v3.0
**Researched:** 2026-03-24
**Confidence:** HIGH — all findings from direct file inspection

---

## Key Findings

### 1. Eight capabilities map to three tiers of change

| Tier | Capabilities | Risk |
|------|-------------|------|
| Near-zero-risk | Deployment/config changes (INFR-01, INFR-02) | Isolated files, no command logic changes |
| Refactor existing behavior | Auditor extraction + three-mode routing (AUDIT-01/02/03) | Must be designed together; two passes over intake.md if split |
| Net-new pipeline additions | Assembler + Verifier + HTML (DLVR-01/02/03) | No dependencies within v3.0 except HTML source quality |

### 2. Auditor agent and three-mode routing must be built together

Extracting audit mode into an agent while adding three-mode routing means the agent is designed with mode parameter support from the start. Building separately requires two refactor passes over `intake.md` and the new agent.

### 3. A silent bug exists in HTML generation today

`generate-html.ts` does not recurse into `04-sessions/M-N-S-N/` subdirectories. No session HTML has ever been produced by the batch process. Must fix in the HTML phase.

### 4. Voice file needs a hard token budget

Keep under ~1,500 tokens. Do not let it absorb pedagogical guidance (duplicating doctrine). Scope strictly to word choice, tone, and plain-language rules. Do not load in subagent workers — pass from orchestrators if needed.

### 5. Assembler scope must be defined before implementation

Delivery-critical files only: `session.md` + `facilitator-guide.md` + `participant-materials.md` per session, transfer summary, marketing materials. Exclude slide outlines and validation reports.

---

## Component Map

### Existing components affected by v3.0

| Component | Location | v3.0 Changes |
|-----------|----------|--------------|
| intake.md | commands/ | Audit path refactored to spawn auditor agent; three-mode routing added |
| outcomes.md | commands/ | Output presentation retrofit; voice reference added; ASCII formatting |
| assessments.md | commands/ | Output presentation retrofit; alignment map hidden |
| modules.md | commands/ | Output presentation retrofit; enforcement steps hidden |
| sessions.md | commands/ | Output quality retrofit (TMA labels, slide outlines, facilitator notes); voice reference |
| metaskills.md | commands/ | Mid-calculation corrections hidden |
| transfer.md | commands/ | YAML-to-narrative output |
| marketing.md | commands/ | PAS/DOS prose output; YAML eliminated; schema updated too |
| validate.md | commands/ | Dashboard reminder added; NEEDS: marker check added |
| approve.md | commands/ | Warm handoff; assembler trigger |
| init.md | commands/ | Dashboard introduction + launch instructions |
| session-generator.md | agents/ | TMA labels, slide outline direction, facilitator diagnostic notes |
| generate-html.ts | dashboard/vite-plugins/ | Fix session subdirectory recursion; wire file-watch trigger |
| vite.config.ts | dashboard/ | WORKSPACE_DIR env var support |

### New components

| Component | Location | Purpose |
|-----------|----------|---------|
| curriculum-voice.md | .claude/reference/ | Shared tone, guardrails, plain-language substitutions |
| curriculum-auditor.md | .claude/plugins/curriculum/agents/ | Specialist agent for source material extraction |
| assemble.md | .claude/plugins/curriculum/commands/ | Compile stage outputs into delivery package |
| verify.md | .claude/plugins/curriculum/commands/ | Pre-delivery completeness check |
| generate-html.js | .claude/plugins/curriculum/scripts/ | HTML generation script called by commands |
| scripts/release.sh | repo root | Sync dev repo to public plugin release repo |

---

## Integration Points

### Voice file → commands

- Voice file read at top of every generation command
- Key guardrails also inlined into worst-offending commands (marketing, sessions, transfer, assessments)
- Voice file does NOT go to subagent workers directly — orchestrators pass relevant excerpts if needed
- Max token budget: ~800 tokens loaded per command call

### Curriculum auditor agent → intake.md

- `intake.md` audit path spawns `curriculum-auditor` agent via Task tool
- Agent returns structured result per-field: `{value, extraction_confidence, content_quality}`
  - `extraction_confidence`: High/Medium/Low/None — was source field found?
  - `content_quality`: strong/partial/absent — is existing content usable?
- Mode assignment uses `content_quality`: strong → hands-off, partial → enrich, absent → gap-fill
- Agent must have explicit Completion Signal format defined before wiring to intake

### Three-mode routing → modules.md, sessions.md

- Mode determined during intake, stored in `project-brief.md` per stage
- Downstream commands read mode per stage before generating
- hands-off: validate only, flag genuinely missing fields, never rewrite
- enrich: add missing required fields, don't touch existing content
- gap-fill: generate fresh content, clearly marked as new

### HTML generation → session and marketing commands

- Commands call `generate-html.js` script via Bash tool after writing markdown
- Script: `node .claude/plugins/curriculum/scripts/generate-html.js {input.md} {output.html}`
- HTML includes inline CSS — no external stylesheet dependency
- Dashboard file-watch trigger: `generate-html.ts` handles `handleHotUpdate` to regenerate on markdown write

### Document assembler → approve.md or standalone assemble.md

- Assembler reads from `04-sessions/*/session.md`, `04-sessions/*/facilitator-guide.md`, `04-sessions/*/participant-materials.md`, `05-transfer/`, `07-marketing/`
- Writes to `delivery/` subdirectory in workspace
- Excludes: `08-validation/`, slide outlines
- Does not require STATE.md gate — runs independently like evaluate.md

---

## Data Flow Changes

### Audit path (updated)

```
intake.md audit path
  → spawn curriculum-auditor agent
  → receive {field, extraction_confidence, content_quality} per field
  → assign mode per stage (gap-fill / enrich / hands-off)
  → write project-brief.md with mode annotations
  → downstream commands read mode and route accordingly
```

### Delivery path (new)

```
approve.md final gate
  → trigger assemble.md or assembler step
  → read delivery-critical stage files
  → write delivery/ package
  → generate HTML for facilitator guides + marketing
  → curriculum verifier runs final completeness check
```

---

## Build Order (Architecture-driven)

1. **Infrastructure** (INFR-01/02/03): deployment + dashboard env var — no dependencies, near-zero risk
2. **Voice file** (VOICE-01/02): must exist before any command references it; audit Persona sections first
3. **Presentation + Quality retrofits** (PRES + QUAL): breadth work across all commands; voice file provides guardrails
4. **Auditor agent + three-mode routing** (AUDIT-01/02/03): designed together; prerequisite: intake contract defined first
5. **HTML + Assembly + Verifier** (DLVR-01/02/03): final layer; requires clean source content from phase 3

---

## Open Questions for Planning

1. What is the exact scope of the assembled delivery package (which files, what structure)?
2. Should voice.md be loaded by session-generator subagent directly, or only passed from sessions.md orchestrator?
3. Is command-triggered HTML (on each command completion) needed, or is batch-at-dashboard-startup sufficient?
4. Does the auditor agent need to read all source documents in parallel, or sequentially?
