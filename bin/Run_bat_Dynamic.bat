@echo off
:: Prompt the user for input values
set /p NO_THREADS="Enter the number of threads (NoThreads): "
set /p RAMP_UP="Enter the ramp-up period (in seconds, rampUp): "
set /p RUN_TIME="Enter the test duration (in seconds, runTime): "

:: Set paths to JMX file and other variables
set BASE_DIR=Execution\%DATE:/=%_%TIME::=% 
set JMX_FILE=Scripts\test_08032025.jmx
set JTL_FILE=%BASE_DIR%\results.jtl
set REPORT_DIR=%BASE_DIR%\web


:: Create directories
mkdir "%BASE_DIR%"
mkdir "%REPORT_DIR%"

:: Run JMeter with the provided parameters
jmeter -n -t "%JMX_FILE%" -JnoThreads=%NO_THREADS% -JrampUp=%RAMP_UP% -JrunTime=%RUN_TIME% -l "%JTL_FILE%" -e -o "%REPORT_DIR%" 

pause
