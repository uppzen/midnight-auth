#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Release Process${NC}"

# 0. Check Branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}❌ You must be on the 'main' branch to release.${NC}"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

echo "Pulling latest changes..."
git pull origin main

# 1. Run Code Quality Checks
echo -e "\n${YELLOW}🔍 Running code quality checks...${NC}"
echo "Running Lint..."
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Lint failed! Please fix errors before releasing.${NC}"
    exit 1
fi

echo "Running Type Check..."
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Type check failed! Please fix errors before releasing.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Code quality checks passed!${NC}"

# 2. Prompt for Version Bump
echo -e "\n${YELLOW}📦 Version Management${NC}"
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

echo "Select release type:"
select RELEASE_TYPE in "patch" "minor" "major" "custom"; do
    case $RELEASE_TYPE in
        patch|minor|major)
            npm version $RELEASE_TYPE --no-git-tag-version
            break
            ;;
        custom)
            read -p "Enter version number: " CUSTOM_VERSION
            npm version $CUSTOM_VERSION --no-git-tag-version
            break
            ;;
        *) echo "Invalid option";;
    esac
done

NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}✅ Version bumped to $NEW_VERSION${NC}"

# 3. Update Changelog
echo -e "\n${YELLOW}📝 Updating Changelog...${NC}"
read -p "Enter a short description for this release: " RELEASE_DESC
DATE=$(date +%Y-%m-%d)

# Prepend new version entry to CHANGELOG.md
# This is a simple append; for robust changelog management, consider using a tool like 'standard-version' or 'conventional-changelog'
TMP_CHANGELOG=$(mktemp)
echo "## [$NEW_VERSION] - $DATE" > $TMP_CHANGELOG
echo "" >> $TMP_CHANGELOG
echo "### Changed" >> $TMP_CHANGELOG
echo "- $RELEASE_DESC" >> $TMP_CHANGELOG
echo "" >> $TMP_CHANGELOG
cat CHANGELOG.md >> $TMP_CHANGELOG
mv $TMP_CHANGELOG CHANGELOG.md

echo -e "${GREEN}✅ Changelog updated!${NC}"

# 4. Build
echo -e "\n${YELLOW}🏗️  Building package...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# 5. Commit and Push
echo -e "\n${YELLOW}💾 Committing changes...${NC}"
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release v$NEW_VERSION"
git tag v$NEW_VERSION

echo -e "\n${YELLOW}📤 Pushing to remote...${NC}"
git push && git push --tags

echo -e "\n${GREEN}✅ Changes pushed to main!${NC}"
echo -e "${BLUE}ℹ️  The 'Publish to NPM' GitHub Action has been triggered.${NC}"
echo -e "${BLUE}ℹ️  Check the Actions tab in GitHub to monitor the progress.${NC}"

echo -e "\n${GREEN}✨ Release process complete!${NC}"
