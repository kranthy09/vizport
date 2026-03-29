# SETUP — Local Development

## Prerequisites

- **Node.js 18+** (check: `node --version`)
- **npm 9+** (check: `npm --version`)
- **GitHub account** with a repository to store your images/diagrams
- **Git** for version control (check: `git --version`)

---

## 1. Clone & Install

```bash
# Clone the VizPort repository
git clone https://github.com/YOUR-USERNAME/vizport.git
cd vizport

# Install dependencies
npm install
```

## 2. Create Your Image Repository

You need a **separate** GitHub repo to store diagrams, images, and docs.

1. Go to https://github.com/new
2. Create repo named `vizport-images` (or any name)
3. Organize files as:
   ```
   vizport-images/
   ├── diagrams/          ← .mmd files
   ├── assets/            ← .png, .svg files
   └── docs/              ← .md files
   ```
4. Push some sample files (at least one .mmd, .png, .svg, .md)

## 3. Configure Environment Variables

Copy template from `CLAUDE.local.md`:

```bash
# Create .env.local in project root
cat > .env.local << 'EOF'
NEXT_PUBLIC_GITHUB_OWNER=your-github-username
NEXT_PUBLIC_GITHUB_REPO=vizport-images
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxx
EOF
```

**Generate a GitHub token (optional but recommended):**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: **public_repo** only (read-only)
4. Copy token, paste into `.env.local`
5. This increases rate limit: 60 → 5000 requests/hour

## 4. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

You should see:
- File browser on left (loading files from your GitHub repo)
- File preview area on right
- Click any file to view it

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Files not loading | Check `.env.local` has correct `GITHUB_OWNER` and `GITHUB_REPO` |
| 404 errors in console | Verify your image repo exists and is public |
| Rate limit exceeded | Add `NEXT_PUBLIC_GITHUB_TOKEN` with public_repo scope |
| Page blank | Check browser console for errors (F12 → Console) |

## Development Workflow

```bash
# Start dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint & type check
npm run lint
```

---

Next: See **DEPLOYMENT.md** to deploy to Vercel.
