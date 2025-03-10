#!/bin/bash

# Get current date and time in the format YYYYMMDD_HHMMSS
CURRENT_DATETIME=$(date +"%Y%m%d_%H%M%S")

# Define paths
BASE_DIR="Execution/$CURRENT_DATETIME"
JMX_FILE="Scripts/test_08032025.jmx"
JTL_FILE="$BASE_DIR/results.jtl"
REPORT_DIR="$BASE_DIR/web"

# Define the remote server IP (you can change this or pass it as an argument)
REMOTE_HOST="10.0.36.159"

# Ensure the remote server is specified (optional but recommended)
if [ -z "$REMOTE_HOST" ]; then
    echo "Error: Remote host not specified."
    exit 1
fi

# Prompt user for input values for NoThreads, rampUp, and runTime
echo "Enter the number of threads (NoThreads):"
read NO_THREADS

echo "Enter the ramp-up period (in seconds, rampUp):"
read RAMP_UP

echo "Enter the test duration (in seconds, runTime):"
read RUN_TIME

# Validate user inputs (optional)
if [[ -z "$NO_THREADS" || -z "$RAMP_UP" || -z "$RUN_TIME" ]]; then
    echo "Error: Missing input. All fields are required."
    exit 1
fi

# Create directories
mkdir -p "$BASE_DIR"
mkdir -p "$REPORT_DIR"

# Run JMeter with the remote server specified and additional parameters
./jmeter -n -t "$JMX_FILE" -JnoThreads="$NO_THREADS" -JrampUp="$RAMP_UP" -JrunTime="$RUN_TIME" -r -l "$JTL_FILE" -e -o "$REPORT_DIR" -Dremote_hosts="$REMOTE_HOST" 

# Check if the JMeter test ran successfully
if [ $? -eq 0 ]; then
    echo "JMeter test executed successfully on remote server $REMOTE_HOST."
else
    echo "JMeter test failed."
fi
