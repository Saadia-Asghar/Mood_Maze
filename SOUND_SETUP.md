# 🎵 Sound Files Setup for Deployment

## ✅ Where to Place Your Sound Files

For the sounds to work both **locally** and in **deployment** (Vercel, Netlify, etc.), place your MP3 files in:

```
d:\dsaaaa\mood-maze\public\sounds\
```

### Required Files:

1. **click.mp3** - Button clicks and UI interactions
2. **success.mp3** - When saving a movie (Tick ✓)
3. **reject.mp3** - When rejecting a movie (Cross ✗)
4. **flip.mp3** - When flipping a movie card
5. **reel.mp3** - When clicking the Camera Reel

## 📂 Correct Structure

```
mood-maze/
├── public/
│   ├── sounds/
│   │   ├── click.mp3      ← Add this file
│   │   ├── success.mp3    ← Add this file
│   │   ├── reject.mp3     ← Add this file
│   │   ├── flip.mp3       ← Add this file
│   │   └── reel.mp3       ← Add this file
│   └── grain.svg
└── src/
    └── ...
```

## 🚀 Why `public/sounds/` ?

The `public` folder is special in Vite:
- ✅ Files are served as-is (no bundling)
- ✅ Works in development (`npm run dev`)
- ✅ Works in production build (`npm run build`)
- ✅ Works on all deployment platforms (Vercel, Netlify, GitHub Pages)
- ✅ Accessible via absolute paths (`/sounds/click.mp3`)

## 🎯 How It Works

The app loads sounds from `/sounds/` which maps to `public/sounds/`:

```javascript
// In useSound.js
const soundPaths = {
  click: '/sounds/click.mp3',      // → public/sounds/click.mp3
  success: '/sounds/success.mp3',  // → public/sounds/success.mp3
  flip: '/sounds/flip.mp3',        // → public/sounds/flip.mp3
  reel: '/sounds/reel.mp3',        // → public/sounds/reel.mp3
  reject: '/sounds/reject.mp3',    // → public/sounds/reject.mp3
};
```

## ✅ Checklist

- [ ] Create `public/sounds/` folder (if it doesn't exist)
- [ ] Copy `click.mp3` to `public/sounds/`
- [ ] Copy `success.mp3` to `public/sounds/`
- [ ] Copy `reject.mp3` to `public/sounds/`
- [ ] Copy `flip.mp3` to `public/sounds/`
- [ ] Copy `reel.mp3` to `public/sounds/`

## 🧪 Testing

### Local Testing:
1. Run `npm run dev`
2. Open http://localhost:5173
3. Click the speaker icon (top-right) to enable sound
4. Interact with the app to hear sounds

### Production Testing:
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Test sounds work in the preview

## 🔇 Graceful Fallback

**Good news:** If sound files are missing, the app still works perfectly!
- No errors shown to users
- Silent operation
- All functionality intact

The `useSound` hook handles missing files gracefully:
```javascript
audioRefs.current[type].addEventListener('error', () => {
  console.debug(`Sound file not found: ${soundPaths[type]}`);
  audioRefs.current[type] = null;
});
```

## 📦 Deployment Notes

### Vercel / Netlify:
- ✅ `public/` folder is automatically deployed
- ✅ Sounds will work immediately
- ✅ No special configuration needed

### GitHub Pages:
- ✅ `public/` folder is included in build
- ✅ Sounds accessible via `/sounds/` path

### Custom Server:
- ✅ Ensure `dist/sounds/` is served after build
- ✅ Check that static files are enabled

## 🎨 Sound Triggers in the App

| Action | Sound | When? |
|--------|-------|-------|
| Click buttons | `click.mp3` | Navigation, quiz options |
| Save movie | `success.mp3` | Clicking Tick (✓) button |
| Reject movie | `reject.mp3` | Clicking Cross (✗) button |
| Flip card | `flip.mp3` | Clicking movie card (optional) |
| Camera reel | `reel.mp3` | Clicking the spinning reel |

## 🔧 Troubleshooting

### Sounds don't play locally:
1. Check files are in `public/sounds/`
2. Check file names match exactly (case-sensitive)
3. Verify sound toggle is ON (speaker icon)
4. Check browser console for errors

### Sounds don't play after deployment:
1. Verify files were included in build (`dist/sounds/`)
2. Check browser console for 404 errors
3. Test with `npm run preview` before deploying
4. Ensure deployment platform serves static files

## 📝 File Format Requirements

- **Format:** MP3 (recommended)
- **Size:** Keep files small (< 100KB each for best performance)
- **Sample Rate:** 44.1kHz or 48kHz
- **Bitrate:** 128kbps is sufficient for UI sounds

## 🎵 Where to Get Sound Files

If you need free sound effects:

1. **Freesound.org** - https://freesound.org
2. **Zapsplat** - https://www.zapsplat.com
3. **Mixkit** - https://mixkit.co/free-sound-effects

Search for:
- "click" or "button"
- "success" or "achievement"
- "whoosh" or "swipe"
- "film reel" or "projector"
- "error" or "cancel"

---

**Once you add the files, sounds will work both locally and in deployment!** 🎵✨
