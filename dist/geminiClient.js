"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiClient = void 0;
const generative_ai_1 = require("@google/generative-ai");
class GeminiClient {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY environment variable is required');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
    async editCode(request) {
        const prompt = this.buildEditPrompt(request);
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return this.parseResponse(text, request.filePath);
        }
        catch (error) {
            throw new Error(`Failed to edit code: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async reviewCode(code, instruction, filePath) {
        const prompt = this.buildReviewPrompt(code, instruction, filePath);
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            throw new Error(`Failed to review code: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    buildEditPrompt(request) {
        return `You are an expert software developer. I need you to edit the following code based on the user's instruction.

File: ${request.filePath}
User Instruction: ${request.instruction}

Current Code:
\`\`\`${this.getFileExtension(request.filePath)}
${request.code}
\`\`\`

Please provide the modified code that fulfills the user's instruction. Follow these guidelines:
1. Maintain the existing code style and formatting
2. Only make the changes requested by the user
3. Preserve all existing functionality unless explicitly asked to change it
4. Add appropriate comments if the changes are complex
5. Ensure the code is syntactically correct

IMPORTANT: Respond with ONLY the complete modified code wrapped in \`\`\`${this.getFileExtension(request.filePath)} code blocks. Do not include any explanations, comments, or additional text outside the code blocks.`;
    }
    buildReviewPrompt(code, instruction, filePath) {
        return `You are an expert code reviewer. Please review the following code based on the user's instruction.

File: ${filePath}
Review Instruction: ${instruction}

Code to Review:
\`\`\`
${code}
\`\`\`

Please provide a detailed review addressing the specific instruction. Include:
1. Issues found (if any)
2. Suggestions for improvement
3. Best practices recommendations
4. Any potential bugs or security concerns

Be specific and actionable in your feedback.`;
    }
    parseResponse(response, filePath) {
        // Try to extract code from markdown code blocks
        const fileExt = this.getFileExtension(filePath);
        const codeBlockRegex = new RegExp(`\`\`\`${fileExt}[\\s\\S]*?\`\`\``, 'g');
        const genericCodeBlockRegex = /```[\s\S]*?```/g;
        let matches = response.match(codeBlockRegex);
        // If no specific language code block found, try generic code blocks
        if (!matches || matches.length === 0) {
            matches = response.match(genericCodeBlockRegex);
        }
        if (!matches || matches.length === 0) {
            // If no code blocks found, assume the entire response is the code
            console.log('No code blocks found, using entire response as code');
            return {
                modifiedCode: response.trim(),
                explanation: undefined
            };
        }
        // Get the last code block (in case there are multiple)
        const codeBlock = matches[matches.length - 1];
        const modifiedCode = codeBlock
            .replace(/```[\w]*/, '') // Remove opening code block with optional language
            .replace(/```$/, '') // Remove closing code block
            .trim();
        return {
            modifiedCode,
            explanation: response.replace(codeBlockRegex, '').replace(genericCodeBlockRegex, '').trim() || undefined
        };
    }
    getFileExtension(filePath) {
        const ext = filePath.split('.').pop()?.toLowerCase();
        return ext || 'txt';
    }
}
exports.GeminiClient = GeminiClient;
//# sourceMappingURL=geminiClient.js.map