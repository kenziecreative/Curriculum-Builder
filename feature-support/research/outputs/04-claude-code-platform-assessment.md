# Phase 4: Claude Code as a Development Platform — What Is Actually Buildable

## Core Finding

Claude Code is the right platform for this. The curriculum builder pattern — multi-session, phase-driven, stateful, with validation checkpoints and structured outputs — maps directly onto Claude Code's existing extension model. Nothing here requires capabilities that don't exist. The pattern is already proven: this research project is a working instance of it, and GSD (used at Amazon, Google, Shopify) is the same architecture applied to software development.

---

## The Architecture in Brief

The curriculum builder is a Claude Code plugin. It ships as a GitHub repo. Users install it and instantiate new curriculum projects. Each project gets its own directory with state tracking, and the user works through phases across multiple sessions.

**What handles what:**

| Component | Role |
|-----------|------|
| **CLAUDE.md** | Project constraints, phase map, state management rules, core pedagogical constraint summary (with pointers to full doctrine) |
| **STATE.md** | Current position, completed phases, validation status, key decisions, deliverables produced |
| **Skills** (one per phase) | Phase-specific workflows invoked via `/command`. Each skill knows what it needs to produce, what validation it requires, and what the user needs to confirm before advancing |
| **Subagents** | Isolated work — validation checks (read-only), cross-referencing across phases, parallel module generation |
| **Hooks** | Enforcement gates — SessionStart triggers state read, PreToolUse blocks writing to future-phase directories before prerequisites are validated |
| **Reference files** | Full pedagogical doctrine, loaded on demand by skills that need it (not crammed into CLAUDE.md) |

**Proposed skill map:**

| Skill | What It Does | Output |
|-------|-------------|--------|
| `/init-curriculum` | Scaffolds project, collects parameters, initializes STATE.md | Project directory + STATE.md |
| `/define-outcomes` | Guides outcome definition, validates against Bloom's levels | `01-outcomes.md` |
| `/design-sequence` | Builds module sequence with prerequisite logic and scaffolding | `02-sequence.md` |
| `/build-assessments` | Generates assessments aligned to outcomes, validates pairing | `03-assessments.md` |
| `/create-content` | Generates module content within sequence constraints | `04-content/` |
| `/generate-marketing` | Derives marketing from completed curriculum | `05-marketing/` |
| `/validate-phase` | Runs validation subagent, produces pass/fail report | `validation/reports/` |

---

## Key Platform Facts

**State persists through files, not magic.** Claude Code sessions start clean. STATE.md is the mechanism — CLAUDE.md mandates reading it first on every session. This is exactly how this research project works and it's reliable.

**Skills can't call skills directly.** This is the one architectural constraint worth noting. Workaround: subagent composition (a skill spawns a subagent with another skill's content injected) or sequential user invocation via clearly documented phase commands. Not a blocker.

**Enforcement is behavioral, not structural.** Hooks can block specific actions (exit code 2 = hard stop), and STATE.md can gate phase advancement, but a user can always override through conversation. The system is probabilistically robust — Claude will not casually skip validation — but it's not a compiler. This is the correct expectation to set.

**Context management works via subagents.** A full 12-module curriculum could consume 100k+ tokens in a single session. Each subagent gets a fresh 200k context. The main session stays clean as orchestrator, subagents do the heavy generation. This is the same pattern used for research agents in this project.

**Distribution is straightforward.** GitHub repo → `/plugin marketplace add` → `/plugin install`. Works for public or private (organizational) distribution.

---

## What This Confirms

The curriculum builder doesn't need to invent new patterns. It needs to apply proven patterns (CLAUDE.md + STATE.md + phase skills + validation subagents + hooks) to a new domain, with pedagogical constraints as the enforcement layer. The research framework we're using right now is the reference implementation.

---

*Phase 4 complete. Source: [claude-code-platform-assessment.md]*
