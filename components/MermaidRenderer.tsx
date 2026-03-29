'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle } from 'lucide-react';
import { ZoomableCanvas, ZoomableCanvasRef } from './ZoomableCanvas';
import { Toolbar } from './Toolbar';

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
  const canvasRef = useRef<ZoomableCanvasRef>(null);
  const [scale, setScale] = useState(1);
  const [isRendering, setIsRendering] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    const render = async () => {
      try {
        setIsRendering(true);
        setError(null);

        // Clear previous content
        containerRef.current!.innerHTML = '';

        const { svg } = await mermaid.render(
          `mermaid-${Date.now()}`,
          content
        );

        containerRef.current!.innerHTML = svg;

        // Auto-fit diagram to view after render
        setTimeout(() => {
          canvasRef.current?.fitToView();
          setIsRendering(false);
        }, 100);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to render diagram'
        );
        setIsRendering(false);
      }
    };

    render();
  }, [content]);

  if (error) {
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
              Diagram Error
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Loading Shimmer */}
      {isRendering && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="space-y-3 w-2/3 max-w-sm">
            <div className="h-12 skeleton-shimmer rounded" />
            <div className="h-32 skeleton-shimmer rounded" />
            <div className="h-12 skeleton-shimmer rounded" />
          </div>
        </div>
      )}

      {/* Canvas with diagram */}
      <ZoomableCanvas
        ref={canvasRef}
        onScaleChange={setScale}
        className="absolute inset-0"
      >
        <div
          ref={containerRef}
          className="flex items-center justify-center"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(99, 102, 241, 0.1))',
          }}
        />
      </ZoomableCanvas>

      {/* Toolbar */}
      {!isRendering && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 animate-slideInDown">
          <Toolbar
            scale={scale}
            onZoomIn={() => canvasRef.current?.zoomIn()}
            onZoomOut={() => canvasRef.current?.zoomOut()}
            onFit={() => canvasRef.current?.fitToView()}
            onReset={() => canvasRef.current?.reset()}
          />
        </div>
      )}
    </div>
  );
}
