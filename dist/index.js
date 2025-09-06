#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const edit_1 = require("./commands/edit");
const review_1 = require("./commands/review");
const program = new commander_1.Command();
program
    .name('devai')
    .description('AI-powered code editing and review tool using Gemini API')
    .version('1.2.0');
// Add commands
program.addCommand((0, edit_1.createEditCommand)());
program.addCommand((0, review_1.createReviewCommand)());
try {
    program.parse();
}
catch (error) {
    if (error instanceof Error) {
        console.error(chalk_1.default.red('Error:'), error.message);
    }
    else {
        console.error(chalk_1.default.red('An unexpected error occurred'));
    }
    process.exit(1);
}
//# sourceMappingURL=index.js.map