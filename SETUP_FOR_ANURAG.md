# Setup Instructions for Anurag

## 🚀 Quick Start (5 minutes)

### Step 1: Extract and Start Services
```bash
unzip AirBNB-prototype.zip
cd AirBNB-prototype
docker-compose up -d
```

Wait 2-3 minutes for all services to start.

### Step 2: Verify Services Running
```bash
docker-compose ps
```

You should see 6 services running:
- airbnb-mysql
- airbnb-mongodb
- airbnb-zookeeper
- airbnb-kafka
- airbnb-backend
- airbnb-frontend

### Step 3: Access Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5001

---

## 👤 Create Test Accounts

### Owner Account
1. Go to: http://localhost:3001/owner/signup
2. Fill in:
   - Name: Test Owner
   - Email: testowner@test.com
   - Password: 123456
3. Click Sign Up

### Traveler Account
1. Go to: http://localhost:3001/traveler/signup
2. Fill in:
   - Name: Test Traveler
   - Email: testtraveler@test.com
   - Password: 123456
3. Click Sign Up

---

## 🏠 Add Test Property

1. Login as owner (testowner@test.com / 123456)
2. Go to "Add Property"
3. Fill in:
   - Name: Beach House
   - Type: House
   - Address: 123 Beach St
   - City: Santa Cruz
   - State: CA
   - Country: USA
   - Price: 200
   - Bedrooms: 3
   - Bathrooms: 2
   - Max Guests: 6
   - Description: Beautiful beach house
4. Click Save

---

## 📅 Test Booking Flow (Kafka)

### Create Booking (Traveler)
1. Logout, login as traveler (testtraveler@test.com / 123456)
2. Browse properties
3. Click on "Beach House"
4. Select dates and guests
5. Click "Book Now"

### Accept Booking (Owner)
1. Logout, login as owner (testowner@test.com / 123456)
2. Go to "Booking Requests"
3. Click "Accept" on the booking

### Verify Kafka Events
```bash
docker logs airbnb-backend -f | grep "📤\|📥"
```

You should see:
```
📤 Published to booking-created
📥 Received message from booking-created
📤 Published to booking-status-updated
📥 Received message from booking-status-updated
✅ Booking status updated
```

---

## 🧪 Run JMeter Tests

```bash
cd jmeter-tests
./run_all_tests.sh
```

Results will be in `jmeter-tests/results/`

---

## ☸️ Kubernetes Deployment

```bash
# Start Minikube
minikube start

# Deploy all services
cd k8s
kubectl apply -f .

# Check status
kubectl get pods
kubectl get services

# Access frontend
minikube service frontend-service
```

---

## ☁️ AWS Deployment

Follow the guide in `AWS_DEPLOY_FREE.md` for step-by-step EC2 deployment.

**Summary**:
1. Launch EC2 t2.micro (Free Tier)
2. Install Docker
3. Copy project files
4. Run `docker-compose up -d`
5. Access via EC2 public IP

---

## 🔍 Verify Everything Works

### Check Docker
```bash
docker-compose ps
docker logs airbnb-backend --tail 50
```

### Check Kubernetes
```bash
kubectl get pods
kubectl get services
kubectl get hpa
```

### Check Databases
```bash
# MySQL
docker exec -it airbnb-mysql mysql -uroot -pLappy1234567890 airbnb_db -e "SELECT * FROM users;"

# MongoDB
docker exec -it airbnb-mongodb mongosh airbnb --eval "db.sessions.find().pretty()"
```

### Check Kafka
```bash
docker logs airbnb-kafka --tail 50
```

---

## 🛑 Stop Services

```bash
# Docker
docker-compose down

# Kubernetes
kubectl delete -f k8s/
minikube stop
```

---

## 📸 Take Screenshots for Lab 2

Follow `SCREENSHOT_CHECKLIST.md` for all required screenshots.

---

## 🆘 Troubleshooting

### Services not starting?
```bash
docker-compose down -v
docker-compose up -d
```

### Port conflicts?
Check if ports 3001, 5001, 3307, 27017, 9092 are free:
```bash
lsof -i :3001
lsof -i :5001
```

### Kafka not connecting?
```bash
docker logs airbnb-kafka
docker logs airbnb-backend | grep -i kafka
```

---

## 📞 Contact

If you have issues, check:
1. `README.md` - Main project documentation
2. `LAB2_COMPLETE_SUBMISSION_GUIDE.md` - Full report template
3. `SCREENSHOT_CHECKLIST.md` - What screenshots to take

---

**Everything is ready to go! Just follow these steps and you'll have the full application running in 5 minutes.** 🚀
