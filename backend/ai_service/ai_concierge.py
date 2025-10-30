"""
AI Travel Concierge Service
Provides day-by-day itineraries, activity recommendations, restaurant suggestions,
and packing lists based on booking context and traveler preferences.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import requests
from typing import Dict, List, Any
import json
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

# Tavily API for web search (get free key at https://www.tavily.com/)
TAVILY_API_KEY = os.getenv('TAVILY_API_KEY', '')

def search_tavily(query: str, max_results: int = 5) -> List[Dict]:
    """Search using Tavily API for real-time information"""
    if not TAVILY_API_KEY:
        return []
    
    try:
        response = requests.post(
            'https://api.tavily.com/search',
            json={
                'api_key': TAVILY_API_KEY,
                'query': query,
                'max_results': max_results,
                'search_depth': 'basic'
            },
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            return data.get('results', [])
    except Exception as e:
        print(f"Tavily search error: {e}")
    return []

def generate_packing_list(location: str, dates: tuple, weather: str = None) -> List[str]:
    """Generate weather-aware packing checklist"""
    base_items = [
        "Phone & charger",
        "ID & credit cards",
        "Booking confirmations",
        "Medications",
        "Toiletries",
        "Comfortable clothing",
        "Walking shoes"
    ]
    
    # Weather-based additions
    if weather and 'rain' in weather.lower():
        base_items.extend(["Umbrella", "Rain jacket"])
    elif weather and ('cold' in weather.lower() or 'winter' in weather.lower()):
        base_items.extend(["Warm jacket", "Gloves", "Scarf"])
    elif weather and ('hot' in weather.lower() or 'summer' in weather.lower()):
        base_items.extend(["Sunglasses", "Sunscreen", "Shorts"])
    
    # Location-based
    if 'beach' in location.lower() or 'coast' in location.lower():
        base_items.extend(["Swimsuit", "Beach towel", "Sunscreen"])
    
    return base_items

def get_activity_recommendations(location: str, preferences: Dict) -> List[Dict]:
    """Get activity recommendations - returns only 2 specific place names"""
    activities = []
    
    # Check for specific requests (beach, museum, etc.)
    specific_interest = preferences.get('specific_interest', '')
    
    if specific_interest:
        query = f"famous {specific_interest} to visit in {location}"
    else:
        query = f"top tourist attractions landmarks in {location}"
    
    results = search_tavily(query, max_results=3)
    
    import re
    extracted_places = []
    
    for result in results:
        content = result.get('content', '')
        
        # Extract place names - look for proper nouns followed by location keywords
        # Pattern: Capitalized words + (Park|Beach|Museum|Bridge|Tower|etc.)
        place_patterns = [
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}\s+(?:Park|Beach|Museum|Bridge|Tower|Center|Island|Market|Square|Garden|Zoo|Aquarium|Gallery|Theater|Stadium|Arena|Pier|Wharf|Hill|Mountain|Lake|Bay))',
            r'(?:visit|see|explore)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})',
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})(?:\s+is\s+a\s+(?:famous|popular|iconic|historic))',
        ]
        
        for pattern in place_patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                place_name = match.strip()
                # Filter out generic words and article titles
                if (len(place_name) > 5 and 
                    place_name not in extracted_places and
                    not place_name.startswith('Best') and
                    not place_name.startswith('Top') and
                    not place_name.startswith('The Best') and
                    'Things To Do' not in place_name and
                    'Places To Visit' not in place_name):
                    extracted_places.append(place_name)
                    if len(extracted_places) >= 2:
                        break
            if len(extracted_places) >= 2:
                break
    
    # Create activities from extracted places
    for place in extracted_places[:2]:
        activities.append({
            'title': place,
            'description': f'Popular attraction in {location}',
            'price_tier': '$$',
            'duration': '2-3 hours'
        })
    
    # Fallback with location-specific defaults
    if len(activities) == 0:
        # Try to use well-known landmarks based on location
        if 'san francisco' in location.lower():
            activities = [
                {'title': 'Golden Gate Bridge', 'description': 'Iconic landmark', 'price_tier': '$', 'duration': '2-3 hours'},
                {'title': 'Fisherman\'s Wharf', 'description': 'Waterfront district', 'price_tier': '$$', 'duration': '2-3 hours'}
            ]
        elif 'santa monica' in location.lower():
            activities = [
                {'title': 'Santa Monica Pier', 'description': 'Famous pier and beach', 'price_tier': '$', 'duration': '2-3 hours'},
                {'title': 'Third Street Promenade', 'description': 'Shopping and dining', 'price_tier': '$$', 'duration': '2-3 hours'}
            ]
        else:
            activities = [
                {'title': f'{location} Downtown', 'description': 'City center', 'price_tier': '$', 'duration': '2-3 hours'},
                {'title': f'{location} Main Attraction', 'description': 'Popular spot', 'price_tier': '$$', 'duration': '2-3 hours'}
            ]
    
    return activities[:2]

def get_restaurant_recommendations(location: str, dietary_needs: List[str]) -> List[Dict]:
    """Get restaurant recommendations - returns only 2 specific restaurant names"""
    restaurants = []
    
    # Build search query
    dietary_str = ', '.join(dietary_needs) if dietary_needs else 'popular'
    query = f"famous {dietary_str} restaurants to eat at in {location}"
    
    results = search_tavily(query, max_results=3)
    
    import re
    extracted_restaurants = []
    
    for result in results:
        content = result.get('content', '')
        
        # Extract restaurant names - look for proper nouns with restaurant keywords
        restaurant_patterns = [
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\s+(?:Restaurant|Cafe|Bistro|Kitchen|Grill|Bar|Eatery|Diner|House))',
            r'(?:try|visit|eat at|dine at)\s+([A-Z][a-z]+(?:\'s)?(?:\s+[A-Z][a-z]+){0,2})',
            r'([A-Z][a-z]+(?:\'s)?(?:\s+[A-Z][a-z]+){0,2})(?:\s+(?:serves|offers|specializes))',
        ]
        
        for pattern in restaurant_patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                restaurant_name = match.strip()
                # Filter out generic words
                if (len(restaurant_name) > 3 and 
                    restaurant_name not in extracted_restaurants and
                    not restaurant_name.startswith('Best') and
                    not restaurant_name.startswith('Top') and
                    'Restaurants' not in restaurant_name and
                    'Guide' not in restaurant_name):
                    extracted_restaurants.append(restaurant_name)
                    if len(extracted_restaurants) >= 2:
                        break
            if len(extracted_restaurants) >= 2:
                break
    
    # Create restaurant list from extracted names
    for name in extracted_restaurants[:2]:
        restaurants.append({
            'name': name,
            'description': f'Popular restaurant in {location}',
            'dietary_options': dietary_needs,
            'price_tier': '$$',
            'cuisine': 'Various'
        })
    
    # Fallback with location-specific defaults
    if len(restaurants) == 0:
        if 'san francisco' in location.lower():
            restaurants = [
                {'name': 'Greens Restaurant', 'description': 'Vegetarian fine dining', 'dietary_options': dietary_needs, 'price_tier': '$$', 'cuisine': 'Vegetarian'},
                {'name': 'Scoma\'s', 'description': 'Seafood at Fisherman\'s Wharf', 'dietary_options': dietary_needs, 'price_tier': '$$$', 'cuisine': 'Seafood'}
            ]
        elif 'santa monica' in location.lower():
            restaurants = [
                {'name': 'The Lobster', 'description': 'Seafood with ocean views', 'dietary_options': dietary_needs, 'price_tier': '$$$', 'cuisine': 'Seafood'},
                {'name': 'Margo\'s', 'description': 'Plant-based brunch spot', 'dietary_options': dietary_needs, 'price_tier': '$$', 'cuisine': 'Vegan'}
            ]
        else:
            restaurants = [
                {'name': f'{location} Cafe', 'description': 'Local favorite', 'dietary_options': dietary_needs, 'price_tier': '$$', 'cuisine': 'American'},
                {'name': f'{location} Bistro', 'description': 'Cozy dining', 'dietary_options': dietary_needs, 'price_tier': '$$', 'cuisine': 'Various'}
            ]
    
    return restaurants[:2]

def generate_day_plan(day_num: int, date: str, location: str, preferences: Dict) -> Dict:
    """Generate a single day's itinerary"""
    activities = get_activity_recommendations(location, preferences)
    
    return {
        'day': day_num,
        'date': date,
        'morning': {
            'time': '9:00 AM - 12:00 PM',
            'activity': activities[0] if len(activities) > 0 else {'title': 'Explore local area'},
            'notes': 'Start your day early to avoid crowds'
        },
        'afternoon': {
            'time': '1:00 PM - 5:00 PM',
            'activity': activities[1] if len(activities) > 1 else {'title': 'Lunch and relaxation'},
            'notes': 'Take breaks as needed, especially with kids'
        },
        'evening': {
            'time': '6:00 PM - 9:00 PM',
            'activity': activities[2] if len(activities) > 2 else {'title': 'Dinner and evening stroll'},
            'notes': 'Enjoy local cuisine and nightlife'
        }
    }

