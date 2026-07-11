#!/bin/bash
set -e

# 1. Fetch the merged PR associated with this commit
PR_JSON=$(gh api repos/"$GITHUB_REPOSITORY"/commits/"$GITHUB_SHA"/pulls 2>/dev/null || echo "[]")
LABELS=$(echo "$PR_JSON" | jq -r '.[0].labels[].name' 2>/dev/null || echo "")

# 2. Determine bump type
BUMP_TYPE=""
if echo "$LABELS" | grep -q "release:major"; then
  BUMP_TYPE="major"
elif echo "$LABELS" | grep -q "release:minor"; then
  BUMP_TYPE="minor"
elif echo "$LABELS" | grep -q "release:patch"; then
  BUMP_TYPE="patch"
else
  echo "⚠️ No release labels found on the merged PR. Defaulting to patch bump."
  BUMP_TYPE="patch"
fi

echo "Selected bump type: $BUMP_TYPE"

# 3. Find the latest released Git tag to base the bump on
git fetch --tags
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "Latest release tag: $LATEST_TAG"

# Clean tag version (remove 'v' prefix)
PREV_VERSION="${LATEST_TAG#v}"

# Set package.json version to the latest tag version temporarily
node -e "
  const pkg = require('./package.json');
  pkg.version = '$PREV_VERSION';
  require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# 4. Bump version using npm
NEW_VERSION=$(npm version "$BUMP_TYPE" --no-git-tag-version)
TAG_NAME="$NEW_VERSION"
echo "New Version: $TAG_NAME"

# Expose new tag for subsequent steps in GitHub Actions
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "new_tag=$TAG_NAME" >> "$GITHUB_OUTPUT"
fi
