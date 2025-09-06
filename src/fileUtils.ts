import * as fs from 'fs';
import * as path from 'path';
import { diffLines } from 'diff';
import chalk from 'chalk';

export interface FileInfo {
  path: string;
  content: string;
  size: number;
}

export class FileUtils {
  private static readonly IGNORE_PATTERNS = [
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

  private static readonly MAX_FILE_SIZE = 1024 * 1024; // 1MB
  private static readonly BINARY_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.mp4', '.avi', '.mov', '.wmv', '.flv',
    '.mp3', '.wav', '.flac', '.aac',
    '.zip', '.rar', '.7z', '.tar', '.gz',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.exe', '.dll', '.so', '.dylib'
  ];

  static async readProjectFiles(projectPath: string): Promise<FileInfo[]> {
    const files: FileInfo[] = [];
    const absolutePath = path.resolve(projectPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Project path does not exist: ${absolutePath}`);
    }

    await this.scanDirectory(absolutePath, files, absolutePath);
    return files;
  }

  static async readFile(filePath: string): Promise<string> {
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

  static async writeFile(filePath: string, content: string): Promise<void> {
    const absolutePath = path.resolve(filePath);
    const dir = path.dirname(absolutePath);
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(absolutePath, content, 'utf-8');
  }

  static generateDiff(original: string, modified: string, filePath: string): string {
    const changes = diffLines(original, modified);
    let diffOutput = `\n--- ${filePath}\n+++ ${filePath}\n`;

    changes.forEach(change => {
      if (change.added) {
        diffOutput += change.value
          .split('\n')
          .map(line => line ? `+${line}` : '+')
          .join('\n') + '\n';
      } else if (change.removed) {
        diffOutput += change.value
          .split('\n')
          .map(line => line ? `-${line}` : '-')
          .join('\n') + '\n';
      } else {
        diffOutput += change.value;
      }
    });

    return diffOutput;
  }

  static displayColoredDiff(original: string, modified: string, filePath: string): void {
    const changes = diffLines(original, modified);
    
    console.log(chalk.blue(`\n--- ${filePath}`));
    console.log(chalk.blue(`+++ ${filePath}`));

    changes.forEach(change => {
      if (change.added) {
        const lines = change.value.split('\n');
        lines.forEach(line => {
          if (line) {
            console.log(chalk.green(`+${line}`));
          } else {
            console.log(chalk.green('+'));
          }
        });
      } else if (change.removed) {
        const lines = change.value.split('\n');
        lines.forEach(line => {
          if (line) {
            console.log(chalk.red(`-${line}`));
          } else {
            console.log(chalk.red('-'));
          }
        });
      } else {
        // Context lines - show a few for reference
        const lines = change.value.split('\n');
        const contextLines = lines.slice(0, 3); // Show max 3 context lines
        contextLines.forEach(line => {
          if (line) {
            console.log(` ${line}`);
          }
        });
        if (lines.length > 3) {
          console.log(chalk.gray(`... (${lines.length - 3} more context lines)`));
        }
      }
    });
  }

  static shouldIgnoreFile(filePath: string): boolean {
    const relativePath = path.relative(process.cwd(), filePath);
    
    return this.IGNORE_PATTERNS.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(relativePath) || regex.test(path.basename(filePath));
      }
      return relativePath.includes(pattern) || path.basename(filePath) === pattern;
    });
  }

  static isBinaryFile(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return this.BINARY_EXTENSIONS.includes(ext);
  }

  static getSupportedFileExtensions(): string[] {
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

  private static async scanDirectory(dirPath: string, files: FileInfo[], rootPath: string): Promise<void> {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(rootPath, fullPath);

      if (this.shouldIgnoreFile(fullPath)) {
        continue;
      }

      if (entry.isDirectory()) {
        await this.scanDirectory(fullPath, files, rootPath);
      } else if (entry.isFile()) {
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
        } catch (error) {
          console.warn(`Failed to read file: ${relativePath}`);
        }
      }
    }
  }
}
