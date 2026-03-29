'use client';

import { useState, useMemo } from 'react';
import { GitHubFile } from '@/types';
import { FileItem } from './FileItem';
import { Search, Loader2 } from 'lucide-react';

interface SidebarProps {
  files: GitHubFile[];
  loading: boolean;
  activeFile: GitHubFile | null;
  onFileSelect: (file: GitHubFile) => void;
}

export function Sidebar({
  files,
  loading,
  activeFile,
  onFileSelect,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;

    const query = searchQuery.toLowerCase();
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.path.toLowerCase().includes(query)
    );
  }, [files, searchQuery]);

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-lg font-bold text-zinc-100 mb-3">VizPort</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center text-zinc-500 text-sm py-8">
            {files.length === 0
              ? 'No files found in repository'
              : 'No files match your search'}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredFiles.map((file) => (
              <FileItem
                key={file.sha}
                file={file}
                isActive={activeFile?.sha === file.sha}
                onClick={() => onFileSelect(file)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
        {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
      </div>
    </aside>
  );
}
