# Free Sound Files for MoodMaze

## 🎵 Quick Download Links

### Option 1: Mixkit (Free, No Attribution Required)

1. **Click Sound**
   - https://mixkit.co/free-sound-effects/click/
   - Download: "Interface Click" or "Button Click"

2. **Success Sound**
   - https://mixkit.co/free-sound-effects/win/
   - Download: "Achievement Bell" or "Success Notification"

3. **Reject Sound**
   - https://mixkit.co/free-sound-effects/fail/
   - Download: "Error Alert" or "Negative Notification"

4. **Swipe Sound**
   - https://mixkit.co/free-sound-effects/swipe/
   - Download: "Swipe Whoosh" or "Quick Swipe"

5. **Complete Sound**
   - https://mixkit.co/free-sound-effects/complete/
   - Download: "Task Complete" or "Level Complete"

### Option 2: Freesound (Free, Creative Commons)

Visit https://freesound.org and search for:
- "ui click"
- "button press"
- "success chime"
- "error beep"
- "card swipe"
- "whoosh"

### Option 3: Zapsplat (Free with Account)

1. Create free account: https://www.zapsplat.com/sound-effect-categories/
2. Browse: Interface & UI Sounds
3. Download MP3 versions

## 📥 Download Instructions

### Step 1: Create Sounds Directory
```bash
# In your project root
mkdir -p public/sounds
```

### Step 2: Download Files
1. Visit the links above
2. Download each sound as MP3
3. Rename files to match:
   - `click.mp3`
   - `success.mp3`
   - `reject.mp3`
   - `swipe.mp3`
   - `complete.mp3`
   - `flip.mp3`
   - `reel.mp3`

### Step 3: Place in Directory
Move all downloaded files to: `public/sounds/`

## 🎨 Recommended Sound Characteristics

- **Format**: MP3
- **Duration**: 0.1 - 1.0 seconds
- **Sample Rate**: 44.1 kHz
- **Bit Rate**: 128 kbps or higher
- **Volume**: Normalized (not too loud)

## 🔧 Convert WAV to MP3 (if needed)

### Using Online Converter
- https://cloudconvert.com/wav-to-mp3
- https://convertio.co/wav-mp3/

### Using FFmpeg (Command Line)
```bash
# Install ffmpeg first
# Windows: choco install ffmpeg
# Mac: brew install ffmpeg

# Convert single file
ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3

# Convert all WAV files in directory
for file in *.wav; do ffmpeg -i "$file" -codec:a libmp3lame -qscale:a 2 "${file%.wav}.mp3"; done
```

## 🎯 Quick Test

After adding sounds, test them:

```javascript
// In browser console
const audio = new Audio('/sounds/click.mp3');
audio.play();
```

## ✅ Checklist

- [ ] Created `public/sounds/` directory
- [ ] Downloaded `click.mp3`
- [ ] Downloaded `success.mp3`
- [ ] Downloaded `reject.mp3`
- [ ] Downloaded `swipe.mp3`
- [ ] Downloaded `complete.mp3`
- [ ] Downloaded `flip.mp3`
- [ ] Downloaded `reel.mp3`
- [ ] Tested sounds in browser
- [ ] Sounds play in app

## 🚀 Alternative: Use Placeholder Sounds

If you want to test without downloading:

1. Create silent MP3 files (for testing)
2. Or use data URLs for simple beeps
3. Replace with real sounds later

## 📝 License Notes

- **Mixkit**: Free for commercial use, no attribution required
- **Freesound**: Check individual licenses (most are CC0 or CC-BY)
- **Zapsplat**: Free with attribution in credits

Always check the specific license for each sound you download!

---

**Need help?** See `SOUND_AND_API_GUIDE.md` for complete documentation.
