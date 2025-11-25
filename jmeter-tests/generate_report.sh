#!/bin/bash

# Enhanced JMeter Test Report Generator with Graphs
# This script runs JMeter tests and generates comprehensive HTML reports with graphs

echo "=========================================="
echo "Enhanced JMeter Test with Analysis Graphs"
echo "=========================================="

# Create results directory
mkdir -p results/html-reports

# Get timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Run JMeter test and generate results
echo "Running JMeter tests..."
jmeter -n -t owner_login_test.jmx \
    -l results/test_results_${TIMESTAMP}.jtl \
    -e -o results/html-reports/report_${TIMESTAMP}

echo ""
echo "✅ Test completed!"
echo "📊 HTML Report generated at: results/html-reports/report_${TIMESTAMP}"
echo ""
echo "Open the report:"
echo "  open results/html-reports/report_${TIMESTAMP}/index.html"
echo ""
echo "Report includes:"
echo "  - Response Time Over Time"
echo "  - Throughput Over Time"
echo "  - Active Threads Over Time"
echo "  - Response Time Percentiles"
echo "  - Transactions Per Second"
echo "  - Error Rate Analysis"
