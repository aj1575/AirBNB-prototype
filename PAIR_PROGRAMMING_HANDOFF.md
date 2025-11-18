# Pair Programming Handoff - Lab 2

**From:** Yuktaa (Traveler Side Developer)  
**To:** Anurag (Owner Side Developer)  
**Date:** November 13, 2025  
**Branch:** `lab2-yuktaa-implementation`

---

## 📋 What I (Yuktaa) Completed

### Part 1: Docker & Kubernetes Infrastructure (100% Complete)

#### 1.1 Docker Configuration Files Created

**Backend Dockerfile** (`backend/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN mkdir -p uploads/profiles uploads/properties
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`)
```dockerfile
# Multi-stage build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose** (`docker-compose.yml`)
- Configured MongoDB service
- Configured Zookeeper + Kafka
- Configured Backend service with environment variables
- Configured Frontend service
- Set up networking between services

#### 1.2 Kubernetes Manifests Created (`k8s/` directory)

**Files Created:**
1. `namespace.yaml` - Created `airbnb` namespace
2. `mongodb-deployment.yaml` - MongoDB with PersistentVolumeClaim
3. `kafka-deployment.yaml` - Kafka + Zookeeper services
4. `backend-deployment.yaml` - Backend with 3 replicas, HPA (2-10 pods)
5. `frontend-deployment.yaml` - Frontend with 2 replicas

**Key Features:**
- Horizontal Pod Autoscaling configured
- Health check probes (liveness & readiness)
- Resource limits and requests
- LoadBalancer services for external access

---

### Part 2: Kafka Integration (100% Complete)

#### 2.1 Kafka Configuration Files

**Created:** `backend/kafka/kafkaConfig.js`
```javascript
// Kafka client setup
// Producer and Consumer initialization
// Topics: booking-created, booking-status-updated, booking-cancelled
// publishMessage() function for publishing events
// Graceful shutdown handling
```

**Created:** `backend/kafka/bookingConsumer.js`
```javascript
// Consumer that processes booking events
// Handlers for:
//   - handleBookingCreated()
//   - handleBookingStatusUpdated()
//   - handleBookingCancelled()
```

#### 2.2 Integration Points Modified

**Modified:** `backend/routes/traveler/travelerRoutes.js`
- Added Kafka import: `const { publishMessage, TOPICS } = require('../../kafka/kafkaConfig');`
- Updated booking creation to publish `booking-created` event
- Event includes: bookingId, propertyId, travelerId, dates, guests, totalPrice

**Modified:** `backend/controllers/ownerController.js`
- Added Kafka import
- Updated `acceptBooking()` to publish `booking-status-updated` event
- Updated `cancelBooking()` to publish `booking-cancelled` event

#### 2.3 Server Integration

**Modified:** `backend/server.js`
- Added MongoDB connection initialization
- Added Kafka initialization (non-blocking with timeout)
- Added Kafka consumer startup
- Added graceful shutdown for Kafka
- Added health check endpoint at `/api/health`

---

### Part 3: MongoDB Session Storage (100% Complete)

#### 3.1 MongoDB Configuration

**Created:** `backend/config/mongodb.js`
```javascript
// Mongoose connection setup
// Session schema definition
// connectMongoDB() function
```

**Modified:** `backend/server.js`
- Integrated MongoDB session store using `connect-mongo`
- Sessions now stored in MongoDB instead of memory
- Session encryption configured
- Fallback to memory store if MongoDB unavailable

#### 3.2 Dependencies Added

**Modified:** `backend/package.json`
```json
{
  "dependencies": {
    "kafkajs": "^2.2.4",
    "mongoose": "^8.0.0",
    "connect-mongo": "^5.1.0"
  }
}
```

---

### Part 4: Redux State Management (100% Complete)

#### 4.1 Redux Store Structure Created

**Created:** `frontend/src/redux/store.js`
- Configured Redux store with Redux Toolkit
- Integrated Redux Persist for auth state
- Combined reducers: auth, property, booking

#### 4.2 Redux Slices Created

**Created:** `frontend/src/redux/slices/authSlice.js`
- Async thunks: `loginTraveler`, `loginOwner`, `signupTraveler`, `signupOwner`, `logout`
- State: user, role, isAuthenticated, loading, error
- Actions: clearError, setUser

**Created:** `frontend/src/redux/slices/propertySlice.js`
- Async thunks: `searchProperties`, `getPropertyDetails`, `getFavorites`, `addFavorite`, `removeFavorite`
- State: properties, selectedProperty, favorites, loading, error, searchParams
- Actions: clearError, setSearchParams, clearSelectedProperty

**Created:** `frontend/src/redux/slices/bookingSlice.js`
- Async thunks: `createBooking`, `getBookings`, `cancelBooking`
- State: bookings, currentBooking, loading, error
- Actions: clearError, clearCurrentBooking

#### 4.3 Dependencies Added

**Modified:** `frontend/package.json`
```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "redux-persist": "^6.0.0"
  }
}
```

---

### Part 5: JMeter Performance Testing Infrastructure (100% Complete)

#### 5.1 Test Infrastructure Created

**Created:** `jmeter/README.md`
- Complete JMeter testing guide
- Instructions for running tests with 100-500 concurrent users
- Metrics collection guidelines

**Created:** `jmeter/test-data/users.csv`
- Test user credentials for travelers and owners

**Created:** `jmeter/test-data/search-params.csv`
- Sample search parameters for property search testing

**Created:** `jmeter/scripts/create-test-data.sql`
- SQL script to create test users and properties
- Instructions for generating bcrypt hashes

---

### Part 6: Documentation Created (100% Complete)

**Created comprehensive documentation:**
1. `LAB2_DEPLOYMENT_GUIDE.md` - Complete deployment guide (400+ lines)
2. `LAB2_SUMMARY.md` - Implementation summary
3. `MANUAL_STEPS.md` - Step-by-step manual actions
4. `QUICK_START.md` - Fast track guide
5. `frontend/REDUX_INTEGRATION.md` - Redux usage examples
6. `jmeter/README.md` - JMeter testing guide
7. Updated `README.md` - Added Lab 2 sections

---

## 🔧 Files Modified Summary

### Backend Files Modified:
1. ✅ `backend/package.json` - Added Kafka, MongoDB, Mongoose dependencies
2. ✅ `backend/server.js` - Added MongoDB & Kafka initialization
3. ✅ `backend/routes/traveler/travelerRoutes.js` - Added Kafka event publishing
4. ✅ `backend/controllers/ownerController.js` - Added Kafka event publishing

### Backend Files Created:
1. ✅ `backend/Dockerfile`
2. ✅ `backend/.dockerignore`
3. ✅ `backend/config/mongodb.js`
4. ✅ `backend/kafka/kafkaConfig.js`
5. ✅ `backend/kafka/bookingConsumer.js`

### Frontend Files Modified:
1. ✅ `frontend/package.json` - Added Redux dependencies

### Frontend Files Created:
1. ✅ `frontend/Dockerfile`
2. ✅ `frontend/.dockerignore`
3. ✅ `frontend/nginx.conf`
4. ✅ `frontend/src/redux/store.js`
5. ✅ `frontend/src/redux/slices/authSlice.js`
6. ✅ `frontend/src/redux/slices/propertySlice.js`
7. ✅ `frontend/src/redux/slices/bookingSlice.js`
8. ✅ `frontend/REDUX_INTEGRATION.md`

### Root Level Files Created:
1. ✅ `docker-compose.yml`
2. ✅ `k8s/namespace.yaml`
3. ✅ `k8s/mongodb-deployment.yaml`
4. ✅ `k8s/kafka-deployment.yaml`
5. ✅ `k8s/backend-deployment.yaml`
6. ✅ `k8s/frontend-deployment.yaml`
7. ✅ `jmeter/README.md`
8. ✅ `jmeter/test-data/users.csv`
9. ✅ `jmeter/test-data/search-params.csv`
10. ✅ `jmeter/scripts/create-test-data.sql`
11. ✅ `LAB2_DEPLOYMENT_GUIDE.md`
12. ✅ `LAB2_SUMMARY.md`
13. ✅ `MANUAL_STEPS.md`
14. ✅ `QUICK_START.md`
15. ✅ `PAIR_PROGRAMMING_HANDOFF.md` (this file)

---

## 🚀 How to Push to GitHub

```bash
# Create and switch to new branch
git checkout -b lab2-yuktaa-implementation

