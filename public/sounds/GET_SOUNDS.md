# 🎵 Quick Guide: Getting Your Sound Files

## Option 1: Mixkit (Easiest - No Account Needed) ⭐ RECOMMENDED

### Direct Download Links:

1. **click.mp3** - Button Click Sound
   - Visit: https://mixkit.co/free-sound-effects/click/
   - Click "Download" on any click sound
   - Rename to `click.mp3`

2. **success.mp3** - Success/Chime Sound
   - Visit: https://mixkit.co/free-sound-effects/success/
   - Or search: "notification" or "chime"
   - Download and rename to `success.mp3`

3. **flip.mp3** - Card Flip/Page Turn Sound
   - Visit: https://mixkit.co/free-sound-effects/page-turn/
   - Or search: "card flip" or "paper"
   - Download and rename to `flip.mp3`

4. **reel.mp3** - Camera Shutter/Reel Sound
   - Visit: https://mixkit.co/free-sound-effects/camera/
   - Or search: "shutter" or "camera click"
   - Download and rename to `reel.mp3`

5. **reject.mp3** - Whoosh/Swipe Sound
   - Visit: https://mixkit.co/free-sound-effects/whoosh/
   - Or search: "swipe" or "whoosh"
   - Download and rename to `reject.mp3`

**Steps:**
1. Go to https://mixkit.co/free-sound-effects/
2. Search for each sound type above
3. Click "Download" on a sound you like
4. Save it to `mood-maze/public/sounds/` with the correct name
5. Repeat for all 5 sounds

---

## Option 2: Freesound.org (More Options - Free Account Required)

1. **Create free account**: https://freesound.org/people/signup/
2. **Search and download**:

   - **click.mp3**: Search "button click" or "mouse click"
   - **success.mp3**: Search "success chime" or "notification"
   - **flip.mp3**: Search "card flip" or "page turn"
   - **reel.mp3**: Search "camera shutter" or "film reel"
   - **reject.mp3**: Search "whoosh" or "swipe"

3. **Download** each sound and rename to match the required filename
4. **Place in**: `mood-maze/public/sounds/`

---

## Option 3: Zapsplat (Free with Attribution)

1. Visit: https://www.zapsplat.com
2. Create free account
3. Search for each sound type
4. Download and rename files
5. Place in `mood-maze/public/sounds/`

---

## Option 4: Create Simple Placeholder Sounds

If you just want to test quickly, you can create simple beep sounds:

### Using Online Tools:
1. **Online Tone Generator**: https://onlinetonegenerator.com/
2. Generate a short beep (0.1-0.3 seconds)
3. Download as MP3
4. Use the same file for all 5 sounds (just rename copies)

### Using Audacity (Free Software):
1. Download Audacity: https://www.audacityteam.org/
2. Generate → Tone (440 Hz, 0.2 seconds)
3. File → Export → Export as MP3
4. Repeat and rename for each sound

---

## Quick Checklist

After downloading, verify:

- [ ] `click.mp3` is in `mood-maze/public/sounds/`
- [ ] `success.mp3` is in `mood-maze/public/sounds/`
- [ ] `flip.mp3` is in `mood-maze/public/sounds/`
- [ ] `reel.mp3` is in `mood-maze/public/sounds/`
- [ ] `reject.mp3` is in `mood-maze/public/sounds/`
- [ ] All files are MP3 format
- [ ] File names match exactly (case-sensitive)

---

## Testing

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open the app in browser

3. Make sure sound is enabled (🔊 button in top right)

4. Test each sound:
   - Click any button → should hear `click.mp3`
   - Save a movie → should hear `success.mp3`
   - Flip a movie card → should hear `flip.mp3`
   - Click camera reel → should hear `reel.mp3`
   - Reject a movie → should hear `reject.mp3`

---

## Recommended Sound Characteristics

- **Duration**: 0.1 - 0.5 seconds (short and snappy)
- **Volume**: Moderate (app sets to 30% automatically)
- **Style**: Subtle, not too loud or jarring
- **Format**: MP3 (any quality works)

---

## Troubleshooting

**Sounds not playing?**
- Check file names match exactly (case-sensitive)
- Verify files are in `public/sounds/` (not `src/sounds/`)
- Make sure sound toggle is enabled (🔊 icon)
- Check browser console (F12) for errors
- Try refreshing the page

**Files won't download?**
- Make sure you're on a legitimate free sound site
- Some sites require account creation (it's free)
- Try a different browser if downloads fail

**Need different sounds?**
- Any MP3 file works - even silence!
- You can use the same sound file for all 5 (just rename copies)
- The app won't break if sounds are missing

---

**Tip**: Start with Mixkit - it's the fastest and easiest option! 🚀

