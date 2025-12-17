# 🎬 TMDB API Integration Complete!

## ✅ What's Been Added

Your MoodMaze app now fetches **real movies from TMDB API** based on quiz answers!

### 🎯 How It Works

1. **User takes quiz** → Answers about vibe, era, energy, risk
2. **Quiz answers mapped to TMDB filters** → Automatic genre, year, rating filters
3. **API fetches personalized movies** → Real-time movie data
4. **User swipes through recommendations** → Perfectly matched to their mood!

---

## 🔑 Get Your FREE TMDB API Key

### Step 1: Sign Up (2 minutes)
1. Go to https://www.themoviedb.org/signup
2. Fill in your details
3. Verify your email

### Step 2: Request API Key (3 minutes)
1. Log in to TMDB
2. Click your profile → **Settings**
3. Click **API** in the left sidebar
4. Click **Request an API Key**
5. Choose **Developer**
6. Fill in the form:
   - **Application Name**: MoodMaze
   - **Application URL**: http://localhost:5173
   - **Application Summary**: Movie recommendation app based on mood

### Step 3: Get Your Key
1. Accept the terms
2. Copy your **API Key (v3 auth)**
3. It looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## 📝 Configure Your App

### For Local Development:

1. Create `.env` file in project root:
```bash
cp .env.example .env
```

2. Edit `.env` and add your key:
```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

3. Restart dev server:
```bash
npm run dev
```

### For Vercel Deployment:

1. Go to https://vercel.com/dashboard
2. Click your `mood-maze` project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `VITE_TMDB_API_KEY`
   - **Value**: Your API key
5. Click **Save**
6. **Redeploy** your project

---

## 🎨 Quiz Answer → Movie Filter Mapping

Your app automatically converts quiz answers to TMDB API filters:

### Vibe → Genres
| Quiz Answer | Genres Fetched |
|-------------|----------------|
| **Mind-Bending** | Sci-Fi, Mystery |
| **Feel-Good** | Comedy, Family |
| **Adrenaline** | Action, Thriller |
| **Emotional** | Drama, Romance |

### Era → Year Range
| Quiz Answer | Year Range |
|-------------|------------|
| **Classic** | 1950-1989 |
| **90s-2000s** | 1990-2009 |
| **Modern** | 2010-present |
| **Any Era** | All years |

### Risk → Minimum Rating
| Quiz Answer | Min Rating |
|-------------|------------|
| **Play it Safe** | 7.5+ (highly rated) |
| **Balanced** | 6.5+ (good quality) |
| **High Risk** | 5.0+ (hidden gems) |

### Energy → Sort Order
| Quiz Answer | Sort By |
|-------------|---------|
| **Low Energy** | Highest rated first |
| **Medium** | Popular movies |
| **High Energy** | Most popular first |

---

## 🎬 Example API Calls

When a user selects:
- **Vibe**: Adrenaline
- **Era**: Modern
- **Risk**: Safe
- **Energy**: High

The app fetches:
```
Genre: Action, Thriller
Year: 2010-2025
Rating: 7.5+
Sort: Popularity
```

Result: Modern action thrillers like "John Wick", "Mad Max: Fury Road", etc.

---

## 🚀 Features

### ✅ Personalized Recommendations
- Movies matched to user's mood
- Genre filtering based on vibe
- Year range filtering based on era
- Quality filtering based on risk tolerance

### ✅ Smart Fallback
- **With API key**: Fetches 60+ movies per session
- **Without API key**: Uses 8 demo movies
- Seamless demo mode for testing

### ✅ Quality Assurance
- Only movies with 50+ votes
- Removes duplicates
- Fetches 3 pages for variety

---

## 🧪 Testing

### Test Without API Key (Demo Mode):
```bash
# Remove API key from .env
# VITE_TMDB_API_KEY=

npm run dev
```
You'll see: "Demo Mode: Add your TMDB API key to .env for full functionality"

### Test With API Key:
```bash
# Add API key to .env
VITE_TMDB_API_KEY=your_key_here

npm run dev
```
You'll see: "Fetched movies based on your preferences: 60"

---

## 📊 API Usage

### TMDB Free Tier Limits:
- **40 requests per 10 seconds**
- **Unlimited requests per day**

### Your App's Usage:
- **3 API calls per quiz completion** (3 pages of results)
- **~60 movies fetched** per session
- Well within free tier limits!

---

## 🎯 What Happens When User Takes Quiz

1. **User answers 5 questions**
2. **Clicks "Start Screening"**
3. **App shows loading screen**: "Finding your perfect matches..."
4. **App calls TMDB API** with filters:
   ```javascript
   fetchMixedMovies(quizAnswers)
   ```
5. **API returns 60 movies** matching criteria
6. **Recommendation engine ranks them** using DSA algorithm
7. **User swipes through cards** - Accept or Reject
8. **After 3 swipes** - Batch review screen
9. **User can continue** or retake quiz

---

## 🔧 Code Changes Made

### Updated Files:
1. **`src/hooks/useTMDB.js`**
   - Added `mapQuizToTMDBParams()` function
   - Updated `fetchMixedMovies()` to accept quiz answers
   - Maps vibe, era, risk, energy to TMDB filters

2. **`src/pages/ScreeningRoom.jsx`**
   - Passes `quizAnswers` to `fetchMixedMovies()`
   - Shows personalized movies based on mood

### New Features:
- ✅ Genre filtering based on vibe
- ✅ Year range filtering based on era
- ✅ Rating filtering based on risk
- ✅ Sort order based on energy
- ✅ Automatic quiz-to-filter mapping

---

## 🆘 Troubleshooting

### Movies Not Loading?
1. Check API key is correct in `.env`
2. Restart dev server after adding key
3. Check browser console for errors
4. Verify API key at https://www.themoviedb.org/settings/api

### Getting Same Movies?
- Quiz answers determine filters
- Try different quiz combinations
- API fetches 60 movies per session

### API Rate Limit?
- Free tier: 40 requests/10 seconds
- Your app: 3 requests/session
- Should never hit limit in normal use

---

## 📚 Resources

- **TMDB API Docs**: https://developers.themoviedb.org/3
- **Get API Key**: https://www.themoviedb.org/settings/api
- **Genre IDs**: https://developers.themoviedb.org/3/genres/get-movie-list
- **Discover Movies**: https://developers.themoviedb.org/3/discover/movie-discover

---

## 🎉 You're All Set!

Your MoodMaze app now:
- ✅ Fetches real movies from TMDB
- ✅ Personalizes based on quiz answers
- ✅ Maps mood to movie filters automatically
- ✅ Works in demo mode without API key
- ✅ Provides 60+ movies per session

**Next Steps:**
1. Get your free TMDB API key (5 minutes)
2. Add to `.env` file
3. Restart dev server
4. Take the quiz and see personalized movies! 🎬

---

**Happy movie discovering!** 🍿🎥
