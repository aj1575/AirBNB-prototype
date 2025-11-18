import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Async thunks for authentication
export const loginTraveler = createAsyncThunk(
    'auth/loginTraveler',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/traveler/login`,
                credentials,
                { withCredentials: true }
            );
            return { ...response.data, role: 'traveler' };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const loginOwner = createAsyncThunk(
    'auth/loginOwner',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/owner/login`,
                credentials,
                { withCredentials: true }
            );
            return { ...response.data, role: 'owner' };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const signupTraveler = createAsyncThunk(
    'auth/signupTraveler',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/traveler/signup`,
                userData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const signupOwner = createAsyncThunk(
    'auth/signupOwner',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/owner/signup`,
                userData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (role, { rejectWithValue }) => {
        try {
            const endpoint = role === 'traveler' ? '/api/traveler/logout' : '/api/owner/logout';
            await axios.post(`${API_URL}${endpoint}`, {}, { withCredentials: true });
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        role: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Traveler
            .addCase(loginTraveler.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginTraveler.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.role = 'traveler';
                state.error = null;
            })
            .addCase(loginTraveler.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login Owner
            .addCase(loginOwner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.role = 'owner';
                state.error = null;
            })
            .addCase(loginOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Signup Traveler
            .addCase(signupTraveler.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupTraveler.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signupTraveler.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Signup Owner
            .addCase(signupOwner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupOwner.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signupOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            });
    }
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
