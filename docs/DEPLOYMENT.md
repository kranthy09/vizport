# DEPLOYMENT — Vercel

## Overview

VizPort is a Next.js app optimized for Vercel deployment. It requires **zero backend configuration** — just environment variables.

---

## Step 1: Initialize Git & Push to GitHub

```bash
# In your local vizport directory
git init
git add .
git commit -m "Initial commit: VizPort setup"

# Create a GitHub repo at https://github.com/new (name: vizport)
# Then:
git remote add origin https://github.com/YOUR-USERNAME/vizport.git
git branch -M main
git push -u origin main
```

**Result:** Your code is now on GitHub.

---

## Step 2: Create Vercel Account & Link GitHub

1. Go to https://vercel.com/signup
2. Sign up with GitHub (one-click)
3. Authorize Vercel to access your GitHub repos
4. Click **"Import Project"**
5. Find and select your **vizport** repo

**Vercel auto-detects:**
- ✅ Next.js App Router
- ✅ Build command: `next build`
- ✅ Start command: `next start`
- ✅ Output directory: `.next`

You can accept defaults. Click **Deploy**.

---

## Step 3: Configure Environment Variables

Deployment will fail until you set env vars. Vercel shows a warning.

1. In Vercel dashboard: go to **Project Settings** → **Environment Variables**
2. Add these variables:

| Key | Value | Example |
|-----|-------|---------|
| `NEXT_PUBLIC_GITHUB_OWNER` | Your GitHub username | `octocat` |
| `NEXT_PUBLIC_GITHUB_REPO` | Your images repo name | `vizport-images` |
| `NEXT_PUBLIC_GITHUB_BRANCH` | Branch name | `main` |
| `NEXT_PUBLIC_GITHUB_TOKEN` | GitHub personal access token (optional) | `ghp_xxxx` |

3. Click **Save**
4. Vercel auto-redeploys with new vars

**Result:** App is now live at `https://your-project.vercel.app`

---

## Step 4: Test the Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Check that files load from your `vizport-images` repo
3. Click files to render them
4. PNG/SVG should show in lightbox
5. .mmd files should render as diagrams
6. .md files should show syntax-highlighted markdown

---

## Continuous Deployment

From now on, any push to `main` triggers auto-deploy:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# → Vercel automatically rebuilds and deploys
# → Check status at https://vercel.com/dashboard
```

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Check Vercel build logs (Dashboard → Deployments → View Build Logs) |
| App loads but files don't | Verify env vars in Vercel Settings → Environment Variables |
| 404 from GitHub API | Verify `NEXT_PUBLIC_GITHUB_OWNER` and `NEXT_PUBLIC_GITHUB_REPO` are correct |
| Rate limit errors | Add `NEXT_PUBLIC_GITHUB_TOKEN` with public_repo scope |
| Page shows blank | Check browser DevTools (F12 → Console) for errors |

---

## Environment Variables Summary

```
┌─────────────────────────────────────────────────────────┐
│ Local (.env.local)        │ Vercel Dashboard            │
├──────────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_GITHUB_OWNER  │ Project Settings → Env Vars │
│ NEXT_PUBLIC_GITHUB_REPO   │ Set same values             │
│ NEXT_PUBLIC_GITHUB_BRANCH │ Redeploy after saving       │
│ NEXT_PUBLIC_GITHUB_TOKEN  │                             │
└─────────────────────────────────────────────────────────┘
```

---

## Domain (Optional)

To use a custom domain like `vizport.yourdomain.com`:

1. In Vercel dashboard: **Deployments** → **Domains**
2. Add your domain
3. Update DNS records at your domain registrar
4. Vercel provides exact DNS settings

---

## Rollback

If a deployment breaks:

1. Go to Vercel dashboard → **Deployments**
2. Find a previous working deployment
3. Click **Promote to Production**
4. Your app rolls back instantly

---

**Done!** Your VizPort is live and auto-deploying on every git push.

See **SETUP.md** for local development.
See **ARCHITECTURE.md** for code structure.