# Add all files
git add .

# Commit with descriptive message
git commit -m "Lab 2: Add Docker, Kubernetes, Kafka, MongoDB, Redux infrastructure

- Added Docker and Kubernetes configurations
- Integrated Kafka for async booking events
- Added MongoDB session storage
- Implemented Redux state management
- Created JMeter testing infrastructure
- Added comprehensive documentation

Completed by: Yuktaa (Traveler Side)"

# Push to GitHub
git push origin lab2-yuktaa-implementation
```

---

## 📝 What Anurag Needs to Do Next

### Step 1: Pull the Branch and Install Dependencies (15 minutes)

```bash
# Pull the new branch
git fetch origin
git checkout lab2-yuktaa-implementation

# Install backend dependencies
cd backend
npm install
# This will install: kafkajs, mongoose, connect-mongo

# Install frontend dependencies
cd ../frontend
npm install
# This will install: @reduxjs/toolkit, react-redux, redux-persist

cd ..
```

### Step 2: Test Docker Compose Setup (30 minutes)

```bash
# Start all services
docker-compose up -d

# Wait 30-60 seconds for services to initialize

# Check all containers are running
docker ps
# Should see: frontend, backend, mongodb, kafka, zookeeper

# Check backend logs for successful connections
docker-compose logs backend | grep "✅"
# Should see:
# ✅ MongoDB connected
# ✅ Kafka Producer connected
# ✅ Kafka Consumer connected

