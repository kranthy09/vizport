# Phase 5: App Shell & Styling — Layout & Global Styles

**Status:** ✅ COMPLETE (2026-03-29)

**Duration:** ~10 minutes
**Goal:** Create root layout, main page, and global styling

---

## Files to Create/Modify

- `app/globals.css` (modify)
- `app/layout.tsx` (modify)
- `app/page.tsx` (modify)

---

## Step 1: Update `app/globals.css`

**File: `app/globals.css`**

Replace entire content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import 'highlight.js/styles/github-dark.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  background-color: #09090b;
  color: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#__next {
  height: 100%;
  width: 100%;
}

/* Markdown styles */
.prose {
  color: #d4d4d8;
}

.prose strong {
  color: #f4f4f5;
  font-weight: 600;
}

.prose code {
  color: #fca5a5;
  background-color: #18181b;
  border-radius: 0.25rem;
}

.prose pre {
  background-color: #18181b !important;
  border: 1px solid #27272a;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
}

.prose a {
  color: #60a5fa;
  text-decoration: underline;
}

.prose a:hover {
  color: #93c5fd;
}

.prose blockquote {
  border-left-color: #52525b;
  color: #a1a1aa;
}

/* Highlight.js dark theme overrides */
.hljs {
  background: #18181b !important;
  color: #d4d4d8 !important;
}

.hljs-string {
  color: #fca5a5 !important;
}

.hljs-number {
  color: #fcd34d !important;
}

.hljs-literal {
  color: #86efac !important;
}

.hljs-attr {
  color: #93c5fd !important;
}

.hljs-title {
  color: #a78bfa !important;
}

.hljs-tag {
  color: #f87171 !important;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #18181b;
}

::-webkit-scrollbar-thumb {
  background: #52525b;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #71717a;
}
```

---

## Step 2: Update `app/layout.tsx`

**File: `app/layout.tsx`**

Replace entire content with:

```typescript
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VizPort',
  description: 'A minimalist viewer for PNG, SVG, Mermaid diagrams, and Markdown',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
```

---

## Step 3: Update `app/page.tsx`

**File: `app/page.tsx`**

Replace entire content with:

```typescript
'use client';

import { useState } from 'react';
import { GitHubFile } from '@/types';
import { useGitHubFiles } from '@/hooks/useGitHubFiles';
import { Sidebar } from '@/components/Sidebar';
import { Viewer } from '@/components/Viewer';

export default function Home() {
  const { files, loading, error } = useGitHubFiles();
  const [activeFile, setActiveFile] = useState<GitHubFile | null>(null);

  return (
    <div className="flex h-screen w-screen bg-zinc-950">
      {/* Sidebar */}
      <Sidebar
        files={files}
        loading={loading}
        activeFile={activeFile}
        onFileSelect={setActiveFile}
      />

      {/* Main Viewer */}
      <main className="flex-1 bg-zinc-950">
        {error ? (
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-red-400 font-bold text-lg">
                Failed to load files
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                {error.message}
              </p>
              <p className="text-zinc-600 text-xs mt-4">
                Check your GitHub environment variables in .env.local
              </p>
            </div>
          </div>
        ) : (
          <Viewer file={activeFile} />
        )}
      </main>
    </div>
  );
}
```

---

## Layout Structure

```
┌─────────────────────────────────────┐
│         VizPort App                 │
├──────────────────┬──────────────────┤
│                  │                  │
│   Sidebar        │                  │
│  (w-64, fixed)   │  Viewer Area     │
│                  │  (flex-1)        │
│  - File list     │                  │
│  - Search        │  Shows:          │
│  - File count    │  - Image         │
│                  │  - Diagram       │
│                  │  - Markdown      │
│                  │                  │
└──────────────────┴──────────────────┘
```

---

## Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Background | zinc-950 | #09090b |
| Sidebar | zinc-900 | #18181b |
| Borders | zinc-800 | #27272a |
| Text (primary) | zinc-100 | #f4f4f5 |
| Text (secondary) | zinc-500 | #71717a |
| Accent | blue-400 | #60a5fa |
| Error | red-400 | #f87171 |

---

## Verification Checklist

- [ ] `app/globals.css` updated with Tailwind + highlight.js
- [ ] `app/layout.tsx` updated with metadata and root layout
- [ ] `app/page.tsx` updated with client component and state
- [ ] No TypeScript errors
- [ ] Browser loads without errors

---

## Test the App

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

Expected:
- ✅ Two-column layout visible
- ✅ Sidebar has "VizPort" header + search input
- ✅ File list populated (or loading spinner)
- ✅ Clicking files updates viewer
- ✅ Dark theme applied
- ✅ No console errors

**If layout is broken:**
- Check that all components are imported correctly
- Verify Tailwind CSS is loading (check DevTools → Sources)
- Clear `.next` folder and restart dev server

---

## Next Phase

Once app shell is working, proceed to **Phase 6: Local Testing & Verification**.

