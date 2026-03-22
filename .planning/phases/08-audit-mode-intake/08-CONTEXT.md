# Phase 8: Audit Mode Intake - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

`/knz-intake` gains an audit mode branch — when the user indicates they have existing curriculum materials, the command reads those documents, synthesizes across all of them, extracts intake schema fields with confidence levels, surfaces substantive conflicts for resolution, asks targeted follow-up questions only for genuine gaps, and produces both a `project-brief.md` and a `curriculum-gap-report.md`. The clean intake path is unchanged. Stage pre-population (writing outcomes/assessments/etc. from existing content) is Phase 9, not this phase.

</domain>

<decisions>
## Implementation Decisions

### Document ingestion
- File paths as ARGUMENTS is the primary method: `/knz-intake path/to/guide.md path/to/slides.md`
- Auto-detect fallback: if no ARGUMENTS given, Claude looks in `workspace/{project}/source-material/` and lists what it finds before reading — user confirms before synthesis begins
- `/knz-init` must scaffold `source-material/` directory so users have a natural drop location
- Any file format Claude can read is accepted — no artificial restriction to markdown/text
- Progress announced per document as Claude reads it (not silent, not verbose per-field — one line per file)

### Confidence display
- After reading all documents, show an extraction table: `Field | Extracted | Confidence`
- Confidence levels: **High** / **Medium** / **Low** / **None**
- **High** requires explicit statement in the source material — no inference. If Claude had to deduce it, it's Medium at best
- High fields are accepted as-is without asking
- Medium, Low, and None fields trigger targeted follow-up questions
- For Medium/Low: show what was extracted and ask the user to confirm or correct it
- For None: ask a targeted question (same vocabulary quarantine as clean intake — no schema jargon)
- Follow-up questions happen after the confidence table is shown, not before

### Conflict resolution
- "Conflict" means substantive contradiction on what the program IS — who the audience is, what the skill type is, what success looks like
- Format differences (slide count vs. stated time allocation, etc.) are NOT conflicts — Claude interprets and converts format to schema structure, that's not the user's call
- When a genuine substantive conflict is found: show named contradiction with both source excerpts, then ask the user to resolve
- If user says "both are partially true": accept the nuance, ask one synthesizing follow-up to get the canonical answer. Do not force a binary choice
- Conflicts are surfaced during the follow-up question phase (same pass as Medium/Low/None fields), not as a separate step

### Gap report
- Separate file: `workspace/{project}/00-project-brief/curriculum-gap-report.md`
- `project-brief.md` stays clean as the schema-valid intake output; gap report is human-facing
- Organized by pipeline stage (Stage 2: Outcomes, Stage 3: Assessments, Stage 4: Modules, Stage 5: Sessions, Stage 6: Metaskills, Stage 7: Transfer Ecosystem, Stage 8: Marketing)
- Three states per stage section: **Exists** (what was found), **Shallow** (found but doesn't meet schema requirements), **Missing** (nothing found)
- "Shallow" is defined by schema-field completeness, not subjective depth judgment — e.g., outcomes exist but don't span required Bloom's levels = shallow
- Dashboard should surface both files from 00-project-brief/

### Gate and confirmation
- Same gate pattern as clean intake: brief summary + AskUserQuestion with "Looks good" / "Edit something" / "Start over"
- Shown after both project-brief.md and curriculum-gap-report.md are ready to write
- No separate audit-specific gate — consistent UX regardless of path taken

### Claude's Discretion
- Exact wording of per-document progress announcements
- How many follow-up questions to ask when multiple fields need input (batch or sequential)
- Whether conflicts and gap questions are interleaved or grouped
- Ordering of follow-up questions when multiple fields need input

</decisions>

<specifics>
## Specific Ideas

- Real-world test case: 6-session × 90-min AI agent workflows workshop for developers. Existing materials: facilitator guide (detailed: session structure, exercises, facilitation notes, research appendix) + slide deck outline. Strong on framing and exercise design; expected gaps: transfer design, social learning structure, reflection prompts, Bloom's-level tagging on outcomes
- The audit is about "merging in previous expertise and knowledge" — it enriches and structures what exists, not replaces it. The pipeline converts existing substance to the schema, it doesn't interrogate why things were designed the way they were

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `knz-intake.md`: The existing clean intake command — audit mode branches from this command's opening. The thematic question groups (learners, program, success) are available as fallback patterns for None-confidence fields
- `stage-01-intake.md`: Full intake schema with all required fields, enum values, and validation rules — audit mode extracts against this same schema
- AskUserQuestion gate pattern: `approve / edit something / start over` established in Phase 2, reused here for audit confirmation gate

### Established Patterns
- Vocabulary quarantine: never expose schema field names, enum values, or instructional design terminology to user — audit mode follow-up questions must use the same plain-language framing as clean intake questions
- Silent state management: STATE.md reads/writes are silent — no announcement phrases. Audit mode follows this rule
- Auto-correction before display: user never sees uncorrected intermediate state. Audit mode shows the extraction table (already synthesized), not raw extraction notes
- Inline gate: the confirmation step IS the gate approval — no separate `/knz-approve` call needed

### Integration Points
- `workspace/{project}/source-material/` — new directory to scaffold in `/knz-init`. Audit mode auto-detects here when no ARGUMENTS given
- `workspace/{project}/00-project-brief/` — audit mode writes two files here: `project-brief.md` (same as clean intake) + `curriculum-gap-report.md` (new)
- STATE.md `Stage Progress` table: Stage 1 status rules carry forward unchanged — audit mode produces the same completion state as clean intake
- Dashboard: `00-project-brief/` section needs to surface both files when audit mode was used

</code_context>

<deferred>
## Deferred Ideas

- Stage pre-population from existing content (outcomes, assessments, module structure, sessions pre-filled from source documents) — Phase 9
- Evaluation mode: run external curriculum through validation rubrics without the full pipeline — Phase 10

</deferred>

---

*Phase: 08-audit-mode-intake*
*Context gathered: 2026-03-22*
