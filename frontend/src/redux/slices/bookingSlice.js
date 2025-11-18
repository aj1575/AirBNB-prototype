import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Async thunks for booking operations
export const createBooking = createAsyncThunk(
    'booking/createBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/traveler/bookings`,
                bookingData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Booking failed');
        }
    }
);

export const getBookings = createAsyncThunk(
    'booking/getBookings',
    async (status, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/traveler/bookings`,
                { params: { status }, withCredentials: true }
            );
            return response.data.bookings || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
        }
    }
);

export const cancelBooking = createAsyncThunk(
    'booking/cancelBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${API_URL}/api/traveler/bookings/${bookingId}`,
                { withCredentials: true }
            );
            return bookingId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking');
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        currentBooking: null,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentBooking: (state) => {
            state.currentBooking = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBooking = action.payload;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Bookings
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Cancel Booking
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.filter(
                    booking => booking.id !== action.payload
                );
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
