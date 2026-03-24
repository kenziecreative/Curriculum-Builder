# Backlog: Curriculum Builder

Items captured here are candidates for the next milestone. They are not yet scoped, sized, or sequenced — that happens in `/gsd:new-milestone`.

---

## UX / Language

### Plain language throughout all user-facing output
**Source:** First real-world test (preconference workshop, 2026-03-24)
**Description:** All command output must be readable by a subject matter expert with no instructional design vocabulary. The rigor is built into the structure — it should never surface in the language shown to users.

Specific terms that must be replaced everywhere they appear in user-facing output:

| Insider term | Plain language replacement |
|---|---|
| "enforce schema" | describe what it actually does ("review and fill in the required sections") |
| "verb violations" | "Objectives X, Y use vague action words — rewrite with something observable or measurable" |
| "paired_objective linkage" | "each assessment needs to be connected to a specific learning objective" |
| "transfer context not paired per objective" | "each objective needs a real-world scenario showing where learners would use this skill" |
| "DCR trigger not addressed" | describe what's actually missing in plain terms |
| "pre-work exists but not formally tagged" | "pre-session materials found but not connected to the session structure" |
| "session-level objectives absent" | "missing learning objectives for individual sessions" |
| "schema" | never use — describe the actual requirement instead |
| "linkage" | never use — say what needs to be connected to what |

**Scope:** Affects every command that produces user-facing output — intake confirmation, gap report table, outcomes, assessments, modules, sessions, validation report, approve summary.

### Workspace CLAUDE.md template — capture project-specific preferences
**Source:** First real-world test (2026-03-24)
**Description:** The workspace-level `CLAUDE.md` (scaffolded by `/curriculum:init`) should prompt for project-specific preferences that need to persist across context clears — things that don't belong in `project-brief.md` but affect how the pipeline behaves for this particular project/client.

Candidates for what to capture:
- Communication preferences ("this client needs more explanation, less jargon")
- Known constraints ("sessions must be max 60 min despite 90-min slot")
- Prior decisions ("we agreed to drop DCR for this cohort")
- Facilitator notes ("co-facilitated — two voices in the room")

Currently the template is a generic scaffold. It should actively prompt the user to fill in project context that would otherwise live only in conversation memory.

### Outcomes output: structured formatting with box-drawing characters and tree hierarchy
**Source:** First real-world test (2026-03-24) — `/curriculum:outcomes` output
**Description:** The outcome hierarchy should use structured ASCII formatting to make it scannable. Kelsey provided a specific target format (see below).

**Target format spec:**
- Header box with `╔══╗` / `║` / `╚══╝` — program name + key parameters (contact hours, thinking levels) in plain language
- Section headers with `────` dividers (PROGRAM OUTCOMES, MODULE OUTCOMES, SESSION OUTCOMES, THINKING-LEVEL DISTRIBUTION)
- Each outcome rendered as:
  ```
  ID  ThinkingLevel
  ▸ Outcome text
  ↳ When: Real-world situation
  ```
- Module blocks use `│` pipe indent for their outcomes, with module header showing parent program outcome `[→ PO-X]`
- Session blocks use `├─` / `└─` tree structure, with session header showing parent module `[→ MO-X-X]`
- Thinking-level distribution as a box table at the end, with a one-line progression summary below it
- Constraint enforcement collapsed to a single callout line at the top (e.g., "> 3 objectives strengthened, all session outcomes generated fresh") — never a step-by-step breakdown

**What to remove:**
- Internal parameter labels ("Medium tier", "global floor", "Stage 2 - Interested", step numbers)
- The "Program parameters" preamble block — surface only what changed, not the calculation

**Scope:** `/curriculum:outcomes` conversation output only. Files written to disk are unaffected.

### Marketing output: the file must be a usable document, not a YAML data structure
**Source:** First real-world test (2026-03-24) — `/curriculum:marketing` output
**Description:** The marketing package is written as a YAML code block with schema fields wrapping every paragraph (`element_type:`, `source_citation:`, `curriculum_traceability:`, `claim_type:`). The copy inside is actually good and could go directly onto a registration page. But no human can use the file as delivered.

This is the clearest example of the core problem: the schema became the output instead of the scaffold.

