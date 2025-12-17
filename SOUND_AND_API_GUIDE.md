# 🎵 Sound & TMDB API Integration Guide

## 🔊 Sound System

### Overview
MoodMaze includes a complete sound system with:
- ✅ Sound effects for user interactions
- ✅ Global mute/unmute toggle
- ✅ Volume control
- ✅ Automatic sound management

### Sound Files Location
Place your sound files in: `public/sounds/`

### Required Sound Files

Create or download these MP3 files:

```
public/sounds/
├── click.mp3       - Button clicks
├── swipe.mp3       - Card swipes
├── accept.mp3      - Movie accepted
├── reject.mp3      - Movie rejected
├── complete.mp3    - Quiz/batch complete
├── transition.mp3  - Page transitions
├── ambient.mp3     - Background ambient (optional)
├── success.mp3     - Success actions
├── flip.mp3        - Card flip
└── reel.mp3        - Movie reel sound
```

### 🎨 Where to Get Sound Files

#### Option 1: Free Sound Libraries
1. **Freesound.org** - https://freesound.org
   - Search for: "click", "swipe", "success", "reject"
   - Download as MP3
   - License: Creative Commons

2. **Mixkit.co** - https://mixkit.co/free-sound-effects/
   - UI sounds section
   - Free for commercial use

3. **Zapsplat.com** - https://www.zapsplat.com
   - Free with attribution
   - Great UI sound effects

#### Option 2: Generate Your Own
1. **SFXR** - http://www.drpetter.se/project_sfxr.html
   - Generate retro game sounds
   - Export as WAV, convert to MP3

2. **Audacity** - https://www.audacityteam.org
   - Record and edit your own sounds
   - Free and open source

#### Option 3: Use Placeholder Silence
For testing, create silent MP3 files:
```bash
# Using ffmpeg (if installed)
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 -q:a 9 -acodec libmp3lame public/sounds/click.mp3
```

### 🎵 How to Use Sounds in Components

```jsx
import { useSound } from '../hooks/useSound';

function MyComponent() {
    const { playSound } = useSound();

    const handleClick = () => {
        playSound('click');
        // Your click logic
    };

    const handleAccept = () => {
        playSound('accept');
        // Accept movie logic
    };

    return (
        <button onClick={handleClick}>
            Click Me
        </button>
    );
}
```

### Available Sound Types
- `click` - Button clicks
- `success` - Success actions
- `flip` - Card flips
- `reel` - Movie reel
- `reject` - Rejection actions

### Sound Manager API

```javascript
import soundManager from '../lib/soundManager';

// Play a sound
soundManager.play('click');

// Play with loop
soundManager.play('ambient', true);

// Stop a sound
soundManager.stop('ambient');

// Set volume (0.0 to 1.0)
soundManager.setVolume(0.5);

// Mute/unmute
soundManager.setMuted(true);
soundManager.toggleMute();
```

---

## 🎬 TMDB API Integration

### What is TMDB?
The Movie Database (TMDB) is a free API that provides:
- Movie information
- Posters and images
- Ratings and reviews
- Cast and crew
- Trailers and videos

### 🔑 Getting Your TMDB API Key

#### Step 1: Create Account
1. Go to https://www.themoviedb.org/signup
2. Fill in your details
3. Verify your email

#### Step 2: Request API Key
1. Log in to TMDB
2. Go to Settings → API
3. Click "Request an API Key"
4. Choose "Developer"
5. Fill in the application form:
   - **Application Name**: MoodMaze
   - **Application URL**: http://localhost:5173 (or your domain)
   - **Application Summary**: Movie recommendation app based on mood

#### Step 3: Get Your Key
1. Accept the terms
2. Copy your **API Key (v3 auth)**
3. Save it securely

### 📝 Configure Your App

1. Create `.env` file in project root:
```bash
# Copy from .env.example
cp .env.example .env
```

2. Add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

3. Restart your dev server:
```bash
npm run dev
```

### 🎯 Using TMDB API in Your App

#### Import the Service
```javascript
import tmdbService from '../lib/tmdbService';
```

#### Discover Movies
```javascript
// Get popular movies
const data = await tmdbService.discoverMovies({
    page: 1,
    sort_by: 'popularity.desc'
});

// Get movies by genre
const comedies = await tmdbService.getMoviesByGenre(
    tmdbService.GENRES.COMEDY,
    1
);

// Get movies by year
const nineties = await tmdbService.getMoviesByYear(1990, 1999);

// Get highly rated movies
const topRated = await tmdbService.getMoviesByRating(8.0);
```

