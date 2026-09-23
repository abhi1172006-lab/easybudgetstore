@echo off
setlocal
cd /d "%~dp0"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
if errorlevel 1 (
  echo.
  echo Push could not complete. If GitHub asks you to sign in, complete that browser step and run this file again.
) else (
  echo.
  echo EasyBudgetStore was pushed to GitHub successfully.
)
pause