**What the file should look like:**
```
# [Program Title]

[Program description — plain paragraphs]

## What you'll walk away with
- [Learning promise 1]
- [Learning promise 2]

## Who this is for
[Audience positioning]

## Register
[CTA]
```

Traceability data (source citations, claim strength) belongs in a separate section at the bottom or a separate file entirely — not wrapped around every paragraph. It's an audit trail, not content.

**The rule:** Marketing files must be copy-paste ready. A non-technical user should be able to open the file and use it immediately.

**Second problem — copy quality:** Even with correct formatting, the generated copy is flat. It describes the program accurately but doesn't convert. The Hello Alice copywriting doctrine (PAS/DOS frameworks, Voice of Customer language, benefits-before-features) was not applied.

Specific failures against Hello Alice's own copywriting standards:
- Opens with program description (feature-first) — should open with the reader's problem or desire
- No agitation before the solution — PAS requires dwelling on the pain before resolving it
- Uses no Voice of Customer language — should mirror how practitioners actually describe their frustration
- Learning promises are benefit-adjacent but generic ("you'll build a delegation tier map") — not benefit-led ("stop re-specifying requirements from memory every time you start a project")
- No tension, no urgency, no emotional arc

**What the marketing command needs:**
- Apply PAS or DOS framework as the structural backbone (not just list elements)
- Use VOC language from intake (what the audience already says about this problem)
- Benefits-first for registration page copy — features belong further down
- Swipefile formulas for headlines and CTAs (Confluence reference below)

**Reference:** Hello Alice conversion copywriting doctrine at `helloalice.atlassian.net/wiki/spaces/PP/pages/2915795113` — PAS/DOS frameworks, Finding Your Message, Swipefile formulas. Accessible via Atlassian MCP.

This is a content quality problem that needs a different generation approach for marketing — not just better schema compliance.

**Scope:** `/curriculum:marketing` — both the written file and conversation output.

### Never show mid-calculation corrections in output
**Source:** First real-world test (2026-03-24) — `/curriculum:metaskills` output
**Description:** The metaskills output showed the constraint enforcement process including a mid-calculation error and self-correction: "Creating is at pos 4, Innovating at pos 3. This violates the constraint. Reorder:..."

Showing corrections-in-progress destroys user confidence. If the tool made an error and fixed it, the user should only see the correct result with a brief plain-language note ("I reordered the sequence to match the developability hierarchy"). The working-through belongs entirely off screen.

**Scope:** All commands. Any mid-process correction must be silent — only the outcome surfaces.

### Modules output: hide constraint enforcement steps entirely
**Source:** First real-world test (2026-03-24) — `/curriculum:modules` output
**Description:** The output labels its own internal work as "Constraint enforcement (internal)" and then shows it anyway — 6 numbered steps of DAG validation, coverage checks, schema field generation. This is the Teachable.com analogy: the user is trying to learn the lesson and the code is visible.

The module summary table at the end is good and close to the right format. Everything before it needs to go.

What to keep:
- A single plain-language callout for anything that was added or changed ("Your source materials had session outlines but no group activities or thinking routines — I built those in.")
- The module structure table (name, sessions, core thinking skill, what it challenges)
- The narrative paragraph explaining the sequence rationale — that's genuinely useful

What to remove:
- Every numbered constraint enforcement step
- The label "Constraint enforcement (internal)" — if it's internal, it shouldn't appear at all
- Schema field names in the explanation ("social_learning fields", "metaskill_activation_activity", "belief_challenging_encounter", "NEEDS: marker lines")

**Scope:** `/curriculum:modules` conversation output.

### Assessments output: replace alignment map with human-readable summary
**Source:** First real-world test (2026-03-24) — `/curriculum:assessments` output
**Description:** The 26-row alignment map showing Outcome ID × Assessment ID × Bloom Match is the internal verification table — it proves coverage to the developer, not to the user. An SME doesn't need or want to see this.

What the user actually needs to see:
- The assessments themselves — name, what learners do, when it happens in the program
- A simple count: "6 check-ins, 3 final assessments — all learning objectives covered"
- Any changes made and why, in plain language ("I added 2 check-ins to cover topics your source materials left implicit")

The alignment map should be computed silently. If the user wants to verify coverage, that's what the files on disk are for.

