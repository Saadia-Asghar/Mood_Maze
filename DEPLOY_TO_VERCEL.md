# 🚀 Deploy MoodMaze to Vercel

## ✅ What's Been Done

1. ✅ Cleaned up unnecessary files (batch files, extra documentation, audio files)
2. ✅ Removed duplicate `node_modules` and `package.json` from parent directory
3. ✅ Installed Firebase dependencies
4. ✅ Initialized Git repository
5. ✅ Created initial commit

## 📋 Essential Files for Vercel Deployment

Your project now contains only the essential files:

### Core Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `package-lock.json` - Locked dependency versions
- ✅ `vite.config.js` - Vite configuration
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `index.html` - Entry HTML file

### Configuration Files
- ✅ `.gitignore` - Git ignore rules
- ✅ `.env.example` - Environment variable template
- ✅ `tailwind.config.js` - Tailwind CSS configuration
- ✅ `postcss.config.js` - PostCSS configuration

### Firebase Files (Optional)
- ✅ `firebase.json` - Firebase hosting configuration
- ✅ `.firebaserc` - Firebase project configuration

### Source Code
- ✅ `src/` - All source code
- ✅ `public/` - Static assets

### Documentation
- ✅ `README.md` - Project documentation

## 🔗 Step 1: Push to GitHub

### Option A: Create New Repository on GitHub
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `mood-maze`
3. **DO NOT** initialize with README (we already have one)
4. Copy the repository URL (e.g., `https://github.com/yourusername/mood-maze.git`)

### Option B: Use Existing Repository
If you already have a repository, get its URL.

### Add Remote and Push
```bash
# Navigate to project directory
cd d:/dsaaaa/mood-maze

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/mood-maze.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `mood-maze` repository
5. Vercel will auto-detect Vite configuration
6. Click **"Deploy"**

### Method 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd d:/dsaaaa/mood-maze

# Deploy
vercel
```

## 🔐 Step 3: Configure Environment Variables

After deployment, add your Firebase configuration:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Click **"Save"**
5. Redeploy the project for changes to take effect

## 📝 Step 4: Get Firebase Credentials

If you don't have Firebase credentials yet:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Click the gear icon → **Project Settings**
4. Scroll down to **"Your apps"**
5. Click **"Web app"** (</>) icon
6. Register your app
7. Copy the configuration values

## 🎯 Quick Commands Reference

```bash
# Check Git status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Vercel will auto-deploy on every push to main branch
```

## ⚠️ Important Notes

1. **`.env` file is NOT pushed to GitHub** (it's in `.gitignore`)
2. **`node_modules` is NOT pushed** (it's in `.gitignore`)
3. **`dist` folder is NOT pushed** (Vercel builds it automatically)
4. **Environment variables must be set in Vercel dashboard**

## 🔄 Future Updates

To update your deployed app:

```bash
# Make your changes
# Then:
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically rebuild and redeploy! 🎉

## 🆘 Troubleshooting

### Build Fails on Vercel
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Firebase Not Working
- Ensure environment variables are set in Vercel
- Check Firebase project settings
- Verify API keys are correct

### App Shows Blank Page
- Check browser console for errors
- Verify `vercel.json` rewrites configuration
- Check if build completed successfully

## 📞 Need Help?

- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs
- Vite Documentation: https://vitejs.dev/guide/