@app.route('/api/ai-concierge', methods=['POST'])
def ai_concierge():
    """
    Main AI Concierge endpoint
    Accepts: booking context, preferences, and free-text queries
    Returns: day-by-day plans, activities, restaurants, packing list
    """
    try:
        data = request.json
        message = data.get('message', '').lower()
        
        # Extract context from message or explicit fields
        booking_context = data.get('booking_context', {})
        preferences = data.get('preferences', {})
        
        # Parse natural language input
        location = booking_context.get('location', '')
        start_date = booking_context.get('start_date', '')
        end_date = booking_context.get('end_date', '')
        
        # Try to extract from message if not provided
        if not location:
            # Try multiple patterns (case-insensitive)
            import re
            # Pattern: "to San Francisco" or "in San Francisco" or "San Francisco on"
            location_patterns = [
                r'(?:to|in|for)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)',
                r'([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+on',
                r'going\s+to\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)',
                r'trip\s+to\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)',
                r'visit\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)'
            ]
            for pattern in location_patterns:
                match = re.search(pattern, message, re.IGNORECASE)
                if match:
                    location = match.group(1).strip().title()  # Capitalize properly
                    break
        
        # Extract preferences from message
        dietary_needs = []
        if 'vegan' in message:
            dietary_needs.append('vegan')
        if 'vegetarian' in message:
            dietary_needs.append('vegetarian')
        if 'gluten' in message or 'celiac' in message:
            dietary_needs.append('gluten-free')
        if 'halal' in message:
            dietary_needs.append('halal')
        if 'kosher' in message:
            dietary_needs.append('kosher')
        
        has_kids = 'kid' in message or 'child' in message or 'family' in message
        
        # Check for specific interests (beach, museum, etc.)
        specific_interest = ''
        if 'beach' in message:
            specific_interest = 'beach'
        elif 'museum' in message:
            specific_interest = 'museum'
        elif 'park' in message:
            specific_interest = 'park'
        elif 'hiking' in message or 'hike' in message:
            specific_interest = 'hiking trail'
        elif 'shopping' in message or 'shop' in message:
            specific_interest = 'shopping'
        
        # Determine intent
        if 'packing' in message or 'pack' in message or 'bring' in message:
            # Generate packing list
            packing_list = generate_packing_list(location or 'your destination', (start_date, end_date))
            return jsonify({
                'success': True,
                'type': 'packing_list',
                'response': f"Packing List for {location or 'Your Trip'}:\n\n" + '\n'.join(['• ' + item for item in packing_list]),
                'packing_list': packing_list
            })
        
        elif 'restaurant' in message or 'food' in message or 'eat' in message or 'dining' in message:
            # Restaurant recommendations
            restaurants = get_restaurant_recommendations(location or 'the area', dietary_needs)
            
            # Format response nicely
            dietary_text = f" ({', '.join(dietary_needs)})" if dietary_needs else ""
            response_text = f"🍽️ Restaurant Recommendations in {location or 'the area'}{dietary_text}\n\n"
            
            for i, rest in enumerate(restaurants, 1):
                response_text += f"{i}. **{rest['name']}**\n"
                response_text += f"   Price: {rest['price_tier']}\n"
                if rest.get('description'):
                    response_text += f"   {rest['description']}\n"
                if rest.get('dietary_options'):
                    response_text += f"   ✓ {', '.join(rest['dietary_options'])} options available\n"
                response_text += "\n"
            
            response_text += "\n💡 Tip: Check reviews and make reservations in advance for popular spots!"
            
            return jsonify({
                'success': True,
                'type': 'restaurants',
                'response': response_text,
                'restaurants': restaurants
            })
        
        elif 'activity' in message or 'activities' in message or 'do' in message or 'plan' in message or 'itinerary' in message:
            # Full itinerary with activities
            if not location:
                return jsonify({
                    'success': True,
                    'response': "I'd love to help plan your trip! Please tell me: Where are you going? When? Any specific interests?"
                })
            
            # Generate day-by-day plan
            prefs = {
                'has_kids': has_kids,
                'dietary_needs': dietary_needs,
                'specific_interest': specific_interest,
                'interests': []
            }
            
            # Calculate days
            try:
                if start_date and end_date:
                    start = datetime.fromisoformat(start_date.split('T')[0])
                    end = datetime.fromisoformat(end_date.split('T')[0])
                    num_days = (end - start).days
                else:
                    num_days = 3  # Default
                    start = datetime.now()
            except:
                num_days = 3
                start = datetime.now()
            
            num_days = min(num_days, 7)  # Limit to 7 days
            
            daily_plans = []
            for i in range(num_days):
                day_date = (start + timedelta(days=i)).strftime('%Y-%m-%d')
                daily_plans.append(generate_day_plan(i + 1, day_date, location, prefs))
            
            # Get activities and restaurants
            activities = get_activity_recommendations(location, prefs)
            restaurants = get_restaurant_recommendations(location, dietary_needs)
            packing_list = generate_packing_list(location, (start_date, end_date))
            
            # Format response - SHORT and CLEAR
            response_text = f"✈️ **{num_days}-Day Trip to {location}**\n\n"
            
            for plan in daily_plans:
                response_text += f"**Day {plan['day']}** ({plan['date']})\n\n"
                
                # Places to visit (2 per day)
                response_text += f"📍 **Places to Visit:**\n"
                response_text += f"1. {plan['morning']['activity']['title']}\n"
                response_text += f"2. {plan['afternoon']['activity']['title']}\n\n"
                
                # Restaurants (2 per day)
                response_text += f"🍽️ **Where to Eat:**\n"
                if len(restaurants) >= 2:
                    response_text += f"1. {restaurants[0]['name']}\n"
                    response_text += f"2. {restaurants[1]['name']}\n\n"
                else:
                    response_text += f"Check local restaurants in {location}\n\n"
                
                response_text += "---\n\n"
            
            response_text += "✨ Enjoy your trip!"
            
            return jsonify({
                'success': True,
                'type': 'full_itinerary',
                'response': response_text,
                'daily_plans': daily_plans,
                'activities': activities,
                'restaurants': restaurants,
                'packing_list': packing_list
            })
        
        else:
            # General response
            return jsonify({
                'success': True,
                'response': "I can help you plan your trip! Tell me:\n• Where are you going?\n• When (dates)?\n• Any dietary needs? (vegan, gluten-free, etc.)\n• Traveling with kids?\n• What interests you? (museums, hiking, food, etc.)"
            })
    
    except Exception as e:
        print(f"AI Concierge error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'AI Travel Concierge'})

if __name__ == '__main__':
    port = int(os.getenv('AI_SERVICE_PORT', 5002))
    print(f"🤖 AI Travel Concierge Service starting on port {port}")
    print(f"📡 Tavily API: {'Enabled' if TAVILY_API_KEY else 'Disabled (set TAVILY_API_KEY)'}")
    app.run(host='0.0.0.0', port=port, debug=True)
