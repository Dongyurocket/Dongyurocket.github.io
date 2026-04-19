@echo off
setlocal
chcp 65001 >nul
title Personal Web - Local Preview

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-local-site.ps1"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo 启动失败。按任意键关闭窗口。
  pause >nul
)

exit /b %EXIT_CODE%

