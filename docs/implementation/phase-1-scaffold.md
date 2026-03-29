# Phase 1: Scaffold — Project Setup

**Duration:** ~10 minutes
**Goal:** Create Next.js app with all dependencies installed and ready for development

---

## Files to Create/Modify

- `package.json` (auto-generated)
- `.env.local` (create)
- `next.config.js` (create)
- `app/page.tsx` (clear boilerplate)

---

## Step 1: Create Next.js App

Run this command in the parent directory:

```bash
cd ~/Projects
npx create-next-app@latest vizport \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --eslint

cd vizport
```

**What this does:**
- ✅ Creates Next.js 14 with App Router
- ✅ Includes TypeScript support
- ✅ Includes Tailwind CSS v3
- ✅ Uses app router (not pages router)
- ✅ Sets up @ alias for imports

---

## Step 2: Install Additional Dependencies

```bash
npm install \
  mermaid \
  react-markdown \
  remark-gfm \
  rehype-highlight \
  lucide-react
```

**Verify installation:**
```bash
npm list | grep -E "mermaid|react-markdown|remark-gfm|rehype-highlight|lucide-react"
```

---

## Step 3: Create `.env.local`

Create file at project root:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_GITHUB_OWNER=your-github-username
NEXT_PUBLIC_GITHUB_REPO=your-images-repo
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_TOKEN=
EOF
```

**Replace:**
- `your-github-username` → your actual GitHub username
- `your-images-repo` → your separate images repo name

---

## Step 4: Create `next.config.js`

Create file at project root:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

**Why:** Allows loading images directly from GitHub raw content URLs.

---

## Step 5: Clear Boilerplate

Edit `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <div>
      {/* Main app will go here */}
    </div>
  );
}
```

---

## Verification Checklist

- [ ] Command executed without errors
- [ ] `node_modules/` created
- [ ] `package.json` has all dependencies listed
- [ ] `.env.local` created with env vars
- [ ] `next.config.js` created
- [ ] `app/page.tsx` cleared of boilerplate

---

## Test the Setup

```bash
npm run dev
```

Open http://localhost:3000

Expected: Blank page loads (no errors in console)

**If you see errors:**
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and `.next`, then run `npm install` again
- Clear browser cache (Ctrl+Shift+Delete)

---

## Next Phase

Once scaffold is verified working locally, proceed to **Phase 2: Types & Utils**.

