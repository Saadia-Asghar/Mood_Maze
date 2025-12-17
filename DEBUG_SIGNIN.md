# 🔍 Debug Sign-In Issue - Step by Step

## ✅ **I've Added Detailed Logging**

The code now has extensive console logging to help us find the problem!

---

## 🧪 **How to Test & Debug**

### **Step 1: Open Your App**
1. Make sure dev server is running:
   ```bash
   npm run dev
   ```
2. Open http://localhost:5173 in your browser

### **Step 2: Open Browser Console**
1. Press **F12** (or right-click → Inspect)
2. Click the **Console** tab
3. Clear any old messages (click 🚫 icon)

### **Step 3: Click "Sign In"**
Click the "Sign In" button in the header

### **Step 4: Check Console Messages**

You should see messages like this:

#### ✅ **If Firebase is Configured:**
```
🖱️ Sign In button clicked!
Calling signInWithGoogle...
🔐 Starting Google Sign-In...
Firebase Config: {apiKey: "✅ Set", authDomain: "✅ Set", projectId: "✅ Set"}
📱 Opening Google Sign-In popup...
```

Then a Google sign-in popup should appear!

#### ❌ **If Firebase is NOT Configured:**
```
🖱️ Sign In button clicked!
Calling signInWithGoogle...
🔐 Starting Google Sign-In...
Firebase Config: {apiKey: "❌ Missing", authDomain: "❌ Missing", projectId: "❌ Missing"}
❌ Firebase is not configured! Check your .env file.
```

You'll also see an alert: "Firebase is not configured"

---

## 🔧 **Common Issues & Solutions**

### **Issue 1: Nothing Happens When Clicking Sign In**

**Symptoms:**
- No console messages appear
- Button doesn't respond

**Solution:**
1. Check if the button is clickable (not disabled)
2. Refresh the page (Ctrl+R)
3. Check browser console for JavaScript errors

---

### **Issue 2: "Firebase is not configured"**

**Symptoms:**
```
Firebase Config: {apiKey: "❌ Missing", ...}
```

**Solution:**
Your `.env` file is missing or not loaded!

**Check 1: Does `.env` file exist?**
```bash
# In your project folder
ls -la .env
# or on Windows
dir .env
```

**Check 2: Is `.env` file correct?**
It should contain:
```
VITE_FIREBASE_API_KEY=AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68
VITE_FIREBASE_AUTH_DOMAIN=moodmaze-b8488.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=moodmaze-b8488
VITE_FIREBASE_STORAGE_BUCKET=moodmaze-b8488.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=838193940596
VITE_FIREBASE_APP_ID=1:838193940596:web:27d4149aa913090b256921
VITE_TMDB_API_KEY=ed8a96bd45993247faa8631f4432cd9a
```

**Check 3: Restart dev server**
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

**Note:** Vite only loads `.env` on startup!

---

### **Issue 3: "Popup was blocked"**

**Symptoms:**
```
❌ Sign-in error: auth/popup-blocked
```

**Solution:**
1. Look for a popup blocker icon in your browser's address bar
2. Click it and allow popups for localhost
3. Try signing in again

---

### **Issue 4: "Unauthorized domain"**

**Symptoms:**
```
❌ Sign-in error: auth/unauthorized-domain
```

**Solution:**
1. Go to https://console.firebase.google.com/
2. Select your project: `moodmaze-b8488`
3. Click **Authentication** → **Settings** → **Authorized domains**
4. Make sure `localhost` is in the list
5. If not, click "Add domain" and add: `localhost`

---

### **Issue 5: Popup Opens But Closes Immediately**

**Symptoms:**
- Google popup appears
- Closes before you can sign in

**Solution:**
This usually means Firebase config is wrong.

**Check Firebase Console:**
1. Go to https://console.firebase.google.com/
2. Select `moodmaze-b8488`
3. Click ⚙️ Settings → Project settings
4. Scroll to "Your apps"
5. Find the Web app
6. Compare the config with your `.env` file

---

## 📋 **Debugging Checklist**

Run through this checklist:

- [ ] `.env` file exists in project root
- [ ] `.env` has all 7 variables (VITE_FIREBASE_* and VITE_TMDB_*)
- [ ] Dev server was restarted after creating/editing `.env`
- [ ] Browser console is open (F12)
- [ ] No JavaScript errors in console
- [ ] Clicking "Sign In" shows console messages
- [ ] Firebase config shows "✅ Set" for all fields
- [ ] Popups are allowed for localhost
- [ ] `localhost` is in Firebase authorized domains

---

## 🎯 **Expected Flow**

### **Correct Sign-In Flow:**

1. **Click "Sign In"** 
   → Console: `🖱️ Sign In button clicked!`

2. **Firebase Check**
   → Console: `Firebase Config: {apiKey: "✅ Set", ...}`

3. **Popup Opens**
   → Console: `📱 Opening Google Sign-In popup...`

4. **Choose Google Account**
   → Google sign-in page appears

5. **Sign In Success**
   → Console: `✅ Sign-in successful! user@gmail.com`

6. **User Document Created**
   → Console: `📝 Creating new user document...`
   → Console: `✅ User document created!`

7. **Profile Appears**
   → Your photo appears in header!

---

## 🐛 **Still Not Working?**

### **Send Me This Info:**

1. **Console Output:**
   - Copy ALL console messages after clicking "Sign In"
   - Include any errors (red text)

2. **Firebase Config Status:**
   ```
   Firebase Config: {
     apiKey: "✅ Set" or "❌ Missing",
     authDomain: "✅ Set" or "❌ Missing",
     projectId: "✅ Set" or "❌ Missing"
   }
   ```

3. **Browser:**
   - Chrome, Firefox, Safari, Edge?
   - Version?

4. **Any Alerts:**
   - Did you see any popup alerts?
   - What did they say?

---

## 🔄 **Quick Reset**

If nothing works, try this:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear browser cache
# Chrome: Ctrl+Shift+Delete → Clear cache

# 3. Restart dev server
npm run dev

# 4. Hard refresh browser
# Ctrl+Shift+R (or Cmd+Shift+R on Mac)

# 5. Try sign-in again
```

---

## ✅ **Test Now!**

1. **Open browser console** (F12)
2. **Click "Sign In"**
3. **Read the console messages**
4. **Tell me what you see!**

The console will tell us exactly what's wrong! 🔍
