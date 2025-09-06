"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditCommand = createEditCommand;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const geminiClient_1 = require("../geminiClient");
const fileUtils_1 = require("../fileUtils");
function createEditCommand() {
    const command = new commander_1.Command('edit');
    command
        .description('Edit code files using AI')
        .argument('<project-path>', 'Path to the project directory')
        .argument('<instruction>', 'Instruction for the AI to edit the code')
        .option('-p, --preview', 'Show preview of changes before applying')
        .option('-f, --force', 'Skip confirmation prompts')
        .action(async (projectPath, instruction, options) => {
        try {
            await handleEditCommand(projectPath, instruction, options);
        }
        catch (error) {
            console.error(chalk_1.default.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
        }
    });
    return command;
}
async function handleEditCommand(projectPath, instruction, options) {
    console.log(chalk_1.default.blue('🤖 devai terminal - Edit Mode'));
    console.log(chalk_1.default.gray(`Project: ${projectPath}`));
    console.log(chalk_1.default.gray(`Instruction: ${instruction}`));
    console.log('');
    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required. Please set it with your Gemini API key.');
    }
    // Initialize Gemini client
    const geminiClient = new geminiClient_1.GeminiClient(apiKey);
    // Read project files
    console.log(chalk_1.default.yellow('📁 Reading project files...'));
    const files = await fileUtils_1.FileUtils.readProjectFiles(projectPath);
    if (files.length === 0) {
        throw new Error('No supported files found in the project directory');
    }
    console.log(chalk_1.default.green(`✅ Found ${files.length} files`));
    // Filter files that might be relevant to the instruction
    const relevantFiles = filterRelevantFiles(files, instruction);
    if (relevantFiles.length === 0) {
        console.log(chalk_1.default.yellow('⚠️  No files seem relevant to the instruction. Processing all files...'));
        // Process all files if none seem relevant
        await processAllFiles(geminiClient, files, instruction, projectPath, options);
    }
    else {
        console.log(chalk_1.default.blue(`🎯 Found ${relevantFiles.length} potentially relevant files`));
        await processRelevantFiles(geminiClient, relevantFiles, instruction, projectPath, options);
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
async function processRelevantFiles(geminiClient, files, instruction, projectPath, options) {
    for (const file of files) {
        console.log(chalk_1.default.blue(`\n📝 Processing: ${file.path}`));
        try {
            const response = await geminiClient.editCode({
                code: file.content,
                instruction,
                filePath: file.path
            });
            if (response.modifiedCode !== file.content) {
                await handleFileEdit(file, response.modifiedCode, projectPath, options);
            }
            else {
                console.log(chalk_1.default.gray('  No changes needed'));
            }
        }
        catch (error) {
            console.error(chalk_1.default.red(`  Error processing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
async function processAllFiles(geminiClient, files, instruction, projectPath, options) {
    // For now, just process the first few files to avoid overwhelming the API
    const filesToProcess = files.slice(0, 5);
    console.log(chalk_1.default.yellow(`⚠️  Processing first ${filesToProcess.length} files to avoid API limits`));
    for (const file of filesToProcess) {
        console.log(chalk_1.default.blue(`\n📝 Processing: ${file.path}`));
        try {
            const response = await geminiClient.editCode({
                code: file.content,
                instruction,
                filePath: file.path
            });
            if (response.modifiedCode !== file.content) {
                await handleFileEdit(file, response.modifiedCode, projectPath, options);
            }
            else {
                console.log(chalk_1.default.gray('  No changes needed'));
            }
        }
        catch (error) {
            console.error(chalk_1.default.red(`  Error processing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
async function handleFileEdit(file, modifiedCode, projectPath, options) {
    const fullPath = `${projectPath}/${file.path}`;
    // Show diff
    if (options.preview) {
        console.log(chalk_1.default.blue('\n📋 Preview of changes:'));
        fileUtils_1.FileUtils.displayColoredDiff(file.content, modifiedCode, file.path);
    }
    // Show explanation if available
    // Note: We'd need to modify the GeminiClient to return explanations
    // Confirmation
    if (!options.force) {
        const { confirm } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Apply changes to ${file.path}?`,
                default: false
            }
        ]);
        if (!confirm) {
            console.log(chalk_1.default.yellow('  Skipped'));
            return;
        }
    }
    // Write file
    try {
        await fileUtils_1.FileUtils.writeFile(fullPath, modifiedCode);
        console.log(chalk_1.default.green(`  ✅ Updated ${file.path}`));
    }
    catch (error) {
        console.error(chalk_1.default.red(`  Failed to write ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
    }
}
//# sourceMappingURL=edit.js.map