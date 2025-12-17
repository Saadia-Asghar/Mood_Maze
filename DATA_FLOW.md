# 💾 MoodMaze - Data Flow & Storage Architecture

## Current Implementation (No Database Needed!)

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  REACT APP (MoodMaze)                                    │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │  ZUSTAND STORE (State Management)               │    │  │
│  │  │                                                  │    │  │
│  │  │  State:                                          │    │  │
│  │  │  • library: []        (Saved movies)            │    │  │
│  │  │  • rejectedIds: []    (Rejected movie IDs)      │    │  │
│  │  │  • quizAnswers: {}    (Current quiz)            │    │  │
│  │  │  • currentBatch: []   (Current 3 movies)        │    │  │
│  │  │  • soundEnabled: true (Sound preference)        │    │  │
│  │  │                                                  │    │  │
│  │  │  Actions:                                        │    │  │
│  │  │  • addToLibrary(movie)                          │    │  │
│  │  │  • removeFromLibrary(id)                        │    │  │
│  │  │  • addToRejected(id)                            │    │  │
│  │  │  • setQuizAnswer(q, a)                          │    │  │
│  │  └──────────────────┬───────────────────────────────┘    │  │
│  │                     │                                     │  │
│  │                     │ Zustand Persist Middleware          │  │
│  │                     ↓                                     │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │  BROWSER LOCALSTORAGE                            │    │  │
│  │  │                                                   │    │  │
│  │  │  Key: "moodmaze-storage"                         │    │  │
│  │  │  Value: {                                        │    │  │
│  │  │    "state": {                                    │    │  │
│  │  │      "library": [...],                           │    │  │
│  │  │      "rejectedIds": [...],                       │    │  │
│  │  │      "soundEnabled": true                        │    │  │
│  │  │    },                                            │    │  │
│  │  │    "version": 0                                  │    │  │
│  │  │  }                                               │    │  │
│  │  │                                                   │    │  │
│  │  │  Capacity: ~5-10MB                               │    │  │
│  │  │  Persistence: Permanent (until cleared)          │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  External API Calls:                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  TMDB API (Read-Only)                                    │  │
│  │  • Fetch popular movies                                  │  │
│  │  │  • Fetch top-rated movies                              │  │
│  │  • No user data sent                                     │  │
│  │  • No authentication required                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
USER INTERACTION → ZUSTAND STORE → LOCALSTORAGE
                        ↓
                   UI UPDATES
                        ↓
                  USER SEES CHANGES
```

### Example: Saving a Movie

```
1. User clicks "Save" (Tick ✓)
   ↓
2. Card3D.jsx calls onTick(movie)
   ↓
3. ScreeningRoom.jsx calls addToLibrary(movie)
   ↓
4. Zustand store updates state.library
   ↓
5. Persist middleware saves to localStorage
   ↓
6. UI re-renders showing movie in library
   ↓
7. Data persists even after browser close
```

### Example: Rejecting a Movie

```
1. User clicks "Pass" (Cross ✗)
   ↓
2. Card3D.jsx calls onCross(movie)
   ↓
3. ScreeningRoom.jsx calls addToRejected(movie.id)
   ↓
4. Zustand store updates state.rejectedIds
   ↓
5. Recommendation engine marks movie as rejected
   ↓
6. Movie never shown again (Hash Set O(1) lookup)
   ↓
7. Rejection persists in localStorage
```

## Storage Breakdown

### What's Stored

```javascript
{
  "moodmaze-storage": {
    "state": {
      // LIBRARY (Saved Movies)
      "library": [
        {
          "id": 550,
          "title": "Fight Club",
          "overview": "A ticking-time-bomb insomniac...",
          "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
          "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          "vote_average": 8.4,
          "vote_count": 26000,
          "popularity": 85.5,
          "release_date": "1999-10-15",
          "genre_ids": [18, 53, 35],
          "adult": false,
          "score": 245,
          "matchReason": "mind-bending vibe • Drama"
        }
        // ... more movies
      ],
      
      // REJECTED IDS (Hash Set)
      "rejectedIds": [123, 456, 789, 1011],
      
      // PREFERENCES
      "soundEnabled": true
    },
    "version": 0
  }
}
```

### Storage Size Calculation

```
Single Movie Object: ~2KB
├── Basic Info: ~500 bytes
├── Overview: ~500 bytes
├── Poster/Backdrop URLs: ~200 bytes
├── Metadata: ~300 bytes
└── Score/Reason: ~500 bytes

