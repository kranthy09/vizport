'use client';

import { GitHubFile } from '@/types';
import { useFileContent } from '@/hooks/useFileContent';
import { ImageViewer } from './ImageViewer';
import { MermaidRenderer } from './MermaidRenderer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Loader2 } from 'lucide-react';

interface ViewerProps {
  file: GitHubFile | null;
}

export function Viewer({ file }: ViewerProps) {
  const { content, loading, error } = useFileContent(
    file?.fileType === 'image' ? null : file?.rawUrl || null
  );

  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-zinc-500 text-lg">Select a file to view</p>
          <p className="text-zinc-600 text-sm mt-2">
            Choose from the sidebar to see images, diagrams, or markdown
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (error && file.fileType !== 'image') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950 p-8">
        <div className="text-center">
          <p className="text-red-400 font-bold">Error loading file</p>
          <p className="text-zinc-500 text-sm mt-2">{error.message}</p>
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

  // Fallback
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <p className="text-zinc-500">Unable to render file type</p>
    </div>
  );
}
