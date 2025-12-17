# 🔑 How to Get TMDB API Key (Step-by-Step)

## ⏱️ Time Required: 5 minutes
## 💰 Cost: **100% FREE**

---

## 📋 Step 1: Create TMDB Account

### 1.1 Go to TMDB Website
**Link:** https://www.themoviedb.org/signup

### 1.2 Fill in the Sign-Up Form
- **Username**: Choose any username
- **Password**: Create a strong password
- **Email**: Your email address
- **Terms**: Check "I agree to the Terms of Use"

### 1.3 Click "Sign Up"

### 1.4 Verify Your Email
- Check your email inbox
- Click the verification link from TMDB
- Your account is now active!

---

## 🔐 Step 2: Request API Key

### 2.1 Log In
Go to https://www.themoviedb.org and log in with your credentials

### 2.2 Go to Settings
- Click on your **profile picture** (top right)
- Click **"Settings"** from the dropdown menu

**Direct link:** https://www.themoviedb.org/settings/account

### 2.3 Navigate to API Section
- In the left sidebar, click **"API"**
- You'll see "Request an API Key" section

**Direct link:** https://www.themoviedb.org/settings/api

### 2.4 Click "Request an API Key"
- You'll see two options:
  - **Developer** ← Choose this one!
  - Commercial

### 2.5 Accept Terms
- Read the API Terms of Use
- Click **"Accept"**

---

## 📝 Step 3: Fill Application Form

### 3.1 Application Details
Fill in the form with these details:

**Type of Use:**
- Select: **"Website"** or **"Education"**

**Application Name:**
```
MoodMaze
```

**Application URL:**
```
http://localhost:5173
```
(Or your actual domain if you have one)

**Application Summary:**
```
A mood-based movie recommendation web application that helps users discover movies based on their current emotional state and preferences. The app uses TMDB API to fetch movie data and provide personalized recommendations.
```

### 3.2 Submit
Click **"Submit"** button

---

## 🎉 Step 4: Get Your API Key

### 4.1 API Key Generated!
You'll immediately see your API key on the screen.

It looks like this:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```
(This is just an example - yours will be different)

### 4.2 Copy Your API Key
- Click the **"Copy"** button, or
- Select the key and press `Ctrl+C` (Windows) or `Cmd+C` (Mac)

### 4.3 Save It Somewhere Safe
- Paste it in a text file
- You'll need it in the next step!

---

## 💻 Step 5: Add API Key to Your App

### 5.1 Create .env File

**In your project folder** (`d:/dsaaaa/mood-maze/`):

**Option A: Using File Explorer**
1. Right-click in the folder
2. New → Text Document
3. Name it `.env` (delete the .txt extension)

**Option B: Using Command Line**
```bash
cd d:/dsaaaa/mood-maze
copy .env.example .env
```

### 5.2 Edit .env File

Open `.env` in any text editor (Notepad, VS Code, etc.) and add:

```env
# TMDB API Key
VITE_TMDB_API_KEY=paste_your_key_here

# Firebase Configuration (already there)
VITE_FIREBASE_API_KEY=AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68
VITE_FIREBASE_AUTH_DOMAIN=moodmaze-b8488.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=moodmaze-b8488
VITE_FIREBASE_STORAGE_BUCKET=moodmaze-b8488.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=838193940596
VITE_FIREBASE_APP_ID=1:838193940596:web:27d4149aa913090b256921
```

**Replace `paste_your_key_here` with your actual API key!**

Example:
```env
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 5.3 Save the File
Press `Ctrl+S` or File → Save

---

## 🚀 Step 6: Restart Your App

### 6.1 Stop the Dev Server
If your app is running, press `Ctrl+C` in the terminal

### 6.2 Start Again
```bash
npm run dev
```

### 6.3 Test It!
1. Open http://localhost:5173
2. Take the quiz
3. You should now see **real movies** from TMDB!
4. Console should show: "Fetched movies based on your preferences: 60"

---

## ✅ Verification Checklist

- [ ] Created TMDB account
- [ ] Verified email
- [ ] Requested API key (Developer type)
- [ ] Filled application form
- [ ] Copied API key
- [ ] Created `.env` file
- [ ] Added `VITE_TMDB_API_KEY=your_key`
- [ ] Saved `.env` file
- [ ] Restarted dev server
- [ ] App shows real movies (not demo mode)

---

## 🌐 For Vercel Deployment

After getting your API key, also add it to Vercel:

### 1. Go to Vercel Dashboard
https://vercel.com/dashboard

### 2. Select Your Project
Click on `mood-maze`

### 3. Go to Settings
Settings → Environment Variables

### 4. Add Variable
- **Name**: `VITE_TMDB_API_KEY`
- **Value**: Your API key
- **Environment**: Production, Preview, Development (select all)

### 5. Save & Redeploy
Click "Save" then go to Deployments → Redeploy

---

## 🆘 Troubleshooting

### Problem: "Request an API Key" button not showing
**Solution:** Make sure you're logged in and verified your email

### Problem: API key not working
**Solution:** 
- Check for typos in `.env` file
- Make sure there are no spaces around the `=`
- Restart dev server after adding key

### Problem: Still seeing demo mode
**Solution:**
- Verify `.env` file is in project root (`d:/dsaaaa/mood-maze/`)
- Check file is named `.env` not `.env.txt`
- Restart dev server

### Problem: "Invalid API key" error
**Solution:**
- Copy the key again from TMDB settings
- Make sure you copied the full key
- Check for extra spaces

---

## 📚 Quick Links

- **Sign Up**: https://www.themoviedb.org/signup
- **API Settings**: https://www.themoviedb.org/settings/api
- **API Documentation**: https://developers.themoviedb.org/3
- **Support**: https://www.themoviedb.org/talk

---

## 🎯 Summary

1. **Sign up** at themoviedb.org
2. **Verify email**
3. **Settings** → **API** → **Request an API Key**
4. **Choose "Developer"**
5. **Fill form** (App name: MoodMaze)
6. **Copy API key**
7. **Add to `.env`**: `VITE_TMDB_API_KEY=your_key`
8. **Restart server**: `npm run dev`
9. **Enjoy real movies!** 🎬

---

**That's it! You now have unlimited access to TMDB's movie database!** 🎉

**Questions?** Check the troubleshooting section above or see `API_INTEGRATION_COMPLETE.md` for more details.
