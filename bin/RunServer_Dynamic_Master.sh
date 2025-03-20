#!/bin/bash

# Get current date and time in the format YYYYMMDD_HHMMSS
CURRENT_DATETIME=$(date +"%Y%m%d_%H%M%S")

# Define paths
BASE_DIR="Execution/Master_$CURRENT_DATETIME"
JMX_FILE="Scripts/Testplan_Master.jmx"
JTL_FILE="$BASE_DIR/results.jtl"
REPORT_DIR="$BASE_DIR/web"

# Define the remote server IP (you can change this or pass it as an argument)
#REMOTE_HOST="10.0.36.159,10.0.37.4,10.0.39.176,10.0.46.14,10.0.46.117"

# Create directories
mkdir -p "$BASE_DIR"
mkdir -p "$REPORT_DIR"

# Run JMeter with the remote server specified and additional parameters
./jmeter -n -t "$JMX_FILE" -l "$JTL_FILE" -e -o "$REPORT_DIR"

# Check if the JMeter test ran successfully
if [ $? -eq 0 ]; then
    echo "JMeter test executed successfully"
else
    echo "JMeter test failed."
fi
