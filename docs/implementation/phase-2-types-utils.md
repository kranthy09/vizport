# Phase 2: Types & Utils — Data Structures & Helpers

**Duration:** ~10 minutes
**Goal:** Create TypeScript interfaces and utility functions for file handling and GitHub API

---

## Files to Create

- `src/types/index.ts`
- `src/lib/fileTypes.ts`
- `src/lib/github.ts`

---

## Step 1: Create `src/types/index.ts`

```bash
mkdir -p src/types
```

**File: `src/types/index.ts`**

```typescript
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
```

---

## Step 2: Create `src/lib/fileTypes.ts`

```bash
mkdir -p src/lib
```

**File: `src/lib/fileTypes.ts`**

```typescript
import { FileType } from '@/types';

const SUPPORTED_EXTENSIONS = {
  image: ['.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp'],
  mermaid: ['.mmd'],
  markdown: ['.md'],
};

export function getFileType(path: string): FileType {
  const ext = path.toLowerCase().slice(path.lastIndexOf('.'));

  if (SUPPORTED_EXTENSIONS.image.includes(ext)) {
    return 'image';
  }
  if (SUPPORTED_EXTENSIONS.mermaid.includes(ext)) {
    return 'mermaid';
  }
  if (SUPPORTED_EXTENSIONS.markdown.includes(ext)) {
    return 'markdown';
  }

  return 'unknown';
}

export function isSupportedFile(path: string): boolean {
  return getFileType(path) !== 'unknown';
}

export function getFileIcon(fileType: FileType): string {
  switch (fileType) {
    case 'image':
      return '🖼️';
    case 'mermaid':
      return '📊';
    case 'markdown':
      return '📝';
    default:
      return '📄';
  }
}
```

---

## Step 3: Create `src/lib/github.ts`

**File: `src/lib/github.ts`**

```typescript
import { GitHubFile, FileTreeResponse } from '@/types';
import { getFileType, isSupportedFile } from './fileTypes';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

export function buildRawUrl(
  owner: string,
  repo: string,
  branch: string,
  path: string
): string {
  return `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${path}`;
}

export async function fetchFileTree(
  owner: string,
  repo: string,
  branch: string,
  token?: string
): Promise<GitHubFile[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} - ${response.statusText}`
    );
  }

  const data: FileTreeResponse = await response.json();

  // Filter to supported files only (blobs, not trees)
  const files: GitHubFile[] = data.tree
    .filter((item) => item.type === 'blob' && isSupportedFile(item.path))
    .map((item) => ({
      path: item.path,
      name: item.path.split('/').pop() || item.path,
      sha: item.sha,
      type: item.type,
      rawUrl: buildRawUrl(owner, repo, branch, item.path),
      fileType: getFileType(item.path),
    }));

  return files;
}

export async function fetchFileContent(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  return response.text();
}
```

---

## Verification Checklist

- [ ] `src/types/index.ts` created with all interfaces
- [ ] `src/lib/fileTypes.ts` created with file type utilities
- [ ] `src/lib/github.ts` created with API helpers
- [ ] TypeScript compilation: `npx tsc --noEmit` (should pass)
- [ ] No import errors in IDE

---

## Test the Types

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 → no TypeScript errors in terminal

---

## Next Phase

Once types are created and verified, proceed to **Phase 3: Hooks**.

