# JMeter Performance Testing

## Overview
This directory contains JMeter test plans for performance testing the Airbnb prototype application.

## Test Plans

### 1. Authentication Test Plan
- **File**: `authentication-test.jmx`
- **Tests**: User login/signup for both travelers and owners
- **Metrics**: Response time, throughput, error rate

### 2. Property Search Test Plan
- **File**: `property-search-test.jmx`
- **Tests**: Property search with various filters
- **Metrics**: Response time, throughput, error rate

### 3. Booking Process Test Plan
- **File**: `booking-process-test.jmx`
- **Tests**: Complete booking flow from search to booking creation
- **Metrics**: Response time, throughput, error rate

### 4. End-to-End Test Plan
- **File**: `e2e-test.jmx`
- **Tests**: Complete user journey including authentication, search, and booking
- **Metrics**: Response time, throughput, error rate

## Running Tests

### Prerequisites
1. Install Apache JMeter from https://jmeter.apache.org/download_jmeter.cgi
2. Ensure the backend server is running on http://localhost:5000
3. Ensure the database is populated with test data

### Command Line Execution

```bash
# Run authentication test
jmeter -n -t authentication-test.jmx -l results/auth-results.jtl -e -o results/auth-report

# Run property search test
jmeter -n -t property-search-test.jmx -l results/search-results.jtl -e -o results/search-report

# Run booking process test
jmeter -n -t booking-process-test.jmx -l results/booking-results.jtl -e -o results/booking-report

# Run end-to-end test
jmeter -n -t e2e-test.jmx -l results/e2e-results.jtl -e -o results/e2e-report
```

### GUI Mode (for test development)

```bash
jmeter -t authentication-test.jmx
```

## Test Scenarios

### Concurrent User Testing
Test the application with different concurrent user loads:
- 100 concurrent users
- 200 concurrent users
- 300 concurrent users
- 400 concurrent users
- 500 concurrent users

### Performance Metrics to Collect
1. **Response Time**: Average, median, 90th percentile, 95th percentile, 99th percentile
2. **Throughput**: Requests per second
3. **Error Rate**: Percentage of failed requests
4. **CPU Usage**: Server CPU utilization
5. **Memory Usage**: Server memory consumption

## Expected Results

### Baseline Performance (100 users)
- Average Response Time: < 500ms
- Throughput: > 100 req/sec
- Error Rate: < 1%

### Performance Degradation Analysis
Document how performance degrades as concurrent users increase:
- Response time increase
- Throughput changes
- Error rate increase
- Resource utilization

## Test Data

### Sample Test Users
- Traveler: test-traveler@example.com / password123
- Owner: test-owner@example.com / password123

### Sample Properties
Ensure at least 50 properties are available in the database for realistic testing.

## Reporting

After running tests, analyze:
1. Response time graphs
2. Throughput over time
3. Error rate trends
4. Resource utilization
5. Bottleneck identification

## Notes
- Always run tests in a controlled environment
- Do not run performance tests against production
- Clear cache between test runs for consistent results
- Monitor server resources during tests
