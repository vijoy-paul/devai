#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createEditCommand } from './commands/edit';
import { createReviewCommand } from './commands/review';

const program = new Command();

program
  .name('devai')
  .description('AI-powered code editing and review tool using Gemini API')
  .version('1.1.0');

// Add commands
program.addCommand(createEditCommand());
program.addCommand(createReviewCommand());

// Global error handling
program.exitOverride();

try {
  program.parse();
} catch (error) {
  if (error instanceof Error) {
    console.error(chalk.red('Error:'), error.message);
  } else {
    console.error(chalk.red('An unexpected error occurred'));
  }
  process.exit(1);
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
