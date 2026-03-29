'use client';

import { useState, useEffect, useCallback } from 'react';
import { GitHubFile } from '@/types';
import { useGitHubFiles } from '@/hooks/useGitHubFiles';
import { Sidebar } from '@/components/Sidebar';
import { Viewer } from '@/components/Viewer';
import {
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export default function Home() {
  const { files, loading, error } = useGitHubFiles();
  const [activeFile, setActiveFile] = useState<GitHubFile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeIndex = activeFile
    ? files.findIndex((f) => f.sha === activeFile.sha)
    : -1;

  const goTo = useCallback(
    (index: number) => {
      if (!files.length) return;
      setActiveFile(files[(index + files.length) % files.length]);
    },
    [files]
  );

  const goToPrev = useCallback(() => {
    goTo(activeIndex <= 0 ? files.length - 1 : activeIndex - 1);
  }, [goTo, activeIndex, files.length]);

  const goToNext = useCallback(() => {
    goTo(activeIndex < 0 ? 0 : activeIndex + 1);
  }, [goTo, activeIndex]);

  // Keyboard: ←/→ navigate files, B toggles sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goToPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goToNext(); }
      if (e.key === 'b' && !e.metaKey && !e.ctrlKey) setSidebarOpen((o) => !o);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToPrev, goToNext]);

  // Fullscreen API
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const baseName = activeFile
    ? activeFile.name.split('.').slice(0, -1).join('.')
    : null;
  const ext = activeFile ? activeFile.name.split('.').pop() : null;

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ===== Header ===== */}
      <header
        className="flex-shrink-0 h-14 flex items-center gap-3 px-4 border-b z-50"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Left: Logo + sidebar toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center glow-sm"
            style={{
              background:
                'linear-gradient(135deg, var(--accent), var(--accent-dark))',
            }}
          >
            <BarChart3 size={17} className="text-white" />
          </div>
          <span className="font-bold text-base text-[var(--text-primary)] hidden sm:block">
            VizPort
          </span>
          <div
            className="h-5 w-px hidden sm:block"
            style={{ backgroundColor: 'var(--border)' }}
          />
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg transition-smooth hover:bg-[var(--bg-hover)]"
            style={{ color: 'var(--text-tertiary)' }}
            title={sidebarOpen ? 'Hide sidebar (B)' : 'Show sidebar (B)'}
            aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>
        </div>

        {/* Center: current file name */}
        <div className="flex-1 flex items-center justify-center gap-2.5 min-w-0 px-4">
          {activeFile ? (
            <>
              <h2
                className="text-lg font-semibold truncate max-w-lg"
                style={{ color: 'var(--text-primary)' }}
                title={activeFile.path}
              >
                {baseName}
              </h2>
              {ext && (
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(129, 140, 248, 0.15)',
                    color: 'var(--accent-light)',
                    border: '1px solid rgba(129, 140, 248, 0.3)',
                  }}
                >
                  {ext}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {loading ? 'Loading files…' : 'Select a file to begin'}
            </span>
          )}
        </div>

        {/* Right: prev/next counter + present button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {files.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrev}
                disabled={files.length <= 1}
                className="p-2 rounded-lg transition-smooth hover:bg-[var(--bg-hover)] disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Previous file (←)"
                aria-label="Previous file"
              >
                <ChevronLeft size={20} />
              </button>
              <span
                className="text-sm font-mono min-w-[68px] text-center px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                {activeIndex >= 0
                  ? `${activeIndex + 1} / ${files.length}`
                  : `— / ${files.length}`}
              </span>
              <button
                onClick={goToNext}
                disabled={files.length <= 1}
                className="p-2 rounded-lg transition-smooth hover:bg-[var(--bg-hover)] disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Next file (→)"
                aria-label="Next file"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border"
            style={{
              backgroundColor: isFullscreen
                ? 'var(--accent-dark)'
                : 'rgba(129, 140, 248, 0.08)',
              color: isFullscreen ? '#fff' : 'var(--accent)',
              borderColor: 'rgba(129, 140, 248, 0.3)',
            }}
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Present fullscreen'}
            aria-label={isFullscreen ? 'Exit presentation' : 'Start presentation'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden sm:inline">
              {isFullscreen ? 'Exit' : 'Present'}
            </span>
          </button>
        </div>
      </header>

      {/* ===== Body ===== */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {sidebarOpen && (
          <Sidebar
            files={files}
            loading={loading}
            activeFile={activeFile}
            onFileSelect={setActiveFile}
          />
        )}

        <main className="flex-1 min-w-0 overflow-hidden">
          {error ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <p className="font-bold text-lg" style={{ color: 'var(--error)' }}>
                  Failed to load files
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                  {error.message}
                </p>
                <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                  Check your GitHub environment variables in .env.local
                </p>
              </div>
            </div>
          ) : (
            <Viewer file={activeFile} />
          )}
        </main>
      </div>
    </div>
  );
}
