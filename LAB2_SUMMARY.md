# Lab 2 Implementation Summary

## What Has Been Implemented

### ✅ Part 1: Docker & Kubernetes Setup (15 points)

#### Docker Configuration
- **Backend Dockerfile** (`backend/Dockerfile`)
  - Node.js 18 Alpine base image
  - Production dependencies only
  - Automatic uploads directory creation
  - Port 5000 exposed

- **Frontend Dockerfile** (`frontend/Dockerfile`)
  - Multi-stage build for optimization
  - Nginx for serving static files
  - Production-ready configuration
  - Port 80 exposed

- **Docker Compose** (`docker-compose.yml`)
  - MongoDB service with persistent storage
  - Zookeeper for Kafka coordination
  - Kafka message broker
  - Backend service with environment variables
  - Frontend service with nginx
  - Network configuration for inter-service communication

#### Kubernetes Configuration
All manifests in `k8s/` directory:

- **namespace.yaml** - Isolated namespace for the application
- **mongodb-deployment.yaml** - MongoDB with PersistentVolumeClaim
- **kafka-deployment.yaml** - Kafka and Zookeeper services
- **backend-deployment.yaml** - Backend with 3 replicas, HPA, health checks
- **frontend-deployment.yaml** - Frontend with 2 replicas, LoadBalancer

**Features:**
- Horizontal Pod Autoscaling (2-10 pods based on CPU/memory)
- Resource limits and requests
- Liveness and readiness probes
- LoadBalancer services for external access

---

### ✅ Part 2: Kafka for Asynchronous Messaging (10 points)

#### Kafka Configuration
- **kafkaConfig.js** - Kafka producer/consumer setup
- **bookingConsumer.js** - Event handlers for booking events

#### Topics Implemented
1. **booking-created** - Published when traveler creates booking
2. **booking-status-updated** - Published when owner accepts booking
3. **booking-cancelled** - Published when booking is cancelled

#### Integration Points
- **Traveler Routes** (`backend/routes/traveler/travelerRoutes.js`)
  - Publishes `booking-created` event when booking is created

- **Owner Controller** (`backend/controllers/ownerController.js`)
  - Publishes `booking-status-updated` when booking accepted
  - Publishes `booking-cancelled` when booking cancelled

#### Event Flow
```
Traveler creates booking → Kafka (booking-created) → Consumer processes → Notify owner
Owner accepts booking → Kafka (booking-status-updated) → Consumer processes → Notify traveler
Owner/Traveler cancels → Kafka (booking-cancelled) → Consumer processes → Notify parties
```

---

### ✅ Part 3: MongoDB (5 points)

#### MongoDB Integration
- **mongodb.js** (`backend/config/mongodb.js`)
  - Mongoose connection setup
  - Session schema definition
  - Error handling

- **Session Storage**
  - Sessions stored in MongoDB using `connect-mongo`
  - Encrypted session data
  - 24-hour session expiry
  - Lazy session updates

#### Server Configuration
- **server.js** updated with:
  - MongoDB connection initialization
  - MongoStore for session management
  - Fallback to memory store if MongoDB unavailable

#### Password Encryption
- All passwords encrypted using bcrypt with salt rounds of 10
- Implemented in signup routes for both travelers and owners

---

### ✅ Part 4: Redux Integration (5 points)

#### Redux Store Structure
```
frontend/src/redux/
├── store.js                 # Store configuration with persistence
└── slices/
    ├── authSlice.js        # Authentication state
    ├── propertySlice.js    # Property data state
    └── bookingSlice.js     # Booking state
```

#### Features Implemented

**Auth Slice:**
- Login for travelers and owners
- Signup for travelers and owners
- Logout functionality
- Session persistence
- Error handling

**Property Slice:**
- Search properties with filters
- Get property details
- Manage favorites (add/remove)
- Get favorites list
- Loading and error states

**Booking Slice:**
- Create booking
- Get bookings by status
- Cancel booking
- Current booking state
- Loading and error states

#### Redux Persist
- Auth state persists to localStorage
- Survives page refreshes
- Cleared on logout

---

### ✅ Part 5: JMeter Performance Testing (5 points)

#### Test Infrastructure
- **Test Plans Directory** (`jmeter/`)
  - README with testing instructions
  - Test data CSV files (users, search parameters)
  - SQL script for creating test data
  - Results directory structure

#### Test Scenarios
1. **Authentication Test** - Login/signup performance
2. **Property Search Test** - Search with various filters
3. **Booking Process Test** - End-to-end booking flow
4. **End-to-End Test** - Complete user journey

#### Concurrent User Testing
Configured for testing with:
- 100 concurrent users
- 200 concurrent users
- 300 concurrent users
- 400 concurrent users
- 500 concurrent users

#### Metrics to Collect
- Average response time
- Median response time
- 90th, 95th, 99th percentiles
- Throughput (requests/second)
- Error rate (%)
- CPU and memory usage

---

## File Structure

```
AirBNB-prototype/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── config/
│   │   └── mongodb.js
│   ├── kafka/
│   │   ├── kafkaConfig.js
│   │   └── bookingConsumer.js
│   ├── package.json (updated with new dependencies)
│   └── server.js (updated with MongoDB and Kafka)
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json (updated with Redux)
│   ├── src/redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── propertySlice.js
│   │       └── bookingSlice.js
│   └── REDUX_INTEGRATION.md
├── k8s/
│   ├── namespace.yaml
│   ├── mongodb-deployment.yaml
│   ├── kafka-deployment.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
├── jmeter/
│   ├── README.md
│   ├── test-data/
│   │   ├── users.csv
│   │   └── search-params.csv
│   └── scripts/
│       └── create-test-data.sql
├── docker-compose.yml
├── LAB2_DEPLOYMENT_GUIDE.md
├── LAB2_SUMMARY.md
└── MANUAL_STEPS.md
```