#### Search Movies
```javascript
const results = await tmdbService.searchMovies('Inception');
```

#### Get Movie Details
```javascript
const movie = await tmdbService.getMovieDetails(550); // Fight Club
console.log(movie.title, movie.overview, movie.poster_path);
```

#### Get Trending Movies
```javascript
const trending = await tmdbService.getTrendingMovies('week');
```

#### Get Movie Images
```javascript
import { getImageUrl } from '../lib/tmdbService';

// Get poster URL
const posterUrl = getImageUrl(movie.poster_path, 'w500');

// Image sizes: w185, w342, w500, w780, original
```

### 🎨 Quiz-Based Movie Discovery

The app automatically maps quiz answers to TMDB filters:

```javascript
import { mapQuizToFilters } from '../lib/tmdbService';

const quizAnswers = {
    vibe: 'thrill',      // → Horror/Thriller genres
    era: 'modern',       // → 2000-2014 year range
    energy: 'intense',   // → Sort by popularity
    risk: 'wild'         // → Rating >= 5.0
};

const filters = mapQuizToFilters(quizAnswers);
const movies = await tmdbService.discoverMovies(filters);
```

### 📊 Available Genres

```javascript
import { GENRES } from '../lib/tmdbService';

GENRES.ACTION          // 28
GENRES.COMEDY          // 35
GENRES.DRAMA           // 18
GENRES.HORROR          // 27
GENRES.ROMANCE         // 10749
GENRES.SCIENCE_FICTION // 878
GENRES.THRILLER        // 53
// ... and more
```

### 🎬 Movie Object Structure

```javascript
{
    id: 550,
    title: "Fight Club",
    overview: "A ticking-time-bomb insomniac...",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    vote_count: 26280,
    genre_ids: [18],
    popularity: 61.416,
    adult: false,
    original_language: "en"
}
```

### 🔄 Demo Mode (No API Key)

If no API key is set, the app uses demo data:

```javascript
import { isTMDBConfigured } from '../lib/tmdbService';

if (!isTMDBConfigured()) {
    // Use demo/sample data
    console.log('Running in demo mode');
}
```

### ⚠️ API Rate Limits

TMDB Free Tier:
- **40 requests per 10 seconds**
- **Unlimited requests per day**

Best practices:
- Cache responses when possible
- Debounce search inputs
- Use pagination wisely

### 🚀 Example: Fetch Movies on Quiz Complete

```javascript
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import tmdbService from '../lib/tmdbService';

function ScreeningRoom() {
    const [movies, setMovies] = useState([]);
    const quizAnswers = useStore(state => state.quizAnswers);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const filters = tmdbService.mapQuizToFilters(quizAnswers);
                const data = await tmdbService.discoverMovies(filters);
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
                // Fall back to demo data
            }
        };

        fetchMovies();
    }, [quizAnswers]);

    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
```

---

## 🎯 Quick Setup Checklist

### Sounds
- [ ] Create `public/sounds/` directory
- [ ] Download or create sound files
- [ ] Place MP3 files in `public/sounds/`
- [ ] Test sounds with `useSound()` hook

### TMDB API
- [ ] Sign up at themoviedb.org
- [ ] Request API key
- [ ] Create `.env` file
- [ ] Add `VITE_TMDB_API_KEY=your_key`
- [ ] Restart dev server
- [ ] Test API with `tmdbService`

---

## 🆘 Troubleshooting

### Sounds Not Playing
1. Check browser console for errors
2. Verify files exist in `public/sounds/`
3. Check file format (MP3 recommended)
4. Ensure sound is enabled in app settings
5. Check browser autoplay policies

### TMDB API Errors
1. Verify API key is correct
2. Check `.env` file format
3. Restart dev server after changing `.env`
4. Check network tab for API responses
5. Verify you haven't hit rate limits

### Images Not Loading
1. Check if `poster_path` exists
2. Use `getImageUrl()` helper function
3. Add fallback placeholder image
4. Check TMDB image CDN status

---

## 📚 Resources

- **TMDB API Docs**: https://developers.themoviedb.org/3
- **TMDB Image Guide**: https://developers.themoviedb.org/3/getting-started/images
- **Sound Effects**: https://freesound.org
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 🎉 You're All Set!

Your MoodMaze app now has:
- ✅ Complete sound system
- ✅ TMDB API integration
- ✅ Movie discovery based on mood
- ✅ Image loading with fallbacks
- ✅ Demo mode for testing

Happy coding! 🚀
