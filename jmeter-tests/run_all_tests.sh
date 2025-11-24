#!/bin/bash

# JMeter Performance Testing Script
# This script runs all performance tests with different user loads

echo "🚀 Starting JMeter Performance Tests..."
echo "========================================"
echo ""

# Create results directory
mkdir -p results

# Test 1: Owner Login - 100 users
echo "📊 Test 1: Owner Login with 100 users..."
jmeter -n -t owner_login_test.jmx -l results/login_100.jtl -e -o results/login_100_report
echo "✅ Test 1 complete!"
echo ""

# Test 1: Owner Login - 200 users
echo "📊 Test 2: Owner Login with 200 users..."
# First, update the thread count in the test plan
sed 's/<intProp name="ThreadGroup.num_threads">100<\/intProp>/<intProp name="ThreadGroup.num_threads">200<\/intProp>/' owner_login_test.jmx > owner_login_test_200.jmx
jmeter -n -t owner_login_test_200.jmx -l results/login_200.jtl -e -o results/login_200_report
rm owner_login_test_200.jmx
echo "✅ Test 2 complete!"
echo ""

# Test 1: Owner Login - 300 users
echo "📊 Test 3: Owner Login with 300 users..."
sed 's/<intProp name="ThreadGroup.num_threads">100<\/intProp>/<intProp name="ThreadGroup.num_threads">300<\/intProp>/' owner_login_test.jmx > owner_login_test_300.jmx
jmeter -n -t owner_login_test_300.jmx -l results/login_300.jtl -e -o results/login_300_report
rm owner_login_test_300.jmx
echo "✅ Test 3 complete!"
echo ""

# Test 1: Owner Login - 400 users
echo "📊 Test 4: Owner Login with 400 users..."
sed 's/<intProp name="ThreadGroup.num_threads">100<\/intProp>/<intProp name="ThreadGroup.num_threads">400<\/intProp>/' owner_login_test.jmx > owner_login_test_400.jmx
jmeter -n -t owner_login_test_400.jmx -l results/login_400.jtl -e -o results/login_400_report
rm owner_login_test_400.jmx
echo "✅ Test 4 complete!"
echo ""

# Test 1: Owner Login - 500 users
echo "📊 Test 5: Owner Login with 500 users..."
sed 's/<intProp name="ThreadGroup.num_threads">100<\/intProp>/<intProp name="ThreadGroup.num_threads">500<\/intProp>/' owner_login_test.jmx > owner_login_test_500.jmx
jmeter -n -t owner_login_test_500.jmx -l results/login_500.jtl -e -o results/login_500_report
rm owner_login_test_500.jmx
echo "✅ Test 5 complete!"
echo ""

echo "========================================"
echo "✅ All tests completed!"
echo ""
echo "📊 Results saved in: ./results/"
echo ""
echo "📈 View HTML reports:"
echo "   - 100 users: open results/login_100_report/index.html"
echo "   - 200 users: open results/login_200_report/index.html"
echo "   - 300 users: open results/login_300_report/index.html"
echo "   - 400 users: open results/login_400_report/index.html"
echo "   - 500 users: open results/login_500_report/index.html"
echo ""
