# Phase 2: Core Plugin Infrastructure - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the operational plugin commands that let a user start a new curriculum project and complete Stage 1 (Intake) with a guided conversational interview. Includes `/knz-init`, `/knz-intake`, `/knz-resume`, `/knz-approve`, command-level stage gate checks, and session interruption handling via STATE.md. No dashboard, no outcome/assessment generation, no subagent orchestration — those are later phases.

</domain>

<decisions>
## Implementation Decisions

### Intake conversation flow
- Opens with warm context-setting: brief explanation of what intake does and why, then first question batch. Sets expectations for Hello Alice SMEs who haven't done instructional design intake before
- Questions batched in thematic groups: "About your learners" (audience, expertise, self-direction), "About your program" (topic, duration, modality), "About success" (criteria, transfer). 3 groups of 2-4 questions each
- Confirmation step uses structured summary + AskUserQuestion with options: "Looks good" / "Edit something" / "Start over" (INFR-06 compliance)

### Command structure
- `/knz-init` — Asks for project name only, scaffolds `workspace/{name}/` with directories + STATE.md + CLAUDE.md, then auto-chains into `/knz-intake`. One command to start a project
- `/knz-intake` — Guided conversational interview using thematic question groups. Ends with summary + confirmation that doubles as the post-intake review gate
- `/knz-resume` — Generic for all stages from Phase 2 onward. Reads STATE.md, shows current position, routes to the right action. Works for stages that don't exist yet (shows "run /knz-{stage} to continue")
- `/knz-approve` — Shows condensed summary of stage output, then AskUserQuestion for approval. Used for review gates that aren't inline (post-assessment, final validation in later phases)

### Stage gate enforcement
- Command-level checks: each stage command reads STATE.md and refuses to run if prerequisites aren't met
- Post-intake gate is inline at end of `/knz-intake` — the confirmation step IS the gate approval. No separate `/knz-approve` needed for intake
- PreToolUse hook for file-write enforcement deferred to Phase 7 (per roadmap INFR-07)

### Session interruption & resume
- Incremental save: confirmed intake fields written to STATE.md as each thematic group completes. Interruption preserves everything answered so far
- On resume, system shows captured fields and picks up at the next unanswered thematic group
- No conversation context saved — just confirmed field values. If nuance was lost, user re-states it

### Claude's Discretion
- Pushback tone when SMEs give vague answers — adapt between expert coach reframing and explain-then-redirect based on user's apparent understanding
- Block message detail when a command refuses to run due to unmet prerequisites
- Whether post-intake field editing is targeted (change individual fields) or requires redoing a thematic group
- Resume re-orientation depth — adapt based on how much was captured before interruption
- Expert instructional designer persona tone calibration (INFR-11)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.claude/reference/schemas/stage-01-intake.md` — Complete intake schema with all required fields, enum values, and validation rules. Intake command generates output matching this schema
- `templates/project-scaffold/STATE.md` — Ready-to-use STATE.md template with stage tracking, key decisions, review gates, session continuity sections
- `templates/project-scaffold/CLAUDE.md` — Complete workspace CLAUDE.md with constraint hierarchy, pipeline rules, pedagogical principles, never list (under 300 lines)
- `.claude/hooks/session-start.md` — Session-start hook spec for auto-restoring context from STATE.md

### Established Patterns
- Brand Compass plugin (`knz-brand-guidance/`) demonstrates: `.claude/commands/` for pipeline commands, `.claude/agents/` for subagents, `workspace/` for project output, AskUserQuestion for decisions
- Schema-in-prompt enforcement: commands include the relevant schema file as generation context (no runtime validation until Phase 6)
- STATE.md uses explicit status enums: `not-started | in-progress | complete` for stages, `not-reached | pending | approved` for gates

### Integration Points
- `.claude/commands/` — New command files: `knz-init.md`, `knz-intake.md`, `knz-resume.md`, `knz-approve.md`
- `workspace/{project-name}/` — Init scaffolds this from templates/project-scaffold/
- `workspace/{project-name}/00-project-brief/project-brief.md` — Intake writes the completed brief here
- `workspace/{project-name}/STATE.md` — All commands read/write state here

</code_context>

<specifics>
## Specific Ideas

- Intake questions must be answerable by Hello Alice SMEs without instructional design vocabulary (INTK-02). The schema field `prior_knowledge` requires "can do X, cannot yet do Y" format — the intake conversation must elicit this without using the term "prior knowledge" or "behavioral description"
- "The tool handles the scaffold, the human handles the soul" — intake is where the human provides the soul; the command's job is to capture it in schema-compliant form without the human knowing that's what's happening
- Brand Compass `brand-compass` command is a single conversational walkthrough — intake follows the same pattern but with thematic batching instead of sequential questions

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-plugin-infrastructure*
*Context gathered: 2026-03-15*
