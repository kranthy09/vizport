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
