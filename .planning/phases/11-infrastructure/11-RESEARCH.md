# Phase 11: Infrastructure - Research

**Researched:** 2026-03-25
**Domain:** Clone-and-run deployment model, Vite env var config, shell release script
**Confidence:** HIGH

## Summary

This phase converts the tool from a global-install model (running `scripts/install.sh` to copy the plugin into `~/.claude/`) to a clone-and-run model where the repo IS the plugin. Claude Code auto-discovers commands from `.claude/` in the project root, so anyone who clones and opens the repo in Claude Code has the plugin available immediately — no shell install step required.

The changes are narrow and well-bounded: one constant in `vite.config.ts`, one block added to `init.md`, one file deleted (`scripts/install.sh`), one new file added (`scripts/release.sh`), and a README rewrite. The atomicity requirement (all changes in a single commit) is the key coordination concern — partial state creates a contradictory setup where documentation and code disagree.

The `workspace/` directory already exists in the repo (confirmed: it contains two real projects) and is already gitignored. The `.planning/` directory is not yet in `.gitignore` — that must be added as part of this phase.

**Primary recommendation:** Treat all file changes as a single logical unit and execute them in one coordinated commit. The individual changes are each trivial; the discipline is coordinating them.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Clone-and-run model:**
- `workspace/` ships as an empty directory (or `.gitkeep`) in the repo — no creation step needed on first use
- `install.sh` deleted entirely — no deprecation comment, no stub
- README install steps become: clone → `git remote remove origin` → open Claude Code → run `/curriculum:init`
- `git remote remove origin` is a **required step** in the README, not an optional sidebar
- Claude Code auto-discovers the plugin from `.claude/` in the repo root — no global install needed
- `.planning/` and `workspace/` are gitignored in the public repo — dev process stays private
- The dev repo and public repo are the same repo (one-repo model); gitignore handles the separation

**WORKSPACE_DIR env var:**
- `vite.config.ts` reads `process.env.WORKSPACE_DIR`; falls back to `../workspace` (relative to `dashboard/`) when not set
- If `WORKSPACE_DIR` is provided, treat it as an absolute path
- Supports external workspaces (e.g., `WORKSPACE_DIR=/path/to/other/workspace npm run dev` from `dashboard/`)
- Default clone-and-run case requires no env var — just `cd dashboard && npm run dev`

**init.md dashboard launch output:**
- Dashboard launch instruction appears **before** chaining to intake — visible before the user moves on
- Exact command shown: `cd dashboard && npm run dev`
- WORKSPACE_DIR override pattern documented in README, not in init output (keep init simple)
- Per PRES-08: the literal `npm run dev` command appears in init output, not a pointer to docs

**release.sh:**
- Script reads `VERSION` file, creates a git tag (`v{version}`), pushes tag and main to origin
- `VERSION` is bumped manually before running the script
- Script assumes the remote exists (target repo is pre-configured)
- No two-repo sync — one public repo, gitignore handles what stays local
- Location: `scripts/release.sh` (replaces current `install.sh` which is deleted)

### Claude's Discretion
- Exact README prose and formatting (beyond the required steps listed above)
- `.gitkeep` vs empty dir commit approach for `workspace/`
- Error handling in release.sh (e.g., uncommitted changes check)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFR-01 | Deployment model changed to clone-and-run — README, install.sh, CLAUDE.md updated; workspace always inside cloned repo | README rewrite spec below; install.sh deletion confirmed; workspace/ already in .gitignore; .planning/ needs adding |
| INFR-02 | Dashboard accepts `WORKSPACE_DIR` env var; `/curriculum:init` tells user exact launch command for their workspace | Exact vite.config.ts change identified; init.md insertion point confirmed (after step 5, before intake chain) |
| INFR-03 | `scripts/release.sh` automates sync from dev repo to public plugin release repo | release.sh spec fully defined in CONTEXT.md; VERSION file confirmed at 1.0.0 |
</phase_requirements>

---

## Standard Stack

### Core
| Component | Current State | Change Required |
|-----------|--------------|-----------------|
| `vite.config.ts` | `WORKSPACE_DIR = path.resolve(__dirname, '../workspace')` hardcoded on line 10 | Add env var check before hardcoded fallback |
| `scripts/install.sh` | 130-line global install script | Delete entirely — no replacement, no deprecation comment |
| `scripts/release.sh` | Does not exist | Create new — reads VERSION, tags, pushes |
| `init.md` | Ends at step 6 (confirm + chain to intake) | Add dashboard launch block between step 5 (CLAUDE.md creation) and step 6 |
| `README.md` | Documents old `./scripts/install.sh` install flow | Rewrite Installation section; update "Starting a project" framing |
| `.gitignore` | Has `workspace/` entry; missing `.planning/` | Add `.planning/` entry |

