#!/bin/bash

# Get current date and time in the format YYYYMMDD_HHMMSS
CURRENT_DATETIME=$(date +"%Y%m%d_%H%M%S")

# Define paths
BASE_DIR="Execution/Master_$CURRENT_DATETIME"
JMX_FILE="Scripts/TestPlan_Master_new.jmx"
JTL_FILE="$BASE_DIR/results.jtl"
REPORT_DIR="$BASE_DIR/web"

# Define the remote server IP (you can change this or pass it as an argument)
REMOTE_HOST="10.0.46.9,10.0.34.153,10.0.44.143,10.0.36.63"

# Create directories
mkdir -p "$BASE_DIR"
mkdir -p "$REPORT_DIR"

# Run JMeter with the remote server specified and additional parameters
./jmeter -n -t "$JMX_FILE" -r -l "$JTL_FILE" -e -o "$REPORT_DIR" -Dremote_hosts="$REMOTE_HOST"

# Check if the JMeter test ran successfully
if [ $? -eq 0 ]; then
    echo "JMeter test executed successfully"
else
    echo "JMeter test failed."
fi
