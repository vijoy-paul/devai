# DevAI - Testing Guide

This guide will help you test all the features of your DevAI CLI tool.

## Prerequisites

1. **API Key Setup**: Make sure your Gemini API key is configured
2. **Global Installation**: Ensure the tool is linked globally
3. **Test Project**: We'll use the included test project

## Quick Verification

First, let's verify everything is working:

```bash
# Check if the tool is installed globally
devai --version

# Check if API key is set
echo $GEMINI_API_KEY

# Check if the tool recognizes commands
devai --help
```

## Test 1: Basic Edit Command (Preview Mode)

Test the edit command with preview to see changes before applying:

```bash
# Navigate to your project directory
cd "/Users/vijoy.paul/Documents/personal files/LLM Project/LLM terminal"

# Test edit with preview
devai edit ./test-project "add console.log to show request method and URL" --preview
```

**Expected Result**: 
- Shows preview of changes with colored diff
- Asks for confirmation
- Apply the changes when prompted

## Test 2: Edit Command (Direct Apply)

Test the edit command without preview:

```bash
# Test edit without preview
devai edit ./test-project "add error handling middleware" --force
```

**Expected Result**: 
- Directly applies changes without confirmation
- Shows success message

## Test 3: Review Command (Entire Project)

Test the review command on the entire project:

```bash
# Test review command
devai review ./test-project "check for security best practices and suggest improvements"
```

**Expected Result**: 
- Analyzes all relevant files
- Provides detailed review with suggestions
- Shows potential issues and improvements

## Test 4: Review Command (Specific File)

Test the review command on a specific file:

```bash
# Test review specific file
devai review ./test-project "check for Express.js best practices" --file app.js
```

**Expected Result**: 
- Reviews only the specified file
- Provides focused feedback on that file

## Test 5: Create Additional Test Files

Let's create more test files to test different scenarios:

```bash
# Create a Python file
cat > test-project/calculator.py << 'EOF'
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    return a / b
EOF

# Create a TypeScript file
cat > test-project/utils.ts << 'EOF'
export function formatDate(date: Date): string {
    return date.toISOString();
}

export function validateEmail(email: string): boolean {
    return email.includes('@');
}
EOF
```

## Test 6: Multi-File Edit

Test editing multiple files:

```bash
# Edit Python file
devai edit ./test-project "add input validation to all functions" --preview

# Edit TypeScript file
devai edit ./test-project "add JSDoc comments to all functions" --preview
```

## Test 7: Error Handling

Test error handling scenarios:

```bash
# Test with non-existent project
devai edit ./non-existent-project "add something"

# Test with invalid API key (temporarily)
GEMINI_API_KEY="invalid" devai edit ./test-project "add something"

# Test with binary file (create one)
echo "binary content" > test-project/test.bin
devai edit ./test-project "modify this file"
```

## Test 8: File Filtering

Test the smart file filtering:

```bash
# Test with instruction that should target specific files
devai edit ./test-project "add error handling to Python functions" --preview

# Test with instruction that should target JavaScript/TypeScript
devai edit ./test-project "add TypeScript types" --preview
```

## Test 9: Large File Handling

Test with a large file:

```bash
# Create a large file (>1MB)
dd if=/dev/zero of=test-project/large.txt bs=1024 count=1024
devai edit ./test-project "modify this file"
```

**Expected Result**: Should skip the large file with a warning

## Test 10: Different File Types

Test with various file types:

```bash
# Create different file types
cat > test-project/config.json << 'EOF'
{
  "name": "test",
  "version": "1.0.0"
}
EOF

cat > test-project/README.md << 'EOF'
# Test Project
This is a test project.
EOF

# Test editing different file types
devai edit ./test-project "add more configuration options" --preview
devai edit ./test-project "improve documentation" --preview
```

## Test 11: Review Different Scenarios

Test review with different instructions:

```bash
# Review for performance
devai review ./test-project "check for performance issues"

# Review for security
devai review ./test-project "check for security vulnerabilities"

# Review for code quality
devai review ./test-project "check for code quality and best practices"
```

## Test 12: Edge Cases

Test edge cases:

```bash
# Test with empty instruction
devai edit ./test-project ""

# Test with very long instruction
devai edit ./test-project "add comprehensive error handling, input validation, logging, monitoring, and security measures to all functions while maintaining backward compatibility and following best practices"

# Test with special characters
devai edit ./test-project "add support for unicode characters: 你好世界 🌍"
```

## Test 13: Interactive Examples

Run the interactive example script:

```bash
# Make sure the script is executable
chmod +x example-usage.sh

# Run interactive examples
./example-usage.sh
```

## Test 14: Development Mode

Test development mode:

```bash
# Test development mode
npm run dev edit ./test-project "add a new feature" --preview
```

## Test 15: Build and Rebuild

Test the build process:

```bash
# Clean and rebuild
rm -rf dist/
npm run build

# Test the rebuilt version
node dist/index.js --help
```

## Expected Results Summary

### ✅ Successful Tests Should Show:
- Colored diff output in preview mode
- Confirmation prompts (unless --force is used)
- Success messages after file updates
- Detailed code reviews with suggestions
- Proper file filtering based on instructions
- Error messages for invalid inputs
- Skipped files for large/binary files

### ❌ Common Issues to Watch For:
- API key not set
- Network connectivity issues
- File permission problems
- Invalid file paths
- Malformed responses from Gemini API

## Troubleshooting

If tests fail:

1. **Check API Key**: `echo $GEMINI_API_KEY`
2. **Check Installation**: `devai --version`
3. **Check Build**: `npm run build`
4. **Check Permissions**: Ensure files are readable/writable
5. **Check Network**: Ensure internet connection is working

## Performance Testing

For performance testing:

```bash
# Time the operations
time devai edit ./test-project "add logging" --force
time devai review ./test-project "check for issues"
```

## Cleanup

After testing, clean up test files:

```bash
# Remove test files
rm -f test-project/calculator.py
rm -f test-project/utils.ts
rm -f test-project/config.json
rm -f test-project/README.md
rm -f test-project/large.txt
rm -f test-project/test.bin
```

## Success Criteria

Your DevAI is working correctly if:
- ✅ All commands respond without errors
- ✅ Preview mode shows colored diffs
- ✅ Files are modified correctly
- ✅ Reviews provide useful feedback
- ✅ Error handling works properly
- ✅ File filtering works as expected
- ✅ Safety features prevent accidental overwrites
