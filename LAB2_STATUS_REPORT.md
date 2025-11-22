# Lab 2 - Status Report

## ✅ COMPLETED (Partial - 35%)

### Part 1: Docker & Kubernetes Setup (15 points) - **50% COMPLETE**

#### ✅ Docker Containerization - DONE
- **Backend Service**: ✅ Dockerized with Dockerfile
  - Location: `backend/Dockerfile`
  - Container: `airbnb-backend`
  - Port: 5001 (external) → 5000 (internal)
  - Includes: Traveler, Owner, Property, Booking services (all in one Node.js app)
  
- **Frontend Service**: ✅ Dockerized with Nginx
  - Location: `frontend/Dockerfile`
  - Container: `airbnb-frontend`
  - Port: 3001 (external) → 80 (internal)
  - Multi-stage build with React + Nginx
  
- **MySQL Database**: ✅ Using official image
  - Container: `airbnb-mysql`
  - Port: 3307 → 3306
  - Persistent volume for data
  
- **MongoDB**: ✅ Using official image (Lab 2)
  - Container: `airbnb-mongodb`
  - Port: 27017
  - For session storage
  
- **Kafka + Zookeeper**: ✅ Using Confluent images
  - Containers: `airbnb-kafka`, `airbnb-zookeeper`
  - Ports: 9093 (Kafka), 2181 (Zookeeper)

- **Docker Compose**: ✅ Complete orchestration
  - Location: `docker-compose.yml`
  - All services networked via `airbnb-network`
  - Health checks configured
  - Volume mounts for persistence

#### ❌ Kubernetes Orchestration - NOT STARTED
- **Missing**: Kubernetes deployment YAML files
- **Missing**: Kubernetes service definitions
- **Missing**: ConfigMaps and Secrets
- **Missing**: Ingress configuration
- **Missing**: Horizontal Pod Autoscaler (HPA)

**What's Needed**:
```
k8s/
├── mysql-deployment.yaml
├── mongodb-deployment.yaml
├── kafka-deployment.yaml
├── zookeeper-deployment.yaml
├── backend-deployment.yaml
├── frontend-deployment.yaml
├── configmap.yaml
├── secrets.yaml
└── ingress.yaml
```

---

### Part 2: Kafka for Asynchronous Messaging (10 points) - **60% COMPLETE**

#### ✅ Kafka Setup - DONE
- Kafka container running ✅
- Zookeeper container running ✅
- Backend connected to Kafka ✅

#### ✅ Kafka Integration - PARTIALLY DONE
- **Producer**: ✅ Implemented in booking routes
  - Location: `backend/routes/traveler/travelerRoutes.js`
  - Publishes booking events to Kafka topic
  
- **Consumer**: ✅ Implemented
  - Location: `backend/kafka/bookingConsumer.js`
  - Consumes booking events
  - Updates booking status
  
- **Kafka Config**: ✅ Implemented
  - Location: `backend/kafka/kafkaConfig.js`
  - Producer and consumer setup

#### ⚠️ Kafka Flow - NEEDS IMPROVEMENT
**Current Flow**:
1. Traveler creates booking → ✅ Event published to Kafka
2. Consumer processes event → ✅ Working
3. Owner accepts/cancels → ❌ NOT using Kafka (direct DB update)
4. Status updates to traveler → ❌ NOT using Kafka

**What's Needed**:
- Separate backend into producer and consumer services
- Owner actions should publish to Kafka
- Traveler should consume status updates from Kafka
- Implement proper event-driven architecture

---

### Part 3: MongoDB (5 points) - **80% COMPLETE**

#### ✅ MongoDB Setup - DONE
- MongoDB container running ✅
- Connection configured in backend ✅

#### ✅ Session Storage - DONE
- Sessions stored in MongoDB ✅
- Using `connect-mongo` for session store ✅
- Location: `backend/server.js` (lines 30-50)

#### ✅ Password Encryption - DONE
- Passwords hashed with bcrypt ✅
- Salt rounds: 10 ✅
- Location: All signup routes in `backend/routes/`

#### ⚠️ Minor Issue
- MySQL still primary database (as per Lab 1)
- MongoDB only used for sessions (as specified)
- Could migrate more data to MongoDB if needed

---

### Part 4: Redux Integration (5 points) - **0% COMPLETE**

#### ❌ Redux Setup - NOT STARTED
- Redux not installed in frontend
- No Redux store created
- No actions/reducers defined
- No Redux DevTools integration

**What's Needed**:
1. Install Redux packages:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Create Redux store structure:
   ```
   frontend/src/redux/
   ├── store.js
   ├── slices/
   │   ├── authSlice.js      (User authentication)
   │   ├── propertySlice.js  (Property data)
   │   └── bookingSlice.js   (Booking state)
   ```

3. Implement Redux for:
   - ✅ User Authentication (JWT tokens)
   - ✅ Property Search & Display
   - ✅ Booking Management
   - ✅ Favorites Management

4. Replace current state management:
   - Current: Using React `useState` and `localStorage`
   - Target: Redux store with persistence

---

### Part 5: JMeter Performance Testing (5 points) - **0% COMPLETE**

