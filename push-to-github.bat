@echo off
echo ========================================
echo   Connecting MoodMaze to GitHub
echo ========================================
echo.
echo Repository: https://github.com/Saadia-Asghar/Mood_Maze
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add remote (remove if exists)
git remote remove origin 2>nul
echo Adding GitHub remote...
git remote add origin https://github.com/Saadia-Asghar/Mood_Maze.git
echo.

REM Add all files
echo Adding all files...
git add .
echo.

REM Commit
echo Creating commit...
git commit -m "Complete MoodMaze app with Firebase integration

Features:
- React + Vite + Tailwind CSS
- Firebase Authentication & Firestore
- Max-Heap DSA implementation
- TMDB API integration with demo mode
- 3D flip cards with animations
- Sound effects support
- Cloud sync across devices
- Responsive design
- Complete documentation

Tech Stack:
- Frontend: React 18, Vite, Tailwind CSS
- State: Zustand with localStorage
- Animation: Framer Motion
- Database: Firebase Firestore
- Auth: Firebase Google Sign-In
- API: TMDB (The Movie Database)

Documentation:
- README.md - Complete project overview
- FIREBASE_SETUP.md - Firebase configuration
- FIREBASE_DEPLOY.md - Deployment guide
- GITHUB_SETUP.md - Git setup instructions
- DEPLOYMENT.md - General deployment guide
- DATABASE_STRATEGY.md - Storage architecture
- And more...
"
echo.

REM Set main branch
echo Setting main branch...
git branch -M main
echo.

REM Push to GitHub
echo Pushing to GitHub...
echo.
echo You may need to enter your GitHub credentials:
echo - Username: Saadia-Asghar
echo - Password: Use Personal Access Token (not your password)
echo.
echo Get token from: https://github.com/settings/tokens
echo.
git push -u origin main

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Your code is now on GitHub!
echo Visit: https://github.com/Saadia-Asghar/Mood_Maze
echo.
pause
