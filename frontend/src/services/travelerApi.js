import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: `${API_URL}/api/traveler`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const travelerApi = {
    signup: async (userData) => {
        const response = await api.post('/signup', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/profile', profileData);
        return response.data;
    }
};

export default travelerApi;