Typical User Library: 50 movies
50 movies × 2KB = 100KB

Rejected IDs: 100 movies
100 IDs × 4 bytes = 400 bytes

Total: ~100KB (well within 5-10MB limit)
```

## Advantages of Current Approach

### ✅ Pros

1. **Zero Cost**
   - No database hosting fees
   - No API costs (TMDB is free)
   - No backend server needed

2. **Privacy**
   - Data never leaves user's device
   - No user tracking
   - No data collection

3. **Speed**
   - Instant read/write (no network)
   - No latency
   - Works offline

4. **Simplicity**
   - No authentication needed
   - No backend to maintain
   - No database migrations

5. **Reliability**
   - No server downtime
   - No database connection issues
   - Always available

### ⚠️ Limitations

1. **No Cross-Device Sync**
   - Library only on current device
   - Can't access from phone if saved on desktop

2. **No Sharing**
   - Can't share library with friends
   - No social features

3. **Browser-Specific**
   - Clearing browser data = losing library
   - Different browsers = different libraries

4. **No Backup**
   - No automatic cloud backup
   - User must export manually (if feature added)

## When to Upgrade to a Database

### Scenario 1: User Accounts
**Need:** Users want to log in and access library from any device

**Solution:** Add Firebase Authentication + Firestore
```javascript
// Store library in Firestore instead of localStorage
const saveLibrary = async (userId, library) => {
  await setDoc(doc(db, 'users', userId), {
    library,
    updatedAt: new Date()
  });
};
```

### Scenario 2: Social Features
**Need:** Users want to share libraries, see friends' recommendations

**Solution:** Add Supabase with user profiles
```sql
CREATE TABLE user_libraries (
  user_id UUID,
  movie_id INTEGER,
  shared BOOLEAN DEFAULT false
);
```

### Scenario 3: Analytics
**Need:** Track popular movies, user behavior, trends

**Solution:** Add backend with MongoDB
```javascript
// Track movie saves
await db.collection('analytics').insertOne({
  action: 'save_movie',
  movieId: 550,
  timestamp: new Date()
});
```

## Current Data Persistence Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. APP LOADS                                               │
├─────────────────────────────────────────────────────────────┤
│  • Zustand reads from localStorage                          │
│  • Hydrates store with saved data                           │
│  • User sees their library immediately                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. USER INTERACTS                                          │
├─────────────────────────────────────────────────────────────┤
│  • Saves a movie                                            │
│  • Rejects a movie                                          │
│  • Toggles sound                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. STATE UPDATES                                           │
├─────────────────────────────────────────────────────────────┤
│  • Zustand updates in-memory state                          │
│  • Persist middleware triggers                              │
│  • Data written to localStorage                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  4. UI RE-RENDERS                                           │
├─────────────────────────────────────────────────────────────┤
│  • React components re-render                               │
│  • User sees updated library                                │
│  • Changes are immediate                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  5. PERSISTENCE                                             │
├─────────────────────────────────────────────────────────────┤
│  • Data remains in localStorage                             │
│  • Survives page refresh                                    │
│  • Survives browser close                                   │
│  • Persists until user clears browser data                  │
└─────────────────────────────────────────────────────────────┘
```

## Summary

### Current Implementation: ✅ Production Ready

- **Storage**: Browser LocalStorage (5-10MB)
- **State**: Zustand with persist middleware
- **Data**: Library, rejected IDs, preferences
- **Sync**: None (local only)
- **Cost**: $0
- **Maintenance**: Zero

### Perfect For:
- ✅ Portfolio projects
- ✅ Personal use
- ✅ MVP/Demo
- ✅ Single-device usage
- ✅ Privacy-focused apps

### Upgrade When:
- 🔄 Need cross-device sync
- 👥 Want user accounts
- 🤝 Need social features
- 📊 Want analytics
- ☁️ Need cloud backup

---

**Your current setup is perfect for MoodMaze!** No database needed. 💾✨
