# Phase 6: Local Testing & Verification

**Duration:** ~10 minutes
**Goal:** Verify all functionality works locally before deploying

---

## Prerequisites

- All previous phases completed (Phase 1-5)
- `.env.local` configured with valid GitHub repo
- GitHub image repository with test files

---

## Step 1: Prepare Test Images Repository

If you haven't already, create test files in your GitHub images repo:

**Repository structure:**
```
your-images-repo/
├── diagrams/
│   └── flowchart.mmd
├── assets/
│   ├── logo.png
│   ├── icon.svg
│   └── chart.svg
└── docs/
    └── README.md
```

**Sample files to create:**

**`diagrams/flowchart.mmd`** (Mermaid diagram):
```
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Deploy! 🚀]
    B -->|No| D[Debug]
    D --> A
```

**`assets/logo.png`**: Any PNG image (upload from your computer)

**`assets/icon.svg`** (SVG):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="45" fill="#3b82f6"/>
  <text x="50" y="55" text-anchor="middle" font-size="24" font-weight="bold" fill="white">SVG</text>
</svg>
```

**`docs/README.md`** (Markdown):
```markdown
# VizPort Test Documentation

## Features

- **Image Viewer**: View PNG and SVG files
- **Mermaid Diagrams**: Render flowcharts and diagrams
- **Markdown Support**: Read documentation files
- **GitHub Integration**: Fetch files directly from repo

## How to use

1. Select a file from the sidebar
2. View the rendered content
3. Use the search to filter files

## Test Checklist

- [ ] PNG renders correctly
- [ ] SVG renders inline
- [ ] Mermaid diagram renders
- [ ] Markdown syntax highlights
```

---

## Step 2: Start Dev Server

```bash
npm run dev
```

Expected output:
```
 ▲ Next.js 14.x.x
 - Local:        http://localhost:3000
```

Open http://localhost:3000 in your browser.

---

## Step 3: Test Each Feature

### 3.1 Test File Browser

**Expected behavior:**
- [ ] Sidebar loads with files from your GitHub repo
- [ ] Files are filtered to supported types only (.png, .svg, .mmd, .md)
- [ ] Files have correct icons (🖼️ for images, 📊 for mermaid, 📝 for markdown)
- [ ] File badges show extensions (.png, .svg, .mmd, .md)

**If files don't load:**
1. Open DevTools (F12) → Network tab
2. Look for request to `api.github.com/repos/...`
3. If 404: Check `NEXT_PUBLIC_GITHUB_OWNER` and `NEXT_PUBLIC_GITHUB_REPO` in `.env.local`
4. If 401: Add valid `NEXT_PUBLIC_GITHUB_TOKEN`
5. If 403: You've hit rate limit, wait an hour or add token

### 3.2 Test PNG Viewer

**Steps:**
1. Click a `.png` file in sidebar
2. Verify image renders in the main area

**Expected behavior:**
- [ ] PNG displays in main viewer area
- [ ] Click image → fullscreen lightbox opens
- [ ] Press Escape or click X → close lightbox
- [ ] Image doesn't distort (respects aspect ratio)

### 3.3 Test SVG Viewer

**Steps:**
1. Click a `.svg` file in sidebar
2. Verify SVG renders inline

**Expected behavior:**
- [ ] SVG displays in main viewer area
- [ ] SVG is rendered as inline (not as img tag)
- [ ] Click SVG → fullscreen lightbox opens
- [ ] Colors and shapes are correct

### 3.4 Test Mermaid Diagram

**Steps:**
1. Click a `.mmd` file in sidebar
2. Verify diagram renders correctly

**Expected behavior:**
- [ ] Diagram renders as SVG
- [ ] All shapes and connections visible
- [ ] Dark theme applied to diagram
- [ ] No console errors

**If Mermaid fails to render:**
1. Check DevTools → Console for mermaid errors
2. Verify `.mmd` syntax is valid
3. Look for red error box in viewer

### 3.5 Test Markdown Viewer

**Steps:**
1. Click a `.md` file in sidebar
2. Verify markdown renders with syntax highlighting

**Expected behavior:**
- [ ] Headers are formatted (h1 larger than h2, etc.)
- [ ] Code blocks have syntax highlighting
- [ ] Links are blue and underlined
- [ ] Bold and italic text formatted correctly
- [ ] Tables display properly
- [ ] Lists are indented

### 3.6 Test Search/Filter

**Steps:**
1. Type a filename in the search box (e.g., "flow")
2. Verify only matching files show

**Expected behavior:**
- [ ] Sidebar filters in real-time
- [ ] Search is case-insensitive
- [ ] Can search by filename or path
- [ ] File count at bottom updates

### 3.7 Test Responsive Dark Theme

**Expected:**
- [ ] All text is visible (good contrast)
- [ ] Background is dark gray (zinc-950)
- [ ] Sidebar is slightly lighter (zinc-900)
- [ ] No flashy bright colors (except accent blue)

---

## Step 4: Build for Production

```bash
npm run build
```

Expected output:
```
 ✓ Compiled successfully
 ✓ Checked TypeScript (0 errors)
 ✓ Linted (0 errors)
 ✓ Built successfully
```

**If build fails:**
1. Check error message in terminal
2. Fix TypeScript errors
3. Run `npm run build` again

---

## Step 5: Test Production Build

```bash
npm start
```

Open http://localhost:3000 again

Verify everything still works (same tests as Step 3)

---

## Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Files not loading | Check `.env.local`, verify repo is public |
| Images not rendering | Verify image exists in GitHub repo, check file format |
| Mermaid diagram shows error | Check `.mmd` syntax, view error in console |
| Markdown code blocks not highlighted | Verify rehype-highlight is installed |
| Sidebar not scrolling | Ensure sidebar height is `h-screen` |
| Dark theme not applied | Check `app/globals.css` is imported |
| Search filter not working | Verify component state updates |

---

## Performance Check

Open DevTools (F12) → Performance tab:

1. Reload page (Ctrl+R)
2. Wait for all content to load
3. Check:
   - [ ] Network requests to GitHub are < 1 second each
   - [ ] Page interactive within 2-3 seconds
   - [ ] No blocked rendering (check Rendering section)

---

## Ready for Deployment?

Before proceeding to Vercel deployment, verify:

- [ ] All phases 1-5 complete
- [ ] All feature tests pass (3.1 - 3.7)
- [ ] Production build succeeds
- [ ] No console errors or warnings
- [ ] Dark theme applied correctly
- [ ] All file types render properly

If all checks pass, you're ready for **Phase 7: Vercel Deployment**.

