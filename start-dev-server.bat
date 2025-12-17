@echo off
echo Starting MoodMaze Development Server...
echo.
cd /d "%~dp0"
call npm run dev
pause
