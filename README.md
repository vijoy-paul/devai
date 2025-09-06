# DevAI

A powerful CLI tool for AI-powered code editing and review using Google's Gemini API.

## Features

- 🤖 **AI-Powered Code Editing**: Edit your code using natural language instructions
- 🔍 **Code Review**: Get AI-powered code reviews and suggestions
- 📋 **Preview Mode**: See changes before applying them
- 🛡️ **Safe Operations**: Built-in safeguards to prevent accidental overwrites
- 📁 **Smart File Detection**: Automatically finds relevant files based on your instructions
- 🎨 **Colored Diffs**: Beautiful, colored diff output for easy review

## Installation

### Install from GitHub (Recommended)

Install DevAI directly from GitHub:

```bash
# Clone the repository
git clone https://github.com/vijoy-paul/devai.git
cd devai

# Install dependencies and build
npm install
npm run build

# Link globally
npm link
```

**Requirements:**
- Node.js 16+ 
- npm 7+
- Git (for downloading from GitHub)

This will:
- Download DevAI from GitHub
- Install dependencies
- Build the project
- Make the `devai` command available globally
- Work on macOS, Windows, and Linux

**Alternative: One-liner installation**
```bash
git clone https://github.com/vijoy-paul/devai.git && cd devai && npm install && npm run build && npm link
```

### Setup API Key

After installation, set your Gemini API key:

**macOS/Linux:**
```bash
export GEMINI_API_KEY="your-api-key-here"
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.bashrc  # or ~/.zshrc
```

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your-api-key-here
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your-api-key-here"
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")
```

Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Update

#### For GitHub Installation (Recommended)

If you installed DevAI using the GitHub clone method:

```bash
# Check current version
devai --version

# Navigate to your DevAI directory
cd devai

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies and rebuild
npm install
npm run build

# Re-link globally
npm link

# Verify the update
devai --version
```

#### For Global Installation from GitHub

If you installed DevAI globally from GitHub:

```bash
# Check current version
devai --version

# Find your DevAI installation directory
npm list -g devai

# Navigate to the global installation directory
# (Usually in ~/.nvm/versions/node/*/lib/node_modules/devai or similar)
cd $(npm root -g)/devai

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies and rebuild
npm install
npm run build

# Re-link globally (if needed)
npm link

# Verify the update
devai --version
```

#### Alternative: Fresh Installation

```bash
# Remove old installation
rm -rf devai

# Install latest version
git clone https://github.com/vijoy-paul/devai.git
cd devai
npm install
npm run build
npm link
```

#### Check for Updates

```bash
# Check if there are new releases on GitHub
git fetch origin
git log HEAD..origin/main --oneline

# Or visit: https://github.com/vijoy-paul/devai/releases
```

### Uninstall

To remove DevAI:

```bash
npm uninstall -g devai
```

### Alternative: Local Development Installation

If you want to contribute or modify the code:

1. Clone this repository:
```bash
git clone https://github.com/vijoy-paul/devai.git
cd devai
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link globally:
```bash
npm link
```

## Setup

### Quick Setup (Recommended)

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Run the setup script with your API key:
```bash
./setup.sh YOUR_API_KEY
```

This will automatically:
- Install dependencies
- Build the project
- Set up the API key
- Link the CLI globally

### Manual Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Set the environment variable:
```bash
export GEMINI_API_KEY="your-api-key-here"
```

5. Link globally (optional):
```bash
npm link
```

## Usage

### Quick Start Examples

Once installed, you can use DevAI to edit and review your code with natural language instructions:

```bash
# Check if DevAI is installed
devai --version

# Get help
devai --help
devai edit --help
devai review --help
```

### Edit Command Examples

Edit your code files using AI with natural language instructions:

```bash
# Basic edit - add new features (uses current directory)
devai edit "add a login route in Express"
devai edit "implement user authentication with JWT"
devai edit "add a dark mode toggle component"

# Code improvements and refactoring
devai edit "add error handling to all API routes"
devai edit "refactor functions to use async/await"
devai edit "optimize React components for performance"

# Add TypeScript types
devai edit "add TypeScript types to all functions"
devai edit "convert JavaScript files to TypeScript"

# Security improvements
devai edit "add input validation and sanitization"
devai edit "implement rate limiting for API endpoints"

# Database operations
devai edit "add database migrations for user table"
devai edit "optimize database queries for better performance"

# Testing
devai edit "add unit tests for all utility functions"
devai edit "add error boundary components"

# Documentation
devai edit "update installation instructions"
devai edit "add API documentation for all endpoints"

# Specify different directory (optional)
devai edit "add new feature" ./my-project
devai edit "refactor code" ./backend
```

