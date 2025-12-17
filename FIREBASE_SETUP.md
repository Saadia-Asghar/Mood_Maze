# 🔥 Firebase Setup Guide for MoodMaze

## ✅ Firebase Integration Complete!

Firebase has been added to MoodMaze with the following features:
- ✅ Google Authentication
- ✅ Cloud Firestore database
- ✅ Library sync across devices
- ✅ User profiles
- ✅ Graceful fallback (works without Firebase)

## 📦 What's Been Added

### New Files Created:

1. **`src/lib/firebase.js`** - Firebase configuration
2. **`src/lib/firebaseService.js`** - Auth & database operations
3. **`src/hooks/useAuth.js`** - Authentication hook
4. **`src/components/layout/AuthButton.jsx`** - Sign in/out UI

### Updated Files:

1. **`src/components/layout/Stage.jsx`** - Added AuthButton
2. **`.env.example`** - Added Firebase config variables
3. **`package.json`** - Firebase dependency added

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `moodmaze` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Click on "Google" provider
4. Toggle "Enable"
5. Add your email as test user
6. Click "Save"

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in **production mode**"
4. Select your region (closest to you)
5. Click "Enable"

### Step 4: Set Firestore Rules

Click on "Rules" tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish"

### Step 5: Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ → **Project settings**
2. Scroll down to "Your apps"
3. Click the **Web** icon `</>`
4. Register app with nickname: `moodmaze-web`
5. **Copy the firebaseConfig object**

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "moodmaze-xxxxx.firebaseapp.com",
  projectId: "moodmaze-xxxxx",
  storageBucket: "moodmaze-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 6: Add Config to Your App

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Firebase config:

```env
# TMDB API Key (optional - app works in demo mode)
VITE_TMDB_API_KEY=your_tmdb_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=moodmaze-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=moodmaze-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=moodmaze-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important:** Replace the `xxxxx` values with your actual Firebase config!

### Step 7: Test the Integration

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Look for the auth button** in the top-left corner (user icon)

3. **Click it and sign in with Google**

4. **Save some movies** to your library

5. **Click "Sync to Cloud"** button

6. **Check Firestore Console** - you should see your data!

## 🎯 How It Works

### User Flow:

```
1. User clicks Auth button (top-left)
   ↓
2. Clicks "Sign in with Google"
   ↓
3. Google sign-in popup appears
   ↓
4. User authenticates
   ↓
5. User info appears in auth menu
   ↓
6. User can click "Sync to Cloud"
   ↓
7. Library saved to Firestore
   ↓
8. Data accessible from any device!
```

### Data Structure in Firestore:

```
users (collection)
  └── {userId} (document)
      ├── library: [array of movie objects]
      ├── rejectedIds: [array of movie IDs]
      ├── soundEnabled: boolean
      └── updatedAt: timestamp
```

### Example Document:

```javascript
{
  "library": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster_path": "/path.jpg",
      "vote_average": 8.4,
      // ... other movie data
    }
  ],
  "rejectedIds": [123, 456, 789],
  "soundEnabled": true,
  "updatedAt": "2025-01-17T10:30:00Z"
}
```

## 🔧 Features

### 1. **Sign In with Google**
- Click auth button → "Sign in with Google"
- Popup authentication
- User info displayed

### 2. **Cloud Sync**
- Manual sync button
- Saves library, rejected movies, preferences
- Accessible from any device

### 3. **Automatic Sign-Out**
- Click "Sign Out" in auth menu
- Returns to local-only mode

### 4. **Graceful Fallback**
- If Firebase not configured → auth button hidden
- App works perfectly in local-only mode
- No errors or warnings

## 📊 Firebase vs LocalStorage

| Feature | LocalStorage | Firebase |
|---------|-------------|----------|
| **Cost** | Free | Free (generous limits) |
| **Setup** | ✅ Done | 10 minutes |
| **Cross-Device** | ❌ No | ✅ Yes |
| **User Accounts** | ❌ No | ✅ Yes |
| **Cloud Backup** | ❌ No | ✅ Yes |
| **Sharing** | ❌ No | ✅ Possible |
| **Offline** | ✅ Yes | Partial |

## 🎨 UI Components

### Auth Button (Top-Left)

**When signed out:**
- Shows login icon
- Click → "Sign in with Google" button

**When signed in:**
- Shows user photo
- Click → Dropdown menu with:
  - User name & email
  - Movie count
  - "Sync to Cloud" button
  - "Sign Out" button

## 🔒 Security

### Firestore Rules:
- Users can only access their own data
- Authentication required for all operations
- No public read/write access

### Best Practices:
- Never commit `.env` file (already in `.gitignore`)
- Use environment variables for all config
- Firebase config is public (safe to expose)
- API keys are restricted by domain

## 🚀 Deployment

### Vercel / Netlify:

1. Add environment variables in dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

2. Deploy normally - Firebase works automatically!

### Domain Restrictions (Optional):

1. Go to Firebase Console → Authentication → Settings
2. Add authorized domains:
   - `localhost` (for development)
   - `your-app.vercel.app` (for production)

## 🧪 Testing

### Test Authentication:
```bash
# 1. Start app
npm run dev

# 2. Click auth button (top-left)
# 3. Sign in with Google
# 4. Check that user info appears
```

### Test Cloud Sync:
```bash
# 1. Save some movies
# 2. Click "Sync to Cloud"
# 3. Check Firestore Console
# 4. Open app in different browser
# 5. Sign in with same account
# 6. Library should sync!
```

## 📝 Firestore Limits (Free Tier)

- **Reads:** 50,000/day
- **Writes:** 20,000/day
- **Deletes:** 20,000/day
- **Storage:** 1 GB

**For MoodMaze:** These limits are MORE than enough!
- Average user: ~10 reads/day
- Can support 5,000+ daily active users

## 🔧 Troubleshooting

### Issue: Auth button doesn't appear

**Solution:**
- Check that Firebase config is in `.env`
- Restart dev server after adding `.env`
- Check browser console for errors

### Issue: "Firebase not configured" error

**Solution:**
- Verify all 6 Firebase env variables are set
- Check for typos in variable names
- Ensure values don't have quotes

### Issue: Sign-in popup blocked

**Solution:**
- Allow popups for localhost
- Try different browser
- Check Firebase console for errors

### Issue: Firestore permission denied

**Solution:**
- Check Firestore rules (Step 4)
- Ensure user is authenticated
- Verify userId matches in rules

## 🎉 You're Done!

Firebase is now fully integrated! Users can:
- ✅ Sign in with Google
- ✅ Sync library to cloud
- ✅ Access from any device
- ✅ Never lose their data

**The app still works perfectly without Firebase** - it's completely optional!

---

**Need help?** Check the Firebase Console for detailed logs and error messages.
