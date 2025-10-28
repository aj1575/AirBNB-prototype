# Complete Testing Guide

## Part 1: Mobile Layout Testing (Chrome DevTools)

### Method 1: Using Device Toolbar (Recommended)

#### Step-by-Step Instructions:

1. **Open Your Application**
   ```
   Go to: http://localhost:3000
   ```

2. **Open Chrome DevTools**
   - **Windows/Linux:** Press `F12` or `Ctrl + Shift + I`
   - **Mac:** Press `Cmd + Option + I`
   
   OR
   
   - Right-click anywhere on the page
   - Select "Inspect" from the menu

3. **Toggle Device Toolbar**
   - Look at the TOP LEFT of DevTools window
   - Click the phone/tablet icon (looks like: 📱)
   - **Keyboard shortcut:**
     - **Windows/Linux:** `Ctrl + Shift + M`
     - **Mac:** `Cmd + Shift + M`

4. **Select Device**
   - At the top of the page, you'll see a dropdown that says "Dimensions"
   - Click it and select a device:
     - iPhone 12 Pro (390 x 844)
     - iPhone SE (375 x 667)
     - iPad (768 x 1024)
     - iPad Pro (1024 x 1366)
     - Samsung Galaxy S20 (360 x 800)

5. **Test Different Views**
   - Click the dropdown again
   - Select "Responsive" to manually resize
   - Drag the edges to test custom sizes

### Method 2: Responsive Design Mode

1. **Open DevTools** (F12 or Cmd+Option+I)

2. **Click the Three Dots** (⋮) in DevTools
   - Located at top-right of DevTools panel

3. **Select "More Tools"**
   - Then click "Sensors" or "Device Mode"

4. **Adjust Viewport**
   - Drag corners to resize
   - Enter custom dimensions

### What to Look For:

#### Mobile View (375px - 767px)
- Navigation should collapse to hamburger menu
- Property cards stack vertically (1 column)
- Forms are full-width
- Buttons are large enough to tap (44px minimum)
- No horizontal scrolling
- Text is readable (16px minimum)

#### Tablet View (768px - 1024px)
- 2-column grid for property cards
- Navigation partially visible
- Medium-sized cards
- Better spacing

#### Desktop View (1025px+)
- 3-4 column grid
- Full navigation bar
- Larger cards
- Optimal spacing

### Testing Checklist:

#### Homepage
- [ ] Hero section scales properly
- [ ] Feature cards stack on mobile
- [ ] Buttons are clickable
- [ ] Text is readable

#### Property Search
- [ ] Search form is usable
- [ ] Property cards stack vertically on mobile
- [ ] Images scale correctly
- [ ] Filters are accessible

#### Property Details
- [ ] Images display properly
- [ ] Booking form is usable
- [ ] Heart icon is visible and clickable
- [ ] All text is readable

#### Favorites Page
- [ ] Cards stack on mobile
- [ ] Images load (if available)
- [ ] Remove button works
- [ ] Navigation is easy

---

## Part 2: Fixing Favorites Images

### Understanding the Issue

The favorites page shows "No Image" because properties don't have images in the database. Here's how to fix it:

### Solution 1: Add Images to Existing Properties (As Owner)

#### Step 1: Login as Owner
```
1. Go to http://localhost:3000/owner/login
2. Email: a@gmail.com
3. Password: 123456
```

#### Step 2: View Your Properties
```
1. Click "My Properties" in the navbar
2. You'll see a list of your properties
```

#### Step 3: Edit Property and Add Images
```
1. Click "Edit" on any property
2. Scroll to "Property Images" section
3. Click "Choose Files" or drag images
4. Upload 2-3 images per property
5. Click "Update Property"
```

#### Step 4: Verify Images
```
1. Logout from owner account
2. Login as traveler (yuktaa@gmail.com / 123456)
3. Search for properties
4. Click on the property you just edited
5. Images should now appear!
```

### Solution 2: Use Sample Images

If you don't have property images, you can use free stock photos:

#### Free Image Sources:
1. **Unsplash** - https://unsplash.com/s/photos/house
2. **Pexels** - https://www.pexels.com/search/apartment/
3. **Pixabay** - https://pixabay.com/images/search/real-estate/

#### Download Instructions:
```
1. Go to any of the above websites
2. Search for: "modern house", "apartment", "villa", "beach house"
3. Download 2-3 images per property type
4. Save to your computer
5. Upload via owner dashboard
```

### Solution 3: Check Database Directly

#### Verify Property Images in Database:

1. **Open Terminal**

2. **Connect to MySQL:**
   ```bash
   mysql -u root -p airbnb_db
   ```

3. **Check Properties:**
   ```sql
   SELECT id, name FROM properties;
   ```

4. **Check Property Images:**
   ```sql
   SELECT * FROM property_images;
   ```

5. **If No Images, Add Manually:**
   ```sql
   -- Example: Add image to property ID 1
   INSERT INTO property_images (property_id, image_path, display_order)
   VALUES (1, '/uploads/properties/sample-image.jpg', 1);
   ```

### Solution 4: Create New Property with Images

#### As Owner:

