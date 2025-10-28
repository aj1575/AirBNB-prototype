# AI Travel Concierge Service

Advanced AI-powered travel planning service with real-time web search integration.

## Features

- 🗓️ **Day-by-day itineraries** - Morning, afternoon, evening activity blocks
- 🎯 **Activity recommendations** - With price tiers, duration, accessibility info
- 🍽️ **Restaurant suggestions** - Filtered by dietary needs (vegan, gluten-free, etc.)
- 🎒 **Smart packing lists** - Weather-aware recommendations
- 🔍 **Live web search** - Powered by Tavily API for real-time POI data

## Setup

### 1. Install Dependencies

```bash
cd backend/ai_service
pip install -r requirements.txt
```

### 2. Get Tavily API Key (Optional but Recommended)

1. Visit https://www.tavily.com/
2. Sign up for free account
3. Get your API key
4. Add to `.env` file:

```bash
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Run the Service

```bash
python ai_concierge.py
```

The service will start on port 5002 by default.

## API Endpoint

### POST /api/ai-concierge

**Request Body:**
```json
{
  "message": "Plan a 3-day trip to San Francisco, vegan, 2 kids",
  "booking_context": {
    "location": "San Francisco, CA",
    "start_date": "2025-12-01",
    "end_date": "2025-12-03"
  },
  "preferences": {
    "dietary_needs": ["vegan"],
    "has_kids": true,
    "budget": "moderate"
  }
}
```

**Response:**
```json
{
  "success": true,
  "type": "full_itinerary",
  "response": "Formatted text response...",
  "daily_plans": [...],
  "activities": [...],
  "restaurants": [...],
  "packing_list": [...]
}
```

## Natural Language Understanding

The service understands free-text queries like:
- "I'm staying in SF from Dec 1-5, vegan, no long hikes, two kids"
- "Find me vegan restaurants in Los Angeles"
- "What should I pack for a beach vacation?"
- "Plan activities for a family trip to San Diego"

## Integration

The Node.js backend automatically proxies requests to this Python service. If the Python service is not running, it falls back to the basic Node.js implementation.

## Environment Variables

- `TAVILY_API_KEY` - Tavily API key for web search (optional)
- `AI_SERVICE_PORT` - Port to run on (default: 5002)
