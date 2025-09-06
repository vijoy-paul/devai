#!/bin/bash

# DevAI - Getting Started Script
echo "🤖 DevAI - Getting Started"
echo "====================================="
echo ""

# Check if API key is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ GEMINI_API_KEY is not set"
    echo ""
    echo "Please set your API key:"
    echo "export GEMINI_API_KEY='your-api-key-here'"
    echo ""
    echo "Get your free API key from: https://makersuite.google.com/app/apikey"
    echo ""
    echo "You can set it in several ways:"
    echo "1. Copy .env.example to .env and edit it"
    echo "2. Export it in your shell: export GEMINI_API_KEY='your-key'"
    echo "3. Enter it now (temporary for this session)"
    echo ""
    read -p "Enter your API key (or press Enter to skip): " api_key
    if [ -n "$api_key" ]; then
        export GEMINI_API_KEY="$api_key"
        echo "✅ API key set for this session"
    else
        echo "⚠️  No API key provided. You'll need to set it manually."
        echo "   Run: export GEMINI_API_KEY='your-api-key'"
        exit 1
    fi
else
    echo "✅ GEMINI_API_KEY is set"
fi

echo ""

# Check if tool is installed
if ! command -v devai &> /dev/null; then
    echo "❌ devai command not found"
    echo ""
    echo "Installing globally..."
    npm run build
    npm link
    if [ $? -eq 0 ]; then
        echo "✅ devai installed globally"
    else
        echo "❌ Failed to install globally"
        exit 1
    fi
else
    echo "✅ devai is installed globally"
fi

echo ""

# Show current project structure
echo "📁 Current project structure:"
echo "├── src/                    # Source code"
echo "├── test-project/           # Example project for testing"
echo "├── dist/                   # Built files"
echo "├── USER_GUIDE.md          # Complete documentation"
echo "├── QUICK_REFERENCE.md     # Quick reference"
echo "└── TESTING_GUIDE.md       # Testing instructions"
echo ""

# Show available commands
echo "🚀 Available commands:"
echo "├── devai edit <path> <instruction>     # Edit code"
echo "├── devai review <path> <instruction>   # Review code"
echo "├── devai --help                        # Show help"
echo "└── ./example-usage.sh                        # Interactive examples"
echo ""

# Show quick examples
echo "💡 Quick examples:"
echo ""
echo "1. Edit with preview:"
echo "   devai edit ./test-project 'add error handling' --preview"
echo ""
echo "2. Review code:"
echo "   devai review ./test-project 'check for security issues'"
echo ""
echo "3. Edit specific file:"
echo "   devai edit ./test-project 'add comments' --file app.js"
echo ""

# Ask if user wants to run a test
read -p "Would you like to run a quick test? (y/n): " run_test
if [ "$run_test" = "y" ] || [ "$run_test" = "Y" ]; then
    echo ""
    echo "🧪 Running quick test..."
    echo ""
    
    # Test edit command
    echo "Testing edit command with preview..."
    devai edit ./test-project "add a simple comment" --preview
    
    echo ""
    echo "✅ Test completed!"
    echo ""
    echo "📚 Next steps:"
    echo "├── Read USER_GUIDE.md for complete documentation"
    echo "├── Read QUICK_REFERENCE.md for quick commands"
    echo "├── Run ./example-usage.sh for interactive examples"
    echo "└── Start using devai on your own projects!"
    echo ""
else
    echo ""
    echo "📚 Next steps:"
    echo "├── Read USER_GUIDE.md for complete documentation"
    echo "├── Read QUICK_REFERENCE.md for quick commands"
    echo "├── Run ./example-usage.sh for interactive examples"
    echo "└── Start using devai on your own projects!"
    echo ""
fi

echo "🎉 You're ready to use DevAI!"
echo ""
echo "💡 Pro tip: Always use --preview first to see changes before applying them!"
