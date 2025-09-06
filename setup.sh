#!/bin/bash

# DevAI - Setup Script
echo "🤖 DevAI - Setup Script"
echo "=================================="
echo ""

# Check if API key is already set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY is not set"
    echo ""
    echo "Please set your API key:"
    echo "1. Copy .env.example to .env:"
    echo "   cp .env.example .env"
    echo ""
    echo "2. Edit .env and add your API key:"
    echo "   GEMINI_API_KEY=your-api-key-here"
    echo ""
    echo "3. Source the .env file:"
    echo "   source .env"
    echo ""
    echo "Get your free API key from: https://makersuite.google.com/app/apikey"
    echo ""
    read -p "Enter your API key (or press Enter to skip): " api_key
    if [ -n "$api_key" ]; then
        export GEMINI_API_KEY="$api_key"
        echo "✅ API key set for this session"
    else
        echo "⚠️  Skipping API key setup. You'll need to set it manually."
        API_KEY=""
    fi
else
    echo "✅ GEMINI_API_KEY is already set"
    API_KEY="$GEMINI_API_KEY"
fi

echo "🔧 Setting up DevAI..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
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

# Set up environment variables
echo "🔑 Setting up environment variables..."

if [ -n "$API_KEY" ]; then
    # Add to shell profile for persistence
    SHELL_PROFILE=""
    if [ -f "$HOME/.zshrc" ]; then
        SHELL_PROFILE="$HOME/.zshrc"
    elif [ -f "$HOME/.bashrc" ]; then
        SHELL_PROFILE="$HOME/.bashrc"
    elif [ -f "$HOME/.bash_profile" ]; then
        SHELL_PROFILE="$HOME/.bash_profile"
    fi

    if [ -n "$SHELL_PROFILE" ]; then
        # Check if the export already exists
        if ! grep -q "GEMINI_API_KEY" "$SHELL_PROFILE"; then
            echo "" >> "$SHELL_PROFILE"
            echo "# DevAI API Key" >> "$SHELL_PROFILE"
            echo "export GEMINI_API_KEY=\"$API_KEY\"" >> "$SHELL_PROFILE"
            echo "✅ API key added to $SHELL_PROFILE"
        else
            echo "⚠️  API key already exists in $SHELL_PROFILE"
        fi
    fi
    echo "✅ API key configured"
else
    echo "⚠️  API key not set. Please configure it manually:"
    echo "   1. Copy .env.example to .env"
    echo "   2. Edit .env with your API key"
    echo "   3. Source the .env file"
fi
echo ""

# Link globally
echo "🔗 Linking globally..."
npm link

if [ $? -ne 0 ]; then
    echo "❌ Failed to link globally"
    exit 1
fi

echo "✅ Linked globally"
echo ""

# Test the installation
echo "🧪 Testing installation..."
devai --version

if [ $? -eq 0 ]; then
    echo "✅ Installation test successful"
else
    echo "❌ Installation test failed"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "💡 Usage examples:"
echo "  devai edit ./my-project 'add error handling' --preview"
echo "  devai review ./my-project 'check for security issues'"
echo ""
echo "📚 Run './example-usage.sh' for interactive examples"
echo ""
echo "⚠️  Note: You may need to restart your terminal or run 'source $SHELL_PROFILE' to use the API key in new sessions"
