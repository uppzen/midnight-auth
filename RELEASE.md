# Release Guide for @uppzen/midnight-auth

This guide covers the complete release process for publishing new versions of the package.

## Table of Contents

- [Quick Release](#quick-release)
- [Detailed Release Process](#detailed-release-process)
- [Release Types](#release-types)
- [Automated vs Manual Release](#automated-vs-manual-release)
- [Post-Release Checklist](#post-release-checklist)
- [Troubleshooting](#troubleshooting)

## Quick Release

For experienced maintainers, here's the quick version:

```bash
# 1. Update CHANGELOG.md with changes
# 2. Bump version
npm version patch  # or minor/major

# 3. Push with tags
git push --follow-tags

# 4. Create GitHub release (triggers auto-publish to npm)
gh release create v1.0.x --title "v1.0.x" --notes-file RELEASE_NOTES.md

# Or publish manually
npm publish --access public
```

## Detailed Release Process

### 1. Pre-Release Preparation

#### Update CHANGELOG.md

Move items from `[Unreleased]` to a new version section:

```markdown
## [Unreleased]

## [1.0.2] - 2025-10-30

### Added
- New feature description

### Changed
- Changed feature description

### Fixed
- Bug fix description

### Deprecated
- Deprecated feature description

### Removed
- Removed feature description

### Security
- Security fix description
```

#### Run Quality Checks

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Build package
npm run build

# Test the build
npm pack
# This creates uppzen-midnight-auth-X.Y.Z.tgz
```

#### Test Locally

```bash
# Create a test project
mkdir test-install
cd test-install
npm init -y

# Install from local tarball
npm install ../uppzen-midnight-auth-1.0.2.tgz

# Test the package
node -e "console.log(require('@uppzen/midnight-auth'))"
```

### 2. Version Bump

Choose the appropriate version bump based on [Semantic Versioning](https://semver.org/):

```bash
# Patch release (1.0.1 → 1.0.2) - Bug fixes only
npm version patch

# Minor release (1.0.0 → 1.1.0) - New features, backward compatible
npm version minor

# Major release (1.0.0 → 2.0.0) - Breaking changes
npm version major

# Pre-release versions
npm version prepatch  # 1.0.0 → 1.0.1-0
npm version preminor  # 1.0.0 → 1.1.0-0
npm version premajor  # 1.0.0 → 2.0.0-0
```

This command will:
- Update `package.json` version
- Create a git commit
- Create a git tag

### 3. Push to GitHub

```bash
# Push commits and tags
git push --follow-tags

# Or separately
git push origin main
git push origin v1.0.2
```

### 4. Create GitHub Release

#### Option A: Using GitHub CLI (Recommended)

```bash
# Create release with auto-generated notes
gh release create v1.0.2 --generate-notes

# Or with custom notes
gh release create v1.0.2 \
  --title "v1.0.2 - Bug Fixes and Improvements" \
  --notes "## What's Changed

- Fixed wallet connection issue
- Improved error handling
- Updated dependencies

**Full Changelog**: https://github.com/uppzen/midnight-auth/compare/v1.0.1...v1.0.2"
```

#### Option B: Using GitHub Web Interface

1. Go to https://github.com/uppzen/midnight-auth/releases/new
2. Choose tag: `v1.0.2`
3. Release title: `v1.0.2 - Bug Fixes and Improvements`
4. Description: Copy from CHANGELOG.md or use auto-generate
5. Click **Publish release**

**Note**: Creating a GitHub release will automatically trigger the npm publish workflow if you have the `NPM_TOKEN` secret configured.

### 5. Publish to npm

#### Automated Publishing (Recommended)

If you created a GitHub release, the package will be automatically published to npm via GitHub Actions. Monitor the workflow at:
https://github.com/uppzen/midnight-auth/actions

#### Manual Publishing

If automated publishing fails or you prefer manual control:

```bash
# Login to npm (if not already)
npm login

# Publish
npm publish --access public

# Verify publication
npm view @uppzen/midnight-auth
```

### 6. Verify Release

```bash
# Check npm
npm view @uppzen/midnight-auth

# Install in a test project
npm install @uppzen/midnight-auth@latest

# Check GitHub release
open https://github.com/uppzen/midnight-auth/releases/latest
```

## Release Types

### Patch Release (1.0.x)

**When to use**: Bug fixes, documentation updates, minor improvements

**Example changes**:
- Fixed connection timeout issue
- Updated README examples
- Improved error messages
- Dependency security updates

```bash
npm version patch
git push --follow-tags
```

### Minor Release (1.x.0)

**When to use**: New features, backward-compatible changes

**Example changes**:
- Added new component variant
- New hook for balance checking
- Additional configuration options
- New utility functions

```bash
npm version minor
git push --follow-tags
```

### Major Release (x.0.0)

**When to use**: Breaking changes, major refactoring

**Example changes**:
- Renamed core APIs
- Removed deprecated features
- Changed component props structure
- Updated peer dependencies with breaking changes

```bash
npm version major
git push --follow-tags
```

**Important**: For major releases, include a migration guide in CHANGELOG.md

## Automated vs Manual Release

### Automated Release (via GitHub Actions)

**Pros**:
- Consistent release process
- No need to remember npm credentials
- Automatic changelog generation
- Release notes from commits

**Setup**:
1. Ensure `NPM_TOKEN` is set in GitHub Secrets
2. Create a GitHub release
3. Workflow automatically publishes to npm

**Workflow file**: `.github/workflows/publish.yml`

### Manual Release

**Pros**:
- Full control over timing
- Can test before publishing
- No dependency on GitHub Actions

**Process**:
```bash
npm login
npm run build
npm publish --access public
```

## Post-Release Checklist

After publishing a new version:

- [ ] Verify package on npm: https://www.npmjs.com/package/@uppzen/midnight-auth
- [ ] Check GitHub release: https://github.com/uppzen/midnight-auth/releases
- [ ] Test installation: `npm install @uppzen/midnight-auth@latest`
- [ ] Update demo app (if applicable)
- [ ] Update documentation site (if applicable)
- [ ] Announce on social media/Discord/Slack
- [ ] Close related GitHub issues
- [ ] Update project board/roadmap

## Troubleshooting

### "You do not have permission to publish"

**Solution**:
```bash
# Check you're logged in
npm whoami

# Login if needed
npm login

# Verify you're a member of @uppzen organization
npm org ls uppzen
```

### "Version already exists"

**Solution**:
```bash
# Check current version on npm
npm view @uppzen/midnight-auth version

# Bump to a new version
npm version patch
```

### GitHub Actions workflow fails

**Check**:
1. NPM_TOKEN secret is set correctly
2. Token has publish permissions
3. Token hasn't expired
4. Build succeeds locally

**Regenerate token**:
```bash
npm token create --type=automation
# Update GitHub Secret: Settings → Secrets → NPM_TOKEN
```

### Git tag already exists

**Solution**:
```bash
# Delete local tag
git tag -d v1.0.2

# Delete remote tag
git push origin :refs/tags/v1.0.2

# Create new tag
npm version patch
git push --follow-tags
```

### Build fails during publish

**Solution**:
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build

# Test build
npm pack
```

## Release Cadence

Recommended release schedule:

- **Patch releases**: As needed for bug fixes (weekly if needed)
- **Minor releases**: Monthly or when new features are ready
- **Major releases**: Quarterly or when breaking changes are necessary

## Version History

View all releases:
- GitHub: https://github.com/uppzen/midnight-auth/releases
- npm: https://www.npmjs.com/package/@uppzen/midnight-auth?activeTab=versions
- CHANGELOG: [CHANGELOG.md](./CHANGELOG.md)

## Support

For questions about releases:
- Open an issue: https://github.com/uppzen/midnight-auth/issues
- Check discussions: https://github.com/uppzen/midnight-auth/discussions

---

**Last Updated**: 2025-10-29
