# 🚀 Push MoodMaze to GitHub - Quick Guide

## Your GitHub Repository
**URL:** https://github.com/Saadia-Asghar/Mood_Maze

## ⚡ Quick Push (Easiest Method)

### Just run this script:
```bash
.\push-to-github.bat
```

This will automatically:
1. ✅ Initialize Git
2. ✅ Add GitHub remote
3. ✅ Add all files
4. ✅ Create commit
5. ✅ Push to GitHub

## 🔑 GitHub Authentication

When prompted for credentials:

**Username:** `Saadia-Asghar`

**Password:** Use a **Personal Access Token** (NOT your GitHub password)

### Get Your Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `MoodMaze Deploy`
4. Select scopes: ✅ **repo** (all)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

## 📝 Manual Method (If Script Doesn't Work)

```bash
# 1. Initialize Git
git init

# 2. Add remote
git remote add origin https://github.com/Saadia-Asghar/Mood_Maze.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "Complete MoodMaze app with Firebase integration"

# 5. Push
git branch -M main
git push -u origin main
```

## ✅ What Will Be Pushed

### Source Code:
- ✅ All React components
- ✅ Firebase integration
- ✅ DSA implementation (Max-Heap)
- ✅ State management (Zustand)
- ✅ API hooks (TMDB)
- ✅ Pages (Lobby, Quiz, Screening, Library)
- ✅ UI components

### Configuration:
- ✅ package.json
- ✅ tailwind.config.js
- ✅ vite.config.js
- ✅ firebase.json
- ✅ .env.example (NOT .env - secrets protected!)

### Documentation:
- ✅ README.md
- ✅ FIREBASE_SETUP.md
- ✅ FIREBASE_DEPLOY.md
- ✅ DEPLOYMENT.md
- ✅ DATABASE_STRATEGY.md
- ✅ SOUND_SETUP.md
- ✅ And all other guides

### Protected (NOT pushed):
- ❌ node_modules/
- ❌ .env (your secrets)
- ❌ dist/ (build folder)
- ❌ .firebase/ (cache)

## 🔧 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Saadia-Asghar/Mood_Maze.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "authentication failed"
- Make sure you're using a **Personal Access Token**, not your password
- Token must have **repo** scope enabled

### Error: "Permission denied"
- Check you're logged in to the correct GitHub account
- Verify repository URL is correct

## 📊 After Pushing

Your GitHub repo will show:
- ✅ All source code
- ✅ Complete README
- ✅ Project structure
- ✅ Documentation
- ✅ Commit history

## 🎯 Next Steps

After pushing to GitHub:

1. **Add Description:**
   - Go to your repo
   - Click "About" settings (⚙️)
   - Add: "Cinematic movie recommendation app using Max-Heap DSA, Firebase, and TMDB API"

2. **Add Topics:**
   - `react`
   - `vite`
   - `tailwindcss`
   - `firebase`
   - `movie-recommendation`
   - `data-structures`
   - `max-heap`
   - `portfolio-project`

3. **Add Website:**
   - After deploying: `https://moodmaze-b8488.web.app`

4. **Enable GitHub Pages (Optional):**
   - Settings → Pages
   - Source: GitHub Actions
   - Deploy from `dist` folder

## 🔄 Future Updates

To push changes later:

```bash
git add .
git commit -m "Your update message"
git push
```

Or just run:
```bash
.\push-to-github.bat
```

---

**Ready?** Just run `.\push-to-github.bat` and follow the prompts! 🚀