1. **Login as Owner**
   ```
   http://localhost:3000/owner/login
   Email: a@gmail.com
   Password: 123456
   ```

2. **Click "Add Property"**

3. **Fill in Details:**
   ```
   Property Name: Luxury Beach Villa
   Type: Villa
   Location: Miami, FL
   Description: Beautiful beachfront property
   Price: $300/night
   Bedrooms: 3
   Bathrooms: 2
   Max Guests: 6
   ```

4. **Upload Images:**
   - Click "Choose Files"
   - Select 2-3 images
   - Click "Create Property"

5. **Test as Traveler:**
   ```
   1. Logout
   2. Login as traveler
   3. Search properties
   4. Add new property to favorites
   5. Check favorites page - images should appear!
   ```

---

## Part 3: Quick Troubleshooting

### Favorites Page Shows No Images

**Problem:** Properties appear but show "No Image" placeholder

**Causes:**
1. Properties don't have images uploaded
2. Image paths are incorrect in database
3. Images are not in the uploads folder

**Solutions:**

#### Check 1: Verify Images Exist
```bash
ls -la backend/uploads/properties/
```

If empty, upload images via owner dashboard.

#### Check 2: Check Backend Logs
When you visit favorites page, backend should log:
```
Fetching favorites for user: 1
Found 2 favorites
Property 3 has 0 images
Property 5 has 0 images
```

If it says "0 images", those properties need images uploaded.

#### Check 3: Test API Directly
```bash
# Login first to get session cookie
curl -X POST http://localhost:3000/api/traveler/login \
  -H "Content-Type: application/json" \
  -d '{"email":"yuktaa@gmail.com","password":"123456"}' \
  -c cookies.txt

# Get favorites
curl -X GET http://localhost:3000/api/traveler/favorites \
  -b cookies.txt
```

Look at the response - does it include an `images` array?

### Session Expired Error

**Problem:** "Unauthorized. Please login."

**Solution:**
1. Backend was restarted
2. Sessions are stored in memory
3. Just login again!

### Images Not Loading

**Problem:** Image URLs show 404 error

**Solution:**
1. Check if files exist in `backend/uploads/properties/`
2. Verify backend is serving static files
3. Check image paths in database match actual files

---

## Part 4: Complete Test Flow

### Full Testing Procedure:

#### 1. Setup (One Time)
```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm start

# Terminal 3: Start AI Service
cd backend/ai_service
python3 ai_concierge.py
```

#### 2. Add Property Images (As Owner)
```
1. Login as owner (a@gmail.com / 123456)
2. Go to "My Properties"
3. Edit each property
4. Upload 2-3 images per property
5. Save changes
```

#### 3. Test Favorites (As Traveler)
```
1. Logout from owner
2. Login as traveler (yuktaa@gmail.com / 123456)
3. Search properties
4. Click on a property WITH IMAGES
5. Click heart icon to add to favorites
6. Go to "My Favorites"
7. Images should appear!
```

#### 4. Test Mobile Layout
```
1. Press F12 (or Cmd+Option+I on Mac)
2. Click phone icon 📱 (or Cmd+Shift+M)
3. Select "iPhone 12 Pro"
4. Navigate through app
5. Check all pages work on mobile
```

#### 5. Test All Features
```
- [ ] Login/Signup (both roles)
- [ ] Profile management
- [ ] Property search
- [ ] Property details
- [ ] Booking creation
- [ ] Favorites add/remove
- [ ] AI chatbot
- [ ] Owner property management
- [ ] Owner booking management
- [ ] Mobile responsiveness
```

---

## Part 5: Screenshots for Documentation

### How to Take Screenshots:

#### Method 1: Chrome DevTools Screenshot
```
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Select device (iPhone 12 Pro)
4. Press Cmd+Shift+P (Windows: Ctrl+Shift+P)
5. Type "screenshot"
6. Select "Capture screenshot"
7. Image saves to Downloads
```

#### Method 2: Mac Screenshot
```
- Full screen: Cmd + Shift + 3
- Selected area: Cmd + Shift + 4
- Window: Cmd + Shift + 4, then Space, then click window
```

#### Method 3: Windows Screenshot
```
- Full screen: PrtScn
- Active window: Alt + PrtScn
- Snipping Tool: Windows + Shift + S
```

### Screenshots Needed for Documentation:

1. Landing page (desktop)
2. Landing page (mobile)
3. Traveler dashboard
4. Property search results
5. Property details page
6. Favorites page WITH IMAGES
7. Booking page
8. AI chatbot interface
9. Owner dashboard
10. Property management page

---

## Summary

### For Mobile Testing:
1. Press F12 to open DevTools
2. Click phone icon (📱) at top-left
3. Select device from dropdown
4. Test all pages

### For Favorites Images:
1. Login as owner
2. Edit properties
3. Upload images (2-3 per property)
4. Test as traveler
5. Add to favorites
6. Check favorites page

### Need Help?
- Check backend terminal for logs
- Check browser console (F12) for errors
- Verify images exist in backend/uploads/properties/
- Make sure you're logged in (session active)

**Everything should work once properties have images uploaded!**
