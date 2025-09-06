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

### Quick Start (Recommended)

1. Clone this repository:
```bash
git clone https://github.com/yourusername/devai.git
cd devai
```

2. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your API key
```

4. Run the setup script:
```bash
./setup.sh
```

5. Run the getting started guide:
```bash
./getting-started.sh
```

### Manual Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/devai.git
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

4. Link globally (optional):
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

### Edit Command

Edit code files using AI:

```bash
# Basic usage
devai edit ./my-project "add a login route in Express"

# With preview mode
devai edit ./my-project "add error handling" --preview

# Force apply without confirmation
devai edit ./my-project "refactor the code" --force
```

### Review Command

Review code files using AI:

```bash
# Review entire project
devai review ./my-project "check for unused imports"

# Review specific file
devai review ./my-project "check for security issues" --file src/auth.js
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

## 📚 Documentation

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Complete user guide with examples and best practices
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for common commands
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing instructions
- **[getting-started.sh](./getting-started.sh)** - Interactive getting started script
- **[example-usage.sh](./example-usage.sh)** - Interactive examples

## 🚀 Quick Commands

```bash
# Edit with preview (recommended)
devai edit ./my-project "your instruction" --preview

# Review code
devai review ./my-project "your review instruction"

# Get help
devai --help
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
git clone https://github.com/yourusername/devai.git
cd devai
npm install
cp .env.example .env
# Edit .env with your API key
npm run build
npm link
```

## License

MIT License - see LICENSE file for details.

## Disclaimer

This tool uses AI to modify your code. Always review changes before applying them to production code. The authors are not responsible for any issues that may arise from using this tool.