**Format direction:** Same structured format as outcomes — sections with dividers, each assessment as a readable block, not a table row. Something like:
```
CHECK-IN 1 — Failure Mode Classification  [Session 1]
▸ What learners do: [plain description]
↳ Covers: naming workflow failure modes, understanding why they happen
```

**Scope:** `/curriculum:assessments` conversation output. The alignment map in the written files is fine — it's what's shown in conversation that needs to change.

### Outcomes output: plain language in constraint enforcement preamble
**Source:** First real-world test (2026-03-24) — `/curriculum:outcomes` output
**Description:** The constraint enforcement block uses insider language that means nothing to an SME:
- "The schema is embedded in the outcomes command itself" — user doesn't need to know this
- "global floor" — say "minimum thinking levels required across all programs"
- "Medium tier: 2–16 hrs" — internal calculation, shouldn't be shown
- "Stage 2 - Interested" — internal enum, should be plain ("learners who are engaged but new to this framework")
- Step labels like "Step 1 (prohibited verbs)" expose the enforcement mechanism rather than the outcome

The constraint enforcement block should either be hidden entirely (silent, as designed) or summarized in one plain-language sentence: "I strengthened 3 objectives and filled in all session-level outcomes." The detail only needs to appear if something was changed that the user should know about.

### Prompt user to clear context between pipeline stages
**Source:** First real-world test (2026-03-24)
**Description:** Each command should end with a nudge to clear context before running the next stage. Nothing is lost (everything is on disk), and fresh context produces better output — especially for generation-heavy stages like sessions.

The nudge should:
- Appear at the end of every stage completion message
- Be brief and reassuring ("your work is saved — clear context before the next step for best results")
- Name the next command explicitly so the user knows exactly what to run after clearing

**Scope:** All commands that complete a stage and hand off to the next — intake, outcomes, assessments, modules, sessions, validate, approve.

---

## Infrastructure

### Release sync script
**Source:** Post-v2.0 repo split (2026-03-24)
**Description:** Add `scripts/release.sh` to automate syncing scrubbed plugin files from `Curriculum-Builder` (dev) to `curriculum-plugin` (public release). Currently manual.

---

---

## Content Fidelity

### Audit mode: three-mode content handling — gap-fill, enrich, hands-off
**Source:** First real-world test (2026-03-24) — core architectural gap
**Description:** The pipeline currently has one mode: process everything through the generation layer. For cold starts this is correct. For existing content — especially content with strong voice, production quality, and hard-won clarity — this is destructive.

Running a well-developed 12-week bootcamp through the current audit mode would make it worse, not better. The schema enforcement strips authorial voice and replaces it with schema-compliant but lifeless output.

**The three modes needed:**

1. **Gap-fill** — source has no content for a required field (e.g., no transfer design, no social learning) → generate fresh, clearly marked as new
2. **Enrich** — source has structure but it's thin or incomplete → add what's missing without touching what exists
3. **Hands-off** — source has strong, complete content → validate it meets requirements, flag anything genuinely missing, but never rewrite or paraphrase existing content

**The rule:** The pipeline should never rewrite content that already exists and works. It should only add what's absent. The user's voice and production direction are assets — the tool's job is to extend them, not replace them.

**What triggers each mode:** Determined by the confidence level assigned during audit extraction — High confidence = hands-off, Medium = enrich, Low/None = gap-fill.

**Scope:** Fundamental to audit mode path. Affects intake, modules, sessions, slide outlines. This is a v3.0 architectural requirement, not a patch.

### Audit mode must treat source structure as the starting point, not a suggestion
**Source:** First real-world test (2026-03-24)
**Description:** When a user brings existing materials into audit mode, the system is reorganizing content in ways the user didn't ask for — e.g., collapsing 6 source modules into a different structure — without surfacing that decision or asking for input.

The user's intent in audit mode is: "Here's where I am. Take this as source material and get us to an end result." They're not asking the system to redesign their structure. They're asking it to validate and fill gaps in what already exists.

**The principle:** Source structure is the default. Departures from it require an explicit decision — shown to the user, with reasoning, before proceeding. The system should say "your source had 6 modules — I mapped them this way because X, does that work?" not silently restructure.

