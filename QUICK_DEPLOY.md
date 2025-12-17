# 🚀 Quick Push to GitHub & Deploy

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mood-maze`
3. **DO NOT** check "Initialize with README"
4. Click "Create repository"
5. Copy the repository URL

## Step 2: Push Your Code
```bash
cd d:/dsaaaa/mood-maze

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mood-maze.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `mood-maze` repository
4. Click "Deploy"

## Step 4: Add Firebase Config (Optional)
In Vercel dashboard → Settings → Environment Variables:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## ✅ Done!
Your app will be live at: `https://mood-maze.vercel.app`

---

**Need detailed instructions?** See `DEPLOY_TO_VERCEL.md`
