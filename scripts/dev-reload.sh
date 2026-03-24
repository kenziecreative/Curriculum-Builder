#!/bin/bash
# Reinstall curriculum plugin from source into user cache.
# Run after editing plugin source files, then run /reload-plugins in Claude Code.
#
# This exercises the real install path on every iteration — the same path
# an end user would follow — so issues surface during development, not after release.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

bash "$SCRIPT_DIR/install.sh"
echo "Run /reload-plugins in Claude Code to activate changes."
