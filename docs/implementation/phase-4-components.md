# Phase 4: Components — UI Rendering

**Duration:** ~25 minutes
**Goal:** Create all React components for file browsing and content rendering

---

## Files to Create

- `src/components/FileItem.tsx`
- `src/components/Sidebar.tsx`
- `src/components/ImageViewer.tsx`
- `src/components/MermaidRenderer.tsx`
- `src/components/MarkdownRenderer.tsx`
- `src/components/Viewer.tsx`

---

## Step 1: Create `src/components/FileItem.tsx`

```bash
mkdir -p src/components
```

**File: `src/components/FileItem.tsx`**

```typescript
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
```

---

## Step 2: Create `src/components/Sidebar.tsx`

**File: `src/components/Sidebar.tsx`**

```typescript
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
```

---

## Step 3: Create `src/components/ImageViewer.tsx`

**File: `src/components/ImageViewer.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
  isSvg?: boolean;
  svgContent?: string;
}

export function ImageViewer({
  src,
  alt,
  isSvg = false,
  svgContent,
}: ImageViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div className="w-full h-full flex items-center justify-center bg-zinc-950 cursor-pointer overflow-auto">
        {isSvg && svgContent ? (
          <div
            onClick={() => setIsFullscreen(true)}
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            onClick={() => setIsFullscreen(true)}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
          >
            <X className="w-6 h-6 text-zinc-100" />
          </button>

          <div className="w-full h-full flex items-center justify-center overflow-auto">
            {isSvg && svgContent ? (
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="w-full h-full flex items-center justify-center"
              />
            ) : (
              <img src={src} alt={alt} className="max-w-full max-h-full" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

---

## Step 4: Create `src/components/MermaidRenderer.tsx`

**File: `src/components/MermaidRenderer.tsx`**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  content: string;
}

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

export function MermaidRenderer({ content }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    const render = async () => {
      try {
        // Clear previous content
        containerRef.current!.innerHTML = '';

        const { svg } = await mermaid.render(
          `mermaid-${Date.now()}`,
          content
        );
        containerRef.current!.innerHTML = svg;
      } catch (error) {
        containerRef.current!.innerHTML = `
          <div style="color: #ef4444; padding: 16px;">
            <p style="font-weight: bold;">Mermaid Render Error</p>
            <p style="font-size: 12px; margin-top: 8px;">${
              error instanceof Error ? error.message : 'Unknown error'
            }</p>
          </div>
        `;
      }
    };

    render();
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-zinc-950 overflow-auto p-4"
    />
  );
}
```

---

## Step 5: Create `src/components/MarkdownRenderer.tsx`

**File: `src/components/MarkdownRenderer.tsx`**

```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mt-6 mb-4 text-zinc-100" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mt-5 mb-3 text-zinc-100" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-bold mt-4 mb-2 text-zinc-100" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="my-3 text-zinc-300 leading-relaxed" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 my-4 overflow-x-auto" {...props} />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code className="bg-zinc-900 px-2 py-1 rounded text-sm text-zinc-100" {...props} />
              ) : (
                <code className="text-zinc-100" {...props} />
              ),
            a: ({ node, ...props }) => (
              <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4" {...props} />
            ),
            table: ({ node, ...props }) => (
              <table className="border-collapse border border-zinc-700 w-full my-4" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="border border-zinc-700 bg-zinc-900 px-4 py-2 text-left" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-zinc-700 px-4 py-2" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
```

---

## Step 6: Create `src/components/Viewer.tsx`

**File: `src/components/Viewer.tsx`**

```typescript
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
```

---

## Verification Checklist

- [ ] All 6 component files created
- [ ] All components have `'use client'` directive
- [ ] All imports resolve correctly
- [ ] TypeScript compilation passes
- [ ] No warnings in IDE

---

## Test the Components

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 → you should see:
- Left sidebar with file list
- Search input in sidebar
- File count at bottom
- Click a file → content renders on right

---

## Next Phase

Once all components are working, proceed to **Phase 5: App Shell**.

