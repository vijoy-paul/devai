import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { GeminiClient } from '../geminiClient';
import { FileUtils, FileInfo } from '../fileUtils';

interface EditOptions {
  preview?: boolean;
  force?: boolean;
}

export function createEditCommand(): Command {
  const command = new Command('edit');
  
  command
    .description('Edit code files using AI')
    .argument('<project-path>', 'Path to the project directory')
    .argument('<instruction>', 'Instruction for the AI to edit the code')
    .option('-p, --preview', 'Show preview of changes before applying')
    .option('-f, --force', 'Skip confirmation prompts')
    .action(async (projectPath: string, instruction: string, options: EditOptions) => {
      try {
        await handleEditCommand(projectPath, instruction, options);
      } catch (error) {
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });

  return command;
}

async function handleEditCommand(projectPath: string, instruction: string, options: EditOptions): Promise<void> {
  console.log(chalk.blue('🤖 devai terminal - Edit Mode'));
  console.log(chalk.gray(`Project: ${projectPath}`));
  console.log(chalk.gray(`Instruction: ${instruction}`));
  console.log('');

  // Check for API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required. Please set it with your Gemini API key.');
  }

  // Initialize Gemini client
  const geminiClient = new GeminiClient(apiKey);

  // Read project files
  console.log(chalk.yellow('📁 Reading project files...'));
  const files = await FileUtils.readProjectFiles(projectPath);
  
  if (files.length === 0) {
    throw new Error('No supported files found in the project directory');
  }

  console.log(chalk.green(`✅ Found ${files.length} files`));

  // Filter files that might be relevant to the instruction
  const relevantFiles = filterRelevantFiles(files, instruction);
  
  if (relevantFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No files seem relevant to the instruction. Processing all files...'));
    // Process all files if none seem relevant
    await processAllFiles(geminiClient, files, instruction, projectPath, options);
  } else {
    console.log(chalk.blue(`🎯 Found ${relevantFiles.length} potentially relevant files`));
    await processRelevantFiles(geminiClient, relevantFiles, instruction, projectPath, options);
  }
}

function filterRelevantFiles(files: FileInfo[], instruction: string): FileInfo[] {
  const instructionLower = instruction.toLowerCase();
  const keywords = extractKeywords(instructionLower);
  
  return files.filter(file => {
    const fileName = file.path.toLowerCase();
    const fileContent = file.content.toLowerCase();
    
    // Check if filename or content contains relevant keywords
    return keywords.some(keyword => 
      fileName.includes(keyword) || fileContent.includes(keyword)
    );
  });
}

function extractKeywords(instruction: string): string[] {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'this', 'that', 'these', 'those'];
  
  return instruction
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .map(word => word.replace(/[^\w]/g, '')); // Remove punctuation
}

async function processRelevantFiles(
  geminiClient: GeminiClient, 
  files: FileInfo[], 
  instruction: string, 
  projectPath: string, 
  options: EditOptions
): Promise<void> {
  for (const file of files) {
    console.log(chalk.blue(`\n📝 Processing: ${file.path}`));
    
    try {
      const response = await geminiClient.editCode({
        code: file.content,
        instruction,
        filePath: file.path
      });

      if (response.modifiedCode !== file.content) {
        await handleFileEdit(file, response.modifiedCode, projectPath, options);
      } else {
        console.log(chalk.gray('  No changes needed'));
      }
    } catch (error) {
      console.error(chalk.red(`  Error processing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
    }
  }
}

async function processAllFiles(
  geminiClient: GeminiClient, 
  files: FileInfo[], 
  instruction: string, 
  projectPath: string, 
  options: EditOptions
): Promise<void> {
  // For now, just process the first few files to avoid overwhelming the API
  const filesToProcess = files.slice(0, 5);
  
  console.log(chalk.yellow(`⚠️  Processing first ${filesToProcess.length} files to avoid API limits`));
  
  for (const file of filesToProcess) {
    console.log(chalk.blue(`\n📝 Processing: ${file.path}`));
    
    try {
      const response = await geminiClient.editCode({
        code: file.content,
        instruction,
        filePath: file.path
      });

      if (response.modifiedCode !== file.content) {
        await handleFileEdit(file, response.modifiedCode, projectPath, options);
      } else {
        console.log(chalk.gray('  No changes needed'));
      }
    } catch (error) {
      console.error(chalk.red(`  Error processing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
    }
  }
}

async function handleFileEdit(
  file: FileInfo, 
  modifiedCode: string, 
  projectPath: string, 
  options: EditOptions
): Promise<void> {
  const fullPath = `${projectPath}/${file.path}`;
  
  // Show diff
  if (options.preview) {
    console.log(chalk.blue('\n📋 Preview of changes:'));
    FileUtils.displayColoredDiff(file.content, modifiedCode, file.path);
  }

  // Show explanation if available
  // Note: We'd need to modify the GeminiClient to return explanations
  
  // Confirmation
  if (!options.force) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Apply changes to ${file.path}?`,
        default: false
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('  Skipped'));
      return;
    }
  }

  // Write file
  try {
    await FileUtils.writeFile(fullPath, modifiedCode);
    console.log(chalk.green(`  ✅ Updated ${file.path}`));
  } catch (error) {
    console.error(chalk.red(`  Failed to write ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
  }
}
