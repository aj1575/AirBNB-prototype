# Quick Start Guide - Lab 2

## 🚀 Fast Track to Get Running

### 1. Install Dependencies (5 minutes)

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start with Docker Compose (Easiest Way)

```bash
# From project root
docker-compose up -d

# Wait 30 seconds for services to start

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
# Kafka: localhost:9093
```

### 3. Verify Everything Works

```bash
# Check all containers are running
docker ps

# Should see 5 containers:
# - airbnb-frontend
# - airbnb-backend
# - airbnb-mongodb
# - airbnb-kafka
# - airbnb-zookeeper

# Check backend logs
docker-compose logs backend | grep "✅"

# Should see:
# ✅ MongoDB connected
# ✅ Kafka Producer connected
# ✅ Kafka Consumer connected
```

### 4. Test the Application

1. Open http://localhost:3000
2. Sign up as a traveler
3. Search for properties
4. Create a booking
5. Check backend logs to see Kafka events:
   ```bash
   docker-compose logs backend | grep "📤"
   ```

### 5. Stop Services

```bash
docker-compose down
```

---

## 📊 Quick JMeter Test

### Prerequisites
```bash
# Install JMeter
brew install jmeter  # macOS
# or download from https://jmeter.apache.org/
```

### Create Test Data
```bash
# Generate password hash
node -e "console.log(require('bcrypt').hashSync('password123', 10))"

# Update jmeter/scripts/create-test-data.sql with the hash
# Run SQL script
mysql -u root -p airbnb < jmeter/scripts/create-test-data.sql
```

### Run Simple Test
```bash
# Open JMeter GUI
jmeter

# Create simple test:
# 1. Add Thread Group (100 users, 10 sec ramp-up)
# 2. Add HTTP Request (POST to /api/traveler/login)
# 3. Add View Results Tree
# 4. Run test
```

---

## ☸️ Quick Kubernetes Deploy

### Enable Kubernetes
1. Open Docker Desktop
2. Settings → Kubernetes
3. Enable Kubernetes
4. Apply & Restart

### Deploy
```bash
# Deploy all at once
kubectl apply -f k8s/

# Wait for pods to be ready (takes 2-3 minutes)
kubectl get pods -n airbnb -w

# When all pods show "Running", press Ctrl+C

# Get services
kubectl get services -n airbnb

# Port forward to access locally
kubectl port-forward -n airbnb service/frontend-service 3000:80
kubectl port-forward -n airbnb service/backend-service 5000:5000

# Access at http://localhost:3000
```

---

## 🔍 Quick Verification Checklist

### Docker ✓
- [ ] `docker ps` shows 5 containers
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend accessible at http://localhost:5000
- [ ] Can create account and login

### Kafka ✓
- [ ] Backend logs show "✅ Kafka Producer connected"
- [ ] Backend logs show "✅ Kafka Consumer connected"
- [ ] Creating booking shows "📤 Published to booking-created"
- [ ] Backend shows "📥 Received message from booking-created"

### MongoDB ✓
- [ ] Backend logs show "✅ MongoDB connected"
- [ ] Can login and session persists
- [ ] Sessions visible in MongoDB:
  ```bash
  mongosh mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin
  > db.sessions.find()
  ```

### Kubernetes ✓
- [ ] `kubectl get pods -n airbnb` shows all pods Running
- [ ] `kubectl get services -n airbnb` shows all services
- [ ] Can access application via port-forward
- [ ] HPA configured: `kubectl get hpa -n airbnb`

### Redux ✓
- [ ] Redux DevTools extension installed
- [ ] Can see state tree in DevTools
- [ ] Login updates auth state
- [ ] Search updates property state
- [ ] Booking updates booking state

---

## 🐛 Quick Troubleshooting

### Docker Compose not starting?
```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Start again
docker-compose up -d
```

### Kafka not connecting?
```bash
# Wait longer (Kafka takes 30-60 seconds to start)
docker-compose logs kafka

# Check Zookeeper is running
docker-compose logs zookeeper
```

### MongoDB connection error?
```bash
# Check MongoDB is running
docker-compose logs mongodb

# Verify connection string in backend/.env
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/airbnb?authSource=admin
```

### Kubernetes pods not starting?
```bash
# Check pod status
kubectl describe pod <pod-name> -n airbnb

# Check events
kubectl get events -n airbnb --sort-by='.lastTimestamp'

# Delete and recreate
kubectl delete pod <pod-name> -n airbnb
```

---

## 📸 Screenshot Checklist

Quick list of screenshots needed:

1. **Docker**
   - [ ] `docker ps` output
   - [ ] Docker Desktop dashboard

2. **Kubernetes**
   - [ ] `kubectl get pods -n airbnb`
   - [ ] `kubectl get services -n airbnb`

3. **Kafka**
   - [ ] Backend logs showing Kafka events
   - [ ] Kafka topics list

4. **MongoDB**
   - [ ] MongoDB Compass with sessions
   - [ ] Session data

5. **Redux**
   - [ ] Redux DevTools state tree
   - [ ] Auth state after login
   - [ ] Action history

6. **JMeter**
   - [ ] Test plan in GUI
   - [ ] Results for 100 users
   - [ ] Results for 500 users
   - [ ] Response time graph

---

## 🎯 Minimum Viable Submission

If short on time, focus on these essentials:

1. **Docker Compose working** (easiest to demo)
2. **One Kafka event flowing** (booking creation)
3. **MongoDB sessions storing** (login and check DB)
4. **Redux DevTools showing state** (install extension, take screenshot)
5. **One JMeter test** (100 users, authentication endpoint)

This covers all 5 parts of the assignment at a basic level.

---

## ⏱️ Time Estimates

- Docker Compose setup: **15 minutes**
- Kubernetes deployment: **30 minutes**
- JMeter basic test: **30 minutes**
- Screenshots: **15 minutes**
- **Total: 90 minutes for basic submission**

---

## 🆘 Need Help?

1. Check `LAB2_DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `MANUAL_STEPS.md` for step-by-step guide
3. Check `LAB2_SUMMARY.md` for what's implemented
4. Check logs: `docker-compose logs <service-name>`
5. Check Kubernetes: `kubectl describe pod <pod-name> -n airbnb`

---

## ✅ Ready to Submit?

- [ ] Code pushed to GitHub
- [ ] All screenshots collected
- [ ] Performance analysis completed
- [ ] README updated
- [ ] LAB2_DEPLOYMENT_GUIDE.md included
- [ ] All services tested and working

**Good luck! 🚀**
