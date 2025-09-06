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
exports.FileUtils = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const diff_1 = require("diff");
const chalk_1 = __importDefault(require("chalk"));
class FileUtils {
    static async readProjectFiles(projectPath) {
        const files = [];
        const absolutePath = path.resolve(projectPath);
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`Project path does not exist: ${absolutePath}`);
        }
        await this.scanDirectory(absolutePath, files, absolutePath);
        return files;
    }
    static async readFile(filePath) {
        const absolutePath = path.resolve(filePath);
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File does not exist: ${absolutePath}`);
        }
        const stats = fs.statSync(absolutePath);
        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${absolutePath}`);
        }
        if (this.isBinaryFile(absolutePath)) {
            throw new Error(`Cannot read binary file: ${absolutePath}`);
        }
        if (stats.size > this.MAX_FILE_SIZE) {
            throw new Error(`File too large (${stats.size} bytes): ${absolutePath}`);
        }
        return fs.readFileSync(absolutePath, 'utf-8');
    }
    static async writeFile(filePath, content) {
        const absolutePath = path.resolve(filePath);
        const dir = path.dirname(absolutePath);
        // Ensure directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(absolutePath, content, 'utf-8');
    }
    static generateDiff(original, modified, filePath) {
        const changes = (0, diff_1.diffLines)(original, modified);
        let diffOutput = `\n--- ${filePath}\n+++ ${filePath}\n`;
        changes.forEach(change => {
            if (change.added) {
                diffOutput += change.value
                    .split('\n')
                    .map(line => line ? `+${line}` : '+')
                    .join('\n') + '\n';
            }
            else if (change.removed) {
                diffOutput += change.value
                    .split('\n')
                    .map(line => line ? `-${line}` : '-')
                    .join('\n') + '\n';
            }
            else {
                diffOutput += change.value;
            }
        });
        return diffOutput;
    }
    static displayColoredDiff(original, modified, filePath) {
        const changes = (0, diff_1.diffLines)(original, modified);
        console.log(chalk_1.default.blue(`\n--- ${filePath}`));
        console.log(chalk_1.default.blue(`+++ ${filePath}`));
        changes.forEach(change => {
            if (change.added) {
                const lines = change.value.split('\n');
                lines.forEach(line => {
                    if (line) {
                        console.log(chalk_1.default.green(`+${line}`));
                    }
                    else {
                        console.log(chalk_1.default.green('+'));
                    }
                });
            }
            else if (change.removed) {
                const lines = change.value.split('\n');
                lines.forEach(line => {
                    if (line) {
                        console.log(chalk_1.default.red(`-${line}`));
                    }
                    else {
                        console.log(chalk_1.default.red('-'));
                    }
                });
            }
            else {
                // Context lines - show a few for reference
                const lines = change.value.split('\n');
                const contextLines = lines.slice(0, 3); // Show max 3 context lines
                contextLines.forEach(line => {
                    if (line) {
                        console.log(` ${line}`);
                    }
                });
                if (lines.length > 3) {
                    console.log(chalk_1.default.gray(`... (${lines.length - 3} more context lines)`));
                }
            }
        });
    }
    static shouldIgnoreFile(filePath) {
        const relativePath = path.relative(process.cwd(), filePath);
        return this.IGNORE_PATTERNS.some(pattern => {
            if (pattern.includes('*')) {
                const regex = new RegExp(pattern.replace(/\*/g, '.*'));
                return regex.test(relativePath) || regex.test(path.basename(filePath));
            }
            return relativePath.includes(pattern) || path.basename(filePath) === pattern;
        });
    }
    static isBinaryFile(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return this.BINARY_EXTENSIONS.includes(ext);
    }
    static getSupportedFileExtensions() {
        return [
            '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte',
            '.py', '.java', '.c', '.cpp', '.h', '.hpp',
            '.cs', '.php', '.rb', '.go', '.rs', '.swift',
            '.kt', '.scala', '.clj', '.hs', '.ml', '.fs',
            '.html', '.css', '.scss', '.sass', '.less',
            '.json', '.xml', '.yaml', '.yml', '.toml',
            '.md', '.txt', '.sql', '.sh', '.bash', '.zsh',
            '.dockerfile', '.dockerignore', '.gitignore'
        ];
    }
    static async scanDirectory(dirPath, files, rootPath) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            const relativePath = path.relative(rootPath, fullPath);
            if (this.shouldIgnoreFile(fullPath)) {
                continue;
            }
            if (entry.isDirectory()) {
                await this.scanDirectory(fullPath, files, rootPath);
            }
            else if (entry.isFile()) {
                if (this.isBinaryFile(fullPath)) {
                    continue;
                }
                const stats = fs.statSync(fullPath);
                if (stats.size > this.MAX_FILE_SIZE) {
                    console.warn(`Skipping large file: ${relativePath} (${stats.size} bytes)`);
                    continue;
                }
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    files.push({
                        path: relativePath,
                        content,
                        size: stats.size
                    });
                }
                catch (error) {
                    console.warn(`Failed to read file: ${relativePath}`);
                }
            }
        }
    }
}
exports.FileUtils = FileUtils;
FileUtils.IGNORE_PATTERNS = [
    'node_modules',
    '.git',
    '.env',
    '.env.*',
    'dist',
    'build',
    'coverage',
    '.DS_Store',
    '*.log',
    '*.pid',
    '*.seed',
    '*.pid.lock'
];
FileUtils.MAX_FILE_SIZE = 1024 * 1024; // 1MB
FileUtils.BINARY_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.mp4', '.avi', '.mov', '.wmv', '.flv',
    '.mp3', '.wav', '.flac', '.aac',
    '.zip', '.rar', '.7z', '.tar', '.gz',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.exe', '.dll', '.so', '.dylib'
];
//# sourceMappingURL=fileUtils.js.map