# Test the application
# Open http://localhost:3000
# Try creating a booking as traveler
# Check logs for Kafka events:
docker-compose logs backend | grep "📤"
docker-compose logs backend | grep "📥"

# Stop services
docker-compose down
```

### Step 3: Update Frontend to Use Redux (1 hour)

**File to modify:** `frontend/src/index.js`

Replace the current content with:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

**Optional:** Update owner-side components to use Redux (see `frontend/REDUX_INTEGRATION.md` for examples)

### Step 4: Create Environment Variables (10 minutes)

**Create:** `backend/.env`
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb

# MongoDB
MONGODB_URI=mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin

# Session
SESSION_SECRET=your-super-secret-key-change-in-production

# Kafka
KAFKA_BROKER=localhost:9093

# Server
PORT=5000
NODE_ENV=development
```

**Create:** `frontend/.env`
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 5: Test Kafka Event Flow (30 minutes)

1. Start services: `docker-compose up -d`
2. Open two terminal windows

**Terminal 1 - Watch Kafka events:**
```bash
docker-compose logs -f backend | grep "Kafka"
```

**Terminal 2 - Test the flow:**
```bash
# Open http://localhost:3000
# Login as owner (a@gmail.com / 123456)
# Go to booking requests
# Accept a booking
```

**Expected in Terminal 1:**
```
📤 Published to booking-status-updated: {...}
📥 Received message from booking-status-updated: {...}
✅ Booking X status updated to: accepted
📧 Notify traveler Y about status change
```

### Step 6: Deploy to Kubernetes (1 hour)

