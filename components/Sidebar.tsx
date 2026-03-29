'use client';

import { useState, useMemo } from 'react';
import { GitHubFile } from '@/types';
import { FileItem } from './FileItem';
import {
  Search,
  Loader2,
  ChevronDown,
  Image,
  GitGraph,
  FileText,
  PenLine,
  X,
} from 'lucide-react';

interface SidebarProps {
  files: GitHubFile[];
  loading: boolean;
  activeFile: GitHubFile | null;
  onFileSelect: (file: GitHubFile) => void;
}

type FileType = 'image' | 'mermaid' | 'markdown' | 'excalidraw';

export function Sidebar({
  files,
  loading,
  activeFile,
  onFileSelect,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({
    image: true,
    mermaid: true,
    markdown: true,
    excalidraw: true,
  });

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    const query = searchQuery.toLowerCase();
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.path.toLowerCase().includes(query)
    );
  }, [files, searchQuery]);

  const groupedFiles = useMemo(() => {
    const groups: Record<FileType, GitHubFile[]> = {
      image: [],
      mermaid: [],
      markdown: [],
      excalidraw: [],
    };
    filteredFiles.forEach((file) => {
      const fileType = file.fileType as FileType;
      if (fileType in groups) {
        groups[fileType].push(file);
      }
    });
    return groups;
  }, [filteredFiles]);

  const toggleGroup = (group: FileType) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const groupConfig = {
    image: {
      label: 'Images',
      icon: Image,
      color: '#ff6b9d',
      bgColor: 'rgba(244, 63, 94, 0.1)',
    },
    mermaid: {
      label: 'Diagrams',
      icon: GitGraph,
      color: '#c084fc',
      bgColor: 'rgba(168, 85, 247, 0.1)',
    },
    markdown: {
      label: 'Documents',
      icon: FileText,
      color: '#86efac',
      bgColor: 'rgba(34, 197, 94, 0.1)',
    },
    excalidraw: {
      label: 'Drawings',
      icon: PenLine,
      color: '#fdba74',
      bgColor: 'rgba(251, 146, 60, 0.1)',
    },
  };

  return (
    <aside
      className="w-72 flex flex-col h-full border-r flex-shrink-0 animate-slideInRight"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* ===== Search ===== */}
      <div
        className="px-4 py-4 border-b transition-smooth"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="relative group">
          <Search
            size={16}
            className="absolute left-3 top-3 transition-smooth"
            style={{ color: 'var(--text-tertiary)' }}
          />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 rounded-lg border transition-smooth text-sm"
            style={{
              backgroundColor: 'var(--bg-base)',
              borderColor: searchQuery
                ? 'var(--accent)'
                : 'var(--border)',
              color: 'var(--text-primary)',
            }}
            aria-label="Search files"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2.5 p-1 rounded transition-smooth"
              style={{
                color: 'var(--text-tertiary)',
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ===== File List ===== */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Loader2
              className="w-5 h-5 animate-spin"
              style={{ color: 'var(--accent)' }}
            />
            <p style={{ color: 'var(--text-muted)' }} className="text-xs">
              Loading files...
            </p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              {files.length === 0
                ? 'No files in repository'
                : 'No matches found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(Object.keys(groupConfig) as FileType[]).map((groupKey) => {
              const group = groupConfig[groupKey];
              const groupFiles = groupedFiles[groupKey];
              const isExpanded = expandedGroups[groupKey];

              if (groupFiles.length === 0) return null;

              const IconComponent = group.icon;

              return (
                <div key={groupKey}>
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth hover:bg-[var(--bg-hover)]"
                    style={{ color: group.color }}
                    aria-expanded={isExpanded}
                  >
                    <IconComponent size={18} />
                    <span className="flex-1 text-left font-semibold text-base">
                      {group.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium transition-smooth"
                      style={{
                        backgroundColor: group.bgColor,
                        color: group.color,
                        border: `1px solid ${group.color}40`,
                      }}
                    >
                      {groupFiles.length}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isExpanded ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </button>

                  {/* Group Items */}
                  {isExpanded && (
                    <div className="mt-2 space-y-1.5 pl-2 animate-scaleIn">
                      {groupFiles.map((file) => (
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
              );
            })}
          </div>
        )}
      </div>

      {/* ===== Footer ===== */}
      <div
        className="border-t px-6 py-4 text-xs transition-smooth"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        <div className="flex items-center justify-between">
          <span>
            {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
          </span>
          <span className="text-[var(--text-tertiary)]">
            {files.length} total
          </span>
        </div>
      </div>
    </aside>
  );
}
