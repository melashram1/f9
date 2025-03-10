@echo off
setlocal

:: Prompt the user for the number of threads
set /p THREAD_COUNT="Enter the number of threads (users): "

:: Check if the user provided a value for threads
if "%THREAD_COUNT%"=="" (
    echo You must enter a number of threads.
    pause
    exit /b 1
)

:: Prompt the user for the ramp-up period
set /p RAMP_UP="Enter the ramp-up period (in seconds): "

:: Check if the user provided a value for ramp-up
if "%RAMP_UP%"=="" (
    echo You must enter a ramp-up period.
    pause
    exit /b 1
)

:: Prompt the user for the runtime
set /p RUNTIME="Enter the runtime (in seconds): "

:: Check if the user provided a value for runtime
if "%RUNTIME%"=="" (
    echo You must enter a runtime.
    pause
    exit /b 1
)

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
set JMX_FILE=Scripts\test_08032025.jmx
set BASE_DIR=Execution\%CURRENT_DATETIME%
set JTL_FILE=%BASE_DIR%\run2_%RUNTIME%sec_%THREAD_COUNT%user_%RAMP_UP%rampup.jtl
set REPORT_DIR=%BASE_DIR%\web

:: Create directories
mkdir "%BASE_DIR%"
mkdir "%REPORT_DIR%"

:: Run JMeter command
jmeter -n -t "%JMX_FILE%" -Jthreads=%THREAD_COUNT% -Jrampup=%RAMP_UP% -Jduration=%RUNTIME% -l "%JTL_FILE%" -e -o "%REPORT_DIR%"

endlocal
pause
