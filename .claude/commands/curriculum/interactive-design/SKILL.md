---
name: interactive-design
description: Design better interactive CLI experiences in Claude Code. Use this skill when building slash commands, choosing question formats, structuring information-gathering flows, or presenting output. Covers interaction patterns (sequential vs. parallel, single vs. multi-select, arguments vs. prompts) AND output formatting — using headings, tables, and visual hierarchy to make CLI responses readable and scannable.

---

This skill guides two related concerns: how to **gather information** effectively in Claude Code commands, and how to **present output** so it's readable, scannable, and worth looking at.

Claude Code renders Markdown. That's a design surface. Use it like one.

---

## Part 1: Output Formatting

### The Core Principle

CLI output fails in one of two ways: walls of prose that hide the signal, or over-structured noise that buries it in bullet points. The goal is **hierarchy that matches how the reader actually scans** — headline first, detail on demand.

Think of it like a newspaper, not a memo. Lead with what matters. Structure reveals, not decorates.

---

### Headings

Use Markdown headings to create scannable sections. In Claude Code's rendered output, `##` and `###` give you clear visual breaks without shouting.

| Level | Syntax | Use When |
|---|---|---|
| H2 | `## Section` | Major output sections — Summary, Results, Next Steps |
| H3 | `### Subsection` | Sub-groupings within a section |
| H4 | `#### Label` | Rarely — use bold instead for fine-grained labels |

**Rules:**
- Every output longer than ~6 lines deserves at least one heading
- Don't use H1 (`#`) — it's too large for inline CLI output
- Headings should be nouns or noun phrases, not full sentences
- Don't stack headings without content between them

**Example:**

```
## Analysis

Three issues found across 47 files.

### Critical

Two authentication paths skip token validation entirely.

### Warnings

Legacy session handler is deprecated but still in active use.
```

---

### Tables

Tables are the single highest-leverage formatting tool in the CLI. Use them whenever you're presenting **multiple items with shared attributes**.

**Use a table when:**
- Comparing 2+ items across the same properties
- Presenting key/value pairs (more than ~4 pairs)
- Showing a list where columns add meaning (status, owner, date)
- Summarizing options before asking a question

**Don't use a table when:**
- You only have one column (use a list)
- The items have no shared structure
- The data is deeply nested or variable

**Table design rules:**
- Keep column headers short — 1-3 words
- Left-align text columns, left-align everything by default
- Don't pad with empty columns for visual symmetry
- 3-5 columns is the readable range; beyond that, split the table

**Example — comparing options:**

| Package | What It Does | Best For |
|---|---|---|
| Catalyst Series | Rapid partner activation sprint | New partnerships, fast pilots |
| Vertical Sprint | Deep industry-specific build | Established partners, focused scope |
| Signal Report | Insight and data delivery | Partners wanting analytics, not builds |

**Example — status summary:**

| Area | Status | Notes |
|---|---|---|
| Auth service | `✓` Complete | Token refresh fixed |
| Data pipeline | `→` In progress | 2 stories remaining |
| Admin UI | `△` Blocked | Waiting on design review |

---

### Lists

Use lists for **sequences and enumerations** — not as a default for everything.

**Ordered lists** (`1.`, `2.`, `3.`) for:
- Steps that must happen in sequence
- Ranked priorities
- Numbered options you'll reference later ("see option 2")

**Unordered lists** (`-`) for:
- Non-ordered collections
- Features, capabilities, or requirements
- Items with no meaningful ranking

