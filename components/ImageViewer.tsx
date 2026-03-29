'use client';

import { useRef, useState, useEffect } from 'react';
import { ZoomableCanvas, ZoomableCanvasRef } from './ZoomableCanvas';
import { Toolbar } from './Toolbar';

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
  const canvasRef = useRef<ZoomableCanvasRef>(null);
  const [scale, setScale] = useState(1);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Auto-fit on load
    setTimeout(() => {
      canvasRef.current?.fitToView();
      setShowHint(true);
    }, 100);

    // Hide hint after 3 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Canvas */}
      <ZoomableCanvas
        ref={canvasRef}
        onScaleChange={setScale}
        className="absolute inset-0"
      >
        {isSvg && svgContent ? (
          <div
            className="flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(99, 102, 241, 0.1))',
            }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(99, 102, 241, 0.1))',
            }}
          />
        )}
      </ZoomableCanvas>

      {/* Toolbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 animate-slideInDown">
        <Toolbar
          scale={scale}
          onZoomIn={() => canvasRef.current?.zoomIn()}
          onZoomOut={() => canvasRef.current?.zoomOut()}
          onFit={() => canvasRef.current?.fitToView()}
          onReset={() => canvasRef.current?.reset()}
        />
      </div>

      {/* Keyboard Shortcut Hint */}
      {showHint && (
        <div
          className="absolute top-4 left-4 z-40 px-3 py-2 rounded text-xs font-medium backdrop-blur-md border animate-fadeIn"
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
        >
          <div className="mb-1">🖱️ Drag to pan • Scroll to zoom • Double-click to fit</div>
          <div>⌨️ +/- zoom • F fit • 0 reset • Arrow keys pan</div>
        </div>
      )}
    </div>
  );
}
