# Contributing to DevAI

Thank you for your interest in contributing to DevAI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- A Gemini API key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/ai-code-terminal.git
   cd ai-code-terminal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

4. **Build and Link**
   ```bash
   npm run build
   npm link
   ```

5. **Test Your Setup**
   ```bash
   devai --help
   ```

## 🛠 Development Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run build
   npm test  # if tests exist
   ./example-usage.sh  # test functionality
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format
We follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📝 Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Use async/await over callbacks

### File Organization
- Keep files focused and single-purpose
- Use descriptive file names
- Group related functionality together
- Follow the existing directory structure

### Error Handling
- Always handle errors gracefully
- Provide meaningful error messages
- Log errors appropriately
- Don't expose sensitive information

## 🧪 Testing

### Manual Testing
```bash
# Test edit command
devai edit ./test-project "add error handling" --preview

# Test review command
devai review ./test-project "check for security issues"

# Test with different file types
devai edit ./test-project "add type hints" --preview
```

### Test Scenarios
- Test with various file types (JS, TS, Python, etc.)
- Test with large projects
- Test error conditions
- Test edge cases

## 📚 Documentation

### Updating Documentation
- Update README.md for user-facing changes
- Update USER_GUIDE.md for new features
- Update QUICK_REFERENCE.md for new commands
- Add examples for new functionality

### Documentation Standards
- Use clear, concise language
- Include code examples
- Update all relevant sections
- Test all code examples

## 🔒 Security Guidelines

### API Key Handling
- Never commit API keys or sensitive data
- Use environment variables for configuration
- Follow the .env.example pattern
- Document any new environment variables

### Input Validation
- Validate all user inputs
- Sanitize file paths
- Handle edge cases gracefully
- Prevent path traversal attacks

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version)
- Error messages (if any)

### Feature Requests
For feature requests, please include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (if you have ideas)
- Any relevant examples

## 🚀 Pull Request Process

### Before Submitting
1. Ensure your code builds without errors
2. Test your changes thoroughly
3. Update documentation if needed
4. Follow the commit message format
5. Make sure your branch is up to date

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] No breaking changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No sensitive data included
```

## 📋 Code Review Process

### Review Criteria
- Code quality and style
- Functionality and correctness
- Security considerations
- Documentation completeness
- Test coverage

### Review Response
- Be constructive and respectful
- Provide specific feedback
- Suggest improvements
- Ask questions if unclear

## 🎯 Areas for Contribution

### High Priority
- Performance improvements
- Additional file type support
- Better error handling
- Enhanced security features
- More comprehensive testing

### Medium Priority
- UI/UX improvements
- Additional CLI options
- Better documentation
- Code refactoring
- Dependency updates

### Low Priority
- New features
- Additional integrations
- Advanced configuration options

## 📞 Getting Help

### Questions and Discussion
- Open an issue for questions
- Use GitHub Discussions for general discussion
- Check existing issues and PRs first

### Development Help
- Review the codebase
- Check existing documentation
- Look at similar implementations
- Ask specific questions

## 📄 License

By contributing to DevAI, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to DevAI! 🎉
