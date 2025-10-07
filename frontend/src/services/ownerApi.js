import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ownerApi = {
    // Auth
    signup: (data) => axios.post(`${API_URL}/api/owner/signup`, data, { withCredentials: true }),
    login: (data) => axios.post(`${API_URL}/api/owner/login`, data, { withCredentials: true }),
    logout: () => axios.post(`${API_URL}/api/owner/logout`, {}, { withCredentials: true }),

    // Profile
    getProfile: () => axios.get(`${API_URL}/api/owner/profile`, { withCredentials: true }),
    updateProfile: (data) => axios.put(`${API_URL}/api/owner/profile`, data, { withCredentials: true }),

    // Properties
    createProperty: (data) => axios.post(`${API_URL}/api/owner/properties`, data, { withCredentials: true }),
    getProperties: () => axios.get(`${API_URL}/api/owner/properties`, { withCredentials: true }),
    getProperty: (id) => axios.get(`${API_URL}/api/owner/properties/${id}`, { withCredentials: true }),
    updateProperty: (id, data) => axios.put(`${API_URL}/api/owner/properties/${id}`, data, { withCredentials: true }),
    deleteProperty: (id) => axios.delete(`${API_URL}/api/owner/properties/${id}`, { withCredentials: true }),

    // Bookings
    getBookings: (status = '') => {
        const url = status ? `${API_URL}/api/owner/bookings?status=${status}` : `${API_URL}/api/owner/bookings`;
        return axios.get(url, { withCredentials: true });
    },
    acceptBooking: (id) => axios.put(`${API_URL}/api/owner/bookings/${id}/accept`, {}, { withCredentials: true }),
    cancelBooking: (id) => axios.put(`${API_URL}/api/owner/bookings/${id}/cancel`, {}, { withCredentials: true })
};

export default ownerApi;