#### ❌ JMeter Testing - NOT STARTED
- No JMeter test plans created
- No performance testing done
- No results/analysis

**What's Needed**:
1. Create JMeter test plans (.jmx files) for:
   - User authentication (login/signup)
   - Property data fetching
   - Booking processing
   - Concurrent user scenarios

2. Test scenarios:
   - 100 concurrent users
   - 200 concurrent users
   - 300 concurrent users
   - 400 concurrent users
   - 500 concurrent users

3. Measure and document:
   - Response times
   - Throughput
   - Error rates
   - Performance bottlenecks

4. Create graphs and analysis

---

### Part 6: AWS Deployment - **0% COMPLETE**

#### ❌ AWS Deployment - NOT STARTED
- No AWS infrastructure setup
- No EC2 instances
- No EKS cluster
- No screenshots

**What's Needed**:
1. Deploy to AWS:
   - Option 1: EKS (Elastic Kubernetes Service)
   - Option 2: ECS (Elastic Container Service)
   - Option 3: EC2 with Docker Compose

2. Required AWS services:
   - EC2/EKS for compute
   - RDS for MySQL (optional)
   - DocumentDB for MongoDB (optional)
   - MSK for Kafka (optional)
   - Load Balancer
   - Route 53 for DNS (optional)

3. Screenshots needed:
   - Services running on AWS
   - Kafka message flows
   - Redux DevTools state changes

---

## 📊 OVERALL PROGRESS

| Part | Description | Points | Status | % Complete |
|------|-------------|--------|--------|------------|
| 1 | Docker & Kubernetes | 15 | 🟡 Partial | 50% |
| 2 | Kafka Messaging | 10 | 🟡 Partial | 60% |
| 3 | MongoDB | 5 | 🟢 Almost Done | 80% |
| 4 | Redux Integration | 5 | 🔴 Not Started | 0% |
| 5 | JMeter Testing | 5 | 🔴 Not Started | 0% |
| 6 | AWS Deployment | - | 🔴 Not Started | 0% |

**Total Progress: ~35% Complete**

---

## 🎯 PRIORITY TODO LIST

### High Priority (Required for Lab 2)
1. **Redux Integration** (5 points)
   - Install Redux packages
   - Create store and slices
   - Migrate state management
   - Test with Redux DevTools

2. **Kubernetes Configuration** (7.5 points remaining)
   - Create deployment YAMLs
   - Create service YAMLs
   - Test locally with Minikube/Kind
   - Document scaling

3. **Complete Kafka Flow** (4 points remaining)
   - Separate producer/consumer services
   - Implement owner → Kafka → traveler flow
   - Add proper event handling

4. **JMeter Testing** (5 points)
   - Create test plans
   - Run performance tests
   - Generate graphs
   - Write analysis

5. **AWS Deployment** (Required for screenshots)
   - Set up AWS infrastructure
   - Deploy application
   - Take screenshots
   - Document deployment

### Medium Priority
6. **Documentation**
   - Architecture diagrams
   - Kafka flow diagrams
   - Redux state flow
   - Performance analysis

### Low Priority
7. **Optimization**
   - Performance tuning
   - Caching strategies
   - Load balancing

---

## 📝 NEXT STEPS

### Immediate (This Session)
1. ✅ Complete Lab 1 fixes (DONE)
2. Install Redux and create basic store
3. Create Kubernetes deployment files

### Short Term (Next 1-2 Days)
4. Complete Redux integration
5. Set up local Kubernetes cluster
6. Create JMeter test plans

### Medium Term (Next 3-5 Days)
7. Deploy to AWS
8. Run performance tests
9. Complete documentation
10. Take all required screenshots

---

## 🔧 CURRENT WORKING FEATURES

### Lab 1 (All Working ✅)
- User signup/login (Traveler & Owner)
- Profile management with images
- Property CRUD operations
- Booking system
- Search and filters
- Favorites

### Lab 2 (Partially Working)
- Docker containerization ✅
- Docker Compose orchestration ✅
- MongoDB session storage ✅
- Kafka basic integration ✅
- Password encryption ✅

### Lab 2 (Not Working)
- Kubernetes deployment ❌
- Complete Kafka event flow ❌
- Redux state management ❌
- JMeter testing ❌
- AWS deployment ❌

---

## 📚 RESOURCES NEEDED

1. **Kubernetes**:
   - Minikube or Kind for local testing
   - kubectl CLI tool
   - Kubernetes documentation

2. **Redux**:
   - Redux Toolkit documentation
   - Redux DevTools browser extension

3. **JMeter**:
   - Apache JMeter download
   - JMeter documentation
   - Test plan templates

4. **AWS**:
   - AWS account
   - AWS CLI configured
   - EKS or EC2 access

---

## ⏱️ ESTIMATED TIME TO COMPLETE

- Redux Integration: 4-6 hours
- Kubernetes Setup: 6-8 hours
- Complete Kafka Flow: 3-4 hours
- JMeter Testing: 4-6 hours
- AWS Deployment: 6-8 hours
- Documentation: 4-6 hours

**Total: 27-38 hours of work remaining**

---

**Ready to start with Redux integration or Kubernetes setup?**
