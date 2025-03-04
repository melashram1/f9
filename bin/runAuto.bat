@echo off
setlocal

:: Get current date and time
for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set YYYY=%datetime:~0,4%
set MM=%datetime:~4,2%
set DD=%datetime:~6,2%
set HH=%datetime:~8,2%
set MI=%datetime:~10,2%
set SS=%datetime:~12,2%

:: Format datetime as YYYYMMDD_HHMMSS
set CURRENT_DATETIME=%YYYY%%MM%%DD%_%HH%%MI%%SS%

:: Variables
set JMX_FILE=Scripts\1000_30_all_30072024.jmx
set BASE_DIR=Execution\%CURRENT_DATETIME%
set JTL_FILE=%BASE_DIR%\run2_5min_1000user_all.jtl
set REPORT_DIR=%BASE_DIR%\web

:: Create directories
mkdir "%BASE_DIR%"
mkdir "%REPORT_DIR%"

:: Run JMeter command
jmeter -n -t "%JMX_FILE%" -l "%JTL_FILE%" -e -o "%REPORT_DIR%"

endlocal
pause
