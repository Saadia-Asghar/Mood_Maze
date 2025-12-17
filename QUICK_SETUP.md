# ⚡ Quick Setup - Sound Files & API Key

## 🎵 Sound File (2 minutes)

1. **Download click sound** from:
   - **Mixkit**: https://mixkit.co/free-sound-effects/ (easiest, no account needed)
   - Search for "button click" or "click"

2. **Save 1 file** to `public/sounds/`:
   - `click.mp3` - button click sound (required)

3. **Restart server** and test!

**Tip**: Only `click.mp3` is needed! Other sounds are optional.

---

## 🔑 TMDB API Key (2 minutes)

1. **Get free API key**:
   - Visit: https://www.themoviedb.org/signup
   - Create account → Settings → API → Request API Key
   - Choose "Developer" → Fill form → Get key

2. **Add to `.env` file**:
   ```bash
   # Create .env file in mood-maze/ directory
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Restart server**:
   ```bash
   npm run dev
   ```

Done! 🎉

**For detailed instructions, see `SETUP_GUIDE.md`**

