# Phase 7: Vercel Deployment — Go Live

**Duration:** ~10 minutes
**Goal:** Deploy VizPort to Vercel with continuous deployment on git push

---

## Prerequisites

- All previous phases completed (Phase 1-6)
- Local testing passed
- GitHub account with vizport repo
- Vercel account (free at https://vercel.com)

---

## Step 1: Initialize Git Repository

```bash
# In your vizport directory
git init
```

Create `.gitignore` file:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/
.next/
out/

# Environment variables
.env.local
.env.*.local

# Editor / IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
EOF
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `vizport`
3. **Description:** `A minimalist viewer for PNG, SVG, Mermaid diagrams, and Markdown`
4. **Visibility:** Public (so Vercel can access it)
5. **Do NOT initialize** with README (you'll push existing code)
6. Click **Create repository**

---

## Step 3: Push Code to GitHub

From your vizport directory:

```bash
git add .
git commit -m "Initial commit: VizPort setup - scaffold, types, hooks, components, and styling"
git remote add origin https://github.com/YOUR-USERNAME/vizport.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your actual GitHub username.

Verify:
```bash
git remote -v
# Should show origin pointing to your repo
```

---

## Step 4: Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Click **Sign up with GitHub**
3. Authorize Vercel to access your GitHub repos
4. You'll be redirected to Vercel dashboard

---

## Step 5: Import Project to Vercel

1. In Vercel dashboard, click **Add New** → **Project**
2. Click **Import Git Repository**
3. In **Repository URL**, paste: `https://github.com/YOUR-USERNAME/vizport.git`
   - (Replace YOUR-USERNAME)
4. Click **Continue**

Vercel will auto-detect:
- ✅ Framework: Next.js
- ✅ Build command: `next build`
- ✅ Output directory: `.next`
- ✅ Install command: `npm ci`

---

## Step 6: Configure Environment Variables

**IMPORTANT:** Deployment will fail without env vars set.

1. Click **Environment Variables**
2. Add all four variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_GITHUB_OWNER` | Your GitHub username |
| `NEXT_PUBLIC_GITHUB_REPO` | Your images repo name |
| `NEXT_PUBLIC_GITHUB_BRANCH` | `main` |
| `NEXT_PUBLIC_GITHUB_TOKEN` | (optional) Your GitHub token |

3. Click **Deploy** button at bottom

---

## Step 7: Wait for Deployment

Vercel will:
1. Clone your repo
2. Install dependencies
3. Build the project
4. Deploy to CDN

You'll see:
```
✓ Build completed
✓ Deployment successful
✓ Production: https://vizport-YOUR-USERNAME.vercel.app
```

Click the **Production** link to view your live app!

---

## Step 8: Verify Live Deployment

Open your Vercel URL (e.g., `https://vizport-yourname.vercel.app`)

Test the same features as Phase 6:
- [ ] Sidebar loads with files
- [ ] PNG/SVG renders
- [ ] Mermaid diagrams render
- [ ] Markdown displays correctly
- [ ] Search filter works
- [ ] No console errors

**If files don't load:**
1. Check Vercel dashboard → Settings → Environment Variables
2. Verify all four variables are correct
3. Click "Redeploy" button
4. Wait for deployment to complete

---

## Step 9: Set Up Custom Domain (Optional)

To use your own domain (e.g., `vizport.yourdomain.com`):

1. Go to Vercel dashboard → Project settings
2. Click **Domains**
3. Enter your domain (e.g., `vizport.yourdomain.com`)
4. Vercel shows DNS records to add
5. Go to your domain registrar
6. Add CNAME record pointing to Vercel
7. Wait 5-15 minutes for DNS to propagate
8. Refresh Vercel dashboard → domain should show ✓ Active

---

## Step 10: Set Up Continuous Deployment

Continuous deployment is **automatic**. Now whenever you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically:
# 1. Sees the push
# 2. Clones updated code
# 3. Builds the project
# 4. Deploys new version
# 5. Updates production URL
```

Check deployment status:
- Vercel dashboard → Deployments tab
- Shows: branch, commit, build time, status

---

## Step 11: Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Deployment fails | Click failed deployment → View logs → find error |
| App loads blank | Check env vars in Vercel dashboard |
| Files not loading | Verify GitHub token is correct, increase rate limit |
| 404 errors | Check `NEXT_PUBLIC_GITHUB_OWNER` and `NEXT_PUBLIC_GITHUB_REPO` |
| Slow performance | Check Network tab in DevTools, may need caching |

---

## Step 12: Rollback (if needed)

If a deployment breaks:

1. Go to Vercel dashboard → **Deployments**
2. Find a previous working deployment (shows checkmark ✓)
3. Click the **three dots menu**
4. Select **Promote to Production**
5. Your app rolls back instantly

---

## Monitoring & Logging

**View build logs:**
- Dashboard → Deployments → Click deployment → View Build Logs

**View runtime errors:**
- Deployment URL → Open DevTools (F12) → Console tab

**Monitor uptime:**
- Vercel dashboard → Analytics tab
- Shows: requests, errors, response times

---

## Next Steps

### Add More Features
1. Edit files in your `vizport` repo
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys
4. See live changes in seconds

### Update Image Repository
1. Add/modify files in your images repo
2. Changes appear in VizPort instantly (no redeploy needed)
3. GitHub API fetches fresh content on each load

### Share Your App
- Send your Vercel URL to others
- They can view all files from your images repo
- No special setup needed for viewers

---

## Final Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] Live URL working
- [ ] All features tested on production
- [ ] Custom domain set (if desired)
- [ ] Rollback tested (optional)

---

## You're Live! 🚀

VizPort is now deployed on Vercel with continuous deployment on every git push.

**Your app is ready to:**
- Display images from GitHub
- Render Mermaid diagrams
- Show formatted Markdown
- Scale to thousands of requests
- Auto-deploy on git push

Enjoy!

