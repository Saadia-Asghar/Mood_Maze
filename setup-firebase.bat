@echo off
echo ========================================
echo   MoodMaze - Firebase Setup
echo ========================================
echo.
echo Creating .env file with Firebase config...
echo.

(
echo # TMDB API Key ^(optional - app works in demo mode^)
echo VITE_TMDB_API_KEY=
echo.
echo # Firebase Configuration
echo VITE_FIREBASE_API_KEY=AIzaSyBd_op_k_Z5dvLqdT9qS0Cq6THq8w2KO68
echo VITE_FIREBASE_AUTH_DOMAIN=moodmaze-b8488.firebaseapp.com
echo VITE_FIREBASE_PROJECT_ID=moodmaze-b8488
echo VITE_FIREBASE_STORAGE_BUCKET=moodmaze-b8488.firebasestorage.app
echo VITE_FIREBASE_MESSAGING_SENDER_ID=838193940596
echo VITE_FIREBASE_APP_ID=1:838193940596:web:27d4149aa913090b256921
) > .env

echo ✅ .env file created successfully!
echo.
echo Next steps:
echo 1. Enable Authentication in Firebase Console
echo 2. Create Firestore Database
echo 3. Run: npm run dev
echo.
echo See FIREBASE_QUICKSTART.md for details.
echo.
pause
