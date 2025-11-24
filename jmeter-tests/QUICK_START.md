# JMeter Quick Start - 3 Easy Steps

## ✅ OPTION 1: AUTOMATED (FASTEST - 10 minutes)

Just run this one command:

```bash
cd /Users/spartan/Desktop/AirBNB-prototype/jmeter-tests
./run_all_tests.sh
```

This will:
- Run tests with 100, 200, 300, 400, 500 users
- Generate HTML reports automatically
- Save all results in `results/` folder

**Then view results**:
```bash
open results/login_100_report/index.html
open results/login_200_report/index.html
open results/login_300_report/index.html
open results/login_400_report/index.html
open results/login_500_report/index.html
```

---

## ✅ OPTION 2: MANUAL IN GUI (15 minutes)

### Step 1: Open JMeter
```bash
jmeter
```

### Step 2: Load Test Plan
1. File → Open
2. Navigate to: `/Users/spartan/Desktop/AirBNB-prototype/jmeter-tests/`
3. Open: `owner_login_test.jmx`

### Step 3: Run Test
1. Click the green "Start" button (▶️) at the top
2. Watch the results in real-time

### Step 4: View Results
Click on these listeners in the left panel:
- **Summary Report** - See average response times
- **Aggregate Report** - See detailed statistics
- **Graph Results** - See visual graph
- **View Results Tree** - See individual requests

### Step 5: Change User Count
1. Click "Owner Login Users" (Thread Group) in left panel
2. Change "Number of Threads (users)" to: 200, 300, 400, 500
3. Click "Start" button again
4. Take screenshots of results

### Step 6: Save Results
- File → Save Test Plan
- Take screenshots of each report

---

## 📊 WHAT TO CAPTURE

### For Each Test (100, 200, 300, 400, 500 users):

1. **Summary Report** - Shows:
   - Average response time
   - Min/Max response time
   - Throughput (requests/sec)
   - Error %

2. **Aggregate Report** - Shows:
   - 90th percentile
   - 95th percentile
   - 99th percentile

3. **Graph Results** - Visual graph of response times

---

## 📈 CREATE COMPARISON TABLE

After running all tests, create this table:

| Users | Avg Response (ms) | 90th % (ms) | Throughput (req/s) | Error % |
|-------|-------------------|-------------|---------------------|---------|
| 100   | [from report]     | [from report] | [from report]     | [from report] |
| 200   | [from report]     | [from report] | [from report]     | [from report] |
| 300   | [from report]     | [from report] | [from report]     | [from report] |
| 400   | [from report]     | [from report] | [from report]     | [from report] |
| 500   | [from report]     | [from report] | [from report]     | [from report] |

---

## 🎯 EXPECTED RESULTS

**Good Performance**:
- 100-200 users: < 500ms average response time
- Error rate < 1%

**Acceptable**:
- 300-400 users: < 1000ms average response time
- Error rate < 5%

**Performance Degradation** (Expected):
- 500 users: > 1000ms response time
- Error rate may increase (shows system limits)

---

## 📸 SCREENSHOTS NEEDED

1. JMeter GUI with test plan loaded
2. Thread Group configuration (showing 100, 200, 300, 400, 500 users)
3. Summary Report for each user count (5 screenshots)
4. Aggregate Report for each user count (5 screenshots)
5. Graph Results showing response time curve
6. HTML report dashboard (if using automated script)

---

## ⚡ FASTEST PATH (Recommended)

```bash
# 1. Run automated tests (10 minutes)
cd /Users/spartan/Desktop/AirBNB-prototype/jmeter-tests
./run_all_tests.sh

# 2. Open HTML reports and take screenshots
open results/login_100_report/index.html
# Take screenshot of dashboard

open results/login_200_report/index.html
# Take screenshot of dashboard

open results/login_300_report/index.html
# Take screenshot of dashboard

open results/login_400_report/index.html
# Take screenshot of dashboard

open results/login_500_report/index.html
# Take screenshot of dashboard

# 3. Extract data from reports and create comparison table
# All data is in the HTML reports!
```

---

## 🚨 IF TESTS FAIL

```bash
# Check if application is running
docker-compose ps

# Restart if needed
docker-compose restart

# Check backend logs
docker logs airbnb-backend --tail 50

# Try with fewer users first
# Edit owner_login_test.jmx and change threads to 50
```

---

## ✅ DONE!

After running tests and taking screenshots, you have:
- ✅ Performance test results for 5 different loads
- ✅ Screenshots for report
- ✅ Data for comparison table
- ✅ HTML reports with graphs

**This completes the JMeter testing requirement (5 points)!**
