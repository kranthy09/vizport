# VizPort

A minimalist, fast web viewer for GitHub-hosted images, diagrams, and markdown files. View PNG, SVG, Mermaid diagrams, and formatted markdown directly from your GitHub repositories.

## 🚀 Live Deployment

**App is live and deployed!**

- **URL:** https://vizport-git-main-kranthis-projects-1583155d.vercel.app/
- **Status:** ✅ Running on Vercel with auto-deploy on git push
- **Images Repo:** https://github.com/kranthy09/vizport-media

## ✨ Features

- 🖼️ **Image Viewer** — PNG & SVG lightbox with zoom
- 📊 **Mermaid Diagrams** — Render `.mmd` files as interactive diagrams
- 📝 **Markdown Renderer** — Syntax-highlighted markdown with GitHub Flavored Markdown support
- 📁 **File Browser** — Browse and navigate GitHub repository files
- ⚡ **Zero Backend** — Client-side only, powered by GitHub API
- 🎨 **Dark UI** — Clean, minimal interface with dark theme
- 🔄 **Auto-Deploy** — Continuous deployment on git push

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components:** React 19 with hooks
- **Rendering:**
  - [Mermaid](https://mermaid.js.org) for diagrams
  - [React Markdown](https://github.com/remarkjs/react-markdown) with syntax highlighting
- **Icons:** [Lucide React](https://lucide.dev)
- **Deployment:** [Vercel](https://vercel.com)

## 📋 Project Structure

```
vizport/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main app shell
│   ├── layout.tsx           # Global layout & fonts
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Sidebar.tsx          # File browser
│   ├── Viewer.tsx           # Main viewer
│   ├── ImageViewer.tsx      # PNG/SVG lightbox
│   ├── MermaidRenderer.tsx  # Diagram renderer
│   └── MarkdownRenderer.tsx # Markdown renderer
├── hooks/                   # Custom React hooks
│   ├── useGitHubFiles.ts   # Fetch file list
│   └── useFileContent.ts   # Fetch file content
├── lib/                     # Utilities
│   ├── github.ts           # GitHub API helpers
│   └── fileTypes.ts        # File type detection
├── types/                  # TypeScript definitions
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Component structure
│   ├── SETUP.md            # Local dev setup
│   └── DEPLOYMENT.md       # Deployment guide
└── vercel.json             # Vercel configuration
```

## 🚦 Quick Start

### Local Development

**Prerequisites:** Node.js 18+ and npm 9+

```bash
# Clone and install
git clone https://github.com/kranthy09/vizport.git
cd vizport
npm install

# Configure environment (.env.local)
NEXT_PUBLIC_GITHUB_OWNER=your-username
NEXT_PUBLIC_GITHUB_REPO=your-images-repo
NEXT_PUBLIC_GITHUB_BRANCH=main

# Start dev server
npm run dev
```

Open http://localhost:3000 to see your app.

See [**docs/SETUP.md**](docs/SETUP.md) for detailed setup instructions.

### Deploy to Vercel

1. Push code to GitHub
2. Connect GitHub repo to Vercel (one-click)
3. Set environment variables in Vercel dashboard
4. Deploy

See [**docs/DEPLOYMENT.md**](docs/DEPLOYMENT.md) for step-by-step instructions.

## 📁 Your Content Repository

VizPort reads files from a **separate** GitHub repository that you create:

```
your-images-repo/
├── diagrams/
│   └── flowchart.mmd
├── assets/
│   ├── icon.svg
│   └── screenshot.png
└── docs/
    └── README.md
```

Configure the repo location with environment variables:
- `NEXT_PUBLIC_GITHUB_OWNER` — Your GitHub username
- `NEXT_PUBLIC_GITHUB_REPO` — Your content repo name
- `NEXT_PUBLIC_GITHUB_BRANCH` — Branch name (default: `main`)
- `NEXT_PUBLIC_GITHUB_TOKEN` — Personal access token (optional, for rate limiting)

## 🔄 Data Flow

```
Your GitHub Repository
    ↓ (GitHub API)
useGitHubFiles Hook
    ↓ (file list)
Sidebar Component
    ↓ (user selects file)
useFileContent Hook
    ↓ (raw content)
Renderer Component (Image/Mermaid/Markdown)
    ↓
Browser Display
```

## 🏗️ Architecture

See [**docs/ARCHITECTURE.md**](docs/ARCHITECTURE.md) for detailed component descriptions, data flow, and design decisions.

## 📖 Documentation

- [**ARCHITECTURE.md**](docs/ARCHITECTURE.md) — Component structure and data flow
- [**SETUP.md**](docs/SETUP.md) — Local development setup
- [**DEPLOYMENT.md**](docs/DEPLOYMENT.md) — Vercel deployment guide

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Files not loading | Check environment variables in `.env.local` or Vercel settings |
| Rate limit errors | Add `NEXT_PUBLIC_GITHUB_TOKEN` with `public_repo` scope |
| Blank page | Check browser console (F12 → Console) for API errors |
| Build fails | Check Vercel build logs in dashboard |

## 📦 Development Scripts

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm start        # Run production build locally
npm run lint     # Lint and type check
```

## 🔐 Environment Variables

```
NEXT_PUBLIC_GITHUB_OWNER      # Your GitHub username
NEXT_PUBLIC_GITHUB_REPO       # Your content repository name
NEXT_PUBLIC_GITHUB_BRANCH     # Branch to read from (default: main)
NEXT_PUBLIC_GITHUB_TOKEN      # Optional: GitHub PAT for higher rate limits
```

All variables are public (prefixed with `NEXT_PUBLIC_`). They're safe to commit to version control.

## 📜 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Improve documentation

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Mermaid Documentation](https://mermaid.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Built with ❤️ using Next.js and Vercel**
