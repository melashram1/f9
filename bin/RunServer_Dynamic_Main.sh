#!/bin/bash

# Get current date and time in the format YYYYMMDD_HHMMSS
CURRENT_DATETIME=$(date +"%Y%m%d_%H%M%S")

# Define paths
BASE_DIR="Execution/$CURRENT_DATETIME"
JMX_FILE="Scripts/Testplan_10032025.jmx"
JTL_FILE="$BASE_DIR/results.jtl"
REPORT_DIR="$BASE_DIR/web"

# Define the remote server IP (you can change this or pass it as an argument)
REMOTE_HOST="10.0.36.159"

# Create directories
mkdir -p "$BASE_DIR"
mkdir -p "$REPORT_DIR"

# Run JMeter with the remote server specified and additional parameters
./jmeter -n -t "$JMX_FILE" -r -l "$JTL_FILE" -e -o "$REPORT_DIR" -Dremote_hosts="$REMOTE_HOST"

# Check if the JMeter test ran successfully
if [ $? -eq 0 ]; then
    echo "JMeter test executed successfully on remote server $REMOTE_HOST."
else
    echo "JMeter test failed."
fi
