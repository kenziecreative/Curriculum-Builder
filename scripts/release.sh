#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION=$(tr -d '[:space:]' < "$SCRIPT_DIR/../VERSION")

if [ -z "$VERSION" ]; then
  echo "Error: VERSION file is empty or missing." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: Uncommitted changes detected. Commit or stash them before releasing." >&2
  exit 1
fi

if git rev-parse "v$VERSION" >/dev/null 2>&1; then
  echo "Error: Tag v$VERSION already exists." >&2
  exit 1
fi

git tag "v$VERSION"
git push origin main
git push origin "v$VERSION"

echo "Done. v$VERSION is live."
