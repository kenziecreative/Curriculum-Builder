# KNZ Curriculum Builder — Exploratory Thesis Research

This research project investigates whether a Claude Code-native curriculum builder tool can leverage grounded learning frameworks (Six Metaskills, Theory→Method→Application, Deconstruct→Compare→Rebuild, Flipped Classroom) to produce genuinely effective curricula — structurally sound from a learning science perspective, not just marketing-polished content. The project diagnoses why the existing accelerator prompt template produces marketing-heavy output and explores what a pedagogically grounded replacement would look like inside Claude Code's extension ecosystem.

## Directory Structure

```
research/
├── research-plan.md          # Master research prompt (the assignment)
├── STATE.md                  # Persistent research state
├── sources/
│   └── registry.md           # Index of all processed sources
├── notes/                    # Structured notes per source
├── outputs/                  # Synthesized sections
├── audits/                   # Claim audit reports
├── reference/                # Protocol and standards reference files
├── cross-reference.md        # Cross-source patterns
└── gaps.md                   # Coverage tracker
```

Do not create files outside this structure for research artifacts. Working files go in `research/`. Final deliverables go in `research/outputs/`.

## Agents

| Agent | Trigger | Job | Speed |
|-------|---------|-----|-------|
| `source-processor` | `/process-source <url-or-file>` | Processes raw source into structured note | Medium (sonnet) |
| `cross-referencer` | `/cross-ref` | Finds patterns across all processed notes | Medium (sonnet) |
| `claim-auditor` | `/audit-claims <filepath>` | Fact-checks a draft against source notes | Medium (sonnet) |
| `gap-tracker` | `/check-gaps` | Maps research coverage, identifies holes | Fast (haiku) |
| `research-summarizer` | `/summarize-section <name>`, `/summarize-all` | Synthesizes notes into polished sections | Medium (sonnet) |

## Workflow

The standard research cycle:

1. **Plan** — Research plan is in `research/research-plan.md`. Read it before starting.
2. **Collect** — Use `/process-source` for each URL, PDF, or document. Do this repeatedly.
3. **Connect** — Run `/cross-ref` after every 5-8 new sources to find patterns.
4. **Assess** — Run `/check-gaps` to see what's still missing. Fill gaps with more sources.
5. **Synthesize** — Use `/summarize-section` to produce polished output for each research part.
6. **Verify** — Run `/audit-claims` on every output before it leaves the project.

Do not skip step 6. Nothing ships unaudited.

Clear context between phases. Each phase should start with a fresh context window. Before clearing context, update STATE.md with: current phase status, all completed work, key decisions made this phase, sources processed count, last cross-reference date, last gap check date, and the explicit next action for the next phase. After clearing, read STATE.md first, then gaps.md, before starting any work.

## Exploratory Thesis Standards

### What to Explore
- Theoretical foundations — is the academic/intellectual base solid, or cherry-picked?
- Core claims — does the evidence support the thesis, complicate it, or contradict it?
- Cultural and behavioral dynamics — do the assumed patterns hold up against data?
- Landscape — who's already working on this, and what's the white space?
- Audience and market — is there a viable audience, and what do they actually need?
- Feasibility — can this be built/executed, and what are the real constraints?
- The core provocation — does the central question or insight survive scrutiny?

### Finding Tags
- **SUPPORTED** — Evidence supports this thesis claim or assumption
- **COMPLICATED** — Evidence adds nuance, conditions, or limitations to the position
- **CONTRADICTED** — Evidence challenges or undermines this position
- **EMERGING** — New or developing trend with limited but promising evidence
- **GAP** — Area needs more research or isn't answerable with available sources

## State Management

Research state lives in `research/STATE.md`. It is the source of truth for project position — not memory, not conversation history, not file timestamps.

On every new session or after context clear: Read `research/STATE.md` first. Don't start working until you know where you are.

During work: Update state at every transition — phase start/end, meaningful task completion, user decisions. Write state BEFORE doing anything expensive in case of compaction.

## Context Management

This is a long-running project. Clear context between research phases — each phase gets a fresh window for sharper analysis. STATE.md is the source of truth that carries everything forward. Before clearing context, always update STATE.md, gaps.md, and cross-reference.md with current state. After clearing or starting a new session: read STATE.md first, then gaps.md. If unsure what's been done, run /check-gaps before starting new work.

## Boundaries

- This project is research and exploration, not implementation. Do not write product code, deploy anything, or modify systems outside `research/`.
- Do not fabricate sources or data. If information isn't findable, log it as a gap.
- Do not over-index on any single source. Triangulate.
- If a research question can't be answered with available tools and public sources, say so in `gaps.md` and flag it as needing primary research.

## Reference Protocols

Detailed protocols are in `research/reference/`. Read the relevant file when you need the full protocol:

| Protocol | File | Read When |
|----------|------|-----------|
| Source & Evidence Standards | `research/reference/source-standards.md` | Processing sources, citing evidence, assessing credibility |
| Writing & File Standards | `research/reference/writing-standards.md` | Writing output sections, naming files |
| Tools Guide (Tavily) | `research/reference/tools-guide.md` | Using Tavily search, extract, map, or crawl |
