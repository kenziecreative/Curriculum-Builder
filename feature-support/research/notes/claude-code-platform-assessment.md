# Claude Code as a Development Platform — Assessment for Curriculum Builder Tool

**Phase:** 4 — Claude Code as a Development Platform
**Date:** 2026-03-14
**Status:** Complete

---

## Summary Finding

Claude Code is a genuinely capable platform for building a stateful, phase-driven, multi-session curriculum generation tool. The architecture maps well onto the requirements: skills handle phase-specific workflows, CLAUDE.md encodes persistent constraints, STATE.md files maintain position across sessions, hooks enforce validation gates, and subagents handle parallel or isolated work. The key constraints are real but manageable: skills cannot directly invoke other skills, context windows are finite (200k tokens), and agent teams (true multi-agent orchestration) remain experimental. The pattern used in this research project — CLAUDE.md + STATE.md + slash command agents — is a proven, working model and a strong starting point.

---

## 1. Plugin Architecture

### What a Plugin Is

A Claude Code plugin is a bundle of related skills, subagents, hooks, and MCP server configurations distributed as a git repository. Plugins are installed via `/plugin install` and managed through a marketplace system. A plugin is not a binary or compiled artifact — it is a directory of markdown files, YAML frontmatter, scripts, and configuration that Claude Code reads and integrates at runtime.

**Marketplace distribution:** Any public or private git repository can serve as a plugin marketplace. Users run `/plugin marketplace add owner/repo` to register it, then `/plugin install <plugin-name>` to install individual plugins. Private repositories work via existing git credentials. This means a curriculum builder tool can be distributed as a GitHub repository.

### Plugin Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Skills | `.claude/skills/<skill-name>/SKILL.md` | Reusable prompt workflows invoked by name or automatically |
| Subagents | `.claude/agents/<agent-name>.md` | Specialized AI instances with isolated context and tool restrictions |
| Hooks | `.claude/settings.json` hooks section | Lifecycle event handlers (SessionStart, PreToolUse, PostToolUse, Stop) |
| MCP Servers | `.claude/settings.json` mcpServers section | External tool integrations exposed as native capabilities |
| CLAUDE.md | Project root or `~/.claude/` | Persistent context injected into every session |

### State Across Sessions

Plugins do not maintain state natively. State must be written to files and read back on session start. The canonical pattern is a STATE.md file that tracks phase, completed steps, and next actions. CLAUDE.md directs Claude to read this file at the start of every session. This pattern is already demonstrated in this research project and works reliably.

**FINDING: SUPPORTED** — Plugin architecture is well-documented and actively maintained. Distribution via git, installation via `/plugin`, and the skills+hooks+subagents model constitute a complete extensibility system.

---

## 2. Skills and Slash Commands

### Current State (as of 2026)

As of version 2.1.3, slash commands have been merged into the skills system. Slash commands still work but are now a subset of skills. The unified model is: skills are markdown files with YAML frontmatter stored in `.claude/skills/` (project-level) or `~/.claude/skills/` (personal/global). The filename/`name` frontmatter field becomes the `/command-name`.

### SKILL.md Structure

```yaml
---
name: define-outcomes        # becomes /define-outcomes (max 64 chars, lowercase, hyphens)
description: |               # max 1024 chars; used for auto-discovery
  Guides the user through defining learning outcomes for a curriculum module.
  Use when starting a new module or when the user asks to define what learners will achieve.
disable-model-invocation: true   # only user can invoke; prevents auto-triggering
allowed-tools: Read, Write, Edit, Bash  # restrict tool access
---
```

Markdown content below the frontmatter is the instruction set Claude follows when the skill is invoked.

### What Skills Can Do

Skills can read and write files (enforcing structured output directories), maintain and update STATE.md, run bash scripts for validation, display progress checklists with confirmation gates between steps, and spawn subagents for isolated sub-tasks. Skills can encode complex multi-step workflows with explicit user confirmation required before proceeding to each next step.

### What Skills Cannot Do

