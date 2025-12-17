# 🎬 TMDB API Key Setup Guide

## Step 1: Get Your Free TMDB API Key

1. **Visit TMDB Website**
   - Go to: https://www.themoviedb.org/signup
   - Create a free account (or log in if you already have one)

2. **Request API Key**
   - After logging in, go to: https://www.themoviedb.org/settings/api
   - Click **"Request an API Key"** button
   - Select **"Developer"** option
   - Fill out the form:
     - **Application Name**: MoodMaze (or any name you prefer)
     - **Application URL**: http://localhost:5147 (for development)
     - **Application Summary**: Movie recommendation app for finding movies based on mood
   - Accept the terms and conditions
   - Click **"Submit"**

3. **Copy Your API Key**
   - After approval (usually instant), you'll see your API key
   - It looks like: `abc123def456ghi789jkl012mno345pqr678`
   - **Copy this key** - you'll need it in the next step

---

## Step 2: Add API Key to Your Project

1. **Create `.env` File**
   - In the `mood-maze` folder, create a new file named `.env`
   - (Make sure it's exactly `.env` not `.env.txt`)

2. **Add Your API Key**
   - Open the `.env` file
   - Add this line (replace with your actual key):
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```
   - Example:
   ```
   VITE_TMDB_API_KEY=abc123def456ghi789jkl012mno345pqr678
   ```
   - **Important**: No spaces around the `=` sign
   - **Important**: No quotes around the key value

3. **Save the File**
   - Save the `.env` file in: `d:\dsaaaa\mood-maze\.env`

---

## Step 3: Restart Your Dev Server

1. **Stop the current server** (if running)
   - Press `Ctrl+C` in the terminal where the server is running

2. **Start it again**:
   ```bash
   cd d:\dsaaaa\mood-maze
   npm run dev
   ```

3. **The app will now use real movie data from TMDB!**

---

## Step 4: Verify It's Working

1. Open the app in your browser: http://localhost:5147
2. Complete the quiz
3. In the Screening Room, you should see:
   - ✅ Real movie posters from TMDB
   - ✅ Actual movie titles and synopses
   - ✅ Much larger selection of movies (thousands instead of 8 demo movies)

---

## 🔒 Security Note

- The `.env` file is already in `.gitignore` - your API key won't be committed to GitHub
- Never share your API key publicly
- The key is safe to use in development

---

## 🐛 Troubleshooting

### API Key Not Working?

1. **Check `.env` file location**
   - Must be in: `d:\dsaaaa\mood-maze\.env` (root of project)
   - Not in `src/` or `public/` folders

2. **Check the variable name**
   - Must be exactly: `VITE_TMDB_API_KEY`
   - Case-sensitive!

3. **Check for spaces**
   - Should be: `VITE_TMDB_API_KEY=your_key`
   - NOT: `VITE_TMDB_API_KEY = your_key` (no spaces)

4. **Restart the server**
   - Environment variables are only loaded when the server starts
   - You MUST restart after creating/modifying `.env`

5. **Verify your API key**
   - Check at: https://www.themoviedb.org/settings/api
   - Make sure it's active and not revoked

### Still Having Issues?

- Check browser console (F12) for error messages
- Verify the API key is valid by testing it directly
- Make sure you're using the correct port (5147)

---

## 📝 Quick Reference

**API Key Location**: https://www.themoviedb.org/settings/api

**Environment File**: `d:\dsaaaa\mood-maze\.env`

**Variable Format**:
```
VITE_TMDB_API_KEY=your_api_key_here
```

**After Setup**: Restart dev server with `npm run dev`

---

**That's it!** Your app will now fetch real movies from TMDB! 🎬✨