**Rules:**
- Max 2 levels of nesting. Deeper than that, restructure.
- Each item should be parallel in structure (all fragments, or all sentences — don't mix)
- If every item is a full sentence, consider prose instead
- If you have 2 items, consider inline prose: "X and Y" instead of a list

---

### Emphasis and Inline Formatting

| Element | Syntax | Use For |
|---|---|---|
| **Bold** | `**text**` | Key terms, critical values, action words |
| `Code` | `` `text` `` | File names, commands, variable names, paths |
| Code block | ` ``` ` | Multi-line code, structured output, config |
| *Italic* | `*text*` | Rarely — titles, light emphasis only |

**Bold is not a highlighter.** If everything is bold, nothing is. Reserve it for the one or two things in a block that the reader needs to see first.

---

### Status Indicators

A small set of Unicode characters reads well in CLI output and stays consistent across terminals. Prefer these over emoji — they're more neutral, render reliably, and feel at home in a code environment.

| Symbol | Meaning |
|---|---|
| `✓` | Complete / passing / confirmed |
| `✗` | Failed / blocked / missing |
| `△` | Warning / needs attention |
| `→` | In progress / next step |
| `◆` | Insight / key point |
| `▸` | Summary or section marker |

**Rules:**
- Use them in tables and lists, not mid-sentence
- One symbol per row — don't stack them
- Don't invent new ones; stay in this set for consistency

---

### Horizontal Rules

Use `---` to separate major logical sections when headings alone aren't enough — particularly between input summary and output, or between phases of a multi-step operation.

Don't overuse. One or two per response max.

---

### Output Structure Templates

**For analysis or audit results:**
```
## Summary

[1-2 sentence lead with the key finding]

## Details

[Table or structured breakdown]

## Recommended Next Steps

[Ordered list of actions]
```

**For before/after comparison:**
```
## Current State

[Table or description]

## Proposed Changes

[Table with delta or diff-style summary]
```

**For command output with multiple outputs:**
```
## [Primary Output Title]

[Main content]

---

## Notes

[Caveats, assumptions, or open questions]
```

---

### Common Formatting Mistakes

| Mistake | Problem | Fix |
|---|---|---|
| Bullet-pointing everything | Loses hierarchy, hides relationships | Use prose for narrative, lists only for enumerations |
| No headings on long output | Forces linear reading | Add H2 sections every 6-8 lines of content |
| Tables for 2-item lists | Overkill, looks stiff | Use inline prose or a simple list |
| Bold every other word | Emphasis loses meaning | Bold 1-2 terms per section max |
| Nesting lists 3+ deep | Unreadable fast | Restructure; use a table instead |
| Status emoji mid-sentence | Disruptive, informal | Keep emoji in tables and list items only |

---

## Part 2: Interaction Design

### Core Interaction Primitives

Claude Code offers several ways to gather information and present choices:

| Tool | Key Feature | Best For |
|---|---|---|
| `AskUserQuestion` | 1-4 questions, single or multi-select | Guided decisions, branching logic |
| Slash command arguments | `$1`, `$2`, `$ARGUMENTS` | Power users, repeatability |
| File references (`@filename`) | Injects file contents | Building on prior outputs |
| Inline bash (`!command`) | Executes shell commands | Checking state, dynamic context |

---

### AskUserQuestion Design

**Question anatomy:**

| Field | Constraint | Notes |
|---|---|---|
| `header` | Max 12 chars | Short chip/tag — "Scope", "Audience", "Priority" |
| `question` | Full sentence | Provide context. End with `?` |
| `options` | 2-4 items | Each has `label` (short) and `description` (implications) |
| `multiSelect` | true / false | See below |

**Option writing rules:**
- **Labels:** 3-5 words, scannable, distinct. "Global with US focus" not "A perspective with global reach but US attention"
- **Descriptions:** Explain what choosing this *means*, not just what it is. "Care is moving from institutions to homes, enabled by technology" beats "Healthcare delivered outside hospitals"
- **Order:** Most likely first, or logical grouping. Don't alphabetize arbitrarily
- **Count:** 3-4 is ideal. 2 feels like yes/no. More than 4 overwhelms

---

### Sequential vs. Parallel Questions

**Go sequential when:**
- Later questions depend on earlier answers
- Each decision significantly changes the path
- You need to react to each choice before moving on

**Go parallel (multiple questions at once) when:**
- Questions are independent of each other
- Gathering quick details (scope, timeframe, format)
- Reducing back-and-forth is the priority

Max 2-3 parallel questions. More than that overwhelms.

---

### When to Use multiSelect

| Use `multiSelect: true` | Use `multiSelect: false` |
|---|---|
| Options aren't mutually exclusive | Exactly one answer needed |
| "All that apply" makes sense | Options create branching logic |
| Building composite requirements | Simpler is better |

---

### Arguments vs. Interactive Prompts

**Use arguments when:**
- Power users want shortcuts
- Input is simple and predictable
- Repeatability matters (scripting)

**Use interactive prompts when:**
- Users need guidance through options
- Decisions benefit from explanation
- First-time or infrequent use

**Hybrid approach:** Accept optional arguments, fall back to prompts if not provided. Best of both.

---

### Progressive Disclosure

Start broad, then narrow. Don't front-load all options.

```
1. "Do you want X or Y?" — fork
2. "Which specific X?" — drill down
3. "Any customizations?" — refinement
```

---

### Interaction Anti-Patterns

| Anti-Pattern | Problem | Better Approach |
|---|---|---|
| Too many questions at once | Overwhelming | Max 2-3 parallel, or go sequential |
| Vague option labels | User can't distinguish | Be specific about what each means |
| Hard-coded examples in prompts | Feels stale, constrains output | Generate contextually each time |
| Asking what you could infer | Wastes user time | Use context from earlier answers |
| No escape hatch | User feels trapped | "Other" option or skip path |
| Overly clever headers | Confusing | Simple, descriptive headers |
| Free-text input presented as options | Confusing UX | Use plain text AskUserQuestion, no options list |

---

## Checklist: Reviewing a Command Design

### Output formatting
- [ ] Long output uses `##` headings to break it into sections
- [ ] Tables used for multi-attribute comparisons and key/value sets
- [ ] Bold used sparingly — 1-2 terms per section max
- [ ] Status characters (`✓` `✗` `△`) used in tables/lists, not mid-sentence
- [ ] Lists are parallel in structure
- [ ] No more than 2 levels of nesting

### Interaction design
- [ ] `header` is under 12 characters and descriptive
- [ ] `question` ends with `?` and provides enough context
- [ ] 2-4 options — not too few, not too many
- [ ] Option `labels` are short and scannable
- [ ] Option `descriptions` explain implications, not just definitions
- [ ] `multiSelect` matches the type of choice
- [ ] Consider whether this should be an argument instead of a prompt
- [ ] Free-text inputs use plain AskUserQuestion with no options list
- [ ] "Other" escape hatch is present where appropriate
