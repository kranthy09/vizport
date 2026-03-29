'use client';

import { GitHubFile } from '@/types';
import { getFileIcon } from '@/lib/fileTypes';

interface FileItemProps {
  file: GitHubFile;
  isActive: boolean;
  onClick: () => void;
}

export function FileItem({ file, isActive, onClick }: FileItemProps) {
  const icon = getFileIcon(file.fileType);
  const baseName = file.name.split('.').slice(0, -1).join('.');
  const ext = file.name.split('.').pop() || '';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
        isActive
          ? 'bg-zinc-700 text-zinc-100'
          : 'hover:bg-zinc-800 text-zinc-300'
      }`}
      title={file.path}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base flex-shrink-0">{icon}</span>
        <span className="truncate font-medium">{baseName}</span>
        <span className="text-xs bg-zinc-700 px-1.5 py-0.5 rounded flex-shrink-0">
          {ext}
        </span>
      </div>
    </button>
  );
}
