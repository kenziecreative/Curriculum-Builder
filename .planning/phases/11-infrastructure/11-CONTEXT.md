# Phase 11: Infrastructure - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Switch the tool from an install-script distribution model to a clone-and-run model. A new user clones the repo, removes the origin remote, opens Claude Code, and runs `/curriculum:init` — no shell commands or additional setup required. The dashboard accepts a `WORKSPACE_DIR` env var for pointing at non-default workspace locations. A `release.sh` script handles versioned releases via tag + push.

</domain>

<decisions>
## Implementation Decisions

### Clone-and-run model
- `workspace/` ships as an empty directory (or `.gitkeep`) in the repo — no creation step needed on first use
- `install.sh` deleted entirely — no deprecation comment, no stub
- README install steps become: clone → `git remote remove origin` → open Claude Code → run `/curriculum:init`
- `git remote remove origin` is a **required step** in the README, not an optional sidebar
- Claude Code auto-discovers the plugin from `.claude/` in the repo root — no global install needed
- `.planning/` and `workspace/` are gitignored in the public repo — dev process stays private
- The dev repo and public repo are the same repo (one-repo model); gitignore handles the separation

### WORKSPACE_DIR env var
- `vite.config.ts` reads `process.env.WORKSPACE_DIR`; falls back to `../workspace` (relative to `dashboard/`) when not set
- If `WORKSPACE_DIR` is provided, treat it as an absolute path
- Supports external workspaces (e.g., `WORKSPACE_DIR=/path/to/other/workspace npm run dev` from `dashboard/`)
- Default clone-and-run case requires no env var — just `cd dashboard && npm run dev`

### init.md dashboard launch output
- Dashboard launch instruction appears **before** chaining to intake — visible before the user moves on
- Exact command shown: `cd dashboard && npm run dev`
- WORKSPACE_DIR override pattern documented in README, not in init output (keep init simple)
- Per PRES-08: the literal `npm run dev` command appears in init output, not a pointer to docs

### release.sh
- Script reads `VERSION` file, creates a git tag (`v{version}`), pushes tag and main to origin
- `VERSION` is bumped manually before running the script
- Script assumes the remote exists (target repo is pre-configured)
- No two-repo sync — one public repo, gitignore handles what stays local
- Location: `scripts/release.sh` (replaces current `install.sh` which is deleted)

### Claude's Discretion
- Exact README prose and formatting (beyond the required steps listed above)
- `.gitkeep` vs empty dir commit approach for `workspace/`
- Error handling in release.sh (e.g., uncommitted changes check)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `dashboard/vite.config.ts`: Already has `WORKSPACE_DIR` hardcoded as `path.resolve(__dirname, '../workspace')` — change to `process.env.WORKSPACE_DIR ? path.resolve(process.env.WORKSPACE_DIR) : path.resolve(__dirname, '../workspace')`
- `scripts/install.sh`: Existing script to be deleted entirely (not deprecated)
- `scripts/dev-reload.sh`: Keep — not affected by this phase
- `.claude/plugins/curriculum/commands/init.md`: Existing command; dashboard launch instruction added before the intake chain

### Established Patterns
- Plugin auto-discovery: Claude Code reads `.claude/` from the project root — this is how all commands and agents are already available in this repo during development
- WORKSPACE_DIR pattern: `vite.config.ts` already uses `path.resolve` with `__dirname` — extend this with env var check

### Integration Points
- `init.md` output: Add dashboard launch block between project confirmation and intake chain
- `vite.config.ts`: Single-line change to WORKSPACE_DIR constant
- `.gitignore`: Add `workspace/` and `.planning/` entries
- `README.md`: Full rewrite of Installation section; How it works section may also need updating for clone-and-run framing

</code_context>

<specifics>
## Specific Ideas

- The four artifacts (README, install.sh removal, settings.json/vite.config.ts, init.md) should be updated in a single coordinated commit — partial update creates contradictory deployment state (per roadmap Pitfall 5)
- `git remote remove origin` is required because users will want their workspace in their own git history, not accidentally pushing to the source repo

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 11-infrastructure*
*Context gathered: 2026-03-25*