### Review Command Examples

Get AI-powered code reviews and suggestions:

```bash
# General code review (uses current directory)
devai review "check for code quality issues"
devai review "find potential bugs and improvements"
devai review "review for security vulnerabilities"

# Performance review
devai review "check for performance bottlenecks"
devai review "find memory leaks and optimization opportunities"

# Security review
devai review "check for security vulnerabilities"
devai review "review for potential security issues"

# Code style and best practices
devai review "check for coding standards and best practices"
devai review "find unused code and dead functions"

# Specific file review
devai review "check for unused imports" --file src/utils.js
devai review "review authentication logic" --file src/auth.js
devai review "check component structure" --file src/components/UserProfile.tsx

# Framework-specific reviews
devai review "check React best practices and hooks usage"
devai review "review Express.js patterns and middleware"
devai review "check Vue.js component structure and composition"

# Specify different directory (optional)
devai review "check for issues" ./my-project
devai review "review code quality" ./backend
```

### Advanced Usage Examples

```bash
# Preview changes before applying (recommended)
devai edit ./my-project "add user profile page" --preview

# Force apply without confirmation prompts
devai edit ./my-project "fix all linting errors" --force

# Edit specific file types
devai edit ./src "add JSDoc comments to all functions"  # Will target .js files
devai edit ./components "add PropTypes to React components"  # Will target .jsx/.tsx files

# Review with specific focus
devai review ./my-project "check for accessibility issues in components"
devai review ./api "review error handling patterns"
devai review ./database "check for SQL injection vulnerabilities"
```

### Real-World Workflow Examples

```bash
# 1. Start a new feature
devai edit ./src "create a new user registration component with form validation"

# 2. Review the changes
devai review ./src "check the new registration component for security and UX issues"

# 3. Add tests
devai edit ./tests "add unit tests for the registration component"

# 4. Update documentation
devai edit ./README.md "add documentation for the new registration feature"

# 5. Final review
devai review ./my-project "do a final review of the registration feature implementation"
```

## Commands

### `edit <project-path> <instruction>`

Edits code files based on your natural language instruction.

**Options:**
- `-p, --preview`: Show preview of changes before applying
- `-f, --force`: Skip confirmation prompts

**Examples:**
```bash
devai edit ./my-app "add TypeScript types to all functions"
devai edit ./backend "implement JWT authentication"
devai edit ./frontend "add dark mode toggle" --preview
```

### `review <project-path> <instruction>`

Reviews code files based on your instruction.

**Options:**
- `-f, --file <file>`: Review specific file instead of entire project

**Examples:**
```bash
devai review ./my-app "check for performance issues"
devai review ./backend "find potential security vulnerabilities"
devai review ./frontend "check for accessibility issues" --file src/components/Button.tsx
```

## Supported File Types

The tool supports a wide range of file types:

- **Web**: `.js`, `.ts`, `.jsx`, `.tsx`, `.vue`, `.svelte`
- **Backend**: `.py`, `.java`, `.c`, `.cpp`, `.cs`, `.php`, `.rb`, `.go`, `.rs`, `.swift`
- **Styles**: `.css`, `.scss`, `.sass`, `.less`
- **Config**: `.json`, `.xml`, `.yaml`, `.yml`, `.toml`
- **Documentation**: `.md`, `.txt`
- **Scripts**: `.sh`, `.bash`, `.zsh`
- **And more...**

## Safety Features

- **File Size Limits**: Files larger than 1MB are automatically skipped
- **Binary File Detection**: Binary files are ignored
- **Ignore Patterns**: Common directories like `node_modules`, `.git`, `.env` are ignored
- **Confirmation Prompts**: Asks for confirmation before overwriting files
- **Preview Mode**: See exactly what changes will be made before applying them

## Development

### Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run the CLI in development mode
- `npm start`: Run the compiled CLI
- `npm link`: Link the CLI globally for development

### Project Structure

