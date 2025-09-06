# DevAI - Quick Reference

## 🚀 Quick Setup

```bash
# 1. Set API key
export GEMINI_API_KEY="your-api-key-here"

# 2. Build and link (if not already done)
npm run build && npm link

# 3. Verify installation
devai --version
```

## 📝 Essential Commands

### Edit Code
```bash
# Basic edit
devai edit ./my-project "your instruction"

# Edit with preview (recommended)
devai edit ./my-project "your instruction" --preview

# Force apply without confirmation
devai edit ./my-project "your instruction" --force
```

### Review Code
```bash
# Review entire project
devai review ./my-project "your review instruction"

# Review specific file
devai review ./my-project "your review instruction" --file src/app.js
```

## 💡 Common Use Cases

### Web Development
```bash
# Add authentication
devai edit ./backend "add JWT authentication middleware" --preview

# Add error handling
devai edit ./frontend "add error boundaries to React components" --preview

# Security review
devai review ./web-app "check for XSS and CSRF vulnerabilities"
```

### Python Development
```bash
# Add type hints
devai edit ./python-project "add type hints to all functions" --preview

# Add error handling
devai edit ./python-project "add try-catch blocks to all functions" --preview

# Code quality review
devai review ./python-project "check for PEP 8 compliance"
```

### Node.js Development
```bash
# Add logging
devai edit ./api "add comprehensive logging to all routes" --preview

# Add validation
devai edit ./api "add input validation middleware" --preview

# Performance review
devai review ./api "check for performance bottlenecks"
```

## 🔧 Troubleshooting

### API Key Issues
```bash
# Check if set
echo $GEMINI_API_KEY

# Set temporarily
export GEMINI_API_KEY="your-key"

# Set permanently (add to ~/.zshrc or ~/.bashrc)
echo 'export GEMINI_API_KEY="your-key"' >> ~/.zshrc
source ~/.zshrc
```

### Tool Not Found
```bash
# Re-link globally
npm link

# Or use directly
node dist/index.js edit ./my-project "your instruction"
```

### Build Issues
```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

## 📋 Best Practices

1. **Always use `--preview` first**
2. **Be specific with instructions**
3. **Use version control**
4. **Test after changes**
5. **Review AI suggestions critically**

## 🎯 Example Workflow

```bash
# 1. Backup your code
git add . && git commit -m "Backup before AI edits"

# 2. Preview changes
devai edit ./my-project "add error handling" --preview

# 3. Apply if satisfied
devai edit ./my-project "add error handling" --force

# 4. Test changes
npm test

# 5. Commit changes
git add . && git commit -m "AI-assisted improvements"
```

## 📞 Help Commands

```bash
# General help
devai --help

# Command help
devai edit --help
devai review --help

# Interactive examples
./example-usage.sh
```

## 🔗 Useful Links

- [Google AI Studio](https://makersuite.google.com/app/apikey) - Get API key
- [Full User Guide](./USER_GUIDE.md) - Complete documentation
- [Testing Guide](./TESTING_GUIDE.md) - Testing instructions
