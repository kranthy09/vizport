'use client';

import dynamic from 'next/dynamic';
import { GitHubFile } from '@/types';
import { useFileContent } from '@/hooks/useFileContent';
import { ImageViewer } from './ImageViewer';
import { MermaidRenderer } from './MermaidRenderer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { FileQuestion, AlertTriangle } from 'lucide-react';

const ExcalidrawViewer = dynamic(
  () => import('./ExcalidrawViewer').then((m) => m.ExcalidrawViewer),
  { ssr: false }
);

interface ViewerProps {
  file: GitHubFile | null;
}

export function Viewer({ file }: ViewerProps) {
  const { content, loading, error } = useFileContent(
    file?.fileType === 'image' ? null : file?.rawUrl || null
  );



  if (!file) {
    return (
      <div
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-md">
          <div className="mb-6 flex justify-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center glow"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              }}
            >
              <FileQuestion size={40} className="text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
            No File Selected
          </h2>
          <p style={{ color: 'var(--text-tertiary)' }} className="leading-relaxed">
            Select a file from the sidebar to begin exploring your diagrams,
            images, and documents
          </p>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">
              💡 Tip: Use the search to quickly find files
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-8 relative"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        {/* Subtle animated background */}
        <div
          className="absolute inset-0 opacity-5 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 50%)',
          }}
        />

        <div className="relative z-10 w-full max-w-xl space-y-4">
          <div
            className="h-12 skeleton-shimmer rounded-lg"
            style={{ animation: 'shimmer 2s infinite 0s' }}
          />
          <div
            className="h-64 skeleton-shimmer rounded-lg"
            style={{ animation: 'shimmer 2s infinite 0.2s' }}
          />
          <div
            className="h-12 skeleton-shimmer rounded-lg"
            style={{ animation: 'shimmer 2s infinite 0.4s' }}
          />
        </div>
      </div>
    );
  }

  if (error && file.fileType !== 'image') {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-8"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div
          className="rounded-xl p-8 max-w-md glass transition-smooth"
          style={{
            borderColor: 'rgba(255, 107, 107, 0.3)',
            borderWidth: '1px',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(255, 107, 107, 0.15)',
              }}
            >
              <AlertTriangle
                size={24}
                style={{ color: 'var(--error)' }}
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1">
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--error)' }}
              >
                Failed to Load
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {error.message}
              </p>
              <p
                className="text-xs mt-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Try selecting another file or refreshing the page
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Image files don't need content fetching
  if (file.fileType === 'image') {
    const isSvg = file.name.endsWith('.svg');
    return (
      <ImageViewer
        src={file.rawUrl}
        alt={file.name}
        isSvg={isSvg}
        svgContent={isSvg && content ? content : undefined}
      />
    );
  }

  // Mermaid diagrams
  if (file.fileType === 'mermaid' && content) {
    return <MermaidRenderer content={content} />;
  }

  // Markdown files
  if (file.fileType === 'markdown' && content) {
    return <MarkdownRenderer content={content} />;
  }

  // Excalidraw drawings
  if (file.fileType === 'excalidraw' && content) {
    return <ExcalidrawViewer content={content} />;
  }

  // Fallback
  return (
    <div
      className="w-full h-full flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="text-center">
        <p style={{ color: 'var(--text-secondary)' }}>
          Unable to render file type
        </p>
      </div>
    </div>
  );
}
