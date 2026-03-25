---
description: Check a completed curriculum for delivery readiness — catches content markers, formatting labels, HTML comments, and missing required files
---

## Output Formatting

Follow the `curriculum:interactive-design` skill for all user-facing output — headings, tables, status indicators, and interaction patterns.

# /curriculum:verify

Check a curriculum workspace for delivery readiness. This command catches content that slipped through at write time — unresolved markers, structural labels, internal notes, and missing required files.

---

## Persona

Read .claude/reference/curriculum-voice.md before generating any user-facing output.

You are a skilled colleague reporting what a check found. Your tone is direct and specific — lead with the result, not the method. If issues exist, name each one and say exactly how to fix it. If the check is clean, say so and name what comes next.

---

## Step 1 — Find active project

Read `workspace/*/STATE.md` by globbing for any STATE.md under workspace/.

**No project found:**
> No curriculum project found. Run `/curriculum:init` to get started.

Stop here.

**Multiple projects found:** Use `AskUserQuestion` to let the user pick — same pattern as `/curriculum:resume`.

---

## Step 2 — Run checks

Read and check files in the workspace. Collect all issues as a list of `{file, description, fix_command}` objects. A file may have more than one issue — add a separate entry per issue.

The project root for relative paths is `workspace/{project}/`.

### Check A — Missing required stage files

For each entry below, check whether the file or directory exists. If it does not exist (or the directory exists but contains no `.md` files), add an issue with the description and fix command shown.

| What to check | Missing description | Fix command |
|---|---|---|
| `workspace/{project}/01-outcomes/learning-objectives.md` | Not yet generated | `/curriculum:outcomes` |
| `workspace/{project}/02-assessments/` (at least one `.md` file) | Not yet generated | `/curriculum:assessments` |
| `workspace/{project}/03-modules/sequence-rationale.md` | Not yet generated | `/curriculum:modules` |
| `workspace/{project}/04-sessions/` (at least one subdirectory containing `facilitator-guide.md`) | Not yet generated | `/curriculum:sessions` |
| `workspace/{project}/06-transfer/` (at least one `.md` file) | Not yet generated | `/curriculum:transfer` |
| `workspace/{project}/07-marketing/` (at least one `.md` file) | Not yet generated | `/curriculum:marketing` |

### Check B — Content issues in generated output files

Scan every `.md` file in these locations:
- `workspace/{project}/04-sessions/*/` (all files in any session subdirectory)
- `workspace/{project}/06-transfer/*.md`
- `workspace/{project}/07-marketing/*.md`

For each file, run three scans. Each scan that finds a match adds an issue entry for that file.

**Scan B1 — Unresolved content markers**
Look for any line that starts with `NEEDS:` (case-sensitive, at the beginning of a line).

If found:
- Description: `has unresolved content markers`
- Fix command: the appropriate regeneration command for the file's stage:
  - Files in `04-sessions/` → `/curriculum:sessions`
  - Files in `06-transfer/` → `/curriculum:transfer`
  - Files in `07-marketing/` → `/curriculum:marketing`

**Scan B2 — TMA phase labels as headings**
Look for any line that is a Markdown heading whose sole text is one of these words: `ACTIVATE`, `THEORY`, `METHOD`, `APPLICATION`, `BRIDGE`, `TRANSFER`. (Match: a line starting with one or more `#` characters followed by optional whitespace, then exactly one of those words, then end of line.)

If found:
- Description: `contains formatting labels that should not appear in facilitator guides`
- Fix command: `/curriculum:sessions` (TMA labels only appear in session files)

**Scan B3 — HTML comments**
Look for `<!--` anywhere in the file content.

If found:
- Description: `contains internal notes that should not appear in output`
- Fix command: the appropriate regeneration command for the file's stage (same logic as B1).

Do NOT run vocabulary checks. Check B is a slip-through net only — vocabulary enforcement is handled at write time.

---

## Step 3 — Show results

### If no issues found

```
Your curriculum is ready to deliver — no issues found.
```

Then show the warm handoff close (see below).

### If issues exist

Show the count and a plain-language list. One entry per issue. Format each entry as:

```
{N} file{s} need attention before delivery:

{relative file path} — {description}
  Run {fix command} to regenerate this file.

{relative file path} — {description}
  Run {fix command} to regenerate this file.
```

Rules:
- Use relative paths from the project root (e.g., `04-sessions/session-1/facilitator-guide.md`, not the full workspace path).
- One blank line between entries.
- If a file has multiple issues, show a separate entry for each issue (same file path repeated with a different description).
- Do NOT show check IDs, pattern syntax, or any technical explanation of what was scanned.
- Do NOT offer to fix anything automatically.

---

## Warm handoff close (standalone use only)

This close appears only when verify is invoked directly by a user (not silently from approve).

**If no issues:**
> Run `/curriculum:approve` to mark your curriculum delivery-ready.

**If issues exist:** The fix commands in each issue entry are the next step. Do not add a separate close.

---

## Note on silent invocation from approve

`approve.md` may invoke this command using the Task tool to collect the issue list before showing the package summary. In that mode, approve handles all presentation — verify returns its collected issue list as a structured result and does not print anything to the user. Verify does not need to detect which mode it is in; approve controls the invocation and result handling.

---

## State Management

No STATE.md write is needed. Verify is a read-only diagnostic — it does not advance the pipeline or change any stage status.

All file reads are silent. Never say:
- "Scanning files"
- "Running checks"
- "Checking for markers"