```bash
# Enable Kubernetes in Docker Desktop
# Settings → Kubernetes → Enable Kubernetes → Apply & Restart

# Deploy all services
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml

# Wait for MongoDB and Kafka to be ready (2-3 minutes)
kubectl get pods -n airbnb -w
# Press Ctrl+C when all pods show "Running"

# Deploy application
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Check all pods
kubectl get pods -n airbnb

# Check services
kubectl get services -n airbnb

# Port forward to access locally
kubectl port-forward -n airbnb service/frontend-service 3000:80 &
kubectl port-forward -n airbnb service/backend-service 5000:5000 &

# Test at http://localhost:3000
```

### Step 7: Create JMeter Test Plans (2 hours)

**Important:** You need to create `.jmx` files using JMeter GUI.

#### 7.1 Install JMeter
```bash
# macOS
brew install jmeter

# Or download from https://jmeter.apache.org/download_jmeter.cgi
```

#### 7.2 Create Test Data
```bash
# Generate bcrypt hash for password 'password123'
node -e "console.log(require('bcrypt').hashSync('password123', 10))"

# Copy the hash output
# Edit jmeter/scripts/create-test-data.sql
# Replace $2b$10$YourHashedPasswordHere with the actual hash

# Run SQL script
mysql -u root -p airbnb < jmeter/scripts/create-test-data.sql
```

#### 7.3 Create Authentication Test Plan

**Open JMeter GUI:**
```bash
jmeter
```

**Create test plan:**
1. Right-click Test Plan → Add → Threads (Users) → Thread Group
   - Name: "Authentication Test"
   - Number of Threads: `${__P(users,100)}`
   - Ramp-up Period: `${__P(rampup,10)}`
   - Loop Count: 1

2. Right-click Thread Group → Add → Config Element → CSV Data Set Config
   - Filename: `test-data/users.csv`
   - Variable Names: `email,password,name`

3. Right-click Thread Group → Add → Sampler → HTTP Request
   - Name: "Traveler Login"
   - Server: `localhost`
   - Port: `5000`
   - Method: `POST`
   - Path: `/api/traveler/login`
   - Body Data: `{"email":"${email}","password":"${password}"}`
   - Add Header Manager: `Content-Type: application/json`

4. Right-click Thread Group → Add → Listener → View Results Tree
5. Right-click Thread Group → Add → Listener → Summary Report
6. Right-click Thread Group → Add → Listener → Aggregate Report

7. Save as: `jmeter/authentication-test.jmx`

#### 7.4 Create Property Search Test Plan

Similar structure but:
- HTTP Request to `/api/traveler/properties/search`
- Use `search-params.csv` for data
- Save as: `jmeter/property-search-test.jmx`

#### 7.5 Create Booking Test Plan

Include:
1. Login request
2. Search properties request
3. Create booking request
- Save as: `jmeter/booking-process-test.jmx`

### Step 8: Run Performance Tests (1 hour)

```bash
cd jmeter

# Test with 100 users
jmeter -n -t authentication-test.jmx -l results/auth-100.jtl -Jusers=100 -Jrampup=10

# Test with 200 users
jmeter -n -t authentication-test.jmx -l results/auth-200.jtl -Jusers=200 -Jrampup=20

# Test with 300 users
jmeter -n -t authentication-test.jmx -l results/auth-300.jtl -Jusers=300 -Jrampup=30

# Test with 400 users
jmeter -n -t authentication-test.jmx -l results/auth-400.jtl -Jusers=400 -Jrampup=40

# Test with 500 users
jmeter -n -t authentication-test.jmx -l results/auth-500.jtl -Jusers=500 -Jrampup=50

# Generate HTML reports
jmeter -g results/auth-100.jtl -o results/auth-100-report
jmeter -g results/auth-200.jtl -o results/auth-200-report
jmeter -g results/auth-300.jtl -o results/auth-300-report
jmeter -g results/auth-400.jtl -o results/auth-400-report
jmeter -g results/auth-500.jtl -o results/auth-500-report
```

### Step 9: Collect Performance Metrics (30 minutes)

Create a spreadsheet with these columns:

