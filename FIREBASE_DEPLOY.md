# 🚀 Deploy MoodMaze to Firebase Hosting

## ✅ Your Firebase Project is Ready!

**Project ID:** `moodmaze-b8488`
**Hosting URL:** `https://moodmaze-b8488.web.app`

## 📦 Quick Deploy (3 Steps)

### Step 1: Build Your App

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 2: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### Step 3: Deploy to Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase (first time only)
firebase init

# When prompted:
# - Select: Hosting
# - Use existing project: moodmaze-b8488
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Deploy!
firebase deploy
```

Your app will be live at: **https://moodmaze-b8488.web.app** 🎉

## 🔧 Detailed Setup

### First-Time Firebase CLI Setup

1. **Install Firebase Tools:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   
   This opens your browser for Google authentication.

3. **Initialize Firebase in Your Project:**
   ```bash
   cd d:\dsaaaa\mood-maze
   firebase init
   ```

4. **Select Features:**
   - Use arrow keys to select: **Hosting**
   - Press Space to select, Enter to confirm

5. **Project Setup:**
   - "Use an existing project"
   - Select: **moodmaze-b8488**

6. **Hosting Setup:**
   - Public directory: **dist**
   - Single-page app: **Yes**
   - Set up automatic builds with GitHub: **No** (for now)
   - Overwrite index.html: **No**

### Build and Deploy

```bash
# Build the production version
npm run build

# Deploy to Firebase
firebase deploy
```

## 🎯 Deployment Checklist

- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged in to Firebase (`firebase login`)
- [ ] Project initialized (`firebase init`)
- [ ] Production build created (`npm run build`)
- [ ] Deployed (`firebase deploy`)
- [ ] Tested at https://moodmaze-b8488.web.app

## 📝 Environment Variables

### For Firebase Hosting:

Firebase Hosting serves static files, so environment variables are baked into the build.

**Your Firebase config is already in the code** (it's safe to expose):
```javascript
apiKey: "AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68"
authDomain: "moodmaze-b8488.firebaseapp.com"
projectId: "moodmaze-b8488"
// ... etc
```

**For TMDB API (optional):**

If you want to add your TMDB API key:

1. Create `.env` file locally:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_key_here
   ```

2. Build with the key:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

## 🔄 Update Deployment

To update your live site:

```bash
# Make your changes
# ...

# Build
npm run build

# Deploy
firebase deploy
```

That's it! Your changes are live in seconds.

## 🌐 Custom Domain (Optional)

### Add Your Own Domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **moodmaze-b8488**
3. Go to **Hosting**
4. Click **Add custom domain**
5. Follow the instructions to verify and connect

## 📊 Firebase Hosting Features

Your app automatically gets:

- ✅ **HTTPS** - Free SSL certificate
- ✅ **CDN** - Global content delivery
- ✅ **Fast** - Optimized for speed
- ✅ **Free Tier** - 10GB storage, 360MB/day transfer
- ✅ **Rollback** - Easy version management

## 🔧 Firebase CLI Commands

```bash
# Deploy to Firebase
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# View deployment history
firebase hosting:channel:list

# Create preview channel
firebase hosting:channel:deploy preview

# Open Firebase console
firebase open hosting

# View logs
firebase hosting:channel:list
```

## 🎨 What Gets Deployed

```
dist/
├── index.html           → Your app
├── assets/
│   ├── index-[hash].js  → JavaScript bundle
│   ├── index-[hash].css → Styles
│   └── ...              → Other assets
├── sounds/              → Sound files (if added)
│   ├── click.mp3
│   ├── success.mp3
│   └── ...
└── grain.svg            → Film grain texture
```

## ✅ Post-Deployment Testing

After deploying, test these features:

1. **Visit:** https://moodmaze-b8488.web.app
2. **Test Firebase Auth:**
   - Click auth button (top-left)
   - Sign in with Google
   - Should work seamlessly!
3. **Test Cloud Sync:**
   - Save some movies
   - Click "Sync to Cloud"
   - Check Firestore Console
4. **Test on Mobile:**
   - Open on your phone
   - Should be fully responsive
5. **Test Offline:**
   - Disconnect internet
   - App should still load (cached)

## 🔒 Security

### Firestore Rules:

Make sure your Firestore rules are set:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **moodmaze-b8488**
3. Go to **Firestore Database** → **Rules**
4. Paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Click **Publish**

### Authentication:

1. Go to **Authentication** → **Settings**
2. Add authorized domains:
   - `moodmaze-b8488.web.app` (auto-added)
   - `moodmaze-b8488.firebaseapp.com` (auto-added)
   - Your custom domain (if you add one)

## 📈 Monitor Your App

### Firebase Console:

- **Hosting:** View traffic, bandwidth usage
- **Authentication:** See active users
- **Firestore:** Monitor database reads/writes
- **Analytics:** (if enabled) User behavior

### View Logs:

```bash
firebase hosting:channel:list
```

## 🎯 Continuous Deployment (Optional)

### GitHub Actions:

Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: moodmaze-b8488
```

## 🚀 Quick Commands Reference

```bash
# Build
npm run build

# Deploy
firebase deploy

# Preview locally
npm run preview

# View live site
firebase open hosting:site

# Rollback to previous version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID DEST_SITE_ID:live
```

## 🎉 You're Live!

Your MoodMaze app is now deployed at:

**🌐 https://moodmaze-b8488.web.app**

Share it with the world! 🎬✨

---

## 📝 Summary

**Your Firebase Project:**
- Project ID: `moodmaze-b8488`
- Hosting URL: `https://moodmaze-b8488.web.app`
- Authentication: ✅ Google Sign-In enabled
- Database: ✅ Firestore ready
- Hosting: ✅ Configured

**To Deploy:**
```bash
npm run build
firebase deploy
```

**To Update:**
```bash
npm run build
firebase deploy
```

That's it! 🚀
