# Lab 2 Deployment Guide - Airbnb Prototype

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Part 1: Docker & Kubernetes Setup](#part-1-docker--kubernetes-setup)
3. [Part 2: Kafka Integration](#part-2-kafka-integration)
4. [Part 3: MongoDB Setup](#part-3-mongodb-setup)
5. [Part 4: Redux Integration](#part-4-redux-integration)
6. [Part 5: JMeter Performance Testing](#part-5-jmeter-performance-testing)
7. [AWS Deployment](#aws-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- Docker Desktop (latest version)
- Kubernetes (kubectl) - comes with Docker Desktop
- Node.js 18+ and npm
- MongoDB Compass (optional, for database management)
- Apache JMeter 5.5+
- AWS CLI (for AWS deployment)
- Git

### Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

## Part 1: Docker & Kubernetes Setup

### Step 1: Build Docker Images

```bash
# Build backend image
cd backend
docker build -t airbnb-backend:latest .

# Build frontend image
cd ../frontend
docker build -t airbnb-frontend:latest .
```

### Step 2: Run with Docker Compose (Local Testing)

```bash
# From project root
docker-compose up -d

# Check running containers
docker ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

**Services Available:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017
- Kafka: localhost:9093

### Step 3: Kubernetes Deployment

#### Enable Kubernetes in Docker Desktop
1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"

#### Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy MongoDB
kubectl apply -f k8s/mongodb-deployment.yaml

# Deploy Kafka & Zookeeper
kubectl apply -f k8s/kafka-deployment.yaml

# Wait for Kafka to be ready (check with: kubectl get pods -n airbnb)

# Deploy Backend
kubectl apply -f k8s/backend-deployment.yaml

# Deploy Frontend
kubectl apply -f k8s/frontend-deployment.yaml

# Check all pods are running
kubectl get pods -n airbnb

# Check services
kubectl get services -n airbnb
```

#### Access Services

```bash
# Get service URLs
kubectl get services -n airbnb

# Port forward if using LoadBalancer locally
kubectl port-forward -n airbnb service/backend-service 5000:5000
kubectl port-forward -n airbnb service/frontend-service 3000:80
```

#### Scaling

```bash
# Scale backend pods
kubectl scale deployment backend -n airbnb --replicas=5

# Check HPA (Horizontal Pod Autoscaler)
kubectl get hpa -n airbnb

# View pod metrics
kubectl top pods -n airbnb
```

---

## Part 2: Kafka Integration

### Kafka Topics
The application uses three Kafka topics:
1. `booking-created` - Published when a traveler creates a booking
2. `booking-status-updated` - Published when owner accepts a booking
3. `booking-cancelled` - Published when a booking is cancelled

### Testing Kafka Integration

```bash
# Access Kafka container
docker exec -it airbnb-kafka bash

# List topics
kafka-topics --list --bootstrap-server localhost:9092

# Consume messages from booking-created topic
kafka-console-consumer --bootstrap-server localhost:9092 \
  --topic booking-created --from-beginning

# In another terminal, create a booking through the app and watch messages appear
```

### Kafka Flow Diagram

```
Traveler → POST /api/traveler/bookings → Backend (Producer)
                                              ↓
                                         Kafka Topic: booking-created
                                              ↓
                                    Backend (Consumer) → Process Event
                                              ↓
                                    Notify Owner (Email/Push)

Owner → PUT /api/owner/bookings/:id/accept → Backend (Producer)
                                                   ↓
                                         Kafka Topic: booking-status-updated
                                                   ↓
                                         Backend (Consumer) → Process Event
                                                   ↓
                                         Notify Traveler (Email/Push)
```

---

## Part 3: MongoDB Setup

### MongoDB Configuration

The application uses MongoDB for:
- Session storage (using connect-mongo)
- User sessions are encrypted and stored in MongoDB

### Environment Variables

Create a `.env` file in the backend directory:

```env
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

### Verify MongoDB Connection

```bash
# Connect to MongoDB
mongosh mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin

# Check sessions collection
use airbnb
db.sessions.find()

# Check users (if migrated)
db.users.find()
```

### Password Encryption

All passwords are encrypted using bcrypt with salt rounds of 10:

```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

---

## Part 4: Redux Integration

### Redux Store Structure

```
src/redux/
├── store.js                 # Redux store configuration
└── slices/
    ├── authSlice.js        # Authentication state
    ├── propertySlice.js    # Property data state
    └── bookingSlice.js     # Booking state
```

### Integrating Redux in Your App

Update `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

### Using Redux in Components

Example - Login Component:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginTraveler } from '../redux/slices/authSlice';

function Login() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const handleLogin = async (credentials) => {
    await dispatch(loginTraveler(credentials));
  };

  // ... rest of component
}
```

### Redux DevTools

Install Redux DevTools Extension:
- Chrome: https://chrome.google.com/webstore/detail/redux-devtools
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/

---

## Part 5: JMeter Performance Testing

### Setup JMeter

1. Download JMeter from https://jmeter.apache.org/download_jmeter.cgi
2. Extract and add to PATH
3. Verify installation: `jmeter --version`

### Create Test Data

```bash
# Generate password hash for test users
node -e "console.log(require('bcrypt').hashSync('password123', 10))"

# Update the hash in jmeter/scripts/create-test-data.sql
# Run the SQL script to create test data
mysql -u root -p airbnb < jmeter/scripts/create-test-data.sql
```

### Running Performance Tests

```bash
cd jmeter

# Test with 100 concurrent users
jmeter -n -t authentication-test.jmx -l results/auth-100-users.jtl \
  -Jusers=100 -Jrampup=10 -Jduration=60

# Test with 200 concurrent users
jmeter -n -t authentication-test.jmx -l results/auth-200-users.jtl \
  -Jusers=200 -Jrampup=20 -Jduration=60

# Test with 300 concurrent users
jmeter -n -t authentication-test.jmx -l results/auth-300-users.jtl \
  -Jusers=300 -Jrampup=30 -Jduration=60

# Test with 400 concurrent users
jmeter -n -t authentication-test.jmx -l results/auth-400-users.jtl \
  -Jusers=400 -Jrampup=40 -Jduration=60

# Test with 500 concurrent users
jmeter -n -t authentication-test.jmx -l results/auth-500-users.jtl \
  -Jusers=500 -Jrampup=50 -Jduration=60

# Generate HTML report
jmeter -g results/auth-100-users.jtl -o results/auth-100-report
```

### Performance Metrics to Collect

Create a spreadsheet with these columns:
- Concurrent Users (100, 200, 300, 400, 500)
- Average Response Time (ms)
- Median Response Time (ms)
- 90th Percentile (ms)
- 95th Percentile (ms)
- Throughput (req/sec)
- Error Rate (%)
- CPU Usage (%)
- Memory Usage (MB)

### Analysis Template

```
Performance Test Results Analysis

1. Test Configuration:
   - Endpoint: /api/traveler/login
   - Test Duration: 60 seconds
   - Ramp-up Period: Varies by user count

2. Results Summary:
   [Insert table with metrics]

3. Observations:
   - At 100 users: [Describe performance]
   - At 200 users: [Describe performance]
   - At 300 users: [Describe performance]
   - At 400 users: [Describe performance]
   - At 500 users: [Describe performance]

4. Bottlenecks Identified:
   - [List bottlenecks]

5. Recommendations:
   - [List improvements]
```

---

## AWS Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- EKS cluster created

### Step 1: Push Images to ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Create repositories
aws ecr create-repository --repository-name airbnb-backend
aws ecr create-repository --repository-name airbnb-frontend

# Tag images
docker tag airbnb-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-backend:latest
docker tag airbnb-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-frontend:latest

# Push images
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-frontend:latest
```

### Step 2: Create EKS Cluster

```bash
# Install eksctl
brew install eksctl  # macOS
# or download from https://eksctl.io/

# Create cluster
eksctl create cluster \
  --name airbnb-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 5 \
  --managed
```

### Step 3: Update K8s Manifests for AWS

Update image references in k8s deployment files to use ECR URLs.

### Step 4: Deploy to EKS

```bash
# Configure kubectl for EKS
aws eks update-kubeconfig --region us-east-1 --name airbnb-cluster

# Deploy all resources
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Get LoadBalancer URLs
kubectl get services -n airbnb
```

### Step 5: Configure Domain (Optional)

```bash
# Get LoadBalancer DNS
kubectl get service frontend-service -n airbnb -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'

# Create Route53 record pointing to LoadBalancer
```

---

## Troubleshooting

### Docker Issues

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check container logs
docker logs airbnb-backend
docker logs airbnb-frontend
```

### Kubernetes Issues

```bash
# Check pod status
kubectl get pods -n airbnb

# Describe pod for errors
kubectl describe pod <pod-name> -n airbnb

# Check logs
kubectl logs <pod-name> -n airbnb

# Delete and recreate deployment
kubectl delete deployment backend -n airbnb
kubectl apply -f k8s/backend-deployment.yaml
```

### Kafka Issues

```bash
# Check Kafka is running
kubectl get pods -n airbnb | grep kafka

# Check Kafka logs
kubectl logs <kafka-pod-name> -n airbnb

# Verify topics exist
kubectl exec -it <kafka-pod-name> -n airbnb -- \
  kafka-topics --list --bootstrap-server localhost:9092
```

### MongoDB Issues

```bash
# Check MongoDB is running
kubectl get pods -n airbnb | grep mongodb

# Connect to MongoDB
kubectl exec -it <mongodb-pod-name> -n airbnb -- mongosh

# Check connection from backend
kubectl exec -it <backend-pod-name> -n airbnb -- \
  node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(e => console.error(e))"
```

---

## Screenshots to Include in Submission

1. **Docker**
   - `docker ps` showing all containers running
   - Docker Desktop dashboard

2. **Kubernetes**
   - `kubectl get pods -n airbnb`
   - `kubectl get services -n airbnb`
   - `kubectl get hpa -n airbnb`

3. **Kafka**
   - Kafka topics list
   - Consumer showing booking events

4. **MongoDB**
   - MongoDB Compass showing sessions collection
   - Session data with encrypted passwords

5. **Redux**
   - Redux DevTools showing state tree
   - State changes during login/booking

6. **JMeter**
   - Test plan overview
   - Results table for all user loads
   - Response time graph
   - Throughput graph

7. **AWS**
   - EKS cluster dashboard
   - ECR repositories
   - Running pods on AWS
   - LoadBalancer URLs

---

## Submission Checklist

- [ ] All Docker files created and tested
- [ ] Kubernetes manifests created and deployed
- [ ] Kafka integration working (events flowing)
- [ ] MongoDB configured with session storage
- [ ] Redux integrated in frontend
- [ ] JMeter tests run for all user loads (100-500)
- [ ] Performance analysis document created
- [ ] Screenshots collected
- [ ] Code pushed to GitHub
- [ ] README updated with deployment instructions
- [ ] AWS deployment completed (if applicable)

---

## Additional Resources

- Docker Documentation: https://docs.docker.com/
- Kubernetes Documentation: https://kubernetes.io/docs/
- Kafka Documentation: https://kafka.apache.org/documentation/
- MongoDB Documentation: https://docs.mongodb.com/
- Redux Toolkit: https://redux-toolkit.js.org/
- JMeter Documentation: https://jmeter.apache.org/usermanual/
- AWS EKS: https://docs.aws.amazon.com/eks/

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Consult official documentation
4. Ask in class discussion forum
