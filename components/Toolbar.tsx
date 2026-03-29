'use client';

import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

interface ToolbarProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onReset: () => void;
  className?: string;
}

export function Toolbar({
  scale,
  onZoomIn,
  onZoomOut,
  onFit,
  onReset,
  className = '',
}: ToolbarProps) {
  const zoomPercent = Math.round(scale * 100);

  const btnClass =
    'flex flex-col items-center gap-1 px-4 py-2.5 rounded-lg transition-smooth ' +
    'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2';

  return (
    <div
      className={`glass rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-md ${className}`}
      style={{
        borderColor: 'var(--border)',
        borderWidth: '1px',
        backgroundColor: 'rgba(10, 10, 20, 0.8)',
      }}
      role="toolbar"
      aria-label="Diagram controls"
    >
      {/* Zoom level display */}
      <div
        className="flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base min-w-[80px]"
        style={{
          backgroundColor: 'rgba(129, 140, 248, 0.12)',
          border: '1px solid rgba(129, 140, 248, 0.25)',
          color: 'var(--accent)',
        }}
        title={`Zoom: ${zoomPercent}%`}
      >
        {zoomPercent}%
      </div>

      {/* Divider */}
      <div className="h-8 w-px" style={{ backgroundColor: 'var(--border)' }} aria-hidden="true" />

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        className={btnClass}
        title="Zoom out (−)"
        aria-label="Zoom out"
      >
        <ZoomOut size={22} />
        <span className="text-xs font-medium">Zoom −</span>
      </button>

      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        className={btnClass}
        title="Zoom in (+)"
        aria-label="Zoom in"
      >
        <ZoomIn size={22} />
        <span className="text-xs font-medium">Zoom +</span>
      </button>

      {/* Divider */}
      <div className="h-8 w-px" style={{ backgroundColor: 'var(--border)' }} aria-hidden="true" />

      {/* Fit to View */}
      <button
        onClick={onFit}
        className={btnClass}
        title="Fit to view (F)"
        aria-label="Fit diagram to view"
      >
        <Maximize2 size={22} />
        <span className="text-xs font-medium">Fit</span>
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        className={btnClass}
        title="Reset view (0)"
        aria-label="Reset zoom and position"
      >
        <RotateCcw size={22} />
        <span className="text-xs font-medium">Reset</span>
      </button>
    </div>
  );
}