### No New Dependencies
This phase adds no new npm packages, no new Claude Code features, and no new infrastructure. Everything needed is already present.

---

## Architecture Patterns

### Pattern 1: Claude Code Project-Scoped Plugin Auto-Discovery
**What:** When Claude Code opens a directory, it reads `.claude/` from the project root. Any `plugins/` directory found there is treated as locally available. No global installation or `claude plugin install` command needed.
**Implication for this phase:** The `install.sh` script was the mechanism for the OLD model (copy to `~/.claude/`). The new model requires none of that — the repo itself is the plugin host. A cloned repo opened in Claude Code has all commands available immediately.
**Confidence:** HIGH — confirmed by existing dev workflow (this repo already uses this pattern during development)

### Pattern 2: Vite `process.env` at Config Time
**What:** Vite's `vite.config.ts` runs in Node.js at server-start time, not in the browser. `process.env.WORKSPACE_DIR` is available as a standard Node env var. The correct pattern is:
```typescript
// Source: existing vite.config.ts pattern extended
const WORKSPACE_DIR = process.env.WORKSPACE_DIR
  ? path.resolve(process.env.WORKSPACE_DIR)
  : path.resolve(__dirname, '../workspace')
```
This is a single-line change to the constant on line 10. The rest of `vite.config.ts` is unchanged — `WORKSPACE_DIR` is used throughout the file and all usages continue to work.
**Confidence:** HIGH — Node.js `process.env` at config time is standard; the fallback pattern is identical to the current code

### Pattern 3: Shell Release Script
**What:** A minimal bash script that:
1. Reads `VERSION` file
2. Checks the version is non-empty
3. Creates a git tag `v{version}`
4. Pushes main branch to origin
5. Pushes the tag to origin