```
src/
├── index.ts              # Main CLI entry point
├── commands/             # Command implementations
│   ├── edit.ts          # Edit command
│   └── review.ts        # Review command
├── geminiClient.ts      # Gemini API integration
└── fileUtils.ts         # File operations and utilities
```

## Configuration

The tool uses the following environment variables:

- `GEMINI_API_KEY`: Your Gemini API key (required)

## Troubleshooting

### Common Issues

1. **"GEMINI_API_KEY environment variable is required"**
   - Make sure you've set your Gemini API key as an environment variable
   - You can get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **"No supported files found"**
   - Make sure you're pointing to a directory with supported file types
   - Check that the files aren't being ignored by the safety filters

3. **"File too large"**
   - The tool skips files larger than 1MB to avoid API limits
   - Consider breaking large files into smaller chunks

4. **API Rate Limits**
   - The free Gemini API has rate limits
   - The tool processes files in batches to respect these limits

5. **GitHub Installation Issues**
   - Make sure you have Git installed: `git --version`
   - Ensure you have Node.js 16+ and npm 7+: `node --version && npm --version`
   - If installation fails, try: `npm cache clean --force` then retry
   - On Windows, you may need to run as Administrator

6. **Update Issues**
   - If `git pull` fails, try: `git fetch origin && git reset --hard origin/main`
   - If build fails after update, try: `rm -rf node_modules && npm install && npm run build`
   - If command not found after update, try: `npm unlink && npm link`
   - For fresh installation: `rm -rf devai && git clone https://github.com/vijoy-paul/devai.git && cd devai && npm install && npm run build && npm link`

## 📚 Documentation

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Complete user guide with examples and best practices
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for common commands
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing instructions
- **[getting-started.sh](./getting-started.sh)** - Interactive getting started script
- **[example-usage.sh](./example-usage.sh)** - Interactive examples

## 🚀 Quick Commands

```bash
# Install DevAI
git clone https://github.com/vijoy-paul/devai.git && cd devai && npm install && npm run build && npm link

# Set up API key (macOS/Linux)
export GEMINI_API_KEY="your-api-key-here"

# Set up API key (Windows)
set GEMINI_API_KEY=your-api-key-here

# Check installation
devai --version

# Edit with preview (recommended) - uses current directory
devai edit "your instruction" --preview

# Review code - uses current directory
devai review "your review instruction"

# Specify different directory (optional)
devai edit "your instruction" ./my-project --preview
devai review "your review instruction" ./my-project

# Get help
devai --help
devai edit --help
devai review --help

# Update to latest version (GitHub installation)
cd devai && git pull origin main && npm install && npm run build && npm link

# Update global installation
cd $(npm root -g)/devai && git pull origin main && npm install && npm run build && npm link

# Uninstall
npm uninstall -g devai
```

## 📝 Common Use Cases

### Adding New Features
```bash
devai edit "add user profile page with edit functionality"
devai edit "create REST endpoints for user management"
devai edit "add a responsive navigation menu"
```

### Code Quality & Security
```bash
devai review "check for security vulnerabilities"
devai edit "add input validation to all forms"
devai review "review authentication implementation"
```

### Performance & Optimization
```bash
devai review "find performance bottlenecks"
devai edit "optimize React components for better performance"
devai edit "optimize slow database queries"
```

### Testing & Documentation
```bash
devai edit "add unit tests for all utility functions"
devai edit "update API documentation"
devai review "check test coverage and quality"
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup:
```bash
git clone https://github.com/vijoy-paul/devai.git
cd devai
npm install
cp .env.example .env
# Edit .env with your API key
npm run build
npm link
```

## Version Management

DevAI follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions  
- **PATCH** version for backwards-compatible bug fixes

### Current Version: 1.2.0

### Version Commands (for developers)
```bash
# Increment patch version (1.0.0 → 1.0.1)
npm run version:patch

# Increment minor version (1.0.0 → 1.1.0)  
npm run version:minor

# Increment major version (1.0.0 → 2.0.0)
npm run version:major

# Build and release to GitHub
npm run release
```

### Changelog
See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and changes.

## License

MIT License - see LICENSE file for details.

## Disclaimer

This tool uses AI to modify your code. Always review changes before applying them to production code. The authors are not responsible for any issues that may arise from using this tool.
