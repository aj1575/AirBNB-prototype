# Postman API Testing Guide - Airbnb Prototype

## 📦 Import Postman Collection

### Step 1: Open Postman
1. Download and install Postman from https://www.postman.com/downloads/
2. Open Postman application

### Step 2: Import Collection
1. Click **"Import"** button (top left)
2. Click **"Upload Files"**
3. Select `POSTMAN_COLLECTION.json` from your project folder
4. Click **"Import"**

### Step 3: Set Base URL
The collection uses a variable `{{base_url}}` set to `http://localhost:5001`

---

## 🧪 Testing APIs in Postman

### Important: Session Management

**Postman automatically handles cookies/sessions!**
- After login, session cookie is stored
- All subsequent requests use that session
- No need to manually copy tokens

---

## 🎯 Step-by-Step Testing Guide

### Test 1: Traveler Login

1. **Open:** `Traveler APIs` → `Authentication` → `Traveler Login`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/traveler/login`
4. **Body (raw JSON):**
```json
{
  "email": "yuktaa@gmail.com",
  "password": "123456"
}
```
5. **Click:** "Send"
6. **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Yuktaa",
    "email": "yuktaa@gmail.com",
    "role": "traveler"
  }
}
```

---

### Test 2: Get Traveler Profile

1. **Open:** `Traveler APIs` → `Profile` → `Get Profile`
2. **Method:** GET
3. **URL:** `http://localhost:5001/api/traveler/profile`
4. **No body needed**
5. **Click:** "Send"
6. **Expected Response (200 OK):**
```json
{
  "success": true,
  "profile": {
    "id": 1,
    "name": "Yuktaa",
    "email": "yuktaa@gmail.com",
    "phone": "1234567890"
  }
}
```

**Note:** This works because Postman saved the session cookie from login!

---

### Test 3: Search Properties

1. **Open:** `Traveler APIs` → `Properties` → `Search Properties`
2. **Method:** GET
3. **URL:** `http://localhost:5001/api/traveler/properties/search?location=San Francisco, CA&guests=2`
4. **Query Parameters:**
   - `location`: San Francisco, CA
   - `guests`: 2
   - `startDate`: 2025-11-01 (optional)
   - `endDate`: 2025-11-05 (optional)
5. **Click:** "Send"
6. **Expected Response (200 OK):**
```json
{
  "success": true,
  "properties": [
    {
      "id": 1,
      "name": "Luxury Downtown Loft",
      "location": "San Francisco, CA",
      "pricing": "350.00",
      "bedrooms": 2,
      "bathrooms": 2,
      "images": ["/uploads/properties/image1.jpg"]
    }
  ]
}
```

---

### Test 4: Add to Favorites

1. **Open:** `Traveler APIs` → `Favorites` → `Add to Favorites`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/traveler/favorites/1`
   - Replace `1` with actual property ID
4. **No body needed**
5. **Click:** "Send"
6. **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Added to favorites"
}
```

---

### Test 5: Get Favorites

1. **Open:** `Traveler APIs` → `Favorites` → `Get Favorites`
2. **Method:** GET
3. **URL:** `http://localhost:5001/api/traveler/favorites`
4. **Click:** "Send"
5. **Expected Response (200 OK):**
```json
{
  "success": true,
  "favorites": [
    {
      "id": 1,
      "name": "Luxury Downtown Loft",
      "location": "San Francisco, CA",
      "pricing": "350.00",
      "images": ["/uploads/properties/image1.jpg"],
      "favorited_at": "2025-10-27T10:00:00.000Z"
    }
  ]
}
```

---

### Test 6: Create Booking

1. **Open:** `Traveler APIs` → `Bookings` → `Create Booking`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/traveler/bookings`
4. **Body (raw JSON):**
```json
{
  "property_id": 1,
  "start_date": "2025-11-01",
  "end_date": "2025-11-05",
  "guests": 2,
  "total_price": 1400.00
}
```
5. **Click:** "Send"
6. **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "bookingId": 1
}
```

---

### Test 7: AI Chatbot

1. **Open:** `Traveler APIs` → `AI Chatbot` → `AI Concierge`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/traveler/ai-concierge`
4. **Body (raw JSON):**
```json
{
  "message": "Plan a 3-day trip to San Francisco, vegan, 2 kids",
  "booking_context": {
    "location": "San Francisco, CA",
    "start_date": "2025-11-01",
    "end_date": "2025-11-03"
  }
}
```
5. **Click:** "Send"
6. **Expected Response:** AI-generated itinerary

---

### Test 8: Owner Login

1. **First, logout traveler:**
   - `Traveler APIs` → `Authentication` → `Traveler Logout`
   - Click "Send"

2. **Open:** `Owner APIs` → `Authentication` → `Owner Login`
3. **Method:** POST
4. **URL:** `http://localhost:5001/api/owner/login`
5. **Body (raw JSON):**
```json
{
  "email": "a@gmail.com",
  "password": "123456"
}
```
6. **Click:** "Send"
7. **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 2,
    "name": "Owner Name",
    "email": "a@gmail.com",
    "role": "owner"
  }
}
```

---

### Test 9: Get Owner Properties

1. **Open:** `Owner APIs` → `Properties` → `Get My Properties`
2. **Method:** GET
3. **URL:** `http://localhost:5001/api/owner/properties`
4. **Click:** "Send"
5. **Expected Response:** List of owner's properties

