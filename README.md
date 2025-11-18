# Airbnb Prototype - Labs 1 & 2

A full-stack Airbnb clone with AI-powered travel concierge, containerized with Docker, orchestrated with Kubernetes, featuring Kafka message queuing, MongoDB session storage, and Redux state management.

Built using React, Node.js, Express, MySQL, MongoDB, Kafka, Docker, Kubernetes, and Python.

---

## Features

### Traveler Features
- Signup/Login with session authentication
- Profile management with image upload
- Property search by location, dates, guests
- Property details and booking
- Favorites management
- Booking history (Pending, Accepted, Cancelled)
- AI Travel Concierge (day-by-day itineraries, restaurant recommendations)

### Owner Features
- Signup/Login with session authentication
- Profile management with image upload
- Property posting with images
- Booking management (Accept/Reject)
- Dashboard with statistics

### AI Agent Features (Python + Tavily API)
- Natural language understanding
- Day-by-day trip planning
- Restaurant recommendations (dietary filters)
- Activity suggestions
- Packing checklist (weather-aware)
- Real-time web search integration

### Lab 2 Enhancements
- **Docker & Kubernetes**: Containerized services with orchestration
- **Kafka Integration**: Asynchronous booking event processing
- **MongoDB**: Session storage with encryption
- **Redux**: Centralized state management with persistence
- **Performance Testing**: JMeter test plans for 100-500 concurrent users
- **AWS Ready**: ECR and EKS deployment configurations

---

## Tech Stack

**Frontend:**
- React 18
- Redux Toolkit (state management)
- Redux Persist (state persistence)
- Bootstrap 5
- Axios
- React Router

**Backend:**
- Node.js + Express
- MySQL (primary database)
- MongoDB (session storage)
- Kafka (message broker)
- Express-session
- Bcrypt.js
- Multer (file uploads)

**AI Service:**
- Python 3 + Flask
- Tavily API (web search)
- Natural Language Processing

**DevOps & Infrastructure:**
- Docker & Docker Compose
- Kubernetes (K8s)
- Horizontal Pod Autoscaling
- Apache JMeter (performance testing)
- AWS EKS (optional deployment)
- AWS ECR (container registry)

---

## Prerequisites

**Lab 1:**
- Node.js (v18+)
- Python 3.8+
- MySQL 8.0+
- npm or yarn

**Lab 2 Additional:**
- Docker Desktop (with Kubernetes enabled)
- kubectl CLI
- Apache JMeter 5.5+
- MongoDB Compass (optional)
- AWS CLI (for AWS deployment)

---

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd AirBNB-prototype
```

### 2. Database Setup
```bash
mysql -u root -p
CREATE DATABASE airbnb_db;
USE airbnb_db;
SOURCE backend/database/schema.sql;
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm start
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 5. AI Service Setup
```bash
cd backend/ai_service
pip3 install -r requirements.txt
python3 ai_concierge.py
```

---

## Running the Application

### Option 1: Docker Compose (Recommended for Lab 2)

```bash
# Start all services
docker-compose up -d

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
# Kafka: localhost:9093

# Stop services
docker-compose down
```

### Option 2: Traditional Setup (Lab 1)

**Backend:** http://localhost:5001
**Frontend:** http://localhost:3000
**AI Service:** http://localhost:5002

### Test Credentials

**Traveler:**
- Email: yuktaa@gmail.com
- Password: 123456

**Owner:**
- Email: a@gmail.com
- Password: 123456

---

## API Documentation

### Postman Collection
Import `POSTMAN_COLLECTION.json` into Postman for complete API documentation.

**Total Endpoints:** 28 APIs
- Traveler APIs: 13
- Owner APIs: 15

See `POSTMAN_SETUP_GUIDE.md` for detailed testing instructions.

---

## Non-Functional Requirements

### Responsiveness
- Mobile (375px - 767px)
- Tablet (768px - 1024px)
- Desktop (1025px+)

### Accessibility
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Alt text on images

### Scalability
- Database indexing
- Query optimization
- Connection pooling
- Average API response time under 300ms

---

## Project Structure

