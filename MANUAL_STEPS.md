# Manual Steps Required for Lab 2 Completion

This document outlines the manual steps you need to perform to complete Lab 2 assignment.

## 1. Install Dependencies

### Backend
```bash
cd backend
npm install
```

This will install the new dependencies:
- `kafkajs` - Kafka client
- `mongoose` - MongoDB ODM
- `connect-mongo` - MongoDB session store

### Frontend
```bash
cd frontend
npm install
```

This will install:
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `redux-persist` - Persist Redux state

## 2. Update Frontend to Use Redux

### Step 1: Update src/index.js

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

### Step 2: (Optional) Update Login Components to Use Redux

You can optionally update your login components to use Redux instead of direct API calls. See `frontend/REDUX_INTEGRATION.md` for examples.

## 3. Environment Variables

### Backend .env file

Create or update `backend/.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb

# MongoDB (for sessions)
MONGODB_URI=mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin

# Session
SESSION_SECRET=your-super-secret-key-change-in-production

# Kafka
KAFKA_BROKER=localhost:9093

# Server
PORT=5000
NODE_ENV=development
```

### Frontend .env file

Create or update `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 4. Docker & Kubernetes Setup

### Test Docker Compose Locally

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Test the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000

# Stop services
docker-compose down
```

### Deploy to Kubernetes

```bash
# Enable Kubernetes in Docker Desktop first!
# Settings → Kubernetes → Enable Kubernetes

# Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml

# Wait for MongoDB and Kafka to be ready
kubectl get pods -n airbnb -w

# Deploy application
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Check status
kubectl get all -n airbnb
```

## 5. JMeter Performance Testing

### Install JMeter

1. Download from https://jmeter.apache.org/download_jmeter.cgi
2. Extract to a directory
3. Add to PATH or use full path

### Create Test Data

```bash
# Generate bcrypt hash for password 'password123'
node -e "console.log(require('bcrypt').hashSync('password123', 10))"

# Copy the hash and update jmeter/scripts/create-test-data.sql
# Replace $2b$10$YourHashedPasswordHere with the actual hash

# Run the SQL script
mysql -u root -p airbnb < jmeter/scripts/create-test-data.sql
```

### Create JMeter Test Plans

You need to create `.jmx` files using JMeter GUI:

1. **Open JMeter GUI**
   ```bash
   jmeter
   ```

2. **Create Authentication Test Plan**
   - Add Thread Group (100, 200, 300, 400, 500 users)
   - Add HTTP Request for POST /api/traveler/login
   - Add CSV Data Set Config (use jmeter/test-data/users.csv)
   - Add Listeners (View Results Tree, Summary Report, Aggregate Report)
   - Save as `jmeter/authentication-test.jmx`

3. **Create Property Search Test Plan**
   - Similar structure but for GET /api/traveler/properties/search
   - Use jmeter/test-data/search-params.csv
   - Save as `jmeter/property-search-test.jmx`

4. **Create Booking Test Plan**
   - POST /api/traveler/bookings
   - Include login first, then booking
   - Save as `jmeter/booking-process-test.jmx`

### Run Tests

```bash
cd jmeter

# Run for each user load
for users in 100 200 300 400 500; do
    jmeter -n -t authentication-test.jmx \
        -l results/auth-${users}-users.jtl \
        -Jusers=${users} \
        -Jrampup=$((users/10)) \
        -Jduration=60
    
    # Generate HTML report
    jmeter -g results/auth-${users}-users.jtl \
        -o results/auth-${users}-report
done
```

### Collect Metrics

Create a spreadsheet with:
- Concurrent Users
- Average Response Time
- Median Response Time
- 90th Percentile
- 95th Percentile
- Throughput (req/sec)
- Error Rate (%)

## 6. AWS Deployment (Optional but Recommended)

### Prerequisites
```bash
# Install AWS CLI
brew install awscli  # macOS
# or download from https://aws.amazon.com/cli/

# Configure AWS CLI
aws configure
```

### Create ECR Repositories

```bash
aws ecr create-repository --repository-name airbnb-backend --region us-east-1
aws ecr create-repository --repository-name airbnb-frontend --region us-east-1
```

### Push Images to ECR

```bash
# Get login token
aws ecr get-login-password --region us-east-1 | \
    docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag images
docker tag airbnb-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-backend:latest
docker tag airbnb-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-frontend:latest

# Push
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-frontend:latest
```

