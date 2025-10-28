# AirBNB Prototype - Demo Instructions

## ✅ What's Been Fixed/Updated

### 1. **Traveler Navbar** - Simplified
- ✅ Removed "Where/When/Who" search bar from purple header
- ✅ Kept only: **Airbnb Prototype** logo, **Profile** dropdown, and **Become a Host** button
- ✅ All search/filtering now handled by the white filter bar on dashboard

### 2. **Properties Added** - 6 New Properties with Images
- ✅ Luxury Downtown Loft - San Francisco ($350/night)
- ✅ Cozy Beach House - Santa Monica ($450/night)
- ✅ Modern Studio Downtown - Los Angeles ($125/night)
- ✅ Spacious Family Villa - Malibu ($800/night)
- ✅ Charming Garden Cottage - Pasadena ($180/night)
- ✅ Penthouse with City Views - San Diego ($550/night)
- ✅ All properties have real images displayed

### 3. **Property Images** - Now Displaying
- ✅ Dashboard shows actual property photos
- ✅ Fallback to house emoji if no image

## 🚀 How to Test

### Access the App
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001

### Test Accounts

#### Traveler Account (Already Working)
- **Email:** yuktaa@gmail.com
- **Password:** 123456
- **Route:** http://localhost:3000/traveler/login

#### Owner Account (Already Working)
- **Email:** a@gmail.com
- **Password:** 123456
- **Route:** http://localhost:3000/owner/login

### Signup Testing

#### For Traveler Signup:
1. Go to: http://localhost:3000/traveler/signup
2. Use a NEW email (not already in database)
3. Fill in: Name, Email, Password, Confirm Password
4. Click "Sign Up"
5. Should redirect to login page

#### For Owner Signup:
1. Go to: http://localhost:3000/owner/signup
2. Use a NEW email (not already in database)
3. Fill in: Name, Email, Password (Phone, City, Country optional)
4. Click "Sign Up"
5. Should redirect to login page

**Note:** If signup fails with "Email already registered", that email is already in the database. Try a different email.

## 📋 Demo Flow

### Traveler Side Demo:
1. Login as traveler (yuktaa@gmail.com / 123456)
2. See simplified purple navbar (no search bar)
3. View dashboard with 7 properties showing real images
4. Use white filter bar to search by:
   - Location (e.g., "San Francisco", "Malibu")
   - Property Type (Apartment, House, Villa, etc.)
   - Number of Guests
5. Click on any property to view details
6. Test AI Chatbot (bottom right)
7. View Bookings and Favorites

### Owner Side Demo:
1. Login as owner (a@gmail.com / 123456)
2. View dashboard with all 7 properties
3. Click "Add New Property"
4. Fill in property details
5. Upload images using the new ImageUpload component
6. View bookings and manage requests

## 🎯 Key Features to Highlight

1. **Clean UI** - Purple navbar is now minimal and professional
2. **Real Property Data** - 7 diverse properties across California
3. **Property Images** - All properties have actual photos displayed
4. **Smart Filtering** - Location, type, and guest-based search
5. **Image Upload** - Owners can upload multiple property images
6. **Advanced AI Chatbot** - Full travel planning with:
   - Day-by-day itineraries
   - Activity recommendations (price, duration, accessibility)
   - Restaurant suggestions (dietary filters)
   - Weather-aware packing lists
   - Natural language understanding
7. **Dual Roles** - Separate owner and traveler experiences
8. **Back Navigation** - All pages have "Back to Dashboard" buttons

## 🤖 AI Travel Concierge (Optional - Enhanced Features)

The AI chatbot works with basic features by default. For advanced travel planning features:

### Setup Python AI Service (Optional):
```bash
cd backend/ai_service
pip install -r requirements.txt
python ai_concierge.py
```

This enables:
- Real-time web search for activities/restaurants
- Detailed day-by-day itineraries
- Smart packing lists
- Dietary-filtered restaurant recommendations

**Get Tavily API Key (Free):**
1. Visit https://www.tavily.com/
2. Sign up and get API key
3. Add to `.env`: `TAVILY_API_KEY=your_key`

### Test AI Chatbot:
1. Click 💬 button (bottom right)
2. Try: "Plan a 3-day trip to San Francisco, vegan, 2 kids"
3. Or: "Show me vegan restaurants in LA"
4. Or: "What should I pack for a beach vacation?"

## 🐛 Known Issues

- Signup requires unique email (by design - prevents duplicates)
- If you see "Signup failed", try a different email address
- AI service is optional - basic chatbot works without it

## 📝 Database Info

Current properties in database:
- p1 (mountain view CA) - $200/night
- Luxury Downtown Loft (San Francisco) - $350/night
- Cozy Beach House (Santa Monica) - $450/night
- Modern Studio Downtown (Los Angeles) - $125/night
- Spacious Family Villa (Malibu) - $800/night
- Charming Garden Cottage (Pasadena) - $180/night
- Penthouse with City Views (San Diego) - $550/night

All owned by user: anurag (a@gmail.com)
