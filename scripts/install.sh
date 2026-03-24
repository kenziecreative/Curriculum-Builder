#!/bin/bash
# Install the Curriculum Builder plugin for Claude Code.
# Run this from the repository root: bash scripts/install.sh
#
# What this does:
#   1. Verifies Claude Code is installed
#   2. Ensures the local marketplace exists
#   3. Copies plugin source into the marketplace
#   4. Registers the plugin in marketplace.json
#   5. Installs at user scope (available in every Claude Code session)
#
# To upgrade: run this script again. It detects the installed version
# and reinstalls if the source version is newer.

set -e

PLUGIN_NAME="curriculum"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PLUGIN_SOURCE="$REPO_ROOT/.claude/plugins/curriculum"
VERSION_FILE="$REPO_ROOT/VERSION"
LOCAL_MP="$HOME/.claude/plugins/marketplaces/local"
MP_MANIFEST="$LOCAL_MP/.claude-plugin/marketplace.json"
PLUGIN_DEST="$LOCAL_MP/plugins/$PLUGIN_NAME"

# ── Helpers ──────────────────────────────────────────────────────────────────

fail() { echo "Error: $1" >&2; exit 1; }

version_gt() {
    # Returns true if $1 > $2 (semver, numeric segments only)
    local IFS=.
    local a=($1) b=($2)
    for i in 0 1 2; do
        local ai="${a[$i]:-0}" bi="${b[$i]:-0}"
        if (( ai > bi )); then return 0; fi
        if (( ai < bi )); then return 1; fi
    done
    return 1  # equal
}

# ── Checks ────────────────────────────────────────────────────────────────────

command -v claude &>/dev/null || fail "Claude Code is not installed. Install it from https://claude.ai/download"

[[ -f "$VERSION_FILE" ]] || fail "VERSION file not found at $VERSION_FILE"
VERSION=$(tr -d '[:space:]' < "$VERSION_FILE")

[[ -d "$PLUGIN_SOURCE" ]] || fail "Plugin source not found at $PLUGIN_SOURCE"

# ── Local marketplace setup ───────────────────────────────────────────────────

if [[ ! -f "$MP_MANIFEST" ]]; then
    echo "Setting up local marketplace..."
    mkdir -p "$LOCAL_MP/.claude-plugin" "$LOCAL_MP/plugins"
    cat > "$MP_MANIFEST" << 'EOF'
{
  "name": "local",
  "version": "1.0.0",
  "description": "Locally installed custom plugins",
  "owner": {
    "name": "Local",
    "email": "local@localhost"
  },
  "plugins": []
}
EOF
    echo "Local marketplace created."
fi

# ── Copy plugin source ────────────────────────────────────────────────────────

echo "Copying plugin source..."
rm -rf "$PLUGIN_DEST"
mkdir -p "$PLUGIN_DEST"
cp -r "$PLUGIN_SOURCE/." "$PLUGIN_DEST/"

# ── Register in marketplace.json ──────────────────────────────────────────────

python3 - << PYEOF
import json

mp_path = "$MP_MANIFEST"
with open(mp_path) as f:
    mp = json.load(f)

entry = {
    "name": "$PLUGIN_NAME",
    "description": "Curriculum builder plugin — encodes pedagogical doctrine as structural constraints to produce delivery-ready curriculum for adult learners",
    "version": "$VERSION",
    "author": {"name": "Kelsey Ruger", "email": "kelsey@kenziecreative.com"},
    "source": "./plugins/$PLUGIN_NAME",
    "category": "productivity"
}

plugins = mp.setdefault("plugins", [])
existing = next((i for i, p in enumerate(plugins) if p["name"] == "$PLUGIN_NAME"), None)
if existing is not None:
    plugins[existing] = entry
else:
    plugins.append(entry)

with open(mp_path, "w") as f:
    json.dump(mp, f, indent=2)
    f.write("\n")
PYEOF

# ── Install ───────────────────────────────────────────────────────────────────

echo "Updating local marketplace..."
claude plugin marketplace update local

# Check if already installed at this version
INSTALLED_VERSION=$(claude plugin list 2>/dev/null \
    | grep "curriculum@local" \
    | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || true)

if [[ -n "$INSTALLED_VERSION" ]] && ! version_gt "$VERSION" "$INSTALLED_VERSION"; then
    echo "Reinstalling curriculum $VERSION..."
    claude plugin uninstall "$PLUGIN_NAME@local" --scope user 2>/dev/null || true
fi

claude plugin install "$PLUGIN_NAME@local" --scope user

# ── Done ──────────────────────────────────────────────────────────────────────

echo ""
echo "Curriculum Builder v$VERSION installed."
echo "Open any Claude Code session — /curriculum:init will be available."