---

### Test 10: Create Property

1. **Open:** `Owner APIs` → `Properties` → `Create Property`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/owner/properties`
4. **Body (raw JSON):**
```json
{
  "name": "Beautiful Beach House",
  "type": "House",
  "location": "Miami, FL",
  "description": "Stunning beachfront property",
  "pricing": 450,
  "bedrooms": 3,
  "bathrooms": 2,
  "max_guests": 6,
  "amenities": ["WiFi", "Pool", "Beach Access"]
}
```
5. **Click:** "Send"

---

### Test 11: Get Owner Bookings

1. **Open:** `Owner APIs` → `Bookings` → `Get All Bookings`
2. **Method:** GET
3. **URL:** `http://localhost:5001/api/owner/bookings`
4. **Click:** "Send"

---

### Test 12: Accept Booking

1. **Open:** `Owner APIs` → `Bookings` → `Accept Booking`
2. **Method:** PUT
3. **URL:** `http://localhost:5001/api/owner/bookings/1/accept`
   - Replace `1` with actual booking ID
4. **Click:** "Send"

---

### Test 13: Upload Property Images

1. **Open:** `Owner APIs` → `Properties` → `Upload Property Images`
2. **Method:** POST
3. **URL:** `http://localhost:5001/api/owner/properties/1/images`
4. **Body:** Select "form-data"
5. **Add field:**
   - Key: `images` (change type to "File")
   - Value: Select image file(s)
6. **Click:** "Send"

---

## 🔧 Postman Settings

### Enable Cookie Handling
1. Go to **Settings** (gear icon)
2. **General** tab
3. Enable **"Automatically follow redirects"**
4. Enable **"Send cookies"**

### View Cookies
1. Click **"Cookies"** (under Send button)
2. View stored session cookies

---

## 📊 Testing Workflow

### Complete Traveler Flow:
```
1. Traveler Signup (if new user)
2. Traveler Login ✅
3. Get Profile
4. Search Properties
5. Get Property Details
6. Add to Favorites
7. Get Favorites
8. Create Booking
9. Get My Bookings
10. AI Chatbot (optional)
11. Logout
```

### Complete Owner Flow:
```
1. Owner Signup (if new user)
2. Owner Login ✅
3. Get Profile
4. Create Property
5. Upload Property Images
6. Get My Properties
7. Get Bookings
8. Accept/Reject Booking
9. Get Dashboard Stats
10. Logout
```

---

## 🐛 Troubleshooting

### Error: "Unauthorized" or "Not authenticated"
**Solution:** Login first! Postman needs the session cookie.
1. Run login request
2. Check response is 200 OK
3. Try the protected endpoint again

### Error: "Failed to fetch"
**Solution:** Check if backend is running
```bash
cd backend
npm start
```
Should see: "Server running on port 5001"

### Error: "Cannot POST/GET..."
**Solution:** Check URL is correct
- Base URL: `http://localhost:5001`
- Not `http://localhost:3000` (that's frontend)

### Cookies not saving
**Solution:**
1. Settings → General
2. Enable "Send cookies"
3. Restart Postman

---

## 📝 API Documentation Summary

### Traveler Endpoints (13 total):
- **Auth:** Signup, Login, Logout
- **Profile:** Get, Update
- **Properties:** Search, Get Details
- **Bookings:** Create, Get All, Cancel
- **Favorites:** Add, Get All, Remove
- **AI:** Chatbot

### Owner Endpoints (15 total):
- **Auth:** Signup, Login, Logout
- **Profile:** Get, Update, Upload Image
- **Properties:** Get All, Create, Update, Delete, Upload Images
- **Bookings:** Get All, Accept, Reject
- **Dashboard:** Get Stats

---

## 🎓 For Your Professor

### Submission Checklist:
✅ **Postman Collection:** `POSTMAN_COLLECTION.json`
✅ **Setup Guide:** `POSTMAN_SETUP_GUIDE.md`
✅ **Test Credentials:**
   - Traveler: yuktaa@gmail.com / 123456
   - Owner: a@gmail.com / 123456
✅ **Base URL:** http://localhost:5001
✅ **Total Endpoints:** 28 APIs documented

### How to Demo:
1. Import collection in Postman
2. Start backend: `cd backend && npm start`
3. Test traveler login
4. Test search properties
5. Test favorites
6. Test owner login
7. Test bookings management

---

## 🚀 Quick Start Commands

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend (optional)
cd frontend
npm start

# Terminal 3: Start AI Service (optional)
cd backend/ai_service
python3 ai_concierge.py
```

---

**All APIs are documented and ready to test in Postman!**
