import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Async thunks for property operations
export const searchProperties = createAsyncThunk(
    'property/searchProperties',
    async (searchParams, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/traveler/properties/search`,
                { params: searchParams, withCredentials: true }
            );
            return response.data.properties || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Search failed');
        }
    }
);

export const getPropertyDetails = createAsyncThunk(
    'property/getPropertyDetails',
    async (propertyId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/traveler/properties/${propertyId}`,
                { withCredentials: true }
            );
            return response.data.property;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch property');
        }
    }
);

export const getFavorites = createAsyncThunk(
    'property/getFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/traveler/favorites`,
                { withCredentials: true }
            );
            return response.data.favorites || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
        }
    }
);

export const addFavorite = createAsyncThunk(
    'property/addFavorite',
    async (propertyId, { rejectWithValue }) => {
        try {
            await axios.post(
                `${API_URL}/api/traveler/favorites/${propertyId}`,
                {},
                { withCredentials: true }
            );
            return propertyId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'property/removeFavorite',
    async (propertyId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${API_URL}/api/traveler/favorites/${propertyId}`,
                { withCredentials: true }
            );
            return propertyId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
        }
    }
);

const propertySlice = createSlice({
    name: 'property',
    initialState: {
        properties: [],
        selectedProperty: null,
        favorites: [],
        loading: false,
        error: null,
        searchParams: {}
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        clearSelectedProperty: (state) => {
            state.selectedProperty = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Search Properties
            .addCase(searchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(searchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Property Details
            .addCase(getPropertyDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPropertyDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProperty = action.payload;
            })
            .addCase(getPropertyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Favorites
            .addCase(getFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Favorite
            .addCase(addFavorite.fulfilled, (state, action) => {
                // Favorite added successfully
            })
            // Remove Favorite
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(
                    fav => fav.id !== action.payload
                );
            });
    }
});

export const { clearError, setSearchParams, clearSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
