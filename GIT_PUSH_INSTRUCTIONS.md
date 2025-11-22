# Git Push Instructions for Lab 2

## ✅ SAFE APPROACH: Push to New Branch

Your Lab 1 code is safe on `main` branch. We'll push Lab 2 to `lab2-clean-implementation` branch.

---

## 📋 STEP-BY-STEP COMMANDS

### 1. Add All Lab 2 Files
```bash
cd /Users/spartan/Desktop/AirBNB-prototype

# Add all new and modified files
git add .
```

### 2. Commit Lab 2 Changes
```bash
git commit -m "Lab 2: Complete Docker, Kubernetes, MongoDB, and Redux Implementation

- Docker: Containerized all services (backend, frontend, MySQL, MongoDB, Kafka)
- Kubernetes: Created deployments, services, HPA, ingress, and ConfigMaps
- MongoDB: Session storage with encrypted passwords
- Redux: Complete state management for auth, properties, and bookings
- Kafka: Basic producer/consumer for booking events
- Documentation: Added comprehensive guides and status reports

Status: 65% complete (31/40 points)
- Part 1 (Docker & K8s): 15/15 ✅
- Part 2 (Kafka): 6/10 🟡
- Part 3 (MongoDB): 5/5 ✅
- Part 4 (Redux): 5/5 ✅
- Part 5 (JMeter): 0/5 ⏭️
- Part 6 (AWS): Not started ⏭️"
```

### 3. Push to GitHub
```bash
# Push to new branch (won't affect main)
git push origin lab2-clean-implementation
```

### 4. Verify on GitHub
- Go to: https://github.com/aj1575/AirBNB-prototype
- You should see a new branch: `lab2-clean-implementation`
- Click "Compare & pull request" (optional - for review)

---

## 🔀 ALTERNATIVE: Create Pull Request

After pushing, you can create a PR for Anurag to review:

1. Go to GitHub repository
2. Click "Compare & pull request"
3. Base: `main` ← Compare: `lab2-clean-implementation`
4. Add description of Lab 2 changes
5. Assign to Anurag
6. He can review and merge when ready

---

## 📝 WHAT ANURAG WILL SEE

When Anurag clones/pulls:

```bash
# Clone the repo
git clone https://github.com/aj1575/AirBNB-prototype.git
cd AirBNB-prototype

# Switch to Lab 2 branch
git checkout lab2-clean-implementation

# See all Lab 2 files
ls -la
```

---

## 🔒 LAB 1 REMAINS SAFE

Lab 1 code is still on `main` branch:
```bash
git checkout main  # Switch back to Lab 1
```

---

## 📦 FILES THAT WILL BE PUSHED

### New Kubernetes Files (k8s/):
- secrets.yaml
- configmap.yaml
- mysql-deployment.yaml
- mongodb-deployment.yaml
- zookeeper-deployment.yaml
- kafka-deployment.yaml
- backend-deployment.yaml
- frontend-deployment.yaml
- frontend-nginx-config.yaml
- ingress.yaml
- deploy.sh
- cleanup.sh

### New Redux Files (frontend/src/redux/):
- store.js
- slices/authSlice.js
- slices/propertySlice.js
- slices/bookingSlice.js

### Docker Files:
- docker-compose.yml
- backend/Dockerfile
- frontend/Dockerfile
- frontend/nginx.conf

### Documentation:
- LAB2_STATUS_REPORT.md
- LAB2_PROGRESS_UPDATE.md
- REDUX_IMPLEMENTATION.md
- K8S_DEPLOYMENT_SUCCESS.txt
- FIXES_APPLIED.md
- LAB1_COMPLETE_CHECKLIST.md

### Modified Files:
- All frontend pages (Redux integration)
- Backend server.js (MongoDB sessions)
- Package.json files (new dependencies)

---

## ⚠️ IMPORTANT NOTES

1. **Lab 1 is NOT affected** - It's safe on `main` branch
2. **Anurag needs to switch branches** - `git checkout lab2-clean-implementation`
3. **Docker images need to be rebuilt** - After pulling code
4. **Kubernetes needs to be set up** - Follow k8s/QUICKSTART.txt

---

## 🚀 QUICK START FOR ANURAG

After pulling Lab 2 branch:

```bash
# 1. Build Docker images
docker-compose build

# 2. Start with Docker Compose (for testing)
docker-compose up -d

# 3. Or deploy to Kubernetes
cd k8s
./deploy.sh

# 4. Access application
# Docker Compose: http://localhost:3001
# Kubernetes: http://localhost
```

---

## 📊 WHAT'S LEFT TO DO (For Anurag)

1. **JMeter Performance Testing** (5 points, 4-6 hours)
   - Create test plans
   - Test 100-500 concurrent users
   - Generate graphs

2. **Complete Kafka Flow** (4 points, 3-4 hours)
   - Make owner actions use Kafka
   - Event-driven updates

3. **AWS Deployment** (Required, 6-8 hours)
   - Deploy to AWS EKS
   - Take screenshots
   - Documentation

---

## 🔗 USEFUL LINKS

- Repository: https://github.com/aj1575/AirBNB-prototype
- Lab 2 Branch: https://github.com/aj1575/AirBNB-prototype/tree/lab2-clean-implementation

---

**Ready to push? Run the commands above!** 🚀
