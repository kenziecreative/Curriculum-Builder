# Feature Analysis — v3.0

**Project:** KNZ Curriculum Builder v3.0
**Researched:** 2026-03-24
**Confidence:** HIGH — analysis from direct BACKLOG review and command file inspection

---

## Feature Dependency Chain

```
curriculum-voice.md  ──────────────────────────────────────────►  all generation commands
                                                                       (VOICE → PRES → QUAL)

curriculum-auditor agent  ──►  three-mode audit routing  ──►  intake.md, modules.md, sessions.md
                                                                       (AUDIT-03 → AUDIT-01/02)

deployment model fix  ──►  dashboard env var  ──►  init launch instructions
                                                                       (INFR-01 → INFR-02)

command quality fixes  ──►  HTML generation  ──►  document assembler
                                                                       (QUAL → DLVR-02 → DLVR-01)
```

**Build order implication:** Voice file before command retrofits. Deployment fix before dashboard. Command quality fixes before HTML assembly.

---

## Feature Categories

### 1. Output Presentation (PRES-01–08)

**Table stakes:**
- Constraint enforcement steps hidden from output — users see results only
- Plain language replacement across all commands (no schema vocabulary)
- Warm synthesizing handoffs between stages
- Context-clear nudge at stage completion

**Differentiators:**
- Structured ASCII formatting for outcomes (box header, tree hierarchy)
- Dashboard awareness built into pipeline (init, sessions, validate)

**Complexity:** LOW-MEDIUM. Every command needs a pass, but each change is isolated to that command's output instructions. No architectural changes. Risk: breadth (12 commands) not depth.

**Dependencies:** Voice file must exist before commands reference it.

---

### 2. Output Quality (QUAL-01–09)

**Table stakes:**
- TMA phase labels removed from facilitator/participant-facing content
- NEEDS: markers resolved before files marked complete
- HTML calculation comments stripped from session files
- Session content shows objective text, not IDs

**Differentiators:**
- Slide outlines as production direction (not content inventory)
- Facilitator notes with diagnostic moves (observe / signal / respond)
- Marketing as PAS/DOS prose with VOC language
- Transfer ecosystem as readable narrative
- Writing for Clarity principles applied across all content

**Complexity:** MEDIUM-HIGH. Quality changes require understanding the doctrine (slide outlines, facilitation notes) and copywriting frameworks (PAS/DOS for marketing). The session-generator subagent is the highest-impact target — it produces the most volume.

**Dependencies:** QUAL fixes are prerequisites for HTML output. Don't generate HTML from content that still has TMA labels and NEEDS: markers.

---

### 3. Curriculum Voice System (VOICE-01–02)

**Table stakes:**
- `curriculum-voice.md` created with prohibited terms, plain-language substitutions, tone per output type

**Differentiators:**
- Signature moves for how outcomes are phrased, activities introduced, reflection prompted
- Voice file audits existing command Persona sections for conflicts before writing

**Complexity:** LOW to write; MEDIUM to enforce. The file itself is simple. Enforcement requires inlining key guardrails into the worst-offending commands — not just pointing to the reference file.

**Anti-feature:** A voice file that is only a reference (not inlined into commands) will produce uneven enforcement. The reference is documentation; inline excerpts are enforcement.

**Dependencies:** Voice file must exist before any command retrofit references it. Persona audit of existing commands is a prerequisite to writing it.

---

### 4. Audit Mode Content Handling (AUDIT-01–03)

**Table stakes:**
- Three-mode routing: gap-fill / enrich / hands-off based on content quality
- Source structure shown as starting point; departures shown with reasoning before writing

**Differentiators:**
- Curriculum auditor extracted as dedicated specialist agent
- Mode assignment surfaced to user before processing begins

**Complexity:** HIGH. Three-mode logic requires adding a `content_quality` dimension distinct from the existing extraction confidence scale. The auditor agent extraction requires designing a contract (Completion Signal) before writing either the agent or the updated intake command. These two changes must be designed together.

**Anti-feature:** Repurposing the existing extraction confidence scale (High/Medium/Low) for content quality triggers destructive rewrite of strong existing content. The scales answer different questions.

**Dependencies:** Auditor agent design precedes intake update. Three-mode logic design precedes implementation.

---

### 5. Infrastructure (INFR-01–03)

**Table stakes:**
- Deployment model: clone-and-run (workspace always inside repo, dashboard always finds it)
- Dashboard accepts WORKSPACE_DIR env var
- `/curriculum:init` tells user exact dashboard launch command

**Differentiators:**
- `scripts/release.sh` automates dev→public sync

**Complexity:** LOW-MEDIUM. Deployment change is a coordinated update of 4 artifacts (install.sh or removal, README, CLAUDE.md, workspace path in init). Must be done atomically — partial updates create contradictory state.

**Dependencies:** Deployment model fix is a prerequisite for dashboard fix. Dashboard fix and init instruction update happen in the same phase.

---

### 6. Document Assembly + HTML Output (DLVR-01–02)

**Table stakes:**
- Assembler compiles: session.md + facilitator-guide.md + participant-materials.md per session + transfer summary + marketing
- Marketing package generates HTML alongside markdown
- Facilitator guides generate HTML alongside markdown

**Differentiators:**
- HTML includes inline CSS for immediate use — no stylesheet required
- Assembled package is a single coherent deliverable, not a directory of files

**Anti-feature:** "Compile all stage outputs" without scope produces an unusable 200k+ token document. Scope strictly to delivery-critical files. Exclude slide outlines and validation reports.

**Complexity:** MEDIUM. HTML generation is technically simple (marked + inline CSS). The real complexity is scope definition and wiring HTML generation to file-write events (not just server startup).

**Dependencies:** Command quality fixes (QUAL) must precede HTML generation. HTML generation must precede assembler.

---

### 7. Curriculum Verifier (DLVR-03)

**Table stakes:**
- No NEEDS: markers in complete files
- No HTML comments in session output files
- No TMA phase labels in user-facing content
- All required stage files present

**Future scope (not v3.0):**
- Cross-document outcome ID reference checking
- Assessment-outcome link verification

**Complexity:** LOW-MEDIUM. Each check is a file scan pattern. The constraint is pairing each check with a command fix that prevents the issue upstream.

**Dependencies:** Each verifier check requires a corresponding command fix to already be complete. Verifier phase comes after command retrofit phases.

---

## Build Order Recommendation

| Phase | Features | Why this order |
|-------|----------|----------------|
| Infrastructure | INFR-01, INFR-02, INFR-03 | Prerequisite; deployment model affects everything downstream |
| Voice + Presentation | VOICE-01/02, PRES-01–08 | Voice file must exist before commands reference it; presentation is breadth work |
| Output Quality | QUAL-01–09 | Content quality changes; prerequisites for HTML |
| Audit Mode | AUDIT-01–03 | Auditor agent + three-mode logic designed together |
| HTML + Assembly + Verifier | DLVR-01–03 | Final layer; requires clean source content from QUAL phase |
