'use client';

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';

interface ZoomableCanvasProps {
  children: React.ReactNode;
  className?: string;
  onScaleChange?: (scale: number) => void;
}

export interface ZoomableCanvasRef {
  fitToView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  getScale: () => number;
}

const MIN_SCALE = 0.05;
const MAX_SCALE = 10;
const ZOOM_SPEED = 0.1;
const PAN_SPEED = 10;

export const ZoomableCanvas = forwardRef<ZoomableCanvasRef, ZoomableCanvasProps>(
  ({ children, className = '', onScaleChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
    // Ref tracks current scale so zoom() can read it without a closure dependency
    const scaleRef = useRef(1);

    // Fit content to view
    const fitToView = useCallback(() => {
      if (!containerRef.current || !contentRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const scaleX = containerRect.width / contentRect.width;
      const scaleY = containerRect.height / contentRect.height;
      const newScale = Math.max(0.05, Math.min(scaleX, scaleY, 1));
      scaleRef.current = newScale;
      setScale(newScale);
      setX(0);
      setY(0);
      onScaleChange?.(newScale);
    }, [onScaleChange]);

    // Zoom operations
    // NOTE: All state updates and side effects happen at the top level of the
    // callback — never inside a setState updater — to comply with React 19's
    // rule against updating other components during render.
    const zoom = useCallback(
      (factor: number, clientX?: number, clientY?: number) => {
        const prevScale = scaleRef.current;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prevScale * factor));

        scaleRef.current = newScale;
        setScale(newScale);

        // Zoom toward cursor if coordinates provided
        if (clientX !== undefined && clientY !== undefined && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const cursorX = clientX - rect.left;
          const cursorY = clientY - rect.top;
          const scaleDiff = newScale - prevScale;
          setX((prevX) => prevX - (cursorX * scaleDiff) / prevScale);
          setY((prevY) => prevY - (cursorY * scaleDiff) / prevScale);
        }

        onScaleChange?.(newScale);
      },
      [onScaleChange]
    );

    const zoomIn = useCallback(() => zoom(1 + ZOOM_SPEED), [zoom]);
    const zoomOut = useCallback(() => zoom(1 - ZOOM_SPEED), [zoom]);
    const reset = useCallback(() => {
      scaleRef.current = 1;
      setX(0);
      setY(0);
      setScale(1);
      onScaleChange?.(1);
    }, [onScaleChange]);

    const getScale = useCallback(() => scale, [scale]);

    // Mouse events
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (e.button !== 0) return; // Left click only
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        startX: x,
        startY: y,
      };
    }, [x, y]);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        setX(dragStartRef.current.startX + deltaX / scale);
        setY(dragStartRef.current.startY + deltaY / scale);
      },
      [isDragging, scale]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    // Wheel zoom
    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 1 - ZOOM_SPEED : 1 + ZOOM_SPEED;
        zoom(factor, e.clientX, e.clientY);
      },
      [zoom]
    );

    // Double-click to fit
    const handleDoubleClick = useCallback(() => {
      fitToView();
    }, [fitToView]);

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!containerRef.current?.parentElement?.contains(document.activeElement)) {
          return;
        }

        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            reset();
            break;
          case 'f':
          case 'F':
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              fitToView();
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            setY((prev) => prev - PAN_SPEED / scale);
            break;
          case 'ArrowDown':
            e.preventDefault();
            setY((prev) => prev + PAN_SPEED / scale);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            setX((prev) => prev - PAN_SPEED / scale);
            break;
          case 'ArrowRight':
            e.preventDefault();
            setX((prev) => prev + PAN_SPEED / scale);
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scale, zoomIn, zoomOut, reset, fitToView]);

    // Expose imperative API
    useImperativeHandle(ref, () => ({
      fitToView,
      zoomIn,
      zoomOut,
      reset,
      getScale,
    }), [fitToView, zoomIn, zoomOut, reset, getScale]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden bg-[#08080f] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
            transition: isDragging ? 'none' : 'transform 150ms ease-out',
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>
    );
  }
);

ZoomableCanvas.displayName = 'ZoomableCanvas';