### Create EKS Cluster

```bash
# Install eksctl
brew install eksctl

# Create cluster (takes 15-20 minutes)
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

### Update K8s Manifests for AWS

Update image references in `k8s/backend-deployment.yaml` and `k8s/frontend-deployment.yaml`:

```yaml
image: <account-id>.dkr.ecr.us-east-1.amazonaws.com/airbnb-backend:latest
```

### Deploy to EKS

```bash
# Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name airbnb-cluster

# Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Get LoadBalancer URLs
kubectl get services -n airbnb
```

## 7. Screenshots to Capture

### Docker
- [ ] `docker ps` output showing all containers
- [ ] Docker Desktop dashboard

### Kubernetes
- [ ] `kubectl get pods -n airbnb`
- [ ] `kubectl get services -n airbnb`
- [ ] `kubectl get hpa -n airbnb`
- [ ] `kubectl top pods -n airbnb`

### Kafka
- [ ] Kafka topics list
- [ ] Consumer showing booking-created events
- [ ] Consumer showing booking-status-updated events

### MongoDB
- [ ] MongoDB Compass showing sessions collection
- [ ] Sessions with encrypted data
- [ ] Connection string configuration

### Redux
- [ ] Redux DevTools showing state tree
- [ ] Auth state after login
- [ ] Property state after search
- [ ] Booking state after creating booking
- [ ] Action history in DevTools

### JMeter
- [ ] Test plan overview in GUI
- [ ] Summary report for each user load (100-500)
- [ ] Response time graph
- [ ] Throughput graph
- [ ] Aggregate report

### AWS (if deployed)
- [ ] ECR repositories with images
- [ ] EKS cluster dashboard
- [ ] Running pods on EKS
- [ ] LoadBalancer URLs
- [ ] Application running on AWS

## 8. Performance Analysis Document

Create a document with:

### Test Configuration
- Server specs
- Database configuration
- Test duration and ramp-up

### Results Table

| Users | Avg Response Time | Median | 90th % | 95th % | Throughput | Error Rate |
|-------|------------------|--------|--------|--------|------------|------------|
| 100   |                  |        |        |        |            |            |
| 200   |                  |        |        |        |            |            |
| 300   |                  |        |        |        |            |            |
| 400   |                  |        |        |        |            |            |
| 500   |                  |        |        |        |            |            |

### Analysis
- Performance trends
- Bottlenecks identified
- Why performance degrades
- How to improve
- Recommendations

## 9. Update README

Add sections to your main README.md:

```markdown
## Lab 2 Enhancements

### Docker & Kubernetes
- Dockerfiles for frontend and backend
- Docker Compose for local development
- Kubernetes manifests for production deployment
- Horizontal Pod Autoscaling configured

### Kafka Integration
- Asynchronous booking processing
- Event-driven architecture
- Topics: booking-created, booking-status-updated, booking-cancelled

### MongoDB
- Session storage in MongoDB
- Password encryption with bcrypt
- Mongoose ODM integration

### Redux State Management
- Centralized state management
- Redux Persist for auth state
- Redux DevTools integration

### Performance Testing
- JMeter test plans for 100-500 concurrent users
- Performance metrics and analysis
- Bottleneck identification

### AWS Deployment
- ECR for container images
- EKS for Kubernetes orchestration
- LoadBalancer for external access
```

## 10. Git Commit and Push

```bash
git add .
git commit -m "Lab 2: Add Docker, Kubernetes, Kafka, MongoDB, Redux, and JMeter"
git push origin main
```

## 11. Submission Checklist

- [ ] All dependencies installed
- [ ] Redux integrated in frontend
- [ ] Environment variables configured
- [ ] Docker Compose tested locally
- [ ] Kubernetes deployment successful
- [ ] Kafka events flowing correctly
- [ ] MongoDB sessions working
- [ ] JMeter tests run for all user loads
- [ ] Performance analysis completed
- [ ] All screenshots captured
- [ ] AWS deployment completed (optional)
- [ ] README updated
- [ ] Code pushed to GitHub
- [ ] LAB2_DEPLOYMENT_GUIDE.md reviewed

## Need Help?

Refer to:
- `LAB2_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `frontend/REDUX_INTEGRATION.md` - Redux usage examples
- `jmeter/README.md` - JMeter testing guide
- Official documentation links in deployment guide
