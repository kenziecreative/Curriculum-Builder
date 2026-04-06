# Standard Boost Camp — Curriculum Builder Feedback

**Source:** Kasie Treadway, Hello Alice Program Manager
**Date:** April 2026
**Context:** Post-build review of Standard Boost Camp curriculum generation

---

## Critical Gap: Teaching Content Layer

The pipeline produces scaffolding (facilitator guides, worksheets, activities) but not the actual instructional content. In a flipped classroom model with weekly async guides, this is the most important missing layer.

**What's needed:** Full voiceover scripts — prose written to be recorded against the slide deck for async delivery. Not talking point outlines. These should be grounded in the weekly written guides and supplemental materials the agent already generates (handouts, worksheets, facilitator notes).

**Decision:** Add a content generation stage, not just a gap flag.

---

## Pipeline Process Issues

### 1. Time math required multiple iteration cycles
Per-session time target wasn't established until after first validation failure.
**Fix:** Add time expectation question to intake: "How long should participants spend on each session?"

### 2. Metaskill enum mismatch surfaced late
Mismatch between "Communicating" and "Connecting" appeared late in validation.
**Fix:** Validate skill names against enum list in metaskills stage before presenting activation plan for approval.

### 3. Social learning and belief-challenging quality scores low on first pass
Module files weren't capturing design correctly in required schema fields (5.5 and 6.5 scores despite good design).
**Fix:** Add check between module and session stages to surface schema fidelity issues before they compound.

### 4. Pre-program self-assessment not surfaced at intake
Business Health Score replaced proposed pre-program self-assessment — a context-specific correction the builder couldn't anticipate.
**Fix:** Ask during intake about existing pre-program assessments or onboarding tools. Note: Business Health Score is Hello Alice's standard — should be baked in as a default for Boost Camp builds.

---

## Brand & Voice System

### Hello Alice Brand Voice
Confident, Inclusive, Smart, Witty, Liberating.
**Not:** Clinical instructional design language.

**Guiding principle:** Hello Alice materials should feel like they come from a seasoned guide who's been on the journey, not from a compliance document. Direct, a little dry, grounded in real-stakes language.

**Decision (from PM):** Brand voice, color palette, and Business Health Score are baked-in constants for all Boost Camp builds. Not per-project variables. No brand capture system needed. Only intake question: whether there are partner-specific branding considerations (co-branded programs).

### Hello Alice Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary / headers | Magic Blue | #0042C6 |
| Dark slide backgrounds | Midnight Blue | #00002C |
| Teal accent (fills, Module 2) | Teal | #21DBBC |
| Purple accent (Module 3) | Purple | #9880FF |
| Warm accent on dark slides | Yellow | #FFD802 |
| Light background tint (Magic Blue) | — | #E8EFFE |
| Light background tint (Teal) | — | #E0FAF6 |
| Light background tint (Purple) | — | #F5F3FF |

**Note:** Teal (#21DBBC) and Purple (#9880FF) are bright accent colors suited for shape fills and backgrounds with white text. For colored text on white/light backgrounds, use darker variants: #008B73 (dark teal) or #6B3FCC (dark purple).

### Tone Rewrite Examples

| Before (clinical) | After (Hello Alice) |
|---|---|
| "How Sessions Work" | "How This Works" |
| "What This Program Asks of You" | "What This Takes" |
| "Three asks — not suggestions" | "Three things. Non-negotiable." |
| "Use the community space for / Keep in your private journal" | "Community space — bring here / Keep in your own notes" |
| "What Participation Looks Like" | "How Participation Works" |
| "Do this / Skip this" | "What works here / What to leave behind" |

---

## Session ID Hygiene

Session IDs (e.g., M-1-S-1, M-2-S-3) are internal only. Never in participant-facing materials.

**Participant-facing materials use:** Week number + Lesson title.
**Facilitator guides:** May retain session IDs.

### Specific locations where IDs were found and removed:
- Slide 1 header
- Slide 9 REFLECTION header
- Slide 11 "Up Next" badge and body copy
- Program Overview handout: session column removed from table
- Program Overview footer
- Community Norms header subtitle and footer
- Worksheets: subtitle rows

---

## Content Decisions

### Private Journal
- Use: "Keep in your own notes" or "Keep to yourself"
- Do not use: "Keep in your private journal" (implies platform-provided space)

### Case Examples
- Hypothetical, not real alumni businesses
- Must reflect Hello Alice's core audience: women entrepreneurs, people of color, immigrants, underrepresented founders
- Industries: food, beauty, retail, services — not generic tech startup archetypes

### Community vs. Private
- Two-column layout is effective, keep it
- "Private" = participant's own notes system, not a platform feature

---

## New Deliverables

### 1. Internal Weekly Content Map
**Format:** Word document
**Purpose:** Production and facilitation tool (not participant-facing)
**Per week includes:**
- Session title, week number, format (async or live webinar)
- Estimated session duration
- Pre-work guide (if any)
- All handouts and worksheets
- Full narrated slide outline (every slide titled)
- For live webinar weeks: post-session assignments and what to bring from prior sessions
- Community vs. private reflection prompts

### 2. Participant-Facing Weekly Orientation
**Format:** Section within Program Overview handout or standalone doc
**Purpose:** Help participants orient before starting a session
**Per week includes:**
- Session title and week number
- Format and estimated time
- Plain-language list of what they'll work through
- Community vs. private reflection prompts

### 3. Curriculum Completion Tracker
**Format:** Spreadsheet (Excel/Google Sheets)
**Purpose:** Build status visibility for production team
**Columns:** Week | Session title | Deliverable name | Deliverable type | Status | Notes
**Status values:** Existed before this run | Created this run | Needs creation | Needs review/update
**Decision (from PM):** Agent pre-populates status based on its own assessment. Hello Alice team provides final review.

---

## Quality Checks Before Delivery

1. Scan all participant-facing files for session ID patterns (M-#-S-#)
2. Verify all color hex values against Hello Alice palette
3. Read slide headers and key body copy — revise anything that sounds like a policy document
4. Confirm "private journal" language doesn't imply platform space
5. Facilitator guides may retain session IDs (expected and correct)
6. Confirm Internal Weekly Content Map accurately lists every existing artifact
7. Confirm Participant-Facing Weekly Orientation uses plain language, no internal asset names/IDs
8. Confirm Curriculum Completion Tracker reflects current run's output
9. Confirm whether narrated slide scripts have been sourced or flagged as out of scope
