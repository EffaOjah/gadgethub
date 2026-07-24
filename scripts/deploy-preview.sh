#!/usr/bin/env bash
# Build and publish the static preview to GitHub Pages:
#   https://emmanueledward2019.github.io/gadgethub-preview/
# Usage: bash scripts/deploy-preview.sh
set -euo pipefail

REPO_URL="https://github.com/EmmanuelEdward2019/gadgethub-preview.git"
BASE="/gadgethub-preview/"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"
echo "▸ Building with base $BASE"
npm run build -- --base="$BASE"

cd dist
cp index.html 404.html          # SPA deep-link fallback for GitHub Pages
touch .nojekyll                  # serve _-prefixed asset paths untouched
git init -qb main
git add -A
git -c user.name="EmmanuelEdward2019" -c user.email="shop4me.market@gmail.com" \
    commit -qm "Preview build $(date -u +%Y-%m-%dT%H:%MZ)"
git push -qf "$REPO_URL" main:main
rm -rf .git
echo "▸ Published → https://emmanueledward2019.github.io/gadgethub-preview/"
