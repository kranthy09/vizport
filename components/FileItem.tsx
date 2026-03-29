'use client';

import { GitHubFile } from '@/types';
import { Image, GitGraph, FileText, Copy } from 'lucide-react';
import { useState } from 'react';

interface FileItemProps {
  file: GitHubFile;
  isActive: boolean;
  onClick: () => void;
}

const getIconComponent = (fileType: string) => {
  switch (fileType) {
    case 'image':
      return Image;
    case 'mermaid':
      return GitGraph;
    case 'markdown':
      return FileText;
    default:
      return FileText;
  }
};

const getTypeColor = (fileType: string) => {
  switch (fileType) {
    case 'image':
      return { bg: 'rgba(244, 63, 94, 0.15)', text: '#ff6b9d' };
    case 'mermaid':
      return { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' };
    case 'markdown':
      return { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac' };
    default:
      return { bg: 'rgba(129, 140, 248, 0.15)', text: '#a5b4fc' };
  }
};

export function FileItem({ file, isActive, onClick }: FileItemProps) {
  const IconComponent = getIconComponent(file.fileType);
  const baseName = file.name.split('.').slice(0, -1).join('.');
  const ext = file.name.split('.').pop() || '';
  const [showCopied, setShowCopied] = useState(false);

  const colors = getTypeColor(file.fileType);
  const parts = file.path.split('/');
  const isInFolder = parts.length > 1;
  const folder = isInFolder ? parts.slice(0, -1).join('/') : '';

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(file.path);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`w-full text-left px-4 py-4 rounded-lg transition-smooth group relative cursor-pointer ${
        isActive
          ? 'bg-[var(--accent-dark)]/15 border-2 border-[var(--accent)]'
          : 'border-2 border-transparent hover:bg-[var(--bg-hover)]'
      }`}
      title={`Select ${baseName}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="flex items-start gap-3 min-w-0">
        {/* Icon */}
        <IconComponent
          size={22}
          className={`flex-shrink-0 mt-0.5 transition-smooth ${
            isActive ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
          }`}
          style={{ color: !isActive ? colors.text : undefined }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* File name */}
          <div className="flex items-baseline gap-2">
            <h3 className="font-semibold text-base text-[var(--text-primary)] truncate">
              {baseName}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded font-mono flex-shrink-0 transition-smooth"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.text}20`,
              }}
            >
              {ext}
            </span>
          </div>

          {/* Folder path - shown as tooltip on hover */}
          {isInFolder && (
            <div className="text-xs text-[var(--text-muted)] mt-1 truncate group-hover:text-[var(--text-tertiary)] transition-smooth">
              📁 {folder}
            </div>
          )}

          {/* File size info if available */}
          <div className="text-xs text-[var(--text-muted)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {file.path}
          </div>
        </div>

        {/* Copy button - hidden until hover */}
        <button
          onClick={handleCopyPath}
          className="flex-shrink-0 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-smooth hover:bg-[var(--accent)]/20"
          title="Copy path"
          aria-label="Copy file path"
        >
          <Copy
            size={14}
            className="text-[var(--text-tertiary)] hover:text-[var(--accent)]"
          />
        </button>
      </div>

      {/* Tooltip on copy */}
      {showCopied && (
        <div className="absolute -top-8 left-4 px-2 py-1 rounded text-xs font-medium bg-[var(--accent)] text-white whitespace-nowrap animate-slideInDown">
          Path copied!
        </div>
      )}
    </div>
  );
}