**Key limitation:** Skills cannot directly invoke other skills. There is no `type: "skill"` in hook configuration and no mechanism for one skill to call another skill by name. The workaround is to use subagents: a skill can spawn a subagent with the full content of another skill injected as context, effectively composing skills through the subagent system. Alternatively, a primary orchestrating skill can include instructions that reference what other skills would do, deferring to the user to invoke them in sequence.

### Auto-Discovery vs. Manual Invocation

Skill descriptions are loaded into context at a budget of ~2% of the context window (approx. 4,000 tokens in a 200k window). Claude uses these to decide when to auto-apply a skill. For curriculum workflows with side effects (writing files, advancing phase state), `disable-model-invocation: true` is appropriate — the user should explicitly invoke phase skills rather than have Claude guess.

**FINDING: SUPPORTED with qualification** — Skills are the right mechanism for phase-based curriculum workflows. The inability to call skills from skills is a real architectural constraint, but subagent composition and sequential user invocation are viable workarounds.

---

## 3. CLAUDE.md and Context Injection

### How It Works

CLAUDE.md is read by Claude Code at the start of every session and re-injected after every context compaction. It is the only file whose contents reliably survive the full lifecycle of a project. Everything written in CLAUDE.md functions as a persistent system prompt overlay.

CLAUDE.md can exist at multiple levels:
- `~/.claude/CLAUDE.md` — personal/global, applies to all projects
- `<project>/.claude/CLAUDE.md` or `<project>/CLAUDE.md` — project-level, applies to this project

### What CLAUDE.md Is Right For

CLAUDE.md is the correct location for:
- Project structure and directory layout rules
- State management instructions (read STATE.md first on every session)
- Workflow overview (phases, what each does)
- Agent/skill registry (what slash commands exist and what they trigger)
- Output standards (file naming, required sections, formatting rules)
- Boundary rules (what not to do, where not to write files)
- Pedagogical doctrine references — as a pointer to where doctrine lives, with a summary of core constraints

### What CLAUDE.md Is Not Right For

CLAUDE.md should not contain the full detail of pedagogical doctrine. At 150-300 lines, CLAUDE.md occupies roughly 3,000-6,000 tokens. Encoding all learning science rules in-line would both exceed practical CLAUDE.md limits and place the most semantically dense content in the least maintainable location. The better pattern:

- CLAUDE.md: "Pedagogical constraints are defined in `curriculum-doctrine.md`. Read it when designing assessments or sequencing. Core rule: every learning objective must have a corresponding assessment before a module is considered complete."
- `curriculum-doctrine.md` or `.claude/skills/doctrine/`: Full doctrine, loaded as needed

This matches the structure used in this project: protocols live in `research/reference/`, CLAUDE.md points to them and summarizes when to read each.

**FINDING: SUPPORTED** — CLAUDE.md is the right place for project-level constraints as summaries and pointers. Full pedagogical doctrine belongs in a separate reference file or skill that gets loaded on demand.

---

## 4. Multi-Session State Management

### The State Problem

Claude Code sessions start with a clean context window. No memory of the previous session exists unless it is explicitly written to disk and read back. This is not a bug — it is the architecture. The solution is treating state as a first-class artifact.

### The STATE.md Pattern

The pattern demonstrated in this research project is the established approach:

1. `STATE.md` contains: current phase, step within phase, blocking issues, completed phases, key decisions, and next action.
2. CLAUDE.md mandates: "Read STATE.md first on every new session or after context clear. Do not start work until you know where you are."
3. CLAUDE.md also mandates: "Update STATE.md at every transition — phase start/end, meaningful task completion, user decisions. Write state BEFORE doing anything expensive."

This creates reliable session resumption. The curriculum builder should follow this exactly, with STATE.md tracking: current curriculum being built, phase completed, validation status of each completed phase, and pending deliverables.

### Automatic Session Memory

Claude Code (as of late 2025) also has an automatic session memory system that writes structured summaries to `~/.claude/projects/<project-hash>/<session-id>/session-memory/summary.md`. This runs in the background and supplements but does not replace the explicit STATE.md pattern. For a tool that enforces validation gates, automatic memory is insufficient — it doesn't know what your validation rules are. Explicit STATE.md remains necessary.

