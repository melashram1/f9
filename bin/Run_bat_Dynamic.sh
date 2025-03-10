#!/bin/bash

# Prompt the user for input values
echo "Enter the number of threads (NoThreads):"
read NO_THREADS

echo "Enter the ramp-up period (in seconds, rampUp):"
read RAMP_UP

echo "Enter the test duration (in seconds, runTime):"
read RUN_TIME

# Set paths to JMX file and other variables
BASE_DIR="Execution/$(date +%Y%m%d_%H%M%S)"
JMX_FILE="Scripts/test_08032025.jmx"
JTL_FILE="$BASE_DIR/results.jtl"
REPORT_DIR="$BASE_DIR/web"

# Create directories
mkdir -p "$BASE_DIR"
mkdir -p "$REPORT_DIR"

# Run JMeter with the provided parameters
jmeter -n -t "$JMX_FILE" -JnoThreads="$NO_THREADS" -JrampUp="$RAMP_UP" -JrunTime="$RUN_TIME" -l "$JTL_FILE" -e -o "$REPORT_DIR"

# Check if JMeter executed successfully
if [ $? -eq 0 ]; then
    echo "JMeter test executed successfully."
else
    echo "JMeter test failed."
fi
