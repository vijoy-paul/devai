"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewCommand = createReviewCommand;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const geminiClient_1 = require("../geminiClient");
const fileUtils_1 = require("../fileUtils");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Helper function to detect if first argument is a path or instruction
function parseReviewArguments(args) {
    if (args.length === 0) {
        throw new Error('Instruction is required');
    }
    if (args.length === 1) {
        // Only instruction provided, use current directory
        return { instruction: args[0], projectPath: process.cwd() };
    }
    // Check if first argument looks like a path
    const firstArg = args[0];
    const isPath = firstArg.startsWith('./') ||
        firstArg.startsWith('../') ||
        firstArg.startsWith('/') ||
        (firstArg.includes('/') && !firstArg.includes(' ')) ||
        fs.existsSync(path.resolve(firstArg));
    if (isPath) {
        // Old format: path first, then instruction
        return { instruction: args[1], projectPath: firstArg };
    }
    else {
        // New format: instruction first, then optional path
        return { instruction: firstArg, projectPath: args[1] || process.cwd() };
    }
}
function createReviewCommand() {
    const command = new commander_1.Command('review');
    command
        .description('Review code files using AI')
        .argument('[instruction-or-path]', 'Review instruction for the AI or path to project directory')
        .argument('[path-or-instruction]', 'Path to project directory or review instruction for the AI')
        .option('-f, --file <file>', 'Review specific file instead of entire project')
        .action(async (arg1, arg2, options) => {
        try {
            // Parse arguments intelligently
            const args = [arg1, arg2].filter(Boolean);
            const { instruction, projectPath } = parseReviewArguments(args);
            await handleReviewCommand(projectPath, instruction, options);
        }
        catch (error) {
            console.error(chalk_1.default.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
        }
    });
    return command;
}
async function handleReviewCommand(projectPath, instruction, options) {
    console.log(chalk_1.default.blue('🔍 devai terminal - Review Mode'));
    console.log(chalk_1.default.gray(`Project: ${projectPath}`));
    console.log(chalk_1.default.gray(`Review Instruction: ${instruction}`));
    console.log('');
    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required. Please set it with your Gemini API key.');
    }
    // Initialize Gemini client
    const geminiClient = new geminiClient_1.GeminiClient(apiKey);
    if (options.file) {
        // Review specific file
        await reviewSpecificFile(geminiClient, projectPath, options.file, instruction);
    }
    else {
        // Review entire project
        await reviewProject(geminiClient, projectPath, instruction);
    }
}
async function reviewSpecificFile(geminiClient, projectPath, filePath, instruction) {
    const fullPath = `${projectPath}/${filePath}`;
    console.log(chalk_1.default.yellow(`📄 Reading file: ${filePath}`));
    try {
        const content = await fileUtils_1.FileUtils.readFile(fullPath);
        console.log(chalk_1.default.blue(`\n🔍 Reviewing: ${filePath}`));
        console.log(chalk_1.default.gray('─'.repeat(50)));
        const review = await geminiClient.reviewCode(content, instruction, filePath);
        console.log(chalk_1.default.white(review));
        console.log(chalk_1.default.gray('─'.repeat(50)));
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error reviewing ${filePath}:`), error instanceof Error ? error.message : 'Unknown error');
    }
}
async function reviewProject(geminiClient, projectPath, instruction) {
    console.log(chalk_1.default.yellow('📁 Reading project files...'));
    const files = await fileUtils_1.FileUtils.readProjectFiles(projectPath);
    if (files.length === 0) {
        throw new Error('No supported files found in the project directory');
    }
    console.log(chalk_1.default.green(`✅ Found ${files.length} files`));
    // Filter relevant files based on instruction
    const relevantFiles = filterRelevantFiles(files, instruction);
    if (relevantFiles.length === 0) {
        console.log(chalk_1.default.yellow('⚠️  No files seem relevant to the instruction. Reviewing first few files...'));
        // Review first few files if none seem relevant
        await reviewFiles(geminiClient, files.slice(0, 3), instruction);
    }
    else {
        console.log(chalk_1.default.blue(`🎯 Found ${relevantFiles.length} potentially relevant files`));
        await reviewFiles(geminiClient, relevantFiles, instruction);
    }
}
async function reviewFiles(geminiClient, files, instruction) {
    for (const file of files) {
        console.log(chalk_1.default.blue(`\n🔍 Reviewing: ${file.path}`));
        console.log(chalk_1.default.gray('─'.repeat(50)));
        try {
            const review = await geminiClient.reviewCode(file.content, instruction, file.path);
            console.log(chalk_1.default.white(review));
            console.log(chalk_1.default.gray('─'.repeat(50)));
        }
        catch (error) {
            console.error(chalk_1.default.red(`Error reviewing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
function filterRelevantFiles(files, instruction) {
    const instructionLower = instruction.toLowerCase();
    const keywords = extractKeywords(instructionLower);
    return files.filter(file => {
        const fileName = file.path.toLowerCase();
        const fileContent = file.content.toLowerCase();
        // Check if filename or content contains relevant keywords
        return keywords.some(keyword => fileName.includes(keyword) || fileContent.includes(keyword));
    });
}
function extractKeywords(instruction) {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'this', 'that', 'these', 'those'];
    return instruction
        .split(/\s+/)
        .filter(word => word.length > 2 && !commonWords.includes(word))
        .map(word => word.replace(/[^\w]/g, '')); // Remove punctuation
}
//# sourceMappingURL=review.js.map