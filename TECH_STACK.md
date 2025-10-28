# AirBNB Prototype - Technical Documentation

## 📚 Technology Stack

### Frontend
- **Framework**: React.js 18.x
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Bootstrap 5.3
- **Icons**: Bootstrap Icons
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App (Webpack)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Session Management**: express-session
- **Authentication**: bcrypt (password hashing)
- **File Upload**: Multer
- **CORS**: cors middleware
- **Environment Variables**: dotenv

### Database
- **Database**: MySQL
- **Driver**: mysql2
- **Connection**: Connection pooling

### AI Service
- **Language**: Python 3.x
- **Framework**: Flask
- **CORS**: flask-cors
- **HTTP Client**: requests
- **Environment**: python-dotenv
- **Model**: Rule-based NLU (Natural Language Understanding)
  - Pattern matching for intent detection
  - Regex-based entity extraction
  - Context-aware response generation
- **Optional Enhancement**: Tavily API (real-time web search)

---

## 🤖 AI Agent Architecture

### Model Type
**Custom Rule-Based NLU System**
- Not using pre-trained LLMs (GPT, Claude, etc.)
- Built with Python pattern matching and logic
- Lightweight and fast responses
- No API costs or rate limits

### How It Works

#### 1. Intent Detection
```python
# Detects user intent from keywords
if 'packing' in message or 'pack' in message:
    → Generate packing list
elif 'restaurant' in message or 'food' in message:
    → Search restaurants
elif 'plan' in message or 'itinerary' in message:
    → Generate day-by-day itinerary
```

#### 2. Entity Extraction
```python
# Extracts key information from text
- Location: "San Francisco", "Los Angeles"
- Dietary needs: "vegan", "gluten-free", "halal"
- Travel companions: "2 kids", "family"
- Dates: Pattern matching for date formats
```

#### 3. Context Building
```python
# Builds travel context
booking_context = {
    'location': 'San Francisco',
    'start_date': '2025-12-01',
    'end_date': '2025-12-03'
}

preferences = {
    'dietary_needs': ['vegan'],
    'has_kids': True,
    'interests': ['museums']
}
```

#### 4. Response Generation
```python
# Generates structured responses
- Day-by-day itineraries
- Activity recommendations with details
- Restaurant suggestions with filters
- Weather-aware packing lists
```

### AI Capabilities

#### ✅ What It Can Do:
1. **Trip Planning**
   - Generate multi-day itineraries
   - Morning/afternoon/evening activity blocks
   - Customized by preferences

2. **Restaurant Recommendations**
   - Filter by dietary restrictions
   - Price tier information
   - Cuisine types

3. **Activity Suggestions**
   - Child-friendly flags
   - Wheelchair accessibility
   - Duration and pricing
   - Indoor/outdoor tags

4. **Packing Lists**
   - Weather-aware recommendations
   - Location-specific items
   - Travel essentials

5. **Booking Management**
   - Show current bookings
   - Display booking details
   - Status tracking

6. **Conversation Context** ⭐ NEW!
   - Remembers previous messages
   - References user's bookings
   - Understands "there", "that place"
   - Maintains conversation flow

#### ❌ What It Cannot Do:
- Real-time weather data (without Tavily)
- Live event information (without Tavily)
- Complex conversational context
- Multi-turn dialogue memory
- Sentiment analysis

### Optional: Tavily Integration

