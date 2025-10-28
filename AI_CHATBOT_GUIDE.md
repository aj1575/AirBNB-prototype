# AI Chatbot Testing Guide

## 🤖 About Tavily Integration

### What is Tavily?
Tavily is a **real-time web search API** that provides live information about:
- Local attractions and points of interest
- Restaurants and dining options
- Events and activities
- Current weather and conditions
- Travel recommendations

### Is Tavily Currently Active in Your Code?

**Short Answer: Optional - Not Required**

The Python AI service (`backend/ai_service/ai_concierge.py`) has Tavily integration built-in, but it works **with or without** Tavily:

1. **With Tavily API Key**: Gets real-time web search results for activities and restaurants
2. **Without Tavily API Key**: Uses fallback generic recommendations

### How to Enable Tavily (Optional)

#### Step 1: Get Free API Key
```bash
1. Visit: https://www.tavily.com/
2. Sign up for free account
3. Get your API key from dashboard
```

#### Step 2: Add to Environment
Create/edit `.env` file in `backend/ai_service/`:
```bash
TAVILY_API_KEY=tvly-your-api-key-here
```

#### Step 3: Start Python AI Service
```bash
cd backend/ai_service
pip install -r requirements.txt
python ai_concierge.py
```

You'll see: `📡 Tavily API: Enabled` if key is detected.

---

## 🧪 How to Test AI Chatbot Features

### Current Setup (Without Python Service)

The chatbot currently uses the **Node.js fallback** which provides:
- ✅ Basic booking help
- ✅ Show user's bookings
- ✅ Answer FAQs
- ✅ Rule-based responses

### With Python AI Service (Advanced Features)

When Python service is running, you get:
- ✅ Day-by-day itineraries
- ✅ Activity recommendations with details
- ✅ Restaurant suggestions (dietary filters)
- ✅ Weather-aware packing lists
- ✅ Real-time web search (with Tavily)

---

## 📋 Testing Checklist

### Test 1: Basic Chatbot (Always Works)
1. Login as traveler (yuktaa@gmail.com / 123456)
2. Click 💬 button (bottom right)
3. Try these queries:

**Test Queries:**
```
"Show my bookings"
→ Should display your current bookings

"How do I book a property?"
→ Should explain booking process

"Can I cancel my booking?"
→ Should explain cancellation policy

"How do I contact the host?"
→ Should explain contact process
```

### Test 2: Advanced AI Features (Requires Python Service)

#### Start Python Service First:
```bash
cd backend/ai_service
python ai_concierge.py
```

Wait for: `🤖 AI Travel Concierge Service starting on port 5002`

#### Test Advanced Queries:

**1. Day-by-Day Itinerary:**
```
"Plan a 3-day trip to San Francisco, vegan, 2 kids"
```
**Expected Output:**
- Day 1, 2, 3 breakdown
- Morning/afternoon/evening activities
- Activity details (price, duration)
- Restaurant recommendations
- Packing list

**2. Restaurant Search:**
```
"Find me vegan restaurants in Los Angeles"
```
**Expected Output:**
- List of restaurants
- Dietary options highlighted
- Price tiers
- Descriptions

**3. Activity Recommendations:**
```
"What activities can I do in San Diego with kids?"
```
**Expected Output:**
- Family-friendly activities
- Child-friendly flags
- Duration and price info
- Accessibility details

**4. Packing List:**
```
"What should I pack for a beach vacation?"
```
**Expected Output:**
- Weather-aware items
- Beach-specific gear
- General travel essentials

**5. Natural Language:**
```
"I'm staying in Malibu from Dec 1-5, gluten-free, no long hikes"
```
**Expected Output:**
- Full itinerary
- Filtered activities (no hiking)
- Gluten-free restaurants
- Customized recommendations

---

## 🔍 How to Verify Which Service is Running

### Check Backend Logs

**Node.js Fallback (Default):**
```
Console shows: "Python AI service not available, using fallback"
```

**Python Service Active:**
```
Console shows: Response from Python AI service
```

### Check Python Service Terminal

If running, you'll see:
```
🤖 AI Travel Concierge Service starting on port 5002
📡 Tavily API: Enabled (or Disabled)
```

---

## 🎯 Feature Comparison

| Feature | Node.js Fallback | Python AI (No Tavily) | Python AI (With Tavily) |
|---------|------------------|----------------------|------------------------|
| Show Bookings | ✅ | ✅ | ✅ |
| Basic FAQs | ✅ | ✅ | ✅ |
| Day-by-Day Plans | ❌ | ✅ Generic | ✅ Real-time |
| Activity Cards | ❌ | ✅ Generic | ✅ Live Search |
| Restaurant Recs | ❌ | ✅ Generic | ✅ Live Search |
| Packing Lists | ❌ | ✅ | ✅ |
| Dietary Filters | ❌ | ✅ | ✅ |
| NLU Parsing | Basic | ✅ | ✅ |

---

## 🚀 Quick Start Testing

### Option 1: Test Basic Chatbot (No Setup)
```bash
# Already running!
# Just use the chatbot - it works out of the box
```

### Option 2: Test Advanced AI (5 minutes)
```bash
# Terminal 3 (new terminal)
cd backend/ai_service
pip install -r requirements.txt
python ai_concierge.py

# Now test advanced queries in the chatbot
```

### Option 3: Test with Tavily (10 minutes)
```bash
# 1. Get Tavily key from https://www.tavily.com/
# 2. Create .env file
echo "TAVILY_API_KEY=your-key-here" > backend/ai_service/.env

# 3. Start service
cd backend/ai_service
python ai_concierge.py

# 4. Test with location-specific queries
```

---

## 📊 Expected Response Times

- **Basic Chatbot**: Instant (<100ms)
- **Python AI (No Tavily)**: Fast (~500ms)
- **Python AI (With Tavily)**: Moderate (~2-3 seconds)
  - Includes real-time web search
  - Multiple API calls for comprehensive results

---

## 🐛 Troubleshooting

### "Python AI service not available"
- Python service not running
- Check if port 5002 is available
- Verify `python ai_concierge.py` is running

### "Tavily search error"
- Invalid or missing API key
- Check `.env` file in `backend/ai_service/`
- Verify key at https://www.tavily.com/

### Chatbot not responding
- Check browser console for errors
- Verify backend is running (port 5001)
- Check network tab for failed requests

---

## ✅ Demo Recommendations

### For Quick Demo (5 min):
- Use **basic chatbot** (already working)
- Show booking queries
- Demonstrate FAQ responses

### For Impressive Demo (10 min):
- Start **Python AI service**
- Show day-by-day itinerary
- Demonstrate dietary filtering
- Show packing list generation

### For Full Demo (15 min):
- Enable **Tavily API**
- Show real-time restaurant search
- Demonstrate location-specific activities
- Show comprehensive travel planning

---

## 📝 Sample Demo Script

```
1. "Show my bookings"
   → Displays current bookings

2. "Plan a 3-day trip to San Francisco, vegan, 2 kids"
   → Full itinerary with activities

3. "Find vegan restaurants in SF"
   → Restaurant recommendations

4. "What should I pack for a beach vacation?"
   → Weather-aware packing list

5. "I'm staying in Malibu, gluten-free, wheelchair accessible"
   → Filtered recommendations
```

---

## 🎉 Summary

- **Tavily**: Optional enhancement for real-time data
- **Basic Chatbot**: Works without any setup
- **Python AI**: Advanced features, easy to enable
- **Testing**: Use queries above to verify functionality

**Your chatbot works great out of the box! Python AI and Tavily are optional enhancements for even better results.**
