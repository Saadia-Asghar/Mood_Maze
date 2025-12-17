# 🚀 MoodMaze Setup Guide

Complete guide to set up sound files and TMDB API key for the MoodMaze app.

---

## 🎵 Part 1: Sound Files Setup

### Step 1: Get Sound File

**Only one sound file is required:** `click.mp3`

You have several options:

#### Option A: Download from Free Sources (Recommended)

1. **Mixkit** (Free, no account needed - Easiest!)
   - Visit: https://mixkit.co/free-sound-effects/
   - Search for "button click" or "click"
   - Download a short click sound
   - Save as `click.mp3`

2. **Freesound.org** (Free, requires account)
   - Visit: https://freesound.org
   - Create a free account
   - Search for "button click"
   - Download and save as `click.mp3`

3. **Zapsplat** (Free with attribution)
   - Visit: https://www.zapsplat.com
   - Search for "button click"
   - Download and save as `click.mp3`

#### Option B: Create Simple Placeholder Sound

For quick testing, you can create a simple beep sound using:
- **Audacity** (free audio editor)
- **Online Tone Generator** websites
- Any short MP3 file (even 0.1 seconds of silence works)

### Step 2: Place File in Directory

1. Navigate to: `mood-maze/public/sounds/`
2. Place the file:
   - `click.mp3` (required)
   
**Note:** Other sounds (success, flip, reel, reject) are optional - the app works fine without them!

### Step 3: Test Sound

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open the app in your browser
3. Make sure the sound toggle button (🔊) is enabled
4. Test interactions:
   - Click any button → should hear `click.mp3`

**Note**: The app works perfectly without sound files - they're optional but enhance the experience!

---

## 🔑 Part 2: TMDB API Key Setup

### Step 1: Get Your Free TMDB API Key

1. **Visit TMDB Website**
   - Go to: https://www.themoviedb.org/signup
   - Create a free account (or log in if you have one)

2. **Request API Key**
   - Go to: https://www.themoviedb.org/settings/api
   - Click "Request an API Key"
   - Select "Developer" option
   - Fill out the form:
     - **Application Name**: MoodMaze (or any name)
     - **Application URL**: http://localhost:5147 (for development)
     - **Application Summary**: Movie recommendation app
   - Accept the terms and submit

3. **Copy Your API Key**
   - After approval (usually instant), you'll see your API key
   - Copy it (it looks like: `abc123def456ghi789jkl012mno345pqr678`)

### Step 2: Configure the API Key

1. **Create `.env` File**
   - In the `mood-maze` directory, create a file named `.env`
   - (Copy from `.env.example` if it exists)

2. **Add Your API Key**
   - Open `.env` file
   - Add this line:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```
   - Replace `your_actual_api_key_here` with your actual key from Step 1
   - Example:
   ```
   VITE_TMDB_API_KEY=abc123def456ghi789jkl012mno345pqr678
   ```

3. **Save the File**
   - Make sure the file is saved as `.env` (not `.env.txt`)
   - The file should be in: `mood-maze/.env`

### Step 3: Restart Dev Server

1. **Stop the current server** (Ctrl+C in terminal)
2. **Start it again**:
   ```bash
   npm run dev
   ```
3. The app will now use real movie data from TMDB!

### Step 4: Verify It's Working

1. Open the app in your browser
2. Complete the quiz
3. In the Screening Room, you should see:
   - Real movie posters from TMDB
   - Actual movie titles and synopses
   - Much larger selection of movies (instead of just 8 demo movies)

**Note**: The app works in "Demo Mode" without an API key, using 8 curated movies. Adding the API key gives you access to thousands of real movies!

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Sound files are in `public/sounds/` directory
- [ ] All 5 sound files are present (click, success, flip, reel, reject)
- [ ] `.env` file exists in `mood-maze/` directory
- [ ] `.env` contains `VITE_TMDB_API_KEY=your_key`
- [ ] Dev server has been restarted after adding API key
- [ ] Sound toggle button works (can enable/disable sounds)
- [ ] Sounds play when interacting with the app
- [ ] Movies load from TMDB (not just demo movies)

---

## 🐛 Troubleshooting

### Sounds Not Playing?

1. Check that files are in `public/sounds/` (not `src/sounds/`)
2. Verify file names match exactly (case-sensitive)
3. Make sure sound toggle is enabled (🔊 icon)
4. Check browser console for errors
5. Try refreshing the page

### API Key Not Working?

1. Verify `.env` file is in the `mood-maze/` root directory
2. Check that the variable name is exactly `VITE_TMDB_API_KEY`
3. Make sure there are no spaces around the `=` sign
4. Restart the dev server after creating/modifying `.env`
5. Check that your API key is valid at https://www.themoviedb.org/settings/api
6. Verify the API key starts with a letter/number (no quotes needed)

### Still Having Issues?

- Check the browser console (F12) for error messages
- Verify Node.js version: `node --version` (should be 16+)
- Try clearing browser cache
- Reinstall dependencies: `npm install`

---

## 📝 Quick Reference

**Sound Files Location**: `mood-maze/public/sounds/`

**Environment File Location**: `mood-maze/.env`

**Required Sound File**:
- click.mp3 (only one file needed!)

**Optional Sound Files** (app works fine without them):
- success.mp3
- flip.mp3
- reel.mp3
- reject.mp3

**Environment Variable**:
```
VITE_TMDB_API_KEY=your_api_key_here
```

---

**That's it!** Your MoodMaze app is now fully configured with sounds and real movie data! 🎬✨

