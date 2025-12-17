# 🔧 Fix Vercel Sign-In & Deploy Guide

## 🚨 **Issue: "Failed to sign in" on Vercel**

The sign-in is failing because **Firebase needs to be configured in Vercel**. Here's how to fix it:

---

## ✅ **Step 1: Add Firebase Environment Variables to Vercel**

### 1.1 Go to Vercel Dashboard
https://vercel.com/dashboard

### 1.2 Select Your Project
Click on **`mood-maze`**

### 1.3 Go to Settings
Click **Settings** → **Environment Variables**

### 1.4 Add These Variables

**IMPORTANT:** Add ALL of these (they're already in your `.env` file):

```
VITE_FIREBASE_API_KEY=AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68
VITE_FIREBASE_AUTH_DOMAIN=moodmaze-b8488.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=moodmaze-b8488
VITE_FIREBASE_STORAGE_BUCKET=moodmaze-b8488.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=838193940596
VITE_FIREBASE_APP_ID=1:838193940596:web:27d4149aa913090b256921
VITE_TMDB_API_KEY=ed8a96bd45993247faa8631f4432cd9a
```

**For each variable:**
1. Click **"Add"**
2. **Name**: Copy the variable name (e.g., `VITE_FIREBASE_API_KEY`)
3. **Value**: Copy the value (e.g., `AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68`)
4. **Environment**: Select **ALL** (Production, Preview, Development)
5. Click **"Save"**

---

## ✅ **Step 2: Add Vercel Domain to Firebase**

### 2.1 Go to Firebase Console
https://console.firebase.google.com/

### 2.2 Select Your Project
Click **`moodmaze-b8488`**

### 2.3 Go to Authentication
Click **Authentication** → **Settings** → **Authorized domains**

### 2.4 Add Vercel Domain
Click **"Add domain"** and add:
```
moodmaze.vercel.app
```

**Also add these if you have custom domains:**
```
*.vercel.app
```

Click **"Add"**

---

## ✅ **Step 3: Enable Firestore Database**

### 3.1 Go to Firestore
In Firebase Console, click **Firestore Database**

### 3.2 Create Database
If not already created:
1. Click **"Create database"**
2. Choose **"Start in production mode"**
3. Select location: **us-central** (or closest to you)
4. Click **"Enable"**

### 3.3 Set Security Rules
Click **"Rules"** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **"Publish"**

---

## ✅ **Step 4: Redeploy on Vercel**

### 4.1 Go to Deployments
In Vercel dashboard, click **Deployments**

### 4.2 Redeploy
1. Click the **"..."** menu on the latest deployment
2. Click **"Redeploy"**
3. Check **"Use existing Build Cache"** (optional)
4. Click **"Redeploy"**

### 4.3 Wait for Deployment
Wait 2-3 minutes for deployment to complete

---

## ✅ **Step 5: Test Sign-In**

### 5.1 Open Your App
Go to: https://moodmaze.vercel.app

### 5.2 Click "Sign In"
Click the **"Sign In"** button in the header

### 5.3 Choose Google Account
Select your Google account

### 5.4 Success!
You should now be signed in! Your profile photo will appear in the header.

---

## 🎯 **How Personalized Library Works**

### When You Sign In:
1. ✅ Your library loads from Firestore
2. ✅ All saved movies sync across devices
3. ✅ Your rejected movies are remembered

### When You Add a Movie:
1. ✅ Saved to local storage (instant)
2. ✅ Synced to Firestore (cloud)
3. ✅ Available on all your devices

### When You Sign Out:
1. ✅ Local data stays (you can still browse)
2. ✅ Cloud data is safe
3. ✅ Sign in again to sync

---

## 🔍 **Troubleshooting**

### Problem: Still getting "Failed to sign in"

**Solution 1: Check Environment Variables**
1. Vercel Dashboard → Settings → Environment Variables
2. Make sure ALL 7 variables are added
3. Make sure they're enabled for **Production**

**Solution 2: Check Firebase Domain**
1. Firebase Console → Authentication → Settings
2. Make sure `moodmaze.vercel.app` is in Authorized domains

**Solution 3: Clear Cache and Redeploy**
1. Vercel → Deployments
2. Redeploy WITHOUT cache
3. Wait for fresh build

### Problem: Sign-in works but library doesn't sync

**Solution: Check Firestore Rules**
1. Firebase Console → Firestore → Rules
2. Make sure rules allow authenticated users
3. Publish the rules from Step 3.3

### Problem: "Permission denied" error

**Solution: Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📊 **Verify Everything is Working**

### Checklist:
- [ ] All 7 environment variables added to Vercel
- [ ] Vercel domain added to Firebase authorized domains
- [ ] Firestore database created
- [ ] Firestore security rules published
- [ ] Redeployed on Vercel
- [ ] Can sign in successfully
- [ ] Profile photo appears in header
- [ ] Can add movies to library
- [ ] Movies persist after refresh

---

## 🎉 **Success!**

Once all steps are complete:
- ✅ Sign-in works on Vercel
- ✅ Personalized library syncs across devices
- ✅ Data is secure in Firestore
- ✅ Users can access their library anywhere

---

## 📱 **Test on Multiple Devices**

1. **Sign in on desktop** → Add some movies
2. **Sign in on mobile** → See same movies!
3. **Remove a movie on mobile** → Gone on desktop too!

---

## 🔒 **Security Notes**

- ✅ Firebase API keys are **safe to expose** (they're public)
- ✅ Security is handled by Firestore rules
- ✅ Users can only access their own data
- ✅ All data is encrypted in transit

---

## 📚 **Quick Reference**

**Vercel Dashboard:**
https://vercel.com/dashboard

**Firebase Console:**
https://console.firebase.google.com/

**Your App:**
https://moodmaze.vercel.app

**Environment Variables Needed:**
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_TMDB_API_KEY

---

**Follow these steps and sign-in will work perfectly!** 🚀
