'use client';

import { useState } from 'react';
import { GitHubFile } from '@/types';
import { useGitHubFiles } from '@/hooks/useGitHubFiles';
import { Sidebar } from '@/components/Sidebar';
import { Viewer } from '@/components/Viewer';

export default function Home() {
  const { files, loading, error } = useGitHubFiles();
  const [activeFile, setActiveFile] = useState<GitHubFile | null>(null);

  return (
    <div className="flex h-screen w-screen bg-zinc-950">
      {/* Sidebar */}
      <Sidebar
        files={files}
        loading={loading}
        activeFile={activeFile}
        onFileSelect={setActiveFile}
      />

      {/* Main Viewer */}
      <main className="flex-1 bg-zinc-950">
        {error ? (
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-red-400 font-bold text-lg">
                Failed to load files
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                {error.message}
              </p>
              <p className="text-zinc-600 text-xs mt-4">
                Check your GitHub environment variables in .env.local
              </p>
            </div>
          </div>
        ) : (
          <Viewer file={activeFile} />
        )}
      </main>
    </div>
  );
}
