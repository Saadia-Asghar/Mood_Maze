@echo off
echo ========================================
echo   Fixing Vercel Deployment
echo ========================================
echo.
echo Adding Firebase dependency fix...
echo.

REM Add the updated package.json
git add package.json

REM Commit the fix
git commit -m "Fix: Add Firebase dependency for Vercel deployment"

REM Push to GitHub
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Vercel will automatically detect the change and redeploy.
echo Check your Vercel dashboard in a few moments.
echo.
pause
