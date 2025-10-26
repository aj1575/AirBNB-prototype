import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: `${API_URL}/api/traveler`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authentication
export const signup = (data) => api.post('/signup', data);
export const login = (data) => api.post('/login', data);
export const logout = () => api.post('/logout');

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// Properties
export const searchProperties = (params) => api.get('/properties/search', { params });
export const getPropertyDetails = (id) => api.get(`/properties/${id}`);

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = (status) => api.get('/bookings', { params: { status } });
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// Favorites
export const addFavorite = (propertyId) => api.post(`/favorites/${propertyId}`);
export const getFavorites = () => api.get('/favorites');
export const removeFavorite = (propertyId) => api.delete(`/favorites/${propertyId}`);

export default api;