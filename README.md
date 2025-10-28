# Airbnb Prototype - CMPE 273 Lab 1

A full-stack Airbnb clone with AI-powered travel concierge built using React, Node.js, Express, MySQL, and Python.

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

---

## Tech Stack

**Frontend:**
- React 18
- Bootstrap 5
- Axios
- React Router

**Backend:**
- Node.js + Express
- MySQL
- Express-session
- Bcrypt.js
- Multer (file uploads)

**AI Service:**
- Python 3 + Flask
- Tavily API (web search)
- Natural Language Processing

---

## Prerequisites

- Node.js (v14+)
- Python 3.8+
- MySQL 8.0+
- npm or yarn

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
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── database/
│   ├── ai_service/
│   └── package.json
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

---

## Security

- Password hashing with bcrypt
- Session-based authentication
- SQL injection prevention (parameterized queries)
- XSS protection (React escaping)
- File upload validation
- Role-based access control

---

## Submission Files

1. **POSTMAN_COLLECTION.json** - Complete API documentation
2. **POSTMAN_SETUP_GUIDE.md** - Testing instructions
3. **NON_FUNCTIONAL_REQUIREMENTS.md** - Requirements documentation
4. **README.md** - This file

---

## Authors

- Student Name
- SJSU ID
- Email

---

## License

This project is for educational purposes (CMPE 273 Lab Assignment).
