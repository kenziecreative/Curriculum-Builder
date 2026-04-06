---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified: [.planning/BACKLOG.md]
autonomous: true
requirements: [BACKLOG-UPDATE]

must_haves:
  truths:
    - "BACKLOG.md contains a Boost Camp Post-Build Feedback section above all existing sections"
    - "All 7 subsections are present with items sourced from PM feedback and clarification answers"
    - "PM decisions are embedded directly in items, not left as open questions"
    - "No duplication with existing backlog items — overlap is noted, not restated"
  artifacts:
    - path: ".planning/BACKLOG.md"
      provides: "Updated backlog with Boost Camp feedback"
      contains: "Boost Camp Post-Build Feedback"
  key_links: []
---

<objective>
Add a comprehensive new top-level section to BACKLOG.md capturing all actionable feedback from Kasie Treadway's Boost Camp post-build review. This is the freshest production feedback and goes above existing sections.

Purpose: Ensure production feedback from the first real Boost Camp build is captured in backlog format so it can be scoped and sequenced in the next milestone planning cycle.
Output: Updated .planning/BACKLOG.md with new section containing 7 organized subsections.
</objective>

<execution_context>
@/Users/kelseyruger/.claude/get-shit-done/workflows/execute-plan.md
@/Users/kelseyruger/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/BACKLOG.md
@.planning/feedback/2026-04-06-boost-camp-feedback.md
@.planning/feedback/2026-04-06-pm-answers.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Boost Camp Post-Build Feedback section to BACKLOG.md</name>
  <files>.planning/BACKLOG.md</files>
  <action>
Read both feedback source files and the current BACKLOG.md. Insert a new top-level section ABOVE the existing "UX / Language" section with the header:

```
## Boost Camp Post-Build Feedback (April 2026)

**Source:** Kasie Treadway, Hello Alice PM — post-build review of Standard Boost Camp
**Date:** April 2026
```

Organize into exactly 7 subsections. Each item follows established BACKLOG.md format: **Source**, **Description**, **Scope**, and fix direction. Here is what goes in each:

**### 1. Teaching Content Layer**
- One item: "Full voiceover scripts for async delivery." The pipeline produces scaffolding but not the actual instructional content. In the flipped classroom model with weekly async guides, this is the most critical missing layer. PM decision: full prose voiceover scripts preferred (not talking point outlines). Should be grounded in weekly written guides and supplemental materials the agent already generates. This is a new content generation stage, not a gap flag. Scope: new pipeline stage after sessions.

**### 2. Intake Improvements**
Three items:
- "Per-session time expectation at intake." Time math required multiple iteration cycles because per-session target wasn't established until after first validation failure. Fix: add intake question "How long should participants spend on each session?" Scope: `/curriculum:intake`.
- "Pre-program assessment discovery at intake." Business Health Score replaced proposed pre-program self-assessment — a context-specific correction the builder couldn't anticipate. PM decision: Business Health Score is Hello Alice's standard, maintained outside the builder. Baked-in default for Boost Camp builds — agent references it, doesn't generate it. Fix: ask during intake about existing pre-program assessments or onboarding tools. Scope: `/curriculum:intake`.
- "Metaskill enum validation before approval." Mismatch between "Communicating" and "Connecting" appeared late in validation. Fix: validate skill names against enum list in metaskills stage before presenting activation plan for approval. Scope: `/curriculum:metaskills`.

**### 3. Hello Alice Brand Constants**
One item: "Baked-in brand voice, color palette, and Business Health Score for Boost Camp builds." PM decision: these are fixed constants, not per-project variables. No brand capture system needed. Only intake question: whether there are partner-specific branding considerations (co-branded programs). Tool is Hello Alice-only — brand voice is a fixed constant, not a variable. Revisit only if tool extends beyond Hello Alice.

Include the full brand voice summary: Confident, Inclusive, Smart, Witty, Liberating. Include the full color palette table from the feedback file (all 8 colors with hex values). Include the tone rewrite examples table. Include the case example constraints: hypothetical only, must reflect Hello Alice audience (women entrepreneurs, POC, immigrants, underrepresented founders), industries (food, beauty, retail, services), not generic tech startup archetypes. Include the content decisions: "private journal" language rules, session ID hygiene rules (internal only, participant materials use week number + lesson title, facilitator guides may retain IDs), community vs. private two-column layout guidance.

Note overlap: The existing "Patterns from Brand Compass" section has a `curriculum-voice.md` item. This new item is more specific — it provides the actual brand constants to encode. Cross-reference but do not duplicate.

Scope: reference file creation + intake logic for co-brand detection.

