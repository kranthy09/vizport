export type FileType = 'image' | 'mermaid' | 'markdown' | 'unknown';

export interface GitHubFile {
  path: string;           // e.g., "diagrams/flow.mmd"
  name: string;           // e.g., "flow.mmd"
  sha: string;
  type: 'blob' | 'tree';
  rawUrl: string;         // GitHub raw content URL
  fileType: FileType;
}

export interface FileTreeResponse {
  sha: string;
  url: string;
  tree: Array<{
    path: string;
    mode: string;
    type: 'blob' | 'tree';
    sha: string;
    size?: number;
    url: string;
  }>;
  truncated: boolean;
}
