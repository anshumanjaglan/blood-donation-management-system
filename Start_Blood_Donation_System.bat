@echo off
title Blood Donation Management System - Launcher
cd /d "C:\Users\jagla\OneDrive\Documents\Blood Donation Management System - Minor Project"

echo ========================================================
echo  Blood Donation Management System - Master Control
echo  Authorized Authority: Dr. Anshuman Jaglan (MAIT ITE)
echo ========================================================
echo.

:: Check if server is already running on port 3000
netstat -ano | findstr :3000 | findstr LISTENING >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend server is already running on port 3000.
) else (
    echo [*] Starting Node.js backend server...
    start "Blood Donation System Server" /min cmd /c "node server.js"
    echo [*] Waiting for server to initialize...
    timeout /t 2 /nobreak >nul
)

echo [*] Opening Master Admin Portal in your default browser...
start http://localhost:3000/admin-login.html
echo.
echo ========================================================
echo  Portal Opened: http://localhost:3000/admin-login.html
echo  Master Admin Username: admin or 9466291852
echo  Master Admin Password: password123
echo ========================================================
timeout /t 3 >nul
exit