```
AirBNB-prototype/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/              # Lab 2: Redux state management
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   └── utils/
│   ├── Dockerfile              # Lab 2: Frontend container
│   ├── nginx.conf              # Lab 2: Nginx configuration
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── database/
│   ├── config/
│   │   └── mongodb.js          # Lab 2: MongoDB configuration
│   ├── kafka/                  # Lab 2: Kafka integration
│   │   ├── kafkaConfig.js
│   │   └── bookingConsumer.js
│   ├── ai_service/
│   ├── Dockerfile              # Lab 2: Backend container
│   └── package.json
├── k8s/                        # Lab 2: Kubernetes manifests
│   ├── namespace.yaml
│   ├── mongodb-deployment.yaml
│   ├── kafka-deployment.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
├── jmeter/                     # Lab 2: Performance testing
│   ├── README.md
│   ├── test-data/
│   └── scripts/
├── docker-compose.yml          # Lab 2: Docker Compose
├── LAB2_DEPLOYMENT_GUIDE.md    # Lab 2: Complete deployment guide
├── LAB2_SUMMARY.md             # Lab 2: Implementation summary
├── MANUAL_STEPS.md             # Lab 2: Manual steps required
├── QUICK_START.md              # Lab 2: Quick start guide
├── POSTMAN_COLLECTION.json
├── POSTMAN_SETUP_GUIDE.md
├── NON_FUNCTIONAL_REQUIREMENTS.md
└── README.md
```

---

## Testing

### Using Postman
1. Import `POSTMAN_COLLECTION.json`
2. Test traveler login
3. Test property search
4. Test favorites
5. Test bookings
6. Test owner login
7. Test property management

### Manual Testing
1. Login as traveler
2. Search properties
3. Add to favorites
4. Create booking
5. Use AI chatbot
6. Login as owner
7. Manage bookings

---

## Key Features Implemented

### Lab 1 Features
- [x] Session-based authentication
- [x] Profile management with image upload
- [x] Property CRUD operations
- [x] Booking management (Pending/Accepted/Cancelled)
- [x] Favorites functionality
- [x] AI Travel Concierge
- [x] Responsive design
- [x] Accessible UI
- [x] Optimized database queries
- [x] API documentation (Postman)

### Lab 2 Features
- [x] Docker containerization (Frontend, Backend)
- [x] Docker Compose orchestration
- [x] Kubernetes deployment manifests
- [x] Horizontal Pod Autoscaling (HPA)
- [x] Kafka message broker integration
- [x] Asynchronous booking event processing
- [x] MongoDB session storage
- [x] Password encryption with bcrypt
- [x] Redux state management (Auth, Property, Booking)
- [x] Redux Persist for auth state
- [x] JMeter performance test infrastructure
- [x] AWS EKS deployment ready
- [x] Health check endpoints for K8s probes

---

## Architecture

### Kafka Event Flow (Lab 2)

```
Traveler creates booking
    ↓
Backend (Producer) → Kafka Topic: booking-created
    ↓
Backend (Consumer) → Process event → Notify owner
    
Owner accepts booking
    ↓
Backend (Producer) → Kafka Topic: booking-status-updated
    ↓
Backend (Consumer) → Process event → Notify traveler
```

### Kubernetes Architecture

```
┌─────────────────────────────────────────────┐
│           Kubernetes Cluster                │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Frontend │  │ Backend  │  │ MongoDB  │ │
│  │  (2 pods)│  │ (3 pods) │  │ (1 pod)  │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────┐  ┌──────────┐               │
│  │  Kafka   │  │Zookeeper │               │
│  │ (1 pod)  │  │ (1 pod)  │               │
│  └──────────┘  └──────────┘               │
│                                             │
│  HPA: Auto-scale backend 2-10 pods         │
└─────────────────────────────────────────────┘
```

## Security

- Password hashing with bcrypt (salt rounds: 10)
- Session-based authentication
- MongoDB session encryption
- SQL injection prevention (parameterized queries)
- XSS protection (React escaping)
- File upload validation
- Role-based access control
- Secure cookie configuration

---

## Documentation

### Lab 1 Documentation
1. **POSTMAN_COLLECTION.json** - Complete API documentation
2. **POSTMAN_SETUP_GUIDE.md** - Testing instructions
3. **NON_FUNCTIONAL_REQUIREMENTS.md** - Requirements documentation

### Lab 2 Documentation
1. **LAB2_DEPLOYMENT_GUIDE.md** - Complete deployment guide for Docker, Kubernetes, Kafka, MongoDB, Redux
2. **LAB2_SUMMARY.md** - Implementation summary and what's been completed
3. **MANUAL_STEPS.md** - Step-by-step manual actions required
4. **QUICK_START.md** - Fast track to get running
5. **frontend/REDUX_INTEGRATION.md** - Redux usage examples and best practices
6. **jmeter/README.md** - JMeter performance testing guide

### Quick Links
- 🚀 **New to Lab 2?** Start with `QUICK_START.md`
- 📖 **Full Deployment?** Read `LAB2_DEPLOYMENT_GUIDE.md`
- 🔍 **What's Implemented?** Check `LAB2_SUMMARY.md`
- ✅ **Manual Steps?** Follow `MANUAL_STEPS.md`

---

## Authors

- Student Name
- SJSU ID
- Email

---

## License

This project is for educational purposes (CMPE 273 Lab Assignment).