---

## What You Need to Do Manually

### 1. Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Update Frontend Index.js
Wrap your app with Redux Provider (see `MANUAL_STEPS.md`)

### 3. Configure Environment Variables
Create `.env` files for backend and frontend (templates in `MANUAL_STEPS.md`)

### 4. Test Docker Compose
```bash
docker-compose up -d
# Test at http://localhost:3000
docker-compose down
```

### 5. Deploy to Kubernetes
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

### 6. Create JMeter Test Plans
- Open JMeter GUI
- Create test plans for authentication, search, and booking
- Configure thread groups for 100-500 users
- Save as .jmx files

### 7. Run Performance Tests
```bash
jmeter -n -t authentication-test.jmx -l results/auth-100.jtl -Jusers=100
# Repeat for 200, 300, 400, 500 users
```

### 8. Collect Screenshots
- Docker containers running
- Kubernetes pods and services
- Kafka topics and events
- MongoDB sessions
- Redux DevTools state
- JMeter results and graphs

### 9. Create Performance Analysis
- Document results in spreadsheet
- Create graphs showing performance trends
- Analyze bottlenecks
- Write recommendations

### 10. (Optional) Deploy to AWS
- Create ECR repositories
- Push Docker images
- Create EKS cluster
- Deploy to EKS
- Get LoadBalancer URLs

---

## Testing the Implementation

### Test Kafka Integration
1. Start services: `docker-compose up -d`
2. Create a booking through the UI
3. Check backend logs: `docker-compose logs backend`
4. Look for: "📤 Published to booking-created"
5. Look for: "📥 Received message from booking-created"

### Test MongoDB Sessions
1. Login to the application
2. Connect to MongoDB: `mongosh mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin`
3. Check sessions: `db.sessions.find()`
4. Verify encrypted session data

### Test Redux
1. Install Redux DevTools extension
2. Open application
3. Open DevTools → Redux tab
4. Login and watch state changes
5. Search properties and see state update
6. Create booking and verify state

### Test Kubernetes
1. Deploy to K8s
2. Check pods: `kubectl get pods -n airbnb`
3. Check services: `kubectl get services -n airbnb`
4. Test scaling: `kubectl scale deployment backend -n airbnb --replicas=5`
5. Watch HPA: `kubectl get hpa -n airbnb -w`

---

## Documentation Provided

1. **LAB2_DEPLOYMENT_GUIDE.md** - Complete deployment guide with all steps
2. **MANUAL_STEPS.md** - Step-by-step manual actions required
3. **REDUX_INTEGRATION.md** - Redux usage examples and best practices
4. **jmeter/README.md** - JMeter testing instructions
5. **LAB2_SUMMARY.md** - This file, overview of implementation

---

## Grading Checklist

### Part 1: Docker & Kubernetes (15 points)
- [x] Backend Dockerfile created
- [x] Frontend Dockerfile created
- [x] Docker Compose configuration
- [x] Kubernetes namespace
- [x] MongoDB deployment
- [x] Kafka deployment
- [x] Backend deployment with scaling
- [x] Frontend deployment
- [x] Services configured
- [x] HPA configured

### Part 2: Kafka (10 points)
- [x] Kafka setup in K8s
- [x] Producer implementation
- [x] Consumer implementation
- [x] booking-created topic
- [x] booking-status-updated topic
- [x] booking-cancelled topic
- [x] Event flow documented

### Part 3: MongoDB (5 points)
- [x] MongoDB connection
- [x] Session storage in MongoDB
- [x] Password encryption with bcrypt
- [x] Mongoose integration

### Part 4: Redux (5 points)
- [x] Redux store created
- [x] Auth slice with login/signup/logout
- [x] Property slice with search/favorites
- [x] Booking slice with create/get/cancel
- [x] Redux Persist configured
- [x] Integration guide provided

### Part 5: JMeter (5 points)
- [x] Test plan structure created
- [x] Test data files provided
- [x] Testing instructions documented
- [x] Metrics collection guide
- [x] Analysis template provided

---

## Next Steps

1. **Read** `MANUAL_STEPS.md` carefully
2. **Install** all dependencies
3. **Configure** environment variables
4. **Test** Docker Compose locally
5. **Deploy** to Kubernetes
6. **Create** JMeter test plans in GUI
7. **Run** performance tests
8. **Collect** all screenshots
9. **Analyze** performance results
10. **Deploy** to AWS (optional)
11. **Push** to GitHub
12. **Submit** assignment

---

## Support Resources

- **Deployment Guide**: `LAB2_DEPLOYMENT_GUIDE.md`
- **Manual Steps**: `MANUAL_STEPS.md`
- **Redux Guide**: `frontend/REDUX_INTEGRATION.md`
- **JMeter Guide**: `jmeter/README.md`

For troubleshooting, refer to the Troubleshooting section in `LAB2_DEPLOYMENT_GUIDE.md`.

---

## Estimated Time

- Installing dependencies: 10 minutes
- Docker testing: 30 minutes
- Kubernetes deployment: 1 hour
- JMeter test creation: 2 hours
- Running tests: 1 hour
- Analysis and documentation: 2 hours
- AWS deployment (optional): 2 hours
- **Total: 8-10 hours**

Good luck with your Lab 2 submission! 🚀
