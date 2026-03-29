# ARCHITECTURE — VizPort Component Layout

## Data Flow

```
GitHub Repository (image store)
    ↓ (GitHub API: /contents/)
useGitHubFiles Hook
    ↓ (fetches file list)
FileBrowser Component
    ↓ (user clicks file)
useFileContent Hook
    ↓ (fetches raw content)
Renderer Components
    ├─ ImageViewer (PNG/SVG lightbox)
    ├─ MermaidRenderer (.mmd → diagram)
    └─ MarkdownRenderer (.md → HTML)
    ↓
User sees rendered content
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              ← Root layout, main entry
│   └── layout.tsx            ← Global Tailwind + fonts
│
├── components/
│   ├── FileBrowser.tsx       ← Lists files from GitHub
│   ├── ImageViewer.tsx       ← Lightbox for PNG/SVG
│   ├── MermaidRenderer.tsx   ← Renders .mmd diagrams
│   ├── MarkdownRenderer.tsx  ← Renders .md with syntax highlight
│   └── ErrorBoundary.tsx     ← Catches render errors
│
├── hooks/
│   ├── useGitHubFiles.ts     ← Fetch file list from repo
│   └── useFileContent.ts     ← Fetch file raw content
│
├── utils/
│   ├── github.ts             ← GitHub API helpers
│   └── formatters.ts         ← File filtering, naming utils
│
└── types/
    └── index.ts              ← TypeScript interfaces
```

## Key Decisions

| Decision | Why |
|----------|-----|
| **Next.js App Router** | Vercel native, simple file-based routing |
| **Tailwind CSS** | No CSS files to manage, utility-first |
| **React Hooks** | useState/useEffect only—no state library needed |
| **No API routes** | Pure client-side, GitHub API called from browser |
| **Mermaid npm lib** | Industry standard, works client-side |
| **lucide-react icons** | Tree-shakeable, minimal bundle impact |

## Component Ownership

| Component | Responsibility | State |
|-----------|-----------------|-------|
| `FileBrowser` | Fetch & display file list | current folder, selected file |
| `ImageViewer` | Display PNG/SVG in lightbox | lightbox open/close |
| `MermaidRenderer` | Render `.mmd` as diagram | mermaid instance |
| `MarkdownRenderer` | Parse & render `.md` | none |
| `useGitHubFiles` | Query GitHub API for file list | files, loading, error |
| `useFileContent` | Query GitHub API for raw content | content, loading, error |

## Rendering Pipeline

**File selected → Content fetched → Type detected → Render with handler:**

1. **PNG/SVG** → `ImageViewer` (lightbox with zoom)
2. **.mmd** → `MermaidRenderer` (render to SVG)
3. **.md** → `MarkdownRenderer` (syntax highlight + GFM support)
4. **Other** → Show error message

---

See **SETUP.md** for dev environment.
See **DEPLOYMENT.md** for Vercel deployment.
