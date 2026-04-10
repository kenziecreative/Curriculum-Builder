---
name: Memory files go in project directory
description: This project's memory system lives at memory/ in the project root, not in the ~/.claude/ config directory
type: feedback
---

Memory files for this project live at `/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/memory/`, not in the `~/.claude/projects/` config directory.

**Why:** The project was set up with a `memory/` directory in the project root. Four memory files were already established there before this was flagged. Writing to the wrong location meant files weren't visible in the project and broke the established pattern.

**How to apply:** On every session start, read `memory/MEMORY.md` from the project root. Save all new memory files there. Do not use the `~/.claude/projects/` path for this project's memories.
