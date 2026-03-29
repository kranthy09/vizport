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