**### 4. New Deliverables**
Three items, one per deliverable:
- "Internal Weekly Content Map." Word document format. Production and facilitation tool (not participant-facing). Per week: session title, week number, format, estimated duration, pre-work guide, all handouts/worksheets, full narrated slide outline (every slide titled), post-session assignments for live webinar weeks, community vs. private reflection prompts. Scope: new generation step after sessions.
- "Participant-Facing Weekly Orientation." Section within Program Overview handout or standalone doc. Per week: session title, week number, format, estimated time, plain-language list of what they'll work through, community vs. private reflection prompts. Scope: new generation step or addition to existing handout generation.
- "Curriculum Completion Tracker." Spreadsheet (Excel/Google Sheets). Columns: Week, Session title, Deliverable name, Deliverable type, Status, Notes. Status values: Existed before this run, Created this run, Needs creation, Needs review/update. PM decision: agent pre-populates status based on its own assessment, Hello Alice team does final review. Scope: new generation step, likely in approve or validate stage.

**### 5. Module-to-Session Schema Fidelity**
One item: "Add fidelity check between module and session stages." Social learning and belief-challenging quality scores were low on first pass (5.5 and 6.5) despite good design — module files weren't capturing design correctly in required schema fields. Fix: add a check between module and session stages to surface schema fidelity issues before they compound. Scope: new validation step between `/curriculum:modules` and `/curriculum:sessions`.

Note overlap: The existing "Content Fidelity" section covers audit-mode content handling. This is a different problem — schema field quality in the standard (cold-start) path, not content preservation in audit mode.

**### 6. Pre-Delivery Quality Gates**
One item with 9 specific checks. List all 9 checks from the feedback source exactly:
1. Scan all participant-facing files for session ID patterns (M-#-S-#)
2. Verify all color hex values against Hello Alice palette
3. Read slide headers and key body copy — revise anything that sounds like a policy document
4. Confirm "private journal" language doesn't imply platform space
5. Facilitator guides may retain session IDs (expected and correct)
6. Confirm Internal Weekly Content Map accurately lists every existing artifact
7. Confirm Participant-Facing Weekly Orientation uses plain language, no internal asset names/IDs
8. Confirm Curriculum Completion Tracker reflects current run's output
9. Confirm whether narrated slide scripts have been sourced or flagged as out of scope

Note overlap: The existing "Patterns from Brand Compass" section has a "Borrow Brand Verifier pattern" item covering NEEDS markers, outcome ID cross-references, and completeness. These new checks are Boost Camp-specific and more concrete. Cross-reference but do not duplicate.

Scope: enhance `/curriculum:validate` or add a pre-delivery checklist stage.

**### 7. What Worked Well**
Capture what the PM confirmed works — these are not action items but serve as design anchors for future work:
- Two-column community vs. private layout is effective
- Weekly written guides and supplemental materials (handouts, worksheets, facilitator notes) are solid generation
- The iterative correction process works, even when multiple cycles are needed
- Pipeline produces usable scaffolding — the gap is teaching content, not structural quality

Add the "last updated" line at the bottom of BACKLOG.md: `*Last updated: 2026-04-06 — Boost Camp post-build feedback added*` (replacing the existing last-updated line).
  </action>
  <verify>
    <automated>grep -c "Boost Camp Post-Build Feedback" .planning/BACKLOG.md && grep -c "### 1\. Teaching Content Layer\|### 2\. Intake Improvements\|### 3\. Hello Alice Brand Constants\|### 4\. New Deliverables\|### 5\. Module-to-Session Schema Fidelity\|### 6\. Pre-Delivery Quality Gates\|### 7\. What Worked Well" .planning/BACKLOG.md</automated>
  </verify>
  <done>BACKLOG.md has a new "Boost Camp Post-Build Feedback" section above all existing sections, containing all 7 subsections with items in established format, PM decisions embedded, no duplication with existing items, and overlap cross-referenced where relevant.</done>
</task>

</tasks>

<verification>
- New section appears above "UX / Language" section
- All 7 subsections present
- PM decisions from pm-answers.md are embedded (not left open): brand constants baked in, voiceover scripts preferred, agent pre-populates tracker status, Business Health Score is baked-in default
- No items duplicate existing backlog entries
- Overlap with existing sections is noted via cross-reference
- Each item has Source, Description, Scope format
- Color palette table included in full
- Tone rewrite examples included in full
</verification>

<success_criteria>
BACKLOG.md updated with comprehensive Boost Camp feedback section that a milestone planner can use directly for scoping and sequencing.
</success_criteria>

<output>
After completion, create `.planning/quick/1-update-backlog-md-with-boost-camp-post-b/1-SUMMARY.md`
</output>
