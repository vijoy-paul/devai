export interface CodeEditRequest {
    code: string;
    instruction: string;
    filePath: string;
}
export interface CodeEditResponse {
    modifiedCode: string;
    explanation?: string;
}
export declare class GeminiClient {
    private genAI;
    private modelName;
    constructor(apiKey: string);
    editCode(request: CodeEditRequest): Promise<CodeEditResponse>;
    reviewCode(code: string, instruction: string, filePath: string): Promise<string>;
    private buildEditPrompt;
    private buildReviewPrompt;
    private parseResponse;
    private getFileExtension;
}
//# sourceMappingURL=geminiClient.d.ts.map