**Tavily API** (https://www.tavily.com/)
- Real-time web search
- Live restaurant data
- Current events and POIs
- Up-to-date attraction information

**Status**: Optional enhancement (not required for core functionality)

---

## 🏗️ Architecture

### System Design

```
┌─────────────────┐
│   React Frontend │
│   (Port 3000)    │
└────────┬─────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express Backend │
│   (Port 5001)    │
├─────────────────┤
│ • Authentication │
│ • Session Mgmt   │
│ • API Routes     │
│ • File Upload    │
└────┬────────┬───┘
     │        │
     │        └──────────────┐
     ▼                       ▼
┌──────────┐      ┌──────────────────┐
│  MySQL   │      │  Python AI Service│
│ Database │      │    (Port 5002)    │
└──────────┘      ├──────────────────┤
                  │ • NLU Processing  │
                  │ • Intent Detection│
                  │ • Response Gen    │
                  └──────────────────┘
```

### Data Flow

#### 1. User Authentication
```
User → Frontend → Backend → MySQL
                    ↓
              Session Created
                    ↓
              Cookie Sent to Frontend
```

#### 2. AI Chatbot Query
```
User Input → Frontend (AIChatbot.js)
                ↓
         Extract Context
                ↓
    POST /api/traveler/ai-concierge
                ↓
    Backend (travelerRoutes.js)
                ↓
         Check Auth
                ↓
    POST http://localhost:5002/api/ai-concierge
                ↓
    Python AI Service (ai_concierge.py)
                ↓
         Parse Message
                ↓
      Detect Intent
                ↓
    Generate Response
                ↓
         Return JSON
                ↓
    Backend → Frontend → Display
```

#### 3. Property Booking
```
User → Select Property → Frontend
            ↓
    POST /api/traveler/bookings
            ↓
    Backend validates & saves to MySQL
            ↓
    Owner sees booking request
```

---

## 📁 Project Structure

```
AirBNB-prototype/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── owner/
│   │   │   │   └── ImageUpload.js
│   │   │   ├── shared/
│   │   │   │   └── Navbar.js
│   │   │   └── traveler/
│   │   │       └── AIChatbot.js
│   │   ├── pages/
│   │   │   ├── owner/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── AddProperty.js
│   │   │   │   └── Login.js
│   │   │   └── traveler/
│   │   │       ├── Dashboard.js
│   │   │       ├── PropertyDetails.js
│   │   │       ├── MyBookings.js
│   │   │       ├── Profile.js
│   │   │       └── Login.js
│   │   └── services/
│   │       ├── ownerApi.js
│   │       └── travelerApi.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── owner/
│   │   │   └── ownerRoutes.js
│   │   └── traveler/
│   │       └── travelerRoutes.js
│   ├── controllers/
│   │   └── ownerController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── db.js
│   ├── uploads/
│   │   ├── properties/
│   │   └── profiles/
│   ├── ai_service/
│   │   ├── ai_concierge.py
│   │   ├── requirements.txt
│   │   └── venv/
│   ├── server.js
│   └── package.json
│
└── database/
    └── schema.sql
```

---

## 🔐 Security Features

### Authentication
- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: Secure HTTP-only cookies
- **Role-Based Access**: Separate owner/traveler permissions
- **Middleware Protection**: Routes protected by auth middleware

### Data Validation
- **Input Sanitization**: SQL injection prevention
- **File Upload Limits**: 5MB max per file
- **File Type Validation**: Only images allowed
- **Session Expiry**: 24-hour timeout

---

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: React lazy loading
- **Image Optimization**: Compressed uploads
- **Caching**: Browser caching for static assets
- **Debouncing**: Search input debouncing

### Backend
- **Connection Pooling**: MySQL connection reuse
- **Session Store**: In-memory session storage
- **Async Operations**: Non-blocking I/O
- **Error Handling**: Graceful error responses

### AI Service
- **Fast Response**: Rule-based (no ML inference delay)
- **Caching**: Generic responses cached
- **Timeout Handling**: 10-second timeout
- **Fallback**: Node.js fallback if Python unavailable

---

## 📊 Database Schema

### Tables

#### users
```sql
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password (hashed)
- role (owner/traveler)
- phone
- city
- country
- profile_picture
- about_me
- languages
- gender
- created_at
```

#### properties
```sql
- id (PRIMARY KEY)
- owner_id (FOREIGN KEY → users.id)
- name
- type
- location
- description
- pricing
- bedrooms
- bathrooms
- max_guests
- amenities
- photos (comma-separated URLs)
- available (boolean)
- created_at
```

#### bookings
```sql
- id (PRIMARY KEY)
- property_id (FOREIGN KEY → properties.id)
- traveler_id (FOREIGN KEY → users.id)
- start_date
- end_date
- guests
- total_price
- status (pending/accepted/cancelled)
- created_at
```

#### favorites
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY → users.id)
- property_id (FOREIGN KEY → properties.id)
- created_at
```

---

## 🔧 Environment Variables

### Backend (.env)
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_db
SESSION_SECRET=your_secret_key
PORT=5001
```

