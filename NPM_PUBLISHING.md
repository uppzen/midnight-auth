# NPM Publishing Guide

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **NPM Organization**: Create the `@uppzen` organization on npm (if not already created)
3. **NPM Token**: Generate an automation token for CI/CD
4. **GitHub Secrets**: Add NPM_TOKEN to repository secrets

### Creating NPM Organization

If you haven't created the `@uppzen` organization yet:

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click on your profile → **Add Organization**
3. Enter organization name: `uppzen`
4. Choose plan (free for open source)
5. Add team members if needed

## Setup NPM Token

### 1. Create NPM Token

```bash
npm login
npm token create --type=automation
```

Copy the generated token.

### 2. Add Token to GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click **Add secret**

## Publishing Methods

### Method 1: Automated Publishing (Recommended)

The package automatically publishes to npm when you create a GitHub release:

```bash
# 1. Update version in package.json
npm version patch  # or minor, or major

# 2. Push the tag
git push --follow-tags

# 3. Create a release on GitHub
gh release create v1.0.1 --title "v1.0.1" --notes "Release notes here"
```

The GitHub Action will automatically:
- Build the package
- Run tests
- Publish to npm

### Method 2: Manual Publishing

```bash
# 1. Login to npm
npm login

# 2. Build the package
npm run build

# 3. Test the package locally
npm pack
# This creates a .tgz file you can test

# 4. Publish to npm
npm publish --access public

# For scoped packages
npm publish --access public
```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes
- **Minor** (1.x.0): New features (backward compatible)
- **Major** (x.0.0): Breaking changes

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

## Pre-publish Checklist

- [ ] All tests pass
- [ ] Build succeeds (`npm run build`)
- [ ] README is up to date
- [ ] CHANGELOG is updated
- [ ] Version number is bumped
- [ ] All changes are committed
- [ ] Package.json fields are correct (name, description, keywords, etc.)

## Testing Before Publishing

```bash
# 1. Create a test project
mkdir test-midnight-auth
cd test-midnight-auth
npm init -y

# 2. Install from local tarball
npm install ../midnight-auth/uppzen-midnight-auth-1.0.0.tgz

# 3. Test the package
# Create a test file and import the package
```

## Troubleshooting

### "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check package name isn't taken: `npm view @uppzen/midnight-auth`
- Verify you have access to the package

### "Package name too similar to existing package"

- Choose a different, more unique name
- Package is already scoped under `@uppzen/midnight-auth`

### "Version already exists"

- Bump the version: `npm version patch`
- Never republish the same version

## Unpublishing (Use with Caution)

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish @uppzen/midnight-auth@1.0.0

# Unpublish entire package (within 72 hours, if no dependents)
npm unpublish @uppzen/midnight-auth --force
```

⚠️ **Warning**: Unpublishing can break projects that depend on your package. Only do this for critical security issues.

## Package Statistics

After publishing, view your package:
- NPM: https://www.npmjs.com/package/@uppzen/midnight-auth
- Bundlephobia: https://bundlephobia.com/package/@uppzen/midnight-auth
- NPM Trends: https://npmtrends.com/@uppzen/midnight-auth

## Maintenance

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update to latest (breaking changes possible)
npx npm-check-updates -u
npm install
```

### Security Audits

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```