**Specific issue observed:** Source materials had 6 modules. The pipeline produced a different module structure without surfacing the change or explaining the timing/hour breakdown.

**What's needed:**
- Audit mode should show a side-by-side of source structure vs. proposed structure when they differ
- Any restructuring decision (collapsing, splitting, reordering modules) must be shown with reasoning before files are written
- The hour/time breakdown should be visible so the user can verify the program still fits the format

**Scope:** `/curriculum:modules` in audit mode path. May also affect `/curriculum:sessions`.

---

## What's Working Well

### Slide outlines: written for a slide builder, not an algorithm
**Source:** First real-world test (2026-03-24) — generated vs. source slide outlines
**Description:** The generated slide outlines read like a content inventory ("Slide 1: X. Slide 2: Y."). The source material reads like a person giving production direction — what goes on the slide, how to present it, and why.

**The gap:** Generated outlines describe content. Good slide outlines give direction.

**What the source does that the generated output doesn't:**
- Tells the slide builder what to put on the slide AND the intent ("No framing. Let it sit.")
- Uses sparse, opinionated language ("Two columns, no labels needed")
- Flags slide types that change how you present ([DISCUSSION], [EXERCISE], [REFERENCE])
- Gives facilitator-facing rationale inline ("Don't present from this — participants photograph it")
- Preserves authorial voice — the tone that makes a workshop feel like it was designed, not assembled

**The fix:** Slide outline generation needs to be written toward a human building slides, not toward schema completeness. The source format should be the model — study it and match its register, not just its structure.

**Source to study:** `/Users/kelseyruger/Projects/a-emporium-working/gold-master-presentation/ai-workflow-accessu/workspace/accessu-ai-workflow/source-material/workshop-slides-outline.md`

**Scope:** Session slide-outline.md generation in `/curriculum:sessions`.

### Session content: show objective titles, not IDs
**Source:** First real-world test (2026-03-24) — session content output
**Description:** Session content sections (e.g., THEORY: Learning Objectives) list outcome IDs like `SO-2-1-1` instead of the actual objective text. The user has to go look up what those IDs mean.

The IDs are for internal tracking. The user needs the titles — they're what make the session content legible.

**Fix:** Everywhere an outcome ID appears in user-facing session output, replace it with the full objective text (or a plain-language short form of it). IDs can stay in the written files for traceability, but should never be the only thing shown in conversation.

**Scope:** `/curriculum:sessions` conversation output and likely the generated session files themselves.

### NEEDS: markers must not survive into final output files
**Source:** Full content audit (2026-03-24) — assessment-plan.md
**Description:** The assessment plan file contains unconverted NEEDS: markers like "# NEEDS: Assessments are not formally structured with paired_objective linkage — /curriculum:assessments will add paired objectives..." throughout. These are pre-population placeholders that should have been resolved or removed when assessments ran. The file shipped in an incomplete state.

This is a bug, not a quality issue. NEEDS: markers are internal staging artifacts — they must either be filled in or removed before any file is considered written. A user opening this file sees a TODO list, not a curriculum artifact.

**Fix:** Pre-population write logic and downstream command enforcement must ensure no NEEDS: markers remain in any file marked complete in STATE.md. Add a check to the validation stage.

**Scope:** Pre-population pipeline, assessment command, validation.

### TMA phase labels must not appear in facilitator or participant-facing content
**Source:** Full content audit (2026-03-24) — slide outlines, session files
**Description:** Internal pedagogical labels — "TMA Phase", "ACTIVATE", "THEORY", "CHECK", "METHOD", "PRACTICE", "REFLECT", "TRANSFER" — appear as column headers and section labels in facilitator guides and slide outlines. A facilitator building slides from these would put "ACTIVATE" on a slide.

These are structuring concepts for the generation system, not labels that should surface to users. The column should read "Section" or "Activity"; phase labels should be replaced with plain descriptions of what the section IS.

**Scope:** Session files, slide outlines, facilitator guides — anywhere TMA phase names appear as visible labels.

### Facilitator notes need diagnostic direction, not just script
**Source:** Full content audit (2026-03-24)
**Description:** Facilitator timing guides tell facilitators WHAT to say but not WHEN to say it or WHAT TO LISTEN FOR. Example: "Circulate to listen for pairs who are debating the practice's general merit rather than whether it is durable" — but no guidance on what that sounds like or how to intervene.

