export interface FileInfo {
    path: string;
    content: string;
    size: number;
}
export declare class FileUtils {
    private static readonly IGNORE_PATTERNS;
    private static readonly MAX_FILE_SIZE;
    private static readonly BINARY_EXTENSIONS;
    static readProjectFiles(projectPath: string): Promise<FileInfo[]>;
    static readFile(filePath: string): Promise<string>;
    static writeFile(filePath: string, content: string): Promise<void>;
    static generateDiff(original: string, modified: string, filePath: string): string;
    static displayColoredDiff(original: string, modified: string, filePath: string): void;
    static shouldIgnoreFile(filePath: string): boolean;
    static isBinaryFile(filePath: string): boolean;
    static getSupportedFileExtensions(): string[];
    private static scanDirectory;
}
//# sourceMappingURL=fileUtils.d.ts.map