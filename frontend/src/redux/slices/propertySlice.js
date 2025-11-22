import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for property operations
export const fetchProperties = createAsyncThunk(
  'property/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.checkIn) params.append('checkIn', filters.checkIn);
      if (filters.checkOut) params.append('checkOut', filters.checkOut);
      if (filters.guests) params.append('guests', filters.guests);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await axios.get(`/api/traveler/properties/search?${params.toString()}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.properties;
      }
      return rejectWithValue('Failed to fetch properties');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

export const fetchPropertyDetails = createAsyncThunk(
  'property/fetchDetails',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/traveler/properties/${propertyId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.property;
      }
      return rejectWithValue('Failed to fetch property details');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch property details');
    }
  }
);

export const fetchOwnerProperties = createAsyncThunk(
  'property/fetchOwnerProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/owner/properties', { withCredentials: true });

      if (response.data.success) {
        return response.data.properties;
      }
      return rejectWithValue('Failed to fetch owner properties');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch owner properties');
    }
  }
);

export const createProperty = createAsyncThunk(
  'property/create',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/owner/properties', propertyData, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.property;
      }
      return rejectWithValue('Failed to create property');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create property');
    }
  }
);

export const updateProperty = createAsyncThunk(
  'property/update',
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/owner/properties/${id}`, propertyData, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.property;
      }
      return rejectWithValue('Failed to update property');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update property');
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'property/delete',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/owner/properties/${propertyId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        return propertyId;
      }
      return rejectWithValue('Failed to delete property');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete property');
    }
  }
);

// Initial state
const initialState = {
  properties: [],
  ownerProperties: [],
  selectedProperty: null,
  filters: {},
  loading: false,
  error: null,
};

// Property slice
const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch property details
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch owner properties
      .addCase(fetchOwnerProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerProperties = action.payload;
      })
      .addCase(fetchOwnerProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create property
      .addCase(createProperty.fulfilled, (state, action) => {
        state.ownerProperties.push(action.payload);
      })
      // Update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.ownerProperties.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.ownerProperties[index] = action.payload;
        }
      })
      // Delete property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.ownerProperties = state.ownerProperties.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearError, setFilters, clearSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
