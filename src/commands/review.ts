import { Command } from 'commander';
import chalk from 'chalk';
import { GeminiClient } from '../geminiClient';
import { FileUtils, FileInfo } from '../fileUtils';

interface ReviewOptions {
  file?: string;
}

export function createReviewCommand(): Command {
  const command = new Command('review');
  
  command
    .description('Review code files using AI')
    .argument('<project-path>', 'Path to the project directory')
    .argument('<instruction>', 'Review instruction for the AI')
    .option('-f, --file <file>', 'Review specific file instead of entire project')
    .action(async (projectPath: string, instruction: string, options: ReviewOptions) => {
      try {
        await handleReviewCommand(projectPath, instruction, options);
      } catch (error) {
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });

  return command;
}

async function handleReviewCommand(projectPath: string, instruction: string, options: ReviewOptions): Promise<void> {
  console.log(chalk.blue('🔍 devai terminal - Review Mode'));
  console.log(chalk.gray(`Project: ${projectPath}`));
  console.log(chalk.gray(`Review Instruction: ${instruction}`));
  console.log('');

  // Check for API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required. Please set it with your Gemini API key.');
  }

  // Initialize Gemini client
  const geminiClient = new GeminiClient(apiKey);

  if (options.file) {
    // Review specific file
    await reviewSpecificFile(geminiClient, projectPath, options.file, instruction);
  } else {
    // Review entire project
    await reviewProject(geminiClient, projectPath, instruction);
  }
}

async function reviewSpecificFile(
  geminiClient: GeminiClient, 
  projectPath: string, 
  filePath: string, 
  instruction: string
): Promise<void> {
  const fullPath = `${projectPath}/${filePath}`;
  
  console.log(chalk.yellow(`📄 Reading file: ${filePath}`));
  
  try {
    const content = await FileUtils.readFile(fullPath);
    
    console.log(chalk.blue(`\n🔍 Reviewing: ${filePath}`));
    console.log(chalk.gray('─'.repeat(50)));
    
    const review = await geminiClient.reviewCode(content, instruction, filePath);
    
    console.log(chalk.white(review));
    console.log(chalk.gray('─'.repeat(50)));
    
  } catch (error) {
    console.error(chalk.red(`Error reviewing ${filePath}:`), error instanceof Error ? error.message : 'Unknown error');
  }
}

async function reviewProject(
  geminiClient: GeminiClient, 
  projectPath: string, 
  instruction: string
): Promise<void> {
  console.log(chalk.yellow('📁 Reading project files...'));
  
  const files = await FileUtils.readProjectFiles(projectPath);
  
  if (files.length === 0) {
    throw new Error('No supported files found in the project directory');
  }

  console.log(chalk.green(`✅ Found ${files.length} files`));

  // Filter relevant files based on instruction
  const relevantFiles = filterRelevantFiles(files, instruction);
  
  if (relevantFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No files seem relevant to the instruction. Reviewing first few files...'));
    // Review first few files if none seem relevant
    await reviewFiles(geminiClient, files.slice(0, 3), instruction);
  } else {
    console.log(chalk.blue(`🎯 Found ${relevantFiles.length} potentially relevant files`));
    await reviewFiles(geminiClient, relevantFiles, instruction);
  }
}

async function reviewFiles(
  geminiClient: GeminiClient, 
  files: FileInfo[], 
  instruction: string
): Promise<void> {
  for (const file of files) {
    console.log(chalk.blue(`\n🔍 Reviewing: ${file.path}`));
    console.log(chalk.gray('─'.repeat(50)));
    
    try {
      const review = await geminiClient.reviewCode(file.content, instruction, file.path);
      console.log(chalk.white(review));
      console.log(chalk.gray('─'.repeat(50)));
    } catch (error) {
      console.error(chalk.red(`Error reviewing ${file.path}:`), error instanceof Error ? error.message : 'Unknown error');
    }
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