Strong facilitation notes tell the facilitator what to observe, what it signals, and what move to make in response. The current output reads like a stage direction, not a facilitation guide.

**Scope:** Facilitator guide generation in `/curriculum:sessions`.

### Transfer ecosystem file must be a readable document, not YAML
**Source:** Full content audit (2026-03-24) — transfer-ecosystem.md
**Description:** Same problem as the marketing package — the transfer ecosystem is structured as YAML with internal field labels visible. A facilitator or program manager opening this file would need to parse schema syntax to understand the pre/in/post-program design.

**Fix:** Transfer ecosystem output should be a readable narrative with plain headings and human-readable descriptions. YAML structure belongs in the generation layer only.

**Scope:** `/curriculum:transfer` output file.

### Calculation comments must not appear in session files
**Source:** Full content audit (2026-03-24) — M-3-S-1/session.md
**Description:** HTML comment visible: `<!-- Timing breakdown: ACTIVATE 7 + Chunk1 13 + ... = 90 -->`. Working notes and calculations should never appear in output files.

**Scope:** All session file generation — strip any HTML comments before writing.

### Apply Writing for Clarity principles across all pipeline output
**Source:** First real-world test (2026-03-24) — Hello Alice copywriting doctrine
**Description:** The Writing for Clarity principles apply everywhere in the pipeline, not just marketing. Every piece of generated text — facilitator guides, participant materials, session descriptions, command output — should pass the same clarity test.

Key principles to encode:
- **Kernel sentences**: "Blank is Blank" — state direct relationships simply. "This session is a workflow design exercise" not "This session provides participants with an opportunity to engage with workflow design concepts through structured practice"
- **Precise language**: specific over general everywhere. "3 objectives need stronger verbs" not "some objectives need attention"
- **No warm-up copy**: start with the thing, not a preamble about the thing
- **Sticky not smooth**: copy should land, not slide past

**Scope:** All generated content files and all conversation output. This is a quality baseline that should apply before any content is shown to a user.

**Reference:** Hello Alice Writing for Clarity (Confluence page 2915729646) via Atlassian MCP.

### Session manifest format is the target for all pipeline output
**Source:** First real-world test (2026-03-24) — `/curriculum:sessions` manifest output
**Description:** The session manifest table is the clearest, most useful output in the entire pipeline so far. Clean table, plain language titles, visible pre-work chain, optional session flagged clearly. This is the format and tone the rest of the pipeline should match.

Key things it gets right:
- No internal IDs or schema vocabulary visible
- Pre-work column makes the flipped classroom structure visible without explaining it
- Optional session handled gracefully with a plain note
- "Inter-session deliverables form a cumulative chain" — one sentence that communicates the design logic without exposing the framework

---

## Core v3.0 Problem Statement

**The pipeline produces structurally correct but mechanically voiced output — even from cold starts.**

Schema enforcement is working. Pedagogy is sound. But the output reads like something that understood the rules without understanding the purpose. A facilitator guide that lists phase names instead of telling you how to open the room. A slide outline that inventories content instead of giving production direction. Objectives as IDs instead of sentences.

The doctrine says: "The tool handles the scaffold, the human handles the soul." The current output fills in everything — including the things that should stay human. It doesn't leave room for soul.

**v3.0 must solve two distinct problems:**

1. **Output quality** — generated content needs voice, production direction, and human register. Not just schema completeness. A facilitator guide should read like it was written by a skilled instructional designer, not assembled by a constraint checker.

2. **Output presentation** — what the user sees in conversation should read like a capable colleague reporting back, not a system log. Constraint enforcement steps, alignment maps, internal IDs, and schema vocabulary should never appear in user-facing output.

These are separate problems with separate fixes. But both have to be solved before this tool delivers on its promise for any program — from scratch or from existing content.

## Guiding Principle for v3.0 Output Presentation

**Show the result, not the machinery.**

"Here's what I built, here's what I changed, here's what you need to decide."

Every stage output needs a pass through this lens before v3.0 ships.

---

*Last updated: 2026-03-24 — full content audit complete, all issues logged*
