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
