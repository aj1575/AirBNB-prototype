import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for booking operations
export const fetchBookings = createAsyncThunk(
  'booking/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/traveler/bookings', { withCredentials: true });

      if (response.data.success) {
        return response.data.bookings;
      }
      return rejectWithValue('Failed to fetch bookings');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/traveler/bookings', bookingData, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.booking;
      }
      return rejectWithValue('Failed to create booking');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'booking/cancel',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/traveler/bookings/${bookingId}/cancel`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        return bookingId;
      }
      return rejectWithValue('Failed to cancel booking');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking');
    }
  }
);

// Favorites operations
export const fetchFavorites = createAsyncThunk(
  'booking/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/traveler/favorites', { withCredentials: true });

      if (response.data.success) {
        return response.data.favorites;
      }
      return rejectWithValue('Failed to fetch favorites');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'booking/addFavorite',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/traveler/favorites',
        { property_id: propertyId },
        { withCredentials: true }
      );

      if (response.data.success) {
        return { propertyId, favoriteId: response.data.favoriteId };
      }
      return rejectWithValue('Failed to add favorite');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'booking/removeFavorite',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/traveler/favorites/${propertyId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        return propertyId;
      }
      return rejectWithValue('Failed to remove favorite');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
    }
  }
);

// Owner booking operations
export const fetchOwnerBookings = createAsyncThunk(
  'booking/fetchOwnerBookings',
  async (status = 'all', { rejectWithValue }) => {
    try {
      const url = status === 'all' 
        ? '/api/owner/bookings' 
        : `/api/owner/bookings?status=${status}`;
      
      const response = await axios.get(url, { withCredentials: true });

      if (response.data.success) {
        return response.data.bookings;
      }
      return rejectWithValue('Failed to fetch owner bookings');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch owner bookings');
    }
  }
);

export const acceptBooking = createAsyncThunk(
  'booking/accept',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/owner/bookings/${bookingId}/accept`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        return bookingId;
      }
      return rejectWithValue('Failed to accept booking');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to accept booking');
    }
  }
);

export const rejectBooking = createAsyncThunk(
  'booking/reject',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/owner/bookings/${bookingId}/cancel`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        return bookingId;
      }
      return rejectWithValue('Failed to reject booking');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reject booking');
    }
  }
);

// Initial state
const initialState = {
  bookings: [],
  ownerBookings: [],
  favorites: [],
  loading: false,
  error: null,
  bookingSuccess: false,
};

// Booking slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBookingSuccess: (state) => {
      state.bookingSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookingSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.bookingSuccess = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bookingSuccess = false;
      })
      // Cancel booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const booking = state.bookings.find((b) => b.id === action.payload);
        if (booking) {
          booking.status = 'cancelled';
        }
      })
      // Fetch favorites
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((f) => f.property_id !== action.payload);
      })
      // Fetch owner bookings
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.ownerBookings = action.payload;
      })
      // Accept booking
      .addCase(acceptBooking.fulfilled, (state, action) => {
        const booking = state.ownerBookings.find((b) => b.id === action.payload);
        if (booking) {
          booking.status = 'confirmed';
        }
      })
      // Reject booking
      .addCase(rejectBooking.fulfilled, (state, action) => {
        const booking = state.ownerBookings.find((b) => b.id === action.payload);
        if (booking) {
          booking.status = 'cancelled';
        }
      });
  },
});

export const { clearError, clearBookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