### The Multi-Tier Memory Architecture

A practical architecture for long-running curriculum projects:

- **Tier 1 — CLAUDE.md** (~150 lines): Phase map, state management rules, constraint summaries, agent registry. Always loaded.
- **Tier 2 — STATE.md**: Current position, completed work, key decisions made during the session. Always read at session start; updated continuously.
- **Tier 3 — Per-curriculum project state**: Each curriculum project gets its own state file tracking that curriculum's specific position, decisions, and deliverables.
- **Tier 4 — Output files**: The deliverables themselves (objectives file, assessment file, sequence file, etc.) serve as implicit state — their existence and completeness is evidence of work done.

**FINDING: SUPPORTED** — The STATE.md + CLAUDE.md pattern is proven, well-documented, and matches the architecture of this research project. It is the correct approach for session resumption.

---

## 5. Subagents and Parallel Work

### How Subagents Work

Subagents are markdown files (with YAML frontmatter) stored in `.claude/agents/`. When invoked, each subagent runs in its own context window — completely isolated from the main session. The main session receives a summary when the subagent completes. This isolation means subagent work does not consume main session context tokens.

Subagents can be:
- Spawned by the main session (implicit spawning via Task tool)
- Spawned in parallel (multiple subagents running concurrently)
- Given restricted tool access (e.g., Read and Grep only — no Write or Bash)

### Tool Access

Subagents can access all standard Claude Code tools by default: Read, Write, Edit, Bash, Grep, Glob. The `tools` field in YAML frontmatter restricts this. A validation-only subagent should be restricted to Read, Grep, and Glob — it should not be able to modify files.

### Curriculum Builder Applications

Three specific subagent patterns are immediately useful:

1. **Validation subagent**: Given a completed phase output, checks structural completeness against a checklist (every objective has an assessment, every module has prerequisites defined, etc.). Read-only. Returns a pass/fail report with specific failures listed.

2. **Cross-reference subagent**: After multiple phases are complete, checks for consistency across outputs (assessment verbs match objective levels, prerequisites form a coherent sequence, etc.). Read-only.

3. **Generation subagent**: For parallel generation of multiple curriculum modules — each module is built in its own subagent context, preventing cross-contamination of module content. Returns completed module files.

### Agent Teams (Experimental)

True multi-agent orchestration (one lead coordinating multiple active teammates) is available as an experimental feature requiring `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` in settings. In this mode, a lead agent can spawn and message teammates, each with their own context window. For curriculum generation, this could mean a lead "curriculum architect" spawning parallel "module builder" agents — but this is experimental and not yet production-stable.

**FINDING: SUPPORTED for validation subagents; EMERGING for agent teams** — Subagents for validation and isolated generation are viable today. True multi-agent orchestration is experimental.

---

## 6. Existing Analogous Tools

### GSD (Get Stuff Done)

GSD is the closest existing analogue to what the curriculum builder needs. It is a spec-driven development framework for Claude Code that uses a chain of slash commands, each handling a phase, each ideally running in a fresh context window.

Key GSD patterns directly applicable:
- **PLAN.md as executable instruction**: Phase plans are written as structured files (XML format in GSD) that subagents read directly. Each plan contains atomic tasks (max 3 per subagent to maintain focus).
- **Fresh context per phase**: Each phase command spawns subagents with a fresh 200k context, leaving the main session context clean.
- **Chain of custody**: Requirements trace to phases, phases trace to plans, plans trace to outputs. Everything is connected and verifiable.
- **Human approval checkpoints**: Between phases, GSD presents what was done and asks for explicit approval before the next phase begins.

GSD is used in production by engineers at Amazon, Google, Shopify, and Webflow. Its adoption is evidence that this pattern works at scale.

### This Research Project

The current research project is itself a working example of the curriculum builder pattern — minus the pedagogical constraints. It has:
- CLAUDE.md encoding workflow rules and boundary constraints
- STATE.md as the source of truth for session position
- Phase-based work (12 phases, each building on the last)
- Slash command agents for specific operations (`/process-source`, `/summarize-section`, etc.)
- Memory files for cross-session context
- Output files that constitute the research deliverables

