# API Contracts - Airbnb Prototype

## BASE URLs
- Backend: http://localhost:3001
- AI Agent: http://localhost:8000

## OWNER APIs
### Authentication
**POST** `/api/owner/signup`
- Request: `{ name, email, password, location }`
- Response: `{ success: true, message, userId }`

**POST** `/api/owner/login`
- Request: `{ email, password }`
- Response: `{ success: true, user: { id, name, email, role } }`

**POST** `/api/owner/logout`
- Response: `{ success: true, message }`

### Profile
**GET** `/api/owner/profile`
- Response: `{ success: true, profile: {...} }`

**PUT** `/api/owner/profile`
- Request: `{ name, phone, location, about_me }`
- Response: `{ success: true, message }`

### Properties
**POST** `/api/owner/properties`
- Request: `{ name, type, location, description, pricing, bedrooms, bathrooms, amenities, max_guests, photos }`
- Response: `{ success: true, propertyId }`

**GET** `/api/owner/properties`
- Response: `{ success: true, properties: [...] }`

**GET** `/api/owner/properties/:id`
- Response: `{ success: true, property: {...} }`

**PUT** `/api/owner/properties/:id`
- Request: Same as POST
- Response: `{ success: true, message }`

**DELETE** `/api/owner/properties/:id`
- Response: `{ success: true, message }`

### Booking Management
**GET** `/api/owner/bookings`
- Query params: `?status=pending|accepted|cancelled`
- Response: `{ success: true, bookings: [...] }`

**PUT** `/api/owner/bookings/:id/accept`
- Response: `{ success: true, message }`

**PUT** `/api/owner/bookings/:id/cancel`
- Response: `{ success: true, message }`
