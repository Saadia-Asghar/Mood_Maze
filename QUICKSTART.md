# 🚀 Quick Start Guide - MoodMaze

## Current Status

✅ **Project Structure**: Complete
✅ **All Code Files**: Created
✅ **Dependencies**: Installed
⚠️ **Dev Server**: Needs to be started manually

## To Run the Application

### Option 1: Using npm (Recommended)

Open a terminal in the project directory and run:

```bash
cd d:\dsaaaa\mood-maze
npm run dev
```

Then open your browser to: **http://localhost:5173**

### Option 2: Manual Vite Start

If `npm run dev` doesn't work, try:

```bash
cd d:\dsaaaa\mood-maze
npx vite
```

### Option 3: Check for Errors

If the server won't start, check for errors:

```bash
cd d:\dsaaaa\mood-maze
npm run dev --verbose
```

## Troubleshooting

### Issue: "npm run dev" fails silently

**Solution 1**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Solution 2**: Check Node version
```bash
node --version  # Should be 16.0.0 or higher
```

**Solution 3**: Try running Vite directly
```bash
npx vite --host
```

### Issue: Port 5173 is already in use

**Solution**: Kill the process or use a different port
```bash
npx vite --port 3000
```

### Issue: Module not found errors

**Solution**: Reinstall dependencies
```bash
npm install
```

## Demo Mode

The app works **without a TMDB API key** using demo data!

- 8 curated movies included
- Full functionality available
- Perfect for testing and development

## Adding TMDB API Key (Optional)

1. Get a free API key from: https://www.themoviedb.org/settings/api
2. Create a `.env` file in the root directory
3. Add your key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
4. Restart the dev server

## What to Expect

When the app loads, you'll see:

1. **Lobby Page**: Landing page with "Start the Show" button
2. **Quiz**: 5 questions about your mood and preferences
3. **Screening Room**: Swipe through movie recommendations
4. **Library**: View your saved movies

## Features to Test

- ✅ Click "Start the Show" to begin
- ✅ Answer all 5 quiz questions
- ✅ Flip movie cards to see details
- ✅ Save movies (Tick) or pass (Cross)
- ✅ Review batches of 3 movies
- ✅ Click the Camera Reel to start over
- ✅ View your library
- ✅ Toggle sound effects

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE not supported

## Performance Tips

- Use Chrome DevTools to see the Max-Heap in action
- Check the Console for scoring algorithm details
- Inspect localStorage to see persisted data

---

**Need Help?**

Check the full README.md for detailed documentation!
