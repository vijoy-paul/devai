#!/bin/bash

# DevAI - Example Usage Script
# Make sure to set your GEMINI_API_KEY environment variable first!

echo "🤖 DevAI - Example Usage"
echo "=================================="
echo ""

# Check if API key is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ Error: GEMINI_API_KEY environment variable is not set"
    echo "Please set it with: export GEMINI_API_KEY='your-api-key-here'"
    echo "Get your free API key from: https://makersuite.google.com/app/apikey"
    exit 1
fi

echo "✅ GEMINI_API_KEY is set"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Example 1: Edit command with preview
echo "📝 Example 1: Edit command with preview"
echo "Command: devai edit ./test-project 'add error handling middleware' --preview"
echo ""
read -p "Press Enter to run this example..."
devai edit ./test-project "add error handling middleware" --preview

echo ""
echo ""

# Example 2: Review command
echo "🔍 Example 2: Review command"
echo "Command: devai review ./test-project 'check for security issues'"
echo ""
read -p "Press Enter to run this example..."
devai review ./test-project "check for security issues"

echo ""
echo ""

# Example 3: Edit specific file
echo "📝 Example 3: Review specific file"
echo "Command: devai review ./test-project 'check for best practices' --file app.js"
echo ""
read -p "Press Enter to run this example..."
devai review ./test-project "check for best practices" --file app.js

echo ""
echo "🎉 Examples completed!"
echo ""
echo "💡 Tips:"
echo "- Use --preview flag to see changes before applying them"
echo "- Use --force flag to skip confirmation prompts"
echo "- The tool automatically finds relevant files based on your instruction"
echo "- Large files (>1MB) and binary files are automatically skipped"