### AI Service (.env)
```bash
TAVILY_API_KEY=your_tavily_key (optional)
AI_SERVICE_PORT=5002
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5001
```

---

## 📈 Scalability Considerations

### Current Limitations
- In-memory session storage (not distributed)
- Local file storage (not cloud)
- Single-server architecture
- No load balancing

### Future Enhancements
- Redis for session storage
- AWS S3 for file uploads
- Microservices architecture
- Docker containerization
- Kubernetes orchestration
- CDN for static assets
- Database replication

---

## 🧪 Testing

### Manual Testing
- ✅ User authentication flows
- ✅ Property CRUD operations
- ✅ Booking workflows
- ✅ AI chatbot queries
- ✅ Image uploads
- ✅ Profile management

### Test Accounts
```
Traveler:
- Email: yuktaa@gmail.com
- Password: 123456

Owner:
- Email: a@gmail.com
- Password: 123456
```

---

## 📝 API Endpoints

### Owner Routes
```
POST   /api/owner/signup
POST   /api/owner/login
POST   /api/owner/logout
GET    /api/owner/profile
PUT    /api/owner/profile
POST   /api/owner/properties
GET    /api/owner/properties
GET    /api/owner/properties/:id
PUT    /api/owner/properties/:id
DELETE /api/owner/properties/:id
POST   /api/owner/properties/:id/images
DELETE /api/owner/properties/:id/images
GET    /api/owner/bookings
PUT    /api/owner/bookings/:id/accept
PUT    /api/owner/bookings/:id/cancel
GET    /api/owner/dashboard/stats
```

### Traveler Routes
```
POST   /api/traveler/signup
POST   /api/traveler/login
POST   /api/traveler/logout
GET    /api/traveler/profile
PUT    /api/traveler/profile
POST   /api/traveler/profile/image
GET    /api/traveler/properties/search
GET    /api/traveler/properties/:id
POST   /api/traveler/bookings
GET    /api/traveler/bookings
DELETE /api/traveler/bookings/:id
POST   /api/traveler/favorites/:propertyId
GET    /api/traveler/favorites
DELETE /api/traveler/favorites/:propertyId
POST   /api/traveler/ai-concierge
```

### AI Service Routes
```
POST   /api/ai-concierge
GET    /health
```

---

## 🎯 Key Features

### Traveler Side
1. Property search with filters
2. Property details with image galleries
3. Booking management (create, view, cancel)
4. Travel history (completed bookings)
5. Favorites system
6. Profile with image upload
7. **AI Travel Concierge** (trip planning, recommendations)

### Owner Side
1. Property management (CRUD)
2. Multi-image upload
3. Booking request management
4. Dashboard with statistics
5. Accept/reject bookings

### AI Chatbot
1. Day-by-day itineraries
2. Activity recommendations
3. Restaurant filtering (dietary needs)
4. Packing lists
5. Natural language understanding

---

## 📖 Documentation Files

- `README.md` - Project overview
- `TECH_STACK.md` - This file
- `DEMO_INSTRUCTIONS.md` - Demo guide
- `AI_CHATBOT_GUIDE.md` - AI testing guide
- `FINAL_DEMO_READY.md` - Setup instructions

---

## 🏆 Summary

This is a **full-stack web application** with:
- Modern React frontend
- RESTful Express backend
- MySQL database
- **Custom Python AI service** (rule-based NLU)
- Dual-role system (owner/traveler)
- Real-time trip planning
- Image management
- Session-based authentication

**No external AI APIs required** - the AI service is completely custom-built using Python pattern matching and logic!