| Concurrent Users | Avg Response Time (ms) | Median (ms) | 90th % | 95th % | Throughput (req/s) | Error Rate (%) |
|-----------------|------------------------|-------------|--------|--------|-------------------|----------------|
| 100             |                        |             |        |        |                   |                |
| 200             |                        |             |        |        |                   |                |
| 300             |                        |             |        |        |                   |                |
| 400             |                        |             |        |        |                   |                |
| 500             |                        |             |        |        |                   |                |

Get data from JMeter HTML reports or Summary Report listener.

### Step 10: Collect Screenshots (30 minutes)

**Required screenshots:**

1. **Docker:**
   - [ ] `docker ps` showing all 5 containers
   - [ ] Docker Desktop dashboard

2. **Kubernetes:**
   - [ ] `kubectl get pods -n airbnb`
   - [ ] `kubectl get services -n airbnb`
   - [ ] `kubectl get hpa -n airbnb`

3. **Kafka:**
   - [ ] Backend logs showing Kafka events (📤 and 📥)
   - [ ] Kafka topics list

4. **MongoDB:**
   - [ ] MongoDB Compass showing sessions collection
   - [ ] Session data with encrypted content

5. **Redux:**
   - [ ] Install Redux DevTools extension
   - [ ] Redux DevTools showing state tree
   - [ ] Auth state after login
   - [ ] Action history

6. **JMeter:**
   - [ ] Test plan in JMeter GUI
   - [ ] Summary report for 100 users
   - [ ] Summary report for 500 users
   - [ ] Response time graph
   - [ ] Throughput graph

### Step 11: Create Performance Analysis Document (1 hour)

**Create:** `PERFORMANCE_ANALYSIS.md`

```markdown
# Performance Analysis - Lab 2

## Test Configuration
- Server: MacBook Pro / Windows PC [specify]
- CPU: [specify]
- RAM: [specify]
- Database: MySQL 8.0
- Test Duration: 60 seconds per test
- Ramp-up: 10% of user count

## Results

[Insert table with metrics]

## Analysis

### 100 Concurrent Users
- Average response time: X ms
- Throughput: Y req/sec
- Error rate: Z%
- Observation: [Your analysis]

### 200 Concurrent Users
- [Similar analysis]

### 300 Concurrent Users
- [Similar analysis]

### 400 Concurrent Users
- [Similar analysis]

### 500 Concurrent Users
- [Similar analysis]

## Performance Trends
- Response time increased by X% from 100 to 500 users
- Throughput [increased/decreased/remained stable]
- Error rate started appearing at X concurrent users

## Bottlenecks Identified
1. [Database connection pool limit]
2. [Memory usage]
3. [CPU utilization]

## Recommendations
1. [Increase connection pool size]
2. [Add caching layer]
3. [Optimize database queries]
4. [Scale horizontally with more pods]
```

### Step 12: (Optional) Deploy to AWS (2 hours)

Follow the AWS deployment section in `LAB2_DEPLOYMENT_GUIDE.md`:
1. Create ECR repositories
2. Push Docker images to ECR
3. Create EKS cluster
4. Deploy to EKS
5. Get LoadBalancer URLs
6. Take screenshots

### Step 13: Merge and Finalize (30 minutes)

```bash
# Commit your changes (JMeter files, screenshots, analysis)
git add jmeter/*.jmx
git add jmeter/results/
git add screenshots/
git add PERFORMANCE_ANALYSIS.md
git add frontend/src/index.js  # If you updated it

git commit -m "Lab 2: Add JMeter tests, performance analysis, and screenshots

- Created JMeter test plans for authentication, search, and booking
- Ran tests for 100-500 concurrent users
- Collected performance metrics and analysis
- Added all required screenshots
- Updated frontend to use Redux

Completed by: Anurag (Owner Side)"

git push origin lab2-yuktaa-implementation

# Create pull request on GitHub to merge into main
```

---

## 📊 Division of Work

