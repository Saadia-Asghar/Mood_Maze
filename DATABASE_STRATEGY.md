# 💾 MoodMaze - Database & Storage Strategy

## 🎯 No Traditional Database Needed!

MoodMaze uses a **client-side storage strategy** which is perfect for this application. Here's why:

### ✅ Current Storage Solution

**Browser LocalStorage** (via Zustand persistence)

This is ideal because:
- ✅ **No backend required** - Fully client-side
- ✅ **Free** - No database hosting costs
- ✅ **Fast** - Instant read/write
- ✅ **Private** - Data stays on user's device
- ✅ **Simple** - No authentication needed
- ✅ **Works offline** - No internet required after initial load

### 📊 What Gets Stored

The app stores 3 things in localStorage:

```javascript
{
  "moodmaze-storage": {
    "library": [
      {
        "id": 550,
        "title": "Inception",
        "poster_path": "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        "vote_average": 8.4,
        "genre_ids": [28, 878, 53],
        "score": 245,
        // ... other movie data
      }
    ],
    "rejectedIds": [123, 456, 789],
    "soundEnabled": true
  }
}
```

### 🔍 How It Works

#### 1. **Library** (Saved Movies)
- Stores complete movie objects
- Persists across sessions
- User can view/remove anytime

#### 2. **Rejected IDs** (Hash Set)
- Stores movie IDs user passed on
- Prevents showing same rejected movies
- Efficient O(1) lookup

#### 3. **Sound Preference**
- Remembers if user enabled/disabled sound
- Persists across sessions

### 💡 Why This Approach?

**For MoodMaze, this is the BEST solution because:**

1. **Personal Use** - Each user's library is private to them
2. **No Sharing Needed** - Users don't need to share libraries
3. **Stateless** - No user accounts required
4. **Fast** - Instant access, no network calls
5. **Simple** - No backend to maintain
6. **Free** - Zero hosting costs

---

## 🚀 If You Want to Add a Database (Optional)

### Option 1: Firebase (Easiest)

**Use Case:** User accounts, cloud sync, sharing libraries

#### Setup:

1. **Install Firebase:**
```bash
npm install firebase
```

2. **Create Firebase Config:**
```javascript
// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moodmaze.firebaseapp.com",
  projectId: "moodmaze",
  storageBucket: "moodmaze.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

3. **Update Zustand Store:**
```javascript
// src/store/useStore.js
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Add sync functions
const syncToFirebase = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), {
    library: data.library,
    rejectedIds: data.rejectedIds,
    updatedAt: new Date()
  });
};
```

**Features You Get:**
- ✅ User authentication (Google, Email)
- ✅ Cloud sync across devices
- ✅ Share libraries with friends
- ✅ Backup & restore
- ✅ Free tier (generous limits)

---

### Option 2: Supabase (PostgreSQL)

**Use Case:** Relational data, advanced queries, user profiles

#### Setup:

1. **Install Supabase:**
```bash
npm install @supabase/supabase-js
```

2. **Create Supabase Client:**
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

3. **Database Schema:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Libraries table
CREATE TABLE libraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  movie_id INTEGER NOT NULL,
  movie_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rejected movies table
CREATE TABLE rejected_movies (
  user_id UUID REFERENCES users(id),
  movie_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, movie_id)
);
```

**Features You Get:**
- ✅ PostgreSQL database
- ✅ Row-level security
- ✅ Real-time subscriptions
- ✅ Authentication built-in
- ✅ Free tier available

---

### Option 3: MongoDB Atlas (NoSQL)

**Use Case:** Flexible schema, large datasets

#### Setup:

1. **Install MongoDB:**
```bash
npm install mongodb
```

2. **Connect to MongoDB:**
```javascript
// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  return client.db('moodmaze');
}
```

3. **Collections:**
```javascript
// users collection
{
  _id: ObjectId,
  email: String,
  library: [
    {
      movieId: Number,
      movieData: Object,
      addedAt: Date
    }
  ],
  rejectedIds: [Number],
  preferences: {
    soundEnabled: Boolean
  }
}
```

---

## 📊 Comparison Table

| Feature | LocalStorage | Firebase | Supabase | MongoDB |
|---------|-------------|----------|----------|---------|
| **Cost** | Free | Free tier | Free tier | Free tier |
| **Setup** | ✅ Done | Medium | Medium | Complex |
| **User Auth** | ❌ No | ✅ Yes | ✅ Yes | Manual |
| **Cloud Sync** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Offline** | ✅ Yes | Partial | Partial | ❌ No |
| **Sharing** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Backend** | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Best For** | MVP/Demo | Social | Advanced | Enterprise |

---

## 🎯 Recommendation

### For Your Current Project: **Keep LocalStorage** ✅

**Why?**
- ✅ Already implemented and working
- ✅ Perfect for portfolio/demo
- ✅ No additional costs
- ✅ Simple to maintain
- ✅ Fast and reliable

### When to Add a Database:

**Add Firebase if:**
- You want user accounts
- Users need to sync across devices
- You want social features (sharing libraries)
- You want to track analytics

**Add Supabase if:**
- You need complex queries
- You want relational data
- You need real-time features
- You want more control than Firebase

**Add MongoDB if:**
- You have very flexible data structures
- You need to scale to millions of users
- You want full backend control

---

## 🔧 Current Implementation Details

### How LocalStorage Works in MoodMaze:

```javascript
// src/store/useStore.js
const useStore = create(
  persist(
    (set, get) => ({
      library: [],
      rejectedIds: [],
      soundEnabled: true,
      // ... other state
    }),
    {
      name: 'moodmaze-storage', // localStorage key
      partialize: (state) => ({
        library: state.library,
        rejectedIds: state.rejectedIds,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
```

### Storage Limits:

- **LocalStorage**: ~5-10MB (plenty for movie data)
- **Typical movie object**: ~2KB
- **Can store**: ~2,500-5,000 movies
- **Realistic usage**: 50-100 movies

### Data Persistence:

```javascript
// Automatically saved when state changes
addToLibrary: (movie) => {
  set((state) => ({
    library: [...state.library, movie]
  }));
  // Zustand persist middleware auto-saves to localStorage
},
```

---

## 🚀 Quick Migration Guide (If Needed)

### To Add Firebase (Example):

1. **Install:**
```bash
npm install firebase
```

2. **Create `.env`:**
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=moodmaze
```

3. **Update Store:**
```javascript
// Add Firebase sync
const syncLibrary = async (library) => {
  const user = auth.currentUser;
  if (user) {
    await setDoc(doc(db, 'users', user.uid), {
      library,
      updatedAt: new Date()
    });
  }
};
```

4. **Add Auth UI:**
```javascript
// Simple Google Sign-In
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
```

---

## 📝 Summary

### Current Setup: ✅ Perfect for Now

- **Storage**: Browser LocalStorage
- **Persistence**: Zustand middleware
- **Capacity**: 5-10MB (~2,500 movies)
- **Cost**: $0
- **Complexity**: Low
- **Maintenance**: Zero

### Future Options:

- **Firebase**: Easy cloud sync + auth
- **Supabase**: PostgreSQL + real-time
- **MongoDB**: Flexible NoSQL

---

**Bottom Line:** Your current localStorage implementation is **production-ready** and perfect for MoodMaze! No database needed unless you want user accounts or cloud sync. 💾✨
