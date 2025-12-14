# Contributing to midnight-auth

First off, thank you for considering contributing to midnight-auth! It's people like you that make midnight-auth such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**
* **Include your environment details** (OS, browser, versions, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior** and **explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Setup

1. Fork the repo
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/midnight-auth.git
   cd midnight-auth
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```

### Development Workflow

1. Make your changes
2. Build the project:
   ```bash
   npm run build
   ```

3. Test your changes in the demo:
   ```bash
   cd ../demo
   npm install
   npm run dev
   ```

4. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

6. Open a Pull Request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that do not affect the meaning of the code
* `refactor:` A code change that neither fixes a bug nor adds a feature
* `perf:` A code change that improves performance
* `test:` Adding missing tests or correcting existing tests
* `chore:` Changes to the build process or auxiliary tools

Examples:
```
feat: add new MidnightButton component
fix: resolve connection timeout issue
docs: update installation guide
```

## Styleguides

### TypeScript Styleguide

* Use TypeScript for all new code
* Use meaningful variable names
* Add JSDoc comments for public APIs
* Prefer `const` over `let`
* Use arrow functions for callbacks
* Use async/await over promises when possible

### React Styleguide

* Use functional components with hooks
* Keep components small and focused
* Use TypeScript interfaces for props
* Export components as named exports
* Use meaningful component names

### CSS/Tailwind Styleguide

* Use Tailwind utility classes
* Follow mobile-first responsive design
* Keep custom CSS minimal
* Use CSS variables for theming

## Project Structure

```
midnight-auth/
├── src/
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── styles.css      # Global styles
│   └── index.ts        # Main entry point
├── dist/               # Build output
├── .github/            # GitHub templates and workflows
└── README.md
```

## Testing

Currently, we don't have automated tests set up. If you'd like to contribute to adding a test suite, that would be greatly appreciated!

## Documentation

* Update the README.md if you change functionality
* Update TypeScript types and JSDoc comments
* Add examples for new features
* Update CHANGELOG.md

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