### Yuktaa's Contributions (Completed):
- ✅ Docker and Kubernetes infrastructure (100%)
- ✅ Kafka integration in backend (100%)
- ✅ MongoDB session storage setup (100%)
- ✅ Redux state management implementation (100%)
- ✅ JMeter test infrastructure and documentation (100%)
- ✅ All documentation files (100%)
- ✅ Modified traveler-side routes for Kafka (100%)
- ✅ Modified owner-side controller for Kafka (100%)

### Anurag's Tasks (To Do):
- ⏳ Test Docker Compose locally
- ⏳ Update frontend/src/index.js for Redux
- ⏳ Deploy to Kubernetes
- ⏳ Create JMeter test plans (.jmx files)
- ⏳ Run performance tests (100-500 users)
- ⏳ Collect performance metrics
- ⏳ Create performance analysis document
- ⏳ Collect all screenshots
- ⏳ (Optional) Deploy to AWS
- ⏳ Final review and merge

---

## 🆘 If You Run Into Issues

### Docker Issues
```bash
# Clean everything and restart
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

### Kubernetes Issues
```bash
# Check pod status
kubectl get pods -n airbnb

# Check pod logs
kubectl logs <pod-name> -n airbnb

# Describe pod for errors
kubectl describe pod <pod-name> -n airbnb

# Delete and recreate
kubectl delete pod <pod-name> -n airbnb
```

### Kafka Not Connecting
- Wait 60 seconds after starting (Kafka takes time)
- Check logs: `docker-compose logs kafka`
- Verify Zookeeper is running: `docker-compose logs zookeeper`

### MongoDB Connection Error
- Check connection string in `.env`
- Verify MongoDB is running: `docker-compose logs mongodb`

### JMeter Test Failing
- Ensure backend is running
- Check test data exists in database
- Verify CSV files have correct format
- Check server URL and port in HTTP Request

---

## 📞 Contact

**Yuktaa (Traveler Side):**
- Email: [your-email]
- Phone: [your-phone]

**Anurag (Owner Side):**
- Email: [anurag-email]
- Phone: [anurag-phone]

---

## ✅ Final Checklist Before Submission

- [ ] All dependencies installed
- [ ] Docker Compose tested and working
- [ ] Kubernetes deployed successfully
- [ ] Kafka events flowing correctly
- [ ] MongoDB sessions storing
- [ ] Redux integrated in frontend
- [ ] JMeter test plans created (.jmx files)
- [ ] Performance tests run for all user loads
- [ ] Performance analysis document created
- [ ] All screenshots collected
- [ ] AWS deployment completed (optional)
- [ ] Code pushed to GitHub
- [ ] Pull request created
- [ ] README.md reviewed
- [ ] All documentation files present

---

## 🎯 Estimated Time for Anurag

- Installing dependencies: 15 minutes
- Testing Docker Compose: 30 minutes
- Updating frontend for Redux: 1 hour
- Deploying to Kubernetes: 1 hour
- Creating JMeter test plans: 2 hours
- Running performance tests: 1 hour
- Collecting metrics and analysis: 1 hour
- Collecting screenshots: 30 minutes
- AWS deployment (optional): 2 hours
- **Total: 7-9 hours**

---

## 📚 Key Documentation to Read

1. **Start here:** `QUICK_START.md` - Fast track guide
2. **For details:** `LAB2_DEPLOYMENT_GUIDE.md` - Complete guide
3. **For steps:** `MANUAL_STEPS.md` - Step-by-step instructions
4. **For Redux:** `frontend/REDUX_INTEGRATION.md` - Redux examples
5. **For JMeter:** `jmeter/README.md` - Testing guide

---

**Good luck, Anurag! Everything is set up and ready for you. Just follow the steps above and you'll have everything completed for Lab 2! 🚀**

**If you have any questions, refer to the documentation files or contact me.**

---

**Branch to pull:** `lab2-yuktaa-implementation`

**Command to start:**
```bash
git fetch origin
git checkout lab2-yuktaa-implementation
cd backend && npm install
cd ../frontend && npm install
cd ..
docker-compose up -d
```
