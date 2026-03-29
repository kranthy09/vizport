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
