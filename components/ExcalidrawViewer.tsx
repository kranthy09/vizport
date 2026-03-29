'use client';

import { useMemo, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { AlertCircle } from 'lucide-react';

interface ExcalidrawViewerProps {
  content: string;
}

export function ExcalidrawViewer({ content }: ExcalidrawViewerProps) {
  const [parseError, setParseError] = useState<string | null>(null);

  const initialData = useMemo(() => {
    try {
      const data = JSON.parse(content);
      return {
        elements: data.elements ?? [],
        appState: {
          viewBackgroundColor:
            data.appState?.viewBackgroundColor ?? 'transparent',
          theme: 'dark' as const,
        },
        files: data.files ?? {},
        scrollToContent: true,
      };
    } catch (e) {
      setParseError(e instanceof Error ? e.message : 'Invalid JSON');
      return null;
    }
  }, [content]);

  if (parseError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-8"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div
          className="rounded-lg p-6 max-w-md glass"
          style={{ borderColor: 'var(--error-glow)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle size={20} style={{ color: 'var(--error)' }} />
            <h3 className="font-semibold" style={{ color: 'var(--error)' }}>
              Invalid Excalidraw File
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {parseError}
          </p>
        </div>
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <div className="w-full h-full" style={{ backgroundColor: 'var(--bg-base)' }}>
      <Excalidraw
        initialData={initialData}
        viewModeEnabled={true}
        zenModeEnabled={true}
        gridModeEnabled={false}
        UIOptions={{
          canvasActions: {
            export: false,
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: false,
          },
        }}
      />
    </div>
  );
}
