# Lab 1 - Complete Functionality Checklist

## ✅ All Requirements Completed

### 1. Signup & Login ✅
- **Traveler Signup**: `POST /api/traveler/signup`
- **Traveler Login**: `POST /api/traveler/login`
- **Owner Signup**: `POST /api/owner/signup`
- **Owner Login**: `POST /api/owner/login`
- **Test Credentials**:
  - Traveler: `test@test.com` / `123456`
  - Owner: `owner@test.com` / `123456`

### 2. Profile Picture Storage & Display ✅
- **Database**: `profile_picture` column in `users` table stores image path
- **Upload Endpoint**: 
  - Traveler: `POST /api/traveler/profile/image`
  - Owner: `POST /api/owner/profile/image`
- **Storage**: Images saved to `/app/uploads/profiles/` in backend container
- **Display**: Profile page shows uploaded image immediately after upload
- **Nginx Proxy**: `/uploads/*` proxied to backend for serving images

### 3. Owner Profile Location (Country, State, City) ✅
- **Database Columns**: `city`, `state`, `country` in `users` table
- **Frontend Form**: 
  - City: Text input
  - State: Dropdown with all 50 US states
  - Country: Text input
- **Layout**: 3 columns (col-md-4 each) for City, State, Country

### 4. Property Location (Country, State, City) ✅
- **Database Columns**: `address`, `city`, `state`, `country` in `properties` table
- **Frontend Form** (`AddProperty.js`):
  - Address: Full text input (col-12)
  - City: Text input (col-md-4)
  - State: Dropdown with all 50 US states (col-md-4)
  - Country: Text input (col-md-4, default: "USA")

### 5. Phone Number Validation (10 Digits) ✅
- **Frontend Validation**: 
  - Owner Profile: Line 100-103 in `Profile.js`
  - Traveler Profile: Line 122-125 in `Profile.js`
- **Regex**: `/^\d{10}$/` (exactly 10 digits)
- **Error Message**: "Phone number must be exactly 10 digits"
- **Validation Trigger**: On form submit before API call

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('traveler', 'owner') NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(50),  -- ✅ Added
  country VARCHAR(100),
  profile_picture VARCHAR(500),  -- ✅ Stores image path
  about_me TEXT,
  languages VARCHAR(255),
  gender VARCHAR(20),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Properties Table
```sql
CREATE TABLE properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(255),  -- Legacy field
  address VARCHAR(255),   -- ✅ Added
  city VARCHAR(100),      -- ✅ Added
  state VARCHAR(50),      -- ✅ Added
  country VARCHAR(100),   -- ✅ Added
  description TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  amenities TEXT,
  photos TEXT,
  max_guests INT DEFAULT 1,
  available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

## Testing Instructions

### Test 1: Signup & Login
```bash
# Traveler Signup
curl -X POST http://localhost:3001/api/traveler/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"testuser@test.com","password":"123456"}'

# Traveler Login
curl -X POST http://localhost:3001/api/traveler/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@test.com","password":"123456"}'
```

### Test 2: Profile Picture Upload
1. Login to the application
2. Go to Profile page
3. Click "Choose Photo" and select an image
4. Click "Upload Photo"
5. Image should display immediately
6. Refresh page - image should persist

### Test 3: Owner Profile Location
1. Login as owner
2. Go to Profile page
3. Click "Edit Profile"
4. Fill in City (e.g., "San Jose")
5. Select State from dropdown (e.g., "CA")
6. Fill in Country (e.g., "USA")
7. Click "Save Changes"
8. Verify data is saved and displayed

### Test 4: Property Location
1. Login as owner
2. Go to "Add Property"
3. Fill in Address (e.g., "123 Main St")
4. Fill in City (e.g., "San Francisco")
5. Select State from dropdown (e.g., "CA")
6. Fill in Country (default "USA")
7. Complete other fields and submit
8. Verify property is created with location data

### Test 5: Phone Validation
1. Login as owner or traveler
2. Go to Profile page
3. Click "Edit Profile"
4. Enter phone number with less than 10 digits (e.g., "123456")
5. Click "Save Changes"
6. Should see error: "Phone number must be exactly 10 digits"
7. Enter exactly 10 digits (e.g., "1234567890")
8. Should save successfully

## URLs
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5001
- **MySQL**: localhost:3307

## Docker Services
- `airbnb-frontend`: Nginx serving React app (port 3001)
- `airbnb-backend`: Node.js Express API (port 5001)
- `airbnb-mysql`: MySQL 8.0 database (port 3307)
- `airbnb-mongodb`: MongoDB for sessions (Lab 2)
- `airbnb-kafka`: Kafka for messaging (Lab 2)
- `airbnb-zookeeper`: Zookeeper for Kafka (Lab 2)

## Next Steps: Lab 2
Once all Lab 1 functionality is verified, proceed with:
1. Redux integration for state management
2. Kubernetes deployment configurations
3. Complete documentation
