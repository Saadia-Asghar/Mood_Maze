# 🎵 Sound Files Directory

## Add Your Sound Files Here!

Place your 5 MP3 files in this directory for them to work in both development and deployment.

### Required Files:

1. **click.mp3** - Button clicks and UI interactions
2. **success.mp3** - When saving a movie (Tick ✓)
3. **reject.mp3** - When rejecting a movie (Cross ✗)
4. **flip.mp3** - When flipping a movie card
5. **reel.mp3** - When clicking the Camera Reel to start over

### File Requirements:

- **Format:** MP3
- **Size:** Keep under 100KB each for best performance
- **Bitrate:** 128kbps is recommended
- **Sample Rate:** 44.1kHz or 48kHz

### How They're Used:

The app loads these files from `/sounds/` path:
- `/sounds/click.mp3`
- `/sounds/success.mp3`
- `/sounds/reject.mp3`
- `/sounds/flip.mp3`
- `/sounds/reel.mp3`

### Testing:

1. Add your MP3 files to this folder
2. Run `npm run dev`
3. Open the app and click the speaker icon (top-right) to enable sound
4. Interact with the app to hear the sounds!

### Deployment:

These files will automatically be included when you deploy to:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Any other platform

The `public` folder is served as-is, so these files will be accessible at `/sounds/` in production.

### Optional:

**The app works perfectly without sound files!** They're completely optional. If the files are missing, the app will:
- ✅ Still work normally
- ✅ Not show any errors
- ✅ Simply skip playing sounds

---

**Once you add the files, sounds will work everywhere!** 🎵✨
