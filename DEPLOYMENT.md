# 🚀 MoodMaze - Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free) - https://vercel.com

### Step-by-Step Deployment

#### 1. Prepare Your Project

Make sure your sound files are in place:
```
public/sounds/
├── click.mp3
├── success.mp3
├── reject.mp3
├── flip.mp3
└── reel.mp3
```

#### 2. Push to GitHub

```bash
cd d:\dsaaaa\mood-maze

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MoodMaze complete"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/mood-maze.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"
6. Done! Your app is live 🎉

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd d:\dsaaaa\mood-maze
vercel

# Follow the prompts
# Your app will be live in seconds!
```

#### 4. Add TMDB API Key (Optional)

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_TMDB_API_KEY` = `your_api_key_here`
3. Redeploy

---

## Deploy to Netlify

### Step-by-Step

#### 1. Create `netlify.toml`

Already created! The file includes:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy

**Option A: Drag & Drop**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder
4. Done!

**Option B: GitHub Integration**
1. Push to GitHub (see above)
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build settings are auto-detected
6. Click "Deploy site"

#### 3. Add Environment Variables

1. Site Settings → Environment Variables
2. Add: `VITE_TMDB_API_KEY` = `your_api_key_here`
3. Trigger redeploy

---

## Deploy to GitHub Pages

### Step-by-Step

#### 1. Update `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mood-maze/', // Replace with your repo name
})
```

#### 2. Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### 3. Update `package.json`

Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 4. Deploy

```bash
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/mood-maze/`

---

## Build Optimization

### Before Deploying

#### 1. Test Production Build Locally

```bash
# Build
npm run build

# Preview
npm run preview
```

Open http://localhost:4173 and test everything works.

#### 2. Check Build Size

```bash
npm run build
```

Look for output like:
```
dist/index.html                   0.52 kB
dist/assets/index-abc123.css     12.34 kB
dist/assets/index-def456.js     234.56 kB
```

#### 3. Optimize Images (if needed)

Sound files in `public/sounds/` should be:
- MP3 format
- < 100KB each
- 128kbps bitrate

---

## Environment Variables

### Development (`.env`)
```env
VITE_TMDB_API_KEY=your_development_key
```

### Production (Deployment Platform)

Add these in your deployment platform's dashboard:

| Variable | Value | Required? |
|----------|-------|-----------|
| `VITE_TMDB_API_KEY` | Your TMDB API key | Optional* |

*Optional because the app works in demo mode without it!

---

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] All pages accessible (Lobby, Quiz, Screening, Library)
- [ ] Quiz works and submits
- [ ] Movies display correctly
- [ ] Card flip animation works
- [ ] Save/Reject buttons work
- [ ] Library persists (localStorage)
- [ ] Sound files play (if added)
- [ ] Responsive on mobile
- [ ] No console errors

---

## Troubleshooting

### Issue: Blank page after deployment

**Solution:**
1. Check browser console for errors
2. Verify `index.html` is in `dist/` folder
3. Check base path in `vite.config.js`

### Issue: Sounds don't play

**Solution:**
1. Verify files are in `public/sounds/`
2. Check file names match exactly
3. Test with `npm run preview` first
4. Check browser console for 404 errors

### Issue: API calls fail

**Solution:**
1. App works in demo mode without API key
2. If using API key, verify it's set in environment variables
3. Check CORS settings (TMDB API allows all origins)

### Issue: 404 on page refresh

**Solution:**
- **Vercel/Netlify:** Automatically handled
- **GitHub Pages:** Use hash router or add 404.html redirect
- **Custom server:** Configure to serve index.html for all routes

---

## Performance Tips

### 1. Enable Compression

Most platforms (Vercel, Netlify) enable gzip/brotli automatically.

### 2. Lazy Load Routes

Already implemented with React.lazy (if needed in future).

### 3. Optimize Sound Files

```bash
# Use ffmpeg to compress MP3s
ffmpeg -i input.mp3 -b:a 128k -ar 44100 output.mp3
```

### 4. Enable Caching

Vite automatically adds hashes to filenames for cache busting.

---

## Custom Domain (Optional)

### Vercel
1. Domains → Add Domain
2. Follow DNS instructions
3. SSL automatically configured

### Netlify
1. Domain Settings → Add custom domain
2. Update DNS records
3. SSL automatically configured

---

## Monitoring

### Analytics (Optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Continuous Deployment

Once connected to GitHub:
- ✅ Push to `main` branch → Auto-deploy
- ✅ Pull requests → Preview deployments
- ✅ Rollback to previous versions anytime

---

## Example Deployment URLs

After deployment, your app will be accessible at:

- **Vercel:** `https://mood-maze.vercel.app`
- **Netlify:** `https://mood-maze.netlify.app`
- **GitHub Pages:** `https://username.github.io/mood-maze/`

---

**Your MoodMaze app is ready to deploy!** 🚀✨

Choose your platform, follow the steps, and share your cinematic movie discovery app with the world!
