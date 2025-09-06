# DevAI - User Guide

A comprehensive guide for using your locally installed DevAI CLI tool.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation & Setup](#installation--setup)
3. [Basic Usage](#basic-usage)
4. [Commands Reference](#commands-reference)
5. [Examples & Use Cases](#examples--use-cases)
6. [Advanced Features](#advanced-features)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

## 🚀 Quick Start

If you already have the tool installed and configured:

```bash
# Edit code with preview
devai edit ./my-project "add error handling" --preview

# Review code
devai review ./my-project "check for security issues"

# Get help
devai --help
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gemini API key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Step 1: Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Install the Tool

```bash
# Navigate to your project directory
cd "/Users/vijoy.paul/Documents/personal files/LLM Project/LLM terminal"

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

### Step 3: Configure API Key

```bash
# Set environment variable (temporary)
export GEMINI_API_KEY="your-api-key-here"

# Or add to your shell profile for persistence
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### Step 4: Verify Installation

```bash
# Check if installed
devai --version

# Check if API key is set
echo $GEMINI_API_KEY

# Test with help
devai --help
```

## 📖 Basic Usage

### Command Structure

```bash
devai <command> [options] <project-path> <instruction>
```

### Available Commands

- `edit` - Edit code files using AI
- `review` - Review code files using AI

### Basic Examples

```bash
# Edit a project
devai edit ./my-app "add user authentication"

# Review a project
devai review ./my-app "check for security vulnerabilities"

# Edit with preview
devai edit ./my-app "refactor the code" --preview

# Review specific file
devai review ./my-app "check for best practices" --file src/app.js
```

## 📚 Commands Reference

### Edit Command

```bash
devai edit [options] <project-path> <instruction>
```

**Arguments:**
- `project-path` - Path to your project directory
- `instruction` - Natural language instruction for the AI

**Options:**
- `-p, --preview` - Show preview of changes before applying
- `-f, --force` - Skip confirmation prompts
- `-h, --help` - Show help

**Examples:**
```bash
# Basic edit
devai edit ./my-project "add error handling"

# Edit with preview
devai edit ./my-project "add TypeScript types" --preview

# Force apply without confirmation
devai edit ./my-project "format the code" --force
```

### Review Command

```bash
devai review [options] <project-path> <instruction>
```

**Arguments:**
- `project-path` - Path to your project directory
- `instruction` - Review instruction for the AI

**Options:**
- `-f, --file <file>` - Review specific file instead of entire project
- `-h, --help` - Show help

**Examples:**
```bash
# Review entire project
devai review ./my-project "check for performance issues"

# Review specific file
devai review ./my-project "check for security issues" --file src/auth.js

# Review for best practices
devai review ./my-project "check for code quality and best practices"
```

## 💡 Examples & Use Cases

### Web Development

```bash
# Add authentication to Express app
devai edit ./backend "add JWT authentication middleware"

# Add error handling to React components
devai edit ./frontend "add error boundaries to all components"

# Review for security issues
devai review ./web-app "check for XSS and CSRF vulnerabilities"
```

### Python Development

```bash
# Add type hints to Python functions
devai edit ./python-project "add type hints to all functions"

# Add error handling
devai edit ./python-project "add try-catch blocks to all functions"

# Review for best practices
devai review ./python-project "check for PEP 8 compliance"
```

### Node.js Development

```bash
# Add logging to Express routes
devai edit ./api "add comprehensive logging to all routes"

# Add input validation
devai edit ./api "add input validation middleware"

# Review for performance
devai review ./api "check for performance bottlenecks"
```

### Code Quality

```bash
# Refactor code
devai edit ./project "refactor to use async/await instead of callbacks"

# Add documentation
devai edit ./project "add JSDoc comments to all functions"

# Review code quality
devai review ./project "check for code smells and technical debt"
```

## 🔧 Advanced Features

### Preview Mode

The `--preview` flag shows you exactly what changes will be made before applying them:

```bash
devai edit ./my-project "add error handling" --preview
```

**Output:**
```
📋 Preview of changes:

--- src/app.js
+++ src/app.js
 const express = require('express');
 const app = express();
 
+// Error handling middleware
+app.use((err, req, res, next) => {
+  console.error(err.stack);
+  res.status(500).send('Something went wrong!');
+});
+
 app.get('/', (req, res) => {
   res.send('Hello World!');
 });
```

### Smart File Filtering

The tool automatically finds relevant files based on your instruction:

```bash
# This will only process Python files
devai edit ./project "add type hints to Python functions"

# This will only process JavaScript/TypeScript files
devai edit ./project "add TypeScript types"
```

### Force Mode

Skip confirmation prompts with the `--force` flag:

```bash
# Apply changes without confirmation
devai edit ./my-project "format the code" --force
```

### File-Specific Reviews

Review specific files instead of the entire project:

```bash
# Review only the authentication file
devai review ./project "check for security issues" --file src/auth.js
```

## 🛠 Troubleshooting

### Common Issues

#### 1. "GEMINI_API_KEY environment variable is required"

**Solution:**
```bash
# Set the API key
export GEMINI_API_KEY="your-api-key-here"

# Or add to your shell profile
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

#### 2. "No supported files found"

**Solution:**
- Check that your project path is correct
- Ensure you have supported file types (JS, TS, Python, etc.)
- Check that files aren't being ignored (node_modules, .git, etc.)

#### 3. "File too large"

**Solution:**
- The tool skips files larger than 1MB
- Break large files into smaller chunks
- Use the `--file` option to process specific files

#### 4. "No code block found in response"

**Solution:**
- This is usually a temporary API issue
- Try running the command again
- Check your internet connection

#### 5. Tool not found globally

**Solution:**
```bash
# Re-link globally
npm link

# Or use directly
node dist/index.js edit ./my-project "your instruction"
```

### Debug Mode

For development and debugging:

```bash
# Run in development mode
npm run dev edit ./my-project "your instruction"

# Check build
npm run build

# Test specific file
node dist/index.js edit ./my-project "your instruction"
```

## 📋 Best Practices

### 1. Use Preview Mode

Always use `--preview` for important changes:

```bash
devai edit ./production-code "refactor authentication" --preview
```

### 2. Be Specific with Instructions

Good instructions:
```bash
devai edit ./project "add input validation to all API endpoints"
devai review ./project "check for SQL injection vulnerabilities"
```

Vague instructions:
```bash
devai edit ./project "fix the code"
devai review ./project "check everything"
```

### 3. Review Before Applying

```bash
# Always preview first
devai edit ./project "your instruction" --preview

# Then apply if satisfied
devai edit ./project "your instruction" --force
```

### 4. Use Version Control

Always commit your changes before using the tool:

```bash
git add .
git commit -m "Backup before AI edits"
devai edit ./project "your instruction" --preview
```

### 5. Test After Changes

```bash
# Make changes
devai edit ./project "add new feature" --force

# Test the changes
npm test
npm run build
```

### 6. Use Specific File Reviews

For large projects, review specific files:

```bash
# Instead of reviewing entire project
devai review ./large-project "check for issues"

# Review specific files
devai review ./large-project "check for issues" --file src/auth.js
```

## 🎯 Use Case Examples

### Scenario 1: Adding Error Handling

```bash
# Preview the changes first
devai edit ./my-api "add comprehensive error handling to all routes" --preview

# Apply if satisfied
devai edit ./my-api "add comprehensive error handling to all routes" --force
```

### Scenario 2: Security Review

```bash
# Review for security issues
devai review ./my-app "check for common security vulnerabilities like XSS, CSRF, and injection attacks"
```

### Scenario 3: Code Refactoring

```bash
# Refactor with preview
devai edit ./legacy-code "refactor callback-based code to use async/await" --preview
```

### Scenario 4: Adding Documentation

```bash
# Add documentation
devai edit ./my-project "add JSDoc comments to all public functions" --preview
```

### Scenario 5: Performance Optimization

```bash
# Review for performance
devai review ./my-app "identify performance bottlenecks and suggest optimizations"
```

## 📞 Getting Help

### Built-in Help

```bash
# General help
devai --help

# Command-specific help
devai edit --help
devai review --help
```

### Development Scripts

```bash
# Run in development mode
npm run dev edit ./my-project "your instruction"

# Build the project
npm run build

# Test the build
node dist/index.js --help
```

### Interactive Examples

```bash
# Run interactive examples
./example-usage.sh
```

## 🔄 Workflow Integration

### Git Workflow

```bash
# 1. Create a backup branch
git checkout -b backup-before-ai-edits

# 2. Make AI changes
devai edit ./project "your instruction" --preview

# 3. Review and apply changes
devai edit ./project "your instruction" --force

# 4. Test changes
npm test

# 5. Commit changes
git add .
git commit -m "AI-assisted code improvements"

# 6. Push to repository
git push origin main
```

### CI/CD Integration

```bash
# In your CI pipeline
devai review ./project "check for security issues" > security-report.txt
```

## 🎉 Conclusion

Your DevAI is a powerful tool for AI-assisted development. Use it responsibly:

- Always preview changes before applying
- Test your code after AI modifications
- Use version control to track changes
- Be specific with your instructions
- Review AI suggestions critically

Happy coding with AI assistance! 🚀
