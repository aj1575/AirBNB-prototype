# Complete Setup Instructions

## Issue 1: Flask Module Not Found

The error occurs because you need to use the virtual environment where Flask is installed.

### Solution:

```bash
cd /Users/spartan/Desktop/AirBNB-prototype/backend/ai_service

# Activate virtual environment
source venv/bin/activate

# Now run the AI service
python3 ai_concierge.py
```

You should see:
```
🤖 AI Travel Concierge Service starting on port 5002
📡 Tavily API: Enabled
```

## Issue 2: property_images Table Missing

The table doesn't exist in your database.

### Solution:

Run this command to create the table and add images:

```bash
cd /Users/spartan/Desktop/AirBNB-prototype
mysql -u root -p airbnb_db < backend/fix_property_images.sql
```

Enter your MySQL password when prompted.

You should see output like:
```
id  name                        image_count
2   Luxury Downtown             2
3   Cozy Beach House            2
4   Modern Studio Downtown      2
5   Spacious Family Villa       2
6   Charming Garden Cottage     2
7   Penthouse with City Views   2
```

## Complete Startup Sequence

### Terminal 1: Backend Server
```bash
cd /Users/spartan/Desktop/AirBNB-prototype/backend
npm start
```

### Terminal 2: Frontend Server
```bash
cd /Users/spartan/Desktop/AirBNB-prototype/frontend
npm start
```

### Terminal 3: AI Service
```bash
cd /Users/spartan/Desktop/AirBNB-prototype/backend/ai_service
source venv/bin/activate
python3 ai_concierge.py
```

## Verify Everything Works

1. **Backend**: http://localhost:5001 (should show "Airbnb API Server")
2. **Frontend**: http://localhost:3000 (should show homepage)
3. **AI Service**: http://localhost:5002/health (should show "healthy")

## Test Favorites with Images

1. Login as traveler: yuktaa@gmail.com / 123456
2. Search for properties
3. Add any property to favorites (click heart icon)
4. Go to "My Favorites"
5. Images should now display!

## Troubleshooting

### If AI service still shows "Module not found":
```bash
cd /Users/spartan/Desktop/AirBNB-prototype/backend/ai_service
source venv/bin/activate
pip3 install -r requirements.txt
python3 ai_concierge.py
```

### If property_images table still doesn't exist:
```bash
# Check if table exists
mysql -u root -p -e "USE airbnb_db; SHOW TABLES;"

# If property_images is missing, run:
mysql -u root -p airbnb_db < backend/fix_property_images.sql
```

### If images still don't show:
```bash
# Verify images exist
ls -la backend/uploads/properties/

# Check database
mysql -u root -p airbnb_db -e "SELECT * FROM property_images LIMIT 5;"
```

## Quick Commands Reference

### Start Everything:
```bash
# Terminal 1
cd backend && npm start

# Terminal 2  
cd frontend && npm start

# Terminal 3
cd backend/ai_service && source venv/bin/activate && python3 ai_concierge.py
```

### Stop Everything:
Press `Ctrl+C` in each terminal

### Check Status:
```bash
# Check if backend is running
curl http://localhost:5001

# Check if AI service is running
curl http://localhost:5002/health

# Check database
mysql -u root -p airbnb_db -e "SELECT COUNT(*) FROM property_images;"
```

## Summary

1. Always use `source venv/bin/activate` before running AI service
2. Run `fix_property_images.sql` to create table and add images
3. Start all three services (backend, frontend, AI)
4. Test favorites page - images should appear!
