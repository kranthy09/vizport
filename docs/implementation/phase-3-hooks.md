# Phase 3: Hooks — Data Fetching Logic

**Duration:** ~10 minutes
**Goal:** Create custom React hooks for fetching GitHub file tree and file content

---

## Files to Create

- `src/hooks/useGitHubFiles.ts`
- `src/hooks/useFileContent.ts`

---

## Step 1: Create `src/hooks/useGitHubFiles.ts`

```bash
mkdir -p src/hooks
```

**File: `src/hooks/useGitHubFiles.ts`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { GitHubFile } from '@/types';
import { fetchFileTree } from '@/lib/github';

interface UseGitHubFilesReturn {
  files: GitHubFile[];
  loading: boolean;
  error: Error | null;
}

export function useGitHubFiles(): UseGitHubFilesReturn {
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
        const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH;
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        if (!owner || !repo || !branch) {
          throw new Error('Missing GitHub environment variables');
        }

        const fileList = await fetchFileTree(owner, repo, branch, token);
        setFiles(fileList);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch files')
        );
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  return { files, loading, error };
}
```

---

## Step 2: Create `src/hooks/useFileContent.ts`

**File: `src/hooks/useFileContent.ts`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { fetchFileContent } from '@/lib/github';

interface UseFileContentReturn {
  content: string | null;
  loading: boolean;
  error: Error | null;
}

export function useFileContent(rawUrl: string | null): UseFileContentReturn {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!rawUrl) {
      setContent(null);
      setError(null);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        setContent(null);

        const fileContent = await fetchFileContent(rawUrl);
        setContent(fileContent);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch content')
        );
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [rawUrl]);

  return { content, loading, error };
}
```

---

## Key Points

| Hook | Purpose | Dependencies |
|------|---------|--------------|
| `useGitHubFiles` | Fetch file tree on component mount (once) | GitHub env vars, calls `fetchFileTree` |
| `useFileContent` | Fetch raw file content when URL changes | File URL changes, calls `fetchFileContent` |

**Important:**
- `'use client'` directive: Makes component client-side (required for hooks)
- `useGitHubFiles` runs ONCE on mount (empty dependency array)
- `useFileContent` re-runs when `rawUrl` changes

---

## Verification Checklist

- [ ] `src/hooks/useGitHubFiles.ts` created
- [ ] `src/hooks/useFileContent.ts` created
- [ ] Both files have `'use client'` directive
- [ ] TypeScript compilation passes
- [ ] No import errors in IDE

---

## Test the Hooks

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 → open DevTools (F12) → Network tab
- You should see API calls to `api.github.com` (fetching file tree)
- You should see calls to `raw.githubusercontent.com` (fetching file content)

**If no network calls appear:**
- Check `.env.local` has correct GitHub config
- Check browser console for errors
- Check GitHub repo is public

---

## Next Phase

Once hooks are working and calling GitHub API, proceed to **Phase 4: Components**.