The curriculum builder is essentially this system, with the research domain replaced by curriculum design and pedagogical validation added as an enforcement layer.

**FINDING: SUPPORTED** — GSD and this research project are both working demonstrations of the exact pattern needed. The curriculum builder does not need to invent new patterns — it needs to apply existing patterns to a new domain.

---

## 7. Practical Constraints

### Context Window

Claude Code uses a 200,000-token context window. Before any user input, approximately 30,000-40,000 tokens are consumed by system prompts, tool definitions, MCP schemas, and memory files. Effective working context is approximately 160,000-170,000 tokens.

For curriculum generation:
- A single module's full content (objectives, assessments, sequence, content outline) is likely 5,000-15,000 tokens.
- A 12-module curriculum passing through multiple generation phases could consume 100,000+ tokens in a single session.
- **Mitigation**: Use subagents for generation tasks. Each subagent gets a fresh 200k context. The main session stays clean, acting as an orchestrator rather than a generator.

Auto-compaction triggers at 64-75% capacity. CLAUDE.md survives compaction — it is re-injected fresh. STATE.md does not auto-survive compaction, which is why CLAUDE.md must explicitly instruct Claude to re-read it after compaction.

### Output Persistence and File Organization

All output files are written to the local filesystem. For a curriculum builder:

```
curriculum-project/
├── CLAUDE.md                    # Project constraints and workflow rules
├── STATE.md                     # Current position in curriculum build
├── .claude/
│   ├── skills/                  # Phase-specific skills (invokable commands)
│   │   ├── define-outcomes/
│   │   ├── design-sequence/
│   │   ├── build-assessments/
│   │   ├── create-content/
│   │   └── generate-marketing/
│   └── agents/                  # Subagents
│       ├── validator.md
│       └── cross-referencer.md
├── curriculum/
│   ├── 01-outcomes.md
│   ├── 02-sequence.md
│   ├── 03-assessments.md
│   ├── 04-content/
│   └── 05-marketing/
└── validation/
    └── reports/
```

### Version Control Integration

Claude Code has native git integration. It can run git commands, generate commit messages, create branches, and manage pull requests through natural language. For a curriculum builder:
- Each validated phase completion should be committed
- Validation reports can be committed alongside the content they validated
- The git log becomes an audit trail of curriculum development

This requires the curriculum project to be a git repository, which is straightforward.

### Distribution

A curriculum builder plugin can be distributed as a public or private GitHub repository. Installation is:
```
/plugin marketplace add your-org/knz-learner-builder
/plugin install curriculum-builder
```

Users get the full plugin: skills, subagents, hooks, reference files, and CLAUDE.md template. Private distribution (for organizational use) works the same way using git credentials.

### Enforcement Limitations

Claude Code does not have hard execution stops analogous to a compiler refusing to compile invalid code. Enforcement is behavioral — hooks can block specific tool calls with exit code 2 (which Claude treats as a hard stop), but a user can explicitly override Claude's hesitation through the conversation. The validation architecture should:
1. Use hooks to block specific actions (e.g., prevent writing `05-marketing/` files until `03-assessments.md` exists and is marked valid)
2. Use STATE.md to track validation status formally
3. Use checkpoint skills that explicitly require user review before advancing

This is probabilistically robust — Claude will not casually skip validation — but it is not cryptographically enforced.

**FINDING: SUPPORTED with caveats** — Context management via subagents, file-based output, git integration, and plugin distribution all work. Enforcement is behavioral not structural — strong but not absolute.

---

## Architecture Recommendation for Curriculum Builder

Based on this assessment, the curriculum builder should be structured as a Claude Code plugin with the following components:

**CLAUDE.md** encodes:
- Curriculum project structure (directory layout)
- Phase map (what each phase is, what it produces, what validates it)
- State management rule (read STATE.md first, always)
- Core pedagogical constraint summary (with pointer to full doctrine file)
- Agent registry (what `/commands` are available)

**STATE.md** (per curriculum project) tracks:
- Current phase and step
- Validation status of each completed phase
- Key decisions made (target audience, learning goals, format constraints)
- Deliverables produced and their file paths

