# Redux Integration Guide

## Overview
This application uses Redux Toolkit for state management with Redux Persist for persistence.

## Installation

Dependencies are already added to package.json:
```bash
npm install
```

## Store Structure

```
src/redux/
├── store.js                 # Redux store configuration with persistence
└── slices/
    ├── authSlice.js        # Authentication state management
    ├── propertySlice.js    # Property data management
    └── bookingSlice.js     # Booking state management
```

## Setup in Your Application

### 1. Wrap App with Redux Provider

Update `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

## Usage Examples

### Authentication

#### Login Component Example

```javascript
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginTraveler, clearError } from '../redux/slices/authSlice';

function TravelerLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/traveler/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginTraveler(credentials));
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
            />
            
            <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
            />
            
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
```

#### Logout Example

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

function Header() {
    const dispatch = useDispatch();
    const { user, role } = useSelector(state => state.auth);

    const handleLogout = async () => {
        await dispatch(logout(role));
        // Redirect handled by component
    };

    return (
        <nav>
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}
```

### Property Management

#### Search Properties Example

```javascript
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProperties, setSearchParams } from '../redux/slices/propertySlice';

function PropertySearch() {
    const dispatch = useDispatch();
    const { properties, loading, error } = useSelector(state => state.property);
    
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        minPrice: '',
        maxPrice: ''
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(setSearchParams(filters));
        await dispatch(searchProperties(filters));
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                {/* Search form fields */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="properties-grid">
                {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}
```

#### Favorites Management Example

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, removeFavorite } from '../redux/slices/propertySlice';

function Favorites() {
    const dispatch = useDispatch();
    const { favorites, loading } = useSelector(state => state.property);

    useEffect(() => {
        dispatch(getFavorites());
    }, [dispatch]);

    const handleRemove = async (propertyId) => {
        await dispatch(removeFavorite(propertyId));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.map(property => (
                <div key={property.id}>
                    <h3>{property.name}</h3>
                    <button onClick={() => handleRemove(property.id)}>
                        Remove from Favorites
                    </button>
                </div>
            ))}
        </div>
    );
}
```

### Booking Management

#### Create Booking Example

```javascript
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBooking, clearError } from '../redux/slices/bookingSlice';

function BookingForm({ propertyId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, currentBooking } = useSelector(state => state.booking);
    
    const [bookingData, setBookingData] = useState({
        startDate: '',
        endDate: '',
        guests: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(createBooking({
            propertyId,
            ...bookingData
        }));
        
        if (result.meta.requestStatus === 'fulfilled') {
            alert('Booking request created!');
            navigate('/traveler/bookings');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <input
                type="date"
                value={bookingData.startDate}
                onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                required
            />
            
            <input
                type="date"
                value={bookingData.endDate}
                onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                required
            />
            
            <select
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
            >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Booking...' : 'Request Booking'}
            </button>
        </form>
    );
}
```

#### View Bookings Example

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, cancelBooking } from '../redux/slices/bookingSlice';

function MyBookings() {
    const dispatch = useDispatch();
    const { bookings, loading } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(getBookings());
    }, [dispatch]);

    const handleCancel = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            await dispatch(cancelBooking(bookingId));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                    <h3>{booking.property_name}</h3>
                    <p>Status: {booking.status}</p>
                    <p>Dates: {booking.start_date} to {booking.end_date}</p>
                    <p>Guests: {booking.guests}</p>
                    <p>Total: ${booking.total_price}</p>
                    
                    {booking.status === 'pending' && (
                        <button onClick={() => handleCancel(booking.id)}>
                            Cancel Booking
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
```

## Protected Routes with Redux

```javascript
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, role } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/traveler/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
}

// Usage in App.js
<Route 
    path="/traveler/dashboard" 
    element={
        <ProtectedRoute requiredRole="traveler">
            <TravelerDashboard />
        </ProtectedRoute>
    } 
/>
```

## Redux DevTools

### Installation
Install the Redux DevTools browser extension:
- Chrome: https://chrome.google.com/webstore/detail/redux-devtools
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/

### Usage
1. Open browser DevTools (F12)
2. Click on "Redux" tab
3. View state tree, actions, and state changes
4. Time-travel debugging available

### Taking Screenshots for Assignment
1. Open Redux DevTools
2. Navigate through your app (login, search, book)
3. Take screenshots showing:
   - State tree with auth data
   - Action history
   - State diff when actions are dispatched
   - Time-travel feature

## State Persistence

Redux Persist is configured to persist only the `auth` slice to localStorage:

```javascript
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Only auth state persists
};
```

This means:
- User authentication persists across page refreshes
- Property and booking data is fetched fresh on each load
- Logout clears persisted state

## Best Practices

1. **Always use async thunks for API calls**
   ```javascript
   dispatch(loginTraveler(credentials));
   // NOT: axios.post(...)
   ```

2. **Handle loading and error states**
   ```javascript
   const { loading, error } = useSelector(state => state.auth);
   ```

3. **Clear errors when appropriate**
   ```javascript
   useEffect(() => {
       dispatch(clearError());
   }, []);
   ```

4. **Use selectors for derived state**
   ```javascript
   const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
   ```

5. **Dispatch actions, don't mutate state directly**
   ```javascript
   // GOOD
   dispatch(setUser(userData));
   
   // BAD
   state.auth.user = userData;
   ```

## Testing Redux

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Create test store
const testStore = configureStore({
    reducer: {
        auth: authReducer
    }
});

// Test actions
test('login sets user data', () => {
    const action = { type: 'auth/loginTraveler/fulfilled', payload: { user: { name: 'Test' } } };
    const state = authReducer(undefined, action);
    expect(state.isAuthenticated).toBe(true);
});
```

## Troubleshooting

### State not persisting
- Check localStorage in browser DevTools
- Verify PersistGate is wrapping App
- Check persist config whitelist

### Actions not dispatching
- Verify useDispatch is called
- Check Redux DevTools for action history
- Ensure async thunks are awaited

### State not updating in component
- Verify useSelector is used correctly
- Check if component is wrapped in Provider
- Ensure correct state path in selector

## Additional Resources

- Redux Toolkit: https://redux-toolkit.js.org/
- Redux Persist: https://github.com/rt2zz/redux-persist
- React Redux: https://react-redux.js.org/
