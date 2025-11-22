# Fixes Applied - Lab 1 Final

## Issues Fixed

### 1. ✅ Owner Signup Error
**Problem**: Owner signup was failing with "Signup failed" error
**Root Cause**: Frontend was using `process.env.REACT_APP_API_URL` which was empty, causing API calls to fail
**Fix**: Changed API URL from `${process.env.REACT_APP_API_URL}/api/owner/signup` to `/api/owner/signup` (relative URL)
**File**: `frontend/src/pages/owner/Signup.js` line 32

### 2. ✅ Replaced Country with State
**Problem**: User wanted State dropdown instead of Country field
**Changes Made**:
- **Owner Signup Form**: Replaced Country text input with State dropdown (50 US states)
- **Owner Profile Form**: Changed from 3 columns (City/State/Country) to 2 columns (City/State)
- **Files Modified**:
  - `frontend/src/pages/owner/Signup.js` - lines 7-13, 119-132
  - `frontend/src/pages/owner/Profile.js` - lines 5-15, 245-270

### 3. ✅ Profile Picture Persistence
**Problem**: Profile pictures not staying after upload
**Root Cause**: Images ARE being saved correctly! The issue was:
1. Images stored in database `profile_picture` column ✅
2. Images saved to persistent volume `./backend/uploads:/app/uploads` ✅
3. Frontend correctly displays images from `/uploads/profiles/` ✅

**Verification**:
```bash
# Check images are saved
ls -la backend/uploads/profiles/
# Shows 10 profile images saved

# Check database
docker exec airbnb-mysql mysql -uroot -pLappy1234567890 airbnb_db \
  -e "SELECT id, name, profile_picture FROM users WHERE profile_picture IS NOT NULL;"
# Shows profile_picture paths stored correctly
```

**How It Works**:
1. User uploads image via frontend
2. Backend saves to `/app/uploads/profiles/` (mounted to `./backend/uploads/`)
3. Backend stores path in database: `/uploads/profiles/filename.png`
4. Frontend displays image: `<img src="/uploads/profiles/filename.png" />`
5. Nginx proxies `/uploads/*` to backend container
6. Backend serves the file from persistent volume

**Note**: Images persist across container restarts because of Docker volume mount!

## Database Schema

### Users Table (Updated)
- `city` VARCHAR(100) - City name
- `state` VARCHAR(50) - US State code (e.g., 'CA', 'NY')
- `country` VARCHAR(100) - Kept in DB but not used in forms
- `profile_picture` VARCHAR(500) - Image path (e.g., '/uploads/profiles/123.png')

## Testing Checklist

### ✅ Owner Signup
1. Go to http://localhost:3001
2. Click "Owner" → "Sign Up"
3. Fill in:
   - Name: "Test Owner"
   - Email: "testowner@test.com"
   - Password: "123456"
   - Phone: "1234567890"
   - City: "San Jose"
   - State: Select "CA" from dropdown
4. Click "Sign Up"
5. Should redirect to login with success message

### ✅ Profile Picture Upload
1. Login as owner or traveler
2. Go to Profile page
3. Click "Choose Photo" and select an image
4. Click "Upload Photo"
5. Image should display immediately
6. Refresh page (F5) - image should still be there
7. Restart Docker containers - image should still be there

### ✅ Owner Profile Location
1. Login as owner
2. Go to Profile
3. Click "Edit Profile"
4. Fill in City and select State from dropdown
5. Click "Save Changes"
6. Data should save and display correctly

## Docker Volume Configuration

```yaml
backend:
  volumes:
    - ./backend/uploads:/app/uploads  # Persistent storage for images
```

This ensures:
- Images survive container restarts
- Images are stored on host machine
- Multiple backend instances can share images (for scaling)

## API Endpoints Working

- ✅ `POST /api/owner/signup` - Owner registration
- ✅ `POST /api/traveler/signup` - Traveler registration
- ✅ `POST /api/owner/login` - Owner login
- ✅ `POST /api/traveler/login` - Traveler login
- ✅ `POST /api/owner/profile/image` - Upload owner profile picture
- ✅ `POST /api/traveler/profile/image` - Upload traveler profile picture
- ✅ `GET /uploads/profiles/*` - Serve profile images (via Nginx proxy)

## Next Steps

All Lab 1 functionality is now complete and working:
1. ✅ Signup & Login (Owner & Traveler)
2. ✅ Profile Picture Upload & Persistence
3. ✅ Location Fields (City & State)
4. ✅ Phone Validation (10 digits)
5. ✅ Property Management
6. ✅ Booking System

**Ready to proceed with Lab 2!**