Optional (Claude's discretion): check for uncommitted changes before proceeding.

```bash
#!/bin/bash
set -e

VERSION=$(tr -d '[:space:]' < "$(dirname "$0")/../VERSION")
[[ -n "$VERSION" ]] || { echo "Error: VERSION file is empty"; exit 1; }

echo "Releasing v$VERSION..."
git tag "v$VERSION"
git push origin main
git push origin "v$VERSION"
echo "Released v$VERSION"
```
**Confidence:** HIGH — standard git tagging pattern; VERSION file confirmed at `1.0.0`

### Pattern 4: init.md Dashboard Launch Block
**What:** The dashboard launch instruction is added as a new step between CLAUDE.md creation (step 5) and the confirmation/intake chain (step 6). It must appear in the Claude output BEFORE the intake chain begins, so the user sees it.

The insertion point in `init.md` is the paragraph starting "Output exactly this confirmation..." in the current step 6. The new block goes immediately before that paragraph.

Per the locked decision, the exact command is `cd dashboard && npm run dev` — this is what appears in init output. The README documents the `WORKSPACE_DIR` override.

### Anti-Patterns to Avoid
- **Deprecation comment in install.sh:** Do not add `# DEPRECATED` or any comment — delete the file entirely. A stub creates confusion.
- **Pointing to docs from init output:** Init output shows the literal `cd dashboard && npm run dev` command. It does not say "see README for dashboard instructions."
- **Partial commit:** Do not commit README separately from init.md or vite.config.ts. All changes ship together.
- **Adding .planning/ to .gitignore after the fact:** Add it in the same commit as the other changes.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Env var in Vite config | Custom config injection | `process.env.WORKSPACE_DIR` — available natively at config time in Node.js |
| Semver comparison in release.sh | Custom semver logic | Not needed — script only reads VERSION and creates a tag, no comparison required |
| Plugin registration | Any form of `claude plugin install` | Claude Code project-scoped auto-discovery handles this |

---

## Common Pitfalls

### Pitfall 1: WORKSPACE_DIR as Relative Path
**What goes wrong:** If a user passes `WORKSPACE_DIR=../some-other-workspace`, a naive `path.resolve(process.env.WORKSPACE_DIR)` call will resolve relative to wherever `npm run dev` is run from — not from the dashboard directory. This may or may not be what the user intends, but it's unpredictable.
**How to avoid:** Document in README that `WORKSPACE_DIR` should be an absolute path. The locked decision already specifies: "If `WORKSPACE_DIR` is provided, treat it as an absolute path." The `path.resolve()` call handles it correctly as long as users understand the expectation.
**Warning signs:** Dashboard shows empty workspace when WORKSPACE_DIR is a relative path run from an unexpected directory.

### Pitfall 2: workspace/ Has Real Content
**What goes wrong:** `workspace/` currently contains two real project directories (`accessible-development-with-ai`, `test-program`). If we commit a `.gitkeep` inside it, we need to be careful. More importantly: since `workspace/` is already gitignored, these directories were never tracked — they only exist locally.
**How to avoid:** The gitignore already handles this correctly. For the public repo model, `workspace/` needs to exist but be empty (so `/curriculum:init` can create subdirectories inside it). Use a `.gitkeep` file so git tracks the empty directory. The gitignore entry `workspace/` does NOT ignore the `.gitkeep` file if the `.gitkeep` is in the directory root — but this depends on how the gitignore is written. Current entry is `workspace/` which ignores the entire directory including `.gitkeep`. Fix: change to `workspace/*` + `!workspace/.gitkeep`, OR use a different approach.

**Recommended approach:** Change the gitignore entry from `workspace/` to:
```
workspace/*
!workspace/.gitkeep
```
This ignores all content inside workspace/ while keeping the `.gitkeep` tracked.

### Pitfall 3: .planning/ Not Yet in .gitignore
**What goes wrong:** `.planning/` is not currently in `.gitignore`. The locked decision says `.planning/` should be gitignored in the public repo (dev process stays private). This needs to be added in the same commit as the other changes.
**How to avoid:** Add `.planning/` to `.gitignore` as part of this phase's coordinated commit.
**Confirmation:** Running `cat .gitignore` confirms `.planning/security/` is gitignored but not `.planning/` itself.

### Pitfall 4: release.sh Tag Already Exists
**What goes wrong:** If someone runs `release.sh` twice with the same VERSION, `git tag v1.0.0` will fail with "tag already exists."
**How to avoid:** Add a check: `git tag | grep -q "^v$VERSION$" && { echo "Tag v$VERSION already exists"; exit 1; }`. This falls under Claude's discretion for error handling.

### Pitfall 5: init.md Step Numbering After Insertion
**What goes wrong:** Adding a new step before the current step 6 does not actually require renumbering — the current init.md does not use visible step numbers in the output (they are only headers in the markdown source). The user-facing confirmation text in step 6 is not numbered. No renumbering hazard.
**Confirmation:** Reviewed init.md in full — step headers are `### 1.`, `### 2.` etc. in the markdown source but these do not appear in Claude's output (the output is specified inline). Adding a new `### 5b.` or `### 5.5` sub-step header will work without disrupting anything.

---

## Code Examples

### vite.config.ts WORKSPACE_DIR Change
```typescript
// Source: existing vite.config.ts line 10, extended per CONTEXT.md
// Before:
const WORKSPACE_DIR = path.resolve(__dirname, '../workspace')

// After:
const WORKSPACE_DIR = process.env.WORKSPACE_DIR
  ? path.resolve(process.env.WORKSPACE_DIR)
  : path.resolve(__dirname, '../workspace')
```

### init.md Dashboard Launch Block (insertion point)
The block goes after step 5 (Create CLAUDE.md) and before step 6 (Confirm and chain into intake). The step 6 confirmation message must still appear, followed by the dashboard block, followed by the intake chain.

Per PRES-08 and the locked decision, the output must contain the literal command. Suggested addition as a new step:

```markdown
### 5b. Show dashboard launch command

Output this block before the confirmation:

> **To view your workspace in the dashboard:**
> ```
> cd dashboard && npm run dev
> ```
```

Or integrate into the step 6 confirmation block — either approach works as long as the command appears before the intake chain begins.

### release.sh
```bash
#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION=$(tr -d '[:space:]' < "$SCRIPT_DIR/../VERSION")

[[ -n "$VERSION" ]] || { echo "Error: VERSION file is empty" >&2; exit 1; }

# Optional: check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "Error: uncommitted changes — commit or stash before releasing" >&2
  exit 1
fi

echo "Releasing v$VERSION..."
git tag "v$VERSION"
git push origin main
git push origin "v$VERSION"
echo "Done. v$VERSION is live."
```

### .gitignore workspace entry update
```
# Before:
workspace/

# After:
workspace/*
!workspace/.gitkeep
```

### README Installation Section (required steps only — prose at discretion)
Required content:
1. Clone the repository
2. `git remote remove origin` (required, not optional sidebar)
3. Open Claude Code in the cloned directory
4. Run `/curriculum:init`

Required callout: WORKSPACE_DIR env var for pointing dashboard at a non-default location.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `scripts/install.sh` copies plugin to `~/.claude/` | Clone repo, open in Claude Code — auto-discovered | Simpler onboarding; no shell prerequisite |
| Plugin available globally across all sessions | Plugin available only within the cloned repo | Users work inside the repo — workspace stays co-located |
| README points to `./scripts/install.sh` | README is the only install document | Single source of truth |

---

## Open Questions

1. **Should `workspace/` contain a `.gitkeep` or remain empty?**
   - What we know: `workspace/` is already gitignored as `workspace/`. Changing to `workspace/*` + `!workspace/.gitkeep` lets git track the directory without tracking its contents.
   - What's unclear: Whether a `.gitkeep` is strictly necessary, or whether the `workspace/` directory should simply be created by `/curriculum:init` if missing.
   - Recommendation: Use `.gitkeep`. It makes the directory self-documenting and prevents a first-run error if a user somehow removes the directory. Update `.gitignore` to `workspace/*` + `!workspace/.gitkeep`.

2. **Does init.md need to handle the case where the dashboard is not yet installed (npm deps not installed)?**
   - What we know: `cd dashboard && npm run dev` will fail if `npm install` has not been run in the dashboard directory.
   - What's unclear: Whether the README should document `npm install` as a prerequisite, and whether `init.md` output should mention it.
   - Recommendation: README should include `cd dashboard && npm install` as a one-time step. init.md output keeps the simple `cd dashboard && npm run dev` command — the README handles setup details.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no jest.config, vitest.config, pytest.ini, or test directories |
| Config file | none |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFR-01 | Clone-and-run model deployed; workspace/ gitignored; install.sh absent | manual-only | — | — |
| INFR-02 | Dashboard starts with WORKSPACE_DIR override | manual-only | `WORKSPACE_DIR=/tmp/test-ws npm run dev` from `dashboard/` — verify server starts | — |
| INFR-03 | release.sh reads VERSION and creates correct tag | manual-only | Run in dry-run mode with a test remote | — |

**Manual-only justification:** These requirements are infrastructure/configuration changes verified by observable behavior (file exists or not, server starts, tag appears). No automated test framework is present in this project, and setting one up is out of scope for this phase.

### Sampling Rate
- **Per task commit:** Visual inspection of changed files
- **Per wave merge:** Success criteria checklist from phase description
- **Phase gate:** All 5 success criteria TRUE before `/gsd:verify-work`

### Wave 0 Gaps
None — no test infrastructure needed for this phase. The success criteria are directly verifiable:
1. Clone repo fresh → run `/curriculum:init` → workspace appears inside repo
2. `WORKSPACE_DIR=/path npm run dev` from `dashboard/` → dashboard starts pointing at that path
3. `/curriculum:init` output contains literal `npm run dev`
4. `scripts/release.sh` exists and executes without error
5. No `install.sh` in repo root

---

## Sources

### Primary (HIGH confidence)
- Direct file inspection: `vite.config.ts` — current WORKSPACE_DIR implementation confirmed
- Direct file inspection: `scripts/install.sh` — old model confirmed; deletion scope clear
- Direct file inspection: `.claude/plugins/curriculum/commands/init.md` — insertion point confirmed
- Direct file inspection: `.gitignore` — confirmed `workspace/` present, `.planning/` absent
- Direct file inspection: `VERSION` — confirmed at `1.0.0`
- Direct file inspection: `workspace/` directory — confirmed exists with real projects (gitignored, will not affect public repo)
- `.planning/phases/11-infrastructure/11-CONTEXT.md` — all implementation decisions locked

### Secondary (MEDIUM confidence)
- Claude Code plugin auto-discovery behavior — confirmed by existing dev workflow in this repo (commands work without global install when repo is open in Claude Code)

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all target files inspected directly; changes are minimal and mechanical
- Architecture: HIGH — patterns confirmed by existing code; no new technology introduced
- Pitfalls: HIGH — identified from direct code inspection (gitignore gap, workspace content, tag collision)

**Research date:** 2026-03-25
**Valid until:** Stable indefinitely — no external dependencies or fast-moving ecosystem components
