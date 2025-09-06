# Changelog

All notable changes to DevAI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-09-06

### Added
- **Simplified command syntax**: Project path is now optional and defaults to current directory
- **Improved user experience**: Users can now run `devai edit "instruction"` or `devai review "instruction"` directly
- **Backward compatibility**: Still supports specifying custom project paths when needed

### Changed
- **Command argument order**: Instruction is now the first argument, project path is optional second argument
- **Updated help text**: Reflects new simplified command syntax
- **Updated documentation**: All examples now show the simplified usage

### Examples
```bash
# New simplified syntax (uses current directory)
devai edit "add error handling"
devai review "check for security issues"

# Still supports custom paths
devai edit "add feature" ./my-project
devai review "check code" ./backend
```

## [1.0.0] - 2024-09-06

### Added
- Initial release of DevAI CLI tool
- AI-powered code editing using Google's Gemini API
- AI-powered code review functionality
- Support for multiple programming languages and file types
- Preview mode for reviewing changes before applying
- Colored diff output for easy change visualization
- Cross-platform support (macOS, Windows, Linux)
- Comprehensive error handling and safety features
- File size limits and binary file detection
- Smart file filtering to ignore common directories (node_modules, .git, etc.)

### Features
- `devai edit <project-path> <instruction>` - Edit code files using natural language
- `devai review <project-path> <instruction>` - Review code files using AI
- `--preview` flag to see changes before applying
- `--force` flag to skip confirmation prompts
- `--file` option to review specific files

### Technical Details
- Built with TypeScript and Node.js
- Uses Commander.js for CLI interface
- Integrates with Google's Generative AI (Gemini) API
- Supports async/await patterns for better performance
- Comprehensive file type support (.js, .ts, .py, .java, .cpp, .go, .rs, etc.)

### Installation
```bash
git clone https://github.com/vijoy-paul/devai.git
cd devai
npm install
npm run build
npm link
```

### Requirements
- Node.js 16+
- npm 7+
- Git
- Gemini API key from Google AI Studio

---

## Version Management

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Version Commands
- `npm run version:patch` - Increment patch version (1.0.0 → 1.0.1)
- `npm run version:minor` - Increment minor version (1.0.0 → 1.1.0)
- `npm run version:major` - Increment major version (1.0.0 → 2.0.0)
- `npm run release` - Build and push to GitHub with tags