**Skills** (one per phase):
- `/init-curriculum` — scaffolds directory, initializes STATE.md, collects project parameters
- `/define-outcomes` — guides outcome definition, validates against Bloom's taxonomy, writes `01-outcomes.md`
- `/design-sequence` — builds module sequence with prerequisite logic, writes `02-sequence.md`
- `/build-assessments` — generates assessments aligned to outcomes, writes `03-assessments.md`
- `/create-content` — generates module content within sequence constraints, writes `04-content/`
- `/generate-marketing` — derives marketing materials from completed curriculum, writes `05-marketing/`
- `/validate-phase` — runs validation subagent against current phase outputs, writes report to `validation/reports/`
- `/advance-phase` — confirms validation passed, updates STATE.md, unlocks next phase

**Subagents**:
- `validator.md` — read-only; checks structural completeness of phase outputs against doctrine checklist
- `cross-referencer.md` — read-only; checks consistency across multiple phase outputs

**Hooks**:
- `SessionStart` — triggers STATE.md read on session start; reminds of current position
- `PreToolUse` on Write — checks if target path is permitted given current phase validation status; blocks writing to future-phase directories before prerequisites are validated

---

## Evidence Tags

- Plugin architecture and distribution: **SUPPORTED**
- Skills as phase handlers: **SUPPORTED**
- Skill-to-skill invocation: **NOT POSSIBLE** (workaround: subagent composition)
- CLAUDE.md for constraint encoding: **SUPPORTED**
- STATE.md for session persistence: **SUPPORTED** (proven in this project)
- Subagents for validation: **SUPPORTED**
- Hooks for enforcement gates: **SUPPORTED** (behavioral, not structural)
- Agent teams for parallel generation: **EMERGING** (experimental)
- Git integration: **SUPPORTED**
- Plugin distribution via GitHub: **SUPPORTED**
- Context window as a constraint on long sessions: **SUPPORTED** (real constraint; subagents mitigate)

---

## Sources

- [Extend Claude with skills — Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Hooks reference — Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Create and distribute a plugin marketplace — Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)
- [Orchestrate teams of Claude Code sessions — Claude Code Docs](https://code.claude.com/docs/en/agent-teams)
- [How Claude remembers your project — Claude Code Docs](https://code.claude.com/docs/en/memory)
- [Skill authoring best practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [The Complete Guide to Building Skills for Claude (Anthropic PDF)](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
- [GSD Framework: get-shit-done — GitHub](https://github.com/gsd-build/get-shit-done)
- [Inside Claude Code Skills: Structure, prompts, invocation — Mikhail Shilkov](https://mikhail.io/2025/10/claude-code-skills/)
- [Claude Code Hook Limitations: No Skill Invocation — DEV Community](https://dev.to/aabyzov/claude-code-hook-limitations-no-skill-invocation-lazy-plugin-loading-and-how-i-solved-it-44f2)
- [Claude Code Context Management — SitePoint](https://www.sitepoint.com/claude-code-context-management/)
- [The Architecture of Persistent Memory for Claude Code — DEV Community](https://dev.to/suede/the-architecture-of-persistent-memory-for-claude-code-17d)
- [Understanding Claude Code: Skills vs Commands vs Subagents vs Plugins](https://www.youngleaders.tech/p/claude-skills-commands-subagents-plugins)
- [Claude Code Extensions Explained — Medium](https://muneebsa.medium.com/claude-code-extensions-explained-skills-mcp-hooks-subagents-agent-teams-plugins-9294907e84ff)
- [Claude Code Merges Slash Commands Into Skills — Medium](https://medium.com/@joe.njenga/claude-code-merges-slash-commands-into-skills-dont-miss-your-update-8296f3989697)
- [Using CLAUDE.MD files — Anthropic Blog](https://claude.com/blog/using-claude-md-files)
- [Writing a good CLAUDE.md — HumanLayer Blog](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [awesome-claude-code — GitHub (hesreallyhim)](https://github.com/hesreallyhim/awesome-claude